import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

// Components
import Navbar from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/toaster';

// Pages
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import PipelineBoard from './components/PipelineBoard';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Router>
      <div className="min-h-screen bg-mint flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <div className="flex flex-1 pt-16">
          {/* Sidebar */}
          <Sidebar collapsed={sidebarCollapsed} />
          
          {/* Toggle sidebar button */}
          <Button
            variant="ghost"
            size="icon"
            className="fixed bottom-4 left-4 z-50 bg-white shadow-md border border-gray-200 hidden md:flex"
            onClick={toggleSidebar}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
          
          {/* Main content */}
          <main className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'ml-[70px]' : 'ml-0 md:ml-[240px]'
          }`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pipeline" element={<PipelineBoard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        
        <Toaster />
      </div>
    </Router>
  );
}

export default App;