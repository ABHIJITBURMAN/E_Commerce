import express from 'express'
import {
  authUsers,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUsers,
  updateUser,
  updateUserProfile,
} from '../controller/userController.js'
import { admin, protect } from '../middleware/authMiddlewere.js'
const router = express.Router()

router.post('/login', authUsers)
router.route('/').post(registerUsers).get(protect, admin, getUsers)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
export default router
