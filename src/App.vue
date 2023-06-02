<script>
    import NavBar from './components/NavBar.vue'
    import FootNav from './components/FootNav.vue'
    export default {components: { NavBar, FootNav }}
</script>

<template>
    <NavBar/>
    <router-view/>
    <FootNav/>
</template>