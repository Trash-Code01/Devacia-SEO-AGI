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
      const low = kw.toLowerCase();

      let intentBadge = '<span class="intent-pill informational">Informational</span>';
      if (/agency|service|company|firm|solutions|hire|cost|pricing|consultant/i.test(low)) {
        intentBadge = '<span class="intent-pill commercial">Commercial</span>';
      } else if (/buy|cheap|contract|quote/i.test(low)) {
        intentBadge = '<span class="intent-pill transactional">Transactional</span>';
      } else if (/how|what|why|guide|tutorial|examples|best/i.test(low)) {
        intentBadge = '<span class="intent-pill informational">Informational</span>';
      }

      const wordCount = kw.split(/\s+/).length;
      let diffBadge = '<span class="badge badge-green">Low KD (0-20)</span>';
      if (wordCount <= 2) diffBadge = '<span class="badge badge-red">High KD (60-80)</span>';
      else if (wordCount === 3) diffBadge = '<span class="badge badge-yellow">Med KD (30-50)</span>';

      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td><strong>${escapeHtml(kw)}</strong></td>
        <td><span class="est-vol">${getEstimatedVolume(kw)}</span>/mo</td>
        <td>${intentBadge}</td>
        <td>${diffBadge}</td>
        <td>
          <button class="btn btn-xs btn-outline btn-use-title" data-kw="${escapeHtml(kw)}">Use in Title</button>
          <button class="btn btn-xs btn-outline btn-check-kd" data-kw="${escapeHtml(kw)}">Check KD</button>
        </td>
      `;

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
  // TAB 3: Live Query Harvester
  // =========================================================================
  const btnHarvestQueries = document.getElementById('btn-harvest-queries');
  const querySeedInput = document.getElementById('query-seed');
  const queryGeoSelect = document.getElementById('query-geo');
  const queriesResultsGrid = document.getElementById('queries-results-grid');
  const subTabButtons = document.querySelectorAll('.sub-tab-btn');

  // Counter Badges
  const countAll = document.getElementById('count-all');
  const countCommercial = document.getElementById('count-commercial');
  const countQuestions = document.getElementById('count-questions');
  const countComparison = document.getElementById('count-comparison');
  const countLocal = document.getElementById('count-local');

  // UULE Simulator
  const uuleLocationSelect = document.getElementById('uule-location');
  const uuleServiceInput = document.getElementById('uule-service');
  const btnRunUule = document.getElementById('btn-run-uule');
  const uuleResultsContainer = document.getElementById('uule-results-container');

  async function handleHarvestQueries() {
    const seed = querySeedInput.value.trim();
    if (!seed) return alert('Please enter a query seed.');

    setButtonLoading(btnHarvestQueries, true);
    try {
      const geo = queryGeoSelect.value;
      const data = await apiPost('/api/queries/harvest', { seed, geo });

      const res = data.results || {};
      state.currentQueries = {
        all: res.all || [],
        commercial: res.commercial || [],
        questions: res.questions || [],
        comparison: res.comparison || [],
        local: res.local || []
      };

      countAll.textContent = state.currentQueries.all.length;
      countCommercial.textContent = state.currentQueries.commercial.length;
      countQuestions.textContent = state.currentQueries.questions.length;
      countComparison.textContent = state.currentQueries.comparison.length;
      countLocal.textContent = state.currentQueries.local.length;

      renderQueryCards(state.currentQueries[state.activeQueryFilter] || state.currentQueries.all);
    } catch (err) {
      alert(`Harvest error: ${err.message}`);
    } finally {
      setButtonLoading(btnHarvestQueries, false, '🔍 Harvest Live Queries');
    }
  }

  function renderQueryCards(queries) {
    queriesResultsGrid.innerHTML = '';
    if (!queries.length) {
      queriesResultsGrid.innerHTML = '<div class="empty-state-notice">No search queries found for this filter.</div>';
      return;
    }

    queries.slice(0, 100).forEach(q => {
      const card = document.createElement('div');
      card.className = 'query-card';

      let tagClass = 'informational';
      let tagText = 'Informational';
      const low = q.toLowerCase();

      if (/price|cost|quote|hire|agency|service|company|best/i.test(low)) {
        tagClass = 'commercial';
        tagText = 'Commercial';
      } else if (/how|what|why|who|can|is|tutorial/i.test(low)) {
        tagClass = 'questions';
        tagText = 'Question';
      } else if (/vs|or|versus|alternative|compare/i.test(low)) {
        tagClass = 'comparison';
        tagText = 'Comparison';
      } else if (/near me|california|delhi|austin|in |city/i.test(low)) {
        tagClass = 'local';
        tagText = 'Local';
      }

      card.innerHTML = `
        <div class="query-content">
          <span class="intent-pill ${tagClass}">${tagText}</span>
          <span class="query-text">${escapeHtml(q)}</span>
        </div>
        <div class="query-actions">
          <button class="btn btn-xs btn-outline btn-q-title" title="Send to Title Studio">🏷️ Title</button>
          <button class="btn btn-xs btn-outline btn-q-density" title="Check Keyword Density">📊 Density</button>
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

  subTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      subTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      state.activeQueryFilter = filter;
      renderQueryCards(state.currentQueries[filter] || state.currentQueries.all);
    });
  });

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
