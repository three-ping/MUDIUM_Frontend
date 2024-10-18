<template>
    <div class="review-container">
        <h2 class="review-title">리뷰</h2>
        <div class="sort-options">
            <select v-model="sortOption" @change="sortReviews">
                <option value="likes">좋아요 순</option>
                <option value="highRating">높은 평점 순</option>
                <option value="lowRating">낮은 평점 순</option>
                <option value="recent">작성 순</option>
            </select>

            <!-- 모달창 테스트 -->
            <button @click="openModal">리뷰 작성</button>
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
                    <img :src="review.userProfile" alt="User avatar" class="avatar" />
                    <span class="musical-title">{{ review.userNickname }}</span>
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
                <br />
                <div class="review-footer">
                    <span class="likes"
                        ><img src="@/assets/images/like.svg" alt="좋아요" class="review-like" /> {{ review.like }}</span
                    >
                    <span class="comments"
                        ><img src="@/assets/images/comment.svg" alt="댓글" class="review-comment" />
                        {{ review.comment }}</span
                    >
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

const displayedReviews = computed(() => reviews.value); // 이 부분 추가함

const loadMore = () => {
    if (hasMore.value) {
        fetchReviews();
    }
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
.review-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.review-container {
    max-width: 600px;
    margin: 0 auto;
}

.sort-options {
    margin-bottom: 20px;
}

.review-item {
    border: 2px solid #9a70cc;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
}

.review-header {
    display: flex;
    align-items: center;
    justify-content: s;
    margin-bottom: 10px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.musical-title {
    font-weight: bold;
    margin-right: 10px;
}

.rating {
    color: #ffd700;
}

.review-content {
    margin-bottom: 10px;
    text-decoration: none;
    color: inherit;
    cursor: default;
}

.review-footer {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    justify-content: flex-start;
}

.likes,
.comments {
    display: flex;
    align-items: center;
    margin-right: 100px;
}

.review-like,
.review-comment {
    width: 25px;
    height: 25px;
    margin-right: 4px;
}

.text-link {
    text-decoration: none;
    color: inherit; /* 부모 요소의 색상과 동일하게 설정 */
}
.text-link:hover {
    text-decoration: none; /* 호버 시에도 밑줄이 생기지 않도록 */
}
</style>
