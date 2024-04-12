// preloader
const hideLoader = () => {
    setTimeout(() => {
        let preloaderEl = document.querySelector('.preloader-wrap');
        preloaderEl.classList.add('hidden');
        preloaderEl.classList.remove('visible');
    }, 500)
}

document.addEventListener('DOMContentLoaded', hideLoader);

let time = 2,
    cc = 1;

window.onload = () => {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentEntry = entry.target
                currentEntry.classList.add("viz");
                let i = 1,
                    num = currentEntry.dataset.num,
                    step = 1000 * time / num,
                    that = currentEntry,
                    int = setInterval(function() {
                        if (i <= num) {
                            that.innerHTML = i;
                        } else {
                            cc = cc + 2;
                            clearInterval(int);
                        }
                        i++;
                    }, step);
                observer.unobserve(currentEntry)
            }
        })
    }, options)

    const arr = document.querySelectorAll('.number-counter')
    arr.forEach(i => {
        observer.observe(i)
    })

    // scroll to id menu

    $('.go-to-id[href*="#"]').on('click', function (e) {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 128
        }, 500, 'linear');
    });

    // fixed  header

    const header = document.querySelector('.header');
    const NavTop = $(header).offset().top + 87;

    $(window).scroll(function(){
        if( $(window).scrollTop() > NavTop ) {
            header.classList.add("fixed");
        } else {
            header.classList.remove("fixed");
        }
    });

    function setActiveAnchor() {
        const links = document.querySelectorAll('.header-menu-item-link');

        links.forEach(function(link) {
            const sectionId = link.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            const bounding = section.getBoundingClientRect();

            if (
                bounding.top <= 150 &&
                bounding.bottom >= 50
            ) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', setActiveAnchor);

    document.addEventListener('scroll', setActiveAnchor);

    // go to top

    $(window).scroll(function() {
        const footer = document.querySelector('.footer').getBoundingClientRect();

        if ($(this).scrollTop() > $(this).height() && footer.bottom > 800) {
            $('.top').addClass('active');
        } else {
            $('.top').removeClass('active');
        }
    });
    $('.top').click(function () {
        $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
    });

    // popup

    $('.open-popup-link').magnificPopup({
        type:'inline',
        showCloseBtn: false,
        callbacks: {
            open: function() {
                $('.close-btn, .popup-close-button').on('click',function(event){
                    event.preventDefault();
                    $.magnificPopup.close();
                });
            }
        }
    });


}
