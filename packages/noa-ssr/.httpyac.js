// https://httpyac.github.io/
module.exports = {
  defaultHeaders: {
    // 键和值都需要是string类型
    // 键需要以x-开头，标明是一个自定义header
    'x-test': '1',
  },
  environments: {
    $shared: {
    },
    dev: {
      host: 'http://localhost:9393',
    },
    prod: {
      host: 'http://localhost:9393',
    },
  },
}
