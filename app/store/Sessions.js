/* *
 * @author Sharoon Thomas, Openlabs Technologies & Consulting
 *
 * This store is expected to behave as a singleton where the data
 * pertaining to the currently logged in tryton session of the user
 * could be stored. By default EXTJS does not provide a singleton
 * pattern for stores. 
 *
 */
Ext.define('Tryton.store.Sessions', {
    extend: 'Ext.data.Store',
    model: 'Tryton.model.Session',
    autoLoad: true,

    /**
     * Returns the params required for each request. This returns an
     * object with the following information.
     *
     * request_id:
     *
     * Each subsequent request from the tryton client needs to have
     * a different ID. Though this is not required for a response from
     * the server, it seems to be how the GTK client works. I have no
     * idea what this is for, but this provides an autoincrementing
     * number. If you need the subsequent request data then next should
     * be true
     *
     * user_id:
     *
     * ID of the user if it was ever stored in the session
     *
     * session_key:
     *
     * The session_key if it was ever stored
     *
     * @param {Boolean} next Indicates if the request_id need to inc 
     */
    getRequestData: function(next) {
      if (this.totalCount > 0) {
        var record = this.last();

        if (next) {
          // Increment the request_id counter
          record.set('request_id', record.get('request_id') + 1);
          this.sync()
        }

        return {
          request_id  : record.get('request_id'),
          user_id     : record.get('user_id'),
          session_key : record.get('session_key'),
          host        : record.get('host'),
          port        : record.get('port'),
          database    : record.get('database'),
          context     : record.get('context')
        }
      } else {
        Ext.error.raise("There is No active session");
      }
    },

});
