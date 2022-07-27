-- Verify zef-battles:3-view-battle_with_usergame on pg

BEGIN;

SELECT * FROM "battle_with_usergame" WHERE false;

ROLLBACK;
