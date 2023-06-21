DELIMITER //

CREATE OR REPLACE PROCEDURE sp_consultar_vista_docente(
    IN p_usr_id INT
)
BEGIN
    SELECT 
        USR_IDENTIFICACION as USR_IDENTIFICACION,
        CONCAT(USR_NOMBRE, ' ', USR_APELLIDO) as USU_NOMBRE
    FROM usuario
    where usuario.USR_IDENTIFICACION = p_usr_id;
        

END //

DELIMITER ;
