module.exports = {
  apps: [
    {
      name: 'constituyentes',
      port: '3004',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
