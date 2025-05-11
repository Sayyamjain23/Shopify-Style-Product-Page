
document.addEventListener('DOMContentLoaded', function() {
    const sizeChartBtn = document.getElementById('sizeChartBtn');
    const sizeChartModal = document.getElementById('sizeChartModal');
    const compareColorsBtn = document.getElementById('compareColorsBtn');
    const colorCompareModal = document.getElementById('colorCompareModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    function openModal(modal) {
        if (!modal) return;
        
        modal.style.display = 'block';
        modalOverlay.style.display = 'block';
        
        setTimeout(() => {
            modal.classList.add('active');
            modalOverlay.classList.add('active');
        }, 10);
        
        document.body.style.overflow = 'hidden';
        
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length) {
            setTimeout(() => {
                focusableElements[0].focus();
            }, 100);
        }
    }
    
    function closeModal(modal) {
        if (!modal) return;
        
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            
            const activeModals = document.querySelectorAll('.modal.active');
            if (activeModals.length === 0) {
                modalOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        }, 300);
    }
    
    if (sizeChartBtn && sizeChartModal) {
        // Populate size chart if not already done
        const sizeChartTable = sizeChartModal.querySelector('.size-chart-table');
        if (sizeChartTable && !sizeChartTable.querySelector('tr')) {
            populateSizeChart(sizeChartTable);
        }
        
        sizeChartBtn.addEventListener('click', function() {
            openModal(sizeChartModal);
        });
    }
    
    if (compareColorsBtn && colorCompareModal) {
        compareColorsBtn.addEventListener('click', function() {
            openModal(colorCompareModal);
            
            // Populate color comparison content
            const colorCompareContainer = colorCompareModal.querySelector('.color-compare-container');
            if (colorCompareContainer) {
                populateColorComparison(colorCompareContainer);
            }
        });
    }
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            const activeModals = document.querySelectorAll('.modal.active');
            activeModals.forEach(modal => {
                closeModal(modal);
            });
        });
    }
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModals = document.querySelectorAll('.modal.active');
            activeModals.forEach(modal => {
                closeModal(modal);
            });
        }
    });
    
    // Helper function to populate size chart
    function populateSizeChart(tableElement) {
        if (!tableElement) return;
        
        // Clear existing content
        tableElement.innerHTML = '';
        
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Size', 'Width (in)', 'Length (in)', 'Weight (lbs)'];
        headers.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        tableElement.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        const sizeData = [
            ['Small', '40', '60', '2.5'],
            ['Medium', '50', '70', '3.2'],
            ['Large', '60', '80', '4.0'],
            ['X-Large', '70', '90', '4.8']
        ];
        
        sizeData.forEach(rowData => {
            const tr = document.createElement('tr');
            
            rowData.forEach(cellData => {
                const td = document.createElement('td');
                td.textContent = cellData;
                tr.appendChild(td);
            });
            
            tbody.appendChild(tr);
        });
        
        tableElement.appendChild(tbody);
    }
    
    // Helper function to populate color comparison
    function populateColorComparison(container) {
        if (!container) return;
        
        // Clear previous content
        container.innerHTML = '';
        
        // Get all color swatches
        const colorSwatches = document.querySelectorAll('.color-swatch');
        
        if (colorSwatches.length === 0) {
            container.innerHTML = '<p>No color options available</p>';
            return;
        }
        
        // Create color comparison UI
        const colorGrid = document.createElement('div');
        colorGrid.className = 'color-comparison-grid';
        
        colorSwatches.forEach(swatch => {
            const colorName = swatch.getAttribute('data-color');
            const colorStyle = swatch.style.backgroundColor;
            
            const colorItem = document.createElement('div');
            colorItem.className = 'color-comparison-item';
            
            const colorSample = document.createElement('div');
            colorSample.className = 'color-sample';
            colorSample.style.backgroundColor = colorStyle;
            
            const colorLabel = document.createElement('div');
            colorLabel.className = 'color-label';
            colorLabel.textContent = colorName;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'color-compare-checkbox';
            checkbox.value = colorName;
            
            colorItem.appendChild(colorSample);
            colorItem.appendChild(colorLabel);
            colorItem.appendChild(checkbox);
            colorGrid.appendChild(colorItem);
        });
        
        container.appendChild(colorGrid);
        
        // Add compare button
        const compareBtn = document.createElement('button');
        compareBtn.className = 'compare-selected-btn';
        compareBtn.textContent = 'Compare Selected Colors';
        container.appendChild(compareBtn);
        

        const comparisonResult = document.createElement('div');
        comparisonResult.className = 'comparison-result';
        container.appendChild(comparisonResult);
        
        compareBtn.addEventListener('click', function() {
            const selectedColors = [];
            const checkboxes = container.querySelectorAll('.color-compare-checkbox:checked');
            
            checkboxes.forEach(checkbox => {
                const item = checkbox.closest('.color-comparison-item');
                const colorName = item.querySelector('.color-label').textContent;
                const colorStyle = item.querySelector('.color-sample').style.backgroundColor;
                
                selectedColors.push({ name: colorName, style: colorStyle });
            });
            
            if (selectedColors.length >= 2) {
                comparisonResult.innerHTML = '<h3>Side by Side Comparison</h3>';
                
                const sideBySide = document.createElement('div');
                sideBySide.className = 'side-by-side-colors';
                
                selectedColors.forEach(color => {
                    const colorBlock = document.createElement('div');
                    colorBlock.className = 'compared-color';
                    colorBlock.style.backgroundColor = color.style;
                    
                    const colorName = document.createElement('div');
                    colorName.className = 'compared-color-name';
                    colorName.textContent = color.name;
                    
                    const colorWrapper = document.createElement('div');
                    colorWrapper.className = 'compared-color-wrapper';
                    colorWrapper.appendChild(colorBlock);
                    colorWrapper.appendChild(colorName);
                    
                    sideBySide.appendChild(colorWrapper);
                });
                
                comparisonResult.appendChild(sideBySide);
            } else {
                comparisonResult.innerHTML = '<p>Please select at least 2 colors to compare</p>';
            }
        });
    }
});
