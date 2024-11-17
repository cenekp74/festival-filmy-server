// tohle je dost mozna ta nejodpornejsi vec co jsem kdy napsal, je to plny random parametru a takovejch blbosti, pokud to chcete zmenit radsi zacnete odznovu
// prisaham ze zbytek tohohle projektu je na tom stokrat lip...

function getRandomColor(opacity) {
    let r = Math.floor(Math.random() * 230 + 16);
    let g = Math.floor(Math.random() * 230 + 16);
    let b = Math.floor(Math.random() * 230 + 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const GRAVITY_CONSTANT = 5;
const POINT_COUNT = 120;
const MAX_SPEED = 40;
const MAX_FORCE = 3.5;
const BOUNCE_SLOWDOWN_CONSTATNT = 0.7;
const SPEED = 0.1;

class Point {
    constructor(x, y, size, mass, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.mass = mass;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = getRandomColor(0.9);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        let gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.shadowBlur = this.size/3+2;
        ctx.shadowColor = this.color.replace(/, \d+\.\d+\)/, ", 1)");

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
    }

    attraction(point) {
        let dx = point.x - this.x
        let dy = point.y - this.y

        let distance = Math.sqrt(dx*dx + dy*dy)

        if (distance < point.size + this.size) {
            distance = point.size + this.size * 1.1
        }

        let force = (GRAVITY_CONSTANT * this.mass * point.mass) / (distance*distance)

        force = Math.min(force, MAX_FORCE)

        let thta = Math.atan2(dy, dx)
        let forceX = Math.cos(thta) * force
        let forceY = Math.sin(thta) * force

        return [forceX, forceY]
    }

    update(points) {
        let total_fx = 0
        let total_fy = 0

        points.forEach(point => {
            if (this == point) { return }

            let force = this.attraction(point)

            let fx = force[0]
            let fy = force[1]

            total_fx += fx
            total_fy += fy
        });

        this.speedX += total_fx / this.mass
        this.speedY += total_fy / this.mass

        this.x += this.speedX * SPEED
        this.y += this.speedY * SPEED

        if (this.x < 0 || this.x > canvas.width) {
            if (this.x < 0) {this.x = 1}
            if (this.x > canvas.width) {this.x = canvas.width-1}
            this.speedX *= -1
            this.speedX *= BOUNCE_SLOWDOWN_CONSTATNT;
            this.speedY *= BOUNCE_SLOWDOWN_CONSTATNT;

            if (Math.abs(this.speedX) > MAX_SPEED) {
                points.splice(points.indexOf(this), 1)
                // add big point
                let size = Math.random() * 10 + 5;
                let mass = size*3;
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let speedX = (Math.random() - 0.5) * 10;
                let speedY = (Math.random() - 0.5) * 10;
                points.push(new Point(x, y, size, mass, speedX, speedY));
            }
        }
        if (this.y < 0 || this.y > canvas.height) {
            if (this.y < 0) {this.y = 1}
            if (this.y > canvas.height) {this.y = canvas.height-1}
            this.speedY *= -1
            this.speedX *= BOUNCE_SLOWDOWN_CONSTATNT;
            this.speedY *= BOUNCE_SLOWDOWN_CONSTATNT;

            if (Math.abs(this.speedY) > MAX_SPEED) {
                points.splice(points.indexOf(this), 1)
                // add small point
                let size = Math.random() * 5 + 2;
                let mass = size*1.4;
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let speedX = (Math.random() - 0.5) * 15;
                let speedY = (Math.random() - 0.5) * 15;
                points.push(new Point(x, y, size, mass, speedX, speedY));
            }
        }
    }
}

function start() {
    let points = [];

    for (let i = 0; i < POINT_COUNT*9/10; i++) {
        let size = Math.random() * 3 + 2;
        let mass = size*1.5;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 3;
        let speedY = (Math.random() - 0.5) * 3;
        points.push(new Point(x, y, size, mass, speedX, speedY));
    }
    
    for (let i = 0; i < POINT_COUNT*1/10; i++) {
        let size = Math.random() * 10 + 4;
        let mass = size*3.4;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 1;
        let speedY = (Math.random() - 0.5) * 1;
        points.push(new Point(x, y, size, mass, speedX, speedY));
    }
    
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points.forEach(point => {
            point.draw();
            point.update(points);
        });
        requestAnimationFrame(animate);
    }
    
    animate();
}

start()