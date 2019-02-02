!function(){"use strict";document.getElementById("mode").innerHTML=onerStorage.supportStorage?"localStorage可用":"localStorage不可用";var e=1,t=function(){return e++};describe("onerStorage v3.0.0 Unit Test",function(){describe("static",function(){it("version v3.0.0",function(){expect(onerStorage.version).to.equal("3.0.0")}),it("supportStorage",function(){expect(onerStorage.supportStorage).to.be.a("boolean")})}),describe("`data/set/get` method",function(){var e;beforeEach("reset",function(){e=onerStorage({type:"localStorage",key:"foo"})}),afterEach("clear",function(){e.destroy()}),it("`data` method, then get value",function(){e.data({foo:"x"}),expect(e.get("foo")).to.be("x"),expect(JSON.stringify(e.get())).to.be('{"foo":"x"}')}),it("`data` method + `set` method，then get value",function(){e.data({foo:"x"}),e.set("bar.y","y"),expect(e.get("bar.y")).to.be("y"),console.log("JSON.stringify(ls.get())",JSON.stringify(e.get())),expect(JSON.stringify(e.get())).to.be('{"foo":"x","bar":{"y":"y"}}')})}),describe("`set/has` method",function(){var e;beforeEach("reset",function(){e=onerStorage({type:"localStorage",key:"foo"})}),afterEach("clear",function(){e.destroy()}),it("`has` method without any argument: throw error",function(){e.set("foo","x");var t=function(){e.has()};expect(t).to.throwError()}),it("`has` method with `key`: has value",function(){e.set("foo","x");var t=e.has("foo");expect(t.has).to.be(!0),expect(t.value).to.be("x")}),it("`has` method with `key`: no value",function(){e.set("foo","x");var t=e.has("boo");expect(t.has).to.be(!1),expect(t.value).to.be(undefined)}),it("`has` method with `path`: has value",function(){e.set("foo.y","y");var t=e.has("foo");expect(t.has).to.be(!0),expect(t.value.y).to.be("y")}),it("`has` method with `path`: no value",function(){e.set("foo.y","y");var t=e.has("foo.y.z");expect(t.has).to.be(!1),expect(t.value).to.be(undefined)})}),describe("`set/get` method",function(){var e;beforeEach("reset",function(){e=onerStorage({type:"localStorage",key:"foo"})}),afterEach("clear",function(){e.destroy()}),it("`get` method without `key|path` argument should return all data",function(){e.set("foo","x"),expect(JSON.stringify(e.get())).to.be('{"foo":"x"}')}),it("`get` method with `key`",function(){e.set("foo","x"),expect(e.get("foo")).to.be("x")}),it("`get` a false like value",function(){e.set("foo",0),expect(e.get("foo")).to.be(0)}),it("`get` with fallback value",function(){expect(e.get("foo","x")).to.be("x")}),it("`set` method with wrong `path`",function(){e.set("foo","x");var t=function(){e.set("foo.boo","y")};expect(t).to.throwError(),expect(JSON.stringify(e.get())).to.be('{"foo":"x"}')}),it("`get` method with `\\\\ path`",function(){e.set("x.y\\.y.z","x"),expect(e.get("x.y\\.y.z")).to.be("x")}),it("`set` method with `undefined` value",function(){e.set("foo",undefined),expect(JSON.stringify(e.get())).to.be("{}")}),it("setting non-string for the key, should throw error",function(){var t=onerStorage({type:"variable",key:"foo"}),o=function(){e.set(!0,{dev:!0,pro:!1})};expect(o).to.throwError(),t.destroy()})}),describe("`set/sure` method",function(){it("throw error when get undefined",function(){var e=onerStorage({type:"localStorage",key:"foo"}),t=function(){e.sure("foo.b")};expect(t).to.throwError()})}),describe("`set/remove` method",function(){var e,t={x:{y:{z:"z",zz:"zz"}}};beforeEach("reset",function(){e=onerStorage({type:"localStorage",key:"foo"})}),afterEach("clear",function(){e.destroy()}),it("remove partial data by path",function(){e.set("foo",t),e.remove("foo.x.y.z"),expect(e.get("foo.x.y.zz")).to.be("zz")}),it("remove complete data by path",function(){e.set("foo",t),e.remove("foo.x.y"),expect(JSON.stringify(e.get("foo.x"))).to.be("{}")}),it("remove by a un-existed path",function(){e.set("foo",t),e.remove("foo.boo"),expect(JSON.stringify(e.get("foo"))).to.be(JSON.stringify(t))}),it("remove all data",function(){e.set("foo",t),e.remove(),expect(JSON.stringify(e.get())).to.be("{}")})}),describe("destroy",function(){it("call method after `destroy` should throw error",function(){var e=onerStorage({type:"localStorage",key:"foo"});e.set("foo","x"),e.destroy();var t=function(){e.get()};expect(t).to.throwError()})}),describe("`asyncSet/asyncGet` method",function(){var e;beforeEach("reset",function(){e=onerStorage({type:"localStorage",key:"foo"})}),afterEach("clear",function(){e.destroy()}),it("`asyncGet` method without `key` argument should return all data",function(t){e.asyncSet("foo","x").then(function(){e.asyncGet().then(function(e){expect(JSON.stringify(e)).to.be('{"foo":"x"}'),t()})})}),it("`asyncSet` method with wrong `path`",function(t){e.set("foo","x"),e.asyncSet("foo.boo","y").then(function(){})["catch"](function(){expect(JSON.stringify(e.get())).to.be('{"foo":"x"}'),t()})})}),describe("valid checking",function(){it("`tag` checking: invalid",function(){var e=t(),o=onerStorage({type:"localStorage",key:e,tag:"1.0"});o.set("foo","x");var n=onerStorage({type:"localStorage",key:e,tag:"2.0"});expect(JSON.stringify(n.get())).to.be("{}"),o.destroy(),n.destroy()}),it("`tag` checking: valid",function(){var e=t(),o=onerStorage({type:"localStorage",key:e,tag:"1.0"});o.set("foo","x");var n=onerStorage({type:"localStorage",key:e,tag:"1.0"});expect(n.get("foo")).to.be("x"),o.destroy()}),it("`duration` checking：invalid",function(e){var t="test-expire",o=onerStorage({type:"localStorage",key:t,duration:200});o.set("foo","x"),setTimeout(function(){var n=onerStorage({type:"localStorage",key:t,duration:200});try{expect(JSON.stringify(n.get())).to.be("{}"),o.destroy(),n.destroy(),e()}catch(t){e(t)}},300)}),it("`duration` checking：valid",function(){var e="test-expire",t=onerStorage({type:"localStorage",key:e,duration:200});t.set("foo","x");var o=onerStorage({type:"localStorage",key:e,duration:200});expect(o.get().foo).to.be("x"),t.destroy(),o.destroy()}),it("`until` checking: invalid",function(){var e="until-invalid",t=onerStorage({type:"localStorage",key:e,until:new Date((new Date).getTime()-1e3).getTime()});t.set("foo","x");var o=onerStorage({type:"localStorage",key:e});expect(JSON.stringify(o.get())).to.be("{}"),t.destroy(),o.destroy()}),it("`until` checking: valid",function(){var e="until-valid",t=onerStorage({type:"localStorage",key:e,until:(new Date).getTime()+36e5});t.set("x","x");var o=onerStorage({type:"localStorage",key:e});expect(JSON.stringify(o.get())).to.be('{"x":"x"}'),t.destroy(),o.destroy()})}),describe("clean",function(){it("clean up `until` invalid storage",function(){onerStorage({type:"localStorage",key:"clean",until:new Date((new Date).getTime()-1e3).getTime()}).set("foo","x"),onerStorage.clean();var e=onerStorage({type:"localStorage",key:"clean-until"});expect(JSON.stringify(e.get())).to.be("{}"),e.destroy()}),it("clean up `duration` invalid storage",function(e){onerStorage({type:"localStorage",key:"clean-duration",duration:100}).set("foo","x"),onerStorage.clean(),setTimeout(function(){var t=onerStorage({type:"localStorage",key:"clean-duration"});expect(JSON.stringify(t.get())).to.be("{}"),t.destroy(),e()},300)})})}),describe("onerStorage.env",function(){it("get value by env",function(){var e=onerStorage({type:"variable",key:"config"});e.set("api",onerStorage.env("development",{development:"http://0.0.0.0/api",production:"http://foo.com/api"})),expect(e.get("api")).to.be("http://0.0.0.0/api")}),it("get `undefined` by env",function(){var e=onerStorage({type:"variable",key:"config"});e.set("api",onerStorage.env("test",{development:"http://0.0.0.0/api",production:"http://foo.com/api"})),expect(e.get("api")).to.be(undefined)}),it("can not set value on env instance",function(){var e=onerStorage({type:"variable",key:"config"});e.set("foo.api",onerStorage.env("production",{development:"http://0.0.0.0/api",production:"http://foo.com/api"}));var t=function(){e.set("foo.api.test","hello")};expect(t).to.throwError()}),it("env can not be used for localStorage",function(){var e=onerStorage({type:"localStorage",key:"config"}),t=function(){e.set("api",onerStorage.env("development",{development:"http://0.0.0.0/api"}))};expect(t).to.throwError()}),it("env can not be used for sessionStorage",function(){var e=onerStorage({type:"sessionStorage",key:"config"}),t=function(){e.set("api",onerStorage.env("development",{development:"http://0.0.0.0/api"}))};expect(t).to.throwError()})})}();
//# sourceMappingURL=bundle.js.map
