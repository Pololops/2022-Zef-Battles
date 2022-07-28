-- Verify zef-battles:5-view-family_with_character on pg

BEGIN;

SELECT * FROM "family_with_character" WHERE false;  

ROLLBACK;
