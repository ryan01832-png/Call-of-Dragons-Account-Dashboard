// Foundation V3 — verified constants and account-state corrections sourced from the Call of Dragons Master Repository v2.
// Game constants and player state remain separate. Unknown values are never inferred.
(()=>{
  const m=window.COD_GAME_MASTER,p=window.COD_PROFILE_RHINO;
  if(!m||!p)return;
  m.schemaVersion=3;
  m.provenance={policy:'Live-game evidence > user-confirmed data > derived calculations > external supporting references',unknownPolicy:'blank-not-zero',source:'Call_of_Dragons_Master_Repository_v2.xlsx'};
  m.staticPower={...m.staticPower,economyTechnologyMax:6164604,militaryTechnologyMax:25567885,technologyMax:31732489,allLevel25BuildingPower:18630577,buildingsPlusEconomyPlusMilitaryMax:50363066};
  const bp={
    hall:{maxPower:2195485,source:'Live-game building info'},wall:{maxPower:1545374,source:'Live-game building info'},college:{maxPower:783449,source:'Live-game building info'},'watch-tower':{maxPower:495562,source:'Live-game building info'},'rally-beacon':{maxPower:536181,source:'Live-game building info'},hospital:{maxPower:2930600,source:'4 × verified building info'},mint:{maxPower:572784,source:'Resource-building screenshots'},'lumber-mill':{maxPower:572784,source:'Resource-building screenshots'},foundry:{maxPower:753512,source:'Resource-building screenshots'},'mana-refinery':{maxPower:2940184,source:'Resource-building screenshots'},'troop-building':{maxPower:3581858,source:'Building screenshots'},'alliance-center':{maxPower:658708,source:'Building info screenshot'},bazaar:{maxPower:626317,source:'Building info screenshot'}
  };
  m.buildings.forEach(b=>Object.assign(b,bp[b.id]||{}));
  p.schemaVersion=3;
  p.buildings={hall:[25],wall:[24],college:[24],'watch-tower':[24],'rally-beacon':[22],hospital:[24,24,24,24],mint:[25,22,23,22],'lumber-mill':[25,23,23,22],foundry:[25,22,22,22],'mana-refinery':[25,22,22,22],'troop-building':[25,25,25,25,25],'alliance-center':[25],bazaar:[25]};
  p.buildingPowerById={hall:2195485,wall:986224,college:481806,'watch-tower':303649,'rally-beacon':166522,hospital:1911400,mint:327434,'lumber-mill':347734,foundry:388532,'mana-refinery':1425745,'troop-building':3581858,'alliance-center':658708,bazaar:626317};
  p.currentBuildingPower=13839193;
  p.currentTechnologyPower=7047449;
  p.foundationSnapshot={source:'Call_of_Dragons_Master_Repository_v2.xlsx',status:'verified/derived as labeled',buildingPower:13839193,allLevel25BuildingPower:18630577,remainingBuildingCP:4791384,staticMax:50363066,economyLevels:{current:219,max:348},militaryLevels:{current:214,max:313}};
})();