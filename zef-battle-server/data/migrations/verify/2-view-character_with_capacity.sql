-- Verify zef-battles:2-view-character_with_capacity on pg

BEGIN;

SELECT * FROM "character_with_capacity" WHERE false;

ROLLBACK;
