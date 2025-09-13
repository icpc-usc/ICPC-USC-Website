import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Award, ArrowLeft, Target, ArrowRight, CheckCircle, Clock, Waves } from 'lucide-react';
import { trainingData } from '../data';
import type { TrainingWave as TrainingWaveType, TrainingLevel } from '../data';

interface TrainingWaveProps {
  season: string;
  wave: number;
  onBack: () => void;
  onLevelSelect: (season: string, level: string) => void;
}

export function TrainingWave({ season, wave, onBack, onLevelSelect }: TrainingWaveProps) {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const navigate = useNavigate();

  const getWaveData = (): TrainingWaveType | null => {
    const currentSeason = trainingData.seasons.find(s => s.year === season);
    if (!currentSeason) return null;
    
    return currentSeason.waves.find(w => w.wave === wave) || null;
  };

  const waveData = getWaveData();
  
  if (!waveData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Wave not found</h1>
            <button
              onClick={onBack}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Back to Training
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getLevelDisplayName = (level: string) => {
    const names = {
      'newcomers': 'Level 0 - Newcomers',
      'beginner': 'Level 1 - Beginner',
      'intermediate': 'Level 2 - Intermediate',
      'advanced': 'Level 3 - Advanced'
    };
    return names[level as keyof typeof names] || level;
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'newcomers': 'from-green-600 to-emerald-600',
      'beginner': 'from-blue-600 to-cyan-600',
      'intermediate': 'from-purple-600 to-indigo-600',
      'advanced': 'from-red-600 to-pink-600'
    };
    return colors[level as keyof typeof colors] || 'from-gray-600 to-gray-700';
  };

  const totalStudents = waveData.levels.reduce((sum, level) => sum + level.studentCount, 0);
  const totalWeeks = Math.max(...waveData.levels.map(level => level.weeks.length));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/training')}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Training Overview
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${
                  waveData.isCompleted ? 'from-green-600 to-emerald-600' : 'from-blue-600 to-purple-600'
                } rounded-full mr-4`}>
                  {waveData.isCompleted ? (
                    <CheckCircle className="w-8 h-8 text-white" />
                  ) : (
                    <Waves className="w-8 h-8 text-white" />
                  )}
                </div>
                <div className="text-left">
                  <h1 className="text-3xl lg:text-4xl font-bold">{waveData.title}</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">Wave {waveData.wave} • Season {season}</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
                {waveData.description}
              </p>

              <div className="flex items-center justify-center space-x-4 text-sm">
                <span className={`px-3 py-1 rounded-full font-medium ${
                  waveData.isCompleted 
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                    : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
                }`}>
                  {waveData.isCompleted ? 'Completed' : 'In Progress'}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {new Date(waveData.startDate).toLocaleDateString()} - {new Date(waveData.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{totalStudents}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Total Students</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-full mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{waveData.levels.length}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Training Levels</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mb-3">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{totalWeeks}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Max Weeks</div>
          </div>
        </div>

        {/* Training Levels */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-8">Training Levels in this Wave</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {waveData.levels.map((level, levelIndex) => (
              <div 
                key={levelIndex} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 hover-lift cursor-pointer group"
                onClick={() => {
                  onLevelSelect(season, level.level);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate(`/training/level/${season}/${level.level}`);
                }}
              >
                <div className={`bg-gradient-to-r ${getLevelColor(level.level)} text-white p-6`}>
                  <div className="flex items-center justify-between mb-3">
                    <Target className="w-8 h-8" />
                    <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{getLevelDisplayName(level.level)}</h3>
                  <p className="opacity-90 text-sm">{level.description}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-gray-600" />
                      <span className="text-xl font-bold">{level.studentCount}</span>
                      <span className="text-base text-gray-600 dark:text-gray-400">Students</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    Access detailed training content, weekly topics, problem sheets, and progress tracking for this level.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>Current Week: {level.currentWeek} / {level.weeks.length}</span>
                      <span>{waveData.isCompleted ? 'Completed' : 'Active'}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${getLevelColor(level.level)} h-2 rounded-full transition-all duration-200`}
                        style={{ width: waveData.isCompleted ? '100%' : `${level.weeks.length > 0 ? (level.currentWeek / level.weeks.length) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            {waveData.isCompleted ? 'Wave Completed Successfully!' : 'Wave in Progress'}
          </h3>
          <p className="text-lg opacity-90 mb-6">
            {waveData.isCompleted 
              ? `This wave was completed with ${totalStudents} students across ${waveData.levels.length} levels.`
              : `Currently running with ${totalStudents} active students across ${waveData.levels.length} levels.`
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-2xl font-bold mb-1">{waveData.levels.length}</div>
              <div className="opacity-90">Training Levels</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">{totalStudents}</div>
              <div className="opacity-90">Total Students</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">{totalWeeks}</div>
              <div className="opacity-90">Training Weeks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}