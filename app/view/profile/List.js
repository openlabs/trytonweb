Ext.define('Tryton.view.profile.List' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.profilelist',
    requires: ['Tryton.data.proxy.Common'],

    title : 'Profile Editor',
    autoShow: true,

    width : 496,
    height: 350,
    layout: 'column',

    initComponent: function() {
        this.items = [
          {
            xtype: 'panel',
            width: '30%',
            height: '100%',
            title: 'Profiles',
            layout: {
              type: 'vbox',
              align: 'center'
            },
            items: [
              {
                xtype: 'grid',
                width: '100%',
                store: 'Profiles',
                selType: 'rowmodel',
                plugins: [
                  Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2
                  })
                ],
                columns : [
                  {
                    header: 'Name',  
                    dataIndex: 'name',  flex: 1,
                    editor: {
                      xtype: 'textfield',
                      allowBlank: false
                    }
                  }
                ],
                flex: 2
              },
              {
                xtype: 'button',
                text: 'Add',
                action: 'add',
                width: '100%'
              },
              {
                xtype: 'button',
                text: 'Remove',
                width: '100%'
              }
            ]
          },
          {
            xtype: 'form',
            width: '70%',
            height: '100%',
            title: 'Profile Details',
            bodyPadding: 10,
            buttons: [
              {
                text: 'Save',
                action: 'save',
              },
            ],
            items: [
              {
                xtype: 'textfield',
                name: 'host',
                fieldLabel: 'Host Name',
                allowBlank: false
              },
              {
                xtype: 'textfield',
                name: 'port',
                fieldLabel: 'Port',
                allowBlank: false
              },
              {
                xtype: 'combo',
                name: 'database',
                fieldLabel: 'Database',
                mode: 'remote',
                valueField: 'name',
                displayField: 'name',
                listeners: {
                  beforequery: function(qe){
                    delete qe.combo.lastQuery;
                    var me = this;
                    var host = this.up('form').query('textfield[name="host"]')[0];
                    var port = this.up('form').query('textfield[name="port"]')[0];
                    var common = new Ext.createByAlias('proxy.common', {
                      host: host.value, port: port.value
                    });
                    common.db_list(function(result) {
                      db_list = result;
                      var store = new Ext.create('Ext.data.ArrayStore', {
                          autoDestroy: true,
                          fields: [
                             'name',
                          ],
                          data: [db_list]
                      });
                      me.bindStore(store);
                    })
                  }
                },
                store: new Ext.create('Ext.data.ArrayStore', {
                  // store configs
                  autoDestroy: true,
                  storeId: 'dbStore',
                  idIndex: 0,
                  fields: [
                     'name',
                  ],
                  data: []
                }),
              },
              {
                xtype: 'textfield',
                name: 'username',
                fieldLabel: 'Username'
              },

            ]
          }

        ];

        this.callParent(arguments);
    }
});
