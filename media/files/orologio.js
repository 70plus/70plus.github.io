// script.js
class RandomClock {
    constructor() {
        this.canvas = document.getElementById('clock');
        this.ctx = this.canvas.getContext('2d');
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = 135;
        this.currentTime = this.getRandomTime();
        this.init();
    }

    init() {
        this.drawClock();
        document.getElementById('speakBtn').addEventListener('click', () => this.speakTime());
        document.getElementById('changeBtn').addEventListener('click', () => this.changeTime());
        // Disegna orologio iniziale
        this.drawClock();
    }

    getRandomTime() {
        const hours = Math.floor(Math.random() * 12) || 12; // 1-12
        const minutes = Math.round(Math.random() * 11) * 5; // 0,5,10,...,55
        return { hours, minutes };
    }

    changeTime() {
        this.currentTime = this.getRandomTime();
        this.drawClock();
    }

    speakTime() {
        const { hours, minutes } = this.currentTime;
	let timeText;
	let tempHours = hours;

        if (minutes === 0) {
            timeText = ' in punto';
        } else if (minutes === 5) {
            timeText = ' e cinque';
        } else if (minutes === 10) {
            timeText = ' e dieci';
        } else if (minutes === 15) {
            timeText = ' e un quarto';
        } else if (minutes === 20) {
            timeText = ' e venti';
        } else if (minutes === 25) {
            timeText = ' e venticinque';
        } else if (minutes === 30) {
            timeText = ' e mezza';
        } else if (minutes === 35) {
            timeText = ' e trentacinque';
        } else if (minutes === 40) {
            timeText = ' e quaranta';
        } else if (minutes === 45) {
            timeText = ' meno un quarto';
            tempHours += 1;
        } else if (minutes === 50) {
            timeText = ' meno dieci';
            tempHours += 1;
        } else if (minutes === 55) {
            timeText = ' meno cinque';
            tempHours += 1;
        }
        
        if (tempHours === 13) {
            tempHours = 1;
        }
        
        if (tempHours === 1) {
            timeText = `una` + timeText;
        } else {timeText = `${tempHours}` + timeText;
        }

        const utterance = new SpeechSynthesisUtterance(timeText);
        utterance.lang = 'it-IT';
        speechSynthesis.speak(utterance);
    }

    drawClock() {
        const { hours, minutes } = this.currentTime;
        
        // Pulisci canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

// Sfondo immagine zoey.jpg CON sincronizzazione
	if (!this.backgroundImg) {
	    this.backgroundImg = new Image();
	    this.backgroundImg.src = 'media/files/zoey_sbiadita.jpg';
    
	    // 🔑 PUNTO DI SINCRONIZZAZIONE: ridisegna quando l'immagine è pronta
	    this.backgroundImg.onload = () => {
	        this.drawClock();  // Ridraw automatico dopo caricamento
	    };
	}

	// Disegna immagine SE caricata, altrimenti gradient
	if (this.backgroundImg.complete && this.backgroundImg.naturalHeight !== 0) {
	    this.ctx.save();
	    this.ctx.beginPath();
	    this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
	    this.ctx.clip();
	    this.ctx.drawImage(this.backgroundImg, 
	        this.centerX - this.radius, 
	        this.centerY - this.radius, 
	        this.radius * 2, 
	        this.radius * 2
	    );
	    this.ctx.restore();
	} else {
	    // Fallback gradient (TEMPORANEO)
	    const gradient = this.ctx.createRadialGradient(
	        this.centerX, this.centerY, 20,
	        this.centerX, this.centerY, this.radius
	    );
	    gradient.addColorStop(0, '#f0f0f0');
	    gradient.addColorStop(1, '#e0e0e0');
	    this.ctx.fillStyle = gradient;
	    this.ctx.beginPath();
	    this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
	    this.ctx.fill();
	}

        // Ore
        for (let i = 1; i <= 12; i++) {
            const angle = (Math.PI / 6) * i - Math.PI / 2;
            const x1 = this.centerX + (this.radius - 50) * Math.cos(angle);
            const y1 = this.centerY + (this.radius - 50) * Math.sin(angle);
            const x2 = this.centerX + (this.radius - 35) * Math.cos(angle);
            const y2 = this.centerY + (this.radius - 35) * Math.sin(angle);
            
            this.ctx.strokeStyle = '#333';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
            
            // Numeri
            this.ctx.fillStyle = '#333';
            this.ctx.font = 'bold 20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(i.toString(), x2 + 20 * Math.cos(angle), y2 + 20 * Math.sin(angle));
        }
        
        // Lancetta minuti
        const minuteAngle = (Math.PI / 30) * minutes - Math.PI / 2;
	this.ctx.strokeStyle = '#008000';  // Verde
	this.ctx.lineWidth = 8;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(
            this.centerX + (this.radius - 60) * Math.cos(minuteAngle),
            this.centerY + (this.radius - 60) * Math.sin(minuteAngle)
        );
        this.ctx.stroke();

        // Lancetta ore
        const hourAngle = (Math.PI / 6) * hours + (Math.PI / 360) * minutes - Math.PI / 2;
        this.ctx.strokeStyle = '#d32f2f';
        this.ctx.lineWidth = 8;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(
            this.centerX + (this.radius - 80) * Math.cos(hourAngle),
            this.centerY + (this.radius - 80) * Math.sin(hourAngle)
        );
        this.ctx.stroke();
                
        // Centro
        this.ctx.fillStyle = '#333';
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, 8, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}

// Inizializza l'orologio
new RandomClock();

