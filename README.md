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
  import SIL from "sil.js" /* ES6 */
  const SIL = require("sil.js").default; /* CommonJS */ 
  
  const myThread = SIL.newThread((a) => {console.log(a+a**2)}, "WorkingAnt", [15]);
  /* ... */ 
```

# Guides
https://github.com/timtermtube/sil.js/wiki
