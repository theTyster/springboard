//
// A linked list is a collection of nodes which reference the next node in
// a specified order.
//
// 1->2->3->4
//
// This is performant for operations which do more adding and removing from a
// list than reading from it. Since adding and removing can be done by simply
// changing node references.
//
// 1---->3->4



/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  _get(idx){

    let current = this.head;
    let count = 0;

    while (current !== null && count !== idx) {
      count++
      current = current.next;
    }
    return current;
  }

  /** push(val): add new value to end of list. */

  push(val) {

    !this.head ? 
      this.head = this.tail = new Node(val)
    :
      this.tail = this.tail.next = new Node(val);

    ++this.length;
  }


  /** unshift(val): add new value to start of list. */

  unshift(val) {

    if(this.head){
      const nextVal = this.head;
      this.head = new Node(val);
      this.head.next = nextVal;
    }
    else{
      this.head = new Node(val);
      this.tail = new Node(val);
    }

    ++this.length;
    return val;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {

    const oldHead = this.head;
    this.head = this.head.next;
    if(--this.length === 0) this.tail = this.head; 
    return oldHead.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {

    const changedNode = this._get(idx);
    changedNode.val = val;

    return val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {

    //insert into empty
    if (this.length === 0) return this.push(val);

    // insert at the end
    if(idx === this.length) return this.push(val);

    const insertionPoint = this._get(idx - 1);
    const next = insertionPoint.next;
    insertionPoint.next = new Node(val);
    insertionPoint.next.next = next;

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {

    //first item
    if(idx === 0){
      const removedHead = this.head;
      this.head = removedHead.next;
      this.length--;
      if(this.length < 2) this.tail = this.head;

      return removedHead.val;
    }

    //last item
    if (idx === this.length - 1){
      const prev = this._get(idx - 1);
      const val = prev.next.val
      this.tail = prev;
      this.tail.next = null;
      this.length--;
      
      return val;
    }

    //middle item
    const prev = this._get(idx - 1);
    prev.next = prev.next.next;
    this.length--;

    return prev.next.val;

  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0)  return 0;

    let total = 0
    let current = this.head;

    while (current){
      total += current.val;
      current = current.next;
    }

    return total / this.length;
  }
}

module.exports = LinkedList;
