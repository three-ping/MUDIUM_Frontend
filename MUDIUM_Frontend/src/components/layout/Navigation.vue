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
				<li><input type="search" v-model="searchQuery" placeholder="검색어를 입력하세요" @keyup.enter="performSearch">
				</li>
				<li v-if="!userInfo.isLoggedIn">
					<details class="dropdown">
						<summary>계정</summary>
						<ul dir="rtl">
							<li>
								<button class="contrast" @click="$emit('openLoginModal')">로그인</button>
							</li>
							<li>
								<button class="contrast">회원가입</button>
							</li>
						</ul>
					</details>
				</li>
				<li v-else>
					<details class="dropdown">
						<summary><img src="" alt="@/assets/images/profile_default.svg" height="50%"></summary>
						<ul dir="rtl">
							<li>
								<button class="contrast" @click="navigateToMyPage">마이페이지</button>
							</li>
							<li>
								<button class="contrast" @click="logout">로그아웃</button>
							</li>
						</ul>
					</details>
				</li>

			</ul>

		</nav>
	</header>
	<hr>
</template>

<script setup>
import LoginModal from '@/views/user/components/LoginModal.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { defineProps } from 'vue';

const emit = defineEmits(['userInfo', 'logout']);

// 현재 경로를 추적하기 위한 변수
const loginStatus = ref(false);

const updateLoginStatus = (status, userInfo = null) => {
	loginStatus.value = status;
	isLoggedIn.value = status;

	if (status) {
		console.log('User logged in successfully');
		// Emit user information
		emit('userInfo', userInfo);
		// Navigate to the homepage
		router.push('/');
	} else {
		console.log('User logged out');
		// You can add logout-specific actions here if needed
	}
};

const route = useRoute();
const router = useRouter();
const currentRoute = ref(route.path);

let isLoginModalVisible = ref(false);
const isLoggedIn = ref(false);
const hasSearched = ref(false);
const searchQuery = ref('');
const props = defineProps({
	userInfo: Object // Accept userInfo as a prop
});

// Use userInfo.isLoggedIn wherever needed in your template or script
const performSearch = () => {
	if (!searchQuery.value.trim()) return; // 검색어가 없으면 실행하지 않음
	router.push({
		path: '/musicalInfo',  // Search results will be shown here
		query: { title: searchQuery.value }
	});
};
// 경로가 변경될 때마다 currentRoute 업데이트
watch(route, (newRoute) => {
	currentRoute.value = newRoute.path;
});

const openLoginModal = () => {
	isLoginModalVisible.value = true;

}

const navigateToMyPage = () => {
	router.push('/mypage');
};

const logout = () => {
	console.log("Navigation - logout")
	// router.push('/');
	// Perform logout logic here (e.g., clear tokens, reset state)
	emit('logout')
	emit('userInfo', { isLoggedIn: false })
	router.push({ path: '/musicalInfo', query: {} }); // Navigate to musicalInfo without user_id

};
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
