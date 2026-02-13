// ========== 遊戲核心設定 ==========
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 遊戲模式：'auto'（自動偵測）、'landscape'（橫向）、'portrait'（直向）
let gameMode = 'auto';

// 載入儲存的模式偏好
const savedMode = localStorage.getItem('nbaProShooterMode');
if (savedMode && ['auto', 'landscape', 'portrait'].includes(savedMode)) {
    gameMode = savedMode;
}

// 響應式 Canvas 尺寸
function resizeCanvas() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    const isPortrait = window.innerHeight > window.innerWidth;
    
    // 判斷實際使用的模式
    let usePortraitMode = false;
    if (gameMode === 'portrait') {
        usePortraitMode = true;
    } else if (gameMode === 'landscape') {
        usePortraitMode = false;
    } else {
        // auto 模式：根據螢幕判斷
        usePortraitMode = isPortrait && isMobile;
    }
    
    let width, height;
    
    if (usePortraitMode) {
        // 直向模式：正方形
        width = Math.min(window.innerWidth - 20, 500);
        height = Math.min(window.innerWidth - 20, 500);
    } else if (isSmallMobile) {
        width = Math.min(window.innerWidth - 20, 600);
        height = Math.min(window.innerHeight * 0.5, 400);
    } else if (isMobile) {
        width = Math.min(window.innerWidth - 40, 900);
        height = Math.min(window.innerHeight * 0.6, 600);
    } else {
        // 桌面版：固定尺寸
        width = 1400;
        height = 800;
    }
    
    // 處理高 DPI 螢幕（防止模糊）
    const dpr = window.devicePixelRatio || 1;
    
    // 設定 CSS 尺寸
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    // 設定實際畫布尺寸（考慮 DPI）
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    // 縮放 context 以匹配 DPI
    ctx.scale(dpr, dpr);
    
    // 儲存邏輯尺寸供遊戲使用
    canvas.logicalWidth = width;
    canvas.logicalHeight = height;
}

resizeCanvas();
window.addEventListener('resize', () => {
    const wasActive = gameState.gameActive;
    const oldWidth = canvas.logicalWidth;
    const oldHeight = canvas.logicalHeight;
    resizeCanvas();
    
    if (wasActive && player && hoop && (oldWidth !== canvas.logicalWidth || oldHeight !== canvas.logicalHeight)) {
        repositionGameObjects();
    }
});

// 遊戲狀態
let gameState = {
    currentScreen: 'menu',
    score: 0,
    timeLeft: 60,
    combo: 0,
    maxCombo: 0,
    currentRound: 1,
    totalRounds: 5,
    ballsInRack: 5,
    totalShots: 0,
    successfulShots: 0,
    gameActive: false
};

// 遊戲物件
let player = null;
let ball = null;
let hoop = null;
let particles = [];
let powerBar = null;
let camera = { shake: 0, offsetX: 0, offsetY: 0 };
let powerUps = [];
let activePowerUp = null;
let powerUpDuration = 0;

// 風力系統
let wind = {
    force: 0,
    direction: 1,
    changeTimer: 0
};

// 計時器
let timerInterval = null;
let animationFrameId = null;

