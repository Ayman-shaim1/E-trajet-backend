# E-trajet (Backend)

### 1. installer les dependences :

npm install --save

### 2. creation de la base de donnees + les tables :

npx prisma migrate dev --name init

### 3. insertion des donnees sur la base de donnees :

npm run data:import

### 4. lancement du serveur :

npm run server
