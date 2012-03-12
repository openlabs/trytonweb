Ext.define('Tryton.model.Session', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'id'},
      {name: 'user_id', type: 'int'}, 
      {name: 'session_key'}, 
      {name: 'request_id', type: 'int', defaultValue: 1},
      {name: 'username'},
      {name: 'status_bar'},
      {name: 'host'},
      {name: 'port'},
      {name: 'database'},
      {name: 'context', defaultValue: {}},
      {name: 'action', type: 'int'},
      {name: 'menu', type: 'int'}
    ],
    proxy: {
      type: 'sessionstorage',
      id: 'session'
    }
});
