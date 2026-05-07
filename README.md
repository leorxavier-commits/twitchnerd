# TwitchNerd

TwitchNerd ist ein frühes MVP für ein ruhiges Creator Dashboard für den Streamer LeoNerd87.

Leitsatz: **Wir helfen dir, gesünder mit deinen Zahlen umzugehen.**

Aktuell ist es bewusst ein frühes MVP. Es gibt Twitch OAuth, echte Live-Basisdaten und echte Followerdaten, aber noch keine Datenbank.

TwitchNerd priorisiert ruhige, unterstützende Creator-Analytics statt hektischer Zahlenvergleiche. API Phase 1 ergänzt nur Twitch OAuth Login, echte Twitch-Basisdaten und Community/Followerdaten für den verbundenen Account. Wenn keine Twitch-Daten verfügbar sind, zeigt TwitchNerd klare Hinweise statt echte Daten vorzutäuschen.

## Was hinzugefügt wurde

- Moderne Landingpage unter `/`
- Dashboard-Seite unter `/dashboard`
- Eigener Live-Bereich unter `/dashboard/live`
- Einordnungsseite unter `/analytics`
- Community-Seite unter `/community`
- Dunkles Twitch-inspiriertes Design mit professioneller Sidebar
- Responsive Layout mit ruhigen Karten, Beispiel-Metriken, Balken-Charts und Aktivitäten
- Content-Einordnung mit Beispieldaten
- Community-Seite mit echten Twitch-Followerdaten und Unterstützern, wenn die passenden Scopes vorhanden sind
- Platzhalter-Zähler für spätere Chat- und Emote-Auswertungen ohne Chat-Logs oder Nachrichteninhalte
- Twitch OAuth Authorization Code Flow für Basisdaten im Live-Bereich
- LIVE-Bereich mit 30-Sekunden-Refresh, laufendem Streamtimer aus `started_at`, Kategorie-Suche und ruhigem Twitch-API-Error-Handling
- LIVE Activity Feed im Live-Bereich: echte Follow-Events aus Twitch Helix, vorbereitete Eventmodelle für Subs, Gift Subs, Bits, Raids und Kanalpunkte

## Twitch OAuth lokal einrichten

Lege lokal eine `.env.local` an. Diese Datei darf nicht committed werden.

```bash
APP_URL=http://localhost:3000
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret
TWITCH_REDIRECT_URI=http://localhost:3000/api/auth/twitch/callback
TWITCH_OAUTH_SCOPES=channel:manage:broadcast moderator:read:followers channel:read:subscriptions channel:read:vips moderation:read
```

In der Twitch Developer Console:

- App anlegen
- OAuth Redirect URL exakt auf `http://localhost:3000/api/auth/twitch/callback` setzen
- Client ID und Client Secret in `.env.local` eintragen

Für das Ändern von Streamtitel und Kategorie wird der Scope `channel:manage:broadcast` benötigt. Für konkrete Follower-Listen mit Namen und Follow-Datum wird `moderator:read:followers` benötigt. Für Subscriberstatus und Tier wird `channel:read:subscriptions` benötigt. Für Rollen werden `channel:read:vips` und `moderation:read` genutzt. Wenn du Scopes nachträglich ergänzt, musst du dich über TwitchNerd neu mit Twitch einloggen, damit Twitch einen Token mit den neuen Scopes ausstellt.

TwitchNerd lädt live/offline, aktuelle Viewer und `started_at` über `Get Streams`. Viewer werden bewusst als ein Signal unter mehreren behandelt. Titel und Kategorie werden über `Get Channel Information` geladen. Änderungen an Titel und Kategorie laufen serverseitig über `Modify Channel Information`.

Der LIVE-Bereich aktualisiert Twitch-Daten im Browser alle 30 Sekunden über `/api/twitch/live`. Kategorie-Vorschläge kommen über `/api/twitch/categories` aus `Search Categories`; beim Speichern wird die ausgewählte `game_id` an Twitch gesendet.

Der LIVE Activity Feed nutzt aktuell echte Follows über `Get Channel Followers`. Subs, Gift Subs, Bits, Raids und Kanalpunkte sind als typisierte Eventmodelle und UI vorbereitet, brauchen für echte Historie aber später EventSub oder eine eigene Speicherung. Bis dahin werden diese Eventtypen im Feed klar als vorbereitete Beispieldaten markiert.

Die Community-Seite lädt Follower serverseitig über `Get Channel Followers` (`GET /helix/channels/followers`) und nutzt Twitch Pagination. Subscriber werden über `Get Broadcaster Subscriptions` (`GET /helix/subscriptions`) ergänzt. VIPs und Moderatoren werden über `Get VIPs` und `Get Moderators` markiert, wenn die Scopes verfügbar sind. Angezeigt werden Username, folgt seit, Subscriber ja/nein, Sub Tier, Gift-Sub-Hinweis, abonniert seit und Rolle.

Hinweis: Twitchs Broadcaster Subscriptions API liefert Substatus, Tier und Gift-Status, aber kein verlässliches Abo-Startdatum. Ohne EventSub oder Datenbank zeigt TwitchNerd deshalb bei "abonniert seit" bewusst "Nicht verfügbar" statt einen Wert zu erfinden.

Der Refresh Token wird beim OAuth Callback als httpOnly Cookie gespeichert. Wenn der Access Token abgelaufen ist, erneuern die serverseitigen Twitch-Routen den Token automatisch über den Refresh Token und schreiben die neuen Token-Cookies. Tokens werden nicht im Client gelesen und nicht geloggt.
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

- Ohne Twitch Login werden Hinweise und Platzhalter angezeigt.
- Bei Twitch-API-Fehlern werden keine Mockdaten als echte Live-Daten angezeigt; der LIVE-Bereich zeigt stattdessen verständliche Hinweise.
- Bei Twitch-API-Fehlern werden keine Mockdaten als echte Community-Daten angezeigt; die Community-Seite zeigt stattdessen verständliche Hinweise.
- Es gibt nur Twitch OAuth für Basisdaten, Channel Control und Followerdaten.
- Es gibt keine echte Bits-, Raid-, Channel-Points-Historie, Einordnungsdaten aus Analytics-APIs, Chat-Zähler-, Emote-Zähler-, Chat-Log- oder EventSub-Integration.
- Es gibt keine Datenbank oder Persistenz.
- Es gibt noch keine shadcn/ui Komponenten im Projekt.

## Nächste geplante Schritte

- Dashboard- und Einordnungs-Komponenten weiter verfeinern
- Beispiel-Charts und Aktivitäten verfeinern
- Responsive Details testen
- Später weitere Twitch APIs serverseitig anbinden
