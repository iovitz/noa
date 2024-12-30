// https://httpyac.github.io/
module.exports = {
  defaultHeaders: {
    // 键和值都需要是string类型
    // 键需要以x-开头，标明是一个自定义header
    'x-test': '1',
    'Cookie': 'session=80e48237-10d2-458a-a193-07264ed9d2dd',
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
