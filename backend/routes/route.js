import express from "express";
import { getAdmin, getAdminById, addAdmin, updateAdmin, deleteAdmin  } from "../controllers/adminController.js";
import { getPengunjung, getPengunjungById, addPengunjung, updatePengunjung, deletePengunjung } from "../controllers/pengunjungController.js";
import { getKonser, getKonserById, addKonser, updateKonser, deleteKonser } from "../controllers/konserController.js";
import { getTiket, getTiketById, addTiket, updateTiket, deleteTiket } from "../controllers/tiketController.js";

const router = express.Router();

// ADMINS
router.get('/admin', getAdmin);
router.get('/admin/:id', getAdminById);
router.post('/admin', addAdmin);
router.patch('/admin/:id', updateAdmin);
router.delete('/admin/:id', deleteAdmin);

// PENGUNJUNG
router.get('/pengunjung', getPengunjung);
router.get('/pengunjung/:id', getPengunjungById);
router.post('/pengunjung', addPengunjung);
router.patch('/pengunjung/:id', updatePengunjung);
router.delete('/pengunjung/:id', deletePengunjung);

// KONSER
router.get('/konser', getKonser);
router.get('/konser/:id', getKonserById);
router.post('/konser', addKonser);
router.patch('/konser/:id', updateKonser);
router.delete('/konser/:id', deleteKonser);

// TIKET
router.get('/tiket', getTiket);
router.get('/tiket/:id', getTiketById);
router.post('/tiket', addTiket);
router.patch('/tiket/:id', updateTiket);
router.delete('/tiket/:id', deleteTiket);

export default router;