<template>
  <div class="review-card">
    <div class="review-header">
      <span class="user-name">{{ nickName || '익명' }}</span>
      <span v-if="scope !== null" class="small-star">★ {{ scope }}</span>
    </div>
    <div class="review-content">
      <p>{{ content || '내용 없음' }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  nickName: {
    type: String,
    default: '익명'
  },
  content: {
    type: String,
    default: '내용 없음'
  },
  scope: {
    type: Number,
    default: null
  }
});
</script>

<style scoped>
.review-card {
  background-color: #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 2px dashed #ccc; /* 티켓 모양을 위한 테두리 */
  display: flex;
  flex-direction: column;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.user-name {
  font-weight: bold;
}

.small-star {
  font-size: 0.8rem;
  color: gold;
}

.review-content {
  text-align: center;
}
</style>
