<template>
    <div class="board-detail">
    <div class="board-detail-header">
        <h1 class="board-detail-title">{{ title }}</h1>
        <div class="board-detail-buttons">
    <template v-if="userId == author_id">
        <button class="board-button" @click="showDeleteModal = true">삭제</button>
        <button class="board-button" @click="editPost">수정</button>
    </template>
        <button class="board-button" @click="backToBoard">글 목록</button>
        </div>
    </div>
    <div class="board-detail-subheader">
        <div class="board-detail-author-created">
        <span class="board-detail-author">작성자: {{ author }}</span>
        <span class="board-detail-created">작성시간: {{ convertToKoreanTime(createdAt) }}</span>
        </div>
    </div>
    <template v-if="updatedAt !== null">
        <div class="board-detail-updated-template">
        <span class="board-detail-updated">수정시간: {{ convertToKoreanTime(updatedAt) }}</span>
        </div>
    </template>
    <div class="board-detail-subheader">
        <div class="board-detail-viewCount">
        <span class="board-detail-viewCount">조회수: {{ viewCount }}</span>
        </div>
    </div>
    <div class="board-detail-content">
        <div class="board-detail-content-read">
            <p>{{ content }}</p>
        </div>
        <Like class="board-like" :likeCount="likeCount" :isLiked="isLiked" :boardId="id" :userId="userId" />
    </div>
    <div class="board-detail-comment">
        <h2>댓글을 입력하세요</h2>
        <textarea v-model="newComment" placeholder="댓글을 입력하세요."></textarea>
        <div class="button-container">
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

    <Modal v-model:isVisible="showDeleteModal" @confirm="deletePost">
        정말 삭제하시겠습니까?
    </Modal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Like from "@/components/common/Like.vue";
import Modal from "@/components/common/Modal.vue";

const route = useRoute();
const router = useRouter();
const id = ref(Number(route.params.id));

const title = ref('');
const author = ref('');
const content = ref('로딩중');
const createdAt = ref(0);
const updatedAt = ref(0);
const newComment = ref('');
const comments = ref([]);
const likeCount = ref(0);
const isLiked = ref(false);
const userId = ref(1);
const showDeleteModal = ref(false);
const viewCount = ref(0);
const author_id = ref(0);

const editPost = () => {
    router.push(`/board/edit/${id.value}`);
};

const deletePost = async () => {
    await fetch(`http://localhost:8080/api/board/${id.value}/${userId.value}`, {
        method: 'DELETE'
    }
    );
    console.log(`http://localhost:8080/api/board/${id.value}/${userId.value}`);
    router.push('/board');  
};

const fetchDetailBoard = async() => {
    const response = await fetch(`http://localhost:8080/api/board/${id.value}`, {
        method: "GET"
    });
    const responseDTO = await response.json();
    title.value = responseDTO.data.title;
    author.value = responseDTO.data.nickname;
    author_id.value = responseDTO.data.userId;
    content.value = responseDTO.data.content;
    createdAt.value = responseDTO.data.createdAt;
    updatedAt.value = responseDTO.data.updatedAt;
    likeCount.value = Number(responseDTO.data.boardLike);
    viewCount.value = Number(responseDTO.data.viewCount);

    incrementViewCount();
}

const incrementViewCount = async () => {
    const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts') || '{}');
    if (!viewedPosts[id.value]) {
        viewedPosts[id.value] = true;
        localStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));

        await fetch(`http://localhost:8080/api/board/${id.value}/count`, {
            method: 'PUT'
        });

        viewCount.value++;
    }
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

const checkIsLiked = async () => {
    const response = await fetch(`http://localhost:8080/api/board-like/${id.value}/${userId.value}`, {
        method: "GET"
    });
    const responseDTO = await response.json();
    isLiked.value = responseDTO.data;
}


onMounted(() => {
    fetchDetailBoard();
    fetchComments();
    checkIsLiked();
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
margin-bottom: 10px;
display: flex;
justify-content: space-between;
align-items: center;
}

.board-detail-buttons {
display: flex;
gap: 10px;
}

.board-detail-title {
font-size: 24px;
margin: 0;
}



.board-detail-author-created {
font-size: 14px;
color: #666;
display:flex;
justify-content: space-between;
}

.board-detail-viewCount {
    font-size: 14px;
    color: #666;
    display:flex;
    flex-direction: column;
    align-items: end;
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

.comment-submit, .board-button {
border: none;
padding: 10px 20px;
border-radius: 4px;
cursor: pointer;
color: white;
}

.comment-submit {
background-color: #D53EC6;
}

.board-button {
background-color: #9A70CC;
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

.board-detail-container {
position: relative;
width: 100%;
min-height: 500px; /* 최소 높이 설정, 필요에 따라 조정 */
border: 1px solid #ccc;
}

.board-content {
width: 100%;
height: 100%;
padding: 20px;
box-sizing: border-box;
}
.board-detail-content {
position: relative;
min-height: 50vh;
margin-bottom: 30px;
border: 1px solid #eee;
padding: 20px;
overflow-y: auto;
}

.board-detail-content-read {
margin-bottom: 100px; /* 좋아요 박스와 겹치지 않도록 여백 추가 */
}

.board-like {
position: absolute;
left: 50%;
bottom: 20%; /* 아래에서 20% 위치 (전체 높이의 4/5 지점) */
transform: translateX(-50%);
border-radius: 8px;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>