Ecrit en powershell qui est le langage de scripting natif sur Windows depuis Vista ce qui permet d'alléger les contraintes d'intégrité et assurer une compatibilité maximale.


Une fois téléchargé, déplacez "Installer.ps1" vers un repertoire de travail qui vous convient.
Clic droit sur "Installer.ps1", et "executer avec Powershell". Ceci procédera à :
-L'installation de Python 2.7 version 32 bits pour Windows
-L'ajout au PATH de Windows de python et de ses scripts
-Téléchargera le code source du livrable
-Installera les dépendances du code source du livrable

A la fin de l'installation - qui nécessite une connexion à Internet -  vous verrez apparaître dans le repertoire de travail depuis lequel "Installer.ps1" a été exécuté :
2 Dossier:
-Target : Placez ici, les .xlsx IFA dont vous souhaitez procéder au traitement.
-Source_Code : Ici le code du livrable est enregistré, y accéder pour des raisons de maintenance et d'évolution seulement.
1 fichier:
-Parser.ps1 : script powershell à exécuter par un clic droit. Celui-ci collectera les .xslsx que vous avez placé dans le repertoire Target et les moulinera. Les résultats seront placés dans un nouveau repertoire qui portera le nom de la date_heure_minute_seconde de l'execution du script "Parser.ps1".
Au sein du repertoire destination, l'arborescence suivante sera créé :
Année -> Quarter -> Produit_DRP ->
EXPORTS : Contient les trade matrix parsées
PROD :      Contient les productions parsées
ONLY_CUM.csv : Contient les données parsées cumulées transformées en matrice OCP
FINAL_DECUM.csv : Contient les données parsées cumulées + décumulées : prêtes à la publication
où DRP = {DET,AGG,ANN}

CONDITIONS D'UTILISATION
Les fichiers .xslx sont nommés suivant la convention:
PROCESSED_PHOSPHATES_NUTRIENT_20xx_Qx_DRP.xslsx : Données trimestrielles de type DRP
PHOSPHATE_ROCK_PRODUCT_20xx_Qx_DRP.xlsx               : Données trimestrielles de type DRP
PROCESSED_PHOSPHATES_NUTRIENT_20xx.xlsx                  : Données annuelles
PHOSPHATE_ROCK_PRODUCT_20xx.xlsx                              : Données annuelles
Les fichiers .xslx ne contiennent aucune feuille vide
La dernière case de la première ligne de toute feuille excel commence par PIT
La case 'AX' contenant 'xQ 20xx' se trouve à la ligne X qui contient la liste des pays exportateurs
Seuls les titres des feuilles d'exports contiennent le mot "xport"
Les feuilles de productions ciblées ne contiennent pas le mot "rade" dans la case 'A1'
Les lignes des matrices des feuilles de production ciblées suivent la norme suivante :
Pays producteur,CV,Production Année N-2,CV,Production Année N-1,CV,Production année N,CV,Pourcentage,CV,Total Deliveries  Année N-2,CV,Total Deliveries Année N-1,CV,Total Deliveries Année N,CV,Pourcentage,CV,Home Deliveries  Année N-2,CV,Home Deliveries Année N-1,CV,Home Deliveries Année N,CV,Pourcentage,CV,EXPORTS  Année N-2,CV,EXPORTS Année N-1,CV,EXPORTS Année N,CV,Pourcentage
CV = Case Vide
La case Pourcentage est une formule, i.e commence par "=IF", et est négligé par le parseur
La dernière ligne de toute matrice contient le mot "ORLD" ou "orld"
Les lignes de données ne commencent pas le mot "otal" ni par une case vide
Le mot "by Destination" se trouve dans la case 'A1' des feuilles d'export et pas le mot 'BPL'
La première région suivie de la liste des pays importateurs est en dessous d'une case contenant le mot "ountries"
Les pays exportateurs se trouvent après une case contenant le mot "ountries"
Les lignes des régions possèdent une case vide à la colonne "E"


Tous les .xslx IFA exports et productions que j'ai traité possèdent ces propriétés, toute déviation de ces règles entraînerait un mauvais comportement du Parsing. Certaines déviation sont gérées, d'autres non.