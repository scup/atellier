# ![atellier](https://raw.githubusercontent.com/scup/Atellier/development/media/header_logo.png)

[![Build Status](https://travis-ci.org/scup/Atellier.svg?branch=master)](https://travis-ci.org/scup/Atellier)
[![Code Climate](https://codeclimate.com/github/scup/Atellier/badges/gpa.svg)](https://codeclimate.com/github/scup/Atellier)
[![npm version](https://badge.fury.io/js/Attelier.svg)](https://badge.fury.io/js/Attelier)



A React component that works like a preview of other components. A excellent tool to show how your component works and looks with. Easy to install and configure, you can have a router in your project with Atellier and can interact with any component.

Imagine a universe in which you may have tools (***components***) tested in real time! This is amazing!

## Online Demos
* [Atellier and Material UI](https://github.com/callemall/material-ui)
* [Atellier and Bootstrap UI](https://github.com/callemall/material-ui)

## Install
```shell
npm install -g react-atellier
```

## Usage



**Import Atellier**
```javascript
import Atellier from 'react-atellier';
```
**Import your component**
```javascript

import myComponent from 'myComponent';

const componentList = [{
  componentName : myComponent.displayName,
  component : myComponent
}];

```
**OR your component library**
```javascript

import myComponents from 'myComponent';

const componentList = myComponents.map( (comp)=> {
    return {
      componentName : comp.displayName,
      component : comp
    }
})

```
**pass your components to Atellier over components prop.**
```javascript
let attelier = (<Atellier components={componentList} />);
```
**and then you need to render the Attelier somewhere in yout application.**
```javascript
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="atellier" component={attelier}/>
    </Route>
  </Router>
), document.body)
```



---







## todo
- [ ] Atellier CLI
- [ ] Import components and live update
- [ ] Drag components in `stage`
- [ ] License

## Team

[![Guilherme de Souza](https://avatars1.githubusercontent.com/u/2624370?v=3&s=120)](https://github.com/guisouza) | [![Érica Mitsuishi](https://avatars2.githubusercontent.com/u/3091890?v=3&s=120)](https://github.com/mitsuishihidemi) | [![Bruno Agutoli](https://avatars2.githubusercontent.com/u/298845?v=3&s=120)](https://github.com/agutoli) | [![Daniel Allegretti](https://avatars1.githubusercontent.com/u/317584?v=3&s=120)](https://github.com/allegretti) | [![João Neto](https://avatars2.githubusercontent.com/u/547989?v=3&s=120)](https://github.com/allegretti)
---|---|---|---|---
[Guilherme de Souza](https://github.com/guisouza) | [Érica Mitsuishi](https://github.com/mitsuishihidemi) | [Bruno Agutoli](https://github.com/agutoli) | [Daniel Allegretti](https://github.com/allegretti) | [João Neto](https://github.com/joaoneto)

## Contribute
Come with us to make an awesome *Attelier* tool to run components in live ambient.

Now, if you do not have technical knowledge and also have intend to help us, do not feel shy, [click here](https://github.com/scup/Atellier/issues) to open an issue and collaborate their ideas, the contribution may be a criticism or a compliment (why not?)

We have some conventions to contribute to the *Attelier* project, see more information in our [CONTRIBUTING.md](CONTRIBUTING.md). So please, read this before send to us a [pull requests](https://github.com/scup/Atellier/pulls).

## want help?
- [issues](https://github.com/scup/Atellier/issues)
- IRC #react-attelier on [freenode](https://freenode.net/)


## License

**React Atellier** is released under the
[MIT license](https://github.com/scup/Atellier/blob/development/LICENSE.md).
