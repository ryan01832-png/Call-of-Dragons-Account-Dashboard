// V3 UI overlay: grouped graphical presentation over the verified master-data foundation.
(()=>{
  if(typeof data==='undefined'||typeof master==='undefined')return;
  if(Number(data.schemaVersion||0)<3){data=structuredClone(window.COD_PROFILE_RHINO);save();}
  const f=n=>new Intl.NumberFormat().format(Math.round(Number(n||0)));
  const p=n=>Math.round(n*10)/10;
  const groupOrder=['Command','Research','Military','Support','Economy'];
  const groupMeta=master.buildingGroups||{};
  function buildingRow(b){
    const vals=data.buildings[b.id]||[],levelCur=vals.reduce((a,v)=>a+Number(v||0),0),levelMax=b.slots*b.maxLevel,levelPct=levelMax?levelCur/levelMax*100:0;
    const bCur=data.buildingPowerById?.[b.id],bMax=b.maxPower,cpKnown=Number.isFinite(Number(bCur))&&Number.isFinite(Number(bMax));
    const instanceText=b.slots>1?`${b.slots} instances • ${vals.map((v,i)=>`#${i+1} Lv${v}`).join(' · ')}`:'1 instance';
    return `<div class="list-row"><div style="min-width:205px"><b>${b.label}</b><br><small>${instanceText}</small></div><div class="levels">${Array.from({length:b.slots},(_,j)=>`<select aria-label="${b.label} instance ${j+1}" data-building="${b.id}" data-slot="${j}">${Array.from({length:b.maxLevel+1},(_,v)=>`<option ${Number(vals[j]||0)===v?'selected':''}>${v}</option>`).join('')}</select>`).join('')}</div><div style="min-width:230px"><div class="bar"><i style="width:${levelPct}%"></i></div><small>Level ${f(levelCur)} / ${f(levelMax)} • ${p(levelPct)}%</small></div><div style="min-width:205px;text-align:right"><b>${cpKnown?f(bCur)+' / '+f(bMax)+' CP':'CP curve pending'}</b><br><small>${cpKnown?f(Math.max(0,bMax-bCur))+' CP remaining':(b.source||'Needs verified curve')}</small></div><span class="status">${levelPct===100?'MAX':p(levelPct)+'%'}</span></div>`;
  }
  buildings=function(){
    const h=COD_ENGINE.health(master,data),cur=Number(data.currentBuildingPower||0),max=Number(master.staticPower?.allLevel25BuildingPower||0),rem=Math.max(0,max-cur),cpPct=max?cur/max*100:0;
    const sections=groupOrder.map(key=>{
      const items=master.buildings.filter(b=>b.group===key); if(!items.length)return '';
      const meta=groupMeta[key]||{label:key,description:''};
      const curLv=items.reduce((s,b)=>s+(data.buildings[b.id]||[]).reduce((a,v)=>a+Number(v||0),0),0),maxLv=items.reduce((s,b)=>s+b.slots*b.maxLevel,0),gp=maxLv?curLv/maxLv*100:0;
      return `<div class="card span12"><div class="section-label">${meta.label.toUpperCase()}</div><div style="display:flex;justify-content:space-between;gap:18px;align-items:end"><div><h2>${meta.label}</h2><div class="mini">${meta.description}</div></div><div style="min-width:260px;text-align:right"><b>${p(gp)}% level complete</b><div class="bar"><i style="width:${gp}%"></i></div><small>${f(curLv)} / ${f(maxLv)} levels</small></div></div>${items.map(buildingRow).join('')}</div>`;
    }).join('');
    const gaps=master.buildings.map(b=>({label:b.label,remaining:Math.max(0,Number(b.maxPower||0)-Number(data.buildingPowerById?.[b.id]||0))})).filter(x=>x.remaining>0).sort((a,b)=>b.remaining-a.remaining).slice(0,5);
    return `<div class="grid">${kpi('Building Completion',`${p(h.buildings.pct)}%`,`${f(h.buildings.current)} / ${f(h.buildings.max)} total levels`,h.buildings.pct)}${kpi('Building Static CP',f(cur),`${f(max)} all-Lv25 maximum`,cpPct)}${kpi('Remaining Building CP',f(rem),`${p(100-cpPct)}% of static building CP remains`)}${kpi('Building Instances',`${master.buildings.reduce((a,b)=>a+b.slots,0)}`,'Predefined controlled city structures')}${sections}<div class="card span12"><div class="section-label">NEXT DEVELOPMENT • VERIFIED CP OPPORTUNITY</div><h2>Largest remaining static-CP pools</h2><div class="mini">This is a CP-opportunity view, not yet the final recommendation engine. Queue, prerequisite, time and resource-cost logic will be layered on top of these verified values.</div>${gaps.map((x,i)=>`<div class="metric"><span>${i+1}. ${x.label}</span><b>${f(x.remaining)} CP remaining</b></div>`).join('')}</div></div>`;
  };
  if(typeof render==='function')render();
})();