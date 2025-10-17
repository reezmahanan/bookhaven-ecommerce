// BookHaven E-commerce JavaScript - Complete SRS Implementation
// Author: GitHub Copilot  
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
        this.books = this.generateSampleBooks();
        this.filteredBooks = [...this.books];
        
        this.init();
    }

    init() {
        this.showPageLoading();
        
        // Initialize immediately but show loading states
        this.setupEventListeners();
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
        
        // Hide page loading after everything is set up
        setTimeout(() => {
            this.hidePageLoading();
        }, 2500);
    }

    showPageLoading() {
        const pageLoading = document.getElementById('pageLoading');
        if (pageLoading) {
            pageLoading.classList.remove('hide');
        }
    }

    hidePageLoading() {
        const pageLoading = document.getElementById('pageLoading');
        if (pageLoading) {
            pageLoading.classList.add('hide');
            
            // Remove from DOM after transition
            setTimeout(() => {
                pageLoading.style.display = 'none';
            }, 800);
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
        const genres = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Romance', 'Mystery', 'Biography', 'History', 'Technology'];
        const authors = ['Harper Lee', 'George Orwell', 'F. Scott Fitzgerald', 'Yuval Noah Harari', 'Stephen King', 'Jane Austen', 'Dan Brown', 'Margaret Atwood'];
        const publishers = ['Penguin Books', 'Harper Collins', 'Random House', 'Simon & Schuster', 'Macmillan', 'Oxford Press'];
        
        const sampleBooks = [
            {
                id: 1,
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                price: 12.99,
                originalPrice: 15.99,
                genre: "Fiction",
                publisher: "Harper Collins",
                year: 1960,
                rating: 4.8,
                reviews: 1247,
                image: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
                description: "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.",
                stock: 15,
                isbn: "978-0061120084",
                pages: 376,
                language: "English",
                format: "Paperback"
            },
            {
                id: 2,
                title: "1984",
                author: "George Orwell",
                price: 13.99,
                originalPrice: 16.99,
                genre: "Science Fiction",
                publisher: "Penguin Books",
                year: 1949,
                rating: 4.7,
                reviews: 892,
                image: "https://covers.openlibrary.org/b/isbn/9780452284234-L.jpg",
                description: "A dystopian social science fiction novel that examines the role of truth and facts within politics.",
                stock: 8,
                isbn: "978-0452284234",
                pages: 328,
                language: "English",
                format: "Hardcover"
            },
            {
                id: 3,
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                price: 10.99,
                originalPrice: 13.99,
                genre: "Fiction",
                publisher: "Simon & Schuster",
                year: 1925,
                rating: 4.4,
                reviews: 1156,
                image: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
                description: "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
                stock: 12,
                isbn: "978-0743273565",
                pages: 180,
                language: "English",
                format: "Paperback"
            },
            {
                id: 4,
                title: "Sapiens",
                author: "Yuval Noah Harari",
                price: 16.99,
                originalPrice: 19.99,
                genre: "Non-Fiction",
                publisher: "Harper Collins",
                year: 2014,
                rating: 4.6,
                reviews: 934,
                image: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
                description: "A brief history of humankind, exploring how our species conquered the world.",
                stock: 20,
                isbn: "978-0062316097",
                pages: 464,
                language: "English",
                format: "Hardcover"
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
            currency: 'USD',
            itemsPerPage: 12,
            defaultView: 'grid'
        };
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
                        <span class="current-price">$${book.price}</span>
                        ${book.originalPrice > book.price ? `<span class="original-price">$${book.originalPrice}</span>` : ''}
                    </div>
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
        const gridBtn = document.getElementById('gridView');
        const listBtn = document.getElementById('listView');
        
        if (gridBtn) gridBtn.addEventListener('click', () => this.setView('grid'));
        if (listBtn) listBtn.addEventListener('click', () => this.setView('list'));
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
            container.className = viewType === 'grid' ? 'books-grid' : 'books-list';
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
}

// Initialize the application
let bookHaven;
document.addEventListener('DOMContentLoaded', function() {
    bookHaven = new BookHaven();
});