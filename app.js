// ============================================
// State Management
// ============================================

let products = [];
let filteredProducts = [];
let cart = [];
let currentFilters = {
    categories: [],
    brands: [],
    minPrice: null,
    maxPrice: null,
    search: ''
};
let currentSort = 'popularity';
let currentAdminView = 'dashboard';
let editingProductId = null;
let displayedProductsCount = 12;

// ============================================
// Initial Product Data
// ============================================

function initializeProducts() {
    const initialProducts = [
        {
            id: 'p1',
            name: 'Galaxy X Pro Smartphone',
            category: 'Smartphones',
            brand: 'GalaxyTech',
            price: 799,
            rating: 4.5,
            reviews: 124,
            shortDescription: '6.5" AMOLED, 128 GB, 5G',
            description: 'Experience the future with the Galaxy X Pro. Featuring a stunning 6.5-inch AMOLED display, powerful 5G connectivity, and 128GB of storage for all your photos, videos, and apps.',
            specs: {
                display: '6.5" AMOLED',
                storage: '128 GB',
                ram: '8 GB',
                battery: '4500 mAh',
                connectivity: '5G, Wi-Fi 6'
            },
            stock: 35,
            image: 'https://via.placeholder.com/300x200/4da6ff/ffffff?text=Galaxy+X+Pro'
        },
        {
            id: 'p2',
            name: 'PixelAir S Smartphone',
            category: 'Smartphones',
            brand: 'PixelAir',
            price: 699,
            rating: 4.7,
            reviews: 89,
            shortDescription: '6.1" OLED, 256 GB, Amazing Camera',
            description: 'Capture life in stunning detail with PixelAir S. Advanced AI-powered camera, all-day battery life, and sleek design make this the perfect smartphone for creators.',
            specs: {
                display: '6.1" OLED',
                storage: '256 GB',
                ram: '12 GB',
                battery: '4200 mAh',
                camera: '50MP Triple Camera'
            },
            stock: 28,
            image: 'https://via.placeholder.com/300x200/51cf66/ffffff?text=PixelAir+S'
        },
        {
            id: 'p3',
            name: 'iPhone Nova',
            category: 'Smartphones',
            brand: 'ApexTech',
            price: 999,
            rating: 4.8,
            reviews: 203,
            shortDescription: '6.7" Super Retina, 512 GB, Pro Camera',
            description: 'The ultimate iPhone experience. Nova features a massive 6.7" Super Retina XDR display, pro-grade camera system, and the fastest chip ever in a smartphone.',
            specs: {
                display: '6.7" Super Retina XDR',
                storage: '512 GB',
                ram: '8 GB',
                battery: '4800 mAh',
                chip: 'A17 Pro'
            },
            stock: 15,
            image: 'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=iPhone+Nova'
        },
        {
            id: 'p4',
            name: 'UltraBook 15 Laptop',
            category: 'Laptops',
            brand: 'UltraBook',
            price: 1299,
            rating: 4.6,
            reviews: 156,
            shortDescription: '15.6" 4K, Intel i7, 16GB RAM',
            description: 'Power meets portability with the UltraBook 15. Stunning 4K display, lightning-fast Intel i7 processor, and all-day battery life make this the perfect work companion.',
            specs: {
                display: '15.6" 4K IPS',
                processor: 'Intel Core i7-13700H',
                ram: '16 GB DDR5',
                storage: '512 GB NVMe SSD',
                graphics: 'Intel Iris Xe'
            },
            stock: 22,
            image: 'https://via.placeholder.com/300x200/ffd43b/000000?text=UltraBook+15'
        },
        {
            id: 'p5',
            name: 'CreatorBook Studio',
            category: 'Laptops',
            brand: 'UltraBook',
            price: 1899,
            rating: 4.9,
            reviews: 87,
            shortDescription: '16" OLED, AMD Ryzen 9, RTX 4060',
            description: 'Built for creators. CreatorBook Studio features a gorgeous 16" OLED display, powerful AMD Ryzen 9 processor, and NVIDIA RTX 4060 graphics for professional-grade content creation.',
            specs: {
                display: '16" 4K OLED',
                processor: 'AMD Ryzen 9 7940HS',
                ram: '32 GB DDR5',
                storage: '1 TB NVMe SSD',
                graphics: 'NVIDIA RTX 4060 8GB'
            },
            stock: 8,
            image: 'https://via.placeholder.com/300x200/9b59b6/ffffff?text=CreatorBook'
        },
        {
            id: 'p6',
            name: 'GameMax 17 Pro',
            category: 'Laptops',
            brand: 'GameMax',
            price: 2299,
            rating: 4.7,
            reviews: 142,
            shortDescription: '17.3" 240Hz, i9, RTX 4080',
            description: 'Dominate the competition with GameMax 17 Pro. Featuring a blazing-fast 240Hz display, Intel Core i9 processor, and NVIDIA RTX 4080 for unparalleled gaming performance.',
            specs: {
                display: '17.3" QHD 240Hz',
                processor: 'Intel Core i9-13900HX',
                ram: '32 GB DDR5',
                storage: '2 TB NVMe SSD',
                graphics: 'NVIDIA RTX 4080 12GB'
            },
            stock: 12,
            image: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=GameMax+17'
        },
        {
            id: 'p7',
            name: 'NoiseBeats 700 Headphones',
            category: 'Audio',
            brand: 'NoiseBeats',
            price: 349,
            rating: 4.6,
            reviews: 312,
            shortDescription: 'Active Noise Cancelling, 30h Battery',
            description: 'Immerse yourself in pure sound with NoiseBeats 700. Industry-leading active noise cancellation, premium comfort, and 30-hour battery life make these the ultimate headphones.',
            specs: {
                type: 'Over-Ear Wireless',
                'noise cancelling': 'Active ANC',
                battery: '30 hours',
                connectivity: 'Bluetooth 5.2',
                'audio codec': 'aptX HD, AAC'
            },
            stock: 45,
            image: 'https://via.placeholder.com/300x200/34495e/ffffff?text=NoiseBeats+700'
        },
        {
            id: 'p8',
            name: 'AirTune Pods Pro',
            category: 'Audio',
            brand: 'AirTune',
            price: 249,
            rating: 4.5,
            reviews: 428,
            shortDescription: 'True Wireless, ANC, Spatial Audio',
            description: 'Premium true wireless earbuds with active noise cancellation and immersive spatial audio. Perfect fit, incredible sound, and seamless connectivity.',
            specs: {
                type: 'True Wireless Earbuds',
                'noise cancelling': 'Active ANC',
                battery: '6h + 24h case',
                'water resistance': 'IPX4',
                features: 'Spatial Audio, Transparency Mode'
            },
            stock: 67,
            image: 'https://via.placeholder.com/300x200/3498db/ffffff?text=AirTune+Pods'
        },
        {
            id: 'p9',
            name: 'SoundWave Studio Pro',
            category: 'Audio',
            brand: 'SoundWave',
            price: 179,
            rating: 4.4,
            reviews: 156,
            shortDescription: 'Studio Monitor Headphones, Wired',
            description: 'Professional studio-quality headphones for audio engineers and music producers. Flat frequency response and exceptional clarity for critical listening.',
            specs: {
                type: 'Wired Studio Monitors',
                'frequency response': '5Hz - 40kHz',
                impedance: '32 Ohm',
                cable: '3.5mm + 6.3mm adapter',
                features: 'Detachable cable, Carrying case'
            },
            stock: 31,
            image: 'https://via.placeholder.com/300x200/95a5a6/ffffff?text=SoundWave'
        },
        {
            id: 'p10',
            name: 'FitTime Blaze Smartwatch',
            category: 'Wearables',
            brand: 'FitTime',
            price: 299,
            rating: 4.3,
            reviews: 267,
            shortDescription: 'AMOLED Display, GPS, Health Tracking',
            description: 'Track your fitness journey with FitTime Blaze. Stunning AMOLED display, built-in GPS, comprehensive health monitoring, and 7-day battery life.',
            specs: {
                display: '1.4" AMOLED',
                battery: '7 days',
                sensors: 'Heart Rate, SpO2, GPS',
                'water resistance': '5 ATM',
                features: 'Sleep Tracking, 100+ Sport Modes'
            },
            stock: 52,
            image: 'https://via.placeholder.com/300x200/e67e22/ffffff?text=FitTime+Blaze'
        },
        {
            id: 'p11',
            name: 'ChronoPulse S2 Watch',
            category: 'Wearables',
            brand: 'ChronoPulse',
            price: 399,
            rating: 4.7,
            reviews: 189,
            shortDescription: 'Premium Build, ECG, Always-On Display',
            description: 'Premium smartwatch with medical-grade ECG sensor, always-on Retina display, and seamless integration with your digital life. Stainless steel case with sapphire crystal.',
            specs: {
                display: '1.9" Always-On Retina',
                battery: '18 hours',
                sensors: 'ECG, Heart Rate, Blood Oxygen, GPS',
                build: 'Stainless Steel, Sapphire Crystal',
                'water resistance': '50m'
            },
            stock: 18,
            image: 'https://via.placeholder.com/300x200/2c3e50/ffffff?text=ChronoPulse'
        },
        {
            id: 'p12',
            name: 'PowerCharge 65W GaN Adapter',
            category: 'Accessories',
            brand: 'PowerCharge',
            price: 49,
            rating: 4.8,
            reviews: 523,
            shortDescription: 'Compact, 3-Port USB-C Charger',
            description: 'Ultra-compact 65W GaN charger with 3 ports. Charge your laptop, phone, and tablet simultaneously with intelligent power distribution.',
            specs: {
                power: '65W Total',
                ports: '2x USB-C, 1x USB-A',
                technology: 'GaN (Gallium Nitride)',
                size: '2.2" x 2.2" x 1.1"',
                features: 'Foldable Plug, Smart Power Distribution'
            },
            stock: 156,
            image: 'https://via.placeholder.com/300x200/16a085/ffffff?text=PowerCharge'
        },
        {
            id: 'p13',
            name: 'HyperKey Mechanical Keyboard',
            category: 'Accessories',
            brand: 'HyperKey',
            price: 159,
            rating: 4.6,
            reviews: 342,
            shortDescription: 'RGB, Hot-Swap, Wireless',
            description: 'Premium mechanical keyboard with hot-swappable switches, per-key RGB lighting, and wireless connectivity. Perfect for gaming and productivity.',
            specs: {
                switches: 'Hot-Swappable Mechanical',
                connectivity: 'Wireless 2.4GHz + Bluetooth + USB-C',
                lighting: 'Per-Key RGB',
                battery: '3000mAh (80 hours)',
                features: 'Programmable Keys, Aluminum Frame'
            },
            stock: 73,
            image: 'https://via.placeholder.com/300x200/8e44ad/ffffff?text=HyperKey'
        },
        {
            id: 'p14',
            name: 'UltraMouse Pro Wireless',
            category: 'Accessories',
            brand: 'UltraMouse',
            price: 89,
            rating: 4.5,
            reviews: 412,
            shortDescription: 'Ergonomic, 25K DPI, RGB',
            description: 'Professional wireless gaming mouse with 25,000 DPI sensor, ergonomic design, and customizable RGB lighting. Perfect for competitive gaming.',
            specs: {
                sensor: '25,000 DPI Optical',
                connectivity: 'Wireless 2.4GHz + Bluetooth',
                battery: '70 hours',
                buttons: '8 Programmable',
                features: 'Ergonomic Design, RGB Lighting'
            },
            stock: 94,
            image: 'https://via.placeholder.com/300x200/27ae60/ffffff?text=UltraMouse'
        }
    ];

    // Load products from localStorage or use initial data
    const savedProducts = localStorage.getItem('electrohub_products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    } else {
        products = initialProducts;
        saveProducts();
    }

    filteredProducts = [...products];
}

