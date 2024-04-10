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
    let idx = 0;
    let pointer = this.#array[idx];
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

vec.push(1);
vec.push(2);
vec.push(3);
vec.push(4);
vec.push(5);
vec.pop();
vec.shrinkToFit();

// console.log(vec.capacity, vec.length, vec.buffer);
