# Prérequis
Ce projet nécessite PHP en version 5.3 minimum.

# Procédure d'installation :

- Créer une base de données MySQL
- Exécuter le script install.sql
- Ouvrez le fichier connexion.php et saisissez les identifiants et mot de passe d'accès à la base de données

# Spécificités de cette version
Pour éviter la triche, les réponses sont mélangées côté serveur. Le script serveur attribue un identifiant unique à chaque réponse en utilisant la fonction md5.
C'est donc le serveur qui va compter le nombre de bonnes réponses, par l'intermédiaire du script verifie.php.
