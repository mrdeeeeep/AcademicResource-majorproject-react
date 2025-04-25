import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, BookmarkCheck, Star, GitFork, Database } from 'lucide-react';
import RatingWidget from '@/components/widgets/RatingWidget';

const mockRepositories = [
  {
    id: '1',
    name: 'tensorflow/tensorflow',
    description: 'An open source machine learning framework for everyone',
    stars: 172000,
    forks: 87000,
    cover: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    techStack: ['Python', 'C++', 'CUDA'],
  },
  {
    id: '2',
    name: 'pytorch/pytorch',
    description: 'Tensors and Dynamic neural networks in Python with strong GPU acceleration',
    stars: 64000,
    forks: 17000,
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    techStack: ['Python', 'C++', 'CUDA'],
  },
  {
    id: '3',
    name: 'scikit-learn/scikit-learn',
    description: 'Machine Learning in Python',
    stars: 52000,
    forks: 23000,
    cover: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    techStack: ['Python', 'Cython', 'C'],
  },
  {
    id: '4',
    name: 'huggingface/transformers',
    description: '🤗 Transformers: State-of-the-art Natural Language Processing for TensorFlow, PyTorch, and JAX.',
    stars: 108000,
    forks: 21000,
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    techStack: ['Python', 'Jupyter Notebook'],
  },
];

const RepositoriesTab = () => {
  const [savedRepos, setSavedRepos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSaveRepo = (id: string) => {
    if (savedRepos.includes(id)) {
      setSavedRepos(savedRepos.filter(repoId => repoId !== id));
    } else {
      setSavedRepos([...savedRepos, id]);
    }
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more repositories
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-pastel-blue/30 to-pastel-green/30 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">Repositories</h2>
        <p className="text-muted-foreground">
          Open-source code repositories for machine learning projects and tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockRepositories.map((repo) => (
          <Card key={repo.id} className="grid-item overflow-hidden rounded-2xl bg-secondary/60 hover:bg-secondary/80 transition-colors">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="aspect-square md:h-full bg-muted rounded-tl-2xl rounded-bl-2xl overflow-hidden flex items-center justify-center">
                  <Database className="h-24 w-24 text-muted-foreground" />
                </div>
              </div>
              
              <div className="md:col-span-2 p-4">
                <CardHeader className="p-0 pb-3">
                  <CardTitle className="text-lg">{repo.name}</CardTitle>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      <span className="text-sm">{formatNumber(repo.stars)}</span>
                    </div>
                    <div className="flex items-center">
                      <GitFork className="h-4 w-4 mr-1" />
                      <span className="text-sm">{formatNumber(repo.forks)}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 pb-4">
                  <p className="text-sm mb-3">{repo.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {repo.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-pastel-green/10">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="p-0 flex items-center justify-between">
                  <RatingWidget />
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSaveRepo(repo.id)}
                  >
                    {savedRepos.includes(repo.id) ? (
                      <BookmarkCheck className="h-5 w-5" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </Button>
                </CardFooter>
              </div>
            </div>
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
          {loading ? 'Loading...' : 'View More Repositories'}
        </Button>
      </div>
    </div>
  );
};

export default RepositoriesTab;
