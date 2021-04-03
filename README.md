# sil.js
<div style="text-align: left;"><a href="https://www.npmjs.com/package/siljs"><img src="https://img.shields.io/npm/v/siljs?style=flat-square"/></a></div>

<h2>SImple muLti-thread launcher in JavaScript, SIL.</h2>
Simple Multi-threading Launcher for Web. Simpler, and Faster.

# Before to Read
This library is going to be experimental and unstable until v0.0.4.
so It's going to have many updates until v0.0.4.

# What is the origin of name?
It means thread and also light as "Sil". 
Sil (Korean: 실) means "thread" in English.

# How to load?
on webpack-base Project:
```javascript
  /* ... */
  import _SIL from "siljs" /* ES6 */
  import _SIL from "https://timtermtube.github.io/sil.js/index.js" /* module tag in html */
  const _SIL = require("siljs"); /* CommonJS */ 
  
  const SIL = _SIL.default;
  
  const myThread = SIL.newThread((a) => {return a+a*2}, "WorkingAnt", [15], (x) => { /* When returned, It'll be worked */ console.log(x.data)});
  /* ... */ 
```

# Guides
https://github.com/timtermtube/sil.js/wiki

# Supports
* Function as new Thread
* Get return datas from new thread

# TODO (0.0.4) 
* Support Async
