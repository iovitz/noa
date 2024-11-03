import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: {
    overrides: {
      'node/prefer-global/process': 'off',
      'ts/consistent-type-imports': 0,
    },
  },
})
