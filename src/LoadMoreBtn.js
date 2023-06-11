export default class LoadMoreBtn {
  constructor({ selector, isHidden = false }) {
    this.button = document.querySelector(selector);
    if (this.button) {
      if (isHidden) this.hide();
    } else {
      console.error(`Element with selector '${selector}' not found.`);
    }
  }

  enable() {
    if (this.button) {
      this.button.disabled = false;
      this.button.textContent = "Load more";
    }
  }

  disable() {
    if (this.button) {
      this.button.disabled = true;
      this.button.textContent = "Loading...";
    }
  }

  show() {
    if (this.button) {
      this.button.classList.remove("hidden");
    }
  }

  hide() {
    if (this.button) {
      this.button.classList.add("hidden");
    }
  }
}