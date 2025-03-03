// ページが読み込まれたときに実行
document.addEventListener('DOMContentLoaded', () => {
    // スムーズスクロール機能
    setupSmoothScroll();
    
    // 現在の年を自動的にフッターに表示
    updateCopyrightYear();
    
    // プロジェクトカードのアニメーション
    setupProjectCards();
});

// スムーズスクロール機能
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 現在の年を自動的にフッターに表示
function updateCopyrightYear() {
    const footerYear = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    
    if (footerYear) {
        footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
    }
}

// プロジェクトカードのアニメーション
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.backgroundColor = '#e9ecef';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.backgroundColor = '#f8f9fa';
        });
    });
}
