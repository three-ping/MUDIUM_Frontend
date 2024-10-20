<template>
    <div class="review-wrapper">
        <div class="review-container">
            <h2 class="review-title">리뷰</h2>
            <div class="sort-options">
                <div class="sort-select">
                    <select v-model="sortOption" @change="sortReviews">
                        <option value="likes">좋아요 순</option>
                        <option value="highRating">높은 평점 순</option>
                        <option value="lowRating">낮은 평점 순</option>
                        <option value="recent">작성 순</option>
                    </select>
                </div>
                <button @click="openModal" class="review-button">리뷰 작성</button>
                <ReviewModal
                    :isOpen="isModalOpen"
                    :musicalTitle="musicalTitle"
                    :onClose="closeModal"
                    :onSubmit="(review) => handleSubmit(review)"
                />
            </div>
            <div class="review-list" v-infinite-scroll="loadMore">
                <div v-for="review in displayedReviews" :key="review.id" class="review-item">
                    <div class="review-header">
                        <div class="user-info">
                            <img :src="review.userProfile" alt="User avatar" class="avatar" />
                            <span class="user-nickname">{{ review.userNickname }}</span>
                        </div>
                        <span class="rating">{{ review.rating }}</span>
                    </div>
                    <p class="review-content">
                        <router-link
                            :to="{ name: 'ReviewDetailView', params: { reviewId: review.reviewId } }"
                            class="text-link"
                        >
                            {{ review.content }}
                        </router-link>
                    </p>
                    <br>
                    <div class="review-footer">
                        <div class="reaction-container">
                            <span class="likes">
                                <img src="@/assets/images/like.svg" alt="좋아요" class="review-icon" />
                                <span class="count">{{ review.like }}</span>
                            </span>
                            <span class="comments">
                                <img src="@/assets/images/comment.svg" alt="댓글" class="review-icon" />
                                <span class="count">{{ review.comment }}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';

import ReviewModal from '@/components/review/ReviewModal.vue';

// 모달창 테스트
const isModalOpen = ref(false);
const openModal = () => {
    isModalOpen.value = true;
};
const closeModal = () => {
    isModalOpen.value = false;
};
const handleSubmit = async (review) => {
    // 여기서 백엔드로 리뷰 데이터를 전송하는 로직을 구현
    const reviewData = {
        userId: userId.value,
        content: review,
    };

    try {
        const response = await fetch(`http://localhost:8080/api/review/${musicalId.value}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            throw new Error('리뷰 저장에 실패했습니다.');
        }

        const result = await response.json();
        console.log('리뷰 저장 성공:', result);

        // 모달 닫기 및 리뷰 리스트 새로고침
        closeModal();
        page.value = 1; // 페이지 초기화
        reviews = []; // 기존 리뷰 초기화
        hasMore.value = true; // 데이터 더 불러오기 활성화
        await fetchReviews(); // 리뷰 다시 불러오기
    } catch (error) {
        console.error('리뷰 저장 중 오류 발생:', error);
    }
    console.log('Submitted review: ', review);
    window.location.reload();
};

const route = useRoute();
const router = useRouter();

const reviews = ref([]);
const sortOption = ref('likes');
const page = ref(1);
const perPage = 10;
// const musicalId = ref(1);
const hasMore = ref(true);
const isLoading = ref(false);
const musicalId = ref(route.params.musicalId);
const musicalTitle = ref('뮤지컬 제목!');
const userId = ref(6);

const fetchReviews = async () => {
    if (isLoading.value || !hasMore.value) return; // 이미 로딩 중이거나, 더 이상 불러올 데이터가 없는 경우 반환
    isLoading.value = true; // 로딩 시작

    try {
        const response = await fetch(
            `http://localhost:8080/api/review/${musicalId.value}?page=${page.value}&perPage=${perPage}&sort=${sortOption.value}`,
            { method: 'GET' }
        );
        if (!response.ok) {
            throw new Error('리뷰를 불러오는 데 실패했습니다.');
        }
        const data = await response.json();
        musicalTitle.value = data.data[0].musicalTitle;

        // 페이지가 처음일 경우 기존 리뷰를 덮어쓰고, 아닐 경우 추가
        if (page.value === 1) {
            reviews.value = data.data;
        } else {
            reviews.value = [...reviews.value, ...data.data];
        }

        // 받아온 데이터 개수가 'perPage'보다 작으면 더 이상 불러오지 않음
        if (data.data.length < perPage) {
            hasMore.value = false;
        }

        // 페이지를 증가시켜 다음 데이터를 준비
        page.value++;
    } catch (error) {
        console.error('리뷰를 불러오는 데 실패했습니다:', error);
    }
};

