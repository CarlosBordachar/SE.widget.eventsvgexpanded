let fieldData,
    parameters,
    totalEvents = 0;

window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) {
      return;
    }
    if (typeof obj.detail.event.itemId !== "undefined") {
        obj.detail.listener = "redemption-latest"
    }
    const listener = obj.detail.listener.split("-")[0];
    const event = obj.detail.event;

    if(parameters.eventName == listener) {
        addEvent(parameters.eventName, parameters.iconName);
    }        
});

window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj.detail.fieldData;
    parameters = getParameters();
});

function getParameters() {
    var result = 
    {
        eventName: fieldData.eventName,
        iconName: fieldData.iconName,
        colorIcon: fieldData.colorIcon,
        /* ITEMS is only for test */
        items: [
             { event: "follower",   icon:"heart"     }
            ,{ event: "subscriber", icon:"star"      }
            ,{ event: "redemption", icon:"artboard"  }
            ,{ event: "host",       icon:"device-tv" }
            ,{ event: "raid",       icon:"view-360"  }
            ,{ event: "cheer",      icon:"diamond"   }
            ,{ event: "tip",        icon:"loader"    }]
    };

    return result;
}

function addEvent(eventName, iconName) {
    totalEvents += 1;

    let element = `
    <svg class="icon-cls icon-cls-${eventName}" id="icon-${eventName}-${totalEvents}">
         <use xlink:href="#icon-${iconName}"></use>
    </svg>`;
    
    $('.main-container').empty();
    $('.main-container').append(element);
}


///*** Functions only for test page ***///
function fnOnLoad() {
    let eventsName = ['heart','star ','diamond','access-point','chart-radar','crown',
        'credit-card','desktop','device-tv','exchange','git-pull-request','glass',
        'loader','plug','radioactive','replace','repeat','refresh','route','shape',
        'sitemap','social','speakerphone','tournament','vector-triangle','vector','virus',
        'artboard','aspect-ratio','atom-2','bell-ringing','bulb','cast',
        'flame','git-compare','thumb-up','view-360'];

    eventsName.forEach(function(item, index, array) {
        let element = 
            `<div class="manage-widget-${item}" onclick="addEvent('${item}', '${item}')" >
                Simular <b>${item}</b>
            </div>`;

           $('.manage-widget').append(element);
    });

    // Test parameters
    fieldData = new Object();
    let params = getParameters();
    params.items.forEach(function(item, index, array) {
        let el =
            `<div class="manage-widget-${item.event}" onclick="addEvent('${item.event}', '${item.icon}')" >
                Simular Default <b>${item.event}</b>
            </div>`;

         $('.manage-widget').append(el);
    })     
}
