<template>
  <div class="row-box">
    <div
      v-for="idx in 5"
      :key="idx"
      class="star-div"
      @click="handleStarClick(idx)"
    >
      <span v-if="idx <= Math.floor(currentScore) + 0.5 && idx > Math.floor(currentScore)">
        <span class="half-star">&#9733;</span>
        <span class="half-star-cover">&#9733;</span>
      </span>
      <span v-else-if="idx <= currentScore">
        &#9733; <!-- 꽉 찬 별 -->
      </span>
      <span v-else>
        &#9734; <!-- 빈 별 -->
      </span>

      <!-- 왼쪽 반 클릭 이벤트 -->
      <div
        class="left"
        @mouseover="handleLeftHalfEnter(idx)"
        @mouseleave="handleStarLeave"
      ></div>
      <!-- 오른쪽 반 클릭 이벤트 -->
      <div
        class="right"
        @mouseover="handleRightHalfEnter(idx)"
        @mouseleave="handleStarLeave"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps({
  musicalId: Number,
  rating: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['setRating']);

const currentScore = ref(props.rating);
const scoreFixed = ref(props.rating);

watch(() => props.rating, (newRating) => {
  currentScore.value = newRating;
  scoreFixed.value = newRating;
});

const handleLeftHalfEnter = (idx) => {
  currentScore.value = idx - 0.5;
};

const handleRightHalfEnter = (idx) => {
  currentScore.value = idx;
};

const handleStarClick = async (idx) => {
  scoreFixed.value = idx;
  currentScore.value = idx;
  emit('setRating', idx);

  console.log("Selected Rating: ", idx);

  try {
    const userId = 6; // 실제 사용자 ID로 변경
    const response = await axios.post(`http://localhost:8080/api/scope/create/${userId}/${props.musicalId}`, {
      scope: idx
    });
    console.log('별점 저장 성공:', response.data);
  } catch (error) {
    console.error('별점 저장 오류:', error);
  }
};

const handleStarLeave = () => {
  currentScore.value = scoreFixed.value;
};
</script>

<style>
/* 별점 전체 컨테이너 */
.row-box {
  display: flex;
  gap: 5px;
}

.row-box .star-div {
  display: inline-block;
  position: relative;
  font-size: 2rem;
  cursor: pointer;
}

.row-box .star-div:hover {
  color: gold; 
}

.half-star {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  overflow: hidden;
  color: gold;
}

.half-star-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: #ccc; /* 빈 별 색상 */
}

.left {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  cursor: pointer;
}

.right {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  cursor: pointer;
}

.star-div .right:hover {
  color: gold;
}

.star-div .left:hover {
  color: gold;
}

.row-box .star-div span {
  font-size: 4rem;
  color: gold; 
  text-shadow: 
    2px 2px 0px #c3a617; 
  transform: rotate(0deg);
  transition: transform 0.3s ease-in-out, text-shadow 0.3s ease-in-out;
  cursor: pointer;
}

.row-box .star-div span:hover {
  transform: rotate(15deg) scale(1.1); 
  color: gold; 
  text-shadow: 
    3px 3px 0px #c3a617, 
    6px 6px 15px rgba(0, 0, 0, 0.7);

}
</style>
