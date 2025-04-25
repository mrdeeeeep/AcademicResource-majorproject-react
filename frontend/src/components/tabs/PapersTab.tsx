
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, BookmarkCheck, Archive } from 'lucide-react';
import RatingWidget from '@/components/widgets/RatingWidget';

const mockPapers = [
  {
    id: '1',
    title: 'Attention Is All You Need',
    authors: 'Vaswani, A., Shazeer, N., Parmar, N., et al.',
    year: '2017',
    journal: 'Neural Information Processing Systems (NIPS)',
    abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism...',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    tags: ['Deep Learning', 'NLP', 'Transformer'],
  },
  {
    id: '2',
    title: 'Deep Residual Learning for Image Recognition',
    authors: 'He, K., Zhang, X., Ren, S., Sun, J.',
    year: '2016',
    journal: 'IEEE Conference on Computer Vision and Pattern Recognition (CVPR)',
    abstract: 'Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously...',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    tags: ['Computer Vision', 'ResNet', 'Image Recognition'],
  },
  {
    id: '3',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
    authors: 'Devlin, J., Chang, M.W., Lee, K., Toutanova, K.',
    year: '2019',
    journal: 'North American Chapter of the Association for Computational Linguistics (NAACL)',
    abstract: 'We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers...',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    tags: ['NLP', 'BERT', 'Transformers'],
  },
];

const PapersTab = () => {
  const [savedPapers, setSavedPapers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSavePaper = (id: string) => {
    if (savedPapers.includes(id)) {
      setSavedPapers(savedPapers.filter(paperId => paperId !== id));
    } else {
      setSavedPapers([...savedPapers, id]);
    }
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more papers
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-pastel-green/30 to-pastel-blue/30 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">Academic Papers</h2>
        <p className="text-muted-foreground">
          Peer-reviewed research papers on machine learning and related topics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockPapers.map((paper) => (
          <Card key={paper.id} className="grid-item overflow-hidden rounded-2xl bg-secondary/60 hover:bg-secondary/80 transition-colors">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-1 relative">
                <div className="aspect-square md:h-full bg-muted rounded-tl-2xl rounded-bl-2xl overflow-hidden flex items-center justify-center">
                  <Archive className="h-24 w-24 text-muted-foreground" />
                </div>
              </div>
              
              <div className="md:col-span-3 p-4">
                <CardHeader className="p-0 pb-3">
                  <CardTitle className="text-lg">{paper.title}</CardTitle>
                  <div className="text-sm text-muted-foreground mt-1">
                    <span>{paper.authors}</span>
                    <span className="ml-2">({paper.year})</span>
                    <p className="mt-1">{paper.journal}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 pb-4">
                  <p className="text-sm mb-3">{paper.abstract}</p>
                  <div className="flex flex-wrap gap-2">
                    {paper.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-pastel-blue/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="p-0 flex items-center justify-between">
                  <RatingWidget />
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSavePaper(paper.id)}
                  >
                    {savedPapers.includes(paper.id) ? (
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
          {loading ? 'Loading...' : 'View More Papers'}
        </Button>
      </div>
    </div>
  );
};

export default PapersTab;
