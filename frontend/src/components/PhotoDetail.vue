<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchPhotoById } from '../api';
import { useRoute } from 'vue-router';

const route = useRoute();
const photo = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  try {
    const data = await fetchPhotoById(route.params.id as string);
    photo.value = data;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="!photo">Not found.</div>
  <div v-else class="card">
    <img :src="`${import.meta.env.VITE_CDN_IMAGES || ''}/${photo.s3Key}`" alt="photo" style="width:100%;max-height:520px;object-fit:contain;" />
    <h1 class="text-2xl font-bold mt-4">{{ photo.title }}</h1>
    <p class="text-slate-700">{{ photo.description }}</p>
    <ul class="text-sm text-slate-600 mt-2 space-y-1">
      <li><strong>Location:</strong> {{ photo.location || '-' }}</li>
      <li><strong>Shoot Date:</strong> {{ photo.shootDate || '-' }}</li>
      <li><strong>Tags:</strong> {{ photo.tags?.join(', ') || '-' }}</li>
    </ul>
  </div>
</template>
