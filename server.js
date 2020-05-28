require('./connect')
const express = require('express')
const characters = require('./routes/characters')
const users = require('./routes/users')
const app = express()
const chalk = require("chalk");
const cookieSession = require('cookie-session')
const cors = require('cors')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.static('public'))

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
})
app.use(cookieSession({
    secret: 'secretKey',
    maxAge: 1000 * 1000, // 10s
    sameSite: 'strict',
    httpOnly: true,
    secure: false,
}))

app.get('/index1.html', (req, res, next) => {
    if (req.session.username) {
      next() 
    } else {
        res.status(300).redirect('/index.html')
    }
})

app.use(characters)
app.use('/users', users)





app.listen(3000, () => console.log(chalk.blue("Server is running at: http://localhost:3000")));