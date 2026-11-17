import { defineStore } from 'pinia'
import { taskApi } from '../api'

// Pinia owns the task list. The list is replaced with the API's answer only
// after a save succeeds, so failed saves never appear in the interface.
export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    filter: 'all', // 'all' | 'active' | 'completed'
    loading: false,
    error: '',
  }),

  getters: {
    visibleTasks(state) {
      if (state.filter === 'active') return state.tasks.filter((task) => !task.completed)
      if (state.filter === 'completed') return state.tasks.filter((task) => task.completed)
      return state.tasks
    },
    activeCount: (state) => state.tasks.filter((task) => !task.completed).length,
    completedCount: (state) => state.tasks.filter((task) => task.completed).length,
  },

  actions: {
    clearError() {
      this.error = ''
    },

    showError(error) {
      this.error = error.message || 'Something went wrong. Please try again.'
    },

    // Blank titles are rejected here and by the server; the list is untouched.
    checkTitle(title) {
      if (!title.trim()) {
        this.error = 'Please enter a task title.'
        return null
      }
      this.clearError()
      return title.trim()
    },

    replaceTask(updatedTask) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id)
      if (index !== -1) this.tasks[index] = updatedTask
    },

    async load() {
      this.loading = true
      this.clearError()
      try {
        const data = await taskApi.list()
        this.tasks = data.tasks
      } catch (error) {
        this.showError(error)
      } finally {
        this.loading = false
      }
    },

    async add(title) {
      const validTitle = this.checkTitle(title)
      if (validTitle === null) return false
      try {
        const { task } = await taskApi.create(validTitle)
        this.tasks.push(task) // step 5: update the UI only after the API replies
        return true
      } catch (error) {
        this.showError(error)
        return false
      }
    },

    async rename(id, title) {
      const validTitle = this.checkTitle(title)
      if (validTitle === null) return false
      try {
        const { task } = await taskApi.rename(id, validTitle)
        this.replaceTask(task)
        return true
      } catch (error) {
        this.showError(error)
        return false
      }
    },

    async setCompleted(id, completed) {
      this.clearError()
      try {
        const { task } = await taskApi.setCompleted(id, completed)
        this.replaceTask(task)
        return true
      } catch (error) {
        this.showError(error)
        return false
      }
    },

    async remove(id) {
      this.clearError()
      try {
        await taskApi.remove(id)
        this.tasks = this.tasks.filter((task) => task.id !== id)
        return true
      } catch (error) {
        this.showError(error)
        return false
      }
    },
  },
})
