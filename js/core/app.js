// Simple application framework
export function createApp(config) {
  const { el, router } = config;
  
  return {
    mount() {
      const rootElement = document.querySelector(el);
      if (!rootElement) {
        console.error(`Root element ${el} not found`);
        return;
      }
      
      // Initialize router
      router.init(rootElement);
      
      // Handle navigation events
      window.addEventListener('popstate', () => {
        router.navigate(window.location.pathname);
      });
      
      // Initial navigation
      router.navigate(window.location.pathname);
    }
  };
}