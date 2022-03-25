<template>
  <div>
    <header class="bg-white shadow">
      <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ title }}</h1>
        <slot name="header"></slot>
      </div>
    </header>
    <main>
      <div class="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <slot></slot>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>

<style lang="scss" scoped>
</style>