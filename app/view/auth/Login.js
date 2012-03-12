Ext.define('Tryton.view.auth.Login', {
    extend: 'Ext.window.Window',
    alias : 'widget.login',

    title : 'Login',
    autoShow: true,

    width : 500,

    initComponent: function() {
        this.items = [
            {
              xtype: 'panel',
              html: '<img src="resources/images/tryton.png" alt="Tryton Banner"/>',
              height: 126,
              flex: 2
            },
            {
                xtype: 'form',
                bodyPadding: 10,
                items: [
                  {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                          xtype: 'combo',
                          name : 'profile',
                          fieldLabel: 'Profile',
                          flex: 1,
                          store: Ext.getStore('Profiles'),
                          displayField: 'name',
                          valueField: 'id',
                          listeners: {
                            'select': function(combo, records, eopts){
                              if (records.length == 1) {
                                combo.up('form').loadRecord(records[0]);
                              }
                            }
                          }
                        },
                        {
                          xtype: 'button',
                          name: 'manageprofiles',
                          text: 'Manage Profiles',
                        },
                      ]
                    },
                    {
                      xtype:'fieldset',
                      title: 'Host / Database Information',
                      collapsible: true,
                      collapsed: true,
                      items: [
                        {
                          xtype: 'textfield',
                          name : 'host',
                          fieldLabel: 'Host',
                          allowBlank: false
                        },
                        {
                          xtype: 'textfield',
                          name: 'port',
                          fieldLabel: 'Port',
                          allowBlank: false
                        },
                        {
                          xtype: 'textfield',
                          name : 'database',
                          fieldLabel: 'Database',
                          allowBlank: false
                        },
                      ]
                    },
                    {
                      xtype: 'textfield',
                      name : 'username',
                      fieldLabel: 'User Name',
                      allowBlank: false
                    },
                    {
                      xtype: 'textfield',
                      name : 'password',
                      fieldLabel: 'Password',
                      inputType:'password',
                      allowBlank: false
                    },

              ],
              buttons: [
                {
                  text: 'Cancel',
                  scope: this,
                  handler: this.close
                },
                {
                  text: 'Connect',
                  action: 'connect',
                },

              ],
              listeners: {
                afterRender: function(thisForm, options) {
                  this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                    enter: function() {
                      var button = thisForm.down('button[action=connect]');
                      button.fireEvent('click', button);
                    },
                    scope: this
                  });
                }
              },
            }
        ];

        this.callParent(arguments);
    }
});
