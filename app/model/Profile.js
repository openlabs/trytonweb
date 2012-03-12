Ext.define('Tryton.model.Profile', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'id'},
      {name: 'name'}, 
      {name: 'host'}, 
      {name: 'port', type: 'int', defaultValue: 8000}, 
      {name: 'database'}, 
      {name: 'username'}
    ],
    proxy: {
      type: 'localstorage',
      id: 'profiles'
    }
});
