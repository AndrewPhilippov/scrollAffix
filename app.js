import BaseSliderInit from "../lib/base-slider-init";

const InitAffix = {

    init: function () {

        let el = document.getElementById(this.priceScrollSpyId);
        this.startCoords = this.getCoords(el);
        el.style.position = 'relative';

        let block = document.querySelector('#detail-car');
        this.dealCarBlockBottom = this.getCoords(block).top + block.offsetHeight;

        window.addEventListener('scroll', function () {
            InitAffix.scroll();
        }, false);
        // window.addEventListener('resize', function () {
        //     InitAffix.scroll();
        // }, false);
    },

    priceScrollSpyId: 'priceScrollSpy',

    lastScrollTop: 0,

    startCoords: 0,

    dealCarBlockBottom: 0,

    getCoords: function (elem) {
        let box = elem.getBoundingClientRect();

        let body = document.body;
        let docEl = document.documentElement;

        let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        let clientTop = docEl.clientTop || body.clientTop || 0;
        let clientLeft = docEl.clientLeft || body.clientLeft || 0;

        let top = box.top + scrollTop - clientTop;
        let left = box.left + scrollLeft - clientLeft;

        return {
            top: parseInt(top),
            left: parseInt(left)
        };
    },

    getDocumentTop: function(el) {
        return this.getCoords(el).top;
    },

    getClientTop: function(el) {
        return el.getBoundingClientRect().top;
    },

    scrollHeight: function() {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    },

    setFixedTop: function (el) {
        if ('fixed' !== el.style.position) {
            el.style.position = 'fixed';
            el.style.top = this.startCoords.top + 'px';
            el.style.bottom = 'initial';
        }
    },

    setFixedBottom: function (el) {
        if ('fixed' !== el.style.position) {
            el.style.position = 'fixed';
            el.style.bottom = '0px';
            el.style.top = 'initial';
        }
    },

    fixedScroll: false,

    setAbsoluteTop: function(el) {
        if ('absolute' !== el.style.position) {
            el.style.top = this.getDocumentTop(el) + 'px';
            el.style.bottom = 'initial';
            el.style.position = 'absolute';
        }
    },

    checkVisibleBottom: function(el) {
        return ((window.innerHeight + window.scrollY) - (this.getDocumentTop(el) + el.offsetHeight)) > 0;
    },

    checkVisibleTop: function(el) {
        return el.getBoundingClientRect().top > 0;
    },

    catchBottom: function (el) {
        let elBottom = Math.abs(this.getDocumentTop(el) + el.offsetHeight - InitAffix.scrollHeight());
        let winBottom = Math.abs(parseInt(window.scrollY) + window.innerHeight - InitAffix.scrollHeight());

        return (elBottom - winBottom) > 0;
    },

    catchTop: function (el) {
        return  0 < this.getClientTop(el);
    },

    scroll: function () {

        let el = document.getElementById(this.priceScrollSpyId),
            winY = parseInt(window.scrollY);

        if (winY > InitAffix.lastScrollTop) {

            console.log('///////////');

            if ((winY + window.innerHeight) >= InitAffix.dealCarBlockBottom) {
                el.style.bottom = 'initial';
                el.style.top = (InitAffix.dealCarBlockBottom - el.offsetHeight -192) + 'px';
                el.style.position = 'absolute';
                InitAffix.fixedScroll = false;
            } else {

                if ((InitAffix.startCoords.top + el.offsetHeight) < window.innerHeight && false === InitAffix.fixedScroll) {
                    InitAffix.setFixedTop(el);
                    InitAffix.fixedScroll = true;
                } else
                    if (InitAffix.catchBottom(el) && false === InitAffix.fixedScroll) {
                    console.log('------2-----');
                    InitAffix.setFixedBottom(el);
                    InitAffix.fixedScroll = true;
                } else
                    if (false === InitAffix.checkVisibleBottom(el) && 'fixed' === el.style.position) {
                    console.log('------3-----');

                        el.style.top = InitAffix.getDocumentTop(el) + 'px';
                        el.style.bottom = 'initial';
                        el.style.position = 'absolute';
                        InitAffix.fixedScroll = false;
                }
            }

            console.log('InitAffix.checkVisibleBottom(el)', InitAffix.checkVisibleBottom(el));

        } else {

            if (winY === 0) {
                el.style.position = 'relative';
                el.style.top = 'initial';
                el.style.bottom = 'initial';
            } else {
                if (InitAffix.fixedScroll) {
                    InitAffix.setAbsoluteTop(el);
                    InitAffix.fixedScroll = false;
                } else if (InitAffix.catchTop(el)) {
                    InitAffix.setFixedTop(el);
                }
            }
        }

        InitAffix.lastScrollTop = winY;
    }
};

$(document).ready(function() {
    InitAffix.init();
});

//////
import BaseSliderInit from "../lib/base-slider-init";

