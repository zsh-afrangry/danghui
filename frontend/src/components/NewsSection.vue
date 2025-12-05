<template>
  <section class="news-section">
    <!-- 列表视图 -->
    <div v-if="!activeNews" class="container">
      <h2 class="section-title">最新动态</h2>
      <p class="section-subtitle">了解项目最新进展与相关活动</p>
      <div class="news-grid">
        <div v-for="item in newsItems" :key="item.id" class="news-card" @click="openNews(item)">
          <div class="news-image" :style="{ backgroundImage: `url(${item.image})` }"></div>
          <div class="news-content">
            <div class="news-meta">
              <span class="news-date">{{ item.date }}</span>
              <span class="news-category">{{ item.category }}</span>
            </div>
            <h3 class="news-title">{{ item.title }}</h3>
            <p class="news-excerpt">{{ item.excerpt }}</p>
            <span class="read-more-btn">阅读更多 &rarr;</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 详情视图 -->
    <div v-else class="news-detail-view">
      <div class="detail-container">
        <button class="back-btn" @click="closeNews">
          <span class="back-arrow">←</span> 返回
        </button>
        
        <article class="article-content">
          <div class="article-header">
            <div class="article-meta">
              <span class="article-date">{{ activeNews.date }}</span>
              <span class="article-category">{{ activeNews.category }}</span>
            </div>
            <h1 class="article-title">{{ activeNews.title }}</h1>
          </div>

          <div class="article-body" v-html="activeNews.fullContent"></div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NewsSection',
  data() {
    return {
      activeNews: null,
      scrollPosition: 0,
      newsItems: [
        {
          id: 1,
          title: '烽火传承-数字记忆"主题党日活动成功举办',
          excerpt: '为纪念抗日战争胜利80周年，计算机学院本科第二党支部于今日成功举办了"烽火传承-数字记忆"主题党日活动...',
          date: '2025年12月3日',
          category: '支部活动',
          image: 'XZ/images/image1.jpg',
          fullContent: `
            <h2>本科第二党支部开展"烽火忆峥嵘·青春铸担当"示范性主题党日活动</h2>
            
            <p>为深入挖掘红色资源，传承弘扬伟大抗战精神，让红色记忆在数字时代焕发新生机，学院本科第二党支部立足专业特色，创新开展"烽火忆峥嵘·青春铸担当"校级示范性党日活动，通过"打造数字平台、寻访红色坐标、深悟精神内核"的立体化实践，推动伟大抗战精神在青年党员群体中落地生根、开花结果。</p>

            
            <h3>一、打造数字平台，架起红色精神"云桥梁"</h3>
            
            <p>在数字化浪潮席卷的时代背景下，为进一步让厚重的抗战历史突破时空限制，走进青年党员的生活，更好传承红色基因，支部党员发挥计算机专业优势，精心打造、上线"烽火传承·数字记忆"抗战精神数字展厅。</p>
            
            <p>数字展厅以 <strong>"数字化呈现、互动式体验、立体化传播"</strong> 为核心特色，不仅整合了抗战历史文献、英烈事迹、红色影像等珍贵资料，还设置了"烽火时间线""英雄图谱"等板块，为广大师生搭建起一个沉浸式了解抗战历史、感悟抗战精神、赓续红色血脉的线上阵地。</p>
            
            <p>数字展厅的上线，是支部对"红色精神数字化传播"课题的积极回应。支部书记张斯涵同志表示：</p>
            
            <blockquote>
              我们希望用专业所学为红色精神赋能，让冰冷的代码转化为传承红色基因的温暖载体，让伟大抗战精神以更贴近青年的方式实现代际传递。
            </blockquote>

            
            <h3>二、寻访红色地标，厚植青年学子"爱国情"</h3>
            
            <p>为响应"弘扬伟大抗战精神"的号召，支部成员于 <strong>11 月 23 日</strong> 前往国家级烈士纪念设施——<strong>成都烈士陵园</strong>开展实地研学。</p>
            
            <img src="images/zhutidangrihuodong/pic1.jpg" alt="支部成员在成都烈士陵园" class="article-image">
            
            <p>在庄严肃穆的陵园内，大家首先驻足人民英雄纪念碑前，深切缅怀为民族独立、人民解放和国家建设牺牲的革命先烈。随后，大家走进成都烈士纪念馆，依次参观"星火初燃""铁血荣光""丰碑永驻"等主题展厅，认真聆听讲解员讲述川蜀儿女在烽火岁月里抛头颅、洒热血的壮阔历程。</p>
            
            <p>馆内的每一件斑驳文物、每一幅珍贵照片、每一段翔实文字，都将党员们带回那个风雨如晦的年代。尤其是川军出川抗战的壮烈事迹，让在场青年深受震撼。</p>
            
            <p>参观结束后，大家纷纷表示：</p>
            
            <blockquote>
              "看到先烈们用生命守护家国，我才真正理解了'天下兴亡，匹夫有责'的重量。"
            </blockquote>
            
            <p>此次研学不仅是一次红色教育，更是一次精神洗礼。未来大家将把对英烈的崇敬转化为学习和科研的动力，以青春担当践行初心使命。</p>
            
            <h3>三、深悟精神内核，激活强国奋进"新引擎"</h3>
            
            <p>为进一步筑牢理想信念根基，<strong>11 月 24 日</strong>，支部开展"传承伟大抗战精神，汲取奋进力量"主题党日活动暨研讨会，全体党员齐聚一堂，围绕伟大抗战精神的时代内涵展开深入研讨。</p>
            
            <img src="images/zhutidangrihuodong/pic2.jpg" alt="主题党日活动现场" class="article-image">
            
            <p>会上，支部组织委员宋佳昊同志、宣传委员刘一鸣同志分别带领大家重温了习近平总书记关于传承红色基因、弘扬伟大民族精神的重要论述，并结合抗战历史案例，解读了伟大抗战精神的核心要义。</p>
            
            <p>与会党员结合专业学习与支部实践分享感悟。大家一致表示，要坚定理想信念，牢记共产党员的初心使命，立足计算机专业特色优势，将红色精神转化为攻克技术难题、服务社会发展的实际成效，为新时代强国建设贡献青春力量。</p>

            
            <h3>结语</h3>
            
            <p>历史川流不息，精神代代相传。下一步，支部将持续坚持 <strong>"专业 + 红色"</strong> 的融合路径，让伟大抗战精神真正走进青年学子的心中。</p>
            
            <p>大家将以此次系列活动为契机，铭记历史、珍爱和平，以更加饱满的热情投身强国建设、民族复兴的新时代征程，让红色血脉在时代浪潮中赓续绵延，贡献计算机学子的智慧与担当。</p>
          `
        },
        {
          id: 2,
          title: '"烽火传承 数字记忆"三部曲圆满完成',
          excerpt: '为深入挖掘抗战历史资源，传承弘扬伟大抗战精神，让红色记忆在数字时代焕发出新的生命力，西南交通大学计算机与人工智能学院本科第二党支部开展"烽火传承 数字记忆"三部曲...',
          date: '2025年11月28日',
          category: '支部活动',
          image: 'images/kangzhanxinwengao/pic7.jpg',
          fullContent: `
            <h2>"烽火传承 数字记忆"三部曲</h2>
            
            <p>为深入挖掘抗战历史资源，传承弘扬伟大抗战精神，让红色记忆在数字时代焕发出新的生命力，西南交通大学计算机与人工智能学院本科第二党支部开展"烽火传承 数字记忆"三部曲，分别为网站建设、研学、研讨。</p>

            <h3>一、宣传网站，传承红色血脉</h3>
            
            <p>由本科第二党支部精心打造的"烽火传承 数字记忆"抗战精神宣传网站于今日正式上线运行。该网站以"数字化呈现、互动式体验、立体化传播"为特色，为广大网民搭建起一个了解抗战历史、感悟抗战精神、赓续红色血脉的重要线上平台。</p>
            
            <img src="images/kangzhanxinwengao/pic1.png" alt="烽火传承数字记忆网站" class="article-image">
            
            <p>伟大的抗战精神，是中国人民弥足珍贵的精神财富，是激励中国人民克服一切艰难险阻、为实现中华民族伟大复兴而奋斗的强大精神动力。在数字化浪潮席卷全球的今天，如何让厚重的抗战历史突破时空限制，走进年轻一代的生活，成为传承红色精神的重要课题。"烽火传承 数字记忆"抗战精神宣传网站的上线，正是对这一课题的积极回应与创新实践。</p>
            
            <img src="images/kangzhanxinwengao/pic2.png" alt="网站界面展示" class="article-image">
            
            <h3>二、实地研学，再续抗战精神</h3>
            
            <p>习近平总书记在大会上发表的重要讲话，深情回望烽火岁月，深刻阐释伟大抗战精神，向全体中华儿女发出了踔厉奋发、勇毅前行的时代号召。为响应号召，西南交通大学计算机与人工智能学院本科第二党支部开展了"烽火忆峥嵘·青春铸担当"党支部特色活动。</p>
            
            <img src="images/kangzhanxinwengao/pic3.png" alt="支部特色活动" class="article-image">
            
            <p>11月23日，支部成员前往成都烈士陵园进行参观研学，通过参观烈士陵园博物馆，在红色教育中感悟初心使命，传承英烈精神。</p>
            
            <img src="images/kangzhanxinwengao/pic4.png" alt="成都烈士陵园参观" class="article-image">
            
            <img src="images/kangzhanxinwengao/pic5.png" alt="支部成员参观学习" class="article-image">
            
            <p>成都烈士博物馆作为承载城市红色记忆的重要阵地，馆藏的每一件文物、每一幅照片、每一段文字，都生动还原了革命岁月中川蜀儿女为民族独立、人民解放和国家建设抛头颅、洒热血的壮阔历程。支部成员依次走进"星火初燃""铁血荣光""丰碑永驻"等主题展厅，认真聆听革命先烈的英勇事迹。</p>
            
            <img src="images/kangzhanxinwengao/pic6.png" alt="展厅参观" class="article-image">
            
            <p>参观结束后，群众们纷纷表示，此次活动让大家在回望历史中汲取了强大的精神力量。在今后的工作和生活中，将以革命先烈为榜样，把崇敬与缅怀转化为干事创业的动力，为成都的高质量发展、为中华民族的伟大复兴贡献自己的力量。</p>
            
            <img src="images/kangzhanxinwengao/pic7.jpg" alt="支部成员合影" class="article-image">
            
            <h3>三、积极讨论，学习抗战精神</h3>
            
            <p>为深入学习贯彻习近平总书记关于传承红色基因、弘扬伟大民族精神的重要论述，切实筑牢党员理想信念根基，近日，本科第二党支部召开"传承抗日精神 汲取奋进力量"主题党员研讨会。全体党员同志齐聚一堂，共同回望峥嵘岁月，感悟抗日精神的时代内涵，凝聚干事创业的强大动力。</p>
            
            <p>抗日精神是中华民族宝贵的精神财富，蕴含着忠诚于党、忠诚于人民的政治品格，蕴含着不畏艰难、敢于斗争的进取精神。全体党员要以革命先烈为榜样，一是要坚定理想信念，筑牢思想根基，始终牢记共产党员的初心和使命；二是要勇于担当作为，立足本职岗位，把学习成果转化为推动工作的实际成效；三是要密切联系群众，践行全心全意为人民服务的宗旨，以更加饱满的热情、更加务实的作风，贡献自己的力量。</p>
            
            <p>历史川流不息，精神代代相传。伟大抗战精神早已融入中华民族的血脉基因，成为激励我们前行的强大精神动力。在习近平新时代中国特色社会主义思想指引下，全国各族人民必将铭记历史、珍爱和平，传承精神、奋勇前进，在新时代的壮阔征程中不断夺取新的胜利，为实现中华民族伟大复兴的中国梦而团结奋斗！</p>
          `
        },
        {
          id: 3,
          title: '专家讲座：川军在抗战中的历史贡献',
          excerpt: '我们邀请了历史系李教授为我们带来一场关于川军在抗战中历史贡献的线上讲座...',
          date: '2025年11月20日',
          category: '学术讲座',
          image: 'FHSJX/images/image5.jpg',
          fullContent: `
            <div style="text-align: center; padding: 80px 20px;">
              <h2 style="font-size: 2rem; color: #7f8c8d; margin-bottom: 20px;">本科第二党支部持续开发中，尚未完成</h2>
              <p style="font-size: 1.2rem; color: #95a5a6;">敬请期待...</p>
            </div>
          `
        },
        {
          id: 4,
          title: '志愿者团队招募：共同守护数字记忆',
          excerpt: '为了更好地完善本项目，我们现面向全校招募志愿者，参与资料整理、内容校对和技术开发等工作...',
          date: '2025年11月15日',
          category: '团队招募',
          image: 'SJKB/images/image6.png',
          fullContent: `
            <div style="text-align: center; padding: 80px 20px;">
              <h2 style="font-size: 2rem; color: #7f8c8d; margin-bottom: 20px;">本科第二党支部持续开发中，尚未完成</h2>
              <p style="font-size: 1.2rem; color: #95a5a6;">敬请期待...</p>
            </div>
          `
        },
        {
          id: 5,
          title: '口述历史项目启动，征集亲历者故事',
          excerpt: '我们正式启动"川军抗战口述历史"项目，希望能记录下那些珍贵的个人记忆，让历史更加鲜活。',
          date: '2025年11月10日',
          category: '特别项目',
          image: 'FHSJX/images/image2.jpg',
          fullContent: `
            <div style="text-align: center; padding: 80px 20px;">
              <h2 style="font-size: 2rem; color: #7f8c8d; margin-bottom: 20px;">本科第二党支部持续开发中，尚未完成</h2>
              <p style="font-size: 1.2rem; color: #95a5a6;">敬请期待...</p>
            </div>
          `
        }
      ]
    }
  },
  methods: {
    openNews(item) {
      // 保存当前滚动位置
      this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop
      this.activeNews = item
      document.body.style.overflow = 'hidden'
      // 不再滚动到顶部
    },
    closeNews() {
      this.activeNews = null
      document.body.style.overflow = ''
      // 恢复之前的滚动位置
      this.$nextTick(() => {
        window.scrollTo({ top: this.scrollPosition, behavior: 'smooth' })
      })
    }
  }
}
</script>

