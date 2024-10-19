<template>
	<Modal :isModalOpen="isLoginModalVisible" @close="closeLoginModal">
		<template v-slot:modalSection>
			<div class="login-form">
				<input type="text" v-model="email" placeholder="아이디" class="auth-input">
				<input type="password" v-model="password" placeholder="비밀번호" class="auth-input">
				<p v-if="loginError" class="error-message">{{ loginError }}</p>
				<button @click="loginNormalUser" class="btn-auth btn-login">로그인</button>
				<button @click="loginKakaoUser" class="btn-auth btn-kakao">
					<img src="@/assets/images/kakao-icon.svg" alt="Kakao" class="kakao-icon">
					카카오 로그인
				</button>
				<div class="auth-links">
					<a href="#" @click.prevent="openSignup">회원가입</a>
					<span class="separator">|</span>
					<a href="#" @click.prevent="openFindId">아이디 찾기</a>
					<span class="separator">|</span>
					<a href="#" @click.prevent="openFindPassword">비밀번호 찾기</a>
				</div>
			</div>
		</template>
	</Modal>
</template>

<script setup>
import Modal from '@/components/layout/Modal.vue';
import axios from 'axios';
import { ref } from 'vue';

const props = defineProps({
	isLoginModalVisible: Boolean,
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
			emit('update:userInfo', response.data.data);
			closeLoginModal();
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
		const kakaoRedirectUri = "http://127.0.0.1:8080/api/users/oauth2/kakao";
		const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=454fe5e6a0e0c020cf155003e27761e2&redirect_uri=${kakaoRedirectUri}&response_type=code`;
		window.location.href = kakaoLoginUrl;
	} catch (error) {
		console.log(error);
	}
};

const closeLoginModal = () => {
	emit('close');
};

const openSignup = () => {
	// Implement signup logic
	console.log('Open signup');
};

const openFindId = () => {
	// Implement find ID logic
	console.log('Open find ID');
};

const openFindPassword = () => {
	// Implement find password logic
	console.log('Open find password');
};
</script>

<style scoped>
.login-form {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
}

.logo {
	width: 120px;
	margin-bottom: 20px;
}

.auth-input {
	width: 100%;
	padding: 10px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 16px;
}

.error-message {
	color: red;
	font-size: 14px;
	margin-bottom: 10px;
}

.btn-auth {
	width: 100%;
	padding: 10px;
	margin-bottom: 10px;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	cursor: pointer;
}

.btn-login {
	background-color: #000;
	color: #fff;
}

.btn-kakao {
	background-color: #FEE500;
	color: #000;
	display: flex;
	align-items: center;
	justify-content: center;
}

.kakao-icon {
	width: 20px;
	height: 20px;
	margin-right: 10px;
}

.auth-links {
	margin-top: 20px;
	font-size: 14px;
}

.auth-links a {
	color: #666;
	text-decoration: none;
}

.separator {
	margin: 0 10px;
	color: #ccc;
}
</style>