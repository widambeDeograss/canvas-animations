// Basic building blocks of animations on a canvas
// 1:  CREATE AN OBJECT
// 2: MOVE AN OBJECT
// 3: KEEP TRACK OF OBJECTS POSITION ON THE CANVAS


//SETUP THE CANVAS
const  canvas:any = document.getElementById("BubblesIdx");
const context:any = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// const radius = 20;
// let x: any,y: any;
//
// const draw = () =>  {
//     console.log(x, y);
//     context.beginPath();
//     context.arc(x,y, radius, 0, 2 * Math.PI, false);
//     context.strokeStyle = '#000000';
//     context.stroke();
// }



// canvas.addEventListener("resize", () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// });


// ANIMATE THE OBJECTS AND MAKE THEM MOVE
// const animate = () => {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//
//     const dx = 1;
//     const dy = 1;
//
//     x = x + dx;
//     y = y - dy;
//
//     draw();
//
//     requestAnimationFrame(animate);
// }
//
// animate();

const  particleArray: any[] = [];

// MAKE IT DRY
class Particle {
    public x: any;
    public y: any;
    public radius: number;
    public dx: number;
    public dy: number;
    public hue: number;

    constructor( x:any = 0, y:any = 0) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 40;
        this.dx = Math.random() * 3;
        this.dy = Math.random() * 3;
        this.hue = 200;
    }

    draw() {
        context.beginPath();
        context.arc(this.x,this.y, this.radius, 0, 2 * Math.PI);
        context.strokeStyle = `hsl(${this.hue}) 100% 50%`;
        context.stroke();

        const gradient = context.createRadialGradient(
            this.x,
            this.y,
            1,
            this.x + 0.5,
            this.y + 0.5,
            this.radius,
        );

        gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.3)");
        gradient.addColorStop(0.95, "#e7feff");

        context.fillStyle = gradient;
        context.fill();

    }

    move() {
        this.x = this.dx + this.x;
        this.y = this.y - this.dy;
    }


}



const handleDrawCircle = (a: any, b :any) => {
    for (let i = 0; i < 10; i++) {
        const particle = new Particle(a, b);
        particleArray.push(particle);
    }
};

const animateClass = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    particleArray.forEach((particle:any) => {
        particle?.move();
        particle?.draw();
    })

    console.log(particleArray);

    requestAnimationFrame(animateClass);
}

animateClass();

canvas.addEventListener("click", (event:any) => {
    handleDrawCircle(event?.clientX, event?.clientY);
})






