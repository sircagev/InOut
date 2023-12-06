import { pool } from '../../database/conexion.js'

export const RegistrarUsuario = async(req,res)=> {
    try {
    let { nombre_usuario, apellido_usuario, rol, email_usuario, numero,contraseña_usuario, ID_ficha } =req.body;
    let sql = `insert into usuarios (nombre_usuario, apellido_usuario, rol, email_usuario, numero,contraseña_usuario, ID_ficha)
               values (?,?,?,?,?,?,?)`;

        let [rows] = await pool.query(sql, [nombre_usuario, apellido_usuario, rol, email_usuario, numero,contraseña_usuario,ID_ficha]);
        if(rows.affectedRows>0){
            return res.status(200).json({"message": "Se registró con éxito el usuairo"});
        }else {
            return res.status(403).json({"message": "Usuario no registrado"});
        }
    }catch(e){
        return res.status(500).json({ "message": e.message });
    }    
};
export const listarUsuario = async(req,res)=> {

    try{
        const [result] = await pool.query('select * from usuarios');
        
        if(result.length>0){
            return res.status(200).json(result); 
        } else {
            return res.status(404).json({'message': 'No se econtraron usuarios'});
        }
        
    }catch(e){
        return res.status(500).json({'message': 'error' + e});
    }

};
export const BuscarUsuario = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `select * from usuarios where id_usuario = ?`;
        let [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return res.status(200).json({ "message": "Usuario encontrado con éxito", "usuario": rows[0] });
        } else {
            return res.status(404).json({ "message": "Usuario no encontrado" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
};

export const EliminarUsuario = async(req, res) => {

    try {
    let id = req.params.id;
    let sql = `delete from usuarios where id_usuario = ${id}`;
    let[rows] = await pool.query(sql);

        if(rows.affectedRows > 0) {
            return res.status(200).json({"message": "Usuario elminado con éxito"});
        } else {
            return res.status(403).json({"message": "Usuario no eliminado"});
        }
    }catch(e) {
        return res.status(500).json({"message": e.message});
    }
};
export const ActualizarUsuario = async(req, res) => {
  
    try {
        let id = req.params.id;
        let { nombre_usuario, apellido_usuario, rol, email_usuario, numero,contraseña_usuario} =req.body;
        let sql = `
            UPDATE usuarios
            SET  nombre_usuario = ?,
            apellido_usuario = ?,
                rol = ?,
                email_usuario = ?,
                numero = ?,
                contraseña_usuario = ?
               
            WHERE id_usuario = ?
        `;
        let [rows] = await pool.query(sql, [ nombre_usuario, apellido_usuario, rol, email_usuario, numero,contraseña_usuario, id]);

            if (rows.affectedRows > 0) {
                return res.status(200).json({ "message": "Usuario actualizado con éxito" });
            } else {
                return res.status(404).json({ "message": "Usuario no encontrado" });
            }
    }catch (e) {
        return res.status(500).json({ "message": e.message });
    }

};

export const EstadoUsuario = async(req, res) => {
  
    try {
        let id = req.params.id;
        let {estado} =req.body;
        let sql = `
            UPDATE usuarios
            SET estado = ?
            WHERE id_usuario = ?
        `;
        let [rows] = await pool.query(sql, [estado, id]);

            if (rows.affectedRows > 0) {
                return res.status(200).json({ "message": "Estado del Usuario actualizado con éxito" });
            } else {
                return res.status(404).json({ "message": "Usuario no encontrado" });
            }
    }catch (e) {
        return res.status(500).json({ "message": e.message });
    }

};