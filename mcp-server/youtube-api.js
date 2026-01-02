/**
 * YouTube API Integration for Psarz's Way
 * Fetches video metadata from @psarz channel
 */

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID || 'psarz';

if (!YOUTUBE_API_KEY) {
  console.error('❌ YOUTUBE_API_KEY not set in .env file');
  console.error('Get one from: https://console.cloud.google.com/');
}

/**
 * Get channel ID from channel handle (@psarz)
 */
async function getChannelId(channelHandle) {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: channelHandle,
        type: 'channel',
        key: YOUTUBE_API_KEY,
        maxResults: 1
      }
    });
    
    if (response.data.items.length === 0) {
      throw new Error(`Channel ${channelHandle} not found`);
    }
    
    return response.data.items[0].id.channelId;
  } catch (error) {
    console.error('Error getting channel ID:', error.message);
    throw error;
  }
}

/**
 * Get videos from channel
 */
async function getChannelVideos(channelId, maxResults = 50, pageToken = null) {
  try {
    // First, get upload playlist ID
    const channelResponse = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: 'contentDetails',
        id: channelId,
        key: YOUTUBE_API_KEY
      }
    });
    
    const uploadPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;
    
    // Get videos from uploads playlist
    const videosResponse = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        part: 'snippet,contentDetails',
        playlistId: uploadPlaylistId,
        key: YOUTUBE_API_KEY,
        maxResults: maxResults,
        order: 'date',
        pageToken: pageToken
      }
    });
    
    const videoIds = videosResponse.data.items.map(item => item.contentDetails.videoId);
    
    // Get video statistics (views, duration, etc.)
    const statsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'statistics,contentDetails,snippet',
        id: videoIds.join(','),
        key: YOUTUBE_API_KEY
      }
    });
    
    // Add nextPageToken to response
    statsResponse.data.items.nextPageToken = videosResponse.data.nextPageToken;
    
    return statsResponse.data.items;
  } catch (error) {
    console.error('Error getting channel videos:', error.message);
    throw error;
  }
}

/**
 * Format video object for script.js
 */
function formatVideoData(youtubeVideo) {
  // Clean description: remove newlines, escape quotes, and truncate
  const cleanDescription = youtubeVideo.snippet.description
    .substring(0, 150)
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/"/g, '\\"') // Escape quotes
    .trim();
  
  return {
    id: youtubeVideo.id,
    title: youtubeVideo.snippet.title.replace(/"/g, '\\"'), // Escape quotes in title too
    description: cleanDescription,
    duration: formatDuration(youtubeVideo.contentDetails.duration),
    date: formatDate(youtubeVideo.snippet.publishedAt),
    views: formatViews(youtubeVideo.statistics.viewCount),
    category: categorizeVideo(youtubeVideo.snippet.title, youtubeVideo.snippet.description),
    durationInSeconds: convertDurationToSeconds(youtubeVideo.contentDetails.duration)
  };
}

/**
 * Convert PT format duration to seconds
 */
function convertDurationToSeconds(duration) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);
  
  if (!matches) return 0;
  
  const hours = parseInt(matches[1] || 0);
  const minutes = parseInt(matches[2] || 0);
  const seconds = parseInt(matches[3] || 0);
  
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Convert PT format duration to MM:SS
 */
function formatDuration(duration) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);
  
  if (!matches) return '00:00';
  
  const hours = parseInt(matches[1] || 0);
  const minutes = parseInt(matches[2] || 0);
  const seconds = parseInt(matches[3] || 0);
  
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Format date to YYYY-MM-DD
 */
function formatDate(dateString) {
  return new Date(dateString).toISOString().split('T')[0];
}

/**
 * Format view count
 */
function formatViews(viewCount) {
  const count = parseInt(viewCount);
  
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  
  return count.toString();
}

/**
 * Categorize video based on title/description
 */
function categorizeVideo(title, description = '') {
  const text = `${title} ${description}`.toLowerCase();
  
  const categories = {
    'reviews': ['review', 'bike', 'gear', 'helmet', 'jacket', 'gloves'],
    'rides': ['ride', 'vlog', 'trip', 'adventure', 'journey', 'ride with me'],
    'maintenance': ['oil', 'change', 'maintenance', 'repair', 'fix', 'tutorial'],
    'tips': ['tip', 'guide', 'tutorial', 'how to', 'lesson', 'learn', 'beginner']
  };
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return category;
    }
  }
  
  return 'rides'; // default
}

export { getChannelId, getChannelVideos, formatVideoData, formatDuration, formatDate, formatViews, categorizeVideo, convertDurationToSeconds };
