const webpush = require('web-push');

// console.log(webpush.generateVAPIDKeys());

const vapidKeys = {
    publicKey: '<YOUR_PUBLIC_KEY>',
    privateKey: '<YOUR_PRIVATE_KEY>',
};

// get client subscription config from db
const subscription = {
    endpoint: '<CLIENT_ENDPOINT>',
    expirationTime: null,
    keys: {
        p256dh: '<CLIENT_P256DH>',
        auth: '<CLIENT_AUTH>',
    },
};

const payload = {
    notification: {
        title: 'Title',
        body: 'This is my body',
        icon: 'assets/icons/icon-384x384.png',
        actions: [
            { action: 'bar', title: 'Focus last' },
            { action: 'baz', title: 'Navigate last' },
        ],
        data: {
            onActionClick: {
                default: { operation: 'openWindow' },
                bar: {
                    operation: 'focusLastFocusedOrOpen',
                    url: '/signin',
                },
                baz: {
                    operation: 'navigateLastFocusedOrOpen',
                    url: '/signin',
                },
            },
        },
    },
};

const options = {
    vapidDetails: {
        subject: 'mailto:example_email@example.com',
        publicKey: vapidKeys.publicKey,
        privateKey: vapidKeys.privateKey,
    },
    TTL: 60,
};

// send notification
webpush.sendNotification(subscription, JSON.stringify(payload), options)
    .then((_) => {
        console.log('SENT!!!');
        console.log(_);
    })
    .catch((_) => {
        console.log(_);
    });

