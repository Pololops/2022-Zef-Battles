-- Verify zef-battles:1-schema on pg

BEGIN;

SELECT * FROM "user" WHERE false;

SELECT * FROM "family" WHERE false;

SELECT * FROM "capacity" WHERE false;

SELECT * FROM "character" WHERE false;

SELECT * FROM "battle" WHERE false;

SELECT * FROM "character_has_capacity" WHERE false;

SELECT * FROM "user_play_battle_with_character" WHERE false;

ROLLBACK;
