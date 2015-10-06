Trouble in the Angular2 Promised-lands
========

This sample demonstrates that the behaviour of the default Angular 2 exception handler, `EXCEPTION_BINDING`, gives rise to unexpected application behaviour.

The app outputs the following in the browser development console:

```text
EXCEPTION: Error during instantiation of Burner!.
app.js:44 wat?
angular2.js:18624 EXCEPTION: Error: crazy nightmare
app.js:47 wtf?
```

If you look at the code, there should be *no* circumstances where that `wtf?` is logged to the console (so long as we're talking about normal promises that obey the specs).

The probable reason for the weird behaviour is due to `EXCEPTION_BINDING` being configured to swallow exceptions instead of re-throwing them.

It is possible to override the default error handler, but it could be argued that the default handler shouldn't result in such broken behaviour.

The skeleton code/project is from [ng2-play](https://github.com/pkozlowski-opensource/ng2-play), where instructions can be found for running this sample.
