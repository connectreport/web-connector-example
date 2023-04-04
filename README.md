# Web Connector Example
This repo provides an example web connector for use in ConnectReport 

The web connector is capable of retrieving data and visualizations from nearly any data source for use in ConnectReport. ConnectReport passes along metadata from the template and report task, and the web connector is responsible for fulfilling the requests. 

### Architecture 
![ConnectReport Web connector architecture](https://user-images.githubusercontent.com/13279201/229666195-049a0c1c-809f-4ba5-97f7-01fdcf1dc19a.png)

A web connector is comprised of a web connector service and the web connector itself, a point of integration between the web connector service and ConnectReport's data interface.

The web connector service supporting a web connector should be solely accessible to ConnectReport - you should restrict it in the same way as you would a database. ConnectReport passes along user context and filter criteria to the web connector endpoints and it is the responsibility of the web connector to account for these and enforce access control.   

## Routes 
A web connector service responds to a documented set of API requests that come from the ConnectReport rendering engine. These routes are detailed below.  

### `POST /getMetadata`
Used to deliver metadata to the UI to support report authoring.  Receives a [User](source/models/User.ts) object indicating the current user. It should respond with a [MetaDataResponse](source/models/MetaDataResponse.ts)

### `POST /getFieldValues`
Used to retrieve list of fields values to filter on in UI. Receives a [User](source/models/User.ts) object indicating the user running the report and a [FieldValuesRequest](source/models/FieldValuesResponse.ts) options object. It should respond with a [FieldValuesResponse](source/models/FieldValuesResponse.ts)

### `POST /getTable`
Used to fulfill tabular data requests. Receives a [User](source/models/User.ts) object indicating the user running the report and a [TableRequest](source/models/TableRequest.ts) options object. It should respond with a [TableResponse](source/models/TableResponse.ts)

### `GET /loadVisualization`
Used to load external visualizations. Upon rendering a visualization associated with a web connector, ConnectReport opens a headless browser session to an HTML page hosted by the web connector that is responsible for rendering visualizations. ConnectReport passes along several query string parameters documented below which are used to identify the appropriate visualization to load and the filters that must be applied, among other metadata. To support this, the web connector service must handle a request to the path `/loadVisualization` and return an HTML response. See [example loadVisualization handler](public/loadVisualization.js).

The loadVisualization page receives the following URL parameters, which can be accessed from the page's JavaScript context:
- `docId`: the ID of the web connector
- `vizId`: the visualization ID configured in the template. You can use this to determine the appropriate visualization to render. 
- `selections`: the effective selections for the visualization. This should be handled to appropriately filter the visualization data
- `width`: the intended width of the visualization. The browser context will also have this viewport width
- `height`: the intended height of the visualization. The browser context will also have this viewport width

Additionally, the loadVisualization page is automatically injected with two callback functions - One of these functions must be called before the visualization timeout for the visualization to succeed or fail. These functions are available in the loadVisualization page's JavaScript context:
- completedVizLoad(): used to indicate to ConnectReport that the visualization is completely rendered
- vizLoadError(error: string): used to ConnectReport that the visualization has encountered an error. The error argument is surfaced in the final output. 

The loadVisualization page is also automatically configured to attach an `X-CR-USER` header to every request it makes within the page context. This allows you to identify the user in upstream requests. Services the loadVisualization page accesses that rely on this header should be appropriately restricted. 

## Running the example
1. Create a web connector in ConnectReport (TODO: add docs link). 
2. Run the server 
```
git clone https://github.com/connectreport/web-connector-example.git
cd ./web-connector-example
npm i 
npm run verbose 
```
3. The ConnectReport backend must be able to address your web connector service instance. You can use a tool like [ngrok](https://ngrok.com/) to quickly host your web connector service instance from your local machine for development or deploy it using your preferred cloud provider. Once hosted or tunneled via ngrok, update the base URL of your web connector. 
4. Create a template that utilized the web connector and observe the requests logged by the example connector. Example output:
```
Received getTable request {
  fields: [
    {
      fieldDef: '[Total Sales]',
      fieldType: 'measure',
      columnIndex: 0
    },
    {
      fieldDef: '[Territory]',
      fieldType: 'dimension',
      columnIndex: 0
    }
  ],
  filterSets: [],
  selections: [
    {
      fieldName: 'Year',
      fieldDef: '[Year]',
      fieldValues: [
        {
          text: 2023
        },
         {
          text: 2022
        }
      ],
      selectAll: false
    }
  ]
} {
  username: 'jsmith',
  id: '848b53aa-258d-432f-82db-bbf63ee2c81b',
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@example.com'
}
Received load visualization request {
  docId: '89db07e5-b87c-4f8a-94e2-623a4355fee1',
  vizId: 'sales-line-chart',
  width: '686',
  height: '298',
  selections: '[{"fieldName":"Year","fieldDef":"[Year]","fieldValues":[{"text":2023},{"text":2022}],"selectAll":false}]'
}
```

