<template>
	<div>
		<button @click="pickTheme"></button>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const _scheme = ref(null);
const localStorageKey = "picoPreferredColorScheme";
onMounted(() => {
	_scheme.value = getSchemeFromLocalStorage();
	console.log(`scheme: ${_scheme.value}`)
})

const getSchemeFromLocalStorage = () => {
	return window.localStorage?.getItem(localStorageKey) ?? 'light';
}
const getPreferredColorScheme = () => {
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
</script>

<style scoped></style>