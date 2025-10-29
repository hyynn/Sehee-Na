// 탭 전환 함수
function showTab(tabName) {
    // 모든 탭 버튼에서 active 클래스 제거
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    // 모든 탭 컨텐츠 숨기기
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // 모든 사이드바 숨기기
    document.querySelectorAll('.sidebar-content').forEach(sidebar => {
        sidebar.classList.remove('active');
    });

    // 클릭된 탭 버튼에 active 클래스 추가
    event.target.classList.add('active');

    // 해당 탭 컨텐츠 보이기
    document.getElementById(tabName + '-tab').classList.add('active');

    // 해당 사이드바 보이기
    document.getElementById(tabName + '-sidebar').classList.add('active');

    // 탭 전환 시 인터랙티브 기능 초기화
    setTimeout(() => {
        if (tabName === 'main' || tabName === 'sub1' || tabName === 'sub2') {
            initSectionNavigation(tabName);
        } else if (tabName === 'mobile') {
            initMobileNavigation();
        }
    }, 100);
}

// Section Navigation (Main, Sub1, Sub2 탭용)
function initSectionNavigation(tabName) {
    const sidebar = document.getElementById(`${tabName}-sidebar`);
    const sectionCards = sidebar.querySelectorAll('.section-card[data-section]');

    if (!sidebar || sectionCards.length === 0) return;

    // 사이드바 카드 클릭 이벤트
    sectionCards.forEach(card => {
        card.addEventListener('click', function () {
            // Active 클래스 전환
            sectionCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Mobile Navigation
function initMobileNavigation() {
    const mobileItems = document.querySelectorAll('.mobile-preview-item');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sectionCards = mobileSidebar.querySelectorAll('.section-card[data-section]');

    if (mobileItems.length === 0) return;

    // 사이드바 카드 호버 시 해당 이미지 활성화
    sectionCards.forEach(card => {
        card.addEventListener('mouseenter', function () {  // click → mouseenter
            const sectionName = this.getAttribute('data-section');
            const targetItem = document.querySelector(`.mobile-preview-item[data-section="${sectionName}"]`);

            if (targetItem) {
                mobileItems.forEach(item => item.classList.remove('active'));
                targetItem.classList.add('active');
                sectionCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 모바일 이미지 호버 시
    mobileItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function () {  // click → mouseenter
            mobileItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            sectionCards.forEach(c => c.classList.remove('active'));
            if (sectionCards[index]) {
                sectionCards[index].classList.add('active');
            }
        });
    });
}

// Document Ready
$(document).ready(function () {
    // Resolution Notice - 4초 후 페이드아웃
    setTimeout(function () {
        $('.resolution-notice').addClass('fade-out');
    }, 4000);

    // 모바일 프리뷰 아이템 호버 시 active 클래스 토글
    $('.mobile-preview-item').hover(
        function () {
            $('.mobile-preview-item').removeClass('active');
            $(this).addClass('active');
        }
    );

    // Footer 로드
    $('footer').load('include/footer.html', function () {
        initFooterEvents();
    });
});

// Scroll Top Button
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Window Scroll Event
$(window).scroll(function () {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const documentHeight = $(document).height();

    // Scroll Top Button
    if (scrollTopBtn) {
        if (scrollTop > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }

    // Footer iframe 처리
    if (scrollTop + windowHeight >= documentHeight - 10) {
        $('footer iframe').addClass('active');
        // contact-bubble은 여기서 제거
    } else {
        $('footer iframe').removeClass('active');
        $('.contact-bubble').removeClass('show');
        $('.contact-bubble').text('Drag me!');
    }
});

// Footer Events
function initFooterEvents() {
    let iframeActive = false;

    $('footer iframe').on('mouseenter', function () {
        iframeActive = true;
    }).on('mouseleave', function () {
        if (iframeActive && document.activeElement.tagName === 'IFRAME') {
            document.activeElement.blur();
            $('body').focus();
        }
        iframeActive = false;
    });
}

// Window Blur Event (iframe focus 감지)
$(window).on('blur', function () {
    if (document.activeElement.tagName === 'IFRAME') {
        const $bubble = $('.contact-bubble');
        if ($bubble.hasClass('show') && $bubble.text() === 'Drag me!') {
            $bubble.text('Contact me!');
        }
    }
});

// URL 해시로 특정 섹션으로 이동 (GSAP ScrollSmoother 대응)
$(document).ready(function () {
    // 페이지 로드 시 해시가 있으면 해당 위치로 스크롤
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = $(targetId);

        if (targetElement.length) {
            setTimeout(function () {
                const targetPosition = targetElement.offset().top;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 500); // ScrollSmoother 초기화를 기다림
        }
    }

    // ... 기존 코드
});