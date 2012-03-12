Ext.define('Tryton.controller.Profiles', {
    extend: 'Ext.app.Controller',

    views: [
      'profile.List',
    ],

    stores: [
      'Profiles'
    ],

    models: [
      'Profile'
    ],

    init: function() {
      this.control({
        'button[name="manageprofiles"]': {
          click: this.showProfileList
        },
        'profilelist > panel > grid': {
          itemclick: this.editProfile
        },
        'profilelist >  button[action=save]': {
          click: this.saveProfile
        },
        'profilelist >  button[action=add]': {
          click: this.addProfile
        },


      });
    },

    showProfileList: function() {
      var view = Ext.widget('profilelist');
    },

    editProfile: function(grid, record){
      grid.up('panel').up('window').down('form').loadRecord(record);
    },

    saveProfile: function(button) {
      var form = button.up('form').getForm();
      var record = form.getRecord();
      if (form.isValid()) {
        form.updateRecord(record);
        record.save({
          failure: function(profile) {
            Ext.Msg.alert('Failure', 'Failed to save  profile.')
          }
        });
      }
    },

    addProfile: function(button) {
      var profile_store = Ext.getStore('Profiles');
      profile_store.add({name: 'New Profile'});
    },

});