function saveProducts() {
    localStorage.setItem('electrohub_products', JSON.stringify(products));
}

// ============================================
// Theme Management
// ============================================

function initializeTheme() {
    const savedTheme = localStorage.getItem('electrohub_theme') || 'light-theme';
    document.body.className = savedTheme;
    document.getElementById('themeSwitcher').value = savedTheme;
}

function switchTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('electrohub_theme', theme);
}

// ============================================
// Navigation
// ============================================

function showSection(sectionName) {
    // Hide all main sections
    const sections = ['homeSection', 'productsSection', 'aboutSection', 'contactSection', 'adminSection'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) section.style.display = 'none';
    });

    // Show selected section
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionName) {
            link.classList.add('active');
        }
    });

    // If showing products, render them
    if (sectionName === 'products') {
        applyFilters();
    }

    // If showing admin, render admin view
    if (sectionName === 'admin') {
        showAdminView('dashboard');
    }
}

// ============================================
// Product Rendering
// ============================================

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    const loadMoreContainer = document.getElementById('loadMoreContainer');

    if (filteredProducts.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
        loadMoreContainer.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';

    const productsToShow = filteredProducts.slice(0, displayedProductsCount);
    
    grid.innerHTML = productsToShow.map(product => {
        const stars = generateStars(product.rating);
        const stockStatus = product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock';
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.shortDescription}</p>
                    <div class="product-rating">
                        <span class="stars">${stars}</span>
                        <span class="reviews">(${product.reviews})</span>
                    </div>
                    <div class="product-price">$${product.price}</div>
                    <div class="product-actions">
                        <button class="btn btn-secondary btn-small view-details-btn" data-product-id="${product.id}">
                            View Details
                        </button>
                        <button class="btn btn-primary btn-small add-to-cart-btn" 
                                data-product-id="${product.id}"
                                ${product.stock === 0 ? 'disabled' : ''}>
                            ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Show/hide load more button
    if (filteredProducts.length > displayedProductsCount) {
        loadMoreContainer.style.display = 'block';
    } else {
        loadMoreContainer.style.display = 'none';
    }

    // Add event listeners
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', () => openProductModal(btn.dataset.productId));
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => addToCart(btn.dataset.productId));
    });
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (hasHalfStar) {
        stars += '⭐';
    }
    
    return stars;
}

