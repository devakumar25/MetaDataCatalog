import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkspaceList from './pages/WorkspaceList';
import WorkspaceDetail from './pages/WorkspaceDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkspaceList />} />
        <Route path="/workspace/:id/*" element={<WorkspaceDetail />} />
      </Routes>
    </Router>
  );
}

export default App;