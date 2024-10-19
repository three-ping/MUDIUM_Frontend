<!-- 
<template>
  <div>
    <h2>My Custom Tickets</h2>
    <div class="ticket-list">
      <div v-for="(ticket, index) in customTickets" :key="ticket.customTicketId" class="ticket-card" @click="flipCard(index)">
        <div class="flipper" :class="{ flipped: isFlipped[index] }">

          <div class="front">
            <div class="container" @mousemove="(e) => handleMouseMove(e, index)" @mouseout="(e) => handleMouseOut(e, index)">
              <div class="overlay" :style="{ background: getHologramStyle(ticket.hologramColor1, ticket.hologramColor2) }"></div>
              <div class="card-image" :style="{ backgroundImage: 'url(' + ticket.ticketImage + ')' }"></div>
            </div>
          </div>

          <div class="back">
            <div class="back-content">
              <p v-if="ticket.comment">{{ ticket.comment }}</p>
              <p v-else>코멘트가 없습니다. 코멘트를 추가해주세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const customTickets = ref([]);
const isFlipped = ref([]); // 티켓마다 flip 상태를 관리하는 배열

const fetchCustomTickets = () => {
  const userId = 1;  // 로그인된 유저 ID
  fetch(`http://localhost:8080/api/customticket/${userId}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        customTickets.value = data.data;  // 백엔드로부터 받은 티켓 데이터를 저장
        isFlipped.value = new Array(customTickets.value.length).fill(false); // 티켓 개수만큼 false로 초기화
      } else {
        console.error('Error fetching tickets:', data.error);
      }
    })
    .catch(error => {
      console.error('API request failed:', error);
    });
};

// 티켓을 뒤집는 함수
const flipCard = (index) => {
  isFlipped.value[index] = !isFlipped.value[index]; // 클릭한 티켓의 flip 상태 변경
};

// 홀로그램 스타일을 반환하는 함수
const getHologramStyle = (color1, color2) => {
  return `linear-gradient(105deg, transparent 40%, ${color1} 45%, ${color2} 50%, transparent 54%)`;
};

// 마우스 이동 핸들러 (특정 티켓에 대해 동작)
const handleMouseMove = (e, index) => {
  const container = e.target.closest('.container'); // 가까운 container 요소를 찾음
  const overlay = container.querySelector('.overlay'); // overlay 요소를 찾음

  if (!container || !overlay) return;

  const bounds = container.getBoundingClientRect();
  const x = e.clientX - bounds.left;
  const y = e.clientY - bounds.top;

  if (x >= 0 && y >= 0 && x <= bounds.width && y <= bounds.height) {
    const backgroundX = (x / bounds.width) * 100;
    const backgroundY = (y / bounds.height) * 100;

    overlay.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`;
    overlay.style.filter = `opacity(${x / bounds.width}) brightness(1.2)`;
  }
};

// 마우스 아웃 핸들러
const handleMouseOut = (e, index) => {
  const container = e.target.closest('.container');
  const overlay = container.querySelector('.overlay');

  if (overlay) {
    overlay.style.filter = 'opacity(0)';
  }
};

onMounted(() => {
  fetchCustomTickets();  // 컴포넌트가 마운트될 때 API 호출
});
</script>

<style scoped>
.ticket-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.ticket-card {
  width: 220px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  perspective: 1000px;
  cursor: pointer;
}

.flipper {
  position: relative;
  width: 220px;
  height: 310px;
  transition: 0.6s;
  transform-style: preserve-3d;
}

.flipped {
  transform: rotateY(180deg);
}

.front, .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.back {
  background-color: #f4f4f4;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-content {
  text-align: center;
}

.card-image {
  width: 220px;
  height: 310px;
  background-size: cover;
  background-position: center;
  margin-bottom: 10px;
}

.overlay {
  position: absolute;
  width: 220px;
  height: 310px;
  filter: brightness(1.1) opacity(0.8);
  mix-blend-mode: color-dodge;
  background-size: 200% 200%;
  transition: all 0.1s;
}

.ticket-info {
  font-size: 14px;
}
</style> -->




