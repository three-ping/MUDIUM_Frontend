<template>
    <nav class="appHeader">
        <div class="header-container">
        <RouterLink to="/" class="logo">
            <img src="/src/assets/logo2.svg" alt="Mudium">
        </RouterLink>
        <div class="banner">
            <RouterLink 
                to="/musicalInfo" 
                class="banner-link"
                :class="{ active: currentRoute.startsWith('/musicalInfo') || currentRoute === '/' }">
                뮤지컬
            </RouterLink>
            <RouterLink 
                to="/musicalBoard" 
                class="banner-link"
                :class="{ active: currentRoute.startsWith('/musicalBoard') }">
                작품 게시판
            </RouterLink>
            <RouterLink 
                to="/board" 
                class="banner-link"
                :class="{ active: currentRoute.startsWith('/board') }">
                자유 게시판
            </RouterLink>
            <RouterLink 
                to="/etiquette" 
                class="banner-link"
                :class="{ active: currentRoute.startsWith('/etiquette') }">
                가이드북
            </RouterLink>
            <RouterLink 
                to="/notice" 
                class="banner-link"
                :class="{ active: currentRoute.startsWith('/notice') }">
                공지사항
            </RouterLink>
            <div class="search-bar">
                <input type="text" placeholder="검색어를 입력하세요"/>
            </div>

            <div class="login-banner">
                <RouterLink to="/login" class="banner-link">로그인</RouterLink>
                <RouterLink to="/signup" class="banner-link">회원가입</RouterLink>
            </div>
        </div>
    </div>
    </nav>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// 현재 경로를 추적하기 위한 변수
const route = useRoute();
const currentRoute = ref(route.path);

// 경로가 변경될 때마다 currentRoute 업데이트
watch(route, (newRoute) => {
    currentRoute.value = newRoute.path;
});
</script>

<style scoped>
    .appHeader {
        display: flex;
        width: 100vw;
        margin-top: 1%;
        justify-content: space-between; /* 로고와 배너 간격 확보 */
        align-items: center; /* 수직 가운데 정렬 */
    }

    .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-grow: 1;
        width: 100%;
    }

    .appHeader .logo {
        flex: 1;
        align-items: center;
    }

    .appHeader .logo img {
        display: flex;
        width: 40%;
        margin-left: 30px;
    }

    .appHeader .banner {
        display: flex;
        align-items: center; 
        flex-grow: 1; 
        flex: 2;
        margin-left: -20%; 
        gap: 5%;
    }

    .appHeader .banner .banner-link {
        font-size: 1.0vw;
        font-weight: 500;   
        color: black;
        text-decoration: none;
        position: relative;
    }

    .appHeader .search-bar {
        display: flex;
        justify-content: center; 
        align-items: center; 
        flex-grow: 1;
    }

    .appHeader .search-bar input {
        padding: 1%;
        width: 40%;
        font-size: 1vw;
        width: 100%;
        border: 1x solid #ccc;
        border-radius: 10px;
    }

    .appHeader .login-banner {
        display: flex;
        gap: 12%;
        align-items: center; 
        flex-grow: 1;
    }

    .appHeader .banner .banner-link.active::after {
        content: "";
        position: absolute;
        display: flex;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: purple;
    }
</style>