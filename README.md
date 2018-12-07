# Exceltron

Dummy Electron app that generates an Excel workbook from component data and saves it to the user's disk. I made this as part of a larger task monitoring app. It got its own repo because I wanted to test it in an isolated environment since I am new to Electron and hadn't used [dialogs](https://electronjs.org/docs/api/dialog) before (or Node's fs for that matter). 

Uses [exceljs](https://www.npmjs.com/package/exceljs) to generate the workbook.

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
