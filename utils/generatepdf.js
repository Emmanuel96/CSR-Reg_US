const html_to_pdf = require("html-pdf-node");
const sgMail = require("@sendgrid/mail");
const path = require("path");

require("dotenv").config();
const fs = require("fs");

const generatePdf = async (app, address) => {
  let options = { format: "A4" };
  let file = {
    content: `
    <!DOCTYPE html>
<html>
  <head>
    <title>Dashboard</title>
    <style>
    *,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

html {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
}

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

a {
  color: inherit;
  text-decoration: inherit;
}

b,
strong {
  font-weight: bolder;
}

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-size: 1em; /* 2 */
}

small {
  font-size: 80%;
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

button,
select {
  text-transform: none;
}

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

:-moz-focusring {
  outline: auto;
}

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

:disabled {
  cursor: default;
}


img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden] {
  display: none;
}

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}
.container {
  width: 100%;
}
@media (min-width: 640px) {

  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {

  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {

  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {

  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {

  .container {
    max-width: 1536px;
  }
}
.pointer-events-none {
  pointer-events: none;
}
.invisible {
  visibility: hidden;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.sticky {
  position: sticky;
}
.top-0 {
  top: 0px;
}
.right-0 {
  right: 0px;
}
.left-0 {
  left: 0px;
}
.z-30 {
  z-index: 30;
}
.z-20 {
  z-index: 20;
}
.z-10 {
  z-index: 10;
}
.z-0 {
  z-index: 0;
}
.z-50 {
  z-index: 50;
}
.col-span-1 {
  grid-column: span 1 / span 1;
}
.float-right {
  float: right;
}
.clear-left {
  clear: left;
}
.-m-1 {
  margin: -0.25rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.mx-7 {
  margin-left: 1.75rem;
  margin-right: 1.75rem;
}
.mx-5 {
  margin-left: 1.25rem;
  margin-right: 1.25rem;
}
.my-10 {
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
}
.my-3 {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}
.mt-12 {
  margin-top: 3rem;
}
.mt-7 {
  margin-top: 1.75rem;
}
.mt-1 {
  margin-top: 0.25rem;
}
.mt-6 {
  margin-top: 1.5rem;
}
.mt-5 {
  margin-top: 1.25rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mb-10 {
  margin-bottom: 2.5rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.ml-1 {
  margin-left: 0.25rem;
}
.mt-3 {
  margin-top: 0.75rem;
}
.mt-10 {
  margin-top: 2.5rem;
}
.mb-3 {
  margin-bottom: 0.75rem;
}
.ml-3 {
  margin-left: 0.75rem;
}
.ml-auto {
  margin-left: auto;
}
.mt-14 {
  margin-top: 3.5rem;
}
.block {
  display: block;
}
.inline {
  display: inline;
}
.flex {
  display: flex;
}
.table {
  display: table;
}
.hidden {
  display: none;
}
.h-auto {
  height: auto;
}
.h-6 {
  height: 1.5rem;
}
.h-4 {
  height: 1rem;
}
.h-10 {
  height: 2.5rem;
}
.h-full {
  height: 100%;
}
.h-40 {
  height: 10rem;
}
.h-12 {
  height: 3rem;
}
.h-2 {
  height: 0.5rem;
}
.h-24 {
  height: 6rem;
}
.h-11 {
  height: 2.75rem;
}
.max-h-96 {
  max-height: 24rem;
}
.w-11\/12 {
  width: 91.666667%;
}
.w-full {
  width: 100%;
}
.w-6 {
  width: 1.5rem;
}
.w-3 {
  width: 0.75rem;
}
.w-4 {
  width: 1rem;
}
.w-32 {
  width: 8rem;
}
.w-12 {
  width: 3rem;
}
.w-1\/2 {
  width: 50%;
}
.flex-1 {
  flex: 1 1 0%;
}
.flex-shrink-0 {
  flex-shrink: 0;
}
.flex-grow {
  flex-grow: 1;
}
.origin-top-right {
  transform-origin: top right;
}
.rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.rotate-0 {
  --tw-rotate: 0deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.scale-95 {
  --tw-scale-x: .95;
  --tw-scale-y: .95;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes bounce {

  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8,0,1,1);
  }

  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0,0,0.2,1);
  }
}
.animate-bounce {
  animation: bounce 1s infinite;
}
.cursor-pointer {
  cursor: pointer;
}
.resize-y {
  resize: vertical;
}
.list-inside {
  list-style-position: inside;
}
.list-disc {
  list-style-type: disc;
}
.flex-row {
  flex-direction: row;
}
.flex-col {
  flex-direction: column;
}
.flex-wrap {
  flex-wrap: wrap;
}
.items-center {
  align-items: center;
}
.justify-end {
  justify-content: flex-end;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}
.overflow-auto {
  overflow: auto;
}
.break-words {
  overflow-wrap: break-word;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.rounded-md {
  border-radius: 0.375rem;
}
.rounded {
  border-radius: 0.25rem;
}
.rounded-sm {
  border-radius: 0.125rem;
}
.rounded-full {
  border-radius: 9999px;
}
.border-2 {
  border-width: 2px;
}
.border {
  border-width: 1px;
}
.border-dashed {
  border-style: dashed;
}
.border-\[\#00A19A\] {
  --tw-border-opacity: 1;
  border-color: rgb(0 161 154 / var(--tw-border-opacity));
}
.border-\[\#464343\] {
  --tw-border-opacity: 1;
  border-color: rgb(70 67 67 / var(--tw-border-opacity));
}
.border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity));
}
.border-gray-800 {
  --tw-border-opacity: 1;
  border-color: rgb(31 41 55 / var(--tw-border-opacity));
}
.border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.bg-\[\#00A19A\] {
  --tw-bg-opacity: 1;
  background-color: rgb(0 161 154 / var(--tw-bg-opacity));
}
.bg-\[\#00a19a\] {
  --tw-bg-opacity: 1;
  background-color: rgb(0 161 154 / var(--tw-bg-opacity));
}
.bg-transparent {
  background-color: transparent;
}
.bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity));
}
.bg-\[\#575756\] {
  --tw-bg-opacity: 1;
  background-color: rgb(87 87 86 / var(--tw-bg-opacity));
}
.bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}
.bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}
.bg-fixed {
  background-attachment: fixed;
}
.fill-current {
  fill: currentColor;
}
.object-cover {
  -o-object-fit: cover;
     object-fit: cover;
}
.p-1 {
  padding: 0.25rem;
}
.p-8 {
  padding: 2rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.py-5 {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}
.pt-14 {
  padding-top: 3.5rem;
}
.pb-32 {
  padding-bottom: 8rem;
}
.pt-7 {
  padding-top: 1.75rem;
}
.pb-20 {
  padding-bottom: 5rem;
}
.pb-4 {
  padding-bottom: 1rem;
}
.pt-1 {
  padding-top: 0.25rem;
}
.pb-5 {
  padding-bottom: 1.25rem;
}
.pt-8 {
  padding-top: 2rem;
}
.pt-4 {
  padding-top: 1rem;
}
.pt-3 {
  padding-top: 0.75rem;
}
.pl-5 {
  padding-left: 1.25rem;
}
.pt-2 {
  padding-top: 0.5rem;
}
.pt-5 {
  padding-top: 1.25rem;
}
.pr-5 {
  padding-right: 1.25rem;
}
.pt-6 {
  padding-top: 1.5rem;
}
.pb-3 {
  padding-bottom: 0.75rem;
}
.pb-8 {
  padding-bottom: 2rem;
}
.pt-10 {
  padding-top: 2.5rem;
}
.pb-2 {
  padding-bottom: 0.5rem;
}
.pl-3 {
  padding-left: 0.75rem;
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.text-justify {
  text-align: justify;
}
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.font-bold {
  font-weight: 700;
}
.font-extrabold {
  font-weight: 800;
}
.font-semibold {
  font-weight: 600;
}
.uppercase {
  text-transform: uppercase;
}
.text-blue-700 {
  --tw-text-opacity: 1;
  color: rgb(29 78 216 / var(--tw-text-opacity));
}
.text-\[\#514C4C\] {
  --tw-text-opacity: 1;
  color: rgb(81 76 76 / var(--tw-text-opacity));
}
.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}
.text-\[\#302f2f\] {
  --tw-text-opacity: 1;
  color: rgb(48 47 47 / var(--tw-text-opacity));
}
.text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity));
}
.text-\[\#00A19A\] {
  --tw-text-opacity: 1;
  color: rgb(0 161 154 / var(--tw-text-opacity));
}
.text-red-700 {
  --tw-text-opacity: 1;
  color: rgb(185 28 28 / var(--tw-text-opacity));
}
.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
}
.text-transparent {
  color: transparent;
}
.text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}
.text-\[\#ff0000\] {
  --tw-text-opacity: 1;
  color: rgb(255 0 0 / var(--tw-text-opacity));
}
.text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity));
}
.text-\[\#464343\] {
  --tw-text-opacity: 1;
  color: rgb(70 67 67 / var(--tw-text-opacity));
}
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}
.shadow-2xl {
  --tw-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-xl {
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.delay-150 {
  transition-delay: 150ms;
}
.duration-200 {
  transition-duration: 200ms;
}
.duration-100 {
  transition-duration: 100ms;
}
.duration-75 {
  transition-duration: 75ms;
}
.duration-300 {
  transition-duration: 300ms;
}
.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
.ease-in {
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
}
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.placeholder\:text-xs::-moz-placeholder {
  font-size: 0.75rem;
  line-height: 1rem;
}
.placeholder\:text-xs::placeholder {
  font-size: 0.75rem;
  line-height: 1rem;
}
.invalid\:border-2:invalid {
  border-width: 2px;
}
.invalid\:border-\[\#ff0000\]:invalid {
  --tw-border-opacity: 1;
  border-color: rgb(255 0 0 / var(--tw-border-opacity));
}
.invalid\:outline-\[\#ff0000\]:invalid {
  outline-color: #ff0000;
}
.hover\:-translate-y-1:hover {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.hover\:scale-110:hover {
  --tw-scale-x: 1.1;
  --tw-scale-y: 1.1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.hover\:animate-none:hover {
  animation: none;
}
.hover\:bg-\[\#04c4ba\]:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(4 196 186 / var(--tw-bg-opacity));
}
.hover\:bg-gray-200:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}
.hover\:bg-\[\#03857e\]:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(3 133 126 / var(--tw-bg-opacity));
}
.hover\:bg-gray-300:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity));
}
.hover\:text-\[\#00A19A\]:hover {
  --tw-text-opacity: 1;
  color: rgb(0 161 154 / var(--tw-text-opacity));
}
.hover\:text-gray-900:hover {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity));
}
.hover\:text-gray-200:hover {
  --tw-text-opacity: 1;
  color: rgb(229 231 235 / var(--tw-text-opacity));
}
.hover\:text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.hover\:underline:hover {
  text-decoration-line: underline;
}
.hover\:shadow-lg:hover {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\:shadow-md:hover {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.group:hover .group-hover\:text-\[\#00A19A\] {
  --tw-text-opacity: 1;
  color: rgb(0 161 154 / var(--tw-text-opacity));
}
.peer:invalid ~ .peer-invalid\:visible {
  visibility: visible;
}
@media (prefers-color-scheme: dark) {

  .dark\:bg-gray-700 {
    --tw-bg-opacity: 1;
    background-color: rgb(55 65 81 / var(--tw-bg-opacity));
  }
}
@media (min-width: 640px) {

  .sm\:mx-8 {
    margin-left: 2rem;
    margin-right: 2rem;
  }

  .sm\:mt-16 {
    margin-top: 4rem;
  }

  .sm\:w-96 {
    width: 24rem;
  }

  .sm\:w-1\/3 {
    width: 33.333333%;
  }

  .sm\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .sm\:py-8 {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .sm\:pb-32 {
    padding-bottom: 8rem;
  }

  .sm\:text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  .sm\:text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }
}
@media (min-width: 768px) {

  .md\:fixed {
    position: fixed;
  }

  .md\:sticky {
    position: sticky;
  }

  .md\:top-0 {
    top: 0px;
  }

  .md\:mb-5 {
    margin-bottom: 1.25rem;
  }

  .md\:mb-4 {
    margin-bottom: 1rem;
  }

  .md\:-mt-1 {
    margin-top: -0.25rem;
  }

  .md\:ml-64 {
    margin-left: 16rem;
  }

  .md\:mt-0 {
    margin-top: 0px;
  }

  .md\:block {
    display: block;
  }

  .md\:flex {
    display: flex;
  }

  .md\:hidden {
    display: none;
  }

  .md\:h-screen {
    height: 100vh;
  }

  .md\:h-12 {
    height: 3rem;
  }

  .md\:w-80 {
    width: 20rem;
  }

  .md\:w-64 {
    width: 16rem;
  }

  .md\:w-1\/4 {
    width: 25%;
  }

  .md\:flex-row {
    flex-direction: row;
  }

  .md\:overflow-y-auto {
    overflow-y: auto;
  }

  .md\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .md\:px-0 {
    padding-left: 0px;
    padding-right: 0px;
  }

  .md\:py-8 {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .md\:px-16 {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  .md\:pt-4 {
    padding-top: 1rem;
  }

  .md\:pt-2 {
    padding-top: 0.5rem;
  }

  .md\:text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}
@media (min-width: 1024px) {

  .lg\:col-span-1 {
    grid-column: span 1 / span 1;
  }

  .lg\:mx-14 {
    margin-left: 3.5rem;
    margin-right: 3.5rem;
  }

  .lg\:mt-20 {
    margin-top: 5rem;
  }

  .lg\:mt-7 {
    margin-top: 1.75rem;
  }

  .lg\:mt-5 {
    margin-top: 1.25rem;
  }

  .lg\:mt-6 {
    margin-top: 1.5rem;
  }

  .lg\:mt-11 {
    margin-top: 2.75rem;
  }

  .lg\:mt-4 {
    margin-top: 1rem;
  }

  .lg\:mr-3 {
    margin-right: 0.75rem;
  }

  .lg\:grid {
    display: grid;
  }

  .lg\:h-12 {
    height: 3rem;
  }

  .lg\:h-10 {
    height: 2.5rem;
  }

  .lg\:w-96 {
    width: 24rem;
  }

  .lg\:w-1\/6 {
    width: 16.666667%;
  }

  .lg\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\:justify-start {
    justify-content: flex-start;
  }

  .lg\:border {
    border-width: 1px;
  }

  .lg\:py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .lg\:py-10 {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }

  .lg\:px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .lg\:pr-10 {
    padding-right: 2.5rem;
  }

  .lg\:pl-3 {
    padding-left: 0.75rem;
  }

  .lg\:text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }

  .lg\:text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .lg\:text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .lg\:text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .lg\:text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  .lg\:text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .lg\:placeholder\:text-base::-moz-placeholder {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .lg\:placeholder\:text-base::placeholder {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}
@media (min-width: 1280px) {

  .xl\:mx-20 {
    margin-left: 5rem;
    margin-right: 5rem;
  }
}
    </style>
  </head>

  <body class="bg-white">

    <div class="mt-6 md:mt-0 md:ml-64">
      <div class="md:py-8 mx-5 sm:mx-8 lg:mx-14 xl:mx-20">
        <div class="py-6 lg:py-10 bg-white lg:border">
          <div class="mx-5 lg:px-6">

           <div>
                <img 
                class="w-32" 
                src="https://i.ibb.co/NmwzKVD/CSR-A-Logo-RGB.jpg" 
                alt="CSR-A-Logo-RGB" 
                border="0"
                >
              
            </div>

            <div class="pt-8 text-[#00A19A] font-bold">
              <h1 class="pb-2 sm:text-2xl lg:text-3xl">
                Welcome to the CSR Accreditation Application form
              </h1>
              <hr class="lg:border border-black" />
            </div>

            <div class="text-justify pt-8 lg:text-lg">
              <p>
                The application process should be approached as a blank canvas
                exercise in which you include any information you feel relevant.
                There are questions under each pillar to inspire and support
                your application but these are not designed to be limiting in
                any way. The main body of the application should be succinct and
                summarise key points for each of the sub categories. You may
                bullet point where appropriate and refer to more detail in the
                supporting evidence.
              </p>
              <br />
              <p>
                Some information will be suitable under more than one pillar -
                cross reference wherever applicable. Reference existing internal
                and external reports, audit findings, newsletters and web
                material wherever possible. Collate evidence for each pillar
                under a corresponding appendix so that your final submission has
                four appendices (Appendix 1 Environment, Appendix 2 Workplace
                etc). Consultation and review of a draft application can be
                arranged on request and for a fee - see
                <a
                  class="text-blue-600 hover:underline"
                  href="https://csr-accreditation.co.uk/csr-accreditation-applications-fees/"
                  target="_blank"
                  >https://csr-accreditation.co.uk/csr-accreditation-applications-fees/</a
                >
                fees/ for latest products and fees.
              </p>

              <p class="mt-5">
                Please make sure that you have familiarised yourself with the
                Independent Assessment Guidance Notes & Criteria on the
                following page. The Independent Assessment Panel refer to these
                guidance notes when assessing your application.
              </p>

              <p class="mt-5">
                PLEASE COMPLETE THIS APPLICATION FORM IN FULL BEFORE SUBMISSION.
                YOU ARE ABLE TO COMPLETE THE FORM IN MULTIPLE SESSIONS OVER A
                PERIOD OF TIME AS OUR SYSTEM WILL SAVE YOUR PROGRESS. PLEASE
                ALSO MAKE SURE YOU HAVE INCLUDED ALL YOUR EVIDENCE FOR EACH
                PILLAR BEFORE YOU SUBMIT.
              </p>

              <p class="mt-5">
                You will be able to see your progress in the lefthand navigation
                as you complete the form
              </p>
            </div>

            <div class="text-justify pt-8 lg:text-lg">
              <p>
                PLEASE ALSO MAKE SURE YOU HAVE DOWNLOADED AND FAMILIARISED
                YOURSELF WITH OUR ‘GUIDANCE FOR ACCREDITATION’ DOCUMENT. YOU
                WILL HAVE BEEN SUPPLIED WITH A LINK TO DOWNLOAD THIS DOCUMENT.
                IF FOR ANY REASON YOU DID NOT DOWNLOAD THE GUIDANCE IT CAN BE
                DOWNLOADED
                <a
                  href="https://csr-accreditation.co.uk/wp-content/uploads/2021/03/3-CSRA_Guidance-For-Accreditation-10-20-AW-LR.pdf"
                  class="text-blue-600 hover:underline"
                  target="_blank"
                  >HERE</a
                >
              </p>
            </div>

            <div class="text-justify pt-5 pb-4 lg:text-lg">
              <p>
                You will receive an email that confirms we have received your
                application submission.
              </p>
            </div>
            <div class="text-justify pt-5 pb-4 lg:text-lg">
              <p>Please complete your details below.</p>
            </div>
          </div>

          <form>
            <div class="lg:grid lg:grid-cols-2">
              <div class="lg:col-span-1 lg:px-6">
                <div class="mx-5 mt-4">
                  <label class="text-sm">Contact Person</label>
                  <br />
                  <span>${app.contact_person}</span>
                  <p
                    class="mt-2 invisible peer-invalid:visible text-[#ff0000] text-sm"
                  >
                    Please provide a valid text.
                  </p>
                </div>

                <div class="mt-3 mx-5">
                  <label class="text-sm">Organisation Name</label>
                  <br />
                  <span>${app.organisation_name}</span>
                  <p
                    class="mt-2 invisible peer-invalid:visible text-[#ff0000] text-sm"
                  >
                    Please provide a valid text.
                  </p>
                </div>

                <div class="mt-3 mx-5">
                  <label class="text-sm">Organisation Address</label>
                  <br />
                  <span>${app.organisation_address} </span>
                  <p
                    class="mt-2 invisible peer-invalid:visible text-[#ff0000] text-sm"
                  >
                    Please provide a valid address.
                  </p>
                </div>
                <div class="mt-3 lg:mt-4 mx-5">
                  <label class="text-sm">Postal Code</label>
                  <br />
                  <span>${app.postal_code};</span>
                  <p
                    class="mt-2 invisible peer-invalid:visible text-[#ff0000] text-sm"
                  >
                    Please provide a valid text.
                  </p>
                </div>
              </div>

              <div class="lg:col-span-1 lg:px-6">
                <div class="mt-3 mx-5">
                  <label class="text-sm">Industry Sector</label>
                  <br />
                  <span>${app.industry_sector};</span>
                  <p
                    class="mt-2 invisible peer-invalid:visible text-[#ff0000] text-sm"
                  >
                    Please provide a valid text.
                  </p>
                </div>

                <div class="mt-3 mx-5">
                  <label class="text-sm">Email Address</label>
                  <br />
                  <span>${app.email_address}</span>
                  <p
                    class="mt-2 invisible peer-invalid:visible text-[#ff0000] text-sm"
                  >
                    Please provide a valid email address.
                  </p>
                </div>

                <div class="my-3 mx-5">
                  <label class="text-sm">Contact Number</label>
                  <br />
                  <span>${app.contact_number}</span>
                  <p
                    class="mt-2 invisible peer-invalid:visible text-[#ff0000] text-sm"
                  >
                    Please provide your contact
                  </p>
                </div>

                <div class="mt-3 mx-5">
                  <label class="text-sm">Nationality of Organisation</label>
                  <br />
                  <span>${app.organisation_nationality}</span>
                  <p
                    class="mt-2 invisible peer-invalid:visible text-[#ff0000] text-sm"
                  >
                    Please provide a valid text.
                  </p>
                </div>
              </div>
            </div>

            <p class="text-red-600 mx-5 lg:px-6 text-sm pt-8 pb-5 text-justify">
              *Please note that your organisation name should be entered in
              exactly the format that you want it to appear on your
              Accreditation Mark, certificate and guidelines document.
            </p>

            <div class="mx-5 lg:px-6 pt-8 pb-5 text-justify text-sm">
              <p>
                YOU ARE REQUIRED TO ENTER YOUR ORGANISATION'S SIZE BY NUMBER OF
                EMPLOYEES FOR ORGANISATION OR BY TURNOVER IF YOU ARE THIRD
                SECTOR. FOR A FULL LIST OF CURRENT APPLICATION FEES PLEASE VISIT
                OUR WEBSITE -
              </p>
              <br />
              <p>
                ORGANISATION SIZE - For fees please visit:
                <a
                  class="text-blue-600 hover:underline"
                  href="https://csr-accreditation.co.uk/csr-accreditation-applications-fees/"
                  target="_blank"
                  >https://csr-accreditation.co.uk/csr-accreditation-applications-fees/</a
                >
              </p>
            </div>
            <span></span>
            <div class="mx-5 lg:px-6 pt-1 text-justify text-base">
              <p>
                Organisations that have published a recent independent social
                responsibility report or have included a social impact section
                as part of their report and accounts qualify for our 'fast
                track' application process. Fast track applicants can submit
                their existing documentation in place of our online application
                form. Please contact CSR-A if you wish to fast track your
                application.
              </p>

              <p class="text-red-700 pt-5 pb-2 font-bold text-sm">
                THIRD SECTOR ORGANISATION ONLY *
              </p>

              <div class="text-base text-[#464343] py-5">
                <div class="flex space-x-3">
                  <h1>Are you a third sector organisation?</h1>

                  <span>${app.thirdparty_org};</span>
                </div>
              </div>
              <div class="text-base text-[#464343] py-5">
                <div class="flex space-x-3">
                  <h1>Are you applying for re-accreditation?</h1>

                  <span>${app.thirdparty_org};</span>
                </div>
              </div>
            </div>
            </div>
          </form>
          <p class="mt-5 font-bold pl-5 text-red-700">
        </div>
      </div>
    </div>
  </body>
</html>

    `,
  };

  html_to_pdf.generatePdf(file, options).then(async (pdfBuffer) => {
    await fs.writeFileSync("./utils/pdf.pdf", pdfBuffer);
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    sgMail.setApiKey(SENDGRID_API_KEY);

    fs.readFile("./utils/pdf.pdf", (err, data) => {
      const sendEmail = {
        to: address,
        from: "emmanuel@csr-accreditation.co.uk",
        subject: "CSRA Application",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head>
    <title>
    </title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <style type="text/css">body, html {
      margin: 0px;
      padding: 0px;
      -webkit-font-smoothing: antialiased;
      text-size-adjust: none;
      width: 100% !important;
    }
      table td, table {
      }
      #outlook a {
        padding: 0px;
      }
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
        line-height: 100%;
      }
      .ExternalClass {
        width: 100%;
      }
      @media only screen and (max-width: 480px) {
        table, table tr td, table td {
          width: 100% ;
        }
        table tr td table.edsocialfollowcontainer  {
          width: auto;
        }
        img {
          width: inherit;
        }
        .layer_2 {
          max-width: 100% !important;
        }
        .edsocialfollowcontainer table {
          max-width: 25% !important;
        }
        .edsocialfollowcontainer table td {
          padding: 10px !important;
        }
        .edsocialfollowcontainer table {
          max-width: 25% !important;
        }
        .edsocialfollowcontainer table td {
          padding: 10px !important;
        }
      }
    </style>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i &subset=cyrillic,latin-ext" data-name="open_sans" rel="stylesheet" type="text/css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">
  </head><body style="padding:0; margin: 0;background: #e4e6ec">
    <table style="height: 100%; width: 100%; background-color: #e4e6ec;" align="center">
      <tbody>
        <tr>
          <td valign="top" id="dbody" data-version="2.31" style="width: 100%; height: 100%; padding-top: 50px; padding-bottom: 50px; background-color: #e4e6ec;">
            <!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:600px" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
            <table class="layer_1" align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; box-sizing: border-box; width: 100%; margin: 0px auto;">
              <tbody>
                
                
                
                
                
                
                
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #f4f4f3; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="edtext" style="padding: 48px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                              <p class="style2" style="margin: 0px; padding: 0px; color: #000000; font-size: 22px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;"><span style="font-size: 14px;"><strong></strong>You have successfully submitted your CSR accreditation application.</span>
                              </p>
                              <p style="margin: 0px; padding: 0px;">
                                <br>
                              </p>
                              <p style="margin: 0px; padding: 0px;">
                              </p>
                              <p style="margin: 0px; padding: 0px;">Your application submission and supporting documentation has been transferred to <br>our assessment platform where it is now available for scrutiny and scoring by three <br>members of our expert, independent assessment panel.</p><p style="margin: 0px; padding: 0px;"><br></p><p style="margin: 0px; padding: 0px;">You will be notified by email of the results of your application, which will include <br>your score as a percentage, your level of accreditation (gold, silver, bronze), a brief <br>description of what your accreditation pack will contain and an outline of some of our <br>membership benefits.</p><p style="margin: 0px; padding: 0px;"><br></p><p style="margin: 0px; padding: 0px;">A separate email will be sent to you with an attached invoice for your accreditation <br>fee. Failure to pay the application fee within the 30 day period may result in your <br>accreditation being withdrawn.</p><p style="margin: 0px; padding: 0px;"><br></p><p style="margin: 0px; padding: 0px;">For applicants that have failed to reach sufficient score for accreditation we provide a <br>short gap analysis and the chance to re-apply within the next three months for just a <br>small administration fee.</p><p style="margin: 0px; padding: 0px;"><br></p><p style="margin: 0px; padding: 0px;">For those that wish to explore the results of a successful application in more depth we <br>also provide a consultation gap analysis service. Your consultant will provide summary <br>feedback from our independent assessors. This feedback is supplemented by expert <br>analysis of your accreditation application.</p><p style="margin: 0px; padding: 0px;"><br></p><p style="margin: 0px; padding: 0px;">Successful applicants will receive their bespoke accreditation pack via email within <br>seven days of the result notification.</p><p style="margin: 0px; padding: 0px;"><br></p><p style="margin: 0px; padding: 0px;">If you have any further questions please contact Jennifer Clark  <br>jennifer@csr-accreditation.co.uk</p><p style="margin: 0px; padding: 0px;"><br></p>
                              <p style="margin: 0px; padding: 0px;">
                                <br>
                              </p>
                              <p style="margin: 0px; padding: 0px;">
                              </p>
                              <p style="margin: 0px; padding: 0px;">Kind Regards,<br>The CSR-A Team<br></p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                
                
                
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="edimg" style="padding: 0px; box-sizing: border-box; text-align: center;">
                              <img src="https://api.smtprelay.co/userfile/eada7289-1e79-4f31-8f68-be4f8fb9da28/Footer_(1).jpg" alt="Image" width="596" style="border-width: 0px; font-size: 12px; border-style: none; max-width: 596px; width: 100%;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #e4e6ec; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="emptycell" style="padding: 20px;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow text-center" valign="top" align="center" style="background-color: #e4e6ec; text-align: center; box-sizing: border-box; font-size: 0px;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2 text-center" style="max-width: 596px; text-align: center; display: inline-block; vertical-align: top; width: 100%;">
                      <table class="edcontent" style="border-collapse: collapse;width:100%" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>
                            <td class="edtext text-center" valign="top" style="padding: 10px; text-align: center; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                              <p style="font-size: 11px; margin: 0px; padding: 0px;">If you no longer wish to receive mail from us, you can&nbsp;
                                <a href="{unsubscribe}" style="background-color: initial; color: #828282; font-family: Helvetica, Arial, sans-serif; text-decoration: none;"><span style="font-size: 11px;"><u>unsubscribe</u></span></a> 
                                <br>{accountaddress}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
  </body></html>`,
        attachments: [
          {
            filename: "csra.pdf",
            content: data.toString("base64"),
            contentType: "application/pdf",
          },
        ],
      };
      sgMail.send(sendEmail);
    });
  });
};

module.exports = generatePdf;