// ========== 類別定義 ==========

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 120;
        this.shooting = false;
        this.shootFrame = 0;
        this.animation = { idle: 0, shoot: 0 };
    }

    update() {
        if (this.shooting) {
            this.shootFrame++;
            if (this.shootFrame > 20) {
                this.shooting = false;
                this.shootFrame = 0;
            }
        }
        this.animation.idle += 0.05;
    }

    draw() {
        ctx.save();
        const bobOffset = Math.sin(this.animation.idle) * 3;
        const shootOffset = this.shooting ? Math.sin(this.shootFrame * 0.3) * 20 : 0;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y + this.height, 35, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        
        const gradient = ctx.createLinearGradient(this.x - 30, this.y, this.x + 30, this.y + 80);
        gradient.addColorStop(0, '#1e3799');
        gradient.addColorStop(1, '#0c2461');
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x - 25, this.y + bobOffset, 50, 75);
        
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('23', this.x, this.y + 50 + bobOffset);
        
        ctx.fillStyle = '#d4a574';
        ctx.beginPath();
        ctx.arc(this.x, this.y - 15 + bobOffset, 25, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.x - 8, this.y - 18 + bobOffset, 3, 0, Math.PI * 2);
        ctx.arc(this.x + 8, this.y - 18 + bobOffset, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#d4a574';
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        
        if (powerBar && powerBar.charging || this.shooting) {
            ctx.beginPath();
            ctx.moveTo(this.x + 20, this.y + 20 + bobOffset);
            ctx.lineTo(this.x + 35, this.y - 30 - shootOffset + bobOffset);
            ctx.lineTo(this.x + 45, this.y - 55 - shootOffset + bobOffset);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(this.x - 25, this.y + 20 + bobOffset);
            ctx.lineTo(this.x - 40, this.y + 50 + bobOffset);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 25, this.y + 20 + bobOffset);
            ctx.lineTo(this.x + 40, this.y + 50 + bobOffset);
            ctx.stroke();
        }
        
        ctx.lineWidth = 12;
        ctx.strokeStyle = '#0c2461';
        ctx.beginPath();
        ctx.moveTo(this.x - 10, this.y + 75 + bobOffset);
        ctx.lineTo(this.x - 15, this.y + 120 + bobOffset);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x + 10, this.y + 75 + bobOffset);
        ctx.lineTo(this.x + 15, this.y + 120 + bobOffset);
        ctx.stroke();
        
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(this.x - 25, this.y + 120 + bobOffset, 18, 10);
        ctx.fillRect(this.x + 7, this.y + 120 + bobOffset, 18, 10);
        
        ctx.restore();
    }
}

class Ball {
    constructor(x, y, vx, vy, isMoney = false) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = 18;
        this.gravity = 0.4;
        this.rotation = 0;
        this.active = true;
        this.scored = false;
        this.isMoney = isMoney;
        this.trail = [];
    }

    update() {
        this.vy += this.gravity;
        
        // 風力影響
        if (activePowerUp !== 'noWind') {
            this.vx += wind.force * wind.direction * 0.03;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += 0.15;
        
        this.trail.push({ x: this.x, y: this.y, life: 1, radius: this.radius });
        if (this.trail.length > 20) this.trail.shift();
        this.trail.forEach(t => t.life -= 0.05);
        
        if (this.y > canvas.logicalHeight + 100) {
            this.active = false;
            if (!this.scored) {
                gameState.combo = 0;
                updateComboDisplay();
                showMessage('未進！', '#e74c3c');
            }
        }
    }

    draw() {
        ctx.save();
        
        this.trail.forEach((t, i) => {
            ctx.globalAlpha = t.life * 0.4;
            const gradient = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.radius);
            gradient.addColorStop(0, this.isMoney ? '#ffd700' : '#ff6b35');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(t.x, t.y, t.radius * 0.7, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        
        const glowGradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2);
        glowGradient.addColorStop(0, this.isMoney ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 107, 53, 0.3)');
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        const ballGradient = ctx.createRadialGradient(-5, -5, 0, 0, 0, this.radius);
        ballGradient.addColorStop(0, this.isMoney ? '#ffe55c' : '#ff8c5a');
        ballGradient.addColorStop(1, this.isMoney ? '#ffd700' : '#ff6b35');
        ctx.fillStyle = ballGradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-this.radius, 0);
        ctx.lineTo(this.radius, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -this.radius);
        ctx.lineTo(0, this.radius);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
        
        if (this.isMoney) {
            ctx.fillStyle = '#000';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('$', 0, 5);
        }
        
        ctx.restore();
    }

    checkScore() {
        if (this.scored || !hoop) return false;
        
        const hoopCenterX = hoop.x + hoop.width / 2;
        const hoopY = hoop.y;
        const dx = this.x - hoopCenterX;
        const dy = this.y - hoopY;
        
        const hoopWidth = activePowerUp === 'bigHoop' ? hoop.width * 1.5 : hoop.width;
        
        if (Math.abs(dx) < hoopWidth / 2 + this.radius &&
            this.y > hoopY - 20 && this.y < hoopY + 60 &&
            this.vy > 0) {
            this.scored = true;
            return true;
        }
        return false;
    }
}

