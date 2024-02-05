const express = require('express')
const app = express()
const mysql = require('mysql')
const port = process.env.PORT || 5001

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get('/',(req,res) => {
    // res.send("Home route");
    res.render('index')
})

const connection = mysql.createConnection({
    host: 'localhost',
    password: '',
    user: 'root',
    database: 'formapp'
})

connection.connect();


connection.query('SELECT * FROM contact', (err,rows) => {
    console.log(rows);
})
app.set('view engine', 'ejs')

app.post('/create-form-data', (req,res) => {
    const {firstname, lastname, message} = req.body
    const SQL = "INSERT INTO contact (first_name, last_name, message) VALUES (?,?,?)"
    connection.query(SQL,[firstname, lastname, message],(err,row) => {
        if(err){
            console.log(err);
           
        }else{
            res.redirect('/?message=successful')
        }
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
} )