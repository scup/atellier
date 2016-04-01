
export default class PropTypesIdentifier {

  constructor(propTypes) {
    this.propTypes = propTypes;
  }

  static create(propTypes) {
    return new this(propTypes);
  }

  identify() {
    for (let proptype in this.propTypes) {
      this.propTypes[proptype].type = proptype;
      if (this.propTypes[proptype].isRequired) {
        this.propTypes[proptype].isRequired.type = proptype;
      }
    }
    return this;
  }

  intercept(proptype) {
    if (proptype === this.propTypes.oneOf) {
      let _oneOf = this.propTypes.oneOf;
      this.propTypes.oneOf = (oneOfArguments) => {
        let proptypeFunc = this._getInterceptFunc(_oneOf, oneOfArguments);
        proptypeFunc.type = 'oneOf';
        proptypeFunc.options = oneOfArguments;
        return proptypeFunc;
      }
    }

    return this;
  }

  _getInterceptFunc(func, args) {
    return (proptypeArguments) => {
      let instance = func(args)(proptypeArguments);
      return instance;
    };
  }
}
