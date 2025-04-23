<template>

    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel-2">Départements</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form @submit.prevent="">
                <div class="modal-body">
                    <div class="form-group">
                        <label>Nom</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Nom du département"/>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea
                            class="form-control"
                            placeholder="Une description du département"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success">Submit</button>
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                </div>
            </form>
        </div>
    </div>

</template>

