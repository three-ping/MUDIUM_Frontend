<template>
  <div class="musical-container">
    <h1>현재 작품 순위</h1>
    <div class="musical-card-container" id="musical-section">
      <RouterLink 
        v-for="(musical, index) in topMusicals"
        :key="musical.musicalId"
        :to="{ name: 'MusicalDetailView', params: { id: musical.musicalId.toString() } }"
        class="musical-card"
        >

        <div class="rank-badge">{{ index + 1 }}</div>
        <img :src="musical.poster" :alt="musical.title" />
        <div class="musical-title">{{ musical.title }}</div>
      </RouterLink>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 상태 변수
const musicals = ref([]);
const topMusicals = ref([]);
const router = useRouter();

// 데이터 가져오기 함수
const fetchMusicals = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/musical?page=0&size=300');
    const data = await response.json();
    musicals.value = data.data.content;
    topMusicals.value = musicals.value.slice(0, 10);
  } catch (error) {
    console.error('Error fetching musicals:', error);
  }
};

onMounted(() => {
  fetchMusicals();
});
</script>


<style scoped>
.musical-container {
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  gap: 20px;
}


.musical-card-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 20px;
  width: 95%;
  padding: 20px 0;
}

.musical-container h1 {
  display: flex;
  align-items: left;
  margin-bottom: -1%;
  font-size: 1.7rem;
}


.musical-card {
  position: relative;
  flex: 0 0 calc(20% - 20px); /* 5개씩 표시되도록 설정 */
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 13px;
  vertical-align: top; 
  margin: 0; 
  text-align: center; 
}
/* 
.musical-card div {
  display: inline-block;
  flex-direction: column;
  align-items: center;
} */

.rank-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0.7;
  color: white;
  border-radius: 20%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;
}

.musical-card img {
  width: 100%;
  height: 90%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.musical-card div::before {
  content: attr(data-rank);
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.musical-title {
  font-size: 1rem;
  margin-top: 0.9%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px; 
  display: inline-block; 
  font-weight: bold;
  color: black;
}
</style>