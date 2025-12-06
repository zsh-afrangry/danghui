<template>
  <section class="map-section" id="map">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">西迁之路</h2>
        <p class="section-subtitle">以四川为支点的战时迁徙图景</p>
        <p class="section-description">
          将高校、工厂、交通枢纽与战时首都串联，呈现"无川不成军"的地理版图。
        </p>
      </div>

      <div class="map-grid">
        <div class="map-text-panel">
          <h3>大后方关键信息</h3>
          <ul class="map-stats">
            <li v-for="item in statHighlights" :key="item.title" class="map-stat-item">
              <div class="stat-value">{{ item.value }}</div>
              <div class="stat-title">{{ item.title }}</div>
              <p class="stat-desc">{{ item.desc }}</p>
            </li>
          </ul>
          
          <!-- 迁徙路线说明 -->
          <div class="migration-routes">
            <h4>主要迁徙路线</h4>
            <ul class="route-list">
              <li v-for="route in migrationRoutes" :key="route.id" class="route-item">
                <span class="route-arrow" :style="{ color: route.color }">→</span>
                <span class="route-name">{{ route.name }}</span>
              </li>
            </ul>
          </div>
          
          <p class="map-note">
            数据来源整理自《四川省抗战史料汇编》《无川不成军》及馆藏档案，体现战时人、财、物的总体迁徙趋势。
          </p>
        </div>

        <div class="map-wrapper">
          <!-- 高德地图容器 -->
          <div id="amapContainer" class="amap-container"></div>

          <!-- 图例 -->
          <div class="map-legend">
            <h4>图例</h4>
            <div class="legend-list">
              <div v-for="item in legendItems" :key="item.key" class="legend-item">
                <span class="legend-dot" :class="item.key"></span>
                <span class="legend-text">{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 城市详情面板 -->
      <div v-if="selectedCity" class="city-detail-panel" @click.self="closeDetail">
        <div class="detail-card">
          <button class="close-btn" @click="closeDetail">×</button>
          <h3>{{ selectedCity.name }}</h3>
          <div class="detail-type">{{ selectedCity.typeText }}</div>
          <p class="detail-description">{{ selectedCity.detail }}</p>
          <div class="detail-significance">
            <h4>历史意义</h4>
            <p>{{ selectedCity.significance }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: 'InteractiveMap',
  data() {
    return {
      map: null,
      selectedCity: null,
      markers: [],
      polylines: [],
      statHighlights: [
        { title: '高校/科研机构', value: '60+', desc: '以重庆、成都为核心的战时教育文化圈' },
        { title: '内迁工厂', value: '70%+', desc: '全国大部分军工/民生产能转入四川腹地' },
        { title: '交通支线', value: '4条', desc: '川陕、川滇、川黔、川湘公路维系前线补给' }
      ],
      legendItems: [
        { key: 'capital', title: '战时首都' },
        { key: 'university', title: '高校科研' },
        { key: 'factory', title: '工业基地' },
        { key: 'transport', title: '交通枢纽' },
        { key: 'origin', title: '迁出节点' }
      ],
      // 迁徙路线数据
      migrationRoutes: [
        {
          id: 'route1',
          name: '沿海高校内迁',
          color: '#c0392b',
          path: [
            [116.4074, 39.9042], // 北京
            [114.3055, 30.5928], // 武汉
            [106.5516, 29.5630]  // 重庆
          ]
        },
        {
          id: 'route2',
          name: '东部工厂内迁',
          color: '#d35400',
          path: [
            [121.4737, 31.2304], // 上海
            [118.7969, 32.0603], // 南京
            [104.0668, 30.5728]  // 成都
          ]
        },
        {
          id: 'route3',
          name: '川军出川抗战',
          color: '#2980b9',
          path: [
            [104.0668, 30.5728], // 成都
            [108.9398, 34.3416], // 西安
            [114.5149, 38.0428]  // 石家庄
          ]
        },
        {
          id: 'route4',
          name: '物资运输通道',
          color: '#27ae60',
          path: [
            [106.5516, 29.5630], // 重庆
            [106.7135, 26.5783], // 贵阳
            [102.7123, 25.0406]  // 昆明
          ]
        }
      ],
      cityConnectionOrder: ['宜宾', '自贡', '内江', '成都', '广汉', '重庆'],
      // 城市数据（使用真实经纬度）
      cities: [
        {
          name: '重庆',
          position: [106.5516, 29.5630],
          type: 'capital',
          typeText: '战时首都',
          detail: '1937年11月，国民政府迁都重庆。重庆成为中国的战时首都，政治、军事、经济中心。同时，复旦大学、中央大学等多所大学迁至重庆地区。',
          significance: '作为战时首都，重庆承担了抗战期间的政治指挥中心作用，同时也是文化教育的重要基地。承受了长达5年半的"重庆大轰炸"。'
        },
        {
          name: '成都',
          position: [104.0668, 30.5728],
          type: 'university',
          typeText: '教育文化中心',
          detail: '抗战期间，成都成为大后方重要的教育文化中心。华西协合大学、四川大学等在此坚持教学，培养了大批抗战人才。',
          significance: '保持了中华民族的文化传承，为抗战和建设培养了大批知识分子。'
        },
        {
          name: '自贡',
          position: [104.7730, 29.3528],
          type: 'factory',
          typeText: '盐业重镇',
          detail: '自贡是中国重要的盐业生产基地，抗战期间为前线提供了大量的食盐，保障了军民的基本需求。川盐年产470万担，供应后方数亿军民。',
          significance: '盐业生产对于抗战的后勤保障具有重要意义，自贡盐场为抗战胜利做出了重要贡献。'
        },
        {
          name: '内江',
          position: [105.0661, 29.5872],
          type: 'factory',
          typeText: '工业基地',
          detail: '抗战期间，内江作为四川重要的工业城市，承接了部分内迁的工厂，为抗战提供了工业支持。大量军工厂内迁，形成西南工业集群。',
          significance: '工业迁移保存了中国的工业基础，为抗战和后来的建设奠定了基础。'
        },
        {
          name: '广汉',
          position: [104.2820, 30.9770],
          type: 'transport',
          typeText: '军用机场',
          detail: '广汉机场是抗战期间重要的军用机场之一，承担了大量的空中运输和作战任务。新津、广汉等机场短期内建成，供盟军B-29使用。',
          significance: '为盟军B-29轰炸机提供了重要的起降基地，支持了对日战略轰炸。'
        },
        {
          name: '宜宾',
          position: [104.6308, 28.7695],
          type: 'transport',
          typeText: '长江上游重镇',
          detail: '宜宾作为长江上游的重要城市，在抗战期间承担了重要的交通运输任务，同时也有部分学校和工厂迁至此地。',
          significance: '作为长江上游的门户，宜宾在抗战期间的交通运输和物资中转方面发挥了重要作用。连接川滇交通，保持战略通道畅通。'
        },
        {
          name: '乐山',
          position: [103.761, 29.553],
          type: 'university',
          typeText: '武汉大学内迁地',
          detail: '1938年，武汉大学西迁至乐山，在乐山大佛脚下坚持办学近八年。在艰苦的环境下，武大师生继续进行教学和科研活动，保存了文脉。',
          significance: '武汉大学的内迁是抗战时期高等教育内迁的缩影，体现了教育救国的坚定信念。'
        },
        {
          name: '泸州',
          position: [105.441, 28.871],
          type: 'transport',
          typeText: '川滇黔交通要冲',
          detail: '泸州地处川、滇、黔三省交界，是抗战时期重要的物资转运中心和军事要地，为西南运输网络提供了有力支撑。',
          significance: '保障了西南大后方的物资流通，是连接多条战略公路的关键节点。'
        },
        {
          name: '万县（今万州）',
          position: [108.384, 30.809],
          type: 'factory',
          typeText: '兵工产业基地',
          detail: '抗战时期， sejumlah兵工厂迁至万县，利用当地资源生产武器弹药，支援前线。成为后方重要的军工生产地之一。',
          significance: '为抗战前线提供了持续的武器弹药供给，是兵工内迁战略的重要一环。'
        },
        // 外部迁出节点
        {
          name: '北京',
          position: [116.4074, 39.9042],
          type: 'origin',
          typeText: '华北文化重镇',
          detail: '北大、清华、燕京等高校在战火中选择南迁，师生踏上漫长的内迁之路。',
          significance: '华北学术中心集体迁移，保存了民族文化命脉。'
        },
        {
          name: '上海',
          position: [121.4737, 31.2304],
          type: 'origin',
          typeText: '东部工业中心',
          detail: '大批工厂、银行、文化机构在上海沦陷后紧急拆迁，向内地转移产能。',
          significance: '转移的机器与技术支撑了大后方工业体系。'
        },
        {
          name: '南京',
          position: [118.7969, 32.0603],
          type: 'origin',
          typeText: '旧都迁徙起点',
          detail: '随首都西迁，南京的行政、教育与科研力量向重庆、成都转移。',
          significance: '大批中央机关与科研人才从此启程，保障战时统筹。'
        },
        {
          name: '武汉',
          position: [114.3055, 30.5928],
          type: 'origin',
          typeText: '抗战指挥中枢',
          detail: '武汉会战后，原本集中的军政机关继续向西撤退，成为进入四川的重要节点。',
          significance: '在国共合作的节点城市，承前启后连接东线与西线。'
        },
        {
          name: '石家庄',
          position: [114.5149, 38.0428],
          type: 'origin',
          typeText: '华北铁路枢纽',
          detail: '作为华北交通中心，石家庄承担了川军北上作战与物资北运的重要任务。',
          significance: '“川军出川”路线的重要驿站。'
        },
        {
          name: '贵阳',
          position: [106.7135, 26.5783],
          type: 'origin',
          typeText: '西南战略节点',
          detail: '川黔公路、黔滇缅公路在此交汇，是物资西运、出境的生命线。',
          significance: '补给线核心，保障滇缅公路畅通。'
        },
        {
          name: '昆明',
          position: [102.7123, 25.0406],
          type: 'origin',
          typeText: '滇缅门户',
          detail: '西南联大在昆明办学，滇缅公路与驼峰航线在此集散，连通国际援助。',
          significance: '成为国际援华通道，对抗战后期意义重大。'
        }
      ]
    }
  },
  mounted() {
    // 等待高德地图 API 加载完成
    this.waitForAMap()
  },
  beforeUnmount() {
    if (this.map) {
      this.map.destroy()
    }
  },
  methods: {
    waitForAMap() {
      // 检查 AMap 是否已加载
      if (window.AMap) {
        this.initMap()
      } else {
        // 如果还没加载，等待一段时间后重试
        setTimeout(() => {
          this.waitForAMap()
        }, 100)
      }
    },
    
    initMap() {
      // 初始化地图
      this.map = new AMap.Map('amapContainer', {
        zoom: 5, // 调整缩放级别以更好地显示中国
        center: [104, 35], // 设置中心点为中国大致中心
        mapStyle: 'amap://styles/grey', // 使用灰色地图作为基础
        viewMode: '2D'
      });

      // 设置地图允许显示的范围为中国
      const chinaBounds = new AMap.Bounds(
        [73.55, 18.15], // 西南角
        [135.08, 53.55]  // 东北角
      );
      this.map.setLimitBounds(chinaBounds);

      // 等待地图加载完成后添加标记和路线
      this.map.on('complete', () => {
        this.addMigrationRoutes()
        this.addCityMarkers()
        this.addCityNetwork()
      })
    },

    addMigrationRoutes() {
      // 添加迁徙路线
      this.migrationRoutes.forEach(route => {
        const polyline = new AMap.Polyline({
          path: route.path,
          strokeColor: route.color,
          strokeWeight: 4,
          strokeOpacity: 0.8,
          strokeStyle: 'solid',
          strokeDasharray: [10, 5],
          lineJoin: 'round',
          lineCap: 'round',
          showDir: true,
          dirColor: route.color
        })
        
        this.polylines.push(polyline)
        this.map.add(polyline)

        // 添加路线动画效果
        this.animatePolyline(polyline)
      })
    },

    animatePolyline(polyline) {
      let offset = 0
      setInterval(() => {
        offset += 1
        if (offset > 15) offset = 0
        polyline.setOptions({
          strokeDasharray: [10, 5, offset]
        })
      }, 100)
    },

    addCityMarkers() {
      this.cities.forEach(city => {
        // 创建自定义标记内容
        const markerContent = this.createMarkerContent(city)
        
        const marker = new AMap.Marker({
          position: city.position,
          content: markerContent,
          offset: new AMap.Pixel(-15, -15),
          title: city.name
        })

        // 点击标记显示详情
        marker.on('click', () => {
          this.selectCity(city)
        })

        this.markers.push(marker)
        this.map.add(marker)
      })
    },

    addCityNetwork() {
      const path = this.cityConnectionOrder
        .map(name => this.cities.find(city => city.name === name))
        .filter(Boolean)
        .map(city => city.position)

      if (path.length < 2) return

      const networkLine = new AMap.Polyline({
        path,
        strokeColor: '#e74c3c',
        strokeWeight: 5,
        strokeOpacity: 0.9,
        lineJoin: 'round',
        lineCap: 'round'
      })

      this.polylines.push(networkLine)
      this.map.add(networkLine)
    },

    createMarkerContent(city) {
      const colors = {
        capital: '#c0392b',
        university: '#2980b9',
        factory: '#d35400',
        transport: '#27ae60',
        origin: '#8e44ad'
      }

      const div = document.createElement('div')
      div.className = 'custom-marker'
      div.innerHTML = `
        <div class="marker-pin" style="background: ${colors[city.type]}">
          <div class="marker-pulse" style="border-color: ${colors[city.type]}"></div>
        </div>
        <div class="marker-label">${city.name}</div>
      `
      return div
    },

    selectCity(city) {
      this.selectedCity = city
      // 地图中心移动到选中的城市
      this.map.setCenter(city.position)
    },

    closeDetail() {
      this.selectedCity = null
    }
  }
}
</script>

<style scoped>
.map-section {
  padding: 80px 0;
  background: #f8f9fa;
  min-height: 100vh;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: bold;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #e74c3c;
  margin-bottom: 10px;
  font-weight: 600;
}

.section-description {
  font-size: 1rem;
  color: #7f8c8d;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.map-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 30px;
  align-items: start;
}

.map-text-panel {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 100px;
}

.map-text-panel h3 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 3px solid #e74c3c;
  padding-bottom: 10px;
}

