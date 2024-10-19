<template>
	<Modal :isModalOpen="isSignupModalVisible" @close="closeSignupModal">
		<template v-slot:modalSection>
			<div class="signup-form">
				<form @submit.prevent="handleSignup">
					<div class="form-group">
						<div class="input-button-wrapper">
							<input type="email" v-model="email" placeholder="이메일" required>
							<button type="button" class="verify-button" @click="sendVerification">인증번호 발송</button>
						</div>
					</div>
					<div class="form-group">
						<div class="input-button-wrapper">
							<input type="text" v-model="username" placeholder="이름" required>

						</div>
					</div>
					<div class="form-group">
						<div class="input-button-wrapper">
							<input type="text" v-model="verificationCode" placeholder="인증번호를 입력해주세요" required>
							<button type="button" class="verify-button" @click="verifyCode">확인</button>
						</div>
					</div>
					<div class="form-group">
						<div class="input-button-wrapper">
							<input type="text" v-model="nickname" placeholder="닉네임을 입력해주세요" required>
							<button type="button" class="verify-button" @click="verifyNickname">중복 확인</button>
						</div>
					</div>
					<div class="form-group">
						<input type="password" v-model="password" placeholder="비밀번호를 입력해주세요" required>
					</div>
					<div class="form-group">
						<input type="password" v-model="confirmPassword" placeholder="비밀번호를 확인해주세요" required>
					</div>
					<button type="submit" class="signup-button">회원가입 하기</button>
				</form>
			</div>
		</template>
		<template v-slot:modalFooter>
			<div class="auth-links">
				<span>이미 계정이 있으신가요?</span>
				<a href="#" @click.prevent="switchToLogin">로그인</a>
			</div>
		</template>
	</Modal>
</template>

<script setup>
import { ref } from 'vue';
import Modal from '@/components/layout/Modal.vue';

const props = defineProps({
	isSignupModalVisible: Boolean,
});

const emit = defineEmits(['close', 'signup-success', 'switch-to-login']);

const email = ref('');
const verificationCode = ref('');
const nickname = ref('');
const password = ref('');
const confirmPassword = ref('');
const username = ref('');
const closeSignupModal = () => {
	emit('close');
};

const sendVerification = () => {
	// Implement send verification logic
	console.log('Sending verification to:', email.value);
};

const verifyCode = () => {
	// Implement verification code check logic
	console.log('Verifying code:', verificationCode.value);
};

const verifyNickname = () => {
	// Implement nickname verification logic
	console.log('Verifying nickname:', nickname.value);
};

const handleSignup = () => {
	if (password.value !== confirmPassword.value) {
		alert('Passwords do not match');
		return;
	}

	// Implement signup logic here
	console.log('Signing up with:', { email: email.value, nickname: nickname.value, password: password.value });

	// After successful signup
	emit('signup-success');
	closeSignupModal();
};

const switchToLogin = () => {
	emit('switch-to-login');
};
</script>

<style scoped>
.signup-form {
	overflow-y: auto;
	padding: 2rem;
}

.form-group {
	margin-bottom: 2rem;
}

.input-button-wrapper {
	height: 8rem;
	display: flex;
	align-items: stretch;
}

.input-button-wrapper>input,
.input-button-wrapper>button {
	font-size: 2rem;
}

.input-button-wrapper>input {
	flex: 8;
	padding: 0 1.5rem;
	border: 1px solid #ccc;
	border-radius: 1rem;
}

.input-button-wrapper>button {
	flex: 2;
	padding: 0 1rem;
	border: 1px solid #ccc;
	border-left: none;
	border-radius: 1rem;
	background-color: var(--primary-color);
	color: white;
	cursor: pointer;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.form-group>input {
	width: 100%;
	height: 6rem;
	padding: 0 1.5rem;
	border: 1px solid #ccc;
	border-radius: 1rem;
	font-size: 2.4rem;
}

.auth-links {
	text-align: center;
	margin-top: 1rem;
}

.auth-links span {
	margin-right: 0.5rem;
}

.auth-links a {
	color: var(--secondary-color);
	text-decoration: none;

}

.auth-links a:hover {
	text-decoration: underline;
}

.signup-button {
	width: 100%;
	height: 6rem;
	background-color: var(--primary-color);
	color: white;
	border: none;
	border-radius: 1rem;
	font-size: 2.4rem;
	cursor: pointer;
}

.signup-button:hover {
	background-color: var(--button-hover-color);
}
</style>