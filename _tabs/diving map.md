---
layout: page
icon: fa-solid fa-earth-asia
order: 5
leaflet: true
---

<style>
@font-face {
  font-family: 'Commit Mono';
  src: url('/assets/fonts/CommitMono VariableFont.woff2') format('woff2');
  font-style: normal;
  font-display: swap;
}

/* ── Stats Dashboard ── */
.dive-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  border-radius: 10px;
  padding: 1.2rem 1rem;
  text-align: center;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
}

.stat-card .stat-icon {
  font-size: 1.4rem;
  color: #4385BE;
  margin-bottom: 0.4rem;
}

.stat-card .stat-number {
  font-family: 'Commit Mono', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: var(--heading-color);
  line-height: 1.2;
}

.stat-card .stat-label {
  font-family: 'Commit Mono', monospace;
  font-size: 0.75rem;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ── Filter Bar ── */
.dive-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
}

.filter-btn {
  font-family: 'Commit Mono', monospace;
  font-size: 0.75rem;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  border: 1.5px solid var(--main-border-color);
  background: var(--card-bg);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.filter-btn .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.filter-btn:hover {
  background: var(--card-hover-bg);
}

.filter-btn.active {
  color: #fff;
  border-color: transparent;
}

.filter-btn.active .dot {
  background: rgba(255,255,255,0.6) !important;
}

/* ── Map Container ── */
.map-wrap {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  opacity: 0;
  transform: scale(0.98);
  animation: mapFadeIn 0.8s ease 0.3s forwards;
}

#dive-map {
  height: 65vh;
  width: 100%;
  background: var(--card-bg);
  z-index: 1;
}

@keyframes mapFadeIn {
  to { opacity: 1; transform: scale(1); }
}

/* ── Custom Markers ── */
.dive-marker {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transition: transform 0.2s ease;
  position: relative;
}

.dive-marker:hover {
  transform: scale(1.2);
}

/* Marker drop-in animation */
.marker-drop {
  animation: markerDrop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}

@keyframes markerDrop {
  0% { opacity: 0; transform: translateY(-30px) scale(0.5); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

/* Ripple on click */
.dive-marker::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid currentColor;
  opacity: 0;
  pointer-events: none;
}

.dive-marker.ripple::after {
  animation: rippleOut 0.6s ease-out;
}

@keyframes rippleOut {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.5); opacity: 0; }
}

/* Pulse on hover */
.dive-marker::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: inherit;
  opacity: 0;
  z-index: -1;
  pointer-events: none;
}

.dive-marker:hover::before {
  animation: pulse 1.2s ease-out infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.4; }
  100% { transform: scale(2); opacity: 0; }
}

/* ── Cluster Overrides ── */
.marker-cluster-small,
.marker-cluster-medium,
.marker-cluster-large {
  background: rgba(67, 133, 190, 0.25) !important;
}

.marker-cluster-small div,
.marker-cluster-medium div,
.marker-cluster-large div {
  background: #4385BE !important;
  color: #fff !important;
  font-family: 'Commit Mono', monospace;
  font-weight: 600;
}

.marker-cluster-medium {
  background: rgba(67, 133, 190, 0.35) !important;
}

.marker-cluster-large {
  background: rgba(67, 133, 190, 0.5) !important;
}

/* ── Popup Overrides ── */
.leaflet-popup-content-wrapper {
  background: var(--card-bg) !important;
  color: var(--text-color) !important;
  box-shadow: var(--card-shadow) !important;
  border-radius: 10px !important;
  border: 1px solid var(--main-border-color) !important;
  padding: 0 !important;
  overflow: hidden;
}

.leaflet-popup-tip {
  background: var(--card-bg) !important;
  border: 1px solid var(--main-border-color) !important;
  box-shadow: none !important;
}

.leaflet-popup-content {
  margin: 0 !important;
  font-size: 0.85rem;
  line-height: 1.5;
  min-width: 240px;
}

.popup-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
}

.popup-body {
  padding: 0.9rem 1rem;
}

.popup-title {
  font-family: 'Commit Mono', monospace;
  font-size: 1rem;
  font-weight: 700;
  color: var(--heading-color);
  margin: 0 0 0.15rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup-location {
  font-size: 0.78rem;
  color: var(--text-muted-color);
  margin-bottom: 0.6rem;
}

.popup-divider {
  border: none;
  border-top: 1px solid var(--main-border-color);
  margin: 0.5rem 0;
}

.popup-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem 1rem;
  font-family: 'Commit Mono', monospace;
  font-size: 0.75rem;
  color: var(--text-muted-color);
}

.popup-stats span {
  color: var(--text-color);
  font-weight: 600;
}

.popup-desc {
  font-size: 0.8rem;
  color: var(--text-color);
  margin: 0;
  line-height: 1.5;
}

.popup-link {
  display: inline-block;
  margin-top: 0.5rem;
  font-family: 'Commit Mono', monospace;
  font-size: 0.78rem;
  color: var(--link-color);
  text-decoration: none;
  font-weight: 600;
}