<template>
  <div>
    <h2>My Custom Tickets</h2>
    <div class="ticket-list">
      <div 
        v-for="(ticket, index) in customTickets" 
        :key="ticket.customTicketId" 
        class="ticket-card"
        @mousemove="(e) => handleMouseMove(e, index)" 
        @mouseout="(e) => handleMouseOut(e, index)"
        @click="flipCard(index)"
      >
        <div class="flipper" :class="{ flipped: isFlipped[index] }" ref="flipper">

          <div class="front">
            <div class="container" ref="container">
              <div class="overlay" :style="{ background: getHologramStyle(ticket.hologramColor1, ticket.hologramColor2) }"></div>
              <div class="card-image" :style="{ backgroundImage: 'url(' + ticket.ticketImage + ')' }"></div>
            </div>
          </div>
   
          <div class="back">
            <div class="back-content">
              <p v-if="ticket.comment">{{ ticket.comment }}</p>
              <p v-else>코멘트가 없습니다. 코멘트를 추가해주세요.</p>
              <div class="card-actions"> 
                <!-- 수정 버튼 클릭시 editTicket 함수 호출 -->
                <button class="edit-btn" @click.stop="editTicket(index)">수정</button>
                <!-- 삭제 버튼 클릭시 deleteTicket 함수 호출 -->
                <button class="delete-btn" @click.stop="deleteTicket(index)">삭제</button>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const customTickets = ref([]);
const isFlipped = ref([]); // 티켓마다 flip 상태를 관리하는 배열
const container = ref(null); // container ref 추가
const overlay = ref(null); // overlay ref 추가