.map-stats {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
}

.map-stat-item {
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #e74c3c;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 5px;
}

.stat-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
}

.stat-desc {
  font-size: 0.85rem;
  color: #7f8c8d;
  line-height: 1.4;
}

/* 迁徙路线说明 */
.migration-routes {
  margin-bottom: 20px;
}

.migration-routes h4 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: bold;
}

.route-list {
  list-style: none;
  padding: 0;
}

.route-item {
  padding: 8px 0;
  font-size: 0.9rem;
  color: #34495e;
  display: flex;
  align-items: center;
  gap: 8px;
}

.route-arrow {
  font-size: 1.2rem;
  font-weight: bold;
}

.route-name {
  flex: 1;
}

.map-note {
  font-size: 0.8rem;
  color: #95a5a6;
  line-height: 1.4;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ecf0f1;
}

.map-wrapper {
  position: relative;
}

/* 高德地图容器 */
.amap-container {
  width: 100%;
  height: 600px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: #e5e3df;
}

/* 自定义标记样式 */
:deep(.custom-marker) {
  position: relative;
  cursor: pointer;
}

:deep(.marker-pin) {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

:deep(.custom-marker:hover .marker-pin) {
  transform: scale(1.2);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

:deep(.marker-pulse) {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid;
  animation: pulse 2s infinite;
  opacity: 0.6;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

:deep(.marker-label) {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(44, 62, 80, 0.9);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: bold;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}

/* 图例 */
.map-legend {
  margin-top: 20px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.map-legend h4 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: bold;
}

.legend-list {
  display: grid;
  gap: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.legend-dot.capital {
  background: #c0392b;
}

.legend-dot.university {
  background: #2980b9;
}

.legend-dot.factory {
  background: #d35400;
}

.legend-dot.transport {
  background: #27ae60;
}

.legend-text {
  color: #2c3e50;
}

/* 城市详情面板 */
.city-detail-panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.detail-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #7f8c8d;
  line-height: 1;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #e74c3c;
}

.detail-card h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 10px;
  padding-right: 30px;
}

.detail-type {
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.detail-description {
  line-height: 1.8;
  color: #34495e;
  margin-bottom: 20px;
  font-size: 1rem;
}

.detail-significance h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.detail-significance p {
  line-height: 1.8;
  color: #7f8c8d;
}

/* 响应式设计 */
@media (max-width: 968px) {
  .map-grid {
    grid-template-columns: 1fr;
  }
  
  .map-text-panel {
    position: static;
  }
  
  .amap-container {
    height: 500px;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .amap-container {
    height: 400px;
  }
  
  .detail-card {
    padding: 20px;
    margin: 10px;
  }
  
  .detail-card h3 {
    font-size: 1.5rem;
  }
  
  :deep(.marker-label) {
    font-size: 11px;
    padding: 3px 8px;
  }
}
</style>
