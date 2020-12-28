let includeFollowers = true,
    includeSubs = true,
    includeRedemptions = true,
    includeHosts = true,
    includeRaids = true,
    includeTips = true,
    includeCheers = true;

let followIcon = 'follow',
    subIcon = 'sub',
    cheerIcon = 'cheer',
    redemptionIcon = 'redemption',
    hostIcon = 'host',
    raidIcon = 'raid',
    tipIcon = 'tip';

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

    let result = parameters
        .filter(function(item) { return item.event == listener; });
           
    if(result && result.active)
        addEvent(result.icon);

    /*
    if (listener === 'follower') {
        if (includeFollowers) {
            addEvent(followIcon);
        }
    } else if (listener === 'subscriber') {
        if (includeSubs) {
            addEvent(subIcon);
        }
    } else if (listener === 'redemption') {
        if (includeRedemptions) {
            addEvent(redemptionIcon);
        }
    } else if (listener === 'host') {
        if (includeHosts) {
            addEvent(hostIcon);
        }
    } else if (listener === 'raid') {
        if (includeRaids) {
            addEvent(raidIcon);
        }
    } else if (listener === 'cheer') {
        if (includeCheers) {
            addEvent(cheerIcon);
        }
    } else if (listener === 'tip') {
        if (includeTips) {
            addEvent(tipIcon);
        }
    }
    */
});

window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj.detail.fieldData;
    loadWidget();
});

function getParameters() {
    var result = 
    {
        items: [
             { event: "follower",   defaultIcon:"follow",    active: fieldData.includeFollowers == "yes",   icon: fieldData.iconFollowers,   color: fieldData.colorFollowers, }
            ,{ event: "subscriber", defaultIcon:"sub",       active: fieldData.includeSubs == "yes",        icon: fieldData.iconSubs,        color: fieldData.colorSubs, }
            ,{ event: "redemption", defaultIcon:"artboard",  active: fieldData.includeRedemptions == "yes", icon: fieldData.iconRedemptions, color: fieldData.colorRedemptions, }
            ,{ event: "host",       defaultIcon:"device-tv", active: fieldData.includeHosts == "yes",       icon: fieldData.iconHosts,       color: fieldData.colorHosts, }
            ,{ event: "raid",       defaultIcon:"view-360",  active: fieldData.includeRaids == "yes",       icon: fieldData.iconRaids,       color: fieldData.colorRaids, }
            ,{ event: "cheer",      defaultIcon:"cheer",     active: fieldData.includeCheers == "yes",      icon: fieldData.iconCheers,      color: fieldData.colorCheers, }
            ,{ event: "tip",        defaultIcon:"loader",    active: fieldData.includeTips == "yes",        icon: fieldData.iconTips,        color: fieldData.colorTips, }]
    };

    return result;
}

function loadWidget() {
    parameters = getParameters();
}

function addEvent(eventName, defaultIcon, iconName) {
    totalEvents += 1;
    let icon = defaultIcon;
    if(iconName) icon = iconName;
    
    let element = `
    <svg class="icon icon-cls-${eventName}" id="icon-${eventName}-${totalEvents}">
         <use xlink:href="#icon-${icon}"></use>
    </svg>`;
    
    $('.main-container').empty();
    $('.main-container').append(element);
}


///*** Functions only for test page ***///
function fnOnLoad() {
    let eventsName = ['follow','sub ','cheer','access-point','chart-radar','crown',
        'credit-card','desktop','device-tv','exchange','git-pull-request','glass',
        'loader','plug','radioactive','replace','repeat','refresh','route','shape',
        'sitemap','social','speakerphone','tournament','vector-triangle','vector','virus',
        'artboard','aspect-ratio','atom-2','bell-ringing','bulb','cast',
        'flame','git-compare','thumb-up','view-360'];

    eventsName.forEach(function(item, index, array) {
        let element = 
            `<div class="manage-widget-${item}" onclick="addEvent('${item}', '${item}', '${item}')" >
                Simular <b>${item}</b>
            </div>`;

           $('.manage-widget').append(element);
    });

    // Test parameters
    fieldData = new Object();
    let params = getParameters();
    params.items.forEach(function(item, index, array) {
        let el =
            `<div class="manage-widget-${item.event}" onclick="addEvent('${item.event}', '${item.defaultIcon}')" >
                Simular Default <b>${item.event}</b>
            </div>`;

         $('.manage-widget').append(el);
    })     
}

