import { pool } from '../../database/conexion.js';

export const RegistrarBodega = async (req, res) => {
    try {
        const { codigo_bodega, ubicacion_bodega, nombre_bodega } = req.body;

        const sql = `INSERT INTO bodegas (codigo_bodega, ubicacion_bodega, nombre_bodega)
                     VALUES (?, ?, ?)`;
        const values = [codigo_bodega, ubicacion_bodega, nombre_bodega];

        const [rows] = await pool.query(sql, values);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Se registró con éxito la Bodega" });
        } else {
            return res.status(403).json({ "message": "Bodega no registrada" });
        }
    } catch (e) {
        return res.status(500).json({ "message": `Error en el servidor: ${e.message}` });
    }
};

export const listarBodegas = async(req,res)=> {

    try{
        const [result] = await pool.query('select * from bodegas');
        
        if(result.length>0){
            return res.status(200).json(result); 
        } else {
            return res.status(404).json({'message': 'No se econtró categorias'});
        }
        
    }catch(e){
        return res.status(500).json({'message': 'error' + e});
    }

};

