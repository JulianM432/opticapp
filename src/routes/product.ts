import { Router } from 'express';
import { productController } from '../controllers/product.js';

const router = Router();

router.get('/products', productController.getPublished);
router.get('/products/:id', productController.getPublishedById);

export { router as productRouter };
