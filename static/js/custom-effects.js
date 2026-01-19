/**
 * Custom JavaScript Effects for Hugo Blog
 * Add interactive behaviors and animations
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Initialize all effects
    initSmoothScroll();
    initImageZoom();
    initReadingProgress();
    initLazyLoad();
    initCopyButtons();
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Image zoom on click (lightbox effect)
   */
  function initImageZoom() {
    const images = document.querySelectorAll('.post-content img');
    
    images.forEach(img => {
      img.addEventListener('click', function() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          cursor: zoom-out;
        `;
        
        // Create zoomed image
        const zoomedImg = document.createElement('img');
        zoomedImg.src = this.src;
        zoomedImg.style.cssText = `
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        `;
        
        overlay.appendChild(zoomedImg);
        document.body.appendChild(overlay);
        
        // Close on click
        overlay.addEventListener('click', function() {
          document.body.removeChild(overlay);
        });
        
        // Close on Escape key
        const closeHandler = function(e) {
          if (e.key === 'Escape') {
            if (document.body.contains(overlay)) {
              document.body.removeChild(overlay);
            }
            document.removeEventListener('keydown', closeHandler);
          }
        };
        document.addEventListener('keydown', closeHandler);
      });
    });
  }

  /**
   * Reading progress indicator
   */
  function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: var(--primary, #4a9eff);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      progressBar.style.width = scrollPercent + '%';
    });
  }

  /**
   * Lazy loading for images (if not using native lazy loading)
   */
  function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  /**
   * Enhanced copy buttons for code blocks
   */
  function initCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
      const pre = block.parentElement;
      if (pre.querySelector('.copy-button')) return; // Already has button
      
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = 'Copy';
      button.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 4px 8px;
        background: var(--code-bg, #2d2d2d);
        color: var(--content, #ccc);
        border: 1px solid var(--border, #444);
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        opacity: 0;
        transition: opacity 0.2s;
      `;
      
      pre.style.position = 'relative';
      pre.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
      });
      pre.addEventListener('mouseleave', () => {
        button.style.opacity = '0';
      });
      
      button.addEventListener('click', async function() {
        const text = block.textContent;
        try {
          await navigator.clipboard.writeText(text);
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        } catch (err) {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        }
      });
      
      pre.appendChild(button);
    });
  }

  /**
   * Parallax effect for hero sections (optional)
   */
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  /**
   * Console easter egg
   */
  console.log('%c👋 Hello! Interested in the code? Check out the repo:', 'color: #4a9eff; font-size: 14px; font-weight: bold;');
  console.log('%chttps://github.com/damilojohn/damilojohn.github.io', 'color: #4a9eff; font-size: 12px;');

})();














