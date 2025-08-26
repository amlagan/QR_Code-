/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/


import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

// Étape 1 : Pose une question à l'utilisateur
inquirer
  .prompt([
    {
      message: "Entre une URL pour générer un QR code :",
      name: "url",  // La réponse sera stockée ici
    },
  ])
  .then((answers) => {
    const url = answers.url;  // Récupère l'URL entrée par l'utilisateur

    // Étape 2 : Génère une image de type PNG contenant le QR code
    const qr_png = qr.image(url, { type: 'png' });

    // Sauvegarde l'image dans un fichier nommé 'qr_code.png'
    qr_png.pipe(fs.createWriteStream('qr_code.png'));

    // Étape 3 : Crée un fichier texte pour enregistrer l'URL entrée
    fs.writeFile('URL_saisie.txt', url, (err) => {
      if (err) throw err;
      console.log("✅ QR code généré et URL sauvegardée dans 'URL_saisie.txt'");
    });
  })
  .catch((error) => {
    console.error("❌ Une erreur est survenue :", error);
  });
