import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Ritesh Admin',
    username: 'ritesh_admin',
    phone_no: 9988774477,
    qualification: 'MCA',
    city: 'Airoli',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Ritesh user',
    username: 'ritesh_user',
    phone_no: 1122334455,
    qualification: 'BSC_IT',
    city: 'Thane',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
