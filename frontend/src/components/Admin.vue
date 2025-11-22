<script setup lang="ts">
import { ref } from 'vue';
import { requestUploadUrl, savePhotoMeta } from '../api';

const PASSWORD = 'changeme';
const authed = ref(false);
const uploading = ref(false);
const form = ref({
  title: '',
  description: '',
  tags: '',
  location: '',
  shootDate: '',
  file: null as File | null,
  isPublic: true,
});

const message = ref('');

function login(password: string) {
  authed.value = password === PASSWORD;
  message.value = authed.value ? '' : 'Wrong password';
}

async function onSubmit() {
  if (!form.value.file) {
    message.value = 'Choose a file first';
    return;
  }
  uploading.value = true;
  message.value = '';
  try {
    const upload = await requestUploadUrl(form.value.file.name, form.value.file.type);
    await fetch(upload.uploadUrl, {
      method: 'PUT',
      body: form.value.file,
      headers: {
        'Content-Type': form.value.file.type,
      },
    });
    await savePhotoMeta({
      photoId: upload.photoId,
      title: form.value.title,
      description: form.value.description,
      tags: form.value.tags ? form.value.tags.split(',').map((t) => t.trim()) : [],
      location: form.value.location,
      shootDate: form.value.shootDate,
      s3Key: upload.s3Key,
      isPublic: form.value.isPublic,
    });
    message.value = 'Uploaded and saved!';
    form.value = { title: '', description: '', tags: '', location: '', shootDate: '', file: null, isPublic: true };
  } catch (err) {
    console.error(err);
    message.value = 'Upload failed';
  } finally {
    uploading.value = false;
  }
}
</script>

<template>
  <div class="card">
    <h1 class="text-xl font-bold mb-4">Admin</h1>
    <div v-if="!authed" class="space-y-2">
      <p>Enter admin password:</p>
      <input type="password" @keyup.enter="login(($event.target as HTMLInputElement).value)" />
      <button class="btn" @click="login(($event.target as HTMLButtonElement).previousElementSibling?.value || '')">Login</button>
      <p class="text-red-500">{{ message }}</p>
    </div>
    <div v-else class="space-y-3">
      <label class="block">
        <span>Title</span>
        <input class="w-full" v-model="form.title" />
      </label>
      <label class="block">
        <span>Description</span>
        <textarea class="w-full" rows="3" v-model="form.description"></textarea>
      </label>
      <label class="block">
        <span>Tags (comma separated)</span>
        <input class="w-full" v-model="form.tags" />
      </label>
      <label class="block">
        <span>Location</span>
        <input class="w-full" v-model="form.location" />
      </label>
      <label class="block">
        <span>Shoot Date</span>
        <input type="date" v-model="form.shootDate" />
      </label>
      <label class="block">
        <span>Public?</span>
        <input type="checkbox" v-model="form.isPublic" />
      </label>
      <label class="block">
        <span>Photo File</span>
        <input type="file" accept="image/*" @change="form.file = ($event.target as HTMLInputElement).files?.[0] || null" />
      </label>
      <button class="btn" :disabled="uploading" @click="onSubmit">{{ uploading ? 'Uploading...' : 'Upload' }}</button>
      <p>{{ message }}</p>
    </div>
  </div>
</template>
