import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const resizeType = event.target.dataset.resize;
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const tableHeight = $root.$el.offsetHeight - 16;
  const tableWidth = $root.$el.offsetWidth;
  const colNumber = $parent.data.col;
  const $cells = $root.findAll(`[data-col='${colNumber}']`);
  const coords = $parent.getCoords();

  document.onmousemove = e => {
    if (resizeType === 'col') {
      const deltaX = e.clientX - coords.right;
      $resizer.css({
        right: `${-deltaX}px`,
        height: `${tableHeight}px`,
        opacity: '1'
      });
    } else {
      const deltaY = e.clientY - coords.bottom;
      $resizer.css({
        bottom: `${-deltaY}px`,
        width: `${tableWidth}px`,
        opacity: '1'
      });
    }
  };

  document.onmouseup = e => {
    if (resizeType === 'col') {
      const deltaX = e.clientX - coords.right;
      $parent.css({width: `${coords.width + deltaX}px`});

      $cells.forEach(cell =>
        $(cell).css({width: `${coords.width + deltaX}px`}));

      $resizer.css({right: null, height: null, opacity: null});
    } else {
      const deltaY = e.clientY - coords.bottom;
      $parent.css({height: `${coords.height + deltaY}px`});

      $resizer.css({bottom: null, width: null, opacity: null});
    }

    document.onmousemove = null;
    document.onmouseup = null;
  };
}
