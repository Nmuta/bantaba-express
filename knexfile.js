module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/bantaba_development',
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/bantaba_test',
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  },
}
