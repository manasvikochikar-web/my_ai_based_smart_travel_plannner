  // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Nav scroll effect
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 60) {
        nav.style.boxShadow = '0 4px 30px rgba(28,24,16,0.08)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.dest-card, .exp-card, .cuisine-card, .story-card, .state-pill').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Newsletter
    document.querySelector('.newsletter-form button').addEventListener('click', function() {
      const input = document.querySelector('.newsletter-form input');
      if (input.value.includes('@')) {
        this.textContent = '✓ Subscribed!';
        this.style.background = '#1A5E2A';
        input.value = '';
        setTimeout(() => {
          this.textContent = 'Subscribe';
          this.style.background = '';
        }, 3000);
      }
    });
