// Sample Books Data with Real Cover Images from Open Library
const books = [
    {
        id: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 12.99,
        category: "fiction",
        rating: 4.8,
        reviews: 1247,
        image: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
        description: "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.",
        badge: "Classic"
    },
    {
        id: 2,
        title: "1984",
        author: "George Orwell",
        price: 13.99,
        category: "fiction",
        rating: 4.7,
        reviews: 892,
        image: "https://covers.openlibrary.org/b/isbn/9780452284234-L.jpg",
        description: "A dystopian social science fiction novel that examines the role of truth and facts within politics.",
        badge: "Bestseller"
    },
    {
        id: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 10.99,
        category: "fiction",
        rating: 4.4,
        reviews: 1156,
        image: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
        description: "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
        badge: "Classic"
    },
    {
        id: 4,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        price: 16.99,
        category: "non-fiction",
        rating: 4.6,
        reviews: 934,
        image: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
        description: "A brief history of humankind, exploring how our species conquered the world.",
        badge: "Popular"
    },
    {
        id: 5,
        title: "The Girl with the Dragon Tattoo",
        author: "Stieg Larsson",
        price: 14.99,
        category: "mystery",
        rating: 4.5,
        reviews: 1089,
        image: "https://covers.openlibrary.org/b/isbn/9780307949486-L.jpg",
        description: "A journalist and a hacker uncover dark secrets in this gripping thriller.",
        badge: "Thriller"
    },
    {
        id: 6,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 9.99,
        category: "romance",
        rating: 4.7,
        reviews: 1378,
        image: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
        description: "The romantic clash between the opinionated Elizabeth Bennet and proud Mr. Darcy.",
        badge: "Romance"
    },
    {
        id: 7,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        price: 11.99,
        category: "fiction",
        rating: 4.2,
        reviews: 876,
        image: "https://covers.openlibrary.org/b/isbn/9780316769174-L.jpg",
        description: "The controversial coming-of-age story of Holden Caulfield.",
        badge: "Classic"
    },
    {
        id: 8,
        title: "Educated",
        author: "Tara Westover",
        price: 15.99,
        category: "non-fiction",
        rating: 4.8,
        reviews: 1523,
        image: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg",
        description: "A memoir about education, self-invention, and the fierce pull of family loyalty.",
        badge: "Memoir"
    },
    {
        id: 9,
        title: "Gone Girl",
        author: "Gillian Flynn",
        price: 13.99,
        category: "mystery",
        rating: 4.3,
        reviews: 1067,
        image: "https://covers.openlibrary.org/b/isbn/9780307588364-L.jpg",
        description: "A psychological thriller about a marriage gone terribly wrong.",
        badge: "Bestseller"
    },
    {
        id: 10,
        title: "The Notebook",
        author: "Nicholas Sparks",
        price: 12.99,
        category: "romance",
        rating: 4.6,
        reviews: 1234,
        image: "https://covers.openlibrary.org/b/isbn/9780446605236-L.jpg",
        description: "A timeless love story that will make you believe in true love.",
        badge: "Romance"
    },
    {
        id: 11,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 14.99,
        category: "fiction",
        rating: 4.9,
        reviews: 1456,
        image: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
        description: "The enchanting prelude to The Lord of the Rings trilogy.",
        badge: "Fantasy"
    },
    {
        id: 12,
        title: "Atomic Habits",
        author: "James Clear",
        price: 17.99,
        category: "non-fiction",
        rating: 4.7,
        reviews: 1678,
        image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
        description: "An easy and proven way to build good habits and break bad ones.",
        badge: "Self-Help"
    }
];

// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentPage = 1;
let booksPerPage = 8;
let filteredBooks = [...books];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayBooks();
    updateCartCount();
    setupEventListeners();
    updatePagination();
});

// Event Listeners Setup
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });

    // Price range slider
    const priceRange = document.getElementById('priceRange');
    priceRange.addEventListener('input', handlePriceFilter);

    // Modal close events
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove('show');
            }
        });
    });

    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
}

// Display Books
function displayBooks() {
    const grid = document.getElementById('booksGrid');
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToShow = filteredBooks.slice(startIndex, endIndex);

    grid.innerHTML = booksToShow.map(book => `
        <div class="book-card" onclick="openBookModal(${book.id})">
            <div class="book-image">
                <img src="${book.image}" alt="${book.title}" 
                     onerror="this.src='https://via.placeholder.com/280x400/f8f9fa/6c757d?text=No+Image'" 
                     loading="lazy">
                <span class="book-badge">${book.badge}</span>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <div class="book-rating">
                    <div class="stars">${generateStars(book.rating)}</div>
                    <span>(${book.reviews})</span>
                </div>
                <div class="book-price">$${book.price}</div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${book.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Generate Star Rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Search Functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    displayBooks();
    updatePagination();
}

// Filter by Category
function handleFilter(event) {
    const category = event.target.dataset.category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter books
    if (category === 'all') {
        filteredBooks = [...books];
    } else {
        filteredBooks = books.filter(book => book.category === category);
    }
    
    currentPage = 1;
    displayBooks();
    updatePagination();
}

// Price Filter
function handlePriceFilter(event) {
    const maxPrice = parseFloat(event.target.value);
    document.getElementById('priceValue').textContent = maxPrice;
    
    filteredBooks = books.filter(book => book.price <= maxPrice);
    currentPage = 1;
    displayBooks();
    updatePagination();
}

// Pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="page-btn" onclick="changePage(${currentPage - 1})">Previous</button>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        paginationHTML += `<button class="page-btn ${activeClass}" onclick="changePage(${i})">${i}</button>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="page-btn" onclick="changePage(${currentPage + 1})">Next</button>`;
    }
    
    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    currentPage = page;
    displayBooks();
    updatePagination();
    document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
}

// Cart Functions
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }
    
    updateCart();
    showToast(`${book.title} added to cart!`);
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    updateCart();
    showToast('Item removed from cart');
}

function updateQuantity(bookId, change) {
    const item = cart.find(item => item.id === bookId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(bookId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image"
                 onerror="this.src='https://via.placeholder.com/60x80/f8f9fa/6c757d?text=No+Image'">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
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