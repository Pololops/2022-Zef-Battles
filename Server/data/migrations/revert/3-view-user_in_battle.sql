-- Revert zef-battles:3-view-user_in_battle from pg

BEGIN;

DROP VIEW "user_in_battle";  

COMMIT;
