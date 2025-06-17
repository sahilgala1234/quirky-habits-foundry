
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Check, Plus, Heart } from 'lucide-react';
import HabitCard from '@/components/HabitCard';
import ProgressPanel from '@/components/ProgressPanel';

interface DashboardProps {
  userProfile: {
    name: string;
    personality: string;
    goals: string[];
    preferences: string[];
  };
}

const Dashboard = ({ userProfile }: DashboardProps) => {
  const [currentHabits, setCurrentHabits] = useState<any[]>([]);
  const [suggestedHabits, setSuggestedHabits] = useState<any[]>([]);
  const [completedToday, setCompletedToday] = useState<string[]>([]);

  // Simulate AI-generated habits based on user profile
  useEffect(() => {
    const generateHabits = () => {
      const habitDatabase = [
        {
          id: 'doodle-lunch',
          title: 'Doodle after lunch',
          description: 'Spend 2 minutes doodling whatever comes to mind',
          duration: '2 min',
          science: 'Enhances creativity and reduces afternoon stress',
          category: 'creativity',
          personality: ['creative', 'spontaneous'],
          goals: ['Be more creative', 'Reduce stress']
        },
        {
          id: 'one-leg-brush',
          title: 'Stand on one leg while brushing teeth',
          description: 'Alternate legs each day for balance practice',
          duration: '2 min',
          science: 'Improves balance and proprioception',
          category: 'movement',
          personality: ['methodical', 'analytical'],
          goals: ['Move more', 'Feel more energized']
        },
        {
          id: 'thursday-text',
          title: 'Text a friend every Thursday',
          description: 'Send a quick "thinking of you" message',
          duration: '1 min',
          science: 'Strengthens social bonds and reduces loneliness',
          category: 'connection',
          personality: ['spontaneous', 'creative'],
          goals: ['Connect with others', 'Feel more energized']
        },
        {
          id: 'coffee-gratitude',
          title: 'Name one thing you\'re grateful for with your morning coffee',
          description: 'Before your first sip, think of something good',
          duration: '30 sec',
          science: 'Increases positive emotions and life satisfaction',
          category: 'mindfulness',
          personality: ['analytical', 'methodical'],
          goals: ['Reduce stress', 'Build confidence']
        },
        {
          id: 'commute-podcast',
          title: 'Listen to a 5-minute educational podcast snippet',
          description: 'Queue up bite-sized learning for your commute',
          duration: '5 min',
          science: 'Enhances neuroplasticity and knowledge retention',
          category: 'learning',
          personality: ['analytical', 'methodical'],
          goals: ['Learn new things', 'Stay focused']
        }
      ];

      // Filter habits based on user profile
      const matchedHabits = habitDatabase.filter(habit => {
        const personalityMatch = habit.personality.includes(userProfile.personality);
        const goalMatch = habit.goals.some(goal => userProfile.goals.includes(goal));
        return personalityMatch || goalMatch;
      });

      setCurrentHabits(matchedHabits.slice(0, 3));
      setSuggestedHabits(matchedHabits.slice(3));
    };

    generateHabits();
  }, [userProfile]);

  const toggleHabitCompletion = (habitId: string) => {
    setCompletedToday(prev => 
      prev.includes(habitId) 
        ? prev.filter(id => id !== habitId)
        : [...prev, habitId]
    );
  };

  const addHabitToCurrent = (habit: any) => {
    setCurrentHabits(prev => [...prev, habit]);
    setSuggestedHabits(prev => prev.filter(h => h.id !== habit.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Good morning, {userProfile.name}! 
          </h1>
          <p className="text-gray-600">
            Ready for some delightfully small wins today?
          </p>
        </div>

        {/* Progress Overview */}
        <ProgressPanel 
          completedToday={completedToday.length}
          totalHabits={currentHabits.length}
          streak={7} // Mock streak
        />

        {/* Today's Habits */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Today's Micro-Habits</h2>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              {completedToday.length}/{currentHabits.length} done
            </Badge>
          </div>
          
          <div className="space-y-4">
            {currentHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                isCompleted={completedToday.includes(habit.id)}
                onToggle={() => toggleHabitCompletion(habit.id)}
              />
            ))}
          </div>
        </Card>

        {/* AI Suggestions */}
        {suggestedHabits.length > 0 && (
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-800">More habits curated for you</h2>
            </div>
            
            <p className="text-gray-600 mb-4">
              Based on your {userProfile.personality} personality and goals, here are some habits that might stick:
            </p>
            
            <div className="space-y-4">
              {suggestedHabits.map((habit) => (
                <div key={habit.id} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-25 to-orange-25 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{habit.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">{habit.duration}</Badge>
                      <span className="text-xs text-gray-500">{habit.science}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addHabitToCurrent(habit)}
                    className="flex items-center space-x-1 bg-gradient-to-r from-orange-400 to-green-400 hover:from-orange-500 hover:to-green-500 text-white"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Try it</span>
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Personalization Note */}
        <Card className="p-4 bg-gradient-to-r from-green-50 to-purple-50 border-green-200">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-green-500" />
            <p className="text-sm text-gray-700">
              <strong>Why these habits?</strong> As someone who's {userProfile.personality}, we picked habits that work with your natural style. 
              They're designed to help you {userProfile.goals.slice(0, 2).join(' and ').toLowerCase()}.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
