class InitStructure {
  #buffer;

  constructor(sheme, data) {
    this.#buffer = new ArrayBuffer(this.#calcBuffer(sheme));
    this.#createData(sheme, data);
  }

  get buffer() {
    return this.#buffer;
  }

  #calcBuffer(sheme) {
    let bytes = Object.values(sheme).reduce((acc, el) => {
      let res;

      if (el instanceof Structure) {
        res = acc += this.#calcBuffer(el);
      } else {
        res = Array.isArray(el) ? el[0].BYTES_PER_ELEMENT * el[1] : el.BYTES_PER_ELEMENT ?? 0;
      }

      return (acc += res);
    }, 0);

    return bytes;
  }

  #createData(sheme, data, offset = 0) {
    return Object.entries(sheme).reduce((offset, [key, value]) => {
      if (value instanceof Structure) {
        return (offset += this.#createData(value.sheme, data[key], offset));
      }

      let val = typeof data[key] === 'string' ? value.encode(data[key]) : data[key];
      let view = this.#createView(value, offset, val);

      console.log(new Uint8Array(view[0].buffer, view[1].byteOffset, view[1].byteLength));

      // Object.defineProperty(this, key, {
      //   get() {
      //     if (typeOfString) {
      //       let res = [];
      //     }
      //     return view;
      //   }
      // });

      return (offset += value[1]);
    }, offset);
  }

  #createView([TypedArray, length], offset, value) {
    let view = new DataView(this.#buffer, offset, length);
    let methods = {
      set: null,
      get: null
    };

    switch (TypedArray.name) {
      case 'Uint8Array':
        methods.set = 'setUint8';
        methods.get = 'getUint8';
        break;
      default:
        break;
    }

    length > 1 ? value.forEach((el, i) => view[methods.set](i, el)) : view[methods.set](0, value);

    return [view, methods.get];
  }
}

class Structure {
  #sheme;

  constructor(sheme) {
    this.#sheme = sheme;
  }

  static Number(type, length = 1) {
    switch (type) {
      case 'U8':
        return [Uint8Array, length];
      case 'U16':
        return [Uint16Array, length];
      default:
        break;
    }
  }

  static String(type, length = 1) {
    switch (type) {
      case 'ASCII':
        let res = [Uint8Array, length];

        Object.defineProperties(res, {
          encode: {
            value: (str) => Array.from(str).map((el) => el.charCodeAt())
          },
          decode: {
            value: (arr) => String.fromCharCode(...arr)
          }
        });

        return res;
      default:
        break;
    }
  }

  static Tuple() {}

  get sheme() {
    return this.#sheme;
  }

  create(data) {
    return new InitStructure(this.#sheme, data);
  }
}

const Skills = new Structure({
  singing: Structure.Number('U8'), // Unsigned число 8 бит
  dancing: Structure.Number('U8'),
  fighting: Structure.Number('U8')
});

const Person = new Structure({
  firstName: Structure.String('ASCII', 3),
  skills: Skills
});

const bob = Person.create({
  firstName: 'bob',
  skills: { singing: 100, dancing: 100, fighting: 50 }
});

// let buffer = new ArrayBuffer(4);
// let view = new DataView(buffer, 1);
// view.setInt16(1, 8);

// console.log(view);
