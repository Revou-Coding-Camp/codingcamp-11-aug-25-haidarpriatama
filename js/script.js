// Enhanced JavaScript for Compatto website

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupSmoothScrolling();
    setupMobileMenu();
    setupContactForm();
    setupLoadingAnimations();
    // Automatically show welcome modal when page loads
    welcomeSpeech();
});

/**
 * Welcome speech functionality - prompts user for name and updates greeting
 */
function welcomeSpeech() {
    // Prevent body scroll when modal is open
    document.body.classList.add('modal-open');
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Welcome to Compatto!</h3>
            <p class="text-gray-600 mb-6">We'd love to know your name to personalize your experience.</p>
            <input type="text" id="name-input" placeholder="Enter your name" 
                   class="w-full border border-gray-200 rounded-lg p-3 mb-6 focus:border-gray-400 focus:outline-none">
            <div class="flex gap-4">
                <button onclick="submitName()" class="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                    Continue
                </button>
                <button onclick="closeModal()" class="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Skip
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Use setTimeout to ensure modal is rendered before focusing
    setTimeout(() => {
        const nameInput = document.getElementById('name-input');
        if (nameInput) {
            nameInput.focus();
            nameInput.scrollIntoView = function() {}; // Disable scrollIntoView
        }
    }, 100);
    
    // Allow Enter key to submit
    modal.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitName();
        }
    });
}

/**
 * Submit user name and update greeting
 */
function submitName() {
    const nameInput = document.getElementById('name-input');
    const userName = nameInput.value.trim();
    
    if (userName) {
        // Update greeting in hero section
        document.getElementById('user-greeting').textContent = userName;
        showNotification(`Welcome ${userName}! Let's transform your space together.`, 'success');
    }
    
    closeModal();
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
    
    // Restore body scroll
    document.body.classList.remove('modal-open');
}

/**
 * Setup mobile menu functionality
 */
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

/**
 * Setup contact form with validation
 */
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit();
        });
        
        // Real-time validation for input fields
        const inputs = form.querySelectorAll('input:not([type="radio"]), textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Real-time validation for radio buttons
        const radioButtons = form.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                validateField(this);
            });
        });
    }
}

/**
 * Handle form submission with validation
 */
function handleFormSubmit() {
    const name = document.getElementById('nama').value.trim();
    const birthdate = document.getElementById('tanggal').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const message = document.getElementById('pesan').value.trim();
    
    // Clear previous errors
    clearAllErrors();
    
    let isValid = true;
    
    // Validate name
    if (!name) {
        showFieldError('nama', 'Nama harus diisi');
        isValid = false;
    } else if (name.length < 2) {
        showFieldError('nama', 'Nama minimal 2 karakter');
        isValid = false;
    }
    // Validate birthdate
    if (!birthdate) {
        showFieldError('tanggal', 'Tanggal lahir harus diisi');
        isValid = false;
    } else {
        const birthYear = new Date(birthdate).getFullYear();
        const currentYear = new Date().getFullYear();
    }
    // Validate gender
    if (!gender) {
        showFieldError('gender', 'Jenis kelamin harus dipilih');
        isValid = false;
    }
    // Validate message
    if (!message) {
        showFieldError('pesan', 'Pesan harus diisi');
        isValid = false;
    }
    
    if (isValid) {
        const submitBtn = document.querySelector('#contactForm button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        setTimeout(() => {
            displayFormResult(name, birthdate, gender.value, message);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            showNotification('Pesan berhasil dikirim!', 'success');
        }, 1000);
    } else {
        showNotification('Mohon lengkapi form dengan benar', 'error');
    }
}

/**
 * Display form submission result in the format shown in the image
 */
