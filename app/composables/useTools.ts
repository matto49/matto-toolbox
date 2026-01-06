export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  route: string
  category: string
}

export const useTools = () => {
  const tools = ref<Tool[]>([
    {
      id: 'json-yaml',
      name: 'JSON/YAML 转换',
      description: 'JSON 和 YAML 格式的相互转换与验证。',
      icon: 'i-lucide-file-json-2',
      route: '/tools/json-yaml',
      category: 'Developer'
    },
    {
      id: 'unix-timestamp',
      name: 'Unix 时间戳',
      description: 'Unix 时间戳与日期时间的相互转换。',
      icon: 'i-lucide-clock',
      route: '/tools/unix-timestamp',
      category: 'Utility'
    }
  ])

  const selectedTool = ref<Tool | null>(null)

  const getToolsByCategory = (category: string) => {
    return tools.value.filter(tool => tool.category === category)
  }

  return {
    tools: readonly(tools),
    selectedTool: readonly(selectedTool),
    getToolsByCategory
  }
}
