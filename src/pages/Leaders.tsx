import React, { useState } from "react";
import {
  Crown,
  Award,
  Star,
  Users,
  Calendar,
  Trophy,
  Code,
  Camera,
  ExternalLink,
  Linkedin,
  Github,
  ChevronDown,
  ChevronUp,
  Facebook,
  Mail,
} from "lucide-react";
import { leadersData, teamsData } from "../data";
import type { Leader, Team } from "../data";
import CFIcon from "../icons/CFIcon";

export function Leaders() {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  const currentLeaders: Leader[] = leadersData.currentLeaders;
  const teams: Team[] = teamsData.teams;

  // Dynamic calculations
  const totalLeaders = currentLeaders.length;
  const totalTeamMembers = teams.reduce(
    (sum, team) => sum + team.members.length,
    0
  );
  const technicalTeamSize =
    teams.find((t) => t.type === "technical")?.members.length || 0;
  const mediaTeamSize =
    teams.find((t) => t.type === "media")?.members.length || 0;

  const getRoleIcon = (role: string) => {
    if (role.includes("Advisor") || role.includes("Faculty")) return Crown;
    if (role.includes("Leader")) return Star;
    if (role.includes("Coordinator")) return Users;
    return Award;
  };

  const getRoleColor = (role: string) => {
    if (role.includes("Advisor") || role.includes("Faculty"))
      return "from-yellow-600 to-orange-600";
    if (role.includes("Leader")) return "from-blue-600 to-purple-600";
    if (role.includes("Coordinator")) return "from-green-600 to-teal-600";
    return "from-gray-600 to-gray-700";
  };

  const getRatingColor = (rating?: number) => {
    if (!rating) return "text-white";
    if (rating >= 2400) return "text-red-600";
    if (rating >= 2300) return "text-amber-600";
    if (rating >= 2100) return "text-amber-400";
    if (rating >= 1900) return "text-purple-600";
    if (rating >= 1600) return "text-blue-600";
    if (rating >= 1400) return "text-cyan-300";
    if (rating >= 1200) return "text-green-600";
    return "text-gray-400";
  };

  const getRatingTitle = (rating?: number) => {
    if (!rating) return "Unrated";
    if (rating >= 4000) return "Borhom";
    if (rating >= 3000) return "Legendary Grandmaster";
    if (rating >= 2600) return "International Grandmaster";
    if (rating >= 2400) return "Grandmaster";
    if (rating >= 2300) return "International Master";
    if (rating >= 2100) return "Master";
    if (rating >= 1900) return "Candidate Master";
    if (rating >= 1600) return "Expert";
    if (rating >= 1400) return "Spcialist";
    if (rating >= 1200) return "Pupil";
    return "Newbie";
  };

  const toggleTeam = (teamName: string) => {
    setExpandedTeam(expandedTeam === teamName ? null : teamName);
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-responsive-3xl font-bold mb-4 sm:mb-6">
            Our Team
          </h1>
          <p className="text-responsive-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the {totalLeaders} dedicated leaders and {totalTeamMembers}{" "}
            team members driving our competitive programming excellence
          </p>
        </div>

        {/* Current Leaders */}
        <section className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8">
            <div className="flex items-center mb-2 sm:mb-0">
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mr-3" />
              <h2 className="text-responsive-xl font-bold">
                Current Leadership Team
              </h2>
            </div>

          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {currentLeaders.map((leader, index) => {
              const Icon = getRoleIcon(leader.role);
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg card-padding hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${getRoleColor(
                        leader.role
                      )} rounded-full flex items-center justify-center mx-auto sm:mx-0`}
                    >
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="mb-3 sm:mb-2">
                        <div className="mb-2">
                          <h3 className="text-responsive-lg font-bold">
                            {leader.name}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-400 font-semibold text-responsive-sm">
                            {leader.role}
                          </p>
                        </div>
                      </div>
                      <div className="mb-3 sm:mb-4">
                        <h4 className="font-semibold mb-2 flex items-center justify-center sm:justify-start text-responsive-sm">
                          <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-600" />
                          Key Achievements
                        </h4>
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                          {leader.achievements.map((achievement, achIndex) => (
                            <span
                              key={achIndex}
                              className="inline-block px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs sm:text-sm rounded-full"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                      {leader.contact && (
                        <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm justify-center sm:justify-start">
                          {leader.contact.email && (
                            <span className="text-gray-600 dark:text-gray-400 break-all">
                              {leader.contact.email}
                            </span>
                          )}
                          {leader.contact.github && (
                            <span className="text-gray-600 dark:text-gray-400 break-all">
                              @{leader.contact.github}
                            </span>
                          )}
                          {leader.contact.cf && (
                            <a
                              href={`https://codeforces.com/profile/${leader.contact.cf}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                            >
                              CF: {leader.contact.cf}
                              <ExternalLink className="w-2 h-2 sm:w-3 sm:h-3 ml-1" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Teams */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center mb-6 sm:mb-8">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
            <h2 className="text-responsive-xl font-bold">Teams</h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {teams.map((team, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                {/* Team Header - Clickable */}
                <div
                  className="card-padding cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => toggleTeam(team.name)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${
                          team.type === "technical"
                            ? "from-blue-600 to-purple-600"
                            : "from-pink-600 to-rose-600"
                        } rounded-full mx-auto sm:mx-0 flex-shrink-0`}
                      >
                        {team.type === "technical" ? (
                          <Code className="w-8 h-8 text-white" />
                        ) : (
                          <Camera className="w-8 h-8 text-white" />
                        )}
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-responsive-xl font-bold">
                          {team.name}
                        </h3>
                        <p className="text-responsive-sm text-gray-600 dark:text-gray-300">
                          {team.description}
                        </p>
                        <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{team.members.length} members</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center sm:justify-end">
                      {expandedTeam === team.name ? (
                        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Team Members - Collapsible */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    expandedTeam === team.name
                      ? "max-h-[auto] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-200 dark:border-gray-700">
                    {team.type === "technical" ? (
                      /* Technical Team Cards */
                      <div className="mt-4 sm:mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                          {team.members.map((member, memberIndex) => (
                            <div
                              key={memberIndex}
                              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.03] w-full min-w-0 flex flex-col"
                            >
                              <div className="flex flex-col mt-1 items-start w-full flex-1">
                                <div className="flex md:flex-row flex-col md:justify-between w-full">
                                  <div className="flex align-center justify-center md:flex-row flex-col items-center md:items-start">
                                    {member.avatar ? (
                                      <div className="w-14 h-14  bg-gradient-to-br from-blue-600 to-purple-600 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-sm sm:text-base mb-3 flex-shrink-0 transition-transform duration-300 hover:scale-110">
                                        <img src={member.avatar} alt="icon" className="w-full h-full object-cover"/>
                                      </div>
                                    ) : (
                                      
                                      <div className="w-14 h-14 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base mb-3 flex-shrink-0 transition-transform duration-300 hover:scale-110">
                                        {member.name.charAt(0)}
                                      </div>
                                    )}

                                    <div className="flex flex-col items-start md:ml-4">
                                      <h4 className="font-bold text-base md:text-lg lg:text-xl break-words w-full leading-tight">
                                        {member.name}
                                      </h4>
                                      {member.handle && (
                                        <a
                                          href={`https://codeforces.com/profile/${member.handle}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="hidden md:block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-2 text-center break-all transition-colors duration-200 hover:underline"
                                        >
                                          {member.handle}
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                  {member.maxRating != undefined && (
                                    <div className="mb-3 flex flex-col items-center md:items-end md:text-lg">
                                      <div
                                        className={`font-bold text-md ${getRatingColor(
                                          member.maxRating
                                        )}`}
                                      >
                                        {member.maxRating}
                                      </div>
                                      <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {getRatingTitle(member.maxRating)}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="flex flex-wrap justify-center sm:justify-center md:justify-start gap-1 w-full mb-3">
                                  {" "}
                                  {member.abouts &&
                                    member.abouts.map((about, i) => (
                                      <span
                                        key={i}
                                        className={`${
                                          i >= 2 ? "hidden md:block" : ""
                                        } p-1 sm:px-3 bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 text-xs font-medium rounded-full mb-2 text-center max-w-full leading-tight`}
                                      >
                                        {about}
                                      </span>
                                    ))}
                                  {member.roles &&
                                    member.roles.map((role, i) => (
                                      <span
                                        key={i}
                                        className=" hidden md:block p-1 sm:px-3 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full mb-2 text-center max-w-full leading-tight"
                                      >
                                        {role}
                                      </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-center space-x-2 w-full mt-auto">
                                  {member.handle && (
                                    <a
                                      href={`https://codeforces.com/profile/${member.handle}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 sm:p-2 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-all duration-200 hover:scale-110"
                                      title="Facebook Profile"
                                    >
                                      <CFIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </a>
                                  )}
                                  {member.linkedin && (
                                    <a
                                      href={`https://linkedin.com/in/${member.linkedin}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-all duration-200 hover:scale-110"
                                      title="LinkedIn Profile"
                                    >
                                      <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </a>
                                  )}
                                  {member.github && (
                                    <a
                                      href={`https://github.com/${member.github}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      // className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-all duration-200 hover:scale-110"
                                      className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-all duration-200 hover:scale-110"
                                      title="GitHub Profile"
                                    >
                                      <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </a>
                                  )}
                                  {member.facebook && <a
                                    href={`https://facebook.com/${member.facebook}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-all duration-200 hover:scale-110"
                                    title="Facebook Profile"
                                  >
                                    <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />
                                  </a>}
                                  {member.email && <a
                                    href={`mailto:${member.email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-all duration-200 hover:scale-110"
                                    title="Email Profile"
                                  >
                                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                                  </a>}

                                  
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Media Team Cards */
                      <div className="mt-4 sm:mt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                          {team.members.map((member, memberIndex) => (
                            <div
                              key={memberIndex}
                              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full min-w-0 flex flex-col"
                            >
                              <div className="flex flex-col items-center text-center w-full flex-1">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-pink-600 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base mb-3 flex-shrink-0 transition-transform duration-300 hover:scale-110">
                                  {member.name.charAt(0)}
                                </div>
                                <h4 className="font-bold text-sm sm:text-base mb-2 text-center break-words w-full leading-tight">
                                  {member.name}
                                </h4>
                                {member.role && (
                                  <span className="inline-block px-2 py-1 sm:px-3 bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-200 text-xs font-medium rounded-full mb-3 text-center max-w-full leading-tight">
                                    {member.role}
                                  </span>
                                )}
                                <div className="flex justify-center w-full mt-auto">
                                  {member.linkedin ? (
                                    <a
                                      href={`https://linkedin.com/in/${member.linkedin}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-all duration-200 hover:scale-110"
                                      title="LinkedIn Profile"
                                    >
                                      <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </a>
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
