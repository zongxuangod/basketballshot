@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --neon-orange: #ff3c00;
    --neon-cyan: #00fff7;
    --neon-purple: #b537f2;
    --neon-gold: #ffd700;
    --dark-bg: #000000;
}

body {
    font-family: 'Rajdhani', sans-serif;
    background: #000;
    overflow: hidden;
    height: 100vh;
    color: #fff;
    position: relative;
}

/* 動態霓虹背景 */
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 20% 30%, rgba(255, 60, 0, 0.2) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(0, 255, 247, 0.2) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(181, 55, 242, 0.15) 0%, transparent 50%),
        linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%);
    animation: backgroundPulse 8s ease-in-out infinite;
    z-index: 0;
}

@keyframes backgroundPulse {
    0%, 100% { 
        opacity: 0.6; 
        transform: scale(1) rotate(0deg);
    }
    50% { 
        opacity: 1; 
        transform: scale(1.05) rotate(1deg);
    }
}

/* 粒子效果 */
body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        radial-gradient(2px 2px at 20% 30%, rgba(255, 215, 0, 0.4), transparent),
        radial-gradient(2px 2px at 60% 70%, rgba(0, 255, 247, 0.4), transparent),
        radial-gradient(1px 1px at 50% 50%, rgba(255, 60, 0, 0.3), transparent),
        radial-gradient(1px 1px at 80% 10%, rgba(181, 55, 242, 0.3), transparent);
    background-size: 200px 200px, 300px 300px, 150px 150px, 250px 250px;
    background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
    animation: particleMove 20s linear infinite;
    z-index: 0;
    pointer-events: none;
}

@keyframes particleMove {
    0% { background-position: 0 0, 40px 60px, 130px 270px, 70px 100px; }
    100% { background-position: 200px 200px, 240px 260px, 330px 470px, 270px 300px; }
}

.game-wrapper {
    width: 100%;
    height: 100vh;
    position: relative;
    z-index: 1;
}

