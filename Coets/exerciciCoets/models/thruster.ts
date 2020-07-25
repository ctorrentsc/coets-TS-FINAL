class Thruster{
    public _power:number; //Potència del propulsor
    public _speed:number; //Velocitat del propulsor

    constructor(power:number){
        this._power=power;
        this._speed=0;
    }

    get power(){
        return this._power;
    }

    get speed(){
        return this._speed;
    }

    set power(power: number){
        this._power = power;
    } 

    set speed(speed: number){
    this._speed = speed;
    }  

    displayThruster(x:number): string{ //Funció per obtenir info propulsors
        return " Potència màxima propulsor" + (x+1) + " : " + this._power + "<br>";
    }

}

// DADES PROPULSORS PER DEFECTE EN CARREGAR LA PÀGINA

   var thruster1A:Thruster = new Thruster(10);
   var thruster2A:Thruster = new Thruster(30);
   var thruster3A:Thruster = new Thruster(80);

   var thruster1B:Thruster = new Thruster(30);
   var thruster2B:Thruster = new Thruster(40);
   var thruster3B:Thruster = new Thruster(50);
   var thruster4B:Thruster = new Thruster(50);
   var thruster5B:Thruster = new Thruster(30);
   var thruster6B:Thruster = new Thruster(10);

   
    arrayRockets[0].addThruster(thruster1A);  // Pugem els propulsors a l'Array del coet
    arrayRockets[0].addThruster(thruster2A);
    arrayRockets[0].addThruster(thruster3A);

    arrayRockets[1].addThruster(thruster1B);
    arrayRockets[1].addThruster(thruster2B);
    arrayRockets[1].addThruster(thruster3B);
    arrayRockets[1].addThruster(thruster4B);
    arrayRockets[1].addThruster(thruster5B);
    arrayRockets[1].addThruster(thruster6B);

    console.log(arrayRockets); //Imprimim Array per Consola

   arrayRockets[0].displayRockets();
   arrayRockets[0].createButtons();

   arrayRockets[1].displayRockets();
   arrayRockets[1].createButtons();