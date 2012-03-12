Ext.define('Tryton.controller.Login', {
    extend: 'Ext.app.Controller',
    requires: ['Tryton.data.proxy.ModelProxy'],

    views: [
      'auth.Login'
    ],

    stores: [
      'Sessions'
    ],

    models: [
      'Session',
    ],

    init: function() {
      this.control({
        // Connect the `Connect` menu to login window
        'menuitem[text="Connect"]': {
          click: this.showLogin
        },
        
        // Login button in the Login window to initiate login
        'login >  button[action=connect]': {
          click: this.doLogin
        },

      });
    },

    showLogin: function() {
      var view = Ext.widget('login');
    },


    doLogin: function(button) {
      var me = this;
      var form = button.up('form').getForm();
      if (form.isValid()) {
        var form_vals = form.getValues();
        var common = new Ext.createByAlias('proxy.common', {
          host: form_vals.host, 
          port: form_vals.port, 
          database: form_vals.database
        });
        common.login(
          form_vals.username,
          form_vals.password,  
          function(result) {
            if (result) {
              var session_store = Ext.getStore('Sessions');
              session_store.proxy.clear();
              session_store.add({
                user_id: result[0], 
                session_key: result[1],
                username: form_vals.username,
                host: form_vals.host,
                port: form_vals.port,
                database: form_vals.database,
              });
              session_store.sync();
              Ext.Msg.alert('Status', 'Login succesful');
              button.up('window').close();
              var main_controller = this.getController('Main');
              main_controller.init();
              main_controller.postLogin();
            } else {
              Ext.Msg.alert('Badlogin', 'Check username or password');
            }
          }, this
        );
      }
    },

});
