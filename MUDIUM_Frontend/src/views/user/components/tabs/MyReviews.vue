<template>
	<div>
		<h1>내 리뷰</h1>
		<div v-if="loading" class="text-center py-8">
			<p class="text-xl">Loading reviews...</p>
		</div>
		<div v-else-if="error" class="text-center py-8 text-red-600">
			<p class="text-xl">{{ error }}</p>
		</div>
		<div v-else class="cards-grid">
			<div v-for="review in reviews" :key="review.reviewId" class="card-container">
				<div class="card" :class="{ 'is-flipped': review.isFlipped }" @mouseenter="flipCard(review, true)"
					@mouseleave="flipCard(review, false)">
					<div class="card-side card-front">
						<img :src="review.poster" :alt="review.musicalTitle" class="card-image">
					</div>
					<div class="card-side card-back">
						<div class="p-4 overflow-y-auto h-full">
							<h3 class="text-xl font-semibold mb-2">{{ review.musicalTitle }}</h3>
							<p><strong>Rating:</strong> {{ review.musicalRating }}</p>
							<p><strong>Production:</strong> {{ review.production || 'N/A' }}</p>
							<p><strong>User:</strong> {{ review.userNickname }}</p>
							<p><strong>Scope:</strong> {{ review.scope || 'N/A' }}</p>
							<p><strong>View Count:</strong> {{ review.viewCount }}</p>
							<p v-if="review.reviewContent" class="mt-2"><strong>Review:</strong> {{ review.reviewContent
								}}</p>
							<p v-if="review.reviewLikes !== null" class="mt-2"><strong>Likes:</strong> {{
								review.reviewLikes }}</p>
							<p class="mt-2"><strong>Date:</strong> {{ formatDate(review.reviewCreatedAt) }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const reviews = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchReviews = async (userId) => {
	try {
		const response = await axios.get(`/api/review/users/${userId}`);
		if (response.data.success) {
			reviews.value = response.data.data.map(review => ({ ...review, isFlipped: false }));
		} else {
			throw new Error(response.data.error || 'Failed to fetch reviews');
		}
	} catch (err) {
		error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
	} finally {
		loading.value = false;
	}
};

const formatDate = (timestamp) => {
	if (!timestamp) return 'N/A';
	const date = new Date(timestamp);
	return date.toLocaleDateString();
};

const flipCard = (review, isFlipped) => {
	review.isFlipped = isFlipped;
};

// Assuming we're getting the userId from a prop or a global state
const userId = 1; // Replace this with the actual way you're getting the userId

onMounted(() => {
	fetchReviews(userId);
});
</script>

<style scoped>
.cards-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
	gap: 2rem;
	padding: 2rem;
}

.card-container {
	width: 40rem;
	height: 60rem;
	perspective: 1000px;
}

.card {
	position: relative;
	width: 100%;
	height: 100%;
	transition: transform 0.6s;
	transform-style: preserve-3d;
	cursor: pointer;
}

.card.is-flipped {
	transform: rotateY(180deg);
}

.card-side {
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	border-radius: 10px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	overflow: hidden;
}

.card-front {
	background-color: white;
}

.card-back {
	background-color: #f3f4f6;
	transform: rotateY(180deg);
}

.card-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}
</style>