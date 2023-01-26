-- Revert zef-battles:family_has_user from pg

BEGIN;

ALTER TABLE "family" 
DROP COLUMN "user_id";

COMMIT;
