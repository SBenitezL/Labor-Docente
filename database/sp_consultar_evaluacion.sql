DELIMITER //

CREATE OR REPLACE PROCEDURE sp_consultar_evaluacion(IN usr_id INT, IN p_per_id INT)
BEGIN
  SELECT
    evaluacion.EVA_ID as ID, 
    labor.LAB_NOMBRE as Nombre, 
    labor.LAB_HORAS as Horas, 
    periodo.PER_FECHAINICIO as Inicio, 
    periodo.PER_FECHAFIN as Fin, 
    evaluacion.EVA_ESTADO as Estado, 
    evaluacion.EVA_PUNTAJE as Puntaje, 
    evaluacion.EVA_RESULTADO as Resultado,
    tipolabor.TL_DESCRIPCION as TipoLabor,
    periodo.PER_NOMBRE as PER_NOMBRE
  FROM 
    evaluacion 
    INNER JOIN labor ON evaluacion.LAB_ID = labor.LAB_ID
    INNER JOIN periodo ON evaluacion.PER_ID = periodo.PER_ID
    INNER JOIN rol ON evaluacion.ROL_ID = rol.ROL_ID
    INNER JOIN usuario ON evaluacion.USR_IDENTIFICACION = usuario.USR_IDENTIFICACION
    INNER JOIN tipolabor ON labor.TL_ID = tipolabor.TL_ID
    where evaluacion.USR_IDENTIFICACION = usr_id and periodo.PER_ID = p_per_id;
END //

DELIMITER ;
