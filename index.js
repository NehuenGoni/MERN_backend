import express from "express"
import dotenv from 'dotenv'
import conectarDB from "./config/db.js"
import cors from 'cors'
import veterinarioRoutes from "./routes/veterinarioRoutes.js"
import pacienteRoutes from "./routes/pacienteRoutes.js"

const app = express()
app.use(express.json())

dotenv.config()

conectarDB()

const whitelist = [process.env.FRONTEND_URL, 'http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const isAllowed = whitelist.some(url => origin.startsWith(url));
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log(`Bloqueado por CORS: ${origin}`);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/veterinarios", veterinarioRoutes)
app.use("/api/pacientes", pacienteRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`servidor funcionando en el puerto ${PORT}`)
})