<template>
	<dialog ref="modal" @click.self="closeModal(modal)" :open="props.isModalOpen">
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
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const modal = ref(null);
const props = defineProps({
	isModalOpen: Boolean
});

const emit = defineEmits(['close']);

const closeModal = (modal) => {
	console.log(`isModalOpen: ${props.isModalOpen}`)
	emit('close');
};

// Get scrollbar width
const getScrollbarWidth = () => {
	return window.innerWidth - document.documentElement.clientWidth;
};

// Handle clicks outside the modal content
const handleClickOutside = (event) => {
	if (!props.isModalOpen) return;
	const modalContent = modal.value.querySelector('article');
	const isClickInside = modalContent.contains(event.target);
	if (!isClickInside) closeModal();
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
	}
});

// Lifecycle hooks
onMounted(() => {
	document.addEventListener('click', handleClickOutside);
	document.addEventListener('keydown', handleEscapeKey);

});

onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutside);
	document.removeEventListener('keydown', handleEscapeKey);
});
</script>

<style scoped>
#modal-header {
	display: flex;
	justify-content: center;
}

#modal-header img {
	width: 8rem;
}


.jim-nightshade-regular {
	font-family: "Jim Nightshade", cursive;
	font-weight: 400;
	font-style: normal;
}
</style>