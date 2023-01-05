import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// @desc    Recuper les moyennes de transports
// @route   GET /api/moyennesdetransports
// @access  Private
export const getMoyennesDeTransports = asyncHandler(async (req, res) => {
  const moyennesdetransports = await prisma.moyenneDeTransport.findMany({});
  res.json(moyennesdetransports);
});
