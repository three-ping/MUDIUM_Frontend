<template>
	<header class="container-fluid">
		<nav>
			<RouterLink to="/">
				<img src="@/assets/images/Mudium.svg" alt="Mudium" width="150rem">
			</RouterLink>
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
			<ul v-if="!isLoggedIn">
				<li><input type="search"></li>
				<li><a href="#" class="contrast">로그인</a></li>
				<li><a href="#" class="contrast">회원가입</a></li>
			</ul>
			<ul v-else>
				<li>
					<RouterLink to="/login" class="banner-link">로그인</RouterLink>
				</li>
				<li>
					<RouterLink to="/signup" class="banner-link">회원가입</RouterLink>
				</li>
			</ul>
		</nav>
		<hr>
	</header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// 현재 경로를 추적하기 위한 변수
const route = useRoute();
const currentRoute = ref(route.path);

const isLoggedIn = ref(false);
// 경로가 변경될 때마다 currentRoute 업데이트
watch(route, (newRoute) => {
	currentRoute.value = newRoute.path;
});
</script>

<style scoped></style>