export function observeElementResize(element, callback) {
  const resizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0];

    let width = 0;
    let height = 0;
    let contentBoxSize = null;
    let borderBoxSize = null;

    if (entry.contentBoxSize) {
      // The standard makes contentBoxSize an array...
      // The array is necessary to support elements that have multiple fragments, which occur in multi-column scenarios
      if (entry.contentBoxSize[0]) {
        contentBoxSize = entry.contentBoxSize[0];
        borderBoxSize = entry.borderBoxSize[0];
        width = entry.contentBoxSize[0].inlineSize;
        height = entry.contentBoxSize[0].blockSize;
      } else {
        // ...but old versions of Firefox treat it as a single item
        contentBoxSize = entry.contentBoxSize;
        borderBoxSize = entry.borderBoxSize;
        width = entry.contentBoxSize.inlineSize;
        height = entry.contentBoxSize.blockSize;
      }
    } else {
      // If no contextBoxSize is defined use contentRect
      // this is better supported than the above two,
      // but it is left over from an earlier implementation of the Resize Observer API
      // and may be deprecated in the future
      width = entry.contentRect.width;
      height = entry.contentRect.height;
    }

    callback({
      entry,
      contentBoxSize,
      borderBoxSize,
      width,
      height,
    });
  });

  resizeObserver.observe(element);

  return resizeObserver;
}
