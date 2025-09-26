import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Award, ArrowRight, BookOpen, Target, Waves, CheckCircle, Clock } from 'lucide-react';
import { trainingData } from '../data';
import type { TrainingSeason, TrainingWave } from '../data';

interface TrainingProps {
  onLevelSelect: (season: string, level: string) => void;
  onWaveSelect?: (season: string, wave: number) => void;
}

export function Training({ onLevelSelect, onWaveSelect }: TrainingProps) {
  const [selectedSeason, setSelectedSeason] = useState(0);
  const navigate = useNavigate();

  const seasons: TrainingSeason[] = trainingData.seasons;
  const currentSeason = seasons[selectedSeason];
  
  // Get current wave data
  const currentWave = currentSeason.waves.find(w => w.wave === currentSeason.currentWave) || currentSeason.waves[currentSeason.waves.length - 1];
  
  // Calculate current week as max of all levels' current weeks in current wave
  const calculateCurrentWeek = () => {
    if (!currentWave || !currentWave.levels.length) return 0;
    return Math.max(...currentWave.levels.map(level => level.currentWeek || 0));
  };
  
  // Dynamic calculations
  const totalWaves = currentSeason.waves.length;
  const completedWaves = currentSeason.waves.filter(w => w.isCompleted).length;
  const totalStudentsInSeason = currentSeason.totalStudents;
  const currentWeekNumber = calculateCurrentWeek();

  const getLevelDisplayName = (level: string) => {
    const names = {
      'level 0': 'Level 0 - Newcomers',
      'level 1': 'Level 1 - Beginner',
      'level 2': 'Level 2 - Intermediate',
    };
    return names[level as keyof typeof names] || level;
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'level 0': 'from-green-600 to-emerald-600',
      'level 1': 'from-blue-600 to-cyan-600',
      'level 2': 'from-purple-600 to-indigo-600',
      'senior level': 'from-red-600 to-pink-600'
    };
    return colors[level as keyof typeof colors] || 'from-gray-600 to-gray-700';
  };

  const getWaveStatusColor = (wave: TrainingWave) => {
    if (wave.isCompleted) return 'from-green-600 to-emerald-600';
    if (wave.wave === currentSeason.currentWave) return 'from-blue-600 to-purple-600';
    return 'from-gray-600 to-gray-700';
  };

  const getWaveStatusIcon = (wave: TrainingWave) => {
    if (wave.isCompleted) return CheckCircle;
    if (wave.wave === currentSeason.currentWave) return Clock;
    return Waves;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white section-padding page-transition">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-responsive-3xl font-bold mb-4 sm:mb-6">Training Program</h1>
          <p className="text-responsive-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Structured learning paths organized in waves - from newcomers to advanced competitive programming
          </p>
        </div>

        {/* Season Selector */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-responsive-xl font-bold text-center mb-4 sm:mb-6">Select a Season</h2>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            {seasons.map((season, index) => (
              <button
                key={index}
                onClick={() => setSelectedSeason(index)}
                className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 text-sm sm:text-base ${
                  selectedSeason === index
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                  <span>{season.season}</span>
                  {season.isActive && (
                    <span className="w-2 h-2 bg-green-400 rounded-full mx-auto sm:mx-0 mt-1 sm:mt-0"></span>
                  )}
                </div>
                <div className="text-xs sm:text-sm opacity-75 mt-1">{season.year}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Season Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg card-padding mb-8 sm:mb-12 hover-lift">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-responsive-xl font-bold mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center justify-center">
              {currentSeason.season} - {currentSeason.year}
              {currentSeason.isActive && (
                <span className="mt-2 sm:mt-0 sm:ml-3 px-3 sm:px-4 py-1 sm:py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs sm:text-sm font-medium rounded-full mx-auto sm:mx-0">
                  Active Season
                </span>
              )}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-responsive-base leading-relaxed max-w-3xl mx-auto">
              {currentSeason.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-2 sm:mb-3 animate-float">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{totalStudentsInSeason}</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Students</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-full mb-2 sm:mb-3 animate-float animate-delay-200">
                <Waves className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{totalWaves}</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Training Waves</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mb-2 sm:mb-3 animate-float animate-delay-400">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">Wave {currentSeason.currentWave}</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Current Wave</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full mb-2 sm:mb-3 animate-float animate-delay-600">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{completedWaves}</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Completed</div>
            </div>
          </div>
        </div>

        {/* Waves Overview */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-responsive-xl font-bold text-center mb-6 sm:mb-8">Training Waves</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {currentSeason.waves.map((wave, waveIndex) => {
              const StatusIcon = getWaveStatusIcon(wave);
              return (
                <div 
                  key={waveIndex} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 hover-lift"
                >
                  <div className={`bg-gradient-to-r ${getWaveStatusColor(wave)} text-white p-4 sm:p-6`}>
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <StatusIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                      <span className="text-xs sm:text-sm font-medium px-2 py-1 bg-white/20 rounded-full">
                        Wave {wave.wave}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">{wave.title}</h3>
                    <p className="opacity-90 text-xs sm:text-sm">{wave.description}</p>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Start Date:</span>
                        <span className="font-medium">{new Date(wave.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">End Date:</span>
                        <span className="font-medium">{new Date(wave.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Levels:</span>
                        <span className="font-medium">{wave.levels.length} levels</span>
                      </div>
                    </div>
                    
                    {wave.isCompleted && onWaveSelect && (
                      <button
                        onClick={() => {
                          onWaveSelect(currentSeason.year, wave.wave);
                          navigate(`/training/wave/${currentSeason.year}/${wave.wave}`);
                        }}
                        className="w-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 py-2 px-4 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors duration-200 font-medium text-sm"
                      >
                        View Complete Wave
                      </button>
                    )}
                    
                    {wave.wave === currentSeason.currentWave && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                          Current Progress
                        </div>
                        {/* <div className="text-xs text-blue-600 dark:text-blue-400">
                          Week {currentWeekNumber} in progress
                        </div> */}
                      </div>
                    )}
                    {!(wave.wave === currentSeason.currentWave) && (
                      <div className="bg-gray-50 dark:bg-gray-900/20 p-3 rounded-lg">
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                          Starting Soon
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Wave Training Levels */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-responsive-xl font-bold text-center mb-6 sm:mb-8">
            Current Wave: {currentWave.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {currentWave.levels.map((level, levelIndex) => (
              <div 
                key={levelIndex} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 hover-lift cursor-pointer group"
                onClick={() => {
                  onLevelSelect(currentSeason.year, level.level);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate(`/training/level/${currentSeason.year}/${level.level}`);
                }}
              >
                <div className={`bg-gradient-to-r ${getLevelColor(level.level)} text-white p-4 sm:p-6`}>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8" />
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{getLevelDisplayName(level.level)}</h3>
                  <p className="opacity-90 text-xs sm:text-sm">{level.description}</p>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      <span className="text-lg sm:text-xl font-bold">{level.studentCount}</span>
                      <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Students</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
                    Access detailed training content, weekly topics, problem sheets, and progress tracking for this level.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <span>Level Progress: Week {level.currentWeek}</span>
                      <span>{level.weeks.length} weeks total</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${getLevelColor(level.level)} h-2 rounded-full transition-all duration-200`}
                        style={{ width: `${level.weeks.length > 0 ? (level.currentWeek / level.weeks.length) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}