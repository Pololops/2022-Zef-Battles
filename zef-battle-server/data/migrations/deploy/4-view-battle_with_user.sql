-- Deploy zef-battles:4-view-battle_with_user to pg

BEGIN;

-- Count and list all distinct users into battles (without their character)
CREATE VIEW "battle_with_user" AS
SELECT 
	"battle".*,
	COUNT(DISTINCT "user".*) AS "number_of_players",
	jsonb_agg(jsonb_build_object(
		'id', "user"."id",
		'name', "user"."name",
		'victory_number', "user"."victory_number"
	)) AS players
FROM "battle"
JOIN "user_play_battle_with_character" ON "user_play_battle_with_character"."battle_id" = "battle"."id"
JOIN "user" ON "user"."id" = "user_play_battle_with_character"."user_id"
GROUP BY "battle".*, "battle"."id";

COMMIT;
