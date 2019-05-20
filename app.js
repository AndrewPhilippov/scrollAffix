const InitAffix = () => {
    let el = document.getElementById('priceScrollSpy');
    let elHeight = el.getBoundingClientRect().height;
    let elTop = el.getBoundingClientRect().top;
    let elBottom = el.getBoundingClientRect().bottom;
    let footer = document.getElementsByTagName('footer');
    let footerHeight = footer[0].offsetHeight;
    let isScrolling;
    let beforeFooter = footer[0].offsetTop;

        // Listen for scroll events
        window.addEventListener('scroll', function ( e ) {
            let winHeight = window.innerHeight;
            let winY = window.scrollY;
            let docHeight = document.body.scrollHeight;
            let stopBottom = elBottom + winY + 40;

            // Clear our timeout throughout the scroll
            window.clearTimeout( isScrolling );

            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(function() {

                // Run the callback
                console.log('/--------------------/');
                console.log('window.innerHeight: ', winHeight);
                console.log('window.scrollY: ', winY);
                console.log('elBottom: ', elBottom);
                console.log('StopBottom - elBottom + winY: ', stopBottom); // To get the point to stop before footer *** 40px - for margin
                console.log('beforeFooter: ', footer[0].offsetTop);
                console.log('DocHeight: ', docHeight);
                console.log('footerHeight: ', footer[0].getBoundingClientRect().height);
                console.log('el.offsetTop: ', el.offsetTop);
                console.log('/--------------------/');

                if(winHeight >= elBottom){
                    if(stopBottom >= footer[0].offsetTop){
                        console.log('Lower');
                        el.classList.add('stopBottom');
                        el.style.marginTop = '1350px';
                    } else {
                        el.classList.remove('stopBottom');
                        el.style.marginTop = 'initial';
                        console.log('Higher')
                    }
                } else {
                    let isTopVisible = elTop > 15;
                    let isBottomVisible = elBottom > winY + elBottom;
                    let isUnderFooter = beforeFooter;

                    if(isTopVisible){
                        el.style.position = 'fixed';
                        el.style.top = '150px'
                    } else if (!isTopVisible && isBottomVisible){
                        el.style.position = 'fixed';
                        el.style.bottom = '15px'
                    }


                    // el.classList.remove('aff');
                    // if(el.classList.contains('scroll-up')){
                    //     el.style.position = 'absolute';
                    //     el.style.top = winY + 'px';
                    // } else {
                    //     el.style.position = 'fixed';
                    //     el.style.bottom = '0';
                    // }
                }
            }, 0);
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
