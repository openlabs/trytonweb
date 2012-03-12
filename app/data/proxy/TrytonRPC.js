Ext.define('Tryton.data.proxy.TrytonRPC', {
    extend: 'Ext.data.proxy.Ajax',
    alias: ['proxy.trytonrpc'],

    /**
     * @cfg {String} database 
     * The DATABASE from which to request the data object.
     * This is used to build the url
     */
    database: '',

    /**
     * @cfg {String} host 
     * The HOST from which to request the data object.
     * This is used to build the url
     */
    host: '',

    /**
     * @cfg {Int} port 
     * The PORT from which to request the data object.
     * This is used to build the url
     */
    port: 8000,

    /**
     * Generates a url based on HOST and PORT 
     * @return {String} The url
     */
    buildUrl: function() {
        var me = this,
            url = 'http://'
        url = url + me.host;
        url = url + ':' + me.port.toString();
        url = url + '/' + me.database;

        return url;
    },

    /**
     * Build a CORS request given the RPC call details. 
     *
     * @param {String} method Name of the method on tryton
     * @param {Array} extraparams in addition to user_id and session_key
     * @param {function} passed as callback to the request 
     * @return {Ext.data.Request} The Request object 
     */
    buildSessionRequest: function(method, extraParams, callback) {
        var request_session_data = Ext.getStore('Sessions').getRequestData(true);
        var def_params = [
          request_session_data.user_id, 
          request_session_data.session_key
        ];

        console.log(request_session_data);

        return this.buildRequest(
          request_session_data.request_id, 
          method,
          [].concat(def_params, params),
          callback
        );
    },


    /**
     * Build a CORS request given the RPC call details. 
     *
     * @param {String} method Name of the method on tryton
     * @param {Int} request_id An integer identifier for the request
     * @param {Array} an Array of parameters to pass
     * @param {function} passed as callback to the request 
     * @return {Ext.data.Request} The Request object 
     */
    buildRequest: function(method, request_id, params, callback, scope) {

        request = Ext.create('Ext.data.Request', {
            cors        : true,
            jsonData    : {
              id      : request_id,
              method  : method,
              params  : params
              },
            method      : 'POST',
            headers     : {'Content-type': 'application/json-rpc'},
            //scope       : scope
        });

        request.url = this.buildUrl();
        console.log(request);

        if (!callback) {
          callback = function(){}; 
        }

        var error_handling_callback = function(options, success, response) {
          if (!success) {
            console.log("Connection failed");
          }
          responseJson = Ext.decode(response.responseText);
          if ('error' in responseJson) {
            if (responseJson.error[0] == 'UserError') {
              Ext.Msg.alert(
                responseJson.error[0], 
                responseJson.error[1]
              );
            } else {
              Ext.Error.raise(responseJson.error);
            }
          } else {
            console.log(responseJson.result);
            callback.call(scope, responseJson.result);
          }
        }
        request.callback = error_handling_callback;

        return request;
    },

    /**
     * Make a request to the Tryton Server. 
     *
     * @param {String} method Name of the method on tryton
     * @param {Array} an Array of parameters to pass
     * @param {function} passed as callback to the request 
     * @return {Ext.data.Request} The Request object 
     */
    doRequest: function(method, params, callback, scope) {
        var request = this.buildSessionRequest(method, params, callback);
        request.scope = scope;
        Ext.Ajax.request(request);
        return request;
    },

})
