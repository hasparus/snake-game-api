parcelRequire=function(e,r,n,t){function i(n,t){function o(e){return i(o.resolve(e))}function c(r){return e[n][1][r]||r}if(!r[n]){if(!e[n]){var l="function"==typeof parcelRequire&&parcelRequire;if(!t&&l)return l(n,!0);if(u)return u(n,!0);if(f&&"string"==typeof n)return f(n);var p=new Error("Cannot find module '"+n+"'");throw p.code="MODULE_NOT_FOUND",p}o.resolve=c;var a=r[n]=new i.Module(n);e[n][0].call(a.exports,o,a,a.exports,this)}return r[n].exports}function o(e){this.id=e,this.bundle=i,this.exports={}}var u="function"==typeof parcelRequire&&parcelRequire,f="function"==typeof require&&require;i.isParcelRequire=!0,i.Module=o,i.modules=e,i.cache=r,i.parent=u;for(var c=0;c<n.length;c++)i(n[c]);if(n.length){var l=i(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):t&&(this[t]=l)}return i}({3:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("better-sqlite3"),t=s(e),r=require("fs");function s(e){return e&&e.__esModule?e:{default:e}}var u="./.data",a="sqlite.db";(0,r.existsSync)(u)||(0,r.mkdirSync)(u);var d=new t.default(u+"/"+a);exports.default=d;
},{}],2:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.create=s,exports.list=d;var e=require("./database"),t=r(e);function r(e){return e&&e.__esModule?e:{default:e}}var a=function(e){return"number"==typeof e.created_at&&"number"==typeof e.value&&"string"==typeof e.player?e:null};t.default.prepare("\n  CREATE TABLE IF NOT EXISTS scores (\n    player      varchar,\n    value       integer,\n    created_at  timestamp NOT NULL,\n    PRIMARY KEY (player, created_at)\n  );").run();var n=t.default.prepare("\n  INSERT INTO scores (player, value, created_at)\n    VALUES (@player, @value, @created_at)\n");function s(e,t){if(!e.body)return t.status(400).send({message:"Body can't be empty."});var r=a(e.body);if(!r)return t.status(400).send({message:"Body is not a Score."});try{n.run(r)}catch(e){return t.status(500).send()}return t.status(200).send()}var u=t.default.prepare("\n  SELECT * FROM scores\n");function d(e,t){try{return t.status(200).send(u.all())}catch(e){return t.status(500).send()}}
},{"./database":3}],1:[function(require,module,exports) {
"use strict";var e=require("body-parser"),r=i(e),o=require("express"),s=u(o),n=require("./scores"),t=i(n);function u(e){return e&&e.__esModule?e:{default:e}}function i(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=e[o]);return r.default=e,r}var l="v1";console.log("Running.");var a=(0,s.default)();a.use(r.json()),a.post("/"+l+"/scores",t.create),a.get("/"+l+"/scores",t.list);var c=a.listen(void 0,function(){console.log("Your app is listening on "+c.address().port)});
},{"./scores":2}]},{},[1], null)
//# sourceMappingURL=/server.map