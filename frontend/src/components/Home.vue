<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchPhotos } from '../api';

type Photo = {
  photoId: string;
  title: string;
  description?: string;
  s3Key: string;
  tags?: string[];
};

const photos = ref<Photo[]>([]);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  try {
    const res = await fetchPhotos(1, 50);
    photos.value = res.data || [];
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Latest Photos</h1>
    <p v-if="loading">Loading...</p>
    <div v-else class="grid">
      <article v-for="photo in photos" :key="photo.photoId" class="card">
        <router-link :to="`/photo/${photo.photoId}`">
          <img :src="`${import.meta.env.VITE_CDN_IMAGES || ''}/${photo.s3Key.replace('original/', 'thumb/')}`" alt="thumb" style="width:100%;object-fit:cover;max-height:200px;" />
          <h2 class="mt-2 text-lg font-semibold">{{ photo.title }}</h2>
        </router-link>
        <p class="text-sm text-slate-600" v-if="photo.tags?.length">#{{ photo.tags.join(' #') }}</p>
      </article>
    </div>
  </div>
</template>
