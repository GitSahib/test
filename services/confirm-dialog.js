import Ember from 'ember';

const { Service, Evented } = Ember;

export default Service.extend(Evented, {
  open(options) {
  	this.trigger('open',options);
  },

  close(options) {
  	this.trigger('close',options);
  },

});
