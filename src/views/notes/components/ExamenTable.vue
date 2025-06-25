<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>N°</th>
          <th>Designation</th>
          <th>Niveau</th>
          <th>Examen</th>
          <th>Valider</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in rows" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.designation }}</td>
          <td>{{ item.niveau }}</td>
          <td>{{ item.examen }}</td>
          <td>
            <span :class="['status-badge', item.statusClass]">{{ item.status }}</span>
          </td>
          <td>
            <!-- Dropdown actions -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps(['rows']);
</script>
