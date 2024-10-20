<template>
	<div class="watched-container">
		<h2>My Watched Musicals</h2>
		<div v-if="loading" class="loading">Loading...</div>
		<div v-else-if="error" class="error">{{ error }}</div>
		<div v-else-if="watchedMusicals.length === 0" class="no-musicals">
			You haven't watched any musicals yet.
		</div>
		<div v-else class="musical-list">
			<div v-for="musical in watchedMusicals" :key="musical.musicalId" class="musical-item">
				<h3>Musical ID: {{ musical.musicalId }}</h3>
				<div class="rating" v-if="musical.scope">
					Rating: {{ musical.scope }} / 5
				</div>
				<div class="review" v-if="musical.reviewContent">
					<p>{{ musical.reviewContent }}</p>
					<div class="review-meta">
						<span>Posted on: {{ formatDate(musical.reviewCreatedAt) }}</span>
						<span>Likes: {{ musical.reviewLikes }}</span>
					</div>
				</div>
				<div v-else class="no-review">
					No review written yet.
				</div>
			</div>
		</div>
		<button @click="refetch" :disabled="loading">Refresh</button>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'

const userStore = useUserStore()
const props = defineProps({
	userInfo: {
		type: Object,
		required: true,
	}
})
const watchedMusicals = ref([])
const loading = ref(true)
const error = ref(null)

const fetchWatchedMusicals = async () => {
	loading.value = true
	error.value = null
	try {
		const response = await axios.get(`/api/review/users/${props.userInfo.userId}`)
		watchedMusicals.value = response.data.data || []
	} catch (e) {
		error.value = 'Failed to fetch watched musicals'
		console.error(e)
	} finally {
		loading.value = false
	}
}

onMounted(fetchWatchedMusicals)

const formatDate = (timestamp) => {
	if (!timestamp) return 'N/A'
	return new Date(timestamp).toLocaleDateString()
}

const refetch = fetchWatchedMusicals
</script>

<style scoped>
.watched-container {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
}

.musical-list {
	display: grid;
	gap: 20px;
}

.musical-item {
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 15px;
	background-color: #f9f9f9;
}

.rating {
	font-weight: bold;
	margin-bottom: 10px;
}

.review {
	background-color: white;
	border-radius: 4px;
	padding: 10px;
}

.review-meta {
	display: flex;
	justify-content: space-between;
	font-size: 0.8em;
	color: #666;
	margin-top: 10px;
}

.no-review,
.no-musicals,
.loading,
.error {
	color: #666;
	font-style: italic;
}

button {
	margin-top: 20px;
	padding: 10px 20px;
	background-color: #4CAF50;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

button:disabled {
	background-color: #cccccc;
	cursor: not-allowed;
}
</style>