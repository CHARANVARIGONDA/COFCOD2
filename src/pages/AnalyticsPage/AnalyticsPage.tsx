import React, { useState } from 'react';
import {
  MOCK_METRICS,
  MOCK_CHARACTER_PERFORMANCE,
  MOCK_ANALYTICS_EVENTS,
  MOCK_DAILY_SALES,
  MOCK_CATEGORY_SALES,
  CharacterEmblem,
} from '@cofoco/shared';
import type { MetricDefinition, DailySalesDataPoint, CategorySalesDataPoint } from '@cofoco/shared';
import { Button } from '../../components/ui/Button/Button';
import styles from './AnalyticsPage.module.css';

export const AnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | 'quarter'>('30d');
  const [selectedCharacter, setSelectedCharacter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'revenue' | 'conversion' | 'orders'>('revenue');
  const [activeMetricDetail, setActiveMetricDetail] = useState<MetricDefinition | null>(MOCK_METRICS[0]);
  const [simulatedConversion, setSimulatedConversion] = useState<number>(3.42);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Interactive Bar Graph Controls
  const [chartView, setChartView] = useState<'daily' | 'category'>('daily');
  const [chartMetric, setChartMetric] = useState<'revenue' | 'orders'>('revenue');
  const [activeDailyPoint, setActiveDailyPoint] = useState<DailySalesDataPoint>(
    MOCK_DAILY_SALES[MOCK_DAILY_SALES.length - 1]
  );
  const [activeCategoryPoint, setActiveCategoryPoint] = useState<CategorySalesDataPoint>(
    MOCK_CATEGORY_SALES[0]
  );

  // Daily Chart Calculations
  const maxDailyRevenue = Math.max(...MOCK_DAILY_SALES.map((d) => d.revenue));
  const maxDailyOrders = Math.max(...MOCK_DAILY_SALES.map((d) => d.orders));
  const totalPeriodRevenue = MOCK_DAILY_SALES.reduce((sum, d) => sum + d.revenue, 0);
  const totalPeriodOrders = MOCK_DAILY_SALES.reduce((sum, d) => sum + d.orders, 0);
  const avgDailyRevenue = Math.round(totalPeriodRevenue / MOCK_DAILY_SALES.length);
  const maxCategoryRevenue = Math.max(...MOCK_CATEGORY_SALES.map((c) => c.revenue));

  // Filter and sort character performance
  const filteredCharacters = MOCK_CHARACTER_PERFORMANCE.filter((char) =>
    selectedCharacter === 'all' ? true : char.slug === selectedCharacter
  ).sort((a, b) => {
    if (sortBy === 'revenue') return b.revenue - a.revenue;
    if (sortBy === 'conversion') return b.conversionRate - a.conversionRate;
    return b.orders - a.orders;
  });

  const totalRevenue = filteredCharacters.reduce((sum, c) => sum + c.revenue, 0);
  const totalOrders = filteredCharacters.reduce((sum, c) => sum + c.orders, 0);
  const totalSessions = filteredCharacters.reduce((sum, c) => sum + c.sessions, 0);
  const maxRevenue = Math.max(...MOCK_CHARACTER_PERFORMANCE.map((c) => c.revenue));

  // Simulator calculation
  const baselineSessions = 16940;
  const simulatedOrders = Math.round((baselineSessions * (simulatedConversion / 100)));
  const avgOrderValue = 3177;
  const simulatedRevenue = simulatedOrders * avgOrderValue;
  const revenueDelta = simulatedRevenue - 1842800;

  // Handle CSV Export (AN03)
  const handleExportCsv = () => {
    const headers = ['Character', 'Qualified Sessions', 'Orders', 'Net Revenue (INR)', 'Conversion Rate (%)', 'Contribution Margin (%)'];
    const rows = filteredCharacters.map((c) => [
      c.name,
      c.sessions,
      c.orders,
      c.revenue,
      `${c.conversionRate}%`,
      `${c.contributionMargin}%`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `COFOCO_Executive_Report_${dateRange.toUpperCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice(`Exported complete commercial dataset to CSV in Asia/Kolkata timezone.`);
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className={styles.analyticsPage}>
      <div className="container">
        {/* Top Executive Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.metaBadgeRow}>
              <span className={styles.reportBadge}>FOUNDER EXECUTIVE ENGINE</span>
              <span className={styles.tzPill}>● LIVE REPLICA (ASIA/KOLKATA)</span>
              <span className={styles.currencyPill}>CURRENCY: INR (₹)</span>
            </div>

            <h1 className={styles.pageTitle}>COMMERCIAL PERFORMANCE COCKPIT</h1>
            <p className={styles.pageSubtitle}>
              Authoritative revenue tracking, character-to-kit attribution, and interactive unit economics (Page 4, AN01–AN03).
            </p>
          </div>

          <div className={styles.headerActions}>
            <Button variant="primary" onClick={handleExportCsv}>
              ↓ DOWNLOAD EXECUTIVE REPORT (CSV)
            </Button>
          </div>
        </header>

        {/* Export Notification Toast */}
        {exportNotice && (
          <div className={styles.exportToast}>
            <span>✓ {exportNotice}</span>
          </div>
        )}

        {/* Global Filter Bar */}
        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>TIMEFRAME:</span>
            <div className={styles.pillGroup}>
              {(['today', '7d', '30d', 'quarter'] as const).map((range) => (
                <button
                  key={range}
                  type="button"
                  className={`${styles.filterPill} ${dateRange === range ? styles.activePill : ''}`}
                  onClick={() => setDateRange(range)}
                >
                  {range === 'today' && 'TODAY (LIVE)'}
                  {range === '7d' && 'LAST 7 DAYS'}
                  {range === '30d' && 'LAST 30 DAYS'}
                  {range === 'quarter' && 'Q4 TO DATE'}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>FILTER DISCIPLINE:</span>
            <select
              className={styles.charSelect}
              value={selectedCharacter}
              onChange={(e) => setSelectedCharacter(e.target.value)}
              aria-label="Filter analytics by character discipline"
            >
              <option value="all">All 06 Archetypes</option>
              <option value="arjun">Arjun (Dynamic Precision)</option>
              <option value="bheema">Bheema (Heavy Compound Lift)</option>
              <option value="karna">Karna (Lactate Threshold)</option>
              <option value="sita">Sita (Somatic Alignment)</option>
              <option value="draupadi">Draupadi (Grip Agility)</option>
              <option value="savitri">Savitri (Tendon Longevity)</option>
            </select>
          </div>

          <div className={styles.liveSyncBadge}>
            <span className={styles.syncDot} />
            <span>LAST SYNC: <strong>TODAY, 20:45 IST</strong></span>
          </div>
        </div>

        {/* 6 Key Performance Metric Cards with Plain-English Human Context */}
        <section className={styles.metricsGrid} aria-label="Commercial Performance Indicators">
          {MOCK_METRICS.map((metric) => {
            const isSelected = activeMetricDetail?.id === metric.id;
            return (
              <div
                key={metric.id}
                className={`${styles.metricCard} ${isSelected ? styles.metricCardActive : ''}`}
                onClick={() => setActiveMetricDetail(isSelected ? null : metric)}
              >
                <div className={styles.cardGlowBar} />

                <div className={styles.metricTop}>
                  <div className={styles.metricNameBadge}>
                    <span className={styles.metricIndicatorDot} />
                    <span className={styles.metricName}>{metric.name}</span>
                  </div>
                  <span className={metric.trend === 'up' ? styles.trendUp : styles.trendDown}>
                    {metric.change}
                  </span>
                </div>

                <div className={styles.metricValue}>{metric.value}</div>

                {/* Plain-English summary so anyone immediately understands the number */}
                <p className={styles.plainEnglishExplainer}>
                  {metric.id === 'net-revenue' && 'Total product sales realized across 580 customer orders after deducting all refunds.'}
                  {metric.id === 'session-conversion' && '3.42 out of every 100 website visitors complete a purchase (+0.6% above D2C benchmark).'}
                  {metric.id === 'contribution-margin' && 'Net profit retained per kit after paying for manufacturing BOM, packaging, and air courier.'}
                  {metric.id === 'character-engagement' && '52.7% of shoppers who explore a character proceed directly to inspect its kit capsule.'}
                  {metric.id === 'on-time-dispatch' && '97.2% of orders leave the Bengaluru fulfillment hub within the promised 24-hour window.'}
                  {metric.id === 'return-rate' && 'Only 1.6% return rate under our 30-day trial guarantee. Inspected before restock.'}
                </p>

                <div className={styles.metricFooter}>
                  <span className={styles.inspectHint}>
                    {isSelected ? '▲ HIDE TECHNICAL SPEC' : '▼ INSPECT FORMULA & DENOMINATOR (AN02)'}
                  </span>
                </div>

                {/* Formula Drawer */}
                {isSelected && (
                  <div className={styles.formulaDrawer}>
                    <div className={styles.formulaTitle}>OFFICIAL AUDIT FORMULA:</div>
                    <code className={styles.formulaCode}>{metric.formula}</code>
                    <p className={styles.formulaDesc}>{metric.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* INTERACTIVE SALES RUN-RATE & VELOCITY BAR GRAPH (NEW) */}
        <section className={styles.barChartSection} aria-label="Interactive Sales Velocity Bar Chart">
          <div className={styles.chartHeaderRow}>
            <div>
              <div className={styles.simBadge}>COMMERCIAL VELOCITY // 14-DAY RUN-RATE</div>
              <h2 className={styles.chartTitle}>SALES PERFORMANCE & DAILY DISPATCH VELOCITY</h2>
              <p className={styles.chartDesc}>
                Interactive daily transaction tracking across verified orders. Hover over any bar to inspect date-level metrics.
              </p>
            </div>

            {/* View & Metric Controls */}
            <div className={styles.chartControlsGroup}>
              <div className={styles.chartTogglePills}>
                <button
                  type="button"
                  className={`${styles.chartControlBtn} ${chartView === 'daily' ? styles.activeChartControl : ''}`}
                  onClick={() => setChartView('daily')}
                >
                  📅 14-DAY DAILY RUN-RATE
                </button>
                <button
                  type="button"
                  className={`${styles.chartControlBtn} ${chartView === 'category' ? styles.activeChartControl : ''}`}
                  onClick={() => setChartView('category')}
                >
                  📊 CATEGORY SHARE
                </button>
              </div>

              {chartView === 'daily' && (
                <div className={styles.chartTogglePills}>
                  <button
                    type="button"
                    className={`${styles.metricToggleBtn} ${chartMetric === 'revenue' ? styles.activeMetricToggle : ''}`}
                    onClick={() => setChartMetric('revenue')}
                  >
                    REVENUE (₹)
                  </button>
                  <button
                    type="button"
                    className={`${styles.metricToggleBtn} ${chartMetric === 'orders' ? styles.activeMetricToggle : ''}`}
                    onClick={() => setChartMetric('orders')}
                  >
                    ORDERS (UNITS)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className={styles.chartRibbon}>
            <div className={styles.ribbonItem}>
              <span className={styles.ribbonLabel}>14-DAY NET SALES</span>
              <strong className={styles.ribbonVal}>₹{(totalPeriodRevenue / 100000).toFixed(2)} Lakhs</strong>
              <span className={styles.ribbonSub}>Across 14 continuous days</span>
            </div>
            <div className={styles.ribbonItem}>
              <span className={styles.ribbonLabel}>DAILY AVERAGE RUN-RATE</span>
              <strong className={styles.ribbonVal}>₹{(avgDailyRevenue / 1000).toFixed(1)}k / day</strong>
              <span className={styles.ribbonSub}>+22.4% vs prior 14 days</span>
            </div>
            <div className={styles.ribbonItem}>
              <span className={styles.ribbonLabel}>TOTAL CAPTURED ORDERS</span>
              <strong className={styles.ribbonVal}>{totalPeriodOrders} Units</strong>
              <span className={styles.ribbonSub}>Average {Math.round(totalPeriodOrders / 14)} orders/day</span>
            </div>
            <div className={styles.ribbonItem}>
              <span className={styles.ribbonLabel}>PEAK VELOCITY DAY</span>
              <strong className={styles.ribbonVal} style={{ color: 'var(--gold-bright)' }}>₹1.98 Lakhs</strong>
              <span className={styles.ribbonSub}>14 Nov (58 orders)</span>
            </div>
          </div>

          {/* Main Visual Interactive Bar Chart Area */}
          {chartView === 'daily' ? (
            <div className={styles.chartCanvasContainer}>
              {/* Y-Axis Benchmark Gridlines */}
              <div className={styles.yAxisGuideLines}>
                <div className={styles.gridLine}>
                  <span className={styles.axisLabel}>
                    {chartMetric === 'revenue' ? `₹${(maxDailyRevenue / 1000).toFixed(0)}k` : `${maxDailyOrders}`}
                  </span>
                  <div className={styles.dashedLine} />
                </div>
                <div className={styles.gridLine}>
                  <span className={styles.axisLabel}>
                    {chartMetric === 'revenue' ? `₹${((maxDailyRevenue * 0.75) / 1000).toFixed(0)}k` : `${Math.round(maxDailyOrders * 0.75)}`}
                  </span>
                  <div className={styles.dashedLine} />
                </div>
                <div className={styles.gridLine}>
                  <span className={styles.axisLabel}>
                    {chartMetric === 'revenue' ? `₹${((maxDailyRevenue * 0.5) / 1000).toFixed(0)}k` : `${Math.round(maxDailyOrders * 0.5)}`}
                  </span>
                  <div className={styles.dashedLine} />
                </div>
                <div className={styles.gridLine}>
                  <span className={styles.axisLabel}>
                    {chartMetric === 'revenue' ? `₹${((maxDailyRevenue * 0.25) / 1000).toFixed(0)}k` : `${Math.round(maxDailyOrders * 0.25)}`}
                  </span>
                  <div className={styles.dashedLine} />
                </div>
                <div className={styles.gridLine}>
                  <span className={styles.axisLabel}>0</span>
                  <div className={styles.dashedLine} />
                </div>
              </div>

              {/* Bars Columns Grid */}
              <div className={styles.barsGrid}>
                {MOCK_DAILY_SALES.map((d) => {
                  const isActive = activeDailyPoint.dayLabel === d.dayLabel;
                  const ratio = chartMetric === 'revenue' ? d.revenue / maxDailyRevenue : d.orders / maxDailyOrders;
                  const heightPercent = Math.max(12, Math.round(ratio * 100));

                  return (
                    <div
                      key={d.dayLabel}
                      className={`${styles.barColumn} ${isActive ? styles.barColumnActive : ''}`}
                      onMouseEnter={() => setActiveDailyPoint(d)}
                      onClick={() => setActiveDailyPoint(d)}
                    >
                      <div className={styles.barTrack}>
                        <div
                          className={`${styles.barPillar} ${isActive ? styles.barPillarActive : ''}`}
                          style={{ height: `${heightPercent}%` }}
                        >
                          <div className={styles.barTopGlowCap} />
                          {isActive && (
                            <div className={styles.barFloatingValueBadge}>
                              {chartMetric === 'revenue' ? `₹${(d.revenue / 1000).toFixed(0)}k` : `${d.orders}`}
                            </div>
                          )}
                        </div>
                      </div>

                      <span className={`${styles.xLabel} ${isActive ? styles.xLabelActive : ''}`}>
                        <span className={styles.xLabelFull}>{d.dayLabel}</span>
                        <span className={styles.xLabelCompact}>{d.dayLabel.split(' ')[0]}</span>
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Active Point Telemetry Inspector Card */}
              <div className={styles.inspectorCard}>
                <div className={styles.inspectorHeader}>
                  <span className={styles.inspectorPulseDot} />
                  <span className={styles.inspectorDate}>{activeDailyPoint.fullDate}</span>
                  <span className={styles.inspectorTag}>TELEMETRY SNAPSHOT</span>
                </div>

                <div className={styles.inspectorStatsGrid}>
                  <div className={styles.inspItem}>
                    <span className={styles.inspLabel}>GROSS REALIZED REVENUE</span>
                    <strong className={styles.inspVal} style={{ color: 'var(--gold-bright)' }}>
                      ₹{activeDailyPoint.revenue.toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div className={styles.inspItem}>
                    <span className={styles.inspLabel}>ORDERS DISPATCHED</span>
                    <strong className={styles.inspVal}>{activeDailyPoint.orders} units</strong>
                  </div>
                  <div className={styles.inspItem}>
                    <span className={styles.inspLabel}>AVERAGE ORDER VALUE</span>
                    <strong className={styles.inspVal}>₹{activeDailyPoint.aov.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className={styles.inspItem}>
                    <span className={styles.inspLabel}>CONVERSION RATE</span>
                    <strong className={styles.inspVal} style={{ color: '#34D399' }}>
                      {activeDailyPoint.conversionRate}%
                    </strong>
                  </div>
                  <div className={styles.inspItem}>
                    <span className={styles.inspLabel}>LEAD ARCHETYPE</span>
                    <strong className={styles.inspVal}>{activeDailyPoint.topArchetype}</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Category Share View */
            <div className={styles.categoryShareView}>
              <div className={styles.categoryBarsList}>
                {MOCK_CATEGORY_SALES.map((cat) => {
                  const widthPercent = ((cat.revenue / maxCategoryRevenue) * 100).toFixed(1);
                  const isCatActive = activeCategoryPoint.category === cat.category;

                  return (
                    <div
                      key={cat.category}
                      className={`${styles.catRow} ${isCatActive ? styles.catRowActive : ''}`}
                      onMouseEnter={() => setActiveCategoryPoint(cat)}
                      onClick={() => setActiveCategoryPoint(cat)}
                    >
                      <div className={styles.catMetaRow}>
                        <div className={styles.catNameGroup}>
                          <span className={styles.catDot} style={{ backgroundColor: cat.color }} />
                          <strong className={styles.catName}>{cat.category}</strong>
                        </div>
                        <div className={styles.catNumbers}>
                          <span>₹{(cat.revenue / 100000).toFixed(2)} Lakhs</span>
                          <strong className={styles.catSharePill}>{cat.percentage}% SHARE</strong>
                        </div>
                      </div>

                      <div className={styles.catTrack}>
                        <div
                          className={styles.catFill}
                          style={{
                            backgroundColor: cat.color,
                            width: `${widthPercent}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Category Active Detail Card */}
              <div className={styles.inspectorCard}>
                <div className={styles.inspectorHeader}>
                  <span className={styles.catDot} style={{ backgroundColor: activeCategoryPoint.color }} />
                  <span className={styles.inspectorDate}>{activeCategoryPoint.category}</span>
                  <span className={styles.inspectorTag}>DISCIPLINE SHARE</span>
                </div>

                <div className={styles.inspectorStatsGrid}>
                  <div className={styles.inspItem}>
                    <span className={styles.inspLabel}>CATEGORY REVENUE</span>
                    <strong className={styles.inspVal} style={{ color: 'var(--gold-bright)' }}>
                      ₹{activeCategoryPoint.revenue.toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div className={styles.inspItem}>
                    <span className={styles.inspLabel}>UNITS DELIVERED</span>
                    <strong className={styles.inspVal}>{activeCategoryPoint.units} units</strong>
                  </div>
                  <div className={styles.inspItem}>
                    <span className={styles.inspLabel}>OVERALL REVENUE SHARE</span>
                    <strong className={styles.inspVal} style={{ color: '#34D399' }}>
                      {activeCategoryPoint.percentage}%
                    </strong>
                  </div>
                  <div className={styles.inspItem}>
                    <span className={styles.inspLabel}>PORTFOLIO STATUS</span>
                    <strong className={styles.inspVal}>P0 CORE LAUNCH LINE</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* INTERACTIVE "WHAT-IF" REVENUE SIMULATOR */}
        <section className={styles.simulatorSection}>
          <div className={styles.simHeader}>
            <div className={styles.simBadge}>INTERACTIVE GROWTH MODELER</div>
            <h2 className={styles.simTitle}>WHAT-IF REVENUE SIMULATOR (FOUNDER SENSITIVITY TOOL)</h2>
            <p className={styles.simDesc}>
              Simulate the commercial impact of lifting storefront conversion rate on monthly merchandise revenue.
            </p>
          </div>

          <div className={styles.simulatorBox}>
            <div className={styles.sliderCol}>
              <div className={styles.sliderHeader}>
                <span className={styles.sliderLabel}>TARGET CONVERSION RATE:</span>
                <span className={styles.sliderValue}>{simulatedConversion.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="6.0"
                step="0.1"
                value={simulatedConversion}
                onChange={(e) => setSimulatedConversion(parseFloat(e.target.value))}
                className={styles.rangeSlider}
                aria-label="Target Conversion Rate Slider"
              />
              <div className={styles.sliderTicks}>
                <span>2.0% (Conservative)</span>
                <span>3.42% (Current Baseline)</span>
                <span>6.0% (Aggressive Target)</span>
              </div>
            </div>

            <div className={styles.simResultsCol}>
              <div className={styles.simStatItem}>
                <span className={styles.simStatLabel}>PROJECTED ORDERS</span>
                <span className={styles.simStatVal}>{simulatedOrders.toLocaleString()}</span>
              </div>
              <div className={styles.simStatItem}>
                <span className={styles.simStatLabel}>PROJECTED REVENUE</span>
                <span className={`${styles.simStatVal} ${styles.goldHighlight}`}>
                  ₹{(simulatedRevenue / 100000).toFixed(2)} LAKHS
                </span>
              </div>
              <div className={styles.simStatItem}>
                <span className={styles.simStatLabel}>REVENUE LIFT</span>
                <span className={revenueDelta >= 0 ? styles.deltaPositive : styles.deltaNegative}>
                  {revenueDelta >= 0 ? `+₹${(revenueDelta / 100000).toFixed(2)} L` : `-₹${(Math.abs(revenueDelta) / 100000).toFixed(2)} L`}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* VISUAL ARCHETYPE REVENUE LEADERBOARD (US04, AN03) */}
        <section className={styles.leaderboardSection}>
          <div className={styles.leaderboardHeader}>
            <div>
              <div className={styles.simBadge}>COMMERCIAL ATTRIBUTION // US04</div>
              <h2 className={styles.leaderboardTitle}>ARCHETYPE PERFORMANCE LEADERBOARD</h2>
              <p className={styles.leaderboardDesc}>
                Visual ranking showing which mythic character discipline drives the highest revenue, conversion, and margins.
              </p>
            </div>

            <div className={styles.totalBadge}>
              <span>TOTAL FILTERED NET:</span>
              <strong>₹{totalRevenue.toLocaleString('en-IN')}</strong> ({totalOrders} Orders from {totalSessions.toLocaleString()} Sessions)
            </div>

            {/* Sort Controls */}
            <div className={styles.sortControls}>
              <span className={styles.sortLabel}>SORT BY:</span>
              <button
                type="button"
                className={`${styles.sortPill} ${sortBy === 'revenue' ? styles.sortActive : ''}`}
                onClick={() => setSortBy('revenue')}
              >
                REVENUE (₹)
              </button>
              <button
                type="button"
                className={`${styles.sortPill} ${sortBy === 'conversion' ? styles.sortActive : ''}`}
                onClick={() => setSortBy('conversion')}
              >
                CONVERSION %
              </button>
              <button
                type="button"
                className={`${styles.sortPill} ${sortBy === 'orders' ? styles.sortActive : ''}`}
                onClick={() => setSortBy('orders')}
              >
                UNITS SOLD
              </button>
            </div>
          </div>

          <div className={styles.characterCardsList}>
            {filteredCharacters.map((char, index) => {
              const barWidthPercent = ((char.revenue / maxRevenue) * 100).toFixed(1);
              return (
                <div key={char.slug} className={styles.charRankCard}>
                  <div className={styles.charRankCol}>
                    <span className={styles.rankNum}>#{index + 1}</span>
                    <div className={styles.charIdentity}>
                      <CharacterEmblem characterSlug={char.slug} size={30} style={{ color: char.color }} />
                      <div>
                        <h3 className={styles.charRankName} style={{ color: char.color }}>{char.name}</h3>
                        <span className={styles.charRankSubtitle}>
                          {char.slug === 'bheema' && 'Heavy Compound Lift'}
                          {char.slug === 'arjun' && 'Dynamic Kinetic Velocity'}
                          {char.slug === 'karna' && 'Relentless Solitary Grind'}
                          {char.slug === 'sita' && 'Somatic Root Alignment'}
                          {char.slug === 'draupadi' && 'Plyometric Grip Agility'}
                          {char.slug === 'savitri' && 'Connective Tissue Longevity'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Horizontal Progress Bar */}
                  <div className={styles.visualBarCol}>
                    <div className={styles.barLabelRow}>
                      <span className={styles.barValueText}>
                        <strong>₹{(char.revenue / 100000).toFixed(2)} Lakhs</strong> ({char.orders} Orders)
                      </span>
                      <span className={styles.barMetaText}>
                        Conversion: <strong>{char.conversionRate}%</strong> | Margin: <strong style={{ color: '#34D399' }}>{char.contributionMargin}%</strong>
                      </span>
                    </div>

                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{
                          backgroundColor: char.color,
                          width: `${barWidthPercent}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Highlights Badge */}
                  <div className={styles.badgesCol}>
                    {char.conversionRate >= 3.6 && (
                      <span className={styles.highConvBadge}>⭐ TOP CONVERSION ({char.conversionRate}%)</span>
                    )}
                    {char.contributionMargin >= 44 && (
                      <span className={styles.highMarginBadge}>💰 HIGH MARGIN ({char.contributionMargin}%)</span>
                    )}
                    <span className={styles.sessionsBadge}>{char.sessions.toLocaleString()} SESSIONS</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Real-Time Behavioral Activity Stream (AN01) */}
        <section className={styles.liveStreamSection}>
          <div className={styles.streamHeader}>
            <div>
              <div className={styles.simBadge}>INSTRUMENTATION PIPELINE // AN01</div>
              <h2 className={styles.streamTitle}>REAL-TIME CUSTOMER ACTIVITY STREAM</h2>
              <p className={styles.streamDesc}>
                Live simulated behavioral telemetry tracking key discovery and purchasing events without capturing PII.
              </p>
            </div>
            <div className={styles.pulsingLive}>
              <span className={styles.pulseDot} />
              <span>LIVE INGESTION ENGINE CONNECTED</span>
            </div>
          </div>

          <div className={styles.eventsGrid}>
            {MOCK_ANALYTICS_EVENTS.map((ev) => (
              <div key={ev.id} className={styles.eventItemCard}>
                <div className={styles.eventItemTop}>
                  <span className={`${styles.eventActionPill} ${styles[`action_${ev.event}`]}`}>
                    {ev.event === 'order_captured' && '✓ ORDER PAID & SECURED'}
                    {ev.event === 'add_to_cart' && '+ ADDED CAPSULE TO BAG'}
                    {ev.event === 'checkout_started' && '⚡ CHECKOUT INITIATED'}
                    {ev.event === 'compare_used' && '⚖ SPEC COMPARISON OPENED'}
                    {ev.event === 'character_view' && '👁 EXPLORING ARCHETYPE'}
                    {ev.event === 'kit_view' && '📦 VIEWING KIT SPEC'}
                  </span>
                  <span className={styles.eventTimestamp}>{ev.timestamp}</span>
                </div>

                <div className={styles.eventStory}>
                  {ev.event === 'order_captured' && (
                    <span>Customer captured order for <strong>{ev.kitSlug}</strong> via campaign <code>{ev.campaign}</code>.</span>
                  )}
                  {ev.event === 'add_to_cart' && (
                    <span>Shopper placed <strong>{ev.kitSlug}</strong> into shopping bag from Instagram promo.</span>
                  )}
                  {ev.event === 'compare_used' && (
                    <span>Shopper launched head-to-head comparison between 2 kits on mobile.</span>
                  )}
                  {ev.event === 'character_view' && (
                    <span>Organic visitor reading mythic routine protocol for <strong>{ev.characterSlug?.toUpperCase()}</strong>.</span>
                  )}
                  {ev.event === 'checkout_started' && (
                    <span>Guest entered delivery PIN code validator for <strong>{ev.kitSlug}</strong>.</span>
                  )}
                  {ev.event === 'kit_view' && (
                    <span>Shopper inspected Bill of Materials specifications for <strong>{ev.kitSlug}</strong>.</span>
                  )}
                </div>

                <div className={styles.eventCardFooter}>
                  <span>SESSION: <code>{ev.sessionId}</code></span>
                  <span className={styles.noPiiTag}>✓ ANONYMIZED // NO PII</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
