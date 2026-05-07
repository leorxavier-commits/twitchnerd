# TwitchNerd

TwitchNerd ist ein frühes MVP für ein persönliches Twitch-Dashboard für den Streamer LeoNerd87.

Aktuell ist es bewusst nur eine UI mit Mockdaten. Es gibt noch keine Twitch API, kein Login und keine Datenbank.

## Was hinzugefügt wurde

- Moderne Landingpage unter `/`
- Dashboard-Seite unter `/dashboard`
- Eigener Live-Bereich unter `/dashboard/live`
- Analytics-Seite unter `/analytics`
- Dunkles Twitch-inspiriertes Design mit professioneller Sidebar
- Responsive Layout mit Karten, Mock-Metriken, Balken-Charts und Aktivitäten
- Content-Performance-Tabelle mit Mockdaten
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
- Es gibt keine Authentifizierung.
- Es gibt keine Twitch-Integration.
- Es gibt keine Datenbank oder Persistenz.
- Es gibt noch keine shadcn/ui Komponenten im Projekt.

## Nächste geplante Schritte

- Dashboard- und Analytics-Komponenten weiter verfeinern
- Mock-Charts und Aktivitäten verfeinern
- Responsive Details testen
- Später Twitch OAuth und Twitch API serverseitig anbinden
