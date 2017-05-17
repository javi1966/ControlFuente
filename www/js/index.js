/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var toast = function (msg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>" + msg + "</h3></div>")
            .css({display: "block",
                opacity: 0.90,
                position: "fixed",
                padding: "7px",
                "text-align": "center",
                width: "270px",
                left: ($(window).width() - 284) / 2,
                top: $(window).height() / 2,
                "-webkit-box-shadow": "10px 10px 5px 0px rgba(102,102,102,0.65)",
                "-moz-box-shadow": "10px 10px 5px 0px rgba(102,102,102,0.65)",
                "-ms-box-shadow": "10px 10px 5px 0px rgba(102,102,102,0.65)",
                "box-shadow": "10px 10px 5px 0px rgba(102,102,102,0.65)",
            })

            .appendTo("body").delay(3000)
            .fadeOut(400, function () {
                $(this).remove();
            });
};

 var bRele_1=false;
 var bRele_2=false;

//***********************************************************
var app = {
    // Application Constructor
    
     wifi_conexion: window.navigator.connection || null,

    initialize: function () {
        console.log("initialize: ");
        this.bindEvents();

    },
    bindEvents: function () {


        document.addEventListener('deviceready', this.onDeviceReady, false);

        $(document).on('pageshow', '#main', this.onPageShow);
        /* refreshButton.ontouchstart = app.list;
         descButton.ontouchstart = app.disconnect;
         deviceList.ontouchstart = app.connect;
         setHora.ontouchstart = app.ponHora;
         setAlarma.onclick = app.abrePopupAlarma;
         popOK.ontouchstart = app.ponAlarma;*/
        btnCerrar.ontouchstart = app.cerrar;
        btnRele_1.ontouchstart = app.pulso_rele;
        btnRele_2.ontouchstart = app.pulso_rele;
        btnAbout.onclick = app.about;
        console.log("bindEvents:");
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');



        app.receivedEvent('deviceready');
        $(document).bind("resume", app.onResumedApp);
        console.log("Dispositivo Listo !");
    },
    receivedEvent: function (id) {
        toast("Iniciando...");

        $(document).bind("offline", app.onLineWiFi);

        $.ajaxSetup({
            timeout: 2000  //2 segundos

        });


        console.log('Received Event: ' + id);
    },
    onWifiOn: function (buttonIndex) {
        if (buttonIndex === 1) {
            navigator.app.exitApp();
            console.log("onWifiOn");
        }
    },
    onPageShow: function () {
        /*
         $("#divDesc").hide();
         $("#conectado").hide();
         $("#p_hora_alarma").hide();*/
    },
    cerrar: function () {

        // navigator.app.exitApp();
        navigator.notification.confirm(
                'Quieres salir de la APP?',
                app.onConfirmExit,
                'Confirma Salida',
                ['OK', 'Cancel']
                );
        console.log("Cerrar");
    },
    onConfirmExit: function (buttonIndex) {
        if (buttonIndex === 1) {

            navigator.app.exitApp();
            console.log("onConfirmExit");
        }

    }
    ,
    about: function () {
        $('#popupAbout').popup('open');
        console.log("about");
    }
    ,
    onResumedApp: function () {

        console.log("OnResumedApp");

        if (!window.navigator.onLine) {


            navigator.notification.confirm(
                    'Wifi no Encendido',
                    app.onWifiOn,
                    'Confirma Wifi',
                    ['OK']
                    );
        }

        toast("Salida De Pausa de APP");

    },

    pulso_rele: function (e) {
      
        var id = $(this).attr('id');
       
       
        //toast("Pulsado Rele "+id);

        switch (id) {
            case "btnRele_1":
                
                
                $.post(bRele_1?"http://192.168.1.51/rele1/on/"
                              :"http://192.168.1.51/rele1/off/",
                        function( data ) {
                         toast("Pulsado "+data);
                        });
                bRele_1=!bRele_1;
                console.log("Rele 1: "+bRele_1);
                break;
                
            case "btnRele_2":
               
                $.post(bRele_2?"http://192.168.1.51/rele2/on/"
                              :"http://192.168.1.51/rele2/off/",
                        function( data ) {
                         toast("Pulsado "+data);
                        });
                bRele_2 = !bRele_2;
                console.log("Rele 2: "+bRele_2);
                break;

            default:
                break;
        }

       
        console.log("Pulsacion Reles");

    },
    onLineWiFi: function () {


        navigator.notification.confirm(
                'Wifi no Encendido',
                app.onWifiOn,
                'Confirma Wifi',
                ['OK']
                );
        console.log("onLineWiFi");
    }



};

