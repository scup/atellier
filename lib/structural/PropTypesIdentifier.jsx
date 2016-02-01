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
    }

    return this;
  }

  intercept(proptype) {
    if (proptype === this.propTypes.oneOf) {
      let _oneOf = this.propTypes.oneOf;
      this.propTypes.oneOf = (oneOfArguments) => {

        function proptypeFunc(proptypeArguments) {
          let instance = _oneOf(oneOfArguments)(proptypeArguments);
          return instance;
        }

        proptypeFunc.type = 'oneOf';
        proptypeFunc.options = oneOfArguments;

        return proptypeFunc;
      }
    }

    return this;
  }
}
