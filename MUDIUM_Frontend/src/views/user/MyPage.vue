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

	width: calc(100% - 10rem);
	height: 100%;
}
</style>