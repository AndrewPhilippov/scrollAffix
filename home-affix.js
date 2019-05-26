const Affix = {
  lastScrollTop: 0,
  /********/
  // METHODS
  /********/
  getCoords: function(elem) {
    let box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    }
  },
  scroll: function () {
  // Listen for scroll events
  // Listen for scroll events
  window.addEventListener('scroll', function (e) {

      /********/
      // ELEMENT
      /********/
      let el =  document.querySelector('aside');
      let elWindowDimensions = el.getBoundingClientRect();
      let elHeight = elWindowDimensions.height || el.offsetHeight;
      let elWinTop = elWindowDimensions.top;
      let elWinBottom = elWindowDimensions.bottom;
      let elDocTop = Affix.getCoords(el).top;
      let elDocBottom = Affix.getCoords(el).top + elHeight;
      let isElAbsolute = el.style.position === 'absolute';
      let isElFixed = el.style.position === 'fixed';
      let isElInitial = el.style.position === 'initial';
      /********/
      // FOOTER
      /********/
      let footer = document.querySelector('footer');
      let footerWindowDimensions = footer.getBoundingClientRect();
      let footerHeight = footerWindowDimensions.height || footer.offsetHeight;
      let footerWinElTop = footerWindowDimensions.top;
      let footerWinBottom = footerWindowDimensions.bottom;
      let footerDocTop = Affix.getCoords(footer).top;
      let footerDocBottom = Affix.getCoords(footer).top + footerHeight;
      /********/
      // HELPERS
      /********/
      let winY = window.scrollY;
      let winHeight = window.innerHeight;
      let winBottom = winY + winHeight;
      let body = document.body,
        html = document.documentElement;
      let docHeight = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
      let isElBottomVisible = winBottom - elDocBottom >= 0;
      let isElTopVisible = elWinTop >= 0;
      let headerHeight = document.querySelector('header').getBoundingClientRect().height;
      let footerMTopString = window.getComputedStyle(footer).marginTop;
      let numPattern = /\d+/g;
      let footerMTop = +footerMTopString.match(numPattern);
      let isElUnderBreakPoint = footerDocTop < elDocBottom + footerMTop;
      let isUnderTopBreakPoint;
      if(isElFixed){
        isElUnderTopBreakPoint = elDocTop < headerHeight;
      } else if(!isElAbsolute && !isElFixed){
        isElUnderTopBreakPoint = headerHeight + winY < elWinTop + winY;
      }

      if(winY > this.lastScrollTop){ // IF SCROLL DOWN
        if (isElTopVisible && isElBottomVisible && winHeight > elHeight){
          el.style.top = headerHeight + 'px';
          el.style.position = 'fixed';
        } else if(isElBottomVisible && !isElAbsolute){
          if(isElAbsolute){
            el.style.top = 'initial';
            el.style.bottom = '0px';
            el.style.position = 'fixed';
          }
          if(!isElFixed){
            el.style.bottom = '0px';
            el.style.position = 'fixed';
            }
        }
        if(isElUnderBreakPoint){
          if(!isElAbsolute){
            el.style.top = footerDocTop - elHeight - headerHeight - footerMTop + 'px';
            el.style.position = 'absolute';
          }
        }
      } else { //    IF SCROLL UP
        if (isElUnderTopBreakPoint) {
          el.style.position = 'initial';
          el.style.top = 'initial';
        }
        if(isElAbsolute && isElTopVisible){
          el.style.top = '0px';
          el.style.position = 'fixed';
          console.log('----------1111');
        }
        if (isElFixed && !isElTopVisible) {
          el.style.top = elWinTop + winY + 'px';
          el.style.position = 'absolute';
          console.log('----------2222')
        }
      }
    this.lastScrollTop = winY;
    });
  }
};

document.addEventListener('DOMContentLoaded', Affix.scroll);
