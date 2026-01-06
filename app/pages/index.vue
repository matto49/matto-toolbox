<script setup lang="ts">
const { tools } = useTools()

useSeoMeta({
  title: '首页',
  description: '实用的开发者工具集合。'
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-cyan-100/50 to-transparent pointer-events-none" />
      <UContainer>
        <h1 class="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 animate-pulse-slow">
          matto的工具箱
        </h1>
        <p class="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
          开发妙妙小工具
        </p>
      </UContainer>
    </section>

    <!-- Tools Grid -->
    <section class="pb-20">
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="tool in tools"
            :key="tool.id"
            :to="tool.route"
            class="group relative bg-white border border-slate-200 rounded-xl p-6 hover:bg-slate-50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/30"
          >
            <div class="mb-4 w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
              <UIcon
                :name="tool.icon"
                class="w-6 h-6 text-cyan-500"
              />
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
              {{ tool.name }}
            </h3>
            <p class="text-slate-500 text-sm">
              {{ tool.description }}
            </p>
          </NuxtLink>
        </div>
      </UContainer>
    </section>
  </div>
</template>
