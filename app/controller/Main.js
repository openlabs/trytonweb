Ext.define('Tryton.controller.Main', {
    extend: 'Ext.app.Controller',

    views: [
    ],

    stores: [
      'Sessions',
      'Menu',
    ],

    models: [
    ],

    init: function() {
      this.control({
        'menuitem[name=menureload]': {
          click: this.loadMenu
        },
        'menuitem[text="Disconnect"]': {
          click: this.disconnect
        }
      });
    },

    /**
     * The work to do after a login is done
     */
    postLogin: function() {
      // First set the context and on callback do everything else
      var me = this;
      Ext.getCmp('mainmenu').show();
      Ext.getCmp('centerpanel').show();
      Ext.getCmp('southpanel').show();
      me.getContext(
        function() {
          me.getPreferences(
            function(preferences) {
              me.loadMenu(preferences.menu);
            }
          );
        }
      );
    },

    /**
     * Get the preferences from the user model of Tryton and display relevant
     * items to the bottom bar 
     */
    getPreferences: function(callback) {
      var session_store = Ext.getStore('Sessions');
      Ext.require('Tryton.data.proxy.ModelProxy');
      var user_model_proxy = new Ext.createByAlias('proxy.tmodel', {
        modelName: "res.user"
      });
      user_model_proxy.doRequest('get_preferences', [false],
          function(result){
            // Pick and save required items to the session
            var this_session = session_store.last();
            this_session.set('status_bar', result.status_bar);
            this_session.set('action', result.action);
            this_session.set('menu', result.menu);
            session_store.sync();
            
            // Set the connection string
            var connection_string = this_session.get('username') + '@';
            connection_string = connection_string + this_session.get('host');
            connection_string = connection_string + ':' + this_session.get('port');
            connection_string = connection_string + '/' + this_session.get('database');
            Ext.getCmp('bb_connection').setTitle(connection_string);

            // Set the status bar
            Ext.getCmp('bb_status_bar').setTitle(result.status_bar);
            Ext.getCmp('bb_request_status').setTitle('Not implemented yet');

            // Callback with the result
            callback(result)
          }, this
      );  
    },

    /**
     * Get the context of the user from tryton and save it to the session
     */
    getContext: function(callback) {
      var session_store = Ext.getStore('Sessions');
      Ext.require('Tryton.data.proxy.ModelProxy');
      var user_model_proxy = new Ext.createByAlias('proxy.tmodel', {
        modelName: "res.user"
      });
      user_model_proxy.doRequest(
          'get_preferences', [true],
          function(result) {
            var this_session = session_store.last();
            this_session.set('context', result);
            session_store.sync();
            callback(result)
          }, this
      );

    },

    /**
     * Perform the Home action the user expects done when he logs in
     *
     */
    doHomeAction: function() {
      Ext.require('Tryton.data.proxy.ModelProxy');
      var ir_action_model_proxy = new Ext.createByAlias('proxy.tmodel', {
        modelName: "ir.action"
      });

      var perform_action = function(response){
        console.log(response);
      }
      
      // First get the type of the action and then perform it
      var session_store = Ext.getStore('Sessions');
      var this_session = session_store.last();
      console.log(this_session);
      console.log(this_session.get('action'));
      ir_action_model_proxy.doRequest(
        'read', [this_session.get('action'), ['type']], perform_action
      )
    },

    loadMenu: function(action_id) {
      var ir_ui_menu_proxy = new Ext.createByAlias('proxy.tmodel', {
        modelName: "ir.ui.menu"
      });
      ir_ui_menu_proxy.doRequest(
        'search_read', 
        [['parent', '=', false], 0, 1000, null, ['name', 'childs']],
        function(result) {
          console.log('Got the menu');
          var menutree = Ext.getCmp('mainmenu');
          menutree.setLoading(true);
          console.log(menutree);

          var menu_store = Ext.getStore('Menu');
          var children = [];
          Ext.each(result, function(menu, index){
            children.push({
              text: menu.name,
              tryton_id: menu.id,
              leaf: menu.childs.length ? false: true 
            });
          });
          menu_store.setRootNode({
            'text': 'Invisible Root Node',
            leaf: false,
            children: children
          });
          menutree.setLoading(false);

        }
      );

    },

    disconnect: function() {
        var session_store = Ext.getStore('Sessions');
        session_store.proxy.clear(); 
        Ext.getCmp('mainmenu').hide();
        Ext.getCmp('centerpanel').hide();
        Ext.getCmp('southpanel').hide();
    }

});
