<template>
	<header class="container-fluid fixed-header">
		<nav>
			<ul>
				<li>
					<RouterLink to="/">
						<img src="@/assets/images/Mudium.svg" alt="Mudium" width="150rem">
					</RouterLink>
				</li>
			</ul>

			<ul>
				<li>
					<RouterLink to="/musicalInfo"
						:class="{ active: currentRoute.startsWith('/musicalInfo') || currentRoute === '/' }">
						<strong>뮤지컬</strong>
					</RouterLink>
				</li>
				<li>
					<RouterLink to="/musicalBoard" :class="{ active: currentRoute.startsWith('/musicalBoard') }">
						<strong>작품 게시판</strong>
					</RouterLink>
				</li>
				<li>
					<RouterLink to="/board" :class="{ active: currentRoute.startsWith('/board') }">
						<strong>자유 게시판</strong>

					</RouterLink>
				</li>
				<RouterLink to="/etiquette" :class="{ active: currentRoute.startsWith('/etiquette') }">
					<strong>가이드북</strong>
				</RouterLink>

				<li>
					<RouterLink to="/notice" :class="{ active: currentRoute.startsWith('/notice') }">
						<strong>공지사항</strong>
					</RouterLink>
				</li>
			</ul>
			<ul>
				<li><input type="search"></li>
				<li v-if="!isLoggedIn">
					<details class="dropdown">
						<summary>계정</summary>
						<ul dir="rtl">
							<li>
								<button class="contrast" @click.prevent="openLoginModal">로그인</button>
							</li>
							<li>
								<button class="contrast">회원가입</button>
							</li>
						</ul>
					</details>
				</li>
			</ul>

		</nav>
	</header>
	<hr>
	<LoginModal :isLoginModalVisible="isLoginModalVisible" />
</template>

<script setup>
import LoginModal from '@/views/user/components/LoginModal.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// 현재 경로를 추적하기 위한 변수
const route = useRoute();
const currentRoute = ref(route.path);

let isLoginModalVisible = ref(false);
const isLoggedIn = ref(false);
// 경로가 변경될 때마다 currentRoute 업데이트
watch(route, (newRoute) => {
	currentRoute.value = newRoute.path;
});

const openLoginModal = () => {
	isLoginModalVisible.value = true;

}
</script>

<style scoped>
/* Style for the fixed header */


.active::after {
	content: "";
	display: flex;
	bottom: -5px;
	left: 0;
	width: 100%;
	height: 3px;
	margin: 0;
	padding: 0;
	background-color: purple;
}
</style>