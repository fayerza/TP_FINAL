--PUEDE SERVIR=?¿ comando de bash
--docker exec -i postgres_MH psql -U postgres -d monsterHunter_DB < ./backend/database/init.sql

DROP TYPE IF EXISTS type_monster;
DROP TYPE IF EXISTS type_weather;
DROP TYPE IF EXISTS type_attack;
DROP TYPE IF EXISTS type_element;
DROP TYPE IF EXISTS type_weapon;

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

CREATE TYPE type_weather AS ENUM(
    'Cold',
    'Hot',
    'Mild'
);

CREATE TYPE type_attack AS ENUM(
    'Impact',
    'Cutting'
);

CREATE TYPE type_element AS ENUM(
    'Ice',
    'Fire',
    'Electric',
    'Dragon',
    'Water',
    'None'
);

CREATE TYPE type_weapon AS ENUM(
    'Great Sword',
    'Long Sword',
    'Sword & Shiled',
    'Dual Blades',
    'Hammer',
    'Lance'
);

DROP TABLE IF EXISTS Monsters;
DROP TABLE IF EXISTS Regions;
DROP TABLE IF EXISTS Monsters_Regions;
DROP TABLE IF EXISTS Monster_Atks;
DROP TABLE IF EXISTS Weapons;
DROP TABLE IF EXISTS Weapons_Atks;
DROP TABLE IF EXISTS Atks;

CREATE TABLE Monsters (
    Monster_id SERIAL PRIMARY KEY,
    Name VARCHAR(55) NOT NULL,
    Img VARCHAR(255),
    Description VARCHAR(1000) NOT NULL,
    Wtr_res INT NOT NULL,
    Fr_res INT NOT NULL,
    Ice_res INT NOT NULL,
    Drg_res INT NOT NULL,
    Elc_res INT NOT NULL,
    Type type_monster NOT NULL,
    Og_game VARCHAR(55),
    Difficulty FLOAT NOT NULL
);

CREATE TABLE Regions (
    Region_id SERIAL PRIMARY KEY,
    Name VARCHAR(55),
    Img VARCHAR(255),
    Weather type_weather NOT NULL,
    Description VARCHAR(1000) NOT NULL,
    Num_Areas INT NOT NULL,
    Og_game VARCHAR(255)
);

CREATE TABLE Monsters_Regions (
    Region_id INT,
    Monster_id INT,
    PRIMARY KEY(Region_id, Monster_id),
    FOREIGN KEY (Region_id) REFERENCES Regions(Region_id) ON DELETE CASCADE,
    FOREIGN KEY (Monster_id) REFERENCES Monsters(Monster_id) ON DELETE CASCADE
);

CREATE TABLE Monster_Atks(
    Atk_id SERIAL PRIMARY KEY,
    Atk_element type_element NOT NULL,
    Dmg INT NOT NULL,
    Name VARCHAR(55) NOT NULL,
    Monster_id INT REFERENCES Monsters(Monster_id) ON DELETE CASCADE
);

CREATE TABLE Weapons(
    Weapon_id SERIAL PRIMARY KEY,
    Type type_weapon NOT NULL,
    Img VARCHAR(255),
    Element type_element NOT NULL,
    Affinity FLOAT NOT NULL,
    Dmg FLOAT NOT NULL,
    Elem_dmg FLOAT NOT NULL,
    Sharpness FLOAT NOT NULL,
    Rarity INT NOT NULL
);

CREATE TABLE Attacks(
    Attack_id SERIAL PRIMARY KEY,
    Name VARCHAR(55) NOT NULL,
    Description VARCHAR(1000) NOT NULL,
    Type type_attack NOT NULL
);

CREATE TABLE Weapons_Attacks(
    Attack_id INT,
    Weapon_id INT,
    PRIMARY KEY(Weapon_id, Attack_id),
    FOREIGN KEY (Weapon_id) REFERENCES Weapons(Weapon_id),
    FOREIGN KEY (Attack_id) REFERENCES Attacks(Attack_id)
);