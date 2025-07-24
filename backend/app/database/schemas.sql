INSERT INTO Monsters (Name, Img, Description, Wtr_res, Fr_res, Ice_res, Drg_res, Elc_res, Type, Og_game, Difficulty)
VALUES 
('Zinogre', 'https://monsterhunterwiki.org/images/7/7d/MHNow-Zinogre_Render_002.png?version=4cc7fc7ac568245361cd8f9572cedbb5', 'A thunder wolf wyvern that builds up electric energy.', 1, 2, 3, 2, 5, 'Fanged Wyvern', 'Monster Hunter Portable 3rd', 4.5),

('Lagiacrus', 'https://monsterhunterwiki.org/images/6/6c/MHGU-Lagiacrus_Render.png?version=adf6ab643a906e44bf7424abd3c33c2a', 'A sea wyvern with mastery over thunder.', 5, 2, 3, 1, 4, 'Leviathan', 'Monster Hunter 3', 3.8),

('Rathalos', 'https://monsterhunterwiki.org/images/b/b3/MHRS-Apex_Rathalos_Render.png?version=db55af9c0d56ca5258ee49ef963ff35c', 'The king of the skies. Breathes fire and flies.', 2, 5, 1, 1, 2, 'Flying Wyvern', 'Monster Hunter', 4.2);

INSERT INTO Regions (Name, Img, Weather, Description, Num_Areas, Og_game)
VALUES 
('Ancient Forest', 'https://static.wikia.nocookie.net/monsterhunter/images/3/37/MHW-Ancient_Forest_Screenshot_001.jpg', 'Mild', 'A lush jungle environment with various elevation levels.', 12, 'Monster Hunter World'),

('Hoarfrost Reach', 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/monster-hunter-generations/4/40/MHGen-Volcano_Screenshot_001.jpg', 'Cold', 'A frigid tundra home to many ice-element monsters.', 10, 'Monster Hunter World: Iceborne'),

('Volcanic Hollow', 'https://static.wikia.nocookie.net/monsterhunter/images/4/4f/MHGU-Volcanic_Hollow_Screenshot_001.jpg', 'Hot', 'A blazing lava-filled zone hosting powerful monsters.', 8, 'Monster Hunter Generations');

INSERT INTO Monster_Atks (Atk_element, Dmg, Name, Monster_id, type) VALUES
('Electric', 90, 'Thunder Slam', 3, 'Impact'),
('Electric', 75, 'Spark Charge', 2, 'Impact'),
('Electric', 65, 'Lightning Dash', 2, 'Cutting'),
('Electric', 100, 'Supercharged Roar', 2, 'Cutting'),
('None', 55, 'Claw Swipe', 1, 'Impact');

SELECT
m.monster_id,m.name ,m.img, m.description, m.wtr_res , m.fr_res, m.ice_res , m.drg_res ,m.elc_res ,m.type , m.og_game ,m.difficulty ,
r.region_id AS "region_id", r.name AS "region_name", r.img AS "region_img", 
ma.Atk_id , ma.name AS "attack_name" , ma.dmg , ma.atk_element 
FROM monsters m 
LEFT OUTER JOIN monsters_regions mr ON m.monster_id = mr.monster_id 
LEFT OUTER JOIN regions r  ON mr.region_id = r.region_id 
LEFT OUTER JOIN monster_atks ma ON ma.monster_id = m.monster_id 
WHERE m.monster_id = $1;



