# 🏍️ Psarz's Way - Quick Start Guide

## 5-Minute Setup

### Step 1: Add Your Videos
Open `script.js` and update the `videosConfig` array. Replace this:

```javascript
const videosConfig = [
    {
        id: "dQw4w9WgXcQ",  // ← Change this to YOUR YouTube video ID
        title: "Your Title",
        // ... etc
    }
];
```

**How to get a YouTube Video ID:**
1. Go to your video on YouTube
2. Copy the URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
3. The ID is: `dQw4w9WgQ` ← Use just this part

### Step 2: Update Links
Find and replace these in `index.html` and `about.html`:
- `https://www.youtube.com/channel/your-channel` → Your channel URL
- `https://youtube.com` → YouTube links
- `https://instagram.com` → Instagram links
- `bpsb97@gmail.com` → Your email

### Step 3: Deploy to GitHub Pages
```bash
git add .
git commit -m "Initial commit: MotoDrive site"
git push
```

Go to Settings → Pages → Deploy from branch (main) → Save

**Done!** Your site will be live in 2-3 minutes at:
`https://your-username.github.io/your-repo-name`

---

## Customization Guide

### Colors (Dark Red/Orange Theme)
Edit `styles.css` line 6-12:
```css
:root {
    --primary: #ff3b3b;      /* Red - change this */
    --secondary: #ff6b35;    /* Orange - or this */
    --dark-bg: #0f0f0f;      /* Black background */
    --text-primary: #ffffff; /* White text */
}
```

### Site Name
Change "MotoDrive" in:
- `index.html` line 13: `<h1>🏍️ Psarz's Way</h1>`
- `about.html` line 13: Same
- `README.md` title
- `script.js` comments

### Hero Text
Edit `index.html` lines 26-28:
```html
<h2>Raw Motorcycle Adventures</h2>
<p>Exploring the road, one ride at a time</p>
```

### Categories
To add a new category like "gear":

1. **Add option in index.html** (line 48):
```html
<option value="gear">Gear</option>
```

2. **Tag videos in script.js** with category: "gear"

---

## Video Management

### Adding a New Video

1. Open `script.js`
2. Find the `videosConfig` array
3. Add this block (before the closing bracket):

```javascript
    {
        id: "YOUR_VIDEO_ID",
        title: "Your Video Title Here",
        category: "rides",  // reviews, rides, maintenance, tips, or your custom
        description: "What's this video about? Brief summary.",
        duration: "15:32",
        date: "2025-12-30",
        views: "2.5K"
    },
```

4. Save → Refresh page → Video appears!

### Edit Existing Video
Same location in `script.js`, find the video and update any field.

### Delete a Video
Find it in `script.js` and delete that entire object (including curly braces).

---

## Pages Explained

| File | Purpose |
|------|---------|
| `index.html` | Main page with video grid |
| `about.html` | About page with FAQs |
| `styles.css` | All styling (dark theme) |
| `script.js` | Video loading & interactivity |
| `README.md` | Full documentation |
| `DEPLOYMENT.md` | Hosting instructions |

---

## Features Your Site Has

✅ Dark theme (like YouTube)  
✅ Video grid with thumbnails  
✅ Search & filter by category  
✅ Click video to play in modal  
✅ Mobile responsive  
✅ Fast loading (no external dependencies)  
✅ SEO optimized  
✅ Newsletter signup  
✅ Social media links  
✅ Featured latest video  

---

## Troubleshooting

**Videos not showing?**
- Check YouTube video IDs are correct (no spaces)
- Make sure videos are public, not private
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

**Styles look broken?**
- Hard refresh browser
- Clear cache if needed
- Check styles.css is in root folder

**Mobile menu not working?**
- Try different browser
- Check JavaScript is enabled
- Open browser dev tools (F12) for errors

**Site not live on GitHub?**
- Wait 2-3 minutes after push
- Check repository is PUBLIC
- Go to Settings → Pages → check branch is "main"

---

## Next Steps

1. ✅ Add 5-10 of your best videos
2. ✅ Customize colors to match your brand
3. ✅ Update all your social media links
4. ✅ Add newsletter integration (Mailchimp)
5. ✅ Set up Google Analytics
6. ✅ Share your site!

---

## Pro Tips

💡 **Thumbnail Quality** - YouTube auto-provides HD thumbnails from your videos

💡 **View Count** - Update the "views" field manually or use YouTube API

💡 **Upload Date** - Use format YYYY-MM-DD (2025-12-30)

💡 **Duration** - Get from YouTube info. Format MM:SS (15:32)

💡 **Categories** - Keep them consistent. Use: rides, reviews, maintenance, tips

💡 **Newsletter** - Currently shows thank you message. Integrate with Mailchimp/ConvertKit later

---

## Need Help?

- **Setup questions?** Check DEPLOYMENT.md
- **Want more features?** See README.md "Future Enhancements"
- **Code issues?** Check browser console (F12)
- **GitHub help?** pages.github.com

---

**You're all set!** Now go ride and make great content! 🏍️🔥

