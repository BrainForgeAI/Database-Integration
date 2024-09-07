import express from 'express';
import userRouter from './src/routers/userRouter.js';
import gameRouter from './src/routers/gameRouter.js';

const app = express();
const port = process.env.API_PORT;

app.get('/', (req, res) => {
    res.send('Welcome to the API root!');
});

app.use(express.json());
app.use('/aspectus/users', userRouter);
app.use('/aspectus/game', gameRouter);
 
app.listen(port, () => {
    console.log(`Server is running on port ${port}. It is available on http://localhost:${port}`);
});