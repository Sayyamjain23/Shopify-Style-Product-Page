/**
 * Product Gallery Functionality
 * Handles image gallery, thumbnails, and zoom functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const thumbnailsScroll = document.querySelector('.thumbnails-scroll');
    
    // Initialize gallery if elements exist
    if (mainImage && thumbnails.length > 0) {
        // Set up thumbnail click handlers
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Update active state
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update main image with smooth transition
                const newSrc = this.getAttribute('data-image');
                if (newSrc) {
                    mainImage.style.opacity = '0';
                    setTimeout(() => {
                        mainImage.src = newSrc;
                        mainImage.style.opacity = '1';
                    }, 300);
                }
            });
        });
        
        // Image zoom functionality
        const zoomContainer = mainImage.parentElement;
        if (zoomContainer) {
            // Add zoom effect on desktop devices only (not on touch devices)
            if (window.matchMedia("(min-width: 1024px)").matches) {
                zoomContainer.addEventListener('mouseenter', function() {
                    mainImage.style.transition = 'transform 0.3s ease';
                });
                
                zoomContainer.addEventListener('mousemove', function(e) {
                    const { left, top, width, height } = this.getBoundingClientRect();
                    const x = (e.clientX - left) / width;
                    const y = (e.clientY - top) / height;
                    
                    mainImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
                    mainImage.style.transform = 'scale(1.5)';
                });
                
                zoomContainer.addEventListener('mouseleave', function() {
                    mainImage.style.transform = 'scale(1)';
                });
            }
        }
        
        // Add scroll buttons for thumbnails if needed
        if (thumbnailsScroll && thumbnails.length > 4) {
            const thumbnailsContainer = document.querySelector('.thumbnails-container');
            
            // Create scroll buttons if not already present
            if (!document.querySelector('.scroll-left')) {
                const scrollLeftBtn = document.createElement('button');
                scrollLeftBtn.className = 'scroll-btn scroll-left';
                scrollLeftBtn.innerHTML = '&lt;';
                thumbnailsContainer.appendChild(scrollLeftBtn);
                
                scrollLeftBtn.addEventListener('click', () => {
                    thumbnailsScroll.scrollBy({ left: -200, behavior: 'smooth' });
                });
            }
            
            if (!document.querySelector('.scroll-right')) {
                const scrollRightBtn = document.createElement('button');
                scrollRightBtn.className = 'scroll-btn scroll-right';
                scrollRightBtn.innerHTML = '&gt;';
                thumbnailsContainer.appendChild(scrollRightBtn);
                
                scrollRightBtn.addEventListener('click', () => {
                    thumbnailsScroll.scrollBy({ left: 200, behavior: 'smooth' });
                });
            }
            
            // Show/hide scroll buttons based on scroll position
            thumbnailsScroll.addEventListener('scroll', function() {
                const scrollLeftBtn = document.querySelector('.scroll-left');
                const scrollRightBtn = document.querySelector('.scroll-right');
                
                if (this.scrollLeft <= 0) {
                    scrollLeftBtn.style.opacity = '0.5';
                } else {
                    scrollLeftBtn.style.opacity = '1';
                }
                
                if (this.scrollLeft + this.clientWidth >= this.scrollWidth - 5) {
                    scrollRightBtn.style.opacity = '0.5';
                } else {
                    scrollRightBtn.style.opacity = '1';
                }
            });
            
            // Trigger scroll event to set initial button states
            thumbnailsScroll.dispatchEvent(new Event('scroll'));
        }
    }
});