<style scoped>
.news-section {
  padding: 80px 0;
  background: #fff;
  min-height: 100vh;
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
  cursor: pointer;
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
  cursor: pointer;
}

/* 详情页样式 */
.news-detail-view {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 1000;
  overflow-y: auto;
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

.detail-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
  margin-bottom: 30px;
}

.back-btn:hover {
  background: #c0392b;
  transform: translateX(-5px);
  box-shadow: 0 6px 16px rgba(231, 76, 60, 0.4);
}

.back-arrow {
  font-size: 1.2rem;
  font-weight: bold;
}

.article-content {
  background: #fff;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.article-header {
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 20px;
  margin-bottom: 30px;
}

.article-meta {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 15px;
}

.article-date {
  font-size: 0.95rem;
  color: #7f8c8d;
}

.article-category {
  background: #e74c3c;
  color: #fff;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.article-title {
  font-size: 2.2rem;
  color: #2c3e50;
  line-height: 1.3;
  font-weight: 800;
  margin: 0;
}

.article-body {
  color: #34495e;
  line-height: 1.8;
  font-size: 1.05rem;
}

.article-body h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 30px 0 20px 0;
  font-weight: 700;
}

.article-body h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 25px 0 15px 0;
  font-weight: 700;
}

.article-body p {
  margin: 15px 0;
  text-align: justify;
}

.article-body hr {
  border: none;
  border-top: 1px solid #ecf0f1;
  margin: 30px 0;
}

.article-body strong {
  color: #e74c3c;
  font-weight: 700;
}

.article-body blockquote {
  margin: 20px 0;
  padding: 15px 20px;
  background: #f8f9fa;
  border-left: 4px solid #e74c3c;
  color: #34495e;
  font-style: italic;
}

.article-body :deep(.article-image) {
  width: 100%;
  max-width: 700px;
  height: auto;
  margin: 25px auto;
  display: block;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

@media (max-width: 768px) {
  .article-content {
    padding: 25px 20px;
  }

  .article-title {
    font-size: 1.8rem;
  }

  .article-body h2 {
    font-size: 1.5rem;
  }

  .article-body h3 {
    font-size: 1.3rem;
  }

  .article-body {
    font-size: 1rem;
  }
}
</style>
