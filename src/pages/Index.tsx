
import { useState, useEffect } from 'react';
import Welcome from '@/components/Welcome';
import Onboarding from '@/components/Onboarding';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'onboarding' | 'dashboard'>('welcome');
  const [userProfile, setUserProfile] = useState({
    name: '',
    personality: '',
    goals: [],
    preferences: []
  });

  const handleWelcomeComplete = () => {
    setCurrentStep('onboarding');
  };

  const handleOnboardingComplete = (profile: any) => {
    setUserProfile(profile);
    setCurrentStep('dashboard');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <Welcome onComplete={handleWelcomeComplete} />;
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'dashboard':
        return <Dashboard userProfile={userProfile} />;
      default:
        return <Welcome onComplete={handleWelcomeComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-green-50">
      {renderCurrentStep()}
    </div>
  );
};

export default Index;
