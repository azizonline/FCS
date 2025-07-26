import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  Download, 
  Calendar, 
  HardDrive, 
  Star,
  ExternalLink,
  Eye
} from 'lucide-react';
import { formatFileSize, formatDate } from '../lib/utils.js';

export default function SoftwareCard({ software, onDownload, onView }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      if (onDownload) {
        await onDownload(software);
      } else {
        // Direct download from cloud storage
        window.open(software.fileUrl, '_blank');
      }
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleView = () => {
    if (onView) {
      onView(software);
    }
  };

  return (
    <Card className="card-hover h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight mb-1 truncate">
              {software.name}
            </h3>
            {software.version && (
              <Badge variant="secondary" className="text-xs">
                v{software.version}
              </Badge>
            )}
          </div>
          {software.featured && (
            <Star className="h-4 w-4 text-yellow-500 fill-current flex-shrink-0 ml-2" />
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {software.description || 'No description available.'}
        </p>

        <div className="space-y-2">
          {software.category && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {software.category.name}
              </Badge>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <HardDrive className="h-3 w-3" />
              <span>{software.fileSize ? formatFileSize(Number(software.fileSize)) : 'Unknown size'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-3 w-3" />
              <span>{software.downloadCount || 0} downloads</span>
            </div>
          </div>

          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Added {formatDate(software.createdAt)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        <Button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex-1"
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" />
          {isDownloading ? 'Downloading...' : 'Download'}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleView}
          className="px-3"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