// ============================================
// Filtering and Sorting
// ============================================

function applyFilters() {
    displayedProductsCount = 12; // Reset pagination
    
    // Start with all products
    filteredProducts = [...products];

    // Apply category filter
    if (currentFilters.categories.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
            currentFilters.categories.includes(p.category)
        );
    }

    // Apply brand filter
    if (currentFilters.brands.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
            currentFilters.brands.includes(p.brand)
        );
    }

    // Apply price filter
    if (currentFilters.minPrice !== null) {
        filteredProducts = filteredProducts.filter(p => 
            p.price >= currentFilters.minPrice
        );
    }
    if (currentFilters.maxPrice !== null) {
        filteredProducts = filteredProducts.filter(p => 
            p.price <= currentFilters.maxPrice
        );
    }

    // Apply search filter
    if (currentFilters.search) {
        const searchLower = currentFilters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.brand.toLowerCase().includes(searchLower) ||
            p.category.toLowerCase().includes(searchLower)
        );
    }

    // Apply sorting
    sortProducts();

    // Update active filters display
    updateActiveFiltersDisplay();

    // Render products
    renderProducts();
}

function sortProducts() {
    switch (currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'popularity':
        default:
            filteredProducts.sort((a, b) => b.reviews - a.reviews);
            break;
    }
}

