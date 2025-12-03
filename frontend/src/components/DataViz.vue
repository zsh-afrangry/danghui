<template>
  <section class="dataviz-section">
    <div class="container">
      <h2 class="section-title">数据看板</h2>
      <p class="section-subtitle">用数据诉说四川在抗战中的贡献</p>
      
      <!-- 顶部横幅（占位图做纹理背景） -->
      <div class="dataviz-hero reveal-on-scroll">
        <div class="hero-bg" style="background-image: url('/images/image1.jpg')"></div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="hero-title">无川不成军 · 大后方之柱</div>
          <div class="hero-subtitle">兵源、军粮、工业、文化——四川在抗战中的四重担当</div>
        </div>
      </div>
      
      <div class="charts-grid">
        <!-- 川军参战统计 -->
        <div class="chart-card">
          <h3 class="chart-title">川军出征统计</h3>
          <div class="chart-container">
            <div class="bar-chart">
              <div class="chart-item">
                <div class="chart-label">出川兵力</div>
                <div class="chart-bar">
                  <div class="bar-fill" :style="{ width: '85%' }" data-value="300万+"></div>
                </div>
              </div>
              <div class="chart-item">
                <div class="chart-label">参战师团</div>
                <div class="chart-bar">
                  <div class="bar-fill" :style="{ width: '70%' }" data-value="64个师"></div>
                </div>
              </div>
              <div class="chart-item">
                <div class="chart-label">伤亡人数</div>
                <div class="chart-bar">
                  <div class="bar-fill" :style="{ width: '60%' }" data-value="64万+"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 大后方贡献饼图 -->
        <div class="chart-card">
          <h3 class="chart-title">大后方资源贡献</h3>
          <div class="chart-container">
            <div class="pie-chart">
              <svg viewBox="0 0 200 200" class="pie-svg">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e8f4fd" stroke-width="20" />
                <circle 
                  v-for="(segment, index) in pieSegments" 
                  :key="index"
                  cx="100" 
                  cy="100" 
                  r="80" 
                  fill="none" 
                  :stroke="segment.color" 
                  stroke-width="20"
                  :stroke-dasharray="segment.dashArray"
                  :stroke-dashoffset="segment.dashOffset"
                  class="pie-segment"
                />
                <text x="100" y="105" text-anchor="middle" class="pie-center-text">
                  四川贡献
                </text>
              </svg>
              <div class="pie-legend">
                <div v-for="item in pieData" :key="item.label" class="legend-item">
                  <span class="legend-color" :style="{ background: item.color }"></span>
                  <span class="legend-label">{{ item.label }}: {{ item.percentage }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 环形占比图：税收、军粮、工厂内迁 -->
        <div class="chart-card">
          <h3 class="chart-title">关键占比一览</h3>
          <div class="rings-grid">
            <div v-for="(ring, idx) in rings" :key="idx" class="ring-item reveal-on-scroll" :style="{ '--percent': ring.value + '%', '--color': ring.color }">
              <div class="ring-visual">
                <div class="ring-core"></div>
                <div class="ring-progress"></div>
                <div class="ring-label">
                  <div class="ring-value">{{ ring.value }}<span class="ring-unit">{{ ring.unit }}</span></div>
                  <div class="ring-title">{{ ring.title }}</div>
                </div>
              </div>
              <div class="ring-desc">{{ ring.desc }}</div>
            </div>
          </div>
        </div>

        <!-- 文化与教育中心指数（雷达图） -->
        <div class="chart-card">
          <h3 class="chart-title">文化与教育中心指数</h3>
          <div class="chart-container">
            <div class="radar-chart reveal-on-scroll">
              <svg viewBox="0 0 260 260" class="radar-svg">
                <!-- 同心圆网格 -->
                <g class="radar-grid">
                  <circle cx="130" cy="130" r="30" />
                  <circle cx="130" cy="130" r="60" />
                  <circle cx="130" cy="130" r="90" />
                </g>
                <!-- 轴线 -->
                <g class="radar-axes">
                  <line v-for="(a, idx) in radar.axes" :key="'axis-'+idx" x1="130" y1="130" :x2="a.x" :y2="a.y" />
                </g>
                <!-- 多边形 -->
                <polygon class="radar-polygon" :points="radar.points" />
                <!-- 维度标签 -->
                <g class="radar-labels">
                  <text v-for="(l, idx) in radar.labels" :key="'label-'+idx" :x="l.x" :y="l.y" :text-anchor="l.anchor" dy="0.35em">{{ l.text }}</text>
                </g>
              </svg>
              <div class="radar-legend">
                <div v-for="item in radarData" :key="item.label" class="radar-legend-item">
                  <span class="legend-dot"></span>
                  <span class="legend-text">{{ item.label }}：{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 重要数据指标（计数动画 + 图标） -->
        <div class="chart-card full-width">
          <h3 class="chart-title">抗战关键数据</h3>
          <div class="stats-grid" id="statsGrid">
            <div 
              v-for="m in keyMetrics" 
              :key="m.label" 
              class="stat-item reveal-on-scroll"
              :style="{ '--shadow': m.color }"
            >
              <img class="stat-icon" src="/images/image1.jpg" alt="icon" />
              <div class="stat-number counter">
                {{ displayValue(m.current, m.decimals) }}<span class="stat-suffix">{{ m.suffix }}</span>
              </div>
              <div class="stat-label">{{ m.label }}</div>
              <div class="stat-desc">{{ m.desc }}</div>
            </div>
          </div>
        </div>
      
        <!-- 叙述信息卡（图+要点） -->
        <div class="chart-card full-width">
          <h3 class="chart-title">数据背后的故事</h3>
          <div class="narratives-grid">
            <div class="narrative-card reveal-on-scroll" @click="openNarrative(0)">
              <div class="narrative-media" style="background-image: url('/images/image1.jpg')"></div>
              <div class="narrative-content">
                <div class="narrative-title">无川不成军</div>
                <ul class="narrative-list">
                  <li>出川抗战人数超 340万，占全国近五分之一</li>
                  <li>多次大会战浴血奋战，淞沪会战伤亡过半</li>
                  <li>“十万青年十万军”，青年踊跃参军</li>
                </ul>
              </div>
            </div>
            <div class="narrative-card reveal-on-scroll" @click="openNarrative(1)">
              <div class="narrative-media" style="background-image: url('/images/image1.jpg')"></div>
              <div class="narrative-content">
                <div class="narrative-title">大后方的基石</div>
                <ul class="narrative-list">
                  <li>战时税收占比逾 30%，一度高达 50%</li>
                  <li>自贡盐业年产达 470万担，供养后方数亿军民</li>
                  <li>70%+ 工厂内迁四川，形成战时工业中心</li>
                </ul>
              </div>
            </div>
            <div class="narrative-card reveal-on-scroll" @click="openNarrative(2)">
              <div class="narrative-media" style="background-image: url('/images/image1.jpg')"></div>
              <div class="narrative-content">
                <div class="narrative-title">民力的总动员</div>
                <ul class="narrative-list">
                  <li>民工动员总数超 500万人次</li>
                  <li>新津、广汉等机场在极短时间修建完成</li>
                  <li>四大生命线公路抢修，物资畅通前线</li>
                </ul>
              </div>
            </div>
            <div class="narrative-card reveal-on-scroll" @click="openNarrative(3)">
              <div class="narrative-media" style="background-image: url('/images/image1.jpg')"></div>
              <div class="narrative-content">
                <div class="narrative-title">精神的堡垒</div>
                <ul class="narrative-list">
                  <li>重庆为战时首都与远东指挥中心</li>
                  <li>高校与文化名人内迁，守护文化火种</li>
                  <li>重庆大轰炸 5年半，城市不屈不挠</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 叙述详情弹窗 -->
        <div v-if="activeNarrative !== null" class="modal-overlay" @click.self="closeNarrative">
          <div class="modal-card">
            <button class="modal-close" @click="closeNarrative">×</button>
            <div class="modal-header">
              <div class="modal-title">{{ narrativeDetails[activeNarrative].title }}</div>
              <div class="modal-sub">{{ narrativeDetails[activeNarrative].subtitle }}</div>
            </div>
            <div class="modal-body">
              <div class="modal-media" :style="{ backgroundImage: `url(${narrativeDetails[activeNarrative].image})` }"></div>
              <div class="modal-content">
                <p v-for="(p, idx) in narrativeDetails[activeNarrative].paragraphs" :key="idx" class="modal-paragraph">{{ p }}</p>
                <ul class="modal-bullets">
                  <li v-for="(b, idx) in narrativeDetails[activeNarrative].bullets" :key="'b-'+idx">{{ b }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DataViz',
  data() {
    return {
      pieData: [
        { label: '兵员', percentage: 35, color: '#e74c3c' },
        { label: '粮食', percentage: 33, color: '#f39c12' },
        { label: '物资', percentage: 20, color: '#3498db' },
        { label: '其他', percentage: 12, color: '#2ecc71' }
      ],
      keyMetrics: [
        { value: 340, decimals: 0, suffix: '万+', label: '出川抗战人数', desc: '占全国出征近五分之一', current: 0, color: 'rgba(231, 76, 60, 0.5)' },
        { value: 64.6, decimals: 1, suffix: '万', label: '川军伤亡', desc: '阵亡26.4万 负伤35.6万 失踪2.6万', current: 0, color: 'rgba(52, 152, 219, 0.5)' },
        { value: 38, decimals: 0, suffix: '%', label: '1944年军粮占比', desc: '当年四川负担全国军粮的38%', current: 0, color: 'rgba(243, 156, 18, 0.5)' },
        { value: 70, decimals: 0, suffix: '%', label: '工厂内迁四川', desc: '全国70%+工厂内迁至四川', current: 0, color: 'rgba(46, 204, 113, 0.5)' }
      ],
      rings: [
        { title: '战时税收占比', value: 30, unit: '%', color: '#e74c3c', desc: '四川上缴税收占战时总收入30%+，峰值约50%' },
        { title: '军粮负担占比', value: 38, unit: '%', color: '#f39c12', desc: '最困难时期承担全国军粮的38%' },
        { title: '工厂内迁比例', value: 70, unit: '%', color: '#3498db', desc: '全国70%以上工厂内迁四川' }
      ],
      hasAnimatedCounters: false,
      activeNarrative: null,
      narrativeDetails: [
        {
          key: 'army',
          title: '无川不成军',
          subtitle: '340万+出征，浴血八年',
          image: '/images/image1.jpg',
          paragraphs: [
            '四川（含原西康）出川抗战 340万+，几乎参加所有大型会战，付出惨烈牺牲。',
            '“十万青年十万军”号召下，大批青年学子踊跃入伍，奔赴前线。'
          ],
          bullets: [
            '淞沪会战：川军先抵奋战，伤亡过半',
            '多条战线机动作战，屡建战功',
            '将士铁血，慷慨赴难'
          ]
        },
        {
          key: 'rear',
          title: '大后方的基石',
          subtitle: '财政与物资的极限支撑',
          image: '/images/image1.jpg',
          paragraphs: [
            '四川承担战时财政重任，上缴税收占比30%+，峰值约50%。',
            '自贡盐业成为后方“咸脉”，支撑后方民生与军需。'
          ],
          bullets: [
            '粮食：1944年负担全国军粮38%',
            '食盐：1943年达470万担',
            '工业：70%+工厂内迁四川'
          ]
        },
        {
          key: 'labor',
          title: '民力的总动员',
          subtitle: '修机场、抢公路、保运输',
          image: '/images/image1.jpg',
          paragraphs: [
            '民工动员 500万+ 人次，修建军用机场，维护四大生命线公路。',
            '用最原始的工具也能创造奇迹，展现人民伟力。'
          ],
          bullets: [
            '新津、广汉等大型机场拔地而起',
            '川陕、川黔、川滇、川湘公路畅通',
            '人力物力汇聚，支援前线'
          ]
        },
        {
          key: 'culture',
          title: '精神的堡垒',
          subtitle: '战时首都与文化火种',
          image: '/images/image1.jpg',
          paragraphs: [
            '重庆为战时首都与远东指挥中心，四川成为文化与教育中心。',
            '面对长期轰炸，城市与人民不屈不挠，守护文明薪火。'
          ],
          bullets: [
            '高校与科研机构大规模内迁',
            '文化出版坚持不断线',
            '重庆大轰炸 5年半'
          ]
        }
      ]
    }
  },
  computed: {
    pieSegments() {
      const segments = []
      let cumulativePercentage = 0
      const radius = 80
      const circumference = 2 * Math.PI * radius

      this.pieData.forEach(item => {
        const dashArray = `${(item.percentage / 100) * circumference} ${circumference}`
        const dashOffset = circumference - (cumulativePercentage / 100) * circumference
        
        segments.push({
          color: item.color,
          dashArray: dashArray,
          dashOffset: dashOffset
        })
        
        cumulativePercentage += item.percentage
      })
      
      return segments
    },
    radar() {
      // 雷达图计算
      const centerX = 130
      const centerY = 130
      const maxRadius = 90
      const angles = [ -90, -18, 54, 126, 198 ] // 五维
      const toRad = (deg) => deg * Math.PI / 180

      const norm = (v, max) => Math.max(0, Math.min(1, v / max))
      const localMax = 100

      const points = []
      const axes = []
      const labels = []

      const values = this.radarData.map(d => norm(d.value, localMax))
      const rawAngles = angles.map(a => toRad(a))

      rawAngles.forEach((ang, idx) => {
        const axisX = centerX + Math.cos(ang) * maxRadius
        const axisY = centerY + Math.sin(ang) * maxRadius
        axes.push({ x: axisX, y: axisY })

        const r = maxRadius * values[idx]
        const px = centerX + Math.cos(ang) * r
        const py = centerY + Math.sin(ang) * r
        points.push(`${px},${py}`)

        const labelOffset = 18
        const lx = centerX + Math.cos(ang) * (maxRadius + labelOffset)
        const ly = centerY + Math.sin(ang) * (maxRadius + labelOffset)
        const anchor = Math.cos(ang) > 0.2 ? 'start' : (Math.cos(ang) < -0.2 ? 'end' : 'middle')
        labels.push({ x: lx, y: ly, text: this.radarData[idx].label, anchor })
      })

      return {
        axes,
        points: points.join(' '),
        labels
      }
    }
  },
  created() {
    // 文化与教育指数数据（0-100）
    this.radarData = [
      { label: '高校内迁', value: 92 },
      { label: '科研力量', value: 78 },
      { label: '文化传承', value: 85 },
      { label: '战时出版', value: 70 },
      { label: '国际影响', value: 60 }
    ]
  },
  mounted() {
    // 滚动显隐动画
    const revealTargets = document.querySelectorAll('.reveal-on-scroll')
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view')
        }
      })
    }, { threshold: 0.15 })
    revealTargets.forEach(el => revealObserver.observe(el))

    // 计数动画（进入视口一次触发）
    const statsEl = document.getElementById('statsGrid')
    if (statsEl) {
      const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimatedCounters) {
            this.hasAnimatedCounters = true
            this.startCounters()
          }
        })
      }, { threshold: 0.3 })
      counterObserver.observe(statsEl)
    }
  },
  methods: {
    displayValue(val, decimals) {
      const factor = Math.pow(10, decimals)
      const rounded = Math.round(val * factor) / factor
      return decimals === 0 ? Math.round(rounded) : rounded.toFixed(decimals)
    },
    startCounters() {
      const durationMs = 1200
      const startTime = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - startTime) / durationMs)
        const ease = 1 - Math.pow(1 - t, 3)
        this.keyMetrics.forEach(m => {
          m.current = m.value * ease
        })
        if (t < 1) {
          requestAnimationFrame(tick)
        } else {
          this.keyMetrics.forEach(m => { m.current = m.value })
        }
      }
      requestAnimationFrame(tick)
    },
    openNarrative(index) {
      this.activeNarrative = index
      document.body.style.overflow = 'hidden'
    },
    closeNarrative() {
      this.activeNarrative = null
      document.body.style.overflow = ''
    }
  }
}
</script>

