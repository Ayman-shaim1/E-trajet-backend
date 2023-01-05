import colors from "colors";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const importData = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("123456", salt);

    // creation de donnees js :
    const moyenneDeTransports = [
      {
        id: uuidv4(),
        nom: "Grand Taxi",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, soluta tempora maiores distinctio corrupti dicta!`,
        icon: "/public/icons/grand-taxi.png",
      },
      {
        id: uuidv4(),
        nom: "Petit taxi",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, soluta tempora maiores distinctio corrupti dicta!`,
        icon: "/public/icons/petit-taxi.png",
        isCalculable: true,
        cout_par_metre: 1.5,
      },
      {
        id: uuidv4(),
        nom: "Tramway",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, soluta tempora maiores distinctio corrupti dicta!`,
        icon: "/public/icons/tramway.png",
      },
      {
        id: uuidv4(),
        nom: "Auto Bus",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, soluta tempora maiores distinctio corrupti dicta!`,
        icon: "/public/icons/autobus.png",
      },
    ];

    const utilisateurs = [
      {
        id: uuidv4(),
        verifier: true,
        email: "jhon@example.com",
        nomComplete: "Jhon Doe",
        motdepasse: password,
        gsm: "+212 06 11 11 11 11",
        // fixe: "+212 05 12 12 12 12",
        adresse:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magni vitae ratione.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        verifier: true,
        email: "steve@example.com",
        nomComplete: "Steve Smith",

        motdepasse: password,
        gsm: "+212 06 22 22 22 22",
        // fixe: "+212 05 12 12 12 12",
        adresse:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magni vitae ratione.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        verifier: true,
        email: "richard@example.com",
        nomComplete: "Richard Roe",
        motdepasse: password,
        gsm: "+212 06 33 33 33 33",
        fixe: "+212 05 33 33 33 33",
        adresse:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magni vitae ratione.",
        createdAt: new Date(),
        updatedAt: new Date(),
        idMoyenneDeTransport: moyenneDeTransports[0].id,
      },
      {
        id: uuidv4(),
        verifier: true,
        email: "max@example.com",
        nomComplete: "Max Mayer",
        motdepasse: password,
        gsm: "+212 06 44 44 44 44",
        fixe: "+212 05 44 44 44 44",
        adresse:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magni vitae ratione.",
        createdAt: new Date(),
        updatedAt: new Date(),
        idMoyenneDeTransport: moyenneDeTransports[1].id,
      },
      {
        id: uuidv4(),
        verifier: true,
        email: "tramway@example.com",
        nomComplete: "Societe Tram-Way",

        motdepasse: password,
        gsm: "+212 06 55 55 55 55",
        fixe: "+212 05 55 55 55 55",
        adresse:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magni vitae ratione.",
        createdAt: new Date(),
        updatedAt: new Date(),
        idMoyenneDeTransport: moyenneDeTransports[2].id,
      },
      {
        id: uuidv4(),
        verifier: true,
        email: "alsa@example.com",
        nomComplete: "Societe Alsa-Bus",

        motdepasse: password,
        gsm: "+212 06 55 55 55 55",
        fixe: "+212 05 55 55 55 55",
        adresse:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magni vitae ratione.",
        createdAt: new Date(),
        updatedAt: new Date(),
        idMoyenneDeTransport: moyenneDeTransports[3].id,
      },
    ];

    const images = [
      { id: uuidv4(), path: "/public/images/avenue-mohamed-cinq-rabat.jpg" },
      { id: uuidv4(), path: "/public/images/quartier-hay-salam-sale.jpg" },
    ];

    const places = [
      {
        id: uuidv4(),
        nom: "Avenue mohammed 5",
        latitude: 34.0409,
        longtitude: -6.8154,
        description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam dolorum harum inventore natus sed perferendis tempore illum ex saepe optio eveniet magnam veritatis vitae dignissimos vel labore praesentium, in reprehenderit.`,
      },
      {
        id: uuidv4(),
        nom: "Hay Salam",
        latitude: 34.040476,
        longtitude: -6.7891548,
        description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam dolorum harum inventore natus sed perferendis tempore illum ex saepe optio eveniet magnam veritatis vitae dignissimos vel labore praesentium, in reprehenderit.`,
      },
    ];

    const choixImagesPlace = [
      {
        idPlace: places[0].id,
        idImage: images[0].id,
      },
      {
        idPlace: places[1].id,
        idImage: images[1].id,
      },
    ];

    const roles = [
      {
        libelle: "admin",
      },
      {
        libelle: "passager",
      },
      {
        libelle: "proprietaire",
      },
    ];

    const choxRoles = [
      {
        idUtilisateur: utilisateurs[0].id,
        role: "passager",
      },
      {
        idUtilisateur: utilisateurs[1].id,
        role: "passager",
      },
      {
        idUtilisateur: utilisateurs[2].id,
        role: "proprietaire",
      },
      {
        idUtilisateur: utilisateurs[3].id,
        role: "proprietaire",
      },
      {
        idUtilisateur: utilisateurs[4].id,
        role: "proprietaire",
      },
    ];

    await prisma.$transaction([
      prisma.moyenneDeTransport.createMany({
        data: moyenneDeTransports,
      }),

      prisma.utilisateur.createMany({
        data: utilisateurs,
      }),
      prisma.image.createMany({
        data: images,
      }),
      prisma.place.createMany({
        data: places,
      }),
      prisma.ChoixImagePlace.createMany({
        data: choixImagesPlace,
      }),
      prisma.role.createMany({
        data: roles,
      }),
      prisma.ChoixRole.createMany({
        data: choxRoles,
      }),
    ]);

    console.log(`Data Imported !`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await prisma.$transaction([
      prisma.ChoixRole.deleteMany({}),
      prisma.role.deleteMany({}),
      prisma.ChoixImagePlace.deleteMany({}),
      prisma.place.deleteMany({}),
      prisma.image.deleteMany({}),
      prisma.verificationEmail.deleteMany({}),
      prisma.utilisateur.deleteMany({}),
      prisma.moyenneDeTransport.deleteMany({}),
    ]);
    console.log(`Data destroyed !`.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
