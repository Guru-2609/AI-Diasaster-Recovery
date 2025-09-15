import React, { useState } from 'react';
import { MessageSquare, Users, Phone, Radio, Send, Bell, CheckCircle, Clock, X, Plus, Download } from 'lucide-react';

const Communication = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [newBroadcast, setNewBroadcast] = useState({ title: '', message: '', priority: 'normal' });

  const channels = [
    { id: 'general', name: 'General Command', members: 24, unread: 0 },
    { id: 'medical', name: 'Medical Teams', members: 15, unread: 3 },
    { id: 'rescue', name: 'Search & Rescue', members: 18, unread: 1 },
    { id: 'logistics', name: 'Logistics', members: 12, unread: 0 },
    { id: 'volunteers', name: 'Volunteer Coordination', members: 156, unread: 7 }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: (messages[activeChannel]?.length || 0) + 1,
        sender: 'You',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
        type: 'user',
        status: 'sent'
      };
      
      setMessages(prev => ({
        ...prev,
        [activeChannel]: [...(prev[activeChannel] || []), newMessage]
      }));
      setMessage('');
    }
  };

  const handleSendBroadcast = () => {
    if (newBroadcast.title && newBroadcast.message) {
      const broadcast = {
        id: broadcasts.length + 1,
        ...newBroadcast,
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
        status: 'sending',
        recipients: Math.floor(Math.random() * 10000) + 5000
      };
      
      setBroadcasts(prev => [broadcast, ...prev]);
      setNewBroadcast({ title: '', message: '', priority: 'normal' });
      setShowBroadcastModal(false);
      
      // Simulate broadcast completion
      setTimeout(() => {
        setBroadcasts(prev => prev.map(b => 
          b.id === broadcast.id ? { ...b, status: 'sent' } : b
        ));
      }, 3000);
    }
  };

  const handleExportCommunications = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      channels,
      messages,
      broadcasts,
      activeChannel
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `communication-log-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEmergencyCall = (contact) => {
    setModalContent({
      title: `Emergency Call - ${contact}`,
      content: `
        <div class="space-y-4">
          <div class="bg-red-50 p-4 rounded-lg">
            <h4 class="font-semibold text-red-900">Initiating Emergency Call</h4>
            <p class="text-sm text-red-700 mt-2">Connecting to ${contact}...</p>
          </div>
          
          <div class="bg-gray-100 rounded-lg p-6 text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
            </div>
            <p class="font-medium text-gray-900">Call Connected</p>
            <p class="text-sm text-gray-600">Duration: 00:00:15</p>
          </div>
          
          <div class="grid grid-cols-3 gap-3">
            <button class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">End Call</button>
            <button class="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">Mute</button>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Record</button>
          </div>
          
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-900">Call Information</h4>
            <div class="text-sm text-blue-700 mt-2 space-y-1">
              <p>Contact: ${contact}</p>
              <p>Priority: Emergency</p>
              <p>Encryption: Enabled</p>
              <p>Recording: Active</p>
            </div>
          </div>
        </div>
      `
    });
    setShowModal(true);
  };

  const [messages, setMessages] = useState({
    general: [
      {
        id: 1,
        sender: 'Command Center',
        message: 'Hurricane Category 3 confirmed. All teams prepare for deployment.',
        timestamp: '14:32',
        type: 'system',
        priority: 'high'
      },
      {
        id: 2,
        sender: 'Team Alpha Leader',
        message: 'Team Alpha in position at evacuation center. Ready to receive civilians.',
        timestamp: '14:35',
        type: 'user',
        status: 'delivered'
      },
      {
        id: 3,
        sender: 'Medical Coordinator',
        message: 'Medical supplies deployed to forward triage center. ETA 20 minutes.',
        timestamp: '14:38',
        type: 'user',
        status: 'read'
      }
    ],
    medical: [
      {
        id: 1,
        sender: 'Dr. Sarah Chen',
        message: 'Need additional morphine and bandages at triage center B.',
        timestamp: '14:40',
        type: 'user',
        priority: 'urgent'
      },
      {
        id: 2,
        sender: 'Paramedic Unit 7',
        message: '3 critical patients incoming, ETA 15 minutes.',
        timestamp: '14:42',
        type: 'user',
        priority: 'high'
      }
    ]
  });

  const [broadcasts, setBroadcasts] = useState([
    {
      id: 1,
      title: 'Evacuation Order - Zone A',
      message: 'Immediate evacuation required for all residents in coastal Zone A. Emergency shelters available.',
      timestamp: '14:25',
      status: 'sent',
      recipients: 15420
    },
    {
      id: 2,
      title: 'Road Closure Alert',
      message: 'Highway 101 closed due to flooding. Use alternate Route 23 for emergency vehicles only.',
      timestamp: '14:30',
      status: 'sending',
      recipients: 2340
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-l-4 border-red-500 bg-red-50';
      case 'high': return 'border-l-4 border-amber-500 bg-amber-50';
      default: return 'border-l-4 border-blue-500 bg-blue-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'read': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'sent': return <Clock className="w-4 h-4 text-gray-600" />;
      default: return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 relative">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Communication Center</h2>
            <p className="text-gray-600">Centralized coordination and emergency broadcasting</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowBroadcastModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
            >
              <Bell className="w-4 h-4" />
              <span>New Broadcast</span>
            </button>
            <button
              onClick={handleExportCommunications}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Log</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Communication Channels */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Team Channels</h3>
                <button 
                  onClick={() => setModalContent({
                    title: 'Create New Channel',
                    content: `
                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1">Channel Name</label>
                          <input type="text" placeholder="Enter channel name" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea placeholder="Channel description" class="w-full border border-gray-300 rounded-lg px-3 py-2 h-20"></textarea>
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
                          <select class="w-full border border-gray-300 rounded-lg px-3 py-2">
                            <option>Public</option>
                            <option>Team Leaders Only</option>
                            <option>Command Staff Only</option>
                          </select>
                        </div>
                        <button class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg">Create Channel</button>
                      </div>
                    `
                  }) || setShowModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  New Channel
                </button>
              </div>
            </div>

            {/* Channel Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeChannel === channel.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {channel.name}
                    {channel.unread > 0 && (
                      <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                        {channel.unread}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6">
              <div className="space-y-4">
                {(messages[activeChannel] || []).map((msg) => (
                  <div key={msg.id} className={`p-4 rounded-lg ${msg.type === 'system' ? getPriorityColor(msg.priority) : 'bg-gray-50'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{msg.sender}</span>
                          <span className="text-xs text-gray-500">{msg.timestamp}</span>
                          {msg.priority && (
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              msg.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                              msg.priority === 'high' ? 'bg-amber-100 text-amber-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {msg.priority}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-800">{msg.message}</p>
                      </div>
                      {msg.status && getStatusIcon(msg.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Emergency Broadcast */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Emergency Broadcast</h3>
              <p className="text-sm text-gray-600">Public alert system</p>
            </div>
            <div className="p-6">
              <button 
                onClick={() => setShowBroadcastModal(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 mb-4"
              >
                <Bell className="w-4 h-4" />
                <span>Send Emergency Alert</span>
              </button>
              
              <div className="space-y-3">
                {broadcasts.map((broadcast) => (
                  <div key={broadcast.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{broadcast.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        broadcast.status === 'sent' ? 'bg-green-100 text-green-700' :
                        broadcast.status === 'sending' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {broadcast.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{broadcast.message}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{broadcast.timestamp}</span>
                      <span>{broadcast.recipients.toLocaleString()} recipients</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Contacts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Contacts</h3>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Emergency Command</span>
                </div>
                <button 
                  onClick={() => handleEmergencyCall('Emergency Command')}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Phone className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Medical Dispatch</span>
                </div>
                <button 
                  onClick={() => handleEmergencyCall('Medical Dispatch')}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Phone className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-sm font-medium">Fire Department</span>
                </div>
                <button 
                  onClick={() => handleEmergencyCall('Fire Department')}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Phone className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Police HQ</span>
                </div>
                <button 
                  onClick={() => handleEmergencyCall('Police HQ')}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Phone className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Channel Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Channel Info</h3>
            </div>
            <div className="p-6">
              {channels.find(ch => ch.id === activeChannel) && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {channels.find(ch => ch.id === activeChannel).name}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                    <Users className="w-4 h-4" />
                    <span>{channels.find(ch => ch.id === activeChannel).members} members online</span>
                  </div>
                  <button 
                    onClick={() => setModalContent({
                      title: 'Channel Management',
                      content: `
                        <div class="space-y-4">
                          <div class="bg-gray-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-900">Channel: ${channels.find(ch => ch.id === activeChannel).name}</h4>
                            <p class="text-sm text-gray-600 mt-1">${channels.find(ch => ch.id === activeChannel).members} active members</p>
                          </div>
                          
                          <div class="grid grid-cols-2 gap-3">
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Add Members</button>
                            <button class="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm">Channel Settings</button>
                            <button class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">Export History</button>
                            <button class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">Archive Channel</button>
                          </div>
                          
                          <div class="bg-blue-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-blue-900">Channel Statistics</h4>
                            <div class="text-sm text-blue-700 mt-2 space-y-1">
                              <p>Messages today: ${Math.floor(Math.random() * 100) + 50}</p>
                              <p>Active users: ${channels.find(ch => ch.id === activeChannel).members}</p>
                              <p>Last activity: 2 minutes ago</p>
                            </div>
                          </div>
                        </div>
                      `
                    }) || setShowModal(true)}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Manage Channel
                  </button>
                </div>
              )}
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

      {/* Broadcast Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Send Emergency Broadcast</h3>
              <button
                onClick={() => setShowBroadcastModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alert Title</label>
                <input
                  type="text"
                  value={newBroadcast.title}
                  onChange={(e) => setNewBroadcast({...newBroadcast, title: e.target.value})}
                  placeholder="Enter alert title"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={newBroadcast.message}
                  onChange={(e) => setNewBroadcast({...newBroadcast, message: e.target.value})}
                  placeholder="Enter broadcast message"
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
                <select
                  value={newBroadcast.priority}
                  onChange={(e) => setNewBroadcast({...newBroadcast, priority: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900">Broadcast Reach</h4>
                <p className="text-sm text-amber-700">This message will be sent to all registered emergency contacts and public alert systems.</p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSendBroadcast}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Send Broadcast
                </button>
                <button
                  onClick={() => setShowBroadcastModal(false)}
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

export default Communication;