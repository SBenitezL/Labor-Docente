DELIMITER //

CREATE OR REPLACE PROCEDURE sp_get_notificaciones(IN p_usr_id INT)
BEGIN
    select 
        NOTI_MSJ,
        NOT_FECHA
    from notificacion
    where USR_IDENTIFICACION  = p_usr_id;
END //
DELIMITER ;