// NexaVoice Website JavaScript
// Based on heyrosie.com functionality

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Comparison Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const comparisonTables = document.querySelectorAll('.comparison-table');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(otherBtn => {
                otherBtn.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Hide all tables
            comparisonTables.forEach(table => {
                table.classList.remove('active');
            });
            
            // Show selected table
            const tableId = btn.getAttribute('data-tab') + '-table';
            document.getElementById(tableId).classList.add('active');
        });
    });
    
    // Audio Player Simulation
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle play/pause
            if (button.textContent === '▶') {
                // Reset all buttons
                playButtons.forEach(btn => {
                    btn.textContent = '▶';
                });
                
                // Set current button to pause
                button.textContent = '⏸';
                
                // Simulate progress bar filling
                const progressBar = button.nextElementSibling;
                progressBar.style.background = 'linear-gradient(to right, var(--primary) 0%, var(--gray) 0%)';
                
                simulateAudioProgress(progressBar, button);
            } else {
                button.textContent = '▶';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add chat widget to the page
    addChatWidget();
    
    // Add "Get Started" form modal
    setupGetStartedModal();
});

// Function to simulate audio progress
function simulateAudioProgress(progressBar, button) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        progressBar.style.background = `linear-gradient(to right, var(--primary) ${progress}%, var(--gray) ${progress}%)`;
        
        if (progress >= 100 || button.textContent === '▶') {
            clearInterval(interval);
            button.textContent = '▶';
        }
    }, 100);
}

// Function to add chat widget
function addChatWidget() {
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = '<i class="chat-icon">💬</i>';
    
    chatWidget.addEventListener('click', () => {
        alert('Chat support is available! How can we help you today?');
    });
    
    document.body.appendChild(chatWidget);
}

// Function to set up Get Started modal
function setupGetStartedModal() {
    const getStartedButtons = document.querySelectorAll('a[href="#get-started"]');
    
    getStartedButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create modal overlay
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'modal-overlay';
            modalOverlay.style.position = 'fixed';
            modalOverlay.style.top = '0';
            modalOverlay.style.left = '0';
            modalOverlay.style.width = '100%';
            modalOverlay.style.height = '100%';
            modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            modalOverlay.style.display = 'flex';
            modalOverlay.style.justifyContent = 'center';
            modalOverlay.style.alignItems = 'center';
            modalOverlay.style.zIndex = '1000';
            
            // Create modal content
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            modalContent.style.backgroundColor = 'white';
            modalContent.style.borderRadius = '10px';
            modalContent.style.padding = '30px';
            modalContent.style.maxWidth = '500px';
            modalContent.style.width = '90%';
            modalContent.style.position = 'relative';
            
            // Create close button
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '&times;';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '10px';
            closeButton.style.right = '15px';
            closeButton.style.border = 'none';
            closeButton.style.background = 'none';
            closeButton.style.fontSize = '24px';
            closeButton.style.cursor = 'pointer';
            
            // Create form content
            modalContent.innerHTML = `
                <h3 style="margin-bottom: 20px;">Get Started with NexaVoice</h3>
                <p>Enter your information to start your free trial. No credit card required.</p>
                <form id="get-started-form" style="margin-top: 20px;">
                    <div style="margin-bottom: 15px;">
                        <label for="name" style="display: block; margin-bottom: 5px;">Your Name</label>
                        <input type="text" id="name" name="name" required style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ddd;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="email" style="display: block; margin-bottom: 5px;">Email Address</label>
                        <input type="email" id="email" name="email" required style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ddd;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="phone" style="display: block; margin-bottom: 5px;">Phone Number</label>
                        <input type="tel" id="phone" name="phone" required style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ddd;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="business" style="display: block; margin-bottom: 5px;">Business Name</label>
                        <input type="text" id="business" name="business" required style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ddd;">
                    </div>
                    <button type="submit" style="background-color: var(--cta); color: white; border: none; padding: 12px 20px; border-radius: 50px; cursor: pointer; font-weight: 600; width: 100%;">Start My Free Trial</button>
                </form>
            `;
            
            // Add close button to modal
            modalContent.appendChild(closeButton);
            
            // Add modal content to overlay
            modalOverlay.appendChild(modalContent);
            
            // Add overlay to body
            document.body.appendChild(modalOverlay);
            
            // Close modal when clicking close button
            closeButton.addEventListener('click', () => {
                document.body.removeChild(modalOverlay);
            });
            
            // Close modal when clicking outside
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    document.body.removeChild(modalOverlay);
                }
            });
            
            // Handle form submission
            const form = document.getElementById('get-started-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for signing up! We\'ll be in touch shortly to help you get started with NexaVoice.');
                document.body.removeChild(modalOverlay);
            });
        });
    });
}