function displayFormResult(name, birthdate, gender, message) {
    const resultDiv = document.getElementById('result');
    const noMessageDiv = document.getElementById('no-message');
    
    // Format birthdate for display (DD/MM/YYYY format)
    const birthDateObj = new Date(birthdate);
    const formattedBirthdate = birthDateObj.toLocaleDateString('en-GB');
    
    // Create result content
    const resultContent = `
        <div class="space-y-3">
            <div class="flex">
                <span class="font-semibold text-gray-700 w-32 flex-shrink-0">Nama</span>
                <span class="text-gray-600">: ${name}</span>
            </div>
            <div class="flex">
                <span class="font-semibold text-gray-700 w-32 flex-shrink-0">Tanggal Lahir</span>
                <span class="text-gray-600">: ${formattedBirthdate}</span>
            </div>
            <div class="flex">
                <span class="font-semibold text-gray-700 w-32 flex-shrink-0">Jenis Kelamin</span>
                <span class="text-gray-600">: ${gender}</span>
            </div>
            <div class="flex flex-col">
                <div class="flex">
                    <span class="font-semibold text-gray-700 w-32 flex-shrink-0">Pesan</span>
                    <span class="text-gray-600">:</span>
                </div>
                <div class="mt-2 pl-2">
                    <div class="bg-gray-50 rounded-lg p-3 border-l-4 border-gray-300">
                        <p class="text-gray-700 leading-relaxed">${message}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show result and hide no-message placeholder
    document.getElementById('form-result-content').innerHTML = resultContent;
    resultDiv.classList.remove('hidden');
    noMessageDiv.classList.add('hidden');
}

/**
 * Validate individual field
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    
    clearFieldError(field);
    
    switch (fieldId) {
        case 'nama':
            if (!value) {
                showFieldError(fieldId, 'Nama harus diisi');
            } else if (value.length < 2) {
                showFieldError(fieldId, 'Nama minimal 2 karakter');
            }
            break;
        case 'tanggal':
            if (!value) {
                showFieldError(fieldId, 'Tanggal lahir harus diisi');
            } else {
                const birthYear = new Date(value).getFullYear();
                const currentYear = new Date().getFullYear();
            
            }
            break;
        case 'pesan':
            if (!value) {
                showFieldError(fieldId, 'Pesan harus diisi');
            }
            break;
    }
    
    // Validate gender radio buttons
    if (field.name === 'gender') {
        const genderSelected = document.querySelector('input[name="gender"]:checked');
        if (!genderSelected) {
            showFieldError('gender', 'Jenis kelamin harus dipilih');
        } else {
            clearFieldError({ id: 'gender' });
        }
    }
}

/**
 * Show field error
 */
function showFieldError(fieldId, message) {
    let field, errorDiv;
    
    if (fieldId === 'gender') {
        field = document.querySelector('input[name="gender"]');
        errorDiv = document.getElementById('error-gender');
        document.querySelectorAll('input[name="gender"]').forEach(radio => {
            radio.parentElement.classList.add('text-red-500');
        });
    } else {
        field = document.getElementById(fieldId);
        errorDiv = document.getElementById('error-' + fieldId);
        field.classList.add('border-red-300');
        field.classList.remove('border-gray-200');
    }
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    const fieldId = field.id || 'gender';
    
    if (fieldId === 'gender') {
        const errorDiv = document.getElementById('error-gender');
        document.querySelectorAll('input[name="gender"]').forEach(radio => {
            radio.parentElement.classList.remove('text-red-500');
        });
        if (errorDiv) {
            errorDiv.classList.add('hidden');
        }
    } else {
        const errorDiv = document.getElementById('error-' + fieldId);
        field.classList.remove('border-red-300');
        field.classList.add('border-gray-200');
        if (errorDiv) {
            errorDiv.classList.add('hidden');
        }
    }
}

/**
 * Clear all form errors
 */
function clearAllErrors() {
    const errorDivs = document.querySelectorAll('[id^="error-"]');
    errorDivs.forEach(div => div.classList.add('hidden'));
    const inputs = document.querySelectorAll('#contactForm input:not([type="radio"]), #contactForm textarea');
    inputs.forEach(input => {
        input.classList.remove('border-red-300');
        input.classList.add('border-gray-200');
    });
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
        radio.parentElement.classList.remove('text-red-500');
    });
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-gray-500';
    
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

/**
 * Setup smooth scrolling
 */
function setupSmoothScrolling() {
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
}

/**
 * Setup loading animations for images
 */
function setupLoadingAnimations() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('image-placeholder');
        
        img.addEventListener('load', function() {
            this.classList.remove('image-placeholder');
        });
        
        img.addEventListener('error', function() {
            this.classList.remove('image-placeholder');
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlhOWE5YSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPg==';
        });
    });
}

// Legacy function support
function sendMessage() {
    handleFormSubmit();
}