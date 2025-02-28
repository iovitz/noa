// https://httpyac.github.io/
module.exports = {
  defaultHeaders: {
    // 键和值都需要是string类型
    // 键需要以x-开头，标明是一个自定义header
    'x-noa-test': '1',
    'Cookie': 'session=59d52058-cd57-49a4-a316-502718486946',
  },
  environments: {
    $shared: {
    },
    dev: {
      host: 'http://107.175.62.143:19001',
    },
    prod: {
      host: 'http://localhost:19001',
    },
  },
}
