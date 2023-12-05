import { pool } from '../../database/conexion.js';

export const RegistrarElemento = async (req, res) => {
    try {
        const { codigo_elemento, nombre_elemento, stock, tipo_elemento, fecha_vancimiento, fk_categoria, tipo_empaque, unidad_medida } = req.body;

        const sql = `INSERT INTO elementos (codigo_elemento, nombre_elemento, stock, tipo_elemento, fecha_vancimiento, fk_categoria, tipo_empaque, unidad_medida)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [codigo_elemento, nombre_elemento, stock, tipo_elemento, fecha_vancimiento, fk_categoria, tipo_empaque, unidad_medida];

        const [rows] = await pool.query(sql, values);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Se registró con éxito el elemento" });
        } else {
            return res.status(403).json({ "message": "Elemento no registrado" });
        }
    } catch (e) {
        return res.status(500).json({ "message": `Error en el servidor: ${e.message}` });
    }
};

export const listarElementos = async(req,res)=> {

    try{
        const [result] = await pool.query('select * from elementos');
        
        if(result.length>0){
            return res.status(200).json(result); 
        } else {
            return res.status(404).json({'message': 'No se econtró elementos'});
        }
        
    }catch(e){
        return res.status(500).json({'message': 'error' + e});
    }

};

export const BuscarElemento = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `select * from elementos where codigo_elemento = ?`;
        let [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return res.status(200).json({ "message": "Elemento encontrado con éxito", "Elemento": rows[0] });
        } else {
            return res.status(404).json({ "message": "Elemento no encontrado" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
};

export const Actualizarelemento = async (req, res) => {
    try {
        let id = req.params.id;
        let { codigo_elemento, nombre_elemento, stock, tipo_elemento, fecha_vancimiento, fk_categoria, tipo_empaque, unidad_medida } = req.body;
        let sql = `
            UPDATE elementos
            SET codigo_elemento = ?,
                nombre_elemento = ?,
                stock = ?,
                tipo_elemento = ?,
                fecha_vancimiento = ?,
                fk_categoria = ?,
                tipo_empaque = ?,
                unidad_medida = ?
            WHERE codigo_elemento = ?
        `;
        let [rows] = await pool.query(sql, [codigo_elemento, nombre_elemento, stock, tipo_elemento, fecha_vancimiento, fk_categoria, tipo_empaque, unidad_medida, id]);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Elemento actualizado con éxito" });
        } else {
            return res.status(404).json({ "message": "Elemento no encontrado" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
};

export const EliminarElemento = async(req, res) => {

    try {
    let id = req.params.id;
    let sql = `delete from elementos where codigo_elemento = ${id}`;
    let[rows] = await pool.query(sql);

        if(rows.affectedRows > 0) {
            return res.status(200).json({"message": "Elemento elminado con éxito"});
        } else {
            return res.status(403).json({"message": "Elemento no eliminado"});
        }
    }catch(e) {
        return res.status(500).json({"message": e.message});
    }
};