function updateActiveFiltersDisplay() {
    const container = document.getElementById('activeFilters');
    const filters = [];

    currentFilters.categories.forEach(cat => {
        filters.push({ type: 'category', value: cat, label: cat });
    });

    currentFilters.brands.forEach(brand => {
        filters.push({ type: 'brand', value: brand, label: brand });
    });

    if (currentFilters.minPrice !== null || currentFilters.maxPrice !== null) {
        const min = currentFilters.minPrice || 0;
        const max = currentFilters.maxPrice || '∞';
        filters.push({ type: 'price', value: 'price', label: `$${min} - $${max}` });
    }

    container.innerHTML = filters.map(filter => `
        <div class="filter-tag">
            <span>${filter.label}</span>
            <button onclick="removeFilter('${filter.type}', '${filter.value}')" aria-label="Remove filter">&times;</button>
        </div>
    `).join('');
}

function removeFilter(type, value) {
    if (type === 'category') {
        currentFilters.categories = currentFilters.categories.filter(c => c !== value);
        document.querySelectorAll('.category-filter').forEach(cb => {
            if (cb.value === value) cb.checked = false;
        });
    } else if (type === 'brand') {
        currentFilters.brands = currentFilters.brands.filter(b => b !== value);
        document.querySelectorAll('.brand-filter').forEach(cb => {
            if (cb.value === value) cb.checked = false;
        });
    } else if (type === 'price') {
        currentFilters.minPrice = null;
        currentFilters.maxPrice = null;
        document.getElementById('minPrice').value = '';
        document.getElementById('maxPrice').value = '';
    }
    
    applyFilters();
}

