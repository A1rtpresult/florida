! function() {
    "use strict";
    var e = function() {
        var e = setTimeout;

        function n() {}

        function t(e) {
            if (!(this instanceof t)) throw new TypeError("Promises must be constructed via new");
            if ("function" != typeof e) throw new TypeError("not a function");
            this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], c(e, this)
        }

        function r(e, n) {
            for (; 3 === e._state;) e = e._value;
            0 !== e._state ? (e._handled = !0, t._immediateFn((function() {
                var t = 1 === e._state ? n.onFulfilled : n.onRejected;
                if (null !== t) {
                    var r;
                    try {
                        r = t(e._value)
                    } catch (e) {
                        return void o(n.promise, e)
                    }
                    i(n.promise, r)
                } else(1 === e._state ? i : o)(n.promise, e._value)
            }))) : e._deferreds.push(n)
        }

        function i(e, n) {
            try {
                if (n === e) throw new TypeError("A promise cannot be resolved with itself.");
                if (n && ("object" == typeof n || "function" == typeof n)) {
                    var r = n.then;
                    if (n instanceof t) return e._state = 3, e._value = n, void a(e);
                    if ("function" == typeof r) return void c((i = r, u = n, function() {
                        i.apply(u, arguments)
                    }), e)
                }
                e._state = 1, e._value = n, a(e)
            } catch (n) {
                o(e, n)
            }
            var i, u
        }

        function o(e, n) {
            e._state = 2, e._value = n, a(e)
        }

        function a(e) {
            2 === e._state && 0 === e._deferreds.length && t._immediateFn((function() {
                e._handled || t._unhandledRejectionFn(e._value)
            }));
            for (var n = 0, i = e._deferreds.length; i > n; n++) r(e, e._deferreds[n]);
            e._deferreds = null
        }

        function u(e, n, t) {
            this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof n ? n : null, this.promise = t
        }

        function c(e, n) {
            var t = !1;
            try {
                e((function(e) {
                    t || (t = !0, i(n, e))
                }), (function(e) {
                    t || (t = !0, o(n, e))
                }))
            } catch (e) {
                if (t) return;
                t = !0, o(n, e)
            }
        }
        t.prototype.catch = function(e) {
            return this.then(null, e)
        }, t.prototype.then = function(e, t) {
            var i = new this.constructor(n);
            return r(this, new u(e, t, i)), i
        }, t.prototype.finally = function(e) {
            var n = this.constructor;
            return this.then((function(t) {
                return n.resolve(e()).then((function() {
                    return t
                }))
            }), (function(t) {
                return n.resolve(e()).then((function() {
                    return n.reject(t)
                }))
            }))
        }, t.all = function(e) {
            return new t((function(n, t) {
                if (!e || void 0 === e.length) throw new TypeError("Promise.all accepts an array");
                var r = Array.prototype.slice.call(e);
                if (0 === r.length) return n([]);
                var i = r.length;

                function o(e, a) {
                    try {
                        if (a && ("object" == typeof a || "function" == typeof a)) {
                            var u = a.then;
                            if ("function" == typeof u) return void u.call(a, (function(n) {
                                o(e, n)
                            }), t)
                        }
                        r[e] = a, 0 == --i && n(r)
                    } catch (e) {
                        t(e)
                    }
                }
                for (var a = 0; r.length > a; a++) o(a, r[a])
            }))
        }, t.resolve = function(e) {
            return e && "object" == typeof e && e.constructor === t ? e : new t((function(n) {
                n(e)
            }))
        }, t.reject = function(e) {
            return new t((function(n, t) {
                t(e)
            }))
        }, t.race = function(e) {
            return new t((function(n, t) {
                for (var r = 0, i = e.length; i > r; r++) e[r].then(n, t)
            }))
        }, t._immediateFn = "function" == typeof setImmediate && function(e) {
            setImmediate(e)
        } || function(n) {
            e(n, 0)
        }, t._unhandledRejectionFn = function(e) {
            void 0 !== console && console && console.warn("Possible Unhandled Promise Rejection:", e)
        };
        var s = t;
        return /native code/.test(window.Promise) ? window.Promise : s
    }();

    function n() {
        return (n = Object.assign || function(e) {
            for (var n = 1; arguments.length > n; n++) {
                var t = arguments[n];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            }
            return e
        }).apply(this, arguments)
    }

    function t(e, n) {
        return e + n
    }
    var r = {}.hasOwnProperty;

    function i(e, n) {
        return r.call(n, e)
    }

    function o() {
        return (o = Object.assign || function(e) {
            for (var n = arguments.length, t = Array(n > 1 ? n - 1 : 0), r = 1; n > r; r++) t[r - 1] = arguments[r];
            return t.forEach((function(n) {
                for (var t in n) i(t, n) && (e[t] = n[t])
            })), e
        }).apply(void 0, arguments)
    }
    var a = Array.isArray;

    function u(e) {
        return "object" == typeof e && null !== e && !a(e)
    }

    function c(e, n) {
        return Object.keys(n).reduce((function(t, r) {
            return t[r] = e(n[r]), t
        }), {})
    }

    function s(e) {
        return a(e) ? e.map(s) : u(e) ? c(s, e) : e
    }

    function d(e) {
        return a(e) ? e.filter((function(e) {
            return null != e && !Number.isNaN(e)
        })) : Object.keys(e).reduce((function(n, t) {
            var r = e[t];
            return null == r || Number.isNaN(r) || (n[t] = r), n
        }), {})
    }

    function l(e, n) {
        for (var t = 0; n.length > t; t++) {
            var r = n[t];
            if (e(r)) return r
        }
    }

    function f(e, n) {
        for (var t = n.length - 1; t >= 0; t--)
            if (e(n[t])) return n[t]
    }

    function p(e) {
        return e
    }

    function m(e, n) {
        return Object.keys(n).forEach((function(t) {
            e(n[t], t)
        }))
    }

    function h() {
        return Math.random().toString(36).substring(2)
    }

    function v(e) {
        var n = h();
        return i(n, e) ? v(e) : n
    }

    function g(e, n, t) {
        var r = function(e, n) {
            for (var t = "string" == typeof e ? e.split(".") : e, r = 0, i = n; i && t.length > r;) i = i[t[r++]];
            return i
        }(n, t);
        return null != r ? r : e
    }

    function _(e, n) {
        return -1 !== n.indexOf(e)
    }

    function w(e) {
        return 0 === (a(e) ? e : Object.keys(e)).length
    }

    function y(e) {
        return !e
    }

    function b(e) {
        return !!e
    }

    function k(e) {
        return e.length > 0 ? e[e.length - 1] : null
    }

    function C(e, n) {
        return Object.keys(n).reduce((function(t, r) {
            return t[e(r)] = n[r], t
        }), {})
    }

    function I(e, n) {
        if (w(n)) return e;
        var t = {};
        return m((function(r, o) {
            if (i(o, n))
                if (u(e[o]) && u(n[o])) t[o] = I(e[o], n[o]);
                else if (a(e[o]) && a(n[o])) {
                var c = Math.max(e[o].length, n[o].length);
                t[o] = Array(c);
                for (var s = 0; c > s; s++) s in n[o] ? t[o][s] = n[o][s] : s in e[o] && (t[o][s] = e[o][s])
            } else t[o] = n[o];
            else t[o] = e[o]
        }), e), m((function(e, r) {
            i(r, t) || (t[r] = n[r])
        }), n), t
    }

    function L(e) {
        if (0 === e.length) return {};
        var n = e[0];
        return e.slice(1).reduce((function(e, n) {
            return I(e, n)
        }), n)
    }

    function E(e) {
        return function(e, n) {
            var t = {};
            return function() {
                var r = e.apply(void 0, arguments);
                if (i(r, t)) return t[r];
                var o = n.apply(void 0, arguments);
                return t[r] = o, o
            }
        }(p, e)
    }

    function x() {}

    function A(e, n) {
        return e === n ? 0 !== e || 0 !== n || 1 / e == 1 / n : e != e && n != n
    }

    function O(e, n) {
        if (A(e, n)) return !0;
        if ("object" != typeof e || null === e || "object" != typeof n || null === n) return !1;
        var t = Object.keys(e);
        if (t.length !== Object.keys(n).length) return !1;
        for (var r = 0; t.length > r; r++)
            if (!i(t[r], n) || !A(e[t[r]], n[t[r]])) return !1;
        return !0
    }

    function T(e) {
        return e.reduce(t, 0)
    }

    function P(e) {
        return Array.prototype.slice.call(e)
    }
    var z = function(e) {
        return Object.keys(e).map((function(n) {
            return [n, e[n]]
        }))
    };

    function S(e, n) {
        if (null == e) return {};
        var t, r, i = {},
            o = Object.keys(e);
        for (r = 0; o.length > r; r++) 0 > n.indexOf(t = o[r]) && (i[t] = e[t]);
        return i
    }
    var j = function(e, n) {
            m((function(e, t) {
                n.style[t] = e
            }), e)
        },
        M = function(e, n) {
            m((function(e, t) {
                "style" !== t ? n.setAttribute(t, e) : j(e, n)
            }), e)
        },
        N = function() {
            return !!document.documentElement.currentStyle
        },
        D = function(e, n) {
            var t = window.getComputedStyle(n),
                r = "border-box" === t.boxSizing,
                o = function(e, n) {
                    return e.reduce((function(e, t) {
                        return e[t] = n[t], e
                    }), {})
                }(e, t);
            N() && r && i("width", o) && null !== o.width && (o.width = T([o.width, t.paddingLeft, t.paddingRight, t.borderLeftWidth, t.borderRightWidth].map(parseFloat)) + "px");
            N() && r && i("height", o) && null !== o.height && (o.height = T([o.height, t.paddingTop, t.paddingBottom, t.borderTopWidth, t.borderBottomWidth].map(parseFloat)) + "px");
            return o
        };

    function q() {
        return new e((function(e) {
            ! function n() {
                document.body ? e(document.body) : setTimeout(n, 100)
            }()
        }))
    }

    function F(e) {
        var n = e.parentNode;
        n && n.removeChild(e)
    }
    var H = function(e, n) {
            var t = document.createElement(e);
            return M(n, t), t
        },
        B = function(e) {
            return z(e).map((function(e) {
                return e.map(encodeURIComponent).join("=")
            })).join("&")
        },
        W = function(e) {
            return function(e) {
                return e.reduce((function(e, n) {
                    return e[n[0]] = n[1], e
                }), {})
            }(e.split("&").filter(Boolean).map((function(e) {
                return e.split("=").map((function(e) {
                    return decodeURIComponent(e.replace("+", "%20"))
                }))
            })).map((function(e) {
                return 2 === e.length ? e : [e[0], ""]
            })))
        },
        R = /(?:[^:]+:\/\/)?([^/\s]+)/;
    var V = /[^:]+:\/\/[^(/|?)\s]+/,
        G = function(e) {
            var n = e.match(V);
            return n && n[0]
        },
        U = /.*?\?([^#]+)/,
        J = function(e) {
            var n = e.match(U);
            return n ? "?" + n[1] : ""
        },
        Y = function(e) {
            return e.replace(/^\?/, "")
        },
        X = function(e) {
            if (null === G(e)) return W(Y(e));
            var n = Y(J(e));
            return n ? W(n) : {}
        },
        $ = /^(?:https?:)?\/\/[^/]+\/([^?#]+)/,
        K = function(e) {
            var n = e.match($);
            return "/" + (n && n[1] || "")
        },
        Q = function(e) {
            return e.replace(/\w/g, "$&[\\r\\n\\t]*")
        },
        Z = (RegExp("^[\0-]*(" + Q("javascript") + "|" + Q("data") + "):", "i"), /^((http(s)?:)?\/\/)/),
        ee = function(e, t) {
            if (-1 === e.indexOf("?")) return e;
            var r = X(e);
            if (w(r)) return e;
            if (Object.keys(r).every((function(e) {
                    return !t.includes(e)
                }))) return e;
            t.forEach((function(e) {
                return delete r[e]
            }));
            var i = function(e, t) {
                if (0 === Object.keys(t).length) return e;
                var r = G(e),
                    i = K(e),
                    o = J(e) ? X(e) : {};
                return "" + r + i + "?" + B(n({}, o, t))
            }(e.split("?")[0], r);
            return e.indexOf("#") > -1 ? i + "#" + e.split("#")[1] : i
        },
        ne = {};

    function te(t, r) {
        var i = void 0 === r ? {} : r,
            o = i.query,
            a = void 0 === o ? {} : o,
            u = i.jsonpParam,
            c = void 0 === u ? "jsonp" : u,
            s = i.callbackName;
        return new e((function(e, r) {
            q().then((function(i) {
                var o, u = document.createElement("script"),
                    d = s || v(ne);
                ne[d] = !0;
                var l = "__" + d;
                window[l] = function(n) {
                    delete ne[d], delete window[l], F(u), e(n)
                }, u.src = t + "?" + B(n({}, a, ((o = {})[c] = l, o))), u.addEventListener("error", (function() {
                    setTimeout((function() {
                        return r(Error("JSONP request failed."))
                    }), 100)
                })), i.appendChild(u)
            }))
        }))
    }
    var re = function(e) {
            return function(n, t) {
                if (0 === n) {
                    if ("function" != typeof e) return t(0, (function() {})), void t(2);
                    var r, i = !1;
                    t(0, (function(e) {
                        i || (i = 2 === e) && "function" == typeof r && r()
                    })), i || (r = e((function(e) {
                        i || t(1, e)
                    }), (function(e) {
                        i || void 0 === e || (i = !0, t(2, e))
                    }), (function() {
                        i || (i = !0, t(2))
                    })))
                }
            }
        },
        ie = function(e) {
            return function(n, t) {
                var r, i;
                0 === n && e(0, (function(e, n) {
                    if (0 === e) r = n, t(0, o);
                    else if (1 === e) {
                        var a = n;
                        i && i(2), a(0, (function(e, n) {
                            0 === e ? (i = n)(1) : 1 === e ? t(1, n) : 2 === e && n ? (r && r(2), t(2, n)) : 2 === e && (r ? (i = void 0, r(1)) : t(2))
                        }))
                    } else 2 === e && n ? (i && i(2), t(2, n)) : 2 === e && (i ? r = void 0 : t(2))
                }));

                function o(e, n) {
                    1 === e && (i || r)(1, n), 2 === e && (i && i(2), r && r(2))
                }
            }
        },
        oe = function(e, n) {
            return e === n
        };

    function ae(e) {
        return void 0 === e && (e = oe),
            function(n) {
                return function(t, r) {
                    if (0 === t) {
                        var i, o, a = !1;
                        n(0, (function(n, t) {
                            0 === n && (o = t), 1 === n ? a && e(i, t) ? o(1) : (a = !0, i = t, r(1, t)) : r(n, t)
                        }))
                    }
                }
            }
    }
    var ue = function(e) {
            return function(n) {
                return function(t, r) {
                    var i;
                    0 === t && n(0, (function(n, t) {
                        0 === n ? (i = t, r(n, t)) : 1 === n ? e(t) ? r(n, t) : i(1) : r(n, t)
                    }))
                }
            }
        },
        ce = function(e) {
            return function(n) {
                var t;
                n(0, (function(n, r) {
                    0 === n && (t = r), 1 === n && e(r), 1 !== n && 0 !== n || t(1)
                }))
            }
        },
        se = function(e, n, t) {
            return function(r, i) {
                if (0 === r) {
                    var o = !1,
                        a = function(e) {
                            i(1, e)
                        };
                    i(0, (function(r) {
                        2 === r && (o = !0, e.removeEventListener(n, a, t))
                    })), o || e.addEventListener(n, a, t)
                }
            }
        };
    var de = function() {
        for (var e = arguments.length, n = Array(e), t = 0; e > t; t++) n[t] = arguments[t];
        return function(e, t) {
            if (0 === e)
                for (var r = n.length, i = Array(r), o = 0, a = 0, u = function(e) {
                        if (0 !== e)
                            for (var n = 0; r > n; n++) i[n] && i[n](e)
                    }, c = function(e) {
                        n[e](0, (function(n, c) {
                            0 === n ? (i[e] = c, 1 == ++o && t(0, u)) : 2 === n ? (i[e] = void 0, ++a === r && t(2)) : t(n, c)
                        }))
                    }, s = 0; r > s; s++) c(s)
        }
    };

    function le(e, n) {
        return re((function(t) {
            return e.on(n, t),
                function() {
                    e.off(n, t)
                }
        }))
    }! function(e) {
        var n, t = e.Symbol;
        "function" == typeof t ? t.observable ? n = t.observable : (n = t("observable"), t.observable = n) : n = "@@observable"
    }("undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof module ? module : Function("return this")());
    var fe = function() {
            for (var e = arguments.length, n = Array(e), t = 0; e > t; t++) n[t] = arguments[t];
            for (var r = n[0], i = 1, o = n.length; o > i; i++) r = n[i](r);
            return r
        },
        pe = function(e) {
            return function(n) {
                return function(t, r) {
                    var i;
                    0 === t && n(0, (function(n, t) {
                        0 === n ? (i = t, r(0, (function(e, n) {
                            0 !== e && i(e, n)
                        })), r(1, e)) : r(n, t)
                    }))
                }
            }
        },
        me = function(e) {
            return function(n) {
                return function(t, r) {
                    0 === t && n(0, (function(n, t) {
                        r(n, 1 === n ? e(t) : t)
                    }))
                }
            }
        };

    function he(e) {
        return function(n) {
            return ie(me(e)(n))
        }
    }
    var ve = function() {};

    function ge(e, n) {
        0 === e && n(0, ve)
    }

    function _e() {
        for (var e = arguments.length, n = Array(e), t = 0; e > t; t++) n[t] = arguments[t];
        return function(e, t) {
            if (0 === e) {
                var r = !1;
                for (t(0, (function(e) {
                        2 === e && (r = !0, n.length = 0)
                    })); 0 !== n.length;) t(1, n.shift());
                r || t(2)
            }
        }
    }

    function we(e) {
        return function(n, t) {
            if (0 === n) {
                var r, i, o, a = 0;
                e(0, (function(e, n) {
                    if (0 === e && (o = n), 1 === e) {
                        var u = [i, n];
                        r = u[0], i = u[1], 2 > ++a ? o(1) : t(1, [r, i])
                    } else t(e, n)
                }))
            }
        }
    }
    var ye = function() {},
        be = {};

    function ke(e) {
        var n, t, r = [],
            i = !1,
            o = be;
        return function(a, u) {
            if (0 === a) {
                if (o !== be) return u(0, ye), i && u(1, t), void u(2, o);
                r.push(u);
                var c = function(e, t) {
                    if (2 !== e) o === be && n(e, t);
                    else {
                        var i = r.indexOf(u); - 1 !== i && r.splice(i, 1)
                    }
                };
                1 !== r.length ? (u(0, c), i && o === be && u(1, t)) : e(0, (function(e, a) {
                    if (0 === e) return n = a, void u(0, c);
                    1 === e && (i = !0, t = a);
                    var s = r.slice(0);
                    2 === e && (o = a, r = null), s.forEach((function(n) {
                        n(e, a)
                    }))
                }))
            }
        }
    }
    var Ce = function(e) {
            return function(n) {
                return function(t, r) {
                    if (0 === t) {
                        var i, o = 0;
                        n(0, (function(n, t) {
                            0 === n ? (i = t, r(n, t)) : 1 === n && e > o ? (o++, i(1)) : r(n, t)
                        }))
                    }
                }
            }
        },
        Ie = function(e) {
            return void 0 === e && (e = {}),
                function(n) {
                    "function" == typeof e && (e = {
                        next: e
                    });
                    var t, r = e.next,
                        i = e.error,
                        o = e.complete;
                    n(0, (function(e, n) {
                        0 === e && (t = n), 1 === e && r && r(n), 1 !== e && 0 !== e || t(1), 2 === e && !n && o && o(), 2 === e && n && i && i(n)
                    }));
                    return function() {
                        t && t(2)
                    }
                }
        },
        Le = function(e) {
            return function(n) {
                return function(t, r) {
                    if (0 === t) {
                        var i, o = 0;
                        n(0, (function(n, t) {
                            0 === n ? (i = t, r(0, a)) : 1 === n ? e > o && (o++, r(n, t), o === e && (r(2), i(2))) : r(n, t)
                        }))
                    }

                    function a(n, t) {
                        e > o && i(n, t)
                    }
                }
            }
        },
        Ee = {},
        xe = function(e) {
            return function(n) {
                return function(t, r) {
                    if (0 === t) {
                        var i, o, a = !1,
                            u = Ee;
                        n(0, (function(n, t) {
                            if (0 === n) return i = t, e(0, (function(e, n) {
                                if (0 !== e) return 1 === e ? (u = void 0, o(2), i(2), void(a && r(2))) : void(2 === e && (o = null, n && (u = n, i(2), a && r(e, n))));
                                (o = n)(1)
                            })), a = !0, r(0, (function(e, n) {
                                u === Ee && (2 === e && o && o(2), i(e, n))
                            })), void(u !== Ee && r(2, u));
                            2 === n && o(2), r(n, t)
                        }))
                    }
                }
            }
        };

    function Ae(n) {
        return new e((function(e, t) {
            Ie({
                next: e,
                error: t,
                complete: function() {
                    var e = Error("No elements in sequence.");
                    e.code = "NO_ELEMENTS", t(e)
                }
            })(function(e) {
                return function(n, t) {
                    if (0 === n) {
                        var r, i, o = !1,
                            a = !1;
                        e(0, (function(e, n) {
                            return 0 === e ? (r = n, void t(0, (function(e, n) {
                                2 === e && (a = !0), r(e, n)
                            }))) : 1 === e ? (o = !0, i = n, void r(1)) : void(2 === e && !n && o && (t(1, i), a) || t(e, n))
                        }))
                    }
                }
            }(n))
        }))
    }
    var Oe = function(e, n, t) {
            return e(t = {
                path: n,
                exports: {},
                require: function(e, n) {
                    return function() {
                        throw Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
                    }()
                }
            }, t.exports), t.exports
        }((function(e, n) {
            function t(e, n) {
                return e === n
            }

            function r(e, n, t) {
                if (null === n || null === t || n.length !== t.length) return !1;
                for (var r = n.length, i = 0; r > i; i++)
                    if (!e(n[i], t[i])) return !1;
                return !0
            }

            function i(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t,
                    i = null,
                    o = null;
                return function() {
                    return r(n, i, arguments) || (o = e.apply(null, arguments)), i = arguments, o
                }
            }

            function o(e) {
                var n = Array.isArray(e[0]) ? e[0] : e;
                if (!n.every((function(e) {
                        return "function" == typeof e
                    }))) {
                    var t = n.map((function(e) {
                        return typeof e
                    })).join(", ");
                    throw Error("Selector creators expect all input-selectors to be functions, instead received the following types: [" + t + "]")
                }
                return n
            }

            function a(e) {
                for (var n = arguments.length, t = Array(n > 1 ? n - 1 : 0), r = 1; n > r; r++) t[r - 1] = arguments[r];
                return function() {
                    for (var n = arguments.length, r = Array(n), a = 0; n > a; a++) r[a] = arguments[a];
                    var u = 0,
                        c = r.pop(),
                        s = o(r),
                        d = e.apply(void 0, [function() {
                            return u++, c.apply(null, arguments)
                        }].concat(t)),
                        l = i((function() {
                            for (var e = [], n = s.length, t = 0; n > t; t++) e.push(s[t].apply(null, arguments));
                            return d.apply(null, e)
                        }));
                    return l.resultFunc = c, l.recomputations = function() {
                        return u
                    }, l.resetRecomputations = function() {
                        return u = 0
                    }, l
                }
            }
            n.__esModule = !0, n.defaultMemoize = i, n.createSelectorCreator = a, n.createStructuredSelector = function(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : u;
                if ("object" != typeof e) throw Error("createStructuredSelector expects first argument to be an object where each property is a selector, instead received a " + typeof e);
                var t = Object.keys(e);
                return n(t.map((function(n) {
                    return e[n]
                })), (function() {
                    for (var e = arguments.length, n = Array(e), r = 0; e > r; r++) n[r] = arguments[r];
                    return n.reduce((function(e, n, r) {
                        return e[t[r]] = n, e
                    }), {})
                }))
            };
            var u = n.createSelector = a(i)
        })),
        Te = function(e, n) {
            if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
        },
        Pe = function() {
            function e() {
                Te(this, e), this._cache = {}
            }
            return e.prototype.set = function(e, n) {
                this._cache[e] = n
            }, e.prototype.get = function(e) {
                return this._cache[e]
            }, e.prototype.remove = function(e) {
                delete this._cache[e]
            }, e.prototype.clear = function() {
                this._cache = {}
            }, e
        }();
    (function() {
        function e() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = n.cacheSize;
            if (Te(this, e), void 0 === t) throw Error("Missing the required property `cacheSize`.");
            if (!Number.isInteger(t) || 0 >= t) throw Error("The `cacheSize` property must be a positive integer value.");
            this._cache = {}, this._cacheOrdering = [], this._cacheSize = t
        }
        e.prototype.set = function(e, n) {
            (this._cache[e] = n, this._cacheOrdering.push(e), this._cacheOrdering.length > this._cacheSize) && this.remove(this._cacheOrdering[0])
        }, e.prototype.get = function(e) {
            return this._cache[e]
        }, e.prototype.remove = function(e) {
            var n = this._cacheOrdering.indexOf(e);
            n > -1 && this._cacheOrdering.splice(n, 1), delete this._cache[e]
        }, e.prototype.clear = function() {
            this._cache = {}, this._cacheOrdering = []
        }
    })(),
    function() {
        function e() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = n.cacheSize;
            if (Te(this, e), void 0 === t) throw Error("Missing the required property `cacheSize`.");
            if (!Number.isInteger(t) || 0 >= t) throw Error("The `cacheSize` property must be a positive integer value.");
            this._cache = {}, this._cacheOrdering = [], this._cacheSize = t
        }
        e.prototype.set = function(e, n) {
            (this._cache[e] = n, this._registerCacheHit(e), this._cacheOrdering.length > this._cacheSize) && this.remove(this._cacheOrdering[0])
        }, e.prototype.get = function(e) {
            return this._registerCacheHit(e), this._cache[e]
        }, e.prototype.remove = function(e) {
            this._deleteCacheHit(e), delete this._cache[e]
        }, e.prototype.clear = function() {
            this._cache = {}, this._cacheOrdering = []
        }, e.prototype._registerCacheHit = function(e) {
            this._deleteCacheHit(e), this._cacheOrdering.push(e)
        }, e.prototype._deleteCacheHit = function(e) {
            var n = this._cacheOrdering.indexOf(e);
            n > -1 && this._cacheOrdering.splice(n, 1)
        }
    }();

    function ze() {
        for (var e = arguments.length, n = Array(e), t = 0; e > t; t++) n[t] = arguments[t];
        var r = Pe;
        return function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                i = void 0,
                o = void 0;
            "function" == typeof t ? (console.warn('[re-reselect] Deprecation warning: "selectorCreator" argument is discouraged and will be removed in the upcoming major release. Please use "options.selectorCreator" instead.'), i = new r, o = t) : (i = t.cacheObject || new r, o = t.selectorCreator || Oe.createSelector);
            var a = function() {
                var t = e.apply(void 0, arguments);
                if ("string" == typeof t || "number" == typeof t) {
                    var r = i.get(t);
                    return void 0 === r && (r = o.apply(void 0, n), i.set(t, r)), r.apply(void 0, arguments)
                }
            };
            return a.getMatchingSelector = function() {
                var n = e.apply(void 0, arguments);
                return i.get(n)
            }, a.removeMatchingSelector = function() {
                var n = e.apply(void 0, arguments);
                i.remove(n)
            }, a.clearCache = function() {
                i.clear()
            }, a.resultFunc = n[n.length - 1], a
        }
    }
    var Se = function(e, n) {
            return n
        },
        je = function(e, n) {
            return function(e) {
                return e.entities.chats.byIds
            }(e)[n]
        },
        Me = ze([function(e, n) {
            return je(e, n).events.orderedIds
        }, function(e, n) {
            return je(e, n).events.byIds
        }], (function(e, n) {
            return e.map((function(e) {
                return n[e]
            }))
        }))(Se),
        Ne = ze([je, Me], (function(e, t) {
            return n({}, e, {
                events: t
            })
        }))(Se),
        De = function(e) {
            return e.entities.users.byIds
        },
        qe = function(e) {
            return De(e)[function(e) {
                return e.session.id
            }(e)]
        },
        Fe = function(e, n) {
            return De(e)[n]
        },
        He = function(e) {
            return qe(e).id
        },
        Be = (ze([Me, He], (function(e, n) {
            return f((function(e) {
                return e.delivered && e.author === n
            }), e)
        }))(Se), ze([Me, He], (function(e, n) {
            return f((function(e) {
                return e.seen && e.author === n
            }), e)
        }))(Se), {
            boosters: !0,
            form: !0,
            system_message: !0
        });
    Oe.createSelector([Me, function(e) {
        return qe(e).id
    }], (function(e, n) {
        return function(e, n, t) {
            for (var r = n; r >= 0; r--)
                if (e(t[r])) return r;
            return -1
        }((function(e) {
            return e.author === n && "message" === e.type && !(e.properties && "file" === e.properties.serverType) || !0 === e.seen && !Be[e.type] && e.serverId
        }), (t = e).length - 1, t);
        var t
    })), ze([function(e, n) {
        return je(e, n).participants
    }, De], (function(e, n) {
        return e.map((function(e) {
            return n[e]
        }))
    }))(Se);

    function We(e, n) {
        return void 0 === n ? e.application : e.application[n]
    }
    var Re = "application/x-postmate-v1+json",
        Ve = 0,
        Ge = {
            handshake: 1,
            "handshake-reply": 1,
            call: 1,
            emit: 1,
            reply: 1,
            request: 1
        },
        Ue = function(e, n) {
            return ("string" != typeof n || e.origin === n) && (!!e.data && ("object" == typeof e.data && ("postmate" in e.data && (e.data.type === Re && !!Ge[e.data.postmate]))))
        },
        Je = function() {
            function e(e) {
                var n = this;
                this.parent = e.parent, this.frame = e.frame, this.child = e.child, this.childOrigin = e.childOrigin, this.events = {}, this.listener = function(e) {
                    if (!Ue(e, n.childOrigin)) return !1;
                    var t = ((e || {}).data || {}).value || {},
                        r = t.name;
                    "emit" === e.data.postmate && r in n.events && n.events[r].call(n, t.data)
                }, this.parent.addEventListener("message", this.listener, !1)
            }
            var n = e.prototype;
            return n.get = function(e) {
                var n = this;
                return new Xe.Promise((function(t) {
                    var r = ++Ve;
                    n.parent.addEventListener("message", (function e(i) {
                        i.data.uid === r && "reply" === i.data.postmate && (n.parent.removeEventListener("message", e, !1), t(i.data.value))
                    }), !1), n.child.postMessage({
                        postmate: "request",
                        type: Re,
                        property: e,
                        uid: r
                    }, n.childOrigin)
                }))
            }, n.call = function(e, n) {
                this.child.postMessage({
                    postmate: "call",
                    type: Re,
                    property: e,
                    data: n
                }, this.childOrigin)
            }, n.on = function(e, n) {
                this.events[e] = n
            }, n.destroy = function() {
                window.removeEventListener("message", this.listener, !1), this.frame.parentNode.removeChild(this.frame)
            }, e
        }(),
        Ye = function() {
            function e(e) {
                var n = this;
                this.model = e.model, this.parent = e.parent, this.parentOrigin = e.parentOrigin, this.child = e.child, this.child.addEventListener("message", (function(e) {
                    if (Ue(e, n.parentOrigin)) {
                        var t = e.data,
                            r = t.property,
                            i = t.uid,
                            o = t.data;
                        "call" !== e.data.postmate ? function(e, n) {
                            var t = "function" == typeof e[n] ? e[n]() : e[n];
                            return Xe.Promise.resolve(t)
                        }(n.model, r).then((function(n) {
                            return e.source.postMessage({
                                property: r,
                                postmate: "reply",
                                type: Re,
                                uid: i,
                                value: n
                            }, e.origin)
                        })) : r in n.model && "function" == typeof n.model[r] && n.model[r].call(n, o)
                    }
                }))
            }
            return e.prototype.emit = function(e, n) {
                this.parent.postMessage({
                    postmate: "emit",
                    type: Re,
                    value: {
                        name: e,
                        data: n
                    }
                }, this.parentOrigin)
            }, e
        }(),
        Xe = function() {
            function e(e) {
                var n = e.container,
                    t = void 0 === n ? void 0 !== t ? t : document.body : n,
                    r = e.model,
                    i = e.url,
                    o = e.iframeAllowedProperties;
                return this.parent = window, this.frame = document.createElement("iframe"), o && (this.frame.allow = o), t.appendChild(this.frame), this.child = this.frame.contentWindow || this.frame.contentDocument.parentWindow, this.model = r || {}, this.sendHandshake(i)
            }
            return e.prototype.sendHandshake = function(n) {
                var t, r = this,
                    i = function(e) {
                        var n = document.createElement("a");
                        n.href = e;
                        var t = n.protocol.length > 4 ? n.protocol : window.location.protocol,
                            r = n.host.length ? "80" === n.port || "443" === n.port ? n.hostname : n.host : window.location.host;
                        return n.origin || t + "//" + r
                    }(n),
                    o = 0;
                return new e.Promise((function(e, a) {
                    r.parent.addEventListener("message", (function n(o) {
                        return !!Ue(o, i) && ("handshake-reply" === o.data.postmate ? (clearInterval(t), r.parent.removeEventListener("message", n, !1), r.childOrigin = o.origin, e(new Je(r))) : a("Failed handshake"))
                    }), !1);
                    var u = function() {
                            o++, r.child.postMessage({
                                postmate: "handshake",
                                type: Re,
                                model: r.model
                            }, i), 5 === o && clearInterval(t)
                        },
                        c = function() {
                            u(), t = setInterval(u, 500)
                        };
                    r.frame.attachEvent ? r.frame.attachEvent("onload", c) : r.frame.addEventListener("load", c), r.frame.src = n
                }))
            }, e
        }();
    Xe.debug = !1, Xe.Promise = function() {
        try {
            return window ? window.Promise : e
        } catch (e) {
            return null
        }
    }(), Xe.Model = function() {
        function e(e) {
            return this.child = window, this.model = e, this.parent = this.child.parent, this.sendHandshakeReply()
        }
        return e.prototype.sendHandshakeReply = function() {
            var e = this;
            return new Xe.Promise((function(n, t) {
                e.child.addEventListener("message", (function r(i) {
                    if (i.data.postmate) {
                        if ("handshake" === i.data.postmate) {
                            e.child.removeEventListener("message", r, !1), i.source.postMessage({
                                postmate: "handshake-reply",
                                type: Re
                            }, i.origin), e.parentOrigin = i.origin;
                            var o = i.data.model;
                            return o && Object.keys(o).forEach((function(n) {
                                e.model[n] = o[n]
                            })), n(new Ye(e))
                        }
                        return t("Handshake Reply Failed")
                    }
                }), !1)
            }))
        }, e
    }();
    var $e = function() {
        var e, t = {
                all: e = e || new Map,
                on: function(n, t) {
                    var r = e.get(n);
                    r ? r.push(t) : e.set(n, [t])
                },
                off: function(n, t) {
                    var r = e.get(n);
                    r && (t ? r.splice(r.indexOf(t) >>> 0, 1) : e.set(n, []))
                },
                emit: function(n, t) {
                    var r = e.get(n);
                    r && r.slice().map((function(e) {
                        e(t)
                    })), (r = e.get("*")) && r.slice().map((function(e) {
                        e(n, t)
                    }))
                }
            },
            r = t.all,
            i = S(t, ["all"]);
        return n({}, i, {
            off: function(e, n) {
                e ? i.off(e, n) : r.clear()
            },
            once: function(e, n) {
                i.on(e, (function t(r, o) {
                    i.off(e, t), n(r, o)
                }))
            }
        })
    };
    Xe.Promise = e;
    var Ke = function(n) {
        var t = n.methods,
            r = S(n, ["methods"]);
        return new Xe(r).then((function(n) {
            var r = n.on,
                i = n.call,
                a = function() {
                    for (var e = arguments.length, t = Array(e), r = 0; e > r; r++) t[r] = arguments[r];
                    return i.apply(n, t)
                },
                u = $e(),
                c = {},
                s = {};
            return t.resolveRemoteCall = function(e) {
                var n = e.id,
                    t = e.value,
                    r = s[n];
                delete s[n], r(t)
            }, n.on = function(e, t) {
                u.on(e, t), c[e] || (c[e] = !0, function() {
                    for (var e = arguments.length, t = Array(e), i = 0; e > i; i++) t[i] = arguments[i];
                    r.apply(n, t)
                }(e, (function(n) {
                    u.emit(e, n)
                })))
            }, n.off = u.off, n.on("remote-call", (function(e) {
                var r = e.id,
                    i = e.method,
                    o = "function" == typeof t[i] ? t[i].apply(n, e.args) : void 0;
                o && "function" == typeof o.then ? o.then((function(e) {
                    a("resolveRemoteCall", {
                        id: r,
                        value: e
                    })
                })) : a("resolveRemoteCall", {
                    id: r,
                    value: o
                })
            })), n.emit = function(e, n) {
                a("emitEvent", {
                    event: e,
                    data: n
                })
            }, n._emit = u.emit, n.call = function(n) {
                for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), i = 1; t > i; i++) r[i - 1] = arguments[i];
                return new e((function(e) {
                    var t = v(s);
                    s[t] = e, a("remoteCall", {
                        id: t,
                        method: n,
                        args: r
                    })
                }))
            }, o(n, t)
        }))
    };

    function Qe(e, n) {
        return null != n && null != e && "object" == typeof n && "object" == typeof e ? Ze(n, e) : e
    }

    function Ze(e, t) {
        var r;
        if (Array.isArray(e)) {
            r = e.slice(0, t.length);
            for (var o = 0; t.length > o; o++) void 0 !== t[o] && (r[o] = Qe(t[o], r[o]))
        } else
            for (var a in r = n({}, e), t) i(a, t) && (void 0 === t[a] ? delete r[a] : r[a] = Qe(t[a], r[a]));
        return r
    }
    var en = function(n) {
            return new e((function(e) {
                n.on("state", (function t(r) {
                    n.off("state", t), n.state = r, e(r)
                })), n.on("state_diff", (function(e) {
                    n.state = Ze(n.state, e)
                })), n.on("store_event", (function(e) {
                    n._emit(e[0], e[1])
                })), n.call("startStateSync")
            }))
        },
        nn = "chat-widget",
        tn = "chat-widget-minimized",
        rn = "LiveChat chat widget",
        on = "OpenWidget widget",
        an = {
            opacity: 0,
            visibility: "hidden",
            zIndex: -1
        },
        un = {
            opacity: 1,
            visibility: "visible",
            zIndex: 2147483639
        },
        cn = {
            id: nn + "-container",
            style: n({}, an, {
                position: "fixed",
                bottom: 0,
                width: 0,
                height: 0,
                maxWidth: "100%",
                maxHeight: "100%",
                minHeight: 0,
                minWidth: 0,
                backgroundColor: "transparent",
                border: 0,
                overflow: "hidden"
            })
        },
        sn = (n({}, cn.style), {
            id: "livechat-eye-catcher",
            style: {
                position: "fixed",
                visibility: "visible",
                zIndex: 2147483639,
                background: "transparent",
                border: 0,
                padding: "10px 10px 0 0",
                float: "left",
                marginRight: "-10px",
                webkitBackfaceVisibility: "hidden"
            }
        }),
        dn = {
            style: {
                position: "absolute",
                display: "none",
                top: "-5px",
                right: "-5px",
                width: "16px",
                lineHeight: "16px",
                textAlign: "center",
                cursor: "pointer",
                textDecoration: "none",
                color: "#000",
                fontSize: "20px",
                fontFamily: "Arial, sans-serif",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.5)"
            }
        },
        ln = {
            id: "livechat-eye-catcher-img",
            style: {
                display: "block",
                overflow: "hidden",
                cursor: "pointer"
            }
        },
        fn = {
            alt: "",
            style: {
                display: "block",
                border: 0,
                float: "right"
            }
        },
        pn = {
            position: "absolute",
            top: "0px",
            left: "0px",
            bottom: "0px",
            right: "0px"
        },
        mn = {
            allowtransparency: !0,
            id: nn,
            name: nn,
            title: rn,
            scrolling: "no",
            style: {
                width: "100%",
                height: "100%",
                "min-height": "0px",
                "min-width": "0px",
                margin: "0px",
                padding: "0px",
                "background-image": "none",
                "background-position-x": "0%",
                "background-position-y": "0%",
                "background-size": "initial",
                "background-attachment": "scroll",
                "background-origin": "initial",
                "background-clip": "initial",
                "background-color": "rgba(0, 0, 0, 0)",
                "border-width": "0px",
                float: "none"
            }
        },
        hn = n({}, mn, {
            id: tn,
            name: tn
        }),
        vn = e.resolve(),
        gn = function(e) {
            vn.then(e)
        },
        _n = function(e) {
            return gn((function() {
                throw e
            }))
        },
        wn = function(e) {
            return function(n) {
                var t = window.LC_API || {};
                if ("function" == typeof n && n(t), "function" == typeof t[e]) try {
                    t[e]()
                } catch (e) {
                    _n(e)
                }
            }
        },
        yn = function(e, n) {
            if (!e) return !0;
            var t = function(e) {
                var n = e.match(R);
                return n && n[1]
            }(n);
            return !!t && [].concat(e, ["livechatinc.com", "lc.chat"]).some((function(e) {
                var n = t.length - e.length;
                return -1 !== t.indexOf(e, n) && (t.length === e.length || "." === t.charAt(n - 1))
            }))
        },
        bn = [],
        kn = function(e) {
            30 > bn.length || (bn = bn.slice(1));
            for (var n = arguments.length, t = Array(n > 1 ? n - 1 : 0), r = 1; n > r; r++) t[r - 1] = arguments[r];
            bn.push({
                name: e,
                args: t
            })
        },
        Cn = "always visible",
        In = "always hide",
        Ln = "hide until it gets activated";

    function En(e, n, t) {
        return function(r) {
            var i, o = (void 0 === r ? {} : r).prettyPrint,
                a = void 0 === o || o,
                u = n.analytics.googleAnalytics.trackerName,
                c = !yn(t.allowedDomains, document.location.href),
                s = [
                    ["window.open", !/native code/.test(window.open)],
                    ["document.domain", window.location.hostname !== document.domain],
                    ["window.frames", window.frames !== window],
                    ["JSON.stringify", !/native code/.test(window.JSON.stringify)],
                    ["JSON.parse", !/native code/.test(window.JSON.parse)],
                    ["Object.keys", !/native code/.test(Object.keys)],
                    ["console.log", !/native code/.test(console.log)]
                ].filter((function(e) {
                    return e[1]
                })).map((function(e) {
                    return e[0]
                })),
                d = function(e) {
                    var n = [];
                    for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && n.push(t);
                    return n
                }(mn.style).some((function(n) {
                    return e.frame.style.getPropertyValue(n) !== mn.style[n]
                })),
                l = function(e) {
                    var n = "";
                    return {
                        desktopVisibility: n = e.initiallyHidden ? e.disabledMinimized ? In : Ln : Cn,
                        mobileVisibility: e.hasCustomMobileSettings ? e.hiddenOnMobile ? In : e.initiallyHiddenOnMobile ? e.disabledMinimizedOnMobile ? In : Ln : Cn : n
                    }
                }(t.__unsafeProperties.group),
                f = l.desktopVisibility,
                p = l.mobileVisibility,
                m = [{
                    msg: "language: " + t.__unsafeProperties.group.language
                }, {
                    msg: "region: " + t.region
                }, {
                    msg: "license number: " + window.__lc.license
                }, {
                    msg: "group id: " + e.state.application.group
                }, {
                    msg: "hidden: " + (e.state.application.hidden ? "yes" : "no")
                }, {
                    msg: "tracker name: " + u
                }, {
                    msg: "desktop visibility: " + f,
                    isNotStandard: f !== Cn
                }, {
                    msg: "mobile visibility: " + p,
                    isNotStandard: p !== Cn
                }, {
                    msg: "chat between groups: " + (window.__lc.chat_between_groups ? "yes" : "no")
                }, {
                    msg: "is iframe inline style modified: " + (d ? "yes" : "no"),
                    isNotStandard: d
                }, {
                    msg: "is current domain not allowed by the allowed domains: " + (c ? "yes" : "no"),
                    isNotStandard: c
                }, {
                    msg: "overrides: " + (s.length > 0 ? s.join(",\n") : "none"),
                    isNotStandard: s.length > 0
                }, {
                    msg: "call history: " + (bn.length > 0 ? bn.map((function(e) {
                        return e.name + "(" + e.args.join(", ") + ")"
                    })).join(",\n") : "none"),
                    isNotStandard: bn.length > 0
                }];
            if (!a) return m;
            var h = m.filter((function(e) {
                    return e.isNotStandard
                })),
                v = m.filter((function(e) {
                    return !e.isNotStandard
                })),
                g = [].concat(h, v);
            return -1 !== s.indexOf("console.log") ? g.map((function(e) {
                return e.msg
            })).join("\n\n") : ((i = console).log.apply(i, [g.map((function(e) {
                return "%c" + e.msg
            })).join("\n\n")].concat(g.map((function(e) {
                return e.isNotStandard ? "color: red;" : ""
            })))), "")
        }
    }

    function xn(e) {
        for (var n = arguments.length, t = Array(n > 1 ? n - 1 : 0), r = 1; n > r; r++) t[r - 1] = arguments[r];
        return function() {
            "function" == typeof e && e.apply(void 0, t)
        }
    }

    function An(e, n, t) {
        return fe(le(e, t), ce((function(e) {
            return gn(xn(n[t], e))
        })))
    }

    function On(e) {
        return L(e.filter(Boolean).map((function(e) {
            var n;
            return (n = {})[e.name] = e.value + "", n
        })))
    }

    function Tn(e, n) {
        var t, r = l((function(e) {
            return !e[1]
        }), z((t = n, ["name", "email"].reduce((function(e, n) {
            return i(n, t) && (e[n] = t[n]), e
        }), {}))));
        if (r) {
            var o = r[1];
            console.error("[LiveChatWidget] Customer " + r[0] + " cannot be set to " + ("" === o ? "empty string" : o))
        } else e.call("storeMethod", ["requestUpdateUser", He(e.state), n])
    }

    function Pn(e, n) {
        e.call("storeMethod", ["requestSetUserProperties", He(e.state), n])
    }

    function zn(e) {
        return null != e ? e + "" : null
    }
    var Sn = function(e, n) {
        return We(e, "visibility").state === n
    };

    function jn(e, n) {
        return ie((t = function() {
            return fe(le(e, "state_diff"), me((function() {
                return e.state
            })), pe(e.state), me(n), ae(O), xe(le(e, "unbind")))
        }, function(e, n) {
            if (0 === e) {
                var r = !1;
                n(0, (function(e) {
                    2 === e && (r = !0)
                })), n(1, t()), r || n(2)
            }
        }));
        var t
    }
    var Mn = function(e, n) {
        return fe(jn(e, n), Ce(1))
    };

    function Nn(e) {
        return fe(jn(e, (function(e) {
            return We(e, "availability")
        })), ue(b))
    }
    var Dn = "liveChatChatId";

    function qn(e) {
        return fe(jn(e, (function(e) {
            return Ne(e, Dn).active
        })), Ce(1), he((function(n) {
            return n ? fe(jn(e, (function(e) {
                return Ne(e, Dn).properties.currentAgent
            })), ue(Boolean), me((function() {
                return n
            })), Le(1)) : _e(n)
        })))
    }

    function Fn(e, n) {
        return fe(le(e, "state_diff"), me((function() {
            return We(e.state, "readyState")
        })), ue((function(e) {
            return e === n
        })), Le(1), ke)
    }
    var Hn = "not_ready",
        Bn = "ready",
        Wn = "bootstrapped",
        Rn = Object.freeze({
            __proto__: null,
            FRA_A: "fra-a",
            FRA_B: "fra-b",
            FRA: "fra",
            DAL: "dal"
        });

    function Vn(e, n) {
        return fe(Fn(e, Bn), he(n))
    }

    function Gn(e, n) {
        return fe(Fn(e, Wn), he(n))
    }

    function Un(e, n) {
        return fe(jn(e, (function(e) {
            return We(e, "invitation")
        })), me((function(e) {
            return e[n]
        })), ue(b), we, ue((function(e) {
            return e[1].length > e[0].length
        })), me((function(e) {
            return k(e[1])
        })))
    }
    var Jn = function(e) {
            return e.actingAsDirectLink || e.isInCustomContainer
        },
        Yn = "liveChatChatId",
        Xn = function(e) {
            for (var n = arguments.length, t = Array(n > 1 ? n - 1 : 0), r = 1; n > r; r++) t[r - 1] = arguments[r];
            return gn(xn.apply(void 0, [e].concat(t)))
        };

    function $n(e, n, t) {
        window.LC_API = window.LC_API || {};
        var r = window.LC_API;
        fe(function(e) {
            return fe(jn(e, (function(e) {
                return Sn(e, "maximized")
            })), ue(b))
        }(e), ce((function() {
            return Xn(r.on_chat_window_opened)
        }))), fe(Gn(e, (function() {
            return function(e) {
                return fe(jn(e, (function(e) {
                    return Sn(e, "minimized")
                })), Ce(1), ue(b))
            }(e)
        })), ce((function() {
            return Xn(r.on_chat_window_minimized)
        }))), fe(function(e) {
            return fe(jn(e, (function(e) {
                return Sn(e, "hidden")
            })), ue(b))
        }(e), ce((function() {
            return Xn(r.on_chat_window_hidden)
        }))), fe(Nn(e), ce((function(e) {
            return Xn(r.on_chat_state_changed, {
                state: "online" === e ? "online_for_chat" : "offline"
            })
        }))), fe(Gn(e, (function() {
            return qn(e)
        })), ue(b), ce((function() {
            return Xn(r.on_chat_started, {
                agent_name: Fe(e.state, Ne(e.state, Yn).properties.currentAgent).name
            })
        }))), fe(Gn(e, (function() {
            return qn(e)
        })), ue(y), ce((function() {
            return Xn(r.on_chat_ended)
        }))), fe(Gn(e, (function() {
            return le(e, "on_message")
        })), ce((function(e) {
            return Xn(r.on_message, e)
        }))), fe(le(e, "widget_resize"), ce((function(e) {
            return Xn(r.on_widget_resize, e.size)
        }))), fe(function(e) {
            return fe(le(e, "add_event"), ue((function(e) {
                return e.event.properties.invitation
            })), me((function(n) {
                var t = n.event;
                return {
                    event: t,
                    author: Fe(e.state, t.author)
                }
            })))
        }(e), ce((function(e) {
            var n = e.author,
                t = e.event,
                i = t.properties;
            Xn(r.on_message, {
                text: i.text,
                timestamp: t.timestamp,
                invitation: !0,
                user_type: "agent",
                agent_login: n.id,
                agent_name: n.name,
                received_first_time: i.receivedFirstTime
            })
        }))), An(e, r, "on_postchat_survey_submitted"), An(e, r, "on_prechat_survey_submitted"), An(e, r, "on_rating_comment_submitted"), An(e, r, "on_rating_submitted"), An(e, r, "on_ticket_created"), r.set_custom_variables = function(n) {
            kn("LC_API.set_custom_variables", n), Pn(e, On(n))
        }, r.update_custom_variables = function(n) {
            kn("LC_API.update_custom_variables", n), Tn(e, {
                properties: On(n)
            })
        }, r.set_visitor_name = function(n) {
            kn("LC_API.set_visitor_name", n), Tn(e, {
                name: zn(n)
            })
        }, r.set_visitor_email = function(n) {
            kn("LC_API.set_visitor_email", n), Tn(e, {
                email: zn(n)
            })
        }, r.open_chat_window = r.show_full_view = r.open_mobile_window = function() {
            kn("LC_API.open_chat_window"), e.maximize()
        }, r.minimize_chat_window = function() {
            kn("LC_API.minimize_chat_window"), Jn(n) || e.minimize()
        }, r.hide_eye_catcher = function() {
            kn("LC_API.hide_eye_catcher"), e.call("hideEyeCatcher")
        }, r.hide_chat_window = function() {
            kn("LC_API.hide_chat_window"), Jn(n) || e.hide()
        }, r.agents_are_available = function() {
            return kn("LC_API.agents_are_available"), "online" === We(e.state, "availability")
        }, r.chat_window_maximized = function() {
            return kn("LC_API.chat_window_maximized"), Sn(e.state, "maximized")
        }, r.chat_window_minimized = function() {
            return kn("LC_API.chat_window_minimized"), Sn(e.state, "minimized")
        }, r.chat_window_hidden = function() {
            return kn("LC_API.chat_window_hidden"), Sn(e.state, "hidden")
        }, r.visitor_queued = function() {
            return kn("LC_API.visitor_queued"), Ne(e.state, Yn).properties.queued
        }, r.chat_running = function() {
            return kn("LC_API.chat_running"), Ne(e.state, Yn).active
        }, r.visitor_engaged = function() {
            return kn("LC_API.visitor_engaged"), r.visitor_queued() || r.chat_running() || !!Ne(e.state, Yn).properties.fakeAgentMessageId
        }, r.get_window_type = function() {
            return kn("LC_API.get_window_type"), "embedded"
        }, r.close_chat = function() {
            kn("LC_API.close_chat"), e.call("storeMethod", ["requestUpdateChat", Yn, {
                active: !1
            }])
        }, r.diagnose = En(e, n, t), r.get_last_visit_timestamp = function() {
            return We(e.state).clientLastVisitTimestamp
        }, r.get_visits_number = function() {
            return We(e.state).clientVisitNumber
        }, r.get_page_views_number = function() {
            return We(e.state).clientPageViewsCount
        }, r.get_chats_number = function() {
            return We(e.state).clientChatNumber
        }, r.get_visitor_id = function() {
            return qe(e.state).serverId
        }, r.get_chat_id = function() {
            return Ne(e.state, Yn).serverId
        }, r.trigger_sales_tracker = function(e, n) {
            var t = a(n) ? n : [];
            "string" == typeof e && "" !== e && r.set_custom_variables([].concat(t, [{
                name: "__sales_tracker_" + e,
                value: "1"
            }]))
        }, r.scriptTagVersion = function() {
            return "LiveChatWidget" in window ? window.LiveChatWidget._v : "1.0"
        }, ["on", "off", "call", "get"].forEach((function(e) {
            r[e] = function() {
                var n = "LiveChatWidget" in window ? 'call it on the new "LiveChatWidget" global object.' : "upgrade your snippet code. You can do it by going to: https://my.livechatinc.com/settings/code";
                console.warn('[LiveChatWidget] In order to use "' + e + '" function you need to ' + n)
            }
        })), r.disable_sounds = x
    }
    var Kn = {
            handler: null,
            setHandler: function(e) {
                this.handler = e
            },
            navigate: function(e) {
                var n = this;
                gn((function() {
                    window.location.origin === G(e) && "function" == typeof n.handler ? n.handler(K(e)) : window.open(e, "_blank")
                }))
            }
        },
        Qn = "liveChatChatId",
        Zn = function(e) {
            var t, r = e.trackerId,
                i = e.variables;
            return n({}, c(String, void 0 === i ? {} : i), ((t = {})["__sales_tracker_" + r] = "1", t))
        },
        et = function(e) {
            var t = e.id;
            return n({
                uniqueId: e.uniqueId
            }, t && {
                id: t
            })
        },
        nt = function(e, n) {
            return g(null, "properties", f((function(e) {
                return e.properties.uniqueId === n
            }), Me(e.state, Qn)))
        },
        tt = function(e) {
            return n = function(e) {
                if ("call" !== e[0]) return "other";
                switch (e[1][0]) {
                    case "set_customer_email":
                        return "email";
                    case "set_customer_name":
                        return "name";
                    case "set_session_variables":
                    case "trigger_sales_tracker":
                    case "update_session_variables":
                        return "fields";
                    case "destroy":
                    case "hide":
                    case "maximize":
                    case "minimize":
                        return "visibility"
                }
            }, Object.keys(t = e).reduce((function(e, r) {
                var i = t[r],
                    o = n(i);
                return e[o] = e[o] || [], e[o].push(i), e
            }), {});
            var n, t
        };

    function rt(e, t, r) {
        var i, o = $e(),
            a = window.LiveChatWidget || window.OpenWidget,
            u = function(e, n) {
                var t;
                return (t = {
                    get: w,
                    call: y,
                    on: h,
                    once: v,
                    off: o.off
                })[e].apply(t, n)
            },
            d = function(e, n) {
                return gn((function() {
                    return o.emit(e, n)
                }))
            },
            f = function(e) {
                void 0 === e && (e = []);
                var n = k(e);
                if (n) {
                    var t = n[1];
                    y(t[0], t[1])
                }
            },
            p = tt(a._q);

        function m(n, t, r) {
            switch (t) {
                case "new_event":
                case "form_submitted":
                case "greeting_hidden":
                case "rating_submitted":
                case "visibility_changed":
                case "greeting_displayed":
                case "availability_changed":
                case "customer_status_changed":
                case "rich_message_button_clicked":
                    return void o[n](t, r);
                case "ready":
                    return void(We(e.state, "readyState") !== Hn ? gn((function() {
                        return r({
                            state: g("state"),
                            customerData: g("customer_data")
                        })
                    })) : o[n](t, r));
                default:
                    return void console.error('[LiveChatWidget] callback "' + t + '" does not exist.')
            }
        }

        function h(e, n) {
            kn("LiveChatWidget.on", "'" + e + "'", n), m("on", e, n)
        }

        function v(e, n) {
            kn("LiveChatWidget.once", "'" + e + "'", n), m("once", e, n)
        }

        function g(n) {
            switch (n) {
                case "state":
                    var t = We(e.state);
                    return {
                        availability: t.availability,
                        visibility: t.visibility.state
                    };
                case "chat_data":
                    var r = Ne(e.state, Qn),
                        i = r.properties;
                    return {
                        chatId: r.serverId || null,
                        threadId: (r.active || i.ended) && i.lastThread || null
                    };
                case "customer_data":
                    var o = qe(e.state),
                        a = o.serverId,
                        u = o.name,
                        c = o.email,
                        d = o.properties,
                        f = We(e.state).isReturning,
                        p = Ne(e.state, Qn),
                        m = p.active,
                        h = p.properties,
                        v = h.queued,
                        g = h.fakeAgentMessageId,
                        _ = l((function(e) {
                            return e.id === g
                        }), p.events);
                    return {
                        name: u,
                        email: c,
                        isReturning: f,
                        sessionVariables: d,
                        id: a,
                        status: v ? "queued" : m ? "chatting" : _ && _.properties.invitation ? "invited" : "browsing"
                    };
                case "features":
                    return s(We(e.state).config.features);
                default:
                    return void console.error('[LiveChatWidget] property "' + n + '" not exists.')
            }
        }

        function w(e) {
            return kn("LiveChatWidget.get", "'" + e + "'"), g(e)
        }

        function y(n, r) {
            switch (kn.apply(void 0, ["LiveChatWidget.call", "'" + n + "'"].concat(r)), n) {
                case "hide":
                case "maximize":
                case "minimize":
                    if (Jn(t)) return;
                    return void e[n](r);
                case "destroy":
                    return e.kill(), delete window.__lc_inited, delete window.LC_API, void delete window.LiveChatWidget;
                case "set_session_variables":
                    return void Pn(e, c(String, r));
                case "set_customer_name":
                    return void Tn(e, {
                        name: zn(r)
                    });
                case "set_customer_email":
                    return void Tn(e, {
                        email: zn(r)
                    });
                case "update_session_variables":
                    return void Tn(e, {
                        properties: c(String, r)
                    });
                case "trigger_sales_tracker":
                    return void Pn(e, Zn(r));
                case "hide_greeting":
                    return void e.call("hideGreeting");
                case "set_navigation_handler":
                    return void Kn.setHandler(r);
                default:
                    return void console.error('[LiveChatWidget] method "' + n + '" not exists.')
            }
        }
        void 0 === (i = p.other) && (i = []), i.forEach((function(e) {
                u(e[0], e[1])
            })), f(p.visibility), f(p.name), f(p.email),
            function(e) {
                var t, r = (void 0 === (t = e) && (t = []), t.reduce((function(e, t) {
                        var r = t[1],
                            i = r[1];
                        switch (r[0]) {
                            case "set_session_variables":
                                return e.mode = "set", e.properties = i, e;
                            case "trigger_sales_tracker":
                                return e.mode = "set", e.properties = Zn(i), e;
                            case "update_session_variables":
                                return "none" === e.mode && (e.mode = "update"), e.properties = n({}, e.properties, i), e
                        }
                    }), {
                        mode: "none"
                    })),
                    i = r.mode;
                "none" !== i && y(i + "_session_variables", r.properties)
            }(p.fields), a._q = [], a._h = u, a.scriptTagVersion = function() {
                return a._v
            }, a.diagnose = En(e, t, r), fe(Fn(e, Wn), ce((function() {
                var e;
                e = function(e) {
                    return "function" == typeof e && gn((function() {
                        return e(a)
                    }))
                }, Array.isArray(window.__lc_onready) && (window.__lc_onready.forEach(e), window.__lc_onready = {
                    push: e
                }), d("ready", {
                    state: g("state"),
                    customerData: g("customer_data")
                })
            }))), fe(Gn(e, (function() {
                return Nn(e)
            })), ce((function(e) {
                return d("availability_changed", {
                    availability: e
                })
            }))), fe(Gn(e, (function() {
                return Mn(e, (function() {
                    return g("state").visibility
                }))
            })), ce((function(e) {
                d("visibility_changed", {
                    visibility: e
                })
            }))), fe(Gn(e, (function() {
                return Mn(e, (function() {
                    return g("customer_data").status
                }))
            })), ce((function(e) {
                return d("customer_status_changed", {
                    status: e
                })
            }))), fe(Gn(e, (function() {
                return Un(e, "hiddenIds")
            })), me((function(n) {
                return nt(e, n)
            })), ue(b), ce((function(e) {
                return d("greeting_hidden", et(e))
            }))), fe(Gn(e, (function() {
                return Un(e, "displayedIds")
            })), me((function(n) {
                return nt(e, n)
            })), ue(b), ce((function(e) {
                return d("greeting_displayed", et(e))
            }))), fe(le(e, "on_rating_submitted"), ce((function(e) {
                return d("rating_submitted", e)
            }))), fe(de(le(e, "add_event"), le(e, "send_event")), ue((function(e) {
                return _(e.event.type, ["message", "emoji", "rich_message", "file"])
            })), me((function(t) {
                var r = t.event,
                    i = r.timestamp,
                    o = r.properties,
                    a = Fe(e.state, r.author),
                    u = !0 === o.invitation;
                return n({
                    timestamp: i,
                    type: r.type,
                    author: {
                        id: a.serverId,
                        type: a.id === He(e.state) ? "customer" : "agent"
                    }
                }, u && {
                    greeting: et(o)
                })
            })), ce((function(e) {
                return d("new_event", e)
            }))), fe(de(fe(le(e, "send_event"), me((function(e) {
                var n = e.event,
                    t = n.type,
                    r = n.properties;
                if ("rich_message_postback" === t) return {
                    postbackId: "postback" in r ? r.postback.id : r.id,
                    eventId: r.eventId
                };
                if ("message" === t && r.triggeredBy) {
                    var i = r.triggeredBy;
                    return {
                        postbackId: i.button.postbackId,
                        eventId: i.event
                    }
                }
                return null
            })), ue(b)), fe(le(e, "rich_greeting_button_clicked"), me((function(e) {
                var n = e.event;
                return {
                    eventId: n.id,
                    postbackId: e.button.postbackId,
                    greeting: et(n.properties)
                }
            })))), ce((function(e) {
                return d("rich_message_button_clicked", e)
            }))), fe(de(fe(le(e, "on_ticket_created"), me((function() {
                return "ticket"
            }))), fe(le(e, "on_prechat_survey_submitted"), me((function() {
                return "prechat"
            }))), fe(le(e, "on_postchat_survey_submitted"), me((function() {
                return "postchat"
            })))), ce((function(e) {
                return d("form_submitted", {
                    type: e
                })
            })))
    }
    var it = function() {
            return window.GoogleAnalyticsObject || "ga"
        },
        ot = function(e) {
            var n = e.event,
                t = e.label,
                r = e.nonInteraction,
                i = e.trackerName,
                o = window[it()];
            o && "function" == typeof o && o([i, "send"].filter(Boolean).join("."), {
                hitType: "event",
                eventCategory: "LiveChat",
                eventAction: n,
                eventLabel: t,
                nonInteraction: r
            })
        },
        at = {
            ga: ot,
            gaAll: function(e) {
                var t = window[it()];
                if (t && "function" == typeof t.getAll) {
                    var r = t.getAll();
                    a(r) && r.forEach((function(t) {
                        ot(n({}, e, {
                            trackerName: t && "function" == typeof t.get ? t.get("name") : null
                        }))
                    }))
                }
            },
            gaq: function(e) {
                var n = window._gaq;
                n && "function" == typeof n.push && n.push(["_trackEvent", "LiveChat", e.event, e.label, null, e.nonInteraction])
            },
            gtm: function(e) {
                var n = window.dataLayer;
                n && "function" == typeof n.push && n.push({
                    event: "LiveChat",
                    eventCategory: "LiveChat",
                    eventAction: e.event,
                    eventLabel: e.label,
                    nonInteraction: e.nonInteraction
                })
            },
            pageTracker: function(e) {
                var n = window.pageTracker;
                n && "function" == typeof n._trackEvent && n._trackEvent("LiveChat", e.event, e.label, null, e.nonInteraction)
            },
            urchinTracker: function(e) {
                var n = window.urchinTracker;
                n && "function" == typeof n && n(e.event)
            },
            gtag: function(e) {
                var n = window.gtag;
                n && "function" == typeof n && n("event", e.event, {
                    event_category: "LiveChat",
                    event_label: e.label,
                    non_interaction: e.nonInteraction
                })
            }
        },
        ut = function(e) {
            var n = e.version,
                t = e.sendToAll;
            if (n && "function" == typeof at[n]) return t && "ga" === n ? "gaAll" : n;
            if ("object" == typeof window.pageTracker && "function" == typeof window.pageTracker._trackEvent) return "pageTracker";
            if ("function" == typeof window.urchinTracker) return "urchinTracker";
            if ("function" == typeof window.gtag) return "gtag";
            if (!e.omitGtm && "object" == typeof window.dataLayer && "function" == typeof window.dataLayer.push) return "gtm";
            if ("object" == typeof window._gaq) return "gaq";
            if (window.GoogleAnalyticsObject && "string" == typeof window.GoogleAnalyticsObject) return t ? "gaAll" : "ga";
            if ("function" == typeof window.ga) {
                var r = !1;
                if (window.ga((function(e) {
                        r = "object" == typeof e
                    })), r) return t ? "gaAll" : "ga"
            }
            return null
        },
        ct = {
            Chat: "LiveChat Chat started",
            "Automated greeting": "LiveChat Automated greeting displayed",
            "Ticket form": "LiveChat Ticket form displayed",
            "Ticket form filled in": "LiveChat Ticket form filled in",
            "Pre-chat survey": "LiveChat Pre-chat survey displayed",
            "Pre-chat survey filled in": "LiveChat Pre-chat survey filled in",
            "Post-chat survey": "LiveChat Post-chat survey displayed",
            "Post-chat survey filled in": "LiveChat Post-chat survey filled in"
        },
        st = function() {
            return window.mixpanel && "function" == typeof window.mixpanel.track && "function" == typeof window.mixpanel.register
        },
        dt = {
            googleAnalytics: function(e) {
                var n = e.trackerName;
                return n ? at[n] : null
            },
            kissmetrics: function() {
                return null
            },
            mixpanel: function() {
                if (!st()) return null;
                return function(e) {
                    var n = e.event,
                        t = e.eventData,
                        r = e.persistentData;
                    if (st()) {
                        var i = window.mixpanel;
                        r && (i.register(r), !st()) || n in ct && i.track(ct[n], t)
                    }
                }
            }
        },
        lt = function(e, t) {
            var r = t.analytics,
                i = Object.keys(r).filter((function(e) {
                    return r[e].enabled
                })).map((function(e) {
                    var n = r[e],
                        t = dt[e];
                    try {
                        return t(n)
                    } catch (e) {
                        return _n(e), null
                    }
                })).filter(Boolean);
            if (0 !== i.length) {
                var o = function(t, r) {
                    var o = void 0 === r ? {} : r,
                        a = o.group,
                        u = void 0 === a ? We(e.state, "group") : a,
                        c = o.nonInteraction,
                        s = void 0 !== c && c,
                        d = o.eventData,
                        l = void 0 === d ? {} : d,
                        f = o.persistentData,
                        p = void 0 === f ? null : f,
                        m = o.useDataAsLabel,
                        h = 0 !== u ? "Group ID: " + u : "(no group)",
                        v = void 0 !== m && m ? z(l).map((function(e) {
                            return e[0] + ": " + e[1]
                        })).join(", ") : h;
                    i.forEach((function(e) {
                        try {
                            e({
                                event: t,
                                nonInteraction: s,
                                label: v,
                                eventData: n({}, l, {
                                    group: h
                                }),
                                persistentData: p
                            })
                        } catch (e) {
                            _n(e)
                        }
                    }))
                };
                fe(jn(e, (function(e) {
                    return We(e, "readyState")
                })), ue((function(e) {
                    return e === Bn
                })), Le(1), he((function() {
                    return qn(e)
                })), ue(Boolean), ce((function() {
                    var n = qe(e.state);
                    o("Chat", {
                        eventData: {
                            email: n.email,
                            name: n.name
                        },
                        persistentData: {
                            "performed chat": !0
                        }
                    })
                }))), e.on("add_event", (function(e) {
                    var n = e.event.properties;
                    n.invitation && n.receivedFirstTime && o("Automated greeting", {
                        nonInteraction: !0
                    })
                })), e.on("on_chat_booster_launched", (function(e) {
                    var n = e.title;
                    o("Chat Booster Launched: " + n, {
                        eventData: {
                            appId: e.id,
                            title: n
                        }
                    })
                })), e.on("on_prechat_survey_submitted", (function() {
                    o("Pre-chat survey filled in")
                })), e.on("on_postchat_survey_submitted", (function() {
                    o("Post-chat survey filled in")
                })), e.on("on_ticket_created", (function(e) {
                    o("Ticket form filled in", {
                        eventData: {
                            email: e.visitor_email
                        }
                    })
                })), e.on("rich_greeting_button_clicked", (function(e) {
                    o("Rich greeting button clicked", {
                        eventData: {
                            buttonText: e.button.text,
                            greetingId: e.event.properties.id
                        },
                        useDataAsLabel: !0
                    })
                })), ["prechat", "postchat", "ticket", "offline"].forEach((function(n) {
                    var t;
                    fe(de(le(e, "set_default_view"), le(e, "set_current_view")), ue((function(e) {
                        return e.viewInfo && "Chat" === e.viewInfo.view && e.viewInfo.default === n
                    })), xe(le(e, "unbind")), (t = function() {
                        var t, r, i, o, a = {
                                prechat: ["on_prechat_survey_submitted", "Pre-chat survey"],
                                postchat: ["on_postchat_survey_submitted", "Post-chat survey"],
                                ticket: ["on_ticket_created", "Ticket form"],
                                offline: ["on_ticket_created", "Ticket form"]
                            }[n],
                            u = a[0];
                        return fe(function() {
                            for (var e = arguments.length, n = Array(e), t = 0; e > t; t++) n[t] = arguments[t];
                            return function(e, t) {
                                if (0 === e) {
                                    var r = n.length;
                                    if (0 === r) return t(0, (function() {})), void t(2);
                                    var i, o = 0,
                                        a = function(e, n) {
                                            i(e, n)
                                        };
                                    ! function e() {
                                        o !== r ? n[o](0, (function(n, r) {
                                            0 === n ? (i = r, 0 === o ? t(0, a) : i(1)) : 2 === n && r ? t(2, r) : 2 === n ? (o++, e()) : t(n, r)
                                        })) : t(2)
                                    }()
                                }
                            }
                        }(_e(a[1]), ge), (t = fe(jn(e, (function(e) {
                            return Sn(e, "maximized")
                        })), ue(Boolean)), o = void 0 === (i = (void 0 === r ? {} : r).size) ? 100 : i, function(e) {
                            return function(n, r) {
                                var i = [];
                                if (0 === n) {
                                    var a, u, c = !1;
                                    e(0, (function(e, n) {
                                        if (0 === e && (a = n, t(0, (function(e, n) {
                                                if (0 === e)(u = n)(1);
                                                else if (1 === e) {
                                                    c = !0, u(2);
                                                    var t = i.slice();
                                                    i.length = 0, t.forEach((function(e) {
                                                        return r(1, e)
                                                    }))
                                                }
                                            }))), 1 === e) return c ? void r(1, n) : (i.push(n), i.length > o && i.shift(), void a(1));
                                        r(e, n)
                                    }))
                                }
                            }
                        }), xe(le(e, u)))
                    }, function(e) {
                        return function(n, r) {
                            if (0 === n) {
                                var i, o = null,
                                    a = function(e, n) {
                                        if (0 !== e) return 1 === e ? (r(1, n), void o(1)) : void(2 === e && (o = null));
                                        (o = n)(1)
                                    },
                                    u = function(e, n) {
                                        2 === e && null !== o && o(2, n), i(e, n)
                                    };
                                e(0, (function(e, n) {
                                    if (0 === e) return i = n, void r(0, u);
                                    if (1 !== e) {
                                        if (2 === e) {
                                            if (r(2, n), null === o) return;
                                            o(2, n)
                                        }
                                    } else {
                                        if (null !== o) return;
                                        t(n)(0, a)
                                    }
                                }))
                            }
                        }
                    }), ce((function(e) {
                        o(e)
                    })))
                }))
            }
        },
        ft = /\.(\w+)$/i,
        pt = new Audio,
        mt = {
            mp3: "audio/mpeg",
            ogg: "audio/ogg"
        },
        ht = function(e) {
            var n, t = (n = e.match(ft)) ? n[1].toLowerCase() : "";
            return t in mt && "" !== pt.canPlayType(mt[t])
        },
        vt = function(n) {
            return new e((function(e, t) {
                var r = new Audio(n);
                r.onloadeddata = function() {
                    e(r)
                }, r.onerror = t
            }))
        },
        gt = function(n) {
            var t, r = n.play();
            return (t = r) && "function" == typeof t.then ? r : e.resolve()
        },
        _t = function(e) {
            return "function" == typeof e.start && "function" == typeof e.stop
        },
        wt = function(e) {
            _t(e) ? e.start(0) : e.noteOn(0)
        },
        yt = function() {
            var n = new(window.AudioContext || window.webkitAudioContext),
                t = !0,
                r = [],
                i = function(t) {
                    return new e((function(e, r) {
                        n.decodeAudioData(t, e, r)
                    }))
                },
                o = function(t) {
                    return {
                        play: function() {
                            var r = n.createBufferSource();
                            return r.connect(n.destination), r.buffer = t, {
                                playback: new e((function(e, t) {
                                    if (r.onended = function() {
                                            return e()
                                        }, wt(r), "running" !== n.state) {
                                        var i = Error("Playback failed, AudioContext is in incorrect state '" + n.state + "'");
                                        i.name = "PlaybackError", t(i)
                                    }
                                })),
                                stop: function() {
                                    ! function(e) {
                                        _t(e) ? e.stop(0) : e.noteOff(0)
                                    }(r)
                                }
                            }
                        }
                    }
                };
            return {
                preload: function(n) {
                    return function(n) {
                        return new e((function(e, t) {
                            var r = new XMLHttpRequest;
                            r.onload = function() {
                                e(r.response)
                            }, r.onerror = t, r.open("GET", n), r.responseType = "arraybuffer", r.send()
                        }))
                    }(n).then(i).then(o)
                },
                playSound: function(e) {
                    var n = e.play();
                    return t && r.push(n), n.playback
                },
                unlock: function() {
                    return new e((function(e) {
                        document.addEventListener("click", (function i() {
                            var o, a;
                            document.removeEventListener("click", i, !0), t && (r.forEach((function(e) {
                                e.stop()
                            })), r = [], t = !1), n.resume(), o = n.createBuffer(1, 1, 22050), (a = n.createBufferSource()).buffer = o, a.connect(n.destination), wt(a), e()
                        }), !0)
                    }))
                }
            }
        },
        bt = function() {
            return "function" == typeof window.webkitAudioContext ? (n = yt(), {
                play: function(e) {
                    var r = t(e).then(n.playSound);
                    return r.catch(x), r
                },
                preload: t = E((function(e) {
                    var t = n.preload(e);
                    return t.catch(x), t
                })),
                unlock: function() {
                    return n.unlock()
                }
            }) : function() {
                var n = E(vt);
                return {
                    play: function(e) {
                        return n(e).then(gt)
                    },
                    preload: n,
                    unlock: function() {
                        return e.resolve()
                    }
                }
            }();
            var n, t
        },
        kt = function(e) {
            return Object.keys(e).reduce((function(n, t) {
                var r, i = l((function(e) {
                    return ht(e)
                }), a(r = e[t]) ? r : [r]);
                return n[t] = i, n
            }), {})
        },
        Ct = "new_message",
        It = function() {
            var e, n, t, r, i = ((e = {}).new_message = ["https://cdn.livechatinc.com/widget/static/media/new_message.34190d36.ogg", "https://cdn.livechatinc.com/widget/static/media/new_message.f3efb3d2.mp3"], n = e, t = bt(), r = kt(n), {
                play: function(e) {
                    t.play(r[e]).then(x, x)
                },
                preload: function(e) {
                    t.preload(r[e]).then(x, x)
                },
                unlock: function() {
                    return t.unlock()
                }
            });
            return i.unlock().then((function() {
                return e = 2e3, n = function(e) {
                        i.play(e)
                    }, t = 0,
                    function() {
                        var r = Date.now();
                        e > r - t || (t = Date.now(), n.apply(void 0, arguments))
                    };
                var e, n, t
            }))
        },
        Lt = function(e, n) {
            return void 0 === n && (n = !1), n && e.__unsafeProperties.group.hasCustomMobileSettings
        },
        Et = function(e, n) {
            var t = e.__unsafeProperties.group;
            return Lt(e, n) ? t.screenPositionOnMobile : t.screenPosition
        },
        xt = function(e, n) {
            var t = e.__unsafeProperties.group;
            return Lt(e, n) ? {
                x: t.offsetXOnMobile,
                y: t.offsetYOnMobile
            } : {
                x: t.offsetX,
                y: t.offsetY
            }
        },
        At = function(e) {
            return !!e && /native code/.test(e + "")
        },
        Ot = function() {
            return _(navigator.platform, ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"]) && _("Version/15", navigator.userAgent)
        },
        Tt = function() {
            return /mobile/gi.test(navigator.userAgent) && !("MacIntel" === navigator.platform && _("iPad", navigator.userAgent))
        },
        Pt = function() {
            return _("Chrome", navigator.userAgent)
        },
        zt = function() {
            return /Firefox/.test(navigator.userAgent)
        },
        St = function(e, n) {
            var t = function() {
                    n() || j(an, e)
                },
                r = function() {
                    n() || j(un, e)
                };
            if ("onbeforeprint" in window) window.addEventListener("beforeprint", t), window.addEventListener("afterprint", r);
            else if (At(window.matchMedia)) {
                var i = window.matchMedia("print");
                i && i.addListener((function(e) {
                    e.matches ? t() : r()
                }))
            }
        },
        jt = function(e, t, r) {
            var i = t.__unsafeProperties.group.eyeCatcher;
            if (i.enabled && ! function(e, n) {
                    var t = e.__unsafeProperties.group;
                    return Lt(e, n) ? t.disabledMinimizedOnMobile : t.disabledMinimized
                }(t)) {
                var o, a, u = function(e) {
                        var n = We(e);
                        return n.eyeCatcher.hidden || "minimized" !== n.visibility.state || "online" !== n.availability || n.readyState === Hn
                    },
                    c = function() {
                        o && (F(o), o = null), clearTimeout(a)
                    },
                    s = function() {
                        var o, a = H("div", sn),
                            s = Et(t);
                        j(((o = {
                            bottom: i.y + "px"
                        })[s] = i.x + "px", o), a);
                        var d, l = H("div", dn);
                        15 > i.x && "right" === s && j(((d = {})[s] = 10 - i.x + "px", d), l);
                        l.innerHTML = "&times;";
                        var f = H("div", ln),
                            p = n({}, fn, {
                                src: i.src,
                                alt: r.embedded_chat_now
                            });
                        i.srcset && (p.srcset = z(i.srcset).map((function(e) {
                            return e[1] + " " + e[0]
                        })).join(", "));
                        var m = H("img", p);
                        return f.appendChild(m), m.addEventListener("load", (function() {
                            j({
                                width: m.width + "px",
                                height: m.height + "px"
                            }, m)
                        })), m.addEventListener("error", c), a.appendChild(l), a.appendChild(f), St(a, (function() {
                            return u(e.state)
                        })), document.body.appendChild(a), At(window.matchMedia) && window.matchMedia("(hover: none)").matches ? j({
                            display: "block"
                        }, l) : (a.addEventListener("mouseover", (function() {
                            j({
                                display: "block"
                            }, l)
                        })), a.addEventListener("mouseout", (function() {
                            j({
                                display: "none"
                            }, l)
                        }))), a.addEventListener("click", (function(n) {
                            n.stopPropagation(), n.preventDefault(), e.maximize()
                        })), l.addEventListener("mouseover", (function() {
                            j({
                                color: "#444"
                            }, l)
                        })), l.addEventListener("mouseout", (function() {
                            j({
                                color: "#000"
                            }, l)
                        })), l.addEventListener("click", (function(n) {
                            n.preventDefault(), n.stopPropagation(), e.call("hideEyeCatcher")
                        })), a
                    };
                fe(jn(e, u), Ie({
                    next: function(e) {
                        e ? c() : a = setTimeout((function() {
                            o = s()
                        }), 430)
                    },
                    complete: c
                }))
            }
        },
        Mt = function(e) {
            e.innerHTML = ""
        },
        Nt = function(e, n) {
            var t = document.querySelectorAll(".livechat_button"),
                r = _(n.groupId, n.onlineGroupIds || []);
            [].forEach.call(t, (function(t) {
                var i = t.getAttribute("data-id"),
                    o = l((function(e) {
                        return e.id === i
                    }), n.buttons);
                if (o) {
                    var a = g("#", "0.href", t);
                    "image" === o.type ? function(e, n) {
                        var t = e.text,
                            r = e.url,
                            i = e.src;
                        Mt(n);
                        var o = H("a", {
                                href: r
                            }),
                            a = H("img", {
                                src: i,
                                alt: t,
                                title: t
                            });
                        o.appendChild(a), n.appendChild(o)
                    }({
                        url: a,
                        text: t.textContent,
                        src: r ? o.onlineValue : o.offlineValue
                    }, t) : function(e, n) {
                        var t = e.text,
                            r = e.url;
                        Mt(n);
                        var i = H("a", {
                            href: r
                        });
                        i.appendChild(document.createTextNode(t)), n.appendChild(i)
                    }({
                        url: a,
                        text: r ? o.onlineValue : o.offlineValue
                    }, t), t.children[0].addEventListener("click", (function(n) {
                        n.preventDefault(), e.maximize()
                    }))
                }
            }))
        },
        Dt = function(e) {
            return e.replace(/\?+$/, "")
        },
        qt = function() {
            return {
                title: document.title,
                url: Dt(document.location + ""),
                referrer: document.referrer
            }
        },
        Ft = function(e) {
            var n;
            fe((n = 2e3, function(e, t) {
                if (0 === e) {
                    var r = 0,
                        i = setInterval((function() {
                            t(1, r++)
                        }), n);
                    t(0, (function(e) {
                        2 === e && clearInterval(i)
                    }))
                }
            }), me(qt), ae((function(e, n) {
                return e.url === n.url
            })), xe(le(e, "unbind")), ce((function(n) {
                e.call("storeMethod", ["setApplicationState", {
                    page: n
                }])
            })))
        };
    var Ht = function(e) {
            fe(Vn(e, (function() {
                return le(e, "add_event")
            })), ue((function(e) {
                var n = e.event;
                return "custom" === n.type && n.properties.customId && -1 !== n.properties.customId.indexOf("cyber-finger-snapshot-request-")
            })), ce((function(n) {
                var t, r = n.event.properties.customId.replace("cyber-finger-snapshot-request-", "");
                try {
                    var i = (t = (void 0)[0], JSON.stringify(t));
                    e.call("storeMethod", ["emit", "send_snapshot", {
                        snapshot: i,
                        requestId: r,
                        screen: {
                            width: window.innerWidth,
                            height: window.innerHeight,
                            scrollY: window.pageYOffset,
                            scrollX: window.pageXOffset
                        }
                    }])
                } catch (e) {}
            })))
        },
        Bt = window.Wix,
        Wt = function() {
            return new e((function(e) {
                Bt.getSiteInfo((function(n) {
                    var t = n.url,
                        r = n.referrer || n.referer || "";
                    n.baseUrl && -1 === t.indexOf(n.baseUrl) && (t = n.baseUrl), e({
                        title: n.pageTitle,
                        referrer: r,
                        url: t
                    })
                }))
            }))
        },
        Rt = function(e) {
            var n, t, r, i;
            fe((n = function() {
                return !!document.hasFocus && document.hasFocus()
            }, t = function(e, t) {
                if (0 === e) {
                    var r = !1;
                    t(0, (function(e) {
                        2 === e && (r = !0)
                    })), t(1, n()), r || t(2)
                }
            }, r = me((function() {
                return !0
            }))(se(window, "focus")), i = me((function() {
                return !1
            }))(se(window, "blur")), de(t, r, i)), xe(le(e, "unbind")), ce((function(n) {
                e.emit("focus", n)
            })))
        },
        Vt = null,
        Gt = !1;

    function Ut() {
        return e = /^Mac/, null != window.navigator && e.test(window.navigator.platform);
        var e
    }

    function Jt(e) {
        Gt = !0,
            function(e) {
                return !(e.metaKey || !Ut() && e.altKey || e.ctrlKey)
            }(e) && (Vt = "keyboard")
    }

    function Yt(e) {
        Vt = "pointer", "mousedown" !== e.type && "pointerdown" !== e.type || (Gt = !0)
    }

    function Xt(e) {
        (function(e) {
            return !(0 !== e.mozInputSource || !e.isTrusted) || 0 === e.detail && !e.pointerType
        })(e) && (Gt = !0, Vt = "virtual")
    }

    function $t(e) {
        e.target !== window && e.target !== document && (Gt || (Vt = "keyboard"), Gt = !1)
    }

    function Kt() {
        Gt = !1
    }
    var Qt = (document.addEventListener("keydown", Jt, !0), document.addEventListener("keyup", Jt, !0), document.addEventListener("click", Xt, !0), window.addEventListener("focus", $t, !0), window.addEventListener("blur", Kt, !1), "undefined" != typeof PointerEvent ? (document.addEventListener("pointerdown", Yt, !0), document.addEventListener("pointermove", Yt, !0), document.addEventListener("pointerup", Yt, !0)) : (document.addEventListener("mousedown", Yt, !0), document.addEventListener("mousemove", Yt, !0), document.addEventListener("mouseup", Yt, !0)), function() {
        document.removeEventListener("keydown", Jt, !0), document.removeEventListener("keyup", Jt, !0), document.removeEventListener("click", Xt, !0), window.removeEventListener("focus", $t, !0), window.removeEventListener("blur", Kt, !1), "undefined" != typeof PointerEvent ? (document.removeEventListener("pointerdown", Yt, !0), document.removeEventListener("pointermove", Yt, !0), document.removeEventListener("pointerup", Yt, !0)) : (document.removeEventListener("mousedown", Yt, !0), document.removeEventListener("mousemove", Yt, !0), document.removeEventListener("mouseup", Yt, !0))
    });

    function Zt(e) {
        if ("Google Inc." === navigator.vendor && "Win32" === navigator.platform) {
            var n, t, r, i = e.frame,
                o = (n = 100, t = function() {
                    j(D(["width"], i), i), requestAnimationFrame((function() {
                        j({
                            width: mn.style.width
                        }, i)
                    }))
                }, function() {
                    clearTimeout(r);
                    for (var e = arguments.length, i = Array(e), o = 0; e > o; o++) i[o] = arguments[o];
                    r = setTimeout.apply(void 0, [t, n].concat(i))
                });
            document.addEventListener("scroll", o);
            e.on("unbind", (function n() {
                e.off("unbind", n), document.removeEventListener("scroll", o)
            }))
        }
    }
    var er = {
            position: Ot() ? "absolute" : "fixed",
            height: Ot() ? "calc(100vh - env(safe-area-inset-bottom))" : "100%",
            width: "100%",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflowY: "hidden"
        },
        nr = function(e) {
            var n = document.querySelector('meta[name="viewport"]') || function() {
                    var e = H("meta", {
                        name: "viewport"
                    });
                    return document.getElementsByTagName("head")[0].appendChild(e), e
                }(),
                t = null,
                r = function() {
                    var e, r = n.content,
                        i = (e = document.body, Object.keys(er).reduce((function(n, t) {
                            return n[t] = e.style[t], n
                        }), {})),
                        o = document.documentElement.scrollTop;
                    return n.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0", j(er, document.body),
                        function() {
                            t = null, j(i, document.body), n.content = r, document.documentElement.scrollTop = o
                        }
                };
            Sn(e.state, "maximized") && (t = r()), fe(jn(e, (function(e) {
                return Sn(e, "maximized")
            })), we, Ie({
                next: function(e) {
                    e[1] ? t = r() : t()
                },
                complete: function() {
                    t && t()
                }
            }))
        },
        tr = Tt(),
        rr = function(e, n) {
            if (e.iframeAddress) return e.iframeAddress;
            if (window.__ow) return "https://cdn.livechatinc.com/widget/openwidget.html";
            var t = "https://secure" + ((1520 === e.licenseId ? "-lc" : "") + ".livechatinc.com");
            return n.region && (t = t.replace("secure", "secure-" + n.region)), t + "/customer/action/open_chat"
        },
        ir = function(e, n, t) {
            var r = !!e.customContainer;
            return {
                page: n,
                license: e.licenseId,
                region: t.region,
                group: t.groupId,
                requestedGroup: e.requestedGroupId,
                customer: e.customer,
                hidden: !(e.actingAsDirectLink || r) && function(e) {
                    var n = e.__unsafeProperties.group;
                    return tr && n.hasCustomMobileSettings ? n.initiallyHiddenOnMobile : n.initiallyHidden
                }(t),
                uniqueGroups: e.uniqueGroups,
                analytics: {
                    googleAnalytics: {
                        enabled: !!t.integrations.analytics,
                        trackerName: ut(e.gaParams)
                    },
                    kissmetrics: {
                        enabled: !!t.integrations.kissmetrics
                    },
                    mixpanel: {
                        enabled: !!t.integrations.mixpanel
                    }
                },
                actingAsDirectLink: e.actingAsDirectLink,
                initMaximized: e.initMaximized,
                isInCustomContainer: r,
                clientLimitExceeded: t.clientLimitExceeded,
                integrationName: e.integrationName,
                iframeAddress: rr(e, t)
            }
        },
        or = function() {
            var e = "lc_get_time_" + h();
            window.performance && "function" == typeof window.performance.mark && window.performance.mark(e);
            var n = performance.getEntriesByName(e)[0].startTime;
            return performance.clearMarks(e), n
        },
        ar = function() {
            if ("undefined" == typeof PerformanceObserver) return null;
            var n = or(),
                t = [],
                r = new PerformanceObserver((function(e) {
                    t.push.apply(t, e.getEntries())
                }));
            r.observe({
                entryTypes: ["longtask"]
            });
            var i = function() {
                var e, r = k(t);
                return r ? (e = r, or() - e.startTime + e.duration) : or() - n
            };
            return {
                disconnect: function() {
                    return r.disconnect()
                },
                getLongTasks: function() {
                    return [].concat(t)
                },
                waitForIdle: function(n) {
                    return new e((function(e) {
                        ! function o() {
                            t.push.apply(t, r.takeRecords());
                            var a = i();
                            n > a ? setTimeout(o, Math.ceil(n - a)) : e()
                        }()
                    }))
                }
            }
        },
        ur = function(n) {
            void 0 === n && (n = "first-contentful-paint");
            var t, r = ar();
            return r ? (t = n, new e((function(e) {
                var n = performance.getEntriesByName(t);
                if (w(n))
                    if ("undefined" != typeof PerformanceObserver) {
                        var r = setTimeout((function() {
                                i.disconnect(), e(null)
                            }), 6e4),
                            i = new PerformanceObserver((function(n) {
                                var o = l((function(e) {
                                    return e.name === t
                                }), n.getEntries());
                                o && (i.disconnect(), clearTimeout(r), e(o))
                            }));
                        i.observe({
                            entryTypes: ["paint"]
                        })
                    } else e(null);
                else e(n[0])
            }))).then((function(e) {
                return e ? r.waitForIdle(5e3).then((function() {
                    return r.disconnect(), r.getLongTasks()
                })) : null
            })) : e.resolve(null)
        },
        cr = function(e) {
            var n = performance.getEntriesByName(e);
            return 1 !== n.length ? null : n[0]
        },
        sr = function(e, n) {
            return e && n ? Math.abs(n.startTime - e.startTime) : null
        },
        dr = function(e) {
            if (!e) return null;
            var n = performance.getEntriesByType("navigation");
            return e.startTime - (w(n) ? performance.timing.domContentLoadedEventStart - performance.timing.navigationStart : n[0].domContentLoadedEventStart)
        },
        lr = function() {
            if (!Math.floor(1e3 * Math.random())) {
                var e = ur().then((function(e) {
                    return e ? T(e.filter((function(e) {
                        return _(".livechatinc.com", e.attribution[0].containerSrc)
                    })).map((function(e) {
                        return e.duration
                    }))) : null
                }));
                return {
                    getLogs: function() {
                        return e.then((function(e) {
                            var n, t = 1 !== (n = performance.getEntriesByType("resource").filter((function(e) {
                                    return /livechatinc\.com\/(.+\/)?tracking.js/.test(e.name)
                                }))).length ? null : n[0],
                                r = cr("lc_bridge_init"),
                                i = cr("lc_bridge_ready");
                            return c((function(e) {
                                return e && Number(e.toFixed(2))
                            }), {
                                timeFromTrackingStart: sr(t, i),
                                timeFromBridgeInit: sr(r, i),
                                timeFromDomContentLoaded: dr(i),
                                totalBlockingTimeContributedToOurScript: e
                            })
                        }))
                    }
                }
            }
        };

    function fr(n, t) {
        return t = t || {}, new e((function(r, i) {
            var o = new XMLHttpRequest,
                a = [],
                u = [],
                c = {},
                s = function n() {
                    return {
                        ok: 2 == (o.status / 100 | 0),
                        statusText: o.statusText,
                        status: o.status,
                        url: o.responseURL,
                        text: function() {
                            return e.resolve(o.responseText)
                        },
                        json: function() {
                            return e.resolve(o.responseText).then(JSON.parse)
                        },
                        blob: function() {
                            return e.resolve(new Blob([o.response]))
                        },
                        clone: n,
                        headers: {
                            keys: function() {
                                return a
                            },
                            entries: function() {
                                return u
                            },
                            get: function(e) {
                                return c[e.toLowerCase()]
                            },
                            has: function(e) {
                                return e.toLowerCase() in c
                            }
                        }
                    }
                };
            for (var d in o.open(t.method || "get", n, !0), o.onload = function() {
                    o.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, (function(e, n, t) {
                        a.push(n = n.toLowerCase()), u.push([n, t]), c[n] = c[n] ? c[n] + "," + t : t
                    })), r(s())
                }, o.onerror = i, o.withCredentials = "include" == t.credentials, t.headers) o.setRequestHeader(d, t.headers[d]);
            o.send(t.body || null)
        }))
    }
    var pr, mr = "__test_storage_support__",
        hr = "@@test",
        vr = function(e) {
            void 0 === e && (e = "local");
            try {
                var n = "session" === e ? window.sessionStorage : window.localStorage;
                return n.setItem(mr, hr), n.getItem(mr) !== hr ? !1 : (n.removeItem(mr), !0)
            } catch (e) {
                return !1
            }
        },
        gr = function() {
            var e = Object.create(null);
            return {
                getItem: function(n) {
                    var t = e[n];
                    return "string" == typeof t ? t : null
                },
                setItem: function(n, t) {
                    e[n] = t
                },
                removeItem: function(n) {
                    delete e[n]
                },
                clear: function() {
                    e = Object.create(null)
                }
            }
        }(),
        _r = (vr() && window, Object.freeze({
            success: !0
        }), (pr = {}).CONNECTION_LOST = "Connection lost.", pr.MISDIRECTED_CONNECTION = "Connected to wrong region.", function(e) {
            return e.map((function(e) {
                switch (e.type) {
                    case "group_chooser":
                        return n({}, e, {
                            options: e.options.map((function(e) {
                                var t = e.group_id;
                                return n({}, S(e, ["group_id"]), {
                                    groupId: t
                                })
                            }))
                        });
                    case "rating":
                        var t = e.comment_label;
                        return n({}, S(e, ["comment_label"]), {
                            commentLabel: t
                        });
                    default:
                        return e
                }
            }))
        }),
        wr = function(e) {
            var t, r;
            return {
                id: e.id,
                fields: !("id" in e.fields[0]) ? (t = e.fields, r = t.map((function(e, t) {
                    return n({}, e, {
                        id: t + ""
                    })
                })), _r(r)) : _r(e.fields)
            }
        },
        yr = function(e) {
            var n = function(e) {
                return e.replace(Z, "")
            }(e);
            return "https://" + (!_("cdn.livechatinc.com/cloud/?uri", n) && !_(".livechat-static.com/", n) ? "cdn.livechatinc.com/cloud/?" + B({
                uri: "https://" + n
            }) : n)
        },
        br = /\.([a-z]{1,})$/i,
        kr = function(e) {
            var n = e.__priv,
                t = {
                    enabled: !0,
                    x: parseInt(n.group["embedded_chat.eye_grabber.x"]) + 15,
                    y: parseInt(n.group["embedded_chat.eye_grabber.y"]),
                    src: yr(n.group["embedded_chat.eye_grabber.path"])
                };
            if (-1 !== t.src.indexOf("/default/eyeCatchers/")) {
                var r = t.src.match(br)[1];
                t.srcset = {
                    "1x": t.src,
                    "2x": t.src.replace(RegExp("\\." + r, "i"), "-2x." + r)
                }
            }
            return t
        },
        Cr = function(e, n) {
            return "https://api" + ((r = (t = n).region) && "dal" !== r ? "-" + r : "") + function(e) {
                return 1520 === e ? ".staging" : ""
            }(t.licenseId) + ".livechatinc.com/v3.3/customer/action/" + e;
            var t, r
        },
        Ir = function(e, n) {
            return {
                groupId: e.group_id,
                clientLimitExceeded: e.client_limit_exceeded,
                configVersion: e.config_version,
                localizationVersion: e.localization_version,
                onlineGroupIds: e.online_group_ids || [],
                region: n || null
            }
        },
        Lr = function e(t) {
            return te(Cr("get_dynamic_configuration", t), {
                query: n({
                    license_id: t.licenseId,
                    url: ee(t.url, ["cw_configurator"])
                }, "number" == typeof t.groupId && {
                    group_id: t.groupId
                }, t.channelType && {
                    channel_type: t.channelType
                }, t.skipCodeInstallationTracking && {
                    test: 1
                })
            }).then((function(r) {
                if (r.error) switch (r.error.type) {
                    case "misdirected_request":
                        return e(n({}, t, {
                            region: r.error.data.region
                        }));
                    case "license_expired":
                        if ("direct_link" === t.channelType) {
                            var i = B({
                                utm_source: "expired_chat_link",
                                utm_medium: "referral",
                                utm_campaign: "expired"
                            });
                            window.location.replace("https://www.livechat.com/powered-by-livechat/?" + i)
                        }
                        var o = Error(r.error.message);
                        throw o.code = r.error.type.toUpperCase(), o;
                    default:
                        var a = Error(r.error.message);
                        throw a.code = r.error.type.toUpperCase(), a
                }
                if (!r.domain_allowed) {
                    var u = Error("Current domain is not added to the allowlist.");
                    throw u.code = "DOMAIN_NOT_ALLOWED", u
                }
                return Ir(r, t.region)
            }))
        },
        Er = function(e) {
            var t = e.buttons,
                r = e.allowed_domains,
                i = e.prechat_form,
                o = e.ticket_form,
                a = e.__priv;
            return n({}, S(e, ["buttons", "allowed_domains", "prechat_form", "ticket_form", "__priv"]), i && {
                prechatForm: wr(i)
            }, o && {
                ticketForm: wr(o)
            }, {
                buttons: t.map((function(e) {
                    return "image" === e.type ? {
                        id: e.id,
                        type: e.type,
                        onlineValue: yr(e.online_value),
                        offlineValue: yr(e.offline_value)
                    } : {
                        id: e.id,
                        type: e.type,
                        onlineValue: e.online_value,
                        offlineValue: e.offline_value
                    }
                }))
            }, r && {
                allowedDomains: r
            }, {
                __unsafeProperties: n({}, a.s && {
                    s: !0
                }, {
                    group: {
                        chatBoosters: a.group.chat_boosters,
                        disabledMinimized: "1" === a.group["chat_window.disable_minimized"],
                        disabledMinimizedOnMobile: "1" === a.group["chat_window.mobile_disable_minimized"],
                        disabledOnMobile: "1" === a.group["chat_window.hide_on_mobile"],
                        eyeCatcher: "1" === a.group["embedded_chat.display_eye_catcher"] ? kr(e) : {
                            enabled: !1
                        },
                        hasAgentAvatarsEnabled: "1" === a.group["chat_window.display_avatar"],
                        hasCustomMobileSettings: "1" === a.group["chat_window.custom_mobile_settings"],
                        hasHiddenTrademark: "1" === a.group["chat_window.hide_trademark"],
                        hasSoundsEnabled: "0" === a.group["chat_window.disable_sounds"],
                        initiallyHidden: "1" === a.group["chat_window.hide_on_init"] || "1" === a.group["chat_window.disable_minimized"],
                        initiallyHiddenOnMobile: "1" === a.group["chat_window.mobile_hide_on_init"] || "1" === a.group["chat_window.mobile_disable_minimized"],
                        hideOnInit: "1" === a.group["chat_window.hide_on_init"],
                        language: a.group.language,
                        linksUnfurlingEnabled: "1" === a.group.links_unfurling,
                        logo: "1" === a.group["chat_window.display_logo"] ? {
                            enabled: !0,
                            src: a.group["chat_window.logo_path"]
                        } : {
                            enabled: !1
                        },
                        minimizedType: a.group["chat_window.theme.minimized"],
                        minimizedTypeOnMobile: a.group["chat_window.mobile_minimized_theme"],
                        offlineMessagesEnabled: "0" === a.group.tickets_enabled,
                        offsetX: parseInt(a.group["chat_window.offset_x"]),
                        offsetXOnMobile: parseInt(a.group["chat_window.mobile_offset_x"]),
                        offsetY: parseInt(a.group["chat_window.offset_y"]),
                        offsetYOnMobile: parseInt(a.group["chat_window.mobile_offset_y"]),
                        prechatFormAfterGreetingEnabled: "1" === a.group.pre_chat_survey_after_greeting,
                        ratingEnabled: "1" === a.group["rate_me.enabled"],
                        screenPosition: a.group["chat_window.screen_position"],
                        screenPositionOnMobile: a.group["chat_window.mobile_screen_position"],
                        transcriptButtonEnabled: "1" === a.group["chat_window.display_transcript_button"],
                        theme: {
                            name: a.group["chat_window.new_theme.name"],
                            variant: a.group["chat_window.new_theme.variant"] || "light",
                            customJson: a.group["chat_window.new_theme.custom_json"],
                            agentbarBackgroundColor: a.group["chat_window.new_theme.agentbar_background_color"],
                            agentbarText: a.group["chat_window.new_theme.agentbar_text"],
                            agentMessageColorBackground: a.group["chat_window.new_theme.agent_message_color_background"],
                            agentMessageColorText: a.group["chat_window.new_theme.agent_message_color_text"],
                            backgroundColor: a.group["chat_window.new_theme.background_color"],
                            ctaColor: a.group["chat_window.new_theme.cta_color"],
                            minimizedColorBackground: a.group["chat_window.new_theme.minimized_color_background"],
                            minimizedColorIcon: a.group["chat_window.new_theme.minimized_color_icon"],
                            minimizedColorText: a.group["chat_window.new_theme.minimized_color_text"],
                            systemMessageColor: a.group["chat_window.new_theme.system_message_color"],
                            titlebarBackgroundColor: a.group["chat_window.new_theme.titlebar_background_color"],
                            titlebarText: a.group["chat_window.new_theme.titlebar_text"],
                            visitorMessageColorBackground: a.group["chat_window.new_theme.visitor_message_color_background"],
                            visitorMessageColorText: a.group["chat_window.new_theme.visitor_message_color_text"]
                        }
                    },
                    license: {
                        continuousChatWidgetEnabled: "1" === a.license.continuous_chat_widget_enabled,
                        creditCardMaskingEnabled: "1" === a.license.mask_credit_cards,
                        customerHistoryEnabled: "1" === a.license.customer_history_enabled,
                        fileSharingEnabled: "1" === a.license["attachments.enable_for_visitors"],
                        inboundForwardingToHelpdeskEnabled: "1" === a.license["helpdesk.inbound_forwarding"],
                        nonProfit: "1" === a.license.non_profit
                    }
                })
            })
        },
        xr = function(e) {
            var n, t, r, i = e.allowVideoConferencing,
                o = e.allowClipboardWrite,
                a = e.allowDisplayCapture,
                u = [];
            if (e.allowAutoplay && !zt() && u.push("autoplay;"), a && u.push("display-capture *;"), i) {
                var c = {
                    "display-capture *;": !Pt() || (r = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./), (r ? parseInt(r[2], 10) : 0) >= 94),
                    "picture-in-picture *;": "PictureInPictureEvent" in window,
                    "fullscreen *;": "function" == typeof Element.prototype.requestFullscreen
                };
                u = [].concat(u, ["microphone *;", "camera *;"], Object.keys((n = Boolean, Object.keys(t = c).reduce((function(e, r) {
                    return n(t[r]) && (e[r] = t[r]), e
                }), {}))))
            }
            return o && !zt() && u.push("clipboard-write *;"), u.join(" ")
        },
        Ar = "data-lc-focus",
        Or = "data-lc-event",
        Tr = "data-lc-prop";

    function Pr(e, n) {
        var t;
        if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
            if (Array.isArray(e) || (t = function(e, n) {
                    if (!e) return;
                    if ("string" == typeof e) return zr(e, n);
                    var t = Object.prototype.toString.call(e).slice(8, -1);
                    "Object" === t && e.constructor && (t = e.constructor.name);
                    if ("Map" === t || "Set" === t) return Array.from(e);
                    if ("Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return zr(e, n)
                }(e)) || n && e && "number" == typeof e.length) {
                t && (e = t);
                var r = 0;
                return function() {
                    return e.length > r ? {
                        done: !1,
                        value: e[r++]
                    } : {
                        done: !0
                    }
                }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        return (t = e[Symbol.iterator]()).next.bind(t)
    }

    function zr(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var t = 0, r = Array(n); n > t; t++) r[t] = e[t];
        return r
    }
    var Sr = x;
    var jr = Tt(),
        Mr = function(e) {
            return jr ? {
                width: "100%",
                height: "100%"
            } : "modern" === e.__unsafeProperties.group.theme.name ? {
                width: "400px",
                height: "465px"
            } : {
                width: "352px",
                height: "652px"
            }
        },
        Nr = function(e, n) {
            return Object.keys(e.properties.license).some((function(t) {
                return e.properties.license[t][n]
            }))
        },
        Dr = function(e, n, t) {
            var r, i, o, a = xt(n, jr);
            return !e && t ? ((i = {})[Et(n, jr)] = "0", i.bottom = a.y + "px", i.maxHeight = "100%", i) : jr && e ? ((o = {})[Et(n, jr)] = "0", o.bottom = "0", o.maxHeight = "100%", o) : ((r = {})[Et(n, jr)] = a.x + "px", r.bottom = a.y + "px", r.maxHeight = "calc(100% - " + a.y + "px)", r)
        },
        qr = function(e) {
            return e.style.setProperty("transition", "none", "important")
        },
        Fr = function(e, t) {
            var r, i = H("div", cn),
                o = xt(e, jr),
                a = Dr(t, e),
                u = Mr(e);
            return j(n(((r = {
                width: u.width,
                height: u.height
            })[Et(e, jr)] = o.x + "px", r), a), i), i
        },
        Hr = function(t, r, i, o, a, u) {
            var c, s, f = B(d(n({
                    license_id: r.license,
                    group: r.group,
                    embedded: 1,
                    widget_version: 3,
                    unique_groups: Number(r.uniqueGroups)
                }, !!o && {
                    custom_identity_provider: 1
                }, !!a && {
                    features: a
                }, r.organizationId && {
                    organizationId: r.organizationId
                }))),
                p = {
                    kill: function() {
                        this._emit("widget_resize", {
                            size: {
                                width: "0px",
                                height: "0px"
                            }
                        }), this.unbind(), t.custom || F(t.element)
                    },
                    applyHiddenStyles: function() {
                        j(an, t.element)
                    },
                    isFocused: function() {
                        return !!document.hasFocus && document.hasFocus()
                    },
                    resize: function(e) {
                        var r = void 0 === e ? {} : e,
                            o = {
                                width: r.width,
                                height: r.height
                            },
                            a = Dr(r.maximized, i, r.ignoreHorizontalOffset);
                        j(n({}, o, a), t.element);
                        var u = D(["width", "height"], t.element);
                        this._emit("widget_resize", {
                            size: o,
                            computedSize: u
                        })
                    },
                    show: function() {
                        j(un, t.element)
                    },
                    hide: function() {
                        this.call("hide")
                    },
                    minimize: function() {
                        this.call("minimize")
                    },
                    maximize: function() {
                        var e = this;
                        if (!!window.event && window.event.isTrusted && _(window.event.type, ["click", "pointerdown", "pointerup", "mousedown", "mouseup", "touchstart", "touchend"])) {
                            var n = document.activeElement;
                            n.addEventListener("blur", (function t() {
                                n.removeEventListener("blur", t), e.emit("host_focus_shifted")
                            })), this.call("maximize", {
                                modality: Vt
                            })
                        } else this.call("maximize")
                    },
                    unbind: function() {
                        var e = this;
                        this.hide(), this.destroy(), this._emit("unbind"), this.off(), this.call = x, Object.keys(p).forEach((function(n) {
                            e[n] = x
                        })), Qt()
                    },
                    callIdentityProvider: function(e) {
                        return null == o ? void 0 : o[e]()
                    },
                    applyFramesStyle: function(e) {
                        var n = e.minimizedFrameStyle,
                            t = e.maximizedFrameStyle,
                            r = document.getElementById(nn),
                            i = document.getElementById(tn);
                        r && j(t, r), i && j(n, i)
                    },
                    renderCrossFrameMarkup: function(e) {
                        var r = e[0],
                            i = e[1],
                            o = document.getElementById(tn);
                        o || (o = document.createElement("iframe"), M(n({}, hn, {
                                title: "openwidget" === u ? on : rn
                            }), o), t.element.appendChild(o)),
                            function(e, n, t, r) {
                                var i = t.contentDocument;
                                if (null === i) throw Error("Parameter `frame` needs to be inserted into any document before rendering");
                                Pt() ? (i.head.innerHTML = e, i.body.innerHTML = n) : (i.open(), i.write("\n\t\t\t<!DOCTYPE html>\n\t\t\t<html>\n\t\t\t\t<head>" + e + "</head>\n\t\t\t\t<body>" + n + "</body>\n\t\t\t</html>\n\t\t"), i.close());
                                for (var o, a = i.documentElement, u = Pr(P(a.querySelectorAll("[" + Or + "]"))); !(o = u()).done;) {
                                    var c = o.value,
                                        s = c.getAttribute(Or);
                                    if ("string" == typeof s)
                                        for (var d, l = function() {
                                                var e = d.value.split(":"),
                                                    n = e[0],
                                                    t = e[1];
                                                if (!n || !t) return "continue";
                                                c.removeAttribute(Or), c.addEventListener(n, (function(e) {
                                                    var n, i, o, a, u, c, s, d, l, f;
                                                    e.stopPropagation();
                                                    var p = {
                                                        type: e.type,
                                                        bubbles: !0,
                                                        isTrusted: e.isTrusted,
                                                        cancelBubble: e.cancelBubble,
                                                        cancelable: e.cancelable,
                                                        composed: e.composed,
                                                        defaultPrevented: e.defaultPrevented,
                                                        eventPhase: e.eventPhase,
                                                        timeStamp: e.timeStamp,
                                                        currentTarget: {
                                                            value: null == (n = e.currentTarget) ? void 0 : n.value,
                                                            checked: null == (i = e.currentTarget) ? void 0 : i.checked,
                                                            disabled: null == (o = e.currentTarget) ? void 0 : o.disabled,
                                                            draggable: null == (a = e.currentTarget) ? void 0 : a.draggable,
                                                            hidden: null == (u = e.currentTarget) ? void 0 : u.hidden
                                                        },
                                                        target: {
                                                            value: null == (c = e.target) ? void 0 : c.value,
                                                            checked: null == (s = e.target) ? void 0 : s.checked,
                                                            disabled: null == (d = e.target) ? void 0 : d.disabled,
                                                            draggable: null == (l = e.target) ? void 0 : l.draggable,
                                                            hidden: null == (f = e.target) ? void 0 : f.hidden
                                                        }
                                                    };
                                                    r.call("crossFrameEvent", t, JSON.stringify(p))
                                                }))
                                            }, f = Pr(s.split(";")); !(d = f()).done;) l()
                                }
                                var p = a.querySelector("[" + Ar + "]");
                                p && (p.removeAttribute(Ar), p.focus(), "INPUT" === p.nodeName) && p.setSelectionRange(p.value.length, p.value.length);
                                for (var m, h = [], v = function() {
                                        var e = m.value,
                                            n = e.getAttribute(Tr);
                                        if ("string" != typeof n) return "continue";
                                        e.removeAttribute(Tr);
                                        var t = n.split(":"),
                                            r = t[0],
                                            i = t[1];
                                        h.push((function(n) {
                                            var t, o, a = null == (t = n.views) || null == (o = t.minimized) ? void 0 : o[i.replace("!", "")];
                                            "string" == typeof a && (a = a.trim()), "disabled" === r && (a = i.includes("!") ? !a : !!a), "boolean" == typeof a ? e.toggleAttribute(r, a) : a ? e.setAttribute(r, a) : e.removeAttribute(r)
                                        }))
                                    }, g = Pr(P(a.querySelectorAll("[" + Tr + "]"))); !(m = g()).done;) v();
                                h.forEach((function(e) {
                                    return e(r.state)
                                })), r.off("state_diff", Sr), r.on("state_diff", Sr = function(e) {
                                    var n;
                                    (null == e || null == (n = e.views) ? void 0 : n.minimized) && h.forEach((function(n) {
                                        return n(e)
                                    }))
                                })
                            }(r, i, o, this)
                    },
                    getMinimizedDimensions: function() {
                        var e = document.getElementById(tn).contentDocument.querySelector('[role="main"]');
                        return D(["width", "height"], e)
                    }
                },
                m = r.iframeAddress + "?" + f,
                h = new MutationObserver((function(e) {
                    return e.forEach((function(e) {
                        var r = l((function(e) {
                            return "IFRAME" === e.tagName && e.getAttribute("src") === m
                        }), e.addedNodes);
                        r && function(e, t, r) {
                            M(n({}, mn, {
                                title: "openwidget" === r ? on : rn
                            }), t), e.custom || j(pn, t)
                        }(t, r, u)
                    }))
                }));
            return h.observe(t.element, {
                childList: !0
            }), new Ke({
                container: t.element,
                url: m,
                methods: p,
                iframeAllowedProperties: xr({
                    allowAutoplay: !0,
                    allowVideoConferencing: Nr(i, "microphone"),
                    allowClipboardWrite: Nr(i, "clipboard_write"),
                    allowDisplayCapture: 1520 === r.license || !1
                }),
                model: n({}, r, {
                    fullWidth: null == (c = t.size) ? void 0 : c.width,
                    fullHeight: null == (s = t.size) ? void 0 : s.height,
                    serverConfig: i,
                    parentWidth: window.innerWidth,
                    parentHeight: window.innerHeight
                })
            }).then((function(n) {
                return e.all([n, en(n)])
            })).then((function(e) {
                var n = e[0];
                return h.disconnect(), n
            }))
        },
        Br = function(e, n, t, r, i) {
            e.call("storeMethod", ["setLocalization", r]), t.custom || St(t.element, (function() {
                    return Sn(e.state, "hidden")
                })), jr || "wix" === n.integrationName || jt(e, i, r), qr(e.frame),
                function(e, n, t) {
                    $n(e, n, t), ("LiveChatWidget" in window || "OpenWidget" in window) && rt(e, n, t)
                }(e, n, i), lt(e, n), fe(Vn(e, (function() {
                    return function(e) {
                        var n = !1;
                        e.on("iframe_sound_unlocked", (function() {
                            return n = !0
                        })), It().then((function(t) {
                            n || (e.emit("bridge_sound_unlocked"), e.on("add_event", (function(n) {
                                var r = n.event;
                                We(e.state, "muted") || function(e, n) {
                                    return "system" !== e.author && !e.properties.welcomeMessage && e.author !== n && "custom" !== e.type
                                }(r, He(e.state)) && t(Ct)
                            })))
                        }))
                    }(e), ge
                })), ce(x)), "wix" === n.integrationName ? function(e) {
                    Bt.addEventListener(Bt.Events.PAGE_NAVIGATION, (function() {
                        Wt().then((function(n) {
                            return e.call("storeMethod", ["setApplicationState", {
                                page: n
                            }])
                        }))
                    }))
                }(e) : Ft(e), Rt(e), n.actingAsDirectLink || t.custom || function(e) {
                    fe(jn(e, (function(e) {
                        return Sn(e, "hidden")
                    })), Ce(1), ce((function(n) {
                        n ? e.applyHiddenStyles() : e.show()
                    })))
                }(e), Zt(e),
                function(e) {
                    var n = function() {
                        setTimeout((function() {
                            document.addEventListener("touchstart", x), setTimeout((function() {
                                document.removeEventListener("touchstart", x)
                            }), 500)
                        }), 500)
                    };
                    window.addEventListener("orientationchange", n), e.on("unbind", (function t() {
                        e.off("unbind", t), window.removeEventListener("orientationchange", n)
                    }))
                }(e), Nt(e, i), jr && nr(e), Ht(e), e.on("rich_greeting_button_clicked", (function(e) {
                    var n = e.button;
                    "url" === n.type && Kn.navigate(n.value)
                })), e.on("open_in_new_tab", (function(e) {
                    Kn.navigate(e)
                }))
        },
        Wr = function(t) {
            return "openwidget" === t.product ? te("https://api.openwidget.com/v1.0/configuration/" + t.organizationId, {
                callbackName: "ow_config"
            }).then((function(e) {
                var t = e.dynamicConfig,
                    r = e.staticConfig,
                    i = e.localization,
                    o = e.products,
                    a = e.licenseId,
                    u = S(e, ["dynamicConfig", "staticConfig", "localization", "products", "licenseId"]),
                    c = n({}, Er(r), {
                        localization: C((function(e) {
                            return e.toLowerCase()
                        }), i),
                        products: o
                    }, u);
                return _("livechat", o) ? n({}, c, Ir(t), {
                    licenseId: a
                }) : c
            })) : Lr(t).then((function(r) {
                var i;
                return e.all([r, (i = {
                    licenseId: t.licenseId,
                    groupId: r.groupId,
                    region: r.region,
                    version: r.configVersion
                }, te(Cr("get_configuration", i), {
                    callbackName: "lc_static_config",
                    query: n({
                        license_id: i.licenseId,
                        version: i.version
                    }, "number" == typeof i.groupId && {
                        group_id: i.groupId
                    })
                }).then((function(e) {
                    return Er(e)
                })))]).then((function(e) {
                    return n({}, e[0], e[1])
                }))
            }))
        },
        Rr = function(t) {
            window.performance && "function" == typeof window.performance.mark && window.performance.mark("lc_bridge_init");
            var r = !1;
            window.LC_API = window.LC_API || {}, window.LC_API.is_loaded = function() {
                return r
            };
            var i = t.region,
                o = t.organizationId,
                a = t.requestedGroupId,
                u = t.integrationName,
                c = t.customIdentityProviderInitializer,
                s = n({
                    product: t.product,
                    licenseId: t.licenseId,
                    organizationId: o,
                    skipCodeInstallationTracking: t.skipCodeInstallationTracking,
                    channelType: t.actingAsDirectLink ? "direct_link" : "code",
                    url: Dt(document.location + "")
                }, "number" == typeof a && {
                    groupId: a
                }, "string" == typeof i && {
                    region: i
                });
            e.all([Wr(s), "wix" === u ? Wt() : qt(), q()]).then((function(i) {
                var a = i[0],
                    u = i[1],
                    l = i[2];
                if (yn(a.allowedDomains, window.top === window ? window.location.hostname : document.referrer)) {
                    if (!jr || !a.__unsafeProperties.group.disabledOnMobile || t.actingAsDirectLink) {
                        var f = lr(),
                            p = function(e) {
                                if (null === e) return null;
                                var n = e();
                                return "object" != typeof n || "function" != typeof n.getToken || "function" != typeof n.getFreshToken || "function" != typeof n.hasToken || "function" != typeof n.invalidate ? (console.error("custom_identity_provider() does not return proper handlers. ({getFreshToken: () => Promise<Token>, getToken: () => Promise<Token>, hasToken: () => Promise<boolean>, invalidate: () => Promise<void> })"), null) : n
                            }(c),
                            m = ir(t, u, a),
                            h = function(e, n) {
                                return e.customContainer ? {
                                    custom: !0,
                                    element: e.customContainer
                                } : {
                                    custom: !1,
                                    element: Fr(n, e.actingAsDirectLink),
                                    size: Mr(n)
                                }
                            }(t, a),
                            v = {},
                            g = !1,
                            _ = wn("on_before_load"),
                            w = wn("on_after_load");
                        _((function(e) {
                            e.disable_sounds = x, e.mobile_is_detected = function() {
                                return jr
                            }, e.chat_running = function() {
                                return !1
                            }, e.visitor_engaged = function() {
                                return !1
                            }, e.agents_are_available = function() {
                                return -1 !== a.onlineGroupIds.indexOf(a.groupId)
                            }, e.get_window_type = function() {
                                return "embedded"
                            }, e.hide_chat_window = Jn(m) ? x : function() {
                                return g = !0
                            }, e.set_visitor_name = function(e) {
                                return v.name = zn(e)
                            }, e.set_visitor_email = function(e) {
                                return v.email = zn(e)
                            }, e.set_custom_variables = function(e) {
                                return v.properties = e ? On(e) : {}
                            }, e.update_custom_variables = function(e) {
                                e && (v.properties = n({}, v.properties, On(e)))
                            }
                        }));
                        var y, b = n({}, m, a.licenseId && {
                            license: a.licenseId
                        }, {
                            customer: n({}, m.customer, v),
                            hidden: m.hidden || g,
                            organizationId: o
                        });
                        h.custom || l.appendChild(h.element), window.performance && "function" == typeof window.performance.mark && window.performance.mark("lc_bind_child"), e.all([Hr(h, b, a, p, null, s.product), "openwidget" === s.product ? e.resolve(a.localization) : (y = {
                            licenseId: b.license,
                            groupId: b.group,
                            region: b.region,
                            version: a.localizationVersion,
                            language: a.__unsafeProperties.group.language
                        }, te(Cr("get_localization", y), {
                            callbackName: "lc_localization",
                            query: n({
                                license_id: y.licenseId,
                                version: y.version,
                                language: y.language
                            }, "number" == typeof y.groupId && {
                                group_id: y.groupId
                            })
                        }).then((function(e) {
                            return C((function(e) {
                                return e.toLowerCase()
                            }), e)
                        })))]).then((function(e) {
                            var n = e[0],
                                t = e[1];
                            return h.custom || qr(h.element), Br(n, b, h, t, a), fe(jn(n, (function(e) {
                                return We(e, "readyState")
                            })), ue((function(e) {
                                return e === Bn
                            })), Le(1), me((function() {
                                return n
                            })), Ae)
                        })).then((function(e) {
                            window.performance && "function" == typeof window.performance.mark && window.performance.mark("lc_bridge_ready"), f && f.getLogs().then((function(n) {
                                e.call("logInfo", "loading_time_measured", d(n))
                            })), w((function() {
                                return r = !0
                            })), "openwidget" === s.product || Math.floor(10 * Math.random()) || setTimeout((function() {
                                (function(e) {
                                    return fr(Cr("get_localization", e) + "?" + B(n({
                                        license_id: e.licenseId,
                                        version: e.version,
                                        language: e.language
                                    }, "number" == typeof e.groupId && {
                                        group_id: e.groupId
                                    }))).then((function(e) {
                                        return e.json()
                                    })).then((function(e) {
                                        return C((function(e) {
                                            return e.toLowerCase()
                                        }), e)
                                    }))
                                })({
                                    licenseId: m.license,
                                    groupId: m.group,
                                    region: m.region,
                                    version: a.localizationVersion,
                                    language: a.__unsafeProperties.group.language
                                }).catch((function() {
                                    e.call("logInfo", "potential_csp_problem", {
                                        url: window.location + ""
                                    })
                                }))
                            }), 1e4)
                        }))
                    }
                } else console.log("[LiveChat] Current domain is not added to the allowed domains. LiveChat has been disabled.")
            })).catch((function(e) {
                switch (null == e ? void 0 : e.code) {
                    case "ACCESS_NOT_RESOLVED":
                    case "CUSTOMER_BANNED":
                        return void console.warn("[LiveChat] " + e.message);
                    default:
                        throw e
                }
            }))
        };

    function Vr() {
        q().then((function(e) {
            var n = document.createElement("iframe");
            j({
                display: "none"
            }, n), e.appendChild(n), zt() && (n.contentDocument.open(), n.contentDocument.close());
            var t = n.contentDocument.head;
            ["https://cdn.livechatinc.com/widget/static/js/runtime-configurator.41615feb.js", "https://cdn.livechatinc.com/widget/static/js/0.0f55d8dd.chunk.js", "https://cdn.livechatinc.com/widget/static/js/1.1e075a8f.chunk.js", "https://cdn.livechatinc.com/widget/static/js/configurator.25cb9617.chunk.js"].forEach((function(e) {
                ! function(e, n) {
                    var t = document.createElement("script");
                    M({
                        src: n,
                        charset: "utf-8"
                    }, t), e.appendChild(t)
                }(t, e)
            }))
        }))
    }
    var Gr = function(e) {
            return function(e) {
                return "number" == typeof e && e >= 0
            }(t = "string" == typeof(n = void 0 !== e.group ? e.group : e.skill) ? parseInt(n, 10) : n) ? t : null;
            var n, t
        },
        Ur = function(e, n) {
            var t = {
                name: null,
                email: null,
                properties: {}
            };
            if ("object" == typeof e && e) {
                var r = e.name,
                    i = e.email;
                "string" == typeof r && (t.name = r), "string" == typeof i && (t.email = i)
            }
            return Array.isArray(n) && (t.properties = On(n)), t
        },
        Jr = function() {
            return e = "cw_configurator", n = window.location.search, X(n)[e] || vr("session") && !!window.sessionStorage.getItem("cw_configurator");
            var e, n
        };
    window.__lc_inited || function() {
        if (window.__lc_inited = !0, "msCrypto" in window) console.error("[LiveChat] We no longer support Internet Explorer");
        else if (3 === [1].reduce((function(e, n) {
                return e + n
            }), 2)) {
            var e, t, r = (e = window.__lc, {
                licenseId: parseInt(e.license),
                requestedGroupId: Gr(e),
                uniqueGroups: !1 === e.chat_between_groups,
                customer: Ur(e.visitor, e.params),
                skipCodeInstallationTracking: 1 === e.test,
                integrationName: e.wix ? "wix" : "string" == typeof e.integration_name ? e.integration_name : null,
                actingAsDirectLink: !0 === e.direct_link,
                initMaximized: !0 === e.init_maximized,
                customContainer: e.custom_container || null,
                gaParams: {
                    version: "string" == typeof e.ga_version ? e.ga_version : null,
                    omitGtm: !!e.ga_omit_gtm,
                    sendToAll: !!e.ga_send_to_all_trackers
                },
                customIdentityProviderInitializer: "function" == typeof e.custom_identity_provider ? e.custom_identity_provider : null,
                iframeAddress: null,
                region: _(e.region, (t = Rn, Object.keys(t).map((function(e) {
                    return t[e]
                })))) ? e.region + "" : null
            });
            r.actingAsDirectLink || !Jr() ? Rr(n({}, r, {
                product: "livechat"
            })) : Vr()
        } else console.error("[LiveChat] This site has overriden Array.prototype.reduce (for example by using Prototype library) to a version that is not compatible with Web standards. LiveChat code couldn't be initialized because of this.")
    }()
}();