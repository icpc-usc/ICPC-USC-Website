import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Training } from './pages/Training';
import { TrainingLevel } from './pages/TrainingLevel';
import { TrainingWave } from './pages/TrainingWave';
import { Members } from './pages/Members';
import { Leaders } from './pages/Leaders';
import { Gallery } from './pages/Gallery';
import { GalleryEvent } from './pages/GalleryEvent';
import { History } from './pages/History';
import { Contact } from './pages/Contact';
import { useTheme } from './hooks/useTheme';

export type Page = 'home' | 'training' | 'training-level' | 'training-wave' | 'members' | 'leaders' | 'gallery' | 'gallery-event' | 'history' | 'contact';

function App() {
  const [currentTrainingLevel, setCurrentTrainingLevel] = useState<{ season: string; level: string } | null>(null);
  const [currentTrainingWave, setCurrentTrainingWave] = useState<{ season: string; wave: number } | null>(null);
  const [currentGalleryEvent, setCurrentGalleryEvent] = useState<{ season: string; eventId: string } | null>(null);
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="min-h-screen flex flex-col">
          <Header 
            onTrainingLevelSelect={(season, level) => {
              setCurrentTrainingLevel({ season, level });
            }}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <main className="flex-1 bg-white dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/training" element={
                <Training 
                  onLevelSelect={(season, level) => {
                    setCurrentTrainingLevel({ season, level });
                  }}
                  onWaveSelect={(season, wave) => {
                    setCurrentTrainingWave({ season, wave });
                  }}
                />
              } />
              <Route path="/training/level/:season/:level" element={
                currentTrainingLevel ? (
                  <TrainingLevel 
                    season={currentTrainingLevel.season} 
                    level={currentTrainingLevel.level}
                    onBack={() => {}}
                  />
                ) : <Navigate to="/training" replace />
              } />
              <Route path="/training/wave/:season/:wave" element={
                currentTrainingWave ? (
                  <TrainingWave 
                    season={currentTrainingWave.season} 
                    wave={currentTrainingWave.wave}
                    onBack={() => {}}
                    onLevelSelect={(season, level) => {
                      setCurrentTrainingLevel({ season, level });
                    }}
                  />
                ) : <Navigate to="/training" replace />
              } />
              <Route path="/members" element={<Members />} />
              <Route path="/leaders" element={<Leaders />} />
              <Route path="/gallery" element={
                <Gallery onEventSelect={(season, eventId) => {
                  setCurrentGalleryEvent({ season, eventId });
                }} />
              } />
              <Route path="/gallery/event/:season/:eventId" element={
                currentGalleryEvent ? (
                  <GalleryEvent 
                    season={currentGalleryEvent.season} 
                    eventId={currentGalleryEvent.eventId}
                    onBack={() => {}}
                  />
                ) : <Navigate to="/gallery" replace />
              } />
              <Route path="/history" element={<History />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;