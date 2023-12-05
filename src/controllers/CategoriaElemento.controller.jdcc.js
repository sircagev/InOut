import { pool } from '../../database/conexion.js';

export const RegistrarCategoria = async (req, res) => {
    try {
        const { codigo_categoria, nombre_categoria } = req.body;

        const sql = `INSERT INTO categoria_elemento (codigo_categoria, nombre_categoria)
                     VALUES (?, ?)`;
        const values = [codigo_categoria, nombre_categoria];

        const [rows] = await pool.query(sql, values);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Se registró con éxito la categoría" });
        } else {
            return res.status(403).json({ "message": "Categoría no registrada" });
        }
    } catch (e) {
        return res.status(500).json({ "message": `Error en el servidor: ${e.message}` });
    }
};

export const listarCategoria = async(req,res)=> {

    try{
        const [result] = await pool.query('select * from categoria_elemento');
        
        if(result.length>0){
            return res.status(200).json(result); 
        } else {
            return res.status(404).json({'message': 'No se econtró categorias'});
        }
        
    }catch(e){
        return res.status(500).json({'message': 'error' + e});
    }

};