const sortReviews = () => {
    page.value = 1;
    hasMore.value = true; // 이 부분 추가함
    reviews.value = [];
    fetchReviews();
};

const loadMore = () => {
    if (hasMore.value) {
        fetchReviews();
    }
};

const displayedReviews = computed(() => {
    return reviews.value.map(secretReview => ({
        ...secretReview,
        content: truncateContent(secretReview.content),
    }));
});

// 리뷰 내용 트렁케이션 함수
const truncateContent = (content) => {
    const maxLength = 100; // 최대 100자
    const maxLines = 5; // 최대 5줄

    // 줄 바꿈 문자를 기준으로 문자열 분할
    const lines = content.split('\n');

    // 줄 수와 글자 수를 기준으로 잘릴 내용 계산
    let truncatedContent = '';
    let currentLines = 0;

    for (const line of lines) {
        // 현재 줄 수가 최대 줄 수를 초과할 경우 "..." 추가 후 종료
        if (currentLines >= maxLines) {
            truncatedContent += '...';
            break;
        }

        // 현재 줄의 길이가 남은 글자 수를 초과할 경우
        if (truncatedContent.length + line.length > maxLength) {
            const remainingChars = maxLength - truncatedContent.length;
            truncatedContent += line.slice(0, remainingChars) + '...'; // 남은 글자 수만큼 추가 후 "..." 추가
            break;
        }

        // 현재 줄 추가
        truncatedContent += line + '\n';
        currentLines++;
    }

    return truncatedContent.trim(); // 앞뒤 공백 제거
};

onMounted(() => {
    fetchReviews();
});

useInfiniteScroll(
    document,
    () => {
        loadMore();
    },
    { distance: 10 }
);
</script>

<style scoped>
.review-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px;
}

.review-container {
    width: 70%;
    max-width: 1200px;
}

.review-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.sort-options {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sort-select {
    flex: 0 1 auto;
    min-width: 140px;
    max-width: 150px;
}

.sort-select select {
    padding: 6px 10px;
    font-size: 0.9rem;
}

.review-button {
    padding: 8px 16px;
    font-size: 0.9rem;
    background-color: #9a70cc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    max-width: 120px;
}

.review-item {
    border: 2px solid #9a70cc;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
}

.review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.user-info {
    display: flex;
    align-items: center;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 15px;
}

.user-nickname {
    font-weight: bold;
}

.rating {
    color: #ffd700;
}

.review-content {
    margin-bottom: 10px;
}

.review-footer {
    display: flex;
    justify-content: flex-start;
}

.reaction-container {
    display: flex;
    align-items: center;
}

.likes,
.comments {
    display: flex;
    align-items: center;
    margin-right: 50px;
    min-width: 60px;
}

.review-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}

.count {
    font-size: 0.9rem;
}

.text-link {
    text-decoration: none;
    color: inherit;
    white-space: pre-wrap;
}

.text-link:hover {
    text-decoration: none;
}

@media (max-width: 768px) {
    .review-container {
        width: 90%;
    }

    .sort-options {
        flex-direction: column;
        align-items: stretch;
    }

    .sort-select,
    .review-button {
        margin-bottom: 10px;
        width: 100%;
    }

    .review-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .user-info {
        margin-bottom: 10px;
    }

    .reaction-container {
        flex-direction: column;
        align-items: flex-start;
    }

    .likes,
    .comments {
        margin-right: 0;
        margin-bottom: 10px;
    }
}
</style>
