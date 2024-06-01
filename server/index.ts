import express, { Express } from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { testDbConnection } from "./configs/database";
import { projectRoute } from "./routes/projectRoutes";
import { authRoute } from "./routes/authRoutes";
import { taskRoute } from "./routes/taskRoutes";

const app: Express = express();
const port = process.env.PORT;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(projectRoute);
app.use(taskRoute);

app.get('/', function(req, res){
    res.send("We are online!");
})

app.use('/auth', authRoute);

console.table(listEndpoints(app));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    testDbConnection();
});