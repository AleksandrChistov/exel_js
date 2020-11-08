import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  toHTML() {
    const value = this.store.getState().currentTitle || defaultTitle;
    return `
      <input type="text" class="input" value="${value}">
      <div class="buttons">
          <div class="button">
              <span class="material-icons">delete</span>
          </div>
          <div class="button">
              <span class="material-icons">exit_to_app</span>
          </div>
      </div>
    `;
  }

  onInput(event) {
    const value = $(event.target).text();
    this.$dispatch(changeTitle(value));
  }
}
