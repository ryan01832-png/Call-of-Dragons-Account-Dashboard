// Account update captured from player screenshots on 2026-10-05.
// This supplemental record extends the verified combat catalog without altering unknown values.
(()=>{
  if(!window.COD_COMBAT_MASTER) return;
  const id='H-SHANGYING';
  const hero={
    id,
    name:'Shang Ying',
    rarity:'Legendary',
    roles:['Cavalry','Garrison','Tank'],
    level:46,
    power:49000,
    stars:1,
    skills:'1/0/0/0',
    awakened:false,
    capacity:81750,
    classification:'New Cavalry hero / Garrison Tank',
    verified:true,
    captured:'2026-10-05',
    skillDefinitions:[
      {name:'Formation Breaker',type:'Rage Skill',rageCost:1000,attackRange:'Mid Range',currentLevel:1,upgrade:{atkBonus:[15,18,21,24,30],skillDamageFactor:[400,500,600,700,800],splashDamageFactor:[150,200,250,300,350]},effect:'For 3s, Legion gains Physical Keen (Physical ATK +15% at level 1); normal attacks deal extra Physical damage to target and splash up to 2 nearby enemy Legions.'},
      {name:'Darkness Vanquished',type:'Passive Skill',currentLevel:0,unlock:'Hero Level 10 and 2 Stars',upgrade:{heroSkillDamageBonus:[5,7,9,12,15]},effect:'After a dealing Cavalry Innate Skill deals AoE Skill damage, Legion gains Hero Skill damage for 3s, max 3 stacks; can trigger once per second.'},
      {name:'Divine Assistance',type:'Passive Skill',currentLevel:0,unlock:'Hero Level 20 and 3 Stars',upgrade:{cavalryDEF:[10,15,20,25,30],cavalryHP:[10,12,14,17,20],marchSpeed:[2,4,6,8,10]},effect:'Cavalry units gain DEF, HP and March Speed.'},
      {name:'Eyes of Ti-Hsi',type:'Passive Skill',currentLevel:0,unlock:'Hero Level 30 and 4 Stars',upgrade:{garrisonHP:[4,8,12,16,20],skillDamageFactor:[300,360,420,480,600],damageFactorIncrease:[100,120,140,160,200]},effect:'When garrisoning a City or Stronghold, Garrisoned Army gains HP. Hero Rage Skill buff enables diffused Physical damage to up to 3 nearby enemies; repeat damage can increase up to 5 times and triggers once every 5s.'},
      {name:'Apotheosis',type:'Awakened Skill',currentLevel:0,unlock:'Hero Level 40 and all skills max',effect:'When a Hero in the Legion casts a Rage Skill, the Legion ignores 20% of enemy HP for 5s.'}
    ],
    talentCapture:{foundationShown:true,foundationCompletionPct:99,recommendedPlans:{pvp:[32,17,10],garrison:[17,0,10,32]},additionalTalentScreenshotsCaptured:true}
  };
  const i=window.COD_COMBAT_MASTER.heroes.findIndex(h=>h.id===id);
  if(i>=0) window.COD_COMBAT_MASTER.heroes[i]=hero; else window.COD_COMBAT_MASTER.heroes.push(hero);
})();