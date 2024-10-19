<template>
	<dialog ref="modal" @click.self="closeModal" :class="['dialog', { 'modal-open': isModalOpen }]">
		<article id="modal-popup" class="article">
			<header id="modal-header">
				<img src="@/assets/images/MudiumText.svg" alt="">
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

// Get scrollbar width
const getScrollbarWidth = () => {
	return window.innerWidth - document.documentElement.clientWidth;
};

// Handle Esc key press to close the modal
const handleEscapeKey = (event) => {
	if (event.key === 'Escape' && props.isModalOpen) {
		closeModal();
	}
};

// Watch for changes in isModalOpen prop
watch(() => props.isModalOpen, (newValue) => {
	if (newValue) {
		const { documentElement: html } = document;
		const scrollbarWidth = getScrollbarWidth();
		if (scrollbarWidth) {
			html.style.setProperty('--pico-scrollbar-width', `${scrollbarWidth}px`);
		}
		html.classList.add('modal-is-open', 'modal-is-opening');
		setTimeout(() => {
			html.classList.remove('modal-is-opening');
		}, 400);
		modal.value.showModal();
	} else {
		document.documentElement.classList.remove('modal-is-open');
		modal.value.close();
	}
});

// Lifecycle hooks
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
	z-index: 999;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	padding: 0;
	border: 0;
	background-color: rgba(8, 9, 10, 0.75);
	animation: modal-overlay 0.3s ease-out;
}

@supports (backdrop-filter: blur(0.375rem)) {
	.dialog.modal-open {
		backdrop-filter: blur(0.375rem);
		background-color: rgba(8, 9, 10, 0.5);
	}
}

.article {
	width: 400px;
	max-height: calc(100vh - 2rem);
	margin: 1rem;
	padding: 1rem;
	border-radius: 10px;
	background-color: white;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	animation: modal 0.3s ease-out;
}

#modal-header {
	display: flex;
	justify-content: center;
	margin-bottom: 1rem;
}

#modal-header img {
	width: 8rem;
}

@keyframes modal-overlay {
	from {
		backdrop-filter: none;
		background-color: transparent;
	}
}

@keyframes modal {
	from {
		transform: translateY(-100%);
		opacity: 0;
	}
}
</style>