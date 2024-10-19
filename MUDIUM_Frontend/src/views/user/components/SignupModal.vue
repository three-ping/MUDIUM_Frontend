<template>
	<Modal :isModalOpen="isSignupModalVisible" @close="closeSignupModal" />
</template>

<script setup>
import { ref } from 'vue';
import Modal from '@/components/layout/Modal.vue';

const props = defineProps({
	isSignupModalVisible: Boolean,
});</script>

<style scoped></style>