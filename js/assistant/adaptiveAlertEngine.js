export class AdaptiveAlertEngine {
    constructor(voice) { this.voice = voice; }
    processAlert(alert, speed) { if(alert) this.voice.play(alert.audioKey); }
}
