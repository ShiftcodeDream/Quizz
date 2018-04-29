CREATE TABLE question(
  numero integer PRIMARY KEY,
  question varchar(500),
  def1 varchar(500),
  nom1 varchar(500),
  def2 varchar(500),
  nom2 varchar(500),
  def3 varchar(500),
  nom3 varchar(500),
  def4 varchar(500),
  nom4 varchar(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO question VALUES(1, 'Replace ces monuments célèbres dans leurs pays d\'origine', 'Taj Mahal', 'Inde', 'Empire State Building', 'Etats Unis', 'Machu Picchu', 'Pérou', 'Big Ben', 'Angleterre');
INSERT INTO question VALUES(2, 'Quels pays sont traversés par ces fleuves?', 'Amazone', 'Brésil', 'Danube', 'Autriche', 'Colorado', 'Amérique du Nord', 'Mekong', 'Cambodge');
INSERT INTO question VALUES(3, 'Complète ces proverbes', 'Il n\'y a pire sourd que celui', 'qui ne veut pas entendre', 'Tout vient à point à celui', 'qui sait attendre', 'Mettre la charrue', 'avant les bœufs', 'Tant va la cruche à l\'eau qu\'à la fin', 'tu me les brises');
INSERT INTO question VALUES(4, 'Retrouve à quelles séries et films se rapportent ces personnages', 'L\'agence tous risques', 'Looping', 'Kaamelot', 'Les chevaliers aux Lions', 'South Park', 'Kenny', 'Superman', 'Clark');
