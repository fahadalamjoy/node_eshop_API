const express = require('express')
const app = express()
require('dotenv/config')
const api = process.env.API_URl
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')
const productsRouter = require('./routers/products')
const cateoryRouter = require('./routers/category')
const userRouters = require('./routers/user')
const orderRouter = require('./routers/order')
const cors = require('cors')
//middleware
app.use(cors())
app.options('*', cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use(errorHandler)

//routers

app.use(`${api}/products`, productsRouter)
app.use(`${api}/category`, cateoryRouter)
app.use(`${api}/users`, userRouters)
app.use(`${api}/orders`, orderRouter)

app.use('/public/uploads', express.static(__dirname + '/public/uploads'))

//Databases

mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('database connection is ready')
    })
    .catch((err) => console.log(err))

app.listen(3000, () => {
    console.log(api)
    console.log('server is running')
})
