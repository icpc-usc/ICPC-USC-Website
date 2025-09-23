import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Mail, MapPin, Code2, Facebook } from 'lucide-react';
import { homeData } from '../data';

export function Footer() {
  const navigate = useNavigate();
  const { logo } = homeData.hero;

  return (
    <footer className="bg-gray-900 dark:bg-black text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto container-padding py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 sm:w-12">
                <img src={logo} alt="ICPC USC Logo" className="" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">ICPC USC Community</h3>
                <p className="text-xs sm:text-sm text-gray-400">University of Sadat City</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Empowering students through competitive programming. Join us in our journey to excellence
              in algorithmic problem solving and programming contests.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fadeInUp animate-delay-200">
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    navigate('/training');
                  }}
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  Training Sessions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    navigate('/gallery');
                  }}
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  Event Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    navigate('/members');
                  }}
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  Community Members
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    navigate('/leaders');
                  }}
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  Leadership Team
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fadeInRight animate-delay-300">
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contact</h4>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 flex-shrink-0" />
                <span className="text-gray-300">University of Sadat City</span>
              </div>
              <div className="flex items-center space-x-2">
                <Github className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 flex-shrink-0" />
                <a className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1" href="https://github.com/icpc-usc" target="_blank">icpc-usc</a>
              </div>
             <div className="flex items-center space-x-2">
                <Facebook className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 flex-shrink-0" />
                <a className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1" href="https://www.facebook.com/profile.php?id=100066890643130" target="_blank">facebook page</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8 mt-6 sm:mt-8 text-center animate-fadeInUp animate-delay-500">
          <p className="text-xs sm:text-sm text-gray-300">
            © 2025 ICPC USC Community. Built with passion for competitive programming.
          </p>
        </div>
      </div>
    </footer>
  );
}