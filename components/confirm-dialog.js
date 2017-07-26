import Ember from 'ember';

const { Component, run, inject, set, $ } = Ember;
//####################################################################################
//Component: confirm-dialog
//Opens a bootstrap modal, can block the ui until specific action is performed by user. 
//Mostly similar to jquery ui dialog
//see controllers/ticket/ethernet/acknowledge_tsp() method for complete usage example
//####################################################################################
export default Component.extend({
  //inject confirm dialog service
  confirmDialog: inject.service(),
  tagName      : 'div',
  classNames   : ['confirm-dialog'],
  //the dialog options object.   
  options      : {
    bootstrapOptions:{
      show     : true, 
      backdrop : 'static',
      keyboard : false,
    },
    buttons: {
     ok:{
      text:"Yes", 
      action:() => { }
     },
     cancel:{
      text:"No",
      action:() => { }
     },
     close:{
      text:"<i class='fa fa-close'></i>",
      action:() => {}
     }
    },
    title          :'Confirmation is required',
    body           :'<span class="fa fa-warning fa-2x text-primary"></span> ' +
                    'Are you sure you want to perform this action?',
    type           :'primary',
    autoCloseOnYes :true,
    autoCloseOnNo  :true,
    showCloseButton:true,
  },
  //bind the service methods to this component
  init() {
    this._super(...arguments);
    run.once(this, function() {
      this.get('confirmDialog').on('open', (options)=>{this._open(options);});
      this.get('confirmDialog').on('close', this, this._close);
    });
  },
  //unbind the methods on destroy
  willDestroy() {
    run.once(this, function() {
      this.get('confirmDialog').off('open', this, this._open);
      this.get('confirmDialog').off('close', this, this._close);
    });

  },
  //internal method causes the dialog open
  _open(options) {
    let my_options = this.get('options');
    Object.keys(options).forEach(element=>{
      if(typeof options[element] !== undefined){
        set(my_options, element, options[element]);
      }
    });
    $(this.element).find(".modal").modal(my_options.bootstrapOptions);
  },
  //internal method causes the dialog close
  _close() {
    $(this.element).find(".modal").modal("hide");
    this.send('noAction');
  },
  //the dialog closure actions called from hbs 
  actions:{
    yesAction:function(){
      this.get('options.buttons.ok.action').apply();
    },
    noAction:function(){
      this.get('options.buttons.cancel.action').apply();
    }
  }

});

