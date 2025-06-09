export class NotFoundPage {
  render() {
    const container = document.createElement('div');
    container.className = 'flex items-center justify-center min-h-screen bg-gray-50';
    
    container.innerHTML = `
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p class="text-gray-600 mb-6">The page you are looking for doesn't exist or has been moved.</p>
        <a href="/" class="btn btn-blue">Go Home</a>
      </div>
    `;
    
    return container;
  }
}