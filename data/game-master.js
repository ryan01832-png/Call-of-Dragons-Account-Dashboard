// Canonical game-defined data. Player profiles should reference IDs from this catalog rather than retyping game concepts.
window.COD_GAME_MASTER = {
  schemaVersion: 2,
  maxBuildingLevel: 25,
  troopClasses: [
    {id:'infantry', label:'Infantry'},
    {id:'cavalry', label:'Cavalry'},
    {id:'marksman', label:'Marksman'},
    {id:'magic', label:'Magic'},
    {id:'universal', label:'Universal / Utility'}
  ],
  missions: [
    {id:'pvp-field', label:'PvP Field'},
    {id:'peacekeeping', label:'Peacekeeping'}
  ],
  buildings: [
    {id:'rally-beacon', label:'Rally Beacon', group:'Command', slots:1},
    {id:'mint', label:'Mint', group:'Economy', slots:4},
    {id:'lumber-mill', label:'Lumber Mill', group:'Economy', slots:4},
    {id:'foundry', label:'Foundry', group:'Economy', slots:4},
    {id:'mana-production', label:'Mana Production', group:'Economy', slots:4}
  ],
  technology: {
    economy: [
      {id:'architecture-i', label:'Architecture I', maxLevel:10, branch:'Core'},
      {id:'scholarship-i', label:'Scholarship I', maxLevel:10, branch:'Core'},
      {id:'engineering-i', label:'Engineering I', maxLevel:10, branch:'Core'},
      {id:'resource-production', label:'Resource Production', maxLevel:10, branch:'Resources'}
    ],
    military: [
      {id:'defensive-formations-i', label:'Defensive Formations I', maxLevel:10, branch:'Core', verifiedEffects:{9:'Legion DEF +11%',10:'Legion DEF +15%'}},
      {id:'legion-capacity-i', label:'Legion Capacity I', maxLevel:10, branch:'Core'},
      {id:'infantry-combat', label:'Infantry Combat', maxLevel:10, branch:'Infantry'},
      {id:'cavalry-combat', label:'Cavalry Combat', maxLevel:10, branch:'Cavalry'},
      {id:'marksman-combat', label:'Marksman Combat', maxLevel:10, branch:'Marksman'},
      {id:'magic-combat', label:'Magic Combat', maxLevel:10, branch:'Magic'}
    ]
  },
  // These catalogs intentionally start empty until fixed game values are verified and loaded.
  heroes: [], artifacts: [], pets: [], petSkills: [], troops: []
};