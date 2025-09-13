import React, { useState } from 'react';
import { Users, Award, ExternalLink, Search, Filter } from 'lucide-react';
import { membersData } from '../data';
import type { Member } from '../data';

export function Members() {
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const members: Member[] = membersData.members;

  const seasons = ['all', '2024-2025', '2023-2024', '2022-2023'];
  const levels = ['all', 'Level 0', 'Level 1', 'Level 2'];

  const getRatingColor = (rating?: number) => {
    if (!rating) return 'text-gray-500';
    if (rating >= 1900) return 'text-red-600';
    if (rating >= 1600) return 'text-blue-600';
    if (rating >= 1400) return 'text-cyan-600';
    if (rating >= 1200) return 'text-green-600';
    return 'text-gray-600';
  };

  const getRatingTitle = (rating?: number) => {
    if (!rating) return 'Unrated';
    if (rating >= 1900) return 'Candidate Master';
    if (rating >= 1600) return 'Expert';
    if (rating >= 1400) return 'Specialist';
    if (rating >= 1200) return 'Pupil';
    if (rating >= 1) return 'Newbie';
    return 'Unrated'
  };

  const filteredMembers = members.filter(member => {
    const matchesSeason = selectedSeason === 'all' || member.season === selectedSeason;
    const matchesLevel = selectedLevel === 'all' || member.level === selectedLevel;
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.handle.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSeason && matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-8 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Community Members</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the talented individuals driving our competitive programming community forward
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{members.length}</div>
            <div className="text-gray-600 dark:text-gray-400">Total Members</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {members.filter(m => m.season === '2024-2025').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Active Season</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {members.filter(m => m.rating && m.rating >= 1600).length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Expert+ Level</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or handle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {seasons.map(season => (
                  <option key={season} value={season}>
                    {season === 'all' ? 'All Seasons' : season}
                  </option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                    
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{member.name?.charAt(0) || "?"}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{member.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 dark:text-gray-400">@{member.handle}</span>
                      <a
                        href={`https://codeforces.com/profile/${member.handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        
                      >
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-blue-600 cursor-pointer" />
                      </a>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium w-fill whitespace-nowrap ${
                  member.level === 'Level 2' ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200' :
                  member.level === 'Level 1' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200' :
                  'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                }`}>
                  {member.level}
                </span>
              </div>

              {member.rating >= 0 && (
                <div className="mb-4">
                  <div className={`text-2xl font-bold ${getRatingColor(member.rating)}`}>
                    {member.rating}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {getRatingTitle(member.rating)} • Max: {member.maxRating}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                  Season {member.season}
                </span>
              </div>

              {member.achievements.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-1 text-yellow-600" />
                    Achievements
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {member.achievements.map((achievement, achIndex) => (
                      <span
                        key={achIndex}
                        className="inline-block px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-xs rounded-full"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No members found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters. Total members: {members.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}