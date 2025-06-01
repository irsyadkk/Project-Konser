import express from "express";
import {
  getUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  loginHandler,
  logout,
  getUserByEmail,
} from "../controllers/userController.js";
import {
  getPengunjung,
  getPengunjungById,
  getPengunjungByEmail,
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
router.post("/register", addUser);
router.post("/login", loginHandler);
router.delete("/logout", logout);

// USERS
router.get("/users", verifyToken, getUser);
router.get("/users/:email", verifyToken, getUserByEmail);
router.patch("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

// PENGUNJUNG
router.get("/pengunjung", verifyToken, getPengunjung);
router.get("/pengunjung/:email", verifyToken, getPengunjungByEmail);
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
router.patch("/order/:id", verifyToken, orderTicket);

export default router;