class Hoop {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 90;
        this.height = 15;
        this.animation = 0;
    }

    update() {
        this.animation += 0.02;
    }

    draw() {
        ctx.save();
        
        const wobble = Math.sin(this.animation) * 2;
        const displayWidth = activePowerUp === 'bigHoop' ? this.width * 1.5 : this.width;
        
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y - 150);
        ctx.lineTo(this.x + this.width / 2, this.y);
        ctx.stroke();
        
        const backboardGradient = ctx.createLinearGradient(
            this.x - 20, this.y - 150,
            this.x - 20, this.y - 30
        );
        backboardGradient.addColorStop(0, '#ffffff');
        backboardGradient.addColorStop(1, '#cccccc');
        ctx.fillStyle = backboardGradient;
        ctx.fillRect(this.x - 20, this.y - 150, this.width + 40, 120);
        
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 5;
        ctx.strokeRect(this.x - 20, this.y - 150, this.width + 40, 120);
        
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.strokeRect(this.x, this.y - 120, this.width, 60);
        
        if (activePowerUp === 'bigHoop') {
            ctx.strokeStyle = '#00ff00';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00ff00';
        } else {
            ctx.strokeStyle = '#ff6b35';
        }
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.ellipse(
            this.x + this.width / 2,
            this.y + wobble,
            displayWidth / 2,
            10,
            0, 0, Math.PI * 2
        );
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12;
            const x1 = this.x + this.width / 2 + Math.cos(angle) * (displayWidth / 2);
            const y1 = this.y + Math.sin(angle) * 10 + wobble;
            const x2 = this.x + this.width / 2 + Math.cos(angle) * (displayWidth / 2 - 15);
            const y2 = this.y + Math.sin(angle) * 8 + 35 + wobble;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        
        ctx.restore();
    }
}

class Particle {
    constructor(x, y, color, size = 5) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10 - 3;
        this.life = 1;
        this.color = color;
        this.size = size;
        this.gravity = 0.3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life -= 0.015;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class PowerBar {
    constructor() {
        this.charging = false;
        this.power = 0;
        this.maxPower = 100;
    }

    update() {
        if (this.charging) {
            this.power = Math.min(this.maxPower, this.power + 2.5);
        }
    }

    draw() {
        if (!this.charging) return;
        
        const barWidth = 400;
        const barHeight = 40;
        const w = canvas.logicalWidth || canvas.width;
        const h = canvas.logicalHeight || canvas.height;
        const x = w / 2 - barWidth / 2;
        const y = h - 150;
        
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(x - 15, y - 15, barWidth + 30, barHeight + 30);
        
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, barWidth, barHeight);
        
        const powerWidth = (this.power / this.maxPower) * barWidth;
        const powerGradient = ctx.createLinearGradient(x, y, x + powerWidth, y);
        
        if (this.power < 30) {
            powerGradient.addColorStop(0, '#2ecc71');
            powerGradient.addColorStop(1, '#27ae60');
        } else if (this.power < 70) {
            powerGradient.addColorStop(0, '#f39c12');
            powerGradient.addColorStop(1, '#e67e22');
        } else {
            powerGradient.addColorStop(0, '#e74c3c');
            powerGradient.addColorStop(1, '#c0392b');
        }
        
        ctx.fillStyle = powerGradient;
        ctx.fillRect(x, y, powerWidth, barHeight);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 24px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('蓄力中...', w / 2, y - 25);
        ctx.font = '20px Orbitron';
        ctx.fillText(`${Math.floor(this.power)}%`, w / 2, y + barHeight + 30);
        ctx.restore();
    }
}

class PowerUp {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.size = 35;
        this.rotation = 0;
        this.collected = false;
        this.bobOffset = 0;
        
