<template>
	<Modal :isModalOpen="isLoginModalVisible" @close="closeLoginModal">
		<template #modalSection>
			<div class="login-form">
				<input type="text" v-model="email" placeholder="아이디" class="auth-input">
				<input type="password" v-model="password" placeholder="비밀번호" class="auth-input">
				<p v-if="loginError" class="error-message">{{ loginError }}</p>
			</div>
		</template>
		<template #modalFooter>
			<div class="login-buttons">
				<button @click="loginNormalUser" class="btn-auth btn-login">로그인</button>
				<button @click="initiateKakaoLogin" class="btn-auth btn-kakao">
					<img src="@/assets/images/kakao-icon.svg" alt="Kakao" class="kakao-icon">
					카카오 로그인
				</button>
			</div>
			<div class="auth-links">
				<a href="#" @click.prevent="openSignup">회원가입</a>
				<span class="separator">|</span>
				<a href="#" @click.prevent="openFindId">아이디 찾기</a>
				<span class="separator">|</span>
				<a href="#" @click.prevent="openFindPassword">비밀번호 찾기</a>
			</div>
		</template>
	</Modal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Modal from '@/components/layout/Modal.vue';
import axios from 'axios';

const props = defineProps({
	isLoginModalVisible: Boolean,
});

const emit = defineEmits(['update:isLoggedIn', 'close', 'update:userInfo']);

const router = useRouter();
const email = ref('');
const password = ref('');
const loginError = ref('');

const loginNormalUser = async () => {
	try {
		loginError.value = '';
		const response = await axios.post('/api/users/login', {
			email: email.value,
			password: password.value,
			signup_path: 'NORMAL'
		});

		if (response.data.success) {
			console.log('Normal Login Success');
			emit('update:isLoggedIn', true);
			emit('update:userInfo', response.data.data);
			closeLoginModal();
		} else {
			loginError.value = '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.';
		}
	} catch (error) {
		console.error('Login error:', error);
		loginError.value = '로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.';
	}
};

const initiateKakaoLogin = () => {
	const kakaoRedirectUri = `${window.location.origin}/kakao-callback`;
	const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=454fe5e6a0e0c020cf155003e27761e2&redirect_uri=${encodeURIComponent(kakaoRedirectUri)}&response_type=code`;
	window.location.href = kakaoLoginUrl;
};

const handleKakaoCallback = async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get('code');

	if (code) {
		try {
			const response = await axios.post(`/api/users/oauth2/kakao?code=${code}`);
			if (response.data.success) {
				console.log('Kakao Login Success');
				emit('update:isLoggedIn', true);
				emit('update:userInfo', response.data.data);
				router.push('/'); // Redirect to home page or dashboard
			} else {
				loginError.value = '카카오 로그인에 실패했습니다. 다시 시도해주세요.';
			}
		} catch (error) {
			console.error('Kakao login error:', error);
			loginError.value = '카카오 로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.';
		}
	}
};

onMounted(() => {
	if (window.location.pathname === '/kakao-callback') {
		handleKakaoCallback();
	}
});

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
	/* padding: 2rem; */
}

.auth-input {
	width: 100%;
	padding: 3rem;
	margin-bottom: 2rem;
	border: 1px solid #ccc;
	border-radius: 1rem;
	font-size: 3rem;
}

.error-message {
	color: red;
	font-size: 14px;
	margin-bottom: 10px;
}

.login-buttons {
	display: block;
	width: 100%;
}

.btn-auth {
	width: 100%;
	display: block;
	padding: 3rem;
	margin-bottom: 2rem;
	border: none;
	border-radius: 1rem;
	font-size: 2rem;
	font-weight: bold;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
}

.btn-login {
	background-color: #000;
	color: #fff;
}

.btn-kakao {
	background-color: #FEE500;
	color: #000;
}

.kakao-icon {
	width: 20px;
	height: 20px;
	margin-right: 10px;
}

.auth-links {
	margin-top: 2rem;
	font-size: 2rem;
	text-align: center;
}

.auth-links a {
	color: var(--text-color);
	text-decoration: none;
}




.auth-input {
	background-color: #f5f5f5;
	border: none;
}

.btn-auth {
	height: 8rem;
	font-size: 3rem;
}

.btn-kakao {
	position: relative;
}

.kakao-icon {
	position: absolute;
	left: 20px;
}

.auth-links {
	margin-top: 1rem;
	justify-content: center;

}

.auth-links a {
	font-size: 2rem;

	/* color: #999; */
}

.separator {
	color: #c0c0c0;
}
</style>