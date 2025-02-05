const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// HAY QUE CAMBIAR LA URL DEL HREF CUANDO ESTÉ HECHO EL FRONT
const sendRecoveryEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, 
    subject: "Recuperación de Contraseña",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Solicitud para restablecer tu contraseña</h2>
        <p>Hola,</p>
        <p>Recibimos una solicitud para restablecer tu contraseña. Si no realizaste esta solicitud, puedes ignorar este correo.</p>
        <p>Si deseas restablecer tu contraseña, haz clic en el botón de abajo:</p>
        <a href="${process.env.BASE_URL}/reset-password/token=${token}" 
           style="display: inline-block; margin: 20px 0; padding: 10px 20px; font-size: 16px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
          Restablecer Contraseña
        </a>
        <p style="font-size: 12px; color: #777;">Si tienes alguna duda, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado!");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

module.exports = {
    sendRecoveryEmail
}