        this.config = {
            bigHoop: { color: '#2ecc71', icon: '🎯', name: '大籃框' },
            slowTime: { color: '#3498db', icon: '⏰', name: '時間減速' },
            noWind: { color: '#9b59b6', icon: '🌪️', name: '無風' },
            freeze: { color: '#1abc9c', icon: '❄️', name: '凍結時間' }
        };
    }

    update() {
        this.rotation += 0.05;
        this.bobOffset = Math.sin(Date.now() * 0.003) * 10;
    }

    draw() {
        if (this.collected) return;
        
        const config = this.config[this.type];
        ctx.save();
        ctx.translate(this.x, this.y + this.bobOffset);
        ctx.rotate(this.rotation);
        
        ctx.fillStyle = config.color;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(0, 0, this.size + 15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 1;
        ctx.fillStyle = config.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = config.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(config.icon, 0, 0);
        
        ctx.restore();
    }

    checkCollision(ball) {
        if (this.collected || !ball || !ball.active) return false;
        const dx = ball.x - this.x;
        const dy = ball.y - (this.y + this.bobOffset);
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.size + ball.radius;
    }
}

// ========== 遊戲初始化 ==========
function isPortraitMode() {
    if (gameMode === 'portrait') return true;
    if (gameMode === 'landscape') return false;
    // auto 模式
    const isMobile = window.innerWidth <= 768;
    const isPortrait = window.innerHeight > window.innerWidth;
    return isMobile && isPortrait;
}

function repositionGameObjects() {
    if (!player || !hoop) return;
    
    if (isPortraitMode()) {
        // 直向：上下配置
        player.x = canvas.logicalWidth / 2;
        player.y = canvas.logicalHeight - 150;
        hoop.x = canvas.logicalWidth / 2 - 45;
        hoop.y = 180;
    } else {
        // 橫向：左右配置
        const scaleX = canvas.logicalWidth / 1400;
        const scaleY = canvas.logicalHeight / 800;
        player.x = 300 * scaleX;
        player.y = canvas.logicalHeight - 200;
        hoop.x = canvas.logicalWidth - 400 * scaleX;
        hoop.y = 180 * scaleY;
    }
}

function initGame() {
    if (isPortraitMode()) {
        // 直向：上下配置
        player = new Player(canvas.logicalWidth / 2, canvas.logicalHeight - 150);
        hoop = new Hoop(canvas.logicalWidth / 2 - 45, 180);
    } else {
        // 橫向：左右配置
        const scaleX = canvas.logicalWidth / 1400;
        const scaleY = canvas.logicalHeight / 800;
        player = new Player(300 * scaleX, canvas.logicalHeight - 200);
        hoop = new Hoop(canvas.logicalWidth - 400 * scaleX, 180 * scaleY);
    }
    
    powerBar = new PowerBar();
    particles = [];
    powerUps = [];
    ball = null;
    activePowerUp = null;
    powerUpDuration = 0;
    
    wind.force = Math.random() * 3;
    wind.direction = Math.random() > 0.5 ? 1 : -1;
    wind.changeTimer = 0;
    
    gameState = {
        ...gameState,
        score: 0,
        timeLeft: 60,
        combo: 0,
        maxCombo: 0,
        currentRound: 1,
        ballsInRack: 5,
        totalShots: 0,
        successfulShots: 0,
        gameActive: true
    };
    
    updateUI();
    updateWindDisplay();
}

function updateWindDisplay() {
    const windEl = document.getElementById('windDisplay');
    if (wind.force < 0.5) {
        windEl.textContent = '🌤️ 無風';
        windEl.style.color = 'rgba(255, 255, 255, 0.7)';
    } else {
        const direction = wind.direction > 0 ? '→' : '←';
        const strength = wind.force < 1.5 ? '微風' : wind.force < 2.5 ? '強風' : '暴風';
        windEl.textContent = `💨 ${direction} ${strength}`;
        windEl.style.color = wind.force > 2 ? '#ff3c00' : '#00fff7';
    }
}

function spawnPowerUp() {
    if (powerUps.length > 0) return;
    if (Math.random() < 0.3) {
        const types = ['bigHoop', 'slowTime', 'noWind', 'freeze'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        let x, y;
        if (isPortraitMode()) {
            // 直向：道具出現在中間區域
            x = canvas.logicalWidth / 2 + (Math.random() - 0.5) * 150;
            y = canvas.logicalHeight / 2 + (Math.random() - 0.5) * 100;
        } else {
            // 橫向：道具出現在飛行路徑上
            x = Math.random() * (canvas.logicalWidth - 400) + 200;
            y = Math.random() * 200 + 300;
        }
        
        powerUps.push(new PowerUp(type, x, y));
    }
}

function activatePowerUp(type) {
    activePowerUp = type;
    powerUpDuration = 300;
    
    const powerupEl = document.getElementById('powerupDisplay');
    const config = {
        bigHoop: '🎯 大籃框',
        slowTime: '⏰ 時間減速',
        noWind: '🌪️ 無風',
        freeze: '❄️ 凍結時間'
    };
    
    powerupEl.textContent = config[type];
    powerupEl.classList.add('active');
    
    if (type === 'slowTime') {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            gameState.timeLeft--;
            updateUI();
            if (gameState.timeLeft <= 0) endGame();
        }, 2000);
    }
}

