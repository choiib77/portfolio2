// 페이지 새로고침 시 최상단으로 스크롤 이동
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
// 로딩시 텍스트 효과
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.querySelector(".overlay");
    const index_wrapper = document.querySelector("#index_wrapper");
    const textElements = document.querySelectorAll(".sec01_tit em:first-child span");
    const sec01_tit = document.querySelector(".sec01_tit");
    const sec01_h1 = document.querySelector(".section1 h1");
    // 첫화면 애니메이션
    var header_line = document.querySelector('header .line_w');
    header_line.style.width = "100%";
    // overlay.addEventListener("animationend", function () {
    //     overlay.style.display = "block"; 
    //     index_wrapper.style.opacity = "0"; 
    //     document.body.classList.add("overlay-active");
    // });
    disableScroll(); // 스크롤 비활성화
    // 스크롤 휠 막기 
    document.body.addEventListener('wheel', preventScroll, { passive: false });
    // pc너비일 때 텍스트 위치 변경
    const screenWidth = window.innerWidth || document.documentElement.clientWidth;
    if (screenWidth >= 991) {
        sec01_h1.style.transform = "translateY(-20%)";
    }

    // overlay 사라짐
    setTimeout(function () {
        overlay.style.animation = "none"; 
        sec01_tit.style.animation = "none";
        overlay.style.display = "none"; 
        index_wrapper.style.opacity = "1"; 
        sec01_h1.style.transform = "translateY(0)";
        sec01_h1.style.pointerEvents = "all";
        sec01_h1.classList.add('active');
        document.body.classList.remove("overlay-active"); 
        enableScroll(); // 스크롤 활성화
    }, 3500); 
    // 텍스트 애니메이션
    textElements.forEach((textElement, index) => {
        setTimeout(function () {
            textElement.style.animation = "none"; 
            textElement.style.opacity = "1"; 
        }, index * 150); 
    });
});

// 스크롤 휠 이벤트를 막음
function preventScroll(event) {
    event.preventDefault();
}

// 스크롤 비활성화
function disableScroll() {
    // 현재 스크롤 위치 저장
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // 스크롤 위치 고정
    document.body.style.overflow = "hidden";
    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

// 스크롤 활성화
function enableScroll() {
    document.body.style.overflow = "auto";
    window.onscroll = function () {};
    document.body.removeEventListener('wheel', preventScroll);
}

// 커서포인트
const cursorPointed = document.querySelector('.cursor');
var sec03_a = document.querySelectorAll('.sec03_cont_box');
const moveCursor = (e)=> {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    cursorPointed.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
}
window.addEventListener('mousemove', moveCursor);
$.each(sec03_a, function(i, item){
    item.addEventListener('mouseenter', function(e){
        cursorPointed.classList.add('active');
    });
    item.addEventListener('mouseleave', function(){
        cursorPointed.classList.remove('active');
    });
});
// 메인 애니메이션 
var lastScrollPos = window.pageYOffset;
window.addEventListener('scroll', function() {
    var scrollY =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var innerHeight = window.innerHeight;
    var scrollHeight = document.body.offsetHeight;
    var sec01 = document.querySelector('.section1').offsetTop;
    var sec02 = document.querySelector('.section2').offsetTop - 500;
    var sec03 = document.querySelector('.section3').offsetTop - 500;
    var sec04 = document.querySelector('.section4').offsetTop - 500;
    var footer = document.querySelector('.footer').offsetTop - 800;
    var sec03_cont_box = document.querySelectorAll('.sec03_cont_box');
    var topButton = document.getElementById('topButton');
    var currentScrollPos = window.pageYOffset;
    // 영역마다 애니메이션 클래스 추가
    if(scrollY >= sec01){
        document.querySelector('.section1').classList.add("ani");
    }else{
        document.querySelector('.section1').classList.remove("ani");
    }
    if(scrollY >= sec02){
        document.querySelector('.section2').classList.add("ani");
    }else{
        document.querySelector('.section2').classList.remove("ani");
    }
    if(scrollY >= sec03){
        document.querySelector('.section3').classList.add("ani");
    }else{
        document.querySelector('.section3').classList.remove("ani");
    }
    if(scrollY >= sec04){
        document.querySelector('.section3').classList.remove("ani");
        document.querySelector('.section4').classList.add("ani");
    }else{
        document.querySelector('.section4').classList.remove("ani");
    }
    if(scrollY >= footer){
        document.querySelector('.footer').classList.add("ani");
    }else{
        document.querySelector('.footer').classList.remove("ani");
    }
    
    // 각박스마다 클래스 추가
    sec03_cont_box.forEach(function(box, index) {
        var boxTop = box.getBoundingClientRect().top + scrollY;
        var boxHeight = box.clientHeight;
    
        if (scrollY >= boxTop - 600 && scrollY <= boxTop + boxHeight) {
            box.classList.add('ani');
        }else{
            box.classList.remove('ani');
        }
    });
    // 탑버튼 스크롤에 따른 효과
    if (currentScrollPos > lastScrollPos) { // 마우스 휠 내리면 버튼 숨기기
        topButton.style.bottom = '-10rem';
      } else { // 마우스 휠 올리면 버튼 보이기
        topButton.style.bottom = '0';
    }

    lastScrollPos = currentScrollPos;
})

// 타이핑 효과 
const $text = document.querySelector(".typing");

// 줄바꿈
const letters = [
    "Let’s \n work \n together"
];

// 글자 입력 속도
const speed = 100;
let i = 0;

// 줄바꿈을 위한 <br> 치환
const changeLineBreak = (letter) => {
    return letter.map(text => text === "\n" ? "<br>" : text);
}

// ** 타이핑 효과
const typing = async () => {  
    const letter = changeLineBreak(letters[i].split(""));
    
    while (letter.length) {
        await wait(speed);
        $text.innerHTML += letter.shift(); 
    }
    
    // 잠시 대기
    await wait(800);
    
    // 지우는 효과
    remove();
}

// 글자 지우는 효과
const remove = async () => {
    const letter = changeLineBreak(letters[i].split(""));
    
    while (letter.length) {
        await wait(speed);
        
        letter.pop();
        $text.innerHTML = letter.join(""); 
    }
    
    // 타이핑 함수 다시 실행
    i = !letters[i+1] ? 0 : i + 1;
    typing();
}

// 딜레이 기능
function wait(ms) {
  return new Promise(res => setTimeout(res, ms))
}

// 초기 실행
setTimeout(typing, 1500);

// 타이핑 효과 **//

// 이메일 복사
function copyFuc(val){
    var add = document.createElement('textarea');
    document.body.appendChild(add); 
    add.value = val;
    add.select();
    document.execCommand('copy'); 
    document.body.removeChild(add);
}
$(".copy").click(function(){ 
    var addCopy = $(this).text(); 
    copyFuc(addCopy); 
    alert('이메일이 복사되었습니다.'); 
});

const copy = document.querySelector('.copy');
const sec04_right_p = document.querySelector('.sec04_right > p');
const sec04_right_a = document.querySelector('.sec04_right a');
copy.addEventListener('mouseenter',function(){
    sec04_right_p.style.opacity = '.5';
    sec04_right_a.style.opacity = '.5';
});

copy.addEventListener('mouseleave',function(){
    sec04_right_p.style.opacity = '1';
    sec04_right_a.style.opacity = '1';
});


// 탑버튼 클릭시 최상단 이동
topButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


