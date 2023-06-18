DELIMITER //

CREATE OR REPLACE PROCEDURE sp_eliminar_evaluacion(IN p_id INT)
BEGIN
    DELETE FROM evaluacion WHERE EVA_ID = p_id;
END //

DELIMITER ;
