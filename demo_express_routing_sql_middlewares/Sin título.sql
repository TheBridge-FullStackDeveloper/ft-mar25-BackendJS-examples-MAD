--Promoción con menos alumnos

SELECT clases.promocion_id, COUNT(DISTINCT clase_personas.persona_id) AS total_alumnos
FROM clase_personas
JOIN clases ON clase_personas.clase_id = clases.clase_id
WHERE clase_personas.rol_id = 1  -- rol alumno
GROUP BY clases.promocion_id
ORDER BY total_alumnos ASC
LIMIT 1;

--Vertical con menos alumnos de la promoción 2

SELECT clases.vertical_id, COUNT(DISTINCT clase_personas.persona_id) AS total_alumnos
FROM clase_personas
JOIN clases ON clase_personas.clase_id = clases.clase_id
WHERE clase_personas.rol_id = 1  --rol alumno
  AND clases.promocion_id = 2
GROUP BY clases.vertical_id
ORDER BY total_alumnos ASC
LIMIT 1;

--Extraer el tlf de sus profesores

SELECT DISTINCT personas.nombre_completo, personas.telefono, clases.vertical_id
FROM clase_personas
JOIN clases ON clase_personas.clase_id = clases.clase_id
JOIN personas ON clase_personas.persona_id = personas.persona_id
WHERE clase_personas.rol_id = 2
  AND clases.promocion_id = 2;