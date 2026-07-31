import { DatabaseManager } from '../storage/db.js';
import { ErrorHandler } from './errorHandler.js';
import { SystemDiagnostics } from './systemDiagnostics.js';
import { GpsManager } from '../navigation/gpsManager.js';
import { VoiceSystem } from '../navigation/voiceSystem.js';
import { AdaptiveAlertEngine } from '../assistant/adaptiveAlertEngine.js';

class TrorApplication {
    constructor() {
        this.db = new DatabaseManager();
        this.gps = new GpsManager();
        this.voice = new VoiceSystem();
        this.alerts = new AdaptiveAlertEngine(this.voice);
    }
    async init() {
        await this.db.init();
        new ErrorHandler(this.db);
        const diag = new SystemDiagnostics(this.db);
        const metrics = await diag.getSystemMetrics();
        document.getElementById('diag-cache').textContent = metrics.cacheSize;
        
        window.addEventListener('online', () => this.setStatus(true));
        window.addEventListener('offline', () => this.setStatus(false));

        this.gps.startTracking(coords => {
            const kmh = Math.round((coords.speed || 0) * 3.6);
            document.getElementById('speed-display').textContent = kmh;
        });
    }
    setStatus(online) {
        const b = document.getElementById('connection-status');
        b.textContent = online ? 'آنلاین' : 'آفلاین';
        b.className = online ? 'status-badge online' : 'status-badge offline';
    }
}
window.addEventListener('DOMContentLoaded', () => new TrorApplication().init());
