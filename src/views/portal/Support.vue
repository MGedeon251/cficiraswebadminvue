<script setup>
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
                                <h2>Gestions & support cours</h2>
                                <p class="mb-md-0">Gestion des etudiants</p>
                            </div>
                        <div class="d-flex">
                            <i class="mdi mdi-home text-muted hover-cursor"></i>
                            <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
                            <p class="text-primary mb-0 hover-cursor">Support</p>
                        </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-end flex-wrap">
                        </div>
                    </div>
                </div> 
            </div>
            <div class="row">
                <div class="container my-2">
                    <div class="col-md-12 grid margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Gestion des cours</h4>
                            <p class="card-description"> </p>
                            <div class="d-flex gap-2 mb-3">
                            </div>
                            <div class="container mt-4">
                                <h2 class="mb-4">File Manager</h2>
                                
                                <div class="d-flex justify-content-between mb-3">
                                    <FileUploader @upload="handleUpload" />
                                </div>
                            
                                <FileTable :files="files" @download="handleDownload" @delete="handleDelete" />
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
  import FileTable from "@/components/FileTable.vue";
  import FileUploader from "@/components/FileUploader.vue";
  
  export default {
    components: { FileTable, FileUploader },
    data() {
      return {
        files: [
          { id: 1, name: "5_dark_support.jpg", date: "20/11/2015", time: "10:11", size: "24,555 KB", type: "JPG" },
          { id: 2, name: "Chart2_recovered.psd", date: "20/11/2015", time: "10:11", size: "24,555 KB", type: "PSD" },
          { id: 3, name: "Doodle_templatemonster.jpg", date: "20/11/2015", time: "10:11", size: "24,555 KB", type: "JPG" },
          { id: 4, name: "Hound-Thumb2-1.png", date: "10/11/2017", time: "19:11", size: "24,555 KB", type: "PNG" },
          { id: 5, name: "Prototip_v1.0", date: "20/11/2015", time: "10:11", size: "24,555 KB", type: "Folder" },
          { id: 6, name: "Video.mp4", date: "21/11/2016", time: "10:11", size: "24,555 KB", type: "MP4" }
        ]
      };
    },
    methods: {
      handleUpload(file) {
        this.files.push(file);
      },
      handleDownload(file) {
        alert(`Downloading ${file.name}`);
      },
      handleDelete(fileId) {
        this.files = this.files.filter(file => file.id !== fileId);
      }
    }
  };
  </script>
  

