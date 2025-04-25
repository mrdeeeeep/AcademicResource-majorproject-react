
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const mockProjects = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    lastUpdated: '2025-04-22',
    prompt: 'Need resources on machine learning fundamentals and neural networks',
  },
  {
    id: '2',
    title: 'Climate Change Research',
    lastUpdated: '2025-04-20',
    prompt: 'Looking for recent papers on climate change and its economic impact',
  },
  {
    id: '3',
    title: 'Quantum Computing',
    lastUpdated: '2025-04-18',
    prompt: 'Need introductory resources on quantum computing principles',
  },
  {
    id: '4',
    title: 'Ancient Rome History',
    lastUpdated: '2025-04-15',
    prompt: 'Looking for books and videos on Ancient Roman civilization',
  },
  {
    id: '5',
    title: 'JavaScript Advanced Topics',
    lastUpdated: '2025-04-10',
    prompt: 'Need resources on advanced JavaScript concepts and best practices',
  },
  {
    id: '6',
    title: 'Sustainable Architecture',
    lastUpdated: '2025-04-05',
    prompt: 'Research on sustainable building materials and design principles',
  },
];

const Index = () => {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateRecommendations = () => {
    if (!prompt.trim() || !title.trim()) {
      toast({
        title: "Error",
        description: "Please enter both a title and what you want to learn about",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Success",
        description: "Recommendations generated successfully",
      });
      setPrompt('');
      setTitle('');
      // In a real app, this would navigate to the new project
    }, 2000);
  };

  const handleSwitchToCreateTab = () => {
    const createTabTrigger = document.querySelector('[data-value="create"]');
    if (createTabTrigger instanceof HTMLElement) {
      createTabTrigger.click();
    }
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-6">
          <h1 className="text-3xl font-bold text-center mb-8">My Academic Projects</h1>
          
          {mockProjects.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg text-muted-foreground mb-4">No projects yet</h3>
              <Button onClick={handleSwitchToCreateTab}>
                Create Your First Project
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className="grid-item hover-scale glass-card rounded-2xl overflow-hidden"
                >
                  <CardHeader className="bg-gradient-to-r from-pastel-purple/20 to-pastel-blue/20">
                    <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Last updated: {new Date(project.lastUpdated).toLocaleDateString()}
                    </p>
                    <p className="line-clamp-2 text-sm">{project.prompt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Link to={`/project/${project.id}`}>
                      <Button size="sm">Open</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg">
              Load More
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="create" className="space-y-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Create New Academic Project</h1>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-lg font-medium">
                  Project Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.g., Quantum Computing Research"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="prompt" className="text-lg font-medium">
                  What do you want to learn today?
                </label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., I need resources on quantum computing principles and applications"
                  className="min-h-32 rounded-xl focus:ring-2 focus:ring-primary animate-pulse-glow"
                />
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  size="lg" 
                  onClick={handleGenerateRecommendations}
                  disabled={isGenerating}
                  className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-primary to-pastel-purple hover:opacity-90 transition-opacity"
                >
                  {isGenerating ? 'Generating...' : 'Generate Recommendations'}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
