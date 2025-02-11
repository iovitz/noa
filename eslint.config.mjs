import antfu from '@antfu/eslint-config'

export default antfu({
  react: {
    overrides: {
      'react/prefer-destructuring-assignment': 0,
      'antfu/top-level-function': 0,
    },
  },
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react/no-useless-fragment': 0,
    'no-case-declarations': 0,
  },
  typescript: {
    overrides: {
      'node/prefer-global/process': 'off',
      'ts/consistent-type-imports': 0,
    },
  },
})
