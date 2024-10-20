<template>
	<SideBar />

	<section>
		<div class="container-fluid">
			<img src="@/assets/images/profile_default.svg" alt="">
			<div>
				<p>{{ userInfo.user_identifier }}</p>
				<p>threeping@gmail.com</p>
			</div>
		</div>
		<div class="container-fluid"><button>프로필 수정</button></div>
	</section>
</template>

<script setup>
import SideBar from './components/SideBar.vue';
import { useUserStore } from '@/scripts/user/user';
import { watch } from 'vue';
const userStore = useUserStore();
const userInfo = userStore.userInfo;

watch(() => userStore.userInfo, (newUserInfo) => {
	userInfo.value = newUserInfo;
	console.log('User info updated:', newUserInfo);
});
</script>

<style scoped>
div img {
	width: 10rem;
	height: 10rem;
	border-radius: 5rem;
}
</style>