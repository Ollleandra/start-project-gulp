/*!
 * multiscroll.js 0.2.1 - Extensions 0.0.6
 * https://github.com/alvarotrigo/multiscroll.js
 * @license MIT licensed
 *
 * Copyright (C) 2016 alvarotrigo.com - A project by Alvaro Trigo
 */
!function (e, t, n, o, i) {
    e.fn.multiscroll = function (s) {
        var l = e.fn.multiscroll;
        l.shared = {afterRender: O};
        var a = "multiscroll-wrapper", r = "." + a, c = (e("html, body"), e("body"));
        s = e.extend({
            verticalCentered: !0,
            scrollingSpeed: 700,
            easing: "easeInOutCubic",
            menu: !1,
            sectionsColor: [],
            anchors: [],
            navigation: !1,
            navigationPosition: "right",
            navigationColor: "#000",
            navigationTooltips: [],
            loopBottom: !1,
            loopTop: !1,
            css3: !1,
            autoScrolling: !0,
            paddingTop: 0,
            paddingBottom: 0,
            fixedElements: null,
            normalScrollElements: null,
            keyboardScrolling: !0,
            touchSensitivity: 5,
            responsiveWidth: null,
            responsiveHeight: null,
            responsiveExpand: !1,
            responsiveCombine: !1,
            scrollOverflow: !1,
            scrollOverflowOptions: null,
            sectionSelector: ".ms-section",
            leftSelector: ".ms-left",
            rightSelector: ".ms-right",
            afterLoad: null,
            onLeave: null,
            afterRender: null,
            afterResize: null
        }, s);
        var d, f, m = 600,
            v = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
            u = "ontouchstart" in t || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints, h = {};
        ".ms-right" !== s.rightSelector && e(s.rightSelector).addClass("ms-right"), ".ms-left" !== s.leftSelector && e(s.leftSelector).addClass("ms-left");
        var p, g, x = e(".ms-left").find(".ms-section").length, w = !1, b = e(t).height(), S = e(t).width(),
            C = function () {
                var e;
                e = t.PointerEvent ? {down: "pointerdown", move: "pointermove"} : {
                    down: "MSPointerDown",
                    move: "MSPointerMove"
                };
                return e
            }(), y = {
                touchmove: "ontouchmove" in t ? "touchmove" : C.move,
                touchstart: "ontouchstart" in t ? "touchstart" : C.down
            };

        function O() {
            e.isFunction(s.afterRender) && s.afterRender.call(this), s.scrollOverflow && l.scrollOverflow.iscrollHandler.afterLoad()
        }

        function T() {
            var n = t.location.hash.replace("#", "");
            if (n.length) {
                var o = J("responsiveExpand", "isResponsive") ? e(".ms-left").find('[data-panel="ms-left"][data-anchor="' + n + '"]') : e(".ms-left").find('[data-anchor="' + n + '"]');
                ("undefined" == typeof lastScrolledDestiny || n !== lastScrolledDestiny) && D(o)
            }
        }

        e(this).length && (l.getMultiscrollData = function () {
            return {
                options: s,
                internals: {
                    isTouch: u,
                    isTouchDevice: v,
                    isReallyTouch: X,
                    getEventsPage: q,
                    numberSections: x,
                    setLastScrollDestiny: K,
                    setURLHash: A,
                    activateMenuElement: W,
                    activateNavDots: z,
                    getYmovement: Z,
                    removeMouseWheelHandler: k,
                    addMouseWheelHandler: M,
                    removeTouchHandler: V,
                    addTouchHandler: U,
                    transformContainer: R,
                    c: te
                }
            }
        }), Q("responsiveExpand"), Q("scrollOverflow"), Q("responsiveCombine"), M(), U(), s.css3 && (s.css3 = function () {
            var e, o = n.createElement("p"), s = {
                webkitTransform: "-webkit-transform",
                OTransform: "-o-transform",
                msTransform: "-ms-transform",
                MozTransform: "-moz-transform",
                transform: "transform"
            };
            for (var l in n.body.insertBefore(o, null), s) o.style[l] !== i && (o.style[l] = "translate3d(1px,1px,1px)", e = t.getComputedStyle(o).getPropertyValue(s[l]));
            return n.body.removeChild(o), e !== i && e.length > 0 && "none" !== e
        }()), e("html, body").css({
            overflow: "hidden",
            height: "100%"
        }), e(this).addClass(a), ".ms-section" !== s.sectionSelector && e(s.sectionSelector).each(function () {
            e(this).addClass("ms-section")
        }), s.navigation && (e("body").append('<div id="multiscroll-nav"><ul></ul></div>'), (p = e("#multiscroll-nav")).css("color", s.navigationColor), p.addClass(s.navigationPosition)), e(".ms-right, .ms-left").css({
            width: "50%",
            position: "absolute",
            height: "100%",
            "-ms-touch-action": "none"
        }), e(".ms-right").css({
            right: "1px",
            top: "0",
            "-ms-touch-action": "none",
            "touch-action": "none"
        }), e(".ms-left").css({
            left: "0",
            top: "0",
            "-ms-touch-action": "none",
            "touch-action": "none"
        }), e(".ms-left .ms-section, .ms-right .ms-section").each(function () {
            var t, n = e(this).index();
            if ((s.paddingTop || s.paddingBottom) && e(this).css("padding", s.paddingTop + " 0 " + s.paddingBottom + " 0"), void 0 !== s.sectionsColor[n] && e(this).css("background-color", s.sectionsColor[n]), void 0 !== s.anchors[n] && e(this).attr("data-anchor", s.anchors[n]), s.verticalCentered && (t = e(this)).addClass("ms-table").wrapInner('<div class="ms-tableCell" style="height: ' + j(t) + 'px" />'), e(this).closest(".ms-left").length && s.navigation) {
                var o = "";
                s.anchors.length && (o = s.anchors[n]);
                var i = s.navigationTooltips[n];
                void 0 === i && (i = ""), s.navigation && p.find("ul").append('<li data-tooltip="' + i + '"><a href="#' + o + '"><span></span></a></li>')
            }
        }), e(".ms-right").html(e(".ms-right").find(".ms-section").get().reverse()), e(".ms-left .ms-section, .ms-right .ms-section").each(function () {
            var t = e(this).index();
            e(this).css({height: "100%"}), !t && s.navigation && p.find("li").eq(t).find("a").addClass("active")
        }).promise().done(function () {
            e(".ms-left .ms-section.active").length || (e(".ms-right").find(".ms-section").last().addClass("active"), e(".ms-left").find(".ms-section").first().addClass("active")), _("responsiveExpand") && (l.responsiveExpand.setIndex("ms-left"), l.responsiveExpand.setIndex("ms-right"), l.responsiveExpand.init()), _("responsiveCombine") && l.responsiveCombine.init(), _("scrollOverflow") && (l.scrollOverflow.init(), d = l.scrollOverflow.iscrollHandler.init(s)), s.navigation && p.css("margin-top", "-" + p.height() / 2 + "px"), O(), L(), P(), e(t).on("load", function () {
                var n, o;
                n = t.location.hash.replace("#", ""), o = e('.ms-left .ms-section[data-anchor="' + n + '"]'), n.length && D(o)
            })
        }), e(t).on("hashchange", T), e(n).keydown(function (t) {
            if (clearTimeout(g), !s.autoScrolling) return;
            var o = e(n.activeElement);
            if (!o.is("textarea") && !o.is("input") && !o.is("select") && s.keyboardScrolling) {
                var i = t.which;
                e.inArray(i, [40, 38, 32, 33, 34]) > -1 && t.preventDefault(), g = setTimeout(function () {
                    !function (t) {
                        var n = t.shiftKey;
                        switch (t.which) {
                            case 38:
                            case 33:
                                l.moveSectionUp();
                                break;
                            case 32:
                                if (n) {
                                    l.moveSectionUp();
                                    break
                                }
                            case 40:
                            case 34:
                                l.moveSectionDown();
                                break;
                            case 36:
                                l.moveTo(1);
                                break;
                            case 35:
                                l.moveTo(e(".ms-left .ms-section").length);
                                break;
                            default:
                                ;
                        }
                    }(t)
                }, 150)
            }
        }), e(n).mousedown(function (e) {
            if (1 == e.button) return e.preventDefault(), !1
        }), e(n).on("click", "#multiscroll-nav a", function (t) {
            t.preventDefault();
            var n = e(this).parent().index();
            D(e(".ms-left .ms-section").eq(n))
        }), e(n).on({
            mouseenter: function () {
                var t = e(this).data("tooltip");
                e('<div class="multiscroll-tooltip ' + s.navigationPosition + '">' + t + "</div>").hide().appendTo(e(this)).fadeIn(200)
            }, mouseleave: function () {
                e(this).find(".multiscroll-tooltip").fadeOut(200, function () {
                    e(this).remove()
                })
            }
        }, "#multiscroll-nav li"), s.normalScrollElements && (e(n).on("mouseenter", s.normalScrollElements, function () {
            l.setMouseWheelScrolling(!1)
        }), e(n).on("mouseleave", s.normalScrollElements, function () {
            l.setMouseWheelScrolling(!0)
        })), e(t).on("resize", function () {
            if (v) {
                var i = e(n.activeElement);
                if (!i.is("textarea") && !i.is("input") && !i.is("select")) {
                    var s = e(t).height();
                    o.abs(s - E) > 20 * o.max(E, s) / 100 && (I(!0), E = s)
                }
            } else clearTimeout(f), f = setTimeout(function () {
                I(!0)
            }, 350)
        });
        var E = b;

        function I(n) {
            b = e(t).height(), S = e(t).width(), e(".ms-tableCell").each(function () {
                e(this).css({height: j(e(this).parent())})
            }), s.scrollOverflow && d.createScrollBarForAll(), s.scrollOverflow && l.scrollOverflow.iscrollHandler.afterLoad(), L(), e.isFunction(s.afterResize) && s.afterResize.call(this)
        }

        function L() {
            s.css3 && s.autoScrolling ? (R(e(".ms-left"), "translate3d(0px, -" + e(".ms-left").find(".ms-section.active").position().top + "px, 0px)", !1), R(e(".ms-right"), "translate3d(0px, -" + e(".ms-right").find(".ms-section.active").position().top + "px, 0px)", !1)) : s.autoScrolling ? (e(".ms-left").css("top", -e(".ms-left").find(".ms-section.active").position().top), e(".ms-right").css("top", -e(".ms-right").find(".ms-section.active").position().top)) : e("html,body").scrollTop(e(".ms-left").find(".ms-section.active").position().top)
        }

        function D(t) {
            var n = t.index(), o = e(".ms-right").find(".ms-section").eq(x - 1 - n), i = t.data("anchor"),
                a = e(".ms-left .ms-section.active").index() + 1, r = Z(t);
            w = !0;
            var c = {left: t.position().top};
            if (J("responsiveExpand", "isResponsive") || (c.right = o.position().top), J("responsiveExpand", "isResponsive") || o.addClass("active").siblings().removeClass("active"), t.addClass("active").siblings().removeClass("active"), A(i), J("responsiveExpand", "isResponsive")) l.responsiveExpand.performMovement(t), setTimeout(function () {
                w = !1
            }, s.scrollingSpeed); else if (s.css3) {
                e.isFunction(s.onLeave) && s.onLeave.call(this, a, n + 1, r), s.scrollOverflow && l.scrollOverflow.iscrollHandler.onLeave();
                var d = "translate3d(0px, -" + c.left + "px, 0px)", f = "translate3d(0px, -" + c.right + "px, 0px)";
                R(e(".ms-left"), d, !0), R(e(".ms-right"), f, !0), setTimeout(function () {
                    e.isFunction(s.afterLoad) && s.afterLoad.call(this, i, n + 1), s.scrollOverflow && l.scrollOverflow.iscrollHandler.afterLoad(), setTimeout(function () {
                        w = !1
                    }, m)
                }, s.scrollingSpeed)
            } else e.isFunction(s.onLeave) && s.onLeave.call(this, a, n + 1, r), e(".ms-left").animate({top: -c.left}, s.scrollingSpeed, s.easing, function () {
                e.isFunction(s.afterLoad) && s.afterLoad.call(this, i, n + 1), s.scrollOverflow && l.scrollOverflow.iscrollHandler.afterLoad(), setTimeout(function () {
                    w = !1
                }, m)
            }), e(".ms-right").animate({top: -c.right}, s.scrollingSpeed, s.easing);
            lastScrolledDestiny = i, W(i), z(i, n)
        }

        function k() {
            n.addEventListener ? (n.removeEventListener("mousewheel", B, !1), n.removeEventListener("wheel", B, !1)) : n.detachEvent("onmousewheel", B)
        }

        function M() {
            n.addEventListener ? (n.addEventListener("mousewheel", B, !1), n.addEventListener("wheel", B, !1)) : n.attachEvent("onmousewheel", B)
        }

        function B(n) {
            e(r).trigger("onMouseWheel", [n, S]), n = t.event || n;
            var i = o.max(-1, o.min(1, n.wheelDelta || -n.deltaY || -n.detail));
            return w || H(i < 0 ? "down" : "up"), !1
        }

        function H(t) {
            var n = "down" === t ? l.moveSectionDown : l.moveSectionUp;
            if (s.scrollOverflow) {
                var o = l.scrollOverflow.iscrollHandler.scrollable(e.fn.multiscroll.scrollOverflow.g_overedPanel()),
                    i = "down" === t ? "bottom" : "top";
                if (o.length > 0) {
                    if (!l.scrollOverflow.iscrollHandler.isScrolled(i, o)) return !0;
                    n()
                } else n()
            } else n()
        }

        function R(e, t, n) {
            var o;
            e.toggleClass("ms-easing", n), e.css({
                "-webkit-transform": o = t,
                "-moz-transform": o,
                "-ms-transform": o,
                transform: o
            })
        }

        function z(t, n) {
            s.navigation && (e("#multiscroll-nav").find(".active").removeClass("active"), t ? e("#multiscroll-nav").find('a[href="#' + t + '"]').addClass("active") : e("#multiscroll-nav").find("li").eq(n).find("a").addClass("active"))
        }

        function W(t) {
            s.menu && (e(s.menu).find(".active").removeClass("active"), e(s.menu).find('[data-menuanchor="' + t + '"]').addClass("active"))
        }

        function Z(t) {
            return e(".ms-left .ms-section.active").index() > t.index() ? "up" : "down"
        }

        function A(e) {
            s.anchors.length && (location.hash = e), P()
        }

        function P() {
            var t = e(".ms-left .ms-section.active"), n = t.data("anchor"), o = t.index(), i = String(o);
            if (s.anchors.length && (i = n), void 0 !== i) {
                i = i.replace("/", "-").replace("#", "");
                var l = new RegExp("\\b\\s?ms-viewing-[^\\s]+\\b", "g");
                e("body")[0].className = e("body")[0].className.replace(l, ""), e("body").addClass("ms-viewing-" + i)
            }
        }

        function j(e) {
            var t = b;
            if (s.paddingTop || s.paddingBottom) {
                var n = parseInt(e.css("padding-top")) + parseInt(e.css("padding-bottom"));
                t = b - n
            }
            return t
        }

        l.silentScroll = L, l.moveSectionUp = function () {
            var t = e(".ms-left .ms-section.active").prev(".ms-section");
            !t.length && s.loopTop && (t = e(".ms-left .ms-section").last()), t.length && D(t)
        }, l.moveSectionDown = function () {
            var t = e(".ms-left .ms-section.active").next(".ms-section");
            !t.length && s.loopBottom && (t = e(".ms-left .ms-section").first()), t.length && D(t)
        }, l.moveTo = function (t) {
            D(isNaN(t) ? e('.ms-left [data-anchor="' + t + '"]') : e(".ms-left .ms-section").eq(t - 1))
        }, l.setKeyboardScrolling = function (e) {
            s.keyboardScrolling = e
        }, l.setMouseWheelScrolling = function (e) {
            e ? M() : k()
        }, l.setScrollingSpeed = function (e) {
            s.scrollingSpeed = e
        };
        var Y = 0, G = 0;

        function N(n) {
            var i = n.originalEvent;
            if (X(i)) {
                n.preventDefault();
                e(".ms-left .ms-section.active");
                if (!w) {
                    var l = q(i);
                    G = l.y, l.x, o.abs(Y - G) > e(t).height() / 100 * s.touchSensitivity && (Y > G ? H("down") : G > Y && H("up"))
                }
            }
        }

        function X(e) {
            return void 0 === e.pointerType || "mouse" != e.pointerType
        }

        function F(t) {
            var n = t.originalEvent;
            if (e(r).trigger("onTouch", [n, S]), X(n)) {
                var o = q(n);
                Y = o.y, o.x
            }
        }

        function U() {
            (u || v) && (e(n).off(y.touchstart).on(y.touchstart, F), e(n).off(y.touchmove).on(y.touchmove, N))
        }

        function V() {
            (u || v) && (e(n).off(y.touchstart), e(n).off(y.touchmove))
        }

        function q(e) {
            var t = [];
            return t.y = void 0 !== e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, t.x = void 0 !== e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, u && X(e) && void 0 !== e.touches && (t.y = e.touches[0].pageY, t.x = e.touches[0].pageX), t
        }

        function K(e) {
            lastScrolledDestiny = e
        }

        function Q(e) {
            var n = "ms_" + e + "Extension";
            h[e] = s[e + "Key"], l[e] = void 0 !== t[n] ? new t[n] : null, l[e] && l[e].c(e)
        }

        function _(e) {
            return s[e] && l[e]
        }

        function J(e, t, n) {
            var o = Array.isArray(n) ? n.join(", ") : n;
            return !!_(e) && l[e][t](o)
        }

        function $(e) {
            var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

            function n(e) {
                var n, o, i, s, l, a, r = "", c = 0;
                for (e = e.replace(/[^A-Za-z0-9+/=]/g, ""); c < e.length;) n = t.indexOf(e.charAt(c++)) << 2 | (s = t.indexOf(e.charAt(c++))) >> 4, o = (15 & s) << 4 | (l = t.indexOf(e.charAt(c++))) >> 2, i = (3 & l) << 6 | (a = t.indexOf(e.charAt(c++))), r += String.fromCharCode(n), 64 != l && (r += String.fromCharCode(o)), 64 != a && (r += String.fromCharCode(i));
                return r = function (e) {
                    var t, n = "", o = 0, i = 0, s = 0;
                    for (; o < e.length;) (i = e.charCodeAt(o)) < 128 ? (n += String.fromCharCode(i), o++) : i > 191 && i < 224 ? (s = e.charCodeAt(o + 1), n += String.fromCharCode((31 & i) << 6 | 63 & s), o += 2) : (s = e.charCodeAt(o + 1), t = e.charCodeAt(o + 2), n += String.fromCharCode((15 & i) << 12 | (63 & s) << 6 | 63 & t), o += 3);
                    return n
                }(r)
            }

            function o(e) {
                return e.slice(3).slice(0, -3)
            }

            return function (e) {
                var t = e.split("_");
                if (t.length > 1) {
                    var i = t[1];
                    return e.replace(o(t[1]), "").split("_")[0] + "_" + n(i.slice(3).slice(0, -3))
                }
                return o(e)
            }(n(e))
        }

        function ee(e) {
            var t = function () {
                    if (n.domain.length) {
                        for (var e = n.domain.replace(/^(www\.)/, "").split("."); e.length > 2;) e.shift();
                        return e.join(".").replace(/(^\.*)|(\.*$)/g, "")
                    }
                    return ""
                }(), o = ["localhost", "127.0.0.1", "jshell.net", "UDdDQU5ZNlNN"], i = o[0], s = o[1], l = o[2],
                a = $(o[3]), r = [i, s, l].indexOf(t) < 0 && 0 !== t.length, c = void 0 !== h[e] && h[e].length;
            if (!c && r) return !1;
            var d = c ? $(h[e]) : "", f = (d = d.split("_")).length > 1 && d[1].indexOf(e, d[1].length - e.length) > -1;
            return !(d[0].indexOf(t, d[0].length - t.length) < 0 && r && a != d[0]) && f || !r
        }

        function te(e) {
            if (_(e) && l[e]) {
                var t = $("MTIzPGRpdiBzdHlsZT0iei1pbmRleDo5OTk5OTk5O3Bvc2l0aW9uOmZpeGVkOyB0b3A6IDIwcHg7IGxlZnQ6MjBweDsgYmFja2dyb3VuZDpyZWQ7IHBhZGRpbmc6IDdweCAxNXB4OyBmb250LXNpemU6IDE0cHg7IGZvbnQtZmFtaWx5OiBhcmlhbDsgY29sb3I6ICNmZmY7IGRpc3BsYXk6IGlubGluZS1ibG9jazsiPjxhIGhyZWY9Imh0dHA6Ly9hbHZhcm90cmlnby5jb20vbXVsdGlTY3JvbGwvZXh0ZW5zaW9ucy8iIHN0eWxlPSJjb2xvcjogI2ZmZjsgdGV4dC1kZWNvcmF0aW9uOm5vbmU7Ij5VbmxpY2Vuc2VkIG11bHRpU2Nyb2xsLmpzIEV4dGVuc2lvbjwvYT48L2Rpdj4xMjM="),
                    n = o.random() < .5;
                if (!ee(e)) {
                    var i = function () {
                        "9999999" !== (n ? c.find("div").first() : c.find("div").last()).css("z-index") && (n ? c.prepend(t) : c.append(t))
                    };
                    i(), setInterval(i, 2e3)
                }
            }
        }

        l.destroy = function () {
            l.setKeyboardScrolling(!1), l.setMouseWheelScrolling(!1), V(), e(t).off("hashchange", T).off("resize", doneResizing), e(n).off("mouseenter", "#multiscroll-nav li").off("mouseleave", "#multiscroll-nav li").off("click", "#multiscroll-nav a")
        }, l.build = function () {
            l.setKeyboardScrolling(!0), l.setMouseWheelScrolling(!0), e(t).on("hashchange", T).on("resize", doneResizing), e(n).on("mouseenter", "#multiscroll-nav li").on("mouseleave", "#multiscroll-nav li").on("click", "#multiscroll-nav a")
        }, l.extensionCall = J
    }
}(jQuery, window, document, Math);