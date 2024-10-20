<template>
	<div class="mypage-container">
		<SideBar />

		<section class="profile-section">
			<div class="profile-info">
				<img src="@/assets/images/profile_default.svg" alt="Profile Image" class="profile-img">
				<div class="profile-details">
					<h2 class="profile-name">뜨리핑님</h2>
					<p class="profile-email">threeping@gmail.com</p>
					<p class="profile-status">일반회원</p>
				</div>
				<button class="edit-button">수정</button>
			</div>

				<Calendar />
		</section>
	</div>
</template>

<script setup>
import SideBar from './components/SideBar.vue';
import { useUserStore } from '@/scripts/user/user';
import { watch } from 'vue';
import Calendar from '@/components/calendar/Calendar.vue';

const userStore = useUserStore();
const userInfo = userStore.userInfo;

watch(() => userStore.userInfo, (newUserInfo) => {
	userInfo.value = newUserInfo;
	console.log('User info updated:', newUserInfo);
});
</script>

<style scoped>
.mypage-container {
	display: flex;
}

.profile-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 20px;
	background: #f8f9fa;
	border-left: 1px solid #e5e5e5;
}

.profile-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	width: 90%;
	max-width: 600px;
	margin-bottom: 20px;
}

.profile-img {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	margin-bottom: 15px;
}

.profile-details {
	text-align: center;
}

.profile-name {
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 5px;
}

.profile-email,
.profile-status {
	color: #6c757d;
	margin: 0;
}

.edit-button {
	background-color: #7b2cbf;
	color: #fff;
	padding: 8px 16px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	margin-top: 15px;
}

.edit-button:hover {
	background-color: #6823b1;
}
</style>
