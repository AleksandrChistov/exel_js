import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
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
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

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
    return createTable(10, this.store.getState());
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', (value) => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value));
      this.updateTextInStore(value);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }));
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);

    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.resizeTable(data));
    } catch (e) {
      console.warn('Resize error: ', e.message);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }));
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
      this.resizeTable(event);
    }
  }

  onKeydown(event) {
    if (keyMatches(event) && !event.shiftKey && !event.ctrlKey) {
      event.preventDefault();

      const value = $(event.target).text();
      this.selection.current.text(parse(value));

      const id = this.selection.current.id(true);
      const $nextEl = this.$root.find(nextSelector(event.code, id));
      this.selectCell($nextEl);
    }
  }

  onInput(event) {
    const $target = $(event.target);
    $target.attr('data-value', $target.text());
    this.updateTextInStore($target.text());
  }
}
