<template>
	<Modal :isModalOpen="props.isLoginModalVisible" @close="closeModal">
		<template v-slot:modalSection>
			<input type="text" v-model="email" placeholder="이메일" class="auth-input">
			<input type="password" v-model="password" placeholder="비밀번호" class="auth-input">
			<p v-if="loginError" class="error-message">{{ loginError }}</p>
			<!-- <button @click="loginNormalUser">로그인</button> -->
		</template>

		<template v-slot:modalFooter>
			<button @click="loginNormalUser" class="btn-auth">로그인</button>
			<button @click="loginKakaoUser" class="btn-auth btn-kakao">카카오로그인</button>
		</template>
	</Modal>
</template>

<script setup>
import Modal from '@/components/layout/Modal.vue';
import axios from 'axios';
import { ref } from 'vue';

const props = defineProps({
	isLoginModalVisible: Boolean,
	isLoggedIn: Boolean,
});

const emit = defineEmits(['update:isLoggedIn', 'close', 'update:userInfo']);

const email = ref('');
const password = ref('');
const loginError = ref('');

const loginNormalUser = async () => {
	try {
		loginError.value = '';
		const response = await axios.post("http://localhost:5173/api/login", {
			email: email.value,
			password: password.value,
			signup_path: "NORMAL"
		});

		if (response.data.success) {
			console.log("Normal Login Success");
			emit('update:isLoggedIn', true);
			emit('update:userInfo', response.data.data); // Emit user info
			console.log(`userinfo: ${1}`)
			closeModal();
		} else {
			loginError.value = '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.';
		}
	} catch (error) {
		console.error("Login error:", error);
		loginError.value = '로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.';
	}
};

const loginKakaoUser = async () => {
	try {

		const kakaoRedirectUri = "http://localhost:8080/api/users/oauth2/kakao";
		const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=454fe5e6a0e0c020cf155003e27761e2& redirect_uri=${kakaoRedirectUri}& response_type=code`;
		window.location.href = kakaoLoginUrl;
	} catch (error) {
		console.log(error);
	}
}



const closeModal = () => {
	emit('close');
};
</script>

<style scoped>
.auth-input {
	display: block;
	margin-bottom: 0.5rem;
}

.error-message {
	color: red;
	font-size: 0.9em;
	margin-top: 0.5rem;
}

.btn-auth {
	margin: 0.5rem;
	display: block;
	width: 100%;
}

.btn-kakao {
	background-color: #FEE500;
	color: black;
	border: 0;
}
</style>
