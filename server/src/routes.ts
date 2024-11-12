import { Router } from "express";

import CategoryController from "./controllers/CategoryController";
import TransactionController from "./controllers/TransactionController";
import AuthController from "./controllers/AuthController";
const router = Router();

const categoryController = new CategoryController();
router.get("/categories", categoryController.findAll);
router.get("/categories/:id_category", categoryController.getById);
router.post("/categories", categoryController.add);
router.put("/categories", categoryController.update);
router.delete("/categories/:id_category", categoryController.delete);


const transactionController = new TransactionController();
router.get("/transactions", transactionController.findAll);
router.get("/transactions/:id_transaction", transactionController.getById);
router.post("/transactions", transactionController.add);
router.put("/transactions", transactionController.update);
router.delete("/transactions/:id_transaction", transactionController.delete);

const authController = new AuthController();
router.post("/auth/register", authController.add);
router.post("/auth/login", authController.execute);


export default router;