## Introduction

Deutsche Boerse Developer portal offers a set of Application Programming Interfaces (APIs) that give you the ability to incorporate Deutsche Boerse functionalities into your applications and get access to valuable data leveraging Deutsche Boerse data assets and reducing time to market for launching new products.

This guide describes how you can get credentials to access the APIs, create an application, and access the repository of best practices and code samples.


## Credentials

The Developer portal uses simple and effective authentication and authorization methods. Based on the APIs you select, use one of the following two standard and supported authentication methods for calling the APIs:

Two-Way SSL - Mutual Authentication with credentials

Oauth2 -  Specific authorization flows for web applications, desktop applications, mobile phones, and living room devices

API Key - Public key specifically generated for a registered user.

## Application development

Once you have successfully logged in, you can start working on your application.

Deutsche Boerse Developer Portal provides sample code for major development platforms to help you get started.

You can use the documentation endpoints throughout your application development cycle.


## UI/UX best practices

User Interface (UI) style guides and User Experience (UX) are available in the UI/UX repository section.

[![UI Design](https://i.ytimg.com/vi/SjeWHbsAMlU/hqdefault.jpg?custom=true&w=336&h=188&stc=true&jpg444=true&jpgq=90&sp=68&sigh=7KH75VywYhNLRSC42LKvAQplzcs)](https://youtu.be/Q8TXgCzxEnw "UI design")

[Click on the picture above to launch a video]

## Sample code

### Writing an API

This sample shows you how to implement a simple REST API in Java that handles three different HTTP request methods (i.e. delete, get and post).

```js
@RestResource(urlMapping='/Account/*')
global with sharing class MyRestResource {

    @HttpDelete
    global static void doDelete() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        String accountId = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
        Account account = [SELECT Id FROM Account WHERE Id = :accountId];
        delete account;
    }

    @HttpGet
    global static Account doGet() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        String accountId = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
        Account result = [SELECT Id, Name, Phone, Website FROM Account WHERE Id = :accountId];
        return result;
    }

  @HttpPost
    global static String doPost(String name,
        String phone, String website) {
        Account account = new Account();
        account.Name = name;
        account.phone = phone;
        account.website = website;
        insert account;
        return account.Id;
    }
}
```


### Consuming an API

The following snippet shows how to call a REST API endpoint in Javascript (Node) based on a simplified HTTP client:

```js
var options = {
  host: url,
  port: 80,
  path: '/resource?id=foo&bar=baz',
  method: 'POST'
};

http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
}).end();

// Call an URL
http.request({ url: 'https://www.dbg-digital-platform/accounts/v4.0/'})
```
