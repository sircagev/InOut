import { pool } from "../../database/conexion.js";
import jwt from "jsonwebtoken";

export const validarUsuario= async(req,res)=>{
    try{
        let{email_usuario,contraseña_usuario}=req.body;
        let sql=`select * from usuarios where email_usuario='${email_usuario}' and contraseña_usuario='${contraseña_usuario}'`;
        let [rows]=await pool.query(sql);
        if(rows.length>0){

        let [rows]=await pool.query(sql);
        let token=jwt.sign({user:rows},process.env.SECRET,{expiresIn:process.env.TIME});
        
            return res.status(200).json({'message':'Usuario autorizado','token':token});
        }else{
            return res.status(404).json({'message': 'Usuario no autorizado'});
        }
    
        } catch (e) {
            res.status(500).json({'message':e.message});
        }
    };
    export const validarToken= async(req, res, next)=>{
        try{
            let token_cliente=req.headers['token'];
            if(!token_cliente){
                return res.status(402).json({"message":"el Token es requerido"});
            }
            else{
                let decode= jwt.verify(token_cliente,process.env.SECRET,(error,decoded)=>{
                    if(error) 
                    return res.status(402).json({'message':"el Token es invalido"});
                    else next();
                });
            }
        }
        catch(e){
            return res.status(500).json({"message":e.message});
        }
    }