/*
    Tea Brand 2024 - Main JavaScript
    Shared functionality across all pages
*/

// ===== GLOBAL VARIABLES =====
let charts = {};
let counters = {};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAOS();
    initializeCounters();
    initializeCharts();
    initializeSmoothScroll();
    initializeActiveNavigation();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            } else {
                navMenu.classList.add('active');
                navToggle.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
}

// ===== AOS (ANIMATE ON SCROLL) =====
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
}

// ===== COUNTER ANIMATIONS =====
function initializeCounters() {
    // 라이브러리 로드 대기
    setTimeout(() => {
        const counters = document.querySelectorAll('[data-countup]');
        
        console.log('Checking CountUp v1.9.3:', {
            'window.CountUp': typeof window.CountUp,
            'counters found': counters.length,
            'page URL': window.location.pathname
        });
        
        // 각 카운터의 정보를 출력
        counters.forEach((counter, index) => {
            console.log(`Counter ${index + 1}:`, {
                'element': counter.tagName + '.' + counter.className,
                'data-countup': counter.dataset.countup,
                'current text': counter.textContent,
                'id': counter.id || 'no-id'
            });
        });
        
        if (typeof window.CountUp !== 'undefined' && counters.length > 0) {
            console.log('CountUp library found! Initializing counters...');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        const finalValue = parseFloat(target.dataset.countup);
                        
                        console.log('Animating:', target.className, 'to value:', finalValue);
                        
                        try {
                            // CountUp v1.9.3 API: new CountUp(target, startVal, endVal, decimals, duration, options)
                            const originalText = target.textContent;
                            const suffix = originalText.replace(/[\d.]/g, ''); // Extract non-numeric parts like "+"
                            const decimals = finalValue % 1 !== 0 ? 1 : 0;
                            const countUp = new CountUp(target, 0, finalValue, decimals, 2.5);
                            
                            if (!countUp.error) {
                                countUp.start(() => {
                                    // Add suffix back after animation
                                    if (suffix) {
                                        target.textContent = finalValue + suffix;
                                    }
                                    console.log('Animation completed for:', finalValue + suffix);
                                });
                            } else {
                                console.error('CountUp error:', countUp.error);
                                target.textContent = finalValue + suffix;
                            }
                        } catch (error) {
                            console.error('CountUp creation failed:', error);
                            const originalText = target.textContent;
                            const suffix = originalText.replace(/[\d.]/g, '');
                            target.textContent = finalValue + suffix;
                        }
                        
                        observer.unobserve(target);
                    }
                });
            }, { threshold: 0.1 });
            
            counters.forEach(counter => {
                observer.observe(counter);
            });
            
        } else {
            if (typeof window.CountUp === 'undefined') {
                console.error('CountUp library NOT loaded! Check CDN link.');
            }
            if (counters.length === 0) {
                console.warn('No elements with [data-countup] attribute found on this page.');
            }
            
            // 폴백: 직접 값 설정
            counters.forEach(counter => {
                const value = parseFloat(counter.dataset.countup);
                const originalText = counter.textContent;
                const suffix = originalText.replace(/[\d.]/g, '');
                counter.textContent = value + suffix;
                console.log('Fallback set:', value + suffix);
            });
        }
    }, 300); // 더 오래 기다리기
}

// ===== CHART INITIALIZATION =====
function initializeCharts() {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js library not loaded');
        return;
    }
    
    console.log('Chart.js library found! Initializing charts...');
    
    // Chart.js global configuration
    Chart.defaults.font.family = "'Noto Sans KR', 'Inter', sans-serif";
    Chart.defaults.color = '#666666';
    Chart.defaults.plugins.legend.display = false;
    
    // Initialize specific charts based on page
    initializeHeroChart();
    initializeRegionalChart();
    initializeRTDChart();
    initializeAgeChart();
    initializeForecastChart();
    
    console.log('Charts initialization completed. Active charts:', Object.keys(charts));
}

