
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Clock } from 'lucide-react';

interface ProgressPanelProps {
  completedToday: number;
  totalHabits: number;
  streak: number;
}

const ProgressPanel = ({ completedToday, totalHabits, streak }: ProgressPanelProps) => {
  const completionPercentage = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  const getMotivationalMessage = () => {
    if (completedToday === 0) return "Ready to start your day with some tiny wins?";
    if (completedToday === totalHabits) return "Amazing! You've completed all your habits today! 🎉";
    if (completionPercentage >= 50) return "You're on fire! Keep the momentum going!";
    return "Great start! Every small step counts.";
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-purple-100 via-orange-100 to-green-100 border-0 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Progress */}
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-3">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                className="text-green-500"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${completionPercentage}, 100`}
                style={{
                  transition: 'stroke-dasharray 0.5s ease-in-out'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-800">
                {completedToday}/{totalHabits}
              </span>
            </div>
          </div>
          <h3 className="font-medium text-gray-800">Today's Progress</h3>
          <p className="text-sm text-gray-600">{Math.round(completionPercentage)}% complete</p>
        </div>

        {/* Streak */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-3 bg-orange-200 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="font-medium text-gray-800">Current Streak</h3>
          <p className="text-sm text-gray-600">
            <span className="text-xl font-bold text-orange-600">{streak}</span> days
          </p>
        </div>

        {/* Motivation */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-3 bg-purple-200 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-800">Your Vibe</h3>
          <p className="text-sm text-gray-600">{getMotivationalMessage()}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProgressPanel;
