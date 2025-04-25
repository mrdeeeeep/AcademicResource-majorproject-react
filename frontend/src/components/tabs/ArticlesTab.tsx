import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, BookmarkCheck, Clock } from 'lucide-react';
import RatingWidget from '@/components/widgets/RatingWidget';
import FileText from '@/components/ui/file-text';

const mockArticles = [
  {
    id: '1',
    title: 'Machine Learning: A New Frontier in Data Analysis',
    source: 'Tech Review',
    date: '2025-03-15',
    cover: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    preview: 'Machine learning is rapidly transforming how businesses analyze data and make decisions. This article explores the latest trends in ML applications...',
    readTime: '8 min read',
    topics: ['Machine Learning', 'Data Science', 'Business']
  },
  {
    id: '2',
    title: 'Neural Networks Explained for Beginners',
    source: 'AI Daily',
    date: '2025-03-10',
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    preview: 'Neural networks form the foundation of modern AI. This beginner-friendly guide breaks down how they work without complex math...',
    readTime: '12 min read',
    topics: ['Neural Networks', 'AI', 'Beginners Guide']
  },
  {
    id: '3',
    title: 'The Ethics of AI: Navigating the Gray Areas',
    source: 'Tech Ethics Journal',
    date: '2025-02-28',
    cover: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    preview: 'As AI becomes more integrated into our daily lives, ethicists and technologists grapple with important questions about fairness, bias, and transparency...',
    readTime: '10 min read',
    topics: ['AI Ethics', 'Technology', 'Society']
  },
];

const ArticlesTab = () => {
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSaveArticle = (id: string) => {
    if (savedArticles.includes(id)) {
      setSavedArticles(savedArticles.filter(articleId => articleId !== id));
    } else {
      setSavedArticles([...savedArticles, id]);
    }
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more articles
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-pastel-pink/30 to-pastel-purple/30 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">Articles</h2>
        <p className="text-muted-foreground">
          Informative articles from tech publications and educational websites.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockArticles.map((article) => (
          <Card key={article.id} className="grid-item overflow-hidden rounded-2xl bg-secondary/60 hover:bg-secondary/80 transition-colors flex flex-col">
            <div className="relative aspect-video overflow-hidden bg-muted flex items-center justify-center">
              <FileText className="h-24 w-24 text-muted-foreground" />
            </div>
            
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{article.source}</span>
                <span className="text-xs text-muted-foreground">{new Date(article.date).toLocaleDateString()}</span>
              </div>
              <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <p className="text-sm line-clamp-3 mb-4">{article.preview}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {article.topics.map((topic) => (
                  <Badge key={topic} variant="outline" className="bg-pastel-pink/10">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="flex items-center justify-between">
              <RatingWidget />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleSaveArticle(article.id)}
              >
                {savedArticles.includes(article.id) ? (
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
          {loading ? 'Loading...' : 'View More Articles'}
        </Button>
      </div>
    </div>
  );
};

export default ArticlesTab;
