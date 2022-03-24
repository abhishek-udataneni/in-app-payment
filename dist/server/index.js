'use strict';

var web = require('solid-js/web');
var express = require('express');
var path = require('path');
var solidJs = require('solid-js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

const _tmpl$$1 = ["<a", " class=\"link\" href=\"", "\">", "</a>"];

const RouterContext = solidJs.createContext();

function RouteHOC(Comp) {
  return (props = {}) => {
    const [location, setLocation] = solidJs.createSignal((props.url ? props.url : window.location.pathname).slice(1) || "index"),
          matches = match => match === (location() || "index"),
          [pending, start] = solidJs.useTransition();

    !web.isServer && (window.onpopstate = () => setLocation(window.location.pathname.slice(1)));
    return web.createComponent(RouterContext.Provider, {
      value: [location, pending, {
        setLocation: v => start(() => setLocation(v)),
        matches
      }],

      get children() {
        return web.createComponent(Comp, {});
      }

    });
  };
}

const Link = props => {
  solidJs.useContext(RouterContext);

  return web.ssr(_tmpl$$1, web.ssrHydrationKey(), `/${web.escape(props.path, true)}`, web.escape(props.children));
};

const Profile = solidJs.lazy(() => Promise.resolve().then(function () { return require('./Profile-de5118e9.js'); })); // this component lazy loads data and code in parallel

var Profile$1 = (() => {
  const [user] = solidJs.createResource(() => {
    // simulate data loading
    console.log("LOAD USER");
    return new Promise(res => {
      setTimeout(() => res({
        firstName: "Jon",
        lastName: "Snow"
      }), 400);
    });
  }),
        [info] = solidJs.createResource(user, () => {
    // simulate cascading data loading
    console.log("LOAD INFO");
    return new Promise(res => {
      setTimeout(() => res(["Something Interesting", "Something else you might care about", "Or maybe not"]), 400);
    });
  }, {
    initialValue: []
  });
  return web.createComponent(Profile, {
    get user() {
      return user();
    },

    get info() {
      return info();
    }

  });
});

const _tmpl$ = ["<head><title>\uD83D\uDD25 Solid SSR \uD83D\uDD25</title><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><link rel=\"stylesheet\" href=\"/styles.css\">", "</head>"],
      _tmpl$2 = ["<html", " lang=\"en\">", "<body><div id=\"app\"><ul class=\"inline\"><li class=\"", "\">", "</li><li class=\"", "\">", "</li><li class=\"", "\">", "</li></ul><div class=\"", "\">", "</div></div></body><script type=\"module\" src=\"/js/index.js\" async></script></html>"],
      _tmpl$3 = ["<h2", ">Error: <!--#-->", "<!--/--></h2>"],
      _tmpl$4 = ["<button", ">Reset</button>"],
      _tmpl$5 = ["<span", " class=\"loader\" style=\"opacity: 0\">Loading...</span>"];
const Home = solidJs.lazy(() => Promise.resolve().then(function () { return require('./Home-145de7a5.js'); }));
const Settings = solidJs.lazy(() => Promise.resolve().then(function () { return require('./Settings-918a403c.js'); }));
const App = RouteHOC(() => {
  const [, pending, {
    matches
  }] = solidJs.useContext(RouterContext);
  return web.ssr(_tmpl$2, web.ssrHydrationKey(), web.NoHydration({
    get children() {
      return web.ssr(_tmpl$, web.escape(web.createComponent(web.HydrationScript, {})));
    }

  }), matches("index") ? "selected" : "", web.escape(web.createComponent(Link, {
    path: "",
    children: "Home"
  })), matches("profile") ? "selected" : "", web.escape(web.createComponent(Link, {
    path: "profile",
    children: "Profile"
  })), matches("settings") ? "selected" : "", web.escape(web.createComponent(Link, {
    path: "settings",
    children: "Settings"
  })), `tab ${pending() ? "pending" : ""}`, web.escape(web.createComponent(solidJs.ErrorBoundary, {
    fallback: (err, reset) => {
      return [web.ssr(_tmpl$3, web.ssrHydrationKey(), web.escape(err.message)), web.ssr(_tmpl$4, web.ssrHydrationKey())];
    },

    get children() {
      return web.createComponent(web.Suspense, {
        get fallback() {
          return web.ssr(_tmpl$5, web.ssrHydrationKey());
        },

        get children() {
          return web.createComponent(web.Switch, {
            get children() {
              return [web.createComponent(web.Match, {
                get when() {
                  return matches("index");
                },

                get children() {
                  return web.createComponent(Home, {});
                }

              }), web.createComponent(web.Match, {
                get when() {
                  return matches("profile");
                },

                get children() {
                  return web.createComponent(Profile$1, {});
                }

              }), web.createComponent(web.Match, {
                get when() {
                  return matches("settings");
                },

                get children() {
                  return web.createComponent(Settings, {});
                }

              })];
            }

          });
        }

      });
    }

  })));
});

const app = express__default["default"]();
const port = 8080;
app.use(express__default["default"].static(path__default["default"].join(__dirname, "../assets")));
app.get("*", (req, res) => web.renderToStream(() => web.createComponent(App, {
  get url() {
    return req.url;
  }

})).pipe(res));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
