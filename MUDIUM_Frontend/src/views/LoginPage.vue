<template>
    <div class="login-form-container">
      <img src="/src/assets/logo2.svg" alt="타이틀" class="form-title" />
      <!-- <form @submit.prevent="handleLogin"> -->
        <div class="form-group">
          <label for="username">아이디</label>
          <input type="text" id="username" />
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" />
        </div>

        <button type="submit" class="login-btn">로그인</button>

        <div class="find-password">
          <p>비밀번호찾기</p>
        </div>

        <hr class="divider" />

        <button type="button" class="kakao-login-btn">
          <img src="/src/assets/kakao-icon.svg" alt="카카오 아이콘" /> 
          <p>카카오로 간편 로그인</p>
        </button>
      <!-- </form> -->
    </div>
  <!-- </div> -->
</template>

<script setup>

</script>

<style scoped>
.login-form-container {
    width: 500px;
    margin: 50px auto;
    padding: 30px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.form-title {
    width: 80px;
    margin-bottom: 20px;
}

.form-group {
  text-align: left;
  margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-size: 0.9rem;
    color: #333;
    margin-bottom: 5px;
    /* text-align: left; */
}

.form-group input {
    width: 90%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
}

.login-btn {
    width: 100%;
    padding: 12px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
}

.find-password .p {
    color: #555;
    text-decoration: none;
    /* text-align: right; */
    font-size: 0.7rem;
}

.kakao-login-btn {
    width: 100%;
    padding: 12px;
    background-color: #FEE500;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
}

.kakao-login-btn img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}

/* 
.form-group {
    margin-bottom: 15px;
    text-align: left;
}







.options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    font-size: 0.8rem;
}

.options label {
    display: flex;
    align-items: center;
}


.divider {
    margin: 20px 0;
    border: none;
    border-top: 1px solid #ddd;
    font-size: 0.8rem;
    color: #888;
    position: relative;
}

.divider::before {
    content: 'SNS 로그인';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    padding: 0 10px;
    color: #888;
}




} */

</style>
