<template>
  <h1 class="title">가이드북</h1>
  <IndexTab
    :tab="tab"
    :currentTab="currentTab"
    @click="changeTab"/>

  <section v-if="currentTab === 0">
    <Recommended />
  </section>
  <section v-if="currentTab === 1">
    <Terms />
  </section>
  <section v-if="currentTab === 2">
    <Etiquette />
  </section>
</template>

<script setup>
import Etiquette from '@/components/guidebook/Etiquette.vue';
import IndexTab from '@/components/guidebook/IndexTab.vue';
import Recommended from '@/components/guidebook/Recommended.vue';
import Terms from '@/components/guidebook/Terms.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const currentTab = ref(0);
const tab = ref([
  { name: '입문 작품 추천' },
  { name: '뮤지컬 용어 안내' },
  { name: '뮤지컬 관람 매너' }
]);

const changeTab = (key) => {
  currentTab.value = key;
};

// URL에 따른 탭 설정
const setTabFromUrl = () => {
  const path = router.currentRoute.value.path;
  switch (path) {
    case '/recommended':
      currentTab.value = 0;
      break;
    case '/terms':
      currentTab.value = 1;
      break;
    case '/etiquette':
      currentTab.value = 2;
      break;
  }
};

// 초기 URL에 따른 탭 설정
setTabFromUrl();

// currentTab이 변경될 때 URL을 변경
watch(currentTab, (newTab) => {
  let newPath;
  switch (newTab) {
    case 0:
      newPath = '/guidebook/guidemain';
      break;
    case 1:
      newPath = '/guidebook/terms';
      break;
    case 2:
      newPath = '/guidebook/etiquette';
      break;
  }
  if (newPath) {
    router.push(newPath);
  }
});

// URL 변경 감지
watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    setTabFromUrl();
  }
);
</script>

<style scoped>
.title {
  margin-top: 50px;
  margin-left: 250px;
}
</style>