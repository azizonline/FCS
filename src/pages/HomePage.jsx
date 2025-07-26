import { useState, useEffect } from 'react';
import { Download, FileText, Calendar } from 'lucide-react';

const HomePage = () => {
  const [software, setSoftware] = useState([]);
  const [loading, setLoading] = useState(true);

  // Specified software only
  const specifiedSoftware = [
    {
      id: 1,
      name: 'Windows 11',
      description: 'Latest Windows operating system with enhanced security and productivity features.',
      version: '23H2',
      fileUrl: 'https://example.com/windows11.iso',
      fileSize: 5400000000,
      downloadCount: 89230,
      createdAt: new Date('2024-01-05')
    },
    {
      id: 2,
      name: 'Microsoft Office 2021',
      description: 'Complete productivity suite including Word, Excel, PowerPoint, and Outlook.',
      version: '2021',
      fileUrl: 'https://example.com/office2021.exe',
      fileSize: 3200000000,
      downloadCount: 78940,
      createdAt: new Date('2024-01-10')
    },
    {
      id: 3,
      name: 'Adobe Premiere Pro 2024',
      description: 'Professional video editing software for filmmakers and content creators.',
      version: '24.0',
      fileUrl: 'https://example.com/premiere2024.exe',
      fileSize: 2800000000,
      downloadCount: 28940,
      createdAt: new Date('2024-01-12')
    },
    {
      id: 4,
      name: 'Adobe After Effects 2024',
      description: 'Motion graphics and visual effects software for video post-production.',
      version: '24.0',
      fileUrl: 'https://example.com/aftereffects2024.exe',
      fileSize: 2800000000,
      downloadCount: 24670,
      createdAt: new Date('2024-01-10')
    },
    {
      id: 5,
      name: 'Adobe Illustrator 2024',
      description: 'Vector graphics and illustration software for creating logos, icons, and artwork.',
      version: '28.0',
      fileUrl: 'https://example.com/illustrator2024.exe',
      fileSize: 1800000000,
      downloadCount: 32150,
      createdAt: new Date('2024-01-08')
    },
    {
      id: 6,
      name: 'Adobe Photoshop 2024',
      description: 'Industry-standard image editing and graphic design software with advanced AI features.',
      version: '25.0',
      fileUrl: 'https://example.com/photoshop2024.exe',
      fileSize: 2100000000,
      downloadCount: 45230,
      createdAt: new Date('2024-01-15')
    },
    {
      id: 7,
      name: 'Adobe Lightroom Classic 2024',
      description: 'Professional photo editing and organization software for photographers.',
      version: '13.0',
      fileUrl: 'https://example.com/lightroom2024.exe',
      fileSize: 1400000000,
      downloadCount: 22180,
      createdAt: new Date('2024-01-09')
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setSoftware(specifiedSoftware);
      setLoading(false);
    }, 500);
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading software...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">SoftHub</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Software Downloads
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Download the latest versions of essential software for professionals and creators.
          </p>
        </div>

        {/* Software Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {software.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                      v{item.version}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {item.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>{formatFileSize(item.fileSize)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Download className="h-4 w-4 mr-2" />
                    <span>{formatNumber(item.downloadCount)} downloads</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Added {formatDate(item.createdAt)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => window.open(item.fileUrl, '_blank')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-gray-200">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="text-2xl font-bold text-gray-900">SoftHub</span>
            </div>
            <p className="text-gray-600 mb-4">
              Your trusted source for professional software downloads.
            </p>
            <p className="text-sm text-gray-500">
              © 2025 SoftHub. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomePage;

