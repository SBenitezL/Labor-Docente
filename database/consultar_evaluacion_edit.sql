DELIMITER //
CREATE OR REPLACE PROCEDURE consultar_evaluacion_edit(IN  p_ev_id INT)
BEGIN
	select 
    labor.LAB_ID as LAB_ID,
    labor.LAB_NOMBRE as LAB_NOMBRE,
    usuario.USR_IDENTIFICACION as USR_ID,
    usuario.USU_NOMBRE as USR_NOMBRE,
    evaluacion.ROL_ID as ROL_ID,
    periodo.PER_ID as PER_ID,
    periodo.PER_NOMBRE as PER_NOMBRE
    from evaluacion INNER JOIN labor on evaluacion.LAB_ID = labor.LAB_ID
    INNER JOIN usuario on evaluacion.USR_IDENTIFICACION = usuario.USR_IDENTIFICACION 
    INNER JOIN periodo on evaluacion.PER_ID = periodo.PER_ID
    where evaluacion.EVA_ID = p_ev_id;
END //
DELIMITER ;