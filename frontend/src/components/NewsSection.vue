<template>
  <section class="news-section">
    <div class="container">
      <h2 class="section-title">最新动态</h2>
      <p class="section-subtitle">了解项目最新进展与相关活动</p>
      <div class="news-grid">
        <div v-for="item in newsItems" :key="item.id" class="news-card">
          <div class="news-image" :style="{ backgroundImage: `url(${item.image})` }"></div>
          <div class="news-content">
            <div class="news-meta">
              <span class="news-date">{{ item.date }}</span>
              <span class="news-category">{{ item.category }}</span>
            </div>
            <h3 class="news-title">{{ item.title }}</h3>
            <p class="news-excerpt">{{ item.excerpt }}</p>
            <a :href="item.link" class="read-more-btn">阅读更多 &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NewsSection',
  data() {
    return {
      newsItems: [
        {
          id: 1,
          title: '烽火传承-数字记忆”主题党日活动成功举办',
          excerpt: '为纪念抗日战争胜利80周年，计算机学院本科第二党支部于今日成功举办了“烽火传承-数字记忆”主题党日活动...',
          date: '2025年12月3日',
          category: '支部活动',
          image: '/XZ/images/image1.jpg',
          link: '#'
        },
        {
          id: 2,
          title: '“西迁地图”互动模块上线',
          excerpt: '项目团队最新上线了“西迁地图”互动模块，用户可以直观地看到抗战期间高校和工业企业的西迁路线...',
          date: '2025年11月28日',
          category: '项目更新',
          image: '/FHSJX/images/image4.jpg',
          link: '#'
        },
        {
          id: 3,
          title: '专家讲座：川军在抗战中的历史贡献',
          excerpt: '我们邀请了历史系李教授为我们带来一场关于川军在抗战中历史贡献的线上讲座...',
          date: '2025年11月20日',
          category: '学术讲座',
          image: '/FHSJX/images/image5.jpg',
          link: '#'
        },
        {
          id: 4,
          title: '志愿者团队招募：共同守护数字记忆',
          excerpt: '为了更好地完善本项目，我们现面向全校招募志愿者，参与资料整理、内容校对和技术开发等工作...',
          date: '2025年11月15日',
          category: '团队招募',
          image: '/SJKB/images/image6.png',
          link: '#'
        },
        {
          id: 5,
          title: '口述历史项目启动，征集亲历者故事',
          excerpt: '我们正式启动“川军抗战口述历史”项目，希望能记录下那些珍贵的个人记忆，让历史更加鲜活。',
          date: '2025年11月10日',
          category: '特别项目',
          image: '/FHSJX/images/image2.jpg',
          link: '#'
        }
      ]
    }
  }
}
</script>

<style scoped>
.news-section {
  padding: 80px 0;
  background: #fff;
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

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.news-card {
  background: #f8f9fa;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.news-image {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.news-content {
  padding: 25px;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 15px;
}

.news-category {
  background: #e74c3c;
  color: #fff;
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 0.8rem;
}

.news-title {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 15px;
  line-height: 1.4;
}

.news-excerpt {
  font-size: 1rem;
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 20px;
}

.read-more-btn {
  color: #e74c3c;
  text-decoration: none;
  font-weight: bold;
}
</style>
