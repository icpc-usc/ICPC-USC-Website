import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Trophy, Users, Calendar, Star } from 'lucide-react';
import { homeData, membersData, trainingData } from '../data';

export function Home() {
  const navigate = useNavigate();
  const achievements = homeData.achievements;
  const galleryHighlights = homeData.galleryHighlights;
  const heroData = homeData.hero;
  
  // Dynamic calculations
  const totalMembers = membersData.members.length;
  const currentSeasonMembers = membersData.members.filter(m => m.season === '2024-2025').length;
  const expertMembers = membersData.members.filter(m => m.rating && m.rating >= 1600).length;
  const currentSeason = trainingData.seasons.find(s => s.isActive);
  
  // Calculate total training hours based on completed weeks across all levels
  const totalTrainingHours = currentSeason ? 
    currentSeason.waves.reduce((waveSum, wave) => {
      return waveSum + wave.levels.reduce((levelSum, level) => {
        const completedWeeks = level.weeks.filter((_, index) => index + 1 < currentSeason.currentWeek).length;
        return levelSum + (completedWeeks * 3); // 3 hours per week per level
      }, 0);
    }, 0) : 0;
  
  // Update hero stats dynamically
  const dynamicStats = [
    { value: `${currentSeasonMembers}+`, label: "Active Members" },
    { value: "14", label: "ECPC Teams" },
    { value: `${expertMembers}+`, label: "Experts" },
    { value: `${totalTrainingHours}+`, label: "Training Hours" }
  ];

  // Map icon strings to actual icon components
  const getIcon = (iconName: string) => {
    const icons = {
      Trophy,
      Users,
      Calendar,
      Star
    };
    return icons[iconName as keyof typeof icons] || Trophy;
  };

  return (
    <div className="text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroData.backgroundImage}
            alt="ICPC USC Community Group Photo"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-purple-900/90 to-indigo-900/95 dark:from-blue-900/100 dark:via-purple-900/90 dark:to-indigo-900/100"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-48 sm:w-64 md:w-80">
              <img src={heroData.logo} alt="ICPC USC Logo" className="animate-float" />
            </div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto animate-fadeInUp animate-delay-500">
            {heroData.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 animate-fadeInUp animate-delay-700">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/training');
              }}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-xl hover:shadow-2xl text-sm sm:text-base"
            >
              Training <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <a className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 border border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 text-sm sm:text-base" href="https://discord.gg/UxEkfXZpJw" target="_blank">
              Join Community
            </a>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto animate-fadeIn">
            {dynamicStats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 hover-lift">
                <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-responsive-2xl font-bold mb-4 sm:mb-6">Who We Are</h2>
            <p className="text-responsive-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The ICPC USC Community is a passionate group of {totalMembers}+ competitive programmers at the University of Sadat City.
              We train together, compete together, and grow together in our journey towards algorithmic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {achievements.map((achievement, index) => {
              const Icon = getIcon(achievement.icon);
              return (
                <div
                  key={index}
                  className="text-center card-padding rounded-xl bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-all duration-200 hover-lift"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-3 sm:mb-4 animate-float">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-responsive-lg font-bold mb-2">{achievement.title}</h3>
                  <p className="text-responsive-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Highlights */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-responsive-2xl font-bold mb-4 sm:mb-6">Event Highlights</h2>
            <p className="text-responsive-base text-gray-600 dark:text-gray-300">
              Memorable moments from ECPC, ACPC, and community events
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {galleryHighlights.map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 hover-lift"
              >
                <img
                  src={image}
                  alt={`Event highlight ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/gallery');
              }}
              className="inline-flex items-center px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              View Full Gallery <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h2 className="text-responsive-2xl font-bold mb-4 sm:mb-6">Ready to Join Our Community?</h2>
          <p className="text-responsive-base mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're a beginner or an experienced programmer, there's a place for you in our community.
            Join our {totalMembers}+ members and achieve excellence in competitive programming together.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/training');
              }}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Get Started Today
            </button>
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/contact');
              }}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 border border-white/20 shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}