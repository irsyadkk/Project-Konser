import Pengunjung from "../models/pengunjungModel.js";
import Tiket from "../models/tiketModel.js";

// ORDER TICKET
export async function orderTicket(req,res) {
    try {
    const {quantity, nama, umur, email} = req.body;

    if (!quantity || !nama || !umur || !email) {
        const msg = `${
        !quantity ? "Quantity" : !nama ? "Nama" : !umur ? "Umur" : "Email"
        } field cannot be empty !`;
        const error = new Error(msg);
        error.statusCode = 401;
        throw error;
    }

    const tiket = await Tiket.findOne({
        where: {id: req.params.id}
    });

    if(!tiket) {
        const error = new Error("Tiket tidak ditemukan !");
        error.statusCode = 400;
        throw error;
    }

    if(umur<=16){
        const error = new Error("Umur tidak mencukupi !");
        error.statusCode = 400;
        throw error;
    }

    if(tiket.quota < quantity){
        const error = new Error("Quota tiket tidak mencukupi !");
        error.statusCode = 400;
        throw error;
    }
    if(quantity <= 0) {
        const error = new Error("Invalid quantity !");
        error.statusCode = 400;
        throw error;
    }

    const updatedQuota = tiket.quota - quantity;

    await Tiket.update({quota: updatedQuota}, {
        where: { id: req.params.id },
    });
    await Pengunjung.create({
        nama: nama,
        umur: umur,
        email: email,
    })
    res.status(200).json({
        status: "Success",
        message: "Order Created",
    });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            status: "Error",
            message: error.message,
        });
    }
}