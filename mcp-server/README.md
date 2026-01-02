# Psarz's Way MCP Server

Auto-update video metadata from your YouTube channel.

## Features

✅ Automatically fetch videos from @psarz YouTube channel  
✅ Extract video ID, title, description, duration, views  
✅ Auto-categorize videos (reviews, rides, maintenance, tips)  
✅ Update script.js with latest video data  
✅ Format dates and view counts  
✅ Scheduled updates (every hour)

## Setup

### 1. Install Dependencies

```bash
cd mcp-server
npm install
```

### 2. Get YouTube API Key

See `.env.example` for detailed instructions.

```bash
# Create .env file
cp .env.example .env
# Edit .env and add your YouTube API key
```

### 3. Run Updates

**One-time update:**
```bash
npm run update-videos
```

**Auto-update server (every hour):**
```bash
npm start
```

**Development mode (watch for changes):**
```bash
npm run dev
```

## How It Works

1. **Fetches videos** from YouTube Data API v3
2. **Extracts metadata:**
   - Video ID
   - Title
   - Description
   - Duration (PT format → MM:SS)
   - Published date
   - View count
3. **Auto-categorizes** based on keywords:
   - Reviews: bike, gear, review, helmet, jacket
   - Rides: ride, vlog, trip, adventure, journey
   - Maintenance: oil, change, repair, fix
   - Tips: tutorial, guide, how to, lesson
4. **Updates** `/script.js` with new video data

## File Structure

```
mcp-server/
├── package.json          # Dependencies
├── .env.example          # Environment setup guide
├── server.js             # MCP Server (main)
├── youtube-api.js        # YouTube API integration
├── update-videos.js      # Standalone update script
└── README.md             # This file
```

## Environment Variables

```env
YOUTUBE_API_KEY=your_api_key_here
CHANNEL_ID=psarz
```

## Example Output

```
🎬 Updating videos from YouTube...

✅ Found channel ID: UCxxxxxxxxxxxxxx
✅ Fetched 6 videos

📹 Videos to update:
1. Motorcycle Adventure Vlog (15K views)
2. How to Change Oil Like a Pro (5.1K views)
3. 5 Essential Riding Tips (22K views)

✅ Updated script.js with 6 videos
```

## Auto-Update Schedule

By default, updates run every **1 hour** when server is running.

Edit `server.js` line to change interval:
```javascript
setInterval(async () => {
  console.log('\n[AUTO-UPDATE] Checking for new videos...');
  await updateVideos();
}, 3600000); // Change this: 1000 = 1 second
```

## Troubleshooting

**"YOUTUBE_API_KEY not set"**
- Create `.env` file in `mcp-server/` folder
- Add your API key: `YOUTUBE_API_KEY=your_key`

**"Channel not found"**
- Check channel ID in .env
- Make sure it's spelled correctly (case-sensitive)

**"API quota exceeded"**
- YouTube API has daily quotas
- Free tier: 10,000 units/day
- One video fetch = ~5-10 units
- Wait 24 hours or upgrade quota

**Videos not updating**
- Check that your videos are PUBLIC (not Private/Unlisted)
- Verify embedding is enabled in video settings
- Check YouTube API key permissions

## Advanced: Deploy as Scheduled Task

### Linux/Mac (Cron)
```bash
# Edit crontab
crontab -e

# Add this line (runs every hour):
0 * * * * cd /path/to/mcp-server && npm run update-videos

# Or every 30 minutes:
*/30 * * * * cd /path/to/mcp-server && npm run update-videos
```

### Windows (Task Scheduler)
1. Open Task Scheduler
2. Create Basic Task
3. Set trigger: Hourly
4. Set action: `node update-videos.js` in mcp-server folder

### GitHub Actions (Free)
Create `.github/workflows/update-videos.yml`:
```yaml
name: Auto Update Videos
on:
  schedule:
    - cron: '0 * * * *'  # Every hour

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd mcp-server && npm install
      - run: cd mcp-server && npm run update-videos
        env:
          YOUTUBE_API_KEY: ${{ secrets.YOUTUBE_API_KEY }}
      - run: git add script.js
      - run: git commit -m "Auto-update videos from YouTube" || true
      - run: git push
```

## Future Enhancements

- [ ] Web dashboard to manage videos
- [ ] Real-time notifications for new uploads
- [ ] Video analytics tracking
- [ ] Thumbnail caching
- [ ] Playlist support
- [ ] Live stream detection
- [ ] Comment integration

## Support

For issues or questions:
1. Check `.env.example` for setup guide
2. Verify YouTube API key is valid
3. Check API quotas on Google Cloud Console
4. Ensure videos are PUBLIC with embedding enabled

---

**Happy auto-updating!** 🚀

