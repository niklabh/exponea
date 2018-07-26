# exponea
Exponea node.js bindings

## Installation
```
npm install exponea
```

## Tests
```
npm test
```

## Documentation
[REST API DOC](https://guides.exponea.com/article/rest-client-api/)

## Usage
```javascript
const exponea = require('exponea')

// Identifying customers (Add/update customer/lead)
exponea.publish([{
  name: exponea.
  customerId: '2342-wedasd-234aws-asd45d',  // customer/lead Id
  data: {                                   // custom user/lead data
    name: 'Alan paul',
    email: 'alan@gmail.com',
    phone: '0092838842222'
    // ...
    // ...
  }
}])

// Tracking customer events
exponea.publish([{
  name: exponea.
  customerId: '2342-wedasd-234aws-asd45d',  // customer/lead Id
  type: 'event'                             // custom event type
  data: {                                   // custom data
    item: 'Iphone'
    price: 15,
    number of items: 3
    // ...
    // ...
  }
}])
```



