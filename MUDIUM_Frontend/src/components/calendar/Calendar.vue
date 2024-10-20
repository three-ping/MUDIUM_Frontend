<template>
  <div :style="{ backgroundImage: `url(${backgroundImageUrl})` }" class="background-container">
    <div class="calendar-wrapper">
      <div class="calendar-header">
        <button @click="previousMonth" class="icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
            <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753"/>
          </svg>
        </button>
        <h2>{{ currentMonth }} {{ currentYear }}</h2>
        <button @click="nextMonth" class="icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
            <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
          </svg>
        </button>
      </div>
      <div class="calendar-grid">
        <div class="day" v-for="day in days" :key="day">{{ day }}</div>
        <div 
          class="date" 
          v-for="(date, index) in datesInMonth" 
          :key="index"
          :class="{ 'today': isToday(date) }"
          @click="selectDate(date)"
        >
          {{ date.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 현재 날짜 및 선택된 날짜 상태 관리
const currentDate = ref(new Date());
const selectedDate = ref(null);

// 배경 이미지 URL 목록
const backgroundImages = [
  "https://github.com/three-ping/MUDIUM_Backend/blob/feature/calender/Assets/Calendar/image%20(1).png",
  "https://github.com/three-ping/MUDIUM_Backend/blob/feature/bookmark/Assets/Calendar/image%20(2).png",
  "https://github.com/three-ping/MUDIUM_Backend/blob/feature/bookmark/Assets/Calendar/image%20(3).png",
  "https://github.com/three-ping/MUDIUM_Backend/blob/feature/bookmark/Assets/Calendar/image%20(4).png",
];

// 현재 배경 이미지 인덱스
const currentBackgroundIndex = ref(0);

// 계산된 배경 이미지 URL
const apiBaseUrl = 'http://localhost:8080/calendar-theme/image';

const backgroundImageUrl = computed(() => {
  const url = `${apiBaseUrl}?imageUrl=${encodeURIComponent(backgroundImages[currentBackgroundIndex.value])}`;
  console.log('Current background image URL:', url);
  return url;
});

// 현재 월과 연도
const currentMonth = computed(() => currentDate.value.toLocaleString('default', { month: 'long' }));
const currentYear = computed(() => currentDate.value.getFullYear());

// 날짜 리스트 생성
const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const datesInMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const dates = [];

  // Get dates before the start of the month
  for (let i = firstDayOfMonth.getDay() - 1; i > 0; i--) {
    dates.push(new Date(year, month, -i + 1));
  }

  // Get all dates in the month
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    dates.push(new Date(year, month, i));
  }

  return dates;
});

// 오늘 날짜 확인
const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// 이전 달로 이동 시 배경 이미지 변경
const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
  currentBackgroundIndex.value = (currentBackgroundIndex.value - 1 + backgroundImages.length) % backgroundImages.length;
};

// 다음 달로 이동 시 배경 이미지 변경
const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
  currentBackgroundIndex.value = (currentBackgroundIndex.value + 1) % backgroundImages.length;
};

// 날짜 선택
const selectDate = (date) => {
  selectedDate.value = date;
  console.log('Selected date:', date);
};
</script>

<style scoped>
.background-container {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.calendar-wrapper {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.day, .date {
  text-align: center;
  padding: 5px;
}

.today {
  background-color: #d0e1ff;
  border-radius: 50%;
}
</style>