/* ========== 主選單樣式 ========== */
.menu-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.menu-screen.active {
    display: flex;
    animation: fadeIn 0.8s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.menu-content {
    text-align: center;
    animation: slideUp 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    z-index: 2;
}

@keyframes slideUp {
    from {
        transform: translateY(80px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* 標題超級華麗效果 */
.game-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 140px;
    margin-bottom: 70px;
    letter-spacing: 18px;
    position: relative;
    font-weight: 900;
    filter: drop-shadow(0 0 20px rgba(255, 60, 0, 0.8));
}

.title-nba {
    display: block;
    background: linear-gradient(45deg, 
        var(--neon-orange), 
        var(--neon-cyan), 
        var(--neon-purple),
        var(--neon-orange));
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: rainbowShift 4s ease infinite, titleFloat 3s ease-in-out infinite;
    text-shadow: none;
    filter: drop-shadow(0 0 30px rgba(255, 60, 0, 1));
}

@keyframes rainbowShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

@keyframes titleFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.title-pro {
    color: var(--neon-gold);
    display: block;
    font-size: 110px;
    text-shadow: 
        0 0 10px rgba(255, 215, 0, 1),
        0 0 20px rgba(255, 215, 0, 1),
        0 0 30px rgba(255, 215, 0, 0.8),
        0 0 40px rgba(255, 215, 0, 0.6),
        0 0 60px rgba(255, 215, 0, 0.4),
        0 0 80px rgba(255, 215, 0, 0.2);
    animation: goldPulse 2s ease-in-out infinite;
}

@keyframes goldPulse {
    0%, 100% { 
        transform: scale(1);
        filter: brightness(1);
    }
    50% { 
        transform: scale(1.05);
        filter: brightness(1.3);
    }
}

.title-shooter {
    color: var(--neon-cyan);
    display: block;
    font-size: 90px;
    text-shadow: 
        0 0 10px rgba(0, 255, 247, 1),
        0 0 20px rgba(0, 255, 247, 1),
        0 0 30px rgba(0, 255, 247, 0.8),
        0 0 40px rgba(0, 255, 247, 0.6),
        0 0 60px rgba(0, 255, 247, 0.4);
    animation: cyanFlicker 3s ease-in-out infinite;
}

@keyframes cyanFlicker {
    0%, 100% { opacity: 1; }
    25% { opacity: 0.9; }
    50% { opacity: 1; }
    75% { opacity: 0.95; }
}

/* 選單按鈕超級華麗 */
.menu-buttons {
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
}

.menu-btn {
    font-family: 'Orbitron', sans-serif;
    font-size: 34px;
    font-weight: 900;
    padding: 28px 100px;
    background: linear-gradient(135deg, #ff3c00, #ff6b35, #ff8c5a, #ff3c00);
    background-size: 300% 300%;
    border: 4px solid transparent;
    border-radius: 50px;
    color: white;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    text-transform: uppercase;
    letter-spacing: 4px;
    box-shadow: 
        0 10px 40px rgba(255, 60, 0, 0.7),
        inset 0 -5px 20px rgba(0, 0, 0, 0.4),
        0 0 0 0 rgba(255, 60, 0, 0.5);
    position: relative;
    overflow: hidden;
    animation: buttonGradient 3s ease infinite, buttonFloat 3s ease-in-out infinite;
}

@keyframes buttonGradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

@keyframes buttonFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
}

.menu-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    transition: left 0.7s;
}

.menu-btn::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.menu-btn:hover::before {
    left: 100%;
}

.menu-btn:hover::after {
    width: 400px;
    height: 400px;
}

.menu-btn:hover {
    transform: translateY(-10px) scale(1.1);
    border-color: rgba(255, 215, 0, 1);
    box-shadow: 
        0 25px 70px rgba(255, 60, 0, 1),
        inset 0 -5px 20px rgba(0, 0, 0, 0.4),
        0 0 40px rgba(255, 215, 0, 0.8),
        0 0 60px rgba(0, 255, 247, 0.6);
    text-shadow: 0 0 15px rgba(255, 255, 255, 1);
    filter: brightness(1.2);
}

.menu-btn:active {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 
        0 15px 40px rgba(255, 60, 0, 0.8),
        inset 0 5px 20px rgba(0, 0, 0, 0.6);
}

.version {
    margin-top: 50px;
    font-size: 20px;
    font-family: 'Orbitron', sans-serif;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 4px;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
    animation: versionBlink 4s ease-in-out infinite;
}

@keyframes versionBlink {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
}

/* ========== 遊戲畫面樣式 ========== */
.game-screen {
    width: 100%;
    height: 100vh;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.game-screen.active {
    display: flex;
}

/* HUD 超級華麗介面 */
.hud {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 35px 60px;
    z-index: 10;
    background: linear-gradient(180deg, rgba(10, 14, 39, 0.95) 0%, transparent 100%);
    backdrop-filter: blur(10px);
}

.hud-left, .hud-center, .hud-right {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.hud-center {
    align-items: center;
}

.hud-right {
    align-items: flex-end;
}

/* 得分顯示 - 超級華麗 */
.score-display {
    font-family: 'Orbitron', sans-serif;
    font-size: 52px;
    color: var(--neon-gold);
    text-shadow: 
        0 0 10px rgba(255, 215, 0, 1),
        0 0 20px rgba(255, 215, 0, 1),
        0 0 30px rgba(255, 215, 0, 0.8),
        0 0 40px rgba(255, 215, 0, 0.6),
        0 0 60px rgba(255, 215, 0, 0.4);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    animation: scoreGlow 2.5s ease-in-out infinite;
    filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
}

@keyframes scoreGlow {
    0%, 100% {
        transform: scale(1);
        filter: brightness(1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
    }
    50% {
        transform: scale(1.03);
        filter: brightness(1.3) drop-shadow(0 0 30px rgba(255, 215, 0, 1));
    }
}

.score-display .label {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 4px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}

.score-display .value {
    font-size: 96px;
    line-height: 1;
    font-weight: 900;
}

/* 連擊顯示 - 爆炸效果 */
.combo-display {
    font-family: 'Orbitron', sans-serif;
    font-size: 48px;
    font-weight: 900;
    color: var(--neon-orange);
    text-shadow: 
        0 0 10px rgba(255, 60, 0, 1),
        0 0 20px rgba(255, 60, 0, 1),
        0 0 30px rgba(255, 60, 0, 0.8),
        0 0 40px rgba(255, 60, 0, 0.6),
        0 0 60px rgba(255, 60, 0, 0.4);
    animation: comboExplosion 0.7s ease-in-out infinite;
    filter: drop-shadow(0 0 25px rgba(255, 60, 0, 1));
}

@keyframes comboExplosion {
    0%, 100% { 
        transform: scale(1) rotate(0deg); 
        filter: brightness(1) drop-shadow(0 0 25px rgba(255, 60, 0, 1));
    }
    50% { 
        transform: scale(1.2) rotate(3deg); 
        filter: brightness(1.5) drop-shadow(0 0 40px rgba(255, 60, 0, 1));
    }
}

/* 計時器 - 霓虹效果 */
.timer-display {
    font-family: 'Orbitron', sans-serif;
    font-size: 110px;
    font-weight: 900;
    color: var(--neon-cyan);
    text-shadow: 
        0 0 10px rgba(0, 255, 247, 1),
        0 0 20px rgba(0, 255, 247, 1),
        0 0 30px rgba(0, 255, 247, 1),
        0 0 40px rgba(0, 255, 247, 0.8),
        0 0 60px rgba(0, 255, 247, 0.6),
        0 0 80px rgba(0, 255, 247, 0.4);
    line-height: 1;
    animation: timerNeon 1.2s ease-in-out infinite;
    filter: drop-shadow(0 0 30px rgba(0, 255, 247, 1));
}

@keyframes timerNeon {
    0%, 100% { 
        transform: scale(1);
        filter: brightness(1) drop-shadow(0 0 30px rgba(0, 255, 247, 1));
    }
    50% { 
        transform: scale(1.06);
        filter: brightness(1.4) drop-shadow(0 0 50px rgba(0, 255, 247, 1));
    }
}

.round-display {
    font-size: 26px;
    font-family: 'Orbitron', sans-serif;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 3px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}

.stats-display {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.stat-label {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 2px;
}

.stat-value {
    font-family: 'Orbitron', sans-serif;
    font-size: 48px;
    font-weight: 900;
    color: var(--neon-purple);
    text-shadow: 
        0 0 10px rgba(181, 55, 242, 1),
        0 0 20px rgba(181, 55, 242, 0.8),
        0 0 30px rgba(181, 55, 242, 0.6);
    filter: drop-shadow(0 0 20px rgba(181, 55, 242, 0.8));
}

/* Canvas - 霓虹邊框 */
#gameCanvas {
    border: 5px solid transparent;
    border-radius: 25px;
    box-shadow: 
        0 0 40px rgba(255, 60, 0, 0.8),
        0 0 80px rgba(0, 255, 247, 0.6),
        inset 0 0 100px rgba(0, 0, 0, 0.9);
    background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%);
    position: relative;
    animation: canvasNeonBorder 4s ease-in-out infinite;
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
}

@keyframes canvasNeonBorder {
    0%, 100% {
        border-color: rgba(255, 60, 0, 1);
        box-shadow: 
            0 0 40px rgba(255, 60, 0, 0.8),
            0 0 80px rgba(0, 255, 247, 0.6),
            inset 0 0 100px rgba(0, 0, 0, 0.9);
    }
    33% {
        border-color: rgba(0, 255, 247, 1);
        box-shadow: 
            0 0 40px rgba(0, 255, 247, 0.8),
            0 0 80px rgba(181, 55, 242, 0.6),
            inset 0 0 100px rgba(0, 0, 0, 0.9);
    }
    66% {
        border-color: rgba(181, 55, 242, 1);
        box-shadow: 
            0 0 40px rgba(181, 55, 242, 0.8),
            0 0 80px rgba(255, 60, 0, 0.6),
            inset 0 0 100px rgba(0, 0, 0, 0.9);
    }
}

/* 遊戲訊息 - 爆炸特效 */
.game-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Orbitron', sans-serif;
    font-size: 120px;
    font-weight: 900;
    color: var(--neon-gold);
    text-shadow: 
        0 0 20px rgba(255, 215, 0, 1),
        0 0 40px rgba(255, 215, 0, 1),
        0 0 60px rgba(255, 215, 0, 1),
        0 0 80px rgba(255, 215, 0, 0.8),
        0 0 100px rgba(255, 215, 0, 0.6),
        0 0 140px rgba(255, 215, 0, 0.4);
    opacity: 0;
    pointer-events: none;
    z-index: 50;
    letter-spacing: 10px;
    filter: drop-shadow(0 0 50px rgba(255, 215, 0, 1));
}

.game-message.show {
    opacity: 1;
    animation: messageExplosion 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes messageExplosion {
    0% {
        transform: translate(-50%, -50%) scale(0.2) rotate(-15deg);
        opacity: 0;
        filter: blur(20px) drop-shadow(0 0 50px rgba(255, 215, 0, 1));
    }
    20% {
        transform: translate(-50%, -50%) scale(1.5) rotate(8deg);
        opacity: 1;
        filter: blur(0px) drop-shadow(0 0 80px rgba(255, 215, 0, 1));
    }
    40% {
        transform: translate(-50%, -50%) scale(1.2) rotate(-3deg);
        opacity: 1;
    }
    70% {
        transform: translate(-50%, -50%) scale(1.1) rotate(1deg);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
        opacity: 0;
        filter: blur(10px) drop-shadow(0 0 30px rgba(255, 215, 0, 0.5));
    }
}

/* 控制提示 */
.controls-hint {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 35px;
    z-index: 10;
}

.hint-item {
    background: rgba(255, 255, 255, 0.08);
    padding: 15px 30px;
    border-radius: 30px;
    font-size: 18px;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 2px;
    backdrop-filter: blur(15px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 
        0 0 20px rgba(255, 60, 0, 0.4),
        inset 0 0 20px rgba(255, 255, 255, 0.1);
    animation: hintPulse 3s ease-in-out infinite;
}

@keyframes hintPulse {
    0%, 100% { 
        transform: scale(1);
        box-shadow: 
            0 0 20px rgba(255, 60, 0, 0.4),
            inset 0 0 20px rgba(255, 255, 255, 0.1);
    }
    50% { 
        transform: scale(1.05);
        box-shadow: 
            0 0 30px rgba(255, 60, 0, 0.6),
            inset 0 0 30px rgba(255, 255, 255, 0.2);
    }
}

/* 響應式設計 */
@media (max-width: 1400px) {
    .game-title { font-size: 100px; }
    .title-pro { font-size: 80px; }
    .title-shooter { font-size: 65px; }
    .menu-btn { font-size: 28px; padding: 22px 80px; }
    
    #gameCanvas {
        max-width: 100%;
        height: auto;
    }
}

@media (max-width: 1024px) {
    .hud { 
        padding: 20px 30px;
    }
    
    .score-display .value { font-size: 64px; }
    .timer-display { font-size: 72px; }
    .combo-display { font-size: 36px; }
    .stat-value { font-size: 40px; }
    .game-message { font-size: 70px; }
    
    #gameCanvas {
        max-width: 95%;
        height: auto;
    }
}

@media (max-width: 768px) {
    body::after {
        animation: none;
        opacity: 0.3;
    }
    
    .game-title { 
        font-size: 60px;
        letter-spacing: 8px;
        margin-bottom: 40px;
    }
    
    .title-pro { font-size: 48px; }
    .title-shooter { font-size: 38px; }
    
    .menu-btn { 
        font-size: 20px;
        padding: 16px 50px;
        letter-spacing: 2px;
    }
    
    .menu-btn.small {
        font-size: 18px;
        padding: 14px 40px;
    }
    
    .version {
        font-size: 14px;
        margin-top: 30px;
    }
    
    .game-screen {
        padding: 10px;
    }
    
    .hud { 
        padding: 15px;
        gap: 10px;
    }
    
    .hud-left, .hud-center, .hud-right {
        flex-direction: column;
        gap: 8px;
    }
    
    .score-display {
        font-size: 28px;
    }
    
    .score-display .value { font-size: 42px; }
    .score-display .label { font-size: 14px; }
    
    .timer-display { font-size: 48px; }
    .round-display { font-size: 16px; }
    .wind-display { font-size: 16px; }
    .combo-display { font-size: 24px; }
    
    .stat-item {
        flex-direction: row;
        gap: 10px;
        align-items: center;
    }
    
    .stat-label { font-size: 14px; }
    .stat-value { font-size: 28px; }
    
    .powerup-display {
        font-size: 14px;
        padding: 8px 15px;
    }
    
    .game-message { 
        font-size: 42px;
        letter-spacing: 4px;
    }
    
    .controls-hint { 
        flex-direction: column;
        gap: 10px;
        bottom: 20px;
    }
    
    .hint-item {
        font-size: 14px;
        padding: 10px 20px;
    }
    
    #gameCanvas {
        width: 100% !important;
        max-width: 500px;
        height: auto !important;
        border-width: 3px;
        border-radius: 15px;
    }
    
    /* 排行榜 */
    .leaderboard-content {
        width: 95%;
        padding: 10px;
    }
    
    .leaderboard-title {
        font-size: 48px;
        margin-bottom: 25px;
    }
    
    .leaderboard-list {
        padding: 20px;
        max-height: 400px;
    }
    
    .leaderboard-item {
        padding: 12px;
        margin: 10px 0;
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .leaderboard-rank {
        font-size: 24px;
        min-width: 50px;
    }
    
    .leaderboard-name {
        font-size: 18px;
        margin: 0 10px;
    }
    
    .leaderboard-score {
        font-size: 22px;
    }
    
    .leaderboard-buttons {
        flex-direction: column;
        gap: 15px;
    }
    
    .leaderboard-buttons .menu-btn {
        width: 100%;
    }
    
    /* 遊戲結束畫面 */
    .gameover-content {
        width: 95%;
        padding: 10px;
    }
    
    .gameover-title {
        font-size: 52px;
        margin-bottom: 30px;
    }
    
    .final-stats {
        padding: 25px;
        margin-bottom: 25px;
    }
    
    .stat-row {
        padding: 12px;
        margin: 10px 0;
        flex-direction: column;
        gap: 5px;
    }
    
    .stat-row .stat-label {
        font-size: 16px;
    }
    
    .stat-row .stat-value {
        font-size: 36px;
    }
    
    #playerNameInput {
        font-size: 18px;
        padding: 15px;
    }
    
    .name-input-section {
        margin: 20px 0;
    }
}

@media (max-width: 480px) {
    .game-title { 
        font-size: 42px;
        letter-spacing: 4px;
    }
    
    .title-pro { font-size: 36px; }
    .title-shooter { font-size: 28px; }
    
    .menu-btn { 
        font-size: 18px;
        padding: 14px 40px;
    }
    
    .menu-btn.small {
        font-size: 16px;
        padding: 12px 35px;
    }
    
    .hud {
        padding: 10px;
    }
    
    .score-display .value { font-size: 36px; }
    .timer-display { font-size: 40px; }
    .combo-display { font-size: 20px; }
    .game-message { font-size: 32px; }
    
    .leaderboard-title {
        font-size: 36px;
    }
    
    .leaderboard-item {
        padding: 10px;
        font-size: 14px;
    }
    
    .leaderboard-rank {
        font-size: 20px;
        min-width: 40px;
    }
    
    .leaderboard-name {
        font-size: 16px;
    }
    
    .leaderboard-score {
        font-size: 18px;
    }
    
    .gameover-title {
        font-size: 38px;
    }
    
    .stat-row .stat-value {
        font-size: 28px;
    }
    
    .controls-hint {
        bottom: 10px;
    }
    
    .hint-item {
        font-size: 12px;
        padding: 8px 15px;
    }
}

/* 橫向模式優化 */
@media (max-height: 600px) and (orientation: landscape) {
    .game-title {
        font-size: 48px;
        margin-bottom: 20px;
    }
    
    .title-pro { font-size: 38px; }
    .title-shooter { font-size: 30px; }
    
    .menu-btn {
        font-size: 18px;
        padding: 12px 40px;
    }
    
    .menu-buttons {
        gap: 15px;
    }
    
    .version {
        margin-top: 20px;
        font-size: 12px;
    }
    
    .hud {
        padding: 10px 20px;
        flex-direction: row;
    }
    
    .hud-left, .hud-center, .hud-right {
        flex-direction: column;
    }
    
    .score-display .value { font-size: 32px; }
    .timer-display { font-size: 36px; }
    
    .controls-hint {
        flex-direction: row;
        gap: 15px;
        bottom: 10px;
    }
    
    .hint-item {
        font-size: 12px;
        padding: 6px 12px;
    }
}


/* 風向顯示 */
.wind-display {
    font-size: 24px;
    font-family: 'Orbitron', sans-serif;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
    margin-top: 10px;
}

/* 道具顯示 */
.powerup-display {
    background: rgba(255, 255, 255, 0.1);
    padding: 12px 20px;
    border-radius: 20px;
    font-size: 18px;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 2px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 215, 0, 0.5);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
    animation: powerupPulse 1s ease-in-out infinite;
    display: none;
}

.powerup-display.active {
    display: block;
}

@keyframes powerupPulse {
    0%, 100% { 
        transform: scale(1);
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
    }
    50% { 
        transform: scale(1.05);
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
    }
}

/* 小按鈕樣式 */
.menu-btn.small {
    font-size: 24px;
    padding: 18px 60px;
}

.menu-btn.danger {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.menu-btn.danger:hover {
    box-shadow: 
        0 25px 70px rgba(231, 76, 60, 1),
        inset 0 -5px 20px rgba(0, 0, 0, 0.4),
        0 0 40px rgba(231, 76, 60, 0.8);
}

/* 排行榜畫面 */
.leaderboard-content {
    text-align: center;
    animation: slideUp 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    max-width: 800px;
    width: 90%;
}

.leaderboard-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 80px;
    font-weight: 900;
    margin-bottom: 40px;
    background: linear-gradient(45deg, var(--neon-gold), var(--neon-orange), var(--neon-gold));
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 3s ease infinite;
    filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.8));
}

