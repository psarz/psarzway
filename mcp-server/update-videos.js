/**
 * Standalone script to update videos from YouTube
 * Run with: node update-videos.js
 */

import fs from 'fs';
import path from 'path';
import { getChannelVideos, formatVideoData, getChannelId } from './youtube-api.js';

const SCRIPT_JS_PATH = path.join(process.cwd(), '..', 'script.js');

async function updateVideos() {
  try {
    console.log('🎬 Updating videos from YouTube (long-form only)...\n');
    
    // Get channel ID
    const channelId = await getChannelId('@psarz');
    console.log(`✅ Found channel ID: ${channelId}`);
    
    // Get all videos from channel (fetch in batches)
    let allYoutubeVideos = [];
    let pageToken = null;
    let batchCount = 0;
    const batchSize = 50;
    const maxBatches = 10; // Up to 500 videos
    
    do {
      const youtubeVideos = await getChannelVideos(channelId, batchSize, pageToken);
      allYoutubeVideos = allYoutubeVideos.concat(youtubeVideos);
      pageToken = youtubeVideos.nextPageToken;
      batchCount++;
      console.log(`✅ Fetched batch ${batchCount} (${youtubeVideos.length} videos)`);
      
      if (!pageToken || batchCount >= maxBatches) break;
    } while (pageToken);
    
    console.log(`✅ Total videos fetched: ${allYoutubeVideos.length}\n`);
    
    // Format videos and filter out shorts (videos under 100 seconds are shorts)
    const allVideos = allYoutubeVideos.map(video => formatVideoData(video));
    const videos = allVideos.filter(video => video.durationInSeconds >= 100);
    
    console.log(`✅ Filtered to ${videos.length} long-form videos (videos under 100 seconds excluded)\n`);
    
    console.log('📹 Videos to update:');
    videos.forEach((v, i) => {
      console.log(`${i + 1}. ${v.title.substring(0, 40)}... (${v.duration}, ${v.views} views)`);
    });
    
    // Update script.js
    updateScriptJS(videos);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

function updateScriptJS(videos) {
  try {
    // Create video objects
    const videosArray = videos.map((video, index) => {
      return `    {
        id: "${video.id}",
        title: "${video.title.replace(/"/g, '\\"')}",
        category: "${video.category}",
        description: "${video.description.replace(/"/g, '\\"')}",
        duration: "${video.duration}",
        date: "${video.date}",
        views: "${video.views}"
    }${index < videos.length - 1 ? ',' : ''}`;
    }).join('\n');
    
    // Read current script.js
    let scriptContent = fs.readFileSync(SCRIPT_JS_PATH, 'utf-8');
    
    // Create new config
    const newConfig = `const videosConfig = [
${videosArray}
];`;
    
    // Replace old config with new one
    scriptContent = scriptContent.replace(
      /const videosConfig = \[[\s\S]*?\];/,
      newConfig
    );
    
    // Write back
    fs.writeFileSync(SCRIPT_JS_PATH, scriptContent, 'utf-8');
    
    console.log(`\n✅ Updated script.js with ${videos.length} videos`);
    console.log(`📁 File: ${SCRIPT_JS_PATH}`);
    
  } catch (error) {
    console.error('Error updating script.js:', error.message);
    throw error;
  }
}

// Run
updateVideos();
