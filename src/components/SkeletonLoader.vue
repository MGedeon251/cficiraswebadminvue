<template>
  <div class="skeleton-loader">
    <div v-if="type === 'table'">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th v-for="i in columns" :key="'th-' + i">
                <div class="skeleton-box" style="width: 100px; height: 20px"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in rows" :key="'tr-' + i">
              <td v-for="j in columns" :key="'td-' + j">
                <div class="skeleton-box" style="width: 100%; height: 20px"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else-if="type === 'card'">
      <div class="card p-3">
        <div class="skeleton-box" style="width: 60%; height: 20px"></div>
        <div class="skeleton-box mt-2" style="width: 80%; height: 15px"></div>
        <div class="skeleton-box mt-2" style="width: 100%; height: 150px"></div>
      </div>
    </div>

    <div v-else>
      <div
        class="skeleton-box"
        v-for="i in 3"
        :key="'text-' + i"
        style="width: 80%; height: 15px; margin-bottom: 10px"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'table', // 'table', 'card', 'text'
  },
  rows: {
    type: Number,
    default: 5,
  },
  columns: {
    type: Number,
    default: 5,
  },
});
</script>

<style scoped>
.skeleton-box {
  background: linear-gradient(90deg, #f5f5f5 25%, #e0e0e0 50%, #f5f5f5 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: 4px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
