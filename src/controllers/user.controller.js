const User = require('../models/user.model');
const { generateHash, compareTextAndHash } = require('../utils/credentials.util');

class UserController {

  async save(req, res) {
    try {
      
      const { email, password } = req.body;

      let user = await User.findOne({
        where: {
          email: email
        }
      });

      if(user) {
        return res.json({
          success: false,
          msg: 'El correo fue registrado anteriormente'
        });
      }

      const passwordHash = generateHash(password);

      user = new User({
        email: email,
        password: passwordHash
      });

      await user.save();

      delete user.dataValues.password;

      res.json({
        success: true,
        msg: 'Usuario creado correctamente',
        user: user.dataValues
      });
      
    } catch (error) {
      console.log('Error', error.message);
      res.json({
        success: false,
        msg: 'Error al crear usuario'
      });
    }
  }

  async login(req, res) {
    try {

      const { email, password } = req.body;

      let user = await User.findOne({
        where: {
          email: email
        }
      });

      if(!user) {
        return res.json({
          success: false,
          msg: 'El usuario no existe'
        });
      }

      const isCorrect = compareTextAndHash(password, user.getDataValue('password'));

      if(!isCorrect) {
        return res.json({
          success: false,
          msg: 'Las credenciales no coinciden'
        });
      }

      delete user.dataValues.password;
      
      res.json({
        success: true,
        msg: 'Logueado correctamente',
        user: user.dataValues
      });
      
    } catch (error) {
      console.log('Error', error.message);
      res.json({
        success: false,
        msg: 'Error al loguear usuario'
      });
    }
  }

}

module.exports = UserController;