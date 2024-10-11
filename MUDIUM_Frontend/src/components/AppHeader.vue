<template>
    <nav class="appHeader">

        <RouterLink to="/" class="logo">
            <img src="/src/assets/logo2.svg" alt="Mudium">
        </RouterLink>
        <div class="banner">
            <RouterLink to="/musicalInfo" class="banner-link">뮤지컬</RouterLink>
            <RouterLink to="/musicalBoard" class="banner-link">작품 게시판</RouterLink>
            <RouterLink to="/board" class="banner-link">자유 게시판</RouterLink>
            <RouterLink to="/etiquette" class="banner-link">가이드북</RouterLink>
            <RouterLink to="/notice" class="banner-link">공지사항</RouterLink>
            <div class="search-bar">
              <input type="text" placeholder="검색어를 입력하세요"/>
            </div>

            <div class="login-banner">
                <RouterLink to = "/" class="banner-link">로그인</RouterLink>
                <RouterLink to = "/" class="banner-link">회원가입</RouterLink>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';

// const router = useRouter();
</script>

<style scoped>
    .appHeader {
        display: flex;
        width: 100vw;
        margin-top: 1%;
    }

    /* logo1 버전 css */
    /* .appHeader .logo {
        display: flex;
        align-items: center;
    }

    .appHeader .logo img {
        display: flex;
        width: 40%;
        margin-left: 70px;
    } */

    /* logo2 버전 css */
    .appHeader .logo {
        display: flex;
        align-items: center;
    }

    .appHeader .logo img {
        display: flex;
        width: 40%;
        margin-left: 70px;
        /* margin-right: 0%; */
    }

    .appHeader .banner {
        display: flex;
        align-items: center; 
        flex-grow: 1; 
        margin-left: -11%; 
        gap: 5%;
    }

    .appHeader .banner .banner-link {
        /* font-size: 1.2vw;  */ /* 디코 캡쳐본 배너 폰트 사이즈*/
        font-size: 1.0vw;
        font-weight: 500;   
        color:black;
        text-decoration: none;
    } 


    .appHeader .search-bar {
        display: flex;
        justify-content: center; 
        align-items: center; 
        flex-grow: 1;
        /* padding-top: 8px; */
        /* padding-right: 10px; */
        /* margin-right: 0; */
    }

    .appHeader .search-bar input {
        padding: 1%;
        width: 40%;
        font-size: 1vw;
        width: 100%;
        /* opacity: 90%; */
        border: 1x solid #ccc;
        border-radius: 10px;
    }

    .appHeader .login-banner {
        display: flex;
        gap: 12%;
        margin-right: 70px;  
        align-items: center; 
        flex-grow: 1;
    }
</style>