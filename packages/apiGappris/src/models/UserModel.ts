/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-len */
// Création d'un user:
// La création du document associé au user se fait à la complétion du hook onCreate de firebaseAuth
// À ce moment le compte peut ne pas etre activé
//
// IL FAUT QUE LE CLIENT (mobile ou web) ENVOIE LE COURRIEL DE VÉRIFICATION (sendemailverification)
// Lors de la connexion (web/mobile) le client doit AUSSI check si le user.isverified qui retourne true si le courriel du compte est vérifié.


// Cron job qui regarde chaque jour si les users sont isVerified. Si le user n'est pas vérified et que ca fait plus de 24 heures alors on
// Supprime l'entrée de la base de donnée.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UserModelApi = {
    id: string; // Nom du document de la collection USER
    email: string; // Email du user ( utile pour la recherche de contributeurs )
    // authLevel: AuthLevel; // Niveau d'autorisation du compte

    // Un user suis plusieurs cours, et pour chaque cours il y a une structure de donnée de
    Progress : {
        score : number, // incrémenté une fois qu'une la leçon est complétée (fancy feature serait d'augmenter aussi quand on complète d'autres choses)

        sectionProgress: {
            units: [],
            controlPoint: boolean | null;
        };
        // Section progress {section[ unit [ lessons done/tot lesson  ] ]}   pour chaque lesson : id + un boolean isDone;
    }
    PriorityQ : {} // array questions + int days (apprentissage espacé)
    FailedQ : {} // array questions            (mode pratique des erreurs)

    // Opérations communes:
    // Delete/Désabonne un cours: il faut deleter les 3 entrées
    // Ajout un cours : il faut modifier les 3 entrées
    // Un étuduant complète une lesson: update les 3 tables;
    // Start une leçon : le client doit regarder le PriorityQ
    // Start une leçon de type pratique les erreurs : regarder la FailedQ

    // Opération sur progress
    // Quand un étudiant complète une lesson:
    // Il faut changer le boolean isDone pour la lesson dans la structure de donnée
    // Remonter la structure pour évaluer si l'unité est complétée / la section

    // Uniquement sur user admin:
    // id dees users
    arrayOfWaitingTeachers: string[];
};
