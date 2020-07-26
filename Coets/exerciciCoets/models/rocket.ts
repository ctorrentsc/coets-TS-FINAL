class Rocket {
    _rocketCode: string;
    _thrusters: Thruster[] = new Array();
    _actualPower: number; //Potència que s'està aplicant ontime als 3 propulsors del coet

    constructor(rocketCode: string) {
        this._rocketCode = (rocketCode).toUpperCase();
        this._actualPower = 0;
    }

    get rocketCode(): string {    //No fem setter de rocketCode pq no volem que es pugui canviar
        return this._rocketCode;
    }

    get thrusters(): Thruster[] {
        return this._thrusters;
    }

    get actualPower(): number {
        return this._actualPower;
    }

    set thrusters(thrusters: Thruster[]) {
        this._thrusters = thrusters;
    }

    set actualPower(actualPower: number) {
        this._actualPower = actualPower;
    }

    addThruster(thruster: Thruster): void {  //Afegir propulsors
        this._thrusters.push(thruster);
    }

    getMaxPower() {  // Obtenir la suma de les potències del 3 propulsors
        var impuls = 0;

        for (var i = 0; i < this._thrusters.length; i++) {
            impuls += Number(this._thrusters[i].power); //Posem Number pq sumi i no concateni
        }
        return impuls; //Suma de potències
    }

    getSpeed() { // Obtenir la suma de velocitats aplicades als 3 propulsors
        var impuls = 0;

        for (var i = 0; i < this._thrusters.length; i++) {
            impuls += this._thrusters[i].speed;
        }
        return impuls; //Suma de velocitats
    }

    displayRockets(): string { // IMprimirà CODI info propulsors + displai missatges i botons
        let i;
        let text = "";
        let resultDisplay = document.getElementById("result") as HTMLDivElement; //Penjant d'quí anirà tota la info



        for (i = 0; i < this._thrusters.length; i++) {
            text += this._thrusters[i].displayThruster(i); //Imprimim potència max de cada propulsor
        }
        var divResult: any = document.createElement("div"); // Div que inclourà info coet+accelerar+frenar+print
        divResult.setAttribute("class", "d-flex flex-row p-4 mt-3 border border-warning rounded");
        divResult.setAttribute("id", (this._rocketCode + "A"));
        divResult.innerHTML = "CODI: " + this._rocketCode + "<br>" + text + "<br>" + "POTÈNCIA DEL COET: " + this.getMaxPower();
        //Creem contenidors q pengen de divResult
        var divResult2: any = document.createElement("div"); //Contenidor info accelerar
        divResult2.setAttribute("class", "ml-md-5 mt-5 text-success");
        divResult2.setAttribute("id", (this._rocketCode + "B"))
        var divResult3: any = document.createElement("div");//Contenidor info frenar
        divResult3.setAttribute("class", "ml-md-5 mt-5 text-danger");
        divResult3.setAttribute("id", (this._rocketCode + "C"))
        var divResult4: any = document.createElement("div");//Contenidor info print
        divResult4.setAttribute("class", "ml-md-5 mt-5 text-monospace text-primary");
        divResult4.setAttribute("id", (this._rocketCode + "D"))

        resultDisplay.append(divResult); // Col·loquem cada div q tb depèn class bootstrap contenidor
        divResult.appendChild(divResult2);
        divResult.appendChild(divResult3);
        divResult.appendChild(divResult4);
        return divResult;
    }


    createButtons() {  //Funció per crear botons
        let resultDisplay = document.getElementById("result") as HTMLDivElement; //Div d'on pengen els botons

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

        var accelerateBtn = document.createElement("BUTTON");//BOTÓ ACCELERAR
        t = document.createTextNode("Accelerate Rocket");
        accelerateBtn.appendChild(t);
        accelerateBtn.setAttribute("class", "btn btn-success w-10 text-monospace mt-1 mx-sm-1");
        accelerateBtn.setAttribute("onClick", "accelerateUp(event)");
        buttons.appendChild(accelerateBtn);

        var printBtn = document.createElement("BUTTON");//BOTÓ PRINT
        t = document.createTextNode("Print Rocket");
        printBtn.appendChild(t);
        printBtn.setAttribute("class", "btn btn-primary w-10 text-monospace mt-1 ml-sm-5");
        printBtn.setAttribute("onClick", "printRocket(event)");
        buttons.appendChild(printBtn);
    }

    accelerateRocket(actualSpeed: number) {  //Funció per accelerar, li passem la potència aplicada
        var i;
        var divResultUp: any = document.getElementById(this._rocketCode + "B");//info accelerar
        var divResultDown: any = document.getElementById(this._rocketCode + "C");//info frenar
        var divResultPrint: any = document.getElementById(this._rocketCode + "D");// info print

        divResultDown.innerHTML = "";// posem en blanc display frenar
        divResultPrint.innerHTML = "";// posem en blanc display print

        if (actualSpeed < this.getMaxPower() && actualSpeed > 0) {//Potència aplicada < potència disponible i > 0
            this._actualPower += actualSpeed; //Augmentem la potència aplicada al coet
            divResultUp.innerHTML = "Potència actual del coet: " + this._actualPower;
        } else { //No hi ha prou potència per augmentar
            divResultUp.innerHTML = "Heu arribat a la potència màxima del coet que és: " + this.getMaxPower();

        }
    }


    breakRocket(actualSpeed: number) { //Funció per frenar, li passem la potència aplicada
        var i;
        var divResultUp: any = document.getElementById(this._rocketCode + "B");//info accelerar  
        var divResultDown: any = document.getElementById(this._rocketCode + "C");//info frenar
        var divResultPrint: any = document.getElementById(this._rocketCode + "D");// info print

        divResultUp.innerHTML = "";// posem en blanc display accelerar
        divResultPrint.innerHTML = "";// posem en blanc display print

        if (actualSpeed < this.getMaxPower() && actualSpeed > 0) {//Potència aplicada < potència disponible i > 0
            this._actualPower -= actualSpeed; //Disminuim la potència aplicada al coet
            divResultDown.innerHTML = "Potència actual del coet: " + this._actualPower;
        } else {  //No hi ha prou potència per disminuir
            divResultDown.innerHTML = "Heu arribat a la potència mínima del coet que és: " + 0;

        }
    }

    printRocket() {//Funció per imprimir info estat actual coet
        var divResultUp: any = document.getElementById(this._rocketCode + "B");//info accelerar  
        var divResultDown: any = document.getElementById(this._rocketCode + "C");//info frenar
        var divResultPrint: any = document.getElementById(this._rocketCode + "D");// info print

        divResultUp.innerHTML = "";// posem en blanc display accelerar
        divResultDown.innerHTML = "";// posem en blanc display frenar
        divResultPrint.innerHTML = "CODI: " + this._rocketCode + "<br>" + "Potència màxima: " + this.getMaxPower() +
            "<br>" + "Potència actual: " + this._actualPower + "<br>" + "Potència disponible: " + (this.getMaxPower() - this._actualPower);
    }
}

// DADES COETS PER DEFECTE EN CARREGAR LA PÀGINA


var rocket1: Rocket = new Rocket("32WESSDS");
var rocket2: Rocket = new Rocket("LDSFJA32");


arrayRockets.push(rocket1);  // Pugem els coets a l'Array
arrayRockets.push(rocket2);