-- Verify zef-battles:6-views_reorder_by_name on pg

BEGIN;

SELECT * FROM "character_with_capacity" WHERE false; 
SELECT * FROM "family_with_character" WHERE false; 
SELECT * FROM "battle_with_usergame" WHERE false; 

ROLLBACK;