const fetchCustomTickets = () => {
  const userId = 1;  // 로그인된 유저 ID
  fetch(`http://localhost:8080/api/customticket/${userId}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        customTickets.value = data.data;  // 백엔드로부터 받은 티켓 데이터를 저장
        isFlipped.value = new Array(customTickets.value.length).fill(false); // 티켓 개수만큼 false로 초기화
      } else {
        console.error('Error fetching tickets:', data.error);
      }
    })
    .catch(error => {
      console.error('API request failed:', error);
    });
};

// 티켓을 뒤집는 함수
const flipCard = (index) => {
  isFlipped.value[index] = !isFlipped.value[index]; // 클릭한 티켓의 flip 상태 변경
};



// 마우스 이동 핸들러
// const handleMouseMove = (e, index) => {
//   const card = e.target.closest('.ticket-card');
//   const bounds = card.getBoundingClientRect();
//   const x = e.clientX - bounds.left;
//   const y = e.clientY - bounds.top;

//   // 카드 회전 효과
//   const rotateY = -1 / 5 * x + 20;
//   const rotateX = 4 / 30 * y - 20;
//   card.style.transform = `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

//   // 홀로그램 배경 위치 조정
//   const overlayElement = card.querySelector('.overlay');
//   const backgroundX = (x / bounds.width) * 100;
//   const backgroundY = (y / bounds.height) * 100;

//   if (overlayElement) {
//     overlayElement.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`;
//     overlayElement.style.filter = `opacity(${x / bounds.width}) brightness(1.2)`;
//   }
// };

// 마우스 이동 핸들러
// 마우스 이동 핸들러
const handleMouseMove = (e, index) => {
  const card = e.target.closest('.ticket-card');
  const bounds = card.getBoundingClientRect();
  const x = e.clientX - bounds.left;
  const y = e.clientY - bounds.top;

  // 카드 회전 효과
  const rotateY = -1 / 5 * x + 20;
  const rotateX = 4 / 30 * y - 20;
  card.style.transform = `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // 홀로그램 배경 위치 조정 (각도는 105도 고정, 위치는 마우스 이동에 따라 변경)
  const overlayElement = card.querySelector('.overlay');
  const backgroundX = (x / bounds.width) * 100;
  const backgroundY = (y / bounds.height) * 100;

  if (overlayElement) {
    // 그라디언트 각도는 105도 고정, 양쪽 크기 균등하게
    overlayElement.style.background = `linear-gradient(105deg, 
      transparent 40%, 
      ${customTickets.value[index].hologramColor1} 45%, 
      ${customTickets.value[index].hologramColor2} 50%, 
      transparent 54%)`;

    // background-size를 200% 200%로 고정하여 균등하게 적용
    overlayElement.style.backgroundSize = '200% 200%';
    
    // 위치 조정
    overlayElement.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`;
    overlayElement.style.filter = `opacity(${x / bounds.width}) brightness(1.2)`;
  }
};





// 홀로그램 스타일을 반환하는 함수
const getHologramStyle = (color1, color2) => {
  return `linear-gradient(105deg, transparent 40%, ${color1} 45%, ${color2} 50%, transparent 54%)`;
};

// 마우스 아웃 핸들러
const handleMouseOut = (e, index) => {
  const card = e.target.closest('.ticket-card');
  card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';

  const overlayElement = card.querySelector('.overlay');
  if (overlayElement) {
    overlayElement.style.filter = 'opacity(0)';
  }
};

// 티켓 수정 함수
const editTicket = async (index) => {
  const ticket = customTickets.value[index];
  const updatedComment = prompt('새로운 코멘트를 입력하세요:', ticket.comment);
  if (updatedComment === null) return;

  try {
    const response = await fetch(`http://localhost:8080/api/user-custom-ticket/update/${ticket.userId}/${ticket.customTicketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: ticket.userId,
        customTicketId: ticket.customTicketId,
        photoUrl: ticket.photoUrl,
        ticketAttributers: ticket.ticketAttributers,
        comment: updatedComment 
      }),
    });

    if (response.ok) {
      customTickets.value[index].comment = updatedComment;
      alert('수정이 완료되었습니다.');
    } else {
      alert('수정에 실패했습니다.');
    }
  } catch (error) {
    console.error('Error updating ticket:', error);
    alert('수정 중 오류가 발생했습니다.');
  }
};

// 티켓 삭제 함수
const deleteTicket = async (index) => {
  const ticket = customTickets.value[index];
  const confirmDelete = confirm('정말로 이 티켓을 삭제하시겠습니까?');
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:8080/api/user-custom-ticket/delete/${ticket.userId}/${ticket.customTicketId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      customTickets.value.splice(index, 1);
      alert('티켓이 삭제되었습니다.');
    } else {
      alert('티켓 삭제에 실패했습니다.');
    }
  } catch (error) {
    console.error('Error deleting ticket:', error);
    alert('삭제 중 오류가 발생했습니다.');
  }
};



onMounted(() => {
  fetchCustomTickets();  // 컴포넌트가 마운트될 때 API 호출
});
</script>

<style>
.ticket-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.ticket-card {
  width: 220px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  perspective: 1000px;
  cursor: pointer;
  transition: transform 0.3s ease-out; /* 움직임이 부드럽게 보이도록 추가 */
}

.flipper {
  position: relative;
  width: 220px;
  height: 310px;
  transition: 0.6s;
  transform-style: preserve-3d;
}

.flipped {
  transform: rotateY(180deg);
}

.front, .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.back {
  background-color: #f4f4f4;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-content {
  text-align: center;
}

.card-image {
  width: 220px;
  height: 310px;
  background-size: cover;
  background-position: center;
  margin-bottom: 10px;
}

.overlay {
  position: absolute;
  width: 220px;
  height: 310px;
  filter: brightness(1.1) opacity(0.8);
  mix-blend-mode: color-dodge;
  background-size: 200% 200%;
  transition: all 0.1s;
}


/* 우측 상단에 버튼 배치 */
.image-actions {
  position: absolute;
  top: 10px; /* 상단에서 10px 떨어진 위치 */
  right: 10px; /* 우측에서 10px 떨어진 위치 */
  display: flex;
  gap: 5px; /* 수정, 삭제 버튼 사이의 간격 */
}

.edit-btn, .delete-btn {
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  cursor: pointer;
  padding: 3px 5px; /* 작게 만들기 위한 padding */
  border-radius: 4px;
  font-size: 12px; /* 버튼 텍스트 크기 줄이기 */
}

.edit-btn {
  color: #4CAF50; /* 수정 버튼 색상 */
}

.delete-btn {
  color: #F44336; /* 삭제 버튼 색상 */
}

.edit-btn:hover, .delete-btn:hover {
  background-color: rgba(255, 255, 255, 1);
}
</style>




 