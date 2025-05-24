import express from "express";
import {
  getAdmin,
  getAdminById,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  loginHandler,
  logout,
} from "../controllers/adminController.js";
import {
  getPengunjung,
  getPengunjungById,
  addPengunjung,
  updatePengunjung,
  deletePengunjung,
} from "../controllers/pengunjungController.js";
import {
  getKonser,
  getKonserById,
  addKonser,
  updateKonser,
  deleteKonser,
} from "../controllers/konserController.js";
import {
  getTiket,
  getTiketById,
  addTiket,
  updateTiket,
  deleteTiket,
} from "../controllers/tiketController.js";
import { orderTicket } from "../controllers/orderController.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

//endpoint refresh token
router.get("/token", refreshToken);

//endpoint auth
router.post("/register", addAdmin);
router.post("/login", loginHandler);
router.delete("/logout", logout);

// ADMINS
router.get("/admin", getAdmin);
// router.get('/admin/:id', verifyToken, getAdminById);
// router.patch('/admin/:id', verifyToken, updateAdmin);
// router.delete('/admin/:id', verifyToken, deleteAdmin);

// PENGUNJUNG
router.get("/pengunjung", verifyToken, getPengunjung);
router.get("/pengunjung/:id", verifyToken, getPengunjungById);
router.post("/pengunjung", verifyToken, addPengunjung);
router.patch("/pengunjung/:id", verifyToken, updatePengunjung);
router.delete("/pengunjung/:id", verifyToken, deletePengunjung);

// KONSER
router.get("/konser", verifyToken, getKonser);
router.get("/konser/:id", verifyToken, getKonserById);
router.post("/konser", verifyToken, addKonser);
router.patch("/konser/:id", verifyToken, updateKonser);
router.delete("/konser/:id", verifyToken, deleteKonser);

// TIKET
router.get("/tiket", verifyToken, getTiket);
router.get("/tiket/:id", verifyToken, getTiketById);
router.post("/tiket", verifyToken, addTiket);
router.patch("/tiket/:id", verifyToken, updateTiket);
router.delete("/tiket/:id", verifyToken, deleteTiket);

// ORDER TIKET
router.patch("/order/:id", verifyToken, orderTicket, addPengunjung);

export default router;
