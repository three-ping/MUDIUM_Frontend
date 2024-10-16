<template>
	<SideBar />

	<div class="mypage-content">
		<div>

		</div>
	</div>
</template>

<script setup>
import SideBar from './components/SideBar.vue';
</script>

<style scoped>
.mypage-content {
	display: inline-block;
	background-color: aqua;
	width: calc(100% - 10rem);
	height: 100%;
}
</style>