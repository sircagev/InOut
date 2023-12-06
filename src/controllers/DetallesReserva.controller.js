import { pool } from '../../database/conexion.js'

//Registrar Detalle sde una reserva
export const RegistrarDetalleReserva = async (req, res) => {
    try {
        let { fk_reserva, fk_elemento, cantidad_elemento, observacion } = req.body;
        const sql = `INSERT INTO detalle_reservas (fk_reserva, fk_elemento, cantidad_elemento, observacion_reserva) VALUES (?,?,?,?)`;

        let [rows] = await pool.query(sql, [ fk_reserva, fk_elemento, cantidad_elemento, observacion ]);
        
        if (rows.affectedRows > 0) {
            return res.status(200).json({ message: "Se registró con éxito el detalle de la reserva" });
        } else {
            return res.status(403).json({ message: "Detalle de reserva no registrada" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
};

//Listar todos los detalles de las Reservas registradas
export const listarDetallesReserva = async (req, res) => {

    try {
        const [result] = await pool.query('SELECT * FROM detalle_reservas');

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'No se econtraron detalles de reservas' });
        }

    } catch (e) {
        return res.status(500).json({ message: 'error' + e });
    }

};

//Buscar un detalle de Reserva por id o codigo_detalle
export const BuscarDetalleReserva = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `SELECT * FROM detalle_reservas WHERE codigo_detalle = ?`;
        let [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return res.status(200).json({ message: "Detalle de Reserva encontrado con éxito", detalle: rows[0] });
        } else {
            return res.status(404).json({ message: "Detalle de Reserva no encontrado" });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

//Eliminar un detalle de reserva por ID o codigo_detalle
export const EliminarDetalleReserva = async (req, res) => {

    try {
        let id = req.params.id;
        let sql = `DELETE FROM detalle_reservas WHERE codigo_detalle = ?`;
        let [rows] = await pool.query(sql, [id]);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ message: "Detalle Reserva eliminado con éxito" });
        } else {
            return res.status(403).json({ message: "Detalle Reserva no eliminado" });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

//Actualizar un detalle de reserva por ID o codigo_detalle
export const ActualizarDetalleReserva = async (req, res) => {

    try {
        let id = req.params.id;
        let { fk_reserva, fk_elemento, cantidad_elemento, observacion } = req.body;
        let sql = `UPDATE detalle_reservas SET  fk_reserva = ?, fk_elemento = ?, cantidad_elemento = ?, observacion_reserva = ? WHERE codigo_detalle = ?`;
        let [rows] = await pool.query(sql, [fk_reserva, fk_elemento, cantidad_elemento, observacion, id]);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ message: "Detalle Reserva actualizado con éxito" });
        } else {
            return res.status(404).json({ message: "Detalle Reserva no encontrado" });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }

};