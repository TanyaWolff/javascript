/*!
 * jQuery JavaScript Library v1.12.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-01-08T19:56Z
 */
function allowDrop(t) {
    target = $(t.target).closest(".dropzone"),
    $(target).hasClass("ftarget") ? t.preventDefault() : console.log("not allowed")
}
function q_allowDrop(t) {
    target = $(t.target).closest(".q_dropzone"),
    $(target).hasClass("qtarget") ? t.preventDefault() : console.log("not allowed")
}
function isFeetag(t) {
    return "true" == t.attr("data-isfee")
}
function isLitag(t) {
    return "false" == t.attr("data-isfee")
}
function drag(t) {
    if (target = $(t.target),
    isFeetag(target)) {
        if (kind = "fees",
        target.hasClass("packaged"))
            return t.dataTransfer.effectAllowed = "none",
            !1;
        $(".question .dropzone").addClass("ftarget"),
        $(".palette.dropzone").addClass("ftarget")
    } else
        isLitag(target) && (kind = "questions",
        $(".question .q_dropzone").addClass("qtarget"),
        $(".qpalette .q_dropzone").addClass("qtarget"));
    if (0 == $(".changed").length)
        t.dataTransfer.setData("text", t.target.id),
        console.log(t.dataTransfer.getData("text"));
    else {
        dragImage = document.createElement("div"),
        $(dragImage).attr("id", "dragthis"),
        $(dragImage).attr("class", "narrow"),
        $(dragImage).css({
            "max-width": "10em",
            margin: "auto"
        }),
        $(dragImage).css("background-color", "transparent"),
        $(dragImage).css("opacity", ".5"),
        $(".changed").each(function() {
            ("fees" == kind && isFeetag($(this)) || "questions" == kind && isLitag($(this))) && $(dragImage).append($(this).clone())
        }),
        $(".qpalette").after(dragImage);
        var e = []
          , n = [];
        $(dragImage).children().each(function() {
            e.push(this.id),
            n.push(this.dataset.fid)
        }),
        t.dataTransfer.setData("text", e),
        t.dataTransfer.setDragImage(dragImage, 0, 0),
        setTimeout(function() {
            $(dragImage).remove()
        }),
        console.log(n)
    }
    return $("#error_explanation").css("visibility", "hidden"),
    !0
}
function whiledrag(t) {
    target = $(t.target),
    isFeetag(target) && !target.hasClass("packaged") ? $(".dropzone").css("background", "lightgreen") : isLitag(target) && $(".q_dropzone").css("background", "lightgreen")
}
function enddrag(t) {
    target = $(t.target),
    isFeetag(target) ? ($(".question .dropzone").removeClass("ftarget"),
    $(".palette.dropzone").removeClass("ftarget"),
    $(".palette.dropzone").css("background", "#FCF5E8"),
    $(".question .dropzone").css("background", "white")) : isLitag(target) && ($(".question .q_dropzone").removeClass("qtarget"),
    $(".qpalette .q_dropzone").removeClass("qtarget"),
    $(".qpalette .q_dropzone").css("background", "#FCF5E8"),
    $(".question .q_dropzone").css("background", "white"))
}
function add_hidden() {
    var t = 0;
    $("td.dropzone").each(function() {
        q = $(this).parents("tr.question"),
        t = parseInt($(q).attr("id").substring(9)),
        $(this).children("input").remove();
        for (var e = $(this).children("span").length, n = 0; e > n; n++) {
            var i = $(this).children("span")[n]
              , o = $(i).attr("data-fid")
              , r = "package[questions_attributes][" + t + "][fees_attributes][" + n + "][id]"
              , s = "package_questions_attributes_" + t + "_fees_attributes_" + n + "_id"
              , a = '<input name="' + r + '" type="hidden" value="' + o + '" id="' + s + '" >';
            $(this).append(a)
        }
    })
}
function add_hidden_questions() {
    var t = (new Date).getTime();
    $("td.q_dropzone").each(function() {
        $(this).children("input").remove();
        for (var e = $(this).children("span").length, n = 0; e > n; n++) {
            var i = $(this).children("span")[n]
              , o = $(i).attr("data-fid")
              , r = "package[questions_attributes][" + t + "][id]"
              , s = "package_questions_attributes_" + t + "_id"
              , a = '<input name="' + r + '" type="hidden" value="' + o + '" id="' + s + '" >';
            $(this).append(a),
            t++
        }
    })
}
function drop(t) {
    $("tr.question td.dropzone.error_border").removeClass("error_border"),
    t.preventDefault();
    var e = t.dataTransfer.getData("text")
      , n = e.split(",")
      , i = "fees";
    "qu" == n[0].substr(0, 2) && (i = "questions");
    var o = $(t.target);
    if (o.is("input"))
        return !1;
    (o.is("p") || o.is("span")) && (o = o.parent()),
    o.is("td.dropzone") && o.children("p").remove(),
    o.is("td.q_dropzone") && o.children("p").remove();
    for (var r = 0; r < n.length; r++) {
        var s = $(".feetag#" + n[r]);
        o.append(s)
    }
    return $(".feetag").removeClass("changed"),
    "fees" == i ? add_hidden() : add_hidden_questions(),
    !0
}
function uncheck_all() {
    $("div#optionform input").attr("checked", !1),
    $('div#optionform input[type="number"]').val(0),
    $("div#optionform input").attr("checked", !1),
    $("div#optionform input").closest("td").next().text("$0.00"),
    c = $('div#optionform input[type="number"]').closest("td").next()[0],
    $(c).text("$0.00"),
    $("div#optionform select").parent().next().text("$0.00"),
    $("div#optionform select").val(""),
    $('div#optionform input[type="hidden"]').attr("disabled", !0)
}
function show_balance() {
    var t = 0;
    $("td:visible:nth-child(10)").each(function() {
        t += Number($(this).text().replace(/[^0-9\.-]+/g, ""))
    }),
    $("div#balance").text("$" + t.toFixed(2))
}
function hiderows(t) {
    $("tr").not("thead tr").filter(function() {
        return $(this).text().toLowerCase().indexOf(t.toLowerCase()) < 0
    }).css("display", "none"),
    show_balance()
}
function showrows(t) {
    $("tr").not("thead tr").filter(function() {
        return $(this).text().toLowerCase().indexOf(t.toLowerCase()) >= 0
    }).css("display", "table-row"),
    show_balance()
}
!function(t, e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
        if (!t.document)
            throw new Error("jQuery requires a window with a document");
        return e(t)
    }
    : e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    function n(t) {
        var e = !!t && "length"in t && t.length
          , n = pt.type(t);
        return "function" === n || pt.isWindow(t) ? !1 : "array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
    }
    function i(t, e, n) {
        if (pt.isFunction(e))
            return pt.grep(t, function(t, i) {
                return !!e.call(t, i, t) !== n
            });
        if (e.nodeType)
            return pt.grep(t, function(t) {
                return t === e !== n
            });
        if ("string" == typeof e) {
            if (Ct.test(e))
                return pt.filter(e, t, n);
            e = pt.filter(e, t)
        }
        return pt.grep(t, function(t) {
            return pt.inArray(t, e) > -1 !== n
        })
    }
    function o(t, e) {
        do
            t = t[e];
        while (t && 1 !== t.nodeType);
        return t
    }
    function r(t) {
        var e = {};
        return pt.each(t.match(Nt) || [], function(t, n) {
            e[n] = !0
        }),
        e
    }
    function s() {
        it.addEventListener ? (it.removeEventListener("DOMContentLoaded", a),
        t.removeEventListener("load", a)) : (it.detachEvent("onreadystatechange", a),
        t.detachEvent("onload", a))
    }
    function a() {
        (it.addEventListener || "load" === t.event.type || "complete" === it.readyState) && (s(),
        pt.ready())
    }
    function l(t, e, n) {
        if (void 0 === n && 1 === t.nodeType) {
            var i = "data-" + e.replace(Ot, "-$1").toLowerCase();
            if (n = t.getAttribute(i),
            "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : jt.test(n) ? pt.parseJSON(n) : n
                } catch (o) {}
                pt.data(t, e, n)
            } else
                n = void 0
        }
        return n
    }
    function u(t) {
        var e;
        for (e in t)
            if (("data" !== e || !pt.isEmptyObject(t[e])) && "toJSON" !== e)
                return !1;
        return !0
    }
    function c(t, e, n, i) {
        if (Pt(t)) {
            var o, r, s = pt.expando, a = t.nodeType, l = a ? pt.cache : t, u = a ? t[s] : t[s] && s;
            if (u && l[u] && (i || l[u].data) || void 0 !== n || "string" != typeof e)
                return u || (u = a ? t[s] = nt.pop() || pt.guid++ : s),
                l[u] || (l[u] = a ? {} : {
                    toJSON: pt.noop
                }),
                ("object" == typeof e || "function" == typeof e) && (i ? l[u] = pt.extend(l[u], e) : l[u].data = pt.extend(l[u].data, e)),
                r = l[u],
                i || (r.data || (r.data = {}),
                r = r.data),
                void 0 !== n && (r[pt.camelCase(e)] = n),
                "string" == typeof e ? (o = r[e],
                null == o && (o = r[pt.camelCase(e)])) : o = r,
                o
        }
    }
    function d(t, e, n) {
        if (Pt(t)) {
            var i, o, r = t.nodeType, s = r ? pt.cache : t, a = r ? t[pt.expando] : pt.expando;
            if (s[a]) {
                if (e && (i = n ? s[a] : s[a].data)) {
                    pt.isArray(e) ? e = e.concat(pt.map(e, pt.camelCase)) : e in i ? e = [e] : (e = pt.camelCase(e),
                    e = e in i ? [e] : e.split(" ")),
                    o = e.length;
                    for (; o--; )
                        delete i[e[o]];
                    if (n ? !u(i) : !pt.isEmptyObject(i))
                        return
                }
                (n || (delete s[a].data,
                u(s[a]))) && (r ? pt.cleanData([t], !0) : dt.deleteExpando || s != s.window ? delete s[a] : s[a] = void 0)
            }
        }
    }
    function h(t, e, n, i) {
        var o, r = 1, s = 20, a = i ? function() {
            return i.cur()
        }
        : function() {
            return pt.css(t, e, "")
        }
        , l = a(), u = n && n[3] || (pt.cssNumber[e] ? "" : "px"), c = (pt.cssNumber[e] || "px" !== u && +l) && Ht.exec(pt.css(t, e));
        if (c && c[3] !== u) {
            u = u || c[3],
            n = n || [],
            c = +l || 1;
            do
                r = r || ".5",
                c /= r,
                pt.style(t, e, c + u);
            while (r !== (r = a() / l) && 1 !== r && --s)
        }
        return n && (c = +c || +l || 0,
        o = n[1] ? c + (n[1] + 1) * n[2] : +n[2],
        i && (i.unit = u,
        i.start = c,
        i.end = o)),
        o
    }
    function p(t) {
        var e = Bt.split("|")
          , n = t.createDocumentFragment();
        if (n.createElement)
            for (; e.length; )
                n.createElement(e.pop());
        return n
    }
    function f(t, e) {
        var n, i, o = 0, r = "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e || "*") : "undefined" != typeof t.querySelectorAll ? t.querySelectorAll(e || "*") : void 0;
        if (!r)
            for (r = [],
            n = t.childNodes || t; null != (i = n[o]); o++)
                !e || pt.nodeName(i, e) ? r.push(i) : pt.merge(r, f(i, e));
        return void 0 === e || e && pt.nodeName(t, e) ? pt.merge([t], r) : r
    }
    function g(t, e) {
        for (var n, i = 0; null != (n = t[i]); i++)
            pt._data(n, "globalEval", !e || pt._data(e[i], "globalEval"))
    }
    function m(t) {
        Ft.test(t.type) && (t.defaultChecked = t.checked)
    }
    function v(t, e, n, i, o) {
        for (var r, s, a, l, u, c, d, h = t.length, v = p(e), b = [], y = 0; h > y; y++)
            if (s = t[y],
            s || 0 === s)
                if ("object" === pt.type(s))
                    pt.merge(b, s.nodeType ? [s] : s);
                else if (Xt.test(s)) {
                    for (l = l || v.appendChild(e.createElement("div")),
                    u = (qt.exec(s) || ["", ""])[1].toLowerCase(),
                    d = Ut[u] || Ut._default,
                    l.innerHTML = d[1] + pt.htmlPrefilter(s) + d[2],
                    r = d[0]; r--; )
                        l = l.lastChild;
                    if (!dt.leadingWhitespace && Wt.test(s) && b.push(e.createTextNode(Wt.exec(s)[0])),
                    !dt.tbody)
                        for (s = "table" !== u || Vt.test(s) ? "<table>" !== d[1] || Vt.test(s) ? 0 : l : l.firstChild,
                        r = s && s.childNodes.length; r--; )
                            pt.nodeName(c = s.childNodes[r], "tbody") && !c.childNodes.length && s.removeChild(c);
                    for (pt.merge(b, l.childNodes),
                    l.textContent = ""; l.firstChild; )
                        l.removeChild(l.firstChild);
                    l = v.lastChild
                } else
                    b.push(e.createTextNode(s));
        for (l && v.removeChild(l),
        dt.appendChecked || pt.grep(f(b, "input"), m),
        y = 0; s = b[y++]; )
            if (i && pt.inArray(s, i) > -1)
                o && o.push(s);
            else if (a = pt.contains(s.ownerDocument, s),
            l = f(v.appendChild(s), "script"),
            a && g(l),
            n)
                for (r = 0; s = l[r++]; )
                    zt.test(s.type || "") && n.push(s);
        return l = null,
        v
    }
    function b() {
        return !0
    }
    function y() {
        return !1
    }
    function w() {
        try {
            return it.activeElement
        } catch (t) {}
    }
    function x(t, e, n, i, o, r) {
        var s, a;
        if ("object" == typeof e) {
            "string" != typeof n && (i = i || n,
            n = void 0);
            for (a in e)
                x(t, a, n, i, e[a], r);
            return t
        }
        if (null == i && null == o ? (o = n,
        i = n = void 0) : null == o && ("string" == typeof n ? (o = i,
        i = void 0) : (o = i,
        i = n,
        n = void 0)),
        o === !1)
            o = y;
        else if (!o)
            return t;
        return 1 === r && (s = o,
        o = function(t) {
            return pt().off(t),
            s.apply(this, arguments)
        }
        ,
        o.guid = s.guid || (s.guid = pt.guid++)),
        t.each(function() {
            pt.event.add(this, e, o, i, n)
        })
    }
    function _(t, e) {
        return pt.nodeName(t, "table") && pt.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }
    function C(t) {
        return t.type = (null !== pt.find.attr(t, "type")) + "/" + t.type,
        t
    }
    function $(t) {
        var e = oe.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"),
        t
    }
    function T(t, e) {
        if (1 === e.nodeType && pt.hasData(t)) {
            var n, i, o, r = pt._data(t), s = pt._data(e, r), a = r.events;
            if (a) {
                delete s.handle,
                s.events = {};
                for (n in a)
                    for (i = 0,
                    o = a[n].length; o > i; i++)
                        pt.event.add(e, n, a[n][i])
            }
            s.data && (s.data = pt.extend({}, s.data))
        }
    }
    function k(t, e) {
        var n, i, o;
        if (1 === e.nodeType) {
            if (n = e.nodeName.toLowerCase(),
            !dt.noCloneEvent && e[pt.expando]) {
                o = pt._data(e);
                for (i in o.events)
                    pt.removeEvent(e, i, o.handle);
                e.removeAttribute(pt.expando)
            }
            "script" === n && e.text !== t.text ? (C(e).text = t.text,
            $(e)) : "object" === n ? (e.parentNode && (e.outerHTML = t.outerHTML),
            dt.html5Clone && t.innerHTML && !pt.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === n && Ft.test(t.type) ? (e.defaultChecked = e.checked = t.checked,
            e.value !== t.value && (e.value = t.value)) : "option" === n ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === n || "textarea" === n) && (e.defaultValue = t.defaultValue)
        }
    }
    function E(t, e, n, i) {
        e = rt.apply([], e);
        var o, r, s, a, l, u, c = 0, d = t.length, h = d - 1, p = e[0], g = pt.isFunction(p);
        if (g || d > 1 && "string" == typeof p && !dt.checkClone && ie.test(p))
            return t.each(function(o) {
                var r = t.eq(o);
                g && (e[0] = p.call(this, o, r.html())),
                E(r, e, n, i)
            });
        if (d && (u = v(e, t[0].ownerDocument, !1, t, i),
        o = u.firstChild,
        1 === u.childNodes.length && (u = o),
        o || i)) {
            for (a = pt.map(f(u, "script"), C),
            s = a.length; d > c; c++)
                r = u,
                c !== h && (r = pt.clone(r, !0, !0),
                s && pt.merge(a, f(r, "script"))),
                n.call(t[c], r, c);
            if (s)
                for (l = a[a.length - 1].ownerDocument,
                pt.map(a, $),
                c = 0; s > c; c++)
                    r = a[c],
                    zt.test(r.type || "") && !pt._data(r, "globalEval") && pt.contains(l, r) && (r.src ? pt._evalUrl && pt._evalUrl(r.src) : pt.globalEval((r.text || r.textContent || r.innerHTML || "").replace(re, "")));
            u = o = null
        }
        return t
    }
    function S(t, e, n) {
        for (var i, o = e ? pt.filter(e, t) : t, r = 0; null != (i = o[r]); r++)
            n || 1 !== i.nodeType || pt.cleanData(f(i)),
            i.parentNode && (n && pt.contains(i.ownerDocument, i) && g(f(i, "script")),
            i.parentNode.removeChild(i));
        return t
    }
    function N(t, e) {
        var n = pt(e.createElement(t)).appendTo(e.body)
          , i = pt.css(n[0], "display");
        return n.detach(),
        i
    }
    function A(t) {
        var e = it
          , n = ue[t];
        return n || (n = N(t, e),
        "none" !== n && n || (le = (le || pt("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement),
        e = (le[0].contentWindow || le[0].contentDocument).document,
        e.write(),
        e.close(),
        n = N(t, e),
        le.detach()),
        ue[t] = n),
        n
    }
    function D(t, e) {
        return {
            get: function() {
                return t() ? void delete this.get : (this.get = e).apply(this, arguments)
            }
        }
    }
    function P(t) {
        if (t in $e)
            return t;
        for (var e = t.charAt(0).toUpperCase() + t.slice(1), n = Ce.length; n--; )
            if (t = Ce[n] + e,
            t in $e)
                return t
    }
    function j(t, e) {
        for (var n, i, o, r = [], s = 0, a = t.length; a > s; s++)
            i = t[s],
            i.style && (r[s] = pt._data(i, "olddisplay"),
            n = i.style.display,
            e ? (r[s] || "none" !== n || (i.style.display = ""),
            "" === i.style.display && Mt(i) && (r[s] = pt._data(i, "olddisplay", A(i.nodeName)))) : (o = Mt(i),
            (n && "none" !== n || !o) && pt._data(i, "olddisplay", o ? n : pt.css(i, "display"))));
        for (s = 0; a > s; s++)
            i = t[s],
            i.style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? r[s] || "" : "none"));
        return t
    }
    function O(t, e, n) {
        var i = we.exec(e);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e
    }
    function I(t, e, n, i, o) {
        for (var r = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, s = 0; 4 > r; r += 2)
            "margin" === n && (s += pt.css(t, n + Lt[r], !0, o)),
            i ? ("content" === n && (s -= pt.css(t, "padding" + Lt[r], !0, o)),
            "margin" !== n && (s -= pt.css(t, "border" + Lt[r] + "Width", !0, o))) : (s += pt.css(t, "padding" + Lt[r], !0, o),
            "padding" !== n && (s += pt.css(t, "border" + Lt[r] + "Width", !0, o)));
        return s
    }
    function H(e, n, i) {
        var o = !0
          , r = "width" === n ? e.offsetWidth : e.offsetHeight
          , s = fe(e)
          , a = dt.boxSizing && "border-box" === pt.css(e, "boxSizing", !1, s);
        if (it.msFullscreenElement && t.top !== t && e.getClientRects().length && (r = Math.round(100 * e.getBoundingClientRect()[n])),
        0 >= r || null == r) {
            if (r = ge(e, n, s),
            (0 > r || null == r) && (r = e.style[n]),
            de.test(r))
                return r;
            o = a && (dt.boxSizingReliable() || r === e.style[n]),
            r = parseFloat(r) || 0
        }
        return r + I(e, n, i || (a ? "border" : "content"), o, s) + "px"
    }
    function L(t, e, n, i, o) {
        return new L.prototype.init(t,e,n,i,o)
    }
    function M() {
        return t.setTimeout(function() {
            Te = void 0
        }),
        Te = pt.now()
    }
    function R(t, e) {
        var n, i = {
            height: t
        }, o = 0;
        for (e = e ? 1 : 0; 4 > o; o += 2 - e)
            n = Lt[o],
            i["margin" + n] = i["padding" + n] = t;
        return e && (i.opacity = i.width = t),
        i
    }
    function F(t, e, n) {
        for (var i, o = (W.tweeners[e] || []).concat(W.tweeners["*"]), r = 0, s = o.length; s > r; r++)
            if (i = o[r].call(n, e, t))
                return i
    }
    function q(t, e, n) {
        var i, o, r, s, a, l, u, c, d = this, h = {}, p = t.style, f = t.nodeType && Mt(t), g = pt._data(t, "fxshow");
        n.queue || (a = pt._queueHooks(t, "fx"),
        null == a.unqueued && (a.unqueued = 0,
        l = a.empty.fire,
        a.empty.fire = function() {
            a.unqueued || l()
        }
        ),
        a.unqueued++,
        d.always(function() {
            d.always(function() {
                a.unqueued--,
                pt.queue(t, "fx").length || a.empty.fire()
            })
        })),
        1 === t.nodeType && ("height"in e || "width"in e) && (n.overflow = [p.overflow, p.overflowX, p.overflowY],
        u = pt.css(t, "display"),
        c = "none" === u ? pt._data(t, "olddisplay") || A(t.nodeName) : u,
        "inline" === c && "none" === pt.css(t, "float") && (dt.inlineBlockNeedsLayout && "inline" !== A(t.nodeName) ? p.zoom = 1 : p.display = "inline-block")),
        n.overflow && (p.overflow = "hidden",
        dt.shrinkWrapBlocks() || d.always(function() {
            p.overflow = n.overflow[0],
            p.overflowX = n.overflow[1],
            p.overflowY = n.overflow[2]
        }));
        for (i in e)
            if (o = e[i],
            Ee.exec(o)) {
                if (delete e[i],
                r = r || "toggle" === o,
                o === (f ? "hide" : "show")) {
                    if ("show" !== o || !g || void 0 === g[i])
                        continue;
                    f = !0
                }
                h[i] = g && g[i] || pt.style(t, i)
            } else
                u = void 0;
        if (pt.isEmptyObject(h))
            "inline" === ("none" === u ? A(t.nodeName) : u) && (p.display = u);
        else {
            g ? "hidden"in g && (f = g.hidden) : g = pt._data(t, "fxshow", {}),
            r && (g.hidden = !f),
            f ? pt(t).show() : d.done(function() {
                pt(t).hide()
            }),
            d.done(function() {
                var e;
                pt._removeData(t, "fxshow");
                for (e in h)
                    pt.style(t, e, h[e])
            });
            for (i in h)
                s = F(f ? g[i] : 0, i, d),
                i in g || (g[i] = s.start,
                f && (s.end = s.start,
                s.start = "width" === i || "height" === i ? 1 : 0))
        }
    }
    function z(t, e) {
        var n, i, o, r, s;
        for (n in t)
            if (i = pt.camelCase(n),
            o = e[i],
            r = t[n],
            pt.isArray(r) && (o = r[1],
            r = t[n] = r[0]),
            n !== i && (t[i] = r,
            delete t[n]),
            s = pt.cssHooks[i],
            s && "expand"in s) {
                r = s.expand(r),
                delete t[i];
                for (n in r)
                    n in t || (t[n] = r[n],
                    e[n] = o)
            } else
                e[i] = o
    }
    function W(t, e, n) {
        var i, o, r = 0, s = W.prefilters.length, a = pt.Deferred().always(function() {
            delete l.elem
        }), l = function() {
            if (o)
                return !1;
            for (var e = Te || M(), n = Math.max(0, u.startTime + u.duration - e), i = n / u.duration || 0, r = 1 - i, s = 0, l = u.tweens.length; l > s; s++)
                u.tweens[s].run(r);
            return a.notifyWith(t, [u, r, n]),
            1 > r && l ? n : (a.resolveWith(t, [u]),
            !1)
        }, u = a.promise({
            elem: t,
            props: pt.extend({}, e),
            opts: pt.extend(!0, {
                specialEasing: {},
                easing: pt.easing._default
            }, n),
            originalProperties: e,
            originalOptions: n,
            startTime: Te || M(),
            duration: n.duration,
            tweens: [],
            createTween: function(e, n) {
                var i = pt.Tween(t, u.opts, e, n, u.opts.specialEasing[e] || u.opts.easing);
                return u.tweens.push(i),
                i
            },
            stop: function(e) {
                var n = 0
                  , i = e ? u.tweens.length : 0;
                if (o)
                    return this;
                for (o = !0; i > n; n++)
                    u.tweens[n].run(1);
                return e ? (a.notifyWith(t, [u, 1, 0]),
                a.resolveWith(t, [u, e])) : a.rejectWith(t, [u, e]),
                this
            }
        }), c = u.props;
        for (z(c, u.opts.specialEasing); s > r; r++)
            if (i = W.prefilters[r].call(u, t, c, u.opts))
                return pt.isFunction(i.stop) && (pt._queueHooks(u.elem, u.opts.queue).stop = pt.proxy(i.stop, i)),
                i;
        return pt.map(c, F, u),
        pt.isFunction(u.opts.start) && u.opts.start.call(t, u),
        pt.fx.timer(pt.extend(l, {
            elem: t,
            anim: u,
            queue: u.opts.queue
        })),
        u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }
    function B(t) {
        return pt.attr(t, "class") || ""
    }
    function U(t) {
        return function(e, n) {
            "string" != typeof e && (n = e,
            e = "*");
            var i, o = 0, r = e.toLowerCase().match(Nt) || [];
            if (pt.isFunction(n))
                for (; i = r[o++]; )
                    "+" === i.charAt(0) ? (i = i.slice(1) || "*",
                    (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n)
        }
    }
    function X(t, e, n, i) {
        function o(a) {
            var l;
            return r[a] = !0,
            pt.each(t[a] || [], function(t, a) {
                var u = a(e, n, i);
                return "string" != typeof u || s || r[u] ? s ? !(l = u) : void 0 : (e.dataTypes.unshift(u),
                o(u),
                !1)
            }),
            l
        }
        var r = {}
          , s = t === Qe;
        return o(e.dataTypes[0]) || !r["*"] && o("*")
    }
    function V(t, e) {
        var n, i, o = pt.ajaxSettings.flatOptions || {};
        for (i in e)
            void 0 !== e[i] && ((o[i] ? t : n || (n = {}))[i] = e[i]);
        return n && pt.extend(!0, t, n),
        t
    }
    function Y(t, e, n) {
        for (var i, o, r, s, a = t.contents, l = t.dataTypes; "*" === l[0]; )
            l.shift(),
            void 0 === o && (o = t.mimeType || e.getResponseHeader("Content-Type"));
        if (o)
            for (s in a)
                if (a[s] && a[s].test(o)) {
                    l.unshift(s);
                    break
                }
        if (l[0]in n)
            r = l[0];
        else {
            for (s in n) {
                if (!l[0] || t.converters[s + " " + l[0]]) {
                    r = s;
                    break
                }
                i || (i = s)
            }
            r = r || i
        }
        return r ? (r !== l[0] && l.unshift(r),
        n[r]) : void 0
    }
    function G(t, e, n, i) {
        var o, r, s, a, l, u = {}, c = t.dataTypes.slice();
        if (c[1])
            for (s in t.converters)
                u[s.toLowerCase()] = t.converters[s];
        for (r = c.shift(); r; )
            if (t.responseFields[r] && (n[t.responseFields[r]] = e),
            !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)),
            l = r,
            r = c.shift())
                if ("*" === r)
                    r = l;
                else if ("*" !== l && l !== r) {
                    if (s = u[l + " " + r] || u["* " + r],
                    !s)
                        for (o in u)
                            if (a = o.split(" "),
                            a[1] === r && (s = u[l + " " + a[0]] || u["* " + a[0]])) {
                                s === !0 ? s = u[o] : u[o] !== !0 && (r = a[0],
                                c.unshift(a[1]));
                                break
                            }
                    if (s !== !0)
                        if (s && t["throws"])
                            e = s(e);
                        else
                            try {
                                e = s(e)
                            } catch (d) {
                                return {
                                    state: "parsererror",
                                    error: s ? d : "No conversion from " + l + " to " + r
                                }
                            }
                }
        return {
            state: "success",
            data: e
        }
    }
    function J(t) {
        return t.style && t.style.display || pt.css(t, "display")
    }
    function Q(t) {
        for (; t && 1 === t.nodeType; ) {
            if ("none" === J(t) || "hidden" === t.type)
                return !0;
            t = t.parentNode
        }
        return !1
    }
    function K(t, e, n, i) {
        var o;
        if (pt.isArray(e))
            pt.each(e, function(e, o) {
                n || nn.test(t) ? i(t, o) : K(t + "[" + ("object" == typeof o && null != o ? e : "") + "]", o, n, i)
            });
        else if (n || "object" !== pt.type(e))
            i(t, e);
        else
            for (o in e)
                K(t + "[" + o + "]", e[o], n, i)
    }
    function Z() {
        try {
            return new t.XMLHttpRequest
        } catch (e) {}
    }
    function tt() {
        try {
            return new t.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }
    function et(t) {
        return pt.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
    }
    var nt = []
      , it = t.document
      , ot = nt.slice
      , rt = nt.concat
      , st = nt.push
      , at = nt.indexOf
      , lt = {}
      , ut = lt.toString
      , ct = lt.hasOwnProperty
      , dt = {}
      , ht = "1.12.0"
      , pt = function(t, e) {
        return new pt.fn.init(t,e)
    }
      , ft = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
      , gt = /^-ms-/
      , mt = /-([\da-z])/gi
      , vt = function(t, e) {
        return e.toUpperCase()
    };
    pt.fn = pt.prototype = {
        jquery: ht,
        constructor: pt,
        selector: "",
        length: 0,
        toArray: function() {
            return ot.call(this)
        },
        get: function(t) {
            return null != t ? 0 > t ? this[t + this.length] : this[t] : ot.call(this)
        },
        pushStack: function(t) {
            var e = pt.merge(this.constructor(), t);
            return e.prevObject = this,
            e.context = this.context,
            e
        },
        each: function(t) {
            return pt.each(this, t)
        },
        map: function(t) {
            return this.pushStack(pt.map(this, function(e, n) {
                return t.call(e, n, e)
            }))
        },
        slice: function() {
            return this.pushStack(ot.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(t) {
            var e = this.length
              , n = +t + (0 > t ? e : 0);
            return this.pushStack(n >= 0 && e > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: st,
        sort: nt.sort,
        splice: nt.splice
    },
    pt.extend = pt.fn.extend = function() {
        var t, e, n, i, o, r, s = arguments[0] || {}, a = 1, l = arguments.length, u = !1;
        for ("boolean" == typeof s && (u = s,
        s = arguments[a] || {},
        a++),
        "object" == typeof s || pt.isFunction(s) || (s = {}),
        a === l && (s = this,
        a--); l > a; a++)
            if (null != (o = arguments[a]))
                for (i in o)
                    t = s[i],
                    n = o[i],
                    s !== n && (u && n && (pt.isPlainObject(n) || (e = pt.isArray(n))) ? (e ? (e = !1,
                    r = t && pt.isArray(t) ? t : []) : r = t && pt.isPlainObject(t) ? t : {},
                    s[i] = pt.extend(u, r, n)) : void 0 !== n && (s[i] = n));
        return s
    }
    ,
    pt.extend({
        expando: "jQuery" + (ht + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(t) {
            throw new Error(t)
        },
        noop: function() {},
        isFunction: function(t) {
            return "function" === pt.type(t)
        },
        isArray: Array.isArray || function(t) {
            return "array" === pt.type(t)
        }
        ,
        isWindow: function(t) {
            return null != t && t == t.window
        },
        isNumeric: function(t) {
            var e = t && t.toString();
            return !pt.isArray(t) && e - parseFloat(e) + 1 >= 0
        },
        isEmptyObject: function(t) {
            var e;
            for (e in t)
                return !1;
            return !0
        },
        isPlainObject: function(t) {
            var e;
            if (!t || "object" !== pt.type(t) || t.nodeType || pt.isWindow(t))
                return !1;
            try {
                if (t.constructor && !ct.call(t, "constructor") && !ct.call(t.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (n) {
                return !1
            }
            if (!dt.ownFirst)
                for (e in t)
                    return ct.call(t, e);
            for (e in t)
                ;
            return void 0 === e || ct.call(t, e)
        },
        type: function(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? lt[ut.call(t)] || "object" : typeof t
        },
        globalEval: function(e) {
            e && pt.trim(e) && (t.execScript || function(e) {
                t.eval.call(t, e)
            }
            )(e)
        },
        camelCase: function(t) {
            return t.replace(gt, "ms-").replace(mt, vt)
        },
        nodeName: function(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        },
        each: function(t, e) {
            var i, o = 0;
            if (n(t))
                for (i = t.length; i > o && e.call(t[o], o, t[o]) !== !1; o++)
                    ;
            else
                for (o in t)
                    if (e.call(t[o], o, t[o]) === !1)
                        break;
            return t
        },
        trim: function(t) {
            return null == t ? "" : (t + "").replace(ft, "")
        },
        makeArray: function(t, e) {
            var i = e || [];
            return null != t && (n(Object(t)) ? pt.merge(i, "string" == typeof t ? [t] : t) : st.call(i, t)),
            i
        },
        inArray: function(t, e, n) {
            var i;
            if (e) {
                if (at)
                    return at.call(e, t, n);
                for (i = e.length,
                n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
                    if (n in e && e[n] === t)
                        return n
            }
            return -1
        },
        merge: function(t, e) {
            for (var n = +e.length, i = 0, o = t.length; n > i; )
                t[o++] = e[i++];
            if (n !== n)
                for (; void 0 !== e[i]; )
                    t[o++] = e[i++];
            return t.length = o,
            t
        },
        grep: function(t, e, n) {
            for (var i, o = [], r = 0, s = t.length, a = !n; s > r; r++)
                i = !e(t[r], r),
                i !== a && o.push(t[r]);
            return o
        },
        map: function(t, e, i) {
            var o, r, s = 0, a = [];
            if (n(t))
                for (o = t.length; o > s; s++)
                    r = e(t[s], s, i),
                    null != r && a.push(r);
            else
                for (s in t)
                    r = e(t[s], s, i),
                    null != r && a.push(r);
            return rt.apply([], a)
        },
        guid: 1,
        proxy: function(t, e) {
            var n, i, o;
            return "string" == typeof e && (o = t[e],
            e = t,
            t = o),
            pt.isFunction(t) ? (n = ot.call(arguments, 2),
            i = function() {
                return t.apply(e || this, n.concat(ot.call(arguments)))
            }
            ,
            i.guid = t.guid = t.guid || pt.guid++,
            i) : void 0
        },
        now: function() {
            return +new Date
        },
        support: dt
    }),
    "function" == typeof Symbol && (pt.fn[Symbol.iterator] = nt[Symbol.iterator]),
    pt.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
        lt["[object " + e + "]"] = e.toLowerCase()
    });
    var bt = /*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
    function(t) {
        function e(t, e, n, i) {
            var o, r, s, a, l, u, d, p, f = e && e.ownerDocument, g = e ? e.nodeType : 9;
            if (n = n || [],
            "string" != typeof t || !t || 1 !== g && 9 !== g && 11 !== g)
                return n;
            if (!i && ((e ? e.ownerDocument || e : F) !== P && D(e),
            e = e || P,
            O)) {
                if (11 !== g && (u = vt.exec(t)))
                    if (o = u[1]) {
                        if (9 === g) {
                            if (!(s = e.getElementById(o)))
                                return n;
                            if (s.id === o)
                                return n.push(s),
                                n
                        } else if (f && (s = f.getElementById(o)) && M(e, s) && s.id === o)
                            return n.push(s),
                            n
                    } else {
                        if (u[2])
                            return K.apply(n, e.getElementsByTagName(t)),
                            n;
                        if ((o = u[3]) && x.getElementsByClassName && e.getElementsByClassName)
                            return K.apply(n, e.getElementsByClassName(o)),
                            n
                    }
                if (x.qsa && !U[t + " "] && (!I || !I.test(t))) {
                    if (1 !== g)
                        f = e,
                        p = t;
                    else if ("object" !== e.nodeName.toLowerCase()) {
                        for ((a = e.getAttribute("id")) ? a = a.replace(yt, "\\$&") : e.setAttribute("id", a = R),
                        d = T(t),
                        r = d.length,
                        l = ht.test(a) ? "#" + a : "[id='" + a + "']"; r--; )
                            d[r] = l + " " + h(d[r]);
                        p = d.join(","),
                        f = bt.test(t) && c(e.parentNode) || e
                    }
                    if (p)
                        try {
                            return K.apply(n, f.querySelectorAll(p)),
                            n
                        } catch (m) {} finally {
                            a === R && e.removeAttribute("id")
                        }
                }
            }
            return E(t.replace(at, "$1"), e, n, i)
        }
        function n() {
            function t(n, i) {
                return e.push(n + " ") > _.cacheLength && delete t[e.shift()],
                t[n + " "] = i
            }
            var e = [];
            return t
        }
        function i(t) {
            return t[R] = !0,
            t
        }
        function o(t) {
            var e = P.createElement("div");
            try {
                return !!t(e)
            } catch (n) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e),
                e = null
            }
        }
        function r(t, e) {
            for (var n = t.split("|"), i = n.length; i--; )
                _.attrHandle[n[i]] = e
        }
        function s(t, e) {
            var n = e && t
              , i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || V) - (~t.sourceIndex || V);
            if (i)
                return i;
            if (n)
                for (; n = n.nextSibling; )
                    if (n === e)
                        return -1;
            return t ? 1 : -1
        }
        function a(t) {
            return function(e) {
                var n = e.nodeName.toLowerCase();
                return "input" === n && e.type === t
            }
        }
        function l(t) {
            return function(e) {
                var n = e.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && e.type === t
            }
        }
        function u(t) {
            return i(function(e) {
                return e = +e,
                i(function(n, i) {
                    for (var o, r = t([], n.length, e), s = r.length; s--; )
                        n[o = r[s]] && (n[o] = !(i[o] = n[o]))
                })
            })
        }
        function c(t) {
            return t && "undefined" != typeof t.getElementsByTagName && t
        }
        function d() {}
        function h(t) {
            for (var e = 0, n = t.length, i = ""; n > e; e++)
                i += t[e].value;
            return i
        }
        function p(t, e, n) {
            var i = e.dir
              , o = n && "parentNode" === i
              , r = z++;
            return e.first ? function(e, n, r) {
                for (; e = e[i]; )
                    if (1 === e.nodeType || o)
                        return t(e, n, r)
            }
            : function(e, n, s) {
                var a, l, u, c = [q, r];
                if (s) {
                    for (; e = e[i]; )
                        if ((1 === e.nodeType || o) && t(e, n, s))
                            return !0
                } else
                    for (; e = e[i]; )
                        if (1 === e.nodeType || o) {
                            if (u = e[R] || (e[R] = {}),
                            l = u[e.uniqueID] || (u[e.uniqueID] = {}),
                            (a = l[i]) && a[0] === q && a[1] === r)
                                return c[2] = a[2];
                            if (l[i] = c,
                            c[2] = t(e, n, s))
                                return !0
                        }
            }
        }
        function f(t) {
            return t.length > 1 ? function(e, n, i) {
                for (var o = t.length; o--; )
                    if (!t[o](e, n, i))
                        return !1;
                return !0
            }
            : t[0]
        }
        function g(t, n, i) {
            for (var o = 0, r = n.length; r > o; o++)
                e(t, n[o], i);
            return i
        }
        function m(t, e, n, i, o) {
            for (var r, s = [], a = 0, l = t.length, u = null != e; l > a; a++)
                (r = t[a]) && (!n || n(r, i, o)) && (s.push(r),
                u && e.push(a));
            return s
        }
        function v(t, e, n, o, r, s) {
            return o && !o[R] && (o = v(o)),
            r && !r[R] && (r = v(r, s)),
            i(function(i, s, a, l) {
                var u, c, d, h = [], p = [], f = s.length, v = i || g(e || "*", a.nodeType ? [a] : a, []), b = !t || !i && e ? v : m(v, h, t, a, l), y = n ? r || (i ? t : f || o) ? [] : s : b;
                if (n && n(b, y, a, l),
                o)
                    for (u = m(y, p),
                    o(u, [], a, l),
                    c = u.length; c--; )
                        (d = u[c]) && (y[p[c]] = !(b[p[c]] = d));
                if (i) {
                    if (r || t) {
                        if (r) {
                            for (u = [],
                            c = y.length; c--; )
                                (d = y[c]) && u.push(b[c] = d);
                            r(null, y = [], u, l)
                        }
                        for (c = y.length; c--; )
                            (d = y[c]) && (u = r ? tt(i, d) : h[c]) > -1 && (i[u] = !(s[u] = d))
                    }
                } else
                    y = m(y === s ? y.splice(f, y.length) : y),
                    r ? r(null, s, y, l) : K.apply(s, y)
            })
        }
        function b(t) {
            for (var e, n, i, o = t.length, r = _.relative[t[0].type], s = r || _.relative[" "], a = r ? 1 : 0, l = p(function(t) {
                return t === e
            }, s, !0), u = p(function(t) {
                return tt(e, t) > -1
            }, s, !0), c = [function(t, n, i) {
                var o = !r && (i || n !== S) || ((e = n).nodeType ? l(t, n, i) : u(t, n, i));
                return e = null,
                o
            }
            ]; o > a; a++)
                if (n = _.relative[t[a].type])
                    c = [p(f(c), n)];
                else {
                    if (n = _.filter[t[a].type].apply(null, t[a].matches),
                    n[R]) {
                        for (i = ++a; o > i && !_.relative[t[i].type]; i++)
                            ;
                        return v(a > 1 && f(c), a > 1 && h(t.slice(0, a - 1).concat({
                            value: " " === t[a - 2].type ? "*" : ""
                        })).replace(at, "$1"), n, i > a && b(t.slice(a, i)), o > i && b(t = t.slice(i)), o > i && h(t))
                    }
                    c.push(n)
                }
            return f(c)
        }
        function y(t, n) {
            var o = n.length > 0
              , r = t.length > 0
              , s = function(i, s, a, l, u) {
                var c, d, h, p = 0, f = "0", g = i && [], v = [], b = S, y = i || r && _.find.TAG("*", u), w = q += null == b ? 1 : Math.random() || .1, x = y.length;
                for (u && (S = s === P || s || u); f !== x && null != (c = y[f]); f++) {
                    if (r && c) {
                        for (d = 0,
                        s || c.ownerDocument === P || (D(c),
                        a = !O); h = t[d++]; )
                            if (h(c, s || P, a)) {
                                l.push(c);
                                break
                            }
                        u && (q = w)
                    }
                    o && ((c = !h && c) && p--,
                    i && g.push(c))
                }
                if (p += f,
                o && f !== p) {
                    for (d = 0; h = n[d++]; )
                        h(g, v, s, a);
                    if (i) {
                        if (p > 0)
                            for (; f--; )
                                g[f] || v[f] || (v[f] = J.call(l));
                        v = m(v)
                    }
                    K.apply(l, v),
                    u && !i && v.length > 0 && p + n.length > 1 && e.uniqueSort(l)
                }
                return u && (q = w,
                S = b),
                g
            };
            return o ? i(s) : s
        }
        var w, x, _, C, $, T, k, E, S, N, A, D, P, j, O, I, H, L, M, R = "sizzle" + 1 * new Date, F = t.document, q = 0, z = 0, W = n(), B = n(), U = n(), X = function(t, e) {
            return t === e && (A = !0),
            0
        }, V = 1 << 31, Y = {}.hasOwnProperty, G = [], J = G.pop, Q = G.push, K = G.push, Z = G.slice, tt = function(t, e) {
            for (var n = 0, i = t.length; i > n; n++)
                if (t[n] === e)
                    return n;
            return -1
        }, et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", nt = "[\\x20\\t\\r\\n\\f]", it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ot = "\\[" + nt + "*(" + it + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + it + "))|)" + nt + "*\\]", rt = ":(" + it + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ot + ")*)|.*)\\)|)", st = new RegExp(nt + "+","g"), at = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$","g"), lt = new RegExp("^" + nt + "*," + nt + "*"), ut = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"), ct = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]","g"), dt = new RegExp(rt), ht = new RegExp("^" + it + "$"), pt = {
            ID: new RegExp("^#(" + it + ")"),
            CLASS: new RegExp("^\\.(" + it + ")"),
            TAG: new RegExp("^(" + it + "|[*])"),
            ATTR: new RegExp("^" + ot),
            PSEUDO: new RegExp("^" + rt),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)","i"),
            bool: new RegExp("^(?:" + et + ")$","i"),
            needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)","i")
        }, ft = /^(?:input|select|textarea|button)$/i, gt = /^h\d$/i, mt = /^[^{]+\{\s*\[native \w/, vt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, bt = /[+~]/, yt = /'|\\/g, wt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)","ig"), xt = function(t, e, n) {
            var i = "0x" + e - 65536;
            return i !== i || n ? e : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
        }, _t = function() {
            D()
        };
        try {
            K.apply(G = Z.call(F.childNodes), F.childNodes),
            G[F.childNodes.length].nodeType
        } catch (Ct) {
            K = {
                apply: G.length ? function(t, e) {
                    Q.apply(t, Z.call(e))
                }
                : function(t, e) {
                    for (var n = t.length, i = 0; t[n++] = e[i++]; )
                        ;
                    t.length = n - 1
                }
            }
        }
        x = e.support = {},
        $ = e.isXML = function(t) {
            var e = t && (t.ownerDocument || t).documentElement;
            return e ? "HTML" !== e.nodeName : !1
        }
        ,
        D = e.setDocument = function(t) {
            var e, n, i = t ? t.ownerDocument || t : F;
            return i !== P && 9 === i.nodeType && i.documentElement ? (P = i,
            j = P.documentElement,
            O = !$(P),
            (n = P.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", _t, !1) : n.attachEvent && n.attachEvent("onunload", _t)),
            x.attributes = o(function(t) {
                return t.className = "i",
                !t.getAttribute("className")
            }),
            x.getElementsByTagName = o(function(t) {
                return t.appendChild(P.createComment("")),
                !t.getElementsByTagName("*").length
            }),
            x.getElementsByClassName = mt.test(P.getElementsByClassName),
            x.getById = o(function(t) {
                return j.appendChild(t).id = R,
                !P.getElementsByName || !P.getElementsByName(R).length
            }),
            x.getById ? (_.find.ID = function(t, e) {
                if ("undefined" != typeof e.getElementById && O) {
                    var n = e.getElementById(t);
                    return n ? [n] : []
                }
            }
            ,
            _.filter.ID = function(t) {
                var e = t.replace(wt, xt);
                return function(t) {
                    return t.getAttribute("id") === e
                }
            }
            ) : (delete _.find.ID,
            _.filter.ID = function(t) {
                var e = t.replace(wt, xt);
                return function(t) {
                    var n = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                    return n && n.value === e
                }
            }
            ),
            _.find.TAG = x.getElementsByTagName ? function(t, e) {
                return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : x.qsa ? e.querySelectorAll(t) : void 0
            }
            : function(t, e) {
                var n, i = [], o = 0, r = e.getElementsByTagName(t);
                if ("*" === t) {
                    for (; n = r[o++]; )
                        1 === n.nodeType && i.push(n);
                    return i
                }
                return r
            }
            ,
            _.find.CLASS = x.getElementsByClassName && function(t, e) {
                return "undefined" != typeof e.getElementsByClassName && O ? e.getElementsByClassName(t) : void 0
            }
            ,
            H = [],
            I = [],
            (x.qsa = mt.test(P.querySelectorAll)) && (o(function(t) {
                j.appendChild(t).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                t.querySelectorAll("[msallowcapture^='']").length && I.push("[*^$]=" + nt + "*(?:''|\"\")"),
                t.querySelectorAll("[selected]").length || I.push("\\[" + nt + "*(?:value|" + et + ")"),
                t.querySelectorAll("[id~=" + R + "-]").length || I.push("~="),
                t.querySelectorAll(":checked").length || I.push(":checked"),
                t.querySelectorAll("a#" + R + "+*").length || I.push(".#.+[+~]")
            }),
            o(function(t) {
                var e = P.createElement("input");
                e.setAttribute("type", "hidden"),
                t.appendChild(e).setAttribute("name", "D"),
                t.querySelectorAll("[name=d]").length && I.push("name" + nt + "*[*^$|!~]?="),
                t.querySelectorAll(":enabled").length || I.push(":enabled", ":disabled"),
                t.querySelectorAll("*,:x"),
                I.push(",.*:")
            })),
            (x.matchesSelector = mt.test(L = j.matches || j.webkitMatchesSelector || j.mozMatchesSelector || j.oMatchesSelector || j.msMatchesSelector)) && o(function(t) {
                x.disconnectedMatch = L.call(t, "div"),
                L.call(t, "[s!='']:x"),
                H.push("!=", rt)
            }),
            I = I.length && new RegExp(I.join("|")),
            H = H.length && new RegExp(H.join("|")),
            e = mt.test(j.compareDocumentPosition),
            M = e || mt.test(j.contains) ? function(t, e) {
                var n = 9 === t.nodeType ? t.documentElement : t
                  , i = e && e.parentNode;
                return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
            }
            : function(t, e) {
                if (e)
                    for (; e = e.parentNode; )
                        if (e === t)
                            return !0;
                return !1
            }
            ,
            X = e ? function(t, e) {
                if (t === e)
                    return A = !0,
                    0;
                var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return n ? n : (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1,
                1 & n || !x.sortDetached && e.compareDocumentPosition(t) === n ? t === P || t.ownerDocument === F && M(F, t) ? -1 : e === P || e.ownerDocument === F && M(F, e) ? 1 : N ? tt(N, t) - tt(N, e) : 0 : 4 & n ? -1 : 1)
            }
            : function(t, e) {
                if (t === e)
                    return A = !0,
                    0;
                var n, i = 0, o = t.parentNode, r = e.parentNode, a = [t], l = [e];
                if (!o || !r)
                    return t === P ? -1 : e === P ? 1 : o ? -1 : r ? 1 : N ? tt(N, t) - tt(N, e) : 0;
                if (o === r)
                    return s(t, e);
                for (n = t; n = n.parentNode; )
                    a.unshift(n);
                for (n = e; n = n.parentNode; )
                    l.unshift(n);
                for (; a[i] === l[i]; )
                    i++;
                return i ? s(a[i], l[i]) : a[i] === F ? -1 : l[i] === F ? 1 : 0
            }
            ,
            P) : P
        }
        ,
        e.matches = function(t, n) {
            return e(t, null, null, n)
        }
        ,
        e.matchesSelector = function(t, n) {
            if ((t.ownerDocument || t) !== P && D(t),
            n = n.replace(ct, "='$1']"),
            x.matchesSelector && O && !U[n + " "] && (!H || !H.test(n)) && (!I || !I.test(n)))
                try {
                    var i = L.call(t, n);
                    if (i || x.disconnectedMatch || t.document && 11 !== t.document.nodeType)
                        return i
                } catch (o) {}
            return e(n, P, null, [t]).length > 0
        }
        ,
        e.contains = function(t, e) {
            return (t.ownerDocument || t) !== P && D(t),
            M(t, e)
        }
        ,
        e.attr = function(t, e) {
            (t.ownerDocument || t) !== P && D(t);
            var n = _.attrHandle[e.toLowerCase()]
              , i = n && Y.call(_.attrHandle, e.toLowerCase()) ? n(t, e, !O) : void 0;
            return void 0 !== i ? i : x.attributes || !O ? t.getAttribute(e) : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
        }
        ,
        e.error = function(t) {
            throw new Error("Syntax error, unrecognized expression: " + t)
        }
        ,
        e.uniqueSort = function(t) {
            var e, n = [], i = 0, o = 0;
            if (A = !x.detectDuplicates,
            N = !x.sortStable && t.slice(0),
            t.sort(X),
            A) {
                for (; e = t[o++]; )
                    e === t[o] && (i = n.push(o));
                for (; i--; )
                    t.splice(n[i], 1)
            }
            return N = null,
            t
        }
        ,
        C = e.getText = function(t) {
            var e, n = "", i = 0, o = t.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof t.textContent)
                        return t.textContent;
                    for (t = t.firstChild; t; t = t.nextSibling)
                        n += C(t)
                } else if (3 === o || 4 === o)
                    return t.nodeValue
            } else
                for (; e = t[i++]; )
                    n += C(e);
            return n
        }
        ,
        _ = e.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: pt,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(t) {
                    return t[1] = t[1].replace(wt, xt),
                    t[3] = (t[3] || t[4] || t[5] || "").replace(wt, xt),
                    "~=" === t[2] && (t[3] = " " + t[3] + " "),
                    t.slice(0, 4)
                },
                CHILD: function(t) {
                    return t[1] = t[1].toLowerCase(),
                    "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]),
                    t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])),
                    t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]),
                    t
                },
                PSEUDO: function(t) {
                    var e, n = !t[6] && t[2];
                    return pt.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && dt.test(n) && (e = T(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e),
                    t[2] = n.slice(0, e)),
                    t.slice(0, 3))
                }
            },
            filter: {
                TAG: function(t) {
                    var e = t.replace(wt, xt).toLowerCase();
                    return "*" === t ? function() {
                        return !0
                    }
                    : function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                },
                CLASS: function(t) {
                    var e = W[t + " "];
                    return e || (e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) && W(t, function(t) {
                        return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                    })
                },
                ATTR: function(t, n, i) {
                    return function(o) {
                        var r = e.attr(o, t);
                        return null == r ? "!=" === n : n ? (r += "",
                        "=" === n ? r === i : "!=" === n ? r !== i : "^=" === n ? i && 0 === r.indexOf(i) : "*=" === n ? i && r.indexOf(i) > -1 : "$=" === n ? i && r.slice(-i.length) === i : "~=" === n ? (" " + r.replace(st, " ") + " ").indexOf(i) > -1 : "|=" === n ? r === i || r.slice(0, i.length + 1) === i + "-" : !1) : !0
                    }
                },
                CHILD: function(t, e, n, i, o) {
                    var r = "nth" !== t.slice(0, 3)
                      , s = "last" !== t.slice(-4)
                      , a = "of-type" === e;
                    return 1 === i && 0 === o ? function(t) {
                        return !!t.parentNode
                    }
                    : function(e, n, l) {
                        var u, c, d, h, p, f, g = r !== s ? "nextSibling" : "previousSibling", m = e.parentNode, v = a && e.nodeName.toLowerCase(), b = !l && !a, y = !1;
                        if (m) {
                            if (r) {
                                for (; g; ) {
                                    for (h = e; h = h[g]; )
                                        if (a ? h.nodeName.toLowerCase() === v : 1 === h.nodeType)
                                            return !1;
                                    f = g = "only" === t && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [s ? m.firstChild : m.lastChild],
                            s && b) {
                                for (h = m,
                                d = h[R] || (h[R] = {}),
                                c = d[h.uniqueID] || (d[h.uniqueID] = {}),
                                u = c[t] || [],
                                p = u[0] === q && u[1],
                                y = p && u[2],
                                h = p && m.childNodes[p]; h = ++p && h && h[g] || (y = p = 0) || f.pop(); )
                                    if (1 === h.nodeType && ++y && h === e) {
                                        c[t] = [q, p, y];
                                        break
                                    }
                            } else if (b && (h = e,
                            d = h[R] || (h[R] = {}),
                            c = d[h.uniqueID] || (d[h.uniqueID] = {}),
                            u = c[t] || [],
                            p = u[0] === q && u[1],
                            y = p),
                            y === !1)
                                for (; (h = ++p && h && h[g] || (y = p = 0) || f.pop()) && ((a ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++y || (b && (d = h[R] || (h[R] = {}),
                                c = d[h.uniqueID] || (d[h.uniqueID] = {}),
                                c[t] = [q, y]),
                                h !== e)); )
                                    ;
                            return y -= o,
                            y === i || y % i === 0 && y / i >= 0
                        }
                    }
                },
                PSEUDO: function(t, n) {
                    var o, r = _.pseudos[t] || _.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                    return r[R] ? r(n) : r.length > 1 ? (o = [t, t, "", n],
                    _.setFilters.hasOwnProperty(t.toLowerCase()) ? i(function(t, e) {
                        for (var i, o = r(t, n), s = o.length; s--; )
                            i = tt(t, o[s]),
                            t[i] = !(e[i] = o[s])
                    }) : function(t) {
                        return r(t, 0, o)
                    }
                    ) : r
                }
            },
            pseudos: {
                not: i(function(t) {
                    var e = []
                      , n = []
                      , o = k(t.replace(at, "$1"));
                    return o[R] ? i(function(t, e, n, i) {
                        for (var r, s = o(t, null, i, []), a = t.length; a--; )
                            (r = s[a]) && (t[a] = !(e[a] = r))
                    }) : function(t, i, r) {
                        return e[0] = t,
                        o(e, null, r, n),
                        e[0] = null,
                        !n.pop()
                    }
                }),
                has: i(function(t) {
                    return function(n) {
                        return e(t, n).length > 0
                    }
                }),
                contains: i(function(t) {
                    return t = t.replace(wt, xt),
                    function(e) {
                        return (e.textContent || e.innerText || C(e)).indexOf(t) > -1
                    }
                }),
                lang: i(function(t) {
                    return ht.test(t || "") || e.error("unsupported lang: " + t),
                    t = t.replace(wt, xt).toLowerCase(),
                    function(e) {
                        var n;
                        do
                            if (n = O ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                                return n = n.toLowerCase(),
                                n === t || 0 === n.indexOf(t + "-");
                        while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1
                    }
                }),
                target: function(e) {
                    var n = t.location && t.location.hash;
                    return n && n.slice(1) === e.id
                },
                root: function(t) {
                    return t === j
                },
                focus: function(t) {
                    return t === P.activeElement && (!P.hasFocus || P.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                },
                enabled: function(t) {
                    return t.disabled === !1
                },
                disabled: function(t) {
                    return t.disabled === !0
                },
                checked: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                },
                selected: function(t) {
                    return t.parentNode && t.parentNode.selectedIndex,
                    t.selected === !0
                },
                empty: function(t) {
                    for (t = t.firstChild; t; t = t.nextSibling)
                        if (t.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(t) {
                    return !_.pseudos.empty(t)
                },
                header: function(t) {
                    return gt.test(t.nodeName)
                },
                input: function(t) {
                    return ft.test(t.nodeName)
                },
                button: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && "button" === t.type || "button" === e
                },
                text: function(t) {
                    var e;
                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                },
                first: u(function() {
                    return [0]
                }),
                last: u(function(t, e) {
                    return [e - 1]
                }),
                eq: u(function(t, e, n) {
                    return [0 > n ? n + e : n]
                }),
                even: u(function(t, e) {
                    for (var n = 0; e > n; n += 2)
                        t.push(n);
                    return t
                }),
                odd: u(function(t, e) {
                    for (var n = 1; e > n; n += 2)
                        t.push(n);
                    return t
                }),
                lt: u(function(t, e, n) {
                    for (var i = 0 > n ? n + e : n; --i >= 0; )
                        t.push(i);
                    return t
                }),
                gt: u(function(t, e, n) {
                    for (var i = 0 > n ? n + e : n; ++i < e; )
                        t.push(i);
                    return t
                })
            }
        },
        _.pseudos.nth = _.pseudos.eq;
        for (w in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            _.pseudos[w] = a(w);
        for (w in {
            submit: !0,
            reset: !0
        })
            _.pseudos[w] = l(w);
        return d.prototype = _.filters = _.pseudos,
        _.setFilters = new d,
        T = e.tokenize = function(t, n) {
            var i, o, r, s, a, l, u, c = B[t + " "];
            if (c)
                return n ? 0 : c.slice(0);
            for (a = t,
            l = [],
            u = _.preFilter; a; ) {
                (!i || (o = lt.exec(a))) && (o && (a = a.slice(o[0].length) || a),
                l.push(r = [])),
                i = !1,
                (o = ut.exec(a)) && (i = o.shift(),
                r.push({
                    value: i,
                    type: o[0].replace(at, " ")
                }),
                a = a.slice(i.length));
                for (s in _.filter)
                    !(o = pt[s].exec(a)) || u[s] && !(o = u[s](o)) || (i = o.shift(),
                    r.push({
                        value: i,
                        type: s,
                        matches: o
                    }),
                    a = a.slice(i.length));
                if (!i)
                    break
            }
            return n ? a.length : a ? e.error(t) : B(t, l).slice(0)
        }
        ,
        k = e.compile = function(t, e) {
            var n, i = [], o = [], r = U[t + " "];
            if (!r) {
                for (e || (e = T(t)),
                n = e.length; n--; )
                    r = b(e[n]),
                    r[R] ? i.push(r) : o.push(r);
                r = U(t, y(o, i)),
                r.selector = t
            }
            return r
        }
        ,
        E = e.select = function(t, e, n, i) {
            var o, r, s, a, l, u = "function" == typeof t && t, d = !i && T(t = u.selector || t);
            if (n = n || [],
            1 === d.length) {
                if (r = d[0] = d[0].slice(0),
                r.length > 2 && "ID" === (s = r[0]).type && x.getById && 9 === e.nodeType && O && _.relative[r[1].type]) {
                    if (e = (_.find.ID(s.matches[0].replace(wt, xt), e) || [])[0],
                    !e)
                        return n;
                    u && (e = e.parentNode),
                    t = t.slice(r.shift().value.length)
                }
                for (o = pt.needsContext.test(t) ? 0 : r.length; o-- && (s = r[o],
                !_.relative[a = s.type]); )
                    if ((l = _.find[a]) && (i = l(s.matches[0].replace(wt, xt), bt.test(r[0].type) && c(e.parentNode) || e))) {
                        if (r.splice(o, 1),
                        t = i.length && h(r),
                        !t)
                            return K.apply(n, i),
                            n;
                        break
                    }
            }
            return (u || k(t, d))(i, e, !O, n, !e || bt.test(t) && c(e.parentNode) || e),
            n
        }
        ,
        x.sortStable = R.split("").sort(X).join("") === R,
        x.detectDuplicates = !!A,
        D(),
        x.sortDetached = o(function(t) {
            return 1 & t.compareDocumentPosition(P.createElement("div"))
        }),
        o(function(t) {
            return t.innerHTML = "<a href='#'></a>",
            "#" === t.firstChild.getAttribute("href")
        }) || r("type|href|height|width", function(t, e, n) {
            return n ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }),
        x.attributes && o(function(t) {
            return t.innerHTML = "<input/>",
            t.firstChild.setAttribute("value", ""),
            "" === t.firstChild.getAttribute("value")
        }) || r("value", function(t, e, n) {
            return n || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
        }),
        o(function(t) {
            return null == t.getAttribute("disabled")
        }) || r(et, function(t, e, n) {
            var i;
            return n ? void 0 : t[e] === !0 ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
        }),
        e
    }(t);
    pt.find = bt,
    pt.expr = bt.selectors,
    pt.expr[":"] = pt.expr.pseudos,
    pt.uniqueSort = pt.unique = bt.uniqueSort,
    pt.text = bt.getText,
    pt.isXMLDoc = bt.isXML,
    pt.contains = bt.contains;
    var yt = function(t, e, n) {
        for (var i = [], o = void 0 !== n; (t = t[e]) && 9 !== t.nodeType; )
            if (1 === t.nodeType) {
                if (o && pt(t).is(n))
                    break;
                i.push(t)
            }
        return i
    }
      , wt = function(t, e) {
        for (var n = []; t; t = t.nextSibling)
            1 === t.nodeType && t !== e && n.push(t);
        return n
    }
      , xt = pt.expr.match.needsContext
      , _t = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/
      , Ct = /^.[^:#\[\.,]*$/;
    pt.filter = function(t, e, n) {
        var i = e[0];
        return n && (t = ":not(" + t + ")"),
        1 === e.length && 1 === i.nodeType ? pt.find.matchesSelector(i, t) ? [i] : [] : pt.find.matches(t, pt.grep(e, function(t) {
            return 1 === t.nodeType
        }))
    }
    ,
    pt.fn.extend({
        find: function(t) {
            var e, n = [], i = this, o = i.length;
            if ("string" != typeof t)
                return this.pushStack(pt(t).filter(function() {
                    for (e = 0; o > e; e++)
                        if (pt.contains(i[e], this))
                            return !0
                }));
            for (e = 0; o > e; e++)
                pt.find(t, i[e], n);
            return n = this.pushStack(o > 1 ? pt.unique(n) : n),
            n.selector = this.selector ? this.selector + " " + t : t,
            n
        },
        filter: function(t) {
            return this.pushStack(i(this, t || [], !1))
        },
        not: function(t) {
            return this.pushStack(i(this, t || [], !0))
        },
        is: function(t) {
            return !!i(this, "string" == typeof t && xt.test(t) ? pt(t) : t || [], !1).length
        }
    });
    var $t, Tt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, kt = pt.fn.init = function(t, e, n) {
        var i, o;
        if (!t)
            return this;
        if (n = n || $t,
        "string" == typeof t) {
            if (i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : Tt.exec(t),
            !i || !i[1] && e)
                return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
            if (i[1]) {
                if (e = e instanceof pt ? e[0] : e,
                pt.merge(this, pt.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : it, !0)),
                _t.test(i[1]) && pt.isPlainObject(e))
                    for (i in e)
                        pt.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                return this
            }
            if (o = it.getElementById(i[2]),
            o && o.parentNode) {
                if (o.id !== i[2])
                    return $t.find(t);
                this.length = 1,
                this[0] = o
            }
            return this.context = it,
            this.selector = t,
            this
        }
        return t.nodeType ? (this.context = this[0] = t,
        this.length = 1,
        this) : pt.isFunction(t) ? "undefined" != typeof n.ready ? n.ready(t) : t(pt) : (void 0 !== t.selector && (this.selector = t.selector,
        this.context = t.context),
        pt.makeArray(t, this))
    }
    ;
    kt.prototype = pt.fn,
    $t = pt(it);
    var Et = /^(?:parents|prev(?:Until|All))/
      , St = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    pt.fn.extend({
        has: function(t) {
            var e, n = pt(t, this), i = n.length;
            return this.filter(function() {
                for (e = 0; i > e; e++)
                    if (pt.contains(this, n[e]))
                        return !0
            })
        },
        closest: function(t, e) {
            for (var n, i = 0, o = this.length, r = [], s = xt.test(t) || "string" != typeof t ? pt(t, e || this.context) : 0; o > i; i++)
                for (n = this[i]; n && n !== e; n = n.parentNode)
                    if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && pt.find.matchesSelector(n, t))) {
                        r.push(n);
                        break
                    }
            return this.pushStack(r.length > 1 ? pt.uniqueSort(r) : r)
        },
        index: function(t) {
            return t ? "string" == typeof t ? pt.inArray(this[0], pt(t)) : pt.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            return this.pushStack(pt.uniqueSort(pt.merge(this.get(), pt(t, e))))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }),
    pt.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return yt(t, "parentNode")
        },
        parentsUntil: function(t, e, n) {
            return yt(t, "parentNode", n)
        },
        next: function(t) {
            return o(t, "nextSibling")
        },
        prev: function(t) {
            return o(t, "previousSibling")
        },
        nextAll: function(t) {
            return yt(t, "nextSibling")
        },
        prevAll: function(t) {
            return yt(t, "previousSibling")
        },
        nextUntil: function(t, e, n) {
            return yt(t, "nextSibling", n)
        },
        prevUntil: function(t, e, n) {
            return yt(t, "previousSibling", n)
        },
        siblings: function(t) {
            return wt((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return wt(t.firstChild)
        },
        contents: function(t) {
            return pt.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : pt.merge([], t.childNodes)
        }
    }, function(t, e) {
        pt.fn[t] = function(n, i) {
            var o = pt.map(this, e, n);
            return "Until" !== t.slice(-5) && (i = n),
            i && "string" == typeof i && (o = pt.filter(i, o)),
            this.length > 1 && (St[t] || (o = pt.uniqueSort(o)),
            Et.test(t) && (o = o.reverse())),
            this.pushStack(o)
        }
    });
    var Nt = /\S+/g;
    pt.Callbacks = function(t) {
        t = "string" == typeof t ? r(t) : pt.extend({}, t);
        var e, n, i, o, s = [], a = [], l = -1, u = function() {
            for (o = t.once,
            i = e = !0; a.length; l = -1)
                for (n = a.shift(); ++l < s.length; )
                    s[l].apply(n[0], n[1]) === !1 && t.stopOnFalse && (l = s.length,
                    n = !1);
            t.memory || (n = !1),
            e = !1,
            o && (s = n ? [] : "")
        }, c = {
            add: function() {
                return s && (n && !e && (l = s.length - 1,
                a.push(n)),
                function i(e) {
                    pt.each(e, function(e, n) {
                        pt.isFunction(n) ? t.unique && c.has(n) || s.push(n) : n && n.length && "string" !== pt.type(n) && i(n)
                    })
                }(arguments),
                n && !e && u()),
                this
            },
            remove: function() {
                return pt.each(arguments, function(t, e) {
                    for (var n; (n = pt.inArray(e, s, n)) > -1; )
                        s.splice(n, 1),
                        l >= n && l--
                }),
                this
            },
            has: function(t) {
                return t ? pt.inArray(t, s) > -1 : s.length > 0
            },
            empty: function() {
                return s && (s = []),
                this
            },
            disable: function() {
                return o = a = [],
                s = n = "",
                this
            },
            disabled: function() {
                return !s
            },
            lock: function() {
                return o = !0,
                n || c.disable(),
                this
            },
            locked: function() {
                return !!o
            },
            fireWith: function(t, n) {
                return o || (n = n || [],
                n = [t, n.slice ? n.slice() : n],
                a.push(n),
                e || u()),
                this
            },
            fire: function() {
                return c.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!i
            }
        };
        return c
    }
    ,
    pt.extend({
        Deferred: function(t) {
            var e = [["resolve", "done", pt.Callbacks("once memory"), "resolved"], ["reject", "fail", pt.Callbacks("once memory"), "rejected"], ["notify", "progress", pt.Callbacks("memory")]]
              , n = "pending"
              , i = {
                state: function() {
                    return n
                },
                always: function() {
                    return o.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var t = arguments;
                    return pt.Deferred(function(n) {
                        pt.each(e, function(e, r) {
                            var s = pt.isFunction(t[e]) && t[e];
                            o[r[1]](function() {
                                var t = s && s.apply(this, arguments);
                                t && pt.isFunction(t.promise) ? t.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this === i ? n.promise() : this, s ? [t] : arguments)
                            })
                        }),
                        t = null
                    }).promise()
                },
                promise: function(t) {
                    return null != t ? pt.extend(t, i) : i
                }
            }
              , o = {};
            return i.pipe = i.then,
            pt.each(e, function(t, r) {
                var s = r[2]
                  , a = r[3];
                i[r[1]] = s.add,
                a && s.add(function() {
                    n = a
                }, e[1 ^ t][2].disable, e[2][2].lock),
                o[r[0]] = function() {
                    return o[r[0] + "With"](this === o ? i : this, arguments),
                    this
                }
                ,
                o[r[0] + "With"] = s.fireWith
            }),
            i.promise(o),
            t && t.call(o, o),
            o
        },
        when: function(t) {
            var e, n, i, o = 0, r = ot.call(arguments), s = r.length, a = 1 !== s || t && pt.isFunction(t.promise) ? s : 0, l = 1 === a ? t : pt.Deferred(), u = function(t, n, i) {
                return function(o) {
                    n[t] = this,
                    i[t] = arguments.length > 1 ? ot.call(arguments) : o,
                    i === e ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
                }
            };
            if (s > 1)
                for (e = new Array(s),
                n = new Array(s),
                i = new Array(s); s > o; o++)
                    r[o] && pt.isFunction(r[o].promise) ? r[o].promise().progress(u(o, n, e)).done(u(o, i, r)).fail(l.reject) : --a;
            return a || l.resolveWith(i, r),
            l.promise()
        }
    });
    var At;
    pt.fn.ready = function(t) {
        return pt.ready.promise().done(t),
        this
    }
    ,
    pt.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(t) {
            t ? pt.readyWait++ : pt.ready(!0)
        },
        ready: function(t) {
            (t === !0 ? --pt.readyWait : pt.isReady) || (pt.isReady = !0,
            t !== !0 && --pt.readyWait > 0 || (At.resolveWith(it, [pt]),
            pt.fn.triggerHandler && (pt(it).triggerHandler("ready"),
            pt(it).off("ready"))))
        }
    }),
    pt.ready.promise = function(e) {
        if (!At)
            if (At = pt.Deferred(),
            "complete" === it.readyState)
                t.setTimeout(pt.ready);
            else if (it.addEventListener)
                it.addEventListener("DOMContentLoaded", a),
                t.addEventListener("load", a);
            else {
                it.attachEvent("onreadystatechange", a),
                t.attachEvent("onload", a);
                var n = !1;
                try {
                    n = null == t.frameElement && it.documentElement
                } catch (i) {}
                n && n.doScroll && !function o() {
                    if (!pt.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (e) {
                            return t.setTimeout(o, 50)
                        }
                        s(),
                        pt.ready()
                    }
                }()
            }
        return At.promise(e)
    }
    ,
    pt.ready.promise();
    var Dt;
    for (Dt in pt(dt))
        break;
    dt.ownFirst = "0" === Dt,
    dt.inlineBlockNeedsLayout = !1,
    pt(function() {
        var t, e, n, i;
        n = it.getElementsByTagName("body")[0],
        n && n.style && (e = it.createElement("div"),
        i = it.createElement("div"),
        i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
        n.appendChild(i).appendChild(e),
        "undefined" != typeof e.style.zoom && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",
        dt.inlineBlockNeedsLayout = t = 3 === e.offsetWidth,
        t && (n.style.zoom = 1)),
        n.removeChild(i))
    }),
    function() {
        var t = it.createElement("div");
        dt.deleteExpando = !0;
        try {
            delete t.test
        } catch (e) {
            dt.deleteExpando = !1
        }
        t = null
    }();
    var Pt = function(t) {
        var e = pt.noData[(t.nodeName + " ").toLowerCase()]
          , n = +t.nodeType || 1;
        return 1 !== n && 9 !== n ? !1 : !e || e !== !0 && t.getAttribute("classid") === e
    }
      , jt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , Ot = /([A-Z])/g;
    pt.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(t) {
            return t = t.nodeType ? pt.cache[t[pt.expando]] : t[pt.expando],
            !!t && !u(t)
        },
        data: function(t, e, n) {
            return c(t, e, n)
        },
        removeData: function(t, e) {
            return d(t, e)
        },
        _data: function(t, e, n) {
            return c(t, e, n, !0)
        },
        _removeData: function(t, e) {
            return d(t, e, !0)
        }
    }),
    pt.fn.extend({
        data: function(t, e) {
            var n, i, o, r = this[0], s = r && r.attributes;
            if (void 0 === t) {
                if (this.length && (o = pt.data(r),
                1 === r.nodeType && !pt._data(r, "parsedAttrs"))) {
                    for (n = s.length; n--; )
                        s[n] && (i = s[n].name,
                        0 === i.indexOf("data-") && (i = pt.camelCase(i.slice(5)),
                        l(r, i, o[i])));
                    pt._data(r, "parsedAttrs", !0)
                }
                return o
            }
            return "object" == typeof t ? this.each(function() {
                pt.data(this, t)
            }) : arguments.length > 1 ? this.each(function() {
                pt.data(this, t, e)
            }) : r ? l(r, t, pt.data(r, t)) : void 0
        },
        removeData: function(t) {
            return this.each(function() {
                pt.removeData(this, t)
            })
        }
    }),
    pt.extend({
        queue: function(t, e, n) {
            var i;
            return t ? (e = (e || "fx") + "queue",
            i = pt._data(t, e),
            n && (!i || pt.isArray(n) ? i = pt._data(t, e, pt.makeArray(n)) : i.push(n)),
            i || []) : void 0
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var n = pt.queue(t, e)
              , i = n.length
              , o = n.shift()
              , r = pt._queueHooks(t, e)
              , s = function() {
                pt.dequeue(t, e)
            };
            "inprogress" === o && (o = n.shift(),
            i--),
            o && ("fx" === e && n.unshift("inprogress"),
            delete r.stop,
            o.call(t, s, r)),
            !i && r && r.empty.fire()
        },
        _queueHooks: function(t, e) {
            var n = e + "queueHooks";
            return pt._data(t, n) || pt._data(t, n, {
                empty: pt.Callbacks("once memory").add(function() {
                    pt._removeData(t, e + "queue"),
                    pt._removeData(t, n)
                })
            })
        }
    }),
    pt.fn.extend({
        queue: function(t, e) {
            var n = 2;
            return "string" != typeof t && (e = t,
            t = "fx",
            n--),
            arguments.length < n ? pt.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                var n = pt.queue(this, t, e);
                pt._queueHooks(this, t),
                "fx" === t && "inprogress" !== n[0] && pt.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                pt.dequeue(this, t)
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, e) {
            var n, i = 1, o = pt.Deferred(), r = this, s = this.length, a = function() {
                --i || o.resolveWith(r, [r])
            };
            for ("string" != typeof t && (e = t,
            t = void 0),
            t = t || "fx"; s--; )
                n = pt._data(r[s], t + "queueHooks"),
                n && n.empty && (i++,
                n.empty.add(a));
            return a(),
            o.promise(e)
        }
    }),
    function() {
        var t;
        dt.shrinkWrapBlocks = function() {
            if (null != t)
                return t;
            t = !1;
            var e, n, i;
            return n = it.getElementsByTagName("body")[0],
            n && n.style ? (e = it.createElement("div"),
            i = it.createElement("div"),
            i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
            n.appendChild(i).appendChild(e),
            "undefined" != typeof e.style.zoom && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
            e.appendChild(it.createElement("div")).style.width = "5px",
            t = 3 !== e.offsetWidth),
            n.removeChild(i),
            t) : void 0
        }
    }();
    var It = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , Ht = new RegExp("^(?:([+-])=|)(" + It + ")([a-z%]*)$","i")
      , Lt = ["Top", "Right", "Bottom", "Left"]
      , Mt = function(t, e) {
        return t = e || t,
        "none" === pt.css(t, "display") || !pt.contains(t.ownerDocument, t)
    }
      , Rt = function(t, e, n, i, o, r, s) {
        var a = 0
          , l = t.length
          , u = null == n;
        if ("object" === pt.type(n)) {
            o = !0;
            for (a in n)
                Rt(t, e, a, n[a], !0, r, s)
        } else if (void 0 !== i && (o = !0,
        pt.isFunction(i) || (s = !0),
        u && (s ? (e.call(t, i),
        e = null) : (u = e,
        e = function(t, e, n) {
            return u.call(pt(t), n)
        }
        )),
        e))
            for (; l > a; a++)
                e(t[a], n, s ? i : i.call(t[a], a, e(t[a], n)));
        return o ? t : u ? e.call(t) : l ? e(t[0], n) : r
    }
      , Ft = /^(?:checkbox|radio)$/i
      , qt = /<([\w:-]+)/
      , zt = /^$|\/(?:java|ecma)script/i
      , Wt = /^\s+/
      , Bt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    !function() {
        var t = it.createElement("div")
          , e = it.createDocumentFragment()
          , n = it.createElement("input");
        t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        dt.leadingWhitespace = 3 === t.firstChild.nodeType,
        dt.tbody = !t.getElementsByTagName("tbody").length,
        dt.htmlSerialize = !!t.getElementsByTagName("link").length,
        dt.html5Clone = "<:nav></:nav>" !== it.createElement("nav").cloneNode(!0).outerHTML,
        n.type = "checkbox",
        n.checked = !0,
        e.appendChild(n),
        dt.appendChecked = n.checked,
        t.innerHTML = "<textarea>x</textarea>",
        dt.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue,
        e.appendChild(t),
        n = it.createElement("input"),
        n.setAttribute("type", "radio"),
        n.setAttribute("checked", "checked"),
        n.setAttribute("name", "t"),
        t.appendChild(n),
        dt.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked,
        dt.noCloneEvent = !!t.addEventListener,
        t[pt.expando] = 1,
        dt.attributes = !t.getAttribute(pt.expando)
    }();
    var Ut = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: dt.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    Ut.optgroup = Ut.option,
    Ut.tbody = Ut.tfoot = Ut.colgroup = Ut.caption = Ut.thead,
    Ut.th = Ut.td;
    var Xt = /<|&#?\w+;/
      , Vt = /<tbody/i;
    !function() {
        var e, n, i = it.createElement("div");
        for (e in {
            submit: !0,
            change: !0,
            focusin: !0
        })
            n = "on" + e,
            (dt[e] = n in t) || (i.setAttribute(n, "t"),
            dt[e] = i.attributes[n].expando === !1);
        i = null
    }();
    var Yt = /^(?:input|select|textarea)$/i
      , Gt = /^key/
      , Jt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , Qt = /^(?:focusinfocus|focusoutblur)$/
      , Kt = /^([^.]*)(?:\.(.+)|)/;
    pt.event = {
        global: {},
        add: function(t, e, n, i, o) {
            var r, s, a, l, u, c, d, h, p, f, g, m = pt._data(t);
            if (m) {
                for (n.handler && (l = n,
                n = l.handler,
                o = l.selector),
                n.guid || (n.guid = pt.guid++),
                (s = m.events) || (s = m.events = {}),
                (c = m.handle) || (c = m.handle = function(t) {
                    return "undefined" == typeof pt || t && pt.event.triggered === t.type ? void 0 : pt.event.dispatch.apply(c.elem, arguments)
                }
                ,
                c.elem = t),
                e = (e || "").match(Nt) || [""],
                a = e.length; a--; )
                    r = Kt.exec(e[a]) || [],
                    p = g = r[1],
                    f = (r[2] || "").split(".").sort(),
                    p && (u = pt.event.special[p] || {},
                    p = (o ? u.delegateType : u.bindType) || p,
                    u = pt.event.special[p] || {},
                    d = pt.extend({
                        type: p,
                        origType: g,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: o,
                        needsContext: o && pt.expr.match.needsContext.test(o),
                        namespace: f.join(".")
                    }, l),
                    (h = s[p]) || (h = s[p] = [],
                    h.delegateCount = 0,
                    u.setup && u.setup.call(t, i, f, c) !== !1 || (t.addEventListener ? t.addEventListener(p, c, !1) : t.attachEvent && t.attachEvent("on" + p, c))),
                    u.add && (u.add.call(t, d),
                    d.handler.guid || (d.handler.guid = n.guid)),
                    o ? h.splice(h.delegateCount++, 0, d) : h.push(d),
                    pt.event.global[p] = !0);
                t = null
            }
        },
        remove: function(t, e, n, i, o) {
            var r, s, a, l, u, c, d, h, p, f, g, m = pt.hasData(t) && pt._data(t);
            if (m && (c = m.events)) {
                for (e = (e || "").match(Nt) || [""],
                u = e.length; u--; )
                    if (a = Kt.exec(e[u]) || [],
                    p = g = a[1],
                    f = (a[2] || "").split(".").sort(),
                    p) {
                        for (d = pt.event.special[p] || {},
                        p = (i ? d.delegateType : d.bindType) || p,
                        h = c[p] || [],
                        a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        l = r = h.length; r--; )
                            s = h[r],
                            !o && g !== s.origType || n && n.guid !== s.guid || a && !a.test(s.namespace) || i && i !== s.selector && ("**" !== i || !s.selector) || (h.splice(r, 1),
                            s.selector && h.delegateCount--,
                            d.remove && d.remove.call(t, s));
                        l && !h.length && (d.teardown && d.teardown.call(t, f, m.handle) !== !1 || pt.removeEvent(t, p, m.handle),
                        delete c[p])
                    } else
                        for (p in c)
                            pt.event.remove(t, p + e[u], n, i, !0);
                pt.isEmptyObject(c) && (delete m.handle,
                pt._removeData(t, "events"))
            }
        },
        trigger: function(e, n, i, o) {
            var r, s, a, l, u, c, d, h = [i || it], p = ct.call(e, "type") ? e.type : e, f = ct.call(e, "namespace") ? e.namespace.split(".") : [];
            if (a = c = i = i || it,
            3 !== i.nodeType && 8 !== i.nodeType && !Qt.test(p + pt.event.triggered) && (p.indexOf(".") > -1 && (f = p.split("."),
            p = f.shift(),
            f.sort()),
            s = p.indexOf(":") < 0 && "on" + p,
            e = e[pt.expando] ? e : new pt.Event(p,"object" == typeof e && e),
            e.isTrigger = o ? 2 : 3,
            e.namespace = f.join("."),
            e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            e.result = void 0,
            e.target || (e.target = i),
            n = null == n ? [e] : pt.makeArray(n, [e]),
            u = pt.event.special[p] || {},
            o || !u.trigger || u.trigger.apply(i, n) !== !1)) {
                if (!o && !u.noBubble && !pt.isWindow(i)) {
                    for (l = u.delegateType || p,
                    Qt.test(l + p) || (a = a.parentNode); a; a = a.parentNode)
                        h.push(a),
                        c = a;
                    c === (i.ownerDocument || it) && h.push(c.defaultView || c.parentWindow || t)
                }
                for (d = 0; (a = h[d++]) && !e.isPropagationStopped(); )
                    e.type = d > 1 ? l : u.bindType || p,
                    r = (pt._data(a, "events") || {})[e.type] && pt._data(a, "handle"),
                    r && r.apply(a, n),
                    r = s && a[s],
                    r && r.apply && Pt(a) && (e.result = r.apply(a, n),
                    e.result === !1 && e.preventDefault());
                if (e.type = p,
                !o && !e.isDefaultPrevented() && (!u._default || u._default.apply(h.pop(), n) === !1) && Pt(i) && s && i[p] && !pt.isWindow(i)) {
                    c = i[s],
                    c && (i[s] = null),
                    pt.event.triggered = p;
                    try {
                        i[p]()
                    } catch (g) {}
                    pt.event.triggered = void 0,
                    c && (i[s] = c)
                }
                return e.result
            }
        },
        dispatch: function(t) {
            t = pt.event.fix(t);
            var e, n, i, o, r, s = [], a = ot.call(arguments), l = (pt._data(this, "events") || {})[t.type] || [], u = pt.event.special[t.type] || {};
            if (a[0] = t,
            t.delegateTarget = this,
            !u.preDispatch || u.preDispatch.call(this, t) !== !1) {
                for (s = pt.event.handlers.call(this, t, l),
                e = 0; (o = s[e++]) && !t.isPropagationStopped(); )
                    for (t.currentTarget = o.elem,
                    n = 0; (r = o.handlers[n++]) && !t.isImmediatePropagationStopped(); )
                        (!t.rnamespace || t.rnamespace.test(r.namespace)) && (t.handleObj = r,
                        t.data = r.data,
                        i = ((pt.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, a),
                        void 0 !== i && (t.result = i) === !1 && (t.preventDefault(),
                        t.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, t),
                t.result
            }
        },
        handlers: function(t, e) {
            var n, i, o, r, s = [], a = e.delegateCount, l = t.target;
            if (a && l.nodeType && ("click" !== t.type || isNaN(t.button) || t.button < 1))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (l.disabled !== !0 || "click" !== t.type)) {
                        for (i = [],
                        n = 0; a > n; n++)
                            r = e[n],
                            o = r.selector + " ",
                            void 0 === i[o] && (i[o] = r.needsContext ? pt(o, this).index(l) > -1 : pt.find(o, this, null, [l]).length),
                            i[o] && i.push(r);
                        i.length && s.push({
                            elem: l,
                            handlers: i
                        })
                    }
            return a < e.length && s.push({
                elem: this,
                handlers: e.slice(a)
            }),
            s
        },
        fix: function(t) {
            if (t[pt.expando])
                return t;
            var e, n, i, o = t.type, r = t, s = this.fixHooks[o];
            for (s || (this.fixHooks[o] = s = Jt.test(o) ? this.mouseHooks : Gt.test(o) ? this.keyHooks : {}),
            i = s.props ? this.props.concat(s.props) : this.props,
            t = new pt.Event(r),
            e = i.length; e--; )
                n = i[e],
                t[n] = r[n];
            return t.target || (t.target = r.srcElement || it),
            3 === t.target.nodeType && (t.target = t.target.parentNode),
            t.metaKey = !!t.metaKey,
            s.filter ? s.filter(t, r) : t
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode),
                t
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(t, e) {
                var n, i, o, r = e.button, s = e.fromElement;
                return null == t.pageX && null != e.clientX && (i = t.target.ownerDocument || it,
                o = i.documentElement,
                n = i.body,
                t.pageX = e.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0),
                t.pageY = e.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)),
                !t.relatedTarget && s && (t.relatedTarget = s === t.target ? e.toElement : s),
                t.which || void 0 === r || (t.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0),
                t
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== w() && this.focus)
                        try {
                            return this.focus(),
                            !1
                        } catch (t) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === w() && this.blur ? (this.blur(),
                    !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return pt.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(),
                    !1) : void 0
                },
                _default: function(t) {
                    return pt.nodeName(t.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        },
        simulate: function(t, e, n) {
            var i = pt.extend(new pt.Event, n, {
                type: t,
                isSimulated: !0
            });
            pt.event.trigger(i, null, e),
            i.isDefaultPrevented() && n.preventDefault()
        }
    },
    pt.removeEvent = it.removeEventListener ? function(t, e, n) {
        t.removeEventListener && t.removeEventListener(e, n)
    }
    : function(t, e, n) {
        var i = "on" + e;
        t.detachEvent && ("undefined" == typeof t[i] && (t[i] = null),
        t.detachEvent(i, n))
    }
    ,
    pt.Event = function(t, e) {
        return this instanceof pt.Event ? (t && t.type ? (this.originalEvent = t,
        this.type = t.type,
        this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? b : y) : this.type = t,
        e && pt.extend(this, e),
        this.timeStamp = t && t.timeStamp || pt.now(),
        void (this[pt.expando] = !0)) : new pt.Event(t,e)
    }
    ,
    pt.Event.prototype = {
        constructor: pt.Event,
        isDefaultPrevented: y,
        isPropagationStopped: y,
        isImmediatePropagationStopped: y,
        preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = b,
            t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = b,
            t && !this.isSimulated && (t.stopPropagation && t.stopPropagation(),
            t.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = b,
            t && t.stopImmediatePropagation && t.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    pt.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(t, e) {
        pt.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function(t) {
                var n, i = this, o = t.relatedTarget, r = t.handleObj;
                return (!o || o !== i && !pt.contains(i, o)) && (t.type = r.origType,
                n = r.handler.apply(this, arguments),
                t.type = e),
                n
            }
        }
    }),
    dt.submit || (pt.event.special.submit = {
        setup: function() {
            return pt.nodeName(this, "form") ? !1 : void pt.event.add(this, "click._submit keypress._submit", function(t) {
                var e = t.target
                  , n = pt.nodeName(e, "input") || pt.nodeName(e, "button") ? pt.prop(e, "form") : void 0;
                n && !pt._data(n, "submit") && (pt.event.add(n, "submit._submit", function(t) {
                    t._submitBubble = !0
                }),
                pt._data(n, "submit", !0))
            })
        },
        postDispatch: function(t) {
            t._submitBubble && (delete t._submitBubble,
            this.parentNode && !t.isTrigger && pt.event.simulate("submit", this.parentNode, t))
        },
        teardown: function() {
            return pt.nodeName(this, "form") ? !1 : void pt.event.remove(this, "._submit")
        }
    }),
    dt.change || (pt.event.special.change = {
        setup: function() {
            return Yt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (pt.event.add(this, "propertychange._change", function(t) {
                "checked" === t.originalEvent.propertyName && (this._justChanged = !0)
            }),
            pt.event.add(this, "click._change", function(t) {
                this._justChanged && !t.isTrigger && (this._justChanged = !1),
                pt.event.simulate("change", this, t)
            })),
            !1) : void pt.event.add(this, "beforeactivate._change", function(t) {
                var e = t.target;
                Yt.test(e.nodeName) && !pt._data(e, "change") && (pt.event.add(e, "change._change", function(t) {
                    !this.parentNode || t.isSimulated || t.isTrigger || pt.event.simulate("change", this.parentNode, t)
                }),
                pt._data(e, "change", !0))
            })
        },
        handle: function(t) {
            var e = t.target;
            return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return pt.event.remove(this, "._change"),
            !Yt.test(this.nodeName)
        }
    }),
    dt.focusin || pt.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        var n = function(t) {
            pt.event.simulate(e, t.target, pt.event.fix(t))
        };
        pt.event.special[e] = {
            setup: function() {
                var i = this.ownerDocument || this
                  , o = pt._data(i, e);
                o || i.addEventListener(t, n, !0),
                pt._data(i, e, (o || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this
                  , o = pt._data(i, e) - 1;
                o ? pt._data(i, e, o) : (i.removeEventListener(t, n, !0),
                pt._removeData(i, e))
            }
        }
    }),
    pt.fn.extend({
        on: function(t, e, n, i) {
            return x(this, t, e, n, i)
        },
        one: function(t, e, n, i) {
            return x(this, t, e, n, i, 1)
        },
        off: function(t, e, n) {
            var i, o;
            if (t && t.preventDefault && t.handleObj)
                return i = t.handleObj,
                pt(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler),
                this;
            if ("object" == typeof t) {
                for (o in t)
                    this.off(o, e, t[o]);
                return this
            }
            return (e === !1 || "function" == typeof e) && (n = e,
            e = void 0),
            n === !1 && (n = y),
            this.each(function() {
                pt.event.remove(this, t, n, e)
            })
        },
        trigger: function(t, e) {
            return this.each(function() {
                pt.event.trigger(t, e, this)
            })
        },
        triggerHandler: function(t, e) {
            var n = this[0];
            return n ? pt.event.trigger(t, e, n, !0) : void 0
        }
    });
    var Zt = / jQuery\d+="(?:null|\d+)"/g
      , te = new RegExp("<(?:" + Bt + ")[\\s/>]","i")
      , ee = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi
      , ne = /<script|<style|<link/i
      , ie = /checked\s*(?:[^=]|=\s*.checked.)/i
      , oe = /^true\/(.*)/
      , re = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
      , se = p(it)
      , ae = se.appendChild(it.createElement("div"));
    pt.extend({
        htmlPrefilter: function(t) {
            return t.replace(ee, "<$1></$2>")
        },
        clone: function(t, e, n) {
            var i, o, r, s, a, l = pt.contains(t.ownerDocument, t);
            if (dt.html5Clone || pt.isXMLDoc(t) || !te.test("<" + t.nodeName + ">") ? r = t.cloneNode(!0) : (ae.innerHTML = t.outerHTML,
            ae.removeChild(r = ae.firstChild)),
            !(dt.noCloneEvent && dt.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || pt.isXMLDoc(t)))
                for (i = f(r),
                a = f(t),
                s = 0; null != (o = a[s]); ++s)
                    i[s] && k(o, i[s]);
            if (e)
                if (n)
                    for (a = a || f(t),
                    i = i || f(r),
                    s = 0; null != (o = a[s]); s++)
                        T(o, i[s]);
                else
                    T(t, r);
            return i = f(r, "script"),
            i.length > 0 && g(i, !l && f(t, "script")),
            i = a = o = null,
            r
        },
        cleanData: function(t, e) {
            for (var n, i, o, r, s = 0, a = pt.expando, l = pt.cache, u = dt.attributes, c = pt.event.special; null != (n = t[s]); s++)
                if ((e || Pt(n)) && (o = n[a],
                r = o && l[o])) {
                    if (r.events)
                        for (i in r.events)
                            c[i] ? pt.event.remove(n, i) : pt.removeEvent(n, i, r.handle);
                    l[o] && (delete l[o],
                    u || "undefined" == typeof n.removeAttribute ? n[a] = void 0 : n.removeAttribute(a),
                    nt.push(o))
                }
        }
    }),
    pt.fn.extend({
        domManip: E,
        detach: function(t) {
            return S(this, t, !0)
        },
        remove: function(t) {
            return S(this, t)
        },
        text: function(t) {
            return Rt(this, function(t) {
                return void 0 === t ? pt.text(this) : this.empty().append((this[0] && this[0].ownerDocument || it).createTextNode(t))
            }, null, t, arguments.length)
        },
        append: function() {
            return E(this, arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = _(this, t);
                    e.appendChild(t)
                }
            })
        },
        prepend: function() {
            return E(this, arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = _(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function() {
            return E(this, arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function() {
            return E(this, arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++) {
                for (1 === t.nodeType && pt.cleanData(f(t, !1)); t.firstChild; )
                    t.removeChild(t.firstChild);
                t.options && pt.nodeName(t, "select") && (t.options.length = 0)
            }
            return this
        },
        clone: function(t, e) {
            return t = null == t ? !1 : t,
            e = null == e ? t : e,
            this.map(function() {
                return pt.clone(this, t, e)
            })
        },
        html: function(t) {
            return Rt(this, function(t) {
                var e = this[0] || {}
                  , n = 0
                  , i = this.length;
                if (void 0 === t)
                    return 1 === e.nodeType ? e.innerHTML.replace(Zt, "") : void 0;
                if ("string" == typeof t && !ne.test(t) && (dt.htmlSerialize || !te.test(t)) && (dt.leadingWhitespace || !Wt.test(t)) && !Ut[(qt.exec(t) || ["", ""])[1].toLowerCase()]) {
                    t = pt.htmlPrefilter(t);
                    try {
                        for (; i > n; n++)
                            e = this[n] || {},
                            1 === e.nodeType && (pt.cleanData(f(e, !1)),
                            e.innerHTML = t);
                        e = 0
                    } catch (o) {}
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function() {
            var t = [];
            return E(this, arguments, function(e) {
                var n = this.parentNode;
                pt.inArray(this, t) < 0 && (pt.cleanData(f(this)),
                n && n.replaceChild(e, this))
            }, t)
        }
    }),
    pt.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, e) {
        pt.fn[t] = function(t) {
            for (var n, i = 0, o = [], r = pt(t), s = r.length - 1; s >= i; i++)
                n = i === s ? this : this.clone(!0),
                pt(r[i])[e](n),
                st.apply(o, n.get());
            return this.pushStack(o)
        }
    });
    var le, ue = {
        HTML: "block",
        BODY: "block"
    }, ce = /^margin/, de = new RegExp("^(" + It + ")(?!px)[a-z%]+$","i"), he = function(t, e, n, i) {
        var o, r, s = {};
        for (r in e)
            s[r] = t.style[r],
            t.style[r] = e[r];
        o = n.apply(t, i || []);
        for (r in e)
            t.style[r] = s[r];
        return o
    }, pe = it.documentElement;
    !function() {
        function e() {
            var e, c, d = it.documentElement;
            d.appendChild(l),
            u.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
            n = o = a = !1,
            i = s = !0,
            t.getComputedStyle && (c = t.getComputedStyle(u),
            n = "1%" !== (c || {}).top,
            a = "2px" === (c || {}).marginLeft,
            o = "4px" === (c || {
                width: "4px"
            }).width,
            u.style.marginRight = "50%",
            i = "4px" === (c || {
                marginRight: "4px"
            }).marginRight,
            e = u.appendChild(it.createElement("div")),
            e.style.cssText = u.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
            e.style.marginRight = e.style.width = "0",
            u.style.width = "1px",
            s = !parseFloat((t.getComputedStyle(e) || {}).marginRight),
            u.removeChild(e)),
            u.style.display = "none",
            r = 0 === u.getClientRects().length,
            r && (u.style.display = "",
            u.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            e = u.getElementsByTagName("td"),
            e[0].style.cssText = "margin:0;border:0;padding:0;display:none",
            r = 0 === e[0].offsetHeight,
            r && (e[0].style.display = "",
            e[1].style.display = "none",
            r = 0 === e[0].offsetHeight)),
            d.removeChild(l)
        }
        var n, i, o, r, s, a, l = it.createElement("div"), u = it.createElement("div");
        u.style && (u.style.cssText = "float:left;opacity:.5",
        dt.opacity = "0.5" === u.style.opacity,
        dt.cssFloat = !!u.style.cssFloat,
        u.style.backgroundClip = "content-box",
        u.cloneNode(!0).style.backgroundClip = "",
        dt.clearCloneStyle = "content-box" === u.style.backgroundClip,
        l = it.createElement("div"),
        l.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
        u.innerHTML = "",
        l.appendChild(u),
        dt.boxSizing = "" === u.style.boxSizing || "" === u.style.MozBoxSizing || "" === u.style.WebkitBoxSizing,
        pt.extend(dt, {
            reliableHiddenOffsets: function() {
                return null == n && e(),
                r
            },
            boxSizingReliable: function() {
                return null == n && e(),
                o
            },
            pixelMarginRight: function() {
                return null == n && e(),
                i
            },
            pixelPosition: function() {
                return null == n && e(),
                n
            },
            reliableMarginRight: function() {
                return null == n && e(),
                s
            },
            reliableMarginLeft: function() {
                return null == n && e(),
                a
            }
        }))
    }();
    var fe, ge, me = /^(top|right|bottom|left)$/;
    t.getComputedStyle ? (fe = function(e) {
        var n = e.ownerDocument.defaultView;
        return n.opener || (n = t),
        n.getComputedStyle(e)
    }
    ,
    ge = function(t, e, n) {
        var i, o, r, s, a = t.style;
        return n = n || fe(t),
        s = n ? n.getPropertyValue(e) || n[e] : void 0,
        n && ("" !== s || pt.contains(t.ownerDocument, t) || (s = pt.style(t, e)),
        !dt.pixelMarginRight() && de.test(s) && ce.test(e) && (i = a.width,
        o = a.minWidth,
        r = a.maxWidth,
        a.minWidth = a.maxWidth = a.width = s,
        s = n.width,
        a.width = i,
        a.minWidth = o,
        a.maxWidth = r)),
        void 0 === s ? s : s + ""
    }
    ) : pe.currentStyle && (fe = function(t) {
        return t.currentStyle
    }
    ,
    ge = function(t, e, n) {
        var i, o, r, s, a = t.style;
        return n = n || fe(t),
        s = n ? n[e] : void 0,
        null == s && a && a[e] && (s = a[e]),
        de.test(s) && !me.test(e) && (i = a.left,
        o = t.runtimeStyle,
        r = o && o.left,
        r && (o.left = t.currentStyle.left),
        a.left = "fontSize" === e ? "1em" : s,
        s = a.pixelLeft + "px",
        a.left = i,
        r && (o.left = r)),
        void 0 === s ? s : s + "" || "auto"
    }
    );
    var ve = /alpha\([^)]*\)/i
      , be = /opacity\s*=\s*([^)]*)/i
      , ye = /^(none|table(?!-c[ea]).+)/
      , we = new RegExp("^(" + It + ")(.*)$","i")
      , xe = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , _e = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , Ce = ["Webkit", "O", "Moz", "ms"]
      , $e = it.createElement("div").style;
    pt.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var n = ge(t, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": dt.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(t, e, n, i) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var o, r, s, a = pt.camelCase(e), l = t.style;
                if (e = pt.cssProps[a] || (pt.cssProps[a] = P(a) || a),
                s = pt.cssHooks[e] || pt.cssHooks[a],
                void 0 === n)
                    return s && "get"in s && void 0 !== (o = s.get(t, !1, i)) ? o : l[e];
                if (r = typeof n,
                "string" === r && (o = Ht.exec(n)) && o[1] && (n = h(t, e, o),
                r = "number"),
                null != n && n === n && ("number" === r && (n += o && o[3] || (pt.cssNumber[a] ? "" : "px")),
                dt.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (l[e] = "inherit"),
                !(s && "set"in s && void 0 === (n = s.set(t, n, i)))))
                    try {
                        l[e] = n
                    } catch (u) {}
            }
        },
        css: function(t, e, n, i) {
            var o, r, s, a = pt.camelCase(e);
            return e = pt.cssProps[a] || (pt.cssProps[a] = P(a) || a),
            s = pt.cssHooks[e] || pt.cssHooks[a],
            s && "get"in s && (r = s.get(t, !0, n)),
            void 0 === r && (r = ge(t, e, i)),
            "normal" === r && e in _e && (r = _e[e]),
            "" === n || n ? (o = parseFloat(r),
            n === !0 || isFinite(o) ? o || 0 : r) : r
        }
    }),
    pt.each(["height", "width"], function(t, e) {
        pt.cssHooks[e] = {
            get: function(t, n, i) {
                return n ? ye.test(pt.css(t, "display")) && 0 === t.offsetWidth ? he(t, xe, function() {
                    return H(t, e, i)
                }) : H(t, e, i) : void 0
            },
            set: function(t, n, i) {
                var o = i && fe(t);
                return O(t, n, i ? I(t, e, i, dt.boxSizing && "border-box" === pt.css(t, "boxSizing", !1, o), o) : 0)
            }
        }
    }),
    dt.opacity || (pt.cssHooks.opacity = {
        get: function(t, e) {
            return be.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
        },
        set: function(t, e) {
            var n = t.style
              , i = t.currentStyle
              , o = pt.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : ""
              , r = i && i.filter || n.filter || "";
            n.zoom = 1,
            (e >= 1 || "" === e) && "" === pt.trim(r.replace(ve, "")) && n.removeAttribute && (n.removeAttribute("filter"),
            "" === e || i && !i.filter) || (n.filter = ve.test(r) ? r.replace(ve, o) : r + " " + o)
        }
    }),
    pt.cssHooks.marginRight = D(dt.reliableMarginRight, function(t, e) {
        return e ? he(t, {
            display: "inline-block"
        }, ge, [t, "marginRight"]) : void 0
    }),
    pt.cssHooks.marginLeft = D(dt.reliableMarginLeft, function(t, e) {
        return e ? (parseFloat(ge(t, "marginLeft")) || (pt.contains(t.ownerDocument, t) ? t.getBoundingClientRect().left - he(t, {
            marginLeft: 0
        }, function() {
            return t.getBoundingClientRect().left
        }) : 0)) + "px" : void 0
    }),
    pt.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        pt.cssHooks[t + e] = {
            expand: function(n) {
                for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++)
                    o[t + Lt[i] + e] = r[i] || r[i - 2] || r[0];
                return o
            }
        },
        ce.test(t) || (pt.cssHooks[t + e].set = O)
    }),
    pt.fn.extend({
        css: function(t, e) {
            return Rt(this, function(t, e, n) {
                var i, o, r = {}, s = 0;
                if (pt.isArray(e)) {
                    for (i = fe(t),
                    o = e.length; o > s; s++)
                        r[e[s]] = pt.css(t, e[s], !1, i);
                    return r
                }
                return void 0 !== n ? pt.style(t, e, n) : pt.css(t, e)
            }, t, e, arguments.length > 1)
        },
        show: function() {
            return j(this, !0)
        },
        hide: function() {
            return j(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                Mt(this) ? pt(this).show() : pt(this).hide()
            })
        }
    }),
    pt.Tween = L,
    L.prototype = {
        constructor: L,
        init: function(t, e, n, i, o, r) {
            this.elem = t,
            this.prop = n,
            this.easing = o || pt.easing._default,
            this.options = e,
            this.start = this.now = this.cur(),
            this.end = i,
            this.unit = r || (pt.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var t = L.propHooks[this.prop];
            return t && t.get ? t.get(this) : L.propHooks._default.get(this)
        },
        run: function(t) {
            var e, n = L.propHooks[this.prop];
            return this.options.duration ? this.pos = e = pt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t,
            this.now = (this.end - this.start) * e + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : L.propHooks._default.set(this),
            this
        }
    },
    L.prototype.init.prototype = L.prototype,
    L.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = pt.css(t.elem, t.prop, ""),
                e && "auto" !== e ? e : 0)
            },
            set: function(t) {
                pt.fx.step[t.prop] ? pt.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[pt.cssProps[t.prop]] && !pt.cssHooks[t.prop] ? t.elem[t.prop] = t.now : pt.style(t.elem, t.prop, t.now + t.unit)
            }
        }
    },
    L.propHooks.scrollTop = L.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    },
    pt.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        },
        _default: "swing"
    },
    pt.fx = L.prototype.init,
    pt.fx.step = {};
    var Te, ke, Ee = /^(?:toggle|show|hide)$/, Se = /queueHooks$/;
    pt.Animation = pt.extend(W, {
        tweeners: {
            "*": [function(t, e) {
                var n = this.createTween(t, e);
                return h(n.elem, t, Ht.exec(e), n),
                n
            }
            ]
        },
        tweener: function(t, e) {
            pt.isFunction(t) ? (e = t,
            t = ["*"]) : t = t.match(Nt);
            for (var n, i = 0, o = t.length; o > i; i++)
                n = t[i],
                W.tweeners[n] = W.tweeners[n] || [],
                W.tweeners[n].unshift(e)
        },
        prefilters: [q],
        prefilter: function(t, e) {
            e ? W.prefilters.unshift(t) : W.prefilters.push(t)
        }
    }),
    pt.speed = function(t, e, n) {
        var i = t && "object" == typeof t ? pt.extend({}, t) : {
            complete: n || !n && e || pt.isFunction(t) && t,
            duration: t,
            easing: n && e || e && !pt.isFunction(e) && e
        };
        return i.duration = pt.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in pt.fx.speeds ? pt.fx.speeds[i.duration] : pt.fx.speeds._default,
        (null == i.queue || i.queue === !0) && (i.queue = "fx"),
        i.old = i.complete,
        i.complete = function() {
            pt.isFunction(i.old) && i.old.call(this),
            i.queue && pt.dequeue(this, i.queue)
        }
        ,
        i
    }
    ,
    pt.fn.extend({
        fadeTo: function(t, e, n, i) {
            return this.filter(Mt).css("opacity", 0).show().end().animate({
                opacity: e
            }, t, n, i)
        },
        animate: function(t, e, n, i) {
            var o = pt.isEmptyObject(t)
              , r = pt.speed(e, n, i)
              , s = function() {
                var e = W(this, pt.extend({}, t), r);
                (o || pt._data(this, "finish")) && e.stop(!0)
            };
            return s.finish = s,
            o || r.queue === !1 ? this.each(s) : this.queue(r.queue, s)
        },
        stop: function(t, e, n) {
            var i = function(t) {
                var e = t.stop;
                delete t.stop,
                e(n)
            };
            return "string" != typeof t && (n = e,
            e = t,
            t = void 0),
            e && t !== !1 && this.queue(t || "fx", []),
            this.each(function() {
                var e = !0
                  , o = null != t && t + "queueHooks"
                  , r = pt.timers
                  , s = pt._data(this);
                if (o)
                    s[o] && s[o].stop && i(s[o]);
                else
                    for (o in s)
                        s[o] && s[o].stop && Se.test(o) && i(s[o]);
                for (o = r.length; o--; )
                    r[o].elem !== this || null != t && r[o].queue !== t || (r[o].anim.stop(n),
                    e = !1,
                    r.splice(o, 1));
                (e || !n) && pt.dequeue(this, t)
            })
        },
        finish: function(t) {
            return t !== !1 && (t = t || "fx"),
            this.each(function() {
                var e, n = pt._data(this), i = n[t + "queue"], o = n[t + "queueHooks"], r = pt.timers, s = i ? i.length : 0;
                for (n.finish = !0,
                pt.queue(this, t, []),
                o && o.stop && o.stop.call(this, !0),
                e = r.length; e--; )
                    r[e].elem === this && r[e].queue === t && (r[e].anim.stop(!0),
                    r.splice(e, 1));
                for (e = 0; s > e; e++)
                    i[e] && i[e].finish && i[e].finish.call(this);
                delete n.finish
            })
        }
    }),
    pt.each(["toggle", "show", "hide"], function(t, e) {
        var n = pt.fn[e];
        pt.fn[e] = function(t, i, o) {
            return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(R(e, !0), t, i, o)
        }
    }),
    pt.each({
        slideDown: R("show"),
        slideUp: R("hide"),
        slideToggle: R("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(t, e) {
        pt.fn[t] = function(t, n, i) {
            return this.animate(e, t, n, i)
        }
    }),
    pt.timers = [],
    pt.fx.tick = function() {
        var t, e = pt.timers, n = 0;
        for (Te = pt.now(); n < e.length; n++)
            t = e[n],
            t() || e[n] !== t || e.splice(n--, 1);
        e.length || pt.fx.stop(),
        Te = void 0
    }
    ,
    pt.fx.timer = function(t) {
        pt.timers.push(t),
        t() ? pt.fx.start() : pt.timers.pop()
    }
    ,
    pt.fx.interval = 13,
    pt.fx.start = function() {
        ke || (ke = t.setInterval(pt.fx.tick, pt.fx.interval))
    }
    ,
    pt.fx.stop = function() {
        t.clearInterval(ke),
        ke = null
    }
    ,
    pt.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    pt.fn.delay = function(e, n) {
        return e = pt.fx ? pt.fx.speeds[e] || e : e,
        n = n || "fx",
        this.queue(n, function(n, i) {
            var o = t.setTimeout(n, e);
            i.stop = function() {
                t.clearTimeout(o)
            }
        })
    }
    ,
    function() {
        var t, e = it.createElement("input"), n = it.createElement("div"), i = it.createElement("select"), o = i.appendChild(it.createElement("option"));
        n = it.createElement("div"),
        n.setAttribute("className", "t"),
        n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        t = n.getElementsByTagName("a")[0],
        e.setAttribute("type", "checkbox"),
        n.appendChild(e),
        t = n.getElementsByTagName("a")[0],
        t.style.cssText = "top:1px",
        dt.getSetAttribute = "t" !== n.className,
        dt.style = /top/.test(t.getAttribute("style")),
        dt.hrefNormalized = "/a" === t.getAttribute("href"),
        dt.checkOn = !!e.value,
        dt.optSelected = o.selected,
        dt.enctype = !!it.createElement("form").enctype,
        i.disabled = !0,
        dt.optDisabled = !o.disabled,
        e = it.createElement("input"),
        e.setAttribute("value", ""),
        dt.input = "" === e.getAttribute("value"),
        e.value = "t",
        e.setAttribute("type", "radio"),
        dt.radioValue = "t" === e.value
    }();
    var Ne = /\r/g;
    pt.fn.extend({
        val: function(t) {
            var e, n, i, o = this[0];
            {
                if (arguments.length)
                    return i = pt.isFunction(t),
                    this.each(function(n) {
                        var o;
                        1 === this.nodeType && (o = i ? t.call(this, n, pt(this).val()) : t,
                        null == o ? o = "" : "number" == typeof o ? o += "" : pt.isArray(o) && (o = pt.map(o, function(t) {
                            return null == t ? "" : t + ""
                        })),
                        e = pt.valHooks[this.type] || pt.valHooks[this.nodeName.toLowerCase()],
                        e && "set"in e && void 0 !== e.set(this, o, "value") || (this.value = o))
                    });
                if (o)
                    return e = pt.valHooks[o.type] || pt.valHooks[o.nodeName.toLowerCase()],
                    e && "get"in e && void 0 !== (n = e.get(o, "value")) ? n : (n = o.value,
                    "string" == typeof n ? n.replace(Ne, "") : null == n ? "" : n)
            }
        }
    }),
    pt.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = pt.find.attr(t, "value");
                    return null != e ? e : pt.trim(pt.text(t))
                }
            },
            select: {
                get: function(t) {
                    for (var e, n, i = t.options, o = t.selectedIndex, r = "select-one" === t.type || 0 > o, s = r ? null : [], a = r ? o + 1 : i.length, l = 0 > o ? a : r ? o : 0; a > l; l++)
                        if (n = i[l],
                        (n.selected || l === o) && (dt.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !pt.nodeName(n.parentNode, "optgroup"))) {
                            if (e = pt(n).val(),
                            r)
                                return e;
                            s.push(e)
                        }
                    return s
                },
                set: function(t, e) {
                    for (var n, i, o = t.options, r = pt.makeArray(e), s = o.length; s--; )
                        if (i = o[s],
                        pt.inArray(pt.valHooks.option.get(i), r) >= 0)
                            try {
                                i.selected = n = !0
                            } catch (a) {
                                i.scrollHeight
                            }
                        else
                            i.selected = !1;
                    return n || (t.selectedIndex = -1),
                    o
                }
            }
        }
    }),
    pt.each(["radio", "checkbox"], function() {
        pt.valHooks[this] = {
            set: function(t, e) {
                return pt.isArray(e) ? t.checked = pt.inArray(pt(t).val(), e) > -1 : void 0
            }
        },
        dt.checkOn || (pt.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        }
        )
    });
    var Ae, De, Pe = pt.expr.attrHandle, je = /^(?:checked|selected)$/i, Oe = dt.getSetAttribute, Ie = dt.input;
    pt.fn.extend({
        attr: function(t, e) {
            return Rt(this, pt.attr, t, e, arguments.length > 1)
        },
        removeAttr: function(t) {
            return this.each(function() {
                pt.removeAttr(this, t)
            })
        }
    }),
    pt.extend({
        attr: function(t, e, n) {
            var i, o, r = t.nodeType;
            if (3 !== r && 8 !== r && 2 !== r)
                return "undefined" == typeof t.getAttribute ? pt.prop(t, e, n) : (1 === r && pt.isXMLDoc(t) || (e = e.toLowerCase(),
                o = pt.attrHooks[e] || (pt.expr.match.bool.test(e) ? De : Ae)),
                void 0 !== n ? null === n ? void pt.removeAttr(t, e) : o && "set"in o && void 0 !== (i = o.set(t, n, e)) ? i : (t.setAttribute(e, n + ""),
                n) : o && "get"in o && null !== (i = o.get(t, e)) ? i : (i = pt.find.attr(t, e),
                null == i ? void 0 : i))
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (!dt.radioValue && "radio" === e && pt.nodeName(t, "input")) {
                        var n = t.value;
                        return t.setAttribute("type", e),
                        n && (t.value = n),
                        e
                    }
                }
            }
        },
        removeAttr: function(t, e) {
            var n, i, o = 0, r = e && e.match(Nt);
            if (r && 1 === t.nodeType)
                for (; n = r[o++]; )
                    i = pt.propFix[n] || n,
                    pt.expr.match.bool.test(n) ? Ie && Oe || !je.test(n) ? t[i] = !1 : t[pt.camelCase("default-" + n)] = t[i] = !1 : pt.attr(t, n, ""),
                    t.removeAttribute(Oe ? n : i)
        }
    }),
    De = {
        set: function(t, e, n) {
            return e === !1 ? pt.removeAttr(t, n) : Ie && Oe || !je.test(n) ? t.setAttribute(!Oe && pt.propFix[n] || n, n) : t[pt.camelCase("default-" + n)] = t[n] = !0,
            n
        }
    },
    pt.each(pt.expr.match.bool.source.match(/\w+/g), function(t, e) {
        var n = Pe[e] || pt.find.attr;
        Ie && Oe || !je.test(e) ? Pe[e] = function(t, e, i) {
            var o, r;
            return i || (r = Pe[e],
            Pe[e] = o,
            o = null != n(t, e, i) ? e.toLowerCase() : null,
            Pe[e] = r),
            o
        }
        : Pe[e] = function(t, e, n) {
            return n ? void 0 : t[pt.camelCase("default-" + e)] ? e.toLowerCase() : null
        }
    }),
    Ie && Oe || (pt.attrHooks.value = {
        set: function(t, e, n) {
            return pt.nodeName(t, "input") ? void (t.defaultValue = e) : Ae && Ae.set(t, e, n)
        }
    }),
    Oe || (Ae = {
        set: function(t, e, n) {
            var i = t.getAttributeNode(n);
            return i || t.setAttributeNode(i = t.ownerDocument.createAttribute(n)),
            i.value = e += "",
            "value" === n || e === t.getAttribute(n) ? e : void 0
        }
    },
    Pe.id = Pe.name = Pe.coords = function(t, e, n) {
        var i;
        return n ? void 0 : (i = t.getAttributeNode(e)) && "" !== i.value ? i.value : null
    }
    ,
    pt.valHooks.button = {
        get: function(t, e) {
            var n = t.getAttributeNode(e);
            return n && n.specified ? n.value : void 0
        },
        set: Ae.set
    },
    pt.attrHooks.contenteditable = {
        set: function(t, e, n) {
            Ae.set(t, "" === e ? !1 : e, n)
        }
    },
    pt.each(["width", "height"], function(t, e) {
        pt.attrHooks[e] = {
            set: function(t, n) {
                return "" === n ? (t.setAttribute(e, "auto"),
                n) : void 0
            }
        }
    })),
    dt.style || (pt.attrHooks.style = {
        get: function(t) {
            return t.style.cssText || void 0
        },
        set: function(t, e) {
            return t.style.cssText = e + ""
        }
    });
    var He = /^(?:input|select|textarea|button|object)$/i
      , Le = /^(?:a|area)$/i;
    pt.fn.extend({
        prop: function(t, e) {
            return Rt(this, pt.prop, t, e, arguments.length > 1)
        },
        removeProp: function(t) {
            return t = pt.propFix[t] || t,
            this.each(function() {
                try {
                    this[t] = void 0,
                    delete this[t]
                } catch (e) {}
            })
        }
    }),
    pt.extend({
        prop: function(t, e, n) {
            var i, o, r = t.nodeType;
            if (3 !== r && 8 !== r && 2 !== r)
                return 1 === r && pt.isXMLDoc(t) || (e = pt.propFix[e] || e,
                o = pt.propHooks[e]),
                void 0 !== n ? o && "set"in o && void 0 !== (i = o.set(t, n, e)) ? i : t[e] = n : o && "get"in o && null !== (i = o.get(t, e)) ? i : t[e]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    var e = pt.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : He.test(t.nodeName) || Le.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }),
    dt.hrefNormalized || pt.each(["href", "src"], function(t, e) {
        pt.propHooks[e] = {
            get: function(t) {
                return t.getAttribute(e, 4)
            }
        }
    }),
    dt.optSelected || (pt.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && (e.selectedIndex,
            e.parentNode && e.parentNode.selectedIndex),
            null
        }
    }),
    pt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        pt.propFix[this.toLowerCase()] = this
    }),
    dt.enctype || (pt.propFix.enctype = "encoding");
    var Me = /[\t\r\n\f]/g;
    pt.fn.extend({
        addClass: function(t) {
            var e, n, i, o, r, s, a, l = 0;
            if (pt.isFunction(t))
                return this.each(function(e) {
                    pt(this).addClass(t.call(this, e, B(this)))
                });
            if ("string" == typeof t && t)
                for (e = t.match(Nt) || []; n = this[l++]; )
                    if (o = B(n),
                    i = 1 === n.nodeType && (" " + o + " ").replace(Me, " ")) {
                        for (s = 0; r = e[s++]; )
                            i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                        a = pt.trim(i),
                        o !== a && pt.attr(n, "class", a)
                    }
            return this
        },
        removeClass: function(t) {
            var e, n, i, o, r, s, a, l = 0;
            if (pt.isFunction(t))
                return this.each(function(e) {
                    pt(this).removeClass(t.call(this, e, B(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ("string" == typeof t && t)
                for (e = t.match(Nt) || []; n = this[l++]; )
                    if (o = B(n),
                    i = 1 === n.nodeType && (" " + o + " ").replace(Me, " ")) {
                        for (s = 0; r = e[s++]; )
                            for (; i.indexOf(" " + r + " ") > -1; )
                                i = i.replace(" " + r + " ", " ");
                        a = pt.trim(i),
                        o !== a && pt.attr(n, "class", a)
                    }
            return this
        },
        toggleClass: function(t, e) {
            var n = typeof t;
            return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : pt.isFunction(t) ? this.each(function(n) {
                pt(this).toggleClass(t.call(this, n, B(this), e), e)
            }) : this.each(function() {
                var e, i, o, r;
                if ("string" === n)
                    for (i = 0,
                    o = pt(this),
                    r = t.match(Nt) || []; e = r[i++]; )
                        o.hasClass(e) ? o.removeClass(e) : o.addClass(e);
                else
                    (void 0 === t || "boolean" === n) && (e = B(this),
                    e && pt._data(this, "__className__", e),
                    pt.attr(this, "class", e || t === !1 ? "" : pt._data(this, "__className__") || ""))
            })
        },
        hasClass: function(t) {
            var e, n, i = 0;
            for (e = " " + t + " "; n = this[i++]; )
                if (1 === n.nodeType && (" " + B(n) + " ").replace(Me, " ").indexOf(e) > -1)
                    return !0;
            return !1
        }
    }),
    pt.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
        pt.fn[e] = function(t, n) {
            return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
        }
    }),
    pt.fn.extend({
        hover: function(t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        }
    });
    var Re = t.location
      , Fe = pt.now()
      , qe = /\?/
      , ze = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    pt.parseJSON = function(e) {
        if (t.JSON && t.JSON.parse)
            return t.JSON.parse(e + "");
        var n, i = null, o = pt.trim(e + "");
        return o && !pt.trim(o.replace(ze, function(t, e, o, r) {
            return n && e && (i = 0),
            0 === i ? t : (n = o || e,
            i += !r - !o,
            "")
        })) ? Function("return " + o)() : pt.error("Invalid JSON: " + e)
    }
    ,
    pt.parseXML = function(e) {
        var n, i;
        if (!e || "string" != typeof e)
            return null;
        try {
            t.DOMParser ? (i = new t.DOMParser,
            n = i.parseFromString(e, "text/xml")) : (n = new t.ActiveXObject("Microsoft.XMLDOM"),
            n.async = "false",
            n.loadXML(e))
        } catch (o) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || pt.error("Invalid XML: " + e),
        n
    }
    ;
    var We = /#.*$/
      , Be = /([?&])_=[^&]*/
      , Ue = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm
      , Xe = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
      , Ve = /^(?:GET|HEAD)$/
      , Ye = /^\/\//
      , Ge = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/
      , Je = {}
      , Qe = {}
      , Ke = "*/".concat("*")
      , Ze = Re.href
      , tn = Ge.exec(Ze.toLowerCase()) || [];
    pt.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ze,
            type: "GET",
            isLocal: Xe.test(tn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Ke,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": pt.parseJSON,
                "text xml": pt.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(t, e) {
            return e ? V(V(t, pt.ajaxSettings), e) : V(pt.ajaxSettings, t)
        },
        ajaxPrefilter: U(Je),
        ajaxTransport: U(Qe),
        ajax: function(e, n) {
            function i(e, n, i, o) {
                var r, d, b, y, x, C = n;
                2 !== w && (w = 2,
                l && t.clearTimeout(l),
                c = void 0,
                a = o || "",
                _.readyState = e > 0 ? 4 : 0,
                r = e >= 200 && 300 > e || 304 === e,
                i && (y = Y(h, _, i)),
                y = G(h, y, _, r),
                r ? (h.ifModified && (x = _.getResponseHeader("Last-Modified"),
                x && (pt.lastModified[s] = x),
                x = _.getResponseHeader("etag"),
                x && (pt.etag[s] = x)),
                204 === e || "HEAD" === h.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = y.state,
                d = y.data,
                b = y.error,
                r = !b)) : (b = C,
                (e || !C) && (C = "error",
                0 > e && (e = 0))),
                _.status = e,
                _.statusText = (n || C) + "",
                r ? g.resolveWith(p, [d, C, _]) : g.rejectWith(p, [_, C, b]),
                _.statusCode(v),
                v = void 0,
                u && f.trigger(r ? "ajaxSuccess" : "ajaxError", [_, h, r ? d : b]),
                m.fireWith(p, [_, C]),
                u && (f.trigger("ajaxComplete", [_, h]),
                --pt.active || pt.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (n = e,
            e = void 0),
            n = n || {};
            var o, r, s, a, l, u, c, d, h = pt.ajaxSetup({}, n), p = h.context || h, f = h.context && (p.nodeType || p.jquery) ? pt(p) : pt.event, g = pt.Deferred(), m = pt.Callbacks("once memory"), v = h.statusCode || {}, b = {}, y = {}, w = 0, x = "canceled", _ = {
                readyState: 0,
                getResponseHeader: function(t) {
                    var e;
                    if (2 === w) {
                        if (!d)
                            for (d = {}; e = Ue.exec(a); )
                                d[e[1].toLowerCase()] = e[2];
                        e = d[t.toLowerCase()]
                    }
                    return null == e ? null : e
                },
                getAllResponseHeaders: function() {
                    return 2 === w ? a : null
                },
                setRequestHeader: function(t, e) {
                    var n = t.toLowerCase();
                    return w || (t = y[n] = y[n] || t,
                    b[t] = e),
                    this
                },
                overrideMimeType: function(t) {
                    return w || (h.mimeType = t),
                    this
                },
                statusCode: function(t) {
                    var e;
                    if (t)
                        if (2 > w)
                            for (e in t)
                                v[e] = [v[e], t[e]];
                        else
                            _.always(t[_.status]);
                    return this
                },
                abort: function(t) {
                    var e = t || x;
                    return c && c.abort(e),
                    i(0, e),
                    this
                }
            };
            if (g.promise(_).complete = m.add,
            _.success = _.done,
            _.error = _.fail,
            h.url = ((e || h.url || Ze) + "").replace(We, "").replace(Ye, tn[1] + "//"),
            h.type = n.method || n.type || h.method || h.type,
            h.dataTypes = pt.trim(h.dataType || "*").toLowerCase().match(Nt) || [""],
            null == h.crossDomain && (o = Ge.exec(h.url.toLowerCase()),
            h.crossDomain = !(!o || o[1] === tn[1] && o[2] === tn[2] && (o[3] || ("http:" === o[1] ? "80" : "443")) === (tn[3] || ("http:" === tn[1] ? "80" : "443")))),
            h.data && h.processData && "string" != typeof h.data && (h.data = pt.param(h.data, h.traditional)),
            X(Je, h, n, _),
            2 === w)
                return _;
            u = pt.event && h.global,
            u && 0 === pt.active++ && pt.event.trigger("ajaxStart"),
            h.type = h.type.toUpperCase(),
            h.hasContent = !Ve.test(h.type),
            s = h.url,
            h.hasContent || (h.data && (s = h.url += (qe.test(s) ? "&" : "?") + h.data,
            delete h.data),
            h.cache === !1 && (h.url = Be.test(s) ? s.replace(Be, "$1_=" + Fe++) : s + (qe.test(s) ? "&" : "?") + "_=" + Fe++)),
            h.ifModified && (pt.lastModified[s] && _.setRequestHeader("If-Modified-Since", pt.lastModified[s]),
            pt.etag[s] && _.setRequestHeader("If-None-Match", pt.etag[s])),
            (h.data && h.hasContent && h.contentType !== !1 || n.contentType) && _.setRequestHeader("Content-Type", h.contentType),
            _.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Ke + "; q=0.01" : "") : h.accepts["*"]);
            for (r in h.headers)
                _.setRequestHeader(r, h.headers[r]);
            if (h.beforeSend && (h.beforeSend.call(p, _, h) === !1 || 2 === w))
                return _.abort();
            x = "abort";
            for (r in {
                success: 1,
                error: 1,
                complete: 1
            })
                _[r](h[r]);
            if (c = X(Qe, h, n, _)) {
                if (_.readyState = 1,
                u && f.trigger("ajaxSend", [_, h]),
                2 === w)
                    return _;
                h.async && h.timeout > 0 && (l = t.setTimeout(function() {
                    _.abort("timeout")
                }, h.timeout));
                try {
                    w = 1,
                    c.send(b, i)
                } catch (C) {
                    if (!(2 > w))
                        throw C;
                    i(-1, C)
                }
            } else
                i(-1, "No Transport");
            return _
        },
        getJSON: function(t, e, n) {
            return pt.get(t, e, n, "json")
        },
        getScript: function(t, e) {
            return pt.get(t, void 0, e, "script")
        }
    }),
    pt.each(["get", "post"], function(t, e) {
        pt[e] = function(t, n, i, o) {
            return pt.isFunction(n) && (o = o || i,
            i = n,
            n = void 0),
            pt.ajax(pt.extend({
                url: t,
                type: e,
                dataType: o,
                data: n,
                success: i
            }, pt.isPlainObject(t) && t))
        }
    }),
    pt._evalUrl = function(t) {
        return pt.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }
    ,
    pt.fn.extend({
        wrapAll: function(t) {
            if (pt.isFunction(t))
                return this.each(function(e) {
                    pt(this).wrapAll(t.call(this, e))
                });
            if (this[0]) {
                var e = pt(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]),
                e.map(function() {
                    for (var t = this; t.firstChild && 1 === t.firstChild.nodeType; )
                        t = t.firstChild;
                    return t
                }).append(this)
            }
            return this
        },
        wrapInner: function(t) {
            return pt.isFunction(t) ? this.each(function(e) {
                pt(this).wrapInner(t.call(this, e))
            }) : this.each(function() {
                var e = pt(this)
                  , n = e.contents();
                n.length ? n.wrapAll(t) : e.append(t)
            })
        },
        wrap: function(t) {
            var e = pt.isFunction(t);
            return this.each(function(n) {
                pt(this).wrapAll(e ? t.call(this, n) : t)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                pt.nodeName(this, "body") || pt(this).replaceWith(this.childNodes)
            }).end()
        }
    }),
    pt.expr.filters.hidden = function(t) {
        return dt.reliableHiddenOffsets() ? t.offsetWidth <= 0 && t.offsetHeight <= 0 && !t.getClientRects().length : Q(t)
    }
    ,
    pt.expr.filters.visible = function(t) {
        return !pt.expr.filters.hidden(t)
    }
    ;
    var en = /%20/g
      , nn = /\[\]$/
      , on = /\r?\n/g
      , rn = /^(?:submit|button|image|reset|file)$/i
      , sn = /^(?:input|select|textarea|keygen)/i;
    pt.param = function(t, e) {
        var n, i = [], o = function(t, e) {
            e = pt.isFunction(e) ? e() : null == e ? "" : e,
            i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
        };
        if (void 0 === e && (e = pt.ajaxSettings && pt.ajaxSettings.traditional),
        pt.isArray(t) || t.jquery && !pt.isPlainObject(t))
            pt.each(t, function() {
                o(this.name, this.value)
            });
        else
            for (n in t)
                K(n, t[n], e, o);
        return i.join("&").replace(en, "+")
    }
    ,
    pt.fn.extend({
        serialize: function() {
            return pt.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var t = pt.prop(this, "elements");
                return t ? pt.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !pt(this).is(":disabled") && sn.test(this.nodeName) && !rn.test(t) && (this.checked || !Ft.test(t))
            }).map(function(t, e) {
                var n = pt(this).val();
                return null == n ? null : pt.isArray(n) ? pt.map(n, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(on, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: n.replace(on, "\r\n")
                }
            }).get()
        }
    }),
    pt.ajaxSettings.xhr = void 0 !== t.ActiveXObject ? function() {
        return this.isLocal ? tt() : it.documentMode > 8 ? Z() : /^(get|post|head|put|delete|options)$/i.test(this.type) && Z() || tt()
    }
    : Z;
    var an = 0
      , ln = {}
      , un = pt.ajaxSettings.xhr();
    t.attachEvent && t.attachEvent("onunload", function() {
        for (var t in ln)
            ln[t](void 0, !0)
    }),
    dt.cors = !!un && "withCredentials"in un,
    un = dt.ajax = !!un,
    un && pt.ajaxTransport(function(e) {
        if (!e.crossDomain || dt.cors) {
            var n;
            return {
                send: function(i, o) {
                    var r, s = e.xhr(), a = ++an;
                    if (s.open(e.type, e.url, e.async, e.username, e.password),
                    e.xhrFields)
                        for (r in e.xhrFields)
                            s[r] = e.xhrFields[r];
                    e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType),
                    e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (r in i)
                        void 0 !== i[r] && s.setRequestHeader(r, i[r] + "");
                    s.send(e.hasContent && e.data || null),
                    n = function(t, i) {
                        var r, l, u;
                        if (n && (i || 4 === s.readyState))
                            if (delete ln[a],
                            n = void 0,
                            s.onreadystatechange = pt.noop,
                            i)
                                4 !== s.readyState && s.abort();
                            else {
                                u = {},
                                r = s.status,
                                "string" == typeof s.responseText && (u.text = s.responseText);
                                try {
                                    l = s.statusText
                                } catch (c) {
                                    l = ""
                                }
                                r || !e.isLocal || e.crossDomain ? 1223 === r && (r = 204) : r = u.text ? 200 : 404
                            }
                        u && o(r, l, u, s.getAllResponseHeaders())
                    }
                    ,
                    e.async ? 4 === s.readyState ? t.setTimeout(n) : s.onreadystatechange = ln[a] = n : n()
                },
                abort: function() {
                    n && n(void 0, !0)
                }
            }
        }
    }),
    pt.ajaxPrefilter(function(t) {
        t.crossDomain && (t.contents.script = !1)
    }),
    pt.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(t) {
                return pt.globalEval(t),
                t
            }
        }
    }),
    pt.ajaxPrefilter("script", function(t) {
        void 0 === t.cache && (t.cache = !1),
        t.crossDomain && (t.type = "GET",
        t.global = !1)
    }),
    pt.ajaxTransport("script", function(t) {
        if (t.crossDomain) {
            var e, n = it.head || pt("head")[0] || it.documentElement;
            return {
                send: function(i, o) {
                    e = it.createElement("script"),
                    e.async = !0,
                    t.scriptCharset && (e.charset = t.scriptCharset),
                    e.src = t.url,
                    e.onload = e.onreadystatechange = function(t, n) {
                        (n || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null,
                        e.parentNode && e.parentNode.removeChild(e),
                        e = null,
                        n || o(200, "success"))
                    }
                    ,
                    n.insertBefore(e, n.firstChild)
                },
                abort: function() {
                    e && e.onload(void 0, !0)
                }
            }
        }
    });
    var cn = []
      , dn = /(=)\?(?=&|$)|\?\?/;
    pt.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = cn.pop() || pt.expando + "_" + Fe++;
            return this[t] = !0,
            t
        }
    }),
    pt.ajaxPrefilter("json jsonp", function(e, n, i) {
        var o, r, s, a = e.jsonp !== !1 && (dn.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && dn.test(e.data) && "data");
        return a || "jsonp" === e.dataTypes[0] ? (o = e.jsonpCallback = pt.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
        a ? e[a] = e[a].replace(dn, "$1" + o) : e.jsonp !== !1 && (e.url += (qe.test(e.url) ? "&" : "?") + e.jsonp + "=" + o),
        e.converters["script json"] = function() {
            return s || pt.error(o + " was not called"),
            s[0]
        }
        ,
        e.dataTypes[0] = "json",
        r = t[o],
        t[o] = function() {
            s = arguments
        }
        ,
        i.always(function() {
            void 0 === r ? pt(t).removeProp(o) : t[o] = r,
            e[o] && (e.jsonpCallback = n.jsonpCallback,
            cn.push(o)),
            s && pt.isFunction(r) && r(s[0]),
            s = r = void 0
        }),
        "script") : void 0
    }),
    dt.createHTMLDocument = function() {
        if (!it.implementation.createHTMLDocument)
            return !1;
        var t = it.implementation.createHTMLDocument("");
        return t.body.innerHTML = "<form></form><form></form>",
        2 === t.body.childNodes.length
    }(),
    pt.parseHTML = function(t, e, n) {
        if (!t || "string" != typeof t)
            return null;
        "boolean" == typeof e && (n = e,
        e = !1),
        e = e || (dt.createHTMLDocument ? it.implementation.createHTMLDocument("") : it);
        var i = _t.exec(t)
          , o = !n && [];
        return i ? [e.createElement(i[1])] : (i = v([t], e, o),
        o && o.length && pt(o).remove(),
        pt.merge([], i.childNodes))
    }
    ;
    var hn = pt.fn.load;
    pt.fn.load = function(t, e, n) {
        if ("string" != typeof t && hn)
            return hn.apply(this, arguments);
        var i, o, r, s = this, a = t.indexOf(" ");
        return a > -1 && (i = pt.trim(t.slice(a, t.length)),
        t = t.slice(0, a)),
        pt.isFunction(e) ? (n = e,
        e = void 0) : e && "object" == typeof e && (o = "POST"),
        s.length > 0 && pt.ajax({
            url: t,
            type: o || "GET",
            dataType: "html",
            data: e
        }).done(function(t) {
            r = arguments,
            s.html(i ? pt("<div>").append(pt.parseHTML(t)).find(i) : t)
        }).always(n && function(t, e) {
            s.each(function() {
                n.apply(s, r || [t.responseText, e, t])
            })
        }
        ),
        this
    }
    ,
    pt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        pt.fn[e] = function(t) {
            return this.on(e, t)
        }
    }),
    pt.expr.filters.animated = function(t) {
        return pt.grep(pt.timers, function(e) {
            return t === e.elem
        }).length
    }
    ,
    pt.offset = {
        setOffset: function(t, e, n) {
            var i, o, r, s, a, l, u, c = pt.css(t, "position"), d = pt(t), h = {};
            "static" === c && (t.style.position = "relative"),
            a = d.offset(),
            r = pt.css(t, "top"),
            l = pt.css(t, "left"),
            u = ("absolute" === c || "fixed" === c) && pt.inArray("auto", [r, l]) > -1,
            u ? (i = d.position(),
            s = i.top,
            o = i.left) : (s = parseFloat(r) || 0,
            o = parseFloat(l) || 0),
            pt.isFunction(e) && (e = e.call(t, n, pt.extend({}, a))),
            null != e.top && (h.top = e.top - a.top + s),
            null != e.left && (h.left = e.left - a.left + o),
            "using"in e ? e.using.call(t, h) : d.css(h)
        }
    },
    pt.fn.extend({
        offset: function(t) {
            if (arguments.length)
                return void 0 === t ? this : this.each(function(e) {
                    pt.offset.setOffset(this, t, e)
                });
            var e, n, i = {
                top: 0,
                left: 0
            }, o = this[0], r = o && o.ownerDocument;
            if (r)
                return e = r.documentElement,
                pt.contains(e, o) ? ("undefined" != typeof o.getBoundingClientRect && (i = o.getBoundingClientRect()),
                n = et(r),
                {
                    top: i.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                    left: i.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
                }) : i
        },
        position: function() {
            if (this[0]) {
                var t, e, n = {
                    top: 0,
                    left: 0
                }, i = this[0];
                return "fixed" === pt.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(),
                e = this.offset(),
                pt.nodeName(t[0], "html") || (n = t.offset()),
                n.top += pt.css(t[0], "borderTopWidth", !0) - t.scrollTop(),
                n.left += pt.css(t[0], "borderLeftWidth", !0) - t.scrollLeft()),
                {
                    top: e.top - n.top - pt.css(i, "marginTop", !0),
                    left: e.left - n.left - pt.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent; t && !pt.nodeName(t, "html") && "static" === pt.css(t, "position"); )
                    t = t.offsetParent;
                return t || pe
            })
        }
    }),
    pt.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, e) {
        var n = /Y/.test(e);
        pt.fn[t] = function(i) {
            return Rt(this, function(t, i, o) {
                var r = et(t);
                return void 0 === o ? r ? e in r ? r[e] : r.document.documentElement[i] : t[i] : void (r ? r.scrollTo(n ? pt(r).scrollLeft() : o, n ? o : pt(r).scrollTop()) : t[i] = o)
            }, t, i, arguments.length, null)
        }
    }),
    pt.each(["top", "left"], function(t, e) {
        pt.cssHooks[e] = D(dt.pixelPosition, function(t, n) {
            return n ? (n = ge(t, e),
            de.test(n) ? pt(t).position()[e] + "px" : n) : void 0
        })
    }),
    pt.each({
        Height: "height",
        Width: "width"
    }, function(t, e) {
        pt.each({
            padding: "inner" + t,
            content: e,
            "": "outer" + t
        }, function(n, i) {
            pt.fn[i] = function(i, o) {
                var r = arguments.length && (n || "boolean" != typeof i)
                  , s = n || (i === !0 || o === !0 ? "margin" : "border");
                return Rt(this, function(e, n, i) {
                    var o;
                    return pt.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (o = e.documentElement,
                    Math.max(e.body["scroll" + t], o["scroll" + t], e.body["offset" + t], o["offset" + t], o["client" + t])) : void 0 === i ? pt.css(e, n, s) : pt.style(e, n, i, s)
                }, e, r ? i : void 0, r, null)
            }
        })
    }),
    pt.fn.extend({
        bind: function(t, e, n) {
            return this.on(t, null, e, n)
        },
        unbind: function(t, e) {
            return this.off(t, null, e)
        },
        delegate: function(t, e, n, i) {
            return this.on(e, t, n, i)
        },
        undelegate: function(t, e, n) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
        }
    }),
    pt.fn.size = function() {
        return this.length
    }
    ,
    pt.fn.andSelf = pt.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return pt
    });
    var pn = t.jQuery
      , fn = t.$;
    return pt.noConflict = function(e) {
        return t.$ === pt && (t.$ = fn),
        e && t.jQuery === pt && (t.jQuery = pn),
        pt
    }
    ,
    e || (t.jQuery = t.$ = pt),
    pt
}),
function(t, e) {
    "use strict";
    t.rails !== e && t.error("jquery-ujs has already been loaded!");
    var n, i = t(document);
    t.rails = n = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
        fileInputSelector: "input[type=file]:not([disabled])",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        csrfToken: function() {
            return t("meta[name=csrf-token]").attr("content")
        },
        csrfParam: function() {
            return t("meta[name=csrf-param]").attr("content")
        },
        CSRFProtection: function(t) {
            var e = n.csrfToken();
            e && t.setRequestHeader("X-CSRF-Token", e)
        },
        refreshCSRFTokens: function() {
            t('form input[name="' + n.csrfParam() + '"]').val(n.csrfToken())
        },
        fire: function(e, n, i) {
            var o = t.Event(n);
            return e.trigger(o, i),
            o.result !== !1
        },
        confirm: function(t) {
            return confirm(t)
        },
        ajax: function(e) {
            return t.ajax(e)
        },
        href: function(t) {
            return t[0].href
        },
        isRemote: function(t) {
            return t.data("remote") !== e && t.data("remote") !== !1
        },
        handleRemote: function(i) {
            var o, r, s, a, l, u;
            if (n.fire(i, "ajax:before")) {
                if (a = i.data("with-credentials") || null,
                l = i.data("type") || t.ajaxSettings && t.ajaxSettings.dataType,
                i.is("form")) {
                    o = i.data("ujs:submit-button-formmethod") || i.attr("method"),
                    r = i.data("ujs:submit-button-formaction") || i.attr("action"),
                    s = t(i[0].elements).serializeArray();
                    var c = i.data("ujs:submit-button");
                    c && (s.push(c),
                    i.data("ujs:submit-button", null)),
                    i.data("ujs:submit-button-formmethod", null),
                    i.data("ujs:submit-button-formaction", null)
                } else
                    i.is(n.inputChangeSelector) ? (o = i.data("method"),
                    r = i.data("url"),
                    s = i.serialize(),
                    i.data("params") && (s = s + "&" + i.data("params"))) : i.is(n.buttonClickSelector) ? (o = i.data("method") || "get",
                    r = i.data("url"),
                    s = i.serialize(),
                    i.data("params") && (s = s + "&" + i.data("params"))) : (o = i.data("method"),
                    r = n.href(i),
                    s = i.data("params") || null);
                return u = {
                    type: o || "GET",
                    data: s,
                    dataType: l,
                    beforeSend: function(t, o) {
                        return o.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script),
                        n.fire(i, "ajax:beforeSend", [t, o]) ? void i.trigger("ajax:send", t) : !1
                    },
                    success: function(t, e, n) {
                        i.trigger("ajax:success", [t, e, n])
                    },
                    complete: function(t, e) {
                        i.trigger("ajax:complete", [t, e])
                    },
                    error: function(t, e, n) {
                        i.trigger("ajax:error", [t, e, n])
                    },
                    crossDomain: n.isCrossDomain(r)
                },
                a && (u.xhrFields = {
                    withCredentials: a
                }),
                r && (u.url = r),
                n.ajax(u)
            }
            return !1
        },
        isCrossDomain: function(t) {
            var e = document.createElement("a");
            e.href = location.href;
            var n = document.createElement("a");
            try {
                return n.href = t,
                n.href = n.href,
                !((!n.protocol || ":" === n.protocol) && !n.host || e.protocol + "//" + e.host == n.protocol + "//" + n.host)
            } catch (i) {
                return !0
            }
        },
        handleMethod: function(i) {
            var o = n.href(i)
              , r = i.data("method")
              , s = i.attr("target")
              , a = n.csrfToken()
              , l = n.csrfParam()
              , u = t('<form method="post" action="' + o + '"></form>')
              , c = '<input name="_method" value="' + r + '" type="hidden" />';
            l === e || a === e || n.isCrossDomain(o) || (c += '<input name="' + l + '" value="' + a + '" type="hidden" />'),
            s && u.attr("target", s),
            u.hide().append(c).appendTo("body"),
            u.submit()
        },
        formElements: function(e, n) {
            return e.is("form") ? t(e[0].elements).filter(n) : e.find(n)
        },
        disableFormElements: function(e) {
            n.formElements(e, n.disableSelector).each(function() {
                n.disableFormElement(t(this))
            })
        },
        disableFormElement: function(t) {
            var n, i;
            n = t.is("button") ? "html" : "val",
            i = t.data("disable-with"),
            i !== e && (t.data("ujs:enable-with", t[n]()),
            t[n](i)),
            t.prop("disabled", !0),
            t.data("ujs:disabled", !0)
        },
        enableFormElements: function(e) {
            n.formElements(e, n.enableSelector).each(function() {
                n.enableFormElement(t(this))
            })
        },
        enableFormElement: function(t) {
            var n = t.is("button") ? "html" : "val";
            t.data("ujs:enable-with") !== e && (t[n](t.data("ujs:enable-with")),
            t.removeData("ujs:enable-with")),
            t.prop("disabled", !1),
            t.removeData("ujs:disabled")
        },
        allowAction: function(t) {
            var e, i = t.data("confirm"), o = !1;
            if (!i)
                return !0;
            if (n.fire(t, "confirm")) {
                try {
                    o = n.confirm(i)
                } catch (r) {
                    (console.error || console.log).call(console, r.stack || r)
                }
                e = n.fire(t, "confirm:complete", [o])
            }
            return o && e
        },
        blankInputs: function(e, n, i) {
            var o, r, s = t(), a = n || "input,textarea", l = e.find(a);
            return l.each(function() {
                if (o = t(this),
                r = o.is("input[type=checkbox],input[type=radio]") ? o.is(":checked") : !!o.val(),
                r === i) {
                    if (o.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + o.attr("name") + '"]').length)
                        return !0;
                    s = s.add(o)
                }
            }),
            s.length ? s : !1
        },
        nonBlankInputs: function(t, e) {
            return n.blankInputs(t, e, !0)
        },
        stopEverything: function(e) {
            return t(e.target).trigger("ujs:everythingStopped"),
            e.stopImmediatePropagation(),
            !1
        },
        disableElement: function(t) {
            var i = t.data("disable-with");
            i !== e && (t.data("ujs:enable-with", t.html()),
            t.html(i)),
            t.bind("click.railsDisable", function(t) {
                return n.stopEverything(t)
            }),
            t.data("ujs:disabled", !0)
        },
        enableElement: function(t) {
            t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")),
            t.removeData("ujs:enable-with")),
            t.unbind("click.railsDisable"),
            t.removeData("ujs:disabled")
        }
    },
    n.fire(i, "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, i) {
        t.crossDomain || n.CSRFProtection(i)
    }),
    t(window).on("pageshow.rails", function() {
        t(t.rails.enableSelector).each(function() {
            var e = t(this);
            e.data("ujs:disabled") && t.rails.enableFormElement(e)
        }),
        t(t.rails.linkDisableSelector).each(function() {
            var e = t(this);
            e.data("ujs:disabled") && t.rails.enableElement(e)
        })
    }),
    i.delegate(n.linkDisableSelector, "ajax:complete", function() {
        n.enableElement(t(this))
    }),
    i.delegate(n.buttonDisableSelector, "ajax:complete", function() {
        n.enableFormElement(t(this))
    }),
    i.delegate(n.linkClickSelector, "click.rails", function(e) {
        var i = t(this)
          , o = i.data("method")
          , r = i.data("params")
          , s = e.metaKey || e.ctrlKey;
        if (!n.allowAction(i))
            return n.stopEverything(e);
        if (!s && i.is(n.linkDisableSelector) && n.disableElement(i),
        n.isRemote(i)) {
            if (s && (!o || "GET" === o) && !r)
                return !0;
            var a = n.handleRemote(i);
            return a === !1 ? n.enableElement(i) : a.fail(function() {
                n.enableElement(i)
            }),
            !1
        }
        return o ? (n.handleMethod(i),
        !1) : void 0
    }),
    i.delegate(n.buttonClickSelector, "click.rails", function(e) {
        var i = t(this);
        if (!n.allowAction(i) || !n.isRemote(i))
            return n.stopEverything(e);
        i.is(n.buttonDisableSelector) && n.disableFormElement(i);
        var o = n.handleRemote(i);
        return o === !1 ? n.enableFormElement(i) : o.fail(function() {
            n.enableFormElement(i)
        }),
        !1
    }),
    i.delegate(n.inputChangeSelector, "change.rails", function(e) {
        var i = t(this);
        return n.allowAction(i) && n.isRemote(i) ? (n.handleRemote(i),
        !1) : n.stopEverything(e)
    }),
    i.delegate(n.formSubmitSelector, "submit.rails", function(i) {
        var o, r, s = t(this), a = n.isRemote(s);
        if (!n.allowAction(s))
            return n.stopEverything(i);
        if (s.attr("novalidate") === e)
            if (s.data("ujs:formnovalidate-button") === e) {
                if (o = n.blankInputs(s, n.requiredInputSelector, !1),
                o && n.fire(s, "ajax:aborted:required", [o]))
                    return n.stopEverything(i)
            } else
                s.data("ujs:formnovalidate-button", e);
        if (a) {
            if (r = n.nonBlankInputs(s, n.fileInputSelector)) {
                setTimeout(function() {
                    n.disableFormElements(s)
                }, 13);
                var l = n.fire(s, "ajax:aborted:file", [r]);
                return l || setTimeout(function() {
                    n.enableFormElements(s)
                }, 13),
                l
            }
            return n.handleRemote(s),
            !1
        }
        setTimeout(function() {
            n.disableFormElements(s)
        }, 13)
    }),
    i.delegate(n.formInputClickSelector, "click.rails", function(e) {
        var i = t(this);
        if (!n.allowAction(i))
            return n.stopEverything(e);
        var o = i.attr("name")
          , r = o ? {
            name: o,
            value: i.val()
        } : null
          , s = i.closest("form");
        0 === s.length && (s = t("#" + i.attr("form"))),
        s.data("ujs:submit-button", r),
        s.data("ujs:formnovalidate-button", i.attr("formnovalidate")),
        s.data("ujs:submit-button-formaction", i.attr("formaction")),
        s.data("ujs:submit-button-formmethod", i.attr("formmethod"))
    }),
    i.delegate(n.formSubmitSelector, "ajax:send.rails", function(e) {
        this === e.target && n.disableFormElements(t(this))
    }),
    i.delegate(n.formSubmitSelector, "ajax:complete.rails", function(e) {
        this === e.target && n.enableFormElements(t(this))
    }),
    t(function() {
        n.refreshCSRFTokens()
    }))
}(jQuery),
/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t) {
    function e(e, i) {
        var o, r, s, a = e.nodeName.toLowerCase();
        return "area" === a ? (o = e.parentNode,
        r = o.name,
        e.href && r && "map" === o.nodeName.toLowerCase() ? (s = t("img[usemap='#" + r + "']")[0],
        !!s && n(s)) : !1) : (/^(input|select|textarea|button|object)$/.test(a) ? !e.disabled : "a" === a ? e.href || i : i) && n(e)
    }
    function n(e) {
        return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function() {
            return "hidden" === t.css(this, "visibility")
        }).length
    }
    t.ui = t.ui || {},
    t.extend(t.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }),
    t.fn.extend({
        scrollParent: function(e) {
            var n = this.css("position")
              , i = "absolute" === n
              , o = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/
              , r = this.parents().filter(function() {
                var e = t(this);
                return i && "static" === e.css("position") ? !1 : o.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
            }).eq(0);
            return "fixed" !== n && r.length ? r : t(this[0].ownerDocument || document)
        },
        uniqueId: function() {
            var t = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++t)
                })
            }
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id")
            })
        }
    }),
    t.extend(t.expr[":"], {
        data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
            return function(n) {
                return !!t.data(n, e)
            }
        }) : function(e, n, i) {
            return !!t.data(e, i[3])
        }
        ,
        focusable: function(n) {
            return e(n, !isNaN(t.attr(n, "tabindex")))
        },
        tabbable: function(n) {
            var i = t.attr(n, "tabindex")
              , o = isNaN(i);
            return (o || i >= 0) && e(n, !o)
        }
    }),
    t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function(e, n) {
        function i(e, n, i, r) {
            return t.each(o, function() {
                n -= parseFloat(t.css(e, "padding" + this)) || 0,
                i && (n -= parseFloat(t.css(e, "border" + this + "Width")) || 0),
                r && (n -= parseFloat(t.css(e, "margin" + this)) || 0)
            }),
            n
        }
        var o = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"]
          , r = n.toLowerCase()
          , s = {
            innerWidth: t.fn.innerWidth,
            innerHeight: t.fn.innerHeight,
            outerWidth: t.fn.outerWidth,
            outerHeight: t.fn.outerHeight
        };
        t.fn["inner" + n] = function(e) {
            return void 0 === e ? s["inner" + n].call(this) : this.each(function() {
                t(this).css(r, i(this, e) + "px")
            })
        }
        ,
        t.fn["outer" + n] = function(e, o) {
            return "number" != typeof e ? s["outer" + n].call(this, e) : this.each(function() {
                t(this).css(r, i(this, e, !0, o) + "px")
            })
        }
    }),
    t.fn.addBack || (t.fn.addBack = function(t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
    }
    ),
    t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function(e) {
        return function(n) {
            return arguments.length ? e.call(this, t.camelCase(n)) : e.call(this)
        }
    }(t.fn.removeData)),
    t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
    t.fn.extend({
        focus: function(e) {
            return function(n, i) {
                return "number" == typeof n ? this.each(function() {
                    var e = this;
                    setTimeout(function() {
                        t(e).focus(),
                        i && i.call(e)
                    }, n)
                }) : e.apply(this, arguments)
            }
        }(t.fn.focus),
        disableSelection: function() {
            var t = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.bind(t + ".ui-disableSelection", function(t) {
                    t.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function(e) {
            if (void 0 !== e)
                return this.css("zIndex", e);
            if (this.length)
                for (var n, i, o = t(this[0]); o.length && o[0] !== document; ) {
                    if (n = o.css("position"),
                    ("absolute" === n || "relative" === n || "fixed" === n) && (i = parseInt(o.css("zIndex"), 10),
                    !isNaN(i) && 0 !== i))
                        return i;
                    o = o.parent()
                }
            return 0
        }
    }),
    t.ui.plugin = {
        add: function(e, n, i) {
            var o, r = t.ui[e].prototype;
            for (o in i)
                r.plugins[o] = r.plugins[o] || [],
                r.plugins[o].push([n, i[o]])
        },
        call: function(t, e, n, i) {
            var o, r = t.plugins[e];
            if (r && (i || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))
                for (o = 0; o < r.length; o++)
                    t.options[r[o][0]] && r[o][1].apply(t.element, n)
        }
    }
}),
/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t) {
    var e = 0
      , n = Array.prototype.slice;
    return t.cleanData = function(e) {
        return function(n) {
            var i, o, r;
            for (r = 0; null != (o = n[r]); r++)
                try {
                    i = t._data(o, "events"),
                    i && i.remove && t(o).triggerHandler("remove")
                } catch (s) {}
            e(n)
        }
    }(t.cleanData),
    t.widget = function(e, n, i) {
        var o, r, s, a, l = {}, u = e.split(".")[0];
        return e = e.split(".")[1],
        o = u + "-" + e,
        i || (i = n,
        n = t.Widget),
        t.expr[":"][o.toLowerCase()] = function(e) {
            return !!t.data(e, o)
        }
        ,
        t[u] = t[u] || {},
        r = t[u][e],
        s = t[u][e] = function(t, e) {
            return this._createWidget ? void (arguments.length && this._createWidget(t, e)) : new s(t,e)
        }
        ,
        t.extend(s, r, {
            version: i.version,
            _proto: t.extend({}, i),
            _childConstructors: []
        }),
        a = new n,
        a.options = t.widget.extend({}, a.options),
        t.each(i, function(e, i) {
            return t.isFunction(i) ? void (l[e] = function() {
                var t = function() {
                    return n.prototype[e].apply(this, arguments)
                }
                  , o = function(t) {
                    return n.prototype[e].apply(this, t)
                };
                return function() {
                    var e, n = this._super, r = this._superApply;
                    return this._super = t,
                    this._superApply = o,
                    e = i.apply(this, arguments),
                    this._super = n,
                    this._superApply = r,
                    e
                }
            }()) : void (l[e] = i)
        }),
        s.prototype = t.widget.extend(a, {
            widgetEventPrefix: r ? a.widgetEventPrefix || e : e
        }, l, {
            constructor: s,
            namespace: u,
            widgetName: e,
            widgetFullName: o
        }),
        r ? (t.each(r._childConstructors, function(e, n) {
            var i = n.prototype;
            t.widget(i.namespace + "." + i.widgetName, s, n._proto)
        }),
        delete r._childConstructors) : n._childConstructors.push(s),
        t.widget.bridge(e, s),
        s
    }
    ,
    t.widget.extend = function(e) {
        for (var i, o, r = n.call(arguments, 1), s = 0, a = r.length; a > s; s++)
            for (i in r[s])
                o = r[s][i],
                r[s].hasOwnProperty(i) && void 0 !== o && (t.isPlainObject(o) ? e[i] = t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], o) : t.widget.extend({}, o) : e[i] = o);
        return e
    }
    ,
    t.widget.bridge = function(e, i) {
        var o = i.prototype.widgetFullName || e;
        t.fn[e] = function(r) {
            var s = "string" == typeof r
              , a = n.call(arguments, 1)
              , l = this;
            return s ? this.each(function() {
                var n, i = t.data(this, o);
                return "instance" === r ? (l = i,
                !1) : i ? t.isFunction(i[r]) && "_" !== r.charAt(0) ? (n = i[r].apply(i, a),
                n !== i && void 0 !== n ? (l = n && n.jquery ? l.pushStack(n.get()) : n,
                !1) : void 0) : t.error("no such method '" + r + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + r + "'")
            }) : (a.length && (r = t.widget.extend.apply(null, [r].concat(a))),
            this.each(function() {
                var e = t.data(this, o);
                e ? (e.option(r || {}),
                e._init && e._init()) : t.data(this, o, new i(r,this))
            })),
            l
        }
    }
    ,
    t.Widget = function() {}
    ,
    t.Widget._childConstructors = [],
    t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(n, i) {
            i = t(i || this.defaultElement || this)[0],
            this.element = t(i),
            this.uuid = e++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.bindings = t(),
            this.hoverable = t(),
            this.focusable = t(),
            i !== this && (t.data(i, this.widgetFullName, this),
            this._on(!0, this.element, {
                remove: function(t) {
                    t.target === i && this.destroy()
                }
            }),
            this.document = t(i.style ? i.ownerDocument : i.document || i),
            this.window = t(this.document[0].defaultView || this.document[0].parentWindow)),
            this.options = t.widget.extend({}, this.options, this._getCreateOptions(), n),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: t.noop,
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function() {
            this._destroy(),
            this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: t.noop,
        widget: function() {
            return this.element
        },
        option: function(e, n) {
            var i, o, r, s = e;
            if (0 === arguments.length)
                return t.widget.extend({}, this.options);
            if ("string" == typeof e)
                if (s = {},
                i = e.split("."),
                e = i.shift(),
                i.length) {
                    for (o = s[e] = t.widget.extend({}, this.options[e]),
                    r = 0; r < i.length - 1; r++)
                        o[i[r]] = o[i[r]] || {},
                        o = o[i[r]];
                    if (e = i.pop(),
                    1 === arguments.length)
                        return void 0 === o[e] ? null : o[e];
                    o[e] = n
                } else {
                    if (1 === arguments.length)
                        return void 0 === this.options[e] ? null : this.options[e];
                    s[e] = n
                }
            return this._setOptions(s),
            this
        },
        _setOptions: function(t) {
            var e;
            for (e in t)
                this._setOption(e, t[e]);
            return this
        },
        _setOption: function(t, e) {
            return this.options[t] = e,
            "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e),
            e && (this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus"))),
            this
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function(e, n, i) {
            var o, r = this;
            "boolean" != typeof e && (i = n,
            n = e,
            e = !1),
            i ? (n = o = t(n),
            this.bindings = this.bindings.add(n)) : (i = n,
            n = this.element,
            o = this.widget()),
            t.each(i, function(i, s) {
                function a() {
                    return e || r.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof s ? r[s] : s).apply(r, arguments) : void 0
                }
                "string" != typeof s && (a.guid = s.guid = s.guid || a.guid || t.guid++);
                var l = i.match(/^([\w:-]*)\s*(.*)$/)
                  , u = l[1] + r.eventNamespace
                  , c = l[2];
                c ? o.delegate(c, u, a) : n.bind(u, a)
            })
        },
        _off: function(e, n) {
            n = (n || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            e.unbind(n).undelegate(n),
            this.bindings = t(this.bindings.not(e).get()),
            this.focusable = t(this.focusable.not(e).get()),
            this.hoverable = t(this.hoverable.not(e).get())
        },
        _delay: function(t, e) {
            function n() {
                return ("string" == typeof t ? i[t] : t).apply(i, arguments)
            }
            var i = this;
            return setTimeout(n, e || 0)
        },
        _hoverable: function(e) {
            this.hoverable = this.hoverable.add(e),
            this._on(e, {
                mouseenter: function(e) {
                    t(e.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(e) {
                    t(e.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(e) {
            this.focusable = this.focusable.add(e),
            this._on(e, {
                focusin: function(e) {
                    t(e.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(e) {
                    t(e.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(e, n, i) {
            var o, r, s = this.options[e];
            if (i = i || {},
            n = t.Event(n),
            n.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(),
            n.target = this.element[0],
            r = n.originalEvent)
                for (o in r)
                    o in n || (n[o] = r[o]);
            return this.element.trigger(n, i),
            !(t.isFunction(s) && s.apply(this.element[0], [n].concat(i)) === !1 || n.isDefaultPrevented())
        }
    },
    t.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(e, n) {
        t.Widget.prototype["_" + e] = function(i, o, r) {
            "string" == typeof o && (o = {
                effect: o
            });
            var s, a = o ? o === !0 || "number" == typeof o ? n : o.effect || n : e;
            o = o || {},
            "number" == typeof o && (o = {
                duration: o
            }),
            s = !t.isEmptyObject(o),
            o.complete = r,
            o.delay && i.delay(o.delay),
            s && t.effects && t.effects.effect[a] ? i[e](o) : a !== e && i[a] ? i[a](o.duration, o.easing, r) : i.queue(function(n) {
                t(this)[e](),
                r && r.call(i[0]),
                n()
            })
        }
    }),
    t.widget
}),
/*!
 * jQuery UI Mouse 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */
function(t) {
    "function" == typeof define && define.amd ? define(["jquery", "./widget"], t) : t(jQuery)
}(function(t) {
    var e = !1;
    return t(document).mouseup(function() {
        e = !1
    }),
    t.widget("ui.mouse", {
        version: "1.11.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var e = this;
            this.element.bind("mousedown." + this.widgetName, function(t) {
                return e._mouseDown(t)
            }).bind("click." + this.widgetName, function(n) {
                return !0 === t.data(n.target, e.widgetName + ".preventClickEvent") ? (t.removeData(n.target, e.widgetName + ".preventClickEvent"),
                n.stopImmediatePropagation(),
                !1) : void 0
            }),
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName),
            this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(n) {
            if (!e) {
                this._mouseMoved = !1,
                this._mouseStarted && this._mouseUp(n),
                this._mouseDownEvent = n;
                var i = this
                  , o = 1 === n.which
                  , r = "string" == typeof this.options.cancel && n.target.nodeName ? t(n.target).closest(this.options.cancel).length : !1;
                return o && !r && this._mouseCapture(n) ? (this.mouseDelayMet = !this.options.delay,
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    i.mouseDelayMet = !0
                }, this.options.delay)),
                this._mouseDistanceMet(n) && this._mouseDelayMet(n) && (this._mouseStarted = this._mouseStart(n) !== !1,
                !this._mouseStarted) ? (n.preventDefault(),
                !0) : (!0 === t.data(n.target, this.widgetName + ".preventClickEvent") && t.removeData(n.target, this.widgetName + ".preventClickEvent"),
                this._mouseMoveDelegate = function(t) {
                    return i._mouseMove(t)
                }
                ,
                this._mouseUpDelegate = function(t) {
                    return i._mouseUp(t)
                }
                ,
                this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                n.preventDefault(),
                e = !0,
                !0)) : !0
            }
        },
        _mouseMove: function(e) {
            if (this._mouseMoved) {
                if (t.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button)
                    return this._mouseUp(e);
                if (!e.which)
                    return this._mouseUp(e)
            }
            return (e.which || e.button) && (this._mouseMoved = !0),
            this._mouseStarted ? (this._mouseDrag(e),
            e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1,
            this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
            !this._mouseStarted)
        },
        _mouseUp: function(n) {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted && (this._mouseStarted = !1,
            n.target === this._mouseDownEvent.target && t.data(n.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(n)),
            e = !1,
            !1
        },
        _mouseDistanceMet: function(t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
}),
/*!
 * jQuery UI Draggable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/draggable/
 */
function(t) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./mouse", "./widget"], t) : t(jQuery)
}(function(t) {
    return t.widget("ui.draggable", t.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" === this.options.helper && this._setPositionRelative(),
            this.options.addClasses && this.element.addClass("ui-draggable"),
            this.options.disabled && this.element.addClass("ui-draggable-disabled"),
            this._setHandleClassName(),
            this._mouseInit()
        },
        _setOption: function(t, e) {
            this._super(t, e),
            "handle" === t && (this._removeHandleClassName(),
            this._setHandleClassName())
        },
        _destroy: function() {
            return (this.helper || this.element).is(".ui-draggable-dragging") ? void (this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),
            this._removeHandleClassName(),
            void this._mouseDestroy())
        },
        _mouseCapture: function(e) {
            var n = this.options;
            return this._blurActiveElement(e),
            this.helper || n.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e),
            this.handle ? (this._blockFrames(n.iframeFix === !0 ? "iframe" : n.iframeFix),
            !0) : !1)
        },
        _blockFrames: function(e) {
            this.iframeBlocks = this.document.find(e).map(function() {
                var e = t(this);
                return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(),
            delete this.iframeBlocks)
        },
        _blurActiveElement: function(e) {
            var n = this.document[0];
            if (this.handleElement.is(e.target))
                try {
                    n.activeElement && "body" !== n.activeElement.nodeName.toLowerCase() && t(n.activeElement).blur()
                } catch (i) {}
        },
        _mouseStart: function(e) {
            var n = this.options;
            return this.helper = this._createHelper(e),
            this.helper.addClass("ui-draggable-dragging"),
            this._cacheHelperProportions(),
            t.ui.ddmanager && (t.ui.ddmanager.current = this),
            this._cacheMargins(),
            this.cssPosition = this.helper.css("position"),
            this.scrollParent = this.helper.scrollParent(!0),
            this.offsetParent = this.helper.offsetParent(),
            this.hasFixedAncestor = this.helper.parents().filter(function() {
                return "fixed" === t(this).css("position")
            }).length > 0,
            this.positionAbs = this.element.offset(),
            this._refreshOffsets(e),
            this.originalPosition = this.position = this._generatePosition(e, !1),
            this.originalPageX = e.pageX,
            this.originalPageY = e.pageY,
            n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt),
            this._setContainment(),
            this._trigger("start", e) === !1 ? (this._clear(),
            !1) : (this._cacheHelperProportions(),
            t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e),
            this._normalizeRightBottom(),
            this._mouseDrag(e, !0),
            t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e),
            !0)
        },
        _refreshOffsets: function(t) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            },
            this.offset.click = {
                left: t.pageX - this.offset.left,
                top: t.pageY - this.offset.top
            }
        },
        _mouseDrag: function(e, n) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()),
            this.position = this._generatePosition(e, !0),
            this.positionAbs = this._convertPositionTo("absolute"),
            !n) {
                var i = this._uiHash();
                if (this._trigger("drag", e, i) === !1)
                    return this._mouseUp({}),
                    !1;
                this.position = i.position
            }
            return this.helper[0].style.left = this.position.left + "px",
            this.helper[0].style.top = this.position.top + "px",
            t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
            !1
        },
        _mouseStop: function(e) {
            var n = this
              , i = !1;
            return t.ui.ddmanager && !this.options.dropBehaviour && (i = t.ui.ddmanager.drop(this, e)),
            this.dropped && (i = this.dropped,
            this.dropped = !1),
            "invalid" === this.options.revert && !i || "valid" === this.options.revert && i || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, i) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                n._trigger("stop", e) !== !1 && n._clear()
            }) : this._trigger("stop", e) !== !1 && this._clear(),
            !1
        },
        _mouseUp: function(e) {
            return this._unblockFrames(),
            t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e),
            this.handleElement.is(e.target) && this.element.focus(),
            t.ui.mouse.prototype._mouseUp.call(this, e)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(),
            this
        },
        _getHandle: function(e) {
            return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _setHandleClassName: function() {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element,
            this.handleElement.addClass("ui-draggable-handle")
        },
        _removeHandleClassName: function() {
            this.handleElement.removeClass("ui-draggable-handle")
        },
        _createHelper: function(e) {
            var n = this.options
              , i = t.isFunction(n.helper)
              , o = i ? t(n.helper.apply(this.element[0], [e])) : "clone" === n.helper ? this.element.clone().removeAttr("id") : this.element;
            return o.parents("body").length || o.appendTo("parent" === n.appendTo ? this.element[0].parentNode : n.appendTo),
            i && o[0] === this.element[0] && this._setPositionRelative(),
            o[0] === this.element[0] || /(fixed|absolute)/.test(o.css("position")) || o.css("position", "absolute"),
            o
        },
        _setPositionRelative: function() {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")),
            t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }),
            "left"in e && (this.offset.click.left = e.left + this.margins.left),
            "right"in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
            "top"in e && (this.offset.click.top = e.top + this.margins.top),
            "bottom"in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _isRootNode: function(t) {
            return /(html|body)/i.test(t.tagName) || t === this.document[0]
        },
        _getParentOffset: function() {
            var e = this.offsetParent.offset()
              , n = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== n && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(),
            e.top += this.scrollParent.scrollTop()),
            this._isRootNode(this.offsetParent[0]) && (e = {
                top: 0,
                left: 0
            }),
            {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition)
                return {
                    top: 0,
                    left: 0
                };
            var t = this.element.position()
              , e = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
                left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var e, n, i, o = this.options, r = this.document[0];
            return this.relativeContainer = null,
            o.containment ? "window" === o.containment ? void (this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || r.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === o.containment ? void (this.containment = [0, 0, t(r).width() - this.helperProportions.width - this.margins.left, (t(r).height() || r.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : o.containment.constructor === Array ? void (this.containment = o.containment) : ("parent" === o.containment && (o.containment = this.helper[0].parentNode),
            n = t(o.containment),
            i = n[0],
            void (i && (e = /(scroll|auto)/.test(n.css("overflow")),
            this.containment = [(parseInt(n.css("borderLeftWidth"), 10) || 0) + (parseInt(n.css("paddingLeft"), 10) || 0), (parseInt(n.css("borderTopWidth"), 10) || 0) + (parseInt(n.css("paddingTop"), 10) || 0), (e ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(n.css("borderRightWidth"), 10) || 0) - (parseInt(n.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(n.css("borderBottomWidth"), 10) || 0) - (parseInt(n.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
            this.relativeContainer = n))) : void (this.containment = null)
        },
        _convertPositionTo: function(t, e) {
            e || (e = this.position);
            var n = "absolute" === t ? 1 : -1
              , i = this._isRootNode(this.scrollParent[0]);
            return {
                top: e.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.offset.scroll.top : i ? 0 : this.offset.scroll.top) * n,
                left: e.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.offset.scroll.left : i ? 0 : this.offset.scroll.left) * n
            }
        },
        _generatePosition: function(t, e) {
            var n, i, o, r, s = this.options, a = this._isRootNode(this.scrollParent[0]), l = t.pageX, u = t.pageY;
            return a && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }),
            e && (this.containment && (this.relativeContainer ? (i = this.relativeContainer.offset(),
            n = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]) : n = this.containment,
            t.pageX - this.offset.click.left < n[0] && (l = n[0] + this.offset.click.left),
            t.pageY - this.offset.click.top < n[1] && (u = n[1] + this.offset.click.top),
            t.pageX - this.offset.click.left > n[2] && (l = n[2] + this.offset.click.left),
            t.pageY - this.offset.click.top > n[3] && (u = n[3] + this.offset.click.top)),
            s.grid && (o = s.grid[1] ? this.originalPageY + Math.round((u - this.originalPageY) / s.grid[1]) * s.grid[1] : this.originalPageY,
            u = n ? o - this.offset.click.top >= n[1] || o - this.offset.click.top > n[3] ? o : o - this.offset.click.top >= n[1] ? o - s.grid[1] : o + s.grid[1] : o,
            r = s.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / s.grid[0]) * s.grid[0] : this.originalPageX,
            l = n ? r - this.offset.click.left >= n[0] || r - this.offset.click.left > n[2] ? r : r - this.offset.click.left >= n[0] ? r - s.grid[0] : r + s.grid[0] : r),
            "y" === s.axis && (l = this.originalPageX),
            "x" === s.axis && (u = this.originalPageY)),
            {
                top: u - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : a ? 0 : this.offset.scroll.top),
                left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : a ? 0 : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"),
            this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
            this.helper = null,
            this.cancelHelperRemoval = !1,
            this.destroyOnClear && this.destroy()
        },
        _normalizeRightBottom: function() {
            "y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()),
            this.helper.css("right", "auto")),
            "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()),
            this.helper.css("bottom", "auto"))
        },
        _trigger: function(e, n, i) {
            return i = i || this._uiHash(),
            t.ui.plugin.call(this, e, [n, i, this], !0),
            /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"),
            i.offset = this.positionAbs),
            t.Widget.prototype._trigger.call(this, e, n, i)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }),
    t.ui.plugin.add("draggable", "connectToSortable", {
        start: function(e, n, i) {
            var o = t.extend({}, n, {
                item: i.element
            });
            i.sortables = [],
            t(i.options.connectToSortable).each(function() {
                var n = t(this).sortable("instance");
                n && !n.options.disabled && (i.sortables.push(n),
                n.refreshPositions(),
                n._trigger("activate", e, o))
            })
        },
        stop: function(e, n, i) {
            var o = t.extend({}, n, {
                item: i.element
            });
            i.cancelHelperRemoval = !1,
            t.each(i.sortables, function() {
                var t = this;
                t.isOver ? (t.isOver = 0,
                i.cancelHelperRemoval = !0,
                t.cancelHelperRemoval = !1,
                t._storedCSS = {
                    position: t.placeholder.css("position"),
                    top: t.placeholder.css("top"),
                    left: t.placeholder.css("left")
                },
                t._mouseStop(e),
                t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0,
                t._trigger("deactivate", e, o))
            })
        },
        drag: function(e, n, i) {
            t.each(i.sortables, function() {
                var o = !1
                  , r = this;
                r.positionAbs = i.positionAbs,
                r.helperProportions = i.helperProportions,
                r.offset.click = i.offset.click,
                r._intersectsWith(r.containerCache) && (o = !0,
                t.each(i.sortables, function() {
                    return this.positionAbs = i.positionAbs,
                    this.helperProportions = i.helperProportions,
                    this.offset.click = i.offset.click,
                    this !== r && this._intersectsWith(this.containerCache) && t.contains(r.element[0], this.element[0]) && (o = !1),
                    o
                })),
                o ? (r.isOver || (r.isOver = 1,
                i._parent = n.helper.parent(),
                r.currentItem = n.helper.appendTo(r.element).data("ui-sortable-item", !0),
                r.options._helper = r.options.helper,
                r.options.helper = function() {
                    return n.helper[0]
                }
                ,
                e.target = r.currentItem[0],
                r._mouseCapture(e, !0),
                r._mouseStart(e, !0, !0),
                r.offset.click.top = i.offset.click.top,
                r.offset.click.left = i.offset.click.left,
                r.offset.parent.left -= i.offset.parent.left - r.offset.parent.left,
                r.offset.parent.top -= i.offset.parent.top - r.offset.parent.top,
                i._trigger("toSortable", e),
                i.dropped = r.element,
                t.each(i.sortables, function() {
                    this.refreshPositions()
                }),
                i.currentItem = i.element,
                r.fromOutside = i),
                r.currentItem && (r._mouseDrag(e),
                n.position = r.position)) : r.isOver && (r.isOver = 0,
                r.cancelHelperRemoval = !0,
                r.options._revert = r.options.revert,
                r.options.revert = !1,
                r._trigger("out", e, r._uiHash(r)),
                r._mouseStop(e, !0),
                r.options.revert = r.options._revert,
                r.options.helper = r.options._helper,
                r.placeholder && r.placeholder.remove(),
                n.helper.appendTo(i._parent),
                i._refreshOffsets(e),
                n.position = i._generatePosition(e, !0),
                i._trigger("fromSortable", e),
                i.dropped = !1,
                t.each(i.sortables, function() {
                    this.refreshPositions()
                }))
            })
        }
    }),
    t.ui.plugin.add("draggable", "cursor", {
        start: function(e, n, i) {
            var o = t("body")
              , r = i.options;
            o.css("cursor") && (r._cursor = o.css("cursor")),
            o.css("cursor", r.cursor)
        },
        stop: function(e, n, i) {
            var o = i.options;
            o._cursor && t("body").css("cursor", o._cursor)
        }
    }),
    t.ui.plugin.add("draggable", "opacity", {
        start: function(e, n, i) {
            var o = t(n.helper)
              , r = i.options;
            o.css("opacity") && (r._opacity = o.css("opacity")),
            o.css("opacity", r.opacity)
        },
        stop: function(e, n, i) {
            var o = i.options;
            o._opacity && t(n.helper).css("opacity", o._opacity)
        }
    }),
    t.ui.plugin.add("draggable", "scroll", {
        start: function(t, e, n) {
            n.scrollParentNotHidden || (n.scrollParentNotHidden = n.helper.scrollParent(!1)),
            n.scrollParentNotHidden[0] !== n.document[0] && "HTML" !== n.scrollParentNotHidden[0].tagName && (n.overflowOffset = n.scrollParentNotHidden.offset())
        },
        drag: function(e, n, i) {
            var o = i.options
              , r = !1
              , s = i.scrollParentNotHidden[0]
              , a = i.document[0];
            s !== a && "HTML" !== s.tagName ? (o.axis && "x" === o.axis || (i.overflowOffset.top + s.offsetHeight - e.pageY < o.scrollSensitivity ? s.scrollTop = r = s.scrollTop + o.scrollSpeed : e.pageY - i.overflowOffset.top < o.scrollSensitivity && (s.scrollTop = r = s.scrollTop - o.scrollSpeed)),
            o.axis && "y" === o.axis || (i.overflowOffset.left + s.offsetWidth - e.pageX < o.scrollSensitivity ? s.scrollLeft = r = s.scrollLeft + o.scrollSpeed : e.pageX - i.overflowOffset.left < o.scrollSensitivity && (s.scrollLeft = r = s.scrollLeft - o.scrollSpeed))) : (o.axis && "x" === o.axis || (e.pageY - t(a).scrollTop() < o.scrollSensitivity ? r = t(a).scrollTop(t(a).scrollTop() - o.scrollSpeed) : t(window).height() - (e.pageY - t(a).scrollTop()) < o.scrollSensitivity && (r = t(a).scrollTop(t(a).scrollTop() + o.scrollSpeed))),
            o.axis && "y" === o.axis || (e.pageX - t(a).scrollLeft() < o.scrollSensitivity ? r = t(a).scrollLeft(t(a).scrollLeft() - o.scrollSpeed) : t(window).width() - (e.pageX - t(a).scrollLeft()) < o.scrollSensitivity && (r = t(a).scrollLeft(t(a).scrollLeft() + o.scrollSpeed)))),
            r !== !1 && t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(i, e)
        }
    }),
    t.ui.plugin.add("draggable", "snap", {
        start: function(e, n, i) {
            var o = i.options;
            i.snapElements = [],
            t(o.snap.constructor !== String ? o.snap.items || ":data(ui-draggable)" : o.snap).each(function() {
                var e = t(this)
                  , n = e.offset();
                this !== i.element[0] && i.snapElements.push({
                    item: this,
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: n.top,
                    left: n.left
                })
            })
        },
        drag: function(e, n, i) {
            var o, r, s, a, l, u, c, d, h, p, f = i.options, g = f.snapTolerance, m = n.offset.left, v = m + i.helperProportions.width, b = n.offset.top, y = b + i.helperProportions.height;
            for (h = i.snapElements.length - 1; h >= 0; h--)
                l = i.snapElements[h].left - i.margins.left,
                u = l + i.snapElements[h].width,
                c = i.snapElements[h].top - i.margins.top,
                d = c + i.snapElements[h].height,
                l - g > v || m > u + g || c - g > y || b > d + g || !t.contains(i.snapElements[h].item.ownerDocument, i.snapElements[h].item) ? (i.snapElements[h].snapping && i.options.snap.release && i.options.snap.release.call(i.element, e, t.extend(i._uiHash(), {
                    snapItem: i.snapElements[h].item
                })),
                i.snapElements[h].snapping = !1) : ("inner" !== f.snapMode && (o = Math.abs(c - y) <= g,
                r = Math.abs(d - b) <= g,
                s = Math.abs(l - v) <= g,
                a = Math.abs(u - m) <= g,
                o && (n.position.top = i._convertPositionTo("relative", {
                    top: c - i.helperProportions.height,
                    left: 0
                }).top),
                r && (n.position.top = i._convertPositionTo("relative", {
                    top: d,
                    left: 0
                }).top),
                s && (n.position.left = i._convertPositionTo("relative", {
                    top: 0,
                    left: l - i.helperProportions.width
                }).left),
                a && (n.position.left = i._convertPositionTo("relative", {
                    top: 0,
                    left: u
                }).left)),
                p = o || r || s || a,
                "outer" !== f.snapMode && (o = Math.abs(c - b) <= g,
                r = Math.abs(d - y) <= g,
                s = Math.abs(l - m) <= g,
                a = Math.abs(u - v) <= g,
                o && (n.position.top = i._convertPositionTo("relative", {
                    top: c,
                    left: 0
                }).top),
                r && (n.position.top = i._convertPositionTo("relative", {
                    top: d - i.helperProportions.height,
                    left: 0
                }).top),
                s && (n.position.left = i._convertPositionTo("relative", {
                    top: 0,
                    left: l
                }).left),
                a && (n.position.left = i._convertPositionTo("relative", {
                    top: 0,
                    left: u - i.helperProportions.width
                }).left)),
                !i.snapElements[h].snapping && (o || r || s || a || p) && i.options.snap.snap && i.options.snap.snap.call(i.element, e, t.extend(i._uiHash(), {
                    snapItem: i.snapElements[h].item
                })),
                i.snapElements[h].snapping = o || r || s || a || p)
        }
    }),
    t.ui.plugin.add("draggable", "stack", {
        start: function(e, n, i) {
            var o, r = i.options, s = t.makeArray(t(r.stack)).sort(function(e, n) {
                return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(n).css("zIndex"), 10) || 0)
            });
            s.length && (o = parseInt(t(s[0]).css("zIndex"), 10) || 0,
            t(s).each(function(e) {
                t(this).css("zIndex", o + e)
            }),
            this.css("zIndex", o + s.length))
        }
    }),
    t.ui.plugin.add("draggable", "zIndex", {
        start: function(e, n, i) {
            var o = t(n.helper)
              , r = i.options;
            o.css("zIndex") && (r._zIndex = o.css("zIndex")),
            o.css("zIndex", r.zIndex)
        },
        stop: function(e, n, i) {
            var o = i.options;
            o._zIndex && t(n.helper).css("zIndex", o._zIndex)
        }
    }),
    t.ui.draggable
}),
/*!
 * jQuery UI Droppable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/droppable/
 */
function(t) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./widget", "./mouse", "./draggable"], t) : t(jQuery)
}(function(t) {
    return t.widget("ui.droppable", {
        version: "1.11.4",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var e, n = this.options, i = n.accept;
            this.isover = !1,
            this.isout = !0,
            this.accept = t.isFunction(i) ? i : function(t) {
                return t.is(i)
            }
            ,
            this.proportions = function() {
                return arguments.length ? void (e = arguments[0]) : e ? e : e = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }
            }
            ,
            this._addToManager(n.scope),
            n.addClasses && this.element.addClass("ui-droppable")
        },
        _addToManager: function(e) {
            t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [],
            t.ui.ddmanager.droppables[e].push(this)
        },
        _splice: function(t) {
            for (var e = 0; e < t.length; e++)
                t[e] === this && t.splice(e, 1)
        },
        _destroy: function() {
            var e = t.ui.ddmanager.droppables[this.options.scope];
            this._splice(e),
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function(e, n) {
            if ("accept" === e)
                this.accept = t.isFunction(n) ? n : function(t) {
                    return t.is(n)
                }
                ;
            else if ("scope" === e) {
                var i = t.ui.ddmanager.droppables[this.options.scope];
                this._splice(i),
                this._addToManager(n)
            }
            this._super(e, n)
        },
        _activate: function(e) {
            var n = t.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass),
            n && this._trigger("activate", e, this.ui(n))
        },
        _deactivate: function(e) {
            var n = t.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass),
            n && this._trigger("deactivate", e, this.ui(n))
        },
        _over: function(e) {
            var n = t.ui.ddmanager.current;
            n && (n.currentItem || n.element)[0] !== this.element[0] && this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass),
            this._trigger("over", e, this.ui(n)))
        },
        _out: function(e) {
            var n = t.ui.ddmanager.current;
            n && (n.currentItem || n.element)[0] !== this.element[0] && this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass),
            this._trigger("out", e, this.ui(n)))
        },
        _drop: function(e, n) {
            var i = n || t.ui.ddmanager.current
              , o = !1;
            return i && (i.currentItem || i.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var n = t(this).droppable("instance");
                return n.options.greedy && !n.options.disabled && n.options.scope === i.options.scope && n.accept.call(n.element[0], i.currentItem || i.element) && t.ui.intersect(i, t.extend(n, {
                    offset: n.element.offset()
                }), n.options.tolerance, e) ? (o = !0,
                !1) : void 0
            }),
            o ? !1 : this.accept.call(this.element[0], i.currentItem || i.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass),
            this.options.hoverClass && this.element.removeClass(this.options.hoverClass),
            this._trigger("drop", e, this.ui(i)),
            this.element) : !1) : !1
        },
        ui: function(t) {
            return {
                draggable: t.currentItem || t.element,
                helper: t.helper,
                position: t.position,
                offset: t.positionAbs
            }
        }
    }),
    t.ui.intersect = function() {
        function t(t, e, n) {
            return t >= e && e + n > t
        }
        return function(e, n, i, o) {
            if (!n.offset)
                return !1;
            var r = (e.positionAbs || e.position.absolute).left + e.margins.left
              , s = (e.positionAbs || e.position.absolute).top + e.margins.top
              , a = r + e.helperProportions.width
              , l = s + e.helperProportions.height
              , u = n.offset.left
              , c = n.offset.top
              , d = u + n.proportions().width
              , h = c + n.proportions().height;
            switch (i) {
            case "fit":
                return r >= u && d >= a && s >= c && h >= l;
            case "intersect":
                return u < r + e.helperProportions.width / 2 && a - e.helperProportions.width / 2 < d && c < s + e.helperProportions.height / 2 && l - e.helperProportions.height / 2 < h;
            case "pointer":
                return t(o.pageY, c, n.proportions().height) && t(o.pageX, u, n.proportions().width);
            case "touch":
                return (s >= c && h >= s || l >= c && h >= l || c > s && l > h) && (r >= u && d >= r || a >= u && d >= a || u > r && a > d);
            default:
                return !1
            }
        }
    }(),
    t.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(e, n) {
            var i, o, r = t.ui.ddmanager.droppables[e.options.scope] || [], s = n ? n.type : null, a = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
            t: for (i = 0; i < r.length; i++)
                if (!(r[i].options.disabled || e && !r[i].accept.call(r[i].element[0], e.currentItem || e.element))) {
                    for (o = 0; o < a.length; o++)
                        if (a[o] === r[i].element[0]) {
                            r[i].proportions().height = 0;
                            continue t
                        }
                    r[i].visible = "none" !== r[i].element.css("display"),
                    r[i].visible && ("mousedown" === s && r[i]._activate.call(r[i], n),
                    r[i].offset = r[i].element.offset(),
                    r[i].proportions({
                        width: r[i].element[0].offsetWidth,
                        height: r[i].element[0].offsetHeight
                    }))
                }
        },
        drop: function(e, n) {
            var i = !1;
            return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance, n) && (i = this._drop.call(this, n) || i),
                !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0,
                this.isover = !1,
                this._deactivate.call(this, n)))
            }),
            i
        },
        dragStart: function(e, n) {
            e.element.parentsUntil("body").bind("scroll.droppable", function() {
                e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, n)
            })
        },
        drag: function(e, n) {
            e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, n),
            t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var i, o, r, s = t.ui.intersect(e, this, this.options.tolerance, n), a = !s && this.isover ? "isout" : s && !this.isover ? "isover" : null;
                    a && (this.options.greedy && (o = this.options.scope,
                    r = this.element.parents(":data(ui-droppable)").filter(function() {
                        return t(this).droppable("instance").options.scope === o
                    }),
                    r.length && (i = t(r[0]).droppable("instance"),
                    i.greedyChild = "isover" === a)),
                    i && "isover" === a && (i.isover = !1,
                    i.isout = !0,
                    i._out.call(i, n)),
                    this[a] = !0,
                    this["isout" === a ? "isover" : "isout"] = !1,
                    this["isover" === a ? "_over" : "_out"].call(this, n),
                    i && "isout" === a && (i.isout = !1,
                    i.isover = !0,
                    i._over.call(i, n)))
                }
            })
        },
        dragStop: function(e, n) {
            e.element.parentsUntil("body").unbind("scroll.droppable"),
            e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, n)
        }
    },
    t.ui.droppable
}),
/*!
 * jQuery UI Slider 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slider/
 */
function(t) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./mouse", "./widget"], t) : t(jQuery)
}(function(t) {
    return t.widget("ui.slider", t.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function() {
            this._keySliding = !1,
            this._mouseSliding = !1,
            this._animateOff = !0,
            this._handleIndex = null,
            this._detectOrientation(),
            this._mouseInit(),
            this._calculateNewMax(),
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"),
            this._refresh(),
            this._setOption("disabled", this.options.disabled),
            this._animateOff = !1
        },
        _refresh: function() {
            this._createRange(),
            this._createHandles(),
            this._setupEvents(),
            this._refreshValue()
        },
        _createHandles: function() {
            var e, n, i = this.options, o = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), r = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>", s = [];
            for (n = i.values && i.values.length || 1,
            o.length > n && (o.slice(n).remove(),
            o = o.slice(0, n)),
            e = o.length; n > e; e++)
                s.push(r);
            this.handles = o.add(t(s.join("")).appendTo(this.element)),
            this.handle = this.handles.eq(0),
            this.handles.each(function(e) {
                t(this).data("ui-slider-handle-index", e)
            })
        },
        _createRange: function() {
            var e = this.options
              , n = "";
            e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]),
            this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = t("<div></div>").appendTo(this.element),
            n = "ui-slider-range ui-widget-header ui-corner-all"),
            this.range.addClass(n + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : (this.range && this.range.remove(),
            this.range = null)
        },
        _setupEvents: function() {
            this._off(this.handles),
            this._on(this.handles, this._handleEvents),
            this._hoverable(this.handles),
            this._focusable(this.handles)
        },
        _destroy: function() {
            this.handles.remove(),
            this.range && this.range.remove(),
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),
            this._mouseDestroy()
        },
        _mouseCapture: function(e) {
            var n, i, o, r, s, a, l, u, c = this, d = this.options;
            return d.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            },
            this.elementOffset = this.element.offset(),
            n = {
                x: e.pageX,
                y: e.pageY
            },
            i = this._normValueFromMouse(n),
            o = this._valueMax() - this._valueMin() + 1,
            this.handles.each(function(e) {
                var n = Math.abs(i - c.values(e));
                (o > n || o === n && (e === c._lastChangedValue || c.values(e) === d.min)) && (o = n,
                r = t(this),
                s = e)
            }),
            a = this._start(e, s),
            a === !1 ? !1 : (this._mouseSliding = !0,
            this._handleIndex = s,
            r.addClass("ui-state-active").focus(),
            l = r.offset(),
            u = !t(e.target).parents().addBack().is(".ui-slider-handle"),
            this._clickOffset = u ? {
                left: 0,
                top: 0
            } : {
                left: e.pageX - l.left - r.width() / 2,
                top: e.pageY - l.top - r.height() / 2 - (parseInt(r.css("borderTopWidth"), 10) || 0) - (parseInt(r.css("borderBottomWidth"), 10) || 0) + (parseInt(r.css("marginTop"), 10) || 0)
            },
            this.handles.hasClass("ui-state-hover") || this._slide(e, s, i),
            this._animateOff = !0,
            !0))
        },
        _mouseStart: function() {
            return !0
        },
        _mouseDrag: function(t) {
            var e = {
                x: t.pageX,
                y: t.pageY
            }
              , n = this._normValueFromMouse(e);
            return this._slide(t, this._handleIndex, n),
            !1
        },
        _mouseStop: function(t) {
            return this.handles.removeClass("ui-state-active"),
            this._mouseSliding = !1,
            this._stop(t, this._handleIndex),
            this._change(t, this._handleIndex),
            this._handleIndex = null,
            this._clickOffset = null,
            this._animateOff = !1,
            !1
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(t) {
            var e, n, i, o, r;
            return "horizontal" === this.orientation ? (e = this.elementSize.width,
            n = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height,
            n = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)),
            i = n / e,
            i > 1 && (i = 1),
            0 > i && (i = 0),
            "vertical" === this.orientation && (i = 1 - i),
            o = this._valueMax() - this._valueMin(),
            r = this._valueMin() + i * o,
            this._trimAlignValue(r)
        },
        _start: function(t, e) {
            var n = {
                handle: this.handles[e],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (n.value = this.values(e),
            n.values = this.values()),
            this._trigger("start", t, n)
        },
        _slide: function(t, e, n) {
            var i, o, r;
            this.options.values && this.options.values.length ? (i = this.values(e ? 0 : 1),
            2 === this.options.values.length && this.options.range === !0 && (0 === e && n > i || 1 === e && i > n) && (n = i),
            n !== this.values(e) && (o = this.values(),
            o[e] = n,
            r = this._trigger("slide", t, {
                handle: this.handles[e],
                value: n,
                values: o
            }),
            i = this.values(e ? 0 : 1),
            r !== !1 && this.values(e, n))) : n !== this.value() && (r = this._trigger("slide", t, {
                handle: this.handles[e],
                value: n
            }),
            r !== !1 && this.value(n))
        },
        _stop: function(t, e) {
            var n = {
                handle: this.handles[e],
                value: this.value()
            };
            this.options.values && this.options.values.length && (n.value = this.values(e),
            n.values = this.values()),
            this._trigger("stop", t, n)
        },
        _change: function(t, e) {
            if (!this._keySliding && !this._mouseSliding) {
                var n = {
                    handle: this.handles[e],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (n.value = this.values(e),
                n.values = this.values()),
                this._lastChangedValue = e,
                this._trigger("change", t, n)
            }
        },
        value: function(t) {
            return arguments.length ? (this.options.value = this._trimAlignValue(t),
            this._refreshValue(),
            void this._change(null, 0)) : this._value()
        },
        values: function(e, n) {
            var i, o, r;
            if (arguments.length > 1)
                return this.options.values[e] = this._trimAlignValue(n),
                this._refreshValue(),
                void this._change(null, e);
            if (!arguments.length)
                return this._values();
            if (!t.isArray(arguments[0]))
                return this.options.values && this.options.values.length ? this._values(e) : this.value();
            for (i = this.options.values,
            o = arguments[0],
            r = 0; r < i.length; r += 1)
                i[r] = this._trimAlignValue(o[r]),
                this._change(null, r);
            this._refreshValue()
        },
        _setOption: function(e, n) {
            var i, o = 0;
            switch ("range" === e && this.options.range === !0 && ("min" === n ? (this.options.value = this._values(0),
            this.options.values = null) : "max" === n && (this.options.value = this._values(this.options.values.length - 1),
            this.options.values = null)),
            t.isArray(this.options.values) && (o = this.options.values.length),
            "disabled" === e && this.element.toggleClass("ui-state-disabled", !!n),
            this._super(e, n),
            e) {
            case "orientation":
                this._detectOrientation(),
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation),
                this._refreshValue(),
                this.handles.css("horizontal" === n ? "bottom" : "left", "");
                break;
            case "value":
                this._animateOff = !0,
                this._refreshValue(),
                this._change(null, 0),
                this._animateOff = !1;
                break;
            case "values":
                for (this._animateOff = !0,
                this._refreshValue(),
                i = 0; o > i; i += 1)
                    this._change(null, i);
                this._animateOff = !1;
                break;
            case "step":
            case "min":
            case "max":
                this._animateOff = !0,
                this._calculateNewMax(),
                this._refreshValue(),
                this._animateOff = !1;
                break;
            case "range":
                this._animateOff = !0,
                this._refresh(),
                this._animateOff = !1
            }
        },
        _value: function() {
            var t = this.options.value;
            return t = this._trimAlignValue(t)
        },
        _values: function(t) {
            var e, n, i;
            if (arguments.length)
                return e = this.options.values[t],
                e = this._trimAlignValue(e);
            if (this.options.values && this.options.values.length) {
                for (n = this.options.values.slice(),
                i = 0; i < n.length; i += 1)
                    n[i] = this._trimAlignValue(n[i]);
                return n
            }
            return []
        },
        _trimAlignValue: function(t) {
            if (t <= this._valueMin())
                return this._valueMin();
            if (t >= this._valueMax())
                return this._valueMax();
            var e = this.options.step > 0 ? this.options.step : 1
              , n = (t - this._valueMin()) % e
              , i = t - n;
            return 2 * Math.abs(n) >= e && (i += n > 0 ? e : -e),
            parseFloat(i.toFixed(5))
        },
        _calculateNewMax: function() {
            var t = this.options.max
              , e = this._valueMin()
              , n = this.options.step
              , i = Math.floor(+(t - e).toFixed(this._precision()) / n) * n;
            t = i + e,
            this.max = parseFloat(t.toFixed(this._precision()))
        },
        _precision: function() {
            var t = this._precisionOf(this.options.step);
            return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))),
            t
        },
        _precisionOf: function(t) {
            var e = t.toString()
              , n = e.indexOf(".");
            return -1 === n ? 0 : e.length - n - 1
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.max
        },
        _refreshValue: function() {
            var e, n, i, o, r, s = this.options.range, a = this.options, l = this, u = this._animateOff ? !1 : a.animate, c = {};
            this.options.values && this.options.values.length ? this.handles.each(function(i) {
                n = (l.values(i) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100,
                c["horizontal" === l.orientation ? "left" : "bottom"] = n + "%",
                t(this).stop(1, 1)[u ? "animate" : "css"](c, a.animate),
                l.options.range === !0 && ("horizontal" === l.orientation ? (0 === i && l.range.stop(1, 1)[u ? "animate" : "css"]({
                    left: n + "%"
                }, a.animate),
                1 === i && l.range[u ? "animate" : "css"]({
                    width: n - e + "%"
                }, {
                    queue: !1,
                    duration: a.animate
                })) : (0 === i && l.range.stop(1, 1)[u ? "animate" : "css"]({
                    bottom: n + "%"
                }, a.animate),
                1 === i && l.range[u ? "animate" : "css"]({
                    height: n - e + "%"
                }, {
                    queue: !1,
                    duration: a.animate
                }))),
                e = n
            }) : (i = this.value(),
            o = this._valueMin(),
            r = this._valueMax(),
            n = r !== o ? (i - o) / (r - o) * 100 : 0,
            c["horizontal" === this.orientation ? "left" : "bottom"] = n + "%",
            this.handle.stop(1, 1)[u ? "animate" : "css"](c, a.animate),
            "min" === s && "horizontal" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
                width: n + "%"
            }, a.animate),
            "max" === s && "horizontal" === this.orientation && this.range[u ? "animate" : "css"]({
                width: 100 - n + "%"
            }, {
                queue: !1,
                duration: a.animate
            }),
            "min" === s && "vertical" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
                height: n + "%"
            }, a.animate),
            "max" === s && "vertical" === this.orientation && this.range[u ? "animate" : "css"]({
                height: 100 - n + "%"
            }, {
                queue: !1,
                duration: a.animate
            }))
        },
        _handleEvents: {
            keydown: function(e) {
                var n, i, o, r, s = t(e.target).data("ui-slider-handle-index");
                switch (e.keyCode) {
                case t.ui.keyCode.HOME:
                case t.ui.keyCode.END:
                case t.ui.keyCode.PAGE_UP:
                case t.ui.keyCode.PAGE_DOWN:
                case t.ui.keyCode.UP:
                case t.ui.keyCode.RIGHT:
                case t.ui.keyCode.DOWN:
                case t.ui.keyCode.LEFT:
                    if (e.preventDefault(),
                    !this._keySliding && (this._keySliding = !0,
                    t(e.target).addClass("ui-state-active"),
                    n = this._start(e, s),
                    n === !1))
                        return
                }
                switch (r = this.options.step,
                i = o = this.options.values && this.options.values.length ? this.values(s) : this.value(),
                e.keyCode) {
                case t.ui.keyCode.HOME:
                    o = this._valueMin();
                    break;
                case t.ui.keyCode.END:
                    o = this._valueMax();
                    break;
                case t.ui.keyCode.PAGE_UP:
                    o = this._trimAlignValue(i + (this._valueMax() - this._valueMin()) / this.numPages);
                    break;
                case t.ui.keyCode.PAGE_DOWN:
                    o = this._trimAlignValue(i - (this._valueMax() - this._valueMin()) / this.numPages);
                    break;
                case t.ui.keyCode.UP:
                case t.ui.keyCode.RIGHT:
                    if (i === this._valueMax())
                        return;
                    o = this._trimAlignValue(i + r);
                    break;
                case t.ui.keyCode.DOWN:
                case t.ui.keyCode.LEFT:
                    if (i === this._valueMin())
                        return;
                    o = this._trimAlignValue(i - r)
                }
                this._slide(e, s, o)
            },
            keyup: function(e) {
                var n = t(e.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1,
                this._stop(e, n),
                this._change(e, n),
                t(e.target).removeClass("ui-state-active"))
            }
        }
    })
}),
/*!
 * jQuery UI Tabs 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/tabs/
 */
function(t) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./widget"], t) : t(jQuery)
}(function(t) {
    return t.widget("ui.tabs", {
        version: "1.11.4",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _isLocal: function() {
            var t = /#.*$/;
            return function(e) {
                var n, i;
                e = e.cloneNode(!1),
                n = e.href.replace(t, ""),
                i = location.href.replace(t, "");
                try {
                    n = decodeURIComponent(n)
                } catch (o) {}
                try {
                    i = decodeURIComponent(i)
                } catch (o) {}
                return e.hash.length > 1 && n === i
            }
        }(),
        _create: function() {
            var e = this
              , n = this.options;
            this.running = !1,
            this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", n.collapsible),
            this._processTabs(),
            n.active = this._initialActive(),
            t.isArray(n.disabled) && (n.disabled = t.unique(n.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t) {
                return e.tabs.index(t)
            }))).sort()),
            this.options.active !== !1 && this.anchors.length ? this.active = this._findActive(n.active) : this.active = t(),
            this._refresh(),
            this.active.length && this.load(n.active)
        },
        _initialActive: function() {
            var e = this.options.active
              , n = this.options.collapsible
              , i = location.hash.substring(1);
            return null === e && (i && this.tabs.each(function(n, o) {
                return t(o).attr("aria-controls") === i ? (e = n,
                !1) : void 0
            }),
            null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))),
            (null === e || -1 === e) && (e = this.tabs.length ? 0 : !1)),
            e !== !1 && (e = this.tabs.index(this.tabs.eq(e)),
            -1 === e && (e = n ? !1 : 0)),
            !n && e === !1 && this.anchors.length && (e = 0),
            e
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : t()
            }
        },
        _tabKeydown: function(e) {
            var n = t(this.document[0].activeElement).closest("li")
              , i = this.tabs.index(n)
              , o = !0;
            if (!this._handlePageNav(e)) {
                switch (e.keyCode) {
                case t.ui.keyCode.RIGHT:
                case t.ui.keyCode.DOWN:
                    i++;
                    break;
                case t.ui.keyCode.UP:
                case t.ui.keyCode.LEFT:
                    o = !1,
                    i--;
                    break;
                case t.ui.keyCode.END:
                    i = this.anchors.length - 1;
                    break;
                case t.ui.keyCode.HOME:
                    i = 0;
                    break;
                case t.ui.keyCode.SPACE:
                    return e.preventDefault(),
                    clearTimeout(this.activating),
                    void this._activate(i);
                case t.ui.keyCode.ENTER:
                    return e.preventDefault(),
                    clearTimeout(this.activating),
                    void this._activate(i === this.options.active ? !1 : i);
                default:
                    return
                }
                e.preventDefault(),
                clearTimeout(this.activating),
                i = this._focusNextTab(i, o),
                e.ctrlKey || e.metaKey || (n.attr("aria-selected", "false"),
                this.tabs.eq(i).attr("aria-selected", "true"),
                this.activating = this._delay(function() {
                    this.option("active", i)
                }, this.delay))
            }
        },
        _panelKeydown: function(e) {
            this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(),
            this.active.focus())
        },
        _handlePageNav: function(e) {
            return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)),
            !0) : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)),
            !0) : void 0
        },
        _findNextTab: function(e, n) {
            function i() {
                return e > o && (e = 0),
                0 > e && (e = o),
                e
            }
            for (var o = this.tabs.length - 1; -1 !== t.inArray(i(), this.options.disabled); )
                e = n ? e + 1 : e - 1;
            return e
        },
        _focusNextTab: function(t, e) {
            return t = this._findNextTab(t, e),
            this.tabs.eq(t).focus(),
            t
        },
        _setOption: function(t, e) {
            return "active" === t ? void this._activate(e) : "disabled" === t ? void this._setupDisabled(e) : (this._super(t, e),
            "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", e),
            e || this.options.active !== !1 || this._activate(0)),
            "event" === t && this._setupEvents(e),
            void ("heightStyle" === t && this._setupHeightStyle(e)))
        },
        _sanitizeSelector: function(t) {
            return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function() {
            var e = this.options
              , n = this.tablist.children(":has(a[href])");
            e.disabled = t.map(n.filter(".ui-state-disabled"), function(t) {
                return n.index(t)
            }),
            this._processTabs(),
            e.active !== !1 && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1,
            this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1,
            this.active = t()),
            this._refresh()
        },
        _refresh: function() {
            this._setupDisabled(this.options.disabled),
            this._setupEvents(this.options.event),
            this._setupHeightStyle(this.options.heightStyle),
            this.tabs.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }),
            this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-hidden": "true"
            }),
            this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }),
            this._getPanelForTab(this.active).show().attr({
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function() {
            var e = this
              , n = this.tabs
              , i = this.anchors
              , o = this.panels;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function(e) {
                t(this).is(".ui-state-disabled") && e.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                t(this).closest("li").is(".ui-state-disabled") && this.blur()
            }),
            this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }),
            this.anchors = this.tabs.map(function() {
                return t("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }),
            this.panels = t(),
            this.anchors.each(function(n, i) {
                var o, r, s, a = t(i).uniqueId().attr("id"), l = t(i).closest("li"), u = l.attr("aria-controls");
                e._isLocal(i) ? (o = i.hash,
                s = o.substring(1),
                r = e.element.find(e._sanitizeSelector(o))) : (s = l.attr("aria-controls") || t({}).uniqueId()[0].id,
                o = "#" + s,
                r = e.element.find(o),
                r.length || (r = e._createPanel(s),
                r.insertAfter(e.panels[n - 1] || e.tablist)),
                r.attr("aria-live", "polite")),
                r.length && (e.panels = e.panels.add(r)),
                u && l.data("ui-tabs-aria-controls", u),
                l.attr({
                    "aria-controls": s,
                    "aria-labelledby": a
                }),
                r.attr("aria-labelledby", a)
            }),
            this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"),
            n && (this._off(n.not(this.tabs)),
            this._off(i.not(this.anchors)),
            this._off(o.not(this.panels)))
        },
        _getList: function() {
            return this.tablist || this.element.find("ol,ul").eq(0)
        },
        _createPanel: function(e) {
            return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function(e) {
            t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1);
            for (var n, i = 0; n = this.tabs[i]; i++)
                e === !0 || -1 !== t.inArray(i, e) ? t(n).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(n).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = e
        },
        _setupEvents: function(e) {
            var n = {};
            e && t.each(e.split(" "), function(t, e) {
                n[e] = "_eventHandler"
            }),
            this._off(this.anchors.add(this.tabs).add(this.panels)),
            this._on(!0, this.anchors, {
                click: function(t) {
                    t.preventDefault()
                }
            }),
            this._on(this.anchors, n),
            this._on(this.tabs, {
                keydown: "_tabKeydown"
            }),
            this._on(this.panels, {
                keydown: "_panelKeydown"
            }),
            this._focusable(this.tabs),
            this._hoverable(this.tabs)
        },
        _setupHeightStyle: function(e) {
            var n, i = this.element.parent();
            "fill" === e ? (n = i.height(),
            n -= this.element.outerHeight() - this.element.height(),
            this.element.siblings(":visible").each(function() {
                var e = t(this)
                  , i = e.css("position");
                "absolute" !== i && "fixed" !== i && (n -= e.outerHeight(!0))
            }),
            this.element.children().not(this.panels).each(function() {
                n -= t(this).outerHeight(!0)
            }),
            this.panels.each(function() {
                t(this).height(Math.max(0, n - t(this).innerHeight() + t(this).height()))
            }).css("overflow", "auto")) : "auto" === e && (n = 0,
            this.panels.each(function() {
                n = Math.max(n, t(this).height("").height())
            }).height(n))
        },
        _eventHandler: function(e) {
            var n = this.options
              , i = this.active
              , o = t(e.currentTarget)
              , r = o.closest("li")
              , s = r[0] === i[0]
              , a = s && n.collapsible
              , l = a ? t() : this._getPanelForTab(r)
              , u = i.length ? this._getPanelForTab(i) : t()
              , c = {
                oldTab: i,
                oldPanel: u,
                newTab: a ? t() : r,
                newPanel: l
            };
            e.preventDefault(),
            r.hasClass("ui-state-disabled") || r.hasClass("ui-tabs-loading") || this.running || s && !n.collapsible || this._trigger("beforeActivate", e, c) === !1 || (n.active = a ? !1 : this.tabs.index(r),
            this.active = s ? t() : r,
            this.xhr && this.xhr.abort(),
            u.length || l.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."),
            l.length && this.load(this.tabs.index(r), e),
            this._toggle(e, c))
        },
        _toggle: function(e, n) {
            function i() {
                r.running = !1,
                r._trigger("activate", e, n)
            }
            function o() {
                n.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),
                s.length && r.options.show ? r._show(s, r.options.show, i) : (s.show(),
                i())
            }
            var r = this
              , s = n.newPanel
              , a = n.oldPanel;
            this.running = !0,
            a.length && this.options.hide ? this._hide(a, this.options.hide, function() {
                n.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),
                o()
            }) : (n.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),
            a.hide(),
            o()),
            a.attr("aria-hidden", "true"),
            n.oldTab.attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }),
            s.length && a.length ? n.oldTab.attr("tabIndex", -1) : s.length && this.tabs.filter(function() {
                return 0 === t(this).attr("tabIndex")
            }).attr("tabIndex", -1),
            s.attr("aria-hidden", "false"),
            n.newTab.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _activate: function(e) {
            var n, i = this._findActive(e);
            i[0] !== this.active[0] && (i.length || (i = this.active),
            n = i.find(".ui-tabs-anchor")[0],
            this._eventHandler({
                target: n,
                currentTarget: n,
                preventDefault: t.noop
            }))
        },
        _findActive: function(e) {
            return e === !1 ? t() : this.tabs.eq(e)
        },
        _getIndex: function(t) {
            return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))),
            t
        },
        _destroy: function() {
            this.xhr && this.xhr.abort(),
            this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),
            this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),
            this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),
            this.tablist.unbind(this.eventNamespace),
            this.tabs.add(this.panels).each(function() {
                t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            }),
            this.tabs.each(function() {
                var e = t(this)
                  , n = e.data("ui-tabs-aria-controls");
                n ? e.attr("aria-controls", n).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
            }),
            this.panels.show(),
            "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function(e) {
            var n = this.options.disabled;
            n !== !1 && (void 0 === e ? n = !1 : (e = this._getIndex(e),
            n = t.isArray(n) ? t.map(n, function(t) {
                return t !== e ? t : null
            }) : t.map(this.tabs, function(t, n) {
                return n !== e ? n : null
            })),
            this._setupDisabled(n))
        },
        disable: function(e) {
            var n = this.options.disabled;
            if (n !== !0) {
                if (void 0 === e)
                    n = !0;
                else {
                    if (e = this._getIndex(e),
                    -1 !== t.inArray(e, n))
                        return;
                    n = t.isArray(n) ? t.merge([e], n).sort() : [e]
                }
                this._setupDisabled(n)
            }
        },
        load: function(e, n) {
            e = this._getIndex(e);
            var i = this
              , o = this.tabs.eq(e)
              , r = o.find(".ui-tabs-anchor")
              , s = this._getPanelForTab(o)
              , a = {
                tab: o,
                panel: s
            }
              , l = function(t, e) {
                "abort" === e && i.panels.stop(!1, !0),
                o.removeClass("ui-tabs-loading"),
                s.removeAttr("aria-busy"),
                t === i.xhr && delete i.xhr
            };
            this._isLocal(r[0]) || (this.xhr = t.ajax(this._ajaxSettings(r, n, a)),
            this.xhr && "canceled" !== this.xhr.statusText && (o.addClass("ui-tabs-loading"),
            s.attr("aria-busy", "true"),
            this.xhr.done(function(t, e, o) {
                setTimeout(function() {
                    s.html(t),
                    i._trigger("load", n, a),
                    l(o, e)
                }, 1)
            }).fail(function(t, e) {
                setTimeout(function() {
                    l(t, e)
                }, 1)
            })))
        },
        _ajaxSettings: function(e, n, i) {
            var o = this;
            return {
                url: e.attr("href"),
                beforeSend: function(e, r) {
                    return o._trigger("beforeLoad", n, t.extend({
                        jqXHR: e,
                        ajaxSettings: r
                    }, i))
                }
            }
        },
        _getPanelForTab: function(e) {
            var n = t(e).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + n))
        }
    })
}),
/**
 * jquery.Jcrop.js v0.9.12
 * jQuery Image Cropping Plugin - released under MIT License 
 * Author: Kelly Hallman <khallman@gmail.com>
 * http://github.com/tapmodo/Jcrop
 * Copyright (c) 2008-2013 Tapmodo Interactive LLC {{{
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * }}}
 */
function(t) {
    t.Jcrop = function(e, n) {
        function i(t) {
            return Math.round(t) + "px"
        }
        function o(t) {
            return I.baseClass + "-" + t
        }
        function r() {
            return t.fx.step.hasOwnProperty("backgroundColor")
        }
        function s(e) {
            var n = t(e).offset();
            return [n.left, n.top]
        }
        function a(t) {
            return [t.pageX - O[0], t.pageY - O[1]]
        }
        function l(e) {
            "object" != typeof e && (e = {}),
            I = t.extend(I, e),
            t.each(["onChange", "onSelect", "onRelease", "onDblClick"], function(t, e) {
                "function" != typeof I[e] && (I[e] = function() {}
                )
            })
        }
        function u(t, e, n) {
            if (O = s(W),
            ft.setCursor("move" === t ? t : t + "-resize"),
            "move" === t)
                return ft.activateHandlers(d(e), m, n);
            var i = dt.getFixed()
              , o = h(t)
              , r = dt.getCorner(h(o));
            dt.setPressed(dt.getCorner(o)),
            dt.setCurrent(r),
            ft.activateHandlers(c(t, i), m, n)
        }
        function c(t, e) {
            return function(n) {
                if (I.aspectRatio)
                    switch (t) {
                    case "e":
                        n[1] = e.y + 1;
                        break;
                    case "w":
                        n[1] = e.y + 1;
                        break;
                    case "n":
                        n[0] = e.x + 1;
                        break;
                    case "s":
                        n[0] = e.x + 1
                    }
                else
                    switch (t) {
                    case "e":
                        n[1] = e.y2;
                        break;
                    case "w":
                        n[1] = e.y2;
                        break;
                    case "n":
                        n[0] = e.x2;
                        break;
                    case "s":
                        n[0] = e.x2
                    }
                dt.setCurrent(n),
                pt.update()
            }
        }
        function d(t) {
            var e = t;
            return gt.watchKeys(),
            function(t) {
                dt.moveOffset([t[0] - e[0], t[1] - e[1]]),
                e = t,
                pt.update()
            }
        }
        function h(t) {
            switch (t) {
            case "n":
                return "sw";
            case "s":
                return "nw";
            case "e":
                return "nw";
            case "w":
                return "ne";
            case "ne":
                return "sw";
            case "nw":
                return "se";
            case "se":
                return "nw";
            case "sw":
                return "ne"
            }
        }
        function p(t) {
            return function(e) {
                return I.disabled ? !1 : "move" !== t || I.allowMove ? (O = s(W),
                it = !0,
                u(t, a(e)),
                e.stopPropagation(),
                e.preventDefault(),
                !1) : !1
            }
        }
        function f(t, e, n) {
            var i = t.width()
              , o = t.height();
            i > e && e > 0 && (i = e,
            o = e / t.width() * t.height()),
            o > n && n > 0 && (o = n,
            i = n / t.height() * t.width()),
            et = t.width() / i,
            nt = t.height() / o,
            t.width(i).height(o)
        }
        function g(t) {
            return {
                x: t.x * et,
                y: t.y * nt,
                x2: t.x2 * et,
                y2: t.y2 * nt,
                w: t.w * et,
                h: t.h * nt
            }
        }
        function m(t) {
            var e = dt.getFixed();
            e.w > I.minSelect[0] && e.h > I.minSelect[1] ? (pt.enableHandles(),
            pt.done()) : pt.release(),
            ft.setCursor(I.allowSelect ? "crosshair" : "default")
        }
        function v(t) {
            if (I.disabled)
                return !1;
            if (!I.allowSelect)
                return !1;
            it = !0,
            O = s(W),
            pt.disableHandles(),
            ft.setCursor("crosshair");
            var e = a(t);
            return dt.setPressed(e),
            pt.update(),
            ft.activateHandlers(b, m, "touch" === t.type.substring(0, 5)),
            gt.watchKeys(),
            t.stopPropagation(),
            t.preventDefault(),
            !1
        }
        function b(t) {
            dt.setCurrent(t),
            pt.update()
        }
        function y() {
            var e = t("<div></div>").addClass(o("tracker"));
            return L && e.css({
                opacity: 0,
                backgroundColor: "white"
            }),
            e
        }
        function w(t) {
            X.removeClass().addClass(o("holder")).addClass(t)
        }
        function x(t, e) {
            function n() {
                window.setTimeout(b, d)
            }
            var i = t[0] / et
              , o = t[1] / nt
              , r = t[2] / et
              , s = t[3] / nt;
            if (!ot) {
                var a = dt.flipCoords(i, o, r, s)
                  , l = dt.getFixed()
                  , u = [l.x, l.y, l.x2, l.y2]
                  , c = u
                  , d = I.animationDelay
                  , h = a[0] - u[0]
                  , p = a[1] - u[1]
                  , f = a[2] - u[2]
                  , g = a[3] - u[3]
                  , m = 0
                  , v = I.swingSpeed;
                i = c[0],
                o = c[1],
                r = c[2],
                s = c[3],
                pt.animMode(!0);
                var b = function() {
                    return function() {
                        m += (100 - m) / v,
                        c[0] = Math.round(i + m / 100 * h),
                        c[1] = Math.round(o + m / 100 * p),
                        c[2] = Math.round(r + m / 100 * f),
                        c[3] = Math.round(s + m / 100 * g),
                        m >= 99.8 && (m = 100),
                        100 > m ? (C(c),
                        n()) : (pt.done(),
                        pt.animMode(!1),
                        "function" == typeof e && e.call(mt))
                    }
                }();
                n()
            }
        }
        function _(t) {
            C([t[0] / et, t[1] / nt, t[2] / et, t[3] / nt]),
            I.onSelect.call(mt, g(dt.getFixed())),
            pt.enableHandles()
        }
        function C(t) {
            dt.setPressed([t[0], t[1]]),
            dt.setCurrent([t[2], t[3]]),
            pt.update()
        }
        function $() {
            return g(dt.getFixed())
        }
        function T() {
            return dt.getFixed()
        }
        function k(t) {
            l(t),
            j()
        }
        function E() {
            I.disabled = !0,
            pt.disableHandles(),
            pt.setCursor("default"),
            ft.setCursor("default")
        }
        function S() {
            I.disabled = !1,
            j()
        }
        function N() {
            pt.done(),
            ft.activateHandlers(null, null)
        }
        function A() {
            X.remove(),
            F.show(),
            F.css("visibility", "visible"),
            t(e).removeData("Jcrop")
        }
        function D(t, e) {
            pt.release(),
            E();
            var n = new Image;
            n.onload = function() {
                var i = n.width
                  , o = n.height
                  , r = I.boxWidth
                  , s = I.boxHeight;
                W.width(i).height(o),
                W.attr("src", t),
                V.attr("src", t),
                f(W, r, s),
                B = W.width(),
                U = W.height(),
                V.width(B).height(U),
                at.width(B + 2 * st).height(U + 2 * st),
                X.width(B).height(U),
                ht.resize(B, U),
                S(),
                "function" == typeof e && e.call(mt)
            }
            ,
            n.src = t
        }
        function P(t, e, n) {
            var i = e || I.bgColor;
            I.bgFade && r() && I.fadeTime && !n ? t.animate({
                backgroundColor: i
            }, {
                queue: !1,
                duration: I.fadeTime
            }) : t.css("backgroundColor", i)
        }
        function j(t) {
            I.allowResize ? t ? pt.enableOnly() : pt.enableHandles() : pt.disableHandles(),
            ft.setCursor(I.allowSelect ? "crosshair" : "default"),
            pt.setCursor(I.allowMove ? "move" : "default"),
            I.hasOwnProperty("trueSize") && (et = I.trueSize[0] / B,
            nt = I.trueSize[1] / U),
            I.hasOwnProperty("setSelect") && (_(I.setSelect),
            pt.done(),
            delete I.setSelect),
            ht.refresh(),
            I.bgColor != lt && (P(I.shade ? ht.getShades() : X, I.shade ? I.shadeColor || I.bgColor : I.bgColor),
            lt = I.bgColor),
            ut != I.bgOpacity && (ut = I.bgOpacity,
            I.shade ? ht.refresh() : pt.setBgOpacity(ut)),
            Q = I.maxSize[0] || 0,
            K = I.maxSize[1] || 0,
            Z = I.minSize[0] || 0,
            tt = I.minSize[1] || 0,
            I.hasOwnProperty("outerImage") && (W.attr("src", I.outerImage),
            delete I.outerImage),
            pt.refresh()
        }
        var O, I = t.extend({}, t.Jcrop.defaults), H = navigator.userAgent.toLowerCase(), L = /msie/.test(H), M = /msie [1-6]\./.test(H);
        "object" != typeof e && (e = t(e)[0]),
        "object" != typeof n && (n = {}),
        l(n);
        var R = {
            border: "none",
            visibility: "visible",
            margin: 0,
            padding: 0,
            position: "absolute",
            top: 0,
            left: 0
        }
          , F = t(e)
          , q = !0;
        if ("IMG" == e.tagName) {
            if (0 != F[0].width && 0 != F[0].height)
                F.width(F[0].width),
                F.height(F[0].height);
            else {
                var z = new Image;
                z.src = F[0].src,
                F.width(z.width),
                F.height(z.height)
            }
            var W = F.clone().removeAttr("id").css(R).show();
            W.width(F.width()),
            W.height(F.height()),
            F.after(W).hide()
        } else
            W = F.css(R).show(),
            q = !1,
            null === I.shade && (I.shade = !0);
        f(W, I.boxWidth, I.boxHeight);
        var B = W.width()
          , U = W.height()
          , X = t("<div />").width(B).height(U).addClass(o("holder")).css({
            position: "relative",
            backgroundColor: I.bgColor
        }).insertAfter(F).append(W);
        I.addClass && X.addClass(I.addClass);
        var V = t("<div />")
          , Y = t("<div />").width("100%").height("100%").css({
            zIndex: 310,
            position: "absolute",
            overflow: "hidden"
        })
          , G = t("<div />").width("100%").height("100%").css("zIndex", 320)
          , J = t("<div />").css({
            position: "absolute",
            zIndex: 600
        }).dblclick(function() {
            var t = dt.getFixed();
            I.onDblClick.call(mt, t)
        }).insertBefore(W).append(Y, G);
        q && (V = t("<img />").attr("src", W.attr("src")).css(R).width(B).height(U),
        Y.append(V)),
        M && J.css({
            overflowY: "hidden"
        });
        var Q, K, Z, tt, et, nt, it, ot, rt, st = I.boundary, at = y().width(B + 2 * st).height(U + 2 * st).css({
            position: "absolute",
            top: i(-st),
            left: i(-st),
            zIndex: 290
        }).mousedown(v), lt = I.bgColor, ut = I.bgOpacity;
        O = s(W);
        var ct = function() {
            function t() {
                var t, e = {}, n = ["touchstart", "touchmove", "touchend"], i = document.createElement("div");
                try {
                    for (t = 0; t < n.length; t++) {
                        var o = n[t];
                        o = "on" + o;
                        var r = o in i;
                        r || (i.setAttribute(o, "return;"),
                        r = "function" == typeof i[o]),
                        e[n[t]] = r
                    }
                    return e.touchstart && e.touchend && e.touchmove
                } catch (s) {
                    return !1
                }
            }
            function e() {
                return I.touchSupport === !0 || I.touchSupport === !1 ? I.touchSupport : t()
            }
            return {
                createDragger: function(t) {
                    return function(e) {
                        return I.disabled ? !1 : "move" !== t || I.allowMove ? (O = s(W),
                        it = !0,
                        u(t, a(ct.cfilter(e)), !0),
                        e.stopPropagation(),
                        e.preventDefault(),
                        !1) : !1
                    }
                },
                newSelection: function(t) {
                    return v(ct.cfilter(t))
                },
                cfilter: function(t) {
                    return t.pageX = t.originalEvent.changedTouches[0].pageX,
                    t.pageY = t.originalEvent.changedTouches[0].pageY,
                    t
                },
                isSupported: t,
                support: e()
            }
        }()
          , dt = function() {
            function t(t) {
                t = s(t),
                f = h = t[0],
                g = p = t[1]
            }
            function e(t) {
                t = s(t),
                c = t[0] - f,
                d = t[1] - g,
                f = t[0],
                g = t[1]
            }
            function n() {
                return [c, d]
            }
            function i(t) {
                var e = t[0]
                  , n = t[1];
                0 > h + e && (e -= e + h),
                0 > p + n && (n -= n + p),
                g + n > U && (n += U - (g + n)),
                f + e > B && (e += B - (f + e)),
                h += e,
                f += e,
                p += n,
                g += n
            }
            function o(t) {
                var e = r();
                switch (t) {
                case "ne":
                    return [e.x2, e.y];
                case "nw":
                    return [e.x, e.y];
                case "se":
                    return [e.x2, e.y2];
                case "sw":
                    return [e.x, e.y2]
                }
            }
            function r() {
                if (!I.aspectRatio)
                    return l();
                var t, e, n, i, o = I.aspectRatio, r = I.minSize[0] / et, s = I.maxSize[0] / et, c = I.maxSize[1] / nt, d = f - h, m = g - p, v = Math.abs(d), b = Math.abs(m), y = v / b;
                return 0 === s && (s = 10 * B),
                0 === c && (c = 10 * U),
                o > y ? (e = g,
                n = b * o,
                t = 0 > d ? h - n : n + h,
                0 > t ? (t = 0,
                i = Math.abs((t - h) / o),
                e = 0 > m ? p - i : i + p) : t > B && (t = B,
                i = Math.abs((t - h) / o),
                e = 0 > m ? p - i : i + p)) : (t = f,
                i = v / o,
                e = 0 > m ? p - i : p + i,
                0 > e ? (e = 0,
                n = Math.abs((e - p) * o),
                t = 0 > d ? h - n : n + h) : e > U && (e = U,
                n = Math.abs(e - p) * o,
                t = 0 > d ? h - n : n + h)),
                t > h ? (r > t - h ? t = h + r : t - h > s && (t = h + s),
                e = e > p ? p + (t - h) / o : p - (t - h) / o) : h > t && (r > h - t ? t = h - r : h - t > s && (t = h - s),
                e = e > p ? p + (h - t) / o : p - (h - t) / o),
                0 > t ? (h -= t,
                t = 0) : t > B && (h -= t - B,
                t = B),
                0 > e ? (p -= e,
                e = 0) : e > U && (p -= e - U,
                e = U),
                u(a(h, p, t, e))
            }
            function s(t) {
                return t[0] < 0 && (t[0] = 0),
                t[1] < 0 && (t[1] = 0),
                t[0] > B && (t[0] = B),
                t[1] > U && (t[1] = U),
                [Math.round(t[0]), Math.round(t[1])]
            }
            function a(t, e, n, i) {
                var o = t
                  , r = n
                  , s = e
                  , a = i;
                return t > n && (o = n,
                r = t),
                e > i && (s = i,
                a = e),
                [o, s, r, a]
            }
            function l() {
                var t, e = f - h, n = g - p;
                return Q && Math.abs(e) > Q && (f = e > 0 ? h + Q : h - Q),
                K && Math.abs(n) > K && (g = n > 0 ? p + K : p - K),
                tt / nt && Math.abs(n) < tt / nt && (g = n > 0 ? p + tt / nt : p - tt / nt),
                Z / et && Math.abs(e) < Z / et && (f = e > 0 ? h + Z / et : h - Z / et),
                0 > h && (f -= h,
                h -= h),
                0 > p && (g -= p,
                p -= p),
                0 > f && (h -= f,
                f -= f),
                0 > g && (p -= g,
                g -= g),
                f > B && (t = f - B,
                h -= t,
                f -= t),
                g > U && (t = g - U,
                p -= t,
                g -= t),
                h > B && (t = h - U,
                g -= t,
                p -= t),
                p > U && (t = p - U,
                g -= t,
                p -= t),
                u(a(h, p, f, g))
            }
            function u(t) {
                return {
                    x: t[0],
                    y: t[1],
                    x2: t[2],
                    y2: t[3],
                    w: t[2] - t[0],
                    h: t[3] - t[1]
                }
            }
            var c, d, h = 0, p = 0, f = 0, g = 0;
            return {
                flipCoords: a,
                setPressed: t,
                setCurrent: e,
                getOffset: n,
                moveOffset: i,
                getCorner: o,
                getFixed: r
            }
        }()
          , ht = function() {
            function e(t, e) {
                f.left.css({
                    height: i(e)
                }),
                f.right.css({
                    height: i(e)
                })
            }
            function n() {
                return o(dt.getFixed())
            }
            function o(t) {
                f.top.css({
                    left: i(t.x),
                    width: i(t.w),
                    height: i(t.y)
                }),
                f.bottom.css({
                    top: i(t.y2),
                    left: i(t.x),
                    width: i(t.w),
                    height: i(U - t.y2)
                }),
                f.right.css({
                    left: i(t.x2),
                    width: i(B - t.x2)
                }),
                f.left.css({
                    width: i(t.x)
                })
            }
            function r() {
                return t("<div />").css({
                    position: "absolute",
                    backgroundColor: I.shadeColor || I.bgColor
                }).appendTo(p)
            }
            function s() {
                h || (h = !0,
                p.insertBefore(W),
                n(),
                pt.setBgOpacity(1, 0, 1),
                V.hide(),
                a(I.shadeColor || I.bgColor, 1),
                pt.isAwake() ? u(I.bgOpacity, 1) : u(1, 1))
            }
            function a(t, e) {
                P(d(), t, e)
            }
            function l() {
                h && (p.remove(),
                V.show(),
                h = !1,
                pt.isAwake() ? pt.setBgOpacity(I.bgOpacity, 1, 1) : (pt.setBgOpacity(1, 1, 1),
                pt.disableHandles()),
                P(X, 0, 1))
            }
            function u(t, e) {
                h && (I.bgFade && !e ? p.animate({
                    opacity: 1 - t
                }, {
                    queue: !1,
                    duration: I.fadeTime
                }) : p.css({
                    opacity: 1 - t
                }))
            }
            function c() {
                I.shade ? s() : l(),
                pt.isAwake() && u(I.bgOpacity)
            }
            function d() {
                return p.children()
            }
            var h = !1
              , p = t("<div />").css({
                position: "absolute",
                zIndex: 240,
                opacity: 0
            })
              , f = {
                top: r(),
                left: r().height(U),
                right: r().height(U),
                bottom: r()
            };
            return {
                update: n,
                updateRaw: o,
                getShades: d,
                setBgColor: a,
                enable: s,
                disable: l,
                resize: e,
                refresh: c,
                opacity: u
            }
        }()
          , pt = function() {
            function e(e) {
                var n = t("<div />").css({
                    position: "absolute",
                    opacity: I.borderOpacity
                }).addClass(o(e));
                return Y.append(n),
                n
            }
            function n(e, n) {
                var i = t("<div />").mousedown(p(e)).css({
                    cursor: e + "-resize",
                    position: "absolute",
                    zIndex: n
                }).addClass("ord-" + e);
                return ct.support && i.bind("touchstart.jcrop", ct.createDragger(e)),
                G.append(i),
                i
            }
            function r(t) {
                var e = I.handleSize
                  , i = n(t, E++).css({
                    opacity: I.handleOpacity
                }).addClass(o("handle"));
                return e && i.width(e).height(e),
                i
            }
            function s(t) {
                return n(t, E++).addClass("jcrop-dragbar")
            }
            function a(t) {
                var e;
                for (e = 0; e < t.length; e++)
                    A[t[e]] = s(t[e])
            }
            function l(t) {
                var n, i;
                for (i = 0; i < t.length; i++) {
                    switch (t[i]) {
                    case "n":
                        n = "hline";
                        break;
                    case "s":
                        n = "hline bottom";
                        break;
                    case "e":
                        n = "vline right";
                        break;
                    case "w":
                        n = "vline"
                    }
                    S[t[i]] = e(n)
                }
            }
            function u(t) {
                var e;
                for (e = 0; e < t.length; e++)
                    N[t[e]] = r(t[e])
            }
            function c(t, e) {
                I.shade || V.css({
                    top: i(-e),
                    left: i(-t)
                }),
                J.css({
                    top: i(e),
                    left: i(t)
                })
            }
            function d(t, e) {
                J.width(Math.round(t)).height(Math.round(e))
            }
            function h() {
                var t = dt.getFixed();
                dt.setPressed([t.x, t.y]),
                dt.setCurrent([t.x2, t.y2]),
                f()
            }
            function f(t) {
                return k ? m(t) : void 0
            }
            function m(t) {
                var e = dt.getFixed();
                d(e.w, e.h),
                c(e.x, e.y),
                I.shade && ht.updateRaw(e),
                k || b(),
                t ? I.onSelect.call(mt, g(e)) : I.onChange.call(mt, g(e))
            }
            function v(t, e, n) {
                (k || e) && (I.bgFade && !n ? W.animate({
                    opacity: t
                }, {
                    queue: !1,
                    duration: I.fadeTime
                }) : W.css("opacity", t))
            }
            function b() {
                J.show(),
                I.shade ? ht.opacity(ut) : v(ut, !0),
                k = !0
            }
            function w() {
                C(),
                J.hide(),
                I.shade ? ht.opacity(1) : v(1),
                k = !1,
                I.onRelease.call(mt)
            }
            function x() {
                D && G.show()
            }
            function _() {
                return D = !0,
                I.allowResize ? (G.show(),
                !0) : void 0
            }
            function C() {
                D = !1,
                G.hide()
            }
            function $(t) {
                t ? (ot = !0,
                C()) : (ot = !1,
                _())
            }
            function T() {
                $(!1),
                h()
            }
            var k, E = 370, S = {}, N = {}, A = {}, D = !1;
            I.dragEdges && t.isArray(I.createDragbars) && a(I.createDragbars),
            t.isArray(I.createHandles) && u(I.createHandles),
            I.drawBorders && t.isArray(I.createBorders) && l(I.createBorders),
            t(document).bind("touchstart.jcrop-ios", function(e) {
                t(e.currentTarget).hasClass("jcrop-tracker") && e.stopPropagation()
            });
            var P = y().mousedown(p("move")).css({
                cursor: "move",
                position: "absolute",
                zIndex: 360
            });
            return ct.support && P.bind("touchstart.jcrop", ct.createDragger("move")),
            Y.append(P),
            C(),
            {
                updateVisible: f,
                update: m,
                release: w,
                refresh: h,
                isAwake: function() {
                    return k
                },
                setCursor: function(t) {
                    P.css("cursor", t)
                },
                enableHandles: _,
                enableOnly: function() {
                    D = !0
                },
                showHandles: x,
                disableHandles: C,
                animMode: $,
                setBgOpacity: v,
                done: T
            }
        }()
          , ft = function() {
            function e(e) {
                at.css({
                    zIndex: 450
                }),
                e ? t(document).bind("touchmove.jcrop", s).bind("touchend.jcrop", l) : h && t(document).bind("mousemove.jcrop", i).bind("mouseup.jcrop", o)
            }
            function n() {
                at.css({
                    zIndex: 290
                }),
                t(document).unbind(".jcrop")
            }
            function i(t) {
                return c(a(t)),
                !1
            }
            function o(t) {
                return t.preventDefault(),
                t.stopPropagation(),
                it && (it = !1,
                d(a(t)),
                pt.isAwake() && I.onSelect.call(mt, g(dt.getFixed())),
                n(),
                c = function() {}
                ,
                d = function() {}
                ),
                !1
            }
            function r(t, n, i) {
                return it = !0,
                c = t,
                d = n,
                e(i),
                !1
            }
            function s(t) {
                return c(a(ct.cfilter(t))),
                !1
            }
            function l(t) {
                return o(ct.cfilter(t))
            }
            function u(t) {
                at.css("cursor", t)
            }
            var c = function() {}
              , d = function() {}
              , h = I.trackDocument;
            return h || at.mousemove(i).mouseup(o).mouseout(o),
            W.before(at),
            {
                activateHandlers: r,
                setCursor: u
            }
        }()
          , gt = function() {
            function e() {
                I.keySupport && (r.show(),
                r.focus())
            }
            function n(t) {
                r.hide()
            }
            function i(t, e, n) {
                I.allowMove && (dt.moveOffset([e, n]),
                pt.updateVisible(!0)),
                t.preventDefault(),
                t.stopPropagation()
            }
            function o(t) {
                if (t.ctrlKey || t.metaKey)
                    return !0;
                rt = t.shiftKey ? !0 : !1;
                var e = rt ? 10 : 1;
                switch (t.keyCode) {
                case 37:
                    i(t, -e, 0);
                    break;
                case 39:
                    i(t, e, 0);
                    break;
                case 38:
                    i(t, 0, -e);
                    break;
                case 40:
                    i(t, 0, e);
                    break;
                case 27:
                    I.allowSelect && pt.release();
                    break;
                case 9:
                    return !0
                }
                return !1
            }
            var r = t('<input type="radio" />').css({
                position: "fixed",
                left: "-120px",
                width: "12px"
            }).addClass("jcrop-keymgr")
              , s = t("<div />").css({
                position: "absolute",
                overflow: "hidden"
            }).append(r);
            return I.keySupport && (r.keydown(o).blur(n),
            M || !I.fixedSupport ? (r.css({
                position: "absolute",
                left: "-20px"
            }),
            s.append(r).insertBefore(W)) : r.insertBefore(W)),
            {
                watchKeys: e
            }
        }();
        ct.support && at.bind("touchstart.jcrop", ct.newSelection),
        G.hide(),
        j(!0);
        var mt = {
            setImage: D,
            animateTo: x,
            setSelect: _,
            setOptions: k,
            tellSelect: $,
            tellScaled: T,
            setClass: w,
            disable: E,
            enable: S,
            cancel: N,
            release: pt.release,
            destroy: A,
            focus: gt.watchKeys,
            getBounds: function() {
                return [B * et, U * nt]
            },
            getWidgetSize: function() {
                return [B, U]
            },
            getScaleFactor: function() {
                return [et, nt]
            },
            getOptions: function() {
                return I
            },
            ui: {
                holder: X,
                selection: J
            }
        };
        return L && X.bind("selectstart", function() {
            return !1
        }),
        F.data("Jcrop", mt),
        mt
    }
    ,
    t.fn.Jcrop = function(e, n) {
        var i;
        return this.each(function() {
            if (t(this).data("Jcrop")) {
                if ("api" === e)
                    return t(this).data("Jcrop");
                t(this).data("Jcrop").setOptions(e)
            } else
                "IMG" == this.tagName ? t.Jcrop.Loader(this, function() {
                    t(this).css({
                        display: "block",
                        visibility: "hidden"
                    }),
                    i = t.Jcrop(this, e),
                    t.isFunction(n) && n.call(i)
                }) : (t(this).css({
                    display: "block",
                    visibility: "hidden"
                }),
                i = t.Jcrop(this, e),
                t.isFunction(n) && n.call(i))
        }),
        this
    }
    ,
    t.Jcrop.Loader = function(e, n, i) {
        function o() {
            s.complete ? (r.unbind(".jcloader"),
            t.isFunction(n) && n.call(s)) : window.setTimeout(o, 50)
        }
        var r = t(e)
          , s = r[0];
        r.bind("load.jcloader", o).bind("error.jcloader", function(e) {
            r.unbind(".jcloader"),
            t.isFunction(i) && i.call(s)
        }),
        s.complete && t.isFunction(n) && (r.unbind(".jcloader"),
        n.call(s))
    }
    ,
    t.Jcrop.defaults = {
        allowSelect: !0,
        allowMove: !0,
        allowResize: !0,
        trackDocument: !0,
        baseClass: "jcrop",
        addClass: null,
        bgColor: "black",
        bgOpacity: .6,
        bgFade: !1,
        borderOpacity: .4,
        handleOpacity: .5,
        handleSize: null,
        aspectRatio: 0,
        keySupport: !0,
        createHandles: ["n", "s", "e", "w", "nw", "ne", "se", "sw"],
        createDragbars: ["n", "s", "e", "w"],
        createBorders: ["n", "s", "e", "w"],
        drawBorders: !0,
        dragEdges: !0,
        fixedSupport: !0,
        touchSupport: null,
        shade: null,
        boxWidth: 0,
        boxHeight: 0,
        boundary: 2,
        fadeTime: 400,
        animationDelay: 20,
        swingSpeed: 3,
        minSelect: [0, 0],
        maxSize: [0, 0],
        minSize: [0, 0],
        onChange: function() {},
        onSelect: function() {},
        onDblClick: function() {},
        onRelease: function() {}
    }
}(jQuery),
function() {
    var t, e, n, i, o, r, s, a, l, u, c, d, h, p, f, g, m, v, b, y, w, x, _, C, $, T, k, E, S, N, A, D, P, j, O, I, H, L, M, R, F, q, z, W, B, U, X, V, Y, G, J, Q, K, Z, tt, et, nt = [].indexOf || function(t) {
        for (var e = 0, n = this.length; n > e; e++)
            if (e in this && this[e] === t)
                return e;
        return -1
    }
    , it = function(t, e) {
        function n() {
            this.constructor = t
        }
        for (var i in e)
            ot.call(e, i) && (t[i] = e[i]);
        return n.prototype = e.prototype,
        t.prototype = new n,
        t.__super__ = e.prototype,
        t
    }, ot = {}.hasOwnProperty, rt = [].slice, st = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    };
    j = {},
    h = 10,
    Q = !1,
    M = null,
    b = null,
    D = null,
    q = null,
    et = null,
    i = {
        BEFORE_CHANGE: "page:before-change",
        FETCH: "page:fetch",
        RECEIVE: "page:receive",
        CHANGE: "page:change",
        UPDATE: "page:update",
        LOAD: "page:load",
        RESTORE: "page:restore",
        BEFORE_UNLOAD: "page:before-unload",
        EXPIRE: "page:expire"
    },
    C = function(t) {
        var e;
        return t = new n(t),
        X(),
        d(),
        null != M && M.start(),
        Q && (e = K(t.absolute)) ? ($(e),
        T(t, null, !1)) : T(t, G)
    }
    ,
    K = function(t) {
        var e;
        return e = j[t],
        e && !e.transitionCacheDisabled ? e : void 0
    }
    ,
    w = function(t) {
        return null == t && (t = !0),
        Q = t
    }
    ,
    y = function(t) {
        return null == t && (t = !0),
        u ? t ? null != M ? M : M = new r("html") : (null != M && M.uninstall(),
        M = null) : void 0
    }
    ,
    T = function(t, e, n) {
        return null == n && (n = !0),
        Z(i.FETCH, {
            url: t.absolute
        }),
        null != et && et.abort(),
        et = new XMLHttpRequest,
        et.open("GET", t.withoutHashForIE10compatibility(), !0),
        et.setRequestHeader("Accept", "text/html, application/xhtml+xml, application/xml"),
        et.setRequestHeader("X-XHR-Referer", q),
        et.onload = function() {
            var n;
            return Z(i.RECEIVE, {
                url: t.absolute
            }),
            (n = L()) ? (z(t),
            W(),
            p.apply(null, _(n)),
            P(),
            "function" == typeof e && e(),
            Z(i.LOAD)) : document.location.href = v() || t.absolute
        }
        ,
        M && n && (et.onprogress = function(t) {
            return function(t) {
                var e;
                return e = t.lengthComputable ? t.loaded / t.total * 100 : M.value + (100 - M.value) / 10,
                M.advanceTo(e)
            }
        }(this)),
        et.onloadend = function() {
            return et = null
        }
        ,
        et.onerror = function() {
            return document.location.href = t.absolute
        }
        ,
        et.send()
    }
    ,
    $ = function(t) {
        return null != et && et.abort(),
        p(t.title, t.body),
        R(t),
        Z(i.RESTORE)
    }
    ,
    d = function() {
        var t;
        return t = new n(b.url),
        j[t.absolute] = {
            url: t.relative,
            body: document.body,
            title: document.title,
            positionY: window.pageYOffset,
            positionX: window.pageXOffset,
            cachedAt: (new Date).getTime(),
            transitionCacheDisabled: null != document.querySelector("[data-no-transition-cache]")
        },
        g(h)
    }
    ,
    I = function(t) {
        return null == t && (t = h),
        /^[\d]+$/.test(t) ? h = parseInt(t) : void 0
    }
    ,
    g = function(t) {
        var e, n, o, r, s, a;
        for (s = Object.keys(j),
        e = s.map(function(t) {
            return j[t].cachedAt
        }).sort(function(t, e) {
            return e - t
        }),
        a = [],
        n = 0,
        r = s.length; r > n; n++)
            o = s[n],
            j[o].cachedAt <= e[t] && (Z(i.EXPIRE, j[o]),
            a.push(delete j[o]));
        return a
    }
    ,
    p = function(e, n, o, r) {
        return Z(i.BEFORE_UNLOAD),
        document.title = e,
        document.documentElement.replaceChild(n, document.body),
        null != o && t.update(o),
        J(),
        r && x(),
        b = window.history.state,
        null != M && M.done(),
        Z(i.CHANGE),
        Z(i.UPDATE)
    }
    ,
    x = function() {
        var t, e, n, i, o, r, s, a, l, u, c, d;
        for (d = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])')),
        n = 0,
        o = d.length; o > n; n++)
            if (c = d[n],
            "" === (l = c.type) || "text/javascript" === l) {
                for (e = document.createElement("script"),
                u = c.attributes,
                i = 0,
                r = u.length; r > i; i++)
                    t = u[i],
                    e.setAttribute(t.name, t.value);
                c.hasAttribute("async") || (e.async = !1),
                e.appendChild(document.createTextNode(c.innerHTML)),
                a = c.parentNode,
                s = c.nextSibling,
                a.removeChild(c),
                a.insertBefore(e, s)
            }
    }
    ,
    V = function(t) {
        return t.innerHTML = t.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/gi, ""),
        t
    }
    ,
    J = function() {
        var t, e;
        return t = (e = document.querySelectorAll("input[autofocus], textarea[autofocus]"))[e.length - 1],
        t && document.activeElement !== t ? t.focus() : void 0
    }
    ,
    z = function(t) {
        return (t = new n(t)).absolute !== q ? window.history.pushState({
            turbolinks: !0,
            url: t.absolute
        }, "", t.absolute) : void 0
    }
    ,
    W = function() {
        var t, e;
        return (t = et.getResponseHeader("X-XHR-Redirected-To")) ? (t = new n(t),
        e = t.hasNoHash() ? document.location.hash : "",
        window.history.replaceState(window.history.state, "", t.href + e)) : void 0
    }
    ,
    v = function() {
        var t;
        return null != (t = et.getResponseHeader("Location")) && new n(t).crossOrigin() ? t : void 0
    }
    ,
    X = function() {
        return q = document.location.href
    }
    ,
    U = function() {
        return window.history.replaceState({
            turbolinks: !0,
            url: document.location.href
        }, "", document.location.href)
    }
    ,
    B = function() {
        return b = window.history.state
    }
    ,
    P = function() {
        var t;
        return navigator.userAgent.match(/Firefox/) && !(t = new n).hasNoHash() ? (window.history.replaceState(b, "", t.withoutHash()),
        document.location.hash = t.hash) : void 0
    }
    ,
    R = function(t) {
        return window.scrollTo(t.positionX, t.positionY)
    }
    ,
    G = function() {
        return document.location.hash ? document.location.href = document.location.href : window.scrollTo(0, 0)
    }
    ,
    f = function(t) {
        var e, n, i;
        if (null == t || "object" != typeof t)
            return t;
        e = new t.constructor;
        for (n in t)
            i = t[n],
            e[n] = f(i);
        return e
    }
    ,
    H = function(t) {
        var e, n;
        return n = (null != (e = document.cookie.match(new RegExp(t + "=(\\w+)"))) ? e[1].toUpperCase() : void 0) || "",
        document.cookie = t + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/",
        n
    }
    ,
    Z = function(t, e) {
        var n;
        return "undefined" != typeof Prototype && Event.fire(document, t, e, !0),
        n = document.createEvent("Events"),
        e && (n.data = e),
        n.initEvent(t, !0, !0),
        document.dispatchEvent(n)
    }
    ,
    O = function(t) {
        return !Z(i.BEFORE_CHANGE, {
            url: t
        })
    }
    ,
    L = function() {
        var t, e, n, i, o, r;
        return e = function() {
            var t;
            return 400 <= (t = et.status) && 600 > t
        }
        ,
        r = function() {
            var t;
            return null != (t = et.getResponseHeader("Content-Type")) && t.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/)
        }
        ,
        i = function(t) {
            var e, n, i, o, r;
            for (o = t.querySelector("head").childNodes,
            r = [],
            e = 0,
            n = o.length; n > e; e++)
                i = o[e],
                null != ("function" == typeof i.getAttribute ? i.getAttribute("data-turbolinks-track") : void 0) && r.push(i.getAttribute("src") || i.getAttribute("href"));
            return r
        }
        ,
        t = function(t) {
            var e;
            return D || (D = i(document)),
            e = i(t),
            e.length !== D.length || o(e, D).length !== D.length
        }
        ,
        o = function(t, e) {
            var n, i, o, r, s;
            for (t.length > e.length && (o = [e, t],
            t = o[0],
            e = o[1]),
            r = [],
            n = 0,
            i = t.length; i > n; n++)
                s = t[n],
                nt.call(e, s) >= 0 && r.push(s);
            return r
        }
        ,
        !e() && r() && (n = m(et.responseText),
        n && !t(n)) ? n : void 0
    }
    ,
    _ = function(e) {
        var n;
        return n = e.querySelector("title"),
        [null != n ? n.textContent : void 0, V(e.querySelector("body")), t.get(e).token, "runScripts"]
    }
    ,
    t = {
        get: function(t) {
            var e;
            return null == t && (t = document),
            {
                node: e = t.querySelector('meta[name="csrf-token"]'),
                token: null != e && "function" == typeof e.getAttribute ? e.getAttribute("content") : void 0
            }
        },
        update: function(t) {
            var e;
            return e = this.get(),
            null != e.token && null != t && e.token !== t ? e.node.setAttribute("content", t) : void 0
        }
    },
    m = function(t) {
        var e;
        return e = document.documentElement.cloneNode(),
        e.innerHTML = t,
        e.head = e.querySelector("head"),
        e.body = e.querySelector("body"),
        e
    }
    ,
    n = function() {
        function t(e) {
            return this.original = null != e ? e : document.location.href,
            this.original.constructor === t ? this.original : void this._parse()
        }
        return t.prototype.withoutHash = function() {
            return this.href.replace(this.hash, "").replace("#", "")
        }
        ,
        t.prototype.withoutHashForIE10compatibility = function() {
            return this.withoutHash()
        }
        ,
        t.prototype.hasNoHash = function() {
            return 0 === this.hash.length
        }
        ,
        t.prototype.crossOrigin = function() {
            return this.origin !== (new t).origin
        }
        ,
        t.prototype._parse = function() {
            var t;
            return (null != this.link ? this.link : this.link = document.createElement("a")).href = this.original,
            t = this.link,
            this.href = t.href,
            this.protocol = t.protocol,
            this.host = t.host,
            this.hostname = t.hostname,
            this.port = t.port,
            this.pathname = t.pathname,
            this.search = t.search,
            this.hash = t.hash,
            this.origin = [this.protocol, "//", this.hostname].join(""),
            0 !== this.port.length && (this.origin += ":" + this.port),
            this.relative = [this.pathname, this.search, this.hash].join(""),
            this.absolute = this.href
        }
        ,
        t
    }(),
    o = function(t) {
        function e(t) {
            return this.link = t,
            this.link.constructor === e ? this.link : (this.original = this.link.href,
            this.originalElement = this.link,
            this.link = this.link.cloneNode(!1),
            void e.__super__.constructor.apply(this, arguments))
        }
        return it(e, t),
        e.HTML_EXTENSIONS = ["html"],
        e.allowExtensions = function() {
            var t, n, i, o;
            for (n = 1 <= arguments.length ? rt.call(arguments, 0) : [],
            i = 0,
            o = n.length; o > i; i++)
                t = n[i],
                e.HTML_EXTENSIONS.push(t);
            return e.HTML_EXTENSIONS
        }
        ,
        e.prototype.shouldIgnore = function() {
            return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target()
        }
        ,
        e.prototype._anchored = function() {
            return (this.hash.length > 0 || "#" === this.href.charAt(this.href.length - 1)) && this.withoutHash() === (new n).withoutHash()
        }
        ,
        e.prototype._nonHtml = function() {
            return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + e.HTML_EXTENSIONS.join("|") + ")?$","g"))
        }
        ,
        e.prototype._optOut = function() {
            var t, e;
            for (e = this.originalElement; !t && e !== document; )
                t = null != e.getAttribute("data-no-turbolink"),
                e = e.parentNode;
            return t
        }
        ,
        e.prototype._target = function() {
            return 0 !== this.link.target.length
        }
        ,
        e
    }(n),
    e = function() {
        function t(t) {
            this.event = t,
            this.event.defaultPrevented || (this._extractLink(),
            this._validForTurbolinks() && (O(this.link.absolute) || tt(this.link.href),
            this.event.preventDefault()))
        }
        return t.installHandlerLast = function(e) {
            return e.defaultPrevented ? void 0 : (document.removeEventListener("click", t.handle, !1),
            document.addEventListener("click", t.handle, !1))
        }
        ,
        t.handle = function(e) {
            return new t(e)
        }
        ,
        t.prototype._extractLink = function() {
            var t;
            for (t = this.event.target; t.parentNode && "A" !== t.nodeName; )
                t = t.parentNode;
            return "A" === t.nodeName && 0 !== t.href.length ? this.link = new o(t) : void 0
        }
        ,
        t.prototype._validForTurbolinks = function() {
            return null != this.link && !(this.link.shouldIgnore() || this._nonStandardClick())
        }
        ,
        t.prototype._nonStandardClick = function() {
            return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey
        }
        ,
        t
    }(),
    r = function() {
        function t(t) {
            this.elementSelector = t,
            this._trickle = st(this._trickle, this),
            this.value = 0,
            this.content = "",
            this.speed = 300,
            this.opacity = .99,
            this.install()
        }
        var e;
        return e = "turbolinks-progress-bar",
        t.prototype.install = function() {
            return this.element = document.querySelector(this.elementSelector),
            this.element.classList.add(e),
            this.styleElement = document.createElement("style"),
            document.head.appendChild(this.styleElement),
            this._updateStyle()
        }
        ,
        t.prototype.uninstall = function() {
            return this.element.classList.remove(e),
            document.head.removeChild(this.styleElement)
        }
        ,
        t.prototype.start = function() {
            return this.advanceTo(5)
        }
        ,
        t.prototype.advanceTo = function(t) {
            var e;
            if (t > (e = this.value) && 100 >= e) {
                if (this.value = t,
                this._updateStyle(),
                100 === this.value)
                    return this._stopTrickle();
                if (this.value > 0)
                    return this._startTrickle()
            }
        }
        ,
        t.prototype.done = function() {
            return this.value > 0 ? (this.advanceTo(100),
            this._reset()) : void 0
        }
        ,
        t.prototype._reset = function() {
            var t;
            return t = this.opacity,
            setTimeout(function(t) {
                return function() {
                    return t.opacity = 0,
                    t._updateStyle()
                }
            }(this), this.speed / 2),
            setTimeout(function(e) {
                return function() {
                    return e.value = 0,
                    e.opacity = t,
                    e._withSpeed(0, function() {
                        return e._updateStyle(!0)
                    })
                }
            }(this), this.speed)
        }
        ,
        t.prototype._startTrickle = function() {
            return this.trickling ? void 0 : (this.trickling = !0,
            setTimeout(this._trickle, this.speed))
        }
        ,
        t.prototype._stopTrickle = function() {
            return delete this.trickling
        }
        ,
        t.prototype._trickle = function() {
            return this.trickling ? (this.advanceTo(this.value + Math.random() / 2),
            setTimeout(this._trickle, this.speed)) : void 0
        }
        ,
        t.prototype._withSpeed = function(t, e) {
            var n, i;
            return n = this.speed,
            this.speed = t,
            i = e(),
            this.speed = n,
            i
        }
        ,
        t.prototype._updateStyle = function(t) {
            return null == t && (t = !1),
            t && this._changeContentToForceRepaint(),
            this.styleElement.textContent = this._createCSSRule()
        }
        ,
        t.prototype._changeContentToForceRepaint = function() {
            return this.content = "" === this.content ? " " : ""
        }
        ,
        t.prototype._createCSSRule = function() {
            return this.elementSelector + "." + e + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + this.speed / 2 + "ms ease-in;\n  transform: translate3d(0,0,0);\n}"
        }
        ,
        t
    }(),
    c = function(t) {
        return setTimeout(t, 500)
    }
    ,
    S = function() {
        return document.addEventListener("DOMContentLoaded", function() {
            return Z(i.CHANGE),
            Z(i.UPDATE)
        }, !0)
    }
    ,
    A = function() {
        return "undefined" != typeof jQuery ? jQuery(document).on("ajaxSuccess", function(t, e, n) {
            return jQuery.trim(e.responseText) ? Z(i.UPDATE) : void 0
        }) : void 0
    }
    ,
    N = function(t) {
        var e, i;
        return (null != (i = t.state) ? i.turbolinks : void 0) ? (e = j[new n(t.state.url).absolute]) ? (d(),
        $(e)) : tt(t.target.location.href) : void 0
    }
    ,
    E = function() {
        return U(),
        B(),
        document.addEventListener("click", e.installHandlerLast, !0),
        window.addEventListener("hashchange", function(t) {
            return U(),
            B()
        }, !1),
        c(function() {
            return window.addEventListener("popstate", N, !1)
        })
    }
    ,
    k = void 0 !== window.history.state || navigator.userAgent.match(/Firefox\/2[6|7]/),
    l = window.history && window.history.pushState && window.history.replaceState && k,
    s = !navigator.userAgent.match(/CriOS\//),
    Y = "GET" === (F = H("request_method")) || "" === F,
    u = l && s && Y,
    a = document.addEventListener && document.createEvent,
    a && (S(),
    A()),
    u ? (tt = C,
    E()) : tt = function(t) {
        return document.location.href = t
    }
    ,
    this.Turbolinks = {
        visit: tt,
        pagesCached: I,
        enableTransitionCache: w,
        enableProgressBar: y,
        allowLinkExtensions: o.allowExtensions,
        supported: u,
        EVENTS: f(i)
    }
}
.call(this),
/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t) {
    "use strict";
    function e() {
        var t = document.createElement("bootstrap")
          , e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var n in e)
            if (void 0 !== t.style[n])
                return {
                    end: e[n]
                };
        return !1
    }
    t.fn.emulateTransitionEnd = function(e) {
        var n = !1
          , i = this;
        t(this).one("bsTransitionEnd", function() {
            n = !0
        });
        var o = function() {
            n || t(i).trigger(t.support.transition.end)
        };
        return setTimeout(o, e),
        this
    }
    ,
    t(function() {
        t.support.transition = e(),
        t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery),
/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var n = t(this)
              , o = n.data("bs.alert");
            o || n.data("bs.alert", o = new i(this)),
            "string" == typeof e && o[e].call(n)
        })
    }
    var n = '[data-dismiss="alert"]'
      , i = function(e) {
        t(e).on("click", n, this.close)
    };
    i.VERSION = "3.3.7",
    i.TRANSITION_DURATION = 150,
    i.prototype.close = function(e) {
        function n() {
            s.detach().trigger("closed.bs.alert").remove()
        }
        var o = t(this)
          , r = o.attr("data-target");
        r || (r = o.attr("href"),
        r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
        var s = t("#" === r ? [] : r);
        e && e.preventDefault(),
        s.length || (s = o.closest(".alert")),
        s.trigger(e = t.Event("close.bs.alert")),
        e.isDefaultPrevented() || (s.removeClass("in"),
        t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n())
    }
    ;
    var o = t.fn.alert;
    t.fn.alert = e,
    t.fn.alert.Constructor = i,
    t.fn.alert.noConflict = function() {
        return t.fn.alert = o,
        this
    }
    ,
    t(document).on("click.bs.alert.data-api", n, i.prototype.close)
}(jQuery),
/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var i = t(this)
              , o = i.data("bs.button")
              , r = "object" == typeof e && e;
            o || i.data("bs.button", o = new n(this,r)),
            "toggle" == e ? o.toggle() : e && o.setState(e)
        })
    }
    var n = function(e, i) {
        this.$element = t(e),
        this.options = t.extend({}, n.DEFAULTS, i),
        this.isLoading = !1
    };
    n.VERSION = "3.3.7",
    n.DEFAULTS = {
        loadingText: "loading..."
    },
    n.prototype.setState = function(e) {
        var n = "disabled"
          , i = this.$element
          , o = i.is("input") ? "val" : "html"
          , r = i.data();
        e += "Text",
        null == r.resetText && i.data("resetText", i[o]()),
        setTimeout(t.proxy(function() {
            i[o](null == r[e] ? this.options[e] : r[e]),
            "loadingText" == e ? (this.isLoading = !0,
            i.addClass(n).attr(n, n).prop(n, !0)) : this.isLoading && (this.isLoading = !1,
            i.removeClass(n).removeAttr(n).prop(n, !1))
        }, this), 0)
    }
    ,
    n.prototype.toggle = function() {
        var t = !0
          , e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") ? (n.prop("checked") && (t = !1),
            e.find(".active").removeClass("active"),
            this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (t = !1),
            this.$element.toggleClass("active")),
            n.prop("checked", this.$element.hasClass("active")),
            t && n.trigger("change")
        } else
            this.$element.attr("aria-pressed", !this.$element.hasClass("active")),
            this.$element.toggleClass("active")
    }
    ;
    var i = t.fn.button;
    t.fn.button = e,
    t.fn.button.Constructor = n,
    t.fn.button.noConflict = function() {
        return t.fn.button = i,
        this
    }
    ,
    t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(n) {
        var i = t(n.target).closest(".btn");
        e.call(i, "toggle"),
        t(n.target).is('input[type="radio"], input[type="checkbox"]') || (n.preventDefault(),
        i.is("input,button") ? i.trigger("focus") : i.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery),
/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var i = t(this)
              , o = i.data("bs.carousel")
              , r = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e)
              , s = "string" == typeof e ? e : r.slide;
            o || i.data("bs.carousel", o = new n(this,r)),
            "number" == typeof e ? o.to(e) : s ? o[s]() : r.interval && o.pause().cycle()
        })
    }
    var n = function(e, n) {
        this.$element = t(e),
        this.$indicators = this.$element.find(".carousel-indicators"),
        this.options = n,
        this.paused = null,
        this.sliding = null,
        this.interval = null,
        this.$active = null,
        this.$items = null,
        this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)),
        "hover" == this.options.pause && !("ontouchstart"in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    n.VERSION = "3.3.7",
    n.TRANSITION_DURATION = 600,
    n.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    },
    n.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
            }
            t.preventDefault()
        }
    }
    ,
    n.prototype.cycle = function(e) {
        return e || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)),
        this
    }
    ,
    n.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"),
        this.$items.index(t || this.$active)
    }
    ,
    n.prototype.getItemForDirection = function(t, e) {
        var n = this.getItemIndex(e)
          , i = "prev" == t && 0 === n || "next" == t && n == this.$items.length - 1;
        if (i && !this.options.wrap)
            return e;
        var o = "prev" == t ? -1 : 1
          , r = (n + o) % this.$items.length;
        return this.$items.eq(r)
    }
    ,
    n.prototype.to = function(t) {
        var e = this
          , n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t)
        }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", this.$items.eq(t))
    }
    ,
    n.prototype.pause = function(e) {
        return e || (this.paused = !0),
        this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end),
        this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this
    }
    ,
    n.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }
    ,
    n.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }
    ,
    n.prototype.slide = function(e, i) {
        var o = this.$element.find(".item.active")
          , r = i || this.getItemForDirection(e, o)
          , s = this.interval
          , a = "next" == e ? "left" : "right"
          , l = this;
        if (r.hasClass("active"))
            return this.sliding = !1;
        var u = r[0]
          , c = t.Event("slide.bs.carousel", {
            relatedTarget: u,
            direction: a
        });
        if (this.$element.trigger(c),
        !c.isDefaultPrevented()) {
            if (this.sliding = !0,
            s && this.pause(),
            this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var d = t(this.$indicators.children()[this.getItemIndex(r)]);
                d && d.addClass("active")
            }
            var h = t.Event("slid.bs.carousel", {
                relatedTarget: u,
                direction: a
            });
            return t.support.transition && this.$element.hasClass("slide") ? (r.addClass(e),
            r[0].offsetWidth,
            o.addClass(a),
            r.addClass(a),
            o.one("bsTransitionEnd", function() {
                r.removeClass([e, a].join(" ")).addClass("active"),
                o.removeClass(["active", a].join(" ")),
                l.sliding = !1,
                setTimeout(function() {
                    l.$element.trigger(h)
                }, 0)
            }).emulateTransitionEnd(n.TRANSITION_DURATION)) : (o.removeClass("active"),
            r.addClass("active"),
            this.sliding = !1,
            this.$element.trigger(h)),
            s && this.cycle(),
            this
        }
    }
    ;
    var i = t.fn.carousel;
    t.fn.carousel = e,
    t.fn.carousel.Constructor = n,
    t.fn.carousel.noConflict = function() {
        return t.fn.carousel = i,
        this
    }
    ;
    var o = function(n) {
        var i, o = t(this), r = t(o.attr("data-target") || (i = o.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
        if (r.hasClass("carousel")) {
            var s = t.extend({}, r.data(), o.data())
              , a = o.attr("data-slide-to");
            a && (s.interval = !1),
            e.call(r, s),
            a && r.data("bs.carousel").to(a),
            n.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", o).on("click.bs.carousel.data-api", "[data-slide-to]", o),
    t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var n = t(this);
            e.call(n, n.data())
        })
    })
}(jQuery),
/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t) {
    "use strict";
    function e(e) {
        var n, i = e.attr("data-target") || (n = e.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "");
        return t(i)
    }
    function n(e) {
        return this.each(function() {
            var n = t(this)
              , o = n.data("bs.collapse")
              , r = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            !o && r.toggle && /show|hide/.test(e) && (r.toggle = !1),
            o || n.data("bs.collapse", o = new i(this,r)),
            "string" == typeof e && o[e]()
        })
    }
    var i = function(e, n) {
        this.$element = t(e),
        this.options = t.extend({}, i.DEFAULTS, n),
        this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'),
        this.transitioning = null,
        this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle()
    };
    i.VERSION = "3.3.7",
    i.TRANSITION_DURATION = 350,
    i.DEFAULTS = {
        toggle: !0
    },
    i.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }
    ,
    i.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, o = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(o && o.length && (e = o.data("bs.collapse"),
            e && e.transitioning))) {
                var r = t.Event("show.bs.collapse");
                if (this.$element.trigger(r),
                !r.isDefaultPrevented()) {
                    o && o.length && (n.call(o, "hide"),
                    e || o.data("bs.collapse", null));
                    var s = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[s](0).attr("aria-expanded", !0),
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0),
                    this.transitioning = 1;
                    var a = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[s](""),
                        this.transitioning = 0,
                        this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition)
                        return a.call(this);
                    var l = t.camelCase(["scroll", s].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(i.TRANSITION_DURATION)[s](this.$element[0][l])
                }
            }
        }
    }
    ,
    i.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e),
            !e.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
                this.transitioning = 1;
                var o = function() {
                    this.transitioning = 0,
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[n](0).one("bsTransitionEnd", t.proxy(o, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : o.call(this)
            }
        }
    }
    ,
    i.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }
    ,
    i.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(n, i) {
            var o = t(i);
            this.addAriaAndCollapsedClass(e(o), o)
        }, this)).end()
    }
    ,
    i.prototype.addAriaAndCollapsedClass = function(t, e) {
        var n = t.hasClass("in");
        t.attr("aria-expanded", n),
        e.toggleClass("collapsed", !n).attr("aria-expanded", n)
    }
    ;
    var o = t.fn.collapse;
    t.fn.collapse = n,
    t.fn.collapse.Constructor = i,
    t.fn.collapse.noConflict = function() {
        return t.fn.collapse = o,
        this
    }
    ,
    t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(i) {
        var o = t(this);
        o.attr("data-target") || i.preventDefault();
        var r = e(o)
          , s = r.data("bs.collapse")
          , a = s ? "toggle" : o.data();
        n.call(r, a)
    })
}(jQuery),
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t) {
    "use strict";
    function e(e) {
        var n = e.attr("data-target");
        n || (n = e.attr("href"),
        n = n && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var i = n && t(n);
        return i && i.length ? i : e.parent()
    }
    function n(n) {
        n && 3 === n.which || (t(o).remove(),
        t(r).each(function() {
            var i = t(this)
              , o = e(i)
              , r = {
                relatedTarget: this
            };
            o.hasClass("open") && (n && "click" == n.type && /input|textarea/i.test(n.target.tagName) && t.contains(o[0], n.target) || (o.trigger(n = t.Event("hide.bs.dropdown", r)),
            n.isDefaultPrevented() || (i.attr("aria-expanded", "false"),
            o.removeClass("open").trigger(t.Event("hidden.bs.dropdown", r)))))
        }))
    }
    function i(e) {
        return this.each(function() {
            var n = t(this)
              , i = n.data("bs.dropdown");
            i || n.data("bs.dropdown", i = new s(this)),
            "string" == typeof e && i[e].call(n)
        })
    }
    var o = ".dropdown-backdrop"
      , r = '[data-toggle="dropdown"]'
      , s = function(e) {
        t(e).on("click.bs.dropdown", this.toggle)
    };
    s.VERSION = "3.3.7",
    s.prototype.toggle = function(i) {
        var o = t(this);
        if (!o.is(".disabled, :disabled")) {
            var r = e(o)
              , s = r.hasClass("open");
            if (n(),
            !s) {
                "ontouchstart"in document.documentElement && !r.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", n);
                var a = {
                    relatedTarget: this
                };
                if (r.trigger(i = t.Event("show.bs.dropdown", a)),
                i.isDefaultPrevented())
                    return;
                o.trigger("focus").attr("aria-expanded", "true"),
                r.toggleClass("open").trigger(t.Event("shown.bs.dropdown", a))
            }
            return !1
        }
    }
    ,
    s.prototype.keydown = function(n) {
        if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName)) {
            var i = t(this);
            if (n.preventDefault(),
            n.stopPropagation(),
            !i.is(".disabled, :disabled")) {
                var o = e(i)
                  , s = o.hasClass("open");
                if (!s && 27 != n.which || s && 27 == n.which)
                    return 27 == n.which && o.find(r).trigger("focus"),
                    i.trigger("click");
                var a = " li:not(.disabled):visible a"
                  , l = o.find(".dropdown-menu" + a);
                if (l.length) {
                    var u = l.index(n.target);
                    38 == n.which && u > 0 && u--,
                    40 == n.which && u < l.length - 1 && u++,
                    ~u || (u = 0),
                    l.eq(u).trigger("focus")
                }
            }
        }
    }
    ;
    var a = t.fn.dropdown;
    t.fn.dropdown = i,
    t.fn.dropdown.Constructor = s,
    t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = a,
        this
    }
    ,
    t(document).on("click.bs.dropdown.data-api", n).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", r, s.prototype.toggle).on("keydown.bs.dropdown.data-api", r, s.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", s.prototype.keydown)
}(jQuery),
/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t) {
    "use strict";
    function e(e, i) {
        return this.each(function() {
            var o = t(this)
              , r = o.data("bs.modal")
              , s = t.extend({}, n.DEFAULTS, o.data(), "object" == typeof e && e);
            r || o.data("bs.modal", r = new n(this,s)),
            "string" == typeof e ? r[e](i) : s.show && r.show(i)
        })
    }
    var n = function(e, n) {
        this.options = n,
        this.$body = t(document.body),
        this.$element = t(e),
        this.$dialog = this.$element.find(".modal-dialog"),
        this.$backdrop = null,
        this.isShown = null,
        this.originalBodyPad = null,
        this.scrollbarWidth = 0,
        this.ignoreBackdropClick = !1,
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    n.VERSION = "3.3.7",
    n.TRANSITION_DURATION = 300,
    n.BACKDROP_TRANSITION_DURATION = 150,
    n.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    n.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    }
    ,
    n.prototype.show = function(e) {
        var i = this
          , o = t.Event("show.bs.modal", {
            relatedTarget: e
        });
        this.$element.trigger(o),
        this.isShown || o.isDefaultPrevented() || (this.isShown = !0,
        this.checkScrollbar(),
        this.setScrollbar(),
        this.$body.addClass("modal-open"),
        this.escape(),
        this.resize(),
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)),
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            i.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(i.$element) && (i.ignoreBackdropClick = !0)
            })
        }),
        this.backdrop(function() {
            var o = t.support.transition && i.$element.hasClass("fade");
            i.$element.parent().length || i.$element.appendTo(i.$body),
            i.$element.show().scrollTop(0),
            i.adjustDialog(),
            o && i.$element[0].offsetWidth,
            i.$element.addClass("in"),
            i.enforceFocus();
            var r = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            o ? i.$dialog.one("bsTransitionEnd", function() {
                i.$element.trigger("focus").trigger(r)
            }).emulateTransitionEnd(n.TRANSITION_DURATION) : i.$element.trigger("focus").trigger(r)
        }))
    }
    ,
    n.prototype.hide = function(e) {
        e && e.preventDefault(),
        e = t.Event("hide.bs.modal"),
        this.$element.trigger(e),
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1,
        this.escape(),
        this.resize(),
        t(document).off("focusin.bs.modal"),
        this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),
        this.$dialog.off("mousedown.dismiss.bs.modal"),
        t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : this.hideModal())
    }
    ,
    n.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }
    ,
    n.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }
    ,
    n.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }
    ,
    n.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(),
        this.backdrop(function() {
            t.$body.removeClass("modal-open"),
            t.resetAdjustments(),
            t.resetScrollbar(),
            t.$element.trigger("hidden.bs.modal")
        })
    }
    ,
    n.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(),
        this.$backdrop = null
    }
    ,
    n.prototype.backdrop = function(e) {
        var i = this
          , o = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var r = t.support.transition && o;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + o).appendTo(this.$body),
            this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
            }, this)),
            r && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !e)
                return;
            r ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var s = function() {
                i.removeBackdrop(),
                e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", s).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : s()
        } else
            e && e()
    }
    ,
    n.prototype.handleUpdate = function() {
        this.adjustDialog()
    }
    ,
    n.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }
    ,
    n.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }
    ,
    n.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t,
        this.scrollbarWidth = this.measureScrollbar()
    }
    ,
    n.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "",
        this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }
    ,
    n.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }
    ,
    n.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure",
        this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t),
        e
    }
    ;
    var i = t.fn.modal;
    t.fn.modal = e,
    t.fn.modal.Constructor = n,
    t.fn.modal.noConflict = function() {
        return t.fn.modal = i,
        this
    }
    ,
    t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(n) {
        var i = t(this)
          , o = i.attr("href")
          , r = t(i.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, ""))
          , s = r.data("bs.modal") ? "toggle" : t.extend({
            remote: !/#/.test(o) && o
        }, r.data(), i.data());
        i.is("a") && n.preventDefault(),
        r.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || r.one("hidden.bs.modal", function() {
                i.is(":visible") && i.trigger("focus")
            })
        }),
        e.call(r, s, this)
    })
}(jQuery),
/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var i = t(this)
              , o = i.data("bs.tab");
            o || i.data("bs.tab", o = new n(this)),
            "string" == typeof e && o[e]()
        })
    }
    var n = function(e) {
        this.element = t(e)
    };
    n.VERSION = "3.3.7",
    n.TRANSITION_DURATION = 150,
    n.prototype.show = function() {
        var e = this.element
          , n = e.closest("ul:not(.dropdown-menu)")
          , i = e.data("target");
        if (i || (i = e.attr("href"),
        i = i && i.replace(/.*(?=#[^\s]*$)/, "")),
        !e.parent("li").hasClass("active")) {
            var o = n.find(".active:last a")
              , r = t.Event("hide.bs.tab", {
                relatedTarget: e[0]
            })
              , s = t.Event("show.bs.tab", {
                relatedTarget: o[0]
            });
            if (o.trigger(r),
            e.trigger(s),
            !s.isDefaultPrevented() && !r.isDefaultPrevented()) {
                var a = t(i);
                this.activate(e.closest("li"), n),
                this.activate(a, a.parent(), function() {
                    o.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }),
                    e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: o[0]
                    })
                })
            }
        }
    }
    ,
    n.prototype.activate = function(e, i, o) {
        function r() {
            s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
            e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
            a ? (e[0].offsetWidth,
            e.addClass("in")) : e.removeClass("fade"),
            e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
            o && o()
        }
        var s = i.find("> .active")
          , a = o && t.support.transition && (s.length && s.hasClass("fade") || !!i.find("> .fade").length);
        s.length && a ? s.one("bsTransitionEnd", r).emulateTransitionEnd(n.TRANSITION_DURATION) : r(),
        s.removeClass("in")
    }
    ;
    var i = t.fn.tab;
    t.fn.tab = e,
    t.fn.tab.Constructor = n,
    t.fn.tab.noConflict = function() {
        return t.fn.tab = i,
        this
    }
    ;
    var o = function(n) {
        n.preventDefault(),
        e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', o).on("click.bs.tab.data-api", '[data-toggle="pill"]', o)
}(jQuery),
/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var i = t(this)
              , o = i.data("bs.affix")
              , r = "object" == typeof e && e;
            o || i.data("bs.affix", o = new n(this,r)),
            "string" == typeof e && o[e]()
        })
    }
    var n = function(e, i) {
        this.options = t.extend({}, n.DEFAULTS, i),
        this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)),
        this.$element = t(e),
        this.affixed = null,
        this.unpin = null,
        this.pinnedOffset = null,
        this.checkPosition()
    };
    n.VERSION = "3.3.7",
    n.RESET = "affix affix-top affix-bottom",
    n.DEFAULTS = {
        offset: 0,
        target: window
    },
    n.prototype.getState = function(t, e, n, i) {
        var o = this.$target.scrollTop()
          , r = this.$element.offset()
          , s = this.$target.height();
        if (null != n && "top" == this.affixed)
            return n > o ? "top" : !1;
        if ("bottom" == this.affixed)
            return null != n ? o + this.unpin <= r.top ? !1 : "bottom" : t - i >= o + s ? !1 : "bottom";
        var a = null == this.affixed
          , l = a ? o : r.top
          , u = a ? s : e;
        return null != n && n >= o ? "top" : null != i && l + u >= t - i ? "bottom" : !1
    }
    ,
    n.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset;
        this.$element.removeClass(n.RESET).addClass("affix");
        var t = this.$target.scrollTop()
          , e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }
    ,
    n.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }
    ,
    n.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height()
              , i = this.options.offset
              , o = i.top
              , r = i.bottom
              , s = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof i && (r = o = i),
            "function" == typeof o && (o = i.top(this.$element)),
            "function" == typeof r && (r = i.bottom(this.$element));
            var a = this.getState(s, e, o, r);
            if (this.affixed != a) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (a ? "-" + a : "")
                  , u = t.Event(l + ".bs.affix");
                if (this.$element.trigger(u),
                u.isDefaultPrevented())
                    return;
                this.affixed = a,
                this.unpin = "bottom" == a ? this.getPinnedOffset() : null,
                this.$element.removeClass(n.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == a && this.$element.offset({
                top: s - e - r
            })
        }
    }
    ;
    var i = t.fn.affix;
    t.fn.affix = e,
    t.fn.affix.Constructor = n,
    t.fn.affix.noConflict = function() {
        return t.fn.affix = i,
        this
    }
    ,
    t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var n = t(this)
              , i = n.data();
            i.offset = i.offset || {},
            null != i.offsetBottom && (i.offset.bottom = i.offsetBottom),
            null != i.offsetTop && (i.offset.top = i.offsetTop),
            e.call(n, i)
        })
    })
}(jQuery),
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t) {
    "use strict";
    function e(n, i) {
        this.$body = t(document.body),
        this.$scrollElement = t(t(n).is(document.body) ? window : n),
        this.options = t.extend({}, e.DEFAULTS, i),
        this.selector = (this.options.target || "") + " .nav li > a",
        this.offsets = [],
        this.targets = [],
        this.activeTarget = null,
        this.scrollHeight = 0,
        this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)),
        this.refresh(),
        this.process()
    }
    function n(n) {
        return this.each(function() {
            var i = t(this)
              , o = i.data("bs.scrollspy")
              , r = "object" == typeof n && n;
            o || i.data("bs.scrollspy", o = new e(this,r)),
            "string" == typeof n && o[n]()
        })
    }
    e.VERSION = "3.3.7",
    e.DEFAULTS = {
        offset: 10
    },
    e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }
    ,
    e.prototype.refresh = function() {
        var e = this
          , n = "offset"
          , i = 0;
        this.offsets = [],
        this.targets = [],
        this.scrollHeight = this.getScrollHeight(),
        t.isWindow(this.$scrollElement[0]) || (n = "position",
        i = this.$scrollElement.scrollTop()),
        this.$body.find(this.selector).map(function() {
            var e = t(this)
              , o = e.data("target") || e.attr("href")
              , r = /^#./.test(o) && t(o);
            return r && r.length && r.is(":visible") && [[r[n]().top + i, o]] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            e.offsets.push(this[0]),
            e.targets.push(this[1])
        })
    }
    ,
    e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, n = this.getScrollHeight(), i = this.options.offset + n - this.$scrollElement.height(), o = this.offsets, r = this.targets, s = this.activeTarget;
        if (this.scrollHeight != n && this.refresh(),
        e >= i)
            return s != (t = r[r.length - 1]) && this.activate(t);
        if (s && e < o[0])
            return this.activeTarget = null,
            this.clear();
        for (t = o.length; t--; )
            s != r[t] && e >= o[t] && (void 0 === o[t + 1] || e < o[t + 1]) && this.activate(r[t])
    }
    ,
    e.prototype.activate = function(e) {
        this.activeTarget = e,
        this.clear();
        var n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]'
          , i = t(n).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")),
        i.trigger("activate.bs.scrollspy")
    }
    ,
    e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    }
    ;
    var i = t.fn.scrollspy;
    t.fn.scrollspy = n,
    t.fn.scrollspy.Constructor = e,
    t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = i,
        this
    }
    ,
    t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            n.call(e, e.data())
        })
    })
}(jQuery),
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var i = t(this)
              , o = i.data("bs.tooltip")
              , r = "object" == typeof e && e;
            (o || !/destroy|hide/.test(e)) && (o || i.data("bs.tooltip", o = new n(this,r)),
            "string" == typeof e && o[e]())
        })
    }
    var n = function(t, e) {
        this.type = null,
        this.options = null,
        this.enabled = null,
        this.timeout = null,
        this.hoverState = null,
        this.$element = null,
        this.inState = null,
        this.init("tooltip", t, e)
    };
    n.VERSION = "3.3.7",
    n.TRANSITION_DURATION = 150,
    n.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    },
    n.prototype.init = function(e, n, i) {
        if (this.enabled = !0,
        this.type = e,
        this.$element = t(n),
        this.options = this.getOptions(i),
        this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport),
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        },
        this.$element[0]instanceof document.constructor && !this.options.selector)
            throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var o = this.options.trigger.split(" "), r = o.length; r--; ) {
            var s = o[r];
            if ("click" == s)
                this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != s) {
                var a = "hover" == s ? "mouseenter" : "focusin"
                  , l = "hover" == s ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)),
                this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }
    ,
    n.prototype.getDefaults = function() {
        return n.DEFAULTS
    }
    ,
    n.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e),
        e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }),
        e
    }
    ,
    n.prototype.getDelegateOptions = function() {
        var e = {}
          , n = this.getDefaults();
        return this._options && t.each(this._options, function(t, i) {
            n[t] != i && (e[t] = i)
        }),
        e
    }
    ,
    n.prototype.enter = function(e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return n || (n = new this.constructor(e.currentTarget,this.getDelegateOptions()),
        t(e.currentTarget).data("bs." + this.type, n)),
        e instanceof t.Event && (n.inState["focusin" == e.type ? "focus" : "hover"] = !0),
        n.tip().hasClass("in") || "in" == n.hoverState ? void (n.hoverState = "in") : (clearTimeout(n.timeout),
        n.hoverState = "in",
        n.options.delay && n.options.delay.show ? void (n.timeout = setTimeout(function() {
            "in" == n.hoverState && n.show()
        }, n.options.delay.show)) : n.show())
    }
    ,
    n.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t])
                return !0;
        return !1
    }
    ,
    n.prototype.leave = function(e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return n || (n = new this.constructor(e.currentTarget,this.getDelegateOptions()),
        t(e.currentTarget).data("bs." + this.type, n)),
        e instanceof t.Event && (n.inState["focusout" == e.type ? "focus" : "hover"] = !1),
        n.isInStateTrue() ? void 0 : (clearTimeout(n.timeout),
        n.hoverState = "out",
        n.options.delay && n.options.delay.hide ? void (n.timeout = setTimeout(function() {
            "out" == n.hoverState && n.hide()
        }, n.options.delay.hide)) : n.hide())
    }
    ,
    n.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var i = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !i)
                return;
            var o = this
              , r = this.tip()
              , s = this.getUID(this.type);
            this.setContent(),
            r.attr("id", s),
            this.$element.attr("aria-describedby", s),
            this.options.animation && r.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, r[0], this.$element[0]) : this.options.placement
              , l = /\s?auto?\s?/i
              , u = l.test(a);
            u && (a = a.replace(l, "") || "top"),
            r.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this),
            this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element),
            this.$element.trigger("inserted.bs." + this.type);
            var c = this.getPosition()
              , d = r[0].offsetWidth
              , h = r[0].offsetHeight;
            if (u) {
                var p = a
                  , f = this.getPosition(this.$viewport);
                a = "bottom" == a && c.bottom + h > f.bottom ? "top" : "top" == a && c.top - h < f.top ? "bottom" : "right" == a && c.right + d > f.width ? "left" : "left" == a && c.left - d < f.left ? "right" : a,
                r.removeClass(p).addClass(a)
            }
            var g = this.getCalculatedOffset(a, c, d, h);
            this.applyPlacement(g, a);
            var m = function() {
                var t = o.hoverState;
                o.$element.trigger("shown.bs." + o.type),
                o.hoverState = null,
                "out" == t && o.leave(o)
            };
            t.support.transition && this.$tip.hasClass("fade") ? r.one("bsTransitionEnd", m).emulateTransitionEnd(n.TRANSITION_DURATION) : m()
        }
    }
    ,
    n.prototype.applyPlacement = function(e, n) {
        var i = this.tip()
          , o = i[0].offsetWidth
          , r = i[0].offsetHeight
          , s = parseInt(i.css("margin-top"), 10)
          , a = parseInt(i.css("margin-left"), 10);
        isNaN(s) && (s = 0),
        isNaN(a) && (a = 0),
        e.top += s,
        e.left += a,
        t.offset.setOffset(i[0], t.extend({
            using: function(t) {
                i.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0),
        i.addClass("in");
        var l = i[0].offsetWidth
          , u = i[0].offsetHeight;
        "top" == n && u != r && (e.top = e.top + r - u);
        var c = this.getViewportAdjustedDelta(n, e, l, u);
        c.left ? e.left += c.left : e.top += c.top;
        var d = /top|bottom/.test(n)
          , h = d ? 2 * c.left - o + l : 2 * c.top - r + u
          , p = d ? "offsetWidth" : "offsetHeight";
        i.offset(e),
        this.replaceArrow(h, i[0][p], d)
    }
    ,
    n.prototype.replaceArrow = function(t, e, n) {
        this.arrow().css(n ? "left" : "top", 50 * (1 - t / e) + "%").css(n ? "top" : "left", "")
    }
    ,
    n.prototype.setContent = function() {
        var t = this.tip()
          , e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e),
        t.removeClass("fade in top bottom left right")
    }
    ,
    n.prototype.hide = function(e) {
        function i() {
            "in" != o.hoverState && r.detach(),
            o.$element && o.$element.removeAttr("aria-describedby").trigger("hidden.bs." + o.type),
            e && e()
        }
        var o = this
          , r = t(this.$tip)
          , s = t.Event("hide.bs." + this.type);
        return this.$element.trigger(s),
        s.isDefaultPrevented() ? void 0 : (r.removeClass("in"),
        t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i(),
        this.hoverState = null,
        this)
    }
    ,
    n.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }
    ,
    n.prototype.hasContent = function() {
        return this.getTitle()
    }
    ,
    n.prototype.getPosition = function(e) {
        e = e || this.$element;
        var n = e[0]
          , i = "BODY" == n.tagName
          , o = n.getBoundingClientRect();
        null == o.width && (o = t.extend({}, o, {
            width: o.right - o.left,
            height: o.bottom - o.top
        }));
        var r = window.SVGElement && n instanceof window.SVGElement
          , s = i ? {
            top: 0,
            left: 0
        } : r ? null : e.offset()
          , a = {
            scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
        }
          , l = i ? {
            width: t(window).width(),
            height: t(window).height()
        } : null;
        return t.extend({}, o, a, l, s)
    }
    ,
    n.prototype.getCalculatedOffset = function(t, e, n, i) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - n / 2
        } : "top" == t ? {
            top: e.top - i,
            left: e.left + e.width / 2 - n / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - i / 2,
            left: e.left - n
        } : {
            top: e.top + e.height / 2 - i / 2,
            left: e.left + e.width
        }
    }
    ,
    n.prototype.getViewportAdjustedDelta = function(t, e, n, i) {
        var o = {
            top: 0,
            left: 0
        };
        if (!this.$viewport)
            return o;
        var r = this.options.viewport && this.options.viewport.padding || 0
          , s = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - r - s.scroll
              , l = e.top + r - s.scroll + i;
            a < s.top ? o.top = s.top - a : l > s.top + s.height && (o.top = s.top + s.height - l)
        } else {
            var u = e.left - r
              , c = e.left + r + n;
            u < s.left ? o.left = s.left - u : c > s.right && (o.left = s.left + s.width - c)
        }
        return o
    }
    ,
    n.prototype.getTitle = function() {
        var t, e = this.$element, n = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(e[0]) : n.title)
    }
    ,
    n.prototype.getUID = function(t) {
        do
            t += ~~(1e6 * Math.random());
        while (document.getElementById(t));
        return t
    }
    ,
    n.prototype.tip = function() {
        if (!this.$tip && (this.$tip = t(this.options.template),
        1 != this.$tip.length))
            throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }
    ,
    n.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }
    ,
    n.prototype.enable = function() {
        this.enabled = !0
    }
    ,
    n.prototype.disable = function() {
        this.enabled = !1
    }
    ,
    n.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    ,
    n.prototype.toggle = function(e) {
        var n = this;
        e && (n = t(e.currentTarget).data("bs." + this.type),
        n || (n = new this.constructor(e.currentTarget,this.getDelegateOptions()),
        t(e.currentTarget).data("bs." + this.type, n))),
        e ? (n.inState.click = !n.inState.click,
        n.isInStateTrue() ? n.enter(n) : n.leave(n)) : n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }
    ,
    n.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout),
        this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type),
            t.$tip && t.$tip.detach(),
            t.$tip = null,
            t.$arrow = null,
            t.$viewport = null,
            t.$element = null
        })
    }
    ;
    var i = t.fn.tooltip;
    t.fn.tooltip = e,
    t.fn.tooltip.Constructor = n,
    t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = i,
        this
    }
}(jQuery),
/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var i = t(this)
              , o = i.data("bs.popover")
              , r = "object" == typeof e && e;
            (o || !/destroy|hide/.test(e)) && (o || i.data("bs.popover", o = new n(this,r)),
            "string" == typeof e && o[e]())
        })
    }
    var n = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip)
        throw new Error("Popover requires tooltip.js");
    n.VERSION = "3.3.7",
    n.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    n.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype),
    n.prototype.constructor = n,
    n.prototype.getDefaults = function() {
        return n.DEFAULTS
    }
    ,
    n.prototype.setContent = function() {
        var t = this.tip()
          , e = this.getTitle()
          , n = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e),
        t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n),
        t.removeClass("fade top bottom left right in"),
        t.find(".popover-title").html() || t.find(".popover-title").hide()
    }
    ,
    n.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }
    ,
    n.prototype.getContent = function() {
        var t = this.$element
          , e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }
    ,
    n.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }
    ;
    var i = t.fn.popover;
    t.fn.popover = e,
    t.fn.popover.Constructor = n,
    t.fn.popover.noConflict = function() {
        return t.fn.popover = i,
        this
    }
}(jQuery),
/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var i = t(this)
              , o = i.data("bs.tab");
            o || i.data("bs.tab", o = new n(this)),
            "string" == typeof e && o[e]()
        })
    }
    var n = function(e) {
        this.element = t(e)
    };
    n.VERSION = "3.3.7",
    n.TRANSITION_DURATION = 150,
    n.prototype.show = function() {
        var e = this.element
          , n = e.closest("ul:not(.dropdown-menu)")
          , i = e.data("target");
        if (i || (i = e.attr("href"),
        i = i && i.replace(/.*(?=#[^\s]*$)/, "")),
        !e.parent("li").hasClass("active")) {
            var o = n.find(".active:last a")
              , r = t.Event("hide.bs.tab", {
                relatedTarget: e[0]
            })
              , s = t.Event("show.bs.tab", {
                relatedTarget: o[0]
            });
            if (o.trigger(r),
            e.trigger(s),
            !s.isDefaultPrevented() && !r.isDefaultPrevented()) {
                var a = t(i);
                this.activate(e.closest("li"), n),
                this.activate(a, a.parent(), function() {
                    o.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }),
                    e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: o[0]
                    })
                })
            }
        }
    }
    ,
    n.prototype.activate = function(e, i, o) {
        function r() {
            s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
            e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
            a ? (e[0].offsetWidth,
            e.addClass("in")) : e.removeClass("fade"),
            e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
            o && o()
        }
        var s = i.find("> .active")
          , a = o && t.support.transition && (s.length && s.hasClass("fade") || !!i.find("> .fade").length);
        s.length && a ? s.one("bsTransitionEnd", r).emulateTransitionEnd(n.TRANSITION_DURATION) : r(),
        s.removeClass("in")
    }
    ;
    var i = t.fn.tab;
    t.fn.tab = e,
    t.fn.tab.Constructor = n,
    t.fn.tab.noConflict = function() {
        return t.fn.tab = i,
        this
    }
    ;
    var o = function(n) {
        n.preventDefault(),
        e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', o).on("click.bs.tab.data-api", '[data-toggle="pill"]', o)
}(jQuery),
function() {
    window.dangerindicator = {},
    dangerindicator.clearDanger = function(t) {
        return t.removeClass("label label-danger"),
        t.empty(),
        t.css("display", "none")
    }
    ,
    dangerindicator.clearWarning = function(t) {
        return t.removeClass("label label-warning"),
        t.empty(),
        t.css("display", "none")
    }
    ,
    dangerindicator.setDanger = function(t, e) {
        return t.addClass("label label-danger"),
        t.text(e),
        t.css("display", "inline")
    }
    ,
    dangerindicator.setWarning = function(t, e) {
        return t.addClass("label label-warning"),
        t.text(e),
        t.css("display", "inline")
    }
}
.call(this),
function() {
    window.typingTimer,
    window.doneTypingInterval = 1e3,
    this.checkPW = function(t) {
        var e, n, i, o, r, s, a;
        return $("input[type='submit']").removeAttr("disabled"),
        "owner" === t ? (i = $("#account_owner_attributes_password")[0],
        o = $("#account_owner_attributes_password_confirmation")[0]) : (i = $("#user_password")[0],
        o = $("#user_password_confirmation")[0]),
        s = $(i).parent().find(".account_errors"),
        e = $(s),
        a = s = $(o).parent().find(".account_errors"),
        n = $(a),
        "" === i.value ? (dangerindicator.setDanger(e, "Password cannot be empty!"),
        i.focus(),
        !1) : i.value.length < 8 ? (dangerindicator.setDanger(e, "Password must contain at least eight characters!"),
        $("input[type='submit']").attr("disabled", "disabled"),
        i.focus(),
        !1) : (r = /[0-9]/,
        r.test(i.value) ? (r = /[a-z]/,
        r.test(i.value) ? (r = /[A-Z]/,
        r.test(i.value) ? (dangerindicator.clearDanger(e),
        !0) : (dangerindicator.setDanger(e, "Password must contain at least one uppercase letter (A-Z)!"),
        i.focus(),
        !1)) : (dangerindicator.setDanger(e, "Password must contain at least one lowercase letter (a-z)!"),
        i.focus(),
        !1)) : (dangerindicator.setDanger(e, "Password must contain at least one number (0-9)!"),
        i.focus(),
        !1))
    }
    ,
    this.checkPWconf = function(t) {
        var e, n, i, o;
        return "owner" === t ? (n = $("#account_owner_attributes_password")[0],
        i = $("#account_owner_attributes_password_confirmation")[0]) : (n = $("#user_password")[0],
        i = $("#user_password_confirmation")[0]),
        o = $(i).parent().find(".account_errors"),
        e = $(o),
        "" === i.value || n.value !== i.value ? (dangerindicator.setDanger(e, "Password and confirmation don't match!"),
        i.focus(),
        !1) : (dangerindicator.clearDanger(e),
        !0)
    }
    ,
    $(document).on("page:change", function() {
        return $("tr.clickable-row td:not(.show):not(:last-child)").click(function() {
            return window.document.location = $(this).parent().data("href")
        }),
        $(".jdelete_row").click(function() {
            var t, e, n;
            return t = $(this).data("oid"),
            confirm("Are you sure you want to delete " + t + "?") ? (n = $(this).data("url"),
            console.log("deleting row " + t),
            e = $(this).parents("tr").children(),
            $(e).css({
                "background-color": "orange"
            }),
            $.ajax(n + ".json", {
                type: "DELETE",
                error: function(t) {
                    return alert("AJAX Error: " + t.statusText)
                },
                success: function(t) {
                    return $(e).fadeOut(600, "swing")
                }
            })) : void 0
        })
    })
}
.call(this),
function() {
    var t, e, n = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    };
    window.jcrop_api = void 0,
    e = function() {
        var e, n, i, o, r;
        return e = $("#custom-handle"),
        $("#act-prev-ctr img").css({
            transform: "translate(-50%,-50%) translate(100px,100px)"
        }),
        r = function() {
            var t, e;
            return e = $("#slider").slider("option", "value"),
            t = e / 100,
            $("#account_scale").val(e)
        }
        ,
        $("#cancel_resize").click(function() {
            return $("#account_scale").removeAttr("value"),
            $("#act-prev-ctr img").css({
                transform: "translate(-50%,-50%) translate(100px,100px)"
            }),
            $("#slider").slider("option", "value", "100"),
            e.text("100"),
            this.blur()
        }),
        $("#slider").slider({
            orientation: "horizontal",
            min: 50,
            max: 150,
            value: 100,
            create: function() {
                console.log("createSlider"),
                e.text($(this).slider("value"))
            },
            slide: function(t, n) {
                var i;
                e.text(n.value),
                i = n.value / 100,
                $("#act-prev-ctr img").css({
                    transform: "translate(-50%,-50%) translate(100px,100px) scale(" + i + "," + i + ")"
                })
            },
            change: function() {
                return r()
            }
        }),
        n = $("#cropbox").data("im"),
        o = $("#cropbox").data("origw"),
        i = $("#cropbox").data("origh"),
        new t(n,o,i),
        $("#cancel_crop").click(function() {
            var t, e;
            return jcrop_api.release(),
            $("#account_crop_x").removeAttr("value"),
            $("#account_crop_y").removeAttr("value"),
            $("#account_crop_w").removeAttr("value"),
            $("#account_crop_h").removeAttr("value"),
            e = $("#prev-ctr").width(),
            t = e * i / o,
            $("#prev-ctr").height(t),
            $("#preview").css({
                width: Math.round(e) + "px",
                height: Math.round(t) + "px",
                marginLeft: "0px",
                marginTop: "0px"
            }),
            this.blur()
        }),
        $("ul.nav.nav-tabs li").click(function() {
            var t, e;
            return e = $(this).find("a").attr("href"),
            t = $(".tab-pane").map(function() {
                return this.id !== e.substring(1) ? this : void 0
            }).get(),
            $(".tab-content " + e).show(),
            $(t).hide()
        })
    }
    ,
    t = function() {
        function t(t, e, i) {
            this.updatePreview = n(this.updatePreview, this),
            this.update = n(this.update, this);
            var o, r, s, a, l;
            l = parseInt($("#cropbox").width()),
            r = parseInt($("#cropbox").height()),
            a = e,
            s = i,
            0 === l && (l = 600,
            r = 600),
            console.log("constructor"),
            console.log("wxh: " + l + " " + r),
            o = "groundmap" === t ? 0 : 1,
            $("#cropbox").Jcrop({
                trueSize: [a, s],
                aspectRatio: o,
                setSelect: [0, 0, l, r],
                onSelect: this.update,
                onChange: this.update
            }, function() {
                window.jcrop_api = this
            })
        }
        return t.prototype.update = function(t) {
            return $("#account_crop_x").val(t.x),
            $("#account_crop_y").val(t.y),
            $("#account_crop_w").val(t.w),
            $("#account_crop_h").val(t.h),
            this.updatePreview(t)
        }
        ,
        t.prototype.updatePreview = function(t) {
            var e, n, i, o;
            return n = $("#cropbox").attr("data-origw"),
            e = $("#cropbox").attr("data-origh"),
            o = $("#prev-ctr").width(),
            i = o * t.h / t.w,
            $("#prev-ctr").height(i),
            $("#preview").css({
                width: Math.round(n * o / t.w) + "px",
                height: Math.round(i / t.h * e) + "px",
                marginLeft: "-" + Math.round(o / t.w * t.x) + "px",
                marginTop: "-" + Math.round(i / t.h * t.y) + "px"
            })
        }
        ,
        t
    }(),
    $(document).ready(e),
    $(document).on("page:load", e)
}
.call(this),
function() {
    $(document).on("page:change", function() {
        return $("#emlNoti").click(function() {
            var t, e;
            return t = $(this).data("switch"),
            confirm("Are you sure you want to turn notification " + t + "?") ? (e = $(this).data("url"),
            console.log("switching notification " + t),
            $.ajax(e + "/" + t + ".json", {
                type: "POST",
                error: function(t) {
                    return alert("AJAX Error: " + t.statusText)
                },
                success: function(e) {
                    var n, i;
                    return n = $("#emlNoti"),
                    t = n.data("switch"),
                    $("#notitext").text(t),
                    i = "ON" === t ? "OFF" : "ON",
                    n.text("Turn " + i + " email notification"),
                    n.data({
                        "switch": i
                    }),
                    n.attr("data-switch", i),
                    n.toggleClass("btn-default btn-danger")
                }
            })) : void 0
        })
    })
}
.call(this),
function() {
    var t, e, n, i, o, r, s, a, l, u;
    u = function(t) {
        var e, n, i;
        return n = t.data.c,
        e = t.data.i,
        i = $("#input" + e).val(),
        $.ajax("/sites/" + e + ".json", {
            type: "PATCH",
            dataType: "json",
            data: {
                site: {
                    number: i,
                    x: t.data.x,
                    y: t.data.y
                }
            },
            error: function(t) {
                return alert("AJAX Error: " + t.statusText + ", Could not update site number " + i)
            },
            success: function(t) {
                var n;
                return n = "[data-sid=" + e + "]",
                $(n).removeClass("site_tmpmark"),
                $(n).addClass("site_mark"),
                $(n).text(i),
                $(n).data("startPos", {
                    x: -1,
                    y: -1,
                    sx: -1,
                    sy: -1
                }),
                $("#form" + e).fadeOut()
            }
        })
    }
    ,
    n = function() {
        var t, e, n;
        return n = $(".site").length,
        n > 0 ? (e = parseInt($(".site").last().data("sug_num")) + 1,
        console.log("Calculated sitenum from existing miniforms: " + e)) : (e = parseInt($("#mapcontainer").data("num")),
        console.log("Got sitenum from mapcontainer data: " + e)),
        t = document.createElement("span"),
        $(t).data("sug_num", e),
        $(t).addClass("site newform"),
        $(t).html("position"),
        $(t).css("display", "none"),
        $("<div id='miniforms'></div>").insertAfter($("#mapcontainer")),
        $("#miniforms").append(t)
    }
    ,
    l = function(t) {
        var e, n;
        return e = t.data.c,
        n = $("#input" + e).val(),
        $.ajax("/sites.json", {
            type: "POST",
            data: {
                site: {
                    number: n,
                    x: t.data.x,
                    y: t.data.y
                }
            },
            error: function(t) {
                return alert("An error occured: " + t.statusText(NaN + n + " already exists. "))
            },
            success: function(t) {
                var i, o;
                return o = "#site_mark" + e,
                i = t.id,
                $(o).attr("id", "site_mark" + i),
                o = "#site_mark" + i,
                $(o).addClass("site_mark site_vacant_mark draggable"),
                $(o).data("startPos", {
                    x: $(o).css("left"),
                    y: $(o).css("top"),
                    sx: $(o).css("left"),
                    sy: $(o).css("top")
                }),
                $(o).draggable({
                    containment: "#mapcontainer",
                    cursor: "move",
                    start: function(t, e) {
                        return $(this).data("startPos", {
                            x: e.position.left,
                            y: e.position.top,
                            sx: $(this).css("left"),
                            sy: $(this).css("top")
                        }),
                        $(this).data("id", $(this).text())
                    },
                    drag: function(t, e) {
                        return $(this).css("background-color", "blue"),
                        !0
                    }
                }),
                $(o).attr("data-sid", i),
                $(o).text(n),
                $("#form" + e).fadeOut()
            }
        })
    }
    ,
    i = function(t, e, n, i) {
        var o, r, s;
        return o = $("<div>").addClass("btn-toolbar text-center"),
        r = $('<input type="button" value="save" class="btn btn-xs btn-primary">'),
        r.className = "site",
        $(r).click({
            x: t,
            y: e,
            c: n,
            n: i
        }, l),
        s = $('<input type="button" value="cancel" class="btn btn-xs btn-primary"></input>'),
        $(s).attr("id", "cbtn" + n),
        $(s).text("cancel"),
        $(s).click(function() {
            var t;
            return i = $(this).parents(".site").attr("id").substring(4),
            t = "#site_mark" + i,
            $(t).remove(),
            $(this).parents("span.site").remove()
        }),
        $(o).append(r).append(s),
        o
    }
    ,
    e = function(t, e, n, i) {
        var o, r, s;
        return o = $("<div>").addClass("btn-toolbar text-center"),
        r = $('<input type="button" value="update" class="btn btn-xs btn-primary">'),
        $(r).text("save"),
        $(r).click({
            x: t,
            y: e,
            c: n,
            i: i
        }, u),
        s = $('<input type="button" value="cancel" class="btn btn-xs btn-primary"></input>'),
        s.id = "cbtn" + n,
        $(s).click(function() {
            var t, e, n;
            return n = "#site_mark" + i,
            t = $(n).data("startPos").x,
            e = $(n).data("startPos").y,
            $(n).css({
                left: t,
                top: e,
                background: "white",
                color: "blue"
            }),
            $(this).parents(".site").remove()
        }),
        $(o).append(r).append(s),
        o
    }
    ,
    o = function(t, n, i, o) {
        var r, s, a, l, u, c, d, h, p;
        return $(".site#form" + t).length > 0 ? (h = $(".site#form" + t)[0],
        $(".site#form" + t + " #pos").html("X: " + i + "<br>Y: " + o),
        $(h).css("display", "inline-block"),
        p = $(h).data("visits") || 0,
        $(h).data("visits", p + 1),
        void 0) : (h = $("<span>").addClass("site").attr("id", "form" + t),
        h.data("visits", 0),
        u = $("<div>").addClass("panel panel-default"),
        $(h).append(u),
        c = $("<input>"),
        $(c).attr({
            id: "input" + t,
            type: "text",
            size: 5,
            value: n
        }),
        r = e(i, o, n, t),
        a = $("<div>").addClass("panel-heading").text("Move"),
        l = $("<div>").addClass("text-small").attr("id", "pos").html("X: " + i + "<br>Y: " + o),
        d = $("<div>").text("Number: ").append(c),
        s = $("<div>").addClass("panel-body").append(l).append(d),
        $(u).append(a).append(s).append(r),
        $("#miniforms").append(h))
    }
    ,
    $(document).on("page:change", function() {
        $('[data-toggle="tooltip"]').tooltip(),
        $("div.rside").css({
            display: "block"
        }),
        $("#account_logo").change(function() {
            return a(this)
        }),
        $("#account_groundmap").change(function() {
            return s(this)
        }),
        $("#previewbtn").click(function() {
            return $("#preview").data("path", "value"),
            $("#preview").text("hello")
        }),
        $(".draggable").draggable({
            containment: "#linkedmap",
            cursor: "move",
            start: function(t, e) {
                return $(this).data("startPos") && -1 !== $(this).data("startPos") || $(this).data("startPos", {
                    x: e.position.left,
                    y: e.position.top,
                    sx: $(this).css("left"),
                    sy: $(this).css("top")
                }),
                $(this).data("id", $(this).text())
            },
            drag: function(t, e) {
                return $(".position").text(JSON.stringify(e.position)),
                $(this).css("background-color", "blue"),
                !0
            }
        }),
        $(".droppable").droppable({
            accept: ".draggable",
            drop: function(t, e) {
                var n, i, r, s, a, l, u;
                return i = parseInt(e.draggable.data("id")),
                n = parseInt(e.draggable.data("sid")),
                l = e.draggable.data("startPos").x,
                u = e.draggable.data("startPos").y,
                $(e.draggable).css("background-color", "blue"),
                $(e.draggable).css("color", "white"),
                r = $(this).offset(),
                s = e.position.left,
                a = e.position.top,
                o(n, i, e.position.left, e.position.top),
                !0
            }
        }),
        $(".admin #panimage").draggable({
            stop: function(t, e) {
                var n;
                return confirm("Save?") ? (n = $("#account_img_type").val(),
                $.ajax("/campground/pan.json", {
                    type: "POST",
                    data: {
                        account: {
                            pan_left: e.position.left,
                            pan_top: e.position.top,
                            img_type: n
                        }
                    }
                })) : $(this).css({
                    top: "0px",
                    left: "0px"
                })
            }
        }),
        n(),
        $(".admin #linkedmap").click(function(t) {
            var e, n, o, s, a, l, u, c, d, h, p, f, g, m, v;
            m = parseInt($(".site.newform").last().data("sug_num")) + 1,
            h = $(this).offset(),
            p = $(this).position(),
            n = r(),
            f = Math.round(t.pageX - h.left - n),
            g = Math.round(t.pageY - h.top - n),
            v = document.createElement("div"),
            c = (new Date).getTime(),
            v.id = "site_mark" + c,
            v.className = "site_mark site_new_mark",
            $(v).css({
                left: f,
                top: g,
                position: "absolute"
            }),
            $("#mapcontainer").append(v),
            d = document.createElement("input"),
            $(d).attr({
                id: "input" + c,
                type: "text",
                size: 5,
                value: m
            }),
            e = i(f, g, c, m),
            l = $("<span>").addClass("site newform").attr("id", "form" + c),
            $(l).data("sug_num", m),
            u = $("<div>").addClass("panel panel-default"),
            $(l).append(u),
            s = $("<div>").addClass("panel-heading").text("New"),
            a = $("<div>").addClass("text-small").attr("id", "pos").html("X: " + f + "<br>Y: " + g),
            m = $("<div>").text("Number: ").append(d),
            o = $("<div>").addClass("panel-body").append(a).append(m),
            $(u).append(s).append(o).append(e),
            $("#miniforms").append(l)
        })
    }),
    t = function(t) {
        var e, n, i, o;
        return e = t.name,
        n = new RegExp(/\.(png|jpeg|jpg|gif)$/i),
        n.test(e) ? (i = t.size / 1024,
        o = (i / 1024).toFixed(2),
        o > 3 ? o + "M should be less than 3 MB" : "ok") : e + " Unsupported Image extension\n"
    }
    ,
    a = function(e) {
        var n, i, o, r, s;
        return s = $(e).parent().find(".account_errors"),
        e.files && e.files[0] ? (r = e.files[0],
        o = t(r),
        n = $(s),
        "ok" === o ? dangerindicator.clearDanger(n) : dangerindicator.setDanger(n, o),
        i = new FileReader,
        i.onload = function(t) {
            return $("#account_logo_image").attr("src", t.target.result)
        }
        ,
        i.readAsDataURL(e.files[0])) : void 0
    }
    ,
    s = function(e) {
        var n, i, o, r, s;
        return s = $(e).parent().find(".account_errors"),
        e.files && e.files[0] ? (r = e.files[0],
        o = t(r),
        n = $(s),
        "ok" === o ? dangerindicator.clearDanger(n) : dangerindicator.setDanger(n, o),
        i = new FileReader,
        i.onload = function(t) {
            return $("#account_groundmap_image").attr("src", t.target.result)
        }
        ,
        i.readAsDataURL(e.files[0])) : void 0
    }
    ,
    r = function() {
        var t;
        return t = $(".site_mark:first").outerWidth() / 2
    }
}
.call(this),
function() {
    $(document).on("page:change", function() {
        var t;
        return $(document).on("click", "[data-dismiss=modal], \\#modal-backdrop", function(t) {
            var e;
            return t.stopPropagation(),
            $(".modal-body").empty(),
            e = $("#modal-window")[0],
            $(e).css({
                display: "none"
            }),
            $(e).modal("hide")
        }),
        $(document).on("input", ".modal form #subdomain", function(e) {
            var n, i, o, r, s, a;
            return clearTimeout(window.typingTimer),
            r = $("#subdomain")[0],
            s = $(r).val(),
            n = $("#submitBtn")[0],
            a = n.dataset.sessurl.replace("_SUB_", s),
            console.log("post url is " + a),
            o = $(this).parents("form")[0],
            $(o).attr("action", a),
            i = "/check/" + s,
            window.typingTimer = setTimeout(function() {
                return t(i)
            }, window.doneTypingInterval)
        }),
        t = function(t) {
            return $.ajax(t, {
                dataType: "json",
                type: "GET",
                cache: !1,
                success: function(t, e) {
                    return $("#submitBtn").prop("disabled", !1)
                },
                error: function(t, e, n) {
                    var i, o, r;
                    return console.log("Ajax error: " + e + " : " + n),
                    r = $("#subdomain")[0],
                    o = $(r).css("border-width"),
                    i = $(r).css("border-color"),
                    $(r).css({
                        border: "5px solid red"
                    }),
                    $("#submitBtn").prop("disabled", !0),
                    setTimeout(function() {
                        return $(r).css({
                            border: o + " solid " + i
                        })
                    }, window.doneTypingInterval)
                }
            })
        }
        ,
        $(document).on("ajax:success", function(t, e) {
            return e.robot ? $(".log").html("<br/><h3 class='sunyellowf'>Are you a robot?</h3>") : ($(".log").html("<br/><h3 class='sunyellowf'>Message sent!</h3>"),
            $(".form-control").val("")),
            $("#sendBtn").blur(),
            grecaptcha.reset(),
            !0
        }),
        $("form#messageForm[data-remote]").on("ajax:error", function(t, e, n, i) {
            return console.log(e.responseText),
            $(".log").text("Email cannot be sent at this time. Please email info@campkiosk.com directly."),
            !1
        })
    })
}
.call(this),
function() {
    var t, e, n, i, o;
    o = function(t, e) {
        return "error" !== e && "success" !== e && "notice" !== e && "warning" !== e ? $(".ajax-msg").addClass("flash alert-info").text(t) : $(".ajax-msg").addClass("flash alert-" + e).text(t),
        $(".ajax-msg").css("display", "block"),
        $(".ajax-msg").delay(3e3).slideUp("slow")
    }
    ,
    n = function(t, e, n) {
        return $("<button>").addClass("btn btn-xs btn-warning stateBtn").attr({
            "data-nextstate": t,
            "data-id": n,
            type: "submit",
            name: "button"
        }).text(e)
    }
    ,
    i = function(t) {
        return "new" !== t && "draft" !== t && "review" !== t && "active" !== t && "closed" !== t ? [{
            state: "draft",
            action: "Draft"
        }] : {
            "new": [{
                state: "draft",
                action: "Draft"
            }],
            draft: [{
                state: "review",
                action: "Review"
            }],
            review: [{
                state: "active",
                action: "Approve"
            }, {
                state: "draft",
                action: "Reject"
            }],
            active: [{
                state: "closed",
                action: "Close"
            }],
            closed: [{
                state: "active",
                action: "Reopen"
            }]
        }[t]
    }
    ,
    t = function() {
        return $("footer").append("<p>what do you want me to do?</p>")
    }
    ,
    e = function(t, e) {
        return "admin" === e ? !1 : "new" === t || "draft" === t ? !1 : !0
    }
    ,
    $(document).on("page:change", function() {
        return $('input[type="checkbox"]#col').click(function() {
            var t;
            return t = $(this).val(),
            $("#foo tr > *:nth-child(" + t + ")").toggle()
        }),
        $(document).on("click", "button.stateBtn", function(t) {
            var r, s, a;
            return a = $(this).data("nextstate"),
            s = $(this).data("id"),
            r = $(this).parent(),
            $.ajax("/invoices/" + s + ".json", {
                type: "PATCH",
                dataType: "json",
                data: {
                    invoice: {
                        state: a
                    }
                },
                error: function(t) {
                    return o("this is the error message", "error"),
                    alert("AJAX Error: " + t.statusText + " when changing invoice status ")
                },
                success: function(t) {
                    var l, u, c, d, h, p;
                    if (h = t.role,
                    o(t.msg, t.code),
                    ("warning" === t.code || "error" === t.code) && alert(t.msg),
                    $("#currentState").text(a),
                    $("#currentState").css("background", "yellow"),
                    setTimeout(function() {
                        return $("#currentState").css("background", "transparent")
                    }, 2e3),
                    d = i(a),
                    r.empty(),
                    e(a, h))
                        return !0;
                    for (l = 0,
                    u = d.length; u > l; l++)
                        p = d[l],
                        c = n(p.state, p.action, s),
                        r.append(c);
                    return !0
                }
            })
        })
    })
}
.call(this),
function() {
    $(document).on("page:change", function() {
        return $("#mapyear select#year").change(function() {
            var t, e;
            return e = this.value,
            t = function(t) {
                return $(".site_mark").removeClass("site_vacant_mark site_full_mark"),
                $.each(t, function(t, e) {
                    return $("#" + t).attr("alt", e),
                    $("#" + t).attr("title", e),
                    $("#" + t).addClass("site_full_mark")
                }),
                !0
            }
            ,
            $.get("/campground/population/" + e, {}, t, "json")
        })
    })
}
.call(this),
function() {
    var t, e, n;
    n = function(t, e, n) {
        return t.style.backgroundColor = e,
        null != n ? t.style.color = n : void 0
    }
    ,
    t = function() {
        var t, e, n, i, o, r, s, a, l, u, c, d, h;
        for (d = $(".pkg_header input.form-control"),
        i = 0,
        s = d.length; s > i; i++) {
            if (h = d[i],
            n = $(h),
            "" === n.val())
                return r = $(h).prev().text(),
                $("#error_explanation").text("ERROR: " + r + " cannot be blank"),
                n.css("border", "solid 5px red"),
                $("#error_explanation").css("visibility", "visible"),
                !1;
            $("#error_explanation").text(""),
            $("#error_explanation").css("visibility", "visible")
        }
        for (l = $("tr.question"),
        o = 0,
        a = l.length; a > o && (c = l[o],
        u = $(c).find(".q_dropzone"),
        !(u.length > 0)); o++)
            if (t = $(c).find(".growth input").first(),
            e = $(c).find(".dropzone"),
            u = $(c).find(".form-control"),
            "true" !== t.val()) {
                if ("" === u.val())
                    return $(u).css("border", "ridge 5px red"),
                    $("#error_explanation").text("ERROR: Question name cannot be blank"),
                    !1;
                if (0 === e.find("span.feetag").length)
                    return $(e).addClass("error_border"),
                    $("#error_explanation").text("ERROR: Fee items cannot be blank"),
                    !1
            }
    }
    ,
    e = function() {
        var t, e, n, i, o, r, s;
        for (o = $(".qpalette .feetag"),
        r = [],
        e = 0,
        n = o.length; n > e; e++)
            i = o[e],
            r.push(function() {
                var e, n, o, r;
                for (o = $(i).data("feeids"),
                r = [],
                e = 0,
                n = o.length; n > e; e++)
                    t = o[e],
                    s = $(".palette .feetag[data-fid=" + t + "]")[0],
                    r.push($(s).addClass("packaged"));
                return r
            }());
        return r
    }
    ,
    $(document).on("page:change", function() {
        return e(),
        $("#pelt").click(function() {
            return n(this, "#00aa00", "#FFFFFF"),
            $.ajax({
                url: "/packages/88.json"
            }).done(function(t) {
                return alert("hi")
            })
        }),
        $("input.btn").click(function() {
            return $("#results").text("hello")
        }),
        $("form#design").submit(function() {
            return t()
        }),
        $("input.form-control").keypress(function() {
            return $(this).css({
                border: "none"
            }),
            $("#error_explanation").css("visibility", "hidden")
        }),
        $(".feetag").click(function() {
            return $(this).toggleClass("changed")
        }),
        $(".qpalette .feetag").hover(function() {
            var t, e, n, i, o, r;
            for (n = $(this).data("feeids"),
            i = [],
            t = 0,
            e = n.length; e > t; t++)
                o = n[t],
                r = $(".palette .feetag[data-fid=" + o + "]")[0],
                $(r).toggleClass("unavail"),
                $(r).toggleClass("packaged"),
                i.push($(r).draggable = "false");
            return i
        }),
        $("#design select#package_year").change(function() {
            var t, e, n;
            return t = window.location,
            e = t.protocol + "//" + t.host + t.pathname,
            n = this.value,
            $.ajax("/packages/set_package_year", {
                type: "POST",
                dataType: "json",
                data: {
                    year: n
                },
                error: function(t) {
                    return alert("AJAX Error: " + t.statusText + " with year " + n)
                },
                success: function(n) {
                    return t.replace(e)
                }
            })
        })
    }),
    $(document).on("click", ".remove_row", function(t) {
        return $(this).parents(".question").css("background-color", "yellow"),
        $(this).prev("input[type=hidden]").val("true"),
        $(this).parents(".question").hide()
    }),
    $(document).on("click", ".add_fields", function(t) {
        var e, n;
        return e = (new Date).getTime(),
        n = new RegExp($(this).data("id"),"g"),
        $(this).parents("tr").before($(this).data("fields").replace(n, e)),
        t.preventDefault()
    })
}
.call(this),
function() {
    var t, e;
    $(document).on("page:change", function() {
        return $("div.section").click(function() {
            var t;
            return t = $(this).next(),
            $(t).slideToggle()
        })
    }),
    t = function(t) {
        return $("tr").not("thead tr").filter(function() {
            return $(this).text().toLowerCase().indexOf(t.toLowerCase()) < 0
        }).css("display", "none")
    }
    ,
    e = function(t) {
        return $("tr").not("thead tr").filter(function() {
            return $(this).text().toLowerCase().indexOf(t.toLowerCase()) >= 0
        }).css("display", "table-row")
    }
}
.call(this),
function() {
    $(document).on("page:change", function() {
        return $(".modal").on("hidden.bs.modal", function() {
            $(".modal-body").html("")
        }),
        $(".play").click(function() {
            var t, e, n;
            return e = $(this).data("file"),
            n = $(this).data("title"),
            t = function(t) {
                var e, i;
                return i = t.url,
                e = $(".modal-dialog")[0],
                $(".modal-body").html("<video id='vid' width='100%' height='auto' controls='' autoplay='' name='media'> <source src='" + t.url + "' type='video/mp4'> </video>"),
                $(".modal-title").text(n),
                !0
            }
            ,
            $.get("/video_url", {
                file: e
            }, t, "json")
        })
    })
}
.call(this),
function() {
    $(document).on("page:change", function() {
        return $("button#test").click(function() {
            var t, e;
            return t = $("#c-list").val(),
            e = $('input[name="separator"]:checked').val(),
            $.ajax("/setup/test", {
                type: "POST",
                dataType: "json",
                data: {
                    list: t,
                    separator: e
                },
                error: function(e) {
                    return alert("AJAX Error: " + e.statusText + " with text " + t)
                },
                success: function(t) {
                    return $.each(t.parsed_list, function(t, e) {
                        return $("#preview").append($("<div>").attr({
                            "class": "col-md-6"
                        }).append($("<div>").attr({
                            "class": "panel panel-default"
                        }).append($("<div>").attr({
                            "class": "panel-heading"
                        }).text("Camper " + t)).append($("<div>").attr({
                            "class": "panel-body"
                        }).append($("<dl>").attr({
                            id: "camper" + t,
                            "class": "dl-horizontal"
                        }))))),
                        $.each(e, function(e, n) {
                            return $("#camper" + t).append($("<dt>").text(n[0])).append($("<dd>").text(n[1]))
                        })
                    })
                }
            })
        }),
        $("button.season").click(function() {
            var t, e, n, i;
            return i = $(this).parent().children("input.new_year").first().val(),
            confirm("Are you sure you want to initialize records for year " + i + "?") ? (e = $(this).data("url"),
            console.log("initializing package " + i),
            n = $("span.new_year_message"),
            t = $("span#already_setup_year"),
            $(n).css({
                "background-color": "orange"
            }),
            $.ajax(e + ".json", {
                type: "POST",
                dataType: "json",
                data: {
                    year: i
                },
                error: function(t) {
                    return console.log(t),
                    alert("AJAX Error: " + t.statusText)
                },
                success: function(e) {
                    return console.log(e.name),
                    $(n).append("Success!"),
                    $(t).text(i),
                    $(n).fadeOut(2e3, "swing")
                }
            })) : void 0
        }),
        $("a.change_year").click(function() {
            return $(".change_year_form").slideToggle(),
            !1
        })
    })
}
.call(this),
function() {}
.call(this),
function() {
    var t;
    t = function(t) {
        var e, n, i, o;
        for (e = 0,
        n = t.length; n > e; e++)
            if (i = t[e],
            "0" === $(i).val())
                return o = $(i).parent().children().first(),
                $(o).attr("disabled", !0),
                !0
    }
    ,
    $(document).on("page:change", function() {
        return $("button#help").click(function() {
            return $(".help").toggle()
        }),
        $("button#debugbtn").click(function() {
            return $("p.debug").toggle()
        }),
        $('#stackform input[type="checkbox"]').click(function() {
            var t, e, n, i, o;
            return o = $(this).is(":checked") ? !0 : !1,
            t = $(this).parent().parent().next(),
            n = $(t).text(),
            n = n.replace("$", "").replace(",", ""),
            e = parseFloat(n),
            isNaN(e) && (e = 0),
            i = this.value,
            $.get("/fees/" + i + "/cost.json", function(n) {
                var i;
                return i = parseFloat(n.cost),
                isNaN(i) && (i = 0),
                o ? $(t).text("$" + (e + i).toFixed(2)) : $(t).text("$" + (e - i).toFixed(2))
            })
        }),
        $("#stackform .choices select").change(function() {
            var t, e, n, i;
            return t = $(this).parent().next(),
            n = $(t).text(),
            n = n.replace("$", "").replace(",", ""),
            e = parseFloat(n),
            isNaN(e) && (e = 0),
            i = this.value,
            "" === i ? $(t).text("$" + 0..toFixed(2)) : $.ajax("/fees/" + i + "/cost.json", {
                type: "GET",
                dataType: "json",
                error: function(e, n, i) {
                    return $(t).text("AJAX Error: " + n)
                },
                success: function(e, n, i) {
                    var o;
                    return o = parseFloat(e.cost),
                    isNaN(o) && (o = 0),
                    $(t).text("$" + o.toFixed(2))
                }
            })
        }),
        $('#stackform input[type="number"]').change(function() {
            var t, e, n, i, o, r, s, a, l, u;
            return t = $(this).closest("td").next()[0],
            i = $(t).text(),
            i = i.replace("$", "").replace(",", ""),
            n = parseFloat(i),
            isNaN(n) && (n = 0),
            l = this.dataset.orignum,
            a = $(this).val(),
            $(this).attr("data-orignum", a),
            r = a - l,
            u = $(this).parent().children().first(),
            "0" === a && $(u).attr("disabled", !0),
            "0" !== a && ($(u).attr("disabled", !1),
            $(this).attr("disabled", !1)),
            s = $(u).val(),
            "" === s ? $(t).text("$" + 0..toFixed(2)) : (o = this.dataset.cost,
            isNaN(o) && (o = 0),
            e = r * o,
            $(t).text("$" + (n + e).toFixed(2)))
        }),
        $("select#package_id").change(function() {
            var t, e, n;
            return t = window.location,
            e = t.protocol + "//" + t.host + "/stacks/new",
            n = this.value,
            $.ajax("/stacks/set_package", {
                type: "POST",
                dataType: "json",
                data: {
                    package_id: n
                },
                error: function(t) {
                    return alert("AJAX Error: " + t.statusText + " with package id " + n)
                },
                success: function(n) {
                    return t.replace(e)
                }
            })
        }),
        $("form#stackform").submit(function() {
            var e;
            return e = $('#stackform input[type="number"]'),
            t(e)
        })
    })
}
.call(this),
function() {
    $(document).on("page:change", function() {
        return $("#user_password").keyup(function() {
            return clearTimeout(window.typingTimer),
            window.typingTimer = setTimeout(function() {
                return checkPW("user")
            }, window.doneTypingInterval)
        }),
        $("#account_owner_attributes_password").keyup(function() {
            return clearTimeout(window.typingTimer),
            window.typingTimer = setTimeout(function() {
                return checkPW("owner")
            }, window.doneTypingInterval)
        }),
        $("#user_password_confirmation").keyup(function() {
            return clearTimeout(window.typingTimer),
            window.typingTimer = setTimeout(function() {
                return checkPWconf("user")
            }, window.doneTypingInterval)
        }),
        $("#account_owner_attributes_password_confirmation").keyup(function() {
            return clearTimeout(window.typingTimer),
            window.typingTimer = setTimeout(function() {
                return $("#account_owner_attributes_password_confirmation").val() ? checkPWconf("owner") : void 0
            }, window.doneTypingInterval)
        }),
        $("input").click(function() {
            return $("div.field_with_errors").children().unwrap()
        })
    })
}
.call(this),
$(document).on("page:change", function() {
    $("form#setup").submit(function() {
        return confirm("Are you sure?")
    }),
    $(".nav li").click(function() {
        $(this).addClass("active").siblings().removeClass("active")
    }),
    $("form").on("keypress", function(t) {
        return 13 == t.keyCode ? !1 : void 0
    }),
    $("#searchform").on("keyup", function(t) {
        thetext = $("#searchform input").val(),
        8 == t.keyCode ? showrows(thetext) : hiderows(thetext)
    })
});

