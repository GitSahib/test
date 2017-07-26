import Ember from 'ember';

const { Mixin, inject } = Ember;

export default Mixin.create({
  confirmDialog: inject.service(),
  //will attach these closure actions to any route, component, controller where this mixin will be imported
  actions: {
    openConfirmDialog(options) {
      let confirmDialog = this.get('confirmDialog');
      return confirmDialog.open(options);
    },
    closeConfirmDialog() {
      let confirmDialog = this.get('confirmDialog');
      return confirmDialog.close();
    }
  }
});
