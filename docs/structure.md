# Folder structure

* `.storybook` has **Storybook** config
* `etc` has build stuff and configs
* `public` is for releasing shared components
* `src` contains source files
* `stories` has **Storybook** stories
* `types` has global **Flow** types

### Special

* `.tmp` has stuff for development
* `data` is generated during build and development
* `dist` is the output of the build
* `flow-typed` is version controlled, but auto-generated

### Src

Contains **all** source files.

* `client` has the actual application.
* `server` has stuff for generating markup and both static and dynamic SSR.

## Application code

All application code is located in the `src/client` directory.

* `index.js` is **webpack**'s entrypoint
* `app.jsx` is the client's render root

### Components

Contains **Nitro-only** components.

```
components/
    MyComponent/
        index.jsx <- The main component, only this is allowed to be imported
        SubComponent.jsx <- A component used in 'index.jsx' or other subcomponents
```

**Can have**
* subcomponents
* services
* records

**Cannot have**
* scenes

### Public

Contains **shared** components and code.

The `public/` folder must be **absolutely isolated**, meaning it cannot import _anything_ from the outside. This is because how it is compiled and published. See `yarn public`.

```
public/
    MyComponent/index.jsx <- a public component
    records/
        Intl.js <- a public record
    services/
        intl/
            context.js <- a public service
```

Keep in mind that everyting in the `public/` folder will be **importable** the following way:

```js
// public/MyComponent/index.jsx
import MyComponent from "@kiwicom/nitro/lib/MyComponent";
```

### Records

Contains data types and their associated functions.

Make record functions **data-last**, the record argument has to be last to allow easy _partial application_ and _composition_.

```js
// @flow
type Kek = {|
    bur: string,
|};

// BAD
function wrapStringBad(kek: Kek, str: string) {
    return str + kek.bur + str;
}

// Correct
function wrapString(str: string, kek: Kek) {
    return str + kek.bur + str;
}
```

**Cannot have**
* components
* subrecords
* services
* scenes

### Scenes

### Services
