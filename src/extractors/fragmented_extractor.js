export class FragmentedExtractor {
  before(range) {
    const { startContainer } = range;
    if (startContainer.nodeType === Node.ELEMENT_NODE && startContainer.matches('.page-content')) {
      // Range is not inside an element
      return;
    }
    let node = startContainer;
    if (node.nodeType === Node.TEXT_NODE) {
      node = node.parentNode;
    }
    node = node.closest('.page-content > *');
    if (node) {
      node.dataset.fragmentedStart = 'true';
    }
  }

  after(fragment) {
    const node = fragment.querySelector('[data-fragmented-start=true]');
    if (node) {
      delete node.dataset.fragmentedStart;
      node.dataset.fragmentedEnd = 'true';
    }
  }
}
