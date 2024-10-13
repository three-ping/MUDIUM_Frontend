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

        <div class="options">
          <label>
            <input type="checkbox"/>
            자동 로그인
          </label>
          <a href="#" class="find-password">비밀번호찾기</a>
        </div>

        <hr class="divider" />

        <button type="button" class="kakao-login-btn">
          <img src="/src/assets/kakao-icon.svg" alt="카카오 아이콘" /> 
        </button>
      <!-- </form> -->
    </div>
  <!-- </div> -->
</template>

<script setup>

</script>

<style scoped>

</style>