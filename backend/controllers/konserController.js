import Konser from "../models/konserModel.js";
import Tiket from "../models/tiketModel.js";

//GET KONSER
export const getKonser = async(req,res) =>{
    try {
        const konsers = await Konser.findAll();
        res.status(200).json({
            status: "Success",
            message: "Konser Retrieved",
            data: konsers,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error...",
            message: error.message,
        });
    }
}

//GET KONSER BY ID
export const getKonserById = async(req,res) =>{
    try {
        const konser = await Konser.findOne({ where:{id: req.params.id} });
        if (!konser) {
            const error = new Error("Konser tidak ditemukan !");
            error.statusCode = 400;
            throw error;
          }
          res.status(200).json({
            status: "Success",
            message: "Konser Retrieved",
            data: konser,
          });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error...",
            message: error.message,
        });
    }
}

//ADD KONSER
export const addKonser = async(req,res) => {
    try {
        const {nama, tanggal, lokasi, bintangtamu, harga, quota} = req.body;
        if (!nama || !tanggal || !lokasi || !bintangtamu || !harga || !quota) {
            const msg = `${
            !nama ? "Nama" : !tanggal ? "Tanggal" : !lokasi ? "Lokasi" : !bintangtamu ? "Bintang Tamu" : !harga ? "Harga" : "Quota"
            } field cannot be empty !`;
            const error = new Error(msg);
            error.statusCode = 401;
            throw error;
        }
        await Konser.create({
        nama: nama,
        tanggal: tanggal,
        lokasi: lokasi,
        bintangtamu: bintangtamu
        });
        await Tiket.create({
        nama: nama,
        tanggal: tanggal,
        harga: harga,
        quota: quota
        })
        res.status(201).json({
        status: "Success",
        message: "Konser & Tiket Added",
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error",
            message: error.message,
        });
    }
}

//UPDATE KONSER
export const updateKonser = async(req,res) => {
    try {
        const {nama, tanggal, lokasi, bintangtamu} = req.body;
        const ifKonserExist = await Konser.findOne({ where: { id: req.params.id } });
        if (!nama || !tanggal || !lokasi || !bintangtamu) {
            const msg = `${
            !nama ? "Nama" : !tanggal ? "Tanggal" : !lokasi ? "Lokasi" : "Bintang Tamu"
            } field cannot be empty !`;
            const error = new Error(msg);
            error.statusCode = 401;
            throw error;
        }
        if (!ifKonserExist) {
            const error = new Error("Konser not found !");
            error.statusCode = 400;
            throw error;
          }
          let updatedData = {nama,tanggal,lokasi,bintangtamu};
      
          await Konser.update(updatedData, {
            where: { id: req.params.id },
          });
      
          res.status(200).json({
            status: "Success",
            message: "Konser Updated",
          });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error",
            message: error.message,
        });
    }
}

//DELETE KONSER
export const deleteKonser = async(req,res) => {
    try {
        const ifKonserExist = await Konser.findOne({ where: { id: req.params.id } });
        if (!ifKonserExist) {
            const error = new Error("Konser not found !");
            error.statusCode = 400;
            throw error;
          }
      
          await Konser.destroy({ where: { id: req.params.id } });
          res.status(200).json({
            status: "Success",
            message: "Konser Deleted",
          });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error",
            message: error.message,
        });
    }
}