.leaderboard-list {
    background: rgba(0, 0, 0, 0.6);
    border: 3px solid rgba(255, 215, 0, 0.5);
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 30px;
    max-height: 500px;
    overflow-y: auto;
    backdrop-filter: blur(10px);
}

.leaderboard-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    margin: 15px 0;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s;
    font-family: 'Orbitron', sans-serif;
}

.leaderboard-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(10px);
    border-color: rgba(255, 215, 0, 0.5);
}

.leaderboard-item.rank-1 {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.1));
    border-color: rgba(255, 215, 0, 0.8);
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
}

.leaderboard-item.rank-2 {
    background: linear-gradient(135deg, rgba(192, 192, 192, 0.3), rgba(192, 192, 192, 0.1));
    border-color: rgba(192, 192, 192, 0.8);
}

.leaderboard-item.rank-3 {
    background: linear-gradient(135deg, rgba(205, 127, 50, 0.3), rgba(205, 127, 50, 0.1));
    border-color: rgba(205, 127, 50, 0.8);
}

.leaderboard-rank {
    font-size: 36px;
    font-weight: 900;
    min-width: 80px;
}

.leaderboard-name {
    flex: 1;
    font-size: 24px;
    margin: 0 20px;
}

.leaderboard-score {
    font-size: 32px;
    font-weight: 900;
    color: var(--neon-gold);
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
}

