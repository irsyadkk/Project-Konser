import Konser from "../models/konserModel";

export const getKonser = async(req,res) =>{
    try {
        const response = await Konser.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getKonserById = async(req,res) =>{
    try {
        const response = await Konser.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const addKonser = async(req,res) => {
    try {
        await Konser.create(req.body);
        res.status(201).json({msg:"Konser Added"});
    } catch (error) {
        console.log(error.message)
    }
}

export const updateKonser = async(req,res) => {
    try {
        Konser.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Konser Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteKonser = async(req,res) => {
    try {
        Konser.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Konser Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}