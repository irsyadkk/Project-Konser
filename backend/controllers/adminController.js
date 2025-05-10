import { Error } from "sequelize";
import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//GET ADMIN
export const getAdmin = async(req,res) =>{
    try {
        const admins = await Admin.findAll();
        res.status(200).json({
            status: "Success",
            message: "Admins Retrieved",
            data: admins,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error...",
            message: error.message,
        });
    }
}

//GET ADMIN BY ID
export const getAdminById = async(req,res) =>{
    try {
        const admin = await Admin.findOne({
            where:{
                id: req.params.id
            }
        });
        if (!admin) {
            const error = new Error("Admin tidak ditemukan !");
            error.statusCode = 400;
            throw error;
          }
          res.status(200).json({
            status: "Success",
            message: "Admin Retrieved",
            data: admin,
          });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error...",
            message: error.message,
        });
    }
}

//ADD ADMIN
export const addAdmin = async(req,res) => {
    try {
        const {nama,email,pass} = req.body;
        if (!nama || !email || !pass) {
            const msg = `${
            !nama ? "Nama" : !email ? "Email" : "pass"
            } field cannot be empty !`;
             const error = new Error(msg);
            error.statusCode = 401;
            throw error;
        }
        const encryptedpass = await bcrypt.hash(pass,5);
        await Admin.create({
        nama: nama,
        email: email,
        pass: encryptedpass
        });
        res.status(201).json({
        status: "Success",
        message: "Admin Added",
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error",
            message: error.message,
        });
    }
}

//UPDATE ADMIN
export const updateAdmin = async(req,res) => {
    try {
        const {nama,email,pass} = req.body;
        const ifAdminExist = await Admin.findOne({ where: { id: req.params.id } });
        if (!nama || !email || !pass) {
            const msg = `${
            !nama ? "Nama" : !email ? "Email" : "pass"
            } field cannot be empty !`;
            const error = new Error(msg);
            error.statusCode = 401;
            throw error;
        }
        if (!ifAdminExist) {
            const error = new Error("Admin not found !");
            error.statusCode = 400;
            throw error;
          }
      
          const encryptedpass = await bcrypt.hash(pass,5);
          let updatedData = {nama,email,encryptedpass};
      
          await Admin.update(updatedData, {
            where: { id: req.params.id },
          });
      
          res.status(200).json({
            status: "Success",
            message: "Admin Updated",
          });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error",
            message: error.message,
        });
    }
}

//DELETE ADMIN
export const deleteAdmin = async(req,res) => {
    try {
        const ifAdminExist = await Admin.findOne({ where: { id: req.params.id } });
        if (!ifAdminExist) {
            const error = new Error("Admin not found !");
            error.statusCode = 400;
            throw error;
          }
      
          await Admin.destroy({ where: { id: req.params.id } });
          res.status(200).json({
            status: "Success",
            message: "Admin Deleted",
          });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error",
            message: error.message,
        });
    }
}

// LOGIN HANDLER
export async function loginHandler(req, res){
  try{
      const{nama, email, pass} = req.body;
      const admin = await Admin.findOne({
          where : {
              email: email
          }
      });

      if(admin){
        //Data User itu nanti bakalan dipake buat ngesign token kan
        // data user dari sequelize itu harus diubah dulu ke bentuk object
        //Safeuserdata dipake biar lebih dinamis, jadi dia masukin semua data user kecuali data-data sensitifnya  karena bisa didecode kayak password caranya gini :
        const adminPlain = admin.toJSON(); // Konversi ke object
        const { pass: _, refresh_token: __, ...safeAdminData } = adminPlain;


          const decryptPassword = await bcrypt.compare(pass, admin.pass);
          if(decryptPassword){
              const accessToken = jwt.sign(safeAdminData, process.env.ACCESS_TOKEN_SECRET, {
                  expiresIn : '5m' 
              });
              const refreshToken = jwt.sign(safeAdminData, process.env.REFRESH_TOKEN_SECRET, {
                  expiresIn : '1d' 
              });
              await Admin.update({refresh_token:refreshToken},{
                  where:{
                      id:admin.id
                  }
              });
              res.cookie('refreshToken', refreshToken,{
                  httpOnly : false, //ngatur cross-site scripting, untuk penggunaan asli aktifkan karena bisa nyegah serangan fetch data dari website "document.cookies"
                  sameSite : 'none',  //ini ngatur domain yg request misal kalo strict cuman bisa akseske link dari dan menuju domain yg sama, lax itu bisa dari domain lain tapi cuman bisa get
                  maxAge  : 24*60*60*1000,
                  secure:true //ini ngirim cookies cuman bisa dari https, kenapa? nyegah skema MITM di jaringan publik, tapi pas development di false in aja
              });
              res.status(200).json({
                  status: "Succes",
                  message: "Login Berhasil",
                  safeAdminData,
                  accessToken 
              });
          }
          else{
              res.status(400).json({
                  status: "Failed",
                  message: "Password atau email salah",
                
              });
          }
      } else{
          res.status(400).json({
              status: "Failed",
              message: "Password atau email salah",
          });
      }
  } catch(error){
      res.status(error.statusCode || 500).json({
          status: "error",
          message: error.message
      })
  }
}

// LOGOUT
export async function logout(req,res){
  const refreshToken = req.cookies.refreshToken; //mgecek refresh token sama gak sama di database
  if(!refreshToken) return res.sendStatus(204);
  const admin = await Admin.findOne({
      where:{
          refresh_token:refreshToken
      }
  });
  if(!admin.refresh_token) return res.sendStatus(204);
  const adminId = admin.id;
  await Admin.update({refresh_token:null},{
      where:{
          id:adminId
      }
  });
  res.clearCookie('refreshToken'); //ngehapus cookies yg tersimpan
  return res.sendStatus(200);
}