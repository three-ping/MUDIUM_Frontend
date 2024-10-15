<template>

  <nav>
    <ul>
      <li><img src="@/assets/Mudium_small.svg" alt=""></li>
    </ul>
    <ul>
      <li><strong>뮤지컬</strong></li>
      <li><strong>작품게시판</strong></li>
      <li><strong>자유게시판</strong></li>
      <li><strong>가이드북</strong></li>
      <li><strong>공지사항</strong></li>
    </ul>

    <ul><input type="search" placeholder="검색어를 입력하세요"></ul>
    <ul>
      <li>
        <details class="dropdown">
          <summary>로그인</summary>
          <ul dir="rtl">
            <li><a href="#">로그인</a></li>
            <li><a href="#">회원가입</a></li>
          </ul>
        </details>
      </li>
    </ul>
    <hr>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router';

import AppHeader from '@/components/AppHeader.vue';
</script>

<style>
/* * {
  font-family: 'Noto Sans KR';
} */
</style>