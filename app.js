//
Ext.onReady(function() {
  Ext.Loader.setConfig({enabled:true});
});

// Imports
Ext.require('Ext.container.Viewport');


// Build the application
Ext.application({
    name: 'Tryton',

    appFolder: 'app',

    controllers: [
        'Profiles',
        'Login',
        'Main'
    ],
 
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                  region: 'north',
                  items: [
                    {
                      xtype: 'toolbar',
                      items: [
                        {
                          text: 'Tryton'
                        },
                        {
                          text: 'File',
                          menu: [
                            {
                              text: 'Connect',

                            },
                            {
                              text: 'Disconnect',
                            },
                            '-',
                            {
                              text: 'Database',
                              menu: [
                                {
                                  text: 'New Database'
                                },
                                {
                                  text: 'Restore Database'
                                },
                                {
                                  text: 'Backup Database'
                                },
                                {
                                  text: 'Drop Database'
                                },
                              ]
                            }
                          ],
                        },
                        {
                          text: 'User',
                          menu: [
                            {
                              text: 'Preferences'
                            },
                            '-',
                            {
                              text: 'Menu Reload',
                              name: 'menureload',
                            }
                          ]
                        },
                        {
                          text: 'Options'
                        },
                        {
                          text: 'Plugins'
                        }
                      ]
                    },

                ]
              },
              {
                  title: 'Menu',
                  width: '15%',
                  collapsible: true,
                  collapsed: false,
                  store: 'Menu',
                  id: 'mainmenu',
                  region: 'west',
                  rootVisible: false,
                  xtype: 'treepanel',
                },
                {
                    region: 'center',
                    xtype: 'tabpanel',
                    id: 'centerpanel',
                    html : 'Tabs panel',
                },

                {
                  region: 'south',
                  id: 'southpanel',
                  minHeight: 25,
                  height: 25,
                  layout: 'column',
                  items: [
                    {
                      name: 'status_bar',
                      id: 'bb_status_bar',
                      width: '25%',
                    },
                    {
                      name: 'request_status',
                      id: 'bb_request_status',
                      width: '50%',
                    },
                    {
                      name: 'connection',
                      id: 'bb_connection',
                      width: '25%'
                    }
                  ]
                }
            ]
        });
      
        /** Bind keyboard shortcuts
         *
         * CTRL + O: Login Window
         *
         */
        var map = Ext.create('Ext.util.KeyMap', Ext.getBody(), {
            key: 'o',
            ctrl: true, 
            fn: function() {
              Ext.widget('login');
            },
        });

        /*
         * Hide the viewport panels by default
         */
        Ext.getCmp('mainmenu').hide();
        Ext.getCmp('centerpanel').hide();
        Ext.getCmp('southpanel').hide();

    }
});
