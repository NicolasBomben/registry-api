import { Router } from "express";
import {getAllClients, getClientById, createClient, deleteClient, updateClient} from "../controller/client.controller.js";

const router = Router();

//GET ALL CLIENTES.
router.get('/clientes', getAllClients);
//GET CLIENT BY ID.
router.get('/clientes/:id', getClientById);
//CREATE AN CLIENT.
router.post('/clientes', createClient);
//DELETE AN CLIENT.
router.delete('/clientes/:id', deleteClient);
//UPDATE AN CLIENT. I USE PATCH BECAUSE I ONLY WANT TO UPDATE SPECIFIC CUSTOMER DATA.
router.patch('/clientes/:id', updateClient);

export default router;