
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RatingWidget from '@/components/widgets/RatingWidget';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const mockVideos = [
  {
    id: '1',
    title: 'Neural Networks Explained',
    author: 'Tech Academy',
    duration: '18:45',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    description: 'An in-depth explanation of neural networks and their applications in machine learning.',
  },
  {
    id: '2',
    title: 'Deep Learning Fundamentals',
    author: 'AI Research Lab',
    duration: '24:12',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    description: 'Learn about the core concepts of deep learning and how they apply to real-world problems.',
  },
  {
    id: '3',
    title: 'Machine Learning Tutorial',
    author: 'Code Academy',
    duration: '32:07',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    description: 'A comprehensive tutorial on machine learning algorithms and implementation techniques.',
  },
  {
    id: '4',
    title: 'AI Ethics and Bias',
    author: 'Tech Ethics Channel',
    duration: '16:30',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    description: 'Exploring ethical considerations and bias issues in artificial intelligence systems.',
  },
];

const VideoTab = () => {
  const [savedVideos, setSavedVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSaveVideo = (id: string) => {
    if (savedVideos.includes(id)) {
      setSavedVideos(savedVideos.filter(videoId => videoId !== id));
    } else {
      setSavedVideos([...savedVideos, id]);
    }
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more videos
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-pastel-purple/30 to-pastel-blue/30 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">Learning Videos</h2>
        <p className="text-muted-foreground">
          Curated video content to help you understand machine learning concepts visually.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockVideos.map((video) => (
          <Card key={video.id} className="grid-item overflow-hidden rounded-2xl bg-secondary/60 hover:bg-secondary/80 transition-colors">
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                {video.duration}
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg">{video.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{video.author}</p>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm">{video.description}</p>
            </CardContent>
            
            <CardFooter className="flex items-center justify-between">
              <RatingWidget />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleSaveVideo(video.id)}
              >
                {savedVideos.includes(video.id) ? (
                  <BookmarkCheck className="h-5 w-5" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button 
          variant="outline" 
          size="lg"
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'View More Videos'}
        </Button>
      </div>
    </div>
  );
};

export default VideoTab;
