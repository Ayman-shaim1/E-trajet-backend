import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
const prisma = new PrismaClient();

// @desc    Creation d'un nouveau utilisateur
// @route   POST /api/utilisateurs
// @access  Public
export const incription = asyncHandler(async (req, res) => {
  try {
    const {
      email,
      motdepasse,
      nomComplete,
      gsm,
      fixe,
      adresse,
      idMoyenneDeTransport,
    } = req.body;
    let utilisateur = null;

    utilisateur = await prisma.utilisateur.findUnique({
      where: {
        email: email,
      },
    });
    if (!utilisateur) {
      const salt = await bcrypt.genSalt(10);
      const crpmotdepasse = await bcrypt.hash(motdepasse, salt);
      const tokenID = uuidv4();
      const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_EMAIL,
        },
      });
      const link = "http://" + req.get("host") + "/verify?id=" + tokenID;

      const utilisateur = await prisma.utilisateur.create({
        data: {
          email,
          motdepasse: crpmotdepasse,
          nomComplete,
          gsm: gsm ? gsm : null,
          fixe: fixe ? fixe : null,
          adresse: adresse ? adresse : null,
          idMoyenneDeTransport: idMoyenneDeTransport
            ? idMoyenneDeTransport
            : null,
        },
      });
      const mailOptions = {
        to: utilisateur.email,
        subject: "Veulliez confirmer votre email",
        html:
          "Bonjour,<br> veulliez cliquer sur ce lien pour verfier votre email.<br><a href=" +
          link +
          ">cliquer ici pour verfier</a>",
      };

      await prisma.verificationEmail.create({
        data: {
          idUtilisateur: utilisateur.id,
          token: tokenID,
          dateExpiration: new Date(
            new Date().setDate(new Date().getDate() + 1)
          ),
        },
      });

      smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
          res.status(400);
          throw new Error(error);
        } else {
          return res.json({
            message: `Un e-mail de vérification a été envoyé à '${utilisateur.email}'. Il expirera après un jour. Si vous ne recevez pas d'e-mail de vérification, cliquez sur Renvoyer`,
          });
        }
      });
    } else {
      res.status(400);
      throw new Error("email exist deja !");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Creation d'un nouveau utilisateur
// @route   POST /api/utilisateurs/login
// @access  Public
export const authentification = asyncHandler(async (req, res) => {
  const { email, motdepasse } = req.body;

  const utilisateur = await prisma.utilisateur.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
    include: {
      ChoixRole: true,
    },
  });

  if (utilisateur) {
    if (await bcrypt.compare(motdepasse, utilisateur.motdepasse)) {
      if (utilisateur.verifier) {
        res.json({
          ...utilisateur,
          token: generateToken(utilisateur.id),
        });
      } else {
        res.status(400);
        throw new Error(
          "votre email n'est pas encore verifier. Si vous ne recevez pas un e-mail de vérification, cliquez sur Renvoyer"
        );
      }
    } else {
      res.status(404);
      throw new Error("mot de passe incorrect !");
    }
  } else {
    res.status(404);
    throw new Error("email incorrect !");
  }
});
