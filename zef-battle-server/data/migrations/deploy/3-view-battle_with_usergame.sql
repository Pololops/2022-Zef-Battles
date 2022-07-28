-- Deploy zef-battles:3-view-battle_with_usergame to pg

BEGIN;

-- Returns all association between battles and users with the user's characters
CREATE VIEW "battle_with_usergame" AS
SELECT 
	"user_play_battle_with_character"."battle_id" AS "battle_id",
	"battle"."is_started" AS "battle_is_started",
	"battle"."wished_player_number" AS "battle_wished_number_of_players",
	"user"."id" AS "user_id",
	"user"."name" AS "user_name",
	"user"."victory_number" AS "user_victory",
	COALESCE(jsonb_agg("character_with_capacity") FILTER (WHERE "user_play_battle_with_character"."is_playable" = true), '[]') AS "playable_characters",
	COALESCE(jsonb_agg("character_with_capacity") FILTER (WHERE "user_play_battle_with_character"."is_playable" = false), '[]') AS "not_playable_characters"
FROM "user_play_battle_with_character"
JOIN "user" ON "user"."id" = "user_play_battle_with_character"."user_id" 
JOIN "battle" ON "battle"."id" = "user_play_battle_with_character"."battle_id" 
LEFT JOIN "character_with_capacity" ON "character_with_capacity"."id" = "user_play_battle_with_character"."character_id"
GROUP BY "user_play_battle_with_character"."battle_id", "user"."id", "battle"."is_started",  "battle"."wished_player_number";
COMMIT;
