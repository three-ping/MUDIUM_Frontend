<template>
	<div class="page-container">
		<aside class="sidebar">
			<nav>
				<ul>
					<li>
						<a href="#" :class="{ 'selected': selectedItem === 'profile' }"
							@click="setSelectedItem('profile')">프로필</a>
					</li>
					<li>
						<a href="#" :class="{ 'selected': selectedItem === 'myWorks' }"
							@click="setSelectedItem('myWorks')">내가 본 작품</a>
					</li>
					<li>
						<a href="#" :class="{ 'selected': selectedItem === 'bookmarks' }"
							@click="setSelectedItem('bookmarks')">북마크</a>
					</li>
					<li>
						<a href="#" :class="{ 'selected': selectedItem === 'board' }"
							@click="setSelectedItem('board')">게시판</a>
					</li>
					<li>
						<a href="#" :class="{ 'selected': selectedItem === 'tickets' }"
							@click="setSelectedItem('tickets')">티켓</a>
					</li>
					<li>
						<a href="#" class="warning" :class="{ 'selected': selectedItem === 'logout' }"
							@click="setSelectedItem('logout')">로그아웃</a>
					</li>
				</ul>
			</nav>
		</aside>

		<main class="main-content" id="profile-container">
			<ProfileTab v-if="selectedItem === 'profile'" :userInfo="userInfo" />
			<MyWorksTab v-if="selectedItem === 'myWorks'" />
			<BookmarksTab v-if="selectedItem === 'bookmarks'" />
			<BoardTab v-if="selectedItem === 'board'" />
			<TicketsTab v-if="selectedItem === 'tickets'" />
		</main>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/scripts/user/user';
import ProfileTab from "./components/tabs/ProfileTab.vue";
import MyWorksTab from './components/tabs/Watched.vue';
import BookmarksTab from './components/tabs/Bookmarks.vue';
import BoardTab from './components/tabs/BoardTab.vue';
import TicketsTab from './components/tabs/Tickets.vue';

const userStore = useUserStore();
const userInfo = ref(userStore.userInfo);

// Add state for selected sidebar item
const selectedItem = ref('profile');

// Function to set the selected item
const setSelectedItem = (item) => {
	selectedItem.value = item;
};

watch(() => userStore.userInfo, (newUserInfo) => {
	userInfo.value = newUserInfo;
	console.log('User info updated:', newUserInfo);
});
</script>
<style scoped>
.page-container {
	display: flex;
	/* height: 100vh; */
}

.sidebar {
	width: 30rem;
	/* background: linear-gradient(to bottom, #9b59b6, #3498db); */
	color: var(--secondary-color);
	padding: 3rem;
}

.logo-container {
	text-align: center;
	margin-bottom: 30px;
}

.logo {
	width: 120px;
	height: auto;
}

.sidebar ul {
	list-style-type: none;
	padding: 0;
}

.sidebar li {
	margin-bottom: 5rem;
	cursor: pointer;
	text-align: right;
}

.sidebar a.selected {
	font-weight: bold;
	color: black;
}

.sidebar a:hover {
	opacity: 0.8;
}

.main-content {
	flex-grow: 1;
	padding: 20px;
	/* background-color: #f5f5f5; */
}

.profile-section {
	display: flex;
	align-items: center;
	background-color: white;
	padding: 20px;
	border-radius: 10px;
	margin-bottom: 20px;
}

.profile-image {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 20px;
}

.profile-info {
	flex-grow: 1;
}

.profile-info h2 {
	margin: 0 0 10px 0;
}

.profile-info p {
	margin: 5px 0;
	color: #666;
}

.warning {
	color: var(--warning-color)
}

.edit-profile-btn {
	background-color: var(--primary-color);
	color: white;
	border: none;
	padding: 10px 20px;
	border-radius: 5px;
	cursor: pointer;
}

.calendar-section {
	background-color: white;
	padding: 20px;
	border-radius: 10px;
}
</style>