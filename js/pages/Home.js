import { AssetStatistics } from '../components/home/AssetStatistics.js';
import { ComputationalResources } from '../components/home/ComputationalResources.js';
import { RecentAssets } from '../components/home/RecentAssets.js';
import { DataFreshness } from '../components/home/DataFreshness.js';
import { RecentDataChanges } from '../components/home/RecentDataChanges.js';
import { assetCounts, computationalResourcesCount, recentAssets, dataFreshnessIssues, recentDataChanges } from '../data/homeData.js';

export class HomePage {
  constructor(workspace) {
    this.workspace = workspace;
    this.actions = [];
  }
  
  mount() {
    // Initialize components
    this.initializeComponents();
  }
  
  unmount() {
    // Clean up components
  }
  
  initializeComponents() {
    // Asset Statistics
    const assetStatsContainer = document.getElementById('asset-statistics');
    if (assetStatsContainer) {
      assetStatsContainer.innerHTML = AssetStatistics(assetCounts);
    }
    
    // Computational Resources
    const compResourcesContainer = document.getElementById('computational-resources');
    if (compResourcesContainer) {
      compResourcesContainer.innerHTML = ComputationalResources(computationalResourcesCount);
    }
    
    // Recent Assets
    const recentAssetsContainer = document.getElementById('recent-assets');
    if (recentAssetsContainer) {
      recentAssetsContainer.innerHTML = RecentAssets(recentAssets);
    }
    
    // Recent Data Changes
    const recentChangesContainer = document.getElementById('recent-changes');
    if (recentChangesContainer) {
      recentChangesContainer.innerHTML = RecentDataChanges(recentDataChanges);
    }
    
    // Data Freshness
    const dataFreshnessContainer = document.getElementById('data-freshness');
    if (dataFreshnessContainer) {
      dataFreshnessContainer.innerHTML = DataFreshness(dataFreshnessIssues);
      
      // Set up tabs
      const tabs = dataFreshnessContainer.querySelectorAll('.freshness-tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const tabId = tab.getAttribute('data-tab');
          this.switchFreshnessTab(tabId);
        });
      });
    }
  }
  
  switchFreshnessTab(tabId) {
    // Update active tab
    const tabs = document.querySelectorAll('.freshness-tab');
    tabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === tabId) {
        tab.classList.add('bg-blue-100', 'text-blue-800');
        tab.classList.remove('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
      } else {
        tab.classList.remove('bg-blue-100', 'text-blue-800');
        tab.classList.add('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
      }
    });
    
    // Update content
    const contentSections = document.querySelectorAll('.freshness-content');
    contentSections.forEach(section => {
      if (section.getAttribute('data-content') === tabId) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }
  
  render() {
    const container = document.createElement('div');
    container.className = 'h-[calc(100vh-8rem)] flex flex-col gap-4 px-4 overflow-hidden';
    
    container.innerHTML = `
      <div class="h-[30%] min-h-[300px]" id="asset-statistics">
        <!-- Asset Statistics will be rendered here -->
      </div>
      <div class="h-[10%] min-h-[120px]" id="computational-resources">
        <!-- Computational Resources will be rendered here -->
      </div>
      <div class="h-[60%] grid grid-cols-3 gap-4">
        <div class="overflow-hidden" id="recent-assets">
          <!-- Recent Assets will be rendered here -->
        </div>
        <div class="overflow-hidden" id="recent-changes">
          <!-- Recent Data Changes will be rendered here -->
        </div>
        <div class="overflow-hidden" id="data-freshness">
          <!-- Data Freshness will be rendered here -->
        </div>
      </div>
    `;
    
    return container;
  }
}