<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-cyan-200 selection:text-cyan-900">
    <header class="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
      <UContainer class="h-16 flex items-center justify-between">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 group"
        >
          <UIcon
            name="i-lucide-box"
            class="w-8 h-8 text-cyan-500 group-hover:text-cyan-600 transition-colors"
          />
          <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
            matto的工具箱
          </span>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink
            to="/"
            class="text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors"
            active-class="text-cyan-600"
          >
            首页
          </NuxtLink>
          <NuxtLink
            to="/tools/json-yaml"
            class="text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors"
            active-class="text-cyan-600"
          >
            JSON/YAML
          </NuxtLink>
          <NuxtLink
            to="/tools/unix-timestamp"
            class="text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors"
            active-class="text-cyan-600"
          >
            时间戳
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2">
          <UButton
            to="https://github.com"
            target="_blank"
            color="neutral"
            variant="ghost"
            icon="i-simple-icons-github"
          />
        </div>
      </UContainer>
    </header>

    <main class="flex-grow relative">
      <!-- Background effects -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      </div>
      <slot />
    </main>
  </div>
</template>
