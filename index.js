class ListNode {
  value = null;
  prev = null;
  next = null;

  constructor(value) {
    this.value = value;
  }
}

class DoubleLinkedList {
  first = null;
  last = null;
  length = 0;

  constructor(value) {
    this.first = new ListNode(value);
    this.last = this.first;
    this.length = 1;
  }

  append(value) {
    const newListNode = new ListNode(value);

    newListNode.prev = this.last;
    this.last.next = newListNode;
    this.last = newListNode;
    this.length++;
  }

  prepend(value) {
    const newListNode = new ListNode(value);

    newListNode.next = this.first;
    this.first.prev = newListNode;
    this.first = newListNode;
    this.length++;
  }

  reverse() {
    if (!this.first.next) return;

    let current = this.first.next;

    while (current.next) {
      [current.prev, current.next] = [current.next, current.prev];
      current = current.prev;
    }

    this.first.prev = this.first.next;
    this.last.next = this.last.prev;
    this.first.next = null;
    this.last.prev = null;
    [this.first, this.last] = [this.last, this.first];
  }

  [Symbol.iterator]() {
    let current = this.first;

    return {
      next() {
        let value = current;
        current = current.next;

        return { done: current === null, value: value };
      }
    };
  }
}

const newList = new DoubleLinkedList(1);

newList.append(2);
newList.append(3);
newList.append(4);
newList.append(5);

// newList.reverse();

// console.log(newList.first.value); // 1
// console.log(newList.first.next.value); // 2
// console.log(newList.first.next.next.value); // 3
// console.log(newList.first.next.next.next.value); // 4
// console.log(newList.last.value); // 5

for (const iterator of newList) {
  console.log(iterator);
}
