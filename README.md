# Web Connector Example
This repo provides an example web connector for use in ConnectReport 

The web connector is capable of retrieving data and visualizations from nearly any data source for use in ConnectReport. ConnectReport passes along metadata from the template and report task, and the web connector is responsible for fulfilling the requests. 

### Architecture 
![ConnectReport Web connector architecture](https://user-images.githubusercontent.com/13279201/229666195-049a0c1c-809f-4ba5-97f7-01fdcf1dc19a.png)

A web connector is comprised of a web connector service and the web connector itself, a point of integration between the web connector service and ConnectReport's data interface.

The web connector service supporting a web connector should be solely accessible to ConnectReport - you should restrict it in the same way as you would a database. ConnectReport passes along user context and filter criteria to the web connector endpoints and it is the responsibility of the web connector to account for these and enforce access control.   

## Supported handlers 
### getMetadata
Used to deliver metadata to the UI to support report authoring.  Receives a [User](source/models/User.ts) object indicating the current user. It should respond with a [MetaDataResponse](source/models/MetaDataResponse.ts)

### getFieldValues
Used to retrieve list of fields values to filter on in UI. Receives a [User](source/models/User.ts) object indicating the user running the report and a [FieldValuesRequest](source/models/FieldValuesResponse.ts) options object. It should respond with a [FieldValuesResponse](source/models/FieldValuesResponse.ts)

### getTable
Used to fulfill tabular data requests. Receives a [User](source/models/User.ts) object indicating the user running the report and a [TableRequest](source/models/TableRequest.ts) options object. It should respond with a [TableResponse](source/models/TableResponse.ts)

### loadVisualization
Used to load external visualizations. Upon rendering a visualization from a web connector, ConnectReport opens a headless browser session to the loadVisualization page provided in the web connector. 

The loadVisualization page receives the following URL parameters, which can be accessed in the page's JavaScript context:
- docId: the ID of the web connector
- vizId: the visualization ID configured in the template. You can use this to determine the appropriate visualization to render. 
- selections: the effective selections for the visualization. This should be handled to appropriately filter the visualization data
- width: the intended width of the visualization. The browser context will also have this viewport width
- height: the intended height of the visualization. The browser context will also have this viewport width

Additionally, the loadVisualization page is automatically injected with two callback functions which can be called  in the page's JavaScript context:
- completedVizLoad(): used to indicate to ConnectReport that the visualization is completely rendered
- vizLoadError(error: string): used to ConnectReport that the visualization has encountered an error. The error argument is surfaced in the final ouput. 

The loadVisualization page is also automatically configured to attach an `X-CR-USER` header to every request it makes within the page context. This allows you to identify the user in upstream requests. Services the loadVisualization page accesses that rely on this header should be appropriately restricted. 
