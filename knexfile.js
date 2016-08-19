module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/bantaba_development',
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
}