function deactivatePowerUp() {
    if (activePowerUp === 'slowTime') {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            gameState.timeLeft--;
            updateUI();
            if (gameState.timeLeft <= 0) endGame();
        }, 1000);
    }
    
    activePowerUp = null;
    document.getElementById('powerupDisplay').classList.remove('active');
}

// ========== 遊戲循環 ==========
function gameLoop() {
    if (!gameState.gameActive) return;
    
    if (camera.shake > 0) {
        camera.offsetX = (Math.random() - 0.5) * camera.shake;
        camera.offsetY = (Math.random() - 0.5) * camera.shake;
        camera.shake *= 0.92;
        if (camera.shake < 0.1) {
            camera.shake = 0;
            camera.offsetX = 0;
            camera.offsetY = 0;
        }
    }
    
    ctx.save();
    ctx.translate(camera.offsetX, camera.offsetY);
    ctx.clearRect(-camera.offsetX, -camera.offsetY, canvas.logicalWidth, canvas.logicalHeight);
    
    drawBackground();
    
    if (hoop) {
        hoop.update();
        hoop.draw();
    }
    
    if (player) {
        player.update();
        player.draw();
    }
    
    powerUps.forEach(p => {
        p.update();
        p.draw();
    });
    
    if (powerBar) {
        powerBar.update();
        powerBar.draw();
    }
    
    if (ball && ball.active) {
        ball.update();
        ball.draw();
        
        powerUps.forEach(p => {
            if (p.checkCollision(ball)) {
                p.collected = true;
                activatePowerUp(p.type);
                showMessage(`獲得 ${p.config[p.type].name}！`, '#2ecc71');
                for (let i = 0; i < 30; i++) {
                    particles.push(new Particle(p.x, p.y, p.config[p.type].color, 8));
                }
            }
        });
        
        if (ball.checkScore()) {
            handleScore();
        }
    }
    
    powerUps = powerUps.filter(p => !p.collected);
    
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    if (powerUpDuration > 0) {
        powerUpDuration--;
        if (powerUpDuration === 0) {
            deactivatePowerUp();
        }
    }
    
    wind.changeTimer++;
    if (wind.changeTimer > 180) {
        wind.force = Math.random() * 3;
        wind.direction = Math.random() > 0.5 ? 1 : -1;
        wind.changeTimer = 0;
        updateWindDisplay();
    }
    
    ctx.restore();
    animationFrameId = requestAnimationFrame(gameLoop);
}

function drawBackground() {
    const floorHeight = isPortraitMode() ? 100 : 200;
    const floorGradient = ctx.createLinearGradient(0, canvas.logicalHeight - floorHeight, 0, canvas.logicalHeight);
    floorGradient.addColorStop(0, '#d4a574');
    floorGradient.addColorStop(1, '#b8935f');
    ctx.fillStyle = floorGradient;
    ctx.fillRect(0, canvas.logicalHeight - floorHeight, canvas.logicalWidth, floorHeight);
    
    ctx.strokeStyle = 'rgba(139, 111, 71, 0.3)';
    ctx.lineWidth = 2;
    const lineSpacing = window.innerWidth <= 768 ? 30 : 50;
    for (let i = 0; i < canvas.logicalWidth; i += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(i, canvas.logicalHeight - floorHeight);
        ctx.lineTo(i, canvas.logicalHeight);
        ctx.stroke();
    }
    
    // 三分線（橫向模式顯示）
    if (!isPortraitMode()) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 5;
        ctx.beginPath();
        const arcRadius = Math.min(450, canvas.logicalWidth * 0.4);
        ctx.arc(hoop.x + 45, canvas.logicalHeight - floorHeight, arcRadius, Math.PI * 0.7, Math.PI * 1.3);
        ctx.stroke();
    }
}

