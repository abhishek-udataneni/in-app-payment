'use strict';

var web = require('solid-js/web');
var solidJs = require('solid-js');

const _tmpl$ = ["<h1", ">Settings</h1>"],
      _tmpl$2 = ["<p", ">All that configuration you never really ever want to look at.</p>"],
      _tmpl$3 = ["<label", " for=\"", "\">Write:</label>"],
      _tmpl$4 = ["<input", " type=\"text\" id=\"", "\" value=\"", "\">"],
      _tmpl$5 = ["<p", ">", "</p>"];

const Settings = () => {
  const [text, setText] = solidJs.createSignal("Hi");
  const id = solidJs.createUniqueId();
  return [web.ssr(_tmpl$, web.ssrHydrationKey()), web.ssr(_tmpl$2, web.ssrHydrationKey()), web.ssr(_tmpl$3, web.ssrHydrationKey(), web.escape(id, true)), web.ssr(_tmpl$4, web.ssrHydrationKey(), web.escape(id, true), web.escape(text(), true)), web.ssr(_tmpl$5, web.ssrHydrationKey(), web.escape(text()))];
};

exports["default"] = Settings;
