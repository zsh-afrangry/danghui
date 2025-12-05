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
          title: '集团军总司令',
          brief: '四川军阀，率川军出川抗战',
          lifespan: '1888-1938',
          image: 'YXTP/images/Liu_Xiang.jpg',
          story: '第七战区司令长官，率川军出川抗战，发表《告川康军民书》，病逝于汉口前线，留下“抗战到底，始终不渝”的遗言。',
          quote: '出川抗战，死而后已!'
        },
        {
          id: 'wangzuanxu',
          name: '王缵绪',
          title: '集团军总司令',
          brief: '率29集团军出川，坚持抗战',
          lifespan: '1885-1960',
          image: 'YXTP/images/Wang_Zuanxu.jpg',
          story: '第29集团军总司令，率部参加了武汉会战、鄂西会战等多次重大战役，屡建战功。',
          quote: '川军出川，为国效力，义不容辞！'
        },
        {
          id: 'sunzhen',
          name: '孙震',
          title: '集团军总司令',
          brief: '第22集团军总司令',
          lifespan: '1892-1985',
          image: 'YXTP/images/Sun_Zhen.jpg',
          story: '第22集团军总司令，在台儿庄战役中坚守滕县，为大捷创造了条件。后参与武汉会战、随枣会战等。',
          quote: '保家卫国，川军责无旁贷！'
        },
        {
          id: 'dengxihou',
          name: '邓锡侯',
          title: '集团军总司令',
          brief: '四川军政领袖，支持抗战',
          lifespan: '1889-1964',
          image: 'YXTP/images/Deng_Xihou.jpg',
          story: '川军将领，第22集团军总司令。率部参加了太原会战、徐州会战等重要战役，坚守山西抗战前线。',
          quote: '四川子弟当为国家民族而战！'
        },
        {
          id: 'yangsen',
          name: '杨森',
          title: '集团军总司令',
          brief: '率部参加多次重大战役',
          lifespan: '1884-1977',
          image: 'YXTP/images/Yang_Sen.jpg',
          story: '第27集团军总司令，率部参加了淞沪会战、长沙会战等，以其“草鞋兵”闻名，作战勇猛。',
          quote: '宁死不屈，誓与阵地共存亡！'
        },
        {
          id: 'liuwenhui',
          name: '刘文辉',
          title: '省主席',
          brief: '在川西地区组织抗战',
          lifespan: '1895-1976',
          image: 'YXTP/images/Liu_Wenhui.jpg',
          story: '时任西康省主席，在后方积极组织抗战力量，整训部队，筹措军粮，为抗战胜利做出了重要贡献。',
          quote: '为民族独立而战，义无反顾！'
        },
        {
          id: 'zhaoyiman',
          name: '赵一曼',
          title: '抗日女英雄',
          brief: '东北抗日联军杰出指挥员',
          lifespan: '1905-1936',
          image: null,
          story: '赵一曼是四川宜宾人，是东北抗日联军的著名领导人。她在与日寇的斗争中被捕，面对酷刑坚贞不屈，最后英勇就义。她留下的“未惜头颅新故国，甘将热血沃中华”的诗句，激励了无数后人。',
          quote: '我的主义，就是抗日！'
        },
        {
          id: 'zhangzizhong',
          name: '张自忠',
          title: '集团军总司令',
          brief: '在枣宜会战中壮烈殉国的集团军总司令',
          lifespan: '1891-1940',
          image: null,
          story: '张自忠将军是抗日战争中牺牲的最高级别将领。他率部参加了临沂保卫战、徐州会战、武汉会战等。1940年在枣宜会战中，他亲率部队渡河作战，身陷重围，最终壮烈殉国，实践了他“为国家民族死之决心”的誓言。',
          quote: '国家到了如此地-步，除我等为其死，毫无其他办法。'
        },
        {
          id: 'wangmingzhang',
          name: '王铭章',
          title: '师长',
          brief: '滕县保卫战中壮烈殉国',
          lifespan: '1893-1938',
          image: 'FHSJX/images/taierzhuangzhanyi.png',
          story: '在台儿庄战役的滕县保卫战中，率部死守，身中数弹，壮烈殉国。为台儿庄大捷的胜利奠定了基础。',
          quote: ''
        },
        {
          id: 'raoguohua',
          name: '饶国华',
          title: '师长',
          brief: '南京保卫战中自戕殉国',
          lifespan: '1894-1937',
          image: null,
          story: '在南京保卫战中，于广德地区率部与日军血战，弹尽援绝后自戕殉国，以死实践报国誓言。',
          quote: ''
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