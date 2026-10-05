// V3 UI overlay: grouped graphical Buildings view backed by verified master data.
(()=>{
  if(typeof data==='undefined'||typeof master==='undefined')return;
  if(Number(data.schemaVersion||0)<3){data=structuredClone(window.COD_PROFILE_RHINO);save();}
  const f=n=>new Intl.NumberFormat().format(Math.round(Number(n||0)));
  const p=n=>Math.round(n*10)/10;
  buildings=function(){
    const h=COD_ENGINE.health(master,data),cur=Number(data.currentBuildingPower||0),max=Number(master.staticPower?.allLevel25BuildingPower||0),rem=Math.max(0,max-cur),cpPct=max?cur/max*100:0;
    const groupOrder=master.buildingDisplayGroups||[...new Set(master.buildings.map(b=>b.group))];
    const cardFor=b=>{
      const vals=data.buildings[b.id]||[],levelCur=vals.reduce((a,v)=>a+Number(v||0),0),levelMax=b.slots*b.maxLevel,levelPct=levelMax?levelCur/levelMax*100:0;
      const bCur=data.buildingPowerById?.[b.id],bMax=b.maxPower,cpKnown=Number.isFinite(Number(bCur))&&Number.isFinite(Number(bMax));
      const selectors=Array.from({length:b.slots},(_,j)=>`<label style="display:inline-flex;align-items:center;gap:5px;margin:4px 6px 4px 0"><small>${b.slots>1?'#'+(j+1):'Level'}</small><select data-building="${b.id}" data-slot="${j}">${Array.from({length:b.maxLevel+1},(_,v)=>`<option ${Number(vals[j]||0)===v?'selected':''}>${v}</option>`).join('')}</select></label>`).join('');
      return `<div class="card span4"><div class="section-label">${b.group}</div><h2 style="margin-bottom:4px">${b.label}</h2><div class="tree-summary"><b>${p(levelPct)}%</b><span>${f(levelCur)} / ${f(levelMax)} levels</span></div><div class="bar"><i style="width:${levelPct}%"></i></div><div style="margin:10px 0">${selectors}</div><div class="metric"><span>Static CP</span><b>${cpKnown?f(bCur)+' / '+f(bMax):'Pending curve'}</b></div><div class="metric"><span>Remaining CP</span><b>${cpKnown?f(Math.max(0,bMax-bCur)):'—'}</b></div><span class="status">${levelPct===100?'MAX':p(levelPct)+'%'}</span></div>`;
    };
    const grouped=groupOrder.map(g=>{const bs=master.buildings.filter(b=>b.group===g);if(!bs.length)return'';const groupCur=bs.reduce((a,b)=>a+(data.buildings[b.id]||[]).reduce((x,v)=>x+Number(v||0),0),0),groupMax=bs.reduce((a,b)=>a+b.slots*b.maxLevel,0),gp=groupMax?groupCur/groupMax*100:0;return `<div class="card span12"><div class="section-label">${g.toUpperCase()}</div><div class="tree-summary"><b>${p(gp)}%</b><span>${f(groupCur)} / ${f(groupMax)} building levels</span></div></div>${bs.map(cardFor).join('')}`}).join('');
    const gaps=master.buildings.map(b=>({label:b.label,remaining:Math.max(0,Number(b.maxPower||0)-Number(data.buildingPowerById?.[b.id]||0))})).filter(x=>x.remaining>0).sort((a,b)=>b.remaining-a.remaining).slice(0,5);
    return `<div class="grid">${kpi('Building Completion',p(h.buildings.pct)+'%',`${f(h.buildings.current)} / ${f(h.buildings.max)} total building levels`,h.buildings.pct)}${kpi('Building Static CP',f(cur),`${f(max)} maximum`,cpPct)}${kpi('Remaining Building CP',f(rem),'Static CP still available')}${kpi('Building Instances',f(master.buildings.reduce((a,b)=>a+b.slots,0)),'Controlled game-defined slots')}<div class="card span12"><div class="section-label">BUILDING DEVELOPMENT • GROUPED ACCOUNT VIEW</div><h2>Rhino city status from current state → all Level 25</h2><div class="mini">Game constants stay fixed; selectors update only this player's account state. CP values shown are verified static values where available.</div></div>${grouped}<div class="card span12"><div class="section-label">NEXT DEVELOPMENT • VERIFIED CP OPPORTUNITY</div><div class="mini">Largest remaining static-CP pools. This is not yet the final upgrade recommendation model; prerequisite, queue, time and resource-cost weighting comes next.</div>${gaps.map((x,i)=>`<div class="metric"><span>${i+1}. ${x.label}</span><b>${f(x.remaining)} CP</b></div>`).join('')}</div></div>`;
  };
  if(typeof render==='function')render();
})();