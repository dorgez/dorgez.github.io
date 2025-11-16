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

## My Journey

<div style="display: flex; align-items: center; margin-bottom: 20px;" class="flex-container">
  <div style="flex: 1.3; margin-right: 20px; display: flex; align-items: center; height: 100%;" class="flex-text">
    <p class="feature-text">Before pursuing my water engineering degree, I embarked on an 8-month adventure across Southeast Asia. Traveling through Sri Lanka, India, Singapore, the Philippines, and Vietnam opened my eyes to different cultures and perspectives I couldn't have experienced any other way.</p>
  </div>
  <div style="flex: 0.7;" class="flex-image">
    <img src="../pictures/aboutme/cropped_image_enhanced.png" alt="Traveling in Southeast Asia" style="max-width: 100%; height: auto; border-radius: 50%;">
  </div>
</div>

During this journey, I discovered my passion for diving, particularly in the Philippines, where I challenged myself in some remarkable underwater environments. These experiences beneath the surface connected me to marine ecosystems in ways that continue to influence my perspective today.

Later, I pursued my water engineering degree, which despite the challenges of managing ADHD, allowed me to develop expertise in hydrology and environmental systems. This academic foundation has proven invaluable for my current work and ongoing interests.

<div class="section-divider"></div>

<h2> Growth Through Experience </h2>

<div style="display: flex; align-items: center; margin-bottom: 20px;" class="flex-container">
  <div style="flex: 0.7; margin-right: 20px;" class="flex-image">
    <img src="../pictures/aboutme/13228018933 (1).png" alt="Traveling in Southeast Asia" style="max-width: 100%; height: auto; border-radius: 8px;">
  </div>
  <div style="flex: 1.3;" class="flex-text">
    <p class="feature-text">Traveling solo across Southeast Asia pushed me well beyond my comfort zone. Each new location presented unique challenges that required adaptability and openness. The diving experiences in particular taught me to stay calm under pressure and appreciate the delicate balance of natural systems.</p>
  </div>
</div>

My academic journey presented different kinds of challenges. Working through a technical degree while managing ADHD showed me the power of persistence and helped me develop systems to tackle complex problems. This period opened doors to subjects I never expected would become central to my professional life.

These experiences—from traveling to diving to academic work—have shaped my approach to problem-solving and my appreciation for both technological and natural systems.

<div class="section-divider"></div>

## Where My Interests Meet Into This Website

This website is where my diverse interests converge. My childhood fascination with computers naturally evolved into my interest in coding and technology. My diving experiences fostered a deep connection to environmental conservation. My academic background in water engineering provides the technical foundation for my work in hydrology.

All these elements inform the content I share here—from technical articles to environmental perspectives, from productivity approaches to experiences in the field.

<div class="section-divider"></div>

<div class="final-section">
  <h2>Today</h2>

  <p>Currently, I work as a hydrology consultant specializing in runoff management for new construction in urban areas. This role allows me to apply my water engineering knowledge to practical challenges in sustainable development.</p>

  <p>Beyond my professional work, I continue to explore and share knowledge across my areas of interest: technology, diving, climate change, Python, hydrology, and productivity. This site serves as a platform where I can document these explorations and connect with others who share similar interests.</p>

  <p>I created this space not just to share information, but to build connections. Whether you're here for technical insights, environmental discussions, or simply exploring new ideas, I hope you'll find something valuable.</p>

  <p>I'm always open to collaboration and exchange of ideas, so feel free to contact me.</p>
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