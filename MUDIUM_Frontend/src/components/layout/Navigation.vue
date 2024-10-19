<template>
	<header class="container-fluid fixed-header">
		<nav>
			<ul>
				<li>
					<RouterLink to="/">
						<img src="@/assets/images/Mudium.svg" alt="Mudium" class="logo">
					</RouterLink>
				</li>
			</ul>

			<ul class="nav-links">
				<li>
					<RouterLink to="/musicalInfo"
						:class="{ active: currentRoute.startsWith('/musicalInfo') || currentRoute === '/' }">
						뮤지컬
					</RouterLink>
				</li>
				<li>
					<RouterLink to="/musicalBoard" :class="{ active: currentRoute.startsWith('/musicalBoard') }">
						작품 게시판
					</RouterLink>
				</li>
				<li>
					<RouterLink to="/board" :class="{ active: currentRoute.startsWith('/board') }">
						자유 게시판
					</RouterLink>
				</li>
				<li>
					<RouterLink to="/etiquette" :class="{ active: currentRoute.startsWith('/etiquette') }">
						가이드북
					</RouterLink>
				</li>
				<li>
					<RouterLink to="/notice" :class="{ active: currentRoute.startsWith('/notice') }">
						공지사항
					</RouterLink>
				</li>
			</ul>

			<ul class="nav-right">
				<li>
					<input type="search" v-model="searchQuery" placeholder="검색어를 입력하세요" @keyup.enter="performSearch">
				</li>
				<li v-if="!userInfo.isLoggedIn">
					<button class="btn-login" @click="$emit('openLoginModal')">로그인</button>
					<button class="btn-signup">회원가입</button>
				</li>
				<li v-else>
					<img src="@/assets/images/profile_default.svg" alt="Profile" class="profile-img"
						@click="toggleProfileMenu">
					<div v-if="isProfileMenuOpen" class="profile-menu">
						<button @click="navigateToMyPage">마이페이지</button>
						<button @click="logout">로그아웃</button>
					</div>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const currentRoute = ref(route.path);
const searchQuery = ref('');
const isProfileMenuOpen = ref(false);

const emit = defineEmits(['openLoginModal', 'userInfo', 'logout']);

const props = defineProps({
	userInfo: Object
});

const performSearch = () => {
	if (!searchQuery.value.trim()) return;
	router.push({
		path: '/musicalInfo',
		query: { title: searchQuery.value }
	});
};

watch(route, (newRoute) => {
	currentRoute.value = newRoute.path;
});

const navigateToMyPage = () => {
	router.push('/mypage');
	isProfileMenuOpen.value = false;
};

const logout = () => {
	emit('logout');
	emit('userInfo', { isLoggedIn: false });
	router.push({ path: '/musicalInfo', query: {} });
	isProfileMenuOpen.value = false;
};

const toggleProfileMenu = () => {
	isProfileMenuOpen.value = !isProfileMenuOpen.value;
};
</script>