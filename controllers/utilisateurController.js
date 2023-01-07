import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../services/mailServices.js";
import { excludeUserFields } from "../services/prismaServices.js";

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
    // check if user existe or not :
    let utilisateur = null;
    utilisateur = await prisma.utilisateur.findUnique({
      where: {
        email: email,
      },
    });
    if (!utilisateur) {
      const tokenID = uuidv4();
      const salt = await bcrypt.genSalt(10);
      const crpmotdepasse = await bcrypt.hash(motdepasse, salt);

      // start transaction :
      await prisma.$transaction(async tx => {
        // create user :
        utilisateur = await prisma.utilisateur.create({
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
        // give him role :
        await prisma.choixRole.create({
          data: {
            idUtilisateur: utilisateur.id,
            role: utilisateur.idMoyenneDeTransport
              ? "proprietaire"
              : "passager",
          },
        });
        // create verification token :

        // await prisma.verificationEmail.create({
        //   data: {
        //     idUtilisateur: utilisateur.id,
        //     token: tokenID,
        //     dateExpiration: new Date(
        //       new Date().setDate(new Date().getDate() + 1)
        //     ),
        //   },
        // });
      });

      // send email :

      // const url = "http://" + req.get("host") + "/verify?id=" + tokenID;

      // const subject = "Veulliez confirmer votre email";
      // const content = `Bonjour,<br> veulliez cliquer sur ce lien pour verfier votre email.<br><a href=${url}>cliquer ici pour verfier</a>`;

      // sendEmail({
      //   from: process.env.EMAIL,
      //   to: utilisateur.email,
      //   subject: subject,
      //   content: content,
      // });

      res.json({
        message:
          "un message a été envoyé sur votre boite mail. merci de vérifier votre email",
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

  let utilisateur = await prisma.utilisateur.findFirst({
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
        utilisateur.roles = utilisateur.ChoixRole.map(role => role.role);

        delete utilisateur.motdepasse;
        delete utilisateur.ChoixRole;

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
