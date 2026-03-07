import { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const [answers, setAnswers] = useState({
    distractions: [],
    productivity: [],
    struggles: [],
  });
  const [shieldActive, setShieldActive] = useState(true);

  const toggleShield = () => setShieldActive(prev => !prev);

  const updateAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  return (
    <OnboardingContext.Provider value={{ answers, updateAnswer, shieldActive, toggleShield }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
