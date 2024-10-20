<template>
	<div class="page-container">
		<aside class="sidebar">

			<nav>
				<ul>
					<li> <a href="/mypage">프로필</a></li>
					<li><a href="#">내가 본 작품</a></li>
					<li><a href="#">북마크</a></li>
					<li><a href="#">게시판</a></li>
					<li><a href="#">티켓</a></li>
					<li><a href="#" class="warning">로그아웃</a></li>
				</ul>
			</nav>
		</aside>

		<main class="main-content">
			<div class="profile-section">
				<img :src="userInfo.profileImage || '@/assets/images/profile_default.svg'" alt="Profile"
					class="profile-image">
				<div class="profile-info">
					<h2>{{ userInfo.nickname || '뜨리핑님' }}</h2>
					<p>{{ userInfo.email || 'threeping@gmail.com' }}</p>
					<p>{{ userInfo.membershipStatus || '일반회원' }}</p>
				</div>
				<button class="edit-profile-btn">수정</button>
			</div>

			<div class="calendar-section">
				<h3>October 2020</h3>
				<div class="calendar">
					<!-- You may want to use a proper calendar component here -->
					<table>
						<thead>
							<tr>
								<th>Mo</th>
								<th>Tu</th>
								<th>We</th>
								<th>Th</th>
								<th>Fr</th>
								<th>Sa</th>
								<th>Su</th>
							</tr>
						</thead>
						<tbody>
							<!-- Add calendar days here -->
						</tbody>
					</table>
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
	/* background: linear-gradient(to bottom, #9b59b6, #3498db); */
	color: var(--secondary-color);
	padding: 20px;
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
	margin-bottom: 15px;
	cursor: pointer;
}

.main-content {
	flex-grow: 1;
	padding: 20px;
	background-color: #f5f5f5;
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

.calendar {
	/* Add styles for the calendar */
}
</style>