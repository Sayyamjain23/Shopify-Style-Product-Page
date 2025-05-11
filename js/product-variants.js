/**
 * Product Variants Functionality
 * Handles color and size selection, quantity controls, and localStorage persistence
 */
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const selectedColorEl = document.getElementById('selectedColor');
    const sizeOptions = document.querySelectorAll('.size-option');
    const selectedSizeEl = document.getElementById('selectedSize');
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    
    // Load saved selections from localStorage
    function loadSavedSelections() {
        const savedColor = localStorage.getItem('selectedColor');
        const savedSize = localStorage.getItem('selectedSize');
        
        if (savedColor && selectedColorEl) {
            // Find and activate the saved color swatch
            colorSwatches.forEach(swatch => {
                if (swatch.getAttribute('data-color') === savedColor) {
                    swatch.click(); // This will trigger the click handler
                }
            });
        }
        
        if (savedSize && selectedSizeEl) {
            // Find and activate the saved size option
            sizeOptions.forEach(option => {
                if (option.getAttribute('data-size') === savedSize) {
                    option.click(); // This will trigger the click handler
                }
            });
        }
    }
    
    // Color swatch selection
    if (colorSwatches.length > 0 && selectedColorEl) {
        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', function() {
                // Update active state
                colorSwatches.forEach(s => s.classList.remove('active'));
                this.classList.add('active');
                
                // Update selected color text
                const colorName = this.getAttribute('data-color');
                selectedColorEl.textContent = colorName;
                
                // Save to localStorage
                localStorage.setItem('selectedColor', colorName);
                
                // Optional: Update product image based on color
                const colorImage = this.getAttribute('data-image');
                if (colorImage) {
                    const mainImage = document.getElementById('mainImage');
                    if (mainImage) {
                        mainImage.src = colorImage;
                    }
                }
            });
        });
    }
    
    // Size option selection
    if (sizeOptions.length > 0 && selectedSizeEl) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Update active state
                sizeOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                // Update selected size text
                const sizeName = this.getAttribute('data-size');
                selectedSizeEl.textContent = sizeName;
                
                // Save to localStorage
                localStorage.setItem('selectedSize', sizeName);
            });
        });
    }
    
    // Quantity selector
    if (quantityInput && decreaseBtn && increaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        increaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            const max = parseInt(quantityInput.getAttribute('max') || '10');
            if (currentValue < max) {
                quantityInput.value = currentValue + 1;
            }
        });
        
        // Ensure quantity is always valid
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            const min = parseInt(this.getAttribute('min') || '1');
            const max = parseInt(this.getAttribute('max') || '10');
            
            if (isNaN(value) || value < min) {
                this.value = min;
            } else if (value > max) {
                this.value = max;
            }
        });
    }
    
    // Load saved selections after setting up event handlers
    loadSavedSelections();
    
    // Add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const color = selectedColorEl ? selectedColorEl.textContent : '';
            const size = selectedSizeEl ? selectedSizeEl.textContent : '';
            const quantity = quantityInput ? quantityInput.value : '1';
            
            // Show confirmation message
            alert(`Added to cart: ${quantity} x Premium Outdoor Blanket (${color}, ${size})`);
        });
    }
    
    // Add bundle to cart button
    const addBundleBtn = document.querySelector('.add-bundle-btn');
    if (addBundleBtn) {
        addBundleBtn.addEventListener('click', function() {
            alert('Complete outdoor set bundle added to cart!');
        });
    }
});
