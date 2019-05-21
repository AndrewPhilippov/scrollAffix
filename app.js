const InitAffix = () => {
    let el = document.getElementById('priceScrollSpy');
    let elHeight = el.getBoundingClientRect().height;
    let elTop = el.getBoundingClientRect().top;
    let elBottom = el.getBoundingClientRect().bottom;
    let footer = document.getElementsByTagName('footer');
    let footerHeight = footer[0].offsetHeight;
    let beforeFooter = footer[0].offsetTop;
    let lastScrollTop = 0;
    let isScrolling;
    let top = 0;

    // Listen for scroll events
    window.addEventListener('scroll', function ( e ) {
        let winHeight = window.innerHeight;
        let winY = window.scrollY;
        let docHeight = document.body.scrollHeight;
        let stopBottom = elBottom + winY + 40;
            // Run the callback
            // console.log('/--------------------/');
            // console.log('window.innerHeight: ', winHeight);
            // console.log('window.scrollY: ', winY);
            // console.log('elTop: ', elTop);
            // console.log('elBottom: ', elBottom);
            // console.log('winY + winHeight: ', winHeight + winY);
            // console.log('StopBottom - elBottom + winY: ', stopBottom); // To get the point to stop before footer *** 40px - for margin
            // console.log('beforeFooter: ', footer[0].offsetTop);
            // console.log('DocHeight: ', docHeight);
            // console.log('footerHeight: ', footer[0].getBoundingClientRect().height);
            // console.log('el.offsetTop: ', el.offsetTop);
            // console.log('/--------------------/');

            let isBottomVisible = (winHeight + winY) > elBottom;
            let isUnderFooter = elBottom + winY > docHeight - footerHeight;

            // IF SCROLL DOWN
            if(winY > lastScrollTop){
                console.log('scroll down');
                if(isBottomVisible){
                    el.style.position = 'fixed';
                    el.style.bottom = '0';
                    if(isUnderFooter){
                        el.style.position = 'absolute';
                        el.style.bottom = 'initial';
                        el.style.top = '1450px';
                    } else {
                        el.style.position = 'fixed';
                        el.style.bottom = '0';
                    }
                } else {
                    el.style.position = 'absolute';
                    el.style.top = 'initial';
                    el.style.bottom = 'initial';

                }
            //    IF SCROLL UP
            } else {
                console.log('scroll up');
                console.log('getBoundingClientRect', el.getBoundingClientRect().top);
                console.log('---------', $("#priceScrollSpy").offset().top);

                if(el.getBoundingClientRect().top >= 118){
                    console.log('fixed');
                    el.style.position = 'fixed';
                    el.style.top = elTop + 'px';
                } else {
                    if (el.style.position != 'absolute') {
                        console.log('absolute');
                        console.log('-->>>--', $("#priceScrollSpy").offset().top);
                        el.style.top = Math.round($("#priceScrollSpy").offset().top, 0) + 'px';
                        console.log('-->>22>--', el.style.top);
                        el.style.position = 'absolute';
                    }
                }
            }
            lastScrollTop = winY;
        top = winY + 'px';
    }, false);

//     $("#priceScrollSpy").affix({
//         offset: {
//             top: 100,
//             bottom: $("footer").outerHeight(true)
//         }
//     });
// };
//
// $(window).on('resize orientationchange', function () {
//     if ($(this).width() < 1320) {
//         $(window).off('.affix');
//         $("#priceScrollSpy")
//             .removeClass("affix affix-top affix-bottom")
//             .removeData("bs.affix");
//     } else {
//         InitAffix();
//     }
// });
};


$(document).ready(function(){
    if ($(window).innerWidth() >= 1320) {
        InitAffix();
    }
});
