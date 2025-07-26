import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  Download, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  LogOut,
  BarChart3,
  Package,
  Users,
  TrendingUp,
  Eye,
  Settings
} from 'lucide-react';

export default function AdminDashboard() {
  const [software, setSoftware] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // Load data
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data
    setSoftware([
      {
        id: 1,
        name: 'Adobe Photoshop 2024',
        version: '25.0',
        category: 'Adobe Creative Suite',
        fileSize: 2100000000,
        downloadCount: 45230,
        status: 'active',
        createdAt: new Date('2024-01-15')
      },
      {
        id: 2,
        name: 'Microsoft Office 2021',
        version: '2021',
        category: 'Microsoft Office',
        fileSize: 3200000000,
        downloadCount: 78940,
        status: 'active',
        createdAt: new Date('2024-01-10')
      },
      {
        id: 3,
        name: 'Adobe Illustrator 2024',
        version: '28.0',
        category: 'Adobe Creative Suite',
        fileSize: 1800000000,
        downloadCount: 32150,
        status: 'active',
        createdAt: new Date('2024-01-08')
      },
      {
        id: 4,
        name: 'Windows 11 Pro',
        version: '23H2',
        category: 'Microsoft Windows',
        fileSize: 5400000000,
        downloadCount: 89230,
        status: 'active',
        createdAt: new Date('2024-01-05')
      }
    ]);

    setStats({
      totalSoftware: 52,
      totalDownloads: 456789,
      activeUsers: 12543,
      monthlyGrowth: 15.3
    });

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const filteredSoftware = software.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Download className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold">SoftHub Admin</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/')}>
                <Eye className="h-4 w-4 mr-2" />
                View Site
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Software</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(stats.totalSoftware)}</div>
              <p className="text-xs text-muted-foreground">Adobe Creative Suite, Office & Windows</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(stats.totalDownloads)}</div>
              <p className="text-xs text-muted-foreground">All time downloads</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(stats.activeUsers)}</div>
              <p className="text-xs text-muted-foreground">Monthly active users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{stats.monthlyGrowth}%</div>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Software Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Software Management</CardTitle>
              <Button onClick={() => navigate('/admin/software/add')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Software
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search software..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Software List */}
            <div className="space-y-4">
              {filteredSoftware.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          v{item.version} • {item.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-muted-foreground">
                        {formatFileSize(item.fileSize)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatNumber(item.downloadCount)} downloads
                      </span>
                      <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/admin/software/edit/${item.id}`)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      if (confirm('Are you sure you want to delete this software?')) {
                        setSoftware(software.filter(s => s.id !== item.id));
                      }
                    }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredSoftware.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No software found matching your search.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

