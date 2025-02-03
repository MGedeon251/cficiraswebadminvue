<script setup>
import sidebar from '@/components/Header.vue'
</script>

<template>
    <div>
    <sidebar>
    <div class="row">
                <div class="container my-2">
                    <div class="col-md-12 grid margin stretch-card">
                    <div class="card">
                        <div class="card-body dashboard-tabs">

                    <div>
    <div class="container mt-2">
      <h2>Settings</h2>
      <p>Control over your Kaggle account and all communications</p>

      <ul class="nav nav-tabs px-4" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" href="#">Account</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Notifications</a>
        </li>
      </ul>

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
    </sidebar> 
</div>
</template>

<style scoped>

</style>