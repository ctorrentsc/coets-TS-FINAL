var arrayRockets: Rocket[] = new Array();  //Array coets
var arrayThrusters: Thruster[] = new Array();  //Array de propulsors de cada coet

function newRocket() {  // CREAR NOU COET (+ Displai i botons)
    var rocketCode: any = prompt("Siusplau, introdueix un codi alfanumèric de 8 caràcters");
    var codeRegex = /^[A-Z0-9]{8}$/i;  // i case insensitive
    var thrustersNum: any;
    var i;
    var value:boolean = false;
    var powerRegex = /[1-9][0-9]*0$/;

    if (!codeRegex.test(rocketCode)) {  // Es cumpleix el format del codi?
        alert("Cal que el codi contingui 8 caràcters alfanumèrics");
    } else {
        if (arrayRockets.length != 0) {
            for (i = 0; i < arrayRockets.length; i++) {
                if (rocketCode == arrayRockets[i].rocketCode) { // Comprovem si el codi existeix
                    console.log(arrayRockets[i]);
                    alert("Aquest codi ja existeix");
                }
            }
        }

        var newRocket: Rocket = new Rocket(rocketCode);  // Creem coet  
        thrustersNum = prompt("Introdueix el número de propulsors que tindrà");  // codi ok/no repetit. Núm propulsors?          

        for (i = 0; i < thrustersNum; i++) { //Potència  per a cada propulsor
            var power: any = prompt("Introdueix la potència màxima del propulsor " + (i + 1) + ". \nCal que sigui múltiple de 10.");
            if(!powerRegex.test(power)){ //Comprovem que la potència és múltiple de 10
                alert("La potència ha de ser un múltiple de 10");
                value = false;
                i -=1; //Com q no és multiple de 10, fem que ho torni a demanar amb i -=1
            } else { //Si potència amb regex multiple de 10 ok
            var newThruster = new Thruster(power); // Creem un nou propulsor
            newRocket.addThruster(newThruster);  //Pugem a l'Array de propulsors
            value = true;
            }
        }

        if(value == true){// Si el coet es crea tot ok sense cancel·lar promps
        alert("El coet s'afegirà en última posició del requadre COETS ACTUALS");
        }

        arrayRockets.push(newRocket);  // Pugem a l'Array el Coet ok amb propulsors ja afegits

        newRocket.displayRockets(); //Cridem la funció per imprimir en pantalla 
        newRocket.createButtons(); //Cridem la funció per crear els botons
    }
}

function accelerateUp(event: any) {  //FUNCIÓ ACCELERAR POtÊNCIA
    var target = event.target;  //Botó que dispara aquesta funció
    var parent = target.parentElement; //Contenidor del botó que hem clicat
    var a = parent.id; //id del contenidor (Vam crear un contenidor amb id= rocketCode)

    console.log(a);

    var powerTest: number = 10; // potència q augmenta o disminueix cada cop
    var actualSpeed: number = 0;  //Velocitat actual que enviem als 3 propulsors

    var i;
    var j;

    for (i = 0; i < arrayRockets.length; i++) {
        if (arrayRockets[i].rocketCode == a) { //Busquem el coet al que pertany el botó clicat

            if (arrayRockets[i].getSpeed() == 0) {  // Si encara no hi ha potència aplicada als propulsors
                for (j = 0; j < arrayRockets[i].thrusters.length; j++) {

                    if (arrayRockets[i].thrusters[j].power >= 10) { //Si la potència al propulsor és > 10
                        arrayRockets[i].thrusters[j].speed = powerTest; //Enviem 10 de potència al paràmetre 
                        actualSpeed += powerTest;//Augmenta 10          //speed del propulsor
                        console.log(arrayRockets[i].thrusters[j].speed);
                        console.log(actualSpeed);
                    }
                }
            } else { //Si ja hem aplicat potència als propulsors
                for (j = 0; j < arrayRockets[i].thrusters.length; j++) {

                    if (arrayRockets[i].thrusters[j].speed < arrayRockets[i].thrusters[j].power) {//potència aplicada < potència disponible
                        arrayRockets[i].thrusters[j].speed += powerTest;  //Afegim 10 de potència
                        actualSpeed += powerTest; //Augmenta 10
                        console.log(arrayRockets[i].thrusters[j].speed);
                        console.log(actualSpeed);
                    }
                }
            }
            arrayRockets[i].accelerateRocket(actualSpeed); //Cridem la funció per aplicar velocitat generada (actualSpeed)
        }
    }

}

function breakDown(event: any) {//FUNCIÓ FRENAR POtÊNCIA
    var target = event.target;  //Botó que dispara
    var parent = target.parentElement; //Contenidor del botó
    var a = parent.id; //id del contenidor (Vam crear un contenidor amb id= rocketCode)

    console.log(a);

    var powerTest = 10; // potència inicial d'un propulsor
    var actualSpeed: number = 0; //Velocitat actual que enviem als 3 propulsors

    var i;
    var j;

    for (i = 0; i < arrayRockets.length; i++) {
        if (arrayRockets[i].rocketCode == a) { // Busquem el coet amb codi = a l0id del contenidor del botó
            console.log(arrayRockets[i]);
            if (arrayRockets[i].getSpeed() == 0) { // Si encara no hi ha potència aplicada als propulsors
                actualSpeed = 0; //No apliquem cap velocitat ja que no hi ha potència a frenar
            } else {
                for (j = 0; j < arrayRockets[i].thrusters.length; j++) {
                    if (arrayRockets[i].thrusters[j].speed >= 10) { //Si la potència del propulsor és >= a 10
                        arrayRockets[i].thrusters[j].speed -= powerTest; //Restem 10 de potència al propulsor
                        actualSpeed += powerTest; //Augmenta 10
                        console.log(arrayRockets[i].thrusters[j].speed);
                    }
                }
            }
            arrayRockets[i].breakRocket(actualSpeed); //Cridem la funció per restar la velocitat generada (actualSpeed)
        }
    }
}

function printRocket(event: any) {//FUNCIÓ PRINT COET
    var target = event.target;  //Botó que dispara
    var parent = target.parentElement; //Contenidor del botó
    var a = parent.id; //id del contenidor (Vam crear un contenidor amb id= rocketCode)

    console.log(a);

    var i;

    for (i = 0; i < arrayRockets.length; i++) { 
        if (arrayRockets[i].rocketCode == a) {  //Busquel el rocket de codi = al id del contenidor del botó
            console.log(arrayRockets[i]);
            
            arrayRockets[i].printRocket(); // Cridem btó per imprimir info
        }
    }
}