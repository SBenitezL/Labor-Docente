DELIMITER //

CREATE OR REPLACE PROCEDURE sp_insert_notificacion(IN usr_id INT,
                                                   IN noti_msj VARCHAR(500))
BEGIN
    


  INSERT INTO NOTIFICACION (USR_IDENTIFICACION,NOT_FECHA, NOTI_MSJ)
  VALUES (usr_id, NOW(), noti_msj);

END//

DELIMITER ;
