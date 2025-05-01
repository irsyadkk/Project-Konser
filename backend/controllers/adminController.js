import Admin from "../models/adminModel";

export const getAdmin = async(req,res) =>{
    try {
        const response = await Admin.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getAdminById = async(req,res) =>{
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

export const addAdmin = async(req,res) => {
    try {
        await Admin.create(req.body);
        res.status(201).json({msg:"Admin Added"});
    } catch (error) {
        console.log(error.message)
    }
}

export const updateAdmin = async(req,res) => {
    try {
        Admin.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Admin Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteAdmin = async(req,res) => {
    try {
        Admin.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Admin Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}