import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import RatingWidget from '@/components/widgets/RatingWidget';
import Book from '@/components/ui/book';

const mockBooks = [
  {
    id: '1',
    title: 'Deep Learning',
    author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
    year: '2016',
    cover: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    summary: 'The deep learning textbook is a resource intended to help students and practitioners enter the field of machine learning in general and deep learning in particular.',
  },
  {
    id: '2',
    title: 'Hands-On Machine Learning',
    author: 'Aurélien Géron',
    year: '2019',
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    summary: 'Through a series of recent breakthroughs, deep learning has boosted the entire field of machine learning. Now, even programmers who know close to nothing about this technology can use simple, efficient tools to implement programs.',
  },
  {
    id: '3',
    title: 'Pattern Recognition and Machine Learning',
    author: 'Christopher M. Bishop',
    year: '2006',
    cover: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    summary: 'This is the first textbook on pattern recognition to present the Bayesian viewpoint. The book presents approximate inference algorithms that permit fast approximate answers in situations where exact answers are not feasible.',
  },
  {
    id: '4',
    title: 'The Elements of Statistical Learning',
    author: 'Trevor Hastie, Robert Tibshirani, Jerome Friedman',
    year: '2009',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    summary: 'This book describes the important ideas in a variety of fields such as medicine, biology, finance, and marketing in a common conceptual framework.',
  },
];

const BooksTab = () => {
  const [savedBooks, setSavedBooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSaveBook = (id: string) => {
    if (savedBooks.includes(id)) {
      setSavedBooks(savedBooks.filter(bookId => bookId !== id));
    } else {
      setSavedBooks([...savedBooks, id]);
    }
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more books
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-pastel-orange/30 to-pastel-yellow/30 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">Books</h2>
        <p className="text-muted-foreground">
          Comprehensive textbooks and guides on machine learning topics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockBooks.map((book) => (
          <Card key={book.id} className="grid-item overflow-hidden rounded-2xl bg-secondary/60 hover:bg-secondary/80 transition-colors flex flex-col">
            <div className="relative aspect-[3/4] overflow-hidden bg-muted flex items-center justify-center">
              <Book className="h-32 w-32 text-muted-foreground" />
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{book.author} ({book.year})</p>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <p className="text-sm line-clamp-4">{book.summary}</p>
            </CardContent>
            
            <CardFooter className="flex items-center justify-between">
              <RatingWidget />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleSaveBook(book.id)}
              >
                {savedBooks.includes(book.id) ? (
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
          {loading ? 'Loading...' : 'View More Books'}
        </Button>
      </div>
    </div>
  );
};

export default BooksTab;
