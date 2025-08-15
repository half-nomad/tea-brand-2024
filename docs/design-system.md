# 🎨 Tea Brand 디자인 시스템 가이드

> **데이터 시각화를 위한 모던 기하학적 디자인 시스템**

## 🚨 **Claude 작업 시 필수 준수 사항**
**모든 디자인 관련 작업은 반드시 이 문서를 먼저 확인하고 진행할 것!**

### 📋 디자인 시스템 사용 지침
1. **색상**: 지정된 CSS 변수만 사용 (임의 색상 금지)
2. **타이포그래피**: Pretendard 폰트와 정의된 클래스 활용
3. **간격**: 정의된 spacing 시스템 준수
4. **컴포넌트**: 기존 컴포넌트 패턴 재사용 우선

---

## 🎨 컬러 시스템 (이미지 기반 팔레트)

### **메인 컬러 팔레트**
```css
:root {
    /* Primary Colors (핑크 계열) */
    --primary-coral: #E5485F;      /* 선명한 산호색 - 메인 브랜드 */
    --primary-pink: #F7A5C7;       /* 소프트 핑크 - 강조색 */
    --primary-light-pink: #FADDE1; /* 연한 핑크 - 배경/보조 */
    
    /* Secondary Colors (블루 계열) */
    --secondary-aqua: #A8E6CF;     /* 아쿠아 민트 - 보조 브랜드 */
    --secondary-sky: #B8E0D2;      /* 스카이 블루 - 섹션 구분 */
    --secondary-light-blue: #E8F4F8; /* 연한 블루 - 카드 배경 */
    
    /* Accent Colors (강조색) */
    --accent-deep-red: #A2142F;    /* 깊은 레드 - CTA, 중요 요소 */
    --accent-burgundy: #7D1935;    /* 버건디 - 헤딩, 강조 텍스트 */
    
    /* Neutral Colors */
    --white: #FFFFFF;              /* 순백 */
    --light-gray: #F8F9FA;         /* 밝은 회색 - 배경 */
    --text-dark: #2D3748;          /* 다크 텍스트 */
    --text-medium: #4A5568;        /* 중간 텍스트 */
    --text-light: #718096;         /* 연한 텍스트 */
}
```

### **그라데이션 시스템**
```css
/* 메인 헤로 그라데이션 */
.gradient-hero {
    background: linear-gradient(135deg, 
        var(--primary-coral) 0%, 
        var(--primary-pink) 50%, 
        var(--secondary-aqua) 100%);
}

/* 카드 그라데이션 */
.gradient-card {
    background: linear-gradient(145deg, 
        var(--white) 0%, 
        var(--secondary-light-blue) 100%);
}

/* CTA 버튼 그라데이션 */
.gradient-cta {
    background: linear-gradient(90deg, 
        var(--accent-deep-red) 0%, 
        var(--primary-coral) 100%);
}

/* 텍스트 그라데이션 */
.gradient-text {
    background: linear-gradient(135deg, 
        var(--accent-deep-red) 0%, 
        var(--primary-coral) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

---

## ✍️ 타이포그래피 시스템

### **폰트 설정**
```css
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-feature-settings: "tnum", "ss01", "ss02";
}
```

### **텍스트 계층 구조**
```css
/* 메인 타이틀 */
.hero-title {
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
}

/* 섹션 제목 */
.section-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin-bottom: 2rem;
}

/* 카드 제목 */
.card-title {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 1rem;
    color: var(--text-dark);
}

/* 통계 숫자 */
.stat-number {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 800;
    line-height: 1;
    color: var(--accent-deep-red);
}

/* 본문 텍스트 */
.body-text {
    font-size: clamp(1rem, 2.5vw, 1.125rem);
    font-weight: 400;
    line-height: 1.7;
    color: var(--text-medium);
}

/* 캡션 텍스트 */
.caption {
    font-size: clamp(0.875rem, 2vw, 0.95rem);
    font-weight: 500;
    color: var(--text-light);
}
```

---

## 📐 레이아웃 시스템

### **컨테이너 및 그리드**
```css
/* 메인 컨테이너 */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

