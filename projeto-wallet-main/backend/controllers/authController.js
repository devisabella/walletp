const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/userModel");

const transporter = nodemailer.createTransport({
  service: "gmail", // usando o serviço Gmail
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  pool: true,
  maxConnections: 5,
  connectionTimeout: 5000,
  greetingTimeout: 5000,
});

const register = async (req, res) => {
  try {
    const { name, email, password, passwordConfirmation } = req.body;

    if (!name || !email || !password | !passwordConfirmation) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    if (password !== passwordConfirmation) {
      return res.status(400).json({ error: "As senhas não coincidem." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "E-mail e senha são obrigatórios." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login bem-sucedido",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao realizar login." });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "E-mail é obrigatório." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "E-mail não encontrado." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetLink = `http://localhost:5173/resetarSenha/${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Recuperação de senha",
      html: `
        <p>Você solicitou a recuperação de senha.</p>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Se você não solicitou, ignore este e-mail.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "E-mail de recuperação enviado com sucesso!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Erro ao enviar e-mail de recuperação." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    if (!newPassword || !confirmNewPassword) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "As senhas não coincidem." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Senha redefinida com sucesso!" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ error: "Token expirado." });
    }
    res
      .status(500)
      .json({ error: "Erro ao redefinir senha: " + error.message });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
