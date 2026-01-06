<script setup lang="ts">
const service = new UnixTimestampService()
const timestampInput = ref<number | string>(service.getCurrentTimestamp())
const formattedDate = ref('')
const FORMAT = 'yyyy-MM-dd HH:mm:ss'
const error = ref('')

const updateFromTimestamp = () => {
  error.value = ''
  try {
    const ts = Number(timestampInput.value)
    if (isNaN(ts)) throw new Error('Invalid number')

    const result = service.timestampToDate(ts, FORMAT)
    formattedDate.value = result.formattedDate
  } catch {
    formattedDate.value = 'Invalid Timestamp'
    error.value = 'Invalid timestamp format'
  }
}

const updateCurrent = () => {
  timestampInput.value = service.getCurrentTimestamp()
  updateFromTimestamp()
}

// Watchers
watch(timestampInput, updateFromTimestamp, { immediate: true })

// Helpers for datetime-local input binding
const localInputValue = computed(() => {
  let ts = Number(timestampInput.value)
  if (isNaN(ts)) ts = service.getCurrentTimestamp()
  const ms = ts >= 1_000_000_000_000 ? ts : ts * 1000
  const d = new Date(ms)
  const pad = (n: number) => String(n).padStart(2, '0')
  const yyyy = d.getFullYear()
  const MM = pad(d.getMonth() + 1)
  const dd = pad(d.getDate())
  const hh = pad(d.getHours())
  const mm = pad(d.getMinutes())
  const ss = pad(d.getSeconds())
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`
})

const onLocalInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target && target.value) {
    const date = new Date(target.value)
    const ts = Math.floor(date.getTime() / 1000)
    timestampInput.value = ts
  }
}

useSeoMeta({
  title: 'Unix 时间戳转换',
  description: 'Unix 时间戳与日期时间相互转换。'
})
</script>

<template>
  <div class="py-10">
    <UContainer>
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">
          Unix 时间戳转换
        </h1>
        <p class="text-slate-500">
          Unix 时间戳与人类可读日期时间格式的相互转换工具。
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Timestamp -> Date -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-800">
            <UIcon
              name="i-lucide-clock"
              class="text-cyan-500"
            />
            时间戳转日期
          </h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-1">Unix 时间戳</label>
              <div class="flex gap-2">
                <input
                  v-model="timestampInput"
                  type="number"
                  class="flex-grow bg-slate-50 border border-slate-200 rounded p-2 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  placeholder="例如：1672531200"
                />
                <UButton
                  color="neutral"
                  @click="updateCurrent"
                >
                  当前
                </UButton>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100">
              <label class="block text-sm font-medium text-slate-500 mb-1">结果</label>
              <div class="text-2xl font-mono text-cyan-600 break-all">
                {{ formattedDate }}
              </div>
            </div>
          </div>
        </div>

        <!-- Date -> Timestamp -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-800">
            <UIcon
              name="i-lucide-calendar"
              class="text-blue-500"
            />
            日期转时间戳
          </h2>
          <div class="flex flex-col items-center justify-center h-full text-slate-500 text-sm">
            <p>选择日期以获取时间戳</p>
            <input
              type="datetime-local"
              :value="localInputValue"
              step="1"
              class="mt-4 bg-slate-50 border border-slate-200 rounded p-2 text-slate-900 w-full max-w-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              @input="onLocalInput"
            >
            <p class="mt-2 text-xs text-slate-400">
              选择日期将自动更新上方的时间戳。
            </p>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
