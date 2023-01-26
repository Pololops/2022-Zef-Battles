-- Deploy zef-battles:family_has_user to pg

BEGIN;

ALTER TABLE "family" 
ADD COLUMN "user_id" INT REFERENCES "user"("id");

COMMIT;
