

import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

// Poser des question pour le qr 
inquirer
    .prompt([
        {
            name: "number",
            message : "📞 Enter the number :",
            type: "input"
        },
        {
            name: "message",
            message: "💬 your message :",
            type: "input"
        }
            
        ])
    .then((answers) => {
        const number = answers.number;
        const message = encodeURIComponent(answers.message);

        // Creation du lien WhatsApp
        const WhatsAppUrl = `https://wa.me/${number}?text=${message}`;

        // Generer le QR Code dans a partir du lien 
        const qr_code = qr.image(WhatsAppUrl, {type: "png"});

        // Sauvegarde le QR code dans un fichier
        qr_code.pipe(fs.createWriteStream('qr_code_whatsapp.png'));

         // Sauvegarde le lien dans un fichier texte
        fs.writeFile('lien_whatsapp.txt', WhatsAppUrl, (err) => {
        if (err) throw err;
        console.log("✅ QR code WhatsApp généré avec succès !");
        console.log(`📎 Lien : ${WhatsAppUrl}`);
    });
        
    });

