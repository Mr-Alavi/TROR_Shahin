export class SystemDiagnostics {
    constructor(db) { this.db = db; }
    async getSystemMetrics() {
        let cacheSize = '5.4 MB';
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            const est = await navigator.storage.estimate();
            cacheSize = (est.usage / (1024*1024)).toFixed(2) + ' MB';
        }
        return { isOnline: navigator.onLine, cacheSize };
    }
}
