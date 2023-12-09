import { pool } from '../../database/conexion.js'

//Registrar Reserva
export const RegistrarReserva = async (req, res) => {
    try {
        let { estado_reserva, fk_usuario } = req.body;
        const sql = `INSERT INTO reservas (estado_reserva, fk_usuario) VALUES (?,?)`;

        let [rows] = await pool.query(sql, [estado_reserva, fk_usuario]);
        
        if (rows.affectedRows > 0) {
            return res.status(200).json({ message: "Se registró con éxito la reserva" });
        } else {
            return res.status(403).json({ message: "Reserva no registrada" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
};

//Listar todas las Reservas registradas
export const listarReservas = async (req, res) => {

    try {
        const [result] = await pool.query('SELECT * FROM reservas');

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'No se econtraron reservas' });
        }

    } catch (e) {
        return res.status(500).json({ 'message': 'error' + e });
    }

};

//Buscar una Reserva por id o cpdigo_reserva
export const BuscarReserva = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `SELECT * FROM reservas WHERE codigo_reserva = ?`;
        let [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return res.status(200).json({ message: "Reserva encontrada con éxito", reserva: rows[0] });
        } else {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

//Eliminar una reserva por ID o codigo_reserva
export const EliminarReserva = async (req, res) => {

    try {
        let id = req.params.id;
        let sql = `DELETE FROM reservas WHERE codigo_reserva = ?`;
        let [rows] = await pool.query(sql, [id]);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ message: "Reserva eliminada con éxito" });
        } else {
            return res.status(403).json({ message: "Reserva no eliminada" });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

//Actualizar una reserva por ID p codigo_reserva
export const ActualizarReserva = async (req, res) => {

    try {
        let id = req.params.id;
        let { estado_reserva, fk_usuario } = req.body;
        let sql = `UPDATE reservas SET  estado_reserva = ?, fk_usuario = ? WHERE codigo_reserva = ?`;
        let [rows] = await pool.query(sql, [estado_reserva, fk_usuario, id]);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ message: "Reserva actualizada con éxito" });
        } else {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }

};

//cambiar estado reserva a en prestamo
export const ReservaPrestamo = async (req, res) => {

    try {
        let id = req.params.id;
        let estado_reserva = "prestamo";
        let sql = `UPDATE reservas SET estado_reserva = ? WHERE codigo_reserva = ?`;
        let [rows] = await pool.query(sql, [estado_reserva, id]);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ message: "Estado de la Reserva se ha actualizado a en prestamo" });
        } else {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

//cambiar estado reserva a rechazada
export const ReservaRechazada = async (req, res) => {

    try {
        let id = req.params.id;
        let estado_reserva = "rechazado";
        let sql = `UPDATE reservas SET estado_reserva = ? WHERE codigo_reserva = ?`;
        let [rows] = await pool.query(sql, [estado_reserva, id]);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ message: "Estado de la Reserva se ha actualizado a rechazado" });
        } else {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

//cambiar estado reserva a entregada
export const ReservaEntregada = async (req, res) => {

    try {
        let id = req.params.id;
        let estado_reserva = "entregado";
        let sql = `UPDATE reservas SET estado_reserva = ? WHERE codigo_reserva = ?`;
        let [rows] = await pool.query(sql, [estado_reserva, id]);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ message: "Estado de la Reserva se ha actualizado a entregado" });
        } else {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// Listar las Reservas activas
export const listarReservasActivas = async (req, res) => {
    try {
        const sql = 'SELECT * FROM reservas WHERE estado_reserva = ?';
        const [result] = await pool.query(sql, ['solicitado']);

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'No se encontraron reservas activas' });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};
