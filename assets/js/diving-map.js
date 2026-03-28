document.addEventListener('DOMContentLoaded', function () {
  /* Read dive sites data from JSON in the page */
  var dataEl = document.getElementById('dive-sites-data');
  if (!dataEl) return;
  var diveSites;
  try { diveSites = JSON.parse(dataEl.textContent); } catch (e) { return; }
  if (!diveSites || !diveSites.length) return;

  /* Color map for dive types */
  var typeColors = {
    reef:   '#3AA99F',
    wreck:  '#DA702C',
    cave:   '#8B7EC8',
    lake:   '#4385BE',
    cenote: '#24837B',
    wall:   '#D0A215',
    drift:  '#879A39',
    shore:  '#CE5D97',
    muck:   '#6F6E69'
  };

  /* Dark/Light mode detection */
  function isDarkMode() {
    var mode = document.documentElement.getAttribute('data-mode');
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /* Tile layers */
  var darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19
  });

  var lightTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19
  });

  /* Init map */
  var currentTiles = isDarkMode() ? darkTiles : lightTiles;
  var map = L.map('dive-map', {
    zoomControl: false,
    layers: [currentTiles]
  }).setView([20, 40], 3);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  /* Theme switching */
  function swapTiles() {
    var dark = isDarkMode();
    var next = dark ? darkTiles : lightTiles;
    var prev = dark ? lightTiles : darkTiles;
    if (map.hasLayer(prev)) {
      map.removeLayer(prev);
      map.addLayer(next);
    }
  }

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.attributeName === 'data-mode') swapTiles();
    });
  });
  observer.observe(document.documentElement, { attributes: true });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', swapTiles);

  /* Create marker icon */
  function createIcon(type) {
    var color = typeColors[type] || '#4385BE';
    return L.divIcon({
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18],
      html: '<div class="dive-marker marker-drop" style="background:' + color + ';"><i class="fa-solid fa-location-dot"></i></div>'
    });
  }

  /* Build popup HTML */
  function buildPopup(ds) {
    var html = '';

    if (ds.image) {
      html += '<img class="popup-img" src="' + ds.image + '" alt="' + ds.name + '" loading="lazy">';
    }

    html += '<div class="popup-body">';

    html += '<div class="popup-title"><span>' + ds.name + '</span>';
    if (ds.rating > 0) {
      html += '<span class="popup-stars">';
      for (var i = 0; i < 5; i++) {
        html += i < ds.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
      }
      html += '</span>';
    }
    html += '</div>';

    if (ds.location) {
      html += '<div class="popup-location"><i class="fa-solid fa-map-pin"></i> ' + ds.location + '</div>';
    }

    html += '<hr class="popup-divider">';

    html += '<div class="popup-stats">';
    if (ds.maxDepth)   html += '<div>Depth <span>' + ds.maxDepth + 'm</span></div>';
    if (ds.waterTemp)  html += '<div>Temp <span>' + ds.waterTemp + '&deg;C</span></div>';
    if (ds.visibility) html += '<div>Vis <span>' + ds.visibility + 'm</span></div>';
    if (ds.type)       html += '<div>Type <span>' + ds.type.charAt(0).toUpperCase() + ds.type.slice(1) + '</span></div>';
    html += '</div>';

    if (ds.date) {
      html += '<div class="popup-date" style="margin-top:0.4rem;"><i class="fa-regular fa-calendar"></i> ' + ds.date + '</div>';
    }

    if (ds.description) {
      html += '<hr class="popup-divider">';
      html += '<p class="popup-desc">' + ds.description + '</p>';
    }

    if (ds.blogPost) {
      html += '<a class="popup-link" href="' + ds.blogPost + '">Read Blog Post <i class="fa-solid fa-arrow-right"></i></a>';
    }

    html += '</div>';
    return html;
  }

  /* Add markers */
  var clusterGroup = L.markerClusterGroup({
    maxClusterRadius: 50,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false
  });

  var allMarkers = [];
  var bounds = [];

  diveSites.forEach(function (ds, i) {
    var marker = L.marker([ds.lat, ds.lng], {
      icon: createIcon(ds.type)
    });

    marker.bindPopup(buildPopup(ds), { maxWidth: 300, minWidth: 220 });
    marker.siteData = ds;

    marker.on('click', function () {
      map.flyTo([ds.lat, ds.lng], Math.max(map.getZoom(), 10), { duration: 0.8 });
      var el = this.getElement();
      if (el) {
        var icon = el.querySelector('.dive-marker');
        if (icon) {
          icon.classList.remove('ripple');
          void icon.offsetWidth;
          icon.classList.add('ripple');
        }
      }
    });

    marker.on('add', function () {
      var el = this.getElement();
      if (el) {
        var icon = el.querySelector('.dive-marker');
        if (icon) {
          icon.style.animationDelay = (i * 0.1) + 's';
        }
      }
    });

    allMarkers.push(marker);
    clusterGroup.addLayer(marker);
    bounds.push([ds.lat, ds.lng]);
  });

  map.addLayer(clusterGroup);

  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
  }

  /* Filtering */
  var filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var type = this.getAttribute('data-type');
      var color = typeColors[type] || '#4385BE';

      filterBtns.forEach(function (b) {
        b.classList.remove('active');
        b.style.background = '';
        b.style.color = '';
        b.style.borderColor = '';
      });
      this.classList.add('active');
      if (type === 'all') {
        this.style.background = '#4385BE';
        this.style.color = '#fff';
        this.style.borderColor = '#4385BE';
      } else {
        this.style.background = color;
        this.style.color = '#fff';
        this.style.borderColor = color;
      }

      clusterGroup.clearLayers();
      var filteredBounds = [];

      allMarkers.forEach(function (marker) {
        if (type === 'all' || marker.siteData.type === type) {
          clusterGroup.addLayer(marker);
          filteredBounds.push([marker.siteData.lat, marker.siteData.lng]);
        }
      });

      if (filteredBounds.length > 0) {
        map.flyToBounds(filteredBounds, { padding: [40, 40], maxZoom: 12, duration: 0.6 });
      }
    });
  });

  /* Stats count-up animation */
  function animateCountUp() {
    document.querySelectorAll('.stat-number[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target) || target === 0) { el.textContent = '0'; return; }
      var startTime = null;
      var duration = 1500;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(step);
    });
  }

  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCountUp();
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  var statsEl = document.querySelector('.dive-stats');
  if (statsEl) statsObserver.observe(statsEl);

  /* Fix map size after container animation */
  setTimeout(function () { map.invalidateSize(); }, 1200);
});
