<script setup lang="ts">
import sidebar from '@/components/Header.vue'
</script>

<template>
    <div>
        <sidebar>
      <div class="row">
              <div class="col-md-12 grid-margin">
                <div class="d-flex justify-content-between flex-wrap">
                  <div class="d-flex align-items-end flex-wrap">
                    <div class="me-md-3 me-xl-5">
                      <h2>Inscriptions</h2>
                      <p class="mb-md-0">Gestion des inscriptions</p>
                    </div>
                    <div class="d-flex">
                      <i class="mdi mdi-home text-muted hover-cursor"></i>
                      <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Inscriptions&nbsp;/&nbsp;</p>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-end flex-wrap">
                  </div>
                </div>
              </div>
      </div>
      <div class="row">
            <div class="col-12 grid-margin">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Large Modal</h4>
                  <p class="card-description">Large sized modal with max-width set to <code>90%</code></p>
                  <!-- Modal starts -->
                  <div class="text-center">
                    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Click for demo<i class="mdi mdi-play-circle ms-1"></i></button>
                  </div>
                  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <p>Modal body text goes here.</p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-success">Submit</button>
                          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Modal Ends -->
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Medium Modal</h4>
                  <p class="card-description">Normal modal with default bootstrap settings</p>
                  <!-- Modal starts -->
                  <div class="text-center">
                    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal-2">Click for demo<i class="mdi mdi-play-circle ms-1"></i></button>
                  </div>
                  <div class="modal fade" id="exampleModal-2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel-2" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel-2">Modal title</h5>
                          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <p>Modal body text goes here.</p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-success">Submit</button>
                          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Modal Ends -->
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Bordered accordions</h4>
                  <p class="card-description">Use class <code>.accordion-bordered</code> for bordered accordions</p>
                  <div class="mt-4">
                    <div class="accordion accordion-bordered" id="accordion-2" role="tablist">
                      <div class="card">
                        <div class="card-header" role="tab" id="heading-4">
                          <h6 class="mb-0">
                            <a data-bs-toggle="collapse" href="#collapse-4" aria-expanded="false" aria-controls="collapse-4">
                              How can I pay for an order I placed?
                            </a>
                          </h6>
                        </div>
                        <div id="collapse-4" class="collapse" role="tabpanel" aria-labelledby="heading-4" data-bs-parent="#accordion-2">
                          <div class="card-body">
                            <p class="mb-0">You can pay for the product you have purchased using credit cards, debit cards, or via online banking. We also provide cash-on-delivery services for most of our products. You can also use your account wallet for payment. </p>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" role="tab" id="heading-5">
                          <h6 class="mb-0">
                            <a class="collapsed" data-bs-toggle="collapse" href="#collapse-5" aria-expanded="false" aria-controls="collapse-5">
                              I can’t sign in to my account
                            </a>
                          </h6>
                        </div>
                        <div id="collapse-5" class="collapse" role="tabpanel" aria-labelledby="heading-5" data-bs-parent="#accordion-2">
                          <div class="card-body">
                              <p>If while signing in to your account you see an error message, you can do the following</p>
                            <ol class="pl-3">
                              <li>Check your network connection and try again</li>
                              <li>Make sure your account credentials are correct while signing in</li>
                              <li>Check whether your account is accessible in your region</li>
                            </ol>
                            <br>
                            <i class="mdi mdi-alert-octagon me-2"></i>If the problem persists, you can contact our support.
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" role="tab" id="heading-6">
                          <h6 class="mb-0">
                            <a class="collapsed" data-bs-toggle="collapse" href="#collapse-6" aria-expanded="true" aria-controls="collapse-6">
                              How can I deactivate my account?
                            </a>
                          </h6>
                        </div>
                        <div id="collapse-6" class="collapse show" role="tabpanel" aria-labelledby="heading-6" data-bs-parent="#accordion-2">
                          <div class="card-body">
                            <p class="mb-0">If you wish to deactivate your account, you can go to the Settings page of your account. Click on Account Settings and then click on Deactivate.
                            You can join again as and when you wish.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

          </div>
        </sidebar>
    </div>
</template>