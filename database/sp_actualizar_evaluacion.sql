DELIMITER //

CREATE OR REPLACE PROCEDURE sp_actualizar_evaluacion_coordinador(
  IN p_eva_id INT,
  IN p_lab_id INT,
  IN p_per_id INT,
  IN p_usr_identificacion INT,
  IN p_rol_id INT
)
BEGIN

  -- Actualizar el registro existente en la tabla EVALUACION
  UPDATE EVALUACION
  SET LAB_ID = p_lab_id,
      PER_ID = p_per_id,
      USR_IDENTIFICACION = p_usr_identificacion,
      ROL_ID = p_rol_id
  WHERE EVA_ID = p_eva_id;

END //

DELIMITER ;