function clearAllFilters() {
    currentFilters = {
        categories: [],
        brands: [],
        minPrice: null,
        maxPrice: null,
        search: ''
    };
    
    document.querySelectorAll('.category-filter, .brand-filter').forEach(cb => {
        cb.checked = false;
    });
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('searchInput').value = '';
    
    applyFilters();
}

// ============================================
// Product Modal
// ============================================

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    const stars = generateStars(product.rating);
    const stockStatus = product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock';
    const stockClass = product.stock > 10 ? 'stock-in' : product.stock > 0 ? 'stock-low' : 'stock-out';

    modalBody.innerHTML = `
        <div class="modal-product">
            <div>
                <img src="${product.image}" alt="${product.name}" class="modal-product-image">
            </div>
            <div class="modal-product-details">
                <h2>${product.name}</h2>
                <div class="modal-product-rating">
                    <span class="stars">${stars}</span>
                    <span>${product.rating}</span>
                    <span class="reviews">(${product.reviews} reviews)</span>
                </div>
                <div class="modal-product-price">$${product.price}</div>
                <p class="modal-product-description">${product.description}</p>
                
                <div class="modal-product-specs">
                    <h3>Technical Specifications</h3>
                    ${Object.entries(product.specs).map(([key, value]) => `
                        <div class="spec-item">
                            <span class="spec-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <span class="spec-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="modal-product-stock ${stockClass}">
                    ${stockStatus}
                </div>
                
                ${product.stock > 0 ? `
                    <div class="quantity-selector">
                        <label>Quantity:</label>
                        <div class="quantity-controls">
                            <button onclick="updateModalQuantity(-1)">-</button>
                            <input type="number" id="modalQuantity" value="1" min="1" max="${product.stock}" readonly>
                            <button onclick="updateModalQuantity(1)">+</button>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-block" onclick="addToCartFromModal('${product.id}')">
                        Add to Cart
                    </button>
                ` : ''}
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateModalQuantity(change) {
    const input = document.getElementById('modalQuantity');
    const currentValue = parseInt(input.value);
    const max = parseInt(input.max);
    const newValue = Math.max(1, Math.min(max, currentValue + change));
    input.value = newValue;
}

