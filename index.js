import express, { request, response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import Student from './models/student.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRoute.js';
import jwt, { decode } from 'jsonwebtoken';
import orderRouter from './routes/orderRouter.js';
// mongodb+srv://admin:123@cluster0.bjxqvw0.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0

const app = express();
app.use(bodyParser.json());

app.use((request, response, next) => {
    const tokenString = request.headers["authorization"]
    if (tokenString != null) {
        const token = tokenString.replace("Bearer ", "");
        // console.log(token)
        jwt.verify(token, "cbc-batch-five#@2025", (error, decoded) => {
            if (decoded != null) {
                console.log(decoded)
                request.user = decoded; // Store the decoded token in the request object
                next(); // Call next to continue to the next middleware or route handler
            } else {
                console.log("Invalid token");
                response.status(403).json({
                    message: 'Invalid token'
                });
            }
        });
    }
    else {
        next()
    }
});
mongoose.connect('mongodb+srv://admin:123@cluster0.bjxqvw0.mongodb.net/dev?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });


app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);

// app.get('/', (request, response) => {
//     Student.find()
//         .then((data) => {
//             response.json(data)
//         })

// });



// app.post('/', (request, response) => {
//     console.log(request.body);




//     const student = new Student({
//         name: request.body.name,
//         age: request.body.age,
//         stream: request.body.stream,
//         email: request.body.email
//     })

//     student.save()
//         .then(() => {
//             response.json({
//                 message: 'Student added successfully'
//             })
//         })
//         .catch(() => {
//             response.json({
//                 message: 'Error adding student'
//             })
//         })
// })

// app.put('/', (request, response) => {
//     console.log(request.body);
// });

// app.delete('/', (request, response) => {
//     console.log('This is delete request');
// });
function successfullyStarted() {
    console.log('Server is running successfully in port 3000');
}
app.listen(3000, successfullyStarted)