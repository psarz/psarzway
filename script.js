// Sample videos configuration
// IMPORTANT: Replace these with your actual YouTube video IDs from @psarz channel
// 
// HOW TO GET YOUR VIDEO ID:
// 1. Go to your YouTube channel: https://www.youtube.com/@psarz
// 2. Click on a video
// 3. Copy the video ID from URL: youtube.com/watch?v=YOUR_ID_HERE
// 4. Replace the 'id' value below with your video ID
// 5. Update title, description, date, duration, views accordingly
//
// IMPORTANT: Make sure videos are:
// - PUBLIC (not private/unlisted)
// - Embedding ENABLED in video settings
//
const videosConfig = [
    {
        id: "bwcNXOXzm_Q",
        title: "Motorcycle Adventure Vlog",
        category: "rides",
        description: "Raw motorcycle adventures and riding experiences.",
        duration: "12:34",
        date: "2025-12-30",
        views: "1.2K"
    },
    {
        id: "bwcNXOXzm_Q",
        title: "How to Change Oil Like a Pro",
        category: "maintenance",
        description: "Step-by-step guide to maintaining your motorcycle.",
        duration: "10:20",
        date: "2025-12-20",
        views: "5.1K"
    },
    {
        id: "g9-Wta9_Kec",
        title: "5 Essential Riding Tips for Beginners",
        category: "tips",
        description: "Master these fundamental techniques to become a better rider.",
        duration: "14:15",
        date: "2025-12-15",
        views: "22K"
    },
    {
        id: "QZ9NeD_s5wU",
        title: "Weekend Ride Vlog",
        category: "rides",
        description: "Casual ride with fellow enthusiasts.",
        duration: "9:08",
        date: "2025-12-10",
        views: "3.8K"
    },
    {
        id: "kffacxfA7g4",
        title: "Motorcycle Gear Setup 2025",
        category: "tips",
        description: "My complete safety gear recommendations.",
        duration: "13:42",
        date: "2025-12-05",
        views: "11K"
    }
];

// DOM Elements
const videosGrid = document.getElementById('videosGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const featuredVideo = document.getElementById('featuredVideo');
const modal = document.getElementById('videoModal');
const closeBtn = document.querySelector('.close');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedVideo();
    loadVideos();
    setupEventListeners();
});

// Load featured video (latest)
function loadFeaturedVideo() {
    if (videosConfig.length === 0) return;
    
    const latest = videosConfig[0];
    const embed = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${latest.id}?autoplay=0" title="${latest.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    featuredVideo.innerHTML = embed;
}

// Load and display videos
function loadVideos(filter = {}) {
    const filtered = videosConfig.filter(video => {
        const matchesSearch = !filter.search || 
            video.title.toLowerCase().includes(filter.search.toLowerCase()) ||
            video.description.toLowerCase().includes(filter.search.toLowerCase());
        
        const matchesCategory = !filter.category || video.category === filter.category;
        
        return matchesSearch && matchesCategory;
    });

    if (filtered.length === 0) {
        videosGrid.innerHTML = '<div class="loading">No videos found</div>';
        return;
    }

    videosGrid.innerHTML = filtered.map(video => createVideoCard(video)).join('');
    
    // Add click listeners to cards
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const videoId = e.currentTarget.dataset.videoId;
            openVideoModal(videoId);
        });
    });
}

// Create video card HTML
function createVideoCard(video) {
    return `
        <div class="video-card" data-video-id="${video.id}">
            <div class="video-thumbnail">
                <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}">
                <div class="play-button">▶</div>
                <div class="duration">${video.duration}</div>
            </div>
            <div class="video-info">
                <span class="video-category">${video.category}</span>
                <h3>${video.title}</h3>
                <div class="video-meta">
                    <span class="video-views">👁️ ${video.views}</span>
                    <span class="video-date">${formatDate(video.date)}</span>
                </div>
            </div>
        </div>
    `;
}

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff}d ago`;
    if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
    if (diff < 365) return `${Math.floor(diff / 30)}mo ago`;
    return date.toLocaleDateString();
}

// Open video modal
function openVideoModal(videoId) {
    const video = videosConfig.find(v => v.id === videoId);
    if (!video) return;

    const modalVideo = document.getElementById('modalVideo');
    const modalInfo = document.getElementById('modalInfo');

    modalVideo.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" title="${video.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    
    modalInfo.innerHTML = `
        <h2>${video.title}</h2>
        <div class="video-meta" style="margin-top: 12px; margin-bottom: 16px;">
            <span>👁️ ${video.views}</span>
            <span>📅 ${formatDate(video.date)}</span>
        </div>
        <p>${video.description}</p>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('modalVideo').innerHTML = '';
}

// Setup event listeners
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        loadVideos({
            search: e.target.value,
            category: categoryFilter.value
        });
    });

    // Category filter
    categoryFilter.addEventListener('change', (e) => {
        loadVideos({
            search: searchInput.value,
            category: e.target.value
        });
    });

    // Modal close
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Keyboard escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Newsletter form submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simple validation and feedback
    alert(`Thank you for subscribing with ${email}!\nWe'll keep you updated on new videos.`);
    e.target.reset();
}
