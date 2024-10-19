<template>
    <div class="musical-container">
    <!-- 검색 결과 표시 -->
    <div v-if="hasSearched && searchResults.length > 0">
      <h1>검색 결과 {{ searchResults.length }}</h1>
      <div class="search-results-container">
        <div class="search-results-container">
    <RouterLink
      v-for="musical in searchResults"
      :key="musical.musicalId"
      :to="{ name: 'MusicalDetailView', params: { id: musical.musicalId.toString() } }" 
      class="search-musical-card"
    >
          <img :src="musical.poster" :alt="musical.title" class="musical-poster" />
          <div class="musical-title">{{ musical.title }}</div>
        </RouterLink>
        </div>
      </div>
    </div>

    <!-- 검색 결과가 없을 때 '검색 결과가 없습니다' 메시지 표시 -->
    <div v-if="hasSearched && searchResults.length === 0">
      <p>검색 결과가 없습니다.</p>
    </div>

    <!-- 검색이 실행되지 않았을 때만 공연 순위 표시 -->
    <div v-if="!hasSearched">
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
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

// 상태 변수
const musicals = ref([]);
const topMusicals = ref([]);
// const searchQuery = ref('');
const searchResults = ref([]);
const hasSearched = ref(false);
const route = useRoute();
// const router = useRouter();

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

const fetchSearchResults = async (query) => {
  try {
    const sanitizedQuery = query.replace(/\s+/g, '');

    const response = await axios.get(
      `http://localhost:8080/api/musical?title=${encodeURIComponent(sanitizedQuery)}&page=0&size=300`
    );

    // Check if response structure is valid and handle null values safely
    if (response.data && response.data.data && response.data.data.content) {
      searchResults.value = response.data.data.content;
    } else {
      searchResults.value = []; // No content, empty array
    }
    
    hasSearched.value = true;
  } catch (error) {
    console.error('Error fetching search results:', error);
    searchResults.value = []; // Handle error case with empty array
  }
};

onMounted(() => {
  if (route.query.title) {
    fetchSearchResults(route.query.title);
  } else {
    fetchMusicals();
  }
});

// Watch for route changes and update the search results accordingly
watch(() => route.query.title, (newTitle) => {
  if (newTitle) {
    fetchSearchResults(newTitle);
  }
})
</script>


<style scoped>
.search-results-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 6 columns for search results */
  gap: 20px;
  width: 95%;
  padding: 20px 0;
}

.search-musical-card {
  position: relative;
  width: 100%; /* 그리드 항목의 전체 너비를 차지하도록 설정 */
  text-align: center;
}

.search-musical-card img {
  width: 100%;
  height: 90%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

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
  width: 60%;
  padding: 20px 0;
  margin-top: 1.5%;
}


.musical-container h1 {
  display: flex;
  /* align-items: left; */
  margin-bottom: -1%;
  font-size: 1.3rem;
  margin-top: 1.5%;
}


.musical-card {
  position: relative;
  flex: 0 0 calc(20% - 20px);
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 13px;
  vertical-align: top;
  margin: 0;
  text-align: center;
}

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
  /* margin-top: 0.9%; */
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