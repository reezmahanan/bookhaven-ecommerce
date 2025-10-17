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
        
        this.currentUser = 'user123'; // Simulated user ID
        this.books = this.generateSampleBooks();
        this.filteredBooks = [...this.books];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCartCount();
        this.updateWishlistCount();
        this.updateCompareCount();
        this.displayBooks();
        this.displayRecentlyViewed();
        this.initializeSearch();
        this.setupModals();
        this.setupSidebars();
        this.setupFilters();
        this.setupViewOptions();
        this.updateBreadcrumb();
    }

    // ==================== SAMPLE DATA GENERATION ====================
    
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
            },
            {
                id: 5,
                title: "The Girl with the Dragon Tattoo",
                author: "Stieg Larsson",
                price: 14.99,
                originalPrice: 17.99,
                genre: "Mystery",
                publisher: "Random House",
                year: 2005,
                rating: 4.5,
                reviews: 1089,
                image: "https://covers.openlibrary.org/b/isbn/9780307949486-L.jpg",
                description: "A journalist and a hacker uncover dark secrets in this gripping thriller.",
                stock: 5,
                isbn: "978-0307949486",
                pages: 590,
                language: "English",
                format: "Paperback"
            }
        ];

        // Generate additional books for comprehensive catalog
        const books = [...sampleBooks];
        for (let i = 6; i <= 50; i++) {
            books.push({
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
                description: `This is a fascinating book that explores various themes and concepts. Book ${i} offers readers an engaging experience with well-developed characters and compelling storylines.`,
                stock: Math.floor(Math.random() * 20) + 1,
                isbn: `978-${Math.random().toString().substr(2, 10)}`,
                pages: Math.floor(Math.random() * 400) + 200,
                language: 'English',
                format: Math.random() > 0.5 ? 'Paperback' : 'Hardcover'
            });
        }
        return books;
    }

    generateSampleOrders() {
        const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        const orders = [];
        
        for (let i = 1; i <= 10; i++) {
            const orderItems = [];
            const numItems = Math.floor(Math.random() * 3) + 1;
            
            for (let j = 0; j < numItems; j++) {
                const book = this.books ? this.books[Math.floor(Math.random() * 20)] : { title: `Book ${j + 1}`, price: 25 };
                orderItems.push({
                    id: book.id || j,
                    title: book.title,
                    price: book.price || 25,
                    quantity: Math.floor(Math.random() * 3) + 1
                });
            }
            
            const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            orders.push({
                id: `ORD-${1000 + i}`,
                date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                items: orderItems,
                total: total,
                shipping: 5.99,
                tax: total * 0.08
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
            address: '',
            city: '',
            zipCode: '',
            country: '',
            birthDate: '',
            gender: '',
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
            defaultView: 'grid',
            notifications: {
                email: true,
                push: false,
                sms: false
            },
            privacy: {
                profileVisible: false,
                reviewsVisible: true,
                wishlistVisible: false
            }
        };
    }

    // ==================== EVENT LISTENERS ====================
    
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.performSearch();
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
        }

        // User menu toggle
        const userMenuToggle = document.querySelector('.user-menu-toggle');
        const userMenu = document.querySelector('.user-menu');
        
        if (userMenuToggle && userMenu) {
            userMenuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                userMenu.classList.toggle('show');
            });
        }

        // Close user menu when clicking outside
        document.addEventListener('click', (e) => {
            if (userMenu && !userMenu.contains(e.target) && !userMenuToggle?.contains(e.target)) {
                userMenu.classList.remove('show');
            }
        });

        // View toggle buttons
        const gridViewBtn = document.getElementById('gridView');
        const listViewBtn = document.getElementById('listView');
        
        if (gridViewBtn) gridViewBtn.addEventListener('click', () => this.setView('grid'));
        if (listViewBtn) listViewBtn.addEventListener('click', () => this.setView('list'));

        // Filter event listeners
        this.setupFilterListeners();
        
        // Sidebar toggles
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
        });

        // Modal triggers
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-modal]')) {
                e.preventDefault();
                this.openModal(e.target.dataset.modal);
            }
        });

        // Book card actions
        document.addEventListener('click', (e) => {
            if (e.target.matches('.add-to-cart, .add-to-cart *')) {
                e.preventDefault();
                const bookId = parseInt(e.target.closest('.book-card').dataset.bookId);
                this.addToCart(bookId);
            }
            if (e.target.matches('.add-to-wishlist, .add-to-wishlist *')) {
                e.preventDefault();
                const bookId = parseInt(e.target.closest('.book-card').dataset.bookId);
                this.addToWishlist(bookId);
            }
            if (e.target.matches('.add-to-compare, .add-to-compare *')) {
                e.preventDefault();
                const bookId = parseInt(e.target.closest('.book-card').dataset.bookId);
                this.addToCompare(bookId);
            }
        });

        // Book card clicks for recently viewed
        document.addEventListener('click', (e) => {
            const bookCard = e.target.closest('.book-card');
            if (bookCard && !e.target.matches('button, button *, .btn, .btn *')) {
                const bookId = parseInt(bookCard.dataset.bookId);
                this.addToRecentlyViewed(bookId);
            }
        });
    }

    setupFilterListeners() {
        const genreFilter = document.getElementById('genreFilter');
        const priceFilter = document.getElementById('priceFilter');
        const ratingFilter = document.getElementById('ratingFilter');
        const sortFilter = document.getElementById('sortFilter');
        const clearFiltersBtn = document.getElementById('clearFilters');

        if (genreFilter) genreFilter.addEventListener('change', () => this.applyFilters());
        if (priceFilter) priceFilter.addEventListener('change', () => this.applyFilters());
        if (ratingFilter) ratingFilter.addEventListener('change', () => this.applyFilters());
        if (sortFilter) sortFilter.addEventListener('change', () => this.applyFilters());
        if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', () => this.clearFilters());
    }

    // ==================== SEARCH FUNCTIONALITY ====================
    
    initializeSearch() {
        const searchSuggestions = document.getElementById('searchSuggestions');
        if (searchSuggestions) {
            searchSuggestions.innerHTML = '';
        }
    }

    handleSearch(query) {
        const searchSuggestions = document.getElementById('searchSuggestions');
        if (!searchSuggestions) return;

        if (query.length < 2) {
            searchSuggestions.classList.remove('show');
            return;
        }

        const suggestions = this.books
            .filter(book => 
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase()) ||
                book.genre.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 5);

        if (suggestions.length > 0) {
            searchSuggestions.innerHTML = suggestions
                .map(book => `
                    <div class="suggestion-item" data-book-id="${book.id}">
                        <img src="${book.image}" alt="${book.title}">
                        <div class="suggestion-info">
                            <div class="suggestion-title">${book.title}</div>
                            <div class="suggestion-author">by ${book.author}</div>
                        </div>
                        <div class="suggestion-price">$${book.price}</div>
                    </div>
                `).join('');
            
            searchSuggestions.classList.add('show');
            
            searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    const bookId = parseInt(item.dataset.bookId);
                    this.selectBook(bookId);
                    searchSuggestions.classList.remove('show');
                });
            });
        } else {
            searchSuggestions.classList.remove('show');
        }
    }

    performSearch() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput?.value.trim();
        
        if (!query) return;

        this.filteredBooks = this.books.filter(book =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase()) ||
            book.genre.toLowerCase().includes(query.toLowerCase()) ||
            book.description.toLowerCase().includes(query.toLowerCase())
        );

        this.displayBooks();
        this.updateBreadcrumb(['Search Results', `"${query}"`]);
        
        const searchSuggestions = document.getElementById('searchSuggestions');
        if (searchSuggestions) {
            searchSuggestions.classList.remove('show');
        }
    }

    selectBook(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (book) {
            this.addToRecentlyViewed(bookId);
            console.log('Selected book:', book.title);
        }
    }

    // ==================== CART FUNCTIONALITY ====================
    
    addToCart(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;

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
        this.updateCartSidebar();
        this.showNotification(`"${book.title}" added to cart!`, 'success');
    }

    removeFromCart(bookId) {
        const index = this.cart.findIndex(item => item.id === bookId);
        if (index > -1) {
            const book = this.cart[index];
            this.cart.splice(index, 1);
            this.saveCart();
            this.updateCartCount();
            this.updateCartSidebar();
            this.showNotification(`"${book.title}" removed from cart!`, 'info');
        }
    }

    updateCartQuantity(bookId, quantity) {
        const item = this.cart.find(item => item.id === bookId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(bookId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartCount();
                this.updateCartSidebar();
            }
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
        this.updateCartSidebar();
        this.showNotification('Cart cleared!', 'info');
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

    // ==================== DISPLAY METHODS ====================
    
    displayBooks() {
        const booksContainer = document.getElementById('booksContainer');
        if (!booksContainer) return;

        if (this.filteredBooks.length === 0) {
            booksContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No books found</h3>
                    <p>Try adjusting your search criteria or filters</p>
                </div>
            `;
            return;
        }

        const booksHtml = this.filteredBooks.map(book => this.createBookCard(book)).join('');
        booksContainer.innerHTML = booksHtml;
    }

    createBookCard(book) {
        const isInCart = this.cart.find(item => item.id === book.id);
        const isInWishlist = this.wishlist.find(item => item.id === book.id);
        const isInCompare = this.compareList.find(item => item.id === book.id);
        const stockStatus = book.stock > 5 ? 'in-stock' : book.stock > 0 ? 'low-stock' : 'out-of-stock';
        const stockText = book.stock > 5 ? 'In Stock' : book.stock > 0 ? `Only ${book.stock} left` : 'Out of Stock';

        return `
            <div class="book-card" data-book-id="${book.id}">
                <div class="book-image-container">
                    <img src="${book.image}" alt="${book.title}" class="book-image">
                    <div class="book-overlay">
                        <button class="btn btn-primary add-to-cart" ${book.stock === 0 ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i>
                            ${isInCart ? 'In Cart' : 'Add to Cart'}
                        </button>
                    </div>
                    ${book.originalPrice > book.price ? `<div class="book-badge">Sale</div>` : ''}
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
                    <div class="stock-status ${stockStatus}">
                        <i class="fas fa-circle"></i>
                        ${stockText}
                    </div>
                </div>
                <div class="book-actions">
                    <button class="btn btn-secondary add-to-wishlist ${isInWishlist ? 'active' : ''}" title="Add to Wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="btn btn-secondary add-to-compare ${isInCompare ? 'active' : ''}" title="Compare">
                        <i class="fas fa-balance-scale"></i>
                    </button>
                    <button class="btn btn-secondary" onclick="bookHaven.openReviewModal(${book.id})" title="Write Review">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
            </div>
        `;
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

    // ==================== NOTIFICATION SYSTEM ====================
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // ==================== PLACEHOLDER METHODS ====================
    
    setupModals() {
        // Modal setup will be implemented
    }

    setupSidebars() {
        // Sidebar setup will be implemented
    }

    updateBreadcrumb(items = ['Home']) {
        const breadcrumb = document.querySelector('.breadcrumb');
        if (breadcrumb) {
            breadcrumb.innerHTML = items.map((item, index) => 
                index === items.length - 1 ? 
                `<span class="current">${item}</span>` :
                `<a href="#">${item}</a><i class="fas fa-chevron-right"></i>`
            ).join('');
        }
    }

    // Save methods
    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }

    saveCompareList() {
        localStorage.setItem('compareList', JSON.stringify(this.compareList));
    }

    saveRecentlyViewed() {
        localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
    }

    saveSettings() {
        localStorage.setItem('settings', JSON.stringify(this.settings));
    }

    // Update methods
    updateWishlistCount() {
        const wishlistCount = document.querySelector('.wishlist-count');
        if (wishlistCount) {
            wishlistCount.textContent = this.wishlist.length;
            wishlistCount.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
        }
    }

    updateCompareCount() {
        const compareCount = document.querySelector('.compare-count');
        if (compareCount) {
            compareCount.textContent = this.compareList.length;
            compareCount.style.display = this.compareList.length > 0 ? 'flex' : 'none';
        }
    }

    displayRecentlyViewed() {
        // Will be implemented
    }

    setupFilters() {
        // Will be implemented
    }

    setupViewOptions() {
        // Will be implemented
    }

    // Placeholder methods for additional functionality
    addToWishlist(bookId) { console.log('Add to wishlist:', bookId); }
    addToCompare(bookId) { console.log('Add to compare:', bookId); }
    addToRecentlyViewed(bookId) { console.log('Add to recently viewed:', bookId); }
    applyFilters() { console.log('Apply filters'); }
    clearFilters() { console.log('Clear filters'); }
    setView(view) { console.log('Set view:', view); }
    toggleSidebar(type) { console.log('Toggle sidebar:', type); }
    openModal(modalType) { console.log('Open modal:', modalType); }
    updateCartSidebar() { console.log('Update cart sidebar'); }
    updateWishlistSidebar() { console.log('Update wishlist sidebar'); }
    updateCompareSidebar() { console.log('Update compare sidebar'); }
}

// Initialize the application
let bookHaven;
document.addEventListener('DOMContentLoaded', function() {
    bookHaven = new BookHaven();
});
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
    displayCartItems();
}

// Modal Functions
function openBookModal(bookId) {
    const book = books.find(b => b.id === bookId);
    const modal = document.getElementById('bookModal');
    const bookDetails = document.getElementById('bookDetails');
    
    bookDetails.innerHTML = `
        <img src="${book.image}" alt="${book.title}" class="book-details-image"
             onerror="this.src='https://via.placeholder.com/200x300/f8f9fa/6c757d?text=No+Image'">
        <div class="book-details-info">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <div class="book-rating">
                <div class="stars">${generateStars(book.rating)}</div>
                <span>(${book.reviews} reviews)</span>
            </div>
            <p>${book.description}</p>
            <div class="book-details-price">$${book.price}</div>
            <button class="add-to-cart" onclick="addToCart(${book.id}); closeBookModal();">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;
    
    modal.classList.add('show');
}

function closeBookModal() {
    document.getElementById('bookModal').classList.remove('show');
}

function openAuthModal() {
    document.getElementById('authModal').classList.add('show');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('show');
}

function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-tab')[0].classList.add('active');
}

function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-tab')[1].classList.add('active');
}

function openCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    const modal = document.getElementById('checkoutModal');
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.title} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = total.toFixed(2);
    
    modal.classList.add('show');
    toggleCart(); // Close cart sidebar
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('show');
}

// Form Handlers
function handleLogin(event) {
    event.preventDefault();
    showToast('Login successful!');
    closeAuthModal();
    
    // Update auth button
    const authBtn = document.querySelector('.auth-btn');
    authBtn.innerHTML = '<i class="fas fa-user-check"></i> Account';
}

function handleRegister(event) {
    event.preventDefault();
    showToast('Registration successful!');
    closeAuthModal();
    
    // Update auth button
    const authBtn = document.querySelector('.auth-btn');
    authBtn.innerHTML = '<i class="fas fa-user-check"></i> Account';
}

function handleCheckout(event) {
    event.preventDefault();
    showToast('Order placed successfully!');
    
    // Clear cart
    cart = [];
    updateCart();
    
    closeCheckout();
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}