<style scoped>
.dataviz-section {
  padding: 80px 0;
  background: #f8f9fa;
  min-height: 100vh;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: bold;
}

.section-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 60px;
}

/* 顶部横幅 */
.dataviz-hero {
  position: relative;
  height: 280px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.8s ease;
}
.dataviz-hero.in-view {
  transform: translateY(0);
  opacity: 1;
}
.dataviz-hero .hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: grayscale(10%) contrast(1.05) brightness(0.9);
}
.dataviz-hero .hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.1), rgba(0,0,0,0.45));
}
.dataviz-hero .hero-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  padding: 0 20px;
}
.dataviz-hero .hero-title {
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-shadow: 0 4px 16px rgba(0,0,0,0.35);
}
.dataviz-hero .hero-subtitle {
  margin-top: 8px;
  font-size: 1rem;
  opacity: 0.9;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.chart-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.chart-card:hover {
  transform: translateY(-5px);
}

.chart-card.full-width {
  grid-column: 1 / -1;
}

.chart-title {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
}

.chart-container {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 条形图样式 */
.bar-chart {
  width: 100%;
}

.chart-item {
  margin-bottom: 20px;
}

.chart-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 5px;
}

.chart-bar {
  position: relative;
  height: 30px;
  background: #ecf0f1;
  border-radius: 15px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2980b9);
  border-radius: 15px;
  position: relative;
  transition: width 1s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
}

