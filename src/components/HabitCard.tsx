
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Clock } from 'lucide-react';

interface HabitCardProps {
  habit: {
    id: string;
    title: string;
    description: string;
    duration: string;
    science: string;
    category: string;
  };
  isCompleted: boolean;
  onToggle: () => void;
}

const HabitCard = ({ habit, isCompleted, onToggle }: HabitCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onToggle();
      setIsAnimating(false);
    }, 200);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      creativity: 'bg-purple-100 text-purple-700',
      movement: 'bg-orange-100 text-orange-700',
      connection: 'bg-green-100 text-green-700',
      mindfulness: 'bg-blue-100 text-blue-700',
      learning: 'bg-yellow-100 text-yellow-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <Card className={`p-4 transition-all duration-300 ${
      isCompleted 
        ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' 
        : 'bg-white hover:bg-gray-50'
    } ${isAnimating ? 'scale-105' : 'scale-100'}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className={`font-medium ${isCompleted ? 'line-through text-gray-600' : 'text-gray-800'}`}>
              {habit.title}
            </h3>
            <Badge className={getCategoryColor(habit.category)}>
              {habit.category}
            </Badge>
          </div>
          
          <p className={`text-sm mb-3 ${isCompleted ? 'text-gray-500' : 'text-gray-600'}`}>
            {habit.description}
          </p>
          
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{habit.duration}</span>
            </div>
            <span className="hidden sm:block">{habit.science}</span>
          </div>
        </div>
        
        <Button
          onClick={handleToggle}
          variant={isCompleted ? "default" : "outline"}
          size="sm"
          className={`ml-4 transition-all duration-200 ${
            isCompleted 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'hover:bg-green-50 hover:border-green-300'
          }`}
        >
          <Check className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
        </Button>
      </div>
      
      {isCompleted && (
        <div className="mt-3 text-xs text-green-600 animate-fade-in">
          ✨ Great job! Small wins lead to big changes.
        </div>
      )}
    </Card>
  );
};

export default HabitCard;
