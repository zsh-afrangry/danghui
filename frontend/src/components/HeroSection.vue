<template>
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-text">
        <h2 class="hero-title">烽火传承 数字记忆</h2>
        <p class="hero-subtitle">纪念抗日战争胜利80周年</p>
        <p class="hero-description">
          一寸山河一寸血，十万青年十万军。八十年前，中华民族面临存亡危局，无数先辈投身于伟大的抗日战争。四川，作为战略大后方，不仅是支撑全国抗战的坚实壁垒，更有三百万川军将士出川远征，以血肉之躯筑起了不倒的长城。本项目旨在通过数字化的方式，再现那段烽火岁月，铭记四川人民的卓绝贡献，传承不朽的抗战精神。
        </p>
        <button @click="startExplore" class="explore-btn">
          开始探索
          <span class="arrow">↓</span>
        </button>
      </div>
    </div>
    <div class="hero-bg"></div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      backgroundImage: 'XZ/images/image1.jpg'
    }
  },
  methods: {
    startExplore() {
      const timeline = document.getElementById('timeline')
      if (timeline) {
        timeline.scrollIntoView({ behavior: 'smooth' })
      }
    }
  },
  mounted() {
    // 动态设置背景图片
    const heroBg = this.$el.querySelector('.hero-bg')
    if (heroBg) {
      heroBg.style.backgroundImage = `url('${this.backgroundImage}')`
    }
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 移除了hero-overlay，直接显示图片 */

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #000;
  max-width: 800px;
  padding: 0 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: #000;
  font-weight: 400;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 40px;
  color: #000;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}

.explore-btn {
  background: linear-gradient(45deg, #ff6b6b, #ee5a5a);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.explore-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.arrow {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .explore-btn {
    padding: 12px 24px;
    font-size: 1rem;
  }
}
</style>