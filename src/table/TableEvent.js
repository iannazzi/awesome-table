/**
 * Created by embrasse-moi on 1/24/17.
 */
export class TableEvent {
//https://gist.github.com/kennethkau/f041a0236a2dd0438522d394073e7d6e
  constructor (sender) {
      this._sender = sender;
      this._listeners = [];
  }
  attach (listener){
      this._listeners.push(listener);
  }
  notify (args){
      for (let i = 0; i < this._listeners.length; i += 1) {
          this._listeners[i](this._sender, args);
      }
  }
}