function handleScore() {
    gameState.successfulShots++;
    const points = ball.isMoney ? 2 : 1;
    const bonusPoints = gameState.combo * points;
    gameState.score += points + bonusPoints;
    gameState.combo++;
    
    if (gameState.combo > gameState.maxCombo) {
        gameState.maxCombo = gameState.combo;
    }
    
    camera.shake = 15;
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle(
            ball.x, ball.y,
            ball.isMoney ? '#ffd700' : ['#2ecc71', '#ff6b35', '#00d4ff'][Math.floor(Math.random() * 3)],
            Math.random() * 8 + 3
        ));
    }
    
    if (ball.isMoney) {
        showMessage('💰 MONEY BALL! +2', '#ffd700');
    } else if (gameState.combo > 3) {
        showMessage(`🔥 ${gameState.combo}連擊！`, '#ff6b35');
    } else {
        showMessage('✓ 進球！', '#2ecc71');
    }
    
    updateUI();
}

function shootBall() {
    if (!player || !hoop || !powerBar) return;
    if (ball && ball.active) return;
    if (gameState.ballsInRack <= 0) return;
    
    gameState.totalShots++;
    
    const startX = player.x + 45;
    const startY = player.y - 55;
    const targetX = hoop.x + hoop.width / 2;
    const targetY = hoop.y + 10;
    
    const dx = targetX - startX;
    const dy = targetY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    let angle, speed, speedAdjust;
    
    if (isPortraitMode()) {
        // 直向：向上投籃（更難）
        angle = -88 * Math.PI / 180; // 接近垂直但稍微偏一點
        speed = 10 + (powerBar.power / 100) * 5; // 降低速度範圍
        speedAdjust = 1 + (distance - 350) / 400; // 調整距離計算
        
        // 加入隨機偏移增加難度
        const randomOffset = (Math.random() - 0.5) * 0.05;
        angle += randomOffset;
    } else {
        // 橫向：斜向投籃
        angle = -50 * Math.PI / 180;
        speed = 16 + (powerBar.power / 100) * 8;
        speedAdjust = 1 + (distance - 700) / 1000;
    }
    
    const finalSpeed = speed * Math.max(0.8, Math.min(1.4, speedAdjust));
    
    const vx = Math.cos(angle) * finalSpeed * (dx > 0 ? 1 : -1);
    const vy = Math.sin(angle) * finalSpeed;
    
    const isMoney = gameState.ballsInRack === 1;
    ball = new Ball(startX, startY, vx, vy, isMoney);
    
    player.shooting = true;
    gameState.ballsInRack--;
    
    if (gameState.ballsInRack === 0) {
        setTimeout(() => {
            nextRound();
        }, 2500);
    }
    
    powerBar.power = 0;
    powerBar.charging = false;
}

function nextRound() {
    gameState.currentRound++;
    
    if (gameState.currentRound <= gameState.totalRounds) {
        gameState.ballsInRack = 5;
        wind.force = Math.random() * 3;
        wind.direction = Math.random() > 0.5 ? 1 : -1;
        updateWindDisplay();
        spawnPowerUp();
        showMessage(`第 ${gameState.currentRound} 輪`, '#00d4ff');
        updateUI();
    } else {
        endGame();
    }
}

function endGame() {
    gameState.gameActive = false;
    if (timerInterval) clearInterval(timerInterval);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    
    const accuracy = gameState.totalShots > 0 
        ? ((gameState.successfulShots / gameState.totalShots) * 100).toFixed(1)
        : 0;
    
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('finalAccuracy').textContent = `${accuracy}%`;
    document.getElementById('finalCombo').textContent = gameState.maxCombo;
    
    setTimeout(() => {
        switchScreen('gameover');
    }, 1500);
}

function updateUI() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('timer').textContent = gameState.timeLeft;
    document.getElementById('round').textContent = `第 ${gameState.currentRound}/${gameState.totalRounds} 輪`;
    
    const accuracy = gameState.totalShots > 0 
        ? ((gameState.successfulShots / gameState.totalShots) * 100).toFixed(1)
        : 0;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    
    updateComboDisplay();
}

