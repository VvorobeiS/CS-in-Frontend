class DoubleLinkedList {
  first = null;
  last = null;
  length = 0;

  constructor(array) {
    this.first = array;
    this.last = this.first;
    this.length = 1;
  }

  append(array) {
    const newListNode = array;

    newListNode.prev = this.last;
    this.last.next = newListNode;
    this.last = newListNode;
    this.length++;

    return newListNode;
  }

  prepend(array) {
    const newListNode = array;

    newListNode.next = this.first;
    this.first.prev = newListNode;
    this.first = newListNode;
    this.length++;

    return newListNode;
  }
}

class Dequeue {
  #TypedArray;
  #capacity;
  #head;
  #headArr;
  #length = 0;
  #currentLeft;
  #currentRight;
  #cursorLeft;
  #cursorRight;

  constructor(TypedArr, capacity) {
    this.#TypedArray = TypedArr;
    this.#capacity = capacity;
    this.#head = new DoubleLinkedList(new TypedArr(capacity));
    this.#headArr = this.#currentLeft = this.#currentRight = this.#head.first;
    this.#cursorLeft = this.#cursorRight = Math.floor(capacity / 2);
  }

  popLeft() {
    if (!this.#length) return;

    let res;

    if (this.#currentLeft == this.#headArr && this.#length == 1) {
      this.#cursorRight--;
    }

    if (this.#cursorLeft >= this.#capacity - 2) {
      this.#head.first = this.#head.first.next;
      this.#head.first.prev = null;
      this.#currentLeft = this.#head.first;
      res = this.#currentLeft[(this.#cursorLeft = 0)];
      this.#currentLeft[this.#currentLeft] = 0;
    } else {
      res = this.#currentLeft[++this.#cursorLeft];
      this.#currentLeft[this.#cursorLeft] = 0;
    }

    this.#length--;
    return res;
  }

  popRight() {
    if (!this.#length) return;

    let res;

    if (this.#currentRight == this.#headArr && this.#length == 1) {
      this.#currentLeft++;
    }

    if (this.#cursorRight == 1) {
      res = this.#currentRight[this.#cursorRight - 1];
      this.#currentRight[this.#cursorRight - 1] = 0;
      this.#cursorRight = this.#capacity;
      this.#head.last = this.#head.last.prev;
      this.#head.last.next = null;
      this.#currentRight = this.#head.last;
    } else {
      res = this.#currentRight[--this.#cursorRight];
      this.#currentRight[this.#cursorRight] = 0;
    }

    console.log(this.#currentRight);
    this.#length--;
    return res;
  }

  pushRight(value) {
    let crowded = this.#cursorRight == this.#capacity;

    if (this.#length == 0) {
      this.#cursorLeft--;
    }

    if (crowded) {
      this.#currentRight = this.#head.append(new this.#TypedArray(this.#capacity));
      this.#cursorRight = 0;
    }

    this.#currentRight[this.#cursorRight++] = value;
    console.log(this.#currentRight);

    return ++this.#length;
  }

  pushLeft(value) {
    let crowded = this.#cursorLeft == -1;

    if (this.#length == 0) {
      this.#cursorRight++;
    }

    if (crowded) {
      this.#currentLeft = this.#head.prepend(new this.#TypedArray(this.#capacity));
      this.#cursorLeft = this.#capacity - 1;
    }

    this.#currentLeft[this.#cursorLeft--] = value;
    console.log(this.#currentLeft);

    return ++this.#length;
  }

  get length() {
    return this.#length;
  }
}

const dequeue = new Dequeue(Int32Array, 5);

console.log(dequeue.pushRight(1));
console.log(dequeue.pushRight(2));
console.log(dequeue.pushRight(3));
console.log(dequeue.pushRight(4));
console.log(dequeue.popRight(4));
