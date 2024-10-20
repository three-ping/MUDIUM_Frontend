<template>
  <div class="musical-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="검색어를 입력하세요"
      class="search-input"
      @input="handleInput"
    />
    <div v-if="searchResults.length > 0">
      <h1>검색 결과</h1>
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
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { debounce } from 'lodash';

const searchResults = ref([]);
const searchQuery = ref('');
const route = useRoute();

const fetchSearchResults = async (query) => {
  try {
    const sanitizedQuery = query.trim();
    const url = `http://localhost:8080/api/musical?title=${encodeURIComponent(sanitizedQuery)}&page=0&size=100`;

    const response = await axios.get(url);
    if (response.data && response.data.data && Array.isArray(response.data.data.content)) {
      searchResults.value = response.data.data.content;
    } else {
      searchResults.value = [];
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    searchResults.value = [];
  }
};

// Debounced version of fetchSearchResults
const debouncedFetchSearchResults = debounce(fetchSearchResults, 300);

// Handle input event
const handleInput = (event) => {
  debouncedFetchSearchResults(event.target.value);
};

// Initial fetch for all musicals
fetchSearchResults('');
</script>

<style scoped>
.search-input {
  width: 95%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-results-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  width: 95%;
  padding: 20px 0;
}

.search-musical-card {
  position: relative;
  width: 100%;
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

.musical-container h1 {
  font-size: 1.5rem;
  margin-top: 1.5%;
}
</style>
