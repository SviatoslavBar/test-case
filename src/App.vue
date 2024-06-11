<script>
  import Home from './views/Home.vue'
  import Header from '@/components/navigation/Header.vue';
  import SideMenu from '@/components/navigation/SideMenu.vue';
  export default {
    components: { Home, Header, SideMenu }
  }
</script>

<template>
  <main>
    <Header/>
    <div class="content">
      <SideMenu/>
      <Home />
    </div>
  </main>
</template>

<style>
  .content{
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 30px;
  }
</style>
