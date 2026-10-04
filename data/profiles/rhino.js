// Player state contains selections/quantities only. Game-defined labels and rules live in game-master.js.
window.COD_PROFILE_RHINO = {
  schemaVersion: 2,
  id: 'rhino',
  name: 'Rhino',
  faction: 'League of Order',
  season: 'Season of Adventure',
  troopTier: 'T4',
  troopQuantity: 1500000,
  buildings: {
    'rally-beacon':[24],
    'mint':[25,24,23,23],
    'lumber-mill':[25,24,24,23],
    'foundry':[25,23,23,23],
    'mana-production':[25,23,23,23]
  },
  technology: {
    economy:{'architecture-i':10,'scholarship-i':10,'engineering-i':10,'resource-production':9},
    military:{'defensive-formations-i':9,'legion-capacity-i':10,'infantry-combat':8,'cavalry-combat':8,'marksman-combat':8,'magic-combat':8}
  },
  crystals:{g6:38,legendary:135,epic:77,rare:15},
  assets:{heroes:{},artifacts:{},pets:{},troops:{}},
  objectives:{primaryTroopClass:'magic', optimizationMissions:['pvp-field','peacekeeping']}
};