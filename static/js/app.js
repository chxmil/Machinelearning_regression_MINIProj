/**
 * LFPR Prediction Application JavaScript
 * ====================================
 * 
 * Handles form submission, API calls, and UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predictionForm');
    const predictBtn = document.getElementById('predictBtn');
    const resultsSection = document.getElementById('resultsSection');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const predictionResult = document.getElementById('predictionResult');
    const errorMessage = document.getElementById('errorMessage');
    const predictionValue = document.getElementById('predictionValue');
    const interpretation = document.getElementById('interpretation');
    const errorText = document.getElementById('errorText');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show results section and loading spinner
        resultsSection.classList.remove('hidden');
        loadingSpinner.classList.remove('hidden');
        predictionResult.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        // Disable submit button
        predictBtn.disabled = true;
        predictBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Predicting...';
        
        try {
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Convert numeric fields
            data.year = parseInt(data.year);
            data.education = parseFloat(data.education);
            
            // Make API call
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show prediction result
                showPredictionResult(result);
            } else {
                // Show error message
                showError(result.error);
            }
            
        } catch (error) {
            console.error('Error:', error);
            showError('Network error. Please check your connection and try again.');
        } finally {
            // Re-enable submit button
            predictBtn.disabled = false;
            predictBtn.innerHTML = '<i class="fas fa-magic mr-2"></i>Predict LFPR';
            loadingSpinner.classList.add('hidden');
        }
    });

    function showPredictionResult(result) {
        // Update prediction value with animation
        predictionValue.textContent = result.prediction + '%';
        interpretation.textContent = result.interpretation;
        
        // Show result with animation
        predictionResult.classList.remove('hidden');
        
        // Add animation effect
        predictionValue.style.transform = 'scale(0.8)';
        predictionValue.style.opacity = '0';
        
        setTimeout(() => {
            predictionValue.style.transition = 'all 0.5s ease-out';
            predictionValue.style.transform = 'scale(1)';
            predictionValue.style.opacity = '1';
        }, 100);
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    function showError(message) {
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');
        
        // Scroll to error
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Add input validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error styling on input
            this.classList.remove('border-red-500', 'ring-red-500');
            this.classList.add('border-gray-300', 'focus:ring-primary');
        });
    });

    function validateInput(input) {
        const value = input.value.trim();
        
        // Basic validation
        if (input.hasAttribute('required') && !value) {
            showInputError(input, 'This field is required');
            return false;
        }
        
        // Numeric validation for year
        if (input.type === 'number') {
            const numValue = parseInt(value);
            if (isNaN(numValue) || numValue < 2550 || numValue > 2580) {
                showInputError(input, 'Year must be between 2550 and 2580');
                return false;
            }
        }
        
        return true;
    }

    function showInputError(input, message) {
        input.classList.remove('border-gray-300', 'focus:ring-primary');
        input.classList.add('border-red-500', 'ring-red-500');
        
        // Create or update error message
        let errorDiv = input.parentNode.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-500 text-sm mt-1';
            input.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    // Add some interactive features
    const educationSelect = document.getElementById('education');
    const educationLabels = {
        0: 'ไม่มีการศึกษา',
        1: 'ต่ำกว่าประถมศึกษา',
        2: 'ประถมศึกษา',
        3: 'มัธยมศึกษาตอนต้น',
        4: 'มัธยมศึกษาตอนปลาย สายสามัญ',
        5: 'มัธยมศึกษาตอนปลาย สายอาชีวศึกษา',
        6: 'มัธยมศึกษาตอนปลาย สายวิชาการศึกษา',
        7: 'อุดมศึกษา สายวิชาการ',
        8: 'อุดมศึกษา สายวิชาชีพ',
        9: 'อุดมศึกษา สายวิชาการศึกษา',
        10: 'อื่น ๆ',
        11: 'ไม่ทราบ',
        12: 'รวม'
    };

    // Add tooltips or help text for education levels
    educationSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        const label = educationLabels[selectedValue];
        
        // You could add a tooltip or help text here
        console.log(`Selected education: ${label}`);
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter to submit form
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
        
        // Escape to clear results
        if (e.key === 'Escape') {
            resultsSection.classList.add('hidden');
        }
    });

    // Add form reset functionality
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200';
    resetBtn.innerHTML = '<i class="fas fa-undo mr-2"></i>Reset Form';
    resetBtn.addEventListener('click', function() {
        form.reset();
        resultsSection.classList.add('hidden');
        
        // Reset all inputs to default styling
        inputs.forEach(input => {
            input.classList.remove('border-red-500', 'ring-red-500');
            input.classList.add('border-gray-300', 'focus:ring-primary');
        });
        
        // Remove error messages
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    });
    
    form.appendChild(resetBtn);

    // Add sample data buttons for quick testing
    const sampleDataBtn = document.createElement('button');
    sampleDataBtn.type = 'button';
    sampleDataBtn.className = 'mt-2 w-full bg-accent hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200';
    sampleDataBtn.innerHTML = '<i class="fas fa-flask mr-2"></i>Load Sample Data';
    sampleDataBtn.addEventListener('click', function() {
        // Load sample data
        document.getElementById('year').value = '2567';
        document.getElementById('education').value = '7';
        document.getElementById('area').value = 'รวม';
        document.getElementById('sex').value = 'รวม';
        document.getElementById('quarter').value = '1';
    });
    
    form.appendChild(sampleDataBtn);

    console.log('LFPR Prediction App initialized successfully!');
});
