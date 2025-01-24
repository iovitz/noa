// https://httpyac.github.io/
module.exports = {
  defaultHeaders: {
    // 键和值都需要是string类型
    // 键需要以x-开头，标明是一个自定义header
    'x-test': '1',
    'Cookie': 'session=637edb06-7bac-4e00-893d-94f05dcb89ac',
  },
  environments: {
    $shared: {
    },
    dev: {
      host: 'http://localhost:19001',
    },
    prod: {
      host: 'http://localhost:19001',
    },
  },
}
