import express from 'express'
import {
  authUsers,
  getUserProfile,
  registerUsers,
  updateUserProfile,
} from '../controller/userController.js'
import { protect } from '../middleware/authMiddlewere.js'
const router = express.Router()

router.post('/login', authUsers)
router.route('/').post(registerUsers)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
