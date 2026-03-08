import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Home, Calendar, BarChart2, Settings, CheckCircle2, PlayCircle } from 'lucide-react';
import axios from "axios";

export default function ProgressJourney() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [journeySteps, setJourneySteps] = useState([]);

  useEffect(() => {

  const fetchData = async () => {

    try {

      const token = localStorage.getItem("token");

      // Get user
      const userRes = await axios.get(
        "http://localhost:5000/api/user/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(userRes.data);

      // Get tasks belonging to this user
      const taskRes = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const tasks = taskRes.data;

      const today = new Date().toDateString();

      const todayTasks = tasks
        .filter(task => new Date(task.createdAt).toDateString() === today)
        .map(task => {

          const totalSteps = task.steps.length;
          const completedSteps = task.steps.filter(step => step.completed).length;

          let status = completedSteps === totalSteps ? "completed" : "in-progress";

          return {
            id: task._id,
            title: task.taskName,
            steps: task.steps.map(s => s.content),
            startStep: Math.max(task.steps.findIndex(s => !s.completed), 0),
            status,
            progress: `${completedSteps}/${totalSteps} steps`
          };

        });

      setJourneySteps(todayTasks);

    } catch (error) {
      console.error("Failed to fetch data", error);
    }

  };

  fetchData();

}, []);

  return (
    <div className="min-h-screen w-full bg-[#E5ECE5] flex flex-col items-center relative font-sans overflow-y-auto">
      {/* Header */}
      <header className="w-full px-8 py-6 flex items-center justify-between z-20 fixed top-0 bg-transparent">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#4D6251]" fill="currentColor" fillOpacity={0.2} />
          <span className="text-xl font-bold text-[#4D6251] tracking-tight">NeuroShield</span>
        </div>
        <div className="w-11 h-11 rounded-full bg-[#A3BFA9] flex items-center justify-center text-white font-medium text-lg shadow-sm">
          {user?.name
            ?.split(" ")
            .map(n => n[0])
            .join("")}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center px-4 pt-28 pb-32 z-10">

        {/* Journey Header */}
        <div className="flex items-center gap-4 mb-10 w-full max-w-[520px]">
          <div className="w-14 h-14 rounded-full bg-[#A3BFA9] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            {user?.name
            ?.split(" ")
            .map(n => n[0])
            .join("")}
          </div>
          <div>
            <span className="text-[12px] font-semibold text-[#6B8E73] tracking-wide uppercase block">Keep going!</span>
            <h1 className="text-[1.75rem] font-bold text-[#314339] tracking-tight leading-tight">Progress Journey</h1>
          </div>
        </div>
  
        {journeySteps.length === 0 && (
        <p className="text-[#6B8E73] text-sm">No tasks for today yet 🌱</p>
        )}

        {/* Timeline */}
        <div className="w-full max-w-[520px] relative">
          {/* Vertical Line */}
          <div className="absolute left-[23px] top-[28px] bottom-[28px] w-[2px] bg-[#C8D6CB]" />
          {journeySteps.map((step, index) => {
            const isCompleted = step.status === 'completed';
            const isInProgress = step.status === 'in-progress';

            return (
              <div
                key={index}
                onClick={() => {
                  if (!isCompleted) {
                    navigate('/focus', {
                      state: {
                        taskId: step.id,
                        taskName: step.title,
                        steps: step.steps,
                        startStep: step.startStep
                      }
                    });
                  }
                }}
                className={`relative flex items-center gap-4 mb-4 
                  ${!isCompleted ? 'cursor-pointer hover:scale-[1.02]' : ''}
                `}
              >
                {/* Icon */}
                <div className="relative z-10 shrink-0">
                  {isCompleted && (
                    <div className="w-[48px] h-[48px] rounded-full bg-[#6B8E73] flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  )}
                  {isInProgress && (
                    <div className="w-[48px] h-[48px] rounded-full bg-[#4D6251] flex items-center justify-center shadow-md">
                      <PlayCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>

                {/* Card */}
                <div
                  className={`flex-1 rounded-2xl px-5 py-4 ${
                    isInProgress
                      ? 'bg-white shadow-[0_6px_24px_rgb(0,0,0,0.06)]'
                      : isCompleted
                      ? 'bg-white/70 shadow-[0_4px_16px_rgb(0,0,0,0.03)]'
                      : 'bg-white/40'
                  }`}
                >
                  <span
                    className={`text-[16px] font-semibold block ${
                      isCompleted
                        ? 'text-[#829E8C] line-through'
                        : isInProgress
                        ? 'text-[#314339]'
                        : 'text-[#C8D6CB]'
                    }`}
                  >
                    {step.title}
                  </span>

                  {isInProgress && step.timeRemaining && (
                    <span className="text-[12px] text-[#6B8E73] font-medium mt-0.5 block">
                      {step.timeRemaining}
                    </span>
                  )}

                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.12em] mt-1 block ${
                      isInProgress
                        ? 'text-[#6B8E73]'
                        : isCompleted
                        ? 'text-[#A1B3A5]'
                        : 'text-[#C8D6CB]'
                    }`}
                  >
                    {isCompleted ? 'COMPLETED' : 'IN PROGRESS'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-3 flex items-center justify-center gap-6 shadow-[0_15px_50px_rgb(107,142,115,0.1)] z-50">
        <button
          onClick={() => navigate('/workspace')}
          className="w-[34px] h-[34px] rounded-full text-[#A1B3A5] hover:text-[#6B8E73] hover:bg-[#E2EFE5]/40 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" />
        </button>
        <button className="w-[34px] h-[34px] rounded-full bg-[#A3C0AB] flex items-center justify-center text-white transition-colors cursor-pointer shadow-sm">
          <Calendar className="w-4 h-4" fill="currentColor" />
        </button>
        <button
          onClick={() => navigate('/compass')}
          className="w-[34px] h-[34px] rounded-full text-[#A1B3A5] hover:text-[#6B8E73] hover:bg-[#E2EFE5]/40 flex items-center justify-center transition-colors cursor-pointer"
        >
          <BarChart2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="w-[34px] h-[34px] rounded-full text-[#A1B3A5] hover:text-[#6B8E73] hover:bg-[#E2EFE5]/40 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}
