import { pool } from '../../database/conexion.js';

export const RegistrarDetalle = async (req, res) => {
    try {
        const { codigo_detalleUbi, sector, ubicacion_especifica, fk_elemento, fk_bodega } = req.body;

        const sql = `INSERT INTO detalle_ubicacion (codigo_detalleUbi, sector, ubicacion_especifica, fk_elemento,fk_bodega)
                     VALUES (?, ?, ?, ?, ?)`;
        const values = [codigo_detalleUbi, sector, ubicacion_especifica, fk_elemento, fk_bodega];

        const [rows] = await pool.query(sql, values);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Se registró con éxito el detalle de ubicación" });
        } else {
            return res.status(403).json({ "message": "detalle de ubicación no registrado" });
        }
    } catch (e) {
        return res.status(500).json({ "message": `Error en el servidor: ${e.message}` });
    }
};

export const listardetalles = async(req,res)=> {

    try{
        const [result] = await pool.query('select * from detalle_ubicacion');
        
        if(result.length>0){
            return res.status(200).json(result); 
        } else {
            return res.status(404).json({'message': 'No se econtró detalles de ubicación'});
        }
        
    }catch(e){
        return res.status(500).json({'message': 'error' + e});
    }

};

export const BuscarDetalle = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `select * from detalle_ubicacion where codigo_detalleUbi = ?`;
        let [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return res.status(200).json({ "message": "Detalle de ubicación encontrado con éxito", "Elemento": rows[0] });
        } else {
            return res.status(404).json({ "message": "Detalle de ubicación no encontrado" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
};

export const ActualizarDetalle = async (req, res) => {
    try {
        let id = req.params.id;
        let { codigo_detalleUbi, sector, ubicacion_especifica, fk_elemento, fk_bodega  } = req.body;
        let sql = `
            UPDATE detalle_ubicacion
            SET codigo_detalleUbi = ?,
            sector = ?,
            ubicacion_especifica = ?,
            fk_elemento = ?,
            fk_bodega = ?
            WHERE codigo_detalleUbi = ?
        `;
        let [rows] = await pool.query(sql, [codigo_detalleUbi, sector, ubicacion_especifica, fk_elemento, fk_bodega, id]);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Detalle de ubicacion actualizado con éxito" });
        } else {
            return res.status(404).json({ "message": "Detalle de ubicacion no encontrado" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
};

export const EliminarDetalle = async(req, res) => {

    try {
    let id = req.params.id;
    let sql = `delete from detalle_ubicacion where codigo_detalleUbi = ${id}`;
    let[rows] = await pool.query(sql);

        if(rows.affectedRows > 0) {
            return res.status(200).json({"message": "Detalle de ubicación elminado con éxito"});
        } else {
            return res.status(403).json({"message": "Detalle de ubicación no eliminado"});
        }
    }catch(e) {
        return res.status(500).json({"message": e.message});
    }
};
