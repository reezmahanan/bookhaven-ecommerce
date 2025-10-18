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
            // Featured Psychology & Finance Books (Most Attractive for Front Page)
            {
                id: 1,
                title: "The Psychology of Money",
                author: "Morgan Housel",
                price: 1299,
                originalPrice: 1599,
                usdPrice: 4.06,
                usdOriginalPrice: 5.00,
                genre: "Non-Fiction",
                publisher: "Harriman House",
                year: 2020,
                rating: 4.8,
                reviews: 3542,
                image: "https://images.gr-assets.com/books/1581527774l/41881472.jpg",
                description: "Timeless lessons about wealth, greed, and happiness. How your relationship with money shapes your financial life.",
                stock: 35,
                isbn: "978-0857197689",
                pages: 256,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 2,
                title: "Atomic Habits",
                author: "James Clear",
                price: 1399,
                originalPrice: 1799,
                usdPrice: 4.37,
                usdOriginalPrice: 5.62,
                genre: "Non-Fiction",
                publisher: "Avery",
                year: 2018,
                rating: 4.9,
                reviews: 4123,
                image: "https://images.gr-assets.com/books/1535115320l/40121378.jpg",
                description: "An easy & proven way to build good habits & break bad ones. Transform your life through tiny changes.",
                stock: 42,
                isbn: "978-0735211292",
                pages: 320,
                language: "English",
                format: "Hardcover",
                origin: "International"
            },
            {
                id: 3,
                title: "Rich Dad Poor Dad",
                author: "Robert T. Kiyosaki",
                price: 1199,
                originalPrice: 1499,
                usdPrice: 3.75,
                usdOriginalPrice: 4.69,
                genre: "Non-Fiction",
                publisher: "Plata Publishing",
                year: 1997,
                rating: 4.5,
                reviews: 3421,
                image: "https://images.gr-assets.com/books/1388211242l/69571.jpg",
                description: "What the rich teach their kids about money that the poor and middle class do not!",
                stock: 31,
                isbn: "978-1612680194",
                pages: 336,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 4,
                title: "The 7 Habits of Highly Effective People",
                author: "Stephen R. Covey",
                price: 1349,
                originalPrice: 1699,
                usdPrice: 4.22,
                usdOriginalPrice: 5.31,
                genre: "Non-Fiction",
                publisher: "Free Press",
                year: 1989,
                rating: 4.7,
                reviews: 2654,
                image: "https://images.gr-assets.com/books/1421842784l/36072.jpg",
                description: "Powerful lessons in personal change. A principle-centered approach for solving personal and professional problems.",
                stock: 26,
                isbn: "978-1982137274",
                pages: 381,
                language: "English",
                format: "Hardcover",
                origin: "International"
            },
            {
                id: 5,
                title: "Think and Grow Rich",
                author: "Napoleon Hill",
                price: 999,
                originalPrice: 1299,
                usdPrice: 3.12,
                usdOriginalPrice: 4.06,
                genre: "Non-Fiction",
                publisher: "The Ralston Society",
                year: 1937,
                rating: 4.6,
                reviews: 2876,
                image: "https://images.gr-assets.com/books/1463241782l/30186948.jpg",
                description: "The classic guide to wealth building and success principles that have transformed millions of lives.",
                stock: 28,
                isbn: "978-1585424331",
                pages: 233,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 6,
                title: "The Intelligent Investor",
                author: "Benjamin Graham",
                price: 1899,
                originalPrice: 2299,
                usdPrice: 5.94,
                usdOriginalPrice: 7.19,
                genre: "Non-Fiction",
                publisher: "Harper Business",
                year: 1949,
                rating: 4.6,
                reviews: 1987,
                image: "https://images.gr-assets.com/books/1391639125l/106835.jpg",
                description: "The definitive book on value investing. A book of practical counsel from Warren Buffett's mentor.",
                stock: 18,
                isbn: "978-0060555665",
                pages: 640,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            // Popular Science & Education (Featured)
            {
                id: 7,
                title: "Sapiens: A Brief History of Humankind",
                author: "Yuval Noah Harari",
                price: 2150,
                originalPrice: 2500,
                usdPrice: 6.72,
                usdOriginalPrice: 7.81,
                genre: "Science",
                publisher: "Harper",
                year: 2014,
                rating: 4.6,
                reviews: 5234,
                image: "https://images.gr-assets.com/books/1420585954l/23692271.jpg",
                description: "How Homo sapiens became Earth's dominant species. A fascinating journey through human history and evolution.",
                stock: 28,
                isbn: "978-0062316097",
                pages: 443,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 8,
                title: "Educated",
                author: "Tara Westover",
                price: 1980,
                originalPrice: 2350,
                usdPrice: 6.19,
                usdOriginalPrice: 7.34,
                genre: "Biography",
                publisher: "Random House",
                year: 2018,
                rating: 4.7,
                reviews: 4891,
                image: "https://images.gr-assets.com/books/1506026635l/35133922.jpg",
                description: "A powerful memoir about education, family, and the struggle to carve out an identity in the face of tradition.",
                stock: 32,
                isbn: "978-0399590504",
                pages: 334,
                language: "English",
                format: "Hardcover",
                origin: "International"
            },
            {
                id: 9,
                title: "A Brief History of Time",
                author: "Stephen Hawking",
                price: 1750,
                originalPrice: 2100,
                usdPrice: 5.47,
                usdOriginalPrice: 6.56,
                genre: "Science",
                publisher: "Bantam Books",
                year: 1988,
                rating: 4.3,
                reviews: 3456,
                image: "https://images.gr-assets.com/books/1333578746l/3869.jpg",
                description: "The universe explained in accessible terms - black holes, time travel, and the nature of reality.",
                stock: 22,
                isbn: "978-0553380163",
                pages: 256,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 10,
                title: "The Power of Now",
                author: "Eckhart Tolle",
                price: 1299,
                originalPrice: 1599,
                usdPrice: 4.06,
                usdOriginalPrice: 5.00,
                genre: "Spiritual & Philosophy",
                publisher: "New World Library",
                year: 1997,
                rating: 4.3,
                reviews: 2134,
                image: "https://images.gr-assets.com/books/1386925471l/6708.jpg",
                description: "A guide to spiritual enlightenment that shows how to live in the present moment and find inner peace.",
                stock: 24,
                isbn: "978-1577314806",
                pages: 236,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 11,
                title: "How to Win Friends and Influence People",
                author: "Dale Carnegie",
                price: 1199,
                originalPrice: 1499,
                usdPrice: 3.75,
                usdOriginalPrice: 4.69,
                genre: "Non-Fiction",
                publisher: "Simon & Schuster",
                year: 1936,
                rating: 4.4,
                reviews: 3156,
                image: "https://images.gr-assets.com/books/1442726934l/4865.jpg",
                description: "The timeless classic on interpersonal skills and building relationships that lead to success.",
                stock: 33,
                isbn: "978-0671027032",
                pages: 288,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 12,
                title: "Mindset: The New Psychology of Success",
                author: "Carol S. Dweck",
                price: 1399,
                originalPrice: 1699,
                usdPrice: 4.37,
                usdOriginalPrice: 5.31,
                genre: "Psychology",
                publisher: "Random House",
                year: 2006,
                rating: 4.5,
                reviews: 2743,
                image: "https://images.gr-assets.com/books/1436227012l/40745.jpg",
                description: "How a simple idea about the brain can help you love challenges, be more resilient, and achieve more.",
                stock: 29,
                isbn: "978-0345472328",
                pages: 276,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            // Classic Literature & Local Books
            {
                id: 13,
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
            },
            // Psychology & Finance Books
            {
                id: 11,
                title: "The Psychology of Money",
                author: "Morgan Housel",
                price: 1750,
                originalPrice: 2100,
                usdPrice: 5.47,
                usdOriginalPrice: 6.56,
                genre: "Non-Fiction",
                publisher: "Harriman House",
                year: 2020,
                rating: 4.8,
                reviews: 3542,
                image: "https://images.gr-assets.com/books/1581527774l/41881472.jpg",
                description: "Timeless lessons about wealth, greed, and happiness. How your relationship with money shapes your financial life.",
                stock: 35,
                isbn: "978-0857197689",
                pages: 256,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 12,
                title: "Atomic Habits",
                author: "James Clear",
                price: 1890,
                originalPrice: 2300,
                usdPrice: 5.91,
                usdOriginalPrice: 7.19,
                genre: "Non-Fiction",
                publisher: "Avery",
                year: 2018,
                rating: 4.9,
                reviews: 4123,
                image: "https://images.gr-assets.com/books/1535115320l/40121378.jpg",
                description: "An easy & proven way to build good habits & break bad ones. Transform your life through tiny changes.",
                stock: 42,
                isbn: "978-0735211292",
                pages: 320,
                language: "English",
                format: "Hardcover",
                origin: "International"
            },
            {
                id: 13,
                title: "Think and Grow Rich",
                author: "Napoleon Hill",
                price: 1320,
                originalPrice: 1650,
                usdPrice: 4.13,
                usdOriginalPrice: 5.16,
                genre: "Non-Fiction",
                publisher: "The Ralston Society",
                year: 1937,
                rating: 4.6,
                reviews: 2876,
                image: "https://images.gr-assets.com/books/1463241782l/30186948.jpg",
                description: "The classic guide to wealth building and success principles that have transformed millions of lives.",
                stock: 28,
                isbn: "978-1585424331",
                pages: 233,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 14,
                title: "Rich Dad Poor Dad",
                author: "Robert T. Kiyosaki",
                price: 1580,
                originalPrice: 1890,
                usdPrice: 4.94,
                usdOriginalPrice: 5.91,
                genre: "Non-Fiction",
                publisher: "Plata Publishing",
                year: 1997,
                rating: 4.5,
                reviews: 3421,
                image: "https://images.gr-assets.com/books/1388211242l/69571.jpg",
                description: "What the rich teach their kids about money that the poor and middle class do not!",
                stock: 31,
                isbn: "978-1612680194",
                pages: 336,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 15,
                title: "The 7 Habits of Highly Effective People",
                author: "Stephen R. Covey",
                price: 1720,
                originalPrice: 2050,
                usdPrice: 5.38,
                usdOriginalPrice: 6.41,
                genre: "Non-Fiction",
                publisher: "Free Press",
                year: 1989,
                rating: 4.7,
                reviews: 2654,
                image: "https://images.gr-assets.com/books/1421842784l/36072.jpg",
                description: "Powerful lessons in personal change. A principle-centered approach for solving personal and professional problems.",
                stock: 26,
                isbn: "978-1982137274",
                pages: 381,
                language: "English",
                format: "Hardcover",
                origin: "International"
            },
            {
                id: 16,
                title: "The Intelligent Investor",
                author: "Benjamin Graham",
                price: 2240,
                originalPrice: 2680,
                usdPrice: 7.00,
                usdOriginalPrice: 8.38,
                genre: "Non-Fiction",
                publisher: "Harper Business",
                year: 1949,
                rating: 4.6,
                reviews: 1987,
                image: "https://images.gr-assets.com/books/1391639125l/106835.jpg",
                description: "The definitive book on value investing. A book of practical counsel from Warren Buffett's mentor.",
                stock: 18,
                isbn: "978-0060555665",
                pages: 640,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 17,
                title: "How to Win Friends and Influence People",
                author: "Dale Carnegie",
                price: 1450,
                originalPrice: 1780,
                usdPrice: 4.53,
                usdOriginalPrice: 5.56,
                genre: "Non-Fiction",
                publisher: "Simon & Schuster",
                year: 1936,
                rating: 4.4,
                reviews: 3156,
                image: "https://images.gr-assets.com/books/1442726934l/4865.jpg",
                description: "The timeless classic on interpersonal skills and building relationships that lead to success.",
                stock: 33,
                isbn: "978-0671027032",
                pages: 288,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 18,
                title: "Mindset: The New Psychology of Success",
                author: "Carol S. Dweck",
                price: 1680,
                originalPrice: 2010,
                usdPrice: 5.25,
                usdOriginalPrice: 6.28,
                genre: "Psychology",
                publisher: "Random House",
                year: 2006,
                rating: 4.5,
                reviews: 2743,
                image: "https://images.gr-assets.com/books/1436227012l/40745.jpg",
                description: "How a simple idea about the brain can help you love challenges, be more resilient, and achieve more.",
                stock: 29,
                isbn: "978-0345472328",
                pages: 276,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 19,
                title: "The Power of Now",
                author: "Eckhart Tolle",
                price: 1520,
                originalPrice: 1850,
                usdPrice: 4.75,
                usdOriginalPrice: 5.78,
                genre: "Spiritual & Philosophy",
                publisher: "New World Library",
                year: 1997,
                rating: 4.3,
                reviews: 2134,
                image: "https://images.gr-assets.com/books/1386925471l/6708.jpg",
                description: "A guide to spiritual enlightenment that shows how to live in the present moment and find inner peace.",
                stock: 24,
                isbn: "978-1577314806",
                pages: 236,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 20,
                title: "The Subtle Art of Not Giving a F*ck",
                author: "Mark Manson",
                price: 1620,
                originalPrice: 1950,
                usdPrice: 5.06,
                usdOriginalPrice: 6.09,
                genre: "Non-Fiction",
                publisher: "HarperOne",
                year: 2016,
                rating: 4.2,
                reviews: 4567,
                image: "https://images.gr-assets.com/books/1465761302l/28257707.jpg",
                description: "A counterintuitive approach to living a good life by caring about fewer things, but caring about them more deeply.",
                stock: 38,
                isbn: "978-0062457714",
                pages: 224,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            // Scientific & Educational Books
            {
                id: 21,
                title: "Sapiens: A Brief History of Humankind",
                author: "Yuval Noah Harari",
                price: 2150,
                originalPrice: 2500,
                usdPrice: 6.72,
                usdOriginalPrice: 7.81,
                genre: "Science",
                publisher: "Harper",
                year: 2014,
                rating: 4.6,
                reviews: 5234,
                image: "https://images.gr-assets.com/books/1420585954l/23692271.jpg",
                description: "How Homo sapiens became Earth's dominant species. A fascinating journey through human history and evolution.",
                stock: 28,
                isbn: "978-0062316097",
                pages: 443,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 22,
                title: "Educated",
                author: "Tara Westover",
                price: 1980,
                originalPrice: 2350,
                usdPrice: 6.19,
                usdOriginalPrice: 7.34,
                genre: "Biography",
                publisher: "Random House",
                year: 2018,
                rating: 4.7,
                reviews: 4891,
                image: "https://images.gr-assets.com/books/1506026635l/35133922.jpg",
                description: "A powerful memoir about education, family, and the struggle to carve out an identity in the face of tradition.",
                stock: 32,
                isbn: "978-0399590504",
                pages: 334,
                language: "English",
                format: "Hardcover",
                origin: "International"
            },
            {
                id: 23,
                title: "A Brief History of Time",
                author: "Stephen Hawking",
                price: 1750,
                originalPrice: 2100,
                usdPrice: 5.47,
                usdOriginalPrice: 6.56,
                genre: "Science",
                publisher: "Bantam Books",
                year: 1988,
                rating: 4.3,
                reviews: 3456,
                image: "https://images.gr-assets.com/books/1333578746l/3869.jpg",
                description: "The universe explained in accessible terms - black holes, time travel, and the nature of reality.",
                stock: 22,
                isbn: "978-0553380163",
                pages: 256,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 24,
                title: "The Immortal Life of Henrietta Lacks",
                author: "Rebecca Skloot",
                price: 1890,
                originalPrice: 2200,
                usdPrice: 5.91,
                usdOriginalPrice: 6.88,
                genre: "Science",
                publisher: "Crown Publishing",
                year: 2010,
                rating: 4.4,
                reviews: 2987,
                image: "https://images.gr-assets.com/books/1327878144l/6493208.jpg",
                description: "The incredible true story behind medical breakthroughs and the ethics of scientific research.",
                stock: 26,
                isbn: "978-1400052189",
                pages: 381,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 25,
                title: "Cosmos",
                author: "Carl Sagan",
                price: 1650,
                originalPrice: 1950,
                usdPrice: 5.16,
                usdOriginalPrice: 6.09,
                genre: "Science",
                publisher: "Ballantine Books",
                year: 1980,
                rating: 4.8,
                reviews: 4123,
                image: "https://images.gr-assets.com/books/1310220057l/55030.jpg",
                description: "Journey through the universe with one of the greatest science communicators. Astronomy made accessible.",
                stock: 30,
                isbn: "978-0345331359",
                pages: 365,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 26,
                title: "The Gene: An Intimate History",
                author: "Siddhartha Mukherjee",
                price: 2250,
                originalPrice: 2650,
                usdPrice: 7.03,
                usdOriginalPrice: 8.28,
                genre: "Science",
                publisher: "Scribner",
                year: 2016,
                rating: 4.5,
                reviews: 2654,
                image: "https://images.gr-assets.com/books/1452452031l/27276428.jpg",
                description: "The story of genetics from Mendel to modern gene therapy. Science, history, and personal narrative combined.",
                stock: 18,
                isbn: "978-1476733524",
                pages: 592,
                language: "English",
                format: "Hardcover",
                origin: "International"
            },
            {
                id: 27,
                title: "Freakonomics",
                author: "Steven D. Levitt & Stephen J. Dubner",
                price: 1580,
                originalPrice: 1850,
                usdPrice: 4.94,
                usdOriginalPrice: 5.78,
                genre: "Economics",
                publisher: "William Morrow",
                year: 2005,
                rating: 4.2,
                reviews: 3891,
                image: "https://images.gr-assets.com/books/1550695900l/1202.jpg",
                description: "Economics made fun! Exploring the hidden side of everything with data and surprising insights.",
                stock: 35,
                isbn: "978-0060731328",
                pages: 315,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 28,
                title: "The Man Who Knew Infinity",
                author: "Robert Kanigel",
                price: 1920,
                originalPrice: 2280,
                usdPrice: 6.00,
                usdOriginalPrice: 7.13,
                genre: "Biography",
                publisher: "Washington Square Press",
                year: 1991,
                rating: 4.6,
                reviews: 1876,
                image: "https://images.gr-assets.com/books/1347709693l/714353.jpg",
                description: "The story of Srinivasa Ramanujan, the brilliant Indian mathematician who revolutionized mathematics.",
                stock: 24,
                isbn: "978-0671750619",
                pages: 438,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 29,
                title: "Silent Spring",
                author: "Rachel Carson",
                price: 1450,
                originalPrice: 1700,
                usdPrice: 4.53,
                usdOriginalPrice: 5.31,
                genre: "Environmental Science",
                publisher: "Houghton Mifflin",
                year: 1962,
                rating: 4.4,
                reviews: 2543,
                image: "https://images.gr-assets.com/books/1442348107l/27333.jpg",
                description: "The groundbreaking book that launched the environmental movement. Essential reading on ecology and conservation.",
                stock: 20,
                isbn: "978-0618249060",
                pages: 378,
                language: "English",
                format: "Paperback",
                origin: "International"
            },
            {
                id: 30,
                title: "The Code Breaker",
                author: "Walter Isaacson",
                price: 2380,
                originalPrice: 2800,
                usdPrice: 7.44,
                usdOriginalPrice: 8.75,
                genre: "Science",
                publisher: "Simon & Schuster",
                year: 2021,
                rating: 4.3,
                reviews: 2187,
                image: "https://images.gr-assets.com/books/1596439174l/54968118.jpg",
                description: "Jennifer Doudna and the revolutionary CRISPR gene-editing technology that will transform humanity.",
                stock: 16,
                isbn: "978-1982115852",
                pages: 560,
                language: "English",
                format: "Hardcover",
                origin: "International"
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
            itemsPerPage: 15,
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

    refreshLocation() {
        const refreshIcon = document.getElementById('locationRefreshIcon');
        if (refreshIcon) {
            refreshIcon.classList.add('spinning');
        }
        
        this.showNotification('Updating your location...', 'info');
        this.detectLocation();
        
        setTimeout(() => {
            if (refreshIcon) {
                refreshIcon.classList.remove('spinning');
            }
            this.showNotification('Location updated successfully!', 'success');
        }, 1500);
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
            return `${symbol} ${parseFloat(price).toFixed(2)}`;
        } else {
            // Format LKR with proper spacing and commas
            const formattedPrice = Math.round(price).toLocaleString();
            return `${symbol} ${formattedPrice}`;
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
        
        // Notifications functionality
        this.setupNotifications();
        
        // Discount functionality
        this.setupDiscountFeatures();
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

    setupNotifications() {
        // Setup notifications button and dropdown
        const notificationsBtn = document.getElementById('notificationsBtn');
        const notificationsDropdown = document.getElementById('notificationsDropdown');

        if (notificationsBtn && notificationsDropdown) {
            notificationsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationsDropdown.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!notificationsDropdown.contains(e.target) && !notificationsBtn.contains(e.target)) {
                    notificationsDropdown.classList.remove('show');
                }
            });
        }

        // Setup mark all as read functionality
        const markAllReadBtn = document.querySelector('.mark-all-read');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', () => {
                this.markAllNotificationsRead();
            });
        }

        // Setup individual notification actions
        this.setupNotificationActions();
    }

    setupNotificationActions() {
        // Track order buttons
        document.querySelectorAll('.track-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const orderId = btn.getAttribute('onclick')?.match(/trackOrder\('([^']+)'\)/)?.[1];
                if (orderId) {
                    this.trackOrder(orderId);
                }
            });
        });

        // Shop now buttons
        document.querySelectorAll('.shop-now-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const category = btn.getAttribute('onclick')?.match(/filterByCategory\('([^']+)'\)/)?.[1];
                if (category) {
                    this.filterByCategory(category);
                }
            });
        });

        // Buy now buttons
        document.querySelectorAll('.buy-now-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const bookId = btn.getAttribute('onclick')?.match(/addToCartFromWishlist\((\d+)\)/)?.[1];
                if (bookId) {
                    this.addToCartFromWishlist(parseInt(bookId));
                }
            });
        });
    }

    markAllNotificationsRead() {
        document.querySelectorAll('.notification-item.unread').forEach(item => {
            item.classList.remove('unread');
        });
        
        // Update notification count
        const notificationCount = document.getElementById('notificationCount');
        if (notificationCount) {
            notificationCount.textContent = '0';
            notificationCount.style.display = 'none';
        }
        
        this.showNotification('All notifications marked as read', 'success');
    }

    trackOrder(orderId) {
        this.showNotification(`Tracking order ${orderId}... Check your email for tracking details.`, 'info');
    }

    addToCartFromWishlist(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (book) {
            this.addToCart(book);
            // Remove from wishlist after adding to cart
            this.removeFromWishlist(bookId);
        }
    }

    setupDiscountFeatures() {
        // Setup countdown timer
        this.setupCountdownTimer();
        
        // Setup discount code copying
        this.setupDiscountCodes();
        
        // Setup loyalty program interactions
        this.setupLoyaltyProgram();
    }

    setupCountdownTimer() {
        const timer = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        // Set end date for Diwali sale (October 31, 2025)
        const endDate = new Date('2025-10-31T23:59:59').getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = endDate - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                if (timer.days) timer.days.textContent = days.toString().padStart(2, '0');
                if (timer.hours) timer.hours.textContent = hours.toString().padStart(2, '0');
                if (timer.minutes) timer.minutes.textContent = minutes.toString().padStart(2, '0');
                if (timer.seconds) timer.seconds.textContent = seconds.toString().padStart(2, '0');
            } else {
                // Sale ended
                if (timer.days) timer.days.textContent = '00';
                if (timer.hours) timer.hours.textContent = '00';
                if (timer.minutes) timer.minutes.textContent = '00';
                if (timer.seconds) timer.seconds.textContent = '00';
            }
        };

        // Update immediately and then every second
        updateTimer();
        setInterval(updateTimer, 1000);
    }

    setupDiscountCodes() {
        // Add event listeners for copy code buttons
        document.querySelectorAll('.copy-code-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const code = btn.getAttribute('onclick')?.match(/copyCode\('([^']+)'\)/)?.[1];
                if (code) {
                    this.copyCode(code);
                }
            });
        });
    }

    copyCode(code) {
        navigator.clipboard.writeText(code).then(() => {
            this.showNotification(`Discount code ${code} copied to clipboard!`, 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = code;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification(`Discount code ${code} copied to clipboard!`, 'success');
        });
    }

    setupLoyaltyProgram() {
        const joinBtn = document.querySelector('.join-rewards-btn');
        if (joinBtn) {
            joinBtn.addEventListener('click', () => {
                this.showNotification('Welcome to BookHaven Rewards! You are now earning points on every purchase.', 'success');
                // Here you would typically make an API call to enroll the user
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
        // Get form values
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value.trim();
        
        // Validation
        if (!name) {
            this.showNotification('Please enter your name', 'error');
            document.getElementById('contactName').focus();
            return;
        }
        
        if (!email) {
            this.showNotification('Please enter your email address', 'error');
            document.getElementById('contactEmail').focus();
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            document.getElementById('contactEmail').focus();
            return;
        }
        
        if (!subject) {
            this.showNotification('Please select a subject', 'error');
            document.getElementById('contactSubject').focus();
            return;
        }
        
        if (!message) {
            this.showNotification('Please enter your message', 'error');
            document.getElementById('contactMessage').focus();
            return;
        }
        
        if (message.length < 10) {
            this.showNotification('Please enter a message with at least 10 characters', 'error');
            document.getElementById('contactMessage').focus();
            return;
        }
        
        this.showLoading('Sending message...');
        
        // Simulate API call
        setTimeout(() => {
            this.hideLoading();
            
            // Create message object for potential backend integration
            const messageData = {
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: new Date().toISOString(),
                ip: 'user-ip', // Would be populated by backend
                userAgent: navigator.userAgent
            };
            
            // Log for development (remove in production)
            console.log('Contact form submission:', messageData);
            
            // Success notification
            this.showNotification(
                `Thank you, ${name}! Your message has been sent successfully. We'll get back to you within 24 hours at ${email}.`,
                'success'
            );
            
            // Reset form
            form.reset();
            
            // Optional: Store in localStorage for reference
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push(messageData);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            
        }, 1500);
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
        const booksHtml = this.filteredBooks.slice(0, 15).map(book => `
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
        // Setup genre filter
        const genreFilter = document.getElementById('genreFilter');
        if (genreFilter) {
            const genres = [...new Set(this.books.map(book => book.genre))];
            genreFilter.innerHTML = '<option value="">All Genres</option>' +
                genres.map(genre => `<option value="${genre}">${genre}</option>`).join('');
            
            genreFilter.addEventListener('change', () => this.applyFilters());
        }

        // Setup author filter
        const authorFilter = document.getElementById('authorFilter');
        if (authorFilter) {
            const authors = [...new Set(this.books.map(book => book.author))].sort();
            authorFilter.innerHTML = '<option value="all">All Authors</option>' +
                authors.map(author => `<option value="${author}">${author}</option>`).join('');
            
            authorFilter.addEventListener('change', () => this.applyFilters());
        }

        // Setup category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.applyFilters());
        }

        // Setup rating filter
        const ratingFilter = document.getElementById('ratingFilter');
        if (ratingFilter) {
            ratingFilter.addEventListener('change', () => this.applyFilters());
        }

        // Setup availability filter
        const availabilityFilter = document.getElementById('availabilityFilter');
        if (availabilityFilter) {
            availabilityFilter.addEventListener('change', () => this.applyFilters());
        }

        // Setup sort filter
        const sortFilter = document.getElementById('sortFilter');
        if (sortFilter) {
            sortFilter.addEventListener('change', () => this.applyFilters());
        }

        // Setup price range sliders
        this.setupPriceRange();
    }

    setupPriceRange() {
        const priceRangeMin = document.getElementById('priceRangeMin');
        const priceRangeMax = document.getElementById('priceRangeMax');
        const priceMinSpan = document.getElementById('priceMin');
        const priceMaxSpan = document.getElementById('priceMax');

        if (priceRangeMin && priceRangeMax && priceMinSpan && priceMaxSpan) {
            const updatePriceDisplay = () => {
                const minVal = parseInt(priceRangeMin.value);
                const maxVal = parseInt(priceRangeMax.value);
                
                // Ensure min doesn't exceed max
                if (minVal > maxVal) {
                    priceRangeMin.value = maxVal;
                }
                if (maxVal < minVal) {
                    priceRangeMax.value = minVal;
                }
                
                priceMinSpan.textContent = priceRangeMin.value;
                priceMaxSpan.textContent = priceRangeMax.value;
            };

            priceRangeMin.addEventListener('input', updatePriceDisplay);
            priceRangeMax.addEventListener('input', updatePriceDisplay);
            
            // Apply filters when price changes
            priceRangeMin.addEventListener('change', () => this.applyFilters());
            priceRangeMax.addEventListener('change', () => this.applyFilters());
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
        const categoryFilter = document.getElementById('categoryFilter');
        const authorFilter = document.getElementById('authorFilter');
        const ratingFilter = document.getElementById('ratingFilter');
        const availabilityFilter = document.getElementById('availabilityFilter');
        const sortFilter = document.getElementById('sortFilter');
        const priceRangeMin = document.getElementById('priceRangeMin');
        const priceRangeMax = document.getElementById('priceRangeMax');

        const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
        const selectedAuthor = authorFilter ? authorFilter.value : 'all';
        const selectedRating = ratingFilter ? ratingFilter.value : 'all';
        const selectedAvailability = availabilityFilter ? availabilityFilter.value : 'all';
        const selectedSort = sortFilter ? sortFilter.value : 'featured';
        const minPrice = priceRangeMin ? parseInt(priceRangeMin.value) : 0;
        const maxPrice = priceRangeMax ? parseInt(priceRangeMax.value) : 3000;

        // Apply filters
        this.filteredBooks = this.books.filter(book => {
            // Category filter
            if (selectedCategory !== 'all' && !book.genre.toLowerCase().includes(selectedCategory.toLowerCase())) {
                return false;
            }
            
            // Author filter
            if (selectedAuthor !== 'all' && book.author !== selectedAuthor) {
                return false;
            }
            
            // Rating filter
            if (selectedRating !== 'all' && book.rating < parseFloat(selectedRating)) {
                return false;
            }
            
            // Availability filter
            if (selectedAvailability === 'in-stock' && book.stock <= 0) {
                return false;
            }
            if (selectedAvailability === 'low-stock' && book.stock > 5) {
                return false;
            }
            
            // Price filter (convert USD to LKR if needed)
            const bookPrice = this.currentCurrency === 'USD' ? (book.usdPrice || book.price) * this.exchangeRates.LKR : book.price;
            if (bookPrice < minPrice || bookPrice > maxPrice) {
                return false;
            }
            
            return true;
        });

        // Apply sorting
        this.applySorting(selectedSort);
        
        this.displayBooks();
        
        // Update results count
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = `Showing ${this.filteredBooks.length} of ${this.books.length} books`;
        }
    }

    applySorting(sortType) {
        switch(sortType) {
            case 'title':
                this.filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                this.filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'price-low':
                this.filteredBooks.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredBooks.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                this.filteredBooks.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                this.filteredBooks.sort((a, b) => b.year - a.year);
                break;
            case 'popular':
                this.filteredBooks.sort((a, b) => b.reviews - a.reviews);
                break;
            default:
                // Featured order - keep original order
                break;
        }
    }

    filterByCategory(category) {
        // Set the category filter dropdown to the selected category
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            // Map categories to filter values
            const categoryMap = {
                'sri-lankan': 'Sri Lankan Literature',
                'indian': 'Indian Literature',
                'tamil': 'Tamil Books', 
                'sinhala': 'Sinhala Books',
                'romance': 'Romance',
                'mystery': 'Mystery',
                'fantasy': 'Fantasy',
                'fiction': 'Fiction',
                'non-fiction': 'Non-Fiction',
                'biography': 'Biography',
                'history': 'Asian History',
                'spiritual': 'Spiritual & Philosophy',
                'psychology': 'Psychology',
                'science': 'Science',
                'economics': 'Economics',
                'environmental': 'Environmental Science'
            };

            const genreToSelect = categoryMap[category] || category;
            
            // Find matching option and select it
            for (let option of categoryFilter.options) {
                if (option.value === category || option.text.includes(genreToSelect)) {
                    option.selected = true;
                    break;
                }
            }
        }

        // Filter books by category/genre
        this.filteredBooks = this.books.filter(book => {
            const bookGenre = book.genre.toLowerCase();
            const bookTitle = book.title.toLowerCase();
            const bookAuthor = book.author.toLowerCase();

            switch(category.toLowerCase()) {
                case 'sri-lankan':
                    return bookGenre.includes('sri lankan') || book.origin === 'Sri Lanka';
                case 'indian': 
                    return bookGenre.includes('indian') || book.origin === 'India';
                case 'tamil':
                    return bookGenre.includes('tamil') || book.language === 'Tamil';
                case 'sinhala':
                    return bookGenre.includes('sinhala') || book.language === 'Sinhala';
                case 'psychology':
                case 'non-fiction':
                    return bookGenre.includes('non-fiction') || 
                           bookGenre.includes('psychology') ||
                           bookTitle.includes('psychology') ||
                           bookTitle.includes('habits') ||
                           bookTitle.includes('money') ||
                           bookTitle.includes('rich') ||
                           bookTitle.includes('success') ||
                           bookTitle.includes('mindset');
                case 'romance':
                    return bookGenre.includes('romance');
                case 'mystery':
                    return bookGenre.includes('mystery');
                case 'fantasy':
                    return bookGenre.includes('fantasy');
                case 'fiction':
                    return bookGenre.includes('fiction') && !bookGenre.includes('non-fiction');
                case 'biography':
                    return bookGenre.includes('biography');
                case 'history':
                    return bookGenre.includes('history');
                case 'spiritual':
                    return bookGenre.includes('spiritual') || bookGenre.includes('philosophy');
                case 'science':
                    return bookGenre.includes('science') || bookGenre.includes('environmental');
                case 'economics':
                    return bookGenre.includes('economics');
                case 'environmental':
                    return bookGenre.includes('environmental');
                case 'biography':
                    return bookGenre.includes('biography');
                default:
                    return true;
            }
        });

        // Update display
        this.displayBooks();
        
        // Update breadcrumb
        this.updateBreadcrumb(category);
        
        // Show notification
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
        this.showNotification(`Showing ${categoryName} books (${this.filteredBooks.length} found)`, 'success');
    }

    clearAllFilters() {
        // Reset all filter dropdowns
        const categoryFilter = document.getElementById('categoryFilter');
        const authorFilter = document.getElementById('authorFilter');
        const ratingFilter = document.getElementById('ratingFilter');
        const availabilityFilter = document.getElementById('availabilityFilter');
        const sortFilter = document.getElementById('sortFilter');
        const priceRangeMin = document.getElementById('priceRangeMin');
        const priceRangeMax = document.getElementById('priceRangeMax');

        if (categoryFilter) categoryFilter.value = 'all';
        if (authorFilter) authorFilter.value = 'all';
        if (ratingFilter) ratingFilter.value = 'all';
        if (availabilityFilter) availabilityFilter.value = 'all';
        if (sortFilter) sortFilter.value = 'featured';
        if (priceRangeMin) priceRangeMin.value = '0';
        if (priceRangeMax) priceRangeMax.value = '3000';

        // Update price display
        const priceMinSpan = document.getElementById('priceMin');
        const priceMaxSpan = document.getElementById('priceMax');
        if (priceMinSpan) priceMinSpan.textContent = '0';
        if (priceMaxSpan) priceMaxSpan.textContent = '3000';

        // Reset filtered books to show all books
        this.filteredBooks = [...this.books];
        
        // Update display
        this.displayBooks();
        
        // Reset breadcrumb
        this.updateBreadcrumb();
        
        // Show notification
        this.showNotification('All filters cleared - showing all books', 'success');
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

// Global functions for HTML onclick handlers
function filterByCategory(category) {
    if (bookHaven) {
        bookHaven.filterByCategory(category);
        // Scroll to books section
        document.getElementById('books')?.scrollIntoView({ behavior: 'smooth' });
        // Close notifications dropdown if open
        document.getElementById('notificationsDropdown')?.classList.remove('show');
    }
}

function copyCode(code) {
    if (bookHaven) {
        bookHaven.copyCode(code);
    }
}

function trackOrder(orderId) {
    if (bookHaven) {
        bookHaven.trackOrder(orderId);
    }
}

function addToCartFromWishlist(bookId) {
    if (bookHaven) {
        bookHaven.addToCartFromWishlist(bookId);
    }
}

function openReviewModal(bookId) {
    if (bookHaven) {
        bookHaven.openReviewModal(bookId);
    }
}

function scrollToBranches() {
    document.getElementById('branches')?.scrollIntoView({ behavior: 'smooth' });
}

function openNotifications() {
    if (bookHaven) {
        bookHaven.openNotifications();
    }
}

function closeNotifications() {
    if (bookHaven) {
        bookHaven.closeNotifications();
    }
}

function markAllRead() {
    if (bookHaven) {
        bookHaven.markAllNotificationsRead();
    }
}

function clearAllNotifications() {
    if (bookHaven) {
        bookHaven.clearAllNotifications();
    }
}

function loadMoreNotifications() {
    if (bookHaven) {
        bookHaven.loadMoreNotifications();
    }
}

function reorder(orderId) {
    if (bookHaven) {
        bookHaven.showNotification(`Reordering items from ${orderId}...`, 'info');
    }
}

function openProfile() {
    if (bookHaven) {
        bookHaven.openProfile();
    }
}

function openOrderHistory() {
    if (bookHaven) {
        bookHaven.openOrderHistory();
    }
}

function openSettings() {
    if (bookHaven) {
        bookHaven.openSettings();
    }
}

function logout() {
    if (bookHaven) {
        bookHaven.logout();
    }
}

function toggleCart() {
    if (bookHaven) {
        bookHaven.toggleSidebar('cart');
    }
}

function toggleWishlist() {
    if (bookHaven) {
        bookHaven.toggleSidebar('wishlist');
    }
}

function toggleCompare() {
    if (bookHaven) {
        bookHaven.toggleSidebar('compare');
    }
}

function closeBookModal() {
    if (bookHaven) {
        bookHaven.closeModal('bookModal');
    }
}

function openCheckout() {
    if (bookHaven) {
        bookHaven.openCheckout();
    }
}

function closeCheckout() {
    if (bookHaven) {
        bookHaven.closeModal('checkoutModal');
    }
}

function clearWishlist() {
    if (bookHaven) {
        bookHaven.clearWishlist();
    }
}

function clearCompare() {
    if (bookHaven) {
        bookHaven.clearCompare();
    }
}

function openCompareModal() {
    if (bookHaven) {
        bookHaven.openCompareModal();
    }
}

function closeCompareModal() {
    if (bookHaven) {
        bookHaven.closeModal('compareModal');
    }
}

function closeProfile() {
    if (bookHaven) {
        bookHaven.closeModal('profileModal');
    }
}

function closeOrderHistory() {
    if (bookHaven) {
        bookHaven.closeModal('orderHistoryModal');
    }
}

function closeReviewModal() {
    if (bookHaven) {
        bookHaven.closeModal('reviewModal');
    }
}

function closeSettings() {
    if (bookHaven) {
        bookHaven.closeModal('settingsModal');
    }
}

// Location tracking function
function refreshLocation() {
    if (bookHaven) {
        bookHaven.refreshLocation();
    }
}

function saveSettings() {
    if (bookHaven) {
        bookHaven.saveSettings();
    }
}

function showSettingsTab(tabName) {
    if (bookHaven) {
        bookHaven.showSettingsTab(tabName);
    }
}

function clearAllFilters() {
    if (bookHaven) {
        bookHaven.clearAllFilters();
    }
}