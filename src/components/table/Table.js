import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/table.selection';
import {
  isCell,
  keyMatches,
  matrix,
  nextSelector,
  shouldResize
} from '@/components/table/table.utils';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable(10);
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  onMousedown(event) {
    if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const ids = matrix(this.selection.current, $target);
        const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    } else if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }

  onKeydown(event) {
    if (keyMatches(event) && !event.shiftKey && !event.ctrlKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $nextEl = this.$root.find(nextSelector(event.code, id));
      this.selectCell($nextEl);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}
