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
import { ref } from 'vue';

const currentTab = ref(0);
const tab = ref([
  { name: '입문 작품 추천' },
  { name: '뮤지컬 용어 안내' },
  { name: '뮤지컬 관람 매너' }
]);

const changeTab = (key) => {
  currentTab.value = key;
};
</script>

<style scoped>
.title  {
  margin-top: 50px;
  margin-left: 250px;
}
</style>