INSERT INTO Monsters (
    Name, Img, Description, Wtr_res, Fr_res, Ice_res, Drg_res, Elc_res,
    Type, Og_game, Difficulty
) VALUES (
    'Rathalos',
    'https://example.com/images/rathalos.png',
    'A Flying Wyvern known as the King of the Skies. Breathes fire and dominates the skies.',
    2, 5, 1, 4, 3,
    'Flying Wyvern',
    'Monster Hunter',
    3.5
);

INSERT INTO Monsters (
    Name, Img, Description, Wtr_res, Fr_res, Ice_res, Drg_res, Elc_res,
    Type, Og_game, Difficulty
) VALUES (
    'Zinogre',
    'https://example.com/images/zinogre.png',
    'A Fanged Wyvern that charges itself with electricity to enhance its attacks. Agile and relentless.',
    1, 2, 3, 2, 5,
    'Fanged Wyvern',
    'Monster Hunter Portable 3rd',
    4.2
);

INSERT INTO Regions (Name, Img, Weather, Description, Num_Areas, Og_game) VALUES
('Ancient Forest', 'https://example.com/regions/ancient_forest.png', 'Mild', 'A lush forest with varied terrain and dense wildlife.', 8, 'Monster Hunter World'),

('Wildspire Waste', 'https://example.com/regions/wildspire_waste.png', 'Hot', 'A desert-like region with swamps, caves, and ruins.', 6, 'Monster Hunter World'),

('Coral Highlands', 'https://example.com/regions/coral_highlands.png', 'Mild', 'An elevated region with coral-like flora and deep chasms.', 7, 'Monster Hunter World'),

('Rotten Vale', 'https://example.com/regions/rotten_vale.png', 'Cold', 'A dark, decaying region full of bones and poisonous vapors.', 6, 'Monster Hunter World'),

('Hoarfrost Reach', 'https://example.com/regions/hoarfrost_reach.png', 'Cold', 'A snowy tundra with icy caverns and harsh weather.', 9, 'Monster Hunter World: Iceborne'),

('Volcanic Belts', 'https://example.com/regions/volcanic_belts.png', 'Hot', 'A blazing volcanic region filled with lava and high temperatures.', 5, 'Monster Hunter Generations'),

('Flooded Forest', 'https://example.com/regions/flooded_forest.png', 'Mild', 'A tropical jungle region constantly flooded with water.', 6, 'Monster Hunter 3 Ultimate'),

('Tundra', 'https://example.com/regions/tundra.png', 'Cold', 'A frigid and snowy region inhabited by tough monsters.', 5, 'Monster Hunter Freedom Unite'),

('Jungle', 'https://example.com/regions/jungle.png', 'Hot', 'A dense and humid jungle teeming with life and danger.', 6, 'Monster Hunter Portable 3rd'),

('Tower', 'https://example.com/regions/tower.png', 'Mild', 'A mysterious ancient structure with multiple levels.', 4, 'Monster Hunter Freedom Unite');

INSERT INTO Monsters_Regions(Region_id, Monster_id) VALUES (1, 5);
INSERT INTO Monsters_Regions(Region_id, Monster_id) VALUES (5, 5);
INSERT INTO Monsters_Regions(Region_id, Monster_id) VALUES (8, 5);

INSERT INTO Monster_Atks (Atk_element, Dmg, Name, Monster_id, type) VALUES
('Electric', 90, 'Thunder Slam', 2, 'Impact'),
('Electric', 75, 'Spark Charge', 2, 'Impact'),
('Electric', 65, 'Lightning Dash', 2, 'Cutting'),
('Electric', 100, 'Supercharged Roar', 2, 'Cutting'),
('None', 55, 'Claw Swipe', 2, 'Impact');

SELECT
m.monster_id,m.name ,m.img, m.description, m.wtr_res , m.fr_res, m.ice_res , m.drg_res ,m.elc_res ,m.type , m.og_game ,m.difficulty ,
r.region_id AS "region_id", r.name AS "region_name", r.img AS "region_img", 
ma.Atk_id , ma.name AS "attack_name" , ma.dmg , ma.atk_element 
FROM monsters m 
LEFT OUTER JOIN monsters_regions mr ON m.monster_id = mr.monster_id 
LEFT OUTER JOIN regions r  ON mr.region_id = r.region_id 
LEFT OUTER JOIN monster_atks ma ON ma.monster_id = m.monster_id 
WHERE m.monster_id = $1;
