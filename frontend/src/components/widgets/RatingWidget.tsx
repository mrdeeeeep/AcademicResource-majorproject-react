
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface RatingWidgetProps {
  maxRating?: number;
  defaultRating?: number;
  onRatingChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

const RatingWidget = ({
  maxRating = 5,
  defaultRating = 0,
  onRatingChange,
  size = 'sm',
}: RatingWidgetProps) => {
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSetRating = (value: number) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  const sizeClass = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, index) => {
        const value = index + 1;
        return (
          <button
            key={index}
            type="button"
            className={cn(
              "transition-colors focus:outline-none",
              size === 'sm' ? 'p-0.5' : size === 'md' ? 'p-1' : 'p-1.5'
            )}
            onClick={() => handleSetRating(value)}
            onMouseEnter={() => setHoverRating(value)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <Star
              className={cn(
                sizeClass[size],
                "transition-transform hover:scale-110",
                (hoverRating || rating) >= value
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingWidget;
