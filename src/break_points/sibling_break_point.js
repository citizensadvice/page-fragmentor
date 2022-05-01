import { BaseBreakPoint } from './base_break_point';

/**
 * Represents a class A breakpoint
 */
export class SiblingBreakPoint extends BaseBreakPoint {
  constructor(...args) {
    super(...args);
    this.leadingNodes = [];
    this.trailingNodes = [];
  }

  get force() {
    return (this._force ??= this.leadingNodes.some((node) => this.nodeRules.get(node).breakBefore === 'page')
      || this.trailingNodes.some((node) => this.nodeRules.get(node).breakAfter === 'page'));
  }

  get overflowing() {
    return this.leadingNodes.some(this.hasLeadingOverflow, this)
      || this.trailingNodes.some(this.hasTrailingOverflow, this);
  }

  get avoid() {
    return this.leadingNodes.some((node) => ['avoid', 'avoid-page'].includes(this.nodeRules.get(node).breakBefore))
      || this.trailingNodes.some((node) => ['avoid', 'avoid-page'].includes(this.nodeRules.get(node).breakAfter));
  }

  get bottom() {
    let bottom = 0;
    for (const node of this.trailingNodes) {
      const nodeBottom = this.getBottom(node);
      if (nodeBottom < bottom) {
        return bottom;
      }
      bottom = nodeBottom;
    }
    return bottom;
  }

  range({ disableRules = [], avoidDepth = 0 } = {}) {
    const { node, force, avoid } = this;

    if (!node || node === Node.ELEMENT_NODE) {
      return null;
    }

    if (!force && this.nodeRules.get(node).breakInsideParentAvoid > avoidDepth) {
      return null;
    }
    if (!force && !disableRules.includes(1) && avoid) {
      return null;
    }

    const range = new Range();
    range.setStartAfter(node);
    range.setEndAfter(this.root.lastChild);
    return range;
  }

  // Internals
  // ---------

  get node() {
    return this.trailingNodes[0];
  }

  hasLeadingOverflow(node) {
    const rect = this.rectFilter.get(node);
    return rect.top > this.rootRect.bottom;
  }

  getBottom(node) {
    const rect = this.rectFilter.get(node);
    const style = node.nodeType === Node.ELEMENT_NODE ? window.getComputedStyle(node) : {};
    return Math.ceil(rect.bottom + (parseFloat(style.marginBottom) || 0));
  }

  hasTrailingOverflow(node) {
    return this.getBottom(node) > Math.floor(this.rootRect.bottom);
  }
}
