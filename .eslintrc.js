module.exports = {
  extends: ['mints'],

  parserOptions: {
    project: [
      './tsconfig.json',
      './tsconfig.node.json',
      './examples/request-demo/tsconfig.json',
      './examples/request-demo/tsconfig.node.json',
    ],
  },
};
