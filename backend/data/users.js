import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Abhijit',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Jone Doe',
    email: 'jonedoe@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
