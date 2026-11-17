import './assets/main.css'
// PixelHub styles — imported AFTER main.css so its overrides win
import './assets/pixelhub.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
