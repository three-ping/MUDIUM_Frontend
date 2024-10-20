<template>
	<div class="bookmarks-container">
		<h1>내 북마크된 뮤지컬</h1>
		<div v-if="loading" class="loading">Loading bookmarks...</div>
		<div v-else-if="error" class="error">{{ error }}</div>
		<div v-else-if="bookmarks.length === 0" class="no-bookmarks">
			You haven't bookmarked any musicals yet.
		</div>
		<ul v-else class="bookmarks-list">
			<li v-for="bookmark in bookmarks" :key="bookmark.musicalId" class="bookmark-item">
				<img :src="bookmark.poster" :alt="bookmark.title" class="musical-poster">
				<div class="musical-info">
					<h2>{{ bookmark.title }}</h2>
					<p><strong>Rating:</strong> {{ bookmark.rating }}</p>
					<p><strong>Production:</strong> {{ bookmark.production }}</p>
					<p><strong>View Count:</strong> {{ bookmark.viewCount }}</p>
					<!-- <button @click="removeBookmark(bookmark.musicalId)">Remove Bookmark</button> -->
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '@/scripts/user/user';
import axios from 'axios';

const props = defineProps({
	userInfo: {
		type: Object,
		required: true
	}
});

const userStore = useUserStore();
const bookmarks = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchBookmarks = async () => {
	if (!props.userInfo || !props.userInfo.userId) {
		error.value = 'User information not available.';
		loading.value = false;
		return;
	}

	try {
		loading.value = true;
		const response = await axios.get(`/api/bookmark/users/${props.userInfo.userId}`);
		bookmarks.value = response.data.data;
	} catch (err) {
		error.value = 'Failed to fetch bookmarks. Please try again later.';
		console.error('Error fetching bookmarks:', err);
	} finally {
		loading.value = false;
	}
};

const removeBookmark = async (musicalId) => {
	if (!props.userInfo || !props.userInfo.userId) {
		console.error('User information not available.');
		return;
	}

	try {
		await axios.delete('/api/bookmark', {
			data: {
				userId: props.userInfo.userId,
				musicalId
			}
		});
		// After successful deletion, refresh the bookmarks list
		await fetchBookmarks();
	} catch (err) {
		console.error('Error removing bookmark:', err);
		// You might want to show an error message to the user here
	}
};

onMounted(fetchBookmarks);

// Watch for changes in userInfo
watch(() => props.userInfo, (newUserInfo) => {
	if (newUserInfo && newUserInfo.id) {
		fetchBookmarks();
	}
}, { deep: true });
</script>

<style scoped>
.bookmarks-container {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
}

.loading,
.error,
.no-bookmarks {
	text-align: center;
	margin-top: 20px;
}

.bookmarks-list {
	list-style-type: none;
	padding: 0;
}

.bookmark-item {
	display: flex;
	margin-bottom: 20px;
	border: 1px solid #ddd;
	padding: 10px;
	border-radius: 5px;
}

.musical-poster {
	width: 100px;
	height: auto;
	margin-right: 20px;
}

.musical-info {
	flex-grow: 1;
}

button {
	background-color: #f44336;
	color: white;
	border: none;
	padding: 10px 15px;
	cursor: pointer;
	border-radius: 5px;
}

button:hover {
	background-color: #d32f2f;
}
</style>