const bcrypt = require('bcryptjs');

const password = 'yourpassword'; // <-- Change this to your desired password

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hashed password:', hash);
}); 