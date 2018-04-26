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

INSERT INTO `question` VALUES(1, 'Replacez ces monuments célèbres dans leurs pays respectifs', 'Inde', 'Taj Mahal', 'Etats Unis', 'Empire State Building', 'Pérou', 'Machu Picchu', 'Angleterre', 'Big Ben');
INSERT INTO `question` VALUES(2, 'Quels pays sont traversés par ces fleuves?', 'Amazone', 'Brésil', 'Danube', 'Autriche', 'Colorado', 'Amérique du Nord', 'Mekong', 'Cambodge');
INSERT INTO `question` VALUES(3, 'Complétez ces proverbes', 'Il n\'y a pire sourd que celui', 'qui ne veut pas entendre', 'Tout vient à point à celui', 'qui sait attendre', 'Mettre la charrue', 'avant les bœufs', 'Tant va la cruche à l\'eau qu\'à la fin', 'tu me les brises');
