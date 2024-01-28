//conexion al servidor.
import express from "express";
const app = express();
const port = 8080;
import clienteRoutes from "./routes/client.routes.js";


//middleware
app.use(express.json());

//routes
app.use('/api', clienteRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "The endpoint you are looking for does not exist."
    })
});

app.listen(port, ()=> {
    console.log(`App running on port: ${port}`);
});