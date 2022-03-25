<template>
  <div
    class="flex items-center justify-center min-h-full px-4 py-12  sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style lang="scss" scoped>
</style>