<template>
	<dialog ref="modal" @click.self="closeModal" open class="dialog">
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
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const scrollbarWidthCssVar = "--pico-scrollbar-width";
const animationDuration = 400; // ms
let visibleModal = null;

// Reference to the modal dialog element
const modal = ref(null);
const props = defineProps({
	isModalOpen: Boolean
})

const emit = defineEmits(['close']);
// Toggle modal
const toggleModal = (event) => {
	event.preventDefault();
	const targetModal = document.getElementById(event.currentTarget.dataset.target);
	if (!targetModal) return;
	targetModal.open ? closeModal(targetModal) : openModal(targetModal);
};

// Open modal
const openModal = (modal) => {
	const { documentElement: html } = document;
	const scrollbarWidth = getScrollbarWidth();
	if (scrollbarWidth) {
		html.style.setProperty(scrollbarWidthCssVar, `${scrollbarWidth}px`);
	}
	html.classList.add(isOpenClass, openingClass);
	setTimeout(() => {
		visibleModal = modal;
		html.classList.remove(openingClass);
	}, animationDuration);
	modal.showModal();
};

// Close modal
const closeModal = (modal) => {
	emit('close')
};
// Get scrollbar width
const getScrollbarWidth = () => {
	const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
	return scrollbarWidth;
};

// Handle clicks outside the modal content
const handleClickOutside = (event) => {
	if (!visibleModal) return;
	const modalContent = visibleModal.querySelector('article');
	const isClickInside = modalContent.contains(event.target);
	if (!isClickInside) closeModal(visibleModal);
};

// Handle Esc key press to close the modal
const handleEscapeKey = (event) => {
	if (event.key === 'Escape' && visibleModal) {
		closeModal(visibleModal);
	}
};

// Lifecycle hooks
onMounted(() => {
	// Event listeners for closing modal by clicking outside or pressing Esc
	document.addEventListener('click', handleClickOutside);
	document.addEventListener('keydown', handleEscapeKey);
});

onBeforeUnmount(() => {
	// Cleanup event listeners
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