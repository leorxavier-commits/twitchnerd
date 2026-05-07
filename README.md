# TwitchNerd

TwitchNerd ist ein frühes MVP für ein persönliches Twitch-Dashboard für den Streamer LeoNerd87.

Aktuell ist es bewusst nur eine UI mit Mockdaten. Es gibt noch keine Twitch API, kein Login und keine Datenbank.

API Phase 1 ergänzt nur Twitch OAuth Login und echte Twitch-Basisdaten für den verbundenen Account. Wenn keine Twitch-Daten verfügbar sind, nutzt TwitchNerd weiterhin Mockdaten.

## Was hinzugefügt wurde

- Moderne Landingpage unter `/`
- Dashboard-Seite unter `/dashboard`
- Eigener Live-Bereich unter `/dashboard/live`
- Analytics-Seite unter `/analytics`
- Community-Seite unter `/community`
- Dunkles Twitch-inspiriertes Design mit professioneller Sidebar
- Responsive Layout mit Karten, Mock-Metriken, Balken-Charts und Aktivitäten
- Content-Performance-Tabelle mit Mockdaten
- Community-Listen, Top-Chatter und Emote-Analytics mit Mockdaten
- Twitch OAuth Authorization Code Flow für Basisdaten im Live-Bereich

## Twitch OAuth lokal einrichten

Lege lokal eine `.env.local` an. Diese Datei darf nicht committed werden.

```bash
APP_URL=http://localhost:3000
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret
TWITCH_REDIRECT_URI=http://localhost:3000/api/auth/twitch/callback
TWITCH_OAUTH_SCOPES=
```

In der Twitch Developer Console:

- App anlegen
- OAuth Redirect URL exakt auf `http://localhost:3000/api/auth/twitch/callback` setzen
- Client ID und Client Secret in `.env.local` eintragen

Aktuell werden keine zusätzlichen Scopes benötigt. Es werden nur User-Basisdaten und der aktuelle Streamstatus serverseitig über Twitch Helix geladen.
- Systemfonts statt externer Font-Downloads für budgetfreundliche lokale Builds

## Projekt starten

```bash
npm run dev
```

Danach im Browser öffnen:

```text
http://localhost:3000
```

## Wichtige Befehle

```bash
npm run lint
npm run build
```

## Aktuelle Einschränkungen

- Alle Werte sind Mockdaten.
- Es gibt nur Twitch OAuth für Basisdaten.
- Es gibt keine Subs-, Bits-, Community- oder EventSub-Integration.
- Es gibt keine Datenbank oder Persistenz.
- Es gibt noch keine shadcn/ui Komponenten im Projekt.

## Nächste geplante Schritte

- Dashboard- und Analytics-Komponenten weiter verfeinern
- Mock-Charts und Aktivitäten verfeinern
- Responsive Details testen
- Später Twitch OAuth und Twitch API serverseitig anbinden
