// V3 UI overlay: executive grouped presentation over the verified master-data foundation.
(()=>{
  if(typeof data==='undefined'||typeof master==='undefined')return;
  if(Number(data.schemaVersion||0)<3){data=structuredClone(window.COD_PROFILE_RHINO);save();}
  const f=n=>new Intl.NumberFormat().format(Math.round(Number(n||0)));
  const p=n=>Math.round(n*10)/10;
  const groupOrder=['Command','Research','Military','Support','Economy'];
  const groupMeta=master.buildingGroups||{};
  function buildingRow(b){
    const vals=data.buildings[b.id]||[],levelCur=vals.reduce((a,v)=>a+Number(v||0),0),levelMax=b.slots*b.maxLevel,levelPct=levelMax?levelCur/levelMax*100:0;
    const bCur=data.buildingPowerById?.[b.id],bMax=b.maxPower,cpKnown=Number.isFinite(Number(bCur))&&Number.isFinite(Number(bMax)),remaining=cpKnown?Math.max(0,bMax-bCur):null;
    const state=levelPct===100?'MAX':levelPct>=95?'NEAR MAX':levelPct>=80?'ADVANCED':'DEVELOPING';
    const selects=Array.from({length:b.slots},(_,j)=>`<select aria-label="${b.label} instance ${j+1}" data-building="${b.id}" data-slot="${j}">${Array.from({length:b.maxLevel+1},(_,v)=>`<option ${Number(vals[j]||0)===v?'selected':''}>${v}</option>`).join('')}</select>`).join('');
    return `<div class="building-row-exec"><div class="building-name"><b>${b.label}</b><small>${b.slots>1?b.slots+' structures':b.group}</small></div><div class="building-levels">${selects}</div><div class="building-progress"><div class="building-progress-line"><span>${f(levelCur)} / ${f(levelMax)} levels</span><b>${p(levelPct)}%</b></div><div class="bar"><i style="width:${levelPct}%"></i></div></div><div class="building-cp"><b>${cpKnown?f(bCur)+' CP':'—'}</b><small>${cpKnown?f(bMax)+' max • '+f(remaining)+' remaining':'CP curve pending'}</small></div><div class="building-state ${levelPct===100?'is-max':''}">${state}</div></div>`;
  }
  buildings=function(){
    const h=COD_ENGINE.health(master,data),cur=Number(data.currentBuildingPower||0),max=Number(master.staticPower?.allLevel25BuildingPower||0),rem=Math.max(0,max-cur),cpPct=max?cur/max*100:0;
    const sections=groupOrder.map(key=>{
      const items=master.buildings.filter(b=>b.group===key); if(!items.length)return '';
      const meta=groupMeta[key]||{label:key,description:''};
      const curLv=items.reduce((s,b)=>s+(data.buildings[b.id]||[]).reduce((a,v)=>a+Number(v||0),0),0),maxLv=items.reduce((s,b)=>s+b.slots*b.maxLevel,0),gp=maxLv?curLv/maxLv*100:0;
      return `<div class="card span12 building-group-card"><div class="building-group-head"><div><div class="section-label">${meta.label.toUpperCase()}</div><h2>${meta.label}</h2><div class="mini">${meta.description}</div></div><div class="group-score"><strong>${p(gp)}%</strong><span>${f(curLv)} / ${f(maxLv)} levels</span><div class="bar"><i style="width:${gp}%"></i></div></div></div><div class="building-table-head"><span>STRUCTURE</span><span>LEVEL</span><span>COMPLETION</span><span>COMBAT POWER</span><span>STATUS</span></div>${items.map(buildingRow).join('')}</div>`;
    }).join('');
    const gaps=master.buildings.map(b=>({label:b.label,remaining:Math.max(0,Number(b.maxPower||0)-Number(data.buildingPowerById?.[b.id]||0))})).filter(x=>x.remaining>0).sort((a,b)=>b.remaining-a.remaining).slice(0,5);
    return `<div class="grid buildings-exec">${kpi('Building Completion',`${p(h.buildings.pct)}%`,`${f(h.buildings.current)} / ${f(h.buildings.max)} total levels`,h.buildings.pct)}${kpi('Building Static CP',f(cur),`${f(max)} all-Lv25 maximum`,cpPct)}${kpi('Remaining Building CP',f(rem),`${p(100-cpPct)}% of static building CP remains`)}${kpi('Building Instances',`${master.buildings.reduce((a,b)=>a+b.slots,0)}`,'Controlled city structures')}${sections}<div class="card span12"><div class="section-label">EXECUTIVE DEVELOPMENT VIEW</div><h2>Largest remaining static-CP opportunities</h2><div class="opportunity-strip">${gaps.map((x,i)=>`<div><span>${i+1}</span><b>${x.label}</b><strong>${f(x.remaining)} CP</strong></div>`).join('')}</div><div class="mini" style="margin-top:12px">CP opportunity only. Prerequisite, queue, time and resource-cost logic will determine final upgrade priority.</div></div></div>`;
  };
  if(typeof render==='function')render();
})();