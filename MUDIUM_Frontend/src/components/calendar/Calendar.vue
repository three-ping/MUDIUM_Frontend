<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="prevMonth">Previous</button>
      <span>{{ currentYear }}년 {{ currentMonth + 1 }}월</span>
      <button @click="nextMonth">Next</button>
    </div>
    <div class="calendar-grid">
      <div v-for="day in daysOfWeek" :key="day" class="calendar-day-header">
        {{ day }}
      </div>
      <div 
        v-for="(day, index) in daysInMonth" 
        :key="index" 
        :class="['calendar-day', { 'current-day': isToday(day) }]"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 현재 날짜를 기준으로 초기화
const today = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// 주어진 달의 일수를 계산
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// 주어진 달의 첫 번째 날의 요일을 계산
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

// 월의 날짜 배열 계산
const daysInMonth = computed(() => {
  const days = [];
  const daysInCurrentMonth = getDaysInMonth(currentYear.value, currentMonth.value);
  const firstDay = getFirstDayOfMonth(currentYear.value, currentMonth.value);

  // 첫 주 빈 칸 채우기 (이전 달의 날짜는 표시하지 않음)
  for (let i = 0; i < firstDay; i++) {
    days.push('');
  }

  // 현재 달의 날짜 추가
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    days.push(day);
  }

  return days;
});

// 오늘 날짜인지 여부 확인
const isToday = (day) => {
  return (
    day === today.getDate() &&
    currentMonth.value === today.getMonth() &&
    currentYear.value === today.getFullYear()
  );
};

// 이전 달로 이동
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
};

// 다음 달로 이동
const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
};
</script>

<style scoped>
.calendar {
  width: 350px;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.calendar-day-header {
  background-color: #f7f7f7;
  padding: 8px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

.calendar-day {
  padding: 10px;
  text-align: center;
  background-color: white;
  min-height: 50px;
}

.calendar-day.current-day {
  background-color: #f0c0f0;
  font-weight: bold;
  border-radius: 4px;
}

button {
  background-color: #9957a7;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #9236A4;
}
</style>
