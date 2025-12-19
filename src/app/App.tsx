import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { PatientSetup } from './components/PatientSetup';
import { MemoryBuilder } from './components/MemoryBuilder';
import { SessionGenerator } from './components/SessionGenerator';
import { Scheduling } from './components/Scheduling';
import { PlaybackMode } from './components/PlaybackMode';
import { EmergencyMode } from './components/EmergencyMode';
import { Feedback } from './components/Feedback';
import { Settings } from './components/Settings';
import { Navigation } from './components/Navigation';

export default function App() {
  const [isOnboarded, setIsOnboarded] = React.useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<Onboarding onComplete={() => setIsOnboarded(true)} />} />
        
        {isOnboarded ? (
          <>
            <Route element={<Navigation />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patient-setup" element={<PatientSetup />} />
              <Route path="/memory-builder" element={<MemoryBuilder />} />
              <Route path="/session-generator" element={<SessionGenerator />} />
              <Route path="/scheduling" element={<Scheduling />} />
              <Route path="/playback" element={<PlaybackMode />} />
              <Route path="/emergency" element={<EmergencyMode />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </>
        ) : (
          <Route path="*" element={<Navigate to="/onboarding" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
