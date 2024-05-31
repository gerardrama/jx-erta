import express, { Express } from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import { testDbConnection } from "./configs/database";

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());

app.get('/', function(req, res){
    res.send("We are online!");
})

// app.use("/api/", userRoutes)

console.table(listEndpoints(app));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    testDbConnection();
});