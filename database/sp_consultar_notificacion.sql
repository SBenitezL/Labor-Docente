DELIMITER //

CREATE OR REPLACE PROCEDURE sp_consultar_notificacion(IN usr_id INT)
BEGIN
    DECLARE estado_evaluacion INT;



    --OBTENER EL ESTADO DE LA EVALUACION
    SELECT evaluacion.EVA_ESTADO INTO estado_evaluacion
    FROM evaluacion INNER JOIN usuario 
    ON evaluacion.USR_IDENTIFICACION = usuario.USR_IDENTIFICACION
    WHERE usuario.USR_IDENTIFICACION =usr_id;

    IF estado_evaluacion = 1 OR estado_evaluacion = 3 THEN
            SELECT
            CONCAT(usuario.USU_NOMBRE, ' ', usuario.USU_APELLIDO,':', notificacion.NOTI_MSJ) as mensajeNoti,
            notificacion.NOT_FECHA as fechaNoti
            FROM notificacion INNER JOIN usuario 
            ON notificaion.USR_IDENTIFICACION = usuario.USR_IDENTIFICACION
            where notificacion.USR_IDENTIFICACION = usr_id;
    END IF;
  
    
END //

DELIMITER ;

CREATE TRIGGER trg_notificar_usuario




DELIMITER ;

