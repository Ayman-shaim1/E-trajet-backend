import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../services/mailServices.js";
const prisma = new PrismaClient();

// @desc    Send message to us
// @route   POST /api/contact/
// @access  Public
export const contact = asyncHandler(async (req, res) => {
  try {
    const { email, gsm, nomComplete, message } = req.body;

    // send email :

    // const subject = `${nomComplete} send to us a message`;
    // sendEmail({
    //   from: email,
    //   to: process.env.EMAIL,
    //   subject: subject,
    //   content: message,
    // });

    // save message :
    await prisma.contactUsMessage.create({
      data: {
        email,
        gsm,
        nomComplete,
        message,
      },
    });

    // send resposne :
    res.json({
      message: `message envoye avec success`,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
