-- Deploy zef-battles:2-view-character_with_capacity to pg

BEGIN;

-- Returns all characters with their capacities
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
	)) FILTER (WHERE "capacity"."id" IS NOT NULL), '[]') AS "capacity"
	FROM "character"
	JOIN "family" ON "family"."id" = "character"."family_id"
	LEFT JOIN "character_has_capacity" ON "character"."id" = "character_has_capacity"."character_id"
	LEFT JOIN "capacity" ON "capacity"."id" = "character_has_capacity"."capacity_id"
	GROUP BY "character"."id", "family"."name"
;

COMMIT;
