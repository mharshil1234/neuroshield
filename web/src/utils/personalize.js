export function getPersonalizedSettings(answers) {
  const settings = {
    distractionText: 'Active for all interruptions',
    scheduleText: 'Optimized for Morning and Afternoon energy peaks',
    strategyText: 'Step-by-step breakdown and progress nudges'
  };

  // 1. Distractions (Q1)
  if (answers.distractions && answers.distractions.length > 0) {
    // e.g. ["Social media", "Notifications"] -> "Active for Social media and Notifications"
    if (answers.distractions.length === 1) {
       settings.distractionText = `Active for ${answers.distractions[0]}`;
    } else if (answers.distractions.length === 2) {
       settings.distractionText = `Active for ${answers.distractions[0]} and ${answers.distractions[1]}`;
    } else {
       settings.distractionText = `Active for ${answers.distractions[0]}, ${answers.distractions[1]}, and more`;
    }
  }

  // 2. Schedule (Q2)
  if (answers.productivity && answers.productivity.length > 0) {
    const timeframes = answers.productivity;
    if (timeframes.includes('My productivity changes daily')) {
      settings.scheduleText = 'Flexible schedule adapted to your daily energy shifts';
    } else if (timeframes.length === 1) {
      settings.scheduleText = `Optimized for ${timeframes[0]} energy peaks`;
    } else {
      settings.scheduleText = `Optimized for ${timeframes.join(' and ')} focus blocks`;
    }
  }

  // 3. Strategy (Q3)
  if (answers.struggles && answers.struggles.length > 0) {
    const struggle = answers.struggles[0]; // Primary struggle
    switch (struggle) {
      case 'Starting tasks':
        settings.strategyText = 'Low-friction task initiation and micro-steps';
        break;
      case 'Staying focused':
        settings.strategyText = 'Continuous focus loops with short breaks';
        break;
      case 'Finishing tasks':
        settings.strategyText = 'Momentum building to reach the finish line';
        break;
      case 'Remembering tasks':
        settings.strategyText = 'Smart capture and external memory cues';
        break;
      case 'Managing time':
        settings.strategyText = 'Time-boxed intervals to prevent overworking';
        break;
      default:
        settings.strategyText = 'Step-by-step breakdown and progress nudges';
    }
  }

  return settings;
}
