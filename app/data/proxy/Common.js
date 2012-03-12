Ext.define('Tryton.data.proxy.Common', {
    extend: 'Tryton.data.proxy.TrytonRPC',
    alias: ['proxy.common'],

    db_list: function(callback, scope) {
      return this.doRequest('common.db.list', [null, null], callback, scope);
    },

    login: function(username, password, callback, scope) {
      return this.doRequest('common.db.login', [username, password], callback, scope);
    },

    /**
     * Make a request to the Tryton Server. 
     *
     * This subclass avoids building the request using the session request
     * builder which automatically prefixes the user_id and session_key to
     * params on every request
     *
     * @param {String} method Name of the method on tryton
     * @param {Array} an Array of parameters to pass
     * @param {function} passed as callback to the request 
     * @return {Ext.data.Request} The Request object 
     */
    doRequest: function(method, params, callback, scope) {
        var request = this.buildRequest(method, 1, params, callback, scope);
        Ext.Ajax.request(request);
        return request;
    },

})
