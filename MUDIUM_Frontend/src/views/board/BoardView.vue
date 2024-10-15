<template>
  <div class="board-container">
    <div class="board-actions">
      <div class="search-bar">
        <select v-model="searchType">
          <option value="TITLE">제목</option>
          <option value="NICKNAME">작성자</option>
          <option value="CONTENT">내용</option>
        </select>
        <input class="search-box" type="text" v-model="searchQuery" placeholder="검색어를 입력하세요">
        <button @click="search" class="search-button" :disabled="!searchQuery.trim()">검색</button>
        <button @click="fetchPageData" class="back-button" >목록</button>
      </div>
      <button @click="createBoard" class="create-button">글 쓰기</button>
    </div>
    <div class="board">
      <table class="board-table">
        <thead class="board-table-header">
          <tr class="board-tr">
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>좋아요</th>
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
          <td class="td-like">{{ pageItem.boardLike }}</td>
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
import { useRouter } from 'vue-router';

const router = useRouter();
const requestURL = `api/board`;
const pageNumber = ref(1);
const totalPageNumber = ref(0);
const pageItems = reactive([]);
const searchType = ref('TITLE');
const searchQuery = ref('');



const fetchPageData = async () => {
  const response = await fetch(`http://localhost:8080/${requestURL}?page=${pageNumber.value}`, {
    method: "GET"
  });
  const responseDTO = await response.json();
  pageItems.length = 0;
  pageItems.push(...responseDTO.data.content);
  totalPageNumber.value = responseDTO.data.totalPages;

};

const queryPageData = async () => {
  const response = await fetch(`http://localhost:8080/${requestURL}?searchType=${searchType.value}&searchQuery=${searchQuery.value}`, {
    method: "GET"
  });
  const responseDTO = await response.json();
  pageItems.length = 0;
  pageItems.push(...responseDTO.data.content);
  totalPageNumber.value = responseDTO.data.totalPages;

};

const updatePageNumber = (newPageNumber) => {
  pageNumber.value = newPageNumber;
  fetchPageData();
};

const search = async () => {
  pageNumber.value = 1;
  await queryPageData();
  if(pageItems.length == 0) {
    router.push("view/no-args");
  }
};

const createBoard = () => {
  router.push('create');
};

function convertToKoreanTime(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}


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
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
  font-family: Arial, sans-serif;
}

.board-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}


.search-bar {
  display: flex;
  gap: 10px;
  width: 60vw;
}

.search-bar select,
.search-bar input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-box {
  width: 50%;
}

.search-button,
.create-button,
.back-button {
  width: 8%;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-weight: bold;
}

.back-button {
  background-color: #6EABE1;
}

.search-button {
  background-color: #9A70CC;
}

.create-button {
  background-color: #D53EC6;
}

.board {
  width: 100%;
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
  width: 15%;
}

.td-createdAt {
  width: 15%;
  text-align: center;
}
.td-like {
  width: 10%;
  text-align-last: center;
}

.td-title a {
  color: #333;
  text-decoration: none;
}

.td-title a:hover {
  text-decoration: underline;
}
</style>