<script>
  export default {
    mounted() {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      document.head.appendChild(script);
    }
  };
</script>

<template>
    <div class="twitter-feed-container">
    <h2 class="welcome">Noticias MotoGP</h2>
    <a
        class="twitter-timeline"
        href="https://twitter.com/MotoGP"
        data-tweet-limit="2">
        Tweets by MotoGP
    </a>
    </div>
  </template>
  
  <style scoped>
  .twitter-feed-container {
    padding-bottom: 70px;
    width: 100%; 
    margin: 0 auto; 
  }

  .welcome {
    text-align: center;
    margin-top: 20px;
    padding: 20px;
    font-size: 2.5rem;
    }
  
  </style>
  
  
  
  