import React, { useState, useEffect } from 'react';
import { AlertTriangle, Users, Truck, MessageSquare, BarChart3, MapPin, Zap, Phone } from 'lucide-react';
import Dashboard from './components/Dashboard';
import EarlyWarning from './components/EarlyWarning';
import DamageAssessment from './components/DamageAssessment';
import ResourceAllocation from './components/ResourceAllocation';
import Communication from './components/Communication';
import AIAssistant from './components/AIAssistant';
import MobileNav from './components/MobileNav';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'warning', name: 'Early Warning', icon: AlertTriangle },
    { id: 'assessment', name: 'Damage Assessment', icon: MapPin },
    { id: 'resources', name: 'Resources', icon: Truck },
    { id: 'communication', name: 'Communication', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'warning':
        return <EarlyWarning />;
      case 'assessment':
        return <DamageAssessment />;
      case 'resources':
        return <ResourceAllocation />;
      case 'communication':
        return <Communication />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DisasterAI</h1>
                <p className="text-sm text-gray-500">Emergency Response Coordination</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:block">AI Assistant</span>
              </button>
              
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600 hidden sm:block">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="w-64 bg-white shadow-sm h-screen sticky top-0">
            <nav className="mt-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                      activeTab === item.id
                        ? 'border-r-2 border-blue-600 bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {renderContent()}
        </div>

        {/* AI Assistant Panel */}
        {showAIAssistant && (
          <div className="w-80 bg-white shadow-lg border-l border-gray-200">
            <AIAssistant onClose={() => setShowAIAssistant(false)} />
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <MobileNav
          navigation={navigation}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
}

export default App;