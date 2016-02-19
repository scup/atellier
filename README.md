# ![atellier](http://i.imgur.com/UvDJ8c5.jpg)

[![Dependencies Status](https://david-dm.org/scup/atellier.svg)](https://david-dm.org/scup/Atellier)
[![Build Status](https://travis-ci.org/scup/atellier.svg?branch=development)](https://travis-ci.org/scup/atellier)
[![Code Climate](https://codeclimate.com/github/scup/Atellier/badges/gpa.svg)](https://codeclimate.com/github/scup/Atellier)
[![npm version](https://badge.fury.io/js/react-atellier.svg)](https://badge.fury.io/js/react-atellier)
[![By Sprinklr](https://img.shields.io/badge/by-Sprinklr-orange.svg)](http://developers.scup.com)

A React component that works like a preview of other components. An excellent tool to show how your component works and looks with. Easy to install and configure, you can have a router in your project with Atellier and can interact with any component.

Imagine a universe in which you may have tools (***components***) tested in real time! This is amazing!

## Online Demos
* [Atellier and Material UI](http://scup.github.io/atellier/material-ui-atellier/)

## Install
```shell
npm install -g react-atellier
```

## Usage



**Import Atellier**
```javascript
...
var ReactAtellier = require('react-atellier')( React );
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
var AtellierWrapper = React.createClass({
  render: function() {
    return (
      <ReactAtellier components={componentList} />
    );
  }
});
```
**and then you need to render the Atellier somewhere in your application.**
```javascript
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="atellier" component={AtellierWrapper}/>
    </Route>
  </Router>
), document.body)
```



---







## Todo
- [ ] Atellier CLI (wip)
- [ ] Import components and live update
- [ ] Move components in `stage`

## Team

[![Guilherme de Souza](https://avatars1.githubusercontent.com/u/2624370?v=3&s=100)](https://github.com/guisouza) | [![Alberto](https://avatars1.githubusercontent.com/u/717537?v=3&s=100)](https://github.com/albertossilva) | [![Érica Mitsuishi](https://avatars2.githubusercontent.com/u/3091890?v=3&s=100)](https://github.com/mitsuishihidemi) | [![Bruno Agutoli](https://avatars2.githubusercontent.com/u/298845?v=3&s=100)](https://github.com/agutoli) | [![Daniel Allegretti](https://avatars1.githubusercontent.com/u/317584?v=3&s=100)](https://github.com/allegretti) | [![João Neto](https://avatars2.githubusercontent.com/u/547989?v=3&s=100)](https://github.com/allegretti) | [![Geison](https://avatars0.githubusercontent.com/u/4429874?v=3&s=100)](https://github.com/ojeison)
---|---|---|---|---|---|---|
[Guilherme de Souza](https://github.com/guisouza) | [Alberto](https://github.com/albertossilva) | [Érica Mitsuishi](https://github.com/mitsuishihidemi) | [Bruno Agutoli](https://github.com/agutoli) | [Daniel Allegretti](https://github.com/allegretti) | [João Neto](https://github.com/joaoneto) | [Geison](https://github.com/ogeison)

## Contribute
Come with us to make an awesome *Atellier* tool to run components in live ambient.

Now, if you do not have technical knowledge and also have intend to help us, do not feel shy, [click here](https://github.com/scup/Atellier/issues) to open an issue and collaborate their ideas, the contribution may be a criticism or a compliment (why not?)

We have some conventions to contribute to the *Atellier* project, see more information in our [CONTRIBUTING.md](CONTRIBUTING.md). So please, read this before send to us a [pull requests](https://github.com/scup/Atellier/pulls).

## Want help?
- [issues](https://github.com/scup/Atellier/issues)
- ~~~IRC #react-atellier on [freenode](https://freenode.net/)~~~


## License

**React Atellier** is released under the
[MIT license](https://github.com/scup/atellier/blob/development/LICENSE.md).
