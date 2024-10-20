<template>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
		<div v-for="review in reviews" :key="review.reviewId" class="relative h-96 perspective-1000">
			<div
				class="absolute w-full h-full transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180">
				<!-- Front side -->
				<div class="absolute w-full h-full bg-white rounded-lg shadow-md backface-hidden">
					<img :src="review.poster" :alt="review.musicalTitle" class="w-full h-48 object-cover rounded-t-lg">
					<div class="p-4">
						<h3 class="text-xl font-semibold mb-2">{{ review.musicalTitle }}</h3>
						<p class="text-gray-600 mb-2">{{ review.reviewContent }}</p>
						<div class="flex items-center justify-between">
							<span class="text-sm text-gray-500">{{ formatDate(review.reviewCreatedAt) }}</span>
							<span class="text-sm text-blue-500">{{ review.reviewLikes }} likes</span>
						</div>
					</div>
				</div>
				<!-- Back side -->
				<div class="absolute w-full h-full bg-gray-100 rounded-lg shadow-md backface-hidden rotate-y-180">
					<div class="p-4">
						<h3 class="text-xl font-semibold mb-4">Meta Information</h3>
						<p><strong>Musical ID:</strong> {{ review.musicalId }}</p>
						<p><strong>Rating:</strong> {{ review.musicalRating }}</p>
						<p><strong>Production:</strong> {{ review.production || 'N/A' }}</p>
						<p><strong>User:</strong> {{ review.userNickname }}</p>
						<p><strong>Scope:</strong> {{ review.scope || 'N/A' }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MyReviews',
	props: {
		reviews: {
			type: Array,
			required: true
		}
	},
	methods: {
		formatDate(timestamp) {
			if (!timestamp) return 'N/A';
			const date = new Date(timestamp);
			return date.toLocaleDateString();
		}
	}
}
</script>

<style scoped>
.perspective-1000 {
	perspective: 1000px;
}

.backface-hidden {
	backface-visibility: hidden;
}

.rotate-y-180 {
	transform: rotateY(180deg);
}

.transform-style-preserve-3d {
	transform-style: preserve-3d;
}
</style>