<template>
	<dialog ref="modal" @click.self="closeModal" :class="['dialog', { 'modal-open': isModalOpen }]">
		<article id="modal-popup" class="article">
			<header id="modal-header">
				<img src="@/assets/images/MudiumText.svg" alt="Mudium logo">
			</header>
			<section>
				<slot name="modalSection"></slot>
			</section>
			<footer>
				<slot name="modalFooter"></slot>
			</footer>
		</article>
	</dialog>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const modal = ref(null);
const props = defineProps({
	isModalOpen: Boolean
});

const emit = defineEmits(['close']);

const closeModal = () => {
	emit('close');
};

// Watch for changes in isModalOpen prop
watch(() => props.isModalOpen, (newValue) => {
	if (newValue) {
		modal.value.showModal();
	} else {
		modal.value.close();
	}
});

// Handle Esc key press to close the modal
const handleEscapeKey = (event) => {
	if (event.key === 'Escape' && props.isModalOpen) {
		closeModal();
	}
};

onMounted(() => {
	document.addEventListener('keydown', handleEscapeKey);
});

onBeforeUnmount(() => {
	document.removeEventListener('keydown', handleEscapeKey);
});
</script>

<style scoped>
.dialog {
	display: none;
}

.dialog.modal-open {
	display: flex;
}





section,
footer {
	padding: 3rem;
}
</style>