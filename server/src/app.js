const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const JWT_SECRET = 'saljdflkajflkajldkfsa'
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', () => {
    console.log("testing")
})

const orderData = [{
    Id: "1",
    Products: ["P1", "P2"]
},
{
    Id: "2",
    Products: ["P2", "P3"]
}
]

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")?.[1]

    const decoded = jwt.verify(token, JWT_SECRET)

    if (!decoded || decoded.email !== 'admin@gmail.com') {
        res.status(401).json({ message: 'Invalid or Expired token' })
    }

    next()
}

app.get('/orders', authenticate, (req, res) => {
    res.status(200).json({ data: orderData })
})

app.post('/orders', (req, res) => {
    const { Products } = req.body

    if (!Products) {
        res.status(422).json("Invalid Params")
        return
    }

    orderData.push({
        Products,
        Id: orderData.length
    })

    res.status(200).json({ message: "Order is successfully created"})
})

app.put('/orders/:id/products', (req, res) => {
    const { Products } = req.body
    const { id } = req.query

    if (!Products) {
        res.status(422).json("Invalid payload")
        return
    }

    const isIdMatch = false

    for (let order of orderData) {
        if (order.Id === id) {
            order.Products = Products
            isIdMatch = true
            break;
        }
    }

    if (!isIdMatch) {
        res.status(404).json({ message: 'Order not found!'})
        return
    }

    res.status(200).json({ message: 'Product updated successfully'})
    
})

app.post('/login', (req, res) => {
    console.log({data: req.body})
    const { email, password } = req.body

    if (!email || !password) {
        res.json("Invalid Parameters")
        return
    }

    if (email === 'admin@gmail.com' && password === "password") {
        const payload = {
            email
        }
        const sessionToken = jwt.sign(payload, JWT_SECRET)

        res.status(200).json({ message: "User login successfully", data: {
            token: sessionToken
        }})
    } else {
        res.status(401).json("Invalid Credentials")
    }
})

app.listen(8000, () => {
    console.log("server is up")
})