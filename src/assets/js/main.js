let currentLang = localStorage.getItem('lang') || 'en';
function loadLanguage(lang) {
    //  保留滚动位置（避免切换语言后页面跳转）
    const scrollPos = window.scrollY;
    fetch(`../assets/i18n/${lang}.json`)
        .then(res => res.json())
        .then(data => {
            // 更新文本内容
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (data[key]) {
                    el.textContent = data[key];
                }
            });

            // 更新图片路径
            document.querySelectorAll('[data-i18n-img]').forEach(imgEl => {
                const key = imgEl.getAttribute('data-i18n-img');
                if (data[key]) {
                    imgEl.src = data[key];
                }
            });

            currentLang = lang;
            localStorage.setItem('lang', lang);
            window.scrollTo(0, scrollPos);
            // 如果使用了 Swiper，刷新轮播
            if (window.swiper) {
                window.swiper.update();
            }

            // 通知 cookies.js 切换语言
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));

        })
        .catch(error => {
            console.error('Error loading language file:', error);
        });
}

// 事件委托监听语言切换
document.addEventListener('change', function (e) {
    if (e.target && e.target.id === 'languageSelect') {
        loadLanguage(e.target.value);
    }
});

// 页面加载时初始化语言
document.addEventListener('DOMContentLoaded', () => {
    loadLanguage(currentLang);

    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = currentLang;
    }
});


// 移动端菜单切换逻辑
// 移动端菜单切换逻辑 - 支持异步加载的 header
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });

        // 点击外部关闭菜单
        document.addEventListener('click', function (e) {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
            }
        });
        // 单机遮罩层关闭菜单
        document.querySelector('.overlay').addEventListener('click', function () {
            document.getElementById('mainNav').classList.remove('active');
        });
    }
}

// 使用 MutationObserver 检测 DOM 变化
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            const menuToggle = document.getElementById('menuToggle');
            const mainNav = document.getElementById('mainNav');
            if (menuToggle && mainNav) {
                observer.disconnect(); // 停止观察
                initMobileMenu();
            }
        }
    });
});

// 开始观察 <body> 的子节点变化
observer.observe(document.body, { childList: true, subtree: true });

// 显示/隐藏回到顶部按钮
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById('backToTop');

    if (!btn) {
        console.warn("回到顶部按钮未找到，请确认 HTML 中有 id='backToTop' 的元素");
        return;
    }

    // 显示/隐藏按钮
    window.addEventListener('scroll', function () {
        btn.style.display = (window.scrollY > 300) ? 'block' : 'none';
    });

    // 点击按钮回到顶部
    btn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});