-- Revert zef-battles:3-view-battle_with_usergame from pg

BEGIN;

DROP VIEW "battle_with_usergame";  

COMMIT;
