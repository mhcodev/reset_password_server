const User = require('../models/user.model');
const UserPassword = require('../models/user-password.model');
const { generateRandomString, generateHash } = require('../utils/credentials.util');
const { getEmailTemplate } = require('../templates/template');
const { sendEmail } = require('../utils/email.util');

class UserPasswordController {

  async sendEmailToResetPassword(req, res) {
    try {

      const { email } = req.params;

      const user = await User.findOne({
        where: {
          email: email
        }
      });

      if(!user) {
        return res.json({
          success: false,
          msg: 'El email es incorrecto'
        });
      }

      let userPassword = await UserPassword.findOne({
        where: {
          userId: user.getDataValue('id'),
          isUsed: false
        }
      });

      if (userPassword) {
        userPassword.setDataValue('isUsed', true);
        await userPassword.save();
      }

      const token = generateRandomString(16);

      userPassword = new UserPassword({
        userId: user.getDataValue('id'),
        email: email,
        token: token,
        is_used: false
      });

      const data = {
        email: email,
        token: token
      }

      const emailHTMLTemplate = getEmailTemplate(data);

      await sendEmail(email, 'Recuperar contraseña', emailHTMLTemplate);
      await userPassword.save();

      res.json({
        success: true,
        email: email,
        token: token,
        msg: 'Email enviado correctamente!'
      });
      
    } catch (error) {
      console.log('Error', error.message);
      res.json({
        success: false,
        msg: 'Error al enviar email'
      });
    }
  }

  async resetPassword(req, res) {
    try {
      
      const { token } = req.params;
      const { password, password2 } = req.body;

      const userPassword = await UserPassword.findOne({
        where: {
          token: token
        }
      });

      if (!userPassword) {
        return res.json({
          success: false,
          msg: 'Error: Debe enviar solicitud por correo'
        });
      }

      if(userPassword.getDataValue('isUsed') === true) {
        return res.json({
          success: false,
          msg: 'Error: el token ya se usó o expiró'
        });
      }

      if (password !== password2) {
        return res.json({
          success: false,
          msg: 'Las contraseñas no coinciden'
        });
      }

      userPassword.setDataValue('isUsed', true);
      await userPassword.save();

      const user = await User.findByPk(userPassword.getDataValue('userId'));
      const passwordHash = generateHash(password);
      user.setDataValue('password', passwordHash);

      await user.save();
      res.json({
        success: true,
        email: user.getDataValue('email'),
        msg: 'Las contraseñas se cambiaron correctamente'
      });

    } catch (error) {
      console.log('Error', error.message);
      res.json({
        success: false,
        msg: 'Error al enviar email'
      });
    }
  }

}

module.exports = UserPasswordController;