export class GpsManager {
    constructor() { this.watchId = null; }
    startTracking(cb) {
        if (!navigator.geolocation) return;
        this.watchId = navigator.geolocation.watchPosition(
            pos => cb({lat: pos.coords.latitude, lng: pos.coords.longitude, speed: pos.coords.speed}),
            err => console.warn(err),
            {enableHighAccuracy: true, maximumAge: 2000, timeout: 8000}
        );
    }
    destroy() { if(this.watchId !== null) navigator.geolocation.clearWatch(this.watchId); }
}
