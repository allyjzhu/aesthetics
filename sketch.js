let table; 
let positions;
let related;
let name;
let x ;
let y;
let minname;
let colors;
let scale;

const string2array = (s) => s.substr(2, s.length-4).split("', '")

function preload() {
    table = loadTable("graph.csv", "csv", "header");
}

function setup() {
    let myCanvas = createCanvas(4000,4000);
    myCanvas.parent('myContainer');
    positions = {}
    related = {}
    colors = {}
    synth = new Tone.Synth().toDestination();

    for (let r = 0; r < table.getRowCount(); r++) {
        let x = random(0, width);
        let y = random(0, height);
        const name = table.getString(r, "aesthetic");
        const meow = table.getString(r, "related");
        positions[name] = {x, y}
        related[name] = string2array(meow)
        colors[name] = [0,100,0]
    }    
}

function mouseClicked() {
    
    const d = (x, y) => sqrt((x-mouseX)**2 + (y-mouseY)**2)
    let mindist = Number.POSITIVE_INFINITY
    let minname = undefined
    for (let name of Object.keys(positions)) {
        let {x, y} = positions[name]
        dd = d(x, y)
        if (dd < mindist) {
            mindist = dd
            minname = name
        }
        else{
            console.log("none")
        }
       
    }

    
    let {x, y} = positions[minname]

    
        scale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
        let note = int(random(0,scale.length));
        synth.triggerAttackRelease(scale[note], 0.3);

    
    
    colors[minname] = [155,20,147]
    console.log(minname)

    
    for (let r of related[minname]) {
        p = positions[r]
        let px = p.x
        let py = p.y
        let distx = x - px
        let disty = y - py
        let pnx = x - distx/3
        let pny = y - disty/3
        positions[r] = {x: pnx, y: pny}
        colors[r] = [156, 200, 217]
    }
}



function draw(){
    
    background(250)
    for (let name of Object.keys(positions)) {
        let {x, y} = positions[name]
        stroke(colors[name])
        fill(colors[name])
        text(name, x, y)
       
    }
    

        
}
