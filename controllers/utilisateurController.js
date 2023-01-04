import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// @desc    Creation d'un nouveau utilisateur
// @route   POST /api/utilisateurs/propriataire
// @access  Public
export const incriptionProprietaire = asyncHandler(async (req, res) => {
  const {
    email,
    motdepasse,
    nomComplete,
    gsm,
    fixe,
    adresse,
    idMoyenneDeTransport,
  } = req.body;

  const proprietaire = await prisma.proprietaire.create({
    data: {
      nomComplete,
      gsm,
      fixe,
      adresse,
      idMoyenneDeTransport,
      compte: {
        create: { email, motdepasse },
      },
    },
  });
  res.json({
    ...proprietaire,
    token: generateToken(proprietaire.idCompte),
  });
});

// @desc    Creation d'un nouveau utilisateur
// @route   POST /api/utilisateurs
// @access  Public
export const authentification = asyncHandler(async (req, res) => {
  const { email, motdepasse } = req.body;

  let compte = await prisma.compte.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
    include: {
      Passager: true,
    },
  });
  compte = { ...compte, ...compte.Passager };
  delete compte.Passager;
  delete compte.idCompte;
  delete compte.motdepasse;

  res.json({
    ...compte,
    token: generateToken(compte.id),
  });
});
