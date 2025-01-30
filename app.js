class CampusPulse {
    constructor() {
        this.questions = [
            {
                text: "That 75% attendance rule got you like...",
                emoji: "😅",
                options: [
                    "Proxy master activated",
                    "Running to class at 8:59 AM",
                    "Already at 74% - PANIC!",
                    "Actually attending (rare species)"
                ]
            },
            {
                text: "What's really happening on your laptop in class?",
                emoji: "💻",
                options: [
                    "Netflix with one airpod",
                    "Valorant/BGMI grind",
                    "Actually taking notes (cap)",
                    "Coding/YouTube tutorials"
                ]
            },
            {
                text: "Best hangout spot in ADYPU?",
                emoji: "🌳",
                options: [
                    "ADYPU Garden - Peace spot",
                    "In front of Hostel - Squad area",
                    "ULC Building entrance",
                    "Tapri - The OG spot"
                ]
            },
            {
                text: "Your dream placement package?",
                emoji: "💼",
                options: [
                    "8+ LPA - Basic survival",
                    "12+ LPA - Living the dream",
                    "15+ LPA - Now we're talking",
                    "20+ LPA - Full optimism"
                ]
            },
            {
                text: "Seniors according to juniors are...",
                emoji: "👥",
                options: [
                    "Scary at first, chill later",
                    "Assignment lifesavers",
                    "Placement guide heroes",
                    "Too busy to notice us"
                ]
            },
            {
                text: "Juniors according to seniors are...",
                emoji: "🎭",
                options: [
                    "Way too overconfident",
                    "Always asking for notes",
                    "Actually pretty cool",
                    "Reminds us of our first year"
                ]
            },
            {
                text: "ADYPU in 5 years will be...",
                emoji: "🔮",
                options: [
                    "Top tier placement records",
                    "Better infrastructure",
                    "More strict rules 💀",
                    "Same vibes, different batch"
                ]
            },
            {
                text: "Most relatable lecture moment?",
                emoji: "💤",
                options: [
                    "Death by PowerPoint",
                    "'Any doubts?' *silence*",
                    "That one interesting prof",
                    "Back bench sleep session"
                ]
            },
            {
                text: "ULC building reality check:",
                emoji: "👀",
                options: [
                    "Study with a view™",
                    "'Group study' sessions",
                    "Love stories in making",
                    "Actually studying (rare)"
                ]
            },
            {
                text: "Which branch has the best Boys/Girls",
                emoji: "⚖️",
                options: [
                    "Engineering 🥲",
                    "Management has balance",
                    "Design has ",
                    "Still searching "
                ]
            },
            {
                text: "Your hostel mess survival strategy?",
                emoji: "🍽️",
                options: [
                    "Tapri zindabad",
                    "Food delivery apps MVP",
                    "Weekend home food stock",
                    "Adjusted to mess food"
                ]
            },
            {
                text: "Future of ADYPU looks...",
                emoji: "🚀",
                options: [
                    "More companies visiting",
                    "International collabs",
                    "Bigger, better campus",
                    "Competing with top unis"
                ]
            },
            {
                text: "Relationship status check:",
                emoji: "💝",
                options: [
                    "Single & chilling",
                    "Committed & thriving",
                    "Complicated scene",
                    "Focus on studies (sure)"
                ]
            },
            {
                text: "Your crush is from...",
                emoji: "💘",
                options: [
                    "Same branch, same year",
                    "Different branch senior",
                    "Different branch junior",
                    "Rather not say 🤫"
                ]
            }
        ];
        
        // Shuffle questions at start
        this.questions = this.shuffleArray(this.questions);
        this.currentIndex = 0;
        this.answeredCount = 0;
        this.cardsContainer = document.querySelector('.cards-container');
        this.progressFill = document.querySelector('.progress-fill');
        
        this.init();
    }

    // Fisher-Yates shuffle algorithm
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    init() {
        this.createCard();
        this.setupHammer();
    }

    createCard() {
        const question = this.questions[this.currentIndex];
        const card = document.createElement('div');
        card.className = 'card animate__animated';
        
        card.innerHTML = `
            <div class="card-content">
                <div class="card-emoji">${question.emoji}</div>
                <div class="card-question">${question.text}</div>
            </div>
        `;

        // Apply random gradient
        const gradients = [
            'linear-gradient(45deg, #FF6B6B, #FF8E53)',
            'linear-gradient(45deg, #4158D0, #C850C0)',
            'linear-gradient(45deg, #0093E9, #80D0C7)',
            'linear-gradient(45deg, #8EC5FC, #E0C3FC)',
            'linear-gradient(45deg, #85FFBD, #FFFB7D)'
        ];
        
        card.style.background = gradients[Math.floor(Math.random() * gradients.length)];
        this.cardsContainer.appendChild(card);
    }

    setupHammer() {
        const card = this.cardsContainer.querySelector('.card');
        const hammer = new Hammer(card);

        hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

        hammer.on('pan', (e) => {
            const deltaY = e.deltaY;
            card.style.transform = `translateY(${deltaY}px) rotate(${deltaY * 0.1}deg)`;
        });

        hammer.on('panend', (e) => {
            if (Math.abs(e.deltaY) > 150) {
                this.handleSwipe(e.deltaY > 0);
            } else {
                card.style.transform = '';
            }
        });
    }

    handleSwipe(isDown) {
        const card = this.cardsContainer.querySelector('.card');
        const direction = isDown ? 'down' : 'up';
        
        card.classList.add(`animate__slide${direction}Out`);
        
        if (!isDown) {
            this.showAnswerModal();
        } else {
            this.moveToNextCard();
        }
    }

    showAnswerModal() {
        const question = this.questions[this.currentIndex];
        const modal = document.createElement('div');
        modal.className = 'answer-modal animate__animated animate__fadeIn';
        
        const optionsHTML = question.options
            .map((option, index) => `
                <div class="answer-option" data-index="${index}">
                    ${option}
                </div>
            `).join('');

        modal.innerHTML = `
            <div class="modal-content">
                <h3>${question.text}</h3>
                <div class="options-container">
                    ${optionsHTML}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Improved touch handling for options
        const options = modal.querySelectorAll('.answer-option');
        options.forEach(option => {
            // Handle both click and touch events
            ['click', 'touchstart'].forEach(eventType => {
                option.addEventListener(eventType, (e) => {
                    e.preventDefault(); // Prevent double-firing on mobile
                    
                    // Return if already selected or animating
                    if (option.classList.contains('selected') || 
                        option.classList.contains('animate__pulse')) return;
                    
                    // Remove previous selections
                    options.forEach(opt => {
                        opt.classList.remove('selected', 'animate__animated', 'animate__pulse');
                        const oldRipple = opt.querySelector('.ripple');
                        if (oldRipple) oldRipple.remove();
                    });

                    // Create ripple from touch/click point
                    const ripple = document.createElement('div');
                    ripple.className = 'ripple';
                    
                    // Get touch/click coordinates
                    const rect = option.getBoundingClientRect();
                    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
                    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
                    
                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;
                    option.appendChild(ripple);

                    // Add selection classes
                    option.classList.add('selected', 'animate__animated', 'animate__pulse');

                    // Handle answer submission with slight delay for animation
                    setTimeout(() => {
                        this.answeredCount++;
                        this.updateProgress();
                        modal.classList.add('animate__fadeOut');
                        setTimeout(() => {
                            modal.remove();
                            this.moveToNextCard();
                        }, 300);
                    }, 400);
                }, { passive: false }); // Important for better touch handling
            });

            // Prevent default touch behavior to avoid stuck hover states
            option.addEventListener('touchend', (e) => {
                e.preventDefault();
            }, { passive: false });
        });
    }

    moveToNextCard() {
        const card = this.cardsContainer.querySelector('.card');
        card.remove();
        this.currentIndex = (this.currentIndex + 1) % this.questions.length;
        
        if (this.answeredCount < 5) {
            this.createCard();
            this.setupHammer();
        } else {
            this.showCompletionScreen();
        }
    }

    updateProgress() {
        const progress = (this.answeredCount / 5) * 100;
        this.progressFill.style.width = `${progress}%`;
    }

    showCompletionScreen() {
        const matchCount = Math.floor(Math.random() * 20) + 5;
        this.cardsContainer.innerHTML = `
            <div class="completion-screen animate__animated animate__fadeIn">
                <h2>🎉 Congratulations!</h2>
                <h3>You've completed all daily questions!</h3>
                <p>You vibed with ${matchCount} people!</p>
                <button class="retry-btn" onclick="location.reload()">Try Again Tomorrow</button>
                <p style="margin-top: 20px; font-size: 14px; opacity: 0.8;">
                    Made with ❤️ in ULC<br>
                    <span style="font-size: 12px;">Crafted in ULC</span>
                </p>
            </div>
        `;

        // Trigger confetti animation
        this.celebrateCompletion();

        // Show pre-registration popup after confetti
        setTimeout(() => {
            this.showPreRegisterPopup();
        }, 3500);
    }

    showPreRegisterPopup() {
        const popup = document.createElement('div');
        popup.className = 'pre-register-modal animate__animated animate__fadeIn';
        
        popup.innerHTML = `
            <div class="modal-content pre-register-content">
                <h2>🚀 Coming Soon!</h2>
                <h3>ADYPU's First Student Connection App</h3>
                <p>Be the first to know when we launch the full matchmaking app for ADYPU students!</p>
                
                <form id="preRegisterForm" class="pre-register-form">
                    <input type="email" placeholder="Your College Email" required 
                        pattern=".*@adypu\.edu\.in$" 
                        title="Please use your ADYPU email">
                    <button type="submit" class="submit-btn">Get Early Access</button>
                </form>
            </div>
        `;

        document.body.appendChild(popup);

        const form = popup.querySelector('#preRegisterForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input').value;
            
            // Here you would typically send the email to your backend
            console.log('Pre-registered email:', email);
            
            // Show success message
            popup.querySelector('.pre-register-content').innerHTML = `
                <h2>🎉 You're In!</h2>
                <p>Thanks for pre-registering! We'll notify you when we launch.</p>
                <p class="email-confirmation">${email}</p>
                <button onclick="location.reload()" class="submit-btn">Close</button>
            `;
        });
    }

    celebrateCompletion() {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CampusPulse();
}); 
