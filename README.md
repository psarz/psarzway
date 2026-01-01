# Psarz's Way - Motorcycle Vlogging Site

A lightweight, YouTube-integrated motovlogging website. Built with vanilla HTML, CSS, and JavaScript - perfect for hosting on GitHub Pages.

## Features

✅ **Lightweight & Fast** - No heavy frameworks, optimized for GitHub Pages
✅ **YouTube Integration** - Embed videos directly using video IDs  
✅ **Dark Theme** - Professional motorcycle channel aesthetic with red/orange accents
✅ **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
✅ **Search & Filter** - Find videos by category and keywords
✅ **Video Grid** - Beautiful card-based layout for browsing
✅ **Featured Video** - Latest content highlighted on homepage
✅ **Newsletter Signup** - Collect emails from interested viewers
✅ **Mobile Menu** - Hamburger navigation for smaller screens
✅ **SEO Friendly** - Proper semantic HTML structure

## Project Structure

```
psarzsway/
├── index.html          # Homepage with video grid
├── about.html          # About page with FAQs
├── styles.css          # All styling (dark theme)
├── script.js           # Video loading and interactivity
├── .gitignore          # Git configuration
└── README.md           # This file
```

## Quick Start

### 1. Add Your Videos

Edit `script.js` and update the `videosConfig` array with your YouTube videos:

```javascript
const videosConfig = [
    {
        id: "YOUR_VIDEO_ID",              // YouTube video ID
        title: "Your Video Title",
        category: "rides",                  // reviews, rides, maintenance, tips
        description: "Video description",
        duration: "12:34",
        date: "2025-12-28",
        views: "15K"
    },
    // Add more videos...
];
```

To get a YouTube video ID, use the URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
The ID is: `dQw4w9WgXcQ`

### 2. Update Channel Links

Replace placeholder links throughout the site:
- YouTube channel link in header and about page
- Instagram, Twitter, TikTok links in footer
- Contact email address

### 3. Deploy to GitHub Pages

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: MotoDrive site"

# Create gh-pages branch
git checkout -b gh-pages

# Push to GitHub
git push -u origin gh-pages
```

Then enable GitHub Pages in your repository settings (Settings → Pages → Deploy from a branch → gh-pages).

## Customization

### Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary: #ff3b3b;           /* Red accent */
    --secondary: #ff6b35;         /* Orange accent */
    --dark-bg: #0f0f0f;           /* Main background */
    --dark-surface: #1a1a1a;      /* Card background */
}
```

### Fonts
The site uses system fonts (San Francisco, Segoe UI, etc.). To use custom fonts, add to the `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap">
```

Then update the font-family in `styles.css`.

### Navigation
Edit the nav menu in `index.html` and `about.html` to add/remove pages.

## Video Categories

The site supports these default categories:
- **reviews** - Bike and gear reviews
- **rides** - Adventure rides and vlogs
- **maintenance** - Technical and maintenance guides
- **tips** - Riding tips and tutorials

Add more categories by:
1. Adding options to the `<select>` in index.html
2. Tagging videos with the new category in script.js

## Features Explained

### Search & Filter
- Type in the search box to filter videos by title or description
- Select a category to show only videos in that category
- Both filters work together

### Video Modal
- Click any video card to open a fullscreen player
- Press ESC or click outside to close
- Auto-scrolls to prevent modal cutoff

### Mobile Responsive
- Hamburger menu on screens under 768px
- Grid adapts from 4 columns to 1 on mobile
- Touch-friendly button sizes

### Newsletter
Simple email collection form that shows a thank you message. Integrate with services like:
- Mailchimp
- ConvertKit
- Substack
- Custom backend

## Performance Tips

1. **Thumbnail Images** - YouTube provides auto-generated thumbnails via `https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg`
2. **Lazy Loading** - Video iframes load only when needed
3. **No External Dependencies** - Pure HTML/CSS/JS
4. **Caching** - GitHub Pages automatically caches your site

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Future Enhancements

- [ ] Playlists/Series grouping
- [ ] Comments section (Disqus integration)
- [ ] Blog posts
- [ ] Merchandise integration
- [ ] Sponsor logos
- [ ] Analytics tracking
- [ ] Dark/Light mode toggle
- [ ] Video recommendations algorithm

## Troubleshooting

**Videos not loading?**
- Check YouTube video IDs are correct
- Ensure videos are public/unlisted (not private)
- Clear browser cache

**Styles not applying?**
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check file paths are correct
- Verify CSS file is in the same directory

**Mobile menu not working?**
- JavaScript might be disabled - enable it
- Check browser console for errors (F12)

## License

Free to use and modify for personal or commercial projects.

## Credits

Inspired by:
- FortNine motorcycle YouTube channel aesthetic
- Modern dark theme design patterns
- Lightweight static site best practices

---

**Ready to launch?** Update your video config and push to GitHub Pages. Your motovlogging site will be live in minutes! 🏍️

