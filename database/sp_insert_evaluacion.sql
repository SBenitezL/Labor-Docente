DELIMITER //

CREATE OR REPLACE PROCEDURE sp_insert_evaluacion(
  IN p_lab_id INT,
  IN p_per_id INT,
  IN p_usr_identificacion INT,
  IN p_rol_id INT
)
BEGIN

  -- Insertar el nuevo registro en la tabla EVALUACION
  INSERT INTO EVALUACION (LAB_ID, PER_ID, USR_IDENTIFICACION, ROL_ID)
  VALUES (p_lab_id, p_per_id, p_usr_identificacion, p_rol_id);

END //

DELIMITER ;
