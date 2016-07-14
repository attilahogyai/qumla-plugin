import Ember from 'ember';

var c = 1;
export function generateUUID() {
    var d = new Date(),
        m = d.getMilliseconds() + "",
        u = ++d + m + (++c === 10000 ? (c = 1) : c);

    return u;
}
/*
export function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid.toUpperCase();
}
*/
export default Ember.Helper.helper(generateUUID);
