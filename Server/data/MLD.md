## __MLD :__

**USER** (__user_num__, name, password, victory_number, role)

**FAMILY** (__family_num__, name)

**CAPACITY** (__capacity_num__, name, description)

**CHARACTER** (__character_num__, name, picture, _#family_num_)

**BATTLE** (__battle_num__, wished_player_number, start_date)

&nbsp;

**CHARACTER_HAS_CAPACITY** (_#capacity_num_, _#character_num_, level)

**USER_PLAY_BATTLE_WITH_CHARACTER** (_#battle_num_, _#user_num_, _#character_num_, is_playable)

&nbsp;

## __Data dictionary  |  Dictionnaire des données :__

__USER__  
| Champ	| Type | Spécificités | Description |  
| --- | --- | --- | --- |
| id | INTEGER | PRIMARY KEY, NOT NULL, AUTO_INCREMENT | The unique user identifier |  
| name | TEXT | NOT NULL | The user surname and login |  
| password | TEXT | NOT NULL | The hashed user password |  
| victory_number | INTEGER | NOT NULL, DEFAULT 0 | The number of game victory |  
| role | TEXT | NOT NULL, DEFAULT "player" | The user role (administrator, player, bot) |

&nbsp;

__FAMILY__  
| Champ	| Type | Spécificités | Description |  
| --- | --- | --- | --- |
| id | INTEGER | PRIMARY KEY, NOT NULL, AUTO_INCREMENT | The unique family identifier |  
| name | TEXT | NOT NULL | The family name |

&nbsp;

__CAPACITY__  
| Champ	| Type | Spécificités | Description |  
| --- | --- | --- | --- |
| id | INTEGER | PRIMARY KEY, NOT NULL, AUTO_INCREMENT | The unique capacity identifier |  
| name | TEXT | NOT NULL | The capacity name |  
| description | TEXT  |  |  the capacity explanation|

&nbsp;

__CHARACTER__  
| Champ	| Type | Spécificités | Description |  
| --- | --- | --- | --- |
| id | INTEGER | PRIMARY KEY, NOT NULL, AUTO_INCREMENT | The unique character identifier |  
| name | TEXT | NOT NULL | The charater name |  
| picture | TEXT |  | the character image |  
| family_id | INTEGER | REFERENCE family(id) | A family idenfitier |

&nbsp;

__BATTLE__  
| Champ	| Type | Spécificités | Description |  
| --- | --- | --- | --- |
| id | INTEGER | PRIMARY KEY, NOT NULL, AUTO_INCREMENT | The unique battle identifier |  
| wished_player_number | INTEGER | NOT NULL, DEFAULT 2 | The number of players wished in the battle |  
| start_date | TIMESTAMPTZ | NOT NULL, DEFAULT NOW | The date and time of the start of the battle |

&nbsp;

__CHARACTER_HAS_CAPACITY__  
| Champ	| Type | Spécificités | Description |  
| --- | --- | --- | --- |
| id | INTEGER | PRIMARY KEY, NOT NULL, AUTO_INCREMENT | The unique association identifier |  
| character_id | INTEGER | REFERENCE character(id) | A character identifier |  
| capacity_id | INTEGER | REFERENCE capacty(id) | A capacity identifier |  
| level | INTEGER | NOT NULL, DEFAULT 0 | The capacity level of the user |

&nbsp;

__USER_PLAY_BATTLE_WITH_CHARACTER__  
| Champ	| Type | Spécificités | Description |  
| --- | --- | --- | --- |
| id | INTEGER | PRIMARY KEY, NOT NULL, AUTO_INCREMENT | The unique association identifier |  
| battle_id | INTEGER | REFERENCE battle(id) | A battle identifier |  
| user_id | INTEGER | REFERENCE user(id) | A user identifier |  
| character_id | INTEGER | REFERENCE character(id) | A character identifier |  
| is_playable | BOOLEAN | NOT NULL, DEFAULT TRUE | Indicates whether the character is playable or not |