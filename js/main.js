/**
 * Main JavaScript File
 * Initializes components and handles global functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize product cards in "Pairs Well With" section
    initComplementaryProducts();
    
    // Initialize product bundle
    initProductBundle();
    
    // Initialize related products
    initRelatedProducts();
    
    // Helper function to initialize complementary products
    function initComplementaryProducts() {
        const container = document.querySelector('.products-scroll');
        if (!container) return;
        
        // Clear container if it has content already
        if (container.children.length > 0) return;
        
        // Sample complementary products data
        const products = [
            {
                name: 'Portable Camping Chair',
                price: '$49.99',
                image: 'assets/complementary-1.jpg'
            },
            {
                name: 'Insulated Water Bottle',
                price: '$24.99',
                image: 'assets/complementary-2.jpg'
            },
            {
                name: 'LED Camping Lantern',
                price: '$34.99',
                image: 'assets/complementary-3.jpg'
            },
            {
                name: 'Outdoor Pillow Set',
                price: '$29.99',
                image: 'assets/complementary-4.jpg'
            },
            {
                name: 'Portable Bluetooth Speaker',
                price: '$59.99',
                image: 'assets/complementary-5.jpg'
            }
        ];
        
        // Create product cards
        products.forEach(product => {
            // Use placeholder image if product image doesn't exist
            const imageSrc = product.image || 'https://via.placeholder.com/250x200';
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-card-image">
                    <img src="${imageSrc}" alt="${product.name}">
                </div>
                <div class="product-card-content">
                    <h3 class="product-card-title">${product.name}</h3>
                    <div class="product-card-price">${product.price}</div>
                    <button class="product-card-btn">Add to Cart</button>
                </div>
            `;
            
            container.appendChild(productCard);
            
            // Add click handler for the add to cart button
            const addBtn = productCard.querySelector('.product-card-btn');
            if (addBtn) {
                addBtn.addEventListener('click', function() {
                    alert(`${product.name} added to cart!`);
                });
            }
        });
    }
    
    // Helper function to initialize product bundle
    function initProductBundle() {
        const container = document.querySelector('.bundle-container');
        if (!container || container.children.length > 1) return;
        
        // Sample bundle products
        const bundleItems = [
            {
                name: 'Premium Outdoor Blanket',
                price: '$89.99',
                image: 'assets/product-main.jpg'
            },
            {
                name: 'Waterproof Carrying Case',
                price: '$29.99',
                image: 'assets/bundle-1.webp'
            },
            {
                name: 'Outdoor Pillow Set',
                price: '$39.99',
                image: 'assets/bundle-2.jpg'
            }
        ];
        
        // Calculate total price
        let totalPrice = 0;
        bundleItems.forEach(item => {
            totalPrice += parseFloat(item.price.replace('$', ''));
        });
        
        // Apply bundle discount
        const discountedTotal = (totalPrice * 0.9).toFixed(2); // 10% discount
        
        // Create bundle items
        bundleItems.forEach(item => {
            // Use placeholder image if product image doesn't exist
            const imageSrc = item.image || 'https://via.placeholder.com/150x150';
            
            const bundleItem = document.createElement('div');
            bundleItem.className = 'bundle-item';
            bundleItem.innerHTML = `
                <div class="bundle-item-image">
                    <img src="${imageSrc}" alt="${item.name}">
                </div>
                <h3 class="bundle-item-title">${item.name}</h3>
                <div class="bundle-item-price">${item.price}</div>
            `;
            
            container.appendChild(bundleItem);
        });
        
        // Add bundle total
        const bundleTotal = document.createElement('div');
        bundleTotal.className = 'bundle-total';
        bundleTotal.innerHTML = `
            <div class="bundle-total-label">Bundle Price (Save 10%)</div>
            <div class="bundle-total-price">$${discountedTotal}</div>
        `;
        
        container.appendChild(bundleTotal);
        
        // Update the add bundle button text
        const addBundleBtn = document.querySelector('.add-bundle-btn');
        if (addBundleBtn) {
            addBundleBtn.textContent = `Add Bundle to Cart - $${discountedTotal}`;
        }
    }
    
    // Helper function to initialize related products
    function initRelatedProducts() {
        const container = document.querySelector('.products-grid');
        if (!container || container.children.length > 0) return;
        
        // Sample related products
        const products = [
            {
                name: 'Camping Hammock',
                price: '$59.99',
                image: 'assets/related-1.webp',
                badge: 'Popular'
            },
            {
                name: 'Outdoor Cooking Set',
                price: '$79.99',
                image: 'assets/related-2.webp',
                badge: 'New'
            },
            {
                name: 'Hiking Backpack',
                price: '$89.99',
                image: 'assets/related-3.jpg'
            },
            {
                name: 'Waterproof Tent',
                price: '$129.99',
                image: 'assets/related-4.webp',
                badge: 'Sale'
            }
        ];
        
        // Create product cards
        products.forEach(product => {
            // Use placeholder image if product image doesn't exist
            const imageSrc = product.image || 'https://via.placeholder.com/250x250';
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            let badgeHTML = '';
            if (product.badge) {
                badgeHTML = `<span class="product-badge">${product.badge}</span>`;
            }
            
            productCard.innerHTML = `
                <div class="product-card-image">
                    ${badgeHTML}
                    <img src="${imageSrc}" alt="${product.name}">
                </div>
                <div class="product-card-content">
                    <h3 class="product-card-title">${product.name}</h3>
                    <div class="product-card-price">${product.price}</div>
                    <button class="product-card-btn">View Product</button>
                </div>
            `;
            
            container.appendChild(productCard);
            
            // Add click handler for the view product button
            const viewBtn = productCard.querySelector('.product-card-btn');
            if (viewBtn) {
                viewBtn.addEventListener('click', function() {
                    alert(`Viewing ${product.name}`);
                });
            }
        });
    }
});
