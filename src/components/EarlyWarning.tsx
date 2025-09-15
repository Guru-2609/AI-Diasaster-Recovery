import React, { useState, useEffect } from 'react';
import { AlertTriangle, Cloud, Thermometer, Wind, Eye, Satellite, TrendingUp, X, Download, MapPin, Plus } from 'lucide-react';

const EarlyWarning = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [showAddPrediction, setShowAddPrediction] = useState(false);
  const [newPrediction, setNewPrediction] = useState({
    type: '',
    location: '',
    probability: 50,
    impact: 'Medium',
    timeframe: ''
  });

  const [predictions, setPredictions] = useState([
    {
      id: 1,
      type: 'Hurricane',
      location: 'Atlantic Ocean',
      probability: 87,
      impact: 'High',
      timeframe: '48-72 hours',
      aiConfidence: 94
    },
    {
      id: 2,
      type: 'Wildfire',
      location: 'California Central Valley',
      probability: 72,
      impact: 'Medium',
      timeframe: '24-48 hours',
      aiConfidence: 89
    },
    {
      id: 3,
      type: 'Flood',
      location: 'Texas Gulf Region',
      probability: 45,
      impact: 'Low',
      timeframe: '5-7 days',
      aiConfidence: 76
    }
  ]);

  const [dataStreams, setDataStreams] = useState({
    satellite: { status: 'active', lastUpdate: '2 mins ago', quality: 98 },
    weather: { status: 'active', lastUpdate: '1 min ago', quality: 96 },
    social: { status: 'active', lastUpdate: '30 secs ago', quality: 87 },
    sensors: { status: 'active', lastUpdate: '15 secs ago', quality: 93 }
  });

  const handleViewDetails = (prediction) => {
    setModalContent({
      title: `${prediction.type} Prediction Details`,
      content: `
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Prediction Analysis</h4>
              <p class="text-sm text-gray-600">Type: ${prediction.type}</p>
              <p class="text-sm text-gray-600">Location: ${prediction.location}</p>
              <p class="text-sm text-gray-600">Probability: ${prediction.probability}%</p>
              <p class="text-sm text-gray-600">Impact Level: ${prediction.impact}</p>
              <p class="text-sm text-gray-600">Timeframe: ${prediction.timeframe}</p>
              <p class="text-sm text-gray-600">AI Confidence: ${prediction.aiConfidence}%</p>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Data Sources</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Satellite Data</span>
                  <span class="text-green-600">Active</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Weather Models</span>
                  <span class="text-green-600">Active</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Sensor Networks</span>
                  <span class="text-green-600">Active</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Historical Data</span>
                  <span class="text-green-600">Analyzed</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-gray-900 mb-2">Risk Assessment</h4>
            <div class="bg-amber-50 p-4 rounded-lg">
              <p class="text-sm text-amber-800">
                Based on current atmospheric conditions and historical patterns, there is a ${prediction.probability}% 
                probability of ${prediction.type.toLowerCase()} occurrence in the specified timeframe. 
                Recommended actions include monitoring evacuation routes and preparing emergency resources.
              </p>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-gray-900 mb-2">Recommended Actions</h4>
            <ul class="text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Continue monitoring weather conditions</li>
              <li>Alert relevant emergency response teams</li>
              <li>Prepare evacuation procedures if necessary</li>
              <li>Coordinate with local authorities</li>
              <li>Update public information systems</li>
            </ul>
          </div>
        </div>
      `
    });
    setShowModal(true);
  };

  const handleAddPrediction = () => {
    if (newPrediction.type && newPrediction.location && newPrediction.timeframe) {
      const prediction = {
        id: predictions.length + 1,
        ...newPrediction,
        aiConfidence: Math.floor(Math.random() * 20) + 75 // Random confidence between 75-95
      };
      setPredictions([...predictions, prediction]);
      setNewPrediction({ type: '', location: '', probability: 50, impact: 'Medium', timeframe: '' });
      setShowAddPrediction(false);
    }
  };

  const handleExportReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      predictions,
      dataStreams,
      systemAccuracy: '94.3%'
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `early-warning-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 70) return 'text-red-600 bg-red-100';
    if (probability >= 40) return 'text-amber-600 bg-amber-100';
    return 'text-green-600 bg-green-100';
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-amber-600 bg-amber-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 relative">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Early Warning System</h2>
            <p className="text-gray-600">AI-powered disaster prediction and real-time monitoring</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowAddPrediction(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Prediction</span>
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

      {/* AI Status Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Eye className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900">AI Analysis Active</h3>
            <p className="text-sm text-blue-700">Processing 847 data sources • Next prediction update in 12 minutes</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-blue-900">System Accuracy</div>
            <div className="text-lg font-bold text-blue-600">94.3%</div>
          </div>
        </div>
      </div>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        {predictions.map((prediction) => (
          <div key={prediction.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getProbabilityColor(prediction.probability)}`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{prediction.type} Prediction</h3>
                  <p className="text-gray-600">{prediction.location}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getImpactColor(prediction.impact)}`}>
                {prediction.impact} Impact
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Probability</p>
                <p className="text-2xl font-bold text-gray-900">{prediction.probability}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      prediction.probability >= 70 ? 'bg-red-500' :
                      prediction.probability >= 40 ? 'bg-amber-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${prediction.probability}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">AI Confidence</p>
                <p className="text-2xl font-bold text-gray-900">{prediction.aiConfidence}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${prediction.aiConfidence}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Timeframe</p>
                <p className="text-lg font-semibold text-gray-900">{prediction.timeframe}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Actions</p>
                <button 
                  onClick={() => handleViewDetails(prediction)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Last updated: 3 minutes ago</span>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Trend: Increasing</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Data Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Data Sources</h3>
            <p className="text-sm text-gray-600">Real-time monitoring streams</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Satellite className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Satellite Imagery</p>
                  <p className="text-sm text-gray-600">Last update: {dataStreams.satellite.lastUpdate}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Active</span>
                </div>
                <p className="text-sm text-gray-600">{dataStreams.satellite.quality}% quality</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Cloud className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Weather Reports</p>
                  <p className="text-sm text-gray-600">Last update: {dataStreams.weather.lastUpdate}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Active</span>
                </div>
                <p className="text-sm text-gray-600">{dataStreams.weather.quality}% quality</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Wind className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Sensor Networks</p>
                  <p className="text-sm text-gray-600">Last update: {dataStreams.sensors.lastUpdate}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Active</span>
                </div>
                <p className="text-sm text-gray-600">{dataStreams.sensors.quality}% quality</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Social Media</p>
                  <p className="text-sm text-gray-600">Last update: {dataStreams.social.lastUpdate}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Active</span>
                </div>
                <p className="text-sm text-gray-600">{dataStreams.social.quality}% quality</p>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Map */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Risk Assessment Map</h3>
            <p className="text-sm text-gray-600">Geographic risk visualization</p>
          </div>
          <div className="p-6">
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Satellite className="w-8 h-8 text-blue-600" />
                </div>
                <p className="font-medium text-gray-900">Interactive Risk Map</p>
                <p className="text-sm text-gray-600">Real-time geographic risk assessment</p>
                <button 
                  onClick={() => setModalContent({
                    title: 'Interactive Risk Map',
                    content: `
                      <div class="space-y-4">
                        <div class="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-64 flex items-center justify-center relative">
                          <div class="absolute top-4 left-4 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                          <div class="absolute top-12 right-8 w-3 h-3 bg-amber-600 rounded-full animate-pulse"></div>
                          <div class="absolute bottom-8 left-12 w-3 h-3 bg-green-600 rounded-full"></div>
                          <div class="text-center">
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                              </svg>
                            </div>
                            <p class="font-medium text-gray-900">Geographic Risk Analysis</p>
                            <p class="text-sm text-gray-600">3 active risk zones identified</p>
                          </div>
                        </div>
                        <div class="grid grid-cols-3 gap-4 text-center">
                          <div class="bg-red-50 p-3 rounded-lg">
                            <p class="text-sm font-medium text-red-900">High Risk</p>
                            <p class="text-lg font-bold text-red-600">2 zones</p>
                          </div>
                          <div class="bg-amber-50 p-3 rounded-lg">
                            <p class="text-sm font-medium text-amber-900">Medium Risk</p>
                            <p class="text-lg font-bold text-amber-600">5 zones</p>
                          </div>
                          <div class="bg-green-50 p-3 rounded-lg">
                            <p class="text-sm font-medium text-green-900">Low Risk</p>
                            <p class="text-lg font-bold text-green-600">12 zones</p>
                          </div>
                        </div>
                      </div>
                    `
                  }) || setShowModal(true)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Open Full Map
                </button>
              </div>
            </div>
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

      {/* Add Prediction Modal */}
      {showAddPrediction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New Prediction</h3>
              <button
                onClick={() => setShowAddPrediction(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Disaster Type</label>
                <select
                  value={newPrediction.type}
                  onChange={(e) => setNewPrediction({...newPrediction, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="Hurricane">Hurricane</option>
                  <option value="Earthquake">Earthquake</option>
                  <option value="Wildfire">Wildfire</option>
                  <option value="Flood">Flood</option>
                  <option value="Tornado">Tornado</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newPrediction.location}
                  onChange={(e) => setNewPrediction({...newPrediction, location: e.target.value})}
                  placeholder="Enter location"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Probability (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newPrediction.probability}
                  onChange={(e) => setNewPrediction({...newPrediction, probability: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="text-center text-sm text-gray-600">{newPrediction.probability}%</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Impact Level</label>
                <select
                  value={newPrediction.impact}
                  onChange={(e) => setNewPrediction({...newPrediction, impact: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
                <input
                  type="text"
                  value={newPrediction.timeframe}
                  onChange={(e) => setNewPrediction({...newPrediction, timeframe: e.target.value})}
                  placeholder="e.g., 24-48 hours"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddPrediction}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add Prediction
                </button>
                <button
                  onClick={() => setShowAddPrediction(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarlyWarning;