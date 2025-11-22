<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="shadow bg-white mb-4">
      <div class="max-w-5xl mx-auto py-4 px-4 flex justify-between items-center">
        <router-link to="/" class="font-bold text-xl">Photo Portfolio</router-link>
        <nav class="space-x-4 text-sm">
          <router-link to="/">Home</router-link>
          <router-link to="/admin">Admin</router-link>
        </nav>
      </div>
    </header>
    <main class="max-w-5xl mx-auto px-4 pb-10">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
header a {
  color: #1f2937;
  text-decoration: none;
}
header a.router-link-active {
  font-weight: 700;
}
</style>
