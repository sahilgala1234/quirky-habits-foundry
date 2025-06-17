
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: any) => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState({
    name: '',
    personality: '',
    goals: [] as string[],
    preferences: [] as string[]
  });

  const steps = [
    {
      title: "What should we call you?",
      subtitle: "We'll use this to make everything feel more personal",
      type: "name"
    },
    {
      title: "How do you usually approach new things?",
      subtitle: "This helps us match habits to your natural style",
      type: "personality"
    },
    {
      title: "What are you hoping to improve?",
      subtitle: "Pick any that resonate (you can always change these later)",
      type: "goals"
    },
    {
      title: "When do you have tiny pockets of time?",
      subtitle: "We'll suggest habits that fit these moments perfectly",
      type: "preferences"
    }
  ];

  const personalityOptions = [
    { id: 'analytical', label: 'Analytical', desc: 'I like understanding the why behind things' },
    { id: 'spontaneous', label: 'Spontaneous', desc: 'I prefer to go with the flow' },
    { id: 'methodical', label: 'Methodical', desc: 'I like structure and clear steps' },
    { id: 'creative', label: 'Creative', desc: 'I enjoy experimenting and trying new approaches' }
  ];

  const goalOptions = [
    'Feel more energized', 'Reduce stress', 'Be more creative', 'Connect with others',
    'Stay focused', 'Build confidence', 'Sleep better', 'Move more', 'Learn new things'
  ];

  const preferenceOptions = [
    'Morning coffee time', 'Lunch breaks', 'Commuting', 'Before bed',
    'Waiting in lines', 'Between meetings', 'Weekend mornings', 'Walking the dog'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(profile);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleSelection = (type: string, value: string) => {
    if (type === 'goals') {
      setProfile(prev => ({
        ...prev,
        goals: prev.goals.includes(value)
          ? prev.goals.filter(g => g !== value)
          : [...prev.goals, value]
      }));
    } else if (type === 'preferences') {
      setProfile(prev => ({
        ...prev,
        preferences: prev.preferences.includes(value)
          ? prev.preferences.filter(p => p !== value)
          : [...prev.preferences, value]
      }));
    }
  };

  const canProceed = () => {
    const step = steps[currentStep];
    switch (step.type) {
      case 'name': return profile.name.trim().length > 0;
      case 'personality': return profile.personality.length > 0;
      case 'goals': return profile.goals.length > 0;
      case 'preferences': return profile.preferences.length > 0;
      default: return true;
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.type) {
      case 'name':
        return (
          <div className="space-y-4">
            <Label htmlFor="name" className="text-base">Your name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="What should we call you?"
              className="text-lg py-3 rounded-xl border-purple-200 focus:border-purple-400"
              autoFocus
            />
          </div>
        );
      
      case 'personality':
        return (
          <div className="space-y-3">
            {personalityOptions.map((option) => (
              <Card
                key={option.id}
                className={`p-4 cursor-pointer transition-all duration-200 hover:scale-102 ${
                  profile.personality === option.id 
                    ? 'bg-gradient-to-r from-purple-50 to-orange-50 border-purple-300' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setProfile(prev => ({ ...prev, personality: option.id }))}
              >
                <div className="font-medium text-gray-800">{option.label}</div>
                <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
              </Card>
            ))}
          </div>
        );
      
      case 'goals':
        return (
          <div className="grid grid-cols-1 gap-3">
            {goalOptions.map((goal) => (
              <Card
                key={goal}
                className={`p-3 cursor-pointer transition-all duration-200 text-center ${
                  profile.goals.includes(goal)
                    ? 'bg-gradient-to-r from-orange-50 to-green-50 border-orange-300'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => toggleSelection('goals', goal)}
              >
                <span className="text-gray-800">{goal}</span>
              </Card>
            ))}
          </div>
        );
      
      case 'preferences':
        return (
          <div className="grid grid-cols-2 gap-3">
            {preferenceOptions.map((pref) => (
              <Card
                key={pref}
                className={`p-3 cursor-pointer transition-all duration-200 text-center ${
                  profile.preferences.includes(pref)
                    ? 'bg-gradient-to-r from-green-50 to-purple-50 border-green-300'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => toggleSelection('preferences', pref)}
              >
                <span className="text-sm text-gray-800">{pref}</span>
              </Card>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-gradient-to-r from-purple-400 to-orange-400' 
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Step content */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep].subtitle}
            </p>
          </div>

          <div className="animate-fade-in">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white"
            >
              <span>{currentStep === steps.length - 1 ? 'Start my journey' : 'Next'}</span>
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;
