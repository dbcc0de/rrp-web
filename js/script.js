// River Rouge Productions - Main JavaScript File

// Progressive scroll-reactive gradient effect
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const body = document.body;
    
    // Remove all scroll classes first
    body.classList.remove('scroll-level-1', 'scroll-level-2', 'scroll-level-3', 'scroll-level-4');
    
    // Add classes based on scroll position for progressive darkening
    if (scrollY > 1200) {
        body.classList.add('scroll-level-4'); // Footer area
    } else if (scrollY > 800) {
        body.classList.add('scroll-level-3'); // Contact section
    } else if (scrollY > 400) {
        body.classList.add('scroll-level-2'); // Videos section
    } else if (scrollY > 100) {
        body.classList.add('scroll-level-1'); // Books section
    }
    // Below 100px = no class = default opacity
});

// Book Gallery Functionality (Swipeable image galleries)
document.addEventListener('DOMContentLoaded', function() {
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(card => {
        const images = card.querySelectorAll('.gallery-image');
        const dots = card.querySelectorAll('.dot');
        const galleryImages = card.querySelector('.gallery-images');
        
        // Skip if no gallery found (like bundle card)
        if (!galleryImages || images.length === 0) return;
        
        let currentIndex = 0;
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        
        // Create navigation arrows for desktop
        const leftArrow = document.createElement('button');
        leftArrow.className = 'gallery-arrow gallery-arrow-left';
        leftArrow.setAttribute('aria-label', 'Previous image');
        leftArrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
        
        const rightArrow = document.createElement('button');
        rightArrow.className = 'gallery-arrow gallery-arrow-right';
        rightArrow.setAttribute('aria-label', 'Next image');
        rightArrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
        
        card.querySelector('.book-gallery').appendChild(leftArrow);
        card.querySelector('.book-gallery').appendChild(rightArrow);
        
        // Arrow click handlers
        leftArrow.addEventListener('click', () => {
            showImage((currentIndex - 1 + images.length) % images.length);
        });
        
        rightArrow.addEventListener('click', () => {
            showImage((currentIndex + 1) % images.length);
        });
        
        // Dot click functionality
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showImage(index);
            });
        });
        
        // Touch/swipe functionality for mobile - IMPROVED
        galleryImages.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });
        
        galleryImages.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            // Calculate movement
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = Math.abs(startX - currentX);
            const diffY = Math.abs(startY - currentY);
            
            // If horizontal swipe is more prominent than vertical, prevent page scroll
            if (diffX > diffY) {
                e.preventDefault();
            }
        }, { passive: false }); // passive: false allows preventDefault
        
        galleryImages.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            // Swipe threshold - more sensitive for smoother feel
            if (Math.abs(diff) > 30) {
                if (diff > 0) {
                    // Swiped left - next image
                    showImage((currentIndex + 1) % images.length);
                } else {
                    // Swiped right - previous image
                    showImage((currentIndex - 1 + images.length) % images.length);
                }
            }
        });
        
        // Mouse drag for desktop (optional - arrows are primary on desktop)
        galleryImages.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
            galleryImages.style.cursor = 'grabbing';
        });
        
        galleryImages.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
        });
        
        galleryImages.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            galleryImages.style.cursor = 'grab';
            
            const endX = e.clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    showImage((currentIndex + 1) % images.length);
                } else {
                    showImage((currentIndex - 1 + images.length) % images.length);
                }
            }
        });
        
        galleryImages.addEventListener('mouseleave', () => {
            isDragging = false;
            galleryImages.style.cursor = 'grab';
        });
        
        galleryImages.style.cursor = 'grab';
        
        // Keyboard navigation (accessibility)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                showImage((currentIndex - 1 + images.length) % images.length);
            } else if (e.key === 'ArrowRight') {
                showImage((currentIndex + 1) % images.length);
            }
        });
        
        function showImage(index) {
            currentIndex = index;
            
            images.forEach((img, i) => {
                if (i === index) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });
            
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-selected', 'true');
                } else {
                    dot.classList.remove('active');
                    dot.setAttribute('aria-selected', 'false');
                }
            });
        }
    });
});

// PayPal Button Rendering
// Wait for both DOM and PayPal SDK to be ready
function initPayPalButtons() {
    if (typeof paypal === 'undefined') {
        console.error('PayPal SDK not loaded');
        return;
    }
    
    // Book 1: Sleep for Hours
    const button1Container = document.getElementById('paypal-container-FKPJ3N7UHMD7S');
    if (button1Container) {
        paypal.HostedButtons({
            hostedButtonId: "FKPJ3N7UHMD7S",
        }).render("#paypal-container-FKPJ3N7UHMD7S")
        .catch(function(err) {
            console.error('PayPal button 1 render error:', err);
        });
    }
    
    // Book 2: Food & Flowers
    const button2Container = document.getElementById('paypal-container-RLRJMDDZPMXGW');
    if (button2Container) {
        paypal.HostedButtons({
            hostedButtonId: "RLRJMDDZPMXGW",
        }).render("#paypal-container-RLRJMDDZPMXGW")
        .catch(function(err) {
            console.error('PayPal button 2 render error:', err);
        });
    }
    
    // Bundle: Both Books
    const button3Container = document.getElementById('paypal-container-NT4KLCQW96BAG');
    if (button3Container) {
        paypal.HostedButtons({
            hostedButtonId: "NT4KLCQW96BAG",
        }).render("#paypal-container-NT4KLCQW96BAG")
        .catch(function(err) {
            console.error('PayPal bundle button render error:', err);
        });
    }
}

// Initialize PayPal buttons when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPayPalButtons);
} else {
    initPayPalButtons();
}