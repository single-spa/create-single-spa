import { setPublicPath } from "systemjs-webpack-interop";

setPublicPath('@<%= orgName %>/<%= projectName %>');
// This file exists to solve a problem with how webpack loads code splits
// Webpack assumes that it can pull splits from the url origin
// That assumption doesn't hold true in a microfrontend approach
// ex:
// App1 running at the following url
// https://myapp.com/app1
// and specified in the import map at https://aws/app1/321478917398127dsasf3/app1.js
// by default webpack would try to load app1 code splits from https://myapp.com/
// instead of the correct url specified in your import map
// 
// systemjs-webpack-interop uses the url in your import map as the base for all code splits
// in the example above we're setting the root area where all code splits load as
// https://aws/app1/321478917398127dsasf3/ so that the vendors bundle is loaded
// from the correct url
