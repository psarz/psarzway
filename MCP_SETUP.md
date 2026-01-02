# MCP Server Setup Guide

## What is this?

An **MCP Server** that automatically updates your website's video list directly from your YouTube channel (@psarz).

## Quick Start (3 steps)

### Step 1: Get YouTube API Key
1. Go to https://console.cloud.google.com/
2. Create new project "Psarz's Way"
3. Enable "YouTube Data API v3"
4. Create API Key in Credentials
5. Copy the key

### Step 2: Setup Environment
```bash
cd mcp-server
npm install
cp .env.example .env
# Edit .env and paste your API key
```

### Step 3: Run It!
```bash
# One-time update:
npm run update-videos

# Or auto-update (every hour):
npm start
```

## What It Does

**Before:** Manual editing of script.js
```javascript
const videosConfig = [
    {
        id: "bwcNXOXzm_Q",
        title: "Motorcycle Adventure Vlog",  // ← Manual
        views: "1.2K"                        // ← Manual
    }
];
```

**After:** Automatic from YouTube
- Fetches latest videos from @psarz channel
- Extracts: ID, title, description, duration, views, date
- Auto-categorizes (reviews, rides, maintenance, tips)
- Updates script.js automatically
- Runs on schedule (every hour)

## How to Deploy

### Option 1: Local Computer (Easiest)
Run once to update, or use `npm start` for continuous auto-updates

### Option 2: Free Hosting (Replit)
1. Go to https://replit.com
2. Create new Node.js project
3. Upload mcp-server files
4. Add .env with API key
5. Run `npm run update-videos`
6. Set up cron job to run hourly

### Option 3: GitHub Actions (Free + Automatic)
See GitHub Actions setup in `/mcp-server/README.md`

### Option 4: Heroku/Railway (Small Fee)
Deploy with auto-updates every hour

## Folder Structure

```
psarzway/
├── index.html
├── script.js              # ← Gets updated automatically!
├── styles.css
└── mcp-server/            # ← MCP Server folder
    ├── package.json
    ├── .env              # Your API key (keep private!)
    ├── server.js         # Main server
    ├── youtube-api.js    # YouTube API functions
    ├── update-videos.js  # One-time update script
    └── README.md         # Full documentation
```

## Common Tasks

**Update videos now:**
```bash
cd mcp-server
npm run update-videos
```

**Start auto-update server:**
```bash
npm start
```

**Check if it's working:**
- Look at script.js
- Your video data should be updated
- Check timestamps and view counts

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "YOUTUBE_API_KEY not set" | Create .env file with API key |
| "Channel not found" | Check channel ID spelling |
| "API quota exceeded" | Wait 24 hours (free tier: 10K/day) |
| Videos not updating | Make sure they're PUBLIC with embedding ON |

## What Gets Extracted From YouTube

For each video:
- ✅ Video ID
- ✅ Title
- ✅ Description (first 150 chars)
- ✅ Duration (converted to MM:SS)
- ✅ Publish date (YYYY-MM-DD format)
- ✅ View count (formatted as 1.2K, 15M, etc)
- ✅ Category (auto-detected from title)

## Example: Before vs After

**Before (manual):**
```javascript
{
    id: "QZ9NeD_s5wU",
    title: "Weekend Ride Vlog",
    category: "rides",
    description: "Casual ride with fellow enthusiasts.",
    duration: "9:08",
    date: "2025-12-10",
    views: "3.8K"
}
```

**After (auto-updated):**
```javascript
{
    id: "QZ9NeD_s5wU",
    title: "Weekend Ride Vlog",
    category: "rides",
    description: "Casual ride with fellow enthusiasts exploring new roads.",
    duration: "9:08",
    date: "2025-12-10",
    views: "4.2K"  // ← Updated!
}
```

## Next Steps

1. ✅ Get YouTube API key (10 mins)
2. ✅ Set up .env file (2 mins)
3. ✅ Run `npm run update-videos` (1 min)
4. ✅ Push to GitHub
5. ✅ (Optional) Set up GitHub Actions for auto-updates

That's it! Your website now auto-updates from your YouTube channel! 🚀

---

**Questions?** Read full docs in `mcp-server/README.md`

