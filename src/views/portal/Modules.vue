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
                                <h2>Gestions des modules</h2>
                                <p class="mb-md-0">Unite d'enseignements, Matiere et cours</p>
                            </div>
                        <div class="d-flex">
                            <i class="mdi mdi-home text-muted hover-cursor"></i>
                            <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
                            <p class="text-primary mb-0 hover-cursor">Modules</p>
                        </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-end flex-wrap">
                        <button type="button" class="btn btn-light bg-white btn-icon me-3 d-none d-md-block ">
                            <i class="mdi mdi-filter text-muted"></i>
                        </button>
                       
                        <button type="button" class="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0">
                            <i class=" mdi mdi-file-export text-muted"></i>
                        </button>
                        <button class="btn btn-primary mt-2 mt-xl-0">
                            <span class="">Ajouter modules</span>
                        </button>
            </div>
                    </div>
                </div>
            </div>
        <div class="row">
            <div class="container my-2">
        <!-- Header Section -->
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h4>Products</h4>
        </div>
        <!-- Product Table -->
        <div class="card p-4">
            <div class="d-flex mb-3">
                <button class="btn btn-outline-dark me-2">All</button>
                <button class="btn btn-outline-dark me-2">Active</button>
                <button class="btn btn-outline-dark me-2">Draft</button>
                <button class="btn btn-outline-dark">Archived</button>
            </div>
            <p>Manage your products and view their sales performance.</p>
            <table class="table table-hover align-middle">
                    <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Price</th>
                                <th scope="col">Total Sales</th>
                                <th scope="col">Created At</th>
                                <th scope="col"></th>
                            </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td>Laser Lemonade Machine</td>
                                <td><span class="status-badge status-draft">Draft</span></td>
                                <td>$499.99</td>
                                <td>25</td>
                                <td>2023-07-12 10:42 AM</td>
                                <td><button class="btn btn-sm btn-outline-primary">...</button></td>
                            </tr>
                            <tr>
                                <td>Hypernova Headphones</td>
                                <td><span class="status-badge status-active">Active</span></td>
                                <td>$129.99</td>
                                <td>100</td>
                                <td>2023-10-18 03:21 PM</td>
                                <td><button class="btn btn-sm btn-outline-primary">...</button></td>
                            </tr>
                            <tr>
                                <td>AeroGlow Desk Lamp</td>
                                <td><span class="status-badge status-active">Active</span></td>
                                <td>$39.99</td>
                                <td>50</td>
                                <td>2023-11-29 08:15 AM</td>
                                <td><button class="btn btn-sm btn-outline-primary">...</button></td>
                            </tr>
                            <tr>
                                <td>TechTonic Energy Drink</td>
                                <td><span class="status-badge status-draft">Draft</span></td>
                                <td>$2.99</td>
                                <td>0</td>
                                <td>2023-12-25 11:59 PM</td>
                                <td><button class="btn btn-sm btn-outline-primary">...</button></td>
                            </tr>
                    </tbody>
            </table>
        </div>
    </div>
    <!-- Bootstrap JS --> 
    </div>

        </sidebar>
    </div>
</template>



<style scoped>
        body {
            background-color: #f8f9fa;
            color: #212529;
        }
        .card {
            background-color: #ffffff;
            border: 1px solid #dee2e6;
            border-radius: 12px;
        }
        .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
            color: #fff;
        }
        .btn-primary:hover {
            background-color: #0056b3;
            border-color: #004080;
        }
        .status-badge {
            padding: 0.5em 1em;
            border-radius: 20px;
            font-size: 0.85rem;
            color: #fff;
        }
        .status-draft {
            background-color: #6c757d;
        }
        .status-active {
            background-color: #0d6efd;
        }
        .table thead th {
            border-bottom: 2px solid #dee2e6;
        }
    </style>