function addToCartFromModal(productId) {
    const quantity = parseInt(document.getElementById('modalQuantity').value);
    addToCart(productId, quantity);
    closeProductModal();
}

// ============================================
// Cart Management
// ============================================

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity <= product.stock) {
            existingItem.quantity = newQuantity;
        } else {
            showToast(`Only ${product.stock} items available`, 'error');
            return;
        }
    } else {
        if (quantity <= product.stock) {
            cart.push({ productId, quantity });
        } else {
            showToast(`Only ${product.stock} items available`, 'error');
            return;
        }
    }

    updateCartDisplay();
    showToast(`${product.name} added to cart`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    updateCartDisplay();
    renderCartDrawer();
}

function updateCartItemQuantity(productId, change) {
    const item = cart.find(item => item.productId === productId);
    const product = products.find(p => p.id === productId);
    
    if (!item || !product) return;

    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    if (newQuantity > product.stock) {
        showToast(`Only ${product.stock} items available`, 'error');
        return;
    }

    item.quantity = newQuantity;
    updateCartDisplay();
    renderCartDrawer();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = `$${totalPrice.toFixed(0)}`;
}

function openCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    drawer.classList.add('active');
    renderCartDrawer();
    document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    drawer.classList.remove('active');
    document.body.style.overflow = '';
}

function renderCartDrawer() {
    const body = document.getElementById('cartDrawerBody');
    
    if (cart.length === 0) {
        body.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started</p>
                <button class="btn btn-primary" onclick="closeCartDrawer(); showSection('products')">
                    Browse Products
                </button>
            </div>
        `;
        updateCartSummary();
        return;
    }

    body.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';

        return `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${product.name}</h4>
                    <div class="cart-item-price">$${product.price}</div>
                    <div class="cart-item-quantity">
                        <button onclick="updateCartItemQuantity('${item.productId}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartItemQuantity('${item.productId}', 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-remove">
                    <div class="cart-item-subtotal">$${(product.price * item.quantity).toFixed(2)}</div>
                    <button class="remove-item-btn" onclick="removeFromCart('${item.productId}')">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cartGrandTotal').textContent = `$${total.toFixed(2)}`;
}

function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }

    showToast('Checkout functionality coming soon!', 'success');
    // In a real app, this would redirect to checkout page
}

// ============================================
// Admin Section
// ============================================

function showAdminView(viewName) {
    currentAdminView = viewName;
    
    // Hide all admin views
    document.querySelectorAll('.admin-view').forEach(view => {
        view.style.display = 'none';
    });

    // Show selected view
    const targetView = document.getElementById('admin' + viewName.charAt(0).toUpperCase() + viewName.slice(1));
    if (targetView) {
        targetView.style.display = 'block';
    }

    // Update active nav link
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.adminView === viewName) {
            link.classList.add('active');
        }
    });

    // Render view content
    if (viewName === 'dashboard') {
        renderAdminDashboard();
    } else if (viewName === 'products') {
        renderAdminProducts();
    }
}

function renderAdminDashboard() {
    document.getElementById('totalProductsStat').textContent = products.length;
    const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 10).length;
    document.getElementById('lowStockStat').textContent = lowStockCount;
}

