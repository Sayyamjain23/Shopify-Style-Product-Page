/**
 * Product Tabs Functionality
 * Handles tab switching for product information
 */
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabButtons.length > 0 && tabPanels.length > 0) {
        // Ensure first tab is active by default
        if (!document.querySelector('.tab-btn.active')) {
            tabButtons[0].classList.add('active');
            
            const firstTabId = tabButtons[0].getAttribute('data-tab');
            if (firstTabId) {
                const firstPanel = document.getElementById(firstTabId);
                if (firstPanel) {
                    firstPanel.classList.add('active');
                }
            }
        }
        
        // Tab click handlers
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get the tab to activate
                const tabToActivate = this.getAttribute('data-tab');
                
                // Skip if already active
                if (this.classList.contains('active')) return;
                
                // Deactivate all tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                    panel.style.opacity = '0';
                    panel.style.transform = 'translateY(10px)';
                });
                
                // Activate the selected tab
                this.classList.add('active');
                
                const activePanel = document.getElementById(tabToActivate);
                if (activePanel) {
                    activePanel.classList.add('active');
                    
                    // Trigger animation
                    setTimeout(() => {
                        activePanel.style.opacity = '1';
                        activePanel.style.transform = 'translateY(0)';
                    }, 50);
                }
            });
        });
    }
});
