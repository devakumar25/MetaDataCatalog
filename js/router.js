import { WorkspaceListPage } from './pages/WorkspaceList.js';
import { WorkspaceDetailPage } from './pages/WorkspaceDetail.js';
import { NotFoundPage } from './pages/NotFound.js';

class Router {
  constructor() {
    this.routes = [
      { path: '/', component: WorkspaceListPage },
      { path: '/workspace/:id', component: WorkspaceDetailPage },
      { path: '/workspace/:id/catalog', component: WorkspaceDetailPage },
      { path: '/workspace/:id/catalog/:section', component: WorkspaceDetailPage },
      { path: '/workspace/:id/search', component: WorkspaceDetailPage }
    ];
    this.rootElement = null;
    this.currentComponent = null;
  }
  
  init(rootElement) {
    this.rootElement = rootElement;
    
    // Intercept link clicks for client-side navigation
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.getAttribute('href').startsWith('/')) {
        e.preventDefault();
        const href = link.getAttribute('href');
        history.pushState(null, '', href);
        this.navigate(href);
      }
    });
  }
  
  navigate(path) {
    // Find matching route
    const matchedRoute = this.findMatchingRoute(path);
    
    if (matchedRoute) {
      const { component, params } = matchedRoute;
      
      // Clean up previous component if exists
      if (this.currentComponent && typeof this.currentComponent.unmount === 'function') {
        this.currentComponent.unmount();
      }
      
      // Create and mount new component
      this.currentComponent = new component(params);
      this.rootElement.innerHTML = '';
      this.rootElement.appendChild(this.currentComponent.render());
      
      // Call mount lifecycle method if exists
      if (typeof this.currentComponent.mount === 'function') {
        this.currentComponent.mount();
      }
    } else {
      // Handle 404
      this.currentComponent = new NotFoundPage();
      this.rootElement.innerHTML = '';
      this.rootElement.appendChild(this.currentComponent.render());
    }
  }
  
  findMatchingRoute(path) {
    for (const route of this.routes) {
      const pattern = this.pathToRegex(route.path);
      const match = path.match(pattern);
      
      if (match) {
        const params = this.extractParams(route.path, path);
        return { component: route.component, params };
      }
    }
    return null;
  }
  
  pathToRegex(path) {
    // Convert route path to regex
    // e.g. /workspace/:id -> /^\/workspace\/([^\/]+)(?:\/)?$/
    const pattern = path
      .replace(/\//g, '\\/') // Escape slashes
      .replace(/:\w+/g, '([^\\/]+)') // Replace :param with capture group
      .replace(/\*$/, '.*'); // Handle wildcard
    
    return new RegExp(`^${pattern}(?:\\/)?$`);
  }
  
  extractParams(routePath, actualPath) {
    const paramNames = (routePath.match(/:\w+/g) || []).map(param => param.substring(1));
    const paramValues = actualPath.match(this.pathToRegex(routePath)).slice(1);
    
    const params = {};
    paramNames.forEach((name, index) => {
      params[name] = paramValues[index];
    });
    
    return params;
  }
}

export const router = new Router();