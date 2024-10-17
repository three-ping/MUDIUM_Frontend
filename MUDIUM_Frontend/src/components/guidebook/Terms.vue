 <template>
    <table>
      <thead>
        <tr>
          <th>뮤지컬</th>
          <th>설명</th>
          <th>작성일자</th>
        </tr>
      </thead>
      <tbody>
        <!-- 데이터가 로드되면 항목을 표시 -->
        <tr v-for="(item, index) in term" :key="index">
          <td>{{ item.terms }}</td>
          <td>{{ item.termsDefinition }}</td>
          <td>{{ item.createdAt }}</td>
        </tr>
      </tbody>
    </table>
    
    <!-- 데이터가 없는 경우 로딩 또는 오류 메시지 -->
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const term = ref([]);  // 데이터를 저장할 ref
const loading = ref(false);  // 로딩 상태
const error = ref(null);  // 에러 상태

// API에서 데이터를 가져오는 함수
const fetchTerms = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch('http://localhost:8080/api/terms');

    if (!response.ok) {
      throw new Error('Failed to fetch terms');
    }

    const data = await response.json();  // API 응답을 JSON으로 파싱
    term.value = data.data;  // 데이터를 ref에 저장
    console.log(term);
  } catch (err) {
    error.value = err.message;  // 에러 메시지 저장
  } finally {
    loading.value = false;  // 로딩 상태 해제
  }
};

// 컴포넌트가 마운트되었을 때 데이터를 가져옴
onMounted(() => {
  fetchTerms();
});
</script>

<style scoped>

table {
  width: 70%;
  border-collapse: collapse;
  margin-top: 1px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #e2d4e6;
  font-weight: bold;
}

tr:hover {
  background-color: #f1e9f3;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #3498db;
}

.error {
  text-align: center;
  font-size: 18px;
  color: #e74c3c;
}
</style>