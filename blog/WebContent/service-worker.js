
self.addEventListener('activate', function (event) {

});

self.addEventListener('fetch', function (event) {

});

self.addEventListener('push', function (event) {

});


if ('serviceWorker' in navigator) {
    //console.log("Will the service worker register?");
    navigator.serviceWorker.register('service-worker.js')
      .then(function(reg){
        //console.log("Yes, it did.");
     }).catch(function(err) {
        //console.log("No it didn't. This happened:", err)
    });
 }

 function subscribe(serviceWorkerReg) {  
    serviceWorkerReg.pushManager.subscribe({userVisibleOnly: true})
    alert("in subscribe");
}

// The service worker running in background to receive the incoming push notifications
// A push has arrived ...
self.addEventListener('push', function(event) {
  // Since there is no payload data with the first version  
  // of push messages, we'll use some static content.
  // However you could grab some data from  
  // an API and use it to populate a notification
 
  console.log('Received a push message', event);
 
  var title = 'Design19 Blog';  
  var body = 'HEY! You\'ve got new unread articles on Web Design on Design19 Blog!';  
  var icon = 'design19.jpg';
 
self.registration.showNotification(title, {  
  body: body,  
  icon: icon
})  
});
 
 
// The user has clicked on the notification ...
self.addEventListener('notificationclick', function(event) {  
  // Android doesn't close the notification when you click on it  
  event.notification.close();
 
  // This looks to see if the current is already open and  focuses if it is  
  event.waitUntil(
    clients.matchAll({  
      type: "window"  
    })
    .then(function(clientList) {  
      for (var i = 0; i < clientList.length; i++) {  
        var client = clientList[i];  
        if (client.url == '/' && 'focus' in client)  
          return client.focus();  
      }  
      if (clients.openWindow) {
        return clients.openWindow('https://www.design19.org/blog/category/web-design/');  
      }
    })
  );
});

