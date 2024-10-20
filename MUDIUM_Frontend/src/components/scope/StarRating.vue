<template>
    <div class="row-box">
      <div
        v-for="(star, idx) in 5"
        :key="idx"
        class="star-div"
        @click="handleStarClick"
      >
        <!-- 반개 별점 표시 -->
        <span v-if="score - Math.floor(score) === 0.5 && Math.floor(score) === idx">
          <!-- 반개 채운 별 -->
          <span class="half-star">&#9733;</span>
          <!-- 반개 빈 별 -->
          <span class="half-star-cover">&#9734;</span>
        </span>
        <span v-else-if="idx + 1 > score">
          &#9734; <!-- 빈 별 -->
        </span>
        <span v-else>
          &#9733; <!-- 꽉 찬 별 -->
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
  import { ref, watch } from 'vue';
  
  const initialRating = 0; // 초기 별점 설정
  const score = ref(initialRating); // 현재 마우스로 hover된 별점
  const scoreFixed = ref(initialRating); // 고정된 별점 (클릭 후)
  
  // 왼쪽 반 별 hover 시 반개 별점 처리
  const handleLeftHalfEnter = (idx) => {
    score.value = idx + 0.5;
  };
  
  // 오른쪽 반 별 hover 시 전체 별점 처리
  const handleRightHalfEnter = (idx) => {
    score.value = idx + 1;
  };
  
  const handleStarClick = () => {
    scoreFixed.value = score.value;
    console.log("Selected Rating: ", score.value); 
  };
  
  const handleStarLeave = () => {
    if (score.value !== scoreFixed.value) {
      score.value = scoreFixed.value;
    }
  };
  
  watch(() => initialRating, (newRating) => {
    score.value = newRating;
    scoreFixed.value = newRating;
  });
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
  