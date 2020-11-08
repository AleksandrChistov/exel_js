import {$} from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const resizeType = event.target.dataset.resize;
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const $cells = $root.findAll(`[data-col='${$parent.data.col}']`);
    const tableHeight = $root.$el.offsetHeight - 16;
    const tableWidth = $root.$el.offsetWidth;
    const coords = $parent.getCoords();
    let value = 0;

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
      document.onmousemove = null;
      document.onmouseup = null;

      if (resizeType === 'col') {
        const deltaX = e.clientX - coords.right;
        value = coords.width + deltaX;

        $parent.css({width: `${value}px`});

        $cells.forEach(cell =>
          $(cell).css({width: `${value}px`}));

        $resizer.css({right: null, height: null, opacity: null});
      } else {
        const deltaY = e.clientY - coords.bottom;
        value = coords.height + deltaY;
        $parent.css({height: `${value}px`});

        $resizer.css({bottom: null, width: null, opacity: null});
      }

      resolve({type: resizeType, id: $parent.data[resizeType], value});
    };
  });
}
