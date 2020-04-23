const config = {
  language : {
    default : 'pt-BR',
    loaded : [
      { id : 1, code : 'en-US' },
      { id : 2, code : 'es-ES' },
      { id : 3, code : 'pt-BR' }
    ]
  },
  db : {
    settings : {
      database: 'taxo',
      host : 'localhost',
      password : '',
      port : 5432,
      user : 'taxo',
    }
  }
}
module.exports = { config };