<?php
$destino = "djacobocastillosj@gmail.com"; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensaje = htmlspecialchars(trim($_POST["mensaje"]));

    if (filter_var($email, FILTER_VALIDATE_EMAIL) && !empty($mensaje)) {
        $asunto = "Nuevo mensaje desde el formulario web";
        $contenido = "Correo: $email\n\nMensaje:\n$mensaje";
        $headers = "From: $email\r\nReply-To: $email\r\n";

        if (mail($destino, $asunto, $contenido, $headers)) {
            echo "Mensaje enviado correctamente.";
        } else {
            echo "Error al enviar el mensaje. Inténtalo más tarde.";
        }
    } else {
        echo "Por favor, completa correctamente el formulario.";
    }
} else {
    echo "Acceso inválido.";
}
?>
