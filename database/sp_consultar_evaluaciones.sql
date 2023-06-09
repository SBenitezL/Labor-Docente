DELIMITER //

CREATE OR REPLACE PROCEDURE sp_consultar_evaluaciones()
BEGIN
  SELECT
    CONCAT(usuario.USU_NOMBRE, ' ', usuario.USU_APELLIDO) as NombreCompleto,
    rol.ROL_DESCRIPCION as Rol,
    evaluacion.EVA_ID as ID,  
    labor.LAB_NOMBRE as Nombre, 
    labor.LAB_HORAS as Horas, 
    periodo.PER_FECHAINICIO as Inicio, 
    periodo.PER_FECHAFIN as Fin, 
    evaluacion.EVA_ESTADO as Estado, 
    evaluacion.EVA_PUNTAJE as Puntaje, 
    evaluacion.EVA_RESULTADO as Resultado
  FROM 
    evaluacion 
    INNER JOIN labor ON evaluacion.LAB_ID = labor.LAB_ID
    INNER JOIN periodo ON evaluacion.PER_ID = periodo.PER_ID
    INNER JOIN rol ON evaluacion.ROL_ID = rol.ROL_ID
    INNER JOIN usuario ON evaluacion.USR_IDENTIFICACION = usuario.USR_IDENTIFICACION;
END //

DELIMITER ;
