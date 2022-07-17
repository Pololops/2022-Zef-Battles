BEGIN;
TRUNCATE "character_has_capacity", "character", "capacity", "family", "user" RESTART IDENTITY CASCADE;
COMMIT;

BEGIN;

INSERT INTO "user" ("name", "password", "role") VALUES 
  ('Paul', 'test', 'player'),
  ('Zéphyr', 'test', 'admin');

INSERT INTO "family" ("name") VALUES 
  ('Pokémons'),
  ('Schtroumpfs');

INSERT INTO "capacity" ("name", "description") VALUES 
  ('sorcellerie', 'préparation de potions magiques'),
  ('force', 'plein de muscles'),
  ('beauté', 'de beaux yeux et de beaux cheveux');

INSERT INTO "character" ("name", "picture", "family_id") VALUES 
  ('Pikachu', '/', 1),
  ('Bulbizarre', '/', 1),
  ('Grand Schtroumpf', '/', 2),
  ('Schtroumpf Costaud', '/', 2),
  ('Schtroumpf à Lunette', '/', 2),
  ('Schtroumpfette', '/', 2),
  ('Schtroumpf Coquet', '/', 2);

INSERT INTO "character_has_capacity" ("character_id", "capacity_id", "level") VALUES 
  (3, 1, 100),
  (4, 2, 100),
  (4, 3, 50),
  (6, 3, 100),
  (7, 3, 75);

COMMIT;