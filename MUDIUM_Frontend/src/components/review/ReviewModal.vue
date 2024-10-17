<template>
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <img src="@/assets/images/MudiumText.svg" alt="MudiumLogo" class="logo">
                <button @click="closeModal" class="close-button">&times;</button>
            </div>
            <div class="modal-body">
                <h3>{{ musicalTitle }}</h3>
                <textarea
                    v-model="review"
                    placeholder="리뷰를 작성해주세요..."
                    :maxlength="MAX_CHARS"
                    rows="6"
                ></textarea>
                <div class="char-count">{{ charCount }} / {{ MAX_CHARS }}</div>
            </div>
            <div class="modal-footer">
                <button @click="closeModal">취소</button>
                <button @click="submitReview" :disabled="!review.trim()">
                    {{ isEditing ? '수정' : '등록' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';

// Props와 emits 정의
const props = defineProps({
    isOpen: Boolean,
    musicalTitle: String,
    isEditing: Boolean,
    initialReview: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['close', 'submit']);

// 상태 관리 및 로직
const MAX_CHARS = 10000;
const review = ref(props.initialReview || '');    // 초기 리뷰 내용 설정
const charCount = computed(() => review.value.length);


watch(() => props.isOpen, (newValue) => {
    if (newValue) {
        review.value = props.initialReview; // 모달이 열릴 때 초기 리뷰 내용 설정
    } else {
        review.value = ''; // 모달이 닫힐 때 리뷰 내용 초기화
    }
});

const closeModal = () => {
    emit('close');
};

const submitReview = () => {
    emit('submit', review.value);
    review.value = ''; // 리뷰 내용 초기화
    closeModal();
};

// 모달이 닫힐 때 리뷰 내용 초기화
watch(() => props.isOpen, (newValue) => {
    if (!newValue) {
        review.value = '';
    }
});
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
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
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
}

.modal-body textarea {
    width: 100%;
    margin-bottom: 10px;
}

.char-count {
    text-align: right;
    color: #888;
    font-size: 12px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

button {
    padding: 8px 16px;
    cursor: pointer;
}
</style>
