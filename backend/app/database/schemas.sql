CREATE TYPE type_monster AS ENUM(
    'Amphibian',
    'Bird Wyvern',
    'Brute Wyver',
    'Carapaceon',
    'Cephalopod',
    'Construct',
    'Demi Elder',
    'Elder Dragon',
    'Fanged Beast',
    'Fanged Wyvern',
    'Flying Wyvern',
    'Leviathan',
    'Neopteron',
    'Piscine Wyvern',
    'Snake Wyvern',
    'Temnoceran',
    'Unknown'
);

CREATE TABLE Monsters (
    Monster_id SERIAL PRIMARY KEY,
    Name VARCHAR(55),
    Img VARCHAR(255),
    Description VARCHAR(1000),
    Wtr_res INT,
    Fr_res INT,
    Ice_res INT,
    Drg_res INT,
    Elc_res INT,
    Type type_monster
);

CREATE TABLE Regions (

);