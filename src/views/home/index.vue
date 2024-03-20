<template>

  <div class="w-500 ml-200 mt-100 ">
    <label class="input input-bordered flex items-center gap-2">
      <input type="text" class="grow" placeholder="Search" />
    </label>
    <table class="table table-zebra border my-50">
      <!-- head -->
      <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      <!-- row 2 -->
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      <!-- row 3 -->
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script setup lang="ts">

</script>


<style scoped>

</style>