function renderAdminProducts() {
    const list = document.getElementById('adminProductsList');
    
    list.innerHTML = products.map(product => {
        const stockStatus = product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock';
        const stockClass = product.stock > 10 ? 'stock-in' : product.stock > 0 ? 'stock-low' : 'stock-out';
        
        return `
            <div class="admin-product-item">
                <img src="${product.image}" alt="${product.name}" class="admin-product-thumb">
                <div class="admin-product-info">
                    <h4>${product.name}</h4>
                    <div class="admin-product-meta">
                        <span>${product.category}</span>
                        <span>•</span>
                        <span>$${product.price}</span>
                        <span>•</span>
                        <span class="stock-status ${stockClass}">${stockStatus} (${product.stock})</span>
                    </div>
                </div>
                <div class="admin-product-actions">
                    <button class="btn btn-secondary btn-small" onclick="editProduct('${product.id}')">
                        Edit
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteProduct('${product.id}')">
                        Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function showProductForm(productId = null) {
    editingProductId = productId;
    
    const formTitle = document.getElementById('productFormTitle');
    const form = document.getElementById('productForm');
    
    if (productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        formTitle.textContent = 'Edit Product';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productBrand').value = product.brand;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productRating').value = product.rating;
        document.getElementById('productShortDesc').value = product.shortDescription || '';
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productImage').value = product.image;
        
        // Populate specs
        const specsContainer = document.getElementById('specsInputs');
        specsContainer.innerHTML = Object.entries(product.specs).map(([key, value]) => `
            <div class="spec-row">
                <input type="text" class="spec-key" value="${key}">
                <input type="text" class="spec-value" value="${value}">
                <button type="button" class="btn btn-danger btn-small remove-spec-btn" onclick="this.parentElement.remove()">×</button>
            </div>
        `).join('');
    } else {
        formTitle.textContent = 'Add New Product';
        form.reset();
        document.getElementById('specsInputs').innerHTML = `
            <div class="spec-row">
                <input type="text" placeholder="Spec name (e.g., Display)" class="spec-key">
                <input type="text" placeholder="Spec value (e.g., 6.5 inch AMOLED)" class="spec-value">
            </div>
        `;
    }
    
    showAdminView('productForm');
}

function editProduct(productId) {
    showProductForm(productId);
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        renderAdminProducts();
        showToast('Product deleted successfully', 'success');
    }
}

function saveProduct(event) {
    event.preventDefault();
    
    // Clear all error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Get form values
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value;
    const brand = document.getElementById('productBrand').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const rating = parseFloat(document.getElementById('productRating').value) || 0;
    const shortDescription = document.getElementById('productShortDesc').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const image = document.getElementById('productImage').value.trim();
    
    // Validate
    let isValid = true;
    
    if (!name) {
        document.getElementById('productNameError').textContent = 'Product name is required';
        isValid = false;
    }
    
    if (!category) {
        document.getElementById('productCategoryError').textContent = 'Category is required';
        isValid = false;
    }
    
    if (!brand) {
        document.getElementById('productBrandError').textContent = 'Brand is required';
        isValid = false;
    }
    
    if (isNaN(price) || price <= 0) {
        document.getElementById('productPriceError').textContent = 'Valid price is required';
        isValid = false;
    }
    
    if (isNaN(stock) || stock < 0) {
        document.getElementById('productStockError').textContent = 'Valid stock quantity is required';
        isValid = false;
    }
    
    if (!image) {
        document.getElementById('productImageError').textContent = 'Image URL is required';
        isValid = false;
    }
    
    if (!isValid) {
        showToast('Please fix the errors in the form', 'error');
        return;
    }
    
    // Get specs
    const specs = {};
    document.querySelectorAll('.spec-row').forEach(row => {
        const key = row.querySelector('.spec-key').value.trim();
        const value = row.querySelector('.spec-value').value.trim();
        if (key && value) {
            specs[key] = value;
        }
    });
    
    // Create or update product
    if (editingProductId) {
        const product = products.find(p => p.id === editingProductId);
        if (product) {
            product.name = name;
            product.category = category;
            product.brand = brand;
            product.price = price;
            product.stock = stock;
            product.rating = rating;
            product.shortDescription = shortDescription;
            product.description = description;
            product.image = image;
            product.specs = specs;
        }
        showToast('Product updated successfully', 'success');
    } else {
        const newProduct = {
            id: 'p' + Date.now(),
            name,
            category,
            brand,
            price,
            rating,
            reviews: 0,
            shortDescription,
            description,
            specs,
            stock,
            image
        };
        products.push(newProduct);
        showToast('Product created successfully', 'success');
    }
    
    saveProducts();
    filteredProducts = [...products];
    renderProducts();
    showAdminView('products');
}

function cancelProductForm() {
    editingProductId = null;
    showAdminView('products');
}

// ============================================
// Toast Notifications
// ============================================

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = 'toast ' + type;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// Event Listeners
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize
    initializeProducts();
    initializeTheme();
    applyFilters();
    updateCartDisplay();

    // Theme switcher
    document.getElementById('themeSwitcher').addEventListener('change', (e) => {
        switchTheme(e.target.value);
    });

    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(link.dataset.section);
        });
    });

    // Shop Now button
    document.getElementById('shopNowBtn').addEventListener('click', () => {
        showSection('products');
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        currentFilters.search = e.target.value;
        applyFilters();
    });

    // Category filters
    document.querySelectorAll('.category-filter').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentFilters.categories.push(e.target.value);
            } else {
                currentFilters.categories = currentFilters.categories.filter(c => c !== e.target.value);
            }
            applyFilters();
        });
    });

    // Brand filters
    document.querySelectorAll('.brand-filter').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentFilters.brands.push(e.target.value);
            } else {
                currentFilters.brands = currentFilters.brands.filter(b => b !== e.target.value);
            }
            applyFilters();
        });
    });

    // Price filter
    document.getElementById('applyPriceBtn').addEventListener('click', () => {
        const min = document.getElementById('minPrice').value;
        const max = document.getElementById('maxPrice').value;
        currentFilters.minPrice = min ? parseFloat(min) : null;
        currentFilters.maxPrice = max ? parseFloat(max) : null;
        applyFilters();
    });

    // Clear filters
    document.getElementById('clearFiltersBtn').addEventListener('click', clearAllFilters);
    document.getElementById('clearFiltersBtn2').addEventListener('click', clearAllFilters);

    // Sorting
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        currentSort = e.target.value;
        applyFilters();
    });

    // Load more
    document.getElementById('loadMoreBtn').addEventListener('click', () => {
        displayedProductsCount += 12;
        renderProducts();
    });

    // Cart
    document.getElementById('cartIcon').addEventListener('click', openCartDrawer);
    document.getElementById('cartDrawerClose').addEventListener('click', closeCartDrawer);
    document.getElementById('cartDrawerOverlay').addEventListener('click', closeCartDrawer);
    document.getElementById('continueShoppingBtn').addEventListener('click', closeCartDrawer);
    document.getElementById('checkoutBtn').addEventListener('click', checkout);

    // Product modal
    document.getElementById('modalClose').addEventListener('click', closeProductModal);
    document.getElementById('modalOverlay').addEventListener('click', closeProductModal);
    
    // ESC key to close modal/drawer
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductModal();
            closeCartDrawer();
        }
    });

    // Admin navigation
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showAdminView(link.dataset.adminView);
        });
    });

    // Admin product management
    document.getElementById('addProductBtn').addEventListener('click', () => showProductForm());
    document.getElementById('cancelProductFormBtn').addEventListener('click', cancelProductForm);
    document.getElementById('cancelProductFormBtn2').addEventListener('click', cancelProductForm);
    document.getElementById('productForm').addEventListener('submit', saveProduct);
    
    // Add spec button
    document.getElementById('addSpecBtn').addEventListener('click', () => {
        const specsContainer = document.getElementById('specsInputs');
        const newRow = document.createElement('div');
        newRow.className = 'spec-row';
        newRow.innerHTML = `
            <input type="text" placeholder="Spec name" class="spec-key">
            <input type="text" placeholder="Spec value" class="spec-value">
            <button type="button" class="btn btn-danger btn-small remove-spec-btn" onclick="this.parentElement.remove()">×</button>
        `;
        specsContainer.appendChild(newRow);
    });

    // Newsletter form
    document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Thank you for subscribing!', 'success');
        e.target.reset();
    });
});
