import React, { useState, useEffect } from 'react';
import { AlertTriangle, Users, Truck, MapPin, TrendingUp, Clock, Shield, Zap, Download, Eye, X } from 'lucide-react';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [showMap, setShowMap] = useState(false);

  const [stats, setStats] = useState({
    activeAlerts: 3,
    responseTeams: 127,
    resourcesDeployed: 89,
    peopleHelped: 1247
  });

  const handleViewDetails = (alert) => {
    setModalContent({
      title: `${alert.type} - ${alert.location}`,
      content: `
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="font-semibold text-gray-900">Alert Details</h4>
              <p class="text-sm text-gray-600">Type: ${alert.type}</p>
              <p class="text-sm text-gray-600">Location: ${alert.location}</p>
              <p class="text-sm text-gray-600">Severity: ${alert.severity}</p>
              <p class="text-sm text-gray-600">Status: ${alert.status}</p>
              <p class="text-sm text-gray-600">Time: ${alert.time}</p>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">Impact Assessment</h4>
              <p class="text-sm text-gray-600">Affected Population: 15,420</p>
              <p class="text-sm text-gray-600">Risk Level: High</p>
              <p class="text-sm text-gray-600">Response Teams: 12 deployed</p>
              <p class="text-sm text-gray-600">Resources: Medical, Rescue</p>
            </div>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900">Recommended Actions</h4>
            <ul class="text-sm text-gray-600 list-disc list-inside">
              <li>Continue evacuation procedures</li>
              <li>Deploy additional medical teams</li>
              <li>Monitor weather conditions</li>
              <li>Prepare emergency shelters</li>
            </ul>
          </div>
        </div>
      `
    });
    setShowModal(true);
  };

  const handleExportReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      stats,
      alerts: recentAlerts,
      systemHealth: 'All systems operational'
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `disaster-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleQuickAction = (action) => {
    setModalContent({
      title: action,
      content: `
        <div class="space-y-4">
          <p class="text-gray-600">Initiating ${action.toLowerCase()}...</p>
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-900">Action Status</h4>
            <p class="text-sm text-blue-700">✓ Authorization confirmed</p>
            <p class="text-sm text-blue-700">✓ Resources identified</p>
            <p class="text-sm text-blue-700">⏳ Deployment in progress</p>
          </div>
          <div class="bg-amber-50 p-4 rounded-lg">
            <h4 class="font-semibold text-amber-900">Estimated Timeline</h4>
            <p class="text-sm text-amber-700">Deployment: 15-30 minutes</p>
            <p class="text-sm text-amber-700">Full activation: 45-60 minutes</p>
          </div>
        </div>
      `
    });
    setShowModal(true);
  };

  const [recentAlerts, setRecentAlerts] = useState([
    {
      id: 1,
      type: 'Hurricane',
      location: 'Florida Coast',
      severity: 'High',
      time: '2 mins ago',
      status: 'Active'
    },
    {
      id: 2,
      type: 'Wildfire',
      location: 'California Central',
      severity: 'Medium',
      time: '15 mins ago',
      status: 'Monitoring'
    },
    {
      id: 3,
      type: 'Flood Warning',
      location: 'Texas Gulf',
      severity: 'Low',
      time: '1 hour ago',
      status: 'Resolved'
    }
  ]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-amber-600 bg-amber-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-red-600 bg-red-100';
      case 'Monitoring': return 'text-amber-600 bg-amber-100';
      case 'Resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 relative">
      {/* Emergency Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900">Active Emergency Situation</h3>
            <p className="text-sm text-red-700">Hurricane Category 3 approaching Florida Coast. Response teams activated.</p>
          </div>
          <button 
            onClick={() => handleViewDetails({ type: 'Hurricane', location: 'Florida Coast', severity: 'High', status: 'Active', time: 'Now' })}
            className="ml-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeAlerts}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">2 resolved today</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Teams</p>
              <p className="text-3xl font-bold text-gray-900">{stats.responseTeams}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-blue-600">89% deployed</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resources</p>
              <p className="text-3xl font-bold text-gray-900">{stats.resourcesDeployed}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">12 in transit</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">People Helped</p>
              <p className="text-3xl font-bold text-gray-900">{stats.peopleHelped.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-purple-600">+156 in last 24h</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
            <p className="text-sm text-gray-600">Latest emergency situations and their status</p>
          </div>
          <div className="divide-y divide-gray-200">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{alert.type}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{alert.location}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{alert.time}</span>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={() => handleViewDetails(alert)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center space-x-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Details</span>
                  </button>
                  <button
                    onClick={handleExportReport}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center space-x-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <p className="text-sm text-gray-600">Emergency response controls</p>
          </div>
          <div className="p-6 space-y-4">
            <button 
              onClick={() => handleQuickAction('Activate Emergency Protocol')}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Activate Emergency Protocol</span>
            </button>
            
            <button 
              onClick={() => handleQuickAction('Deploy Response Team')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Deploy Response Team</span>
            </button>
            
            <button 
              onClick={() => handleQuickAction('Request Resources')}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Truck className="w-4 h-4" />
              <span>Request Resources</span>
            </button>
            
            <button 
              onClick={() => handleQuickAction('Send Public Alert')}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>Send Public Alert</span>
            </button>
            
            <button 
              onClick={() => setShowMap(true)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span>View Emergency Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-sm font-medium text-gray-900">AI Models</p>
              <p className="text-xs text-green-600">Online</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-sm font-medium text-gray-900">Communication</p>
              <p className="text-xs text-green-600">Operational</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-sm font-medium text-gray-900">Data Sources</p>
              <p className="text-xs text-green-600">Connected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{modalContent.title}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6" dangerouslySetInnerHTML={{ __html: modalContent.content }} />
          </div>
        </div>
      )}

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Emergency Response Map</h3>
              <button
                onClick={() => setShowMap(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
                {/* Simulated Map Interface */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-200 to-yellow-200 opacity-50"></div>
                
                {/* Emergency Markers */}
                <div className="absolute top-20 left-20 w-4 h-4 bg-red-600 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-32 right-32 w-4 h-4 bg-amber-600 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute bottom-24 left-32 w-4 h-4 bg-green-600 rounded-full shadow-lg"></div>
                
                {/* Legend */}
                <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Legend</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                      <span>Active Emergency</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                      <span>Warning Zone</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span>Safe Zone</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center z-10">
                  <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Interactive Emergency Map</h4>
                  <p className="text-gray-600 mb-4">Real-time disaster monitoring and response coordination</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white bg-opacity-90 p-3 rounded-lg">
                      <p className="font-semibold">Active Incidents</p>
                      <p className="text-2xl font-bold text-red-600">3</p>
                    </div>
                    <div className="bg-white bg-opacity-90 p-3 rounded-lg">
                      <p className="font-semibold">Response Teams</p>
                      <p className="text-2xl font-bold text-blue-600">127</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;