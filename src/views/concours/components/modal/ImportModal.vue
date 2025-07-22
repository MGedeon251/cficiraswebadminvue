<template>
  <a-modal
    v-model:visible="visible"
    title="Importer des candidats"
    :ok-button-props="{ disabled: !preview.length }"
    ok-text="Importer"
    cancel-text="Annuler"
    @ok="submit"
    @cancel="close"
  >
    <a-upload-dragger
      :beforeUpload="handleFile"
      accept=".xlsx,.xls,.csv"
      :showUploadList="false"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined />
      </p>
      <p class="ant-upload-text">
        Cliquez ou glissez un fichier pour l'importer
      </p>
      <p class="ant-upload-hint">Seuls les fichiers .csv ou Excel sont acceptés.</p>
    </a-upload-dragger>

    <a-table
      class="mt-4"
      :columns="columns"
      :dataSource="preview"
      :pagination="{ pageSize: 5 }"
      rowKey="id"
      v-if="preview.length"
    />
  </a-modal>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import * as XLSX from 'xlsx'
import { InboxOutlined } from '@ant-design/icons-vue'

const emit = defineEmits(['submit', 'close'])

const visible = ref(false)
const preview = ref([])
const candidats = ref([])

const columns = [
  { title: 'Nom', dataIndex: 'nom', key: 'nom' },
  { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
  { title: 'Téléphone', dataIndex: 'tel', key: 'tel' },
]

const show = () => {
  visible.value = true
}
const close = () => {
  visible.value = false
  preview.value = []
  candidats.value = []
  emit('close')
}
const submit = () => {
  emit('submit', candidats.value)
  close()
}

const handleFile = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json(sheet)
    candidats.value = rows.map((item, idx) => ({
      id: idx + 1,
      ...item
    }))
    preview.value = candidats.value
  }
  reader.readAsArrayBuffer(file)
  return false
}

defineExpose({ show })
</script>
