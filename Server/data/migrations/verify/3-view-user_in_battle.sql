-- Verify zef-battles:3-view-user_in_battle on pg

BEGIN;

SELECT * FROM "user_in_battle" WHERE false;

ROLLBACK;
