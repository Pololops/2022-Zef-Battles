-- Revert zef-battles:1-schema from pg

BEGIN;

DROP TABLE "user_play_battle_with_character", "character_has_capacity", "user", "battle", "character", "capacity", "family";

COMMIT;
