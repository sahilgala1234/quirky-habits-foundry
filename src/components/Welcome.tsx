
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Heart, Clock } from 'lucide-react';

interface WelcomeProps {
  onComplete: () => void;
}

const Welcome = ({ onComplete }: WelcomeProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGetStarted = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className={`max-w-md w-full p-8 text-center bg-white/80 backdrop-blur-sm border-0 shadow-xl transition-all duration-600 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="space-y-6">
          {/* App Icon */}
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-green-400 rounded-full flex items-center justify-center animate-pulse delay-100">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-purple-400 rounded-full flex items-center justify-center animate-pulse delay-200">
              <Clock className="w-3 h-3 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
              Habitual Curator
            </h1>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Discover quirky, science-backed micro-habits that actually fit your life.
            </p>
            
            <p className="text-sm text-gray-600">
              No 5am yoga classes. No perfect morning routines. Just tiny, delightful changes that stick.
            </p>
          </div>

          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <Star className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-700">AI-powered habit matching</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <Heart className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-700">Personality-based suggestions</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Clock className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">2-minute micro-habits</span>
            </div>
          </div>

          <Button
            onClick={handleGetStarted}
            className="w-full bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Let's find your perfect habits
          </Button>

          <p className="text-xs text-gray-500">
            Takes 2 minutes • Completely personalized
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Welcome;
