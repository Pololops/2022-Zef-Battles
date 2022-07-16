-- Deploy zef-battles:1-schema to pg

BEGIN;

CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "vistory_number" INT NOT NULL DEFAULT 0,
  "role" TEXT NOT NULL DEFAULT 'player'
);

CREATE TABLE "family" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL
);

CREATE TABLE "capacity" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "description" TEXT
);

CREATE TABLE "character" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "picture" TEXT NOT NULL,
  "family_id" INT NOT NULL REFERENCES "family"("id")
);

CREATE TABLE "battle" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "wished_player_number" INT NOT NULL DEFAULT 2,
  "start_date" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "character_has_capacity" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "character_id" INT NOT NULL REFERENCES "character"("id") ON DELETE CASCADE,
  "capacity_id" INT NOT NULL REFERENCES "capacity"("id") ON DELETE CASCADE,
  "level" INT NOT NULL DEFAULT 0
);

CREATE TABLE "user_play_battle_with_character" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "battle_id" INT NOT NULL REFERENCES "battle"("id") ON DELETE CASCADE,
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "character_id" INT NOT NULL REFERENCES "character"("id") ON DELETE CASCADE,
  "is_playable" BOOL NOT NULL DEFAULT TRUE
);

COMMIT;
