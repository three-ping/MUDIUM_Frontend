<template>
	<Modal>
		<template v-slot:modalSection>
			<input type="text" placeholder="아이디" class="auth-input">
			<input type="text" placeholder="비밀번호" class="auth-input">
		</template>
	</Modal>
</template>

<script setup>
import Modal from '@/components/layout/Modal.vue';
</script>

<style lang="scss" scoped>
.auth-input {
	display: block;

}
</style>