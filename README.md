# TwitchNerd

TwitchNerd ist ein fruehes MVP fuer ein persoenliches Twitch-Dashboard fuer den Streamer LeoNerd87.

Aktuell ist es bewusst nur eine UI mit Mockdaten. Es gibt noch keine Twitch API, kein Login und keine Datenbank.

## Was hinzugefuegt wurde

- Moderne Landingpage unter `/`
- Dashboard-Seite unter `/dashboard`
- Dunkles Twitch-inspiriertes Design
- Responsive Layout mit Sidebar, Karten, Mock-Metriken, Balken-Chart und Aktivitaeten
- Systemfonts statt externer Font-Downloads fuer budgetfreundliche lokale Builds

## Projekt starten

```bash
npm run dev
```

Danach im Browser oeffnen:

```text
http://localhost:3000
```

## Wichtige Befehle

```bash
npm run lint
npm run build
```

## Aktuelle Einschraenkungen

- Alle Werte sind Mockdaten.
- Es gibt keine Authentifizierung.
- Es gibt keine Twitch-Integration.
- Es gibt keine Datenbank oder Persistenz.
- Es gibt noch keine shadcn/ui Komponenten im Projekt.

## Naechste geplante Schritte

- Dashboard-Komponenten weiter aufteilen
- Mock-Charts und Aktivitaeten verfeinern
- Responsive Details testen
- Spaeter Twitch OAuth und Twitch API serverseitig anbinden
