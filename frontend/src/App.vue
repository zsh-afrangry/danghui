<template>
  <div id="app">
    <!-- 页头导航 -->
    <header class="header">
      <div class="container">
        <h1 class="title">烽火传承 数字记忆</h1>
        <nav class="navbar">
          <a href="#hero" @click="scrollTo('hero')" class="nav-link">序章</a>
          <a href="#timeline" @click="scrollTo('timeline')" class="nav-link">烽火时间线</a>
          <a href="#map" @click="scrollTo('map')" class="nav-link">西迁地图</a>
          <a href="#heroes" @click="scrollTo('heroes')" class="nav-link">英雄图谱</a>
          <a href="#dataviz" @click="scrollTo('dataviz')" class="nav-link">数据看板</a>
          <a href="#ending" @click="scrollTo('ending')" class="nav-link">结束</a>
        </nav>
      </div>
    </header>

    <!-- 主内容区域 -->
    <main class="main-content">
      <HeroSection id="hero" />
      <TimeLine id="timeline" />
      <InteractiveMap id="map" />
      <HeroGallery id="heroes" />
      <DataViz id="dataviz" />
      <EndingSection id="ending" />
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 计算机学院本科第二党支部 | 纪念抗日战争胜利80周年</p>
      </div>
    </footer>
  </div>
</template>

<script>
import HeroSection from './components/HeroSection.vue'
import TimeLine from './components/Timeline.vue'
import InteractiveMap from './components/InteractiveMap.vue'
import HeroGallery from './components/HeroGallery.vue'
import DataViz from './components/DataViz.vue'
import EndingSection from './components/EndingSection.vue'

export default {
  name: 'App',
  components: {
    HeroSection,
    TimeLine,
    InteractiveMap,
    HeroGallery,
    DataViz,
    EndingSection
  },
  methods: {
    scrollTo(elementId) {
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

#app {
  min-height: 100vh;
  background: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 页头样式 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(220, 53, 69, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 15px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
}

.navbar {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* 主内容区域 */
.main-content {
  padding-top: 80px; /* 为固定头部留出空间 */
}

/* 页脚样式 */
.footer {
  background: #dc3545;
  color: #fff;
  text-align: center;
  padding: 30px 0;
  margin-top: 50px;
}

.footer p {
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header .container {
    flex-direction: column;
    gap: 15px;
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .navbar {
    gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-link {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
  
  .main-content {
    padding-top: 120px;
  }
}
</style>
