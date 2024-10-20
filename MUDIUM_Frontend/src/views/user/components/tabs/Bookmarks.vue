<template>
	<div class="bookmarks-container">
		<h1>My Bookmarked Musicals</h1>
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
					<button @click="removeBookmark(bookmark.userId, bookmark.musicalId)">Remove Bookmark</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const bookmarks = ref([]);
const loading = ref(true);
const error = ref(null);

// Assume we have a way to get the current user's ID
const userId = 1; // Replace this with actual user ID retrieval logic

const fetchBookmarks = async () => {
	try {
		loading.value = true;
		const response = await axios.get(`/api/bookmark/users/${userId}`);
		bookmarks.value = response.data.data;
	} catch (err) {
		error.value = 'Failed to fetch bookmarks. Please try again later.';
		console.error('Error fetching bookmarks:', err);
	} finally {
		loading.value = false;
	}
};

const removeBookmark = async (userId, musicalId) => {
	try {
		await axios.delete('/api/bookmark', { data: { userId, musicalId } });
		// After successful deletion, refresh the bookmarks list
		await fetchBookmarks();
	} catch (err) {
		console.error('Error removing bookmark:', err);
		// You might want to show an error message to the user here
	}
};

onMounted(fetchBookmarks);
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