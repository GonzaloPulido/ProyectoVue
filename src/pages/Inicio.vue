<script>
import TwitterFeed from '../components/TwitterFeed.vue'
export default {
  components: {
    TwitterFeed,
  }
};
</script>

<template>
    <div class="homepage">
        <TwitterFeed/>
    </div>
  </template>
  
  <style>
  .homepage {
    background-color: #707070;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200vh;
  }
  
  
  .twitter-feed-container {
    width: 50%;
    }

  </style>
  
