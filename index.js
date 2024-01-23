import express from 'express'
import bodyParser from 'body-parser';
import appRoutes from './routes/app_routes.js';

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extends: false }));
app.use(appRoutes);


app.get('/', (req, res) => {
    res.send('hello prisma');
});

app.listen(port, () => {
    console.log(`server running at port ${port}`);
});
