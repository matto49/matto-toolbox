<script setup lang="ts">
const service = new JsonYamlService()
const input = ref('')
const output = ref('')
const conversionType = ref<'json-to-yaml' | 'yaml-to-json'>('json-to-yaml')
const error = ref('')

const convert = () => {
  error.value = ''
  if (!input.value.trim()) {
    output.value = ''
    return
  }

  let result
  if (conversionType.value === 'json-to-yaml') {
    result = service.jsonToYaml(input.value)
  } else {
    result = service.yamlToJson(input.value)
  }

  if (result.success) {
    output.value = result.output
  } else {
    error.value = result.error || 'Conversion failed'
  }
}

// Watch for type change to re-convert if input exists
watch(conversionType, () => {
  if (output.value && !error.value) {
    // Swap input and output if valid
    input.value = output.value
    convert()
  } else {
    convert()
  }
})

const copyToClipboard = async () => {
  if (output.value) {
    await navigator.clipboard.writeText(output.value)
    // Toast notification could be added here
  }
}

useSeoMeta({
  title: 'JSON/YAML 转换器',
  description: '在 JSON 和 YAML 格式之间进行转换。'
})
</script>

<template>
  <div class="py-10">
    <UContainer>
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">
          JSON ↔ YAML 转换器
        </h1>
        <p class="text-slate-500">
          在浏览器中安全地进行 JSON 和 YAML 格式转换。
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)] min-h-[500px]">
        <!-- Input -->
        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <label class="text-sm font-medium text-slate-600">输入 ({{ conversionType === 'json-to-yaml' ? 'JSON' : 'YAML' }})</label>
            <div class="flex gap-2">
              <UButton
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-arrow-left-right"
                @click="conversionType = conversionType === 'json-to-yaml' ? 'yaml-to-json' : 'json-to-yaml'"
              >
                切换方向
              </UButton>
            </div>
          </div>
          <textarea
            v-model="input"
            class="flex-grow w-full bg-white border border-slate-200 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none text-slate-900 placeholder-slate-400"
            placeholder="在此粘贴代码..."
            @input="convert"
          />
        </div>

        <!-- Output -->
        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <label class="text-sm font-medium text-slate-600">输出 ({{ conversionType === 'json-to-yaml' ? 'YAML' : 'JSON' }})</label>
            <UButton
              size="xs"
              color="neutral"
              variant="ghost"
              icon="i-lucide-copy"
              @click="copyToClipboard"
            >
              复制
            </UButton>
          </div>
          <div class="relative flex-grow">
            <textarea
              v-model="output"
              readonly
              class="w-full h-full bg-slate-50 border border-slate-200 rounded-lg p-4 font-mono text-sm focus:outline-none resize-none text-slate-900"
              :class="{ 'border-red-500/50 bg-red-50': error }"
            />
            <div
              v-if="error"
              class="absolute bottom-4 left-4 right-4 bg-red-100 border border-red-200 text-red-600 p-3 rounded text-xs"
            >
              {{ error }}
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
