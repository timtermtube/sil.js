# sil.js
<div style="text-align: left;"><a href="https://www.npmjs.com/package/siljs"><img src="https://img.shields.io/npm/v/siljs?style=flat-square"/></a></div>

<h2>SImple muLti-thread launcher in JavaScript, SIL.</h2>
Simple Multi-threading Launcher for Web. Simpler, and Faster.

# What is the origin of name?
It means thread and also light as "Sil". 
Sil (Korean: 실) means "thread" in English.1

# How to load?
on webpack-base Project:
```javascript
  /* ... */
  import SIL from "siljs" /* ES6 */
  import SIL from "https://timtermtube.github.io/sil.js/index.js" /* module tag in html */
  const SIL = require("siljs").default; /* CommonJS */ 
  
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
* Support webpack Module System
