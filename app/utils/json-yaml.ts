import YAML from 'yaml'

export interface ConversionResult {
  success: boolean
  output: string
  error?: string
}

export class JsonYamlService {
  jsonToYaml(jsonString: string): ConversionResult {
    try {
      const parsed = JSON.parse(jsonString)
      const output = YAML.stringify(parsed)
      return { success: true, output }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e)
      return { success: false, output: '', error: message }
    }
  }

  yamlToJson(yamlString: string): ConversionResult {
    try {
      const parsed = YAML.parse(yamlString)
      const output = JSON.stringify(parsed, null, 2)
      return { success: true, output }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e)
      return { success: false, output: '', error: message }
    }
  }

  validateJson(jsonString: string): boolean {
    try {
      JSON.parse(jsonString)
      return true
    } catch {
      return false
    }
  }

  validateYaml(yamlString: string): boolean {
    try {
      YAML.parse(yamlString)
      return true
    } catch {
      return false
    }
  }
}
