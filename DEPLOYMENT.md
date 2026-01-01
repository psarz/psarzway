# MotoDrive - Deployment Guide

## GitHub Pages Setup

### Option 1: Using GitHub Web Interface (Easiest)

1. **Create a GitHub Repository**
   - Go to github.com and sign in
   - Click "+" → "New repository"
   - Name it (e.g., `motodrive` or `youtube-moto-channel`)
   - Choose "Public" (required for free GitHub Pages)
   - Click "Create repository"

2. **Upload Your Files**
   - Click "Add file" → "Upload files"
   - Drag and drop all project files:
     - index.html
     - about.html
     - styles.css
     - script.js
     - README.md
     - .gitignore
   - Commit with message "Initial MotoDrive site"

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Select "Deploy from a branch"
   - Branch: Select "main"
   - Folder: Select "/ (root)"
   - Click "Save"

4. **Your site is live!**
   - GitHub shows your site URL (usually `https://username.github.io/repo-name`)
   - Wait 1-2 minutes for deployment

### Option 2: Using Git Command Line

```bash
# Clone your repository
git clone https://github.com/your-username/motodrive.git
cd motodrive

# Copy all your files into this directory
# Then:

git add .
git commit -m "Initial MotoDrive site"
git push origin main
```

## Custom Domain

### Using a Custom Domain Name

1. **Buy a domain** from GoDaddy, Namecheap, etc.

2. **Configure DNS records** (in your domain registrar):
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
           185.199.109.153
           185.199.110.153
           185.199.111.153
   ```

3. **GitHub Settings**
   - Repository Settings → Pages
   - Custom domain: `yourdomain.com`
   - Enable "Enforce HTTPS"
   - Save

4. **Wait 24 hours** for DNS to propagate

## Updating Your Site

### Add New Videos

1. Edit `script.js`
2. Find the `videosConfig` array
3. Add new video object:
   ```javascript
   {
       id: "VIDEO_ID",
       title: "Your Title",
       category: "rides",
       description: "Description",
       duration: "MM:SS",
       date: "YYYY-MM-DD",
       views: "12K"
   }
   ```
4. Save and commit:
   ```bash
   git add script.js
   git commit -m "Add new video: Your Title"
   git push
   ```

### Update Channel Information

1. Edit the URLs in `index.html` and `about.html`:
   - YouTube channel link
   - Social media links
   - Email address

2. Edit the content sections:
   - Hero section text
   - About page content
   - Footer information

## Performance Optimization

### Image Optimization (Optional)

YouTube automatically provides optimized thumbnails. If adding custom images:

```bash
# Install ImageMagick (macOS)
brew install imagemagick

# Resize and compress images
convert image.jpg -resize 1200x675 -quality 85 image-optimized.jpg
```

### Minify CSS/JS (Optional)

For production optimization:

```bash
# Install minifiers (needs Node.js)
npm install -g minify

# Minify files
minify styles.css > styles.min.css
minify script.js > script.min.js
```

Then update HTML to use `.min.css` and `.min.js` files.

## Analytics Setup

### Google Analytics

1. Go to google.com/analytics
2. Create new property for your domain
3. Get your Measurement ID
4. Add to `<head>` of index.html and about.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Troubleshooting Deployment

**Site shows 404?**
- Wait 2-3 minutes after first upload
- Check Settings → Pages shows correct branch
- Ensure index.html is in root directory
- Hard refresh (Ctrl+Shift+R)

**Styles not loading?**
- Check all file paths in HTML are correct
- GitHub Pages is case-sensitive (styles.css, not Styles.css)
- Clear browser cache

**Videos not appearing?**
- Check YouTube video IDs are correct format
- Verify YouTube videos are public (not private)
- Videos must be at least 30 seconds long

**Domain not working?**
- DNS can take 24-48 hours to propagate
- Check domain registrar shows correct A records
- Try accessing via https://

## Maintenance

### Regular Updates

- Add new videos monthly
- Update view counts periodically
- Check for broken links
- Monitor GitHub for security alerts

### Backup

```bash
# Create local backup
git clone https://github.com/your-username/motodrive.git motodrive-backup
```

## Advanced: YouTube Data API Integration

For automatic video updates from your channel (requires backend):

1. Get API key from Google Cloud Console
2. Create backend service (Firebase, Heroku, Replit)
3. Fetch videos from your channel automatically
4. Update site daily/weekly

This requires more setup - start with manual video adding first.

## Support & Questions

- GitHub Pages docs: https://pages.github.com
- Troubleshooting: https://docs.github.com/en/pages/getting-started-with-github-pages
- Issue reporting: Create issue in your repo

---

Your MotoDrive site is now ready to share with the world! 🏍️
