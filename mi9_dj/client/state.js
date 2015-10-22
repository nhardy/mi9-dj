const appState = {
  callback: null,
  setState: function(state) {
    if (typeof this.callback === 'function') {
      this.callback(state);
    }
  }
};

export default appState;