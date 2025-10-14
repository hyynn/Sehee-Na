


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
}

$(document).ready(function () {
    // 헤더와 푸터 로드
    // $('header').load('include/header.html', function () {
    //     initMobileMenu();
    // })

    $('footer').load('include/footer.html', function () {

    });
})

const scrollTopBtn = document.getElementById('scrollTop');

scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 스크롤 이벤트 통합
$(window).scroll(function () {
    const scrollTop = $(window).scrollTop();

    // 스크롤 버튼 처리
    if (scrollTop > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});