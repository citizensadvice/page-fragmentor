export class NodeRules extends Map {
  get(node) {
    if (node instanceof Text) {
      return this.get(node.parentNode);
    }
    if (!(node instanceof Element)) {
      // TODO: Don't go higher than the page root
      return {
        breakInsideAvoid: 0,
        breakInsideParentAvoid: 0,
        breakAfter: 'auto',
        breakBefore: 'auto',
        orphans: 2,
        widows: 2,
      };
    }
    if (this.has(node)) {
      return super.get(node);
    }
    const rule = this.findInheritedRule(node);
    this.set(node, rule);
    return rule;
  }

  maxDepth() {
    return Math.max(...[...this.values()].map((r) => r.breakInsideAvoid));
  }

  findInheritedRule(node) {
    const parentRule = this.get(node.parentNode);
    const styles = window.getComputedStyle(node);
    const breakInside = this.breakInside(node, styles);
    return {
      breakInsideAvoid: parentRule.breakInsideAvoid + (breakInside ? 1 : 0),
      breakInsideParentAvoid: parentRule.breakInsideAvoid,
      breakAfter: styles.getPropertyValue('break-after'),
      breakBefore: styles.getPropertyValue('break-before'),
      orphans: parseInt(styles.getPropertyValue('--orphans') || styles.getPropertyValue('orphans') || 2, 10),
      widows: parseInt(styles.getPropertyValue('--widows') || styles.getPropertyValue('widows') || 2, 10),
    };
  }

  breakInside(node, styles) {
    return ['avoid', 'avoid-page'].includes(styles.getPropertyValue('break-inside'));
  }
}
