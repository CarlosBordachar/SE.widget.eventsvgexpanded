let includeFollowers = true,
    includeSubs = true/*,
    includeRedemptions = true,
    includeHosts = true,
    includeRaids = true,
    includeTips = true,
    includeCheers = true*/;

let totalEvents = 0;

window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) {
      return;
    }
    if (typeof obj.detail.event.itemId !== "undefined") {
        obj.detail.listener = "redemption-latest"
    }
    const listener = obj.detail.listener.split("-")[0];
    const event = obj.detail.event;

    if (listener === 'follower') {
        if (includeFollowers) {
            addFollowEvent();
        }
    } else if (listener === 'subscriber') {
        if (includeSubs) {
            addSubEvent();
        }
    } /*else if (listener === 'redemption') {
        if (includeRedemptions) {
            addRedemptionEvent();
        }
    } else if (listener === 'host') {
        if (includeHosts) {
            addHostEvent();
        }
    } else if (listener === 'raid') {
        if (includeRaids) {
            addRaidEvent();
        }
    } else if (listener === 'cheer') {
        if (includeCheers) {
            addCheerEvent();
        }
    } else if (listener === 'tip') {
        if (includeTips) {
            addTipEvent();
        }
    }*/
});

function addFollowEvent() {
    totalEvents += 1;    
    let element = `
    <svg class="icon icon-follow" id="icon-follow-${totalEvents}">
         <use xlink:href="#icon-follow"></use>
    </svg>`;
    
    $('.main-container').empty();
    $('.main-container').append(element);
}

function addSubEvent() {
    totalEvents += 1;    
    let element = `
    <svg class="icon icon-sub" id="icon-sub-${totalEvents}">
         <use xlink:href="#icon-sub"></use>
    </svg>`;
    
    $('.main-container').empty();
    $('.main-container').append(element);
}