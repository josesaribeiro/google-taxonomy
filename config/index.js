const config = {
  language : {
    default : 'pt-BR',
    loaded : [
      'pt-BR',
      'en-US',
      'es-ES'
    ]
  },
  db : {
    settings : {
      host : 'localhost',
      port : 5432,
      user : 'taxo',
      password : ''
    }
  }
}
module.exports = { config };