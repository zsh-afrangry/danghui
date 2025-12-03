<template>
  <section class="timeline-section">
    <div class="container">
      <h2 class="section-title">烽火时间线</h2>
      <p class="section-subtitle">重温1937-1945年抗战历程</p>
      
      <div class="timeline">
        <div 
          v-for="(event, index) in timelineEvents" 
          :key="index"
          class="timeline-item"
          :class="{ 'left': index % 2 === 0, 'right': index % 2 === 1, 'animate': event.isVisible }"
          @click="openEventDetail(event)"
          :ref="`timelineItem${index}`"
        >
          <div class="timeline-marker" :class="event.type">
            <span class="marker-icon">{{ event.icon }}</span>
          </div>
          <div class="timeline-content">
            <div class="event-image" :class="{ 'taller-image': isChuanjunChuchuan(event) }">
              <img :src="event.image" :alt="event.title" />
              <div class="image-overlay"></div>
            </div>
            <div class="event-text">
              <div class="timeline-date">{{ event.date }}</div>
              <h3 class="timeline-title">
                <span class="title-icon">{{ event.icon }}</span>
                {{ event.title }}
              </h3>
              <p class="timeline-desc">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 事件详情模态框 -->
    <div v-if="selectedEvent" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">&times;</button>
        <h3>{{ selectedEvent.title }}</h3>
        <p class="modal-date">{{ selectedEvent.date }}</p>
        <p class="modal-location">{{ selectedEvent.location }}</p>
        <div class="modal-detail">{{ selectedEvent.detail }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TimeLine',
  data() {
    return {
      selectedEvent: null,
      timelineEvents: [
        {
          date: '1937年7月',
          title: '七七事变',
          description: '卢沟桥事变爆发，抗日战争全面开始',
          location: '北京卢沟桥',
          detail: '1937年7月7日夜，日军在卢沟桥附近演习时，借口一名士兵失踪，要求进入宛平县城搜查，被拒绝后，向宛平城和卢沟桥开火，中国守军第29军第37师第219团奋起抵抗。这标志着中国人民抗日战争全面爆发。',
          type: 'war',
          icon: '💥',
          image: '/FHSJX/images/qiqishibian.jpg',
          isVisible: false
        },
        {
          date: '1937年9月',
          title: '川军出川',
          description: '四川各路军队陆续出川抗战',
          location: '四川',
          detail: '抗战爆发后，四川各路军队响应号召，纷纷出川抗战。刘湘率川军第23集团军出川，王缵绪率第29集团军出川，孙震率第22集团军出川。川军将士怀着"男儿岂是蓬蒿物，敢笑黄巢不丈夫"的豪情，踏上了抗日救国的征程。',
          type: 'army',
          icon: '🚩',
          image: '/FHSJX/images/chuanjunchuchuan.jpg',
          isVisible: false
        },
        {
          date: '1938年3月',
          title: '台儿庄战役',
          description: '川军王铭章师长壮烈殉国，为台儿庄大捷创造了条件。',
          location: '山东滕县',
          detail: '在台儿庄战役中，川军第22集团军第122师奉命死守滕县。师长王铭章率部与日军血战数日，全师官兵伤亡殆尽，王铭章师长壮烈殉国，为台儿庄主力部队集结赢得了宝贵时间。',
          type: 'war',
          icon: '💥',
          image: '/FHSJX/images/taierzhuangzhanyi.png',
          isVisible: false
        },
        {
          date: '1938年',
          title: '内迁大学汇聚',
          description: '多所大学内迁至四川，形成大后方教育中心',
          location: '重庆、成都',
          detail: '抗战期间，北京大学、清华大学、南开大学等多所著名大学内迁至四川。西南联大在昆明，而复旦大学、中央大学等在重庆地区办学。这些大学的内迁，不仅保存了中华民族的文化火种，也为抗战培养了大批人才。',
          type: 'education',
          icon: '🎓',
          image: '/FHSJX/images/neiqiandaxuehuiju.jpg',
          isVisible: false
        },
        {
          date: '1939年',
          title: '重庆大轰炸开始',
          description: '日军开始对重庆进行战略轰炸',
          location: '重庆',
          detail: '从1939年2月开始，日军对重庆进行了长达5年半的战略轰炸，出动飞机9000多架次，投弹11500多枚。重庆人民在防空洞中坚持生产和学习，展现了不屈不挠的精神。"愈炸愈强"成为重庆精神的写照。',
          type: 'war',
          icon: '💥',
          image: '/FHSJX/images/zhongqingdahongzhakaishi.jpg',
          isVisible: false
        },
        {
          date: '1941年',
          title: '驼峰航线开辟',
          description: '中美两国共同开辟了从印度到中国的空中运输通道。',
          location: '喜马拉雅山区',
          detail: '太平洋战争爆发后，日军切断了滇缅公路。为保证国际援华物资的运输，中美两国开辟了飞越喜马拉雅山脉的“驼峰航线”。这条航线地势险峻、气候恶劣，是战争史上最悲壮的空运线之一。',
          type: 'industry',
          icon: '✈️',
          image: '/FHSJX/images/tuofenghangxian.png',
          isVisible: false
        },
        {
          date: '1943年',
          title: '大后方生产建设',
          description: '四川成为抗战大后方的重要生产基地',
          location: '四川各地',
          detail: '抗战期间，四川为前线提供了大量的人力、物力支持。据统计，四川共征兵300多万人，占全国征兵总数的1/5；提供粮食占全国征粮总数的1/3。同时，大量工厂内迁至四川，形成了重要的军工生产基地。',
          type: 'industry',
          icon: '⚙️',
          image: '/FHSJX/images/dahoufangshengchanjianshe.jpg',
          isVisible: false
        },
        {
          date: '1944年',
          title: '豫湘桂会战',
          description: '川军在豫中、长衡、桂柳等地与日军展开激战。',
          location: '河南、湖南、广西',
          detail: '在豫湘桂会战中，多支川军部队参战，虽然战役总体失利，但川军将士在衡阳保卫战等战斗中表现英勇，付出了巨大牺牲，迟滞了日军的进攻。',
          type: 'war',
          icon: '💥',
          image: '/FHSJX/images/yuxiangguihuizhan.png',
          isVisible: false
        },
        {
          date: '1945年8月',
          title: '抗战胜利',
          description: '日本宣布无条件投降，抗日战争胜利结束',
          location: '全国',
          detail: '1945年8月15日，日本天皇宣布无条件投降。9月2日，日本在美舰密苏里号上签署投降书。中国人民经过14年艰苦卓绝的抗战，终于取得了最终胜利。这是中华民族从近代以来抗击外敌入侵第一次取得完全胜利的伟大胜利。',
          type: 'victory',
          icon: '🏆',
          image: '/FHSJX/images/kangzhanshengli.jpg',
          isVisible: false
        }
      ]
    }
  },
  mounted() {
    this.initScrollAnimation()
  },
  methods: {
    openEventDetail(event) {
      this.selectedEvent = event
    },
    closeModal() {
      this.selectedEvent = null
    },
    isChuanjunChuchuan(event) {
      return event && event.title === '川军出川' && event.date === '1937年9月' && event.location === '四川'
    },
    initScrollAnimation() {
      // 创建Intersection Observer来监听元素进入视口
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            if (!isNaN(index) && this.timelineEvents[index]) {
              // Vue 3中直接修改数组项的属性
              this.timelineEvents[index].isVisible = true
            }
          }
        })
      }, {
        threshold: 0.3
      })

      // 观察所有时间线项目
      this.$nextTick(() => {
        this.timelineEvents.forEach((event, index) => {
          const element = this.$refs[`timelineItem${index}`]
          if (element && element[0]) {
            element[0].dataset.index = index
            observer.observe(element[0])
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.timeline-section {
  padding: 80px 0;
  background: #f8f9fa;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(238, 76, 60, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(52, 152, 219, 0.05) 0%, transparent 50%);
  min-height: 100vh;
  position: relative;
}

.section-title {
  text-align: center;
  font-size: 2.8rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 900;
  font-family: 'Microsoft YaHei', '思源宋体', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.section-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 60px;
}

.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 100%;
  background: linear-gradient(to bottom, #e74c3c, #c0392b, #e74c3c);
  border-radius: 3px;
  box-shadow: 0 0 15px rgba(231, 76, 60, 0.3);
}

.timeline-item {
  position: relative;
  margin: 50px 0;
  cursor: pointer;
  transition: all 0.6s ease;
  opacity: 0;
  transform: translateX(-50px);
}

.timeline-item.animate {
  opacity: 1;
  transform: translateX(0);
}

.timeline-item.right {
  transform: translateX(50px);
}

.timeline-item.right.animate {
  transform: translateX(0);
}

.timeline-item:hover {
  transform: scale(1.05) translateX(0);
}

.timeline-marker {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: #e74c3c;
  border: 4px solid #fff;
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.timeline-marker:hover {
  transform: translateX(-50%) scale(1.2);
  box-shadow: 0 6px 20px rgba(231, 76, 60, 0.6);
}

.timeline-marker.war {
  background: #e74c3c;
  box-shadow: 0 0 20px rgba(231, 76, 60, 0.6);
}

.timeline-marker.army {
  background: #f39c12;
  box-shadow: 0 0 20px rgba(243, 156, 18, 0.6);
}

.timeline-marker.education {
  background: #3498db;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.6);
}

.timeline-marker.industry {
  background: #27ae60;
  box-shadow: 0 0 20px rgba(39, 174, 96, 0.6);
}

.timeline-marker.victory {
  background: #9b59b6;
  box-shadow: 0 0 20px rgba(155, 89, 182, 0.6);
}

.marker-icon {
  font-size: 1.2rem;
}

.timeline-content {
  width: 50%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  transition: all 0.4s ease;
  overflow: hidden;
}

.timeline-content:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.event-image {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.event-image.taller-image {
  height: 380px;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
  filter: sepia(20%) contrast(1.1);
}

.timeline-content:hover .event-image img {
  transform: scale(1.05);
  filter: sepia(0%) contrast(1.2);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(231, 76, 60, 0.1), rgba(52, 152, 219, 0.1));
}

.event-text {
  padding: 20px;
}

.timeline-item.left .timeline-content {
  margin-right: 60%;
  width: 45%;
}

.timeline-item.right .timeline-content {
  margin-left: 55%;
  width: 45%;
}

.timeline-date {
  font-size: 0.9rem;
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 10px;
}

.timeline-title {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  font-size: 1.1rem;
}

.timeline-desc {
  color: #7f8c8d;
  line-height: 1.6;
}

/* 模态框样式 */
.modal-overlay {
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
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 15px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  margin: 20px;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
}

.modal-date {
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 5px;
}

.modal-location {
  color: #3498db;
  margin-bottom: 15px;
}

.modal-detail {
  line-height: 1.8;
  color: #2c3e50;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .timeline::before {
    left: 30px;
  }
  
  .timeline-item.left .timeline-content,
  .timeline-item.right .timeline-content {
    width: calc(100% - 70px);
    margin-left: 55px;
    margin-right: 0;
  }
  
  .timeline-marker {
    left: 30px;
    transform: translateX(-50%);
    top: 40px;
    width: 35px;
    height: 35px;
  }
  
  .marker-icon {
    font-size: 1rem;
  }
  
  .event-image {
    height: 180px;
  }
  .event-image.taller-image {
    height: 240px;
  }
  
  .timeline-title {
    font-size: 1.2rem;
  }
  
  .title-icon {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .modal-content {
    margin: 10px;
    padding: 20px;
  }
}
</style>