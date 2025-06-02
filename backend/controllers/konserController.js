import Konser from "../models/konserModel.js";
import Tiket from "../models/tiketModel.js";
import Pengunjung from "../models/pengunjungModel.js";
import { admin, initializeFCM } from "../config/fcm.js";

//GET KONSER
export const getKonser = async (req, res) => {
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
};

//GET KONSER BY ID
export const getKonserById = async (req, res) => {
  try {
    const konser = await Konser.findOne({ where: { id: req.params.id } });
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
};

//ADD KONSER
export const addKonser = async (req, res) => {
  try {
    const { nama, poster, tanggal, lokasi, bintangtamu, harga, quota } =
      req.body;
    if (
      !nama ||
      !poster ||
      !tanggal ||
      !lokasi ||
      !bintangtamu ||
      !harga ||
      !quota
    ) {
      const msg = `${
        !nama
          ? "Nama"
          : !poster
          ? "Poster"
          : !tanggal
          ? "Tanggal"
          : !lokasi
          ? "Lokasi"
          : !bintangtamu
          ? "Bintang Tamu"
          : !harga
          ? "Harga"
          : "Quota"
      } field cannot be empty !`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }
    await Konser.create({
      nama: nama,
      tanggal: tanggal,
      lokasi: lokasi,
      bintangtamu: bintangtamu,
      poster: poster,
    });
    await Tiket.create({
      nama: nama,
      tanggal: tanggal,
      harga: harga,
      quota: quota,
    });

    const message = {
      notification: {
        title: "Konser Baru !",
        body: `Jangan Ketinggalan Konser Terbaru ${nama} !`,
      },
      topic: "konser",
    };

    await initializeFCM();
    await admin.messaging().send(message);

    res.status(201).json({
      status: "Success",
      message: "Konser & Tiket Added, Notifikasi Dikirim",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

//UPDATE KONSER
export const updateKonser = async (req, res) => {
  try {
    const { nama, poster, tanggal, lokasi, bintangtamu } = req.body;
    const ifKonserExist = await Konser.findOne({
      where: { id: req.params.id },
    });
    if (!nama || !poster || !tanggal || !lokasi || !bintangtamu) {
      const msg = `${
        !nama
          ? "Nama"
          : !poster
          ? "Poster"
          : !tanggal
          ? "Tanggal"
          : !lokasi
          ? "Lokasi"
          : "Bintang Tamu"
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
    const oldNama = ifKonserExist.nama;
    let updatedData = { nama, poster, tanggal, lokasi, bintangtamu };

    await Konser.update(updatedData, {
      where: { id: req.params.id },
    });
    await Tiket.update(
      { nama: nama, tanggal: tanggal },
      {
        where: { id: req.params.id },
      }
    );
    await Pengunjung.update(
      { tiket: nama },
      {
        where: { tiket: oldNama },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Konser & Tiket & Pengunjung Updated",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

//DELETE KONSER
export const deleteKonser = async (req, res) => {
  try {
    const ifKonserExist = await Konser.findOne({
      where: { id: req.params.id },
    });
    if (!ifKonserExist) {
      const error = new Error("Konser not found !");
      error.statusCode = 400;
      throw error;
    }

    await Konser.destroy({ where: { id: req.params.id } });
    await Tiket.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      status: "Success",
      message: "Konser & Tiket Deleted",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};
