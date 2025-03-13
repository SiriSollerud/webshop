<template>
  <div class="grid-layout bg-[#F2F1F5]">
    <Header />

    <main>
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
// Components are auto-imported by Nuxt
</script>

<style>
.grid-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
</style>
