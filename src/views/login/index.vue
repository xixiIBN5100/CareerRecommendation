<template>
  <div class="bg-base-300 h-screen">
  <div class="navbar bg-base-100 shadow-lg my-3">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">大学生就业推荐平台</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><a>登陆</a></li>
        <li><a>注册</a></li>
      </ul>
    </div>
  </div>
  <div class="hero  bg-base-200 h-500 my-100">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left mx-50">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">还在为本科毕业找工作而苦恼?&ensp;登陆立即享受大学生就业推荐服务,准备好你的简历了吗</p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Account</span>
            </label>
            <input  placeholder="account" class="input input-bordered" required />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" class="input input-bordered" required />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">忘记密码?</a>
              <a href="#" class="label-text-alt link link-hover">我是老板</a>
            </label>
          </div>
          <div class="form-control">
            <button class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">



</script>
<style scoped>

</style>