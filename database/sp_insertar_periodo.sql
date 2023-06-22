DELIMITER //
CREATE OR REPLACE PROCEDURE sp_insertar_periodo(
    IN p_inicio DATE, 
    IN p_fin DATE,
    IN p_nombre VARCHAR(50)
    )
BEGIN
    INSERT INTO periodo (PER_NOMBRE, PER_FECHAINICIO, PER_FECHAFIN)
    VALUES (p_nombre, p_inicio, p_fin);
END //
DELIMITER ;