.popup-link:hover {
  text-decoration: underline;
}

.popup-stars {
  color: #D0A215;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.popup-date {
  font-family: 'Commit Mono', monospace;
  font-size: 0.72rem;
  color: var(--text-muted-color);
}

/* ── Leaflet controls theme ── */
.leaflet-control-zoom a {
  background: var(--card-bg) !important;
  color: var(--text-color) !important;
  border-color: var(--main-border-color) !important;
}

.leaflet-control-zoom a:hover {
  background: var(--card-hover-bg) !important;
}

.leaflet-control-attribution {
  background: var(--card-bg) !important;
  color: var(--text-muted-color) !important;
  font-size: 0.65rem !important;
}

.leaflet-control-attribution a {
  color: var(--link-color) !important;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .dive-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
  }

  .stat-card {
    padding: 0.8rem 0.6rem;
  }

  .stat-card .stat-number {
    font-size: 1.5rem;
  }

  .dive-filters {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .dive-filters::-webkit-scrollbar {
    display: none;
  }

  .filter-btn {
    white-space: nowrap;
    flex-shrink: 0;
  }

  #dive-map {
    height: 50vh;
  }
}
</style>

<!-- ── Stats Dashboard ── -->
{% assign all_sites = site.data.dive_sites.sites %}
{% assign total_sites = all_sites | size %}
{% assign countries = all_sites | map: "country" | compact | uniq %}
{% assign country_count = countries | size %}
{% assign depths = all_sites | map: "max_depth_m" | compact | sort %}
{% assign deepest = depths | last | default: 0 %}
{% assign types = all_sites | map: "type" | compact | uniq %}
{% assign type_count = types | size %}

<div class="dive-stats">
  <div class="stat-card">
    <div class="stat-icon"><i class="fa-solid fa-location-dot"></i></div>
    <div class="stat-number" data-count="{{ total_sites }}">0</div>
    <div class="stat-label">Dive Sites</div>
  </div>
  <div class="stat-card">
    <div class="stat-icon"><i class="fa-solid fa-earth-americas"></i></div>
    <div class="stat-number" data-count="{{ country_count }}">0</div>
    <div class="stat-label">Countries</div>
  </div>
  <div class="stat-card">
    <div class="stat-icon"><i class="fa-solid fa-arrow-down-long"></i></div>
    <div class="stat-number" data-count="{{ deepest }}">0</div>
    <div class="stat-label">Deepest (m)</div>
  </div>
  <div class="stat-card">
    <div class="stat-icon"><i class="fa-solid fa-layer-group"></i></div>
    <div class="stat-number" data-count="{{ type_count }}">0</div>
    <div class="stat-label">Dive Types</div>
  </div>
</div>

<!-- ── Filter Bar ── -->
<div class="dive-filters">
  <button class="filter-btn active" data-type="all" style="border-color: #4385BE; background: #4385BE; color: #fff;">All</button>
  <button class="filter-btn" data-type="reef"><span class="dot" style="background:#3AA99F;"></span>Reef</button>
  <button class="filter-btn" data-type="wreck"><span class="dot" style="background:#DA702C;"></span>Wreck</button>
  <button class="filter-btn" data-type="cave"><span class="dot" style="background:#8B7EC8;"></span>Cave</button>
  <button class="filter-btn" data-type="lake"><span class="dot" style="background:#4385BE;"></span>Lake</button>
  <button class="filter-btn" data-type="cenote"><span class="dot" style="background:#24837B;"></span>Cenote</button>
  <button class="filter-btn" data-type="wall"><span class="dot" style="background:#D0A215;"></span>Wall</button>
  <button class="filter-btn" data-type="drift"><span class="dot" style="background:#879A39;"></span>Drift</button>
  <button class="filter-btn" data-type="shore"><span class="dot" style="background:#CE5D97;"></span>Shore</button>
  <button class="filter-btn" data-type="muck"><span class="dot" style="background:#6F6E69;"></span>Muck</button>
</div>

<!-- ── Map ── -->
<div class="map-wrap">
  <div id="dive-map"></div>
</div>

<!-- ── Data from YAML (as JSON, read by diving-map.js) ── -->
<script type="application/json" id="dive-sites-data">
[{% for ds in site.data.dive_sites.sites %}{"name":{{ ds.name | jsonify }},"location":{{ ds.location | default: "" | jsonify }},"country":{{ ds.country | default: "" | jsonify }},"lat":{{ ds.lat }},"lng":{{ ds.lng }},"date":{{ ds.date | jsonify }},"maxDepth":{{ ds.max_depth_m | default: 0 }},"waterTemp":{{ ds.water_temp_c | default: 0 }},"visibility":{{ ds.visibility_m | default: 0 }},"type":{{ ds.type | default: "reef" | jsonify }},"rating":{{ ds.rating | default: 0 }},"description":{{ ds.description | default: "" | jsonify }},"blogPost":{{ ds.blog_post | default: "" | jsonify }},"image":{{ ds.image | default: "" | jsonify }}}{% unless forloop.last %},{% endunless %}{% endfor %}]
</script>
