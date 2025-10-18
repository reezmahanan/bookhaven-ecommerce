// BookHaven E-commerce JavaScript - Complete SRS Implementation
// Author: reezmahanan  
// Date: October 18, 2025

class BookHaven {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.compareList = JSON.parse(localStorage.getItem('compareList')) || [];
        this.recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        this.orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || this.generateSampleOrders();
        this.userProfile = JSON.parse(localStorage.getItem('userProfile')) || this.getDefaultProfile();
        this.settings = JSON.parse(localStorage.getItem('settings')) || this.getDefaultSettings();
        
        this.currentUser = 'user123';
        this.currentCurrency = localStorage.getItem('currency') || 'LKR';
        this.exchangeRates = {
            USD: 1,
            LKR: 320,
            INR: 83
        };
        this.books = this.generateSampleBooks();
        this.filteredBooks = [...this.books];
        
        this.init();
    }

    init() {
        console.log('BookHaven initializing...');
        this.showPageLoading();
        
        // Initialize immediately but show loading states
        this.setupEventListeners();
        this.setupCurrencySelector();
        this.detectLocation();
        this.updateCartCount();
        this.updateWishlistCount();
        this.updateCompareCount();
        this.displayBooks(true); // Show skeleton loading
        this.displayRecentlyViewed();
        this.initializeSearch();
        this.setupModals();
        this.setupSidebars();
        this.setupFilters();
        this.setupViewOptions();
        this.updateBreadcrumb();
        
        console.log('BookHaven initialization complete, hiding loading in 2.5 seconds...');
        
        // Hide page loading after everything is set up
        setTimeout(() => {
            console.log('Hiding page loading...');
            this.hidePageLoading();
        }, 2500);
    }

    showPageLoading() {
        console.log('Showing page loading...');
        const pageLoading = document.getElementById('pageLoading');
        if (pageLoading) {
            pageLoading.classList.remove('hide');
            console.log('Page loading element found and shown');
        } else {
            console.log('Page loading element not found!');
        }
    }

    hidePageLoading() {
        console.log('Hiding page loading...');
        const pageLoading = document.getElementById('pageLoading');
        if (pageLoading) {
            pageLoading.classList.add('hide');
            console.log('Page loading element hidden');
            
            // Remove from DOM after transition
            setTimeout(() => {
                pageLoading.style.display = 'none';
                console.log('Page loading element removed from DOM');
            }, 800);
        } else {
            console.log('Page loading element not found when trying to hide!');
        }
    }

    showLoading(text = 'Loading...') {
        const overlay = document.getElementById('loadingOverlay');
        const loadingText = document.getElementById('loadingText');
        
        if (overlay && loadingText) {
            loadingText.textContent = text;
            overlay.classList.add('show');
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('show');
        }
    }

    generateSampleBooks() {
        this.currentCurrency = 'LKR';
        this.exchangeRates = {
            USD: 1,
            LKR: 320,
            INR: 83
        };
        
        const genres = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Romance', 'Mystery', 'Biography', 'History', 'Technology', 'Sri Lankan Literature', 'Indian Literature', 'Tamil Books', 'Sinhala Books', 'Spiritual & Philosophy'];
        const authors = ['Martin Wickramasinghe', 'Mahagama Sekera', 'K. Jayatilaka', 'Gunadasa Amarasekera', 'R.K. Narayan', 'Vikram Seth', 'Arundhati Roy', 'Salman Rushdie', 'Amitav Ghosh', 'Anita Desai', 'Harper Lee', 'George Orwell', 'F. Scott Fitzgerald'];
        const publishers = ['Godage International', 'Sarasavi Publishers', 'Penguin Random House India', 'Harper Collins India', 'Rupa Publications', 'Orient BlackSwan', 'Penguin Books', 'Oxford Press'];
        
        const sampleBooks = [
            // Sri Lankan Literature
            {
                id: 1,
                title: "Viragaya",
                author: "Martin Wickramasinghe",
                price: 1250,
                originalPrice: 1500,
                usdPrice: 3.91,
                usdOriginalPrice: 4.69,
                genre: "Sri Lankan Literature",
                publisher: "Godage International",
                year: 1956,
                rating: 4.9,
                reviews: 892,
                image: "https://images.gr-assets.com/books/1347376889l/16072199.jpg",
                description: "A masterpiece of Sinhala literature exploring human relationships and Sri Lankan village life.",
                stock: 25,
                isbn: "978-955-30-1234-5",
                pages: 312,
                language: "Sinhala",
                format: "Paperback",
                origin: "Sri Lanka"
            },
            {
                id: 2,
                title: "Kaliyugaya",
                author: "Martin Wickramasinghe",
                price: 1180,
                originalPrice: 1400,
                usdPrice: 3.69,
                usdOriginalPrice: 4.38,
                genre: "Sri Lankan Literature",
                publisher: "Godage International",
                year: 1957,
                rating: 4.8,
                reviews: 567,
                image: "https://images.gr-assets.com/books/1442425632l/26793546.jpg",
                description: "Second part of the Wickramasinghe trilogy, depicting changing social values in Sri Lanka.",
                stock: 18,
                isbn: "978-955-30-1235-2",
                pages: 298,
                language: "Sinhala",
                format: "Paperback",
                origin: "Sri Lanka"
            },
            {
                id: 3,
                title: "Yuganthaya",
                author: "Martin Wickramasinghe",
                price: 1320,
                originalPrice: 1600,
                usdPrice: 4.13,
                usdOriginalPrice: 5.00,
                genre: "Sri Lankan Literature",
                publisher: "Godage International",
                year: 1949,
                rating: 4.7,
                reviews: 423,
                image: "https://images.gr-assets.com/books/1442425632l/26793547.jpg",
                description: "The final installment of the trilogy, exploring Sri Lankan society in transition.",
                stock: 22,
                isbn: "978-955-30-1236-9",
                pages: 334,
                language: "Sinhala",
                format: "Paperback",
                origin: "Sri Lanka"
            },
            {
                id: 4,
                title: "Adaraneeya Kathawak",
                author: "K. Jayatilaka",
                price: 980,
                originalPrice: 1200,
                usdPrice: 3.06,
                usdOriginalPrice: 3.75,
                genre: "Romance",
                publisher: "Sarasavi Publishers",
                year: 1968,
                rating: 4.5,
                reviews: 789,
                image: "https://images.gr-assets.com/books/1388193737l/19288423.jpg",
                description: "A beautiful love story set in colonial Sri Lanka, capturing the essence of romance and tradition.",
                stock: 30,
                isbn: "978-955-573-234-1",
                pages: 256,
                language: "Sinhala",
                format: "Paperback",
                origin: "Sri Lanka"
            },
            // Indian Literature
            {
                id: 5,
                title: "The God of Small Things",
                author: "Arundhati Roy",
                price: 1560,
                originalPrice: 1800,
                usdPrice: 4.88,
                usdOriginalPrice: 5.63,
                genre: "Indian Literature",
                publisher: "Penguin Random House India",
                year: 1997,
                rating: 4.6,
                reviews: 2847,
                image: "https://covers.openlibrary.org/b/isbn/9780812979657-L.jpg",
                description: "Booker Prize winner exploring family secrets and forbidden love in Kerala, India.",
                stock: 35,
                isbn: "978-0812979657",
                pages: 340,
                language: "English",
                format: "Paperback",
                origin: "India"
            },
            {
                id: 6,
                title: "Malgudi Days",
                author: "R.K. Narayan",
                price: 1120,
                originalPrice: 1350,
                usdPrice: 3.50,
                usdOriginalPrice: 4.22,
                genre: "Indian Literature",
                publisher: "Penguin Random House India",
                year: 1982,
                rating: 4.8,
                reviews: 1564,
                image: "https://covers.openlibrary.org/b/isbn/9780140185621-L.jpg",
                description: "Collection of short stories set in the fictional town of Malgudi, depicting Indian life with humor and warmth.",
                stock: 28,
                isbn: "978-0140185621",
                pages: 246,
                language: "English",
                format: "Paperback",
                origin: "India"
            },
            {
                id: 7,
                title: "A Suitable Boy",
                author: "Vikram Seth",
                price: 2240,
                originalPrice: 2600,
                usdPrice: 7.00,
                usdOriginalPrice: 8.13,
                genre: "Indian Literature",
                publisher: "Phoenix House",
                year: 1993,
                rating: 4.4,
                reviews: 987,
                image: "https://covers.openlibrary.org/b/isbn/9780061329142-L.jpg",
                description: "Epic novel of post-independence India, following four families and their interconnected lives.",
                stock: 15,
                isbn: "978-0061329142",
                pages: 1474,
                language: "English",
                format: "Hardcover",
                origin: "India"
            },
            {
                id: 8,
                title: "Ponniyin Selvan",
                author: "Kalki Krishnamurthy",
                price: 1680,
                originalPrice: 1950,
                usdPrice: 5.25,
                usdOriginalPrice: 6.09,
                genre: "Tamil Books",
                publisher: "Vanathi Pathippagam",
                year: 1955,
                rating: 4.9,
                reviews: 2156,
                image: "https://images.gr-assets.com/books/1449670169l/28186205.jpg",
                description: "Historical Tamil novel about the Chola dynasty, considered one of the greatest works in Tamil literature.",
                stock: 40,
                isbn: "978-81-8493-456-7",
                pages: 2400,
                language: "Tamil",
                format: "Paperback Set (5 volumes)",
                origin: "India"
            },
            {
                id: 9,
                title: "Thirukkural",
                author: "Thiruvalluvar",
                price: 890,
                originalPrice: 1100,
                usdPrice: 2.78,
                usdOriginalPrice: 3.44,
                genre: "Spiritual & Philosophy",
                publisher: "Saradha Pathippagam",
                year: 300,
                rating: 4.9,
                reviews: 1876,
                image: "https://images.gr-assets.com/books/1442481228l/26827755.jpg",
                description: "Ancient Tamil ethical literature consisting of 1330 couplets dealing with virtue, wealth, and love.",
                stock: 45,
                isbn: "978-81-7635-789-2",
                pages: 198,
                language: "Tamil",
                format: "Paperback",
                origin: "India"
            },
            {
                id: 10,
                title: "Midnight's Children",
                author: "Salman Rushdie",
                price: 1890,
                originalPrice: 2200,
                usdPrice: 5.91,
                usdOriginalPrice: 6.88,
                genre: "Indian Literature",
                publisher: "Vintage Books",
                year: 1981,
                rating: 4.3,
                reviews: 1234,
                image: "https://covers.openlibrary.org/b/isbn/9780812976533-L.jpg",
                description: "Booker Prize winner chronicling India's transition from British colonialism to independence through magical realism.",
                stock: 20,
                isbn: "978-0812976533",
                pages: 647,
                language: "English",
                format: "Paperback",
                origin: "India"
            }
        ];

        // Generate additional books
        for (let i = 5; i <= 50; i++) {
            sampleBooks.push({
                id: i,
                title: `Book Title ${i}`,
                author: authors[Math.floor(Math.random() * authors.length)],
                price: Math.floor(Math.random() * 40) + 10,
                originalPrice: Math.floor(Math.random() * 50) + 15,
                genre: genres[Math.floor(Math.random() * genres.length)],
                publisher: publishers[Math.floor(Math.random() * publishers.length)],
                year: 2015 + Math.floor(Math.random() * 10),
                rating: (Math.random() * 2 + 3).toFixed(1),
                reviews: Math.floor(Math.random() * 500) + 10,
                image: `https://picsum.photos/200/300?random=${i}`,
                description: `This is a fascinating book that explores various themes and concepts. Book ${i} offers readers an engaging experience.`,
                stock: Math.floor(Math.random() * 20) + 1,
                isbn: `978-${Math.random().toString().substr(2, 10)}`,
                pages: Math.floor(Math.random() * 400) + 200,
                language: 'English',
                format: Math.random() > 0.5 ? 'Paperback' : 'Hardcover'
            });
        }
        return sampleBooks;
    }

    generateSampleOrders() {
        const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        const orders = [];
        
        for (let i = 1; i <= 10; i++) {
            const orderItems = [{
                id: i,
                title: `Sample Book ${i}`,
                price: 25,
                quantity: 1
            }];
            
            orders.push({
                id: `ORD-${1000 + i}`,
                date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                items: orderItems,
                total: 25,
                shipping: 5.99,
                tax: 2.00
            });
        }
        
        return orders;
    }

    getDefaultProfile() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            preferences: {
                newsletter: true,
                promotions: false,
                recommendations: true
            }
        };
    }

    getDefaultSettings() {
        return {
            theme: 'light',
            language: 'en',
            currency: 'LKR',
            itemsPerPage: 12,
            defaultView: 'grid'
        };
    }

    setupCurrencySelector() {
        const currencySelector = document.getElementById('currencySelector');
        if (currencySelector) {
            currencySelector.value = this.currentCurrency;
            currencySelector.addEventListener('change', (e) => {
                this.currentCurrency = e.target.value;
                localStorage.setItem('currency', this.currentCurrency);
                this.displayBooks(); // Refresh display with new currency
                this.showNotification(`Currency changed to ${this.getCurrencySymbol(this.currentCurrency)}`, 'success');
            });
        }
    }

    detectLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.updateLocationDisplay(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.log('Geolocation error:', error);
                    // Fallback to IP-based detection or default location
                    this.setDefaultLocation();
                }
            );
        } else {
            this.setDefaultLocation();
        }
    }

    updateLocationDisplay(lat, lng) {
        // Simple location detection based on coordinates
        const locationElement = document.getElementById('currentLocation');
        if (locationElement) {
            if (lat >= 5.9 && lat <= 9.9 && lng >= 79.5 && lng <= 81.9) {
                locationElement.textContent = "Sri Lanka";
                if (this.currentCurrency === 'USD') {
                    this.currentCurrency = 'LKR';
                    this.updateCurrencySelector();
                }
            } else if (lat >= 6.5 && lat <= 37.1 && lng >= 68.0 && lng <= 97.4) {
                locationElement.textContent = "India";
                if (this.currentCurrency === 'USD') {
                    this.currentCurrency = 'INR';
                    this.updateCurrencySelector();
                }
            } else {
                locationElement.textContent = "International";
            }
        }
    }

    setDefaultLocation() {
        const locationElement = document.getElementById('currentLocation');
        if (locationElement) {
            locationElement.textContent = "Colombo, Sri Lanka";
        }
    }

    updateCurrencySelector() {
        const currencySelector = document.getElementById('currencySelector');
        if (currencySelector) {
            currencySelector.value = this.currentCurrency;
        }
        localStorage.setItem('currency', this.currentCurrency);
    }

    getCurrencySymbol(currency) {
        const symbols = {
            USD: '$',
            LKR: '₨',
            INR: '₹'
        };
        return symbols[currency] || currency;
    }

    convertPrice(usdPrice) {
        if (this.currentCurrency === 'USD') {
            return usdPrice.toFixed(2);
        }
        return Math.round(usdPrice * this.exchangeRates[this.currentCurrency]);
    }

    formatPrice(price, currency = null) {
        const curr = currency || this.currentCurrency;
        const symbol = this.getCurrencySymbol(curr);
        
        if (curr === 'USD') {
            return `${symbol}${parseFloat(price).toFixed(2)}`;
        } else {
            return `${symbol}${Math.round(price).toLocaleString()}`;
        }
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Cart, wishlist, compare toggles
        document.addEventListener('click', (e) => {
            if (e.target.matches('.cart-toggle, .cart-toggle *')) {
                e.preventDefault();
                this.toggleSidebar('cart');
            }
            if (e.target.matches('.wishlist-toggle, .wishlist-toggle *')) {
                e.preventDefault();
                this.toggleSidebar('wishlist');
            }
            if (e.target.matches('.compare-toggle, .compare-toggle *')) {
                e.preventDefault();
                this.toggleSidebar('compare');
            }
            if (e.target.matches('.add-to-cart, .add-to-cart *')) {
                e.preventDefault();
                const button = e.target.closest('.add-to-cart');
                const bookId = parseInt(e.target.closest('.book-card').dataset.bookId);
                this.addToCart(bookId, button);
            }
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Auth functionality
        this.setupAuthListeners();
        
        // Contact form functionality
        this.setupContactForm();
    }

    setupAuthListeners() {
        const userMenuBtn = document.getElementById('userMenuBtn');
        const authModal = document.getElementById('authModal');
        const closeAuthModal = document.getElementById('closeAuthModal');
        const loginTab = document.getElementById('loginTab');
        const registerTab = document.getElementById('registerTab');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        // Open auth modal when clicking account button
        if (userMenuBtn) {
            userMenuBtn.addEventListener('click', () => {
                authModal.classList.add('show');
            });
        }

        // Close auth modal
        if (closeAuthModal) {
            closeAuthModal.addEventListener('click', () => {
                authModal.classList.remove('show');
            });
        }

        // Switch between login and register
        if (loginTab) {
            loginTab.addEventListener('click', () => {
                this.showLogin();
            });
        }

        if (registerTab) {
            registerTab.addEventListener('click', () => {
                this.showRegister();
            });
        }

        // Handle form submissions
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(loginForm);
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister(registerForm);
            });
        }

        // Close modal when clicking outside
        authModal?.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.classList.remove('show');
            }
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(contactForm);
            });
        }
    }

    showLogin() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const loginTab = document.getElementById('loginTab');
        const registerTab = document.getElementById('registerTab');

        if (loginForm && registerForm) {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            loginTab?.classList.add('active');
            registerTab?.classList.remove('active');
        }
    }

    showRegister() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const loginTab = document.getElementById('loginTab');
        const registerTab = document.getElementById('registerTab');

        if (loginForm && registerForm) {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            loginTab?.classList.remove('active');
            registerTab?.classList.add('active');
        }
    }

    handleLogin(form) {
        this.showLoading('Logging in...');
        
        // Simulate API call
        setTimeout(() => {
            const email = form.querySelector('input[type="email"]').value;
            const password = form.querySelector('input[type="password"]').value;
            
            this.hideLoading();
            
            // Simulate successful login
            if (email && password) {
                this.showNotification('Login successful! Welcome back!', 'success');
                
                // Update UI
                const userDisplayName = document.getElementById('userDisplayName');
                if (userDisplayName) {
                    const username = email.split('@')[0];
                    userDisplayName.textContent = username;
                }
                
                // Close modal
                document.getElementById('authModal').classList.remove('show');
                
                // Clear form
                form.reset();
            } else {
                this.showNotification('Please fill in all fields', 'error');
            }
        }, 1500);
    }

    handleRegister(form) {
        this.showLoading('Creating account...');
        
        // Simulate API call
        setTimeout(() => {
            const formData = new FormData(form);
            const name = form.querySelector('input[placeholder="Full Name"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const password = form.querySelector('input[placeholder="Password"]').value;
            const confirmPassword = form.querySelector('input[placeholder="Confirm Password"]').value;
            
            this.hideLoading();
            
            if (name && email && password && confirmPassword) {
                if (password !== confirmPassword) {
                    this.showNotification('Passwords do not match!', 'error');
                    return;
                }
                
                this.showNotification('Account created successfully! Welcome to BookHaven!', 'success');
                
                // Update UI
                const userDisplayName = document.getElementById('userDisplayName');
                if (userDisplayName) {
                    userDisplayName.textContent = name.split(' ')[0];
                }
                
                // Close modal
                document.getElementById('authModal').classList.remove('show');
                
                // Clear form
                form.reset();
            } else {
                this.showNotification('Please fill in all fields', 'error');
            }
        }, 1500);
    }

    handleContactForm(form) {
        this.showLoading('Sending message...');
        
        // Simulate API call
        setTimeout(() => {
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            
            this.hideLoading();
            
            if (name && email && subject && message) {
                this.showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
                form.reset();
            } else {
                this.showNotification('Please fill in all fields', 'error');
            }
        }, 1200);
    }

    handleSearch(query) {
        console.log('Search query:', query);
    }

    initializeSearch() {
        console.log('Initialize search');
    }

    displayBooks(showLoading = false) {
        const container = document.getElementById('booksContainer');
        if (!container) return;

        if (showLoading) {
            this.showSkeletonBooks(container);
            
            setTimeout(() => {
                this.renderBooks(container);
            }, 1500);
        } else {
            this.renderBooks(container);
        }
    }

    showSkeletonBooks(container) {
        const skeletonHtml = Array(8).fill(0).map(() => `
            <div class="skeleton-book">
                <div class="skeleton-image"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text short"></div>
                <div class="skeleton-text medium"></div>
            </div>
        `).join('');
        
        container.innerHTML = `<div class="skeleton-loader">${skeletonHtml}</div>`;
    }

    renderBooks(container) {
        const booksHtml = this.filteredBooks.slice(0, 12).map(book => `
            <div class="book-card" data-book-id="${book.id}">
                <div class="book-image-container">
                    <img src="${book.image}" alt="${book.title}" class="book-image" 
                         onerror="this.src='https://via.placeholder.com/200x300/f8f9fa/6c757d?text=No+Image'"
                         onload="this.style.opacity=1" style="opacity:0; transition: opacity 0.3s;">
                    <div class="book-overlay">
                        <button class="btn btn-secondary quick-view" onclick="bookHaven.quickView(${book.id})">
                            <i class="fas fa-eye"></i> Quick View
                        </button>
                    </div>
                    ${book.originalPrice > book.price ? `<div class="book-badge sale">Sale</div>` : ''}
                    ${book.stock <= 5 ? `<div class="book-badge stock">Low Stock</div>` : ''}
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">by ${book.author}</p>
                    <div class="book-rating">
                        <div class="stars">
                            ${this.generateStars(book.rating)}
                        </div>
                        <span class="rating-text">(${book.reviews})</span>
                    </div>
                    <div class="book-price">
                        <span class="current-price">${this.formatPrice(this.currentCurrency === 'USD' ? book.usdPrice || book.price : book.price)}</span>
                        ${(book.originalPrice > book.price || (book.usdOriginalPrice && book.usdOriginalPrice > (book.usdPrice || book.price))) ? 
                            `<span class="original-price">${this.formatPrice(this.currentCurrency === 'USD' ? book.usdOriginalPrice || book.originalPrice : book.originalPrice)}</span>` : ''}
                    </div>
                    ${book.origin ? `<div class="book-origin"><i class="fas fa-globe"></i> ${book.origin}</div>` : ''}
                    ${book.language !== 'English' ? `<div class="book-language"><i class="fas fa-language"></i> ${book.language}</div>` : ''}
                    <div class="stock-info">
                        <i class="fas fa-${book.stock > 5 ? 'check-circle' : book.stock > 0 ? 'exclamation-circle' : 'times-circle'}"></i>
                        ${book.stock > 5 ? 'In Stock' : book.stock > 0 ? `Only ${book.stock} left` : 'Out of Stock'}
                    </div>
                </div>
                <div class="book-actions">
                    <button class="btn btn-primary add-to-cart" ${book.stock === 0 ? 'disabled' : ''}>
                        <span class="btn-text">
                            <i class="fas fa-shopping-cart"></i> 
                            ${book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </span>
                    </button>
                    <div class="action-buttons">
                        <button class="btn btn-icon add-to-wishlist" title="Add to Wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="btn btn-icon add-to-compare" title="Compare">
                            <i class="fas fa-balance-scale"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        container.className = 'books-grid';
        container.innerHTML = booksHtml;

        // Animate books in
        const bookCards = container.querySelectorAll('.book-card');
        bookCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        return stars;
    }

    addToCart(bookId, buttonElement) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;

        // Show button loading state
        if (buttonElement) {
            buttonElement.classList.add('loading');
            buttonElement.disabled = true;
        }

        // Show loading overlay
        this.showLoading('Adding to cart...');

        // Simulate API call delay for better UX
        setTimeout(() => {
            const existingItem = this.cart.find(item => item.id === bookId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    price: book.price,
                    image: book.image,
                    quantity: 1
                });
            }

            this.saveCart();
            this.updateCartCount();
            this.hideLoading();
            
            // Reset button state
            if (buttonElement) {
                buttonElement.classList.remove('loading');
                buttonElement.disabled = false;
                
                // Temporary success state
                const originalText = buttonElement.innerHTML;
                buttonElement.innerHTML = '<i class="fas fa-check"></i> Added!';
                buttonElement.style.background = '#27ae60';
                
                setTimeout(() => {
                    buttonElement.innerHTML = originalText;
                    buttonElement.style.background = '';
                }, 1500);
            }
            
            this.showNotification(`"${book.title}" added to cart!`, 'success');
        }, 800);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    showNotification(message, type = 'info') {
        console.log(`${type.toUpperCase()}: ${message}`);
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'info'}"></i>
            <span>${message}</span>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    // Sidebar functionality
    toggleSidebar(type) {
        const sidebar = document.querySelector(`.${type}-sidebar`);
        if (sidebar) {
            const isOpen = sidebar.classList.contains('open');
            
            // Close all sidebars first
            document.querySelectorAll('.sidebar').forEach(s => s.classList.remove('open'));
            
            // Open the requested sidebar if it wasn't already open
            if (!isOpen) {
                sidebar.classList.add('open');
            }
        }
    }

    // Additional methods
    updateWishlistCount() { 
        const count = document.querySelector('.wishlist-count');
        if (count) count.textContent = this.wishlist.length;
    }
    
    updateCompareCount() { 
        const count = document.querySelector('.compare-count');
        if (count) count.textContent = this.compareList.length;
    }
    
    displayRecentlyViewed() { 
        const container = document.getElementById('recentlyViewedGrid');
        if (container && this.recentlyViewed.length > 0) {
            container.innerHTML = this.recentlyViewed.slice(0, 6)
                .map(book => `
                    <div class="recently-viewed-item" data-book-id="${book.id}">
                        <img src="${book.image}" alt="${book.title}">
                        <div class="item-info">
                            <h4>${book.title}</h4>
                            <p>${book.author}</p>
                            <span class="price">$${book.price}</span>
                        </div>
                    </div>
                `).join('');
        }
    }
    
    setupModals() {
        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('show');
            }
        });
        
        // Close buttons
        document.querySelectorAll('.modal .close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.modal').classList.remove('show');
            });
        });
    }
    
    setupSidebars() {
        // Close sidebar buttons
        document.querySelectorAll('.close-sidebar').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.sidebar').classList.remove('open');
            });
        });
    }
    
    setupFilters() {
        const genreFilter = document.getElementById('genreFilter');
        if (genreFilter) {
            const genres = [...new Set(this.books.map(book => book.genre))];
            genreFilter.innerHTML = '<option value="">All Genres</option>' +
                genres.map(genre => `<option value="${genre}">${genre}</option>`).join('');
            
            genreFilter.addEventListener('change', () => this.applyFilters());
        }
    }
    
    setupViewOptions() {
        const viewButtons = document.querySelectorAll('.view-btn');
        
        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const viewType = btn.getAttribute('data-view');
                this.setView(viewType);
                
                // Update active state
                viewButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                console.log(`Switched to ${viewType} view`);
            });
        });
    }
    
    updateBreadcrumb() { 
        const breadcrumb = document.querySelector('.breadcrumb');
        if (breadcrumb) {
            breadcrumb.innerHTML = '<a href="#home">Home</a> <i class="fas fa-chevron-right"></i> <span class="breadcrumb-current">All Books</span>';
        }
    }

    applyFilters() {
        const genreFilter = document.getElementById('genreFilter');
        const selectedGenre = genreFilter ? genreFilter.value : '';
        
        this.filteredBooks = this.books.filter(book => {
            return !selectedGenre || book.genre === selectedGenre;
        });
        
        this.displayBooks();
    }

    setView(viewType) {
        const container = document.getElementById('booksContainer');
        if (container) {
            // Remove existing view classes
            container.classList.remove('books-grid', 'books-list', 'list-view');
            
            if (viewType === 'list') {
                container.classList.add('books-grid', 'list-view');
            } else {
                container.classList.add('books-grid');
            }
            
            // Add visual feedback
            this.showNotification(`Switched to ${viewType} view`, 'info');
            
            console.log(`View changed to ${viewType}, container classes:`, container.className);
        } else {
            console.error('Books container not found!');
        }
    }

    quickView(bookId) {
        this.showLoading('Loading book details...');
        
        setTimeout(() => {
            const book = this.books.find(b => b.id === bookId);
            if (book) {
                this.hideLoading();
                this.showNotification(`Quick view for "${book.title}"`, 'info');
                // You could implement a modal here
            }
        }, 1000);
    }

    // Search with loading state
    performSearch(query) {
        this.showLoading('Searching books...');
        
        setTimeout(() => {
            this.filteredBooks = this.books.filter(book =>
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase()) ||
                book.genre.toLowerCase().includes(query.toLowerCase())
            );
            
            this.hideLoading();
            this.displayBooks();
            this.showNotification(`Found ${this.filteredBooks.length} books`, 'info');
        }, 800);
    }

    // Loading states for filters
    applyFiltersWithLoading() {
        this.showLoading('Applying filters...');
        
        setTimeout(() => {
            this.applyFilters();
            this.hideLoading();
        }, 600);
    }
}

// Initialize the application
let bookHaven;
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, creating BookHaven instance...');
    bookHaven = new BookHaven();
});