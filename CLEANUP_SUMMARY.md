# Cleanup validation

This pass intentionally changes presentation/taxonomy only; it preserves the V3 master-data architecture and Rhino's verified CP baselines.

## Building display groups
1. Core / Command
2. Research & Development
3. Military / Training
4. Healing & Recovery
5. Support / Alliance
6. Resource Production

## Guardrails
- Celestial is excluded from `master.buildings` and documented under troop/combat taxonomy.
- Building selectors remain constrained to 0–25 and update player state, not game constants.
- Building static CP totals remain 13,839,193 current / 18,630,577 maximum / 4,791,384 remaining for the seeded Rhino snapshot.
- Unknown CP curves remain un-inferred.
