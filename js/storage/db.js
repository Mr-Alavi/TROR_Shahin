export class DatabaseManager {
    constructor() { this.dbName = 'TrorDatabase'; this.dbVersion = 2; this.db = null; }
    init() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(this.dbName, this.dbVersion);
            req.onupgradeneeded = e => {
                const db = e.target.result;
                ['trip_history', 'driving_scores', 'fuel_predictions', 'error_logs', 'system_backup', 'app_settings'].forEach(store => {
                    if (!db.objectStoreNames.contains(store)) db.createObjectStore(store, {keyPath: 'id', autoIncrement: true});
                });
            };
            req.onsuccess = e => { this.db = e.target.result; resolve(this.db); };
            req.onerror = e => reject(e.target.error);
        });
    }
    async addRecord(storeName, data) {
        if (!this.db) return;
        const tx = this.db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).add(data);
    }
}
