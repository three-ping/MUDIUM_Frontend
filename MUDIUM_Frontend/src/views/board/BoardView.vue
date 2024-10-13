<template>
    <div class="board-container">
        <div class="board">
            <table class="board-table">
                <thead class="board-table-header">
                    <tr class="board-tr">
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>   
                <tr v-for="pageItem in pageItems" :key="pageItem.id" class="board-tr">
                    <td class="td-id">{{ pageItem.id }}</td>
                    <td class="td-title">
                        <router-link :to="{ name: 'BoardDetailView', params: { id: pageItem.id } }">
                            {{ pageItem.title }}
                        </router-link>
                    </td>
                    <td class="td-nickname">{{ pageItem.nickname }}</td>
                    <td class="td-createdAt">{{ convertToKoreanTime(pageItem.createdAt) }}</td>
                </tr>
            </table>
        </div> 
        <Paging 
            :requestURL="requestURL" 
            :pageNumber="pageNumber" 
            :totalPageNumber="totalPageNumber" 
            @updatePageNumber="updatePageNumber" />
    </div>
</template>

<script setup>
import Paging from '@/components/board/pagination.vue';
import Detail from '@/views/board/BoardDetailView.vue';
import { ref, reactive, onMounted } from 'vue';

const requestURL = `api/board`;
const pageNumber = ref(1);
const totalPageNumber = ref(0);
const pageItems = reactive([]);

const fetchPageData = async () => {
    const response = await fetch(`http://localhost:8080/${requestURL}?page=${pageNumber.value}`, {
        method: "GET"
    });
    const responseDTO = await response.json();
    // 응답 데이터를 기반으로 pageItems와 totalPageNumber 업데이트
    pageItems.length = 0;
    pageItems.push(...responseDTO.data.content);
    totalPageNumber.value = responseDTO.data.totalPages;

};

// 자식 컴포넌트가 페이지를 변경했을 때 호출되는 함수
const updatePageNumber = (newPageNumber) => {
    pageNumber.value = newPageNumber;
    fetchPageData();  // 페이지 번호가 바뀔 때마다 새로운 데이터를 가져옴
    
};

function convertToKoreanTime(timestamp) {
// JavaScript의 Date 객체는 UTC 기준으로 동작함
const date = new Date(timestamp);

// 한국 시간은 UTC+9이므로 시간대를 KST로 변경
const options = {
    timeZone: 'Asia/Seoul', // 한국 시간대 설정
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
};

// toLocaleString으로 한국 시간대 기준으로 포맷
return date.toLocaleString('ko-KR', options);
}

// 컴포넌트가 처음 로드될 때 데이터 가져오기
onMounted(() => {
    fetchPageData();
});
</script>

<style scoped>
.board-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: Arial, sans-serif;
}

.board {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.board-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.board-table-header {
  background-color: #D53EC6;
}

.board-table th,
.board-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.board-table th {
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.board-tr:last-child td {
  border-bottom: none;
}

.board-tr:nth-child(even) {
  background-color: #f9f9f9;
}

.td-id {
  width: 10%;
  text-align: center;
}

.td-title {
  width: 50%;
}

.td-nickname {
  width: 20%;
}

.td-createdAt {
  width: 20%;
  text-align: center;
}

/* 링크 스타일 */
.td-title a {
  color: #333;
  text-decoration: none;
}

.td-title a:hover {
  text-decoration: underline;
}
</style>
