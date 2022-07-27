-- Revert zef-battles:2-view-character_with_capacity from pg

BEGIN;

DROP VIEW "character_with_capacity";

COMMIT;
