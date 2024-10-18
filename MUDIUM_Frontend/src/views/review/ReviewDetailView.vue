<template>
    <div class="review-container">
        <div class="review-header">
            <img :src="review.userProfile" alt="User Profile Image" class="user-avatar" />
            <div class="user-info">
                <h3>
                    <span>
                        {{ review.userNickname }} <span v-if="review.isPremium" class="premium-badge">P</span>
                    </span>
                    <span class="dropdown-wrapper">
                        <span @click="toggleDropdown" class="dropdown-icon">
                            <img src="@/assets/images/threeDots.svg" alt="threeDots">
                        </span>
                        <div v-if="dropdownVisible" class="dropdown-menu">
                            <button @click="editReview" class="update">수정</button>
                            <button @click="deleteReview" class="delete">삭제</button>
                        </div>
                    </span>
                </h3>
                <p>{{ formatDate(review.createdAt) }}</p>
            </div>
        </div>
        <div class="movie-info">
            <h2>{{ review.musicalTitle }}</h2>
        </div>
        <p class="review-content">{{ review.content }}</p>
        <div class="review-stats">
            <span>좋아요 {{ review.like }}</span>
            <span>댓글 {{ review.comment }}</span>
        </div>
        <div class="review-actions">
            <button @click="handleLike"><i class="icon-like"></i> 좋아요</button>
            <button @click="handleComment"><i class="icon-comment"></i> 댓글</button>
        </div>
        <div v-if="showComments" class="comments-section">
            <div v-for="comment in review.commentList" :key="comment.id" class="comment">
                <img :src="comment.userAvatar" alt="Commenter Avatar" class="commenter-avatar" />
                <div class="comment-content">
                    <h4>{{ comment.userName }}</h4>
                    <p>{{ comment.content }}</p>
                    <span>좋아요 {{ comment.likes }}</span>
                </div>
            </div>
        </div>

        <!-- 수정 모달 -->
        <div v-if="showModal">
            <ReviewModal
                :isOpen="showModal"
                :musicalTitle="review.musicalTitle"
                :isEditing="true"
                :onClose="closeModal"
                :onSubmit="(review) => handleReviewSubmit(review)"
                :initialReview="review.content"
            />
        </div>

        <!-- 삭제 모달 -->
        <div v-if="showDeleteModal">
            <ReviewDeleteModal
                :isOpen="showDeleteModal"
                @close="closeModal"
                @submit="handleDeleteReviewSubmit"
            >
                <p class="delete-confirmation">삭제하시겠습니까?</p>
            </ReviewDeleteModal>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ReviewModal from '../../components/review/ReviewModal.vue';
import ReviewDeleteModal from '../../components/review/ReviewDeleteModal.vue';

// const props = defineProps({
//     reviewId: {
//         type: Number,
//         required: true,
//     },
// });

const route = useRoute();
const router = useRouter();
const review = reactive({
    reviewId: null,
    userNickname: '',
    content: '',
    createdAt: null,
    like: 0,
    musicalTitle: '',
    userProfile: '',
});
const musicalId = ref(route.params.musicalId);
const reviewId = ref(route.params.reviewId);
const showComments = ref(false);
const dropdownVisible = ref(false); // 드롭다운!!
const showModal = ref(false);
const showDeleteModal = ref(false);
const userId = ref(6);          // 이 부분은 동적으로 회원 받아야 돼!!!!!!!!!!!

const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value; // 드롭다운 토글!!
};

// 클릭 이벤트 핸들러
const handleClickOutside = (event) => {
    const dropdown = document.querySelector('.dropdown-wrapper');
    if (dropdown && !dropdown.contains(event.target)) {
        dropdownVisible.value = false; // 드롭다운 닫기
    }
};

const fetchReview = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/review/${musicalId.value}/${reviewId.value}`, { method: "GET" });
        if (!response.ok) {
            throw new Error('리뷰를 불러오는 데 실패했습니다.');
        }
        const data = await response.json();
        Object.assign(review, data.data[0]);
    } catch (error) {
        console.error('리뷰를 불러오는 데 실패했습니다:', error);
    }
};

const editReview = () => {
    dropdownVisible.value = false; // 드롭다운 닫기
    // 여기서 수정 로직을 구현
    showModal.value = true; // 모달 표시
};

// 모달 닫기
const closeModal = () => {
    showModal.value = false;
    showDeleteModal.value = false;
}

// 수정된 리뷰 제출 처리
const handleReviewSubmit = async (updatedReview) => {
    const reviewData = {
        userId: userId.value,
        content: updatedReview
    };

    try {
        const response = await fetch(`http://localhost:8080/api/review/${musicalId.value}/${reviewId.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData), // 업데이트된 내용 전송
        });
        if (!response.ok) {
            throw new Error('리뷰 수정에 실패했습니다.');
        }

        const result = await response.json();
        console.log('리뷰 저장 성공:', result);

        // 수정 후 리뷰 데이터를 새로 고침
        closeModal(); // 제출 후 모달 닫기
        await fetchReview();
    } catch (error) {
        console.error('리뷰 업데이트 중 오류 발생:', error);
    }
    // window.location.reload();
};

