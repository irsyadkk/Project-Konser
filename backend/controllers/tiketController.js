import Tiket from "../models/tiketModel";

export const getTiket = async(req,res) =>{
    try {
        const response = await Tiket.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getTiketById = async(req,res) =>{
    try {
        const response = await Tiket.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const addTiket = async(req,res) => {
    try {
        await Tiket.create(req.body);
        res.status(201).json({msg:"Tiket Added"});
    } catch (error) {
        console.log(error.message)
    }
}

export const updateTiket = async(req,res) => {
    try {
        Tiket.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Tiket Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteTiket = async(req,res) => {
    try {
        Tiket.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Tiket Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}