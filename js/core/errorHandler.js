export class ErrorHandler {
    constructor(db) {
        this.db = db;
        window.addEventListener('error', e => this.log('JS_ERR', e.message));
        window.addEventListener('unhandledrejection', e => this.log('PROMISE_ERR', e.reason));
    }
    async log(type, msg) {
        try { if(this.db && this.db.db) await this.db.addRecord('error_logs', {type, msg, time: new Date().toISOString()}); } catch(ex) {}
    }
}
