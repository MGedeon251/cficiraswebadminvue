<template>
  <div class="row">
    <h4>Liste des filières</h4>
    <p class="text-muted">
       Listes de tout les filière ajoutées jusque là.
    </p>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>code</th>
            <th>designation</th>
            <th>cycle</th>
            <th>credit total</th>
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
