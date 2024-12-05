// https://httpyac.github.io/
module.exports = {
  defaultHeaders: {
    // 键和值都需要是string类型
    // 键需要以x-开头，标明是一个自定义header
    'x-test': '1',
    'Cookie': 'session=11ba8738-7b14-4b93-a65a-bc48c6db61a3',
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
