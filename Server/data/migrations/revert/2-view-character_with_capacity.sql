-- Revert zef-battles:view-character_with_capacity from pg

BEGIN;

DROP VIEW "character_with_capacity";

COMMIT;
