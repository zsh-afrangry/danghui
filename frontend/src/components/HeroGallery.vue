<template>
  <section class="hero-gallery-section">
    <div class="container">
      <h2 class="section-title">抗战英雄图谱</h2>
      <p class="section-subtitle">铭记英烈，传承精神</p>
      
      <div class="heroes-grid">
        <div 
          v-for="(hero, index) in heroes" 
          :key="index"
          class="hero-card"
          :class="{ 'flipped': hero.id === flippedCard }"
          @click="flipCard(hero.id)"
        >
          <!-- 卡片正面 -->
          <div class="card-front">
            <div class="hero-avatar">
              <img 
                v-if="hero.image" 
                :src="hero.image" 
                :alt="hero.name"
                class="hero-image"
              />
              <div v-else class="avatar-placeholder">{{ hero.name.charAt(0) }}</div>
            </div>
            <h3 class="hero-name">{{ hero.name }}</h3>
            <p class="hero-title">{{ hero.title }}</p>
            <p class="hero-brief">{{ hero.brief }}</p>
            <div class="card-hint">点击查看详情</div>
          </div>
          
          <!-- 卡片背面 -->
          <div class="card-back">
            <h3 class="hero-name">{{ hero.name }}</h3>
            <div class="hero-details">
              <p class="hero-life">{{ hero.lifespan }}</p>
              <div class="hero-story">{{ hero.story }}</div>
              <blockquote v-if="hero.quote" class="hero-quote">
                "{{ hero.quote }}"
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroGallery',
  data() {
    return {
      flippedCard: null,
      heroes: [
        {
          id: 'liuxiang',
          name: '刘湘',
          title: '川军领袖',
          brief: '四川军阀，率川军出川抗战',
          lifespan: '1888-1938',
          image: '/images/Liu_Xiang.jpg',
          story: '刘湘是四川军阀的代表人物，抗战爆发后，他响应号召，率领川军第23集团军出川抗战。虽然与蒋介石政治立场不同，但在民族大义面前，他毅然选择抗日救国。1938年病逝于汉口，临终前留下遗嘱："抗战到底，还我河山！"',
          quote: '出川抗战，死而后已!'
        },
        {
          id: 'wangzuanxu',
          name: '王缵绪',
          title: '川军将领',
          brief: '率29集团军出川，坚持抗战',
          lifespan: '1885-1960',
          image: '/images/Wang_Zuanxu.jpg',
          story: '王缵绪是川军著名将领，抗战期间率第29集团军出川抗战，先后参加徐州会战、武汉会战等重大战役。他治军严明，作战勇敢，深受部下爱戴。抗战胜利后，坚持和平建国的理念。',
          quote: '川军出川，为国效力，义不容辞！'
        },
        {
          id: 'sunzhen',
          name: '孙震',
          title: '川军将领',
          brief: '第22集团军总司令',
          lifespan: '1892-1985',
          image: '/images/Sun_Zhen.jpg',
          story: '孙震是川军重要将领，抗战期间率第22集团军参加抗战。他指挥的川军在多次战役中表现英勇，为抗战胜利作出了重要贡献。战后继续为国家建设服务。',
          quote: '保家卫国，川军责无旁贷！'
        },
        {
          id: 'dengxihou',
          name: '邓锡侯',
          title: '川军元老',
          brief: '四川军政领袖，支持抗战',
          lifespan: '1889-1964',
          image: '/images/Deng_Xihou.jpg',
          story: '邓锡侯是四川著名军政人物，抗战期间积极支持抗战事业，组织川军出川，并在后方负责兵员补充和物资供应工作。他的努力为川军持续作战提供了重要保障。',
          quote: '四川子弟当为国家民族而战！'
        },
        {
          id: 'yangsen',
          name: '杨森',
          title: '川军将领',
          brief: '率部参加多次重大战役',
          lifespan: '1884-1977',
          image: '/images/Yang_Sen.jpg',
          story: '杨森是川军著名将领，抗战期间率第20军参加抗战，先后参加淞沪会战、武汉会战等重大战役。他指挥有方，作战勇敢，所部屡建战功。',
          quote: '宁死不屈，誓与阵地共存亡！'
        },
        {
          id: 'liuwenhui',
          name: '刘文辉',
          title: '西康省主席',
          brief: '在川西地区组织抗战',
          lifespan: '1895-1976',
          image: '/images/Liu_Wenhui.jpg',
          story: '刘文辉时任西康省主席，抗战期间在川西地区积极组织抗战，维护后方稳定，为前线作战提供了重要支持。后来他选择和平起义，为祖国统一作出贡献。',
          quote: '为民族独立而战，义无反顾！'
        }
      ]
    }
  },
  methods: {
    flipCard(heroId) {
      this.flippedCard = this.flippedCard === heroId ? null : heroId
    },
    showTooltip(location, event) {
      this.tooltip = {
        show: true,
        x: event.clientX,
        y: event.clientY - 10,
        content: location.typeText
      }
    },
    hideTooltip() {
      this.tooltip.show = false
    },
    selectLocation(location) {
      this.selectedLocation = location
    }
  }
}
</script>

<style scoped>
.hero-gallery-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: white;
  margin-bottom: 10px;
  font-weight: bold;
}

.section-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #e6f3ff;
  margin-bottom: 60px;
}

.heroes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.hero-card {
  position: relative;
  height: 350px;
  perspective: 1000px;
  cursor: pointer;
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: transform 0.6s ease;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.card-front {
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.card-back {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  transform: rotateY(180deg);
  overflow-y: auto;
}

.hero-card.flipped .card-front {
  transform: rotateY(180deg);
}

.hero-card.flipped .card-back {
  transform: rotateY(0deg);
}

.hero-avatar {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

.hero-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.hero-name {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: bold;
}

.card-back .hero-name {
  color: white;
  margin-bottom: 20px;
  text-align: center;
}

.hero-title {
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 15px;
}

.hero-brief {
  color: #7f8c8d;
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 20px;
}

.card-hint {
  color: #3498db;
  font-size: 0.9rem;
  opacity: 0.8;
}

.hero-details {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.hero-life {
  color: #ecf0f1;
  font-style: italic;
  margin-bottom: 15px;
  text-align: center;
}

.hero-story {
  line-height: 1.8;
  margin-bottom: 20px;
  flex-grow: 1;
}

.hero-quote {
  border-left: 4px solid #e74c3c;
  padding-left: 15px;
  font-style: italic;
  color: #ecf0f1;
  margin-top: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .heroes-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 20px;
  }
  
  .hero-card {
    height: 320px;
  }
  
  .card-front, .card-back {
    padding: 20px;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>