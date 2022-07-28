-- Revert zef-battles:5-view-family_with_character from pg

BEGIN;

DROP VIEW "family_with_character";  

COMMIT;