function updateComboDisplay() {
    const comboDisplay = document.getElementById('comboDisplay');
    if (gameState.combo > 1) {
        comboDisplay.textContent = `🔥 ${gameState.combo} 連擊！`;
        comboDisplay.style.display = 'block';
    } else {
        comboDisplay.style.display = 'none';
    }
}

function showMessage(text, color = '#ffd700') {
    const messageEl = document.getElementById('gameMessage');
    messageEl.textContent = text;
    messageEl.style.color = color;
    messageEl.classList.add('show');
    
    setTimeout(() => {
        messageEl.classList.remove('show');
    }, 1500);
}

function switchScreen(screen) {
    document.getElementById('mainMenu').classList.remove('active');
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('leaderboardScreen').classList.remove('active');
    document.getElementById('gameOverScreen').classList.remove('active');
    
    if (screen === 'menu') {
        document.getElementById('mainMenu').classList.add('active');
    } else if (screen === 'game') {
        document.getElementById('gameScreen').classList.add('active');
    } else if (screen === 'leaderboard') {
        document.getElementById('leaderboardScreen').classList.add('active');
        displayLeaderboard();
    } else if (screen === 'gameover') {
        document.getElementById('gameOverScreen').classList.add('active');
    }
}

function startGame() {
    switchScreen('game');
    initGame();
    
    timerInterval = setInterval(() => {
        if (activePowerUp === 'freeze') return;
        gameState.timeLeft--;
        updateUI();
        if (gameState.timeLeft <= 0) endGame();
    }, 1000);
    
    gameLoop();
}

// ========== 排行榜系統 ==========
function loadLeaderboard() {
    const data = localStorage.getItem('nbaProShooterLeaderboard');
    return data ? JSON.parse(data) : [];
}

function saveLeaderboard(leaderboard) {
    localStorage.setItem('nbaProShooterLeaderboard', JSON.stringify(leaderboard));
}

function addScore(name, score, accuracy, combo) {
    const leaderboard = loadLeaderboard();
    const date = new Date().toLocaleDateString('zh-TW');
    
    leaderboard.push({
        name: name,
        score: score,
        accuracy: accuracy,
        combo: combo,
        date: date
    });
    
    leaderboard.sort((a, b) => b.score - a.score);
    const top10 = leaderboard.slice(0, 10);
    saveLeaderboard(top10);
    return top10;
}

function displayLeaderboard() {
    const leaderboard = loadLeaderboard();
    const listElement = document.getElementById('leaderboardList');
    
    if (leaderboard.length === 0) {
        listElement.innerHTML = '<div class="empty-leaderboard">還沒有任何記錄<br>快來挑戰吧！🏀</div>';
        return;
    }
    
    let html = '';
    leaderboard.forEach((entry, index) => {
        const rankClass = index < 3 ? `rank-${index + 1}` : '';
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
        
        html += `
            <div class="leaderboard-item ${rankClass}">
                <span class="leaderboard-rank">${medal}</span>
                <span class="leaderboard-name">${entry.name}</span>
                <span class="leaderboard-score">${entry.score} 分</span>
            </div>
        `;
    });
    
    listElement.innerHTML = html;
}

function clearLeaderboard() {
    if (confirm('確定要清除所有排行榜記錄嗎？')) {
        localStorage.removeItem('nbaProShooterLeaderboard');
        displayLeaderboard();
        showMessage('排行榜已清除！', '#e74c3c');
    }
}

// ========== 事件監聽 ==========
document.getElementById('playBtn').addEventListener('click', startGame);

document.getElementById('leaderboardMenuBtn').addEventListener('click', () => {
    switchScreen('leaderboard');
});

document.getElementById('backToMenuBtn').addEventListener('click', () => {
    switchScreen('menu');
});

document.getElementById('clearLeaderboardBtn').addEventListener('click', clearLeaderboard);

document.getElementById('submitScoreBtn').addEventListener('click', () => {
    const name = document.getElementById('playerNameInput').value.trim();
    
    if (!name) {
        alert('請輸入你的名字！');
        return;
    }
    
    const accuracy = gameState.totalShots > 0 
        ? ((gameState.successfulShots / gameState.totalShots) * 100).toFixed(1)
        : 0;
    
    addScore(name, gameState.score, accuracy, gameState.maxCombo);
    document.getElementById('playerNameInput').value = '';
    switchScreen('leaderboard');
});

