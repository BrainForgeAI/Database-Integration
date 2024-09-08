import cors from 'cors'
import express from 'express';
import userRouter from './src/routers/userRouter.js';
import gameRouter from './src/routers/gameRouter.js';

// Initialize application and ports
const app = express();
const port = process.env.CONTAINER_PORT;
const host = process.env.HOST_PORT;

app.use(cors())
app.use(express.json());
app.use('/aspectus/users', userRouter);
app.use('/aspectus/game', gameRouter);
 
app.listen(port, () => {
    console.log(`Server is running on port ${port} inside the docker container`);
    console.log(`Application can be accessed through web with http://localhost:${host}/aspectus/`)
});