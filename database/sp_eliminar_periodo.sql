DELIMITER //
CREATE OR REPLACE PROCEDURE sp_eliminar_periodo( IN p_id INT)
BEGIN
    DELETE FROM periodo WHERE PER_ID = p_id;
END //
DELIMITER ;