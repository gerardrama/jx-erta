import express, { Express } from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

const app: Express = express();
const port = 4000;

app.use(cors());

app.use(express.json());

app.get('/', function(req, res){
    res.send("We are online!");
})

// app.use("/api/", userRoutes)

console.table(listEndpoints(app));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});