document.addEventListener('DOMContentLoaded', function () {
    localStorage.removeItem('pricingPlans');
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

    // === Dynamic Pricing Section from localStorage ===
    const dynamicPricingGrid = document.querySelector('.pricing-grid');
    if (dynamicPricingGrid) {
        dynamicPricingGrid.innerHTML = ''; // clear old content
        const plansJSON = localStorage.getItem('pricingPlans');
        if (!plansJSON || plansJSON === "undefined" || plansJSON === "{}" || plansJSON === "null") {
            localStorage.removeItem("pricingPlans");
            dynamicPricingGrid.innerHTML = `<p class="no-data">No pricing plans available.</p>`;
            return;
        }
        let planSet = new Set();

        try {
            const plans = JSON.parse(plansJSON) || [];
            if (plans.length === 0) {
                dynamicPricingGrid.innerHTML = `<p class="no-data">No pricing plans available.</p>`;
            } else {
                plans.forEach(plan => {
                    const planKey = `${plan.name}-${plan.price}`;
                    if (!planSet.has(planKey)) {
                        planSet.add(planKey);
                        const priceFormatted = Number(plan.price).toLocaleString('en-IN');
                        const isPopular = plan.popular ? 'popular' : '';
                        const popularTag = plan.popular ? `<span class="popular-tag">Most Popular</span>` : '';
                        const featureList = plan.features.map(f => `<li>${f.trim()}</li>`).join('');

                        dynamicPricingGrid.innerHTML += `
                            <div class="pricing-card ${isPopular}" data-aos="fade-up">
                                ${popularTag}
                                <h3>${plan.name}</h3>
                                <div class="price">₹${priceFormatted} <span>/year</span></div>
                                <ul class="pricing-features">${featureList}</ul>
                                <a href="#contact" class="btn ${isPopular ? 'btn-primary' : 'btn-outline'}">Choose Plan</a>
                            </div>
                        `;
                    }
                });
            }
        } catch (error) {
            dynamicPricingGrid.innerHTML = `<p class="error">Error loading pricing plans.</p>`;
            console.error('Invalid pricingPlans in localStorage:', error);
        }
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