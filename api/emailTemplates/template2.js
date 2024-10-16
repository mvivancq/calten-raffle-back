export const template2 = `
<html style="margin: 0; padding: 0">


<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
        @media only screen and (max-width: 480px) {
            .nl-canvas {
                margin: 0 8px;
            }

            .body {
                background-color: transparent !important;
            }

            .nl-sm-ta-l {
                text-align: left;
            }

            .item-list {
                width: 100% !important;
            }

            .item-list>div {
                margin-left: 0 !important;
                margin-right: 0 !important;
            }

            .nl-col-sm-100 {
                width: 100% !important;
            }

            .nl-d-sm-b {
                display: block !important;
            }

            .nl-m-sm-0 {
                margin: 0 !important;
            }

            .nl-pl-sm-0 {
                padding: 0 !important;
            }

            .nl-pl-sm-16 {
                padding-left: 16px !important;
            }

            .nl-pr-sm-16 {
                padding-right: 16px !important;
            }

            .nl-mb-sm-16 {
                margin-bottom: 16px !important;
            }

            .nl-pt-sm-0 {
                padding-top: 0 !important;
            }

            .nl-ml-sm-0 {
                margin-left: 0 !important;
            }

            .nl-mr-sm-0 {
                margin-right: 0 !important;
            }

            .nl-mx-sm-auto {
                margin-left: auto !important;
                margin-right: auto !important;
            }

            .nl-is-last>.nl-is-even {
                margin-bottom: 16px;
            }

            .nl-h-sm-auto {
                height: auto !important;
            }

            .nl-img-sm-auto {
                max-width: 100% !important;
                height: auto !important;
            }

            .nl-ox-sm-a {
                overflow: auto;
            }

            .nl-tb-cell {
                padding: 4px 8px !important;
            }

            .nl-dtb-cell {
                padding: 6px 0px !important;
            }

            .nl-mt-sm-4 {
                margin-top: 4px;
            }

            .nl-mt-sm-8 {
                margin-top: 8px;
            }

            .nl-mb-sm-4 {
                margin-bottom: 4px;
            }

            .nl-mb-sm-8 {
                margin-bottom: 8px;
            }

            .nl-mb-sm-40 {
                margin-bottom: 40px;
            }

            .nl-scoreboard {
                width: 100% !important;
            }

            .nl-scoreboard .nl-scorecard {
                width: 50%;
                margin-right: 0 !important;
            }

            .nl-tb-cell-sm {
                display: table-cell;
                padding: 8px 6px;
            }
        }

        @media print {
            @page {
                size: auto;
                margin: 0;
            }

            .nl-preview-actions {
                display: none !important;
            }
        }
    </style>
    <style>
        * {
            box-sizing: border-box;
        }

        .nl-t-body p:last-child {
            margin-bottom: 0;
        }

        .nl-para p:last-child {
            margin-bottom: 0;
        }
    </style>
</head>

<body class="body"
    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif; margin: 0; padding: 0;">
    <div dir="ltr" class="nl card"
        style="line-height: 1.4; padding-top: 24px; padding-bottom: 24px; font-size: 14px; font-family: Roboto, -apple-system, BlinkMacSystemFont, sans-serif; max-width: 640px; margin: 0px auto; border-radius: 0.857143em;">
        <div class="nl-canvas" style="max-width: 640px !important; margin: 0px auto; border-radius: 12px;">
            <div class="nl-section"
                style="display: block; color: rgb(33, 33, 33); background-image: url(''); background-repeat: no-repeat; background-size: cover; border-radius: 12px; margin-top: 2.28571em; margin-bottom: 0em; padding: 0.571429em 0em;">
                <!----><!---->
            </div>
            <div class="nl-section"
                style="display: block; color: rgb(33, 33, 33); border-radius: 12px; margin-top: 0.857143em; margin-bottom: 0.857143em; padding: 0em 0em 0.357143em; border-color: transparent; border-width: 0px; border-style: solid;">
                <div component class="media"><img
                        src="https://firebasestorage.googleapis.com/v0/b/goog-newsletters.appspot.com/o/images%2Fw81v9Yd%2Fb4dMqsBIEb4F?alt=media&amp;token=d2c0f830-d5ae-4757-83bf-98e79d6d86f5"
                        alt style="object-fit: contain; width: 100%; display: flex; border-radius: 12px; height: auto;">
                </div><!---->
            </div>
            <div class="nl-section"
                style="display: block; color: rgb(33, 33, 33); border-radius: 12px; margin-top: 0.642857em; margin-bottom: 1.21429em; padding: 0em;">
                <!---->
                <div class="nl-section-body">
                    <div class="item-list nl-d-sm-b"
                        style="width: 100%; display: flex; border-radius: 12px; background-color: rgb(248, 249, 250); background-size: contain; background-repeat: no-repeat; background-position: right top; margin-bottom: 0px; background-image: url(''); border-color: transparent; border-width: 0px; border-style: solid;">
                        <div class="nl-col-sm-100" style="width: 10.8571em;">
                            <div class="item-media nl-p-20" style="padding: 20px;"><img
                                    src="{{photo}}"
                                    alt="Qué tal {{name}}," class="nl-mx-sm-auto"
                                    style="object-fit: fill; height: 8.57143em; width: 8.57143em; display: flex; border-radius: 4.28571em;">
                            </div>
                        </div>
                        <div class="item-body" style="padding: 1.14286em; width: 100%;">
                            <div class="item-title">
                                <h3
                                    style="margin-top: 0; margin-bottom: 0; font-size: 1.28571em; font-weight: 500; margin: 0px; line-height: 1;">
                                    Qué tal {{name}}, </h3>
                                <div class="nl-h-8" style="height: 8px;"></div><!---->
                            </div>
                            <div class="editor-content nl-content nl-t-body" style="line-height: 1.4;">
                                <div style="border-radius: inherit;">
                                    <div translate="no" class="ProseMirror" tabindex="0"
                                        style="border-radius: inherit;">
                                        <p style="margin-top: 0; margin-bottom: 16px;"><span
                                                style="color: rgb(0, 0, 0)">Soy {{member}} de Calten. {{team}} y yo te
                                                queremos agradecer por participar en nuestra Rifa! Queremos poner a
                                                prueba y mejorar nuestra tecnología para impulsar la digitalización de
                                                los pagos en México. </span></p>
                                        <p style="margin-top: 0; margin-bottom: 16px;"><span
                                                style="color: rgb(0, 0, 0)">En el camino, tendrás la oportunidad de
                                                ganar un premio increíble </span><span>🥳</span></p>
                                        <p style="margin-top: 0; margin-bottom: 16px;"><br><strong
                                                style="font-weight: 600;">Información importante acerca de la
                                                Rifa</strong></p>
                                        <ul style="padding-left: 20px; margin-top: 0px; margin-bottom: 16px;">
                                            <li style="margin-bottom: 2px;">
                                                <p style="margin-top: 0; margin-bottom: 0;">Premio: Apple Airpods</p>
                                            </li>
                                            <li style="margin-bottom: 2px;">
                                                <p style="margin-top: 0; margin-bottom: 0;">Fecha de sorteo: 31 de
                                                    Octubre</p>
                                            </li>
                                            <li style="margin-bottom: 2px;">
                                                <p style="margin-top: 0; margin-bottom: 0;">Hora: 7 pm (Hora CDMX)</p>
                                            </li>
                                            <li style="margin-bottom: 2px;">
                                                <p style="margin-top: 0; margin-bottom: 0;">Medio: Transmisión en vivo
                                                    desde nuestro Instagram - <a target="_blank"
                                                        rel="noopener noreferrer nofollow"
                                                        href="https://www.instagram.com/calten.mx"
                                                        style="color: #1A73E8; font-weight: 500;"><strong
                                                            style="font-weight: 600;">@calten.mx</strong></a></p>
                                            </li>
                                        </ul>
                                        <p style="margin-top: 0; margin-bottom: 16px;"><br></p>
                                        <p style="margin-top: 0; margin-bottom: 8px;"><em>Nos comunicaremos con la o el
                                                ganador a través de los medios de contactos que nos proporcionaron para
                                                mandarle su premio</em></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!---->
            </div>
            <div class="nl-section"
                style="display: block; border-radius: 12px; margin-top: 0em; margin-bottom: 0em; padding-top: 1.42857em; padding-bottom: 1.42857em;">
                <div class="nl-row nl-o-h nl-ta-c" style="text-align: center; overflow: hidden;"><a
                        href="https://forms.gle/iU8bqKBETd5rtr2FA" target="_blank" rel="noreferrer"
                        class="nl-d-ib nl-button nl-td-n nl-f-c nl-button-md"
                        style="text-decoration: none; margin-left: auto; margin-right: auto; display: inline-block; padding: 12px 24px; color: #1A73E8; font-weight: 500; border-width: 0px; border-style: solid; background-color: rgb(121, 1, 255); border-radius: 12px;"><span
                            style="font-weight: 700; line-height: 1; font-size: 15px; letter-spacing: .3px; color: rgb(255, 255, 255);">
                            Haz click aquí y ayúdanos a mejorar con esta breve encuesta </span></a></div><!---->
            </div>
            <div class="nl-section nl-o-h"
                style="display: block; overflow: hidden; background-color: rgb(255, 255, 255); color: rgb(33, 33, 33); border-radius: 12px; margin-top: 1.42857em; margin-bottom: 1.42857em; padding: 1.14286em;">
                <div class="nl-body nl-d-f nl-o-h nl-f-c"
                    style="margin-left: auto; margin-right: auto; display: flex; overflow: hidden; width: fit-content;">
                    <div style="display: inline-block; margin-right: 20px; margin-left: 0px;"><a
                            href="https://www.instagram.com/calten.mx" target="_blank" rel="noreferrer" class="nl-d-ib"
                            style="display: inline-block; color: #1A73E8; font-weight: 500;"><img
                                src="https://firebasestorage.googleapis.com/v0/b/goog-newsletters.appspot.com/o/images%2Fw81v9Yd%2FPeo7meeUzsSU?alt=media&amp;token=fe18e60b-4619-498f-b870-3ff7e379d901"
                                alt
                                style="object-fit: contain; display: inline-block; line-height: 1; margin: auto; border-radius: 12px; max-height: 40px; height: 40px;"></a>
                    </div>
                    <div style="display: inline-block; margin-right: 20px; margin-left: 0px;"><a
                            href="https://www.facebook.com/calten.mx" target="_blank" rel="noreferrer" class="nl-d-ib"
                            style="display: inline-block; color: #1A73E8; font-weight: 500;"><img
                                src="https://firebasestorage.googleapis.com/v0/b/goog-newsletters.appspot.com/o/images%2Fw81v9Yd%2FA4NdnyxlRWlB?alt=media&amp;token=2bc3fc1a-c1c3-4024-81ed-d732c3ec1f69"
                                alt
                                style="object-fit: contain; display: inline-block; line-height: 1; margin: auto; border-radius: 12px; max-height: 40px; height: 40px;"></a>
                    </div>
                    <div style="display: inline-block; margin-right: 20px; margin-left: 0px;"><a 
                            href="https://www.youtube.com/@caltenmx"
                            target="_blank" rel="noreferrer" class="nl-d-ib"
                            style="display: inline-block; color: #1A73E8; font-weight: 500;"><img
                                src="https://firebasestorage.googleapis.com/v0/b/goog-newsletters.appspot.com/o/images%2Fw81v9Yd%2FAh2Wbgs4efcn?alt=media&amp;token=7e8e1f8f-f97d-41fd-8439-9d257c8cf408"
                                alt
                                style="object-fit: contain; display: inline-block; line-height: 1; margin: auto; border-radius: 12px; max-height: 40px; height: 40px;"></a>
                    </div>
                    <div style="display: inline-block; margin-right: 20px; margin-left: 0px;"><a
                            href="https://www.linkedin.com/company/calten/about/" target="_blank" rel="noreferrer"
                            class="nl-d-ib" style="display: inline-block; color: #1A73E8; font-weight: 500;"><img
                                src="https://firebasestorage.googleapis.com/v0/b/goog-newsletters.appspot.com/o/images%2Fw81v9Yd%2FG0iG8bPDlw5b?alt=media&amp;token=8a78c02b-48fb-4605-ac1e-8d3afadfa426"
                                alt
                                style="object-fit: contain; display: inline-block; line-height: 1; margin: auto; border-radius: 12px; max-height: 40px; height: 40px;"></a>
                    </div>
                    <div style="display: inline-block; margin-right: 0px; margin-left: 0px;"><a
                            href="https://calten-mx-sitio-webflow.webflow.io/" target="_blank" rel="noreferrer" class="nl-d-ib"
                            style="display: inline-block; color: #1A73E8; font-weight: 500;"><img
                                src="https://firebasestorage.googleapis.com/v0/b/goog-newsletters.appspot.com/o/images%2Fw81v9Yd%2FarHpWa5Y8hUl?alt=media&amp;token=fe85bb6b-50cd-4b27-bf5d-e460dc839793"
                                alt
                                style="object-fit: contain; display: inline-block; line-height: 1; margin: auto; border-radius: 12px; max-height: 40px; height: 40px;"></a>
                    </div>
                </div><!---->
            </div>
            <div class="nl-section"
                style="display: block; color: rgb(33, 33, 33); border-radius: 12px; margin-top: 0em; margin-bottom: 0em; padding-top: 1.07143em; padding-bottom: 1.07143em;">
                <div class="nl-row">
                    <div>
                        <div class="nl-divider"
                            style="background-color: rgb(121, 0, 255); height: 4px; width: 100%; margin: 0px auto;">
                        </div>
                    </div><!----><!---->
                </div><!---->
            </div>
            <div class="nl-section"
                style="display: block; background-color: rgb(255, 255, 255); color: rgb(33, 33, 33); border-radius: 12px; margin-top: 1.42857em; margin-bottom: 1.42857em; padding: 0em; border-color: transparent; border-width: 0px; border-style: solid;">
                <div component class="media"><!----></div><!---->
            </div>
            <div class="nl-section"
                style="display: block; background-color: rgb(255, 255, 255); color: rgb(33, 33, 33); border-radius: 12px; margin-top: 1.42857em; margin-bottom: 1.42857em; padding: 1.42857em; border-color: transparent; border-width: 0px; border-style: solid;">
                <div class="editor-content nl-content nl-t-body" style="line-height: 1.4;">
                    <div style="border-radius: inherit;">
                        <div translate="no" class="ProseMirror" tabindex="0" style="border-radius: inherit;">
                            <p style="margin-top: 0; text-align: center; margin-bottom: 8px;"><em>Este correo
                                    electrónico puede ser confidencial o privilegiado. Si recibió esta comunicación por
                                    error, no la reenvíe a nadie más, borre todas las copias y archivos adjuntos y
                                    avíseme que llegó a la persona equivocada.</em></p>
                        </div>
                    </div>
                </div><!---->
            </div>
        </div><!---->
    </div>
</body>

</html>
`;
