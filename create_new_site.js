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
