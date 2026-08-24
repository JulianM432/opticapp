import { multerUpload } from '../configs/multer.js';

export const uploadProductImages = multerUpload.array('images');
