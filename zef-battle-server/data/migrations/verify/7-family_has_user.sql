-- Verify zef-battles:family_has_user on pg

BEGIN;

SELECT "user_id" FROM "family" WHERE false;

ROLLBACK;
