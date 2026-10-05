// V3 UI overlay: renders verified building CP baselines and migrates stale V2 local state once.
(()=>{
  if(typeof data==='undefined'||typeof master==='undefined')return;
  if(Number(data.schemaVersion||0)<3){data=structuredClone(window.COD_PROFILE_RHINO);save();}
  const f=n=>new Intl.NumberFormat().format(Math.round(Number(n||0)));
  const p=n=>Math.round(n*10)/10;
  buildings=function(){
    const h=COD_ENGINE.health(master,data),cur=Number(data.currentBuildingPower||0),max=Number(master.staticPower?.allLevel25BuildingPower||0),rem=Math.max(0,max-cur),cpPct=max?cur/max*100:0;
    const rows=master.buildings.map(b=>{
      const vals=data.buildings[b.id]||[],levelCur=vals.reduce((a,v)=>a+Number(v||0),0),levelMax=b.slots*b.maxLevel,levelPct=levelMax?levelCur/levelMax*100:0;
      const bCur=data.buildingPowerById?.[b.id],bMax=b.maxPower,cpKnown=Number.isFinite(Number(bCur))&&Number.isFinite(Number(bMax));
      return `<div class="list-row"><div style="min-width:190px"><b>${b.label}</b><br><small>${b.group} • ${b.slots>1?b.slots+' instances':'1 instance'}</small></div><div class="levels">${Array.from({length:b.slots},(_,j)=>`<select data-building="${b.id}" data-slot="${j}">${Array.from({length:b.maxLevel+1},(_,v)=>`<option ${Number(vals[j]||0)===v?'selected':''}>${v}</option>`).join('')}</select>`).join('')}</div><div style="min-width:220px"><div class="bar"><i style="width:${levelPct}%"></i></div><small>Level ${f(levelCur)} / ${f(levelMax)} • ${p(levelPct)}%</small></div><div style="min-width:190px;text-align:right"><b>${cpKnown?f(bCur)+' / '+f(bMax)+' CP':'CP curve pending'}</b><br><small>${cpKnown?f(Math.max(0,bMax-bCur))+' CP remaining':(b.source||'Needs verified curve')}</small></div><span class="status">${levelPct===100?'MAX':p(levelPct)+'%'}</span></div>`;
    }).join('');
    const gaps=master.buildings.map(b=>({label:b.label,remaining:Math.max(0,Number(b.maxPower||0)-Number(data.buildingPowerById?.[b.id]||0))})).filter(x=>x.remaining>0).sort((a,b)=>b.remaining-a.remaining).slice(0,5);
    return `<div class="grid">${kpi('Building Static CP',f(cur),`${f(max)} all-Lv25 maximum`,cpPct)}${kpi('Remaining Building CP',f(rem),'Verified static CP still available')}${kpi('Building Levels',`${f(h.buildings.current)} / ${f(h.buildings.max)}`,`${p(h.buildings.pct)}% level completion`,h.buildings.pct)}${kpi('Schema Coverage',`${master.buildings.reduce((a,b)=>a+b.slots,0)} instances`,'Controlled predefined building slots')}<div class="card span12"><div class="section-label">BUILDINGS • ACCOUNT STATE AGAINST VERIFIED GAME MASTER</div><h2>Every captured building group • Level status • Current CP / Max CP</h2>${rows}</div><div class="card span12"><div class="section-label">LARGEST VERIFIED BUILDING CP GAPS</div><div class="mini">Not yet an upgrade recommendation: this ranks only the largest remaining verified static-CP pools until prerequisite, queue, time and resource-cost logic are encoded.</div>${gaps.map((x,i)=>`<div class="metric"><span>${i+1}. ${x.label}</span><b>${f(x.remaining)} CP</b></div>`).join('')}</div></div>`;
  };
  if(typeof render==='function')render();
})();