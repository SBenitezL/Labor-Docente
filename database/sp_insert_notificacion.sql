DELIMITER //

CREATE OR REPLACE PROCEDURE sp_insert_notificacion(IN usr_id INT, 
                                                    IN us_fecha DATE, 
                                                    IN noti_msj)
BEGIN
    


  INSERT INTO NOTIFICACION (NOT_ID, USR_IDENTIFICACION,NOT_FECHA, NOTI_MSJ)
  VALUES (usr_id, not_fecha, noti_msj);

END//

DELIMITER ;
