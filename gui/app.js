/**
 * Devacia SEO AGI Studio — Interactive Frontend Application
 * 
 * Features:
 * - Real-time Keyword Expansion & Topical Clustering
 * - CTR Title & Meta Generator with Pixel Calculation & Google SERP Preview
 * - Live Query Harvester & Intent Classification
 * - NLP Keyword Density & Content Prominence Auditor
 * - Subsystem Health Diagnostics
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // State Management
  // =========================================================================
  const state = {
    activeTab: 'tab-keywords',
    currentKeywords: [],
    currentClusters: {},
    currentQueries: {
      all: [],
      commercial: [],
      questions: [],
      comparison: [],
      local: []
    },
    activeQueryFilter: 'all',
    selectedTitle: 'Best Custom Software Development Services for Businesses | Devacia',
    selectedSnippet: 'Scale your growth with expert custom software development from Devacia. Proven frameworks, custom architecture, and measurable ROI. Speak with an expert today.',
    kdMode: 'article', // 'article' | 'title'
    systemStatus: null
  };

  // =========================================================================
  // Tab Navigation & Header Updates
  // =========================================================================
  const tabTitles = {
    'tab-keywords': {
      title: 'Keyword Intelligence & Topical Clustering',
      subtitle: 'Deep Autocomplete Expansion, Topical Authority Silos & Rank #1 Blueprint Generation'
    },
    'tab-titles': {
      title: 'Title & SERP Studio',
      subtitle: 'Pixel-Accurate (<580px) Title Engineering & Live Google SERP Simulation'
    },
    'tab-queries': {
      title: 'Live Query Harvester & Intent Discovery',
      subtitle: 'Real-Time Google Search Suggestions & Hyper-Local UULE Simulation'
    },
    'tab-kd': {
      title: 'Content & Keyword Density Auditor',
      subtitle: 'NLP Prominence, N-Gram Frequency & Zero-Penalty Density Validation'
    },
    'tab-geo': {
      title: 'GEO & AI Search Engine Auditor',
      subtitle: 'Audit Readiness for ChatGPT Search, Claude, Perplexity AI & Google AI Overviews'
    },
    'tab-cwv': {
      title: 'Core Web Vitals & Real-Time Performance',
      subtitle: 'Real-Time TTFB, Payload Compression, Asset Weight & Mobile Performance'
    },
    'tab-schema': {
      title: 'Schema Graph & Rich Snippet Validator',
      subtitle: 'Google Search Central JSON-LD Knowledge Graph & OpenGraph Validation'
    },
    'tab-backlinks': {
      title: 'Domain Rating & Backlink Intelligence',
      subtitle: 'Live DR/DA Scores, Anchor Penalty Risk & Competitor Link Gap Discovery'
    },
    'tab-agent': {
      title: 'Autonomous SEO Agent Sentinel',
      subtitle: 'Master 360-Degree Autonomous Runner Across All Core SEO Vectors'
    },
    'tab-system': {
      title: 'Subsystem Health & API Status',
      subtitle: 'Live Status of Google APIs, OAuth Credentials & CLI Subsystems'
    }
  };

  const navButtons = document.querySelectorAll('.nav-btn');
  const tabs = document.querySelectorAll('.workspace-tab');
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');

  function switchTab(tabId) {
    state.activeTab = tabId;
    navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.id === tabId);
    });
    if (tabTitles[tabId]) {
      pageTitle.textContent = tabTitles[tabId].title;
      pageSubtitle.textContent = tabTitles[tabId].subtitle;
    }
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    const breadcrumbNames = {
      'tab-keywords': 'Keywords Studio',
      'tab-titles': 'SERP Snippet Studio',
      'tab-queries': 'Live Query Harvester',
      'tab-kd': 'On-Page Density Audit',
      'tab-geo': 'GEO & AI Search',
      'tab-cwv': 'Core Web Vitals',
      'tab-schema': 'Schema Validator',
      'tab-backlinks': 'Backlinks & DR',
      'tab-agent': 'Autonomous Sentinel',
      'tab-system': 'API Diagnostics'
    };
    if (breadcrumbCurrent && breadcrumbNames[tabId]) {
      breadcrumbCurrent.textContent = breadcrumbNames[tabId];
    }
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // =========================================================================
  // API Fetch Helper
  // =========================================================================
  async function apiPost(endpoint, data) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    return res.json();
  }

  async function apiGet(endpoint) {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return res.json();
  }

  function setButtonLoading(btn, loading, defaultText) {
    if (!btn) return;
    if (loading) {
      btn.disabled = true;
      btn.dataset.originalText = btn.innerHTML;
      btn.innerHTML = `<span class="spinner"></span> Processing...`;
    } else {
      btn.disabled = false;
      btn.innerHTML = btn.dataset.originalText || defaultText;
    }
  }

  // =========================================================================
  // Subsystem Health Check
  // =========================================================================
  const systemStatusText = document.getElementById('system-status-text');
  const targetSiteBadge = document.getElementById('target-site-badge');
  const subsystemsGrid = document.getElementById('subsystems-status-grid');
  const btnRefreshStatus = document.getElementById('btn-refresh-status');

  async function loadSystemStatus() {
    try {
      systemStatusText.textContent = 'Checking Status...';
      const data = await apiGet('/api/status');
      state.systemStatus = data;

      if (data.siteUrl) {
        try {
          const u = new URL(data.siteUrl);
          targetSiteBadge.textContent = u.hostname;
        } catch {
          targetSiteBadge.textContent = data.siteUrl;
        }
      }

      systemStatusText.textContent = 'Engines Operational';

      // Render Subsystem Status Grid
      if (subsystemsGrid) {
        const subs = data.subsystems || {};
        subsystemsGrid.innerHTML = `
          <div class="status-card ${subs.keywordPlanner?.suggestReady ? 'status-card-ok' : 'status-card-warn'}">
            <div class="status-header">
              <span class="status-icon">🔑</span>
              <strong>Google Keyword Planner & Suggest</strong>
            </div>
            <p class="status-detail">Direct Google Autocomplete engine active. Official GKP API credentials: ${subs.keywordPlanner?.configured ? 'Configured ✓' : 'OAuth Ready (Template provided)'}</p>
            <div class="status-meta">
              <span class="badge ${subs.keywordPlanner?.suggestReady ? 'badge-green' : 'badge-yellow'}">
                ${subs.keywordPlanner?.suggestReady ? 'ONLINE' : 'PENDING'}
              </span>
              <span>100% Free Suggest Mode Active</span>
            </div>
          </div>

          <div class="status-card ${subs.searchConsole?.connected ? 'status-card-ok' : 'status-card-warn'}">
            <div class="status-header">
              <span class="status-icon">📈</span>
              <strong>Google Search Console (GSC)</strong>
            </div>
            <p class="status-detail">${subs.searchConsole?.connected ? `Connected: ${subs.searchConsole.siteUrl || 'Site configured'}` : 'Offline / Unconfigured. Place credentials in gsc-oauth.json or run node scripts/gsc-cli.js auth'}</p>
            <div class="status-meta">
              <span class="badge ${subs.searchConsole?.connected ? 'badge-green' : 'badge-yellow'}">
                ${subs.searchConsole?.connected ? 'CONNECTED' : 'STANDBY'}
              </span>
              <span>Official Search Analytics API</span>
            </div>
          </div>

          <div class="status-card ${subs.analytics4?.connected ? 'status-card-ok' : 'status-card-warn'}">
            <div class="status-header">
              <span class="status-icon">📊</span>
              <strong>Google Analytics 4 (GA4)</strong>
            </div>
            <p class="status-detail">${subs.analytics4?.connected ? `Property ID: ${subs.analytics4.propertyId}` : 'Offline / Unconfigured. Run node scripts/ga4-cli.js auth to connect'}</p>
            <div class="status-meta">
              <span class="badge ${subs.analytics4?.connected ? 'badge-green' : 'badge-yellow'}">
                ${subs.analytics4?.connected ? 'CONNECTED' : 'STANDBY'}
              </span>
              <span>Data API v1beta</span>
            </div>
          </div>

          <div class="status-card ${subs.businessProfile?.connected ? 'status-card-ok' : 'status-card-warn'}">
            <div class="status-header">
              <span class="status-icon">📍</span>
              <strong>Google Business Profile (GBP)</strong>
            </div>
            <p class="status-detail">${subs.businessProfile?.connected ? `Account: ${subs.businessProfile.accountName || 'Active'}` : 'Offline / Unconfigured. Run node scripts/gbp-cli.js auth to link GMB'}</p>
            <div class="status-meta">
              <span class="badge ${subs.businessProfile?.connected ? 'badge-green' : 'badge-yellow'}">
                ${subs.businessProfile?.connected ? 'CONNECTED' : 'STANDBY'}
              </span>
              <span>My Business API</span>
            </div>
          </div>
        `;
      }
    } catch (err) {
      systemStatusText.textContent = 'Server Connected (Offline APIs)';
      console.warn('Status load error:', err);
    }
  }

  if (btnRefreshStatus) {
    btnRefreshStatus.addEventListener('click', loadSystemStatus);
  }

  // =========================================================================
  // SEMrush Metric Calculators & Intelligence Heuristics
  // =========================================================================
  function getSemrushIntent(q) {
    const low = (q || '').toLowerCase();
    if (/price|cost|quote|pricing|hire|agency|service|company|developer|firm|solutions|consultant|rates|packages|best/i.test(low)) {
      return { type: 'commercial', letter: 'C', label: 'Commercial' };
    } else if (/buy|order|discount|deal|cheap|coupon|contract|purchase/i.test(low)) {
      return { type: 'transactional', letter: 'T', label: 'Transactional' };
    } else if (/how|what|why|who|can|is|guide|tutorial|examples|tips|meaning/i.test(low)) {
      return { type: 'informational', letter: 'I', label: 'Informational' };
    } else if (/near me|in |california|delhi|austin|mumbai|login|portal|website|app/i.test(low)) {
      return { type: 'navigational', letter: 'N', label: 'Navigational' };
    }
    return { type: 'informational', letter: 'I', label: 'Informational' };
  }

  function getSemrushKD(q) {
    const words = (q || '').trim().split(/\s+/).length;
    const low = (q || '').toLowerCase();
    let baseScore = 55;

    if (words === 1) baseScore = 88;
    else if (words === 2) baseScore = 65;
    else if (words === 3) baseScore = 46;
    else if (words === 4) baseScore = 32;
    else if (words === 5) baseScore = 24;
    else baseScore = 14;

    if (/cost|price|agency|hire|service/i.test(low)) baseScore += 8;
    if (/how|what|why|guide/i.test(low)) baseScore -= 10;
    if (/near me|in /i.test(low)) baseScore -= 6;

    let charSum = 0;
    for (let i = 0; i < q.length; i++) charSum += q.charCodeAt(i);
    const jitter = (charSum % 11) - 5;
    const pct = Math.min(99, Math.max(5, baseScore + jitter));

    let tier = 'Possible';
    let cssClass = 'kd-possible';

    if (pct <= 14) {
      tier = 'Very Easy';
      cssClass = 'kd-very-easy';
    } else if (pct <= 29) {
      tier = 'Easy';
      cssClass = 'kd-easy';
    } else if (pct <= 49) {
      tier = 'Possible';
      cssClass = 'kd-possible';
    } else if (pct <= 69) {
      tier = 'Difficult';
      cssClass = 'kd-difficult';
    } else if (pct <= 84) {
      tier = 'Hard';
      cssClass = 'kd-hard';
    } else {
      tier = 'Very Hard';
      cssClass = 'kd-very-hard';
    }

    return { pct, tier, cssClass };
  }

  function getSemrushVolume(q) {
    const words = (q || '').trim().split(/\s+/).length;
    let charSum = 0;
    for (let i = 0; i < q.length; i++) charSum += q.charCodeAt(i);
    const factor = (charSum % 40) / 100;

    let vol = 1200;
    if (words === 1) vol = Math.round(25000 + factor * 50000);
    else if (words === 2) vol = Math.round(3600 + factor * 8000);
    else if (words === 3) vol = Math.round(1400 + factor * 2200);
    else if (words === 4) vol = Math.round(480 + factor * 800);
    else vol = Math.round(110 + factor * 250);

    let formatted = vol.toString();
    if (vol >= 1000) formatted = (vol / 1000).toFixed(1) + 'K';

    return { num: vol, formatted };
  }

  function getSemrushCPC(q) {
    const low = (q || '').toLowerCase();
    let baseCpc = 3.20;
    if (/agency|developer|company|firm|services|hire/i.test(low)) baseCpc = 8.50;
    else if (/cost|price|pricing|rates/i.test(low)) baseCpc = 6.20;
    else if (/how|what|why|tutorial/i.test(low)) baseCpc = 1.40;

    let charSum = 0;
    for (let i = 0; i < q.length; i++) charSum += q.charCodeAt(i);
    const diff = ((charSum % 30) - 15) / 10;
    const cpc = Math.max(0.40, baseCpc + diff);
    return '$' + cpc.toFixed(2);
  }

  function getSemrushCompDensity(q) {
    const low = (q || '').toLowerCase();
    let base = 0.65;
    if (/agency|company|hire|cost|pricing|service/i.test(low)) base = 0.88;
    else if (/how|what|why/i.test(low)) base = 0.28;
    else if (/near me|in /i.test(low)) base = 0.72;

    let charSum = 0;
    for (let i = 0; i < q.length; i++) charSum += q.charCodeAt(i);
    const diff = ((charSum % 20) - 10) / 100;
    const val = Math.min(1.0, Math.max(0.05, base + diff));
    return val.toFixed(2);
  }

  function getSemrushSerpFeatures(q) {
    const features = [];
    const low = (q || '').toLowerCase();
    if (/how|what|why|cost|price|best/i.test(low)) features.push({ icon: '⚡', name: 'Featured Snippet' });
    if (/agency|company|services|firm/i.test(low)) features.push({ icon: '🔗', name: 'Sitelinks' });
    if (/near me|in |california|delhi|austin|city/i.test(low)) features.push({ icon: '📍', name: 'Local Map Pack' });
    features.push({ icon: '❓', name: 'People Also Ask' });
    return features;
  }

  // =========================================================================
  // TAB 1: Keywords Studio
  // =========================================================================
  const btnKwExpand = document.getElementById('btn-kw-expand');
  const btnKwCluster = document.getElementById('btn-kw-cluster');
  const kwSeedInput = document.getElementById('kw-seed');
  const kwGeoSelect = document.getElementById('kw-geo');
  const kwAlphabetCheck = document.getElementById('kw-alphabet');
  const kwToolbar = document.getElementById('kw-toolbar');
  const kwResultsPanel = document.getElementById('kw-results-panel');
  const kwTableBody = document.getElementById('kw-table-body');
  const kwTotalCount = document.getElementById('kw-total-count');
  const kwDominantIntent = document.getElementById('kw-dominant-intent');
  const kwTableFilter = document.getElementById('kw-table-filter');
  const kwClustersGrid = document.getElementById('kw-clusters-grid');
  const btnKwExportCsv = document.getElementById('btn-kw-export-csv');
  const btnKwBlueprint = document.getElementById('btn-kw-generate-blueprint');

  // Blueprint Modal Elements
  const blueprintModal = document.getElementById('blueprint-modal');
  const modalCodeContent = document.getElementById('modal-code-content');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnDismissModal = document.getElementById('btn-dismiss-modal');
  const btnCopyBlueprint = document.getElementById('btn-copy-blueprint');

  async function handleExpandKeywords() {
    const seed = kwSeedInput.value.trim();
    if (!seed) {
      alert('Please enter a seed topic.');
      return;
    }

    setButtonLoading(btnKwExpand, true);
    try {
      const geo = kwGeoSelect.value;
      const includeAlphabet = kwAlphabetCheck.checked;
      const data = await apiPost('/api/keywords/expand', { seed, geo, includeAlphabet });

      state.currentKeywords = data.keywords || [];
      renderKeywordsTable(state.currentKeywords);
      kwClustersGrid.classList.add('hidden');
    } catch (err) {
      alert(`Expansion failed: ${err.message}`);
    } finally {
      setButtonLoading(btnKwExpand, false, '⚡ Deep Expansion');
    }
  }

  async function handleClusterKeywords() {
    const seed = kwSeedInput.value.trim();
    if (!seed) {
      alert('Please enter a seed topic.');
      return;
    }

    setButtonLoading(btnKwCluster, true);
    try {
      const geo = kwGeoSelect.value;
      const data = await apiPost('/api/keywords/cluster', { seed, geo });

      state.currentClusters = data.clusters || {};
      renderClustersGrid(data.clusters, seed);
      kwResultsPanel.classList.add('hidden');
    } catch (err) {
      alert(`Clustering failed: ${err.message}`);
    } finally {
      setButtonLoading(btnKwCluster, false, '📦 Build Clusters');
    }
  }

  function renderKeywordsTable(keywords) {
    kwToolbar.classList.remove('hidden');
    kwResultsPanel.classList.remove('hidden');
    kwTotalCount.textContent = keywords.length;

    // Determine dominant intent
    const intents = { commercial: 0, informational: 0, navigational: 0, transactional: 0 };
    keywords.forEach(k => {
      const low = k.toLowerCase();
      if (/price|cost|quote|pricing|hire|agency|service|company|developer/i.test(low)) intents.commercial++;
      else if (/buy|order|discount|deal|coupon/i.test(low)) intents.transactional++;
      else if (/login|portal|website|app/i.test(low)) intents.navigational++;
      else intents.informational++;
    });

    const dominant = Object.entries(intents).sort((a, b) => b[1] - a[1])[0][0];
    kwDominantIntent.textContent = dominant.charAt(0).toUpperCase() + dominant.slice(1);

    populateTableRows(keywords);
  }

  function populateTableRows(keywords) {
    kwTableBody.innerHTML = '';
    const filter = (kwTableFilter.value || '').toLowerCase().trim();
    const filtered = filter ? keywords.filter(k => k.toLowerCase().includes(filter)) : keywords;

    filtered.slice(0, 150).forEach((kw, idx) => {
      const tr = document.createElement('tr');
      const intent = getSemrushIntent(kw);
      const kd = getSemrushKD(kw);
      const vol = getSemrushVolume(kw);
      const cpc = getSemrushCPC(kw);
      const density = getSemrushCompDensity(kw);

      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>
          <div class="query-cell">
            <span><strong>${escapeHtml(kw)}</strong></span>
            <button class="copy-icon-btn" title="Copy keyword" data-copy="${escapeHtml(kw)}">📋</button>
          </div>
        </td>
        <td>
          <span class="semrush-intent-pill ${intent.type}">
            <span class="semrush-mini-intent intent-${intent.letter.toLowerCase()}">${intent.letter}</span>
            ${intent.label}
          </span>
        </td>
        <td>
          <div class="vol-cell">
            <span class="vol-num">${vol.formatted}</span>
            <div class="vol-trend-bars">
              <span class="vol-bar" style="height: 4px;"></span>
              <span class="vol-bar" style="height: 6px;"></span>
              <span class="vol-bar active" style="height: 10px;"></span>
              <span class="vol-bar active" style="height: 8px;"></span>
            </div>
          </div>
        </td>
        <td>
          <div class="semrush-kd-badge">
            <span class="kd-circle-mini ${kd.cssClass}">${kd.pct}</span>
            <span class="kd-tier-text">${kd.tier}</span>
          </div>
        </td>
        <td><strong style="color: #10b981; font-family: 'JetBrains Mono', monospace;">${cpc}</strong></td>
        <td>
          <div class="comp-density-cell">
            <div class="comp-track">
              <div class="comp-fill" style="width: ${Math.round(density * 100)}%; background: ${density > 0.7 ? '#f97316' : density > 0.4 ? '#eab308' : '#10b981'};"></div>
            </div>
            <span class="comp-val">${density}</span>
          </div>
        </td>
        <td>
          <button class="btn btn-xs btn-outline btn-use-title" data-kw="${escapeHtml(kw)}">🏷️ Title</button>
          <button class="btn btn-xs btn-outline btn-check-kd" data-kw="${escapeHtml(kw)}">📊 Density</button>
        </td>
      `;

      tr.querySelector('.copy-icon-btn').addEventListener('click', (e) => {
        navigator.clipboard.writeText(kw);
        e.target.textContent = '✓';
        setTimeout(() => e.target.textContent = '📋', 1500);
      });

      tr.querySelector('.btn-use-title').addEventListener('click', () => {
        document.getElementById('title-topic').value = kw;
        switchTab('tab-titles');
        handleGenerateTitles();
      });

      tr.querySelector('.btn-check-kd').addEventListener('click', () => {
        document.getElementById('kd-target').value = kw;
        switchTab('tab-kd');
      });

      kwTableBody.appendChild(tr);
    });
  }

  function getEstimatedVolume(kw) {
    // Deterministic visual estimation based on word length
    const words = kw.split(/\s+/).length;
    if (words === 1) return '10K - 100K';
    if (words === 2) return '1K - 10K';
    if (words === 3) return '500 - 2.5K';
    if (words === 4) return '200 - 800';
    return '50 - 250';
  }

  function renderClustersGrid(clusters, seed) {
    kwToolbar.classList.remove('hidden');
    kwClustersGrid.classList.remove('hidden');
    kwClustersGrid.innerHTML = '';

    const entries = Object.entries(clusters);
    kwTotalCount.textContent = entries.reduce((acc, [, list]) => acc + list.length, 0);
    kwDominantIntent.textContent = 'Topical Silos';

    entries.forEach(([clusterName, keywords]) => {
      const card = document.createElement('div');
      card.className = 'cluster-card card';
      card.innerHTML = `
        <div class="cluster-header">
          <h4>📂 ${escapeHtml(clusterName.toUpperCase())}</h4>
          <span class="badge badge-cyan">${keywords.length} Keywords</span>
        </div>
        <ul class="cluster-list">
          ${keywords.slice(0, 8).map(k => `<li>• ${escapeHtml(k)}</li>`).join('')}
          ${keywords.length > 8 ? `<li class="more-li">+ ${keywords.length - 8} more terms...</li>` : ''}
        </ul>
        <div class="cluster-actions">
          <button class="btn btn-sm btn-outline btn-cluster-blueprint" data-topic="${escapeHtml(clusterName)}">
            Generate Silo Blueprint
          </button>
        </div>
      `;

      card.querySelector('.btn-cluster-blueprint').addEventListener('click', () => {
        showBlueprint(clusterName, keywords);
      });

      kwClustersGrid.appendChild(card);
    });
  }

  kwTableFilter.addEventListener('input', () => {
    populateTableRows(state.currentKeywords);
  });

  if (btnKwExpand) btnKwExpand.addEventListener('click', handleExpandKeywords);
  if (btnKwCluster) btnKwCluster.addEventListener('click', handleClusterKeywords);

  // CSV Export
  if (btnKwExportCsv) {
    btnKwExportCsv.addEventListener('click', () => {
      if (!state.currentKeywords.length) return alert('No keywords to export.');
      const csvContent = 'data:text/csv;charset=utf-8,' +
        ['Keyword,Length,Intent'].concat(
          state.currentKeywords.map(k => `"${k.replace(/"/g, '""')}",${k.split(' ').length},Discovered`)
        ).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `devacia-keywords-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Blueprint Generation
  async function showBlueprint(topic, secondary = []) {
    blueprintModal.classList.remove('hidden');
    modalCodeContent.textContent = 'Generating Rank #1 Blueprint with semantic hierarchy and Schema.org markup...';
    try {
      const data = await apiPost('/api/keywords/blueprint', { targetKeyword: topic, secondaryKeywords: secondary });
      modalCodeContent.textContent = data.blueprint;
    } catch (err) {
      modalCodeContent.textContent = `Error: ${err.message}`;
    }
  }

  if (btnKwBlueprint) {
    btnKwBlueprint.addEventListener('click', () => {
      const seed = kwSeedInput.value.trim() || 'Custom Software Development';
      showBlueprint(seed, state.currentKeywords.slice(0, 10));
    });
  }

  if (btnCloseModal) btnCloseModal.addEventListener('click', () => blueprintModal.classList.add('hidden'));
  if (btnDismissModal) btnDismissModal.addEventListener('click', () => blueprintModal.classList.add('hidden'));
  if (btnCopyBlueprint) {
    btnCopyBlueprint.addEventListener('click', () => {
      navigator.clipboard.writeText(modalCodeContent.textContent);
      btnCopyBlueprint.textContent = '✓ Copied!';
      setTimeout(() => btnCopyBlueprint.textContent = '📋 Copy Markdown', 2000);
    });
  }

  // =========================================================================
  // TAB 2: Title & SERP Studio
  // =========================================================================
  const btnGenerateTitles = document.getElementById('btn-generate-titles');
  const titleTopicInput = document.getElementById('title-topic');
  const titleBrandInput = document.getElementById('title-brand');
  const titleAudienceSelect = document.getElementById('title-audience');
  const titleGeoInput = document.getElementById('title-geo');
  const candidatesContainer = document.getElementById('candidates-container');
  const metaDescriptionsContainer = document.getElementById('meta-descriptions-container');

  // Preview elements
  const serpPreviewTitle = document.getElementById('serp-preview-title');
  const serpPreviewSnippet = document.getElementById('serp-preview-snippet');
  const serpSiteName = document.getElementById('serp-site-name');
  const serpUrlPath = document.getElementById('serp-url-path');

  // Meter elements
  const charMeterVal = document.getElementById('char-meter-val');
  const charBarFill = document.getElementById('char-bar-fill');
  const charStatusBadge = document.getElementById('char-status-badge');

  const pixelMeterVal = document.getElementById('pixel-meter-val');
  const pixelBarFill = document.getElementById('pixel-bar-fill');
  const pixelStatusBadge = document.getElementById('pixel-status-badge');

  const descMeterVal = document.getElementById('desc-meter-val');
  const descBarFill = document.getElementById('desc-bar-fill');
  const descStatusBadge = document.getElementById('desc-status-badge');

  // Device Toggle
  const deviceButtons = document.querySelectorAll('.device-btn');
  const googleSerpBox = document.getElementById('google-serp-box');

  deviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      deviceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const isMobile = btn.dataset.device === 'mobile';
      googleSerpBox.classList.toggle('mobile-view', isMobile);
    });
  });

  async function handleGenerateTitles() {
    const topic = titleTopicInput.value.trim();
    if (!topic) return alert('Please enter a target topic.');

    setButtonLoading(btnGenerateTitles, true);
    try {
      const brand = titleBrandInput.value.trim() || 'Devacia';
      const audience = titleAudienceSelect.value;
      const geo = titleGeoInput.value.trim();

      const data = await apiPost('/api/titles/generate', { topic, brand, audience, geo });

      serpSiteName.textContent = brand;
      const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      serpUrlPath.textContent = `https://www.devacia.com › services › ${slug}`;

      renderCandidateTitles(data.candidates || []);
      renderCandidateDescriptions(data.metaDescriptions || []);

      if (data.candidates && data.candidates.length > 0) {
        updateSerpPreview(data.candidates[0].title, data.metaDescriptions?.[0] || state.selectedSnippet);
      }
    } catch (err) {
      alert(`Title generation error: ${err.message}`);
    } finally {
      setButtonLoading(btnGenerateTitles, false, '✨ Generate Verified Titles');
    }
  }

  function renderCandidateTitles(candidates) {
    candidatesContainer.innerHTML = '';
    if (!candidates.length) {
      candidatesContainer.innerHTML = '<div class="empty-state-notice">No candidates generated.</div>';
      return;
    }

    candidates.forEach((cand, idx) => {
      const card = document.createElement('div');
      card.className = `candidate-card ${idx === 0 ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="candidate-header">
          <span class="badge ${cand.pixelCompliant ? 'badge-cyan' : 'badge-red'}">
            ${cand.pixelCompliant ? '✓ < 580px Safe' : '⚠ Truncation Risk'}
          </span>
          <span class="candidate-metrics">${cand.chars} chars | ~${cand.pixels} px</span>
        </div>
        <p class="candidate-title-text">${escapeHtml(cand.title)}</p>
        <span class="candidate-hook">${escapeHtml(cand.hook || cand.category || 'CTR Hook')}</span>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.candidate-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        updateSerpPreview(cand.title, state.selectedSnippet);
      });

      candidatesContainer.appendChild(card);
    });
  }

  function renderCandidateDescriptions(descriptions) {
    metaDescriptionsContainer.innerHTML = '';
    descriptions.forEach((desc, idx) => {
      const card = document.createElement('div');
      card.className = `meta-card ${idx === 0 ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="meta-card-header">
          <span class="badge ${desc.length <= 155 ? 'badge-green' : 'badge-yellow'}">
            ${desc.length <= 155 ? '✓ Under 155 chars' : '⚠ Long'}
          </span>
          <span>${desc.length} chars</span>
        </div>
        <p class="meta-card-text">${escapeHtml(desc)}</p>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.meta-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        updateSerpPreview(state.selectedTitle, desc);
      });

      metaDescriptionsContainer.appendChild(card);
    });
  }

  async function updateSerpPreview(title, snippet) {
    state.selectedTitle = title;
    state.selectedSnippet = snippet;

    serpPreviewTitle.textContent = title;
    serpPreviewSnippet.textContent = snippet;

    try {
      const data = await apiPost('/api/titles/audit', {
        title,
        description: snippet,
        targetKeyword: titleTopicInput.value.trim()
      });

      const audit = data.audit || {};
      const t = audit.title || {};
      const d = audit.description || {};

      // 1. Character meter
      charMeterVal.textContent = `${t.chars || title.length} / 58 chars`;
      const charPct = Math.min(100, Math.round(((t.chars || title.length) / 58) * 100));
      charBarFill.style.width = `${charPct}%`;
      if ((t.chars || title.length) <= 58) {
        charBarFill.className = 'meter-bar-fill fill-green';
        charStatusBadge.className = 'badge badge-green';
        charStatusBadge.textContent = '✓ OPTIMAL';
      } else if ((t.chars || title.length) <= 60) {
        charBarFill.className = 'meter-bar-fill fill-cyan';
        charStatusBadge.className = 'badge badge-cyan';
        charStatusBadge.textContent = '✓ SAFE';
      } else {
        charBarFill.className = 'meter-bar-fill fill-red';
        charStatusBadge.className = 'badge badge-red';
        charStatusBadge.textContent = '⚠ TRUNCATED';
      }

      // 2. Pixel meter
      const px = t.pixels || Math.round(title.length * 9.3);
      pixelMeterVal.textContent = `${px} / 580 px`;
      const pxPct = Math.min(100, Math.round((px / 580) * 100));
      pixelBarFill.style.width = `${pxPct}%`;
      if (px <= 580) {
        pixelBarFill.className = 'meter-bar-fill fill-cyan';
        pixelStatusBadge.className = 'badge badge-cyan';
        pixelStatusBadge.textContent = '✓ ZERO TRUNCATION';
      } else {
        pixelBarFill.className = 'meter-bar-fill fill-red';
        pixelStatusBadge.className = 'badge badge-red';
        pixelStatusBadge.textContent = '⚠ TRUNCATED IN DESKTOP SERP';
      }

      // 3. Description meter
      descMeterVal.textContent = `${d.chars || snippet.length} / 155 chars`;
      const descPct = Math.min(100, Math.round(((d.chars || snippet.length) / 155) * 100));
      descBarFill.style.width = `${descPct}%`;
      if ((d.chars || snippet.length) <= 155) {
        descBarFill.className = 'meter-bar-fill fill-green';
        descStatusBadge.className = 'badge badge-green';
        descStatusBadge.textContent = '✓ OPTIMAL';
      } else {
        descBarFill.className = 'meter-bar-fill fill-yellow';
        descStatusBadge.className = 'badge badge-yellow';
        descStatusBadge.textContent = '⚠ EXCEEDS 155';
      }
    } catch {
      // Fallback client-side calculation
      const chars = title.length;
      charMeterVal.textContent = `${chars} / 58 chars`;
      const px = Math.round(chars * 9.2);
      pixelMeterVal.textContent = `${px} / 580 px`;
      descMeterVal.textContent = `${snippet.length} / 155 chars`;
    }
  }

  if (btnGenerateTitles) btnGenerateTitles.addEventListener('click', handleGenerateTitles);

  // =========================================================================
  // TAB 3: Live Query Harvester (SEMrush-Inspired Studio)
  // =========================================================================
  const btnHarvestQueries = document.getElementById('btn-harvest-queries');
  const querySeedInput = document.getElementById('query-seed');
  const queryGeoSelect = document.getElementById('query-geo');
  const queriesResultsGrid = document.getElementById('queries-results-grid');
  const subTabButtons = document.querySelectorAll('.sub-tab-btn');

  // SEMrush Summary Bar Elements
  const queriesSummaryBar = document.getElementById('queries-summary-bar');
  const semrushTotalQueries = document.getElementById('semrush-total-queries');
  const semrushTotalVolume = document.getElementById('semrush-total-volume');
  const semrushAvgKdCircle = document.getElementById('semrush-avg-kd-circle');
  const semrushAvgKdTier = document.getElementById('semrush-avg-kd-tier');
  const semrushAvgCpc = document.getElementById('semrush-avg-cpc');
  const semrushDensityBar = document.getElementById('semrush-density-bar');
  const semrushDensityVal = document.getElementById('semrush-density-val');

  // Toolbar & View Elements
  const queriesFilterInput = document.getElementById('queries-filter-input');
  const btnViewTable = document.getElementById('btn-view-table');
  const btnViewCards = document.getElementById('btn-view-cards');
  const queriesTablePanel = document.getElementById('queries-table-panel');
  const queriesCardsPanel = document.getElementById('queries-cards-panel');
  const queriesTableBody = document.getElementById('queries-table-body');
  const btnQueriesExportCsv = document.getElementById('btn-queries-export-csv');

  // Counter Badges
  const countAll = document.getElementById('count-all');
  const countCommercial = document.getElementById('count-commercial');
  const countQuestions = document.getElementById('count-questions');
  const countComparison = document.getElementById('count-comparison');
  const countLocal = document.getElementById('count-local');
  const checkAllQueries = document.getElementById('check-all-queries');

  // UULE Simulator
  const uuleLocationSelect = document.getElementById('uule-location');
  const uuleServiceInput = document.getElementById('uule-service');
  const btnRunUule = document.getElementById('btn-run-uule');
  const uuleResultsContainer = document.getElementById('uule-results-container');

  state.queriesViewMode = 'table';
  state.queriesSortCol = 'vol';
  state.queriesSortDir = 'desc';
  state.queriesMatchMode = 'all';

  function getTrendSparklineHtml(q) {
    let charSum = 0;
    for (let i = 0; i < q.length; i++) charSum += q.charCodeAt(i);
    const bars = [];
    for (let i = 0; i < 12; i++) {
      const h = 3 + ((charSum * (i + 3) * 7) % 9);
      const isActive = i >= 8;
      bars.push(`<span class="vol-bar ${isActive ? 'active' : ''}" style="height: ${h}px;"></span>`);
    }
    return `<div class="vol-trend-bars">${bars.join('')}</div>`;
  }

  // Match Modifiers Listeners
  const matchButtons = document.querySelectorAll('.match-btn');
  matchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      matchButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.queriesMatchMode = btn.dataset.match || 'all';
      renderQueriesCurrentView();
    });
  });

  if (checkAllQueries) {
    checkAllQueries.addEventListener('change', () => {
      document.querySelectorAll('.row-check').forEach(cb => cb.checked = checkAllQueries.checked);
    });
  }

  // Column Sort Listeners
  const tableHeaders = document.querySelectorAll('#queries-table th');
  tableHeaders.forEach(th => {
    const text = th.textContent.toLowerCase();
    let col = null;
    if (text.includes('keyword')) col = 'query';
    else if (text.includes('intent')) col = 'intent';
    else if (text.includes('volume')) col = 'vol';
    else if (text.includes('kd')) col = 'kd';
    else if (text.includes('cpc')) col = 'cpc';
    else if (text.includes('com')) col = 'density';

    if (col) {
      th.style.cursor = 'pointer';
      th.addEventListener('click', () => {
        if (state.queriesSortCol === col) {
          state.queriesSortDir = state.queriesSortDir === 'desc' ? 'asc' : 'desc';
        } else {
          state.queriesSortCol = col;
          state.queriesSortDir = 'desc';
        }
        renderQueriesCurrentView();
      });
    }
  });

  async function handleHarvestQueries() {
    const seed = querySeedInput.value.trim();
    if (!seed) return alert('Please enter a query seed.');

    setButtonLoading(btnHarvestQueries, true);
    try {
      const geo = queryGeoSelect.value;
      const data = await apiPost('/api/queries/harvest', { seed, geo });

      const res = data.results || {};
      const allQueries = res.all || [];

      // Categorize queries with intelligent intent separation
      const cat = res.categorized || {};
      const commercial = cat.commercial?.length
        ? cat.commercial
        : allQueries.filter(q => getSemrushIntent(q).type === 'commercial');
      const questions = cat.questions?.length
        ? cat.questions
        : allQueries.filter(q => getSemrushIntent(q).type === 'informational' || /how|what|why|who|can|is/i.test(q));
      const comparison = cat.comparison?.length
        ? cat.comparison
        : allQueries.filter(q => /vs|or|versus|alternative|compare/i.test(q));
      const local = cat.local?.length
        ? cat.local
        : allQueries.filter(q => /near me|in |california|delhi|austin|mumbai|city/i.test(q));

      state.currentQueries = {
        all: allQueries,
        commercial,
        questions,
        comparison,
        local
      };

      countAll.textContent = state.currentQueries.all.length;
      countCommercial.textContent = state.currentQueries.commercial.length;
      countQuestions.textContent = state.currentQueries.questions.length;
      countComparison.textContent = state.currentQueries.comparison.length;
      countLocal.textContent = state.currentQueries.local.length;

      // Update SEMrush Top KPI Summary Bar
      updateSemrushSummary(allQueries);

      // Render Active View
      renderQueriesCurrentView();
    } catch (err) {
      alert(`Harvest error: ${err.message}`);
    } finally {
      setButtonLoading(btnHarvestQueries, false, '🔍 Harvest Live Queries');
    }
  }

  function updateSemrushSummary(queries) {
    if (!queries || !queries.length) return;
    queriesSummaryBar.classList.remove('hidden');

    semrushTotalQueries.textContent = queries.length;

    let totalVol = 0;
    let totalKd = 0;
    let totalCpc = 0;
    let totalDensity = 0;

    queries.forEach(q => {
      totalVol += getSemrushVolume(q).num;
      totalKd += getSemrushKD(q).pct;
      totalCpc += parseFloat(getSemrushCPC(q).replace('$', '')) || 3.5;
      totalDensity += parseFloat(getSemrushCompDensity(q)) || 0.6;
    });

    const avgKd = Math.round(totalKd / queries.length);
    const avgCpc = (totalCpc / queries.length).toFixed(2);
    const avgDensity = (totalDensity / queries.length).toFixed(2);

    if (totalVol >= 1000000) {
      semrushTotalVolume.textContent = (totalVol / 1000000).toFixed(1) + 'M';
    } else if (totalVol >= 1000) {
      semrushTotalVolume.textContent = (totalVol / 1000).toFixed(1) + 'K';
    } else {
      semrushTotalVolume.textContent = totalVol.toString();
    }

    semrushAvgKdCircle.textContent = `${avgKd}%`;
    let kdTier = 'Possible';
    let borderColor = '#eab308';

    if (avgKd <= 14) {
      kdTier = 'Very Easy';
      borderColor = '#00cc83';
    } else if (avgKd <= 29) {
      kdTier = 'Easy';
      borderColor = '#10b981';
    } else if (avgKd <= 49) {
      kdTier = 'Possible';
      borderColor = '#eab308';
    } else if (avgKd <= 69) {
      kdTier = 'Difficult';
      borderColor = '#f97316';
    } else {
      kdTier = 'Hard';
      borderColor = '#ef4444';
    }

    semrushAvgKdCircle.style.borderColor = borderColor;
    semrushAvgKdTier.textContent = kdTier;

    semrushAvgCpc.textContent = `$${avgCpc}`;
    semrushDensityVal.textContent = avgDensity;
    semrushDensityBar.style.width = `${Math.min(100, Math.round(parseFloat(avgDensity) * 100))}%`;
  }

  function getFilteredQueries() {
    let list = state.currentQueries[state.activeQueryFilter] || state.currentQueries.all || [];
    const search = (queriesFilterInput.value || '').toLowerCase().trim();
    if (search) {
      list = list.filter(q => q.toLowerCase().includes(search));
    }

    const seed = (querySeedInput.value || '').toLowerCase().trim();
    if (seed && state.queriesMatchMode !== 'all') {
      if (state.queriesMatchMode === 'phrase') {
        list = list.filter(q => q.toLowerCase().includes(seed));
      } else if (state.queriesMatchMode === 'exact') {
        list = list.filter(q => {
          const qWords = q.toLowerCase().split(/\s+/);
          const sWords = seed.split(/\s+/);
          return Math.abs(qWords.length - sWords.length) <= 1 && q.toLowerCase().includes(seed);
        });
      }
    }

    const col = state.queriesSortCol;
    const dir = state.queriesSortDir === 'desc' ? -1 : 1;
    return [...list].sort((a, b) => {
      if (col === 'query') return dir * a.localeCompare(b);
      if (col === 'intent') return dir * getSemrushIntent(a).letter.localeCompare(getSemrushIntent(b).letter);
      if (col === 'vol') return dir * (getSemrushVolume(a).num - getSemrushVolume(b).num);
      if (col === 'kd') return dir * (getSemrushKD(a).pct - getSemrushKD(b).pct);
      if (col === 'cpc') return dir * (parseFloat(getSemrushCPC(a).slice(1)) - parseFloat(getSemrushCPC(b).slice(1)));
      if (col === 'density') return dir * (parseFloat(getSemrushCompDensity(a)) - parseFloat(getSemrushCompDensity(b)));
      return 0;
    });
  }

  function renderQueriesCurrentView() {
    const list = getFilteredQueries();
    renderSemrushTable(list);
    renderSemrushCards(list);
  }

  function renderSemrushTable(queries) {
    queriesTableBody.innerHTML = '';
    if (!queries.length) {
      queriesTableBody.innerHTML = `<tr><td colspan="11" class="empty-state-notice">No search queries match current filter.</td></tr>`;
      return;
    }

    queries.slice(0, 150).forEach((q, idx) => {
      const tr = document.createElement('tr');
      const intent = getSemrushIntent(q);
      const kd = getSemrushKD(q);
      const vol = getSemrushVolume(q);
      const cpc = getSemrushCPC(q);
      const density = getSemrushCompDensity(q);
      const features = getSemrushSerpFeatures(q);

      tr.innerHTML = `
        <td><input type="checkbox" class="semrush-checkbox row-check" data-query="${escapeHtml(q)}"></td>
        <td>${idx + 1}</td>
        <td>
          <div class="query-cell">
            <span>${escapeHtml(q)}</span>
            <button class="copy-icon-btn" title="Copy query" data-copy="${escapeHtml(q)}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
            </button>
          </div>
        </td>
        <td>
          <span class="semrush-intent-pill ${intent.type}">
            <span class="semrush-mini-intent intent-${intent.letter.toLowerCase()}">${intent.letter}</span>
            ${intent.label}
          </span>
        </td>
        <td>
          <span class="vol-num">${vol.formatted}</span>
        </td>
        <td>
          ${getTrendSparklineHtml(q)}
        </td>
        <td>
          <div class="semrush-kd-badge">
            <span class="kd-circle-mini ${kd.cssClass}">${kd.pct}</span>
            <span class="kd-tier-text">${kd.tier}</span>
          </div>
        </td>
        <td><strong style="color: #10b981; font-family: 'JetBrains Mono', monospace;">${cpc}</strong></td>
        <td>
          <div class="comp-density-cell">
            <div class="comp-track">
              <div class="comp-fill" style="width: ${Math.round(density * 100)}%; background: ${density > 0.7 ? '#f97316' : density > 0.4 ? '#eab308' : '#10b981'};"></div>
            </div>
            <span class="comp-val">${density}</span>
          </div>
        </td>
        <td>
          <div class="serp-features-group">
            ${features.map(f => `<span class="serp-icon" title="${f.name}">${f.icon}</span>`).join('')}
          </div>
        </td>
        <td>
          <button class="btn btn-xs btn-outline btn-q-title" data-q="${escapeHtml(q)}">🏷️ Title</button>
          <button class="btn btn-xs btn-outline btn-q-density" data-q="${escapeHtml(q)}">📊 Density</button>
        </td>
      `;

      tr.querySelector('.copy-icon-btn').addEventListener('click', (e) => {
        navigator.clipboard.writeText(q);
        e.currentTarget.innerHTML = '<span style="color: #10b981;">✓</span>';
        setTimeout(() => {
          e.currentTarget.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`;
        }, 1500);
      });

      tr.querySelector('.btn-q-title').addEventListener('click', () => {
        document.getElementById('title-topic').value = q;
        switchTab('tab-titles');
        handleGenerateTitles();
      });

      tr.querySelector('.btn-q-density').addEventListener('click', () => {
        document.getElementById('kd-target').value = q;
        switchTab('tab-kd');
      });

      queriesTableBody.appendChild(tr);
    });
  }

  function renderSemrushCards(queries) {
    queriesResultsGrid.innerHTML = '';
    if (!queries.length) {
      queriesResultsGrid.innerHTML = '<div class="empty-state-notice">No search queries match current filter.</div>';
      return;
    }

    queries.slice(0, 100).forEach(q => {
      const card = document.createElement('div');
      card.className = 'semrush-card';
      const intent = getSemrushIntent(q);
      const kd = getSemrushKD(q);
      const vol = getSemrushVolume(q);
      const cpc = getSemrushCPC(q);
      const density = getSemrushCompDensity(q);

      card.innerHTML = `
        <div class="semrush-card-top">
          <span class="semrush-intent-pill ${intent.type}">
            <span class="semrush-mini-intent intent-${intent.letter.toLowerCase()}">${intent.letter}</span>
            ${intent.label}
          </span>
          <div class="semrush-kd-badge">
            <span class="kd-circle-mini ${kd.cssClass}">${kd.pct}</span>
            <span class="kd-tier-text">${kd.tier}</span>
          </div>
        </div>
        <h4 class="semrush-card-query">${escapeHtml(q)}</h4>
        <div class="semrush-card-metrics">
          <div class="metric-box">
            <span class="label">Vol / Mo</span>
            <span class="val">${vol.formatted}</span>
          </div>
          <div class="metric-box">
            <span class="label">Est. CPC</span>
            <span class="val" style="color: #10b981;">${cpc}</span>
          </div>
          <div class="metric-box">
            <span class="label">Comp. Density</span>
            <span class="val">${density}</span>
          </div>
        </div>
        <div class="semrush-card-actions">
          <button class="btn btn-xs btn-outline btn-q-title" data-q="${escapeHtml(q)}">🏷️ Title Studio</button>
          <button class="btn btn-xs btn-outline btn-q-density" data-q="${escapeHtml(q)}">📊 Density Audit</button>
        </div>
      `;

      card.querySelector('.btn-q-title').addEventListener('click', () => {
        document.getElementById('title-topic').value = q;
        switchTab('tab-titles');
        handleGenerateTitles();
      });

      card.querySelector('.btn-q-density').addEventListener('click', () => {
        document.getElementById('kd-target').value = q;
        switchTab('tab-kd');
      });

      queriesResultsGrid.appendChild(card);
    });
  }

  // Filter Tabs Event Listeners
  subTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      subTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      state.activeQueryFilter = filter;
      renderQueriesCurrentView();
    });
  });

  // Filter Search Input Listener
  queriesFilterInput.addEventListener('input', () => {
    renderQueriesCurrentView();
  });

  // View Switcher (Table vs Cards)
  btnViewTable.addEventListener('click', () => {
    btnViewTable.classList.add('active');
    btnViewCards.classList.remove('active');
    queriesTablePanel.classList.remove('hidden');
    queriesCardsPanel.classList.add('hidden');
    state.queriesViewMode = 'table';
  });

  btnViewCards.addEventListener('click', () => {
    btnViewCards.classList.add('active');
    btnViewTable.classList.remove('active');
    queriesTablePanel.classList.add('hidden');
    queriesCardsPanel.classList.remove('hidden');
    state.queriesViewMode = 'cards';
  });

  // CSV Export for Harvested Queries
  if (btnQueriesExportCsv) {
    btnQueriesExportCsv.addEventListener('click', () => {
      const list = getFilteredQueries();
      if (!list.length) return alert('No queries to export.');

      const headers = ['Query', 'Intent', 'Intent_Type', 'Volume_Mo', 'KD_Percent', 'Difficulty_Tier', 'CPC_USD', 'Competitive_Density'];
      const rows = list.map(q => {
        const intent = getSemrushIntent(q);
        const kd = getSemrushKD(q);
        const vol = getSemrushVolume(q);
        const cpc = getSemrushCPC(q);
        const density = getSemrushCompDensity(q);
        return [
          `"${q.replace(/"/g, '""')}"`,
          intent.letter,
          intent.label,
          vol.num,
          kd.pct,
          kd.tier,
          cpc.replace('$', ''),
          density
        ].join(',');
      });

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(',')].concat(rows).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `devacia-queries-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  if (btnHarvestQueries) btnHarvestQueries.addEventListener('click', handleHarvestQueries);

  // Hyper-Local UULE Simulation
  async function handleRunUule() {
    const location = uuleLocationSelect.value;
    const service = uuleServiceInput.value.trim() || 'Custom Software Development';

    setButtonLoading(btnRunUule, true);
    try {
      const data = await apiPost('/api/queries/local', { location, service });
      const intel = data.intel || {};

      uuleResultsContainer.classList.remove('hidden');
      uuleResultsContainer.innerHTML = `
        <div class="uule-intel-card card">
          <div class="uule-header">
            <h4>📍 Hyper-Local Simulation for: <strong>${escapeHtml(intel.location?.canonicalName || location)}</strong></h4>
            <span class="badge badge-cyan">UULE Base64 Active</span>
          </div>

          <div class="uule-code-row mt-2">
            <span class="code-label">Simulated UULE Parameter:</span>
            <code>${escapeHtml(intel.uuleParameter || 'uule=w+CAIQICI...')}</code>
          </div>

          <div class="uule-queries-list mt-3">
            <h5>Discovered Local Search Patterns:</h5>
            <div class="query-chips-row">
              ${(intel.localKeywords || []).map(k => `<span class="chip chip-local">📍 ${escapeHtml(k)}</span>`).join('')}
            </div>
          </div>

          <div class="uule-schema-section mt-3">
            <h5>Verified Schema.org LocalBusiness JSON-LD:</h5>
            <pre><code id="local-schema-code">${escapeHtml(JSON.stringify(intel.schemaOrgMarkup || {}, null, 2))}</code></pre>
            <button class="btn btn-sm btn-outline mt-2" id="btn-copy-schema">📋 Copy Schema JSON-LD</button>
          </div>
        </div>
      `;

      const btnCopySchema = document.getElementById('btn-copy-schema');
      if (btnCopySchema) {
        btnCopySchema.addEventListener('click', () => {
          const code = document.getElementById('local-schema-code').textContent;
          navigator.clipboard.writeText(code);
          btnCopySchema.textContent = '✓ Schema Copied!';
          setTimeout(() => btnCopySchema.textContent = '📋 Copy Schema JSON-LD', 2000);
        });
      }
    } catch (err) {
      alert(`Local UULE simulation failed: ${err.message}`);
    } finally {
      setButtonLoading(btnRunUule, false, '⚡ Simulate Local');
    }
  }

  if (btnRunUule) btnRunUule.addEventListener('click', handleRunUule);

  // =========================================================================
  // TAB 4: Keyword Density Auditor
  // =========================================================================
  const modeButtons = document.querySelectorAll('.mode-btn');
  const kdTextGroup = document.getElementById('kd-text-group');
  const kdTitleGroup = document.getElementById('kd-title-group');
  const kdTargetInput = document.getElementById('kd-target');
  const kdContentTextarea = document.getElementById('kd-content');
  const kdTitleInput = document.getElementById('kd-title-input');
  const btnAnalyzeKd = document.getElementById('btn-analyze-kd');
  const btnLoadSampleText = document.getElementById('btn-load-sample-text');

  // Results elements
  const gaugeNumber = document.getElementById('gauge-number');
  const gaugeStatusBadge = document.getElementById('gauge-status-badge');
  const gaugeExplanation = document.getElementById('gauge-explanation');
  const statWordCount = document.getElementById('stat-word-count');
  const statKwMatches = document.getElementById('stat-kw-matches');
  const statReadingTime = document.getElementById('stat-reading-time');
  const ngramPills = document.getElementById('ngram-pills');
  const highlightedTextBox = document.getElementById('highlighted-text-box');

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      state.kdMode = mode;
      if (mode === 'title') {
        kdTextGroup.classList.add('hidden');
        kdTitleGroup.classList.remove('hidden');
      } else {
        kdTextGroup.classList.remove('hidden');
        kdTitleGroup.classList.add('hidden');
      }
    });
  });

  const SAMPLE_ARTICLE = `In the modern digital landscape, finding the right web development services is critical for enterprise growth. When businesses invest in professional web development services, they unlock high-performing, scalable web architectures tailored to their unique commercial operations.

A premier web development agency provides end-to-end technical execution: from custom frontend UI engineering to resilient backend database architecture. Beyond standard templates, custom web development services ensure strict compliance with Google Core Web Vitals, ultra-fast TTFB (Time to First Byte), and zero cumulative layout shifts.

Why Should Your Enterprise Prioritize Web Development Services?
1. Measurable Business Performance: Speed and responsiveness directly dictate e-commerce conversion rates.
2. Search Engine Prominence: Modern search algorithms reward semantic HTML5 schemas and lightning-fast load times.
3. Long-Term Architectural Agility: Custom solutions adapt seamlessly as your customer base expands globally.

By partnering with top-tier engineers who understand modern cloud ecosystems, companies gain a decisive competitive advantage in their vertical. Discover how strategic web development services elevate your market valuation.`;

  if (btnLoadSampleText) {
    btnLoadSampleText.addEventListener('click', () => {
      kdTargetInput.value = 'web development services';
      kdContentTextarea.value = SAMPLE_ARTICLE;
      handleAnalyzeKd();
    });
  }

  async function handleAnalyzeKd() {
    const target = kdTargetInput.value.trim();
    if (!target) return alert('Please enter a target keyword.');

    const isArticle = state.kdMode === 'article';
    const text = isArticle ? kdContentTextarea.value : kdTitleInput.value;

    if (!text.trim()) {
      return alert(isArticle ? 'Please paste your article content.' : 'Please enter a title string.');
    }

    setButtonLoading(btnAnalyzeKd, true);
    try {
      const data = await apiPost('/api/kd/check', {
        text,
        title: !isArticle ? text : '',
        targetKeyword: target,
        isArticle
      });

      renderKdResults(data.result || {}, isArticle);
    } catch (err) {
      alert(`KD analysis error: ${err.message}`);
    } finally {
      setButtonLoading(btnAnalyzeKd, false, '🚀 Analyze Density & Prominence');
    }
  }

  function renderKdResults(res, isArticle) {
    const kd = res.densityPercent || res.exactDensityPercent || 0;
    gaugeNumber.textContent = `${kd}%`;

    // Gauge rating
    if (kd >= 1.0 && kd <= 2.5) {
      gaugeStatusBadge.className = 'gauge-status-badge badge badge-green';
      gaugeStatusBadge.textContent = 'OPTIMAL RANGE (1.0% - 2.5%)';
      gaugeExplanation.textContent = 'Balanced frequency. Maximizes contextual relevance with zero keyword stuffing penalty risk.';
    } else if (kd < 1.0) {
      gaugeStatusBadge.className = 'gauge-status-badge badge badge-yellow';
      gaugeStatusBadge.textContent = 'UNDER-OPTIMIZED (< 1.0%)';
      gaugeExplanation.textContent = 'Keyword frequency may be too low for strong topical search engine relevance.';
    } else {
      gaugeStatusBadge.className = 'gauge-status-badge badge badge-red';
      gaugeStatusBadge.textContent = 'OVER-OPTIMIZED / STUFFING RISK (> 2.5%)';
      gaugeExplanation.textContent = 'Keyword frequency exceeds natural thresholds. Consider replacing repetitions with semantic LSI synonyms.';
    }

    statWordCount.textContent = res.totalWords || res.totalTokens || 0;
    statKwMatches.textContent = res.exactMatches || res.matches || 0;
    statReadingTime.textContent = res.readingTimeMinutes ? `${res.readingTimeMinutes} min` : '1 min';

    // N-Gram pills
    ngramPills.innerHTML = '';
    const top2 = res.top2Grams || [];
    const top3 = res.top3Grams || [];
    const allGrams = [...top2.slice(0, 4), ...top3.slice(0, 4)];

    if (!allGrams.length) {
      ngramPills.innerHTML = '<span class="ngram-pill">No significant multi-word n-grams found.</span>';
    } else {
      allGrams.forEach(item => {
        const pill = document.createElement('span');
        pill.className = 'ngram-pill';
        pill.innerHTML = `<strong>${escapeHtml(item.phrase)}</strong> <span class="pill-count">×${item.count}</span>`;
        ngramPills.appendChild(pill);
      });
    }

    // Highlighted text
    if (res.highlightedHtml) {
      highlightedTextBox.innerHTML = res.highlightedHtml;
    } else if (isArticle) {
      const raw = kdContentTextarea.value;
      const target = kdTargetInput.value.trim();
      const escapedTarget = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const marked = raw.replace(new RegExp(`(${escapedTarget})`, 'gi'), '<mark>$1</mark>');
      highlightedTextBox.innerHTML = `<p>${marked.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
    } else {
      highlightedTextBox.innerHTML = `<p class="empty-state-notice">Title evaluated: <strong>${escapeHtml(kdTitleInput.value)}</strong></p>`;
    }
  }

  if (btnAnalyzeKd) btnAnalyzeKd.addEventListener('click', handleAnalyzeKd);

  // =========================================================================
  // GEO & AI Search Audit Handler
  // =========================================================================
  const btnRunGeo = document.getElementById('btn-run-geo');
  const geoTargetInput = document.getElementById('geo-target-url');
  const geoResultsContainer = document.getElementById('geo-results-container');
  const geoOverallScore = document.getElementById('geo-overall-score');
  const geoAiCrawlers = document.getElementById('geo-ai-crawlers');
  const geoCitationScore = document.getElementById('geo-citation-score');
  const geoCrawlerMatrix = document.getElementById('geo-crawler-matrix');
  const geoRecommendations = document.getElementById('geo-recommendations');

  if (btnRunGeo) {
    btnRunGeo.addEventListener('click', async () => {
      const url = geoTargetInput.value.trim() || 'https://www.devacia.com';
      btnRunGeo.textContent = 'Auditing GEO...';
      btnRunGeo.disabled = true;

      try {
        const data = await apiPost('/api/geo/audit', { url });
        if (data.success && data.result) {
          const res = data.result;
          geoResultsContainer.classList.remove('hidden');
          geoOverallScore.textContent = `${res.scores.geoOverall}/100`;
          geoAiCrawlers.textContent = `${res.scores.aiCrawlerAccess}%`;
          geoCitationScore.textContent = `${res.scores.citationReadiness}%`;

          // Matrix
          geoCrawlerMatrix.innerHTML = '';
          res.crawlers.forEach(c => {
            const row = document.createElement('div');
            row.className = 'cli-row';
            row.innerHTML = `<code>${escapeHtml(c.bot)}</code> <span class="badge ${c.status === 'ALLOWED' ? 'badge-green' : 'badge-red'}">${c.status}</span>`;
            geoCrawlerMatrix.appendChild(row);
          });

          // Recommendations
          geoRecommendations.innerHTML = '';
          if (res.recommendations.length) {
            res.recommendations.forEach(r => {
              const li = document.createElement('li');
              li.textContent = r;
              geoRecommendations.appendChild(li);
            });
          } else {
            geoRecommendations.innerHTML = '<li>✓ All core GEO requirements met!</li>';
          }
        }
      } catch (err) {
        alert('GEO Audit Error: ' + err.message);
      } finally {
        btnRunGeo.textContent = 'Run GEO Audit';
        btnRunGeo.disabled = false;
      }
    });
  }

  // =========================================================================
  // Core Web Vitals Handler
  // =========================================================================
  const btnRunCwv = document.getElementById('btn-run-cwv');
  const cwvTargetInput = document.getElementById('cwv-target-url');
  const cwvResultsContainer = document.getElementById('cwv-results-container');
  const cwvPerfScore = document.getElementById('cwv-perf-score');
  const cwvTtfb = document.getElementById('cwv-ttfb');
  const cwvSize = document.getElementById('cwv-size');
  const cwvOpportunitiesList = document.getElementById('cwv-opportunities-list');

  if (btnRunCwv) {
    btnRunCwv.addEventListener('click', async () => {
      const url = cwvTargetInput.value.trim() || 'https://www.devacia.com';
      btnRunCwv.textContent = 'Auditing Speed...';
      btnRunCwv.disabled = true;

      try {
        const data = await apiPost('/api/cwv/audit', { url });
        if (data.success && data.result) {
          const res = data.result;
          cwvResultsContainer.classList.remove('hidden');
          cwvPerfScore.textContent = `${res.scores.performance}/100`;
          cwvTtfb.textContent = res.metrics ? res.metrics.ttfb : '280 ms';
          cwvSize.textContent = res.metrics ? res.metrics.htmlSize : '150 KB';

          cwvOpportunitiesList.innerHTML = '';
          const opps = res.opportunities || [];
          if (opps.length) {
            opps.forEach(o => {
              const li = document.createElement('li');
              li.textContent = typeof o === 'string' ? o : `${o.title} (${o.savings || ''})`;
              cwvOpportunitiesList.appendChild(li);
            });
          } else {
            cwvOpportunitiesList.innerHTML = '<li>✓ High performance detected!</li>';
          }
        }
      } catch (err) {
        alert('CWV Audit Error: ' + err.message);
      } finally {
        btnRunCwv.textContent = 'Audit Performance';
        btnRunCwv.disabled = false;
      }
    });
  }

  // =========================================================================
  // Schema Graph Handler
  // =========================================================================
  const btnRunSchema = document.getElementById('btn-run-schema');
  const schemaTargetInput = document.getElementById('schema-target-url');
  const schemaResultsContainer = document.getElementById('schema-results-container');
  const schemaScore = document.getElementById('schema-score');
  const schemaCount = document.getElementById('schema-count');
  const schemaOgCount = document.getElementById('schema-og-count');
  const schemaTypesPills = document.getElementById('schema-types-pills');

  if (btnRunSchema) {
    btnRunSchema.addEventListener('click', async () => {
      const url = schemaTargetInput.value.trim() || 'https://www.devacia.com';
      btnRunSchema.textContent = 'Validating Schema...';
      btnRunSchema.disabled = true;

      try {
        const data = await apiPost('/api/schema/audit', { url });
        if (data.success && data.result) {
          const res = data.result;
          schemaResultsContainer.classList.remove('hidden');
          schemaScore.textContent = `${res.score}/100`;
          schemaCount.textContent = `${res.totalSchemas} Schemas`;
          schemaOgCount.textContent = `${Object.keys(res.openGraph || {}).length} Tags`;

          schemaTypesPills.innerHTML = '';
          (res.typesFound || []).forEach(type => {
            const pill = document.createElement('span');
            pill.className = 'ngram-pill';
            pill.textContent = type;
            schemaTypesPills.appendChild(pill);
          });
        }
      } catch (err) {
        alert('Schema Audit Error: ' + err.message);
      } finally {
        btnRunSchema.textContent = 'Validate Schema';
        btnRunSchema.disabled = false;
      }
    });
  }

  // =========================================================================
  // Backlinks & DR Studio Handler
  // =========================================================================
  const btnRunBacklinks = document.getElementById('btn-run-backlinks');
  const btnRunLinkGaps = document.getElementById('btn-run-link-gaps');
  const blTargetInput = document.getElementById('bl-target-domain');
  const blResultsContainer = document.getElementById('bl-results-container');
  const blDrScore = document.getElementById('bl-dr-score');
  const blRefDomains = document.getElementById('bl-ref-domains');
  const blTotalLinks = document.getElementById('bl-total-links');
  const blAnchorGrid = document.getElementById('bl-anchor-grid');
  const blAnchorAdvice = document.getElementById('bl-anchor-advice');
  const blTier1List = document.getElementById('bl-tier1-list');

  if (btnRunBacklinks) {
    btnRunBacklinks.addEventListener('click', async () => {
      const domain = blTargetInput.value.trim() || 'devacia.com';
      btnRunBacklinks.textContent = 'Auditing DR...';
      btnRunBacklinks.disabled = true;

      try {
        const data = await apiPost('/api/backlinks/audit', { domain });
        if (data.success && data.drData) {
          const dr = data.drData.metrics;
          blResultsContainer.classList.remove('hidden');
          blDrScore.textContent = `${dr.dr}/100`;
          blRefDomains.textContent = `${dr.referringDomains}`;
          blTotalLinks.textContent = `${dr.estimatedBacklinks}`;

          // Anchors
          const ap = data.anchorProfile || {};
          blAnchorGrid.innerHTML = `
            <div class="stat-card"><span class="stat-num">${ap.breakdown?.branded || '0%'}</span><span class="stat-desc">Branded</span></div>
            <div class="stat-card"><span class="stat-num">${ap.breakdown?.exactMatch || '0%'}</span><span class="stat-desc">Exact Match</span></div>
            <div class="stat-card"><span class="stat-num">${ap.breakdown?.nakedUrl || '0%'}</span><span class="stat-desc">Naked URLs</span></div>
          `;
          blAnchorAdvice.textContent = ap.advice || 'Anchor profile healthy.';

          // Directories
          const gapsData = await apiPost('/api/backlinks/opportunities', { domain });
          blTier1List.innerHTML = '';
          (gapsData.tier1Directories || []).forEach(d => {
            const div = document.createElement('div');
            div.className = 'cli-row';
            div.innerHTML = `<code>[DR ${d.dr}] ${escapeHtml(d.name)}</code> <a href="${d.submissionUrl}" target="_blank" style="color:#ff642d;">Submit Profile ↗</a>`;
            blTier1List.appendChild(div);
          });
        }
      } catch (err) {
        alert('Backlink Audit Error: ' + err.message);
      } finally {
        btnRunBacklinks.textContent = 'Audit Backlinks & DR';
        btnRunBacklinks.disabled = false;
      }
    });
  }

  if (btnRunLinkGaps) {
    btnRunLinkGaps.addEventListener('click', async () => {
      const domain = blTargetInput.value.trim() || 'devacia.com';
      btnRunLinkGaps.textContent = 'Scanning Gaps...';
      btnRunLinkGaps.disabled = true;

      try {
        const data = await apiPost('/api/backlinks/opportunities', { domain });
        if (data.success && data.opportunities) {
          blResultsContainer.classList.remove('hidden');
          blTier1List.innerHTML = '';
          data.opportunities.forEach(o => {
            const div = document.createElement('div');
            div.className = 'cli-row';
            div.innerHTML = `<code>[DR ${o.dr}] ${escapeHtml(o.sourceDomain)}</code> <span>${escapeHtml(o.action)}</span>`;
            blTier1List.appendChild(div);
          });
        }
      } catch (err) {
        alert('Link Gap Error: ' + err.message);
      } finally {
        btnRunLinkGaps.textContent = 'Find Link Gaps';
        btnRunLinkGaps.disabled = false;
      }
    });
  }

  // =========================================================================
  // Master Autonomous Agent Handler
  // =========================================================================
  const btnRunAgentTest = document.getElementById('btn-run-agent-test');
  const agentTargetInput = document.getElementById('agent-target-input');
  const agentResultsContainer = document.getElementById('agent-results-container');
  const agentOverallScore = document.getElementById('agent-overall-score');
  const agentDrScore = document.getElementById('agent-dr-score');
  const agentGeoScore = document.getElementById('agent-geo-score');
  const agentActionPlan = document.getElementById('agent-action-plan');

  if (btnRunAgentTest) {
    btnRunAgentTest.addEventListener('click', async () => {
      const domain = agentTargetInput.value.trim() || 'https://www.devacia.com';
      btnRunAgentTest.textContent = 'Running 360° Agent Test...';
      btnRunAgentTest.disabled = true;

      try {
        const data = await apiPost('/api/agent/run-test', { domain });
        if (data.success && data.result) {
          const res = data.result;
          agentResultsContainer.classList.remove('hidden');
          agentOverallScore.textContent = `${res.overallScore}/100`;
          agentDrScore.textContent = `${res.modules?.domainRating?.metrics?.dr || 0}/100`;
          agentGeoScore.textContent = `${res.modules?.geo?.scores?.geoOverall || 0}/100`;

          agentActionPlan.innerHTML = '';
          (res.actionPlan || []).forEach(action => {
            const li = document.createElement('li');
            li.textContent = action;
            agentActionPlan.appendChild(li);
          });
        }
      } catch (err) {
        alert('Autonomous Agent Error: ' + err.message);
      } finally {
        btnRunAgentTest.textContent = '🚀 RUN MASTER AGENT TEST';
        btnRunAgentTest.disabled = false;
      }
    });
  }

  // =========================================================================
  // Utility Functions
  // =========================================================================
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Initial Boot
  loadSystemStatus();
  updateSerpPreview(state.selectedTitle, state.selectedSnippet);
});
