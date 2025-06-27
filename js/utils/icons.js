// Simple icon utility to replace lucide-react
export const icons = {
  // Navigation icons
  home: (props = {}) => createSvgIcon('Home', 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', props),
  database: (props = {}) => createSvgIcon('Database', 'M12 2C6.48 2 2 4.48 2 8v8c0 3.52 4.48 6 10 6s10-2.48 10-6V8c0-3.52-4.48-6-10-6zM2 12v4c0 3.52 4.48 6 10 6s10-2.48 10-6v-4c0 3.52-4.48 6-10 6s-10-2.48-10-6zM2 8c0-3.52 4.48-6 10-6s10 2.48 10 6-4.48 6-10 6S2 11.52 2 8z', props),
  search: (props = {}) => createSvgIcon('Search', 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', props),
  user: (props = {}) => createSvgIcon('User', 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 7a4 4 0 100-8 4 4 0 000 8z', props),
  
  // Chart icons
  barChart: (props = {}) => createSvgIcon('BarChart', 'M12 20V10M18 20V4M6 20v-4', props),
  barChart2: (props = {}) => createSvgIcon('BarChart2', 'M18 20V10M12 20V4M6 20v-6', props),
  lineChart: (props = {}) => createSvgIcon('LineChart', 'M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3', props),
  pieChart: (props = {}) => createSvgIcon('PieChart', 'M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z', props),
  
  // UI icons
  plus: (props = {}) => createSvgIcon('Plus', 'M12 5v14m-7-7h14', props),
  minus: (props = {}) => createSvgIcon('Minus', 'M5 12h14', props),
  x: (props = {}) => createSvgIcon('X', 'M18 6L6 18M6 6l12 12', props),
  check: (props = {}) => createSvgIcon('Check', 'M5 13l4 4L19 7', props),
  chevronDown: (props = {}) => createSvgIcon('ChevronDown', 'M6 9l6 6 6-6', props),
  chevronUp: (props = {}) => createSvgIcon('ChevronUp', 'M18 15l-6-6-6 6', props),
  chevronLeft: (props = {}) => createSvgIcon('ChevronLeft', 'M15 18l-6-6 6-6', props),
  chevronRight: (props = {}) => createSvgIcon('ChevronRight', 'M9 18l6-6-6-6', props),
  
  // Data icons
  table: (props = {}) => createSvgIcon('Table', 'M3 3h18v18H3V3zm0 6h18M3 15h18M9 3v18M15 3v18', props),
  tableProperties: (props = {}) => createSvgIcon('TableProperties', 'M3 3h18v18H3V3zm0 6h18M3 15h18M9 3v18', props),
  gitBranch: (props = {}) => createSvgIcon('GitBranch', 'M6 3v12m0 0a3 3 0 103 3m-3-3a3 3 0 01-3 3m12-3a3 3 0 103-3m0 0V3m0 0a3 3 0 10-3 3m3-3a3 3 0 01-3 3', props),
  gitMerge: (props = {}) => createSvgIcon('GitMerge', 'M18 21a3 3 0 100-6 3 3 0 000 6zm0-6V7.5M18 7.5A3 3 0 1015 4.5m3 3L6 7.5m0 0a3 3 0 10-3 3m3-3a3 3 0 01-3 3m0 0V15m0 0a3 3 0 103 3m-3-3a3 3 0 013 3', props),
  calculator: (props = {}) => createSvgIcon('Calculator', 'M9 7h6m-6 4h6m-6 4h6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z', props),
  variable: (props = {}) => createSvgIcon('Variable', 'M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09', props),
  filter: (props = {}) => createSvgIcon('Filter', 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z', props),
  
  // UI elements
  layoutDashboard: (props = {}) => createSvgIcon('LayoutDashboard', 'M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm4 0v6m0 4v4m8-14v4m0 4v6m-8-6h8', props),
  layout: (props = {}) => createSvgIcon('Layout', 'M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-5 14H5v-9h9v9z', props),
  presentation: (props = {}) => createSvgIcon('Presentation', 'M7 14l5-5 5 5M3 4h18M4 4v10a2 2 0 002 2h12a2 2 0 002-2V4', props),
  
  // Misc icons
  star: (props = {}) => createSvgIcon('Star', 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', props, true),
  clock: (props = {}) => createSvgIcon('Clock', 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', props),
  settings: (props = {}) => createSvgIcon('Settings', 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', props),
  brain: (props = {}) => createSvgIcon('Brain', 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', props),
  textCursor: (props = {}) => createSvgIcon('TextCursor', 'M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z', props),
  databaseBackup: (props = {}) => createSvgIcon('DatabaseBackup', 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4', props),
  import: (props = {}) => createSvgIcon('Import', 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12', props),
  zap: (props = {}) => createSvgIcon('Zap', 'M13 10V3L4 14h7v7l9-11h-7z', props),
  bot: (props = {}) => createSvgIcon('Bot', 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5', props),
  rss: (props = {}) => createSvgIcon('Rss', 'M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z', props),
  users: (props = {}) => createSvgIcon('Users', 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', props),
  share2: (props = {}) => createSvgIcon('Share2', 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z', props),
  shield: (props = {}) => createSvgIcon('Shield', 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', props),
  box: (props = {}) => createSvgIcon('Box', 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', props),
  
  // Missing icons that were causing the error
  cpu: (props = {}) => createSvgIcon('Cpu', 'M4 16v-2.5a2.5 2.5 0 012.5-2.5H9m7 0h2.5A2.5 2.5 0 0121 13.5V16M4 8v2.5A2.5 2.5 0 006.5 13H9m7 0h2.5a2.5 2.5 0 002.5-2.5V8m-12 4h6v6H9v-6z', props),
  userCheck: (props = {}) => createSvgIcon('UserCheck', 'M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8.5 3a4 4 0 100 8 4 4 0 000-8zm8.5 9l2 2 4-4', props),
  
  // Utility icons
  sortDesc: (props = {}) => createSvgIcon('SortDesc', 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12', props),
  columns: (props = {}) => createSvgIcon('Columns', 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2', props),
  network: (props = {}) => createSvgIcon('Network', 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', props),
  info: (props = {}) => createSvgIcon('Info', 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', props),
  
  // Status icons
  checkCircle: (props = {}) => createSvgIcon('CheckCircle', 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', props),
  xCircle: (props = {}) => createSvgIcon('XCircle', 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z', props),
  refreshCw: (props = {}) => createSvgIcon('RefreshCw', 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', props),
  
  // File icons
  fileText: (props = {}) => createSvgIcon('FileText', 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', props),
  plusSquare: (props = {}) => createSvgIcon('PlusSquare', 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z', props),
  minusSquare: (props = {}) => createSvgIcon('MinusSquare', 'M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z', props),
  trash2: (props = {}) => createSvgIcon('Trash2', 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16', props),
  shieldCheck: (props = {}) => createSvgIcon('ShieldCheck', 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', props),
  
  // Additional icons
  hardDrive: (props = {}) => createSvgIcon('HardDrive', 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', props),
  
  // Missing icons that were causing the TypeError
  cloud: (props = {}) => createSvgIcon('Cloud', 'M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z', props),
  server: (props = {}) => createSvgIcon('Server', 'M6 10H4a2 2 0 01-2-2V4c0-1.1.9-2 2-2h16a2 2 0 012 2v4a2 2 0 01-2 2h-2M6 10l6 6 6-6M6 10l6-6 6 6', props),
  headphones: (props = {}) => createSvgIcon('Headphones', 'M3 18v-6a9 9 0 0118 0v6M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z', props),
  briefcase: (props = {}) => createSvgIcon('Briefcase', 'M16 20V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v16m8 0H8m8 0h2a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h2', props),
  dollarSign: (props = {}) => createSvgIcon('DollarSign', 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6', props),
  tool: (props = {}) => createSvgIcon('Tool', 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z', props),
  bookOpen: (props = {}) => createSvgIcon('BookOpen', 'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z', props),
};

function createSvgIcon(name, path, props = {}, needsFill = false) {
  const { class: className = '', fill = 'none', ...otherProps } = props;
  
  return `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="${needsFill ? (fill === 'none' ? 'none' : fill) : 'none'}"
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      class="${className}"
      aria-label="${name}"
      ${Object.entries(otherProps).map(([key, value]) => `${key}="${value}"`).join(' ')}
    >
      <path d="${path}"></path>
    </svg>
  `;
}