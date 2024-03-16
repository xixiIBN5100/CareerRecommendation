<script setup lang="ts">

</script>

<template>
  <button data-set-theme="dark" data-act-class="ACTIVECLASS" class="btn">dark</button>
  <button data-set-theme="light" data-act-class="ACTIVECLASS" class="btn">light</button>
  <div class="flex justify-center items-center h-screen bg-primary-content">
    <div class="card w-400 h-470 glass border shadow-xl hover:shadow-2xl hover:-translate-y-1 p-20" >
      <div class="text-6xl font-normal my-20 mx-10">Login</div>
      <div class="my-20 mx-10">
      <span class="text-xl">账号:</span>
      <input type="text" placeholder="Account" class="input bg-base-100 w-full max-w-xs h-40 my-10" />
      </div>
      <div class="mx-10">
        <span class="text-xl">密码:</span>
        <input type="text" placeholder="Password" class="input bg-base-100 w-full max-w-xs h-40 my-10" />
      </div>
      <div class="flex justify-center my-35">
      <button class="transition duration-500 ease-in-out bg-base-100 hover:bg-indigo-500 transform hover:-translate-y-1 hover:scale-110 btn w-100 shadow-lg hover:shadow-2xl">
        登陆
      </button>
      </div>
      </div>
  </div>

</template>

<style scoped>

</style>