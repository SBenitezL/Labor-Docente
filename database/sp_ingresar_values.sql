DELIMITER //
CREATE OR REPLACE PROCEDURE sp_ingresar_values(
    IN p_puntaje DECIMAL,
    IN p_resultado VARCHAR(1000),
    IN p_eva_id INT
)
BEGIN
    update EVALUACION
    SET
        EVA_PUNTAJE = p_puntaje,
        EVA_RESULTADO = p_resultado
    WHERE EVA_ID = p_eva_id;

END;


DELIMITER ;