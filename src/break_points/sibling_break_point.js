import { BaseBreakPoint } from './base_break_point';

export class SiblingBreakPoint extends BaseBreakPoint {
  constructor() {
    super();
    this.lastTrailingNode = null;
  }

  addLeading(node, { breakBefore, breakInsideAvoid }) {
    if (!this.node) {
      this.node = this.lastTrailingNode;
      this.inheritedAvoid = breakInsideAvoid;
    }

    if (['avoid', 'avoid-page'].includes(breakBefore)) {
      this.avoid = true;
    }
    if (breakBefore === 'page') {
      this.force = true;
    }
  }

  addTrailing(node, { breakAfter }) {
    this.lastTrailingNode = node;

    if (['avoid', 'avoid-page'].includes(breakAfter)) {
      this.avoid = true;
    }
    if (breakAfter === 'page') {
      this.force = true;
    }
  }

  range(root, disableRules = []) {
    if (!this.node || (this.node === Node.ELEMENT_NODE && this.node.matches('td,th'))) {
      return null;
    }
    if (!disableRules.includes(2) && this.inheritedAvoid) {
      return null;
    }
    if (!disableRules.includes(1) && this.avoid) {
      return null;
    }

    const range = new Range();
    range.setStartAfter(this.node);
    range.setEndAfter(root.lastChild);
    return range;
  }
}
