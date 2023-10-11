-- CreateTable
CREATE TABLE `dd_users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `dd_users_email_key`(`email`),
    FULLTEXT INDEX `dd_users_name_email_idx`(`name`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dd_softwares` (
    `id` VARCHAR(191) NOT NULL,
    `id_sgp` VARCHAR(191) NOT NULL,
    `nf` VARCHAR(191) NOT NULL,
    `tipo_de_registro` VARCHAR(191) NOT NULL,
    `tipo_de_licenca` VARCHAR(191) NOT NULL,
    `pacote` VARCHAR(191) NOT NULL,
    `software` VARCHAR(191) NOT NULL,
    `responsavel` VARCHAR(191) NOT NULL,
    `fornecedor` VARCHAR(191) NOT NULL,
    `contato_do_fornecedor` VARCHAR(191) NOT NULL,
    `centro_de_custo` VARCHAR(191) NOT NULL,
    `forma_de_pagamento` VARCHAR(191) NOT NULL,
    `moeda_de_pagamento` VARCHAR(191) NOT NULL,
    `valor_moeda_original` DOUBLE NOT NULL,
    `valor_reais` DOUBLE NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `data_de_inicio` DATETIME(3) NOT NULL,
    `data_de_termino` DATETIME(3) NOT NULL,
    `observacoes` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dd_licenses` (
    `id` VARCHAR(191) NOT NULL,
    `software` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `chave` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `gerente` VARCHAR(191) NOT NULL,
    `produto` VARCHAR(191) NOT NULL,
    `observacoes` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dd_panels` (
    `id` VARCHAR(191) NOT NULL,
    `software` VARCHAR(191) NOT NULL,
    `fornecedor` VARCHAR(191) NOT NULL,
    `plataforma` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dd_logs` (
    `id` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `table` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `localizator` VARCHAR(191) NOT NULL,
    `item` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `softwareId` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
