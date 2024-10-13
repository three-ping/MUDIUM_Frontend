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
                    <td class="td-createdAt">{{ pageItem.createdAt }}</td>
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
