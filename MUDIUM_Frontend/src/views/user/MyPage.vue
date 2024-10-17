<template>
	<SideBar />

	<section>
		<div class="container-fluid">
			<img src="@/assets/images/profile_default.svg" alt="">
			<div>
				<h2>뜨리핑님</h2>
				<p>threeping@gmail.com</p>
			</div>
		</div>
		<div><button>프로필 수정</button></div>
	</section>
</template>

<script setup>
import SideBar from './components/SideBar.vue';
</script>

<style scoped>
div img {
	width: 10rem;
	height: 10rem;
	border-radius: 5rem;
}
</style>