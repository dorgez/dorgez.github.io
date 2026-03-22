---
# the default layout is 'page'
icon: fa-solid fa-address-card
order: 2
---

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

/* Mono font for this page */
h1, h2, h3, p, .feature-text {
  font-family: 'Space Mono', monospace;
}

/* Typewriter cursor - same as portfolio */
.typewriter-cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background: #0077b6;
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: blink 0.8s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
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
  font-family: 'Space Mono', monospace;
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

<h2><span id="heading-1" style="color: #0077b6; font-weight: 600;"></span><span class="typewriter-cursor" id="cursor-1"></span></h2>

<div style="display: flex; align-items: center; margin-bottom: 20px;" class="flex-container">
  <div style="flex: 1.3; margin-right: 20px; display: flex; align-items: center; height: 100%;" class="flex-text">
    <p class="feature-text">Water engineer, master diver, and data enthusiast. I build data-driven solutions for hydrology challenges and explore the underwater world whenever I can.</p>
  </div>
  <div style="flex: 0.7;" class="flex-image">
    <img src="../pictures/aboutme/cropped_image_enhanced.png" alt="Dor G" style="max-width: 100%; height: auto; border-radius: 50%;">
  </div>
</div>

<div class="section-divider"></div>

<h2><span id="heading-2" style="color: #0077b6; font-weight: 600;"></span><span class="typewriter-cursor" id="cursor-2"></span></h2>

<div style="display: flex; align-items: center; margin-bottom: 20px;" class="flex-container">
  <div style="flex: 0.7; margin-right: 20px;" class="flex-image">
    <img src="../pictures/aboutme/13228018933 (1).png" alt="At work" style="max-width: 100%; height: auto; border-radius: 8px;">
  </div>
  <div style="flex: 1.3;" class="flex-text">
    <p class="feature-text">I work as a hydrology consultant specializing in urban runoff management. On the side, I write Python, dive into data science, and share what I learn here.</p>
  </div>
</div>

<div class="section-divider"></div>

<h2><span id="heading-3" style="color: #0077b6; font-weight: 600;"></span><span class="typewriter-cursor" id="cursor-3"></span></h2>

<div style="display: flex; align-items: center; margin-bottom: 20px;" class="flex-container">
  <div style="flex: 1.3; margin-right: 20px; display: flex; align-items: center; height: 100%;" class="flex-text">
    <p class="feature-text">Always exploring, always learning. Feel free to reach out if you want to collaborate or just talk water, code, or diving.</p>
  </div>
  <div style="flex: 0.7;" class="flex-image">
    <img src="../pictures/favicon_io/android-chrome-512x512.png" alt="Dor G" style="max-width: 100%; height: auto; border-radius: 50%;">
  </div>
</div>

<script>
  (function () {
    var headings = [
      { id: 'heading-1', cursor: 'cursor-1', text: 'Who I Am' },
      { id: 'heading-2', cursor: 'cursor-2', text: 'What I Do' },
      { id: 'heading-3', cursor: 'cursor-3', text: 'Today' }
    ];

    function typeText(el, cursorEl, text) {
      var i = 0;
      function type() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(type, 266);
        } else {
          cursorEl.style.display = 'none';
        }
      }
      type();
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          var config = headings.find(function (h) {
            return document.getElementById(h.id) === entry.target.querySelector('#' + h.id) ||
                   entry.target.contains(document.getElementById(h.id));
          });
          if (config) {
            var el = document.getElementById(config.id);
            var cursorEl = document.getElementById(config.cursor);
            typeText(el, cursorEl, config.text);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    headings.forEach(function (h) {
      var el = document.getElementById(h.id);
      if (el && el.closest('h2')) {
        observer.observe(el.closest('h2'));
      }
    });
  })();
</script>