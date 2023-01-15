const getEmailTemplate = (data) => {

  const { email, token } = data;

  const emailUser = email.split('@')[0].toString();
  const url = 'http://127.0.0.1:5500/public/index.html';
  
  return `
  <form>
    <div>
      <label>Hola ${ emailUser }</label>
      <br>
      <a href="${ url }?token=${ token }" target="_blank">Recuperar contraseña</a>
    </div>
  </form>
  `;
}

module.exports = {
  getEmailTemplate
}