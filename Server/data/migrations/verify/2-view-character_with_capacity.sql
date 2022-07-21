-- Verify zef-battles:view-character_with_capacity on pg

BEGIN;

SELECT * FROM "character_with_capacity" WHERE false;

ROLLBACK;
