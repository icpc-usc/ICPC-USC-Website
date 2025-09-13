import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Award, ExternalLink, Play, FileText, ArrowLeft, Trophy } from 'lucide-react';
import { trainingData } from '../data';
import type { Week } from '../data';

interface TrainingLevelProps {
  season: string;
  level: string;
  onBack: () => void;
}

export function TrainingLevel({ season, level, onBack }: TrainingLevelProps) {
  const navigate = useNavigate();

  const getLevelDisplayName = (level: string) => {
    const names = {
      'newcomers': 'Level 0 - Newcomers',
      'beginner': 'Level 1 - Beginner',
      'intermediate': 'Level 2 - Intermediate',
      'advanced': 'Level 3 - Advanced'
    };
    return names[level as keyof typeof names] || level;
  };

  const getLevelDescription = (level: string) => {
    const descriptions = {
      'newcomers': 'Introduction to competitive programming fundamentals and basic problem-solving techniques',
      'beginner': 'Basic algorithms, data structures, and implementation skills',
      'intermediate': 'Advanced algorithms, dynamic programming, and graph theory',
      'advanced': 'Contest preparation, advanced topics, and optimization techniques'
    };
    return descriptions[level as keyof typeof descriptions] || 'Training content for this level';
  };

  const getWeeksData = (level: string): Week[] => {
    // Find the current season, current wave, and level, then return its weeks
    const currentSeason = trainingData.seasons.find(s => s.year === season);
    if (!currentSeason) return [];
    
    // Get the current wave or the latest wave
    const currentWave = currentSeason.waves.find(w => w.wave === currentSeason.currentWave) || 
                       currentSeason.waves[currentSeason.waves.length - 1];
    if (!currentWave) return [];
    
    const currentLevel = currentWave.levels.find(l => l.level === level);
    return currentLevel?.weeks || [];
  };

  const getCurrentLevelData = () => {
    const currentSeason = trainingData.seasons.find(s => s.year === season);
    if (!currentSeason) return null;
    
    const currentWave = currentSeason.waves.find(w => w.wave === currentSeason.currentWave) || 
                       currentSeason.waves[currentSeason.waves.length - 1];
    if (!currentWave) return null;
    
    return currentWave.levels.find(l => l.level === level);
  };
  const weeks = getWeeksData(level);
  const levelData = getCurrentLevelData();
  
  // Dynamic calculations
  const currentSeason = trainingData.seasons.find(s => s.year === season);
  const currentWave = currentSeason?.waves.find(w => w.wave === currentSeason.currentWave) || 
                     currentSeason?.waves[currentSeason.waves.length - 1];
  
  // Get current week from level data
  const currentWeek = levelData?.currentWeek || 1;
  const currentLevel = currentWave?.levels.find(l => l.level === level);
  const studentCount = currentLevel?.studentCount || 0;
  const totalWeeks = weeks.length || 12;
  const totalContests = weeks.filter(w => w.topContestant).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/training');
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Training Overview
          </button>
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{getLevelDisplayName(level)}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {getLevelDescription(level)}
            </p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full">
              Season {season}
            </div>
          </div>
        </div>

        {/* Level Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{studentCount}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Students</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-full mb-3">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{totalWeeks}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Total Weeks</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mb-3">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{currentWeek}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Current Week</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full mb-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{totalContests}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Contests</div>
          </div>
        </div>

        {/* Weekly Content */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8">Weekly Training Content</h2>
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 ${
                week.week === currentWeek ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
              } ${
                week.week > currentWeek ? 'opacity-50' : 'hover:shadow-xl cursor-pointer'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="text-xl font-bold flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      Week {week.week}: {week.topic}
                    </h4>
                    {week.week === currentWeek && (
                      <span className="ml-3 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">
                        Current
                      </span>
                    )}
                    {week.week > currentWeek && (
                      <span className="ml-3 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm font-medium rounded-full">
                        Upcoming
                      </span>
                    )}
                    {week.week < currentWeek && (
                      <span className="ml-3 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                        Completed
                      </span>
                    )}
                  </div>
                  {week.practiceSession && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Practice Focus: {week.practiceSession}
                    </p>
                  )}
                </div>
                {week.topContestant && (
                  <div className="flex items-center space-x-2 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-3 rounded-lg">
                    <Award className="w-5 h-5 text-yellow-600" />
                    <div className="text-sm">
                      <div className="font-semibold text-yellow-800 dark:text-yellow-200">
                        {week.topContestant.name}
                      </div>
                      <div className="text-yellow-700 dark:text-yellow-300">
                        {week.topContestant.score} pts
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={`flex flex-wrap gap-3 ${week.week > currentWeek ? '' : ''}`}>
                {week.recordingUrl && (
                  <a
                    href={week.recordingUrl}
                    className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                      week.week > currentWeek 
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/30'
                    }`}
                    onClick={week.week > currentWeek ? (e) => e.preventDefault() : undefined}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Recording
                    {week.week <= currentWeek && <ExternalLink className="w-3 h-3 ml-2" />}
                  </a>
                )}
                {week.problemSheetUrl && (
                  <a
                    href={week.problemSheetUrl}
                    className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                      week.week > currentWeek 
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                        : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/30'
                    }`}
                    onClick={week.week > currentWeek ? (e) => e.preventDefault() : undefined}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Problem Sheet
                    {week.week <= currentWeek && <ExternalLink className="w-3 h-3 ml-2" />}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}