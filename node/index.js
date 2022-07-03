const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createDatabase = `CREATE TABLE IF NOT EXISTS people(
    id int not null auto_increment, name VARCHAR(255), primary key(id))`
  connection.query(createDatabase)

console.log('Created table')

generatedName = 'Thiago' + Math.floor(Math.random() * 1000).toString();

const sql = `INSERT INTO people(name) values('` +generatedName+`')`
connection.query(sql)
//connection.end()


app.get('/', (req, res) => {
    html = '<h1>Full Cycle</h1>'
  
    connection.query('SELECT name FROM people', function(err, rows, fields) {
      if (rows.length > 0) {
        html += '<div>Names:</div>'
        html += '<ol>'
        for(item = 0; item < rows.length; item++) {
          html += '<li>' + rows[item]['name'] + '</li>'
        }
        html += '</ol>'
      }
  
      res.send(html)
    })
  })

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})