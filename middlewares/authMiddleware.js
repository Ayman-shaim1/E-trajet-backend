import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers["authorization"].split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.utilisateur.findUnique({
        where: {
          id: decoded.id,
        },
      });
      req.user = user;

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const passager = asyncHandler(async (req, res, next) => {
  const roles = await prisma.choixRole.findMany({
    select: {
      role: true,
    },
    where: {
      idUtilisateur: req.user.id,
    },
  });

  const index = roles.findIndex(role => role.role === "passager");
  if (index !== -1) {
    next();
  } else {
    res.status(401);
    res.json({ message: "Non autorisé en tant que proprietaire" });
    // throw new Error("Non autorisé en tant que passager ");
  }
});

export const proprietaire = asyncHandler(async (req, res, next) => {
  const roles = await prisma.choixRole.findMany({
    select: {
      role: true,
    },
    where: {
      idUtilisateur: req.user.id,
    },
  });

  const index = roles.findIndex(role => role.role === "proprietaire");
  if (index !== -1) {
    next();
  } else {
    res.status(401);
    res.json({ message: "Non autorisé en tant que proprietaire" });
    // throw new Error("Non autorisé en tant que proprietaire");
  }
});
