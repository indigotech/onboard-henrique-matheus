# TaqFood
TaqFood is an app for odering food directly from your phone that offers a several options of restaurants
## Enviroment and Tools
This aplication was designed using React-Native with a Typescript layout. Here are some tools it uses:
- React (v17.0.2)
- React-native (v0.68.1)
- Typescript (v4.4.4)
- Node.js (v14.12.0)
- Android Studio (v11.0.10)
- Xcode (v12.5.1)
- eslint (v7.32.0)
- Prittier (v2.6.2)

## Steps to run and debug
Before running the aplication, the server must be initialized. On the root of the project, run:
```Bash
npm start
```
Now on another terminal, run:
```Bash
npm [enviroment]
```
Where `[enviroment]` refers to the operational system you want ro run the aplication: `android` or `ios`. This command will install and open the aplication on your device. You can use it with a physical device connected via USB or with an emulator provided by [Android Studio](https://developer.android.com/studio?gclid=Cj0KCQjwpcOTBhCZARIsAEAYLuVvGi22niobyp8Z0VG_bEN0av-nllXOMi0mnAIobjI5-c5kpTtNmrgaAno2EALw_wcB&gclsrc=aw.ds) or [Xcode](https://developer.apple.com/xcode/).

This project also comes with eslint and prettier and to use them, run:
```Bash
npm lint
```
