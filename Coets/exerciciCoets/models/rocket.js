"use strict";
var Rocket = /** @class */ (function () {
    function Rocket(rocketCode) {
        this._thrusters = new Array();
        this._rocketCode = (rocketCode).toUpperCase();
        this._actualPower = 0;
    }
    Object.defineProperty(Rocket.prototype, "rocketCode", {
        get: function () {
            return this._rocketCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rocket.prototype, "thrusters", {
        get: function () {
            return this._thrusters;
        },
        set: function (thrusters) {
            this._thrusters = thrusters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rocket.prototype, "actualPower", {
        get: function () {
            return this._actualPower;
        },
        set: function (actualPower) {
            this._actualPower = actualPower;
        },
        enumerable: false,
        configurable: true
    });
    Rocket.prototype.addThruster = function (thruster) {
        this._thrusters.push(thruster);
    };
    Rocket.prototype.getMaxPower = function () {
        var impuls = 0;
        for (var i = 0; i < this._thrusters.length; i++) {
            impuls += Number(this._thrusters[i].power); //Posem Number pq sumi i no concateni
        }
        return impuls; //Suma de potències
    };
    Rocket.prototype.getSpeed = function () {
        var impuls = 0;
        for (var i = 0; i < this._thrusters.length; i++) {
            impuls += this._thrusters[i].speed;
        }
        return impuls; //Suma de velocitats
    };
    Rocket.prototype.displayRockets = function () {
        var i;
        var text = "";
        var resultDisplay = document.getElementById("result"); //Penjant d'quí anirà tota la info
        for (i = 0; i < this._thrusters.length; i++) {
            text += this._thrusters[i].displayThruster(i); //Imprimim potència max de cada propulsor
            var divResult = document.createElement("div"); // Div que inclourà info coet+accelerar+frenar+print
            divResult.setAttribute("class", "d-flex flex-row p-4 mt-3 border border-warning rounded");
            divResult.setAttribute("id", (this._rocketCode + "A"));
            var divResult2 = document.createElement("div"); //Contenidor info accelerar
            divResult2.setAttribute("class", "ml-md-5 mt-5 text-success");
            divResult2.setAttribute("id", (this._rocketCode + "B"));
            var divResult3 = document.createElement("div"); //Contenidor info frenar
            divResult3.setAttribute("class", "ml-md-5 mt-5 text-danger");
            divResult3.setAttribute("id", (this._rocketCode + "C"));
            var divResult4 = document.createElement("div"); //Contenidor info print
            divResult4.setAttribute("class", "ml-md-5 mt-5 text-monospace text-primary");
            divResult4.setAttribute("id", (this._rocketCode + "D"));
            divResult.innerHTML = "CODI: " + this._rocketCode + "<br>" + text + "<br>" + "POTÈNCIA DEL COET: " + this.getMaxPower();
        }
        resultDisplay.append(divResult); // Col·loquem cada div q tb depèn class bootstrap contenidor
        divResult.appendChild(divResult2);
        divResult.appendChild(divResult3);
        divResult.appendChild(divResult4);
        return divResult;
    };
    Rocket.prototype.createButtons = function () {
        var resultDisplay = document.getElementById("result"); //Div d'on pengen els botons
        var buttons = document.createElement("div"); // div que contindrà el buttons in-line (row)
        buttons.setAttribute("class", "container mt-2 d-flex flex-row flex-wrap");
        buttons.setAttribute("id", this._rocketCode);
        resultDisplay.appendChild(buttons);
        var breakBtn = document.createElement("BUTTON"); //BOTÓ FRENAR
        var t = document.createTextNode("Break Rocket");
        breakBtn.appendChild(t);
        breakBtn.setAttribute("class", "btn btn-danger w-10 text-monospace mt-1 mr-sm-1");
        breakBtn.setAttribute("onClick", "breakDown(event)");
        buttons.appendChild(breakBtn);
        var accelerateBtn = document.createElement("BUTTON"); //BOTÓ ACCELERAR
        t = document.createTextNode("Accelerate Rocket");
        accelerateBtn.appendChild(t);
        accelerateBtn.setAttribute("class", "btn btn-success w-10 text-monospace mt-1 mx-sm-1");
        accelerateBtn.setAttribute("onClick", "accelerateUp(event)");
        buttons.appendChild(accelerateBtn);
        var printBtn = document.createElement("BUTTON"); //BOTÓ PRINT
        t = document.createTextNode("Print Rocket");
        printBtn.appendChild(t);
        printBtn.setAttribute("class", "btn btn-primary w-10 text-monospace mt-1 ml-sm-5");
        printBtn.setAttribute("onClick", "printRocket(event)");
        buttons.appendChild(printBtn);
    };
    Rocket.prototype.accelerateRocket = function (actualSpeed) {
        var i;
        var divResultUp = document.getElementById(this._rocketCode + "B"); //info accelerar
        var divResultDown = document.getElementById(this._rocketCode + "C"); //info frenar
        var divResultPrint = document.getElementById(this._rocketCode + "D"); // info print
        divResultDown.innerHTML = ""; // posem en blanc display frenar
        divResultPrint.innerHTML = ""; // posem en blanc display print
        if (actualSpeed < this.getMaxPower() && actualSpeed > 0) { //Potència aplicada < potència disponible i > 0
            this._actualPower += actualSpeed; //Augmentem la potència aplicada al coet
            divResultUp.innerHTML = "Potència actual del coet: " + this._actualPower;
        }
        else { //No hi ha prou potència per augmentar
            divResultUp.innerHTML = "Heu arribat a la potència màxima del coet que és: " + this.getMaxPower();
        }
    };
    Rocket.prototype.breakRocket = function (actualSpeed) {
        var i;
        var divResultUp = document.getElementById(this._rocketCode + "B"); //info accelerar  
        var divResultDown = document.getElementById(this._rocketCode + "C"); //info frenar
        var divResultPrint = document.getElementById(this._rocketCode + "D"); // info print
        divResultUp.innerHTML = ""; // posem en blanc display accelerar
        divResultPrint.innerHTML = ""; // posem en blanc display print
        if (actualSpeed < this.getMaxPower() && actualSpeed > 0) { //Potència aplicada < potència disponible i > 0
            this._actualPower -= actualSpeed; //Disminuim la potència aplicada al coet
            divResultDown.innerHTML = "Potència actual del coet: " + this._actualPower;
        }
        else { //No hi ha prou potència per disminuir
            divResultDown.innerHTML = "Heu arribat a la potència mínima del coet que és: " + 0;
        }
    };
    Rocket.prototype.printRocket = function () {
        var divResultUp = document.getElementById(this._rocketCode + "B"); //info accelerar  
        var divResultDown = document.getElementById(this._rocketCode + "C"); //info frenar
        var divResultPrint = document.getElementById(this._rocketCode + "D"); // info print
        this.getMaxPower();
        console.log(this.getMaxPower());
        divResultUp.innerHTML = ""; // posem en blanc display accelerar
        divResultDown.innerHTML = ""; // posem en blanc display frenar
        divResultPrint.innerHTML = "CODI: " + this._rocketCode + "<br>" + "Potència màxima: " + this.getMaxPower() +
            "<br>" + "Potència actual: " + this._actualPower + "<br>" + "Potència disponible: " + (this.getMaxPower() - this._actualPower);
    };
    return Rocket;
}());
// DADES COETS PER DEFECTE EN CARREGAR LA PÀGINA
var rocket1 = new Rocket("32WESSDS");
var rocket2 = new Rocket("LDSFJA32");
arrayRockets.push(rocket1); // Pugem els coets a l'Array
arrayRockets.push(rocket2);
