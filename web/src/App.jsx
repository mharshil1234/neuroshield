import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import SigninEmailPage from './pages/SigninEmailPage.jsx'
import SetupQ1 from './pages/SetupQ1.jsx'
import SetupQ2 from './pages/SetupQ2.jsx'
import SetupQ3 from './pages/SetupQ3.jsx'
import ReadyPage from './pages/ReadyPage.jsx'
import Workspace from './pages/Workspace.jsx'
import FocusSession from './pages/FocusSession.jsx'
import ProgressJourney from './pages/ProgressJourney.jsx'
import CompassPage from './pages/CompassPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninEmailPage />} />
      <Route path="/setup/1" element={<SetupQ1 />} />
      <Route path="/setup/2" element={<SetupQ2 />} />
      <Route path="/setup/3" element={<SetupQ3 />} />
      <Route path="/setup/ready" element={<ReadyPage />} />
      <Route path="/workspace" element={<Workspace />} />
      <Route path="/focus" element={<FocusSession />} />
      <Route path="/progress" element={<ProgressJourney />} />
      <Route path="/compass" element={<CompassPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  )
}

export default App
