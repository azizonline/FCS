import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import SoftwareCard from '../components/SoftwareCard.jsx';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  SortAsc, 
  SortDesc,
  X
} from 'lucide-react';

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [software, setSoftware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Adobe and Microsoft categories
  const categories = [
    'Adobe Creative Suite',
    'Microsoft Office',
    'Microsoft Windows'
  ];

  // Mock software data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockSoftware = [
        // Adobe Creative Suite
        {
          id: 1,
          name: 'Adobe Photoshop 2024',
          description: 'Industry-standard image editing and graphic design software with advanced AI features.',
          version: '25.0',
          category: { name: 'Adobe Creative Suite' },
          fileUrl: 'https://example.com/photoshop2024.exe',
          fileSize: 2100000000,
          downloadCount: 45230,
          featured: true,
          createdAt: new Date('2024-01-15')
        },
        {
          id: 2,
          name: 'Adobe Illustrator 2024',
          description: 'Vector graphics and illustration software for creating logos, icons, and artwork.',
          version: '28.0',
          category: { name: 'Adobe Creative Suite' },
          fileUrl: 'https://example.com/illustrator2024.exe',
          fileSize: 1800000000,
          downloadCount: 32150,
          featured: true,
          createdAt: new Date('2024-01-08')
        },
        {
          id: 3,
          name: 'Adobe Premiere Pro 2024',
          description: 'Professional video editing software for filmmakers and content creators.',
          version: '24.0',
          category: { name: 'Adobe Creative Suite' },
          fileUrl: 'https://example.com/premiere2024.exe',
          fileSize: 2800000000,
          downloadCount: 28940,
          featured: false,
          createdAt: new Date('2024-01-12')
        },
        {
          id: 4,
          name: 'Adobe After Effects 2024',
          description: 'Motion graphics and visual effects software for video post-production.',
          version: '24.0',
          category: { name: 'Adobe Creative Suite' },
          fileUrl: 'https://example.com/aftereffects2024.exe',
          fileSize: 2800000000,
          downloadCount: 24670,
          featured: false,
          createdAt: new Date('2024-01-10')
        },
        {
          id: 5,
          name: 'Adobe InDesign 2024',
          description: 'Desktop publishing software for creating layouts and print designs.',
          version: '19.0',
          category: { name: 'Adobe Creative Suite' },
          fileUrl: 'https://example.com/indesign2024.exe',
          fileSize: 1600000000,
          downloadCount: 18450,
          featured: false,
          createdAt: new Date('2024-01-14')
        },
        {
          id: 6,
          name: 'Adobe Lightroom 2024',
          description: 'Photo editing and organization software for photographers.',
          version: '13.0',
          category: { name: 'Adobe Creative Suite' },
          fileUrl: 'https://example.com/lightroom2024.exe',
          fileSize: 1400000000,
          downloadCount: 22180,
          featured: false,
          createdAt: new Date('2024-01-09')
        },
        
        // Microsoft Office
        {
          id: 7,
          name: 'Microsoft Office 2021',
          description: 'Complete productivity suite including Word, Excel, PowerPoint, and Outlook.',
          version: '2021',
          category: { name: 'Microsoft Office' },
          fileUrl: 'https://example.com/office2021.exe',
          fileSize: 3200000000,
          downloadCount: 78940,
          featured: true,
          createdAt: new Date('2024-01-10')
        },
        {
          id: 8,
          name: 'Microsoft Word 2021',
          description: 'Word processing software for creating documents and reports.',
          version: '2021',
          category: { name: 'Microsoft Office' },
          fileUrl: 'https://example.com/word2021.exe',
          fileSize: 1200000000,
          downloadCount: 45670,
          featured: false,
          createdAt: new Date('2024-01-11')
        },
        {
          id: 9,
          name: 'Microsoft Excel 2021',
          description: 'Spreadsheet software for data analysis and calculations.',
          version: '2021',
          category: { name: 'Microsoft Office' },
          fileUrl: 'https://example.com/excel2021.exe',
          fileSize: 1100000000,
          downloadCount: 52340,
          featured: false,
          createdAt: new Date('2024-01-13')
        },
        {
          id: 10,
          name: 'Microsoft PowerPoint 2021',
          description: 'Presentation software for creating slideshows and presentations.',
          version: '2021',
          category: { name: 'Microsoft Office' },
          fileUrl: 'https://example.com/powerpoint2021.exe',
          fileSize: 1000000000,
          downloadCount: 38920,
          featured: false,
          createdAt: new Date('2024-01-12')
        },
        {
          id: 11,
          name: 'Microsoft Outlook 2021',
          description: 'Email client and personal information manager.',
          version: '2021',
          category: { name: 'Microsoft Office' },
          fileUrl: 'https://example.com/outlook2021.exe',
          fileSize: 900000000,
          downloadCount: 34560,
          featured: false,
          createdAt: new Date('2024-01-14')
        },
        
        // Microsoft Windows
        {
          id: 12,
          name: 'Windows 11 Pro',
          description: 'Latest Windows operating system with enhanced security and productivity features.',
          version: '23H2',
          category: { name: 'Microsoft Windows' },
          fileUrl: 'https://example.com/windows11pro.iso',
          fileSize: 5400000000,
          downloadCount: 89230,
          featured: true,
          createdAt: new Date('2024-01-05')
        },
        {
          id: 13,
          name: 'Windows 11 Home',
          description: 'Windows 11 Home edition for personal and home use.',
          version: '23H2',
          category: { name: 'Microsoft Windows' },
          fileUrl: 'https://example.com/windows11home.iso',
          fileSize: 5200000000,
          downloadCount: 76540,
          featured: false,
          createdAt: new Date('2024-01-06')
        },
        {
          id: 14,
          name: 'Windows 10 Pro',
          description: 'Stable Windows 10 Professional edition with extended support.',
          version: '22H2',
          category: { name: 'Microsoft Windows' },
          fileUrl: 'https://example.com/windows10pro.iso',
          fileSize: 4800000000,
          downloadCount: 65430,
          featured: false,
          createdAt: new Date('2024-01-07')
        },
        {
          id: 15,
          name: 'Windows 10 Home',
          description: 'Windows 10 Home edition for personal computers.',
          version: '22H2',
          category: { name: 'Microsoft Windows' },
          fileUrl: 'https://example.com/windows10home.iso',
          fileSize: 4600000000,
          downloadCount: 58920,
          featured: false,
          createdAt: new Date('2024-01-08')
        }
      ];

      // Filter and sort
      let filtered = mockSoftware;

      if (searchQuery) {
        filtered = filtered.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter(item => 
          item.category.name.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      // Sort
      filtered.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortBy) {
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'downloads':
            aValue = a.downloadCount;
            bValue = b.downloadCount;
            break;
          case 'date':
            aValue = new Date(a.createdAt);
            bValue = new Date(b.createdAt);
            break;
          case 'size':
            aValue = a.fileSize || 0;
            bValue = b.fileSize || 0;
            break;
          default:
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
        }

        if (sortOrder === 'desc') {
          return aValue < bValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });

      setSoftware(filtered);
      setLoading(false);
    }, 500);
  }, [searchQuery, selectedCategory, sortBy, sortOrder]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      newParams.set('search', searchQuery);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSearchParams(new URLSearchParams());
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(software.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSoftware = software.slice(startIndex, startIndex + itemsPerPage);

  const hasActiveFilters = searchQuery || selectedCategory;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Adobe & Microsoft Software</h1>
        <p className="text-muted-foreground">
          Discover and download from our collection of {software.length} Adobe and Microsoft applications
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search software..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Options */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="downloads">Downloads</SelectItem>
                <SelectItem value="date">Date Added</SelectItem>
                <SelectItem value="size">File Size</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>

            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary">
                Search: {searchQuery}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('search');
                    setSearchParams(newParams);
                  }}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary">
                Category: {selectedCategory}
                <button
                  onClick={() => handleCategoryChange('')}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading software...</p>
        </div>
      ) : software.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">No software found matching your criteria.</p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, software.length)} of {software.length} results
            </p>
          </div>

          {/* Software Grid/List */}
          <div className={viewMode === 'grid' ? 'software-grid' : 'space-y-4'}>
            {paginatedSoftware.map((item) => (
              <SoftwareCard
                key={item.id}
                software={item}
                onView={(software) => {
                  window.location.href = `/software/${software.id}`;
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

