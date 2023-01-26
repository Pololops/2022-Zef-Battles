-- Deploy zef-battles:family_has_user to pg

BEGIN;

DROP VIEW "family_with_character";

ALTER TABLE "family" 
ADD COLUMN "user_id" INT REFERENCES "user"("id");

CREATE VIEW "family_with_character" AS 
SELECT 
	"family".*,
	COALESCE(jsonb_agg("character_with_capacity") FILTER (WHERE "character_with_capacity"."id" IS NOT NULL), '[]') AS "characters"
FROM "family"
LEFT JOIN "character_with_capacity" ON "character_with_capacity"."family_id" = "family"."id"
GROUP BY "family"."id";

COMMIT;
