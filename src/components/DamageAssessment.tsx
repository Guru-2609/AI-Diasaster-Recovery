import React, { useState } from 'react';
import { Camera, MapPin, Zap, Upload, CheckCircle, AlertCircle, Clock, Eye, X, Download, Plus } from 'lucide-react';

const DamageAssessment = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [assessments, setAssessments] = useState([
    {
      id: 1,
      location: 'Miami Beach, FL',
      type: 'Hurricane Damage',
      severity: 'Severe',
      confidence: 94,
      timestamp: '2 hours ago',
      status: 'Complete',
      structures: { damaged: 247, destroyed: 89, intact: 1456 },
      roads: { blocked: 12, damaged: 34, operational: 156 }
    },
    {
      id: 2,
      location: 'Sonoma County, CA',
      type: 'Wildfire Damage',
      severity: 'Moderate',
      confidence: 87,
      timestamp: '4 hours ago',
      status: 'Processing',
      structures: { damaged: 89, destroyed: 23, intact: 2341 },
      roads: { blocked: 5, damaged: 18, operational: 234 }
    },
    {
      id: 3,
      location: 'Houston Metro, TX',
      type: 'Flood Assessment',
      severity: 'Light',
      confidence: 91,
      timestamp: '6 hours ago',
      status: 'Complete',
      structures: { damaged: 34, destroyed: 2, intact: 3456 },
      roads: { blocked: 3, damaged: 12, operational: 345 }
    }
  ]);

  const handleViewDetails = (assessment) => {
    setModalContent({
      title: `Damage Assessment - ${assessment.location}`,
      content: `
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">Assessment Overview</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Location:</span>
                  <span class="font-medium">${assessment.location}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Type:</span>
                  <span class="font-medium">${assessment.type}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Severity:</span>
                  <span class="font-medium text-${assessment.severity === 'Severe' ? 'red' : assessment.severity === 'Moderate' ? 'amber' : 'green'}-600">${assessment.severity}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">AI Confidence:</span>
                  <span class="font-medium">${assessment.confidence}%</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Status:</span>
                  <span class="font-medium text-${assessment.status === 'Complete' ? 'green' : 'amber'}-600">${assessment.status}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">Impact Analysis</h4>
              <div class="space-y-3">
                <div class="bg-gray-50 p-3 rounded-lg">
                  <h5 class="font-medium text-gray-900 mb-2">Structures</h5>
                  <div class="text-sm space-y-1">
                    <div class="flex justify-between">
                      <span class="text-green-600">Intact:</span>
                      <span>${assessment.structures.intact.toLocaleString()}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-amber-600">Damaged:</span>
                      <span>${assessment.structures.damaged.toLocaleString()}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-red-600">Destroyed:</span>
                      <span>${assessment.structures.destroyed.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-3 rounded-lg">
                  <h5 class="font-medium text-gray-900 mb-2">Infrastructure</h5>
                  <div class="text-sm space-y-1">
                    <div class="flex justify-between">
                      <span class="text-green-600">Operational:</span>
                      <span>${assessment.roads.operational}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-amber-600">Damaged:</span>
                      <span>${assessment.roads.damaged}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-red-600">Blocked:</span>
                      <span>${assessment.roads.blocked}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-gray-900 mb-3">AI Analysis Report</h4>
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-sm text-blue-800">
                The AI analysis indicates ${assessment.severity.toLowerCase()} damage levels in the ${assessment.location} area. 
                Based on satellite imagery and drone footage analysis, approximately ${assessment.structures.damaged + assessment.structures.destroyed} 
                structures require immediate attention. Priority should be given to search and rescue operations in areas with 
                destroyed buildings, while damaged structures need structural assessment before reoccupation.
              </p>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-gray-900 mb-3">Recommended Actions</h4>
            <ul class="text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Deploy search and rescue teams to destroyed building locations</li>
              <li>Conduct structural assessments of damaged buildings</li>
              <li>Clear blocked roads for emergency vehicle access</li>
              <li>Establish temporary shelters for displaced residents</li>
              <li>Coordinate with utility companies for infrastructure repair</li>
            </ul>
          </div>
        </div>
      `
    });
    setShowModal(true);
  };

  const handleExportReport = (assessment) => {
    const reportData = {
      timestamp: new Date().toISOString(),
      assessment,
      analysisDetails: {
        totalStructures: assessment.structures.intact + assessment.structures.damaged + assessment.structures.destroyed,
        damagePercentage: ((assessment.structures.damaged + assessment.structures.destroyed) / 
          (assessment.structures.intact + assessment.structures.damaged + assessment.structures.destroyed) * 100).toFixed(1),
        infrastructureStatus: assessment.roads,
        aiConfidence: assessment.confidence
      }
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `damage-assessment-${assessment.location.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadFiles(files);
    setShowUploadModal(true);
  };

  const processUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add new assessment based on uploaded files
          const newAssessment = {
            id: assessments.length + 1,
            location: 'New Assessment Area',
            type: 'AI Analysis from Upload',
            severity: ['Light', 'Moderate', 'Severe'][Math.floor(Math.random() * 3)],
            confidence: Math.floor(Math.random() * 20) + 80,
            timestamp: 'Just now',
            status: 'Complete',
            structures: {
              damaged: Math.floor(Math.random() * 100) + 50,
              destroyed: Math.floor(Math.random() * 50) + 10,
              intact: Math.floor(Math.random() * 1000) + 500
            },
            roads: {
              blocked: Math.floor(Math.random() * 10) + 2,
              damaged: Math.floor(Math.random() * 20) + 5,
              operational: Math.floor(Math.random() * 100) + 50
            }
          };
          
          setAssessments(prev => [newAssessment, ...prev]);
          setShowUploadModal(false);
          setUploadFiles([]);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Severe': return 'text-red-600 bg-red-100 border-red-200';
      case 'Moderate': return 'text-amber-600 bg-amber-100 border-amber-200';
      case 'Light': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete': return 'text-green-600 bg-green-100';
      case 'Processing': return 'text-amber-600 bg-amber-100';
      case 'Queued': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 relative">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Damage Assessment</h2>
        <p className="text-gray-600">AI-powered damage analysis and impact evaluation</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">New Assessment</h3>
          <p className="text-sm text-gray-600">Upload satellite imagery or drone footage for AI analysis</p>
        </div>
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Images or Video</h4>
            <p className="text-sm text-gray-600 mb-4">Drag and drop files or click to browse</p>
            <div className="flex justify-center space-x-4">
              <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer">
                Choose Files
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <button 
                onClick={() => setModalContent({
                  title: 'Drone Capture Interface',
                  content: `
                    <div class="space-y-4">
                      <div class="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                        <div class="text-center">
                          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"></path>
                            </svg>
                          </div>
                          <p class="font-medium text-gray-900">Drone Camera Feed</p>
                          <p class="text-sm text-gray-600">Live aerial surveillance</p>
                        </div>
                      </div>
                      <div class="grid grid-cols-2 gap-4">
                        <button class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">Start Recording</button>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Capture Image</button>
                      </div>
                      <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-blue-900">Drone Status</h4>
                        <p class="text-sm text-blue-700">✓ Connected to Drone Unit Alpha-7</p>
                        <p class="text-sm text-blue-700">✓ GPS Lock: 12 satellites</p>
                        <p class="text-sm text-blue-700">✓ Battery: 87%</p>
                        <p class="text-sm text-blue-700">✓ Altitude: 150ft</p>
                      </div>
                    </div>
                  `
                }) || setShowModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Capture from Drone
              </button>
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Process Upload</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Selected Files</h4>
                <div className="space-y-2">
                  {uploadFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {isUploading && (
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Processing...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={processUpload}
                  disabled={isUploading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {isUploading ? 'Processing...' : 'Start AI Analysis'}
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  disabled={isUploading}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Assessment Results */}
      <div className="space-y-6">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg border ${getSeverityColor(assessment.severity)}`}>
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{assessment.location}</h3>
                    <p className="text-gray-600">{assessment.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(assessment.status)}`}>
                    {assessment.status}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getSeverityColor(assessment.severity)}`}>
                    {assessment.severity}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* AI Confidence */}
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 30}`}
                        strokeDashoffset={`${2 * Math.PI * 30 * (1 - assessment.confidence / 100)}`}
                        className="text-blue-600"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">{assessment.confidence}%</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">AI Confidence</p>
                </div>

                {/* Structures */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Structures Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Intact</span>
                      <span className="font-medium text-green-600">{assessment.structures.intact.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Damaged</span>
                      <span className="font-medium text-amber-600">{assessment.structures.damaged.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Destroyed</span>
                      <span className="font-medium text-red-600">{assessment.structures.destroyed.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Roads */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Infrastructure</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Operational</span>
                      <span className="font-medium text-green-600">{assessment.roads.operational}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Damaged</span>
                      <span className="font-medium text-amber-600">{assessment.roads.damaged}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Blocked</span>
                      <span className="font-medium text-red-600">{assessment.roads.blocked}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{assessment.timestamp}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>GPS Coordinates Available</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleViewDetails(assessment)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button 
                    onClick={() => handleExportReport(assessment)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Processing Queue */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Processing Queue</h3>
          <p className="text-sm text-gray-600">Current AI analysis workload</p>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">3 assessments in queue</p>
                <p className="text-sm text-gray-600">Average processing time: 15 minutes</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">GPU Usage</p>
              <p className="text-lg font-bold text-blue-600">67%</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Phoenix Metro Wildfire</span>
              </div>
              <span className="text-sm text-gray-600">Processing... 45%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm font-medium">New Orleans Flood</span>
              </div>
              <span className="text-sm text-gray-600">Queued</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm font-medium">Seattle Earthquake</span>
              </div>
              <span className="text-sm text-gray-600">Queued</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DamageAssessment;