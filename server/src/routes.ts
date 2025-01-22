import { Router } from "express";

import CategoryController from "./controllers/CategoryController";
import TransactionController from "./controllers/TransactionController";
import AuthController from "./controllers/AuthController";
import ProductController from "./controllers/ProductController";
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


const productController = new ProductController();
router.get("/products", productController.findAll);
router.get("/products/:id", productController.getById);
router.post("/products", productController.add);
router.put("/products", productController.update);
router.put("/products/:id", productController.delete);

const authController = new AuthController();
router.post("/auth", authController.execute);
router.post("/auth/refreshToken", authController.refreshToken);


export default router;