// ===== INDIVIDUAL CHART FUNCTIONS =====
function initializeHeroChart() {
    const ctx = document.getElementById('hero-trend-chart');
    if (!ctx) return;
    
    charts.heroChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2021', '2022', '2023', '2024', '2025E'],
            datasets: [{
                label: '시장 규모 (조원)',
                data: [1.8, 2.3, 2.9, 3.7, 4.6],
                borderColor: '#42886B',
                backgroundColor: 'rgba(66, 136, 107, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#42886B',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#666666' }
                },
                y: {
                    grid: { 
                        color: 'rgba(0,0,0,0.05)',
                        drawBorder: false
                    },
                    ticks: { 
                        color: '#666666',
                        callback: function(value) {
                            return value + '조원';
                        }
                    }
                }
            },
            elements: {
                point: {
                    hoverRadius: 8
                }
            }
        }
    });
}

function initializeRegionalChart() {
    const ctx = document.getElementById('section1-regional-chart');
    if (!ctx) return;
    
    charts.regionalChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['서울/경기', '부산/경남', '대구/경북', '광주/전남', '대전/충청', '강원', '제주'],
            datasets: [{
                label: '성장률 (%)',
                data: [45, 38, 32, 41, 35, 28, 52],
                backgroundColor: '#42886B',
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    max: 60,
                    grid: { 
                        color: 'rgba(0,0,0,0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function initializeRTDChart() {
    const ctx = document.getElementById('section2-rtd-chart');
    if (!ctx) return;
    
    charts.rtdChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2022 Q1', '2022 Q2', '2022 Q3', '2022 Q4', '2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2', '2024 Q3'],
            datasets: [{
                label: 'RTD 차 음료 (억원)',
                data: [1200, 1350, 1500, 1650, 1800, 2100, 2400, 2650, 2900, 3200, 3500],
                borderColor: '#7FB069',
                backgroundColor: 'rgba(127, 176, 105, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#7FB069',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    grid: { 
                        color: 'rgba(0,0,0,0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '억원';
                        }
                    }
                }
            }
        }
    });
}

function initializeAgeChart() {
    const ctx = document.getElementById('section3-age-chart');
    if (!ctx) return;
    
    charts.ageChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['20-30대', '30-40대', '40-50대', '50대 이상'],
            datasets: [{
                data: [42, 31, 18, 9],
                backgroundColor: [
                    '#42886B',
                    '#7FB069',
                    '#B8D4C7',
                    'rgba(108, 117, 125, 0.7)'
                ],
                borderWidth: 0,
                cutout: '60%'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function initializeForecastChart() {
    const ctx = document.getElementById('section4-forecast-chart');
    if (!ctx) return;
    
    charts.forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4'],
            datasets: [{
                label: '시장 규모 (조원)',
                data: [2.1, 2.3, 2.5, 2.8, 3.0, 3.1, 3.2, 3.2],
                borderColor: '#42886B',
                backgroundColor: 'rgba(66, 136, 107, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#42886B',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#666666' }
                },
                y: {
                    beginAtZero: false,
                    min: 2.0,
                    max: 3.5,
                    grid: { 
                        color: 'rgba(0,0,0,0.05)',
                        drawBorder: false
                    },
                    ticks: { 
                        color: '#666666',
                        callback: function(value) {
                            return value + '조원';
                        }
                    }
                }
            },
            elements: {
                point: {
                    hoverRadius: 8
                }
            }
        }
    });
}

// ===== SMOOTH SCROLL =====
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ACTIVE NAVIGATION =====
function initializeActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current nav link
                const activeLink = document.querySelector(`.nav__link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -70% 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', throttle(function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
}, 16));

// ===== PAGE SPECIFIC FUNCTIONALITY =====
function initializePageSpecific() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index':
            // Main dashboard specific code
            break;
        case 'market-overview':
            // Market overview specific code
            break;
        case 'rtd-trends':
            // RTD trends specific code
            break;
        case 'consumer-analysis':
            // Consumer analysis specific code
            break;
        case 'forecast-2025':
            // Forecast specific code
            break;
        case 'expert-insights':
            // Expert insights specific code
            break;
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    return page || 'index';
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeAOS,
        initializeCounters,
        initializeCharts,
        initializeSmoothScroll,
        charts,
        counters
    };
}