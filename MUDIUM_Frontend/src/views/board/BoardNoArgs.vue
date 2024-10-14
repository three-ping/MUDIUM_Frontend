<template>
    <div class="board-container">
    <div class="board">
        <table class="board-table">
        <thead class="board-table-header">
            <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            </tr>
        </thead>   
        </table>
        <div class="back-to-view">
        <p class="back-to-view-p">검색 결과가 없습니다.</p>
        <button class="back-to-view-button" @click="goBackToBoard">게시글 목록으로 돌아가기</button>
        </div>
    </div> 
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBackToBoard = () => {
    router.push('/board');
};
</script>

<style scoped>
.board-container {
    width: 100%;
    max-width: 1200px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
}

.board-table {
    width: 100%;
    border-collapse: collapse;
}

.board-table-header {
    background-color: #D53EC6;
}

.board-table th {
    padding: 12px 15px;
    text-align: left;
    color: white;
    font-weight: bold;
}

.back-to-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.back-to-view-p {
    font-size: 18px;
    margin-bottom: 20px;
}

.back-to-view-button {
    padding: 10px 15px;
    background-color: #6EABE1;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.back-to-view-button:hover {
    background-color: #9acbf6;
}
</style>