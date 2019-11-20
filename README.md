# Location Normalizer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.
Uses Angular & Material stack.

##Functionals
### The goal
- Given a list of geographic locations, provided with the following format:

`01 Lima /  /`
`01 Lima / 50 Lima / `
`01 Lima / 51 Barranca / `
`01 Lima / 50 Lima / 202 La Molina`
`01 Lima / 50 Lima / 203 San Isidro`
`02 Arequipa /  / `
`02 Arequipa / 63 Arequipa / `
`02 Arequipa / 64 Caylloma / `
`02 Arequipa / 63 Arequipa / 267 Cercado`

- Is required parse into a structure which can fill a table, for example:

|Depth|Code|Description|Parent Code|Parent Description|
| :------------ | :------------ | :------------ | :------------ | :------------ |
|1|01|Lima|-|-|
|1|02|Arequipa|-|-|
|2|50|Lima|01|Lima|
|2|51|Barranca|01|Lima|
|2|63|Arequipa|02|Arequipa|
|2|64|Caylloma|02|Arequipa|
|3|202|La Molina|50|Lima|
|3|203|San Isidro|50|Lima|
|3|267|Cercado|63|Arequipa|

##Technicals
### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
