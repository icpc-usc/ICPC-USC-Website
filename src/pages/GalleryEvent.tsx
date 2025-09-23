import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Calendar, MapPin, Users, ChevronLeft, ChevronRight, X, ArrowLeft, Download, Share2, ExternalLink } from 'lucide-react';
import { galleryData } from '../data';
import type { Photo } from '../data';

interface EventData {
  title: string;
  date: string;
  location: string;
  category: 'ECPC' | 'ACPC' | 'Training' | 'Social';
  description: string;
  participants: number;
  photos: Photo[];
}

interface GalleryEventProps {
  season: string;
  eventId: string;
  onBack: () => void;
}

export function GalleryEvent({ season, eventId, onBack }: GalleryEventProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const navigate = useNavigate();

  // Mock data - in a real app, this would be fetched based on season and eventId
  const getEventData = (): EventData => {
    // Find the event from gallery data
    const allEvents = galleryData.seasons.flatMap(season => season.events);
    const event = allEvents.find(e => e.id.toString() === eventId);
    
    if (!event) {
      // Return default event if not found
      const defaultEvent = allEvents[0];
      return {
        title: defaultEvent.title,
        date: defaultEvent.date,
        location: defaultEvent.location,
        category: defaultEvent.category,
        description: defaultEvent.description,
        participants: defaultEvent.participants || 0,
        photos: defaultEvent.photos || []
      };
    }
    
    return {
      title: event.title,
      date: event.date,
      location: event.location,
      category: event.category,
      description: event.description,
      participants: event.participants || 0,
      photos: event.photos || []
    };
  };

  const eventData = getEventData();

  const openLightbox = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    if (!eventData.photos || eventData.photos.length === 0) return;
    const nextIndex = (currentPhotoIndex + 1) % eventData.photos.length;
    setCurrentPhotoIndex(nextIndex);
    setSelectedPhoto(eventData.photos[nextIndex]);
  };

  const prevPhoto = () => {
    if (!eventData.photos || eventData.photos.length === 0) return;
    const prevIndex = (currentPhotoIndex - 1 + eventData.photos.length) % eventData.photos.length;
    setCurrentPhotoIndex(prevIndex);
    setSelectedPhoto(eventData.photos[prevIndex]);
  };

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors duration-200"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/gallery');
            }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Gallery
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium mr-4 ${getCategoryColor(eventData.category)}`}>
                    {eventData.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Season {season}</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">{eventData.title}</h1>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {eventData.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold">Date</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{eventData.date}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-semibold">Location</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{eventData.location}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-semibold">Participants</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{eventData.participants} people</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Stats */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-gray-600" />
            <span className="text-lg font-semibold">{eventData.photos ? eventData.photos.length : 0} Photos</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <Download className="w-4 h-4 mr-2" />
              Download All
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {eventData.photos && eventData.photos.length > 0 ? eventData.photos.map((photo, index) => (
            <div
              key={photo.id}
              className="aspect-square bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              onClick={() => openLightbox(photo, index)}
            >
              <div className="relative w-full h-full">
                <img
                  src={photo.url}
                  alt={photo.caption || `Photo ${photo.id}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {photo.caption && (
                    <p className="text-white text-sm font-medium mb-1 line-clamp-2">{photo.caption}</p>
                  )}
                  {photo.photographer && (
                    <p className="text-white/90 text-xs">📸 {photo.photographer}</p>
                  )}
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-12">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No photos available
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Photos for this event haven't been uploaded yet.
              </p>
            </div>
          )}
        </div>

        {/* Lightbox */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <div 
              className="relative max-w-6xl max-h-[90vh] w-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation buttons */}
              {eventData.photos && eventData.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Container */}
              <div className="flex-1 flex items-center justify-center min-h-0 p-4">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption || `Photo ${selectedPhoto.id}`}
                  className="max-w-auto max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Photo info */}
              <div className="mt-4 bg-white/10 dark:bg-black/20 backdrop-blur-md text-white p-4 rounded-lg border border-white/20">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {selectedPhoto.caption && (
                      <p className="font-medium mb-2 text-lg">{selectedPhoto.caption}</p>
                    )}
                    {selectedPhoto.photographer && (
                      <p className="text-sm text-white/80 flex items-center">
                        <Camera className="w-4 h-4 mr-2" />
                        Photo by {selectedPhoto.photographer}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    <div className="text-sm text-white/80 bg-white/10 dark:bg-black/20 px-3 py-1 rounded-full">
                      {currentPhotoIndex + 1} of {eventData.photos ? eventData.photos.length : 0}
                    </div>
                    <button
                      onClick={() => window.open(selectedPhoto.url, '_blank')}
                      className="p-2 bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/40 rounded-full transition-colors duration-200"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}