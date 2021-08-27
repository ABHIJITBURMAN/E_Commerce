import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from '../controller/productController.js'

import { admin, protect } from '../middleware/authMiddlewere.js'

const router = express.Router()

router.route('/:id/reviews').post(protect, createProductReview)
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
