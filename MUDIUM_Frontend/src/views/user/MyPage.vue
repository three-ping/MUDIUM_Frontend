<template>
	<div class="page-container">
		<aside class="sidebar">
			<nav>
				<ul>
					<li>프로필</li>
					<li>내가 본 작품</li>
					<li>북마크</li>
					<li>게시판</li>
					<li>티켓</li>
					<li>로그아웃</li>
				</ul>
			</nav>
		</aside>

		<main class="main-content">
			<div class="profile-header">
				<img :src="userInfo.profileImage" alt="@/assets/images/profile_default.svg" class=" profile-image">
				<div class="profile-info">
					<h2>{{ userInfo.nickname || '뜨리핑님' }}</h2>
					<p>{{ userInfo.email || 'threeping@gmail.com' }}</p>
					<p>{{ userInfo.membershipStatus || '일반회원' }}</p>
				</div>
				<button class="edit-profile-btn">수정</button>
			</div>

			<div class="calendar-section">
				<h3>October 2020</h3>
				<!-- You may want to use a calendar component here -->
				<div class="calendar-placeholder">
					<!-- Calendar component or placeholder -->
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/scripts/user/user';

const userStore = useUserStore();
const userInfo = ref(userStore.userInfo);

watch(() => userStore.userInfo, (newUserInfo) => {
	userInfo.value = newUserInfo;
	console.log('User info updated:', newUserInfo);
});
</script>

<style scoped>
.page-container {
	display: flex;
	height: 100vh;
}

.sidebar {
	width: 200px;
	background-color: #f0f0f0;
	padding: 20px;
}

.sidebar h2 {
	margin-bottom: 20px;
}

.sidebar ul {
	list-style-type: none;
	padding: 0;
}

.sidebar li {
	margin-bottom: 10px;
}

.main-content {
	flex-grow: 1;
	padding: 20px;
}

.profile-header {
	display: flex;
	align-items: center;
	margin-bottom: 30px;
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
}

.edit-profile-btn {
	background-color: #8e44ad;
	color: white;
	border: none;
	padding: 10px 20px;
	border-radius: 5px;
	cursor: pointer;
}

.calendar-section {
	/* Add styles for the calendar section */
}
</style>