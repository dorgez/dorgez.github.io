---
# the default layout is 'page'
icon: fa-solid fa-address-card
order: 2
---

<style>
/* Typewriter effect styling */
.typewriter-text {
  overflow: hidden;
  border-right: 0.08em solid #3498db; /* The cursor */
  white-space: nowrap;
  margin: 0;
  display: inline-block;
  animation: 
    typing 2.55s steps(40, end),
    blink-caret 0.75s step-end infinite;
}

/* The typing animation */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor animation */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color:rgb(247, 247, 247); }
}

/* Wrapper to contain the animated heading properly */
.typewriter-wrapper {
  display: inline-block;
  margin-bottom: 10px;
}

section {
  padding: 2rem 0;
  border-radius: 8px;
  margin-bottom: 3rem;
}

.highlight-section {
  padding-left: 1rem;
  border-left: 3px solid var(--accent);
}

  h1, h2, h3 {
  font-family: 'Montserrat', 'Raleway', sans-serif;
  font-weight: 600;
  }

  /* Adding custom styles that will apply within the Markdown */
  .feature-text {
    font-size: 22px;
    line-height: 1.6;
    margin: 0;
  }
  img {
  transition: transform 0.3s ease;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  }

  img:hover {
    transform: scale(1.10);
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
  p { font-size: 1.125rem; }
  .feature-text { font-size: 1.35rem; }
  .section-divider {
    border-top: 1px solid #292929;
    margin: 2rem 0;
  }

  p {
  max-width: 70ch; /* Roughly 70 characters per line */
  margin-left: auto;
  margin-right: auto;
  }

  .final-section {
    background-color: #292929;
    padding: 20px;
    border-radius: 8px;
    margin-top: 2rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  /* Ensuring responsive design works */
  @media (max-width: 768px) {
    .flex-container {
      flex-direction: column !important;
    }
    
    .flex-text, .flex-image {
      flex: 1 !important;
      width: 100% !important;
      margin-right: 0 !important;
      margin-bottom: 20px;
    }
  }
</style>

## Who I Am

<div style="display: flex; align-items: center; margin-bottom: 20px;" class="flex-container">
  <div style="flex: 1.3; margin-right: 20px; display: flex; align-items: center; height: 100%;" class="flex-text">
    <p class="feature-text">Water engineer, master diver, and data enthusiast. I build data-driven solutions for hydrology challenges and explore the underwater world whenever I can.</p>
  </div>
  <div style="flex: 0.7;" class="flex-image">
    <img src="../pictures/aboutme/cropped_image_enhanced.png" alt="Dor G" style="max-width: 100%; height: auto; border-radius: 50%;">
  </div>
</div>

<div class="section-divider"></div>

<h2>What I Do</h2>

<div style="display: flex; align-items: center; margin-bottom: 20px;" class="flex-container">
  <div style="flex: 0.7; margin-right: 20px;" class="flex-image">
    <img src="../pictures/aboutme/13228018933 (1).png" alt="At work" style="max-width: 100%; height: auto; border-radius: 8px;">
  </div>
  <div style="flex: 1.3;" class="flex-text">
    <p class="feature-text">I work as a hydrology consultant specializing in urban runoff management. On the side, I write Python, dive into data science, and share what I learn here.</p>
  </div>
</div>

<div class="section-divider"></div>

<div class="final-section">
  <h2>Today</h2>

  <p>Always exploring, always learning. Feel free to reach out if you want to collaborate or just talk water, code, or diving.</p>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Select all headings to animate
    const headings = document.querySelectorAll('h2');
    
    // Set up Intersection Observer for scroll-based animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // If the heading is now visible
        if (entry.isIntersecting) {
          // Get the heading element
          const heading = entry.target;
          
          // Only animate if it hasn't been animated yet
          if (!heading.classList.contains('animated')) {
            // Mark as animated
            heading.classList.add('animated');
            
            // Store original text
            const originalText = heading.textContent;
            heading.textContent = '';
            
            // Create animated elements
            const wrapper = document.createElement('div');
            wrapper.className = 'typewriter-wrapper';
            
            const typewriterSpan = document.createElement('span');
            typewriterSpan.className = 'typewriter-text';
            typewriterSpan.textContent = originalText;
            
            // Replace heading content with animated structure
            wrapper.appendChild(typewriterSpan);
            heading.appendChild(wrapper);
            
            // Stop observing this heading
            observer.unobserve(heading);
          }
        }
      });
    }, {
      // Start animation when heading is 20% visible
      threshold: 0.2
    });
    
    // Start observing each heading
    headings.forEach(heading => {
      observer.observe(heading);
    });
  });
</script>

</div>