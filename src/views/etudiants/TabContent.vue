<script setup>
import { ref, onMounted } from 'vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue'; 
import DropData from './DropData.vue' ; 
import ExportData from './ExportData.vue' ; 
</script>

<template>

    <div class="col-md-12 grid-margin stretch-card">
        <div class="card" id="drop_table">
            <SkeletonLoader v-if="loading" type="card" :rows="3" :columns="1"/>
            <div v-else class="card-body dashboard-tabs p-0">
                <ul class="nav nav-tabs px-4" role="tablist">
                    <li class="nav-item">
                        <a
                            class="nav-link active"
                            id="overview-tab"
                            data-bs-toggle="tab"
                            href="#overview"
                            role="tab"
                            aria-controls="overview"
                            aria-selected="true">Importer</a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            id="sales-tab"
                            data-bs-toggle="tab"
                            href="#sales"
                            role="tab"
                            aria-controls="sales"
                            aria-selected="false">Exporter</a>
                    </li>
                </ul>
                <div class="tab-content py-0 px-0">
                        <div
                            class="tab-pane fade show active"
                            id="overview"
                            role="tabpanel"
                            aria-labelledby="overview-tab">
                                <div class="d-flex flex-wrap justify-content-xl-between">
                                    <DropData></DropData>
                                </div>
                        </div>
                        <div
                            class="tab-pane fade"
                            id="sales"
                            role="tabpanel"
                            aria-labelledby="sales-tab">
                            <div class="d-flex flex-wrap justify-content-xl-between">
                                <div class="card-body">
                                    <h4 class="card-title"></h4>
                                    <ExportData></ExportData>
                                </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
</template>