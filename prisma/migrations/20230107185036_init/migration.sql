-- CreateTable
CREATE TABLE `Utilisateur` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `motdepasse` VARCHAR(191) NOT NULL,
    `nomComplete` VARCHAR(191) NOT NULL,
    `gsm` VARCHAR(191) NULL,
    `fixe` VARCHAR(191) NULL,
    `adresse` VARCHAR(191) NULL,
    `verifier` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `idMoyenneDeTransport` VARCHAR(191) NULL,

    UNIQUE INDEX `Utilisateur_email_key`(`email`),
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
    `idPassager` VARCHAR(191) NOT NULL,
    `idProprietaire` VARCHAR(191) NOT NULL,
    `idMoyenneDeTransport` VARCHAR(191) NOT NULL,
    `idPlaceDepart` VARCHAR(191) NOT NULL,
    `idPlaceArrivee` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `libelle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`libelle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChoixRole` (
    `idUtilisateur` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idUtilisateur`, `role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationEmail` (
    `idUtilisateur` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `dateExpiration` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationEmail_idUtilisateur_key`(`idUtilisateur`),
    PRIMARY KEY (`token`, `idUtilisateur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactUsMessage` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `gsm` VARCHAR(191) NOT NULL,
    `nomComplete` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Utilisateur` ADD CONSTRAINT `Utilisateur_idMoyenneDeTransport_fkey` FOREIGN KEY (`idMoyenneDeTransport`) REFERENCES `MoyenneDeTransport`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChoixImagePlace` ADD CONSTRAINT `ChoixImagePlace_idPlace_fkey` FOREIGN KEY (`idPlace`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChoixImagePlace` ADD CONSTRAINT `ChoixImagePlace_idImage_fkey` FOREIGN KEY (`idImage`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idPassager_fkey` FOREIGN KEY (`idPassager`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idProprietaire_fkey` FOREIGN KEY (`idProprietaire`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idMoyenneDeTransport_fkey` FOREIGN KEY (`idMoyenneDeTransport`) REFERENCES `MoyenneDeTransport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idPlaceDepart_fkey` FOREIGN KEY (`idPlaceDepart`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idPlaceArrivee_fkey` FOREIGN KEY (`idPlaceArrivee`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChoixRole` ADD CONSTRAINT `ChoixRole_idUtilisateur_fkey` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChoixRole` ADD CONSTRAINT `ChoixRole_role_fkey` FOREIGN KEY (`role`) REFERENCES `Role`(`libelle`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerificationEmail` ADD CONSTRAINT `VerificationEmail_idUtilisateur_fkey` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
