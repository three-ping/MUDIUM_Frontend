<template>
    <div class="board-detail">
    <div class="board-detail-header">
        <h1 class="board-detail-title">{{ title }}</h1>
    </div>
    <div class="board-detail-author-created">
        <span class="board-detail-author">작성자: {{ author }}</span>
        <span class="board-detail-created">작성시간: {{ convertToKoreanTime(createdAt) }}</span>
    </div>
    <template v-if="updatedAt !== null">
        <div class="board-detail-updated-template">
        <span class="board-detail-updated">수정시간: {{ convertToKoreanTime(updatedAt) }}</span>
        </div>
    </template>
    <div class="board-detail-content">
        <p>{{ content }}</p>
    </div>
    <div class="board-detail-comment">
        <h2>댓글을 입력하세요</h2>
        <textarea v-model="newComment" placeholder="댓글을 입력하세요."></textarea>
        <div class="button-container">
            <button class="board-back" @click="backToBoard">글 목록</button>
            <button class="comment-submit" @click="submitComment">등록</button>
        </div>
    </div>
    <div class="board-detail-comments">
        <div class="comment" v-for="comment in comments" :key="comment.id">
        <strong>{{ comment.author }}</strong>
        <p>{{ comment.text }}</p>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);

const title = ref('시카고 너무 재밌다 최재림 최고');
const author = ref('최재림');
const content = ref('역시 뮤지컬은 시카고!!');
const createdAt = ref(0);
const updatedAt = ref(0);
const newComment = ref('');
const comments = ref([]);

const fetchDetailBoard = async() => {
    const response = await fetch(`http://localhost:8080/api/board/${id.value}`, {
        method: "GET"
    });
    const responseDTO = await response.json();
    title.value = responseDTO.data.title;
    author.value = responseDTO.data.nickname;
    content.value = responseDTO.data.content;
    createdAt.value = responseDTO.data.createdAt;
    updatedAt.value = responseDTO.data.updatedAt;
    console.log(updatedAt.value);
}

const fetchComments = async () => {
    try {
 
    comments.value = [
        { id: 1, author: '김정모', text: '역시 뮤지컬은 시카고!! ...' },
        { id: 2, author: '이서연', text: '저도 너무 재미있게 봤어요!' }
    ];
    } catch (error) {
    console.error('댓글을 불러오는 데 실패했습니다:', error);
    }
};

const submitComment = async () => {
    if (newComment.value.trim() === '') return;
    
    try {
 
    comments.value.push({
        id: comments.value.length + 1,
        author: '현재 사용자',
        text: newComment.value
    });
    newComment.value = '';
    
    await fetchComments();
    } catch (error) {
    console.error('댓글 등록에 실패했습니다:', error);
    }
};

const backToBoard = () => {
    router.push('/board'); 

}

function convertToKoreanTime(timestamp) {
const date = new Date(timestamp);

const options = {
    timeZone: 'Asia/Seoul', 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
};

return date.toLocaleString('ko-KR', options);
}


onMounted(() => {
    fetchDetailBoard();
    fetchComments();
});
</script>

<style scoped>
.board-detail {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.board-detail-header {
    border-bottom: 2px solid #D53EC6;
    padding-bottom: 10px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

.board-detail-title {
    font-size: 24px;
    margin: 0;
}

.board-detail-author-created {
    font-size: 14px;
    color: #666;
    display: flex;
    justify-content: space-between;
}
.board-detail-updated {
    font-size: 14px;
    color: #666;
}
.board-detail-updated-template {
    display: flex;
    align-items: end;
    flex-direction: column;
}
.board-detail-content {
    min-height: 50vh;
    margin-bottom: 30px;
    border: 1px solid #eee;
    padding: 20px;
    overflow-y: auto;
}

.board-detail-comment h2 {
    font-size: 18px;
    margin-bottom: 10px;
}

textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.comment-submit {
    background-color: #D53EC6;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

.board-back {
    background-color: #9A70CC;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

.board-detail-comments {
    margin-top: 30px;
}

.comment {
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
}

.comment strong {
    display: block;
    margin-bottom: 5px;
}

.button-container {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 20px;
}
</style>