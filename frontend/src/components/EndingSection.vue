<template>
  <section class="ending-section" id="ending">
    <div class="container">
      <div class="ending-card">
        <div class="ending-media" style="background-image: url('/images/image1.jpg')"></div>
        <div class="ending-content">
          <h2 class="ending-title">烽火渐远，精神永存</h2>
          <p class="ending-subtitle">致敬以血肉铸就的中流砥柱 · 以数智传承红色记忆</p>
          <div class="ending-grid">
            <div class="ending-block">
              <h3>回望</h3>
              <p>从“无川不成军”到“大后方之柱”，四川人民以钢铁意志支撑起国家命脉。</p>
            </div>
            <div class="ending-block">
              <h3>致敬</h3>
              <p>向浴血疆场的将士、无私奉献的民众、坚守文化火种的学者致以崇高敬意。</p>
            </div>
            <div class="ending-block">
              <h3>传承</h3>
              <p>以科技叙事、以数据作证，让红色记忆在新时代持续发光，激励后人。</p>
            </div>
          </div>
          <div class="ending-actions">
            <a href="#hero" class="btn btn-primary">回到序章</a>
            <a href="#dataviz" class="btn btn-secondary">再看数据</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'EndingSection'
}
</script>

<style scoped>
.ending-section {
  padding: 80px 0 100px;
  background: linear-gradient(180deg, #f8f9fa, #ffffff);
}

.ending-card {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
  align-items: stretch;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.12);
}

.ending-media { background-size: cover; background-position: center; min-height: 320px; filter: grayscale(8%); }

.ending-content { padding: 28px; display: flex; flex-direction: column; justify-content: center; }
.ending-title { font-size: 2rem; color: #2c3e50; font-weight: 900; }
.ending-subtitle { margin-top: 8px; color: #7f8c8d; }

.ending-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 18px; }
.ending-block { background: #f7f9fc; border: 1px solid rgba(0,0,0,0.05); border-radius: 12px; padding: 14px; }
.ending-block h3 { font-size: 1.05rem; color: #2c3e50; margin-bottom: 6px; }
.ending-block p { color: #4d5b6a; line-height: 1.6; }

.ending-actions { margin-top: 18px; display: flex; gap: 12px; }
.btn { text-decoration: none; padding: 10px 16px; border-radius: 10px; font-weight: 700; transition: transform 0.2s ease, box-shadow 0.2s ease; }
.btn-primary { color: #fff; background: #dc3545; box-shadow: 0 8px 20px rgba(220,53,69,0.3); }
.btn-secondary { color: #dc3545; background: #ffecee; box-shadow: 0 8px 20px rgba(220,53,69,0.15); }
.btn:hover { transform: translateY(-2px); }

@media (max-width: 768px) {
  .ending-card { grid-template-columns: 1fr; }
  .ending-media { min-height: 200px; }
  .ending-title { font-size: 1.6rem; }
  .ending-grid { grid-template-columns: 1fr; }
}
</style>

