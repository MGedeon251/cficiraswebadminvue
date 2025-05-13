<template>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2>Emploi du temps</h2>
              <p class="mb-md-0">Emploi du temps génerale</p>
            </div>
            <div class="d-flex">
              <i class="mdi mdi-home text-muted hover-cursor"></i>
              <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Schedule&nbsp;/&nbsp;</p>
              <p class="text-primary mb-0 hover-cursor">Analytics</p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end flex-wrap"></div>
        </div>
      </div>
    </div>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Planing Journalier | Hebdomadaire</h4>
          <p>Listes des matiere journalier et hebdomadaire pour une année académique</p>
          <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1" />
          <div v-else>
            <!-- Filtres -->
            <div class="d-flex mt-4">
                <div class="d-flex align-items-end flex-wrap">
                  <div class="me-md-4 me-xl-5">
                    <div class="filters d-flex gap-2 mb-2">
                      <div class="col-md-4">
                        <select class="form-select">
                          <option value="year">2022-2023</option>
                          <option value="year">2023-2024</option>
                          <option value="year">2024-2025</option>
                        </select>
                      </div>
                      <div class="col-md-4">
                        <select class="form-select">
                          <option key="classItem" value="classItem">LAP 1</option>
                          <option key="classItem" value="classItem">LAP 2</option>
                          <option key="classItem" value="classItem">LAP 3</option>
                        </select>
                      </div>
                      <div class="col-md-6">
                        <select class="form-select">
                          <option value="all" selected>Tout semestres</option>
                          <option value="paid">Semestre 1</option>
                          <option value="unpaid">Semestre 2</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="d-flex mt-4">
              <div class="d-flex align-items-end flex-wrap">
                <div class="me-md-4 me-xl-5">
                  <div class="filters d-flex gap-2 mb-2">
                    <!-- Vos filtres ici (année, classe, semestre) -->
                  </div>
                </div>
              </div>
            </div>

            <!-- Onglets et contenu -->
            <PlanningTabs :activeTab="activeTab" @changeTab="changeTab" />
            <PlanningContent :activeTab="activeTab" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlanningTabs from './ScheduleTab.vue'
import PlanningContent from './ScheduleContent.vue'

export default {
  components: {
    PlanningTabs,
    PlanningContent
  },
  data() {
    return {
      loading: false,
      activeTab: 'lundi' // valeur par défaut
    }
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab
    }
  }
}
</script>