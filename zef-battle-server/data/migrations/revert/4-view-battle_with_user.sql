-- Revert zef-battles:4-view-battle_with_user from pg

BEGIN;

DROP VIEW "battle_with_user";

COMMIT;
