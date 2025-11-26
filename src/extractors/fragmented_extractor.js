export class FragmentedExtractor {
  before(range) {
    const { startContainer } = range;
    if (
      startContainer.nodeType === Node.ELEMENT_NODE &&
      startContainer.matches('.page-content')
    ) {
      // Range is not inside an element
      return;
    }
    let node = startContainer;
    if (node.nodeType === Node.TEXT_NODE) {
      node = node.parentNode;
    }
    while (node && !node.matches('.page-content')) {
      node.dataset.fragmentedStart = 'true';
      node = node.parentNode;
    }
  }

  after(fragment) {
    fragment
      .querySelectorAll('[data-fragmented-start=true]')
      .forEach((node) => {
        delete node.dataset.fragmentedStart;
        node.dataset.fragmentedEnd = 'true';
      });
  }
}
