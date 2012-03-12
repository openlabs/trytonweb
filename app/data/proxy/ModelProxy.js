Ext.define('Tryton.data.proxy.ModelProxy', {
    extend  : 'Tryton.data.proxy.TrytonRPC',
    alias   : 'proxy.tmodel',

    modelName: '',

    /**
     * Generates a url based on HOST and PORT. But unlike the super class
     * these details are obtained from the current session
     *
     * @return {String} The url
     */
    buildUrl: function() {
        var request_session_data = Ext.getStore('Sessions').getRequestData();
        var url = 'http://'
        url = url + request_session_data.host;
        url = url + ':' + request_session_data.port.toString();
        url = url + '/' + request_session_data.database;

        return url;
    },

    /**
     * Build a CORS request given the RPC call details. 
     *
     * This subclass automatically prefixes the method with the name of the
     * model as specified in the attribute modelName
     *
     * @param {String} method Name of the method on tryton
     * @param {Array} extraparams in addition to user_id and session_key
     * @param {function} passed as callback to the request 
     * @return {Ext.data.Request} The Request object 
     */
    buildSessionRequest: function(method, extraParams, callback) {
        var request_session_data = Ext.getStore('Sessions').getRequestData(true);
        console.log(request_session_data);
        var def_params = [
          request_session_data.user_id, 
          request_session_data.session_key
        ];

        return this.buildRequest(
          "model." + this.modelName + "." + method,
          request_session_data.request_id, 
          // params = user_id, session_key, *extraParams, context
          [].concat(def_params, extraParams, [request_session_data.context]),
          callback
        );
    },

}); 
