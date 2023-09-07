# HubModel

Goals of this library:

* fully type safe access to hubspot REST API to access all types in hubspot like contacts, deals, and especially including custom types

* code first approach to maintaining the types and property in hubspot. just like any standard ORM like prisma, you define all the types in code and then run a migration to update hubspot.


# FAQs

*Why create your own client instead of fixing the types of the existing hubspot client?*

Fixing existing hubspot client types was originally the approach but i had some issues with its API design, so felt i could kill 2 birds with 1 stone by diverging from the original client.

*What should i do if this hubspot client is missing a hubspot endpoint?*

Depends. Hubspot client has a lot of endpoints to cover, so instead of trying to replace all functionality, this library focuses on making the majority of the workflows intuitive with typescript and leaving the remaining workflows to the original hubspot client. If you need to use an endpoint that this library doesn't have, in the short term, I'd recommend using the hubspot client. In the long term, this library might want to support the endpoints so file a github ticket/discussion etc and we can discuss :)