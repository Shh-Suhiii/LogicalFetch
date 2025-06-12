document.addEventListener('DOMContentLoaded', function () {
    // === Mobile Menu Toggle ===
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    AOS.init({
        duration: 800,
        once: true
    });

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // === Smooth Scrolling ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Services Section ===
    const servicesData = [
        {
            icon: 'fas fa-chalkboard-teacher',
            title: 'Institute Management App',
            description: 'Complete solution for managing students, faculty, attendance, and academic records.'
        },
        {
            icon: 'fas fa-book-open',
            title: 'E-Learning Platform',
            description: 'Interactive learning app with course materials, quizzes, and progress tracking.'
        },
        {
            icon: 'fas fa-bullhorn',
            title: 'Communication Portal',
            description: 'Seamless communication between institute, students, and parents.'
        },
        {
            icon: 'fas fa-calendar-alt',
            title: 'Event Management',
            description: 'Manage and promote institute events, workshops, and seminars.'
        },
        {
            icon: 'fas fa-money-bill-wave',
            title: 'Fee Management System',
            description: 'Automated fee collection, reminders, and payment tracking.'
        },
        {
            icon: 'fas fa-chart-line',
            title: 'Analytics Dashboard',
            description: 'Detailed insights and reports on institute performance and student progress.'
        }
    ];

    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        servicesData.forEach(service => {
            servicesGrid.innerHTML += `
                <div class="service-card" data-aos="fade-up">
                    <div class="service-icon"><i class="${service.icon}"></i></div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <a href="#contact" class="btn btn-outline">Get Started</a>
                </div>
            `;
        });
    }

    // === Pricing Section ===
    const pricingData = [
        {
            title: 'Basic',
            price: '₹15,000',
            period: '/year',
            features: [
                'Basic Institute App',
                'Up to 500 students',
                'Announcements',
                'Event Calendar',
                'Email Support'
            ]
        },
        {
            title: 'Standard',
            price: '₹25,000',
            period: '/year',
            popular: true,
            features: [
                'Everything in Basic',
                'Up to 2000 students',
                'Attendance System',
                'Fee Management',
                'Priority Support'
            ]
        },
        {
            title: 'Premium',
            price: '₹40,000',
            period: '/year',
            features: [
                'Everything in Standard',
                'Unlimited students',
                'E-Learning Module',
                'Parent Portal',
                '24/7 Support'
            ]
        }
    ];

    const pricingGrid = document.querySelector('.pricing-grid');
    if (pricingGrid) {
        pricingData.forEach(plan => {
            pricingGrid.innerHTML += `
                <div class="pricing-card ${plan.popular ? 'popular' : ''}" data-aos="fade-up">
                    ${plan.popular ? '<span class="popular-tag">Most Popular</span>' : ''}
                    <h3>${plan.title}</h3>
                    <div class="price">${plan.price} <span>${plan.period}</span></div>
                    <ul class="pricing-features">
                        ${plan.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                    <a href="#contact" class="btn ${plan.popular ? 'btn-primary' : 'btn-outline'}">Choose Plan</a>
                </div>
            `;
        });
    }

    // === Contact Form Submission ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
            const formData = new FormData(contactForm);

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => {
                    alert('Thank you! Your message has been submitted.');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit';
                })
                .catch(error => {
                    alert('There was an error submitting your message. Please try again.');
                    console.error('Error!', error.message);
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit';
                });
        });
    }

    // === Testimonials Carousel ===
    new Swiper(".mySwiper", {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });

    // === Dark Mode Toggle ===
    const darkToggle = document.getElementById('darkToggle');
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            darkToggle.classList.toggle('active');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });

        // On load, set theme from localStorage
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }
    if (document.body.classList.contains('dark-mode') && darkToggle) {
        darkToggle.classList.add('active');
    }

    // === Hero Section Animation on Scroll ===
    const heroElements = document.querySelectorAll('.hero-content, .hero-image');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    heroElements.forEach(el => observer.observe(el));
});