document.getElementById('skipBtn').addEventListener('click', () => {
    switchScreen('menu');
});

document.getElementById('playerNameInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('submitScoreBtn').click();
    }
});

// 滑鼠控制
canvas.addEventListener('mousedown', () => {
    if (!gameState.gameActive || !powerBar) return;
    if (ball && ball.active) return;
    if (gameState.ballsInRack <= 0) return;
    powerBar.charging = true;
});

canvas.addEventListener('mouseup', () => {
    if (!gameState.gameActive || !powerBar) return;
    if (!powerBar.charging) return;
    if (powerBar.power >= 10) {
        shootBall();
    } else {
        powerBar.charging = false;
        powerBar.power = 0;
    }
});

// 鍵盤控制
let spaceKeyDown = false;

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !spaceKeyDown) {
        e.preventDefault();
        if (!gameState.gameActive || !powerBar) return;
        if (ball && ball.active) return;
        if (gameState.ballsInRack <= 0) return;
        spaceKeyDown = true;
        powerBar.charging = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space' && spaceKeyDown) {
        e.preventDefault();
        spaceKeyDown = false;
        if (!gameState.gameActive || !powerBar) return;
        if (!powerBar.charging) return;
        if (powerBar.power >= 10) {
            shootBall();
        } else {
            powerBar.charging = false;
            powerBar.power = 0;
        }
    }
});

// 觸控支援
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (!gameState.gameActive || !powerBar) return;
    if (ball && ball.active) return;
    if (gameState.ballsInRack <= 0) return;
    powerBar.charging = true;
});

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    if (!gameState.gameActive || !powerBar) return;
    if (!powerBar.charging) return;
    if (powerBar.power >= 10) {
        shootBall();
    } else {
        powerBar.charging = false;
        powerBar.power = 0;
    }
});

// 初始繪製
const w = canvas.logicalWidth || canvas.width;
const h = canvas.logicalHeight || canvas.height;
ctx.fillStyle = '#1a1f3a';
ctx.fillRect(0, 0, w, h);
ctx.fillStyle = '#fff';
ctx.font = '36px Orbitron';
ctx.textAlign = 'center';
ctx.fillText('🏀 NBA PRO SHOOTER 🏀', w / 2, h / 2);

console.log('🎮 NBA PRO SHOOTER v2.0 已載入！');
console.log('✨ 新功能：道具系統、風向系統、排行榜');
console.log('🔥 準備好挑戰了嗎？');


// ========== 模式切換功能 ==========
function toggleGameMode() {
    const modes = ['auto', 'landscape', 'portrait'];
    const currentIndex = modes.indexOf(gameMode);
    gameMode = modes[(currentIndex + 1) % modes.length];
    
    // 儲存偏好設定
    localStorage.setItem('nbaProShooterMode', gameMode);
    
    // 更新按鈕圖示
    updateModeIcon();
    
    // 顯示提示
    showModeHint();
    
    // 重新調整 Canvas 和遊戲物件
    resizeCanvas();
    if (gameState.gameActive && player && hoop) {
        repositionGameObjects();
    }
}

function updateModeIcon() {
    const modeIcon = document.getElementById('modeIcon');
    if (!modeIcon) return;
    
    if (gameMode === 'auto') {
        modeIcon.textContent = '🔄';
    } else if (gameMode === 'landscape') {
        modeIcon.textContent = '↔️';
    } else {
        modeIcon.textContent = '↕️';
    }
}

function showModeHint() {
    const hints = {
        'auto': '自動模式：根據螢幕自動調整',
        'landscape': '橫向模式：左右投籃',
        'portrait': '直向模式：上下投籃'
    };
    
    showMessage(hints[gameMode], '#00fff7');
}

// 初始化模式圖示
document.addEventListener('DOMContentLoaded', () => {
    updateModeIcon();
});

// 模式切換按鈕事件
const modeToggleBtn = document.getElementById('modeToggleBtn');
if (modeToggleBtn) {
    modeToggleBtn.addEventListener('click', toggleGameMode);
}
