// Standalone external-reference layer. Facts here are research-derived and never override verified account data.
window.COD_INTEL={
 schemaVersion:1,updated:'2026-10-07',
 provenance:{priority:['verified-account','verified-game','derived','external-reference','community-meta','model-assessment','unknown']},
 scenarios:[
  {id:'duel',label:'Duel',enemies:1,attackers:1,rotation:10},
  {id:'field',label:'Field Clash',enemies:3,attackers:1,rotation:10},
  {id:'aoe',label:'AoE Cap',enemies:5,attackers:1,rotation:10},
  {id:'swarmed',label:'Swarmed',enemies:3,attackers:3,rotation:10}
 ],
 externalBuilds:{
  'H-LILIYA':{generation:1,sweetspot:'5/1/5/5',pairings:['Velyn','Waldyr','Theia'],artifacts:['Phoenix Eye','Infernal Flame'],source:'external-reference'},
  'H-NICO':{generation:1,sweetspot:'5/1/5/5',pairings:['Kinnara','Gwanwyn'],artifacts:['Shadowblades','Heart of Kamasi'],pet:'Snowpeak Roc',scenario:'Field Clash',source:'external-reference'},
  'H-GARWOOD':{generation:1,sweetspot:'5/1/1/1',pairings:['Eliana','Mu Hsiang'],artifacts:['Dragonscale Armor','Fang of Ashkari'],pet:'Venomous Lizard',source:'external-reference'},
  'H-MAGGRAT':{generation:3,sweetspot:'5/5/5/1',pairings:['Zayda'],artifacts:['Gilded Crossbow'],pet:'Shadow Manticore',scenario:'Field Clash',source:'external-reference'}
 },
 effectTypes:['direct-damage','damage-over-time','follow-up','counterattack','healing','buff','debuff','stack','proc'],
 model:{fields:['trigger','baseFactor','probability','internalCooldown','duration','stacks','targets','critEligible','modifiers']}
};