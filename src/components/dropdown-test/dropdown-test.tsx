import { Component, Prop, Fragment, h, Element, State, Listen } from '@stencil/core';

@Component({ tag: 'dropdown-test', styleUrl: 'dropdown-test.css', shadow: true })
export class DropdownElement {
  @Element() el: HTMLElement;
  
  @Prop() options!: any[];
  @Prop({ mutable: true, reflect: true }) isOpen: boolean;
 
  @State() filteredOptions: any[];
  @State() searchQuery: string = '';
  @State() selectedOption: any;

  searchInputElement: HTMLElement;

  @Listen('click', { target: 'window' })
  clickHandler(e: Event) {
    if (e.target !== this.el) {
      this.closeDropdown();
    }
  }

  componentWillLoad() {
    this.filteredOptions = this.options;
  }

  componentDidUpdate() {
    this.searchInputElement = this.el.shadowRoot.querySelector('.dropdown-trigger__searchBar');
    if (this.searchInputElement) {
      this.searchInputElement.focus();
    }
  }

  searchOptions(searchQuery: string): void {
    if (!searchQuery) {
      this.filteredOptions = this.options;
      return;
    }
    this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  private openDropdown = (): void => {   
    this.isOpen = true;
  }

  private closeDropdown = (): void => {
    this.isOpen = false;
  }

  private keyUpHandler = (e: KeyboardEvent): void => {
    this.searchOptions(e.target['value']);
    this.searchQuery = e.target['value'];
  }

  private optionChangeHandler = (el: DropdownElement, option): void => {
    this.selectedOption = option;
    this.searchQuery = '';
    this.filteredOptions = this.options;
    this.closeDropdown();
  }

  private closedDefaultDropdownTrigger(): HTMLElement {
    return (
      <div class="dropdown-trigger__closed" onClick={this.openDropdown}>
        <p>{this.selectedOption ? this.selectedOption : 'Choose Option'}</p>
        <div class = "dropdown-trigger__icon">
          <span class="material-symbols-outlined">expand_more</span>
        </div>
      </div>
    );
  }

  private openDefaultDropdownTrigger(): HTMLElement {
    return (
      <div class="dropdown-trigger__open">
         <input class="dropdown-trigger__searchBar" placeholder='Search Options...' onKeyUp={this.keyUpHandler}/>
      </div>
    );
  }

  private defaultDropdownTrigger(): HTMLElement {
    if (!this.isOpen) {
      return this.closedDefaultDropdownTrigger();
    } else {
      return this.openDefaultDropdownTrigger();
    }
  }

  private defaultDropdownOptionsContainer(): HTMLElement {
    
    return (
      <div class="dropdown-options-container">
        {this.filteredOptions.map(option => <div class="dropdown-option" onClick={() => this.optionChangeHandler(this, option)}>{option}</div>)}
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <div class="dropdown-test">
          {this.defaultDropdownTrigger()}
          {this.isOpen && this.defaultDropdownOptionsContainer()}
        </div>
      </Fragment>
    );
  }
};

