# Call of Dragons — Rhino Account Dashboard

Interactive, browser-based account progression dashboard for **Rhino**.

## V1 capabilities
- Graphical command-dashboard overview
- Editable building levels with automatic completion recalculation
- Separate Economy and Military technology views
- Technology-level progress bars and completion calculations
- Defensive Formations I derived DEF display
- Hero/assets snapshot and generic crystal inventory
- Browser persistence via `localStorage`
- JSON export for portable account snapshots
- Explicit separation between verified account values and placeholder/incomplete tech-tree data

## Run
Open `index.html` in a browser. No build process or dependencies are required.

For local hosting:

```bash
python -m http.server 8000
```

Then browse to `http://localhost:8000`.

## Data status
Building values seeded from the Rhino account updates supplied in the project conversation. The complete Economy and Military technology trees still need to be loaded into the repository as canonical data before the dashboard's technology percentages should be treated as full-tree completion percentages.

## Next build
1. Populate complete Economy/Military tree definitions and current levels.
2. Add prerequisite/path visualization.
3. Add building categories and full building roster.
4. Add troop composition and derived CP model.
5. Add hero, pet, artifact, and legion configuration modules.
6. Add import/restore of exported JSON snapshots.
