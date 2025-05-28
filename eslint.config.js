import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
  {
    rules: {
      'vue/multi-word-component-names': 'off', // 允许组件名称使用单个单词
      'vue/valid-v-for': 'off', // v-for 不校验是否有 key
      '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any 类型
      'vue/block-lang': 'off', // 允许 <script> 和 <style> 无 lang 属性
    },
  },
]
