module.exports = {
  extends: ['next/core-web-vitals', 'plugin:import/recommended', 'prettier'],
  plugins: ['boundaries'],
  rules: {
    'jsx-a11y/alt-text': 'off',
    'react/display-name': 'off',
    'react/no-children-prop': 'off',
    '@next/next/no-img-element': 'off',
    '@next/next/no-page-custom-font': 'off',
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'any', prev: 'export', next: 'export' },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['function', 'multiline-const', 'multiline-block-like'],
      },
      {
        blankLine: 'always',
        prev: ['function', 'multiline-const', 'multiline-block-like'],
        next: '*',
      },
    ],
    'newline-before-return': 'error',
    'import/newline-after-import': ['error', { count: 1 }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          ['internal', 'parent', 'sibling', 'index'],
          ['object', 'unknown'],
        ],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: 'next/**', group: 'external', position: 'before' },
          { pattern: '~/**', group: 'external', position: 'before' },
          { pattern: '@/**', group: 'internal' },
        ],
        pathGroupsExcludedImportTypes: ['react', 'type'],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    'boundaries/no-unknown': ['error'],
    'boundaries/no-unknown-files': ['error'],
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: ['shared'],
            allow: ['shared'],
          },
          {
            from: ['feature'],
            allow: [
              'shared',
              'store',
              ['feature', { featureName: '${from.featureName}' }],
            ],
          },
          {
            from: ['app', 'neverImport'],
            allow: ['shared', 'feature','store'],
          },
          {
            from: ['app'],
            allow: [['app', { fileName: '*.{css,tsx,ts}' }, ]],
          },
          {
            from: ['store'],
            allow: ['feature','store'],
          },
        ],
      },
    ],
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: { project: './jsconfig.json' },
    },
    'boundaries/include': ['src/**/*'],
    'boundaries/elements': [
      {
        mode: 'full',
        type: 'shared',
        pattern: [
          'src/components/**/*',
          'src/db/**/*',
          'src/hooks/**/*',
          'src/lib/**/*',
          'src/types/**/*',
          'src/utils/**/*',
        ],
      },
      {
        mode: 'full',
        type: 'store',
        pattern: ['src/store/**/*'],
      },
      {
        mode: 'full',
        type: 'feature',
        capture: ['featureName'],
        pattern: ['src/features/*/**/*'],
      },
      {
        mode: 'full',
        type: 'app',
        capture: ['_', 'fileName'],
        pattern: ['src/app/**/*'],
        allow: ['src/app/**-provider.tsx'],
      },
      {
        mode: 'full',
        type: 'neverImport',
        pattern: ['src/*'],
      },
    ],
  },
}