.leaderboard-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
}

.empty-leaderboard {
    padding: 60px;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.5);
}

/* 遊戲結束畫面 */
.gameover-content {
    text-align: center;
    animation: slideUp 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    max-width: 700px;
}

.gameover-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 90px;
    font-weight: 900;
    margin-bottom: 50px;
    background: linear-gradient(45deg, var(--neon-orange), var(--neon-cyan), var(--neon-purple), var(--neon-orange));
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: rainbowShift 4s ease infinite;
    filter: drop-shadow(0 0 40px rgba(255, 60, 0, 0.8));
}

.final-stats {
    background: rgba(0, 0, 0, 0.6);
    border: 3px solid rgba(255, 215, 0, 0.5);
    border-radius: 20px;
    padding: 40px;
    margin-bottom: 40px;
    backdrop-filter: blur(10px);
}

.stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    margin: 15px 0;
    font-family: 'Orbitron', sans-serif;
}

.stat-row .stat-label {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.8);
}

.stat-row .stat-value {
    font-size: 48px;
    font-weight: 900;
}

.stat-row .stat-value.gold {
    color: var(--neon-gold);
    text-shadow: 0 0 20px rgba(255, 215, 0, 1);
}

.stat-row .stat-value.cyan {
    color: var(--neon-cyan);
    text-shadow: 0 0 20px rgba(0, 255, 247, 1);
}

