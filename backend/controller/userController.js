import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import generateToken from '../utils/generateTokens.js'
//@desc: Auth users and get tokens
//@route: GET/api/users/login
//@ascess: public route
const authUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

//@desc: user registration
//@route: GET/api/users/
//@ascess: public route
const registerUsers = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('User Already Exist')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

//@desc: Get user profile
//@route: GET/api/users/profile
//@ascess: private route
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

//@desc: Update user profile
//@route: PUT/api/users/profile
//@ascess: private route
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

//@desc: Get user profile
//@route: GET/api/users
//@ascess: private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

//@desc: Delete user profile
//@route: DETELE /api/users/:id
//@ascess: private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User Removed' })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
  res.json(user)
})

//@desc: Get user by ID
//@route: GET/api/users/:id
//@ascess: private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

//@desc: Update user
//@route: PUT/api/users/:id
//@ascess: private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
export {
  authUsers,
  registerUsers,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
