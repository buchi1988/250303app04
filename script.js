document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM読み込み完了');
    
    // DOM要素の取得
    const gameArea = document.getElementById('game-area');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const scoreElement = document.getElementById('score');
    const finalScoreElement = document.getElementById('final-score');
    const timerElement = document.getElementById('timer');
    const gameOverElement = document.getElementById('game-over');
    
    // DOM要素の確認
    if (!gameArea) {
        console.error('ゲームエリアの要素が見つかりません');
        return;
    }
    
    console.log('ゲームエリア:', gameArea);
    console.log('ゲームエリアの幅:', gameArea.clientWidth);
    console.log('ゲームエリアの高さ:', gameArea.clientHeight);
    console.log('スタートボタン:', startButton);
    
    // ゲーム変数
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let timerInterval;
    let isGameRunning = false;
    
    // ゲーム開始関数
    function startGame() {
        console.log('ゲーム開始関数が呼び出されました');
        // ゲーム状態のリセット
        score = 0;
        timeLeft = 30;
        scoreElement.textContent = score;
        timerElement.textContent = timeLeft;
        gameOverElement.classList.add('hidden');
        
        // ゲームスタートボタンを非表示にする
        startButton.style.display = 'none';
        
        // 既存のメガネを削除
        const existingGlasses = document.querySelectorAll('.glasses');
        existingGlasses.forEach(glass => glass.remove());
        
        // ゲーム実行中フラグをセット
        isGameRunning = true;
        
        // 最初のメガネを生成
        createGlasses();
        
        // メガネ生成インターバルの設定
        gameInterval = setInterval(() => {
            console.log('インターバルからメガネ生成関数を呼び出します');
            createGlasses();
        }, 1000);
        
        // タイマーインターバルの設定
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            console.log('タイマー更新:', timeLeft);
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }
    
    // ゲーム終了関数
    function endGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        isGameRunning = false;
        
        finalScoreElement.textContent = score;
        gameOverElement.classList.remove('hidden');
        
        // ゲームスタートボタンを再表示
        startButton.style.display = 'block';
    }
    
    // メガネ生成関数
    function createGlasses() {
        console.log('メガネ生成関数が呼び出されました');
        if (!isGameRunning) return;
        
        const glasses = document.createElement('div');
        glasses.classList.add('glasses');
        glasses.textContent = '👓'; // メガネの絵文字を追加
        glasses.dataset.isGlasses = 'true'; // データ属性を追加
        
        // ランダムな位置を設定
        const maxX = gameArea.clientWidth - 60;
        const maxY = gameArea.clientHeight - 60;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        glasses.style.left = `${randomX}px`;
        glasses.style.top = `${randomY}px`;
        
        // 一定時間後にメガネを消す
        setTimeout(() => {
            if (glasses.parentNode === gameArea) {
                glasses.remove();
            }
        }, 2000);
        
        // ゲームエリアにメガネを追加
        gameArea.appendChild(glasses);
        console.log('メガネを追加しました:', glasses);
    }
    
    // ゲームエリアにクリックイベントを追加
    gameArea.addEventListener('click', (event) => {
        if (!isGameRunning) return;
        
        // クリックされた要素またはその親要素がメガネかどうかを判定
        const clickedElement = event.target;
        const glassesElement = clickedElement.closest('.glasses');
        
        if (glassesElement) {
            console.log('メガネがクリックされました');
            
            // スコア加算
            score++;
            console.log('スコア加算:', score);
            scoreElement.textContent = score;
            
            // メガネを削除
            glassesElement.remove();
            console.log('メガネを削除しました');
        }
    });
    
    // イベントリスナーの設定
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    
    // ゲームエリアのサイズ調整（レスポンシブ対応）
    function resizeGameArea() {
        const containerWidth = document.querySelector('.game-container').clientWidth;
        const aspectRatio = 16 / 9;
        gameArea.style.height = `${containerWidth / aspectRatio}px`;
    }
    
    // 初期化時とウィンドウリサイズ時にゲームエリアのサイズを調整
    window.addEventListener('resize', resizeGameArea);
    resizeGameArea();
});
