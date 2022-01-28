## javascript sample from CampKiosk
# result of converting coffee script to javascript


Here is a coffeescript function to save a new campsite location:
```
# map page save button action
save_function = (event) ->
                n=event.data.c
                site_num=$('#input'+n).val()
                $.ajax '/sites.json',
                        type: 'POST'
```

Compare it to the generated javascript you can see in the browser when you create a campsite.
Note: a 'campground' is an account in campkiosk application containing a map, sites, campers and invoices, while a 'campsite' is a single site on the campground's map drawn as a small circle.

To create a campsite:
- Create a campground at https://www.campkiosk.com.
- Go to map page
- click anywhere on the map. A new site is created. A dialog appears at the bottom of the map for entering the site details.
- click 'save'. The site number is saved on the new site marker.
![Save dialog on map](/images/save_dialog.png)

Compare coffee script with javascript:
- open Chrome's inspect panel
- click on the Sources tab in the inspector
- open assets in the navigator
- select application-<id>.js
- click on Pretty
- search for the POST method on the /sites context

application.js.formatted:10807:
```
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
```

![Chrome inspect image](/images/chrome_inspect.png)
