import fs from 'fs';
import path from 'path';
import axios from 'axios';

/**
 * MCP Server for auto-updating Psarz's Way video metadata
 * Fetches videos from YouTube channel and updates script.js
 */

const CHANNEL_URL = 'https://www.youtube.com/@psarz';
const CHANNEL_ID = 'psarz'; // or your actual channel ID
const SCRIPT_JS_PATH = path.join(process.cwd(), '..', 'script.js');

// Video categories mapping
const CATEGORY_MAP = {
  'review': 'reviews',
  'bike': 'reviews',
  'gear': 'reviews',
  'ride': 'rides',
  'vlog': 'rides',
  'trip': 'rides',
  'oil': 'maintenance',
  'change': 'maintenance',
  'maintenance': 'maintenance',
  'repair': 'maintenance',
  'tip': 'tips',
  'guide': 'tips',
  'tutorial': 'tips',
  'how to': 'tips'
};

/**
 * Fetch videos from YouTube channel using yt-search
 * Note: Requires youtube-sr or similar package
 */
async function fetchYouTubeVideos() {
  console.log('🔍 Fetching videos from YouTube channel...');
  
  try {
    // For now, we'll use a manual approach or YouTube API
    // This is a placeholder - you need to implement actual YouTube API integration
    console.log('⚠️  YouTube API integration required');
    console.log('Set up YouTube Data API v3 for automatic fetching');
    return [];
  } catch (error) {
    console.error('❌ Error fetching videos:', error.message);
    return [];
  }
}

/**
 * Categorize video based on title and description
 */
function categorizeVideo(title, description = '') {
  const text = `${title} ${description}`.toLowerCase();
  
  for (const [keyword, category] of Object.entries(CATEGORY_MAP)) {
    if (text.includes(keyword)) {
      return category;
    }
  }
  
  return 'rides'; // default category
}

/**
 * Convert duration from PT format to MM:SS
 * Example: PT12M34S -> 12:34
 */
function formatDuration(duration) {
  if (!duration) return '00:00';
  
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
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

/**
 * Parse view count (e.g., "1.2M" -> "1.2M")
 */
function formatViews(viewCount) {
  if (!viewCount) return '0';
  
  const count = parseInt(viewCount);
  
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  
  return count.toString();
}

/**
 * Update script.js with new video data
 */
function updateScriptJS(videos) {
  if (videos.length === 0) {
    console.log('⚠️  No videos to update');
    return false;
  }
  
  try {
    // Create the videosConfig array
    const videosArray = videos.map((video, index) => `    {
        id: "${video.id}",
        title: "${video.title.replace(/"/g, '\\"')}",
        category: "${video.category}",
        description: "${video.description.replace(/"/g, '\\"')}",
        duration: "${video.duration}",
        date: "${video.date}",
        views: "${video.views}"
    }${index < videos.length - 1 ? ',' : ''}`).join('\n');
    
    // Read current script.js
    let scriptContent = fs.readFileSync(SCRIPT_JS_PATH, 'utf-8');
    
    // Replace the videosConfig array
    const newConfig = `const videosConfig = [
${videosArray}
];`;
    
    scriptContent = scriptContent.replace(
      /const videosConfig = \[[\s\S]*?\];/,
      newConfig
    );
    
    // Write updated script.js
    fs.writeFileSync(SCRIPT_JS_PATH, scriptContent, 'utf-8');
    
    console.log(`✅ Updated script.js with ${videos.length} videos`);
    return true;
  } catch (error) {
    console.error('❌ Error updating script.js:', error.message);
    return false;
  }
}

/**
 * Main update function
 */
async function updateVideos() {
  console.log('🎬 Psarz\'s Way - Auto Video Update Server');
  console.log('==========================================\n');
  
  // Fetch videos from YouTube
  const videos = await fetchYouTubeVideos();
  
  if (videos.length === 0) {
    console.log('\n⚠️  Setup Instructions:');
    console.log('1. Get YouTube Data API v3 credentials from Google Cloud Console');
    console.log('2. Create a .env file with: YOUTUBE_API_KEY=your_key');
    console.log('3. Update fetchYouTubeVideos() function to use the API');
    console.log('\nAlternatively, manually update videos in script.js');
    return false;
  }
  
  // Update script.js
  const success = updateScriptJS(videos);
  
  if (success) {
    console.log('\n✨ Videos updated successfully!');
    console.log(`📺 ${videos.length} videos are now live`);
  }
  
  return success;
}

/**
 * Start MCP Server (placeholder for future implementation)
 */
async function startServer() {
  console.log('Starting MCP Server...');
  console.log('Listening on port 3000');
  
  // Placeholder for actual MCP server implementation
  // This would typically use the MCP SDK
  
  // Run auto-update every hour
  setInterval(async () => {
    console.log('\n[AUTO-UPDATE] Checking for new videos...');
    await updateVideos();
  }, 3600000); // 1 hour
}

// Run on startup
if (process.argv[2] === 'start') {
  startServer();
} else {
  updateVideos();
}

export { updateVideos, fetchYouTubeVideos, categorizeVideo, formatDuration };
