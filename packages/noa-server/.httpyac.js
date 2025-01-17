// https://httpyac.github.io/
module.exports = {
  defaultHeaders: {
    // 键和值都需要是string类型
    // 键需要以x-开头，标明是一个自定义header
    'x-test': '1',
    'Cookie': 'session=6c1967cb-3523-4105-a474-03e6abf9b70b',
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
