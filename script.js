// Privacy Policy Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initializeNavigation();
    initializeCookieBanner();
    initializeCookiePreferences();
    initializeScrollEffects();
    initializeAccessibilityFeatures();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active section highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Cookie banner functionality
function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const manageButton = document.getElementById('manage-cookies');
    
    // Check if cookies have been accepted
    if (!getCookie('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
    
    // Accept all cookies
    acceptButton.addEventListener('click', function() {
        setCookie('cookiesAccepted', 'true', 365);
        setCookie('analyticsEnabled', 'true', 365);
        setCookie('marketingEnabled', 'true', 365);
        hideCookieBanner();
        showNotification('Cookie preferences saved successfully!', 'success');
    });
    
    // Manage cookie preferences
    manageButton.addEventListener('click', function() {
        showCookiePreferencesModal();
    });
}

// Cookie preferences modal
function initializeCookiePreferences() {
    const cookieSettingsButton = document.getElementById('cookie-settings');
    
    cookieSettingsButton.addEventListener('click', function() {
        showCookiePreferencesModal();
    });
}

function showCookiePreferencesModal() {
    // Create modal HTML
    const modalHTML = `
        <div id="cookie-modal" class="cookie-modal">
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <h3>Cookie Preferences</h3>
                    <button id="close-modal" class="close-modal">&times;</button>
                </div>
                <div class="cookie-modal-body">
                    <p>Choose which cookies you'd like to accept. You can change these settings at any time.</p>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4>Essential Cookies</h4>
                            <span class="cookie-status required">Required</span>
                        </div>
                        <p>These cookies are necessary for the website to function and cannot be switched off.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4>Analytics Cookies</h4>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="analytics-toggle" ${getCookie('analyticsEnabled') === 'true' ? 'checked' : ''}>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <p>These cookies help us understand how visitors interact with our website.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4>Marketing Cookies</h4>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="marketing-toggle" ${getCookie('marketingEnabled') === 'true' ? 'checked' : ''}>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <p>These cookies are used to deliver personalized advertisements.</p>
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button id="save-preferences" class="btn btn-primary">Save Preferences</button>
                    <button id="accept-all" class="btn btn-outline">Accept All</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    addModalStyles();
    
    // Handle modal interactions
    const modal = document.getElementById('cookie-modal');
    const closeButton = document.getElementById('close-modal');
    const saveButton = document.getElementById('save-preferences');
    const acceptAllButton = document.getElementById('accept-all');
    
    closeButton.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    saveButton.addEventListener('click', function() {
        const analyticsEnabled = document.getElementById('analytics-toggle').checked;
        const marketingEnabled = document.getElementById('marketing-toggle').checked;
        
        setCookie('cookiesAccepted', 'true', 365);
        setCookie('analyticsEnabled', analyticsEnabled.toString(), 365);
        setCookie('marketingEnabled', marketingEnabled.toString(), 365);
        
        modal.remove();
        hideCookieBanner();
        showNotification('Cookie preferences saved successfully!', 'success');
    });
    
    acceptAllButton.addEventListener('click', function() {
        setCookie('cookiesAccepted', 'true', 365);
        setCookie('analyticsEnabled', 'true', 365);
        setCookie('marketingEnabled', 'true', 365);
        
        modal.remove();
        hideCookieBanner();
        showNotification('All cookies accepted!', 'success');
    });
}

function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const styles = `
        <style id="modal-styles">
            .cookie-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                backdrop-filter: blur(5px);
            }
            
            .cookie-modal-content {
                background: white;
                border-radius: 12px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            
            .cookie-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem 2rem 1rem;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .cookie-modal-header h3 {
                margin: 0;
                color: #2d3748;
            }
            
            .close-modal {
                background: none;
                border: none;
                font-size: 2rem;
                color: #718096;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .close-modal:hover {
                color: #2d3748;
            }
            
            .cookie-modal-body {
                padding: 1rem 2rem;
            }
            
            .cookie-category {
                margin-bottom: 2rem;
                padding: 1.5rem;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
            }
            
            .cookie-category-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            
            .cookie-category h4 {
                margin: 0;
                color: #2d3748;
            }
            
            .cookie-status.required {
                background: #667eea;
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 4px;
                font-size: 0.8rem;
            }
            
            .cookie-toggle {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
            }
            
            .cookie-toggle input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                border-radius: 24px;
                transition: 0.3s;
            }
            
            .toggle-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                border-radius: 50%;
                transition: 0.3s;
            }
            
            input:checked + .toggle-slider {
                background-color: #667eea;
            }
            
            input:checked + .toggle-slider:before {
                transform: translateX(26px);
            }
            
            .cookie-modal-footer {
                padding: 1rem 2rem 2rem;
                border-top: 1px solid #e2e8f0;
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
            
            @media (max-width: 480px) {
                .cookie-modal-content {
                    width: 95%;
                    margin: 1rem;
                }
                
                .cookie-modal-header,
                .cookie-modal-body,
                .cookie-modal-footer {
                    padding-left: 1rem;
                    padding-right: 1rem;
                }
                
                .cookie-modal-footer {
                    flex-direction: column;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Scroll effects
function initializeScrollEffects() {
    const cards = document.querySelectorAll('.card, .disclosure-item, .right-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Accessibility features
function initializeAccessibilityFeatures() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #667eea;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main id to content
    const main = document.querySelector('.main');
    if (main) {
        main.id = 'main';
        main.setAttribute('tabindex', '-1');
    }
    
    // Keyboard navigation for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Utility functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function hideCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
        cookieBanner.classList.remove('show');
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 300);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.9rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Print functionality
function printPage() {
    window.print();
}

// Export data functionality (GDPR compliance)
function exportUserData() {
    const userData = {
        cookiePreferences: {
            analyticsEnabled: getCookie('analyticsEnabled') === 'true',
            marketingEnabled: getCookie('marketingEnabled') === 'true',
            cookiesAccepted: getCookie('cookiesAccepted') === 'true'
        },
        exportDate: new Date().toISOString(),
        dataTypes: [
            'Cookie preferences',
            'Website interaction data',
            'Contact form submissions'
        ]
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `user-data-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('Your data has been exported successfully!', 'success');
}

// Make functions available globally for potential external use
window.PrivacyPolicy = {
    exportUserData,
    printPage,
    showCookiePreferencesModal
};
