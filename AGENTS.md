<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# TwitchNerd – Agenten-Anweisungen

## Projektziel

TwitchNerd ist ein persönliches Test-MVP für ein mögliches zukünftiges SaaS-Dashboard für Twitch-Streamer.

Das erste Ziel ist KEIN fertiges SaaS-Produkt.

Das erste Ziel ist ein einfaches, modernes und budgetfreundliches Dashboard für den Streamer LeoNerd87.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase später
- Twitch Helix API später
- Twitch EventSub deutlich später
- Vercel später

## Aktuelle Phase

Wir befinden uns in einer frühen MVP-Phase.

Es sollen aktuell KEINE komplexen Systeme gebaut werden wie:
- Twitch API Integration
- Supabase
- Stripe
- Payment-Systeme
- Docker
- Background Worker
- komplexe SaaS-Logik

außer dies wird ausdrücklich verlangt.

Zuerst sollen Mockdaten und einfache UI-Komponenten gebaut werden.

## Entwicklungsregeln

- Immer in kleinen Schritten arbeiten.
- Nicht die gesamte App auf einmal bauen.
- Vor größeren Änderungen erklären welche Dateien verändert werden.
- Einfache und lesbare Lösungen bevorzugen.
- Keine unnötigen Libraries installieren.
- Keine unnötigen Refactorings durchführen.
- Komponenten klein und verständlich halten.
- TypeScript verwenden.
- Tailwind für Styling verwenden.
- shadcn/ui Komponenten bevorzugen.
- Die UI modern, minimalistisch und responsive halten.
- Keine Secrets oder Tokens committen.
- Twitch Tokens später nur serverseitig verwenden.
- README.md nach größeren Änderungen aktualisieren.

## Kostenkontrolle

Dieses Projekt soll möglichst budgetfreundlich bleiben.

- Kostenlose Lösungen bevorzugen.
- Zuerst lokal entwickeln.
- Keine kostenpflichtigen Services ohne ausdrückliche Freigabe hinzufügen.
- Keine unnötige Infrastruktur bauen.
- Kein Overengineering.
- Erst Mockdaten verwenden bevor echte APIs eingebunden werden.

## Git-Regeln

- Kleine und sinnvolle Commits erstellen.
- Niemals automatisch pushen ohne ausdrückliche Aufforderung.
- Keine Git-History umschreiben.
- Nach sinnvollen Änderungen einen Commit-Namen vorschlagen.

## README-Regeln

Die README.md soll dokumentieren:

- Was hinzugefügt wurde
- Wie das Projekt gestartet wird
- Wichtige Befehle
- Aktuelle Einschränkungen
- Nächste geplante Schritte

## UI-Richtung

TwitchNerd soll wirken wie:

- modernes SaaS Dashboard
- Twitch-inspiriert
- clean und nicht überladen
- streamerfreundlich
- dunkles Interface
- professionell aber leicht nerdig

Verwende:
- Karten
- Charts
- Sidebar Navigation
- klare Metriken

## Reihenfolge der Entwicklung

Folgende Reihenfolge bevorzugen:

1. Landingpage
2. Dashboard-Grundlayout
3. Sidebar und Topbar
4. Mock-Statistiken
5. Mock-Charts
6. Mock-Aktivitäten
7. Responsive Layout
8. Später Twitch OAuth
9. Später Twitch API
10. Später Datenbank-Anbindung

## Vorläufig verboten

Folgende Systeme aktuell NICHT implementieren:

- Stripe
- Abonnements
- Bezahlsysteme
- echtes Multi-User SaaS
- Twitch OAuth
- Twitch EventSub
- komplexe Datenbankmodelle
- Adminpanel
- komplexe Rechteverwaltung
- Docker
- Kubernetes
- Background Worker

außer dies wird ausdrücklich verlangt.