import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { galleryData } from '../data';
import type { GalleryEvent } from '../data';

interface GalleryProps {
  onEventSelect: (season: string, eventId: string) => void;
}

export function Gallery({ onEventSelect }: GalleryProps) {
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();

  const seasons = galleryData.seasons;

  const currentSeason = seasons[selectedSeason];
  
  // Dynamic calculations - count actual photos from data
  const totalEvents = currentSeason.events.length;
  const totalPhotos = currentSeason.events.reduce((sum, event) => {
    // Count actual photos in the photos array, fallback to photoCount if photos array doesn't exist
    const actualPhotoCount = event.photos ? event.photos.length : event.photoCount;
    return sum + actualPhotoCount;
  }, 0);

  const categories = [
    { id: 'all', name: 'All Events', color: 'gray' },
    { id: 'ECPC', name: 'ECPC', color: 'blue' },
    { id: 'ACPC', name: 'ACPC', color: 'purple' },
    { id: 'Training', name: 'Training', color: 'green' },
    { id: 'Social', name: 'Social', color: 'yellow' }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? currentSeason.events 
    : currentSeason.events.filter(event => event.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      'ECPC': 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200',
      'ACPC': 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200',
      'Training': 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200',
      'Social': 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-8 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Event Gallery</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Capturing memories from our competitive programming journey, training sessions, and community events
          </p>
        </div>

        {/* Season Selector */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {seasons.map((season, index) => (
              <button
                key={index}
                onClick={() => setSelectedSeason(index)}
                className={`px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${
                  selectedSeason === index
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{season.season}</span>
                  {season.isActive && (
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  )}
                </div>
                <div className="text-sm opacity-75">{season.year}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.slice(1).map((category) => {
            const count = currentSeason.events.filter(event => event.category === category.id).length;
            return (
              <div key={category.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center hover-lift">
                <div className="text-2xl font-bold text-blue-600 mb-1">{count}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{category.name} Events</div>
              </div>
            );
          })}
        </div>

        {/* Season Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 hover-lift">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            {currentSeason.season} - {currentSeason.year}
            {currentSeason.isActive && (
              <span className="ml-3 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">
                Active
              </span>
            )}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
            {currentSeason.description}
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {totalEvents} events • {totalPhotos} total photos
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 hover-lift cursor-pointer group"
              onClick={() => {
                onEventSelect(currentSeason.year, event.id.toString());
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate(`/gallery/event/${currentSeason.year}/${event.id}`);
              }}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={event.coverImage}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center space-x-2">
                  <Camera className="w-4 h-4" />
                  <span className="text-sm font-medium">{event.photos ? event.photos.length : event.photoCount}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  {event.participants && (
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{event.participants} participants</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {event.photos ? event.photos.length : event.photoCount} photos
                  </span>
                  {/* <ArrowRight className="w-5 h-5 text-blue-600 transform group-hover:translate-x-2 group-hover:scale-110 transition-transform duration-300" /> */}
                  <ArrowRight className="w-5 h-5 text-blue-600 transform group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No events found in this category
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different category or season. Total available: {totalEvents} events with {totalPhotos} photos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}