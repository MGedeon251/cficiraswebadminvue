<template>
  <div class="row">
    <h4>Calendrier annuel </h4>
    <p>Vous pouvez consulter les détails de chaque examen en cliquant sur le lien correspondant.</p>
    
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>code</th>
            <th>annees</th>
            <th>periode</th>
            <th>statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="9" class="text-center py-4">
              <div class="d-flex flex-column align-items-center">
                <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" />
              </div>
              <div class="text-pr">Aucune donnée</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';


</script>