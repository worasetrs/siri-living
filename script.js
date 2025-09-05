document.addEventListener('DOMContentLoaded', () => {

    /**
     * Smooth Scrolling for Anchor Links
     * Handles all links with href starting with '#'
     */
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /**
     * On-Scroll Animations with Intersection Observer
     * Adds 'is-visible' class to elements when they enter the viewport
     */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    /**
     * Portfolio Filter & “See More” Functionality
     *
     * The original implementation simply hid or showed all matching items. On the
     * “All” filter there are dozens of images, which caused the page to be very
     * long. To improve the user experience we now display a limited number of
     * items by default and expose a button that allows visitors to toggle
     * between a compact and expanded view. When a category filter is selected
     * the full set of category images is displayed, but the “See More” button
     * hides itself as it is only relevant for the combined view.
     */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
    const loadMoreContainer = document.createElement('div');
    loadMoreContainer.id = 'load-more-container';
    loadMoreContainer.style.textAlign = 'center';
    loadMoreContainer.style.marginTop = '30px';
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.id = 'load-more-btn';
    loadMoreBtn.className = 'btn btn-primary';
    loadMoreBtn.textContent = 'See More';
    loadMoreContainer.appendChild(loadMoreBtn);
    // Append the “See More” container after the portfolio grid
    const portfolioSection = document.querySelector('.portfolio-section');
    const portfolioGrid = portfolioSection.querySelector('.portfolio-grid');
    portfolioSection.appendChild(loadMoreContainer);

    let currentFilter = 'all';
    let showAllPortfolio = false;
    const initialItemsToShow = 8; // number of items to show by default on “all”

    function updatePortfolioDisplay() {
        let visibleCount = 0;
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            const matchesFilter = (currentFilter === 'all' || category === currentFilter);
            if (!matchesFilter) {
                item.style.display = 'none';
                return;
            }
            // In the “all” filter hide excess items unless showAllPortfolio is true
            if (currentFilter === 'all' && !showAllPortfolio && visibleCount >= initialItemsToShow) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
            visibleCount++;
        });
        // Control visibility of the load-more button
        if (currentFilter === 'all' && visibleCount > initialItemsToShow) {
            loadMoreContainer.style.display = 'block';
            loadMoreBtn.textContent = showAllPortfolio ? 'Show Less' : 'See More';
        } else {
            loadMoreContainer.style.display = 'none';
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // reset state when switching filters
            currentFilter = button.getAttribute('data-filter');
            showAllPortfolio = false;
            updatePortfolioDisplay();
        });
    });

    loadMoreBtn.addEventListener('click', () => {
        // toggle the expanded state and refresh the grid
        showAllPortfolio = !showAllPortfolio;
        updatePortfolioDisplay();
    });

    // Initialize display on page load
    updatePortfolioDisplay();

    /**
     * Contact Form Submission
     *
     * Instead of simply showing a success message, this function sends the
     * enquiry to a Google Apps Script endpoint (if provided). See
     * 【104053049609343†L109-L143】 for detailed instructions on creating a
     * Google Sheets backend. Replace the placeholder URL below with your
     * deployed Web App URL. When the URL is left as-is the form will still
     * validate and display a success message locally, but no data will be
     * stored.
     */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const contactScriptURL = 'https://script.google.com/macros/s/AKfycbyo1VIjSg7YhnyVhLLsYfKi74wbDZZlO0JtJV0UHats5FlmDekVVdxKjxxNKLSuEfQ3/exec';

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill out all required fields.';
                formStatus.style.color = 'red';
                return;
            }

            // Construct payload
            const payload = {
                name,
                email,
                phone,
                message
            };

            // Try to send data to the Apps Script endpoint
            try {
                if (contactScriptURL && contactScriptURL.startsWith('http')) {
                    const response = await fetch(contactScriptURL, {
                        method: 'POST',
                        body: JSON.stringify(payload)
                    });
                    if (response.ok) {
                        formStatus.textContent = 'Thank you! Your message has been sent.';
                        formStatus.style.color = 'green';
                        contactForm.reset();
                    } else {
                        formStatus.textContent = 'Error submitting the form. Please try again later.';
                        formStatus.style.color = 'red';
                    }
                } else {
                    // If no valid URL provided, still show success locally
                    formStatus.textContent = 'Thank you! Your message has been sent.';
                    formStatus.style.color = 'green';
                    contactForm.reset();
                }
            } catch (error) {
                formStatus.textContent = 'An error occurred. Please try again later.';
                formStatus.style.color = 'red';
            }

            // Clear the status message after a delay
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
    }

});