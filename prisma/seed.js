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

    const comptes = [
      {
        id: uuidv4(),
        email: "jhon@example.com",
        motdepasse: password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        email: "steve@example.com",
        motdepasse: password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        email: "richard@example.com",
        motdepasse: password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        email: "max@example.com",
        motdepasse: password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        email: "tramway@example.com",
        motdepasse: password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        email: "alsa@example.com",
        motdepasse: password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const passagers = [
      {
        id: uuidv4(),
        nomComplete: "John Doe",
        gsm: "+212 06 11 22 33 44",
        idCompte: comptes[0].id,
      },
      {
        id: uuidv4(),
        nomComplete: "Steve Smith",
        gsm: "+212 06 55 66 77 88",
        idCompte: comptes[1].id,
      },
    ];

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

    const proprietaires = [
      {
        id: uuidv4(),
        nomComplete: "Richard Roe",
        gsm: "+212 06 10 11 12 13",
        adresse:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magni vitae ratione.",
        idCompte: comptes[2].id,
        idMoyenneDeTransport: moyenneDeTransports[0].id,
      },
      {
        id: uuidv4(),
        nomComplete: "Max Mayer",
        gsm: "+212 06 33 33 44 44",
        adresse:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magni vitae ratione.",
        idCompte: comptes[3].id,
        idMoyenneDeTransport: moyenneDeTransports[1].id,
      },
      {
        id: uuidv4(),
        nomComplete: "Societe Tram-Way",
        gsm: "+212 06 99 98 89 00",
        fixe: "+212 05 12 12 12 12",
        adresse:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magni vitae ratione.",
        idCompte: comptes[4].id,
        idMoyenneDeTransport: moyenneDeTransports[2].id,
      },
      {
        id: uuidv4(),
        nomComplete: "Societe Alsa-Bus",
        gsm: "+212 06 00 00 77 77",
        fixe: "+212 05 15 15 15 15",
        adresse:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magni vitae ratione.",
        idCompte: comptes[5].id,
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

    await prisma.$transaction([
      prisma.compte.createMany({
        data: comptes,
      }),
      prisma.moyenneDeTransport.createMany({
        data: moyenneDeTransports,
      }),
      prisma.passager.createMany({
        data: passagers,
      }),
      prisma.proprietaire.createMany({
        data: proprietaires,
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
      prisma.voyage.deleteMany({}),
      prisma.proprietaire.deleteMany({}),
      prisma.passager.deleteMany({}),
      prisma.moyenneDeTransport.deleteMany({}),
      prisma.image.deleteMany({}),
      prisma.place.deleteMany({}),
      prisma.choixImagePlace.deleteMany({}),

      prisma.compte.deleteMany({}),
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
