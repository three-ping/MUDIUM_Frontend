<template>
    <button @click="toggleBookmark">
      <span v-if="isBookmarked" v-html="bookmarkFillSvg"></span>
      <span v-else v-html="bookmarkSvg"></span>
    </button>
  </template>
  
  <script>
  import axios from 'axios';
  import bookmarkSvg from '../path/to/bookmarks.svg';
  import bookmarkFillSvg from '../path/to/bookmarks-fill.svg';
  
  export default {
    props: {
      musicalId: {
        type: Number,
        required: true
      },
      initialBookmarked: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isBookmarked: this.initialBookmarked,
        bookmarkSvg,
        bookmarkFillSvg,
      };
    },
    methods: {
      async toggleBookmark() {
        try {
          if (this.isBookmarked) {
            await axios.delete(`/api/bookmarks/${this.musicalId}`);
          } else {
            await axios.post('/api/bookmarks', { musicalId: this.musicalId });
          }
          this.isBookmarked = !this.isBookmarked;
        } catch (error) {
          console.error('북마크 처리 중 오류 발생:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  </style>
  