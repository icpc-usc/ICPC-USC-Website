import React from "react";
import {
  Calendar,
  Trophy,
  Users,
  Award,
  TrendingUp,
  Star,
  Target,
  Medal,
} from "lucide-react";
import { historyData } from "../data";
import type { Milestone } from "../data";
import AcpcIcon from "../icons/AcpcIcon";

export function History() {
  const milestones: Milestone[] = historyData.milestones;
  const achievements = historyData.achievements;
  const notableMembers = historyData.notableMembers;

  // Dynamic calculations
  const totalYears = milestones.length;
  const totalMembers = milestones.reduce(
    (sum, milestone) => sum + (milestone.stats?.members || 0),
    0
  );
  const totalContests = milestones.reduce(
    (sum, milestone) => sum + (milestone.stats?.acpcTeams || 0),
    0
  );
  const totalAwards = milestones.reduce(
    (sum, milestone) => sum + (milestone.stats?.awards || 0),
    0
  );

  // Map icon strings to actual icon components
  const getIcon = (iconName: string) => {
    const icons = {
      Trophy,
      Star,
      Target,
      TrendingUp,
    };
    return icons[iconName as keyof typeof icons] || Trophy;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Journey</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From humble beginnings to competitive programming excellence - the
            story of ICPC USC Community's growth, achievements, and the
            dedicated individuals who made it possible.
          </p>
        </div>

        {/* Key Achievements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Key Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = getIcon(achievement.icon);
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-full mb-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {achievement.count}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Timeline of Growth
          </h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="relative flex items-start space-x-8"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {milestone.year}
                      </h3>
                      {milestone.stats && (
                        <div className="flex space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-gray-600" />
                            <span>{milestone.stats.members}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {/* <Trophy className="w-4 h-4 text-gray-600" /> */}
                            {/* <img
                              src="https://res.cloudinary.com/dcatuev0j/image/upload/v1757903030/5QJGtH01_dra8xz.svg"
                              alt="Contest Icon"
                              className="w-5 h-5 text-gray-600"
                            /> */}

                           <AcpcIcon className="w-4.5 h-4.5 fill-gray-600" />
                            <span>{milestone.stats.acpcTeams}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="w-4 h-4 text-gray-600" />
                            <span>{milestone.stats.awards}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <h4 className="text-xl font-semibold mb-3">
                      {milestone.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {milestone.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {milestone.achievements.map((achievement, achIndex) => (
                        <div
                          key={achIndex}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notable Members */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Hall of Fame</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notableMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    <Medal className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                      {member.achievement}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {member.rating}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {member.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Looking Forward</h2>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto mb-8">
              As we continue to grow, our vision remains clear: to establish USC
              as a leading competitive programming hub in Egypt, producing
              world-class problem solvers and fostering a culture of algorithmic
              excellence that will inspire future generations. Over {totalYears}{" "}
              years, we've grown from{" "}
              {milestones[milestones.length - 1]?.stats?.members || 25} to{" "}
              {milestones[0]?.stats?.members || 85} members.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-bold mb-2">100+</div>
                <div className="opacity-90">Members by 2026</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">World Finals</div>
                <div className="opacity-90">Qualification Goal</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">
                  {totalAwards}+ Awards
                </div>
                <div className="opacity-90">Championship Target</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
