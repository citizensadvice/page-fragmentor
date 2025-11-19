!(function () {
  var e = {};
  Object.defineProperty(e, '__esModule', { value: !0 });
  var t = function () {
    const e = (0, A.parsePageSize)(
      window.getComputedStyle(document.body).getPropertyValue('--page-size'),
    );
    (document.documentElement.style.setProperty('--page-width', e[0]),
      document.documentElement.style.setProperty('--page-height', e[1]));
    const t = Q('body > header'),
      o = Q('body > footer');
    let r = (function () {
      const e = document.querySelector('body > main'),
        t = K(e || document.body);
      return (null == e || e.remove(), t);
    })();
    document.body.innerHTML = '';
    let i = 0,
      a = !1;
    for (; a || !i || (r && !Y(r)); ) {
      i += 1;
      const e = $({ footer: o, header: t, pageNumber: i });
      r && e.appendChild(r);
      const s = e.closest('.page');
      s.dispatchEvent(new CustomEvent('create-page', { bubbles: !0 }));
      let d = (0, n.getOverflowingRange)(e);
      if (Z(d)) {
        if (
          ((s.dataset.lastPage = 'true'),
          (d = (0, n.getOverflowingRange)(e)),
          a)
        )
          break;
        Z(d) ||
          (delete s.dataset.lastPage,
          (a = !0),
          (d = (0, n.getOverflowingRange)(e)));
      }
      d
        ? (s.dispatchEvent(
            new CustomEvent('before-fragmentation', { detail: d, bubbles: !0 }),
          ),
          (r = (0, I.extract)(d)),
          s.dispatchEvent(
            new CustomEvent('after-fragmentation', { detail: r, bubbles: !0 }),
          ))
        : (r = null);
    }
    (document.body.style.setProperty('--page-count', i),
      (document.body.dataset.pageCount = i),
      document.body.dispatchEvent(
        new CustomEvent('fragmentation-finished', { bubbles: !0 }),
      ));
  };
  e.createPages = t;
  var n = {};
  Object.defineProperty(n, '__esModule', { value: !0 });
  var o = function (e) {
    const t = (0, r.breakPointGenerator)(e),
      n = [];
    let o = !1;
    for (const e of t) {
      if (!o && e.force && !e.overflowing) {
        const t = e.range();
        if (t) return t;
      }
      if (!o && e.overflowing) {
        o = !0;
        for (const e of (0, C.ruleDisablerGenerator)(n))
          for (const t of n) {
            const n = t.range(e);
            if (n) return n;
          }
      }
      if (o) {
        const t = e.range({ disableRules: [1, 3, 4], avoidDepth: 1 / 0 });
        if (t) return t;
      } else n.unshift(e);
    }
    return null;
  };
  n.getOverflowingRange = o;
  var r = {};
  Object.defineProperty(r, '__esModule', { value: !0 });
  var i = function* (e) {
    const t = new c.RectFilter();
    t.acceptNode = t.acceptNode.bind(t);
    const n = (0, a.nodeGenerator)(e, t),
      o = new O.NodeRules();
    let r,
      i = new T.SiblingBreakPoint({ root: e, nodeRules: o, rectFilter: t });
    for (const [a, s] of n) {
      switch (a) {
        case 'enter':
          if ('inline' === r) {
            const n = i;
            (yield i,
              (i = new T.SiblingBreakPoint({
                root: e,
                nodeRules: o,
                rectFilter: t,
              })),
              i.trailingNodes.unshift(n.lastNode));
          }
          i.leadingNodes.push(s);
          break;
        case 'inline':
          ('exit' === r && i.leadingNodes.push(s),
            r !== a &&
              (yield i,
              (i = new p.InlineBreakPoint({
                root: e,
                nodeRules: o,
                rectFilter: t,
              }))),
            i.nodes.push(s));
          break;
        case 'exit':
          (r !== a &&
            (yield i,
            (i = new T.SiblingBreakPoint({
              root: e,
              nodeRules: o,
              rectFilter: t,
            }))),
            i.trailingNodes.unshift(s));
          break;
        default:
          throw new Error('unexpected node type '.concat(a));
      }
      r = a;
    }
    (yield i,
      yield new g.BaseBreakPoint({ root: e, nodeRules: o, rectFilter: t }));
  };
  r.breakPointGenerator = i;
  var a = {};
  Object.defineProperty(a, '__esModule', { value: !0 });
  var s = function* (e, t) {
    const n = document.createTreeWalker(e, l, t);
    if (!n.nextNode()) return;
    yield* d(n);
  };
  function* d(e, t = !1) {
    do {
      const { currentNode: n } = e;
      if (n.nodeType === Node.TEXT_NODE) {
        yield ['inline', n];
        continue;
      }
      const o = t || window.getComputedStyle(n).display.includes('inline');
      (yield [o ? 'inline' : 'enter', n],
        'table-row' === window.getComputedStyle(n).display ||
          (!n.matches(
            'picture,video,canvas,object,audio,embed,iframe,svg,math',
          ) &&
            e.firstChild() &&
            (yield* d(e, o), e.parentNode())),
        o || (yield ['exit', n]));
    } while (e.nextSibling());
  }
  a.nodeGenerator = s;
  const l = NodeFilter.SHOW_ELEMENT + NodeFilter.SHOW_TEXT;
  var c = {};
  Object.defineProperty(c, '__esModule', { value: !0 });
  var u = void 0;
  c.RectFilter = u;
  class f extends Map {
    get(e) {
      if (this.has(e)) return super.get(e);
      let t;
      if (e.nodeType === Node.TEXT_NODE) {
        const n = new Range();
        (n.selectNode(e), (t = n.getBoundingClientRect()));
      } else t = e.getBoundingClientRect();
      return (this.set(e, t), t);
    }
    acceptNode(e) {
      return 0 === this.get(e).height
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    }
  }
  ((u = f), (c.RectFilter = u));
  var g = {};
  Object.defineProperty(g, '__esModule', { value: !0 });
  var h = void 0;
  g.BaseBreakPoint = h;
  ((h = class {
    constructor({ rectFilter: e, nodeRules: t, root: n }) {
      ((this.rectFilter = e),
        (this.nodeRules = t),
        (this.root = n),
        (this.type = 'base'));
    }
    get force() {
      return !1;
    }
    get avoid() {
      return !1;
    }
    get overflowing() {
      return this.root.scrollHeight > this.root.clientHeight;
    }
    range() {
      return null;
    }
    get rootRect() {
      return this.rectFilter.get(this.root);
    }
  }),
    (g.BaseBreakPoint = h));
  var p = {};
  Object.defineProperty(p, '__esModule', { value: !0 });
  var m = void 0;
  p.InlineBreakPoint = m;
  var b = {};
  Object.defineProperty(b, '__esModule', { value: !0 });
  var v = function* (e) {
    const t = window.getSelection(),
      n = e.find((e) => e.nodeType === Node.TEXT_NODE),
      o = [...e].reverse().find((e) => e.nodeType === Node.TEXT_NODE);
    if (!n) return;
    const r = new Range();
    (r.setStart(n, 0),
      r.setEnd(o, o.data.length),
      t.empty(),
      t.addRange(r),
      t.collapseToStart());
    let i = null;
    for (;;) {
      t.modify('extend', 'forward', 'line');
      const n = t.getRangeAt(0);
      if ((i && n.setStart(i.endContainer, i.endOffset), n.collapsed)) return;
      if (0 === n.endOffset && n.endContainer.nodeType === Node.ELEMENT_NODE) {
        const t = e.find(
          (e) =>
            e.nodeType === Node.TEXT_NODE &&
            e !== n.endContainer &&
            1 === n.comparePoint(e, 0),
        );
        t && n.setEndBefore(t);
      }
      if (
        (-1 === r.compareBoundaryPoints(Range.END_TO_END, n) &&
          n.setEnd(r.endContainer, r.endOffset),
        i && 0 === n.compareBoundaryPoints(Range.START_TO_START, i))
      )
        break;
      if ((yield n, 0 === r.compareBoundaryPoints(Range.END_TO_END, n))) break;
      i = n.cloneRange();
    }
  };
  b.lineBoxGenerator = v;
  var y = {};
  Object.defineProperty(y, '__esModule', { value: !0 });
  var N = function (e, t, n) {
    let o = 0,
      r = e.parentNode,
      i =
        e.nodeType === Node.ELEMENT_NODE
          ? window.getComputedStyle(e)
          : { getPropertyValue: () => 0 },
      a = [E(i, 'margin-bottom')];
    n && ((o += E(i, 'padding-bottom')), (o += E(i, 'border-bottom-width')));
    for (; r && !r.contains(t); )
      ((i = window.getComputedStyle(r)),
        w(i)
          ? a.push(E(i, 'margin-bottom'))
          : ((o += R(a)),
            (a = [E(i, 'margin-bottom')]),
            (o += E(i, 'padding-bottom')),
            (o += E(i, 'border-bottom-width'))),
        (r = r.parentNode));
    return ((o += R(a)), o);
  };
  function E(e, t) {
    return parseFloat(e.getPropertyValue(t)) || 0;
  }
  function w(e) {
    return (
      !E(e, 'padding-bottom') &&
      !E(e, 'border-bottom-width') &&
      !e.display.includes('inline') &&
      'visible' === e.overflow &&
      'none' === e.float
    );
  }
  function R(e) {
    return Math.max(
      0,
      Math.max(0, ...e.filter((e) => e >= 0)) +
        Math.min(0, ...e.filter((e) => e < 0)),
    );
  }
  y.getMargin = N;
  class _ extends g.BaseBreakPoint {
    constructor(...e) {
      (super(...e), (this.nodes = []), (this.type = 'inline'));
    }
    get overflowing() {
      return this.rectFilter.get(this.firstNode).top > this.rootRect.bottom;
    }
    range({ disableRules: e = [], avoidDepth: t = 0 } = {}) {
      const { widows: n, orphans: o } = this.containerRules;
      if (0 === n && 0 === o) return null;
      if (
        !(e.includes(4) && this.containerRules.breakInsideAvoid <= t) &&
        this.containerRules.breakInsideAvoid
      )
        return null;
      const r = this.findLineBoxRange(e.includes(3)),
        i = this.findFirstOverflowingNodeRange();
      let a = r || i;
      if (
        (r &&
          i &&
          (a = 1 === r.compareBoundaryPoints(Range.START_TO_START, i) ? r : i),
        !a)
      )
        return null;
      const s = new Range();
      return (
        s.setStart(a.startContainer, a.startOffset),
        s.setEndAfter(this.root.lastChild),
        s
      );
    }
    findLineBoxRange(e) {
      let { widows: t, orphans: n } = this.containerRules;
      ((t = t || 2), (n = n || 2), e && ((t = 1), (n = 1)));
      let o,
        r = [],
        i = !1;
      for (const e of (0, b.lineBoxGenerator)(this.nodes)) {
        if (!i) {
          e.getBoundingClientRect().bottom >
            this.rootRect.bottom - this.bottomSpace &&
            ((i = e), (o = r.length));
        }
        if (i && r.length > o + t - 1) break;
        r.push(e);
      }
      if (void 0 !== o) {
        if (o < n) return null;
        r = r.slice(n);
      }
      return 1 === r.length ? null : r[r.length - t] || null;
    }
    findFirstOverflowingNodeRange() {
      const e = this.nodes.find(
        (e) =>
          this.rectFilter.get(e).bottom >
          this.rootRect.bottom - (0, y.getMargin)(e, this.root),
      );
      if (!e || e.nodeType === Node.TEXT_NODE || e === this.firstNode)
        return null;
      const t = new Range();
      return (t.setStartBefore(e), t);
    }
    get container() {
      if (this._container) return this._container;
      const e = new Range();
      (e.setStartBefore(this.firstNode), e.setEndAfter(this.lastNode));
      let t = e.commonAncestorContainer;
      return (
        t.nodeType === Node.TEXT_NODE && (t = t.parentNode),
        (this._container = t),
        t
      );
    }
    get bottomSpace() {
      var e;
      return null !== (e = this._bottomSpace) && void 0 !== e
        ? e
        : (this._bottomSpace = (0, y.getMargin)(this.container, this.root, !0));
    }
    get containerRules() {
      var e;
      return null !== (e = this._containerRules) && void 0 !== e
        ? e
        : (this._containerRules = this.nodeRules.get(this.container));
    }
    get firstNode() {
      return this.nodes[0];
    }
    get lastNode() {
      return this.nodes[this.nodes.length - 1];
    }
  }
  ((m = _), (p.InlineBreakPoint = m));
  var T = {};
  Object.defineProperty(T, '__esModule', { value: !0 });
  var x = void 0;
  T.SiblingBreakPoint = x;
  class P extends g.BaseBreakPoint {
    constructor(...e) {
      (super(...e), (this.leadingNodes = []), (this.trailingNodes = []));
    }
    get force() {
      var e;
      return null !== (e = this._force) && void 0 !== e
        ? e
        : (this._force =
            this.leadingNodes.some(
              (e) => 'page' === this.nodeRules.get(e).breakBefore,
            ) ||
            this.trailingNodes.some(
              (e) => 'page' === this.nodeRules.get(e).breakAfter,
            ));
    }
    get overflowing() {
      return (
        this.leadingNodes.some(this.hasLeadingOverflow, this) ||
        this.trailingNodes.some(this.hasTrailingOverflow, this)
      );
    }
    get avoid() {
      return (
        this.leadingNodes.some((e) =>
          ['avoid', 'avoid-page'].includes(this.nodeRules.get(e).breakBefore),
        ) ||
        this.trailingNodes.some((e) =>
          ['avoid', 'avoid-page'].includes(this.nodeRules.get(e).breakAfter),
        )
      );
    }
    get bottom() {
      let e = 0;
      for (const t of this.trailingNodes) {
        const n = this.getBottom(t);
        if (n < e) return e;
        e = n;
      }
      return e;
    }
    range({ disableRules: e = [], avoidDepth: t = 0 } = {}) {
      const { node: n, force: o, avoid: r } = this;
      if (!n || n === Node.ELEMENT_NODE) return null;
      if (!o && this.nodeRules.get(n).breakInsideParentAvoid > t) return null;
      if (!o && !e.includes(1) && r) return null;
      const i = new Range();
      return (i.setStartAfter(n), i.setEndAfter(this.root.lastChild), i);
    }
    get node() {
      return this.trailingNodes[0];
    }
    hasLeadingOverflow(e) {
      return this.rectFilter.get(e).top > this.rootRect.bottom;
    }
    getBottom(e) {
      const t = this.rectFilter.get(e);
      return Math.ceil(t.bottom + (0, y.getMargin)(e, this.root));
    }
    hasTrailingOverflow(e) {
      return this.getBottom(e) > Math.floor(this.rootRect.bottom);
    }
  }
  ((x = P), (T.SiblingBreakPoint = x));
  var O = {};
  Object.defineProperty(O, '__esModule', { value: !0 });
  var B = void 0;
  O.NodeRules = B;
  class S extends Map {
    get(e) {
      if (e instanceof Text) return this.get(e.parentNode);
      if (!(e instanceof Element))
        return {
          breakInsideAvoid: 0,
          breakInsideParentAvoid: 0,
          breakAfter: 'auto',
          breakBefore: 'auto',
          orphans: 2,
          widows: 2,
        };
      if (this.has(e)) return super.get(e);
      const t = this.findInheritedRule(e);
      return (this.set(e, t), t);
    }
    maxDepth() {
      return Math.max(...[...this.values()].map((e) => e.breakInsideAvoid));
    }
    findInheritedRule(e) {
      const t = this.get(e.parentNode),
        n = window.getComputedStyle(e),
        o = this.breakInside(e, n);
      return {
        breakInsideAvoid: t.breakInsideAvoid + (o ? 1 : 0),
        breakInsideParentAvoid: t.breakInsideAvoid,
        breakAfter: n.getPropertyValue('break-after'),
        breakBefore: n.getPropertyValue('break-before'),
        orphans: parseInt(
          n.getPropertyValue('--orphans') || n.getPropertyValue('orphans') || 2,
          10,
        ),
        widows: parseInt(
          n.getPropertyValue('--widows') || n.getPropertyValue('widows') || 2,
          10,
        ),
      };
    }
    breakInside(e, t) {
      return ['avoid', 'avoid-page'].includes(
        t.getPropertyValue('break-inside'),
      );
    }
  }
  ((B = S), (O.NodeRules = B));
  var C = {};
  Object.defineProperty(C, '__esModule', { value: !0 });
  var k = function* (e) {
    (yield { disableRules: [] }, yield { disableRules: [3] });
    for (const t of (function* (e) {
      const t = e[0].nodeRules.maxDepth();
      for (let e = 0; e <= t; e += 1) yield e;
    })(e))
      (yield { disableRules: [3], avoidDepth: t },
        yield { disableRules: [1, 3], avoidDepth: t },
        yield { disableRules: [1, 3, 4], avoidDepth: t });
  };
  C.ruleDisablerGenerator = k;
  var A = {};
  Object.defineProperty(A, '__esModule', { value: !0 });
  var M = function (e) {
    if (!(e = e.trim()) || 'auto' === e) return F.A4;
    const t = D.exec(e);
    if (!t) {
      const t = e.split(/\s+/);
      return (1 === t.length && t.push(t[0]), t);
    }
    let [, n, o] = t;
    ['portrait', 'landscape'].includes(n) && ((o = n), (n = 'A4'));
    const r = [...F[n]];
    'landscape' === o && r.reverse();
    return r;
  };
  A.parsePageSize = M;
  const D =
      /^(A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger|landscape|portrait)(?:\s+(landscape|portrait)$)?/,
    F = {
      A5: ['148mm', '210mm'],
      A4: ['210mm', '297mm'],
      A3: ['297mm', '420mm'],
      B5: ['176mm', '250mm'],
      B4: ['250mm', '353mm'],
      'JIS-B5': ['182mm', '257mm'],
      'JIS-B4': ['257mm', '364mm'],
      letter: ['8.5in', '11in'],
      legal: ['8.5in', '14in'],
      ledger: ['11in', '17in'],
    };
  var I = {};
  Object.defineProperty(I, '__esModule', { value: !0 });
  var L = function (e) {
    const t = [
      new j.TableExtractor(),
      new G.ListExtractor(),
      new z.FragmentedExtractor(),
    ];
    t.forEach((t) => t.before(e));
    const n = e.extractContents();
    return (t.forEach((e) => e.after(n)), n);
  };
  I.extract = L;
  var j = {};
  Object.defineProperty(j, '__esModule', { value: !0 });
  var X = void 0;
  j.TableExtractor = X;
  var V = {};
  Object.defineProperty(V, '__esModule', { value: !0 });
  var H = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (e) => {
      const t = (16 * Math.random()) | 0;
      return ('x' === e ? t : (3 & t) | 8).toString(16);
    });
  };
  function q(e) {
    if (!e.querySelector('col')) {
      const t = [...e.rows[0].cells].reduce((e, t) => e + t.colSpan, 0);
      for (let n = 0; n < t; n += 1) {
        const t = document.createElement('col');
        ((t.dataset.fragmenationCol = !0), e.prepend(t));
      }
    }
    [...e.querySelectorAll('col')].forEach((e) => {
      const { width: t } = e.getBoundingClientRect();
      t && (e.style.width = ''.concat(Math.ceil(t), 'px'));
    });
  }
  V.uuid = H;
  ((X = class {
    before(e) {
      this.tables = (function (e) {
        const t = [];
        let n = e.startContainer;
        for (
          n.nodeType === Node.TEXT_NODE && (n = n.parentNode),
            n = n.closest('table');
          n;

        )
          ((n.dataset.fragmentationUuid = (0, V.uuid)()),
            q(n),
            t.push(n),
            (n = n.parentNode.closest('table')));
        return t;
      })(e);
    }
    after(e) {
      this.tables.forEach((t) => {
        const n = e.querySelector(
          'table[data-fragmentation-uuid="'.concat(
            t.dataset.fragmentationUuid,
            '"]',
          ),
        );
        n &&
          ([...t.querySelectorAll('col[data-fragmentation-col]')].forEach((e) =>
            e.remove(),
          ),
          !n.tHead && t.tHead && (n.tHead = t.tHead.cloneNode(!0)),
          delete n.dataset.fragmentationUuid);
      });
    }
  }),
    (j.TableExtractor = X));
  var G = {};
  Object.defineProperty(G, '__esModule', { value: !0 });
  var U = void 0;
  function J(e) {
    return (
      e.nodeType === Node.ELEMENT_NODE &&
      e.matches('li') &&
      e.getBoundingClientRect().height > 0
    );
  }
  G.ListExtractor = U;
  ((U = class {
    before(e) {
      this.lists = (function (e) {
        const t = [];
        let n = e.startContainer;
        for (
          n.nodeType === Node.TEXT_NODE && (n = n.parentNode),
            n = n.closest('ol');
          n;

        ) {
          if (
            ((n.dataset.fragmentationUuid = (0, V.uuid)()),
            t.push(n),
            n.reversed)
          ) {
            const e = [...n.childNodes].filter(J).length;
            n.start = e;
          }
          n = n.parentNode.closest('ol');
        }
        return t;
      })(e);
    }
    after(e) {
      this.lists.forEach((t) => {
        const n = [...t.childNodes].filter(J).length,
          o = e.querySelector(
            'ol[data-fragmentation-uuid="'.concat(
              t.dataset.fragmentationUuid,
              '"]',
            ),
          );
        o &&
          (o.reversed ? (o.start = t.start - n) : (o.start = t.start + n),
          delete o.dataset.fragmentationUuid);
      });
    }
  }),
    (G.ListExtractor = U));
  var z = {};
  Object.defineProperty(z, '__esModule', { value: !0 });
  var W = void 0;
  z.FragmentedExtractor = W;
  function $({ footer: e, header: t, pageNumber: n }) {
    const o = document.createElement('div');
    (o.classList.add('page'),
      o.setAttribute('role', 'region'),
      o.setAttribute('aria-label', 'Page '.concat(n)),
      o.setAttribute('data-page-number', n),
      o.style.setProperty('--page-number', n),
      document.body.appendChild(o));
    const r = document.createElement('div');
    if ((r.classList.add('page-inner'), o.appendChild(r), t)) {
      const e = document.createElement('div');
      (e.classList.add('page-header'),
        r.appendChild(e),
        e.appendChild(t.cloneNode(!0)));
    }
    const i = document.createElement('div');
    if ((i.classList.add('page-content'), r.appendChild(i), e)) {
      const t = document.createElement('div');
      (t.classList.add('page-footer'),
        r.appendChild(t),
        t.appendChild(e.cloneNode(!0)));
    }
    return i;
  }
  function K(e) {
    const t = document.createDocumentFragment();
    return (
      Array.from(e.childNodes).forEach((e) => {
        t.appendChild(e);
      }),
      t
    );
  }
  function Q(e) {
    const t = document.querySelector(e);
    return t ? K(t) : null;
  }
  function Y(e) {
    return (
      !e.hasChildNodes() ||
      (1 === e.childNodes.length &&
        e.firstChild.nodeType === Node.TEXT_NODE &&
        !e.firstChild.data.trim())
    );
  }
  function Z(e) {
    return !(e && !e.collapsed && !Y(e.cloneContents()));
  }
  ((W = class {
    before(e) {
      const { startContainer: t } = e;
      if (t.nodeType === Node.ELEMENT_NODE && t.matches('.page-content'))
        return;
      let n = t;
      for (
        n.nodeType === Node.TEXT_NODE && (n = n.parentNode);
        n && !n.matches('.page-content');

      )
        ((n.dataset.fragmentedStart = 'true'), (n = n.parentNode));
    }
    after(e) {
      e.querySelectorAll('[data-fragmented-start=true]').forEach((e) => {
        (delete e.dataset.fragmentedStart, (e.dataset.fragmentedEnd = 'true'));
      });
    }
  }),
    (z.FragmentedExtractor = W),
    window.addEventListener('DOMContentLoaded', async () => {
      document.body.setAttribute('aria-busy', 'true');
    }),
    window.addEventListener('load', async () => {
      (await document.fonts.ready,
        (0, e.createPages)(),
        document.body.setAttribute('aria-busy', 'false'),
        window.getSelection().empty(),
        window.scrollTo(0, 0));
    }));
})();
//# sourceMappingURL=auto.js.map