const InitAffix = {

    init: function () {

        let el = document.getElementById(this.priceScrollSpyId);
        this.startCoords = this.getCoords(el);

        el.style.position = 'absolute';
        // el.style.top = this.startCoords.top + 'px';

        let block = document.querySelector('#detail-car');
        this.dealCarBlockBottom = this.getCoords(block).top + block.offsetHeight;

        window.addEventListener('scroll', function () {
            if(window.innerWidth > 1320){
                InitAffix.scroll();
            } else{
                el.style.position = 'initial';
            }

        }, false);
        window.addEventListener('resize', function () {
            if(window.innerWidth > 1320){
                InitAffix.scroll();
            } else{
                el.style.position = 'initial';
            }
        }, false);
    },

    priceScrollSpyId: 'priceScrollSpy',

    lastScrollTop: 0,

    startCoords: 0,

    dealCarBlockBottom: 0,

    getCoords: function (elem) {
        let box = elem.getBoundingClientRect();

        let body = document.body;
        let docEl = document.documentElement;

        let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        let clientTop = docEl.clientTop || body.clientTop || 0;
        let clientLeft = docEl.clientLeft || body.clientLeft || 0;

        let top = box.top + scrollTop - clientTop;
        let left = box.left + scrollLeft - clientLeft;

        return {
            top: parseInt(top),
            left: parseInt(left)
        };
    },

    getDocumentTop: function(el) {
        return this.getCoords(el).top;
    },

    getClientTop: function(el) {
        return el.getBoundingClientRect().top;
    },

    scrollHeight: function() {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    },

    setFixedTop: function (el) {
        if ('fixed' !== el.style.position) {
            el.style.position = 'fixed';
            el.style.top = this.startCoords.top + 'px';
            el.style.bottom = 'initial';
        }
    },

    setFixedBottom: function (el) {
        if ('fixed' !== el.style.position) {
            el.style.position = 'fixed';
            el.style.bottom = '0px';
            el.style.top = 'initial';
        }
    },

    fixedScroll: false,

    setAbsoluteTop: function(el) {
        if ('absolute' !== el.style.position) {
            el.style.top = this.getDocumentTop(el) + 'px';
            el.style.bottom = 'initial';
            el.style.position = 'absolute';
        }
    },

    checkVisibleBottom: function(el) {
        return ((window.innerHeight + window.scrollY) - (this.getDocumentTop(el) + el.offsetHeight)) > 0;
    },

    checkVisibleTop: function(el) {
        return el.getBoundingClientRect().top > 0;
    },

    catchBottom: function (el) {
        let elBottom = Math.abs(this.getDocumentTop(el) + el.offsetHeight - InitAffix.scrollHeight());
        let winBottom = Math.abs(parseInt(window.scrollY) + window.innerHeight - InitAffix.scrollHeight());

        return (elBottom - winBottom) > 0;
    },

    catchTop: function (el) {
        return  0 < this.getClientTop(el);
    },

    scroll: function () {
        let el = document.getElementById(this.priceScrollSpyId),
            winY = parseInt(window.scrollY),
            winBottom = winY + window.innerHeight,
            winHeight = window.innerHeight,
            elBottom = InitAffix.getDocumentTop(el) + el.offsetHeight,
            elTop = InitAffix.getDocumentTop(el),
            elStart = InitAffix.startCoords.top,
            elHeight = el.offsetHeight,
            elIsAbsolute = 'absolute' === el.style.position,
            elIsFixed = 'fixed' === el.style.position,
            footer = document.querySelector('footer'),
            fTop = InitAffix.getDocumentTop(footer),
            fHeight = footer.offsetHeight,
            fMarginTop = footer.style.marginTop,
            docHeight = InitAffix.scrollHeight(),
            windowIsBig = window.innerHeight > (el.offsetHeight + InitAffix.startCoords.top),
            bottomBreakPoint = docHeight - elHeight - fHeight - fMarginTop - InitAffix.startCoords.top;

        if (winY > InitAffix.lastScrollTop) {
            if (windowIsBig) {
                if (winY < bottomBreakPoint) {
                    el.style.position = 'fixed';
                } else {
                    el.style.position = 'absolute';
                    el.style.top = (bottomBreakPoint - 30) + 'px';
                    el.style.bottom = 'initial';
                }
            } else {
                if ((winBottom) > fTop) {
                    el.style.position = 'absolute';
                    el.style.top = (bottomBreakPoint - 30) + 'px';
                    el.style.bottom = 'initial';
                } else {
                    if (elIsFixed && (elHeight + elStart) > winHeight && el.style.bottom === 'initial') {
                        el.style.top = elTop + 'px';
                        el.style.bottom = 'initial';
                        el.style.position = 'absolute';
                    }
                    if (winBottom > elBottom && !elIsFixed) {
                        el.style.position = 'fixed';
                        el.style.bottom = '0px';
                        el.style.top = 'initial';
                    }
                }
            }

        } else {
            if (windowIsBig) {
                if (elIsAbsolute) {
                    el.style.top = elStart + 'px';
                    el.style.bottom = 'initial';
                    el.style.position = 'fixed';
                }
            } else {

                if (winY === 0) {
                    el.style.top = 'initial';
                    el.style.bottom = 'initial';
                    el.style.position = 'relative';
                }

                if (elIsAbsolute && InitAffix.getClientTop(el) > 0) {
                    el.style.top = elStart + 'px';
                    el.style.bottom = 'initial';
                    el.style.position = 'fixed';
                }

                if (!InitAffix.checkVisibleTop(el) && elIsFixed) {
                    el.style.top = elTop + 'px';
                    el.style.bottom = 'initial';
                    el.style.position = 'absolute';
                }
            }
        }
        InitAffix.lastScrollTop = winY;
    }
};

$(document).ready(function() {
    InitAffix.init();
});
