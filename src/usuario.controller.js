import pool from './../database/conexion'

export const RegistrarUsuario = async(req,res)=> {
    try {
    let { nombreUsuario, idUsuario, rolUsuario, correoUsuario, telefonoUsuario,estadoUsuario } =req.body;
    let sql = `insert into registrarusuario (nombreUsuario,idUsuario,rolUsuario, correoUsuario, telefonoUsuario,estadoUsuario)
               values ('${nombreUsuario}','${idUsuario}','${rolUsuario}', '${correoUsuario}', '${telefonoUsuario}', '${estadoUsuario}')`;

        let [rows] = await pool.query(sql);
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
        const [result] = await pool.query('select * from registrarusuario');
        
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
        let sql = `select * from registrarusuario where id = ?`;
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
    let sql = `delete from registrarusuario where id = ${id}`;
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
        let { nombreUsuario, idUsuario, rolUsuario,  correoUsuario, telefonoUsuario} =req.body;
        let sql = `
            UPDATE registrarusuario
            SET  nombreUsuario = ?,
                idUsuario = ?,
                rolUsuario = ?,
                correoUsuario = ?,
                telefonoUsuario = ?
               
            WHERE id = ?
        `;
        let [rows] = await pool.query(sql, [ nombreUsuario, idUsuario, rolUsuario,  correoUsuario, telefonoUsuario, id]);

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
        let {estadoUsuario} =req.body;
        let sql = `
            UPDATE registrarusuario
            SET estadoUsuario = ?
            WHERE id = ?
        `;
        let [rows] = await pool.query(sql, [estadoUsuario, id]);

            if (rows.affectedRows > 0) {
                return res.status(200).json({ "message": "Estado del Usuario actualizado con éxito" });
            } else {
                return res.status(404).json({ "message": "Usuario no encontrado" });
            }
    }catch (e) {
        return res.status(500).json({ "message": e.message });
    }

};