import Pengunjung from "../models/pengunjungModel";

export const getPengunjung = async(req,res) =>{
    try {
        const response = await Pengunjung.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPengunjungById = async(req,res) =>{
    try {
        const response = await Admin.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const addPengunjung = async(req,res) => {
    try {
        await Admin.create(req.body);
        res.status(201).json({msg:"Pengunjung Added"});
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePengunjung = async(req,res) => {
    try {
        Admin.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Pengunjung Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePengunjung = async(req,res) => {
    try {
        Admin.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Pengunjung Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}