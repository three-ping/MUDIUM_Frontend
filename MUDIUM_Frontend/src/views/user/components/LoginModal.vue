<template>
	<Modal :isModalOpen="props.isLoginModalVisible">
		<template v-slot:modalSection>
			<input type="text" placeholder="이메일" class="auth-input">
			<input type="text" placeholder="비밀번호" class="auth-input">
		</template>

		<template v-slot:modalFooter>
			<button class="contrast auth-button" @click="loginNormalUser">로그인</button>
			<button class="auth-button" id="kakao-button">카카오 로그인</button>
			<div class="container-fluid auth-floor">
				<label for="registUserButton">회원가입/</label>
				<label>아이디찾기/</label>
				<label>비밀번호찾기</label>
				<button @click="registUser" id="registUserButton">회원가입</button>
			</div>
		</template>
	</Modal>
</template>

<script setup>
import Modal from '@/components/layout/Modal.vue';
import axios from 'axios';
// import api from '@/scripts/axios'
let loginNormalUser = async () => {
	let response = await axios.post("http://localhost:5173/api/login", {
		email: "jinrodookubi@gmail.com",
		password: "password123",
		signup_path: "NORMAL"
	});
	if (response.data.success) {
		console.log("Normal Login Success");
		emit('update:isLoggedIn', true);

	}

	console.log("Normal User Login clicked")
}
const props = defineProps({

	isLoginModalVisible: Boolean
});

const emit = defineEmits(['update:isLoggedIn']);

// Remove the redeclaration of loginNormalUser and update the existing function
loginNormalUser = async () => {
	let response = await axios.post("http://localhost:5173/api/login", {
		email: "jinrodookubi@gmail.com",
		password: "password123",
		signup_path: "NORMAL"
	});
	if (response.data.success) {
		console.log("Normal Login Success");
		emit('update:isLoggedIn', true);
	}

	console.log("Normal User Login clicked");
}
</script>

<style lang="scss" scoped>
.auth-input {
	display: block;

}

.auth-button {
	margin-top: 0.5rem;
	display: block;
	width: 100%;
	border: 0px;
}

.auth-floor {
	display: flex;
	justify-content: center;
}

.auth-floor button {
	display: none;
}

#kakao-button {
	background-color: #FEE500;
	color: black;
	--pico-box-shadow: none;

}
</style>