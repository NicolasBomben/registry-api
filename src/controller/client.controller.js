import { pool } from "../config/db.js";

export const getAllClients = async (req, res) => {
  try {
    const [clienteObtenido] = await pool.query("SELECT * FROM cliente");
    res.json(clienteObtenido);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "No se pudieron obtener los clientes." });
  }
};

export const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const [obtenerId] = await pool.query(
      "SELECT * FROM cliente WHERE id = ? ",
      [id]
    );

    if (obtenerId.length <= 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(obtenerId[0]);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Internal server problems we cannot process the request",
      });
  }
};

export const createClient = async (req, res) => {
     try{
        const { nombre, apellido } = req.body;

        //check if nombre and apellido are provided.
        if(!nombre || !apellido){
            return res.status(400).json({ message: "Nombre y apellido son requeridos"});
        }

        const [newClient] = await pool.query('INSERT INTO cliente (nombre, apellido) VALUES (? , ?)', [nombre, apellido]);
        res.status(201).json({ message: "Client created", id: newClient.insertId});

     }catch(error){
        return res.status(500).json({ message: "Cannot create client"});
     }
};

export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM cliente WHERE id = ?", [id]);
    
        if (rows.affectedRows <= 0) {
          return res.status(404).json({ message: "Client not found" });
        }
    
        res.sendStatus(204);
      } catch (error) {
        return res.status(500).json({ message: "Internal server problems we cannot process the request" });
      }
};

export const updateClient = async (req, res) => {
    try{
        const { id } = req.params;
        const { nombre, apellido } = req.body;
    
        const [clientUpdated] = await pool.query('UPDATE cliente SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido) WHERE id = ?', [nombre, apellido, id]);
    
        if(clientUpdated.affectedRows === 0){
            return res.status(404).json({message: "Client not found"});
        }   

        const [rows] = await pool.query('SELECT * FROM cliente WHERE id = ?', [id]);
        res.json(rows[0]);
    }catch(error){
        return res.status(500).json({message: "Internal server problems we cannot process the request"})
    }
    
}