const deleteReview = () => {
    dropdownVisible.value = false; // 드롭다운 닫기
    // 여기서 삭제 로직을 구현
    showDeleteModal.value = true;
};

const handleDeleteReviewSubmit = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/review/${musicalId.value}/${reviewId.value}?userId=${userId.value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('리뷰 삭제에 실패했습니다.');
        }

        const result = await response.json();
        console.log('리뷰 삭제 성공:', result);

        closeModal();
        await fetchReview();

        router.push(`/review/view/${musicalId.value}`);
    } catch (error) {
        console.error('리뷰 삭제 중 오류 발생:', error);
    }
};





const formatDate = (timestamp) => {
    const now = new Date();
    const reviewDate = new Date(timestamp); // Use the timestamp directly

    const diffTime = now - reviewDate; // Difference in milliseconds
    const diffSeconds = Math.floor(diffTime / 1000); // Convert to seconds
    const diffMinutes = Math.floor(diffSeconds / 60); // Convert to minutes
    const diffHours = Math.floor(diffMinutes / 60); // Convert to hours
    const diffDays = Math.floor(diffHours / 24); // Convert to days
    const diffMonths = Math.floor(diffDays / 30); // Roughly calculate months
    const diffYears = Math.floor(diffDays / 365); // Roughly calculate years

    if (diffYears > 0) {
        return `${diffYears}년 전`;
    } else if (diffMonths > 0) {
        return `${diffMonths}개월 전`;
    } else if (diffDays > 0) {
        return `${diffDays}일 전`;
    } else if (diffHours > 0) {
        return `${diffHours}시간 전`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes}분 전`;
    } else {
        return '방금 전'; // Just now
    }
};

const handleLike = () => {
    // 좋아요 로직 구현
    console.log('Like clicked');
};

const handleComment = () => {
    showComments.value = !showComments.value;
};

onMounted(() => {
    fetchReview();
    document.addEventListener('click', handleClickOutside);
});
// 컴포넌트가 언마운트될 때 이벤트 리스너 제거
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.review-container {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;
}

.review-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 12px;
}

.user-info {
    flex-grow: 1; /* 사용자 정보가 가능한 공간을 차지하게 함 */
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    justify-content: space-between; /* 세로 공간을 균등하게 배치 */
}

.user-info h3 {
    margin: 0;
    font-size: 16px;
    display: flex;
    justify-content: space-between; /* 닉네임과 점 3개 아이콘 사이 공간 확보 */
}

.user-info p {
    margin: 0;
    font-size: 14px;
    color: #666;
}

.premium-badge {
    background-color: #ffd700;
    color: #000;
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 12px;
    margin-left: 4px;
}

.movie-info h2 {
    margin: 0;
    font-size: 18px;
}

.movie-info p {
    margin: 4px 0;
    font-size: 14px;
    color: #666;
}

.rating {
    font-size: 16px;
}

.star-filled {
    color: #ffd700;
}

.review-content {
    margin: 16px 0;
    font-size: 16px;
}

.review-stats {
    font-size: 14px;
    color: #666;
    margin-bottom: 12px;
}

.review-actions button {
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 16px;
    font-size: 14px;
}

.comments-section {
    margin-top: 16px;
    border-top: 1px solid #e0e0e0;
    padding-top: 16px;
}

.comment {
    display: flex;
    margin-bottom: 12px;
}

.commenter-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 8px;
}

.comment-content h4 {
    margin: 0;
    font-size: 14px;
}

.comment-content p {
    margin: 4px 0;
    font-size: 14px;
}

.comment-content span {
    font-size: 12px;
    color: #666;
}

.delete-confirmation {
    text-align: center; /* 가운데 정렬 */
    font-size: 18px; /* 폰트 크기 조정 */
    margin: 0; /* 기본 마진 제거 */
    padding: 10px 0; /* 상하 패딩 추가 (필요시) */
}

/* 드롭다운 스타일 */
.dropdown-wrapper {
    position: relative;
    display: inline-block;
}

.dropdown-icon {
    cursor: pointer;
    margin-left: 8px;
}

.dropdown-menu {
    position: absolute;
    top: 100%; /* 아이콘 바로 아래에 위치 */
    left: -60px; /* 왼쪽 정렬 */
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 10; /* 드롭다운 메뉴가 다른 요소 위에 나타나도록 */
    min-width: 80px; /* 최소 너비 설정 */
}

.dropdown-menu button {
    display: block;
    width: 100%;
    padding: 8px 16px;
    border: none;
    background: none;
    text-align: center;
    cursor: pointer;
}

.dropdown-menu button.update {
    color: black;
}

.dropdown-menu button.delete {
    color: red;
}

.dropdown-menu button:hover {
    background-color: #f0f0f0; /* 호버 효과 */
}
</style>
