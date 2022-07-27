-- Verify zef-battles:4-view-battle_with_user on pg

BEGIN;

SELECT * FROM "battle_with_user" WHERE false;

ROLLBACK;
