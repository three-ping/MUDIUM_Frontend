<template>
	<div>
		<button @click="pickTheme"></button>
	</div>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue';
const state = reactive({ currentTheme: null, })


const setTheme = (theme) => {
	state.currentTheme = theme;
}
const updateMetaTheme = () => {
	const metaTheme = document.querySelector('meta[name="color-scheme"]');
	console.log(`metaTheme: ${metaTheme.tagName}`)
	console.log(`currentTheme: ${state.currentTheme}`)
	metaTheme.setAttribute('content', state.currentTheme);
}

const pickTheme = () => {
	const newTheme = state.currentTheme === 'dark' ? 'light' : 'dark';

	if (state.currentTheme !== newTheme) {
		localStorage.setItem('theme', newTheme);
		console.log(`newTheme: ${newTheme}`)
		setTheme(newTheme);
	}
}

onMounted(() => {
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme) {
		console.log(`savedTheme: ${savedTheme}`)
		setTheme(savedTheme);
	} else {
		setTheme('light');
	}
});

// watch(() => state.currentTheme, () => {
// 	document.documentElement.setAttribute('dataTheme', state.currentTheme);
// 	updateMetaTheme();
// })

</script>

<style scoped></style>