.stat-row .stat-value.orange {
    color: var(--neon-orange);
    text-shadow: 0 0 20px rgba(255, 60, 0, 1);
}

.name-input-section {
    margin: 30px 0;
}

#playerNameInput {
    width: 100%;
    padding: 20px;
    font-size: 24px;
    font-family: 'Orbitron', sans-serif;
    background: rgba(255, 255, 255, 0.1);
    border: 3px solid rgba(255, 215, 0, 0.5);
    border-radius: 15px;
    color: #fff;
    text-align: center;
    margin-bottom: 20px;
    backdrop-filter: blur(10px);
    transition: all 0.3s;
}

#playerNameInput:focus {
    outline: none;
    border-color: rgba(255, 215, 0, 1);
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
    background: rgba(255, 255, 255, 0.15);
}

#playerNameInput::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

/* 滾動條美化 */
.leaderboard-list::-webkit-scrollbar {
    width: 10px;
}

.leaderboard-list::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

.leaderboard-list::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, var(--neon-gold), var(--neon-orange));
    border-radius: 10px;
}

.leaderboard-list::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, var(--neon-orange), var(--neon-gold));
}


/* 模式切換按鈕 */
.mode-toggle-btn {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 60, 0, 0.9), rgba(255, 107, 53, 0.9));
    border: 3px solid rgba(255, 215, 0, 0.8);
    color: white;
    font-size: 28px;
    cursor: pointer;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 
        0 5px 20px rgba(255, 60, 0, 0.6),
        inset 0 -2px 10px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    animation: modeBtnPulse 2s ease-in-out infinite;
}

