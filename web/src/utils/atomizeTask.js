/**
 * Atomize a task into 5-minute steps using Gemini Nano (Prompt API).
 * Falls back to a heuristic split if the API is unavailable.
 */
export async function atomizeTask(task, energyLevel = 'High') {
  // Try Gemini Nano (Prompt API — Chrome built-in AI)
  try {
    if (window.ai && window.ai.languageModel) {
      const session = await window.ai.languageModel.create();
      const prompt = `You are an expert productivity coach for neurodivergent individuals. 
Your task is to atomize the following task into exactly 5 simple steps so that a person who is suffering from neurological disorders like ADHD doesn't feel overwhelmed and is able to solve the massive task which is divided into 5 steps, on the basis of their energy level (${energyLevel}), properly and efficiently.

Ensure every step is:
1. Concise (under 10 words)
2. Clear and simple
3. Action-oriented

Task: "${task}"
Return ONLY a JSON array of strings.`;
      
      const result = await session.prompt(prompt);
      session.destroy();

      const cleaned = result.trim().replace(/```json\n?/g, '').replace(/```/g, '').trim();
      const steps = JSON.parse(cleaned);
      if (Array.isArray(steps) && steps.length > 0) {
        return steps.map(s => String(s));
      }
    }
  } catch (err) {
    console.warn('Gemini Nano unavailable, using fallback:', err.message);
  }

  // Fallback: generate sensible, concise steps heuristically
  return generateFallbackSteps(task, 5);
}

function generateFallbackSteps(task, count) {
  const lower = task.toLowerCase();

  const sets = {
    writing: [
      'Open a blank document and add a title',
      'Jot down 3 key points as an outline',
      'Write 2–3 sentences for the first point',
      'Draft the remaining sections quickly',
      'Proofread once and hit save'
    ],
    study: [
      'Clear your desk and open your materials',
      'Skim headings and mark key sections',
      'Read and highlight 3 important ideas',
      'Write a quick summary in your own words',
      'Quiz yourself on what you just learned'
    ],
    code: [
      'Open your editor and sketch a quick plan',
      'Build the main function or component',
      'Add helper logic and handle edge cases',
      'Run a quick test and fix any bugs',
      'Clean up code and commit your changes'
    ],
    cleaning: [
      'Pick one small area to start with',
      'Sort items into keep, toss, and donate',
      'Put back everything in the keep pile',
      'Wipe down surfaces and clear clutter',
      'Do a final scan and enjoy the clean space'
    ],
    generic: [
      'Clear your workspace and gather supplies',
      'Write down the 3 most important sub-tasks',
      'Start with the easiest one first',
      'Work through the remaining items steadily',
      'Review what you did and wrap up'
    ]
  };

  let selected = sets.generic;
  if (lower.includes('write') || lower.includes('report') || lower.includes('essay') || lower.includes('doc')) selected = sets.writing;
  else if (lower.includes('study') || lower.includes('learn') || lower.includes('read')) selected = sets.study;
  else if (lower.includes('code') || lower.includes('build') || lower.includes('app') || lower.includes('develop')) selected = sets.code;
  else if (lower.includes('clean') || lower.includes('declutter') || lower.includes('organiz') || lower.includes('tidy') || lower.includes('cupboard')) selected = sets.cleaning;

  return selected.slice(0, count);
}
