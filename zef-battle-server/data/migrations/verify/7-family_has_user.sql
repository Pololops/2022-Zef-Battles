-- Verify zef-battles:family_has_user on pg

BEGIN;

SELECT "user_id" FROM "family" WHERE false;
SELECT * FROM "family_with_character" WHERE false; 

ROLLBACK;
