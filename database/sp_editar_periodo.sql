DELIMITER //
CREATE OR REPLACE PROCEDURE sp_editar_periodo(
        IN p_perID INT,
        IN p_nombre VARCHAR(50),
        IN p_inicio DATE,
        IN p_fin DATE
)
BEGIN
    UPDATE periodo
        SET
            PER_NOMBRE = p_nombre,
            PER_FECHAINICIO = p_inicio,
            PER_FECHAFIN = p_fin
        where PER_ID = p_perID;
END //
DELIMITER ;