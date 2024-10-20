<template>
	<div class="profile-section card">
		<img src="@/assets/images/profile_default.svg" alt="Profile" class="profile-image">
		<div class="profile-info">
			<h2>{{ userInfo.nickname || '뜨리핑님' }}</h2>
			<p>{{ userInfo.email || 'threeping@gmail.com' }}</p>
			<p>{{ userInfo.membershipStatus || '일반회원' }}</p>
		</div>
		<button class="edit-profile-btn">수정</button>
	</div>

	<div class="calendar-section card">
		<h3>October 2020</h3>
		<div class="calendar">
			<!-- You may want to use a proper calendar component here -->
			<table>
				<thead>
					<tr>
						<th>Mo</th>
						<th>Tu</th>
						<th>We</th>
						<th>Th</th>
						<th>Fr</th>
						<th>Sa</th>
						<th>Su</th>
					</tr>
				</thead>
				<tbody>
					<!-- Add calendar days here -->
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
defineProps({
	userInfo: {
		type: Object,
		required: true
	}
});
</script>