.container-wide {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
}

/* 섹션 간격 */
.section {
    padding: 5rem 0;
}

.section-hero {
    padding: 8rem 0 6rem 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

/* 그리드 시스템 */
.grid {
    display: grid;
    gap: 2rem;
}

.grid-2 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-3 {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.grid-4 {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

/* 플렉스 유틸리티 */
.flex {
    display: flex;
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
```

### **간격 시스템**
```css
:root {
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
    --spacing-xxl: 4rem;
    --spacing-xxxl: 6rem;
}

/* 간격 유틸리티 클래스 */
.mb-sm { margin-bottom: var(--spacing-sm); }
.mb-md { margin-bottom: var(--spacing-md); }
.mb-lg { margin-bottom: var(--spacing-lg); }
.mb-xl { margin-bottom: var(--spacing-xl); }

.py-lg { padding: var(--spacing-lg) 0; }
.py-xl { padding: var(--spacing-xl) 0; }
.py-xxl { padding: var(--spacing-xxl) 0; }
```

---

## 🧩 컴포넌트 라이브러리

### **1. Header 컴포넌트**
```css
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(229, 72, 95, 0.1);
    z-index: 1000;
    transition: all 0.3s ease;
}

.header.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.nav-menu {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-link {
    color: var(--text-dark);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
}

.nav-link:hover {
    color: var(--primary-coral);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-cta);
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}
```

### **2. 카드 컴포넌트**
```css
.card {
    background: var(--white);
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: 0 4px 30px rgba(229, 72, 95, 0.08);
    border: 1px solid rgba(229, 72, 95, 0.1);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-cta);
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 50px rgba(229, 72, 95, 0.15);
    border-color: var(--primary-coral);
}

.card-icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: var(--gradient-card);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease;
}

.card:hover .card-icon {
    transform: scale(1.1) rotate(5deg);
}
```

### **3. CTA 버튼**
```css
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2.5rem;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.btn-primary {
    background: var(--gradient-cta);
    color: white;
    box-shadow: 0 4px 20px rgba(229, 72, 95, 0.3);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(229, 72, 95, 0.4);
}

.btn-secondary {
    background: transparent;
    color: var(--primary-coral);
    border: 2px solid var(--primary-coral);
}

.btn-secondary:hover {
    background: var(--primary-coral);
    color: white;
}

/* 버튼 리플 효과 */
.btn::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
}

.btn:active::after {
    width: 200px;
    height: 200px;
}
```

### **4. 통계 카드**
```css
.stat-card {
    text-align: center;
    padding: 2rem;
    background: var(--gradient-card);
    border-radius: 16px;
    border: 1px solid rgba(168, 230, 207, 0.3);
    transition: all 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(168, 230, 207, 0.2);
}

.stat-number {
    display: block;
    font-size: 3rem;
    font-weight: 800;
    color: var(--accent-deep-red);
    margin-bottom: 0.5rem;
}

.stat-label {
    font-size: 1rem;
    color: var(--text-medium);
    font-weight: 500;
}
```

---

## 🎭 애니메이션 시스템

### **기본 트랜지션**
```css
* {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### **스크롤 기반 애니메이션**
```css
.fade-in {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

.slide-in-left {
    opacity: 0;
    transform: translateX(-80px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-in-left.visible {
    opacity: 1;
    transform: translateX(0);
}

.scale-in {
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.scale-in.visible {
    opacity: 1;
    transform: scale(1);
}
```

### **카운터 애니메이션**
```css
@keyframes countUp {
    from { 
        transform: translateY(20px);
        opacity: 0;
    }
    to { 
        transform: translateY(0);
        opacity: 1;
    }
}

.stat-number.animate {
    animation: countUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
```

### **기하학적 패턴 애니메이션**
```css
.geometric-pattern {
    position: absolute;
    opacity: 0.1;
    z-index: -1;
}

.circle-pattern {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: var(--gradient-hero);
    animation: float 6s ease-in-out infinite;
}

.triangle-pattern {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 86.6px solid var(--primary-pink);
    animation: rotate 8s linear infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

@keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

---

## 📱 반응형 브레이크포인트

```css
/* Mobile First 접근 */
@media (min-width: 480px) {
    /* 큰 모바일 */
    .container { padding: 0 1.5rem; }
}

@media (min-width: 768px) {
    /* 태블릿 */
    .hero-title { font-size: 4rem; }
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
    /* 데스크톱 */
    .container { padding: 0 2rem; }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
    .section { padding: 6rem 0; }
}

@media (min-width: 1200px) {
    /* 큰 데스크톱 */
    .hero-title { font-size: 5rem; }
    .grid-4 { grid-template-columns: repeat(4, 1fr); }
}
```

---

## 🎯 특수 효과

### **글래스모피즘 효과**
```css
.glass-card {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### **그림자 시스템**
```css
.shadow-sm { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); }
.shadow-md { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); }
.shadow-lg { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15); }
.shadow-xl { box-shadow: 0 16px 64px rgba(0, 0, 0, 0.2); }

/* 컬러 그림자 */
.shadow-coral { box-shadow: 0 8px 32px rgba(229, 72, 95, 0.2); }
.shadow-aqua { box-shadow: 0 8px 32px rgba(168, 230, 207, 0.2); }
```

---

## 📋 사용 예시

```html
<!-- Hero Section 예시 -->
<section class="section-hero gradient-hero">
    <div class="container">
        <h1 class="hero-title gradient-text fade-in">
            2024 차 음료 소비 트렌드
        </h1>
        <p class="body-text fade-in">
            RTD 시장 혁신과 소비자 행동 변화 분석
        </p>
        <a href="#report" class="btn btn-primary fade-in">
            보고서 보기
        </a>
    </div>
</section>

<!-- 통계 섹션 예시 -->
<section class="section">
    <div class="container">
        <div class="grid grid-3">
            <div class="stat-card scale-in">
                <span class="stat-number" data-count="4159">0</span>
                <span class="stat-label">억원 시장규모</span>
            </div>
        </div>
    </div>
</section>
```

---

## 🔧 개발자를 위한 실용 가이드

### **Quick Reference - 자주 사용하는 클래스**
```css
/* 컨테이너 */
.container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

/* 간격 */
.mb-lg { margin-bottom: 2rem; }
.py-xl { padding: 3rem 0; }

/* 그리드 */
.grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }

/* 버튼 */
.btn-primary { background: var(--gradient-cta); color: white; padding: 1rem 2.5rem; border-radius: 50px; }

/* 텍스트 */
.section-title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; color: var(--accent-deep-red); }
```

### **색상 사용 예시**
```css
/* 메인 브랜드 색상 */
background: var(--primary-coral);      /* 메인 CTA, 강조 요소 */
color: var(--accent-deep-red);         /* 제목, 중요 텍스트 */
background: var(--secondary-aqua);     /* 보조 배경, 카드 악센트 */
border: 1px solid var(--primary-pink); /* 테두리, 구분선 */
```

### **반응형 패턴**
```css
/* 모바일 우선 */
.element {
    font-size: 1rem;           /* 모바일 기본 */
    padding: 1rem;
}

/* 태블릿 이상 */
@media (min-width: 768px) {
    .element {
        font-size: 1.125rem;    /* 태블릿 확대 */
        padding: 1.5rem;
    }
}

/* 데스크톱 이상 */
@media (min-width: 1024px) {
    .element {
        font-size: 1.25rem;     /* 데스크톱 최적화 */
        padding: 2rem;
    }
}
```

---

**🎨 디자인 원칙**: "일관성 > 창의성" - 기존 패턴 재사용 우선  
**⚡ 성능 우선**: GPU 가속 활용, 60FPS 애니메이션 유지  
**📱 모바일 First**: 320px부터 완벽 지원, 터치 친화적 설계  
**♿ 접근성**: WCAG 2.1 AA 준수, 키보드 네비게이션 지원
