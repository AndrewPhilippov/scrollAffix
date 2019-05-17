const InitAffix = () => {
    let el = document.getElementById('priceScrollSpy');
    let elHeight = el.getBoundingClientRect().height;
    let elTop = el.getBoundingClientRect().top;
    let elBottom = el.getBoundingClientRect().bottom;
    let footer = document.getElementsByTagName('footer');
    let footerDimensions = footer[0].getBoundingClientRect();
    let footerTop = footer[0].offsetTop;
    let footerHeight = footer[0].offsetHeight;
    let isScrolling;

        // Listen for scroll events
        window.addEventListener('scroll', function ( event ) {
            let winHeight = window.innerHeight;
            let winY = window.scrollY;
            window.clearTimeout( isScrolling );

            // Clear our timeout throughout the scroll
            window.clearTimeout( isScrolling );

            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(function() {

                // Run the callback
                console.log( 'Scrolling has stopped.' );
                if(winY+elHeight - elBottom > 15){
                    el.classList.add('aff');
                } else {
                    el.classList.remove('aff');
                    if(el.classList.contains('scroll-up')){
                        el.style.marginTop = + winY + 'px';
                    }
                }
                console.log('/------//------//------//------/');
                console.log(winHeight - (winY + winHeight));
                console.log('/------//------//------//------/');

            }, 66);

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
