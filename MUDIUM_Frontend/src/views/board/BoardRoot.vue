<template>
    <div class="board-container">
        <div class="board-table">
            <template v-for="pageItem in pageItems">
                <tr class="board-tr">
                    <td>{{ pageItem.id }}</td>
                    <td>{{ pageItem.title }}</td>
                    <td>{{ pageItem.author }}</td>
                    <td>{{ pageItem.date }}</td>
                </tr>
            </template>
        </div> 
        <div class="pagination">
            <div class="first-page-button">
                <button @click="getPageItems"><<</button>
            </div>
            <div class="front-page-button">
                <button><</button>
            </div>
            <template v-for="page in pages">
                <button class="page-button">{{ page.number }}</button>
            </template>
            <div class="back-page-button">
                <button>></button>
            </div>
            <div class="last-page-button">
                <button>>></button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, reactive } from 'vue';

const pageItems = reactive([]);
const pageNumber = ref(1);

const viewPage = async () =>  {
    const boardResponse = await fetch("http://localhost:8080/api/board",{
        method:"GET"
    });

    const boards = await boardResponse.json();

return [...boards];
};

const getPageItems = async () => {
    const thatPageItems = await viewPage();
    pageItems.length = 0;
    pageItems.push(...thatPageItems);
};
</script>



<style scoped>
.board-container {
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
}

.board-table {
width: 80%;
display: flex;
flex-direction: column;
align-items: center;
}

.board-tr {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.pagination {
display: flex;
justify-content: center;
align-items: center;
}

</style>
