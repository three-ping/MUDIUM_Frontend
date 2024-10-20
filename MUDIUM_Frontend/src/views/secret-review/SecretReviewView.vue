<template>
    <div class="review-wrapper">
        <div class="review-container">
            <h2 class="review-title">비밀 리뷰</h2>
            <!-- 모달창 테스트 -->
            <button @click="openModal">비밀리뷰 작성</button>
            <ReviewModal
                :isOpen="isModalOpen"
                :musicalTitle="musicalTitle"
                :onClose="closeModal"
                :onSubmit="(review) => handleSubmit(review)"
            />
            <div class="review-list" v-infinite-scroll="loadMore">
                <div v-for="secretReview in displayedReviews" :key="secretReview.id" class="review-item">
                    <div class="review-header">
                        <div class="review-info">
                            <img :src="secretReview.userProfile" alt="User avatar" class="avatar" />
                            <span class="musical-title">{{ secretReview.musicalTitle }}</span>
                        </div>
                        <span class="rating">{{ secretReview.rating }}</span>
                    </div>
                    <p class="review-content">
                        <router-link
                            :to="{
                                name: 'SecretReviewDetailView',
                                params: { musicalId: secretReview.musicalId, secretReviewId: secretReview.secretReviewId },
                            }"
                            class="text-link"
                        >
                            {{ secretReview.content }}
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';
import { useRoute } from 'vue-router';

import ReviewModal from '@/components/review/ReviewModal.vue';

// 모달 관련
const isModalOpen = ref(false);
const openModal = () => {
    isModalOpen.value = true;
};
const closeModal = () => {
    isModalOpen.value = false;
};

// 비밀리뷰 작성하는 부분
const handleSubmit = async (review) => {
    const reviewData = {
        userId: userId.value,
        content: review,
    };

    try {
        const response = await fetch(`http://localhost:8080/api/secretreview/${musicalId.value}`, {
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
        reviews.value = []; // 기존 리뷰 초기화
        hasMore.value = true; // 데이터 더 불러오기 활성화
        await fetchReviews(); // 리뷰 다시 불러오기
    } catch (error) {
        console.error('리뷰 저장 중 오류 발생:', error);
    }
};

const route = useRoute();

const reviews = ref([]);
const page = ref(1);
const perPage = 10;
const hasMore = ref(true);
const isLoading = ref(false);
const musicalTitle = ref('뮤지컬 제목!');
const musicalId = ref(9);
const userId = ref(6);

// 리뷰 목록 조회
const fetchReviews = async () => {
    if (isLoading.value || !hasMore.value) return;
    isLoading.value = true;

    try {
        const response = await fetch(
            `http://localhost:8080/api/secretreview?page=${page.value}&perPage=${perPage}&userId=${userId.value}`,
            { method: 'GET' }
        );
        if (!response.ok) {
            throw new Error('리뷰를 불러오는 데 실패했습니다.');
        }
        const data = await response.json();
        console.log(data.data);
        musicalTitle.value = data.data[1]?.musicalTitle || '뮤지컬 제목!';

        if (page.value === 1) {
            reviews.value = data.data;
        } else {
            reviews.value = [...reviews.value, ...data.data];
        }

        if (data.data.length < perPage) {
            hasMore.value = false;
        }

        page.value++;
    } catch (error) {
        console.error('리뷰를 불러오는 데 실패했습니다:', error);
    } finally {
        isLoading.value = false;
    }
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
    transition: background-color 0.3s ease;
}

.review-button:hover {
    background-color: #8a60bc;
}

.review-list {
    margin-top: 20px;
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

.review-info{
    display: flex;
    align-items: center;
}

.user-info {
    display: flex;
    align-items: center;
    margin-right: 10px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.musical-title {
    font-weight: bold;
    margin: 0 10px;
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
    text-decoration: underline;
}

@media (max-width: 768px) {
    .review-container {
        width: 90%;
        /* padding: 15px; */
    }

    .sort-options {
        flex-direction: column;
        align-items: stretch;
    }

    .sort-select,
    .review-button {
        width: 100%;
        margin-bottom: 10px;
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
