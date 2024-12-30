// https://httpyac.github.io/
module.exports = {
  defaultHeaders: {
    // 键和值都需要是string类型
    // 键需要以x-开头，标明是一个自定义header
    'x-test': '1',
    'Cookie': 'session=e7017f49-f845-44f7-82bf-9d1460efae56',
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
