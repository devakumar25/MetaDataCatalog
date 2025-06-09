import { createApp } from './core/app.js';
import { router } from './router.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const app = createApp({
    el: '#root',
    router
  });
  
  app.mount();
});