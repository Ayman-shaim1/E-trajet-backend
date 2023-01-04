-- CreateTable
CREATE TABLE `Compte` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `motdepasse` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Compte_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proprietaire` (
    `id` VARCHAR(191) NOT NULL,
    `nomComplete` VARCHAR(191) NOT NULL,
    `gsm` VARCHAR(191) NULL,
    `fixe` VARCHAR(191) NULL,
    `adresse` VARCHAR(191) NULL,
    `idCompte` VARCHAR(191) NOT NULL,
    `idMoyenneDeTransport` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Proprietaire_idCompte_key`(`idCompte`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Passager` (
    `id` VARCHAR(191) NOT NULL,
    `nomComplete` VARCHAR(191) NOT NULL,
    `gsm` VARCHAR(191) NULL,
    `idCompte` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Passager_idCompte_key`(`idCompte`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MoyenneDeTransport` (
    `id` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `nom` VARCHAR(191) NOT NULL,
    `isCalculable` BOOLEAN NOT NULL DEFAULT false,
    `cout_par_metre` DOUBLE NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChoixImagePlace` (
    `idPlace` VARCHAR(191) NOT NULL,
    `idImage` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPlace`, `idImage`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Place` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longtitude` DOUBLE NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voyage` (
    `id` VARCHAR(191) NOT NULL,
    `dateVoyage` DATETIME(3) NOT NULL,
    `statut` VARCHAR(191) NOT NULL,
    `idProprietaire` VARCHAR(191) NOT NULL,
    `idMoyenneDeTransport` VARCHAR(191) NOT NULL,
    `idPassager` VARCHAR(191) NOT NULL,
    `idPlaceDepart` VARCHAR(191) NOT NULL,
    `idPlaceArrivee` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Proprietaire` ADD CONSTRAINT `Proprietaire_idCompte_fkey` FOREIGN KEY (`idCompte`) REFERENCES `Compte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proprietaire` ADD CONSTRAINT `Proprietaire_idMoyenneDeTransport_fkey` FOREIGN KEY (`idMoyenneDeTransport`) REFERENCES `MoyenneDeTransport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passager` ADD CONSTRAINT `Passager_idCompte_fkey` FOREIGN KEY (`idCompte`) REFERENCES `Compte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChoixImagePlace` ADD CONSTRAINT `ChoixImagePlace_idPlace_fkey` FOREIGN KEY (`idPlace`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChoixImagePlace` ADD CONSTRAINT `ChoixImagePlace_idImage_fkey` FOREIGN KEY (`idImage`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idProprietaire_fkey` FOREIGN KEY (`idProprietaire`) REFERENCES `Proprietaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idMoyenneDeTransport_fkey` FOREIGN KEY (`idMoyenneDeTransport`) REFERENCES `MoyenneDeTransport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idPassager_fkey` FOREIGN KEY (`idPassager`) REFERENCES `Passager`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idPlaceDepart_fkey` FOREIGN KEY (`idPlaceDepart`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idPlaceArrivee_fkey` FOREIGN KEY (`idPlaceArrivee`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
