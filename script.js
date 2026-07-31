/**
 * FUTURISTIC PORTFOLIO SCRIPT BUNDLE
 * Contains Custom Cursor, Particle Canvas, Typewriter, Terminal Shell, Scroll Reveals, Contact Handshake
 */

import opulentacresImg from './assets/opulentacres.png';
import growsalesImg from './assets/growsales.png';
import fujialpineImg from './assets/fujialpine.png';
import elpatioImg from './assets/elpatio.png';
import aetheraiImg from './assets/aetherai.png';

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       0. COLOR THEME SWITCHER
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    themeToggleBtn.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    /* ==========================================================================
       1. CUSTOM LIQUID CURSOR
       ========================================================================== */
    const cursorRing = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');
    
    let mouseX = 0, mouseY = 0; // Target coordinates
    let ringX = 0, ringY = 0;   // Lagging coordinates
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate dot update
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth lagging ring animation loop
    function animateCursor() {
        const easing = 0.15; // Speed of lag (smaller = slower/smoother)
        ringX += (mouseX - ringX) * easing;
        ringY += (mouseY - ringY) * easing;
        
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover classes triggers
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .logo, .dot, .project-card, [contenteditable="true"]');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });

    /* ==========================================================================
       2. TYPEWRITER EFFECT
       ========================================================================== */
    const typewriterElement = document.getElementById('typewriter');
    const roles = [
        "Full Stack Developer",
        "Systems Architect",
        "API Integrator",
        "UI/UX Dev"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function handleTypewriter() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40; // delete faster
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 120; // type normal
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 1500; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(handleTypewriter, typeSpeed);
    }
    // Start the typewriter loop
    setTimeout(handleTypewriter, 1000);

    /* ==========================================================================
       3. BACKGROUND PARTICLE CANVAS
       ========================================================================== */
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    const maxParticles = 65;
    
    // Set size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle Blueprints
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(139, 92, 246, 0.4)';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Boundary bounce checks
            if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
            if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Instantiate particles
    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < maxParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    initParticles();
    
    // Connecting line calculations and rendering loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid system overlay
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
        ctx.lineWidth = 1;
        const gridSize = 80;
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Update and draw particles
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        // Dynamic Connections
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 140) {
                    let opacity = (1 - (distance / 140)) * 0.12;
                    ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    /* ==========================================================================
       4. INTERACTIVE DEVELOPER CONSOLE TERMINAL
       ========================================================================== */
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');
    
    // Command History Database
    const commands = {
        help: [
            "Available terminal protocols:",
            "  <span class='text-cyan'>about</span>       Retrieve core developer intelligence profile.",
            "  <span class='text-cyan'>skills</span>      Inspect developer structural capabilities.",
            "  <span class='text-cyan'>projects</span>    List functional application systems.",
            "  <span class='text-cyan'>contact</span>     Retrieve endpoint credentials.",
            "  <span class='text-cyan'>neofetch</span>    Examine terminal hardware configuration status.",
            "  <span class='text-cyan'>clear</span>       Purge terminal output buffers."
        ],
        about: [
            "<span class='text-accent'>[PROFILE DATA RETRIEVAL]</span>",
            "  Role: Full Stack Web Developer",
            "  Core Architecture Focus: Scalable microservices, real-time sync systems.",
            "  Philosophy: Pure minimalist structure paired with rich, responsive frontends.",
            "  Status: Active and searching for advanced integrations."
        ],
        skills: [
            "<span class='text-accent'>[CAPABILITY MATRIX ENCRYPTED]</span>",
            "  Frontend: TypeScript / NextJS / Vanilla CSS & HTML5",
            "  Backend: Node.js / Express / Rust (gRPC Engines)",
            "  Database: PostgreSQL / MongoDB / Redis Cluster",
            "  DevOps: Docker / AWS S3 & EC2 / Kubernetes / CI/CD Actions"
        ],
        projects: [
            "<span class='text-accent'>[FEATURED PRODUCTION LOGS]</span>",
            "  1. <span class='text-cyan'>Opulent Acres</span> - Luxury real estate portal with 3D orbit. Built with React.",
            "  2. <span class='text-cyan'>Grow.sales</span> - B2B sales and lead generation system. Built with React.",
            "  3. <span class='text-cyan'>Fuji Alpine AI</span> - Meteorological explorer portal. Built with React.",
            "  4. <span class='text-cyan'>El Patio Coffee</span> - Premium coffee landing page and cart. Built with HTML5/CSS/JS.",
            "  5. <span class='text-cyan'>Aether AI</span> - Autonomous AI agency landing sandbox. Built with HTML5/CSS/JS."
        ],
        contact: [
            "<span class='text-accent'>[ESTABLISH DIRECT SOCKET CONNECTION]</span>",
            "  Endpoint (Email): wwbcraft@gmail.com",
            "  Network Node: Github (https://github.com)",
            "  Professional Node: LinkedIn (https://linkedin.com)",
            "  Use the form below to transmit directly via visual payload."
        ],
        neofetch: [
            "  <span class='text-cyan'>/\u005c\u005c\u005c\u005c\u005c\u005c/\u005c</span>    visitor@webcraft.dev",
            " <span class='text-cyan'>/ \u005c\u005c\u005c\u005c\u005c\u005c/ \u005c</span>   ---------------------",
            "<span class='text-cyan'>/   \u005c\u005c\u005c\u005c\u005c\u005c/   \u005c</span>  OS: PortfolioOS v2.6.0-x86_64",
            "<span class='text-accent'>\u005c   / \u005c/ \u005c   /</span>  Host: Virtual Shell Interface",
            " <span class='text-accent'>\u005c /   \u005c   / </span>   Kernel: WebEngine-JS-Client",
            "  <span class='text-accent'>\u005c/_________/</span>    Shell: VanillaJS Custom Interpreter",
            "                 Memory: 1024MB Alloc / 48MB Resident"
        ]
    };
    
    // Alias singular forms of commands for better usability
    commands.skill = commands.skills;
    commands.project = commands.projects;
    
    // Command listener
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawInput = terminalInput.value;
            const cleanInput = rawInput.trim().toLowerCase();
            
            // Add user input line to output
            addTerminalLine(`visitor@webcraft.dev:~$ ${rawInput}`, '');
            
            if (cleanInput === 'clear') {
                terminalOutput.innerHTML = '';
            } else if (cleanInput === '') {
                // Do nothing
            } else if (commands[cleanInput]) {
                commands[cleanInput].forEach(line => {
                    addTerminalLine(line, '');
                });
            } else {
                addTerminalLine(`Error: Protocol command "${cleanInput}" not recognized. Type <span class='text-white font-bold'>help</span> for valid operations.`, 'text-accent');
            }
            
            terminalInput.value = '';
            // Auto scroll body
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });
    
    function addTerminalLine(content, className) {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.innerHTML = content;
        terminalOutput.appendChild(line);
    }
    
    // Keep focus inside terminal when clicking the body container
    terminalBody.addEventListener('click', () => {
        terminalInput.focus();
    });

    /* ==========================================================================
       5. SCROLL REVEALS & NAVBAR STATE
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const navbar = document.querySelector('.navbar');
    
    const revealOnScroll = () => {
        // Sticky Header shrink behavior
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Element scroll fades
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150; // trigger pixel buffer
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('reveal-active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initial check on load

    /* ==========================================================================
       6. MOBILE MENU INTERACTION
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ==========================================================================
       7. CONTACT FORM HANDSHAKE SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('btn-submit');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const message = document.getElementById('form-message').value.trim();
        
        // Form states
        submitBtn.disabled = true;
        formStatus.className = 'form-status';
        formStatus.textContent = 'TRANSMITTING HANDSHAKE PROTOCOL...';
        
        try {
            const response = await fetch('https://formsubmit.co/ajax/wwbcraft@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Name: name,
                    Email: email,
                    Message: message,
                    _replyto: email,
                    _subject: `New Portfolio Message from ${name}`,
                    _captcha: "false",
                    _template: "table"
                })
            });
            
            if (!response.ok) {
                throw new Error('Database/Email transmission rejected');
            }
            
            formStatus.className = 'form-status success';
            formStatus.textContent = 'TRANSMISSION SUCCESSFUL. SOCKET SECURED.';
            
            // Reset input values
            contactForm.reset();
            submitBtn.disabled = false;
            
            // Clear status after delay
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
            
        } catch (error) {
            console.error(error);
            formStatus.className = 'form-status error';
            formStatus.textContent = 'TRANSMISSION FAILED. SERVER OFFLINE.';
            submitBtn.disabled = false;
        }
    });

    /* ==========================================================================
       8. PROJECT DETAILS ROUTER (SPA)
       ========================================================================== */
    const projectDetails = {
        opulentacres: {
            title: "Opulent Acres",
            tag: "Luxury Real Estate",
            image: opulentacresImg,
            desc: "<p>Opulent Acres is an ultra-luxury real estate and architectural developments portal. It showcases a premium portfolio of high-end sky residences, waterfront estates, and commercial Plaza plazas through an immersive digital experience.</p><p>Built on React and modular CSS, it features buttery-smooth kinetic momentum scrolling powered by Lenis and a bespoke interactive 3D Orbit Gallery animated via GSAP. Users can filter listings by location, type, budget, and construction status seamlessly via full-screen glassmorphic overlays.</p>",
            tech: ["React", "TypeScript", "GSAP", "Lenis Scroll", "Vercel"],
            features: [
                "Immersive GSAP-powered 3D orbit ring gallery",
                "Smooth momentum scrolling integration (Lenis)",
                "Glassmorphic full-screen search overlays",
                "Integrated GDPR/CCPA data privacy protection"
            ],
            liveLink: "https://estate-website-azure.vercel.app/",
            sourceLink: "https://github.com"
        },
        growsales: {
            title: "Grow.sales",
            tag: "B2B Growth Engine",
            image: growsalesImg,
            desc: "<p>Grow.sales is a high-performance conversion landing system built for B2B sales and marketing outsourcing. The platform enables ambitious companies to outsource lead generation, pipeline building, and outbound revenue campaigns to premium dedicated teams.</p><p>Designed with modern high-contrast typography, interactive service matrices, and conversion-optimized forms, the site integrates custom micro-animations and smooth scroll triggers to maintain professional credibility and maximize client acquisition rates.</p>",
            tech: ["React", "TypeScript", "Tailwind CSS", "Vercel", "Analytics API"],
            features: [
                "Lead generation pipeline optimization",
                "Interactive service selection matrices",
                "High-performance paint load speeds",
                "Responsive conversion-focused structures"
            ],
            liveLink: "https://sales-website-beige.vercel.app/",
            sourceLink: "https://github.com"
        },
        fujialpine: {
            title: "Fuji Alpine AI",
            tag: "Meteorological Hub",
            image: fujialpineImg,
            desc: "<p>Fuji Alpine AI is an interactive environmental exploration platform designed for the Mt. Fuji Meteorological Observatory (3,776m). It provides immersive, real-time meteorological reports, sub-zero weather guide telemetry, and alpine climate simulations of Japan's highest peak.</p><p>Built on React and Tailwind, the interface focuses on high-contrast typography, interactive environmental sensors, and rich geospatial data visualization overlays to assist high-altitude alpine researchers and climate analysts.</p>",
            tech: ["React", "TypeScript", "Tailwind CSS", "Vercel", "Geospatial API"],
            features: [
                "Real-time sub-zero alpine weather telemetry",
                "Interactive meteorological station readings",
                "High-altitude environmental safety guidelines",
                "Fully responsive, high-contrast typography layout"
            ],
            liveLink: "https://mountain-website-mu.vercel.app/",
            sourceLink: "https://github.com"
        },
        elpatio: {
            title: "El Patio Coffee",
            tag: "E-Commerce Service",
            image: elpatioImg,
            desc: "<p>El Patio Coffee is an elegant, premium digital storefront engineered for a craft coffee roastery. It translates physical sensory experiences—origin, altitude, roast profiles, and notes—into an interactive and responsive visual environment.</p><p>The system features dynamic batch descriptions, an interactive roast-level slider, and a seamless client-side cart system that handles quantity updates, totals, and validations dynamically. Optimized with a sub-second load time, it showcases custom micro-interactions and premium typography to maintain brand prestige.</p>",
            tech: ["HTML5", "Vanilla CSS", "JavaScript", "Render Hosting"],
            features: [
                "Interactive roast characteristics matrix",
                "Real-time dynamic cart system and state",
                "Sub-second paint performance scores",
                "Curated premium typography & color theme"
            ],
            liveLink: "https://the-coffee-frontend.onrender.com/",
            sourceLink: "https://github.com"
        },
        aetherai: {
            title: "Aether AI",
            tag: "AI Agency Portal",
            image: aetheraiImg,
            desc: "<p>Aether AI is a premium digital agency landing environment and interactive sandbox dedicated to engineering autonomous intelligence models, custom conversational assistants, and workflows.</p><p>Built with minimalist Apple-like aesthetics, it integrates a real-time responsive chatbot console emulator, a dynamic project cost calculator with custom service parameters, and fully-responsive animated bento grids to deliver structured, high-conversion layouts.</p>",
            tech: ["HTML5", "Vanilla CSS", "JavaScript", "Lenis Scroll", "Render"],
            features: [
                "Real-time client-side interactive chatbot simulator",
                "Live budget milestone and ROI cost calculator",
                "Responsive Bento grid layout structure",
                "High-performance paint speeds and clean coding"
            ],
            liveLink: "https://threed-projectes.onrender.com",
            sourceLink: "https://github.com"
        }
    };

    const mainSections = document.querySelectorAll('main > section:not(#project-detail)');
    const detailSection = document.getElementById('project-detail');
    
    // Router Logic
    function handleRouting() {
        const hash = window.location.hash;
        
        if (hash.startsWith('#project/')) {
            const projectId = hash.split('/')[1];
            const data = projectDetails[projectId];
            
            if (data) {
                // Populate details page content
                document.getElementById('detail-tag').textContent = data.tag;
                document.getElementById('detail-title').textContent = data.title;
                document.getElementById('detail-img').src = data.image;
                document.getElementById('detail-img').alt = `${data.title} Detailed Preview`;
                document.getElementById('detail-desc').innerHTML = data.desc;
                
                // Live and source links
                document.getElementById('detail-live-link').href = data.liveLink;
                document.getElementById('detail-source-link').href = data.sourceLink;
                
                // Tech badges
                const techContainer = document.getElementById('detail-tech');
                techContainer.innerHTML = '';
                data.tech.forEach(techName => {
                    const badge = document.createElement('span');
                    badge.className = 'tech-badge';
                    badge.textContent = techName;
                    techContainer.appendChild(badge);
                });
                
                // Core Specs list
                const specsContainer = document.getElementById('detail-features');
                specsContainer.innerHTML = '';
                data.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    specsContainer.appendChild(li);
                });
                
                // Hide header navbar links activity or add active states
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                
                // Transition show details section, hide main content
                mainSections.forEach(section => {
                    section.style.display = 'none';
                    section.classList.remove('reveal-active'); // Reset reveals to trigger again later
                });
                
                detailSection.style.display = 'block';
                // Trigger CSS animations
                requestAnimationFrame(() => {
                    detailSection.classList.add('active');
                });
                
                // Scroll to top smoothly
                window.scrollTo({ top: 0, behavior: 'instant' });
                
                // Bind new dynamic element hover triggers for custom cursor
                const dynamicHovers = detailSection.querySelectorAll('a, button, .tech-badge');
                dynamicHovers.forEach(el => {
                    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
                    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
                });
                
                return;
            }
        }
        
        // Default homepage view routing
        detailSection.classList.remove('active');
        detailSection.style.display = 'none';
        
        mainSections.forEach(section => {
            section.style.display = '';
        });
        
        // Re-trigger scroll reveals
        setTimeout(revealOnScroll, 50);
        
        // Scroll to specific hash section if available
        if (hash && hash !== '#hero') {
            const targetEl = document.querySelector(hash);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    
    // Bind hashchange listener
    window.addEventListener('hashchange', handleRouting);
    // Initial router execution on load
    handleRouting();

    /* ==========================================================================
       9. SUPABASE REVIEWS INTEGRATION
       ========================================================================== */
    const SUPABASE_URL = 'https://uihrldjltbukdehguolb.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpaHJsZGpsdGJ1a2RlaGd1b2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNzExNTgsImV4cCI6MjEwMDY0NzE1OH0.Bsa-JUGfj8WH5bcRhJAw0hcP3E_7MG3nvxCxQRPfQ3Q';
    
    const reviewsList = document.getElementById('reviews-list');
    const reviewForm = document.getElementById('review-form');
    const reviewStatus = document.getElementById('review-status');
    const btnReviewSubmit = document.getElementById('btn-review-submit');
    const ratingStars = document.getElementById('rating-stars');
    const reviewRatingInput = document.getElementById('review-rating');
    
    // Star rating selection logic
    const stars = ratingStars.querySelectorAll('.star-btn');
    function updateStars(rating) {
        stars.forEach(star => {
            const val = parseInt(star.getAttribute('data-value'));
            if (val <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-value'));
            reviewRatingInput.value = rating;
            updateStars(rating);
        });
        
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.getAttribute('data-value'));
            updateStars(rating);
        });
    });
    
    ratingStars.addEventListener('mouseleave', () => {
        const rating = parseInt(reviewRatingInput.value);
        updateStars(rating);
    });
    
    // Set initial rating stars (5 by default)
    updateStars(5);
    
    // Fetch reviews from Supabase PostgREST API
    async function fetchReviews() {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews?select=*&order=created_at.desc`, {
                method: 'GET',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            
            const data = await response.json();
            renderReviews(data);
        } catch (error) {
            console.error(error);
            reviewsList.innerHTML = `<div class="review-loading" style="color: var(--color-accent);">Error loading reviews from database.</div>`;
        }
    }
    
    function renderReviews(reviews) {
        if (reviews.length === 0) {
            reviewsList.innerHTML = `<div class="review-loading">No reviews submitted yet. Be the first!</div>`;
            return;
        }
        
        reviewsList.innerHTML = reviews.map(review => {
            const starsHtml = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            const date = new Date(review.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            return `
                <div class="review-card">
                    <div class="review-header">
                        <span class="review-author">${escapeHtml(review.name)}</span>
                        <span class="review-stars">${starsHtml}</span>
                    </div>
                    <p class="review-comment">${escapeHtml(review.comment)}</p>
                    <span class="review-date">// Broadcast Date: ${date}</span>
                </div>
            `;
        }).join('');
    }
    
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
    
    // Submit review to Supabase PostgREST API
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('review-name').value.trim();
        const email = document.getElementById('review-email').value.trim();
        const rating = parseInt(reviewRatingInput.value);
        const comment = document.getElementById('review-comment').value.trim();
        
        btnReviewSubmit.disabled = true;
        reviewStatus.className = 'form-status';
        reviewStatus.textContent = 'BROADCASTING DATA TO DATABASE...';
        
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({ name, email, rating, comment })
            });
            
            if (!response.ok) {
                throw new Error('Database insertion rejected');
            }
            
            reviewStatus.className = 'form-status success';
            reviewStatus.textContent = 'BROADCAST SUCCESSFUL. LEDGER UPDATED.';
            
            // Reset form
            reviewForm.reset();
            reviewRatingInput.value = 5;
            updateStars(5);
            btnReviewSubmit.disabled = false;
            
            // Re-fetch reviews to show new submission
            fetchReviews();
            
            setTimeout(() => {
                reviewStatus.textContent = '';
            }, 5000);
            
        } catch (error) {
            console.error(error);
            reviewStatus.className = 'form-status error';
            reviewStatus.textContent = 'BROADCAST FAILED. DATABASE REJECTED PAYLOAD.';
            btnReviewSubmit.disabled = false;
        }
    });
    
    // Initial fetch
    fetchReviews();

});
