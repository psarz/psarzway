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
    console.log('🎬 Updating videos from YouTube...\n');
    
    // Get channel ID
    const channelId = await getChannelId('@psarz');
    console.log(`✅ Found channel ID: ${channelId}`);
    
    // Get videos
    const youtubeVideos = await getChannelVideos(channelId, 6);
    console.log(`✅ Fetched ${youtubeVideos.length} videos\n`);
    
    // Format videos
    const videos = youtubeVideos.map(video => formatVideoData(video));
    
    console.log('📹 Videos to update:');
    videos.forEach((v, i) => {
      console.log(`${i + 1}. ${v.title} (${v.views} views)`);
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
