DELIMITER //
CREATE OR REPLACE PROCEDURE sp_get_administradores()
BEGIN
    SELECT USR_IDENTIFICACION
    FROM    USEROL
    where ROL_ID = 2;
END //


DELIMITER ;