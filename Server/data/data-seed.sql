BEGIN;
TRUNCATE 
  "user_play_battle_with_character", 
  "character_has_capacity", 
  "character", 
  "capacity", 
  "family", 
  "user" 
  RESTART IDENTITY CASCADE;
COMMIT;

BEGIN;

INSERT INTO "user" ("name", "password", "role") VALUES 
  ('Paul', 'test', 'player'),
  ('Zéphyr', 'test', 'admin');

INSERT INTO "family" ("name") VALUES 
  ('Pokémons'),
  ('Schtroumpfs');

INSERT INTO "capacity" ("name", "description") VALUES 
  ('Sorcellerie', 'préparation de potions magiques'),
  ('Force', 'plein de muscles'),
  ('Beauté', 'de beaux yeux et de beaux cheveux');

INSERT INTO "character" ("name", "family_id") VALUES 
  ('Pikachu', 1),
  ('Bulbizarre', 1),
  ('Grand Schtroumpf', 2),
  ('Schtroumpf Costaud', 2),
  ('Schtroumpf à Lunette', 2),
  ('Schtroumpfette', 2),
  ('Schtroumpf Coquet', 2);

INSERT INTO "character_has_capacity" ("character_id", "capacity_id", "level") VALUES 
  (3, 1, 100),
  (4, 2, 100),
  (4, 3, 50),
  (6, 3, 100),
  (7, 3, 75),
  (1, 1, 25);

INSERT INTO "battle" ("start_date", "wished_player_number", "is_started") VALUES
    (NOW(), 2, TRUE),
    (NOW(), 2, TRUE),
    (NOW(), 2, FALSE);

INSERT INTO "user_play_battle_with_character" ("battle_id", "user_id", "character_id", "is_playable") VALUES
  (1, 1, 3, TRUE),
  (1, 2, 4, TRUE),
  (1, 1, 5, FALSE),
  (1, 2, 6, FALSE),
  (2, 1, 1, TRUE),
  (2, 2, 2, FALSE),
  (3, 1, NULL, NULL);

COMMIT;