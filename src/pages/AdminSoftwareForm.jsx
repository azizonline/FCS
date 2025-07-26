import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Alert, AlertDescription } from '@/components/ui/alert.jsx';
import { 
  Download, 
  ArrowLeft, 
  Upload,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function AdminSoftwareForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    version: '',
    category: '',
    fileUrl: '',
    fileSize: '',
    featured: false
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    'Adobe Creative Suite',
    'Microsoft Office',
    'Microsoft Windows'
  ];

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    if (isEdit) {
      loadSoftware();
    }
  }, [navigate, isEdit, id]);

  const loadSoftware = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data for editing
    const mockSoftware = {
      1: {
        name: 'Adobe Photoshop 2024',
        description: 'Industry-standard image editing and graphic design software with advanced AI features.',
        version: '25.0',
        category: 'Adobe Creative Suite',
        fileUrl: 'https://example.com/photoshop2024.exe',
        fileSize: '2100000000',
        featured: true
      },
      2: {
        name: 'Microsoft Office 2021',
        description: 'Complete productivity suite including Word, Excel, PowerPoint, and Outlook.',
        version: '2021',
        category: 'Microsoft Office',
        fileUrl: 'https://example.com/office2021.exe',
        fileSize: '3200000000',
        featured: true
      }
    };

    const software = mockSoftware[id];
    if (software) {
      setFormData(software);
    }
    
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate form
      if (!formData.name || !formData.description || !formData.version || !formData.category) {
        throw new Error('Please fill in all required fields');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(isEdit ? 'Software updated successfully!' : 'Software added successfully!');
      
      // Redirect after success
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
      
    } catch (err) {
      setError(err.message || 'An error occurred while saving');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const num = parseInt(bytes);
    if (isNaN(num)) return bytes;
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(num) / Math.log(k));
    return parseFloat((num / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading && isEdit) {
    return (
      <div className="min-h-screen bg-muted/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading software...</p>
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
              <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Download className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold">SoftHub Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>
                {isEdit ? 'Edit Software' : 'Add New Software'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Software Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Adobe Photoshop 2024"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="version">Version *</Label>
                    <Input
                      id="version"
                      placeholder="e.g., 25.0"
                      value={formData.version}
                      onChange={(e) => handleInputChange('version', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the software features and capabilities..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fileUrl">Download URL</Label>
                  <Input
                    id="fileUrl"
                    type="url"
                    placeholder="https://your-cloud-storage.com/file.exe"
                    value={formData.fileUrl}
                    onChange={(e) => handleInputChange('fileUrl', e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload your file to IBM Cloud Object Storage and paste the direct download URL here
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fileSize">File Size (bytes)</Label>
                  <Input
                    id="fileSize"
                    type="number"
                    placeholder="e.g., 2100000000"
                    value={formData.fileSize}
                    onChange={(e) => handleInputChange('fileSize', e.target.value)}
                  />
                  {formData.fileSize && (
                    <p className="text-sm text-muted-foreground">
                      Size: {formatFileSize(formData.fileSize)}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="featured">Featured software (show on homepage)</Label>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? 'Saving...' : (isEdit ? 'Update Software' : 'Add Software')}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate('/admin/dashboard')}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Cloud Storage Instructions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>File Upload Instructions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">IBM Cloud Object Storage (Recommended)</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Sign up for IBM Cloud (25GB free)</li>
                    <li>Create a Cloud Object Storage instance</li>
                    <li>Create a bucket with public read access</li>
                    <li>Upload your software file</li>
                    <li>Copy the public URL and paste it above</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Alternative Options</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Degoo (100GB free) - Generate shareable links</li>
                    <li>MEGA (50GB free) - Use direct download links</li>
                    <li>Any cloud storage with direct download support</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

