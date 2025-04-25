
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThumbsUp, ThumbsDown, Bookmark, BookmarkCheck } from 'lucide-react';
import RatingWidget from '@/components/widgets/RatingWidget';

// Import tab content components
import VideoTab from '@/components/tabs/VideoTab';
import PapersTab from '@/components/tabs/PapersTab';
import BooksTab from '@/components/tabs/BooksTab';
import ArticlesTab from '@/components/tabs/ArticlesTab';
import RepositoriesTab from '@/components/tabs/RepositoriesTab';

const mockProjects = {
  '1': {
    id: '1',
    title: 'Machine Learning Fundamentals',
    prompt: 'Need resources on machine learning fundamentals and neural networks',
    description: 'This project collects various academic resources related to machine learning fundamentals, including neural network architectures, training methods, and practical applications across different domains.'
  },
  '2': {
    id: '2',
    title: 'Climate Change Research',
    prompt: 'Looking for recent papers on climate change and its economic impact',
    description: 'A collection of the latest research and resources on climate change, focusing on economic impacts, mitigation strategies, and policy recommendations from academic sources.'
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [saved, setSaved] = useState(false);

  // In a real app, fetch project details based on id
  const project = id && mockProjects[id as keyof typeof mockProjects];

  if (!project) {
    return <div className="text-center py-12">Project not found</div>;
  }

  return (
    <div className="container mx-auto max-w-7xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
        <p className="text-muted-foreground mt-2 text-lg">{project.prompt}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSaved(!saved)}
            className="flex items-center gap-2"
          >
            {saved ? (
              <>
                <BookmarkCheck className="h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" />
                Save Project
              </>
            )}
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <ThumbsUp className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ThumbsDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <Tabs defaultValue="videos" className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="papers">Academic Papers</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
        </TabsList>

        <TabsContent value="videos">
          <VideoTab />
        </TabsContent>

        <TabsContent value="papers">
          <PapersTab />
        </TabsContent>

        <TabsContent value="books">
          <BooksTab />
        </TabsContent>

        <TabsContent value="articles">
          <ArticlesTab />
        </TabsContent>

        <TabsContent value="repositories">
          <RepositoriesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
