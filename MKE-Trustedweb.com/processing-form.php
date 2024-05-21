<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verzamel de ingevulde gegevens
    $bedrijfsnaam = filter_input(INPUT_POST, 'company-name', FILTER_SANITIZE_STRING);
    $naam = filter_input(INPUT_POST, 'full-name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $telefoonnummer = filter_input(INPUT_POST, 'telephone', FILTER_SANITIZE_STRING);
    $aanvulling_vraag = filter_input(INPUT_POST, 'remark', FILTER_SANITIZE_STRING);

    // E-mailadres van de afzender
    $afzender_email = "info@mketrustedweb.com";

    // E-mailadres waar het bericht naartoe wordt gestuurd
    $ontvanger_email = "info@mke-trustedweb.com";

    // Onderwerp van de e-mail
    $onderwerp = "Request for quotation at MKE-TrustedWeb";

    // Inhoud van de e-mail
    $inhoud_klant = "Dear $naam,\n\nThank you for completing the form. Here is a summary of the information you provided:\n\n";
    $inhoud_klant .= "Company name: $bedrijfsnaam\n";
    $inhoud_klant .= "Name: $naam\n";
    $inhoud_klant .= "E-mail: $email\n";
    $inhoud_klant .= "Phone Number: $telefoonnummer\n";
    $inhoud_klant .= "Additional/Question: $aanvulling_vraag\n\n";
    $inhoud_klant .= "We will contact you as soon as possible.\n\nBest regards,\n\nMKE-TrustedWeb\n+3143003176\ninfo@mke-trustedweb.com\nwww.mke-trustedweb.com";

    // Headers voor de e-mail naar de klant
    $headers_klant = "From: \"MKE-TrustedWeb\" <info@mke-trustedweb.com>\r\n";
    $headers_klant .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Stuur de e-mail naar de klant
    mail($email, $onderwerp, $inhoud_klant, $headers_klant);

    // Onderwerp van de e-mail naar de beheerder
    $onderwerp_beheerder = "Request for quotation from $naam";

    // Inhoud van de e-mail naar de beheerder
    $inhoud_beheerder = "Bedrijfsnaam: $bedrijfsnaam\n";
    $inhoud_beheerder .= "Naam: $naam\n";
    $inhoud_beheerder .= "E-mail: $email\n";
    $inhoud_beheerder .= "Telefoonnummer: $telefoonnummer\n";
    $inhoud_beheerder .= "Aanvulling/vraag: $aanvulling_vraag\n";

    // Stuur de e-mail naar de beheerder
    mail($ontvanger_email, $onderwerp_beheerder, $inhoud_beheerder);

    // Redirect naar een bedankpagina of een andere pagina
    header("Location: thanks.html");
    exit;
} else {
    // Als het formulier niet is ingediend via POST-methode, ga dan terug naar het formulier
    header("Location: indexEN.html");
    exit;
}
?>