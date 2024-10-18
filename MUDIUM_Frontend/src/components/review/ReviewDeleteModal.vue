<template>
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <img src="@/assets/images/MudiumText.svg" alt="MudiumLogo" class="logo">
                <button @click="closeModal" class="close-button">&times;</button>
            </div>
            <div class="modal-body">
                <slot></slot> <!-- 외부에서 주입된 내용 -->
            </div>
            <div class="modal-footer">
                <button class="common-button-radi7" @click="closeModal">No</button>
                <button class="common-button-radi7-pink" @click="yesModal">Yes</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(['close','submit']);

const closeModal = () => {
    emit('close');
};

const yesModal = () => {
    emit('submit');
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
}

.modal-content {
    background-color: #ffffff; /* 두 번째 모달 배경색으로 변경 */
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px; /* 최대 너비 설정 */
    position: relative;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.logo {
    display: inline-block;
    margin: 0 auto;
}

.close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: black;
}

.modal-body {
    margin-bottom: 20px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>
