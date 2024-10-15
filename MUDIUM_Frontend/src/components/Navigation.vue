<template>
	<header class="container">
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
				<li>
					<details class="dropdown" id="theme-selector">
						<summary role="button" class="secondary">Theme</summary>
						<ul>
							<li><a href="#" data-theme-switcher="auto">Auto</a></li>
							<li><a href="#" data-theme-switcher="light">Light</a></li>
							<li><a href="#" data-theme-switcher="dark">Dark</a></li>
						</ul>
					</details>
				</li>
			</ul>
			<hr>
		</nav>
	</header>

</template>

<script setup>
import "@/scripts/minimal-theme-switcher.js"
</script>

<style lang="scss" scoped></style>