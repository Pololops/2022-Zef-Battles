-- Deploy zef-battles:6-views_reorder_by_name to pg

BEGIN;

-- Delete the two views family_with_character and character_with _capacity
DROP VIEW "character_with_capacity" CASCADE;

-- Recreate these two views to with families, characters and capacities, order by name
CREATE VIEW "character_with_capacity" AS
SELECT 
"character".*,
"family"."name" AS "family_name",
COALESCE(SUM("character_has_capacity"."level"), 0) AS "total_level",
COUNT("capacity".*) AS "number_capacity",
COALESCE(jsonb_agg(jsonb_build_object(
  'id', "capacity"."id",
  'name', "capacity"."name",
  'description', "capacity"."description",
  'level', "character_has_capacity"."level"
) ORDER BY "capacity"."name" ASC) FILTER (WHERE "capacity"."id" IS NOT NULL), '[]') AS "capacity"
FROM "character"
JOIN "family" ON "family"."id" = "character"."family_id"
LEFT JOIN "character_has_capacity" ON "character"."id" = "character_has_capacity"."character_id"
LEFT JOIN "capacity" ON "capacity"."id" = "character_has_capacity"."capacity_id"
GROUP BY "character"."id", "family"."name"
ORDER BY "family"."name" ASC, "character"."name" ASC;

CREATE VIEW "family_with_character" AS
SELECT 
	"family".*,
	COALESCE(jsonb_agg("character_with_capacity" ORDER BY "character_with_capacity"."name" ASC) FILTER (WHERE "character_with_capacity"."id" IS NOT NULL), '[]') AS "characters"
FROM "family"
LEFT JOIN "character_with_capacity" ON "character_with_capacity"."family_id" = "family"."id" 
GROUP BY "family"."id"
ORDER BY "family"."name" ASC;



-- Recreate battle_with_usergame view deleted when character_with_capacity view has been dropped
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
