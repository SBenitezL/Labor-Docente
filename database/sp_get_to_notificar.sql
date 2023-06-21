DELIMITER //
CREATE OR REPLACE PROCEDURE sp_get_to_notificar()
BEGIN
    select
        labor.LAB_NOMBRE AS LAB_NOMBRE,
        CONCAT(usuario.USU_NOMBRE, ' ', usuario.USU_APELLIDO) AS USU_NOMBRE,
        periodo.PER_FECHAFIN AS PER_FECHAFIN,
        evaluacion.EVA_ESTADO AS  EVA_ESTADO
        FROM evaluacion INNER JOIN labor on evaluacion.LAB_ID = labor.LAB_ID
        INNER JOIN usuario ON evaluacion.USR_IDENTIFICACION = usuario.USR_IDENTIFICACION
        INNER JOIN periodo ON evaluacion.PER_ID = periodo.PER_ID
        where periodo.PER_FECHAFIN =  DATE_ADD(CURDATE(), INTERVAL 15 DAY) AND (evaluacion.EVA_ESTADO = 1 OR evaluacion.EVA_ESTADO = 3);
END //

DELIMITER ;