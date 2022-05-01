module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true
    },
    parser: 'vue-eslint-parser',
    extends: [
        'plugin:vue/essential',
        'standard',
        // 清除template中的空格
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: [
        'vue',
        '@typescript-eslint'
    ],
    rules: {
    // 0,1,2
    // off warn error
        'vue/no-multiple-template-root': 'off',
        // 解决let被强转为const问题
        'prefer-const': 0,
        // 保存代码时缩进4个空格
        indent: ['error', 4],
        // 要求或禁止末尾逗号
        'comma-dangle': [2, 'never'],
        '@typescript-eslint/no-var-requires': 0,
        'vue/multi-word-component-names': 0
    }
}