.bar-fill::after {
  content: attr(data-value);
}

/* 饼图样式 */
.pie-chart {
  display: flex;
  align-items: center;
  gap: 30px;
}

.pie-svg {
  width: 150px;
  height: 150px;
}

.pie-segment {
  transition: stroke-width 0.3s ease;
  cursor: pointer;
}

.pie-segment:hover {
  stroke-width: 25;
}

.pie-center-text {
  font-size: 12px;
  font-weight: bold;
  fill: #2c3e50;
}

.pie-legend {
  flex: 1;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-label {
  color: #2c3e50;
}

/* 雷达图 */
.radar-chart { display: grid; grid-template-columns: 260px 1fr; gap: 20px; align-items: center; }
.radar-svg { width: 260px; height: 260px; }
.radar-grid circle { fill: none; stroke: #ecf0f1; stroke-width: 1; }
.radar-axes line { stroke: #d0d7de; stroke-width: 1; }
.radar-polygon { fill: rgba(231, 76, 60, 0.25); stroke: #e74c3c; stroke-width: 2; filter: drop-shadow(0 6px 14px rgba(231,76,60,0.25)); transition: transform 0.3s ease; }
.radar-chart:hover .radar-polygon { transform: scale(1.02); transform-origin: 130px 130px; }
.radar-labels text { font-size: 12px; fill: #2c3e50; font-weight: 600; }
.radar-legend { display: grid; gap: 8px; }
.radar-legend-item { display: flex; align-items: center; gap: 8px; }
.radar-legend-item .legend-dot { width: 10px; height: 10px; border-radius: 50%; background: #e74c3c; box-shadow: 0 2px 6px rgba(231,76,60,0.5); }
.radar-legend-item .legend-text { font-size: 0.9rem; color: #2c3e50; }

/* 环形占比图 */
.rings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 24px;
}
.ring-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}
.ring-visual {
  position: relative;
  width: 140px;
  height: 140px;
}
.ring-core {
  position: absolute;
  inset: 12px;
  background: #fff;
  border-radius: 50%;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.06);
}
.ring-progress {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(var(--color) var(--percent), #ecf0f1 var(--percent));
  filter: drop-shadow(0 6px 18px rgba(0,0,0,0.15));
  transition: filter 0.3s ease;
}
.ring-item:hover .ring-progress {
  filter: drop-shadow(0 10px 24px rgba(0,0,0,0.22));
}
.ring-label {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.ring-value {
  font-size: 1.6rem;
  font-weight: 800;
  color: #2c3e50;
}
.ring-unit {
  font-size: 0.9rem;
  margin-left: 2px;
  color: #7f8c8d;
}
.ring-title {
  font-size: 0.95rem;
  color: #2c3e50;
  margin-top: 4px;
}
.ring-desc {
  font-size: 0.85rem;
  color: #6c7a89;
}

/* 统计数据网格（重构光影与图标） */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.stat-item {
  text-align: center;
  padding: 22px 18px;
  background: linear-gradient(160deg, #ffffff, #f7f9fc);
  border-radius: 16px;
  color: #2c3e50;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.6) inset;
  border: 1px solid rgba(0,0,0,0.05);
  position: relative;
}
.stat-item::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  box-shadow: 0 20px 50px var(--shadow, rgba(0,0,0,0.06));
  opacity: 0.25;
  pointer-events: none;
}
.stat-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.12);
}
.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  object-fit: cover;
  filter: grayscale(10%);
  box-shadow: 0 6px 14px rgba(0,0,0,0.15);
  margin: 0 auto 8px;
  display: block;
}

.stat-number {
  font-size: 2.3rem;
  font-weight: 800;
  margin-bottom: 6px;
  color: #2c3e50;
}

.stat-label {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: #34495e;
}

.stat-desc {
  font-size: 0.88rem;
  opacity: 0.9;
  line-height: 1.4;
  color: #5d6d7e;
}

.stat-suffix {
  font-size: 1rem;
  margin-left: 2px;
  color: #7f8c8d;
  font-weight: 600;
}

/* 叙述信息卡 */
.narratives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}
.narrative-card {
  display: grid;
  grid-template-rows: 150px auto;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}
.narrative-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.12);
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}
.modal-card {
  width: min(880px, 100%);
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  overflow: hidden;
  animation: modalIn 0.25s ease both;
}
.modal-close {
  position: absolute;
  top: 10px;
  right: 14px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(0,0,0,0.05);
  cursor: pointer;
  font-size: 22px;
  line-height: 36px;
}
.modal-header { position: relative; padding: 18px 20px 0 20px; }
.modal-title { font-size: 1.3rem; font-weight: 800; color: #2c3e50; }
.modal-sub { font-size: 0.95rem; color: #6c7a89; margin-top: 4px; }
.modal-body { display: grid; grid-template-columns: 300px 1fr; gap: 16px; padding: 16px 20px 20px 20px; }
.modal-media { width: 100%; height: 200px; background-size: cover; background-position: center; border-radius: 12px; }
.modal-content { max-height: 360px; overflow: auto; padding-right: 4px; }
.modal-paragraph { margin-bottom: 10px; color: #34495e; }
.modal-bullets { padding-left: 18px; color: #4d5b6a; }
.modal-bullets li { margin: 6px 0; }

@keyframes modalIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.narrative-media {
  background-size: cover;
  background-position: center;
  filter: grayscale(8%);
}
.narrative-content {
  padding: 14px 16px;
}
.narrative-title {
  font-size: 1.05rem;
  font-weight: 800;
  margin-bottom: 8px;
  color: #2c3e50;
}
.narrative-list {
  padding-left: 18px;
  color: #4d5b6a;
}
.narrative-list li {
  margin: 6px 0;
}

/* 滚动显隐动画 */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .chart-card {
    padding: 20px;
  }
  
  .chart-container {
    height: 200px;
  }
  
  .pie-chart {
    flex-direction: column;
    gap: 20px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>