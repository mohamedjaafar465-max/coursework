<script setup>
import { computed, onMounted, ref } from 'vue'
import { useTasksStore } from './stores/tasks'

const store = useTasksStore()
const newTitle = ref('')
const editingId = ref(null)
const editTitle = ref('')

onMounted(() => store.load()) // step 1: fetch saved tasks from the REST API

const filters = computed(() => [
  { value: 'all', label: 'All', count: store.tasks.length },
  { value: 'active', label: 'Active', count: store.activeCount },
  { value: 'completed', label: 'Completed', count: store.completedCount },
])

const emptyMessage = computed(() => {
  if (store.loading && store.tasks.length === 0) return 'Loading tasks...'
  if (store.tasks.length === 0) return 'No tasks yet. Add your first task above.'
  if (store.filter === 'active') return 'No active tasks. Nice work!'
  return 'No completed tasks yet.'
})

async function submitNewTask() {
  const added = await store.add(newTitle.value)
  if (added) newTitle.value = ''
  // On failure the typed title stays in the box and the task list is unchanged.
}

function startRename(task) {
  editingId.value = task.id
  editTitle.value = task.title
}

function cancelRename() {
  editingId.value = null
  editTitle.value = ''
}

async function submitRename(task) {
  await store.rename(task.id, editTitle.value)
  // A failed save leaves the store untouched, so closing the editor shows
  // the last saved title again.
  cancelRename()
}

async function toggleTask(task) {
  await store.setCompleted(task.id, !task.completed)
}
</script>

<template>
  <main class="app-shell">
    <header class="page-header">
      <h1>My Tasks</h1>
      <p class="subtitle">A simple place to keep track of what needs doing.</p>
    </header>

    <div v-if="store.error" class="alert" role="alert">
      <span>{{ store.error }}</span>
      <button type="button" class="alert-close" aria-label="Dismiss message" @click="store.clearError()">
        &times;
      </button>
    </div>

    <form class="add-form" @submit.prevent="submitNewTask">
      <label class="screen-reader-only" for="new-title">New task title</label>
      <input
        id="new-title"
        v-model="newTitle"
        type="text"
        maxlength="200"
        placeholder="Enter a task title"
        autocomplete="off"
      />
      <button type="submit" class="button primary">Add task</button>
    </form>

    <div class="toolbar">
      <div class="filters" aria-label="Filter tasks">
        <button
          v-for="option in filters"
          :key="option.value"
          type="button"
          class="filter-button"
          :class="{ selected: store.filter === option.value }"
          :aria-pressed="store.filter === option.value"
          @click="store.filter = option.value"
        >
          {{ option.label }} <span class="count">{{ option.count }}</span>
        </button>
      </div>
    </div>

    <ul v-if="store.visibleTasks.length" class="task-list">
      <li v-for="task in store.visibleTasks" :key="task.id" class="task-item">
        <input
          class="task-checkbox"
          type="checkbox"
          :checked="task.completed"
          :aria-label="`Mark ${task.title} as ${task.completed ? 'active' : 'complete'}`"
          @change="toggleTask(task)"
        />

        <form v-if="editingId === task.id" class="rename-form" @submit.prevent="submitRename(task)">
          <label class="screen-reader-only" :for="`edit-${task.id}`">New title for {{ task.title }}</label>
          <input
            :id="`edit-${task.id}`"
            v-model="editTitle"
            type="text"
            maxlength="200"
            autocomplete="off"
            @keydown.esc.prevent="cancelRename"
          />
          <button type="submit" class="button small">Save</button>
          <button type="button" class="button small ghost" @click="cancelRename">Cancel</button>
        </form>

        <template v-else>
          <span class="task-title" :class="{ complete: task.completed }">{{ task.title }}</span>
          <div class="task-actions">
            <button type="button" class="link-button" @click="startRename(task)">Rename</button>
            <button type="button" class="link-button danger" @click="store.remove(task.id)">Delete</button>
          </div>
        </template>
      </li>
    </ul>

    <p v-else class="empty-message">{{ emptyMessage }}</p>
  </main>
</template>
