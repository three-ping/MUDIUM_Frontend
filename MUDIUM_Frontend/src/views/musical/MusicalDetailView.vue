<template>
  <section class="container-fluid">
    <div class="musical-detail-container">
      <!-- 포스터 섹션 -->
      <div class="poster-section">
        <img :src="musical.poster" alt="Poster" />
      </div>

    <!-- 상세 정보 섹션 -->
    <div class="remain-section">
    <div class="detail-section">
      <h2>{{ musical.title }}</h2>
      <p class="rating">{{ musical.rating }} 관람가</p>
      <p class="scope">제작사: {{ musical.producer || '정보 없음' }}</p>
      <p>평균 별점: {{ averageScope !== null ? averageScope.toFixed(1) : '0' }}</p>
      <div class="star-rating">
        <StarRating></StarRating>
        
        <!-- <StarRating :rating="musical.averageScope || 0" @set-rating="setRating" /> -->
        <!-- <p>현재 별점: {{ musical.averageScope || '정보 없음' }}</p> -->
      </div>
    </div>
    </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import StarRating from '@/components/scope/StarRating.vue';

const route = useRoute();
const props = defineProps({ id: String });
const musical = ref({});
const rating = ref(0); // 초기 별점
// const hoverRating = ref(0);
const averageScope = ref(null);

const setRating = (newRating) => {
  rating.value = newRating;
};

const fetchAverageScope = async (id) => {
  try {
    const response = await fetch('http://localhost:8080/api/musical?page=0&size=300');
    const data = await response.json();

    // 목록에서 해당 ID의 뮤지컬을 찾아 평균 별점을 가져옴
    const foundMusical = data.data.content.find((musical) => musical.musicalId === parseInt(id));
    if (foundMusical) {
      console.log('찾은 뮤지컬:', foundMusical);
      averageScope.value = parseFloat(foundMusical.averageScope); // 평균 별점 저장
      console.log('평균 별점:', averageScope.value);
    } else {
      averageScope.value = null; // 해당 뮤지컬이 목록에 없으면 null로 설정
    }
  } catch (error) {
    console.error('Error fetching musical list for average scope:', error);
  }
};

const fetchMusicalDetail = async () => {
  const id = route.params.id;
  try {
    const response = await fetch(`http://localhost:8080/api/musical/${id}`);
    const data = await response.json();
    musical.value = data.data;
    console.log(musical.value); 

    await fetchAverageScope(id);
  } catch (error) {
    console.error('Error fetching musical detail:', error);
  }
};

onMounted(() => {
  fetchMusicalDetail();
});
</script>
<style scoped>
/* 전체 배경 컨테이너 */
.musical-detail-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 50px;
  background-color: rgba(240, 240, 255, 0.4);
  width: 100%;
  height: 300px;
  margin: 100px auto;
  gap: 40px;
  margin-top: 5%;
  margin-bottom: 5%;
}

.poster-section {
  height: 150%;
  width: 30%;
}

.poster-section img {
  height: 100%;
  width: 100%;
  border-radius: 5%;
}


.detail-section {
  flex: 2;
  border-radius: 12px;
  z-index: 2;
  margin-top: 32%;
  margin-left: 5%;
  width: 100%;
}

.detail-section h2 {
  font-size: 2rem;
  margin-bottom: 1px;
  margin-top: -40%;

}

.rating {
  font-size: 1.2rem;
  margin-bottom: 10px;
  margin-top: 8%;
  color: black;
}

.scope {
  margin-bottom: 20px;
  font-size: 1rem;
  margin-bottom: 10%;
}
</style>