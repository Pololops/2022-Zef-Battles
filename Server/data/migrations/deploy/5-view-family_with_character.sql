-- Deploy zef-battles:5-view-family_with_character to pg

BEGIN;

-- List families with characters and for each of them their capacities
CREATE VIEW "family_with_character" AS 
SELECT 
	"family".*,
	COALESCE(jsonb_agg("character_with_capacity") FILTER (WHERE "character_with_capacity"."id" IS NOT NULL), '[]') AS "characters"
FROM "family"
LEFT JOIN "character_with_capacity" ON "character_with_capacity"."family_id" = "family"."id"
GROUP BY "family"."id";

COMMIT;
