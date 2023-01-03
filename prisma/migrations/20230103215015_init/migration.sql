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
    `Gsm` VARCHAR(191) NOT NULL,
    `fixe` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `idCompte` VARCHAR(191) NOT NULL,
    `idMoyenneDeTransport` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Proprietaire_idCompte_key`(`idCompte`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Passager` (
    `id` VARCHAR(191) NOT NULL,
    `nomComplete` VARCHAR(191) NOT NULL,
    `fixe` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `idCompte` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Passager_idCompte_key`(`idCompte`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MoyenneDeTransport` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `isCalculable` BOOLEAN NOT NULL DEFAULT false,
    `cout_par_metre` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Place` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longtitude` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,

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
    `idPaceDepart` VARCHAR(191) NOT NULL,
    `idPaceArrivee` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Proprietaire` ADD CONSTRAINT `Proprietaire_idCompte_fkey` FOREIGN KEY (`idCompte`) REFERENCES `Compte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proprietaire` ADD CONSTRAINT `Proprietaire_idMoyenneDeTransport_fkey` FOREIGN KEY (`idMoyenneDeTransport`) REFERENCES `MoyenneDeTransport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passager` ADD CONSTRAINT `Passager_idCompte_fkey` FOREIGN KEY (`idCompte`) REFERENCES `Compte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idProprietaire_fkey` FOREIGN KEY (`idProprietaire`) REFERENCES `Proprietaire`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idMoyenneDeTransport_fkey` FOREIGN KEY (`idMoyenneDeTransport`) REFERENCES `MoyenneDeTransport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idPassager_fkey` FOREIGN KEY (`idPassager`) REFERENCES `Passager`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idPaceDepart_fkey` FOREIGN KEY (`idPaceDepart`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voyage` ADD CONSTRAINT `Voyage_idPaceArrivee_fkey` FOREIGN KEY (`idPaceArrivee`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
