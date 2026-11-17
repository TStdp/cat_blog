document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    // Treat Counter (Home Page)
    const treatBtn = document.getElementById('treat-btn');
    const treatCounter = document.getElementById('treat-counter');
    if (treatBtn && treatCounter) {
        let treats = parseInt(localStorage.getItem('mochiTreats') || '14', 10);
        treatCounter.textContent = treats;

        treatBtn.addEventListener('click', () => {
            treats += 1;
            treatCounter.textContent = treats;
            localStorage.setItem('mochiTreats', treats);
            treatBtn.textContent = '💖 Purr! Yummy!';
            setTimeout(() => {
                treatBtn.textContent = '🐟 Give Mochi a Treat';
            }, 900);
        });
    }

    // Initial Blog Posts
    const defaultPosts = [
        {
            id: 1,
            title: "Sunbeam Review: Living Room Rug at 2 PM",
            category: "Naps",
            date: "Nov 15, 2026",
            content: "Today I discovered that the warm patch by the window moves three inches every hour. Exhausting work following it, so I slept for 4 hours straight. 10/10 warmth.",
            likes: 24
        },
        {
            id: 2,
            title: "The Great Salmon Crunch Heist",
            category: "Treats",
            date: "Nov 12, 2026",
            content: "My human left the treat jar slightly unlatched. With one gentle paw tap, victory was mine. I shared zero crumbs.",
            likes: 41
        },
        {
            id: 3,
            title: "Why 3:14 AM is Prime Cardio Time",
            category: "Zoomies",
            date: "Nov 10, 2026",
            content: "Sprinted from the hallway to the sofa at Mach 2 to protect the household from an invisible greeble. You're welcome, human.",
            likes: 33
        }
    ];

    let posts = JSON.parse(localStorage.getItem('mochiPosts')) || defaultPosts;
    const blogGrid = document.getElementById('blog-grid');
    let currentFilter = 'all';

    function renderPosts() {
        if (!blogGrid) return;
        blogGrid.innerHTML = '';

        const filtered = currentFilter === 'all'
            ? posts
            : posts.filter(p => p.category === currentFilter);

        filtered.forEach(post => {
            const card = document.createElement('article');
            card.className = 'card post-card';
            card.innerHTML = `
                <div>
                    <span class="badge">${post.category}</span>
                    <h3>${post.title}</h3>
                    <p class="post-meta">Posted on ${post.date}</p>
                    <p>${post.content}</p>
                </div>
                <div class="post-footer">
                    <button class="like-btn" data-id="${post.id}">💗 ${post.likes} Purrs</button>
                </div>
            `;
            blogGrid.appendChild(card);
        });

        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.target.getAttribute('data-id'));
                const target = posts.find(p => p.id === id);
                if (target) {
                    target.likes += 1;
                    localStorage.setItem('mochiPosts', JSON.stringify(posts));
                    renderPosts();
                }
            });
        });
    }

    if (blogGrid) {
        renderPosts();

        // Filter Buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.getAttribute('data-filter');
                renderPosts();
            });
        });

        // New Post Modal
        const modal = document.getElementById('post-modal');
        const openModalBtn = document.getElementById('open-modal-btn');
        const closeModalBtn = document.getElementById('close-modal');
        const newPostForm = document.getElementById('new-post-form');

        openModalBtn.addEventListener('click', () => modal.classList.remove('hidden'));
        closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

        newPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('post-title').value.trim();
            const category = document.getElementById('post-category').value;
            const content = document.getElementById('post-content').value.trim();

            if (title && content) {
                posts.unshift({
                    id: Date.now(),
                    title,
                    category,
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    content,
                    likes: 1
                });
                localStorage.setItem('mochiPosts', JSON.stringify(posts));
                newPostForm.reset();
                modal.classList.add('hidden');
                renderPosts();
            }
        });
    }

    // Contact Form (Contact Page)
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formSuccess.classList.remove('hidden');
            contactForm.reset();
        });
    }
});
