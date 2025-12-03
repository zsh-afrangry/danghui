<template>
  <section class="resources-section">
    <div class="container">
      <h2 class="section-title">文献资料</h2>
      <p class="section-subtitle">深入了解抗战历史的精选文献与影像资料</p>
      <div class="resources-grid">
        <div v-for="resource in resources" :key="resource.id" class="resource-card">
          <div class="resource-type-icon">
            <span v-if="resource.type === 'document'">📄</span>
            <span v-if="resource.type === 'video'">🎬</span>
            <span v-if="resource.type === 'audio'">🎵</span>
          </div>
          <h3 class="resource-title">{{ resource.title }}</h3>
          <p class="resource-description">{{ resource.description }}</p>
          <a :href="resource.link" target="_blank" class="resource-link">
            查看资料
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ResourcesSection',
  data() {
    return {
      resources: [
        {
          id: 1,
          type: 'document',
          title: '《论持久战》',
          description: '毛泽东于1938年发表的重要军事理论著作，系统地阐述了抗日战争的战略方针。',
          link: '#'
        },
        {
          id: 2,
          type: 'video',
          title: '纪录片《血战台儿庄》',
          description: '一部记录台儿庄战役的珍贵影像资料，展现了中国军队的英勇抗战。',
          link: '#'
        },
        {
          id: 3,
          type: 'document',
          title: '《开罗宣言》',
          description: '1943年，中、美、英三国首脑在开罗会议后发表的宣言，规定日本所窃取于中国的领土归还中国。',
          link: '#'
        },
        {
          id: 4,
          type: 'audio',
          title: '《义勇军进行曲》原始录音',
          description: '感受最原始的抗战呐喊，聆听中华民族不屈的怒吼。',
          link: '#'
        },
        {
          id: 5,
          type: 'document',
          title: '《剑桥中华民国史》',
          description: '费正清主编的权威中国近代史著作，对抗日战争有详尽客观的记述。',
          link: '#'
        },
        {
          id: 6,
          type: 'video',
          title: '纪录片系列《大后方》',
          description: '一部全面反映抗战时期中国大后方社会、经济、文化状况的优秀纪录片。',
          link: '#'
        }
      ]
    }
  }
}
</script>

<style scoped>
.resources-section {
  padding: 80px 0;
  background-color: #fff;
}
.section-title {
  text-align: center;
  font-size: 2.8rem;
  color: #2c3e50;
  margin-bottom: 10px;
}
.section-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 60px;
}
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}
.resource-card {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}
.resource-type-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
}
.resource-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
}
.resource-description {
  font-size: 1rem;
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 25px;
}
.resource-link {
  display: inline-block;
  background: #e74c3c;
  color: #fff;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
.resource-link:hover {
  background-color: #c0392b;
}
</style>
