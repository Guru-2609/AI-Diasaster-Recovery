import React, { useState } from 'react';
import { Truck, Users, Package, MapPin, Clock, TrendingUp, AlertTriangle, CheckCircle, X, Plus, Edit, Download } from 'lucide-react';

const ResourceAllocation = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [showAddResource, setShowAddResource] = useState(false);
  const [newResource, setNewResource] = useState({
    type: '',
    location: '',
    destination: '',
    capacity: '',
    eta: ''
  });

  const [resources, setResources] = useState([
    {
      id: 1,
      type: 'Medical Team',
      location: 'Miami Hospital',
      destination: 'Hurricane Zone Alpha',
      status: 'Deployed',
      capacity: '24 personnel',
      eta: '45 minutes',
      progress: 75
    },
    {
      id: 2,
      type: 'Supply Convoy',
      location: 'Distribution Center B',
      destination: 'Evacuation Center 3',
      status: 'In Transit',
      capacity: '500 food kits',
      eta: '1.2 hours',
      progress: 40
    },
    {
      id: 3,
      type: 'Rescue Team',
      location: 'Fire Station 12',
      destination: 'Flood Zone Beta',
      status: 'Standby',
      capacity: '8 personnel',
      eta: 'On hold',
      progress: 0
    }
  ]);

  const [inventory, setInventory] = useState([
    { type: 'Water Bottles', available: 24000, allocated: 8500, unit: 'bottles' },
    { type: 'Food Packages', available: 15000, allocated: 4200, unit: 'packages' },
    { type: 'Medical Supplies', available: 850, allocated: 320, unit: 'kits' },
    { type: 'Blankets', available: 5200, allocated: 1800, unit: 'blankets' },
    { type: 'Emergency Shelters', available: 120, allocated: 45, unit: 'tents' }
  ]);

  const handleViewDetails = (resource) => {
    setModalContent({
      title: `${resource.type} - Deployment Details`,
      content: `
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">Deployment Information</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Resource Type:</span>
                  <span class="font-medium">${resource.type}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Current Location:</span>
                  <span class="font-medium">${resource.location}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Destination:</span>
                  <span class="font-medium">${resource.destination}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Capacity:</span>
                  <span class="font-medium">${resource.capacity}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Status:</span>
                  <span class="font-medium text-${resource.status === 'Deployed' ? 'green' : resource.status === 'In Transit' ? 'blue' : 'amber'}-600">${resource.status}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">ETA:</span>
                  <span class="font-medium">${resource.eta}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">Progress Tracking</h4>
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Deployment Progress</span>
                    <span>${resource.progress}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-3">
                    <div class="bg-blue-500 h-3 rounded-full" style="width: ${resource.progress}%"></div>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-3 rounded-lg">
                  <h5 class="font-medium text-gray-900 mb-2">Route Information</h5>
                  <div class="text-sm text-gray-600 space-y-1">
                    <p>• Distance: ${Math.floor(Math.random() * 50) + 10} miles</p>
                    <p>• Route: Highway ${Math.floor(Math.random() * 100) + 1}</p>
                    <p>• Traffic: ${['Light', 'Moderate', 'Heavy'][Math.floor(Math.random() * 3)]}</p>
                    <p>• Weather: Clear conditions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-gray-900 mb-3">Communication Log</h4>
            <div class="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">14:32 - Deployment authorized</span>
                <span class="text-green-600">✓ Confirmed</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">14:45 - Team departed from base</span>
                <span class="text-green-600">✓ Confirmed</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">15:12 - Checkpoint Alpha reached</span>
                <span class="text-green-600">✓ Confirmed</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">15:30 - En route to destination</span>
                <span class="text-blue-600">⏳ In Progress</span>
              </div>
            </div>
          </div>
        </div>
      `
    });
    setShowModal(true);
  };

  const handleAddResource = () => {
    if (newResource.type && newResource.location && newResource.destination && newResource.capacity) {
      const resource = {
        id: resources.length + 1,
        ...newResource,
        status: 'Standby',
        progress: 0
      };
      setResources([...resources, resource]);
      setNewResource({ type: '', location: '', destination: '', capacity: '', eta: '' });
      setShowAddResource(false);
    }
  };

  const handleOptimizeRoute = (resourceId) => {
    setModalContent({
      title: 'Route Optimization',
      content: `
        <div class="space-y-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-900">AI Route Analysis Complete</h4>
            <p class="text-sm text-blue-700 mt-2">
              Optimized route calculated using real-time traffic data, weather conditions, and emergency priorities.
            </p>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-green-50 p-4 rounded-lg">
              <h5 class="font-medium text-green-900">Original Route</h5>
              <p class="text-sm text-green-700">Distance: 45 miles</p>
              <p class="text-sm text-green-700">ETA: 1.2 hours</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h5 class="font-medium text-blue-900">Optimized Route</h5>
              <p class="text-sm text-blue-700">Distance: 38 miles</p>
              <p class="text-sm text-blue-700">ETA: 52 minutes</p>
            </div>
          </div>
          
          <div class="bg-amber-50 p-4 rounded-lg">
            <h4 class="font-semibold text-amber-900">Improvements</h4>
            <ul class="text-sm text-amber-700 list-disc list-inside mt-2">
              <li>28 minutes time savings</li>
              <li>7 miles distance reduction</li>
              <li>Avoids construction zone on Highway 23</li>
              <li>Uses emergency vehicle priority lanes</li>
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
      activeDeployments: resources,
      inventory,
      summary: {
        totalResources: resources.length,
        deployed: resources.filter(r => r.status === 'Deployed').length,
        inTransit: resources.filter(r => r.status === 'In Transit').length,
        standby: resources.filter(r => r.status === 'Standby').length
      }
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resource-allocation-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Deployed': return 'text-green-600 bg-green-100';
      case 'In Transit': return 'text-blue-600 bg-blue-100';
      case 'Standby': return 'text-amber-600 bg-amber-100';
      case 'Emergency': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 40) return 'bg-blue-500';
    if (progress > 0) return 'bg-amber-500';
    return 'bg-gray-300';
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 relative">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resource Allocation</h2>
            <p className="text-gray-600">AI-optimized resource distribution and logistics coordination</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowAddResource(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Resource</span>
            </button>
            <button
              onClick={handleExportReport}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
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

      {/* Add Resource Modal */}
      {showAddResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New Resource</h3>
              <button
                onClick={() => setShowAddResource(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
                <select
                  value={newResource.type}
                  onChange={(e) => setNewResource({...newResource, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="Medical Team">Medical Team</option>
                  <option value="Rescue Team">Rescue Team</option>
                  <option value="Supply Convoy">Supply Convoy</option>
                  <option value="Emergency Shelter">Emergency Shelter</option>
                  <option value="Communication Unit">Communication Unit</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
                <input
                  type="text"
                  value={newResource.location}
                  onChange={(e) => setNewResource({...newResource, location: e.target.value})}
                  placeholder="Enter current location"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <input
                  type="text"
                  value={newResource.destination}
                  onChange={(e) => setNewResource({...newResource, destination: e.target.value})}
                  placeholder="Enter destination"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input
                  type="text"
                  value={newResource.capacity}
                  onChange={(e) => setNewResource({...newResource, capacity: e.target.value})}
                  placeholder="e.g., 12 personnel, 500 supplies"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time</label>
                <input
                  type="text"
                  value={newResource.eta}
                  onChange={(e) => setNewResource({...newResource, eta: e.target.value})}
                  placeholder="e.g., 45 minutes, 2 hours"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddResource}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add Resource
                </button>
                <button
                  onClick={() => setShowAddResource(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg text-center transition-colors">
          <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
          <span className="text-sm font-medium">Emergency Deploy</span>
        </button>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center transition-colors">
          <Truck className="w-6 h-6 mx-auto mb-2" />
          <span className="text-sm font-medium">New Convoy</span>
        </button>
        
        <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center transition-colors">
          <Users className="w-6 h-6 mx-auto mb-2" />
          <span className="text-sm font-medium">Request Team</span>
        </button>
        
        <button className="bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-lg text-center transition-colors">
          <Package className="w-6 h-6 mx-auto mb-2" />
          <span className="text-sm font-medium">Supply Request</span>
        </button>
      </div>

      {/* Active Deployments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active Deployments</h3>
          <p className="text-sm text-gray-600">Real-time resource tracking and status</p>
        </div>
        <div className="divide-y divide-gray-200">
          {resources.map((resource) => (
            <div key={resource.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {resource.type === 'Medical Team' && <Users className="w-5 h-5 text-blue-600" />}
                    {resource.type === 'Supply Convoy' && <Truck className="w-5 h-5 text-blue-600" />}
                    {resource.type === 'Rescue Team' && <AlertTriangle className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{resource.type}</h4>
                    <p className="text-sm text-gray-600">{resource.capacity}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(resource.status)}`}>
                  {resource.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>From: {resource.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>To: {resource.destination}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>ETA: {resource.eta}</span>
                </div>
              </div>

              {resource.progress > 0 && (
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{resource.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(resource.progress)}`}
                      style={{ width: `${resource.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleViewDetails(resource)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center space-x-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>Details</span>
                </button>
                <button
                  onClick={() => handleOptimizeRoute(resource.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center space-x-1"
                >
                  <TrendingUp className="w-3 h-3" />
                  <span>Optimize</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Resource Inventory</h3>
            <p className="text-sm text-gray-600">Available supplies and allocation status</p>
          </div>
          <div className="p-6 space-y-4">
            {inventory.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{item.type}</span>
                  <div className="text-right">
                    <span className="text-sm text-gray-600">
                      {(item.available - item.allocated).toLocaleString()} / {item.available.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((item.available - item.allocated) / item.available) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Allocated: {item.allocated.toLocaleString()} {item.unit}</span>
                  <span>Available: {(item.available - item.allocated).toLocaleString()} {item.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
            <p className="text-sm text-gray-600">Optimized allocation suggestions</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">High Priority</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Deploy additional medical team to Zone Alpha. Predicted casualty increase by 40% in next 6 hours.
                  </p>
                  <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                    Deploy Now
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Package className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900">Supply Optimization</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Redistribute 2,000 water bottles from Sector C to Sector B for better coverage.
                  </p>
                  <button className="mt-2 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm transition-colors">
                    Optimize
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Route Efficiency</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Current convoy routes are optimal. Estimated 12% time savings compared to manual planning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceAllocation;