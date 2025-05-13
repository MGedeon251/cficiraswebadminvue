<template>
  <ul class="nav nav-pills nav-pills-custom mt-4" role="tablist">
    <li class="nav-item" v-for="day in days" :key="day.id">
      <a
        class="nav-link"
        :class="{ active: activeTab === day.id }"
        @click.prevent="$emit('changeTab', day.id)"
        href="#"
        role="tab"
      >
        {{ day.label }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    activeTab: String
  },
  data() {
    return {
      days: [
        { id: 'lundi', label: 'Lundi' },
        { id: 'mardi', label: 'Mardi' },
        { id: 'mercredi', label: 'Mercredi' },
        { id: 'jeudi', label: 'Jeudi' },
        { id: 'vendredi', label: 'Vendredi' },
        { id: 'samedi', label: 'Samedi' }
      ]
    }
  }
}
</script>
