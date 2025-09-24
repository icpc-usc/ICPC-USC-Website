import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Code2, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { homeData } from '../data';
import IcpcUscIcon from '../icons/IcpcUscIcon';

interface HeaderProps {
  onTrainingLevelSelect: (season: string, level: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Header({ onTrainingLevelSelect, theme, toggleTheme }: HeaderProps) {
  // Theme state: first like system, then save user choice

  // Apply theme to <html> and save to localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isTrainingDropdownOpen, setIsTrainingDropdownOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logo } = homeData.hero;

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Training', path: '/training', hasDropdown: true },
    { name: 'Members', path: '/members' },
    { name: 'Our Team', path: '/leaders' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'History', path: '/history' },
    { name: 'Contact', path: '/contact' },
  ];

  const currentSeasonLevels = [
    { name: 'Level 0 - Newcomers', level: 'newcomers' },
    { name: 'Level 1 - Beginner', level: 'beginner' },
    { name: 'Level 2 - Intermediate', level: 'intermediate' },
  ];

  const handleTrainingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/training');
    setIsTrainingDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleLevelSelect = (level: string) => {
    onTrainingLevelSelect('2024-2025', level);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/training/level/2024-2025/${level}`);
    setIsTrainingDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const isCurrentPath = (path: string) => location.pathname === path || (path === '/training' && location.pathname.startsWith('/training'));

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            navigate('/');
          }}>
            <div className="flex items-center justify-center w-10 sm:w-12">
              <IcpcUscIcon className='text-blue-800 dark:text-white' />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-blue-800 dark:text-white">ICPC USC</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setIsTrainingDropdownOpen(true)}
                onMouseLeave={() => item.hasDropdown && setIsTrainingDropdownOpen(false)}
              >
                <button
                  onClick={item.hasDropdown ? handleTrainingClick : () => navigate(item.path)}
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isCurrentPath(item.path)
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
                </button>
                
                {/* Training Dropdown */}
                {item.hasDropdown && isTrainingDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 sm:w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    {/* <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide border-b border-gray-200 dark:border-gray-700">
                      Current Season (2024-2025)
                    </div> */}
                    {currentSeasonLevels.map((level) => (
                      <button
                        key={level.level}
                        onClick={() => handleLevelSelect(level.level)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        {level.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={item.hasDropdown ? handleTrainingClick : () => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isCurrentPath(item.path)
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {item.name}
                  </button>
                  {item.hasDropdown && (
                    <div className="ml-4 mt-2 space-y-1">
                      {/* <div className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide break-words">
                        Current Season
                      </div> */}
                      {currentSeasonLevels.map((level) => (
                        <button
                          key={level.level}
                          onClick={() => handleLevelSelect(level.level)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                          {level.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}