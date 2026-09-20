import { Router } from 'express';
import { productController } from '../controllers/product.js';
import { uploadProductImages } from '../middlewares/upload.js';

const router = Router();

router.get('/products', productController.getPublished);
router.get('/admin/products', productController.getAllAdmin);
router.get('/products/:id', productController.getPublishedById);
router.post('/products', uploadProductImages, productController.create);
router.put('/products/:id', uploadProductImages, productController.update);
router.delete('/products/:id', productController.softDelete);

export { router as productRouter };
