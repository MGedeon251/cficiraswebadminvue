<script setup>
import sidebar from '@/components/Header.vue'
</script>

<template>
    <div>
    <sidebar>
      <div class="row">
        <h2>Preferences </h2>
                  <p>Control over your Kaggle account and all communications</p>
              <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body dashboard-tabs p-0">
                  <ul class="nav nav-tabs px-4" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" id="overview-tab" data-bs-toggle="tab" href="#compte" role="tab" aria-controls="overview" aria-selected="true">Compte</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="sales-tab" data-bs-toggle="tab" href="#notification" role="tab" aria-controls="sales" aria-selected="false">Notification</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="purchases-tab" data-bs-toggle="tab" href="#purchases" role="tab" aria-controls="purchases" aria-selected="false">Semestre 2</a>
                    </li>
                  </ul>
                  <div class="tab-content py-0 px-0">
                    <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                        <div class="d-flex flex-wrap justify-content-xl-between">
                          <div class="card-body">
                            <h4 class="card-title">Tout les examens </h4>
                            <p class="card-description"></p>
                            <div v-if="loading" class="skeleton-loader">
                              <div class="skeleton-item" v-for="i in 5" :key="i"></div>
                            </div>
                            <div v-else class="mt-3">
                              <h5>Your email address</h5>
                              <p>{{ email }}</p>
                              <button class="btn btn-secondary">Change email</button>

                              <h5 class="mt-4">Phone verification</h5>
                              <p>Your account is not verified. Verifying your account with a phone number allows you to do more on Kaggle, and helps prevent spam and other abuse.</p>
                              <button class="btn btn-primary">Phone verify</button>

                              <h5 class="mt-4">Identity verification</h5>
                              <p>You have not verified your identity using Persona, a trusted 3rd-party service. Verifying your identity allows you to join competitions that require identity verification.</p>
                              <button class="btn btn-primary">Verify my account</button>

                              <h5 class="mt-4">Theme</h5>
                              <div class="col-md-4">
                                <p>Check out our new beta dark mode by choosing your Kaggle UI theme below.</p>
                              <select class="form-select" v-model="selectedTheme">
                                <option value="light">Light theme</option>
                                <option value="dark">Dark theme</option>
                              </select>
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

<script>
export default {
  name: "Setting",
  data() {
    return {
      email: "gedeon.lekounda@gmail.com",
      selectedTheme: "light",
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>
<style scoped>
.container {
  max-width: 800px;
}
.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.skeleton-item {
  height: 20px;
  background: #f3f3f3;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}
@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
</style>