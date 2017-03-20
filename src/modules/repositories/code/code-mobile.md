## 1. Native mobile development for Apple devices (i.e. iOS)

<img src="http://www.mailshark.com.au/wp-content/uploads/2014/11/MailShark-Apple-iOS-Logo.jpg" width="250px"/>


The following code snippet show how to call REST apis using Swift language:

```swift
private class DefaultAPICaller: APICaller {
    
    private let kAccountsURL = "https://dbpgo.herokuapp.com/accounts"
    private let kBalancesURL = "https://dbpgo.herokuapp.com/balances/query"
    
    private let sessionManager: SessionManager = {
        let configuration = URLSessionConfiguration.default
        configuration.timeoutIntervalForRequest = 20
        
        return SessionManager(configuration: configuration)
    }()
    
    func loadAccounts(callback: @escaping AccountsCallback) -> CancellableRequest {
        let dataRequest = sessionManager.request(kAccountsURL).responseJSON { response in
            if let result = response.result.value {
                let json = JSON(result)
                let accounts = Account.toNonNilAccounts(jsonArray: json)
                callback(accounts, nil)
            } else {
                callback([], NSError(domain: "", code: 0, userInfo: nil))
            }
        }
        
        return CancellableRequest(dataRequest: dataRequest)
    }
    
    func loadBalances(account: String, callback: @escaping BalancesCallback) -> CancellableRequest {
        let callingURL = "\(kBalancesURL)?account=\(account)"
        let dataRequest = sessionManager.request(callingURL).responseJSON { response in
            if let result = response.result.value {
                let json = JSON(result)
                let balances = Balance.toNonNilBalances(jsonArray: json)
                callback(balances, nil)
            } else {
                callback([], NSError(domain: "", code: 0, userInfo: nil))
            }
        }
        
        return CancellableRequest(dataRequest: dataRequest)
    }
}
```

![](https://github.com/Aggouri/dbp-ios/raw/master/readme_assets/accounts.png?raw=true)
![](https://github.com/Aggouri/dbp-ios/raw/master/readme_assets/balances.png?raw=true)

Please click on the following picture to access the complete source code: <a href="https://github.com/Aggouri/dbp-ios" target="_new"><img src="https://2.bp.blogspot.com/-G9Q82BxIPHo/VzWZqS3vnZI/AAAAAAAAAYE/v5xHnpVtVhkZlNIsV9ObeuniNoBz-t5DQCLcB/s320/github-bb449e0ffbacbcb7f9c703db85b1cf0b.png" /></a>

<br />
<br />

## 2. Native development for mobile (iOS/Android) with same code base

<img src="http://80limit.com/assets/react-native-447d578b20d44f46f24982a23f09d3cf99cd39a6059c6c3474292618545833c0.svg" width="250px"/>

React Native lets you build mobile apps using only JavaScript. 
It uses the same design as React, letting you compose a rich mobile UI from declarative components.
 
With React Native, you don't build a “mobile web app”, an “HTML5 app”, or a “hybrid app”. 
You build a real mobile app that's indistinguishable from an app built using Objective-C or Java. 
React Native uses the same fundamental UI building blocks as regular iOS and Android apps. 
You just put those building blocks together using JavaScript and React.

```javascript
import React, { Component } from 'react';
import { Image, ScrollView, Text } from 'react-native';

class AwkwardScrollingImageWithText extends Component {
  render() {
    return (
      <ScrollView>
        <Image source={{uri: 'https://i.chzbgr.com/full/7345954048/h7E2C65F9/'}} />
        <Text>
          On iOS, a React Native ScrollView uses a native UIScrollView.
          On Android, it uses a native ScrollView.

          On iOS, a React Native Image uses a native UIImageView.
          On Android, it uses a native ImageView.

          React Native wraps the fundamental native components, giving you
          the performance of a native app, plus the clean design of React.
        </Text>
      </ScrollView>
    );
  }
}
```

<img src="https://github.com/bidispot/dbp-react-native/raw/master/screenshots/ios.png?raw=true" width="400" />

Please click on the following picture to access the complete source code: <a href="https://github.com/bidispot/dbp-react-native" target="_new"><img src="https://2.bp.blogspot.com/-G9Q82BxIPHo/VzWZqS3vnZI/AAAAAAAAAYE/v5xHnpVtVhkZlNIsV9ObeuniNoBz-t5DQCLcB/s320/github-bb449e0ffbacbcb7f9c703db85b1cf0b.png" /></a>