@keyframes modeBtnPulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 
            0 5px 20px rgba(255, 60, 0, 0.6),
            inset 0 -2px 10px rgba(0, 0, 0, 0.3);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 
            0 8px 30px rgba(255, 60, 0, 0.8),
            inset 0 -2px 10px rgba(0, 0, 0, 0.3);
    }
}

.mode-toggle-btn:hover {
    transform: scale(1.1) rotate(180deg);
    background: linear-gradient(135deg, rgba(0, 255, 247, 0.9), rgba(0, 212, 255, 0.9));
    border-color: rgba(0, 255, 247, 1);
    box-shadow: 
        0 10px 40px rgba(0, 255, 247, 0.8),
        inset 0 -2px 10px rgba(0, 0, 0, 0.3);
}

.mode-toggle-btn:active {
    transform: scale(0.95) rotate(180deg);
}

.mode-toggle-btn #modeIcon {
    animation: iconRotate 3s linear infinite;
}

@keyframes iconRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.mode-toggle-btn:hover #modeIcon {
    animation: iconRotate 0.5s linear infinite;
}

/* 模式提示 */
.mode-hint {
    position: fixed;
    top: 90px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 15px;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'Orbitron', sans-serif;
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    border: 2px solid rgba(255, 215, 0, 0.5);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
}

.mode-hint.show {
    opacity: 1;
}

@media (max-width: 768px) {
    .mode-toggle-btn {
        width: 50px;
        height: 50px;
        font-size: 24px;
        top: 15px;
        right: 15px;
    }
    
    .mode-hint {
        top: 75px;
        right: 15px;
        font-size: 12px;
        padding: 8px 12px;
    }
}
