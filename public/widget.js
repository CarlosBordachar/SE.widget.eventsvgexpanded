let fieldData,
    eventName,
    iconName,
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

    if(eventName == listener) {
        showEvent();
    }        
});

window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj.detail.fieldData;
    eventName = fieldData.eventName;
    iconName = fieldData.iconName;
});

function showEvent() {
    totalEvents += 1;
    const event = eventName;
    const icon = iconName;
  

    let element = `
    <svg class="icon-cls icon-cls-${event}" id="icon-${event}-${totalEvents}">
         <use xlink:href="#icon-${icon}"></use>
    </svg>`;
    console.log(element);
    $('.main-container').empty();
    $('.main-container').append(element);
}
