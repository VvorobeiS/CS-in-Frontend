class Vector {
  #array;
  #capacity;
  #length = 0;
  #TypedArray;

  constructor(TypedArray, options) {
    this.#TypedArray = TypedArray;
    this.#capacity = options.capacity ?? 1;
    this.#array = new TypedArray(this.#capacity);

    return this;
  }

  push(value) {
    if (this.#length == this.#capacity) {
      this.#array = new this.#TypedArray([...this.#array, ...new Array(this.#capacity)]);
      this.#capacity += this.#capacity;
      this.#array[this.#length++] = value;
    } else {
      this.#array[this.#length++] = value;
    }
  }

  pop() {
    let value = this.#array[this.#length - 1];

    this.#array[(this.#length -= 1)] = 0;

    return value;
  }

  *values() {
    let i = 0;

    while (i < this.#length) {
      yield this.#array[i++];
    }
  }

  shrinkToFit() {
    if (this.#length == this.#capacity) return;

    this.#array = new this.#TypedArray(this.#array.subarray(0, this.#length));
    this.#capacity = this.#length;
  }

  get capacity() {
    return this.#capacity;
  }

  get length() {
    return this.#length;
  }

  get buffer() {
    return this.#array.buffer;
  }
}

const vec = new Vector(Int32Array, { capacity: 4 });
const i = vec.values();

vec.push(1);
vec.push(2);
vec.push(3);
vec.push(4);
vec.push(5);
vec.push(5);

console.log(i.next());
console.log(i.next());
console.log(i.next());
console.log(i.next());

class Matrix3D {
  #capacity;
  #array;
  #length;
  #x;
  #y;
  #z;

  constructor(TypedArray, x, y, z) {
    this.#capacity = x * y * z;
    this.#x = x;
    this.#y = y;
    this.#z = z;
    this.#array = new TypedArray(this.#capacity);
    this.#length = 0;
  }

  calcIdx(x, y, z) {
    let lengthX = this.#capacity / this.#x;
    let lengthY = lengthX / this.#y;
    let shiftX = lengthX * x;
    let shiftY = lengthY * y;

    return shiftX + shiftY + z;
  }

  set(x, y, z, value) {
    this.#array[this.calcIdx(x, y, z)] = value;
    this.#length++;
  }

  *values() {
    let i = 0;

    while (i < this.#length) {
      yield this.#array[i++];
    }
  }
}

const newMatrix3D = new Matrix3D(Int32Array, 2, 2, 2);

newMatrix3D.set(0, 0, 0, 1);
newMatrix3D.set(0, 0, 1, 2);
newMatrix3D.set(0, 1, 0, 3);
newMatrix3D.set(0, 1, 1, 4);

newMatrix3D.set(1, 0, 0, 5);
newMatrix3D.set(1, 0, 1, 6);
newMatrix3D.set(1, 1, 0, 7);
newMatrix3D.set(1, 1, 1, 8);

console.log(Array.from(newMatrix3D.values()));
