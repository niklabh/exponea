# exponea [![NPM version](https://badge.fury.io/js/exponea.png)](http://npmjs.org/package/exponea) [![CircleCI](https://circleci.com/gh/niklabh/exponea/tree/master.svg?style=shield)](https://circleci.com/gh/niklabh/exponea/tree/master)

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
Set EXPONEA_TOKEN environment variable to your project_id.
You can publish multiple bulk commands to exponea using publish function:

```javascript
const exponea = require('exponea')

// Identifying customers (Add/update customer/lead)
exponea.publish([{
  name: exponea.enums.CUSTOMERS,
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
  name: exponea.enums.EVENTS,
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

Command name can be either exponea.enums.CUSTOMERS or exponea.enums.EVENTS.
In case of EVENTS type is necessary.

