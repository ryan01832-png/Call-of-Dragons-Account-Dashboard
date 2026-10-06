/* CP & Upgrade Economics presentation enhancement.
   Keeps Verified / Derived / Unknown distinct. */
(function(){
  function familyRows(){
    const rows=curveRows(), ten=rows.filter(r=>r.max===10), groups=[], used=new Set();
    for(const r of ten){
      if(used.has(r.id)) continue;
      const same=ten.filter(x=>!used.has(x.id)&&rmse(r.norm,x.norm)<0.00015);
      same.forEach(x=>used.add(x.id)); groups.push(same);
    }
    groups.sort((a,b)=>b.length-a.length);
    return {rows,groups};
  }
  function deltaPct(norm,i){return i===0?norm[0]*100:(norm[i]-norm[i-1])*100}
  function deltaCP(curve,level){return Number(curve[level]||0)-Number(curve[level-1]||0)}
  function barMarkup(r){
    return r.norm.map((v,i)=>{
      const level=i+1, cumulative=v*100, dPct=deltaPct(r.norm,i), dCp=deltaCP(r.curve,level);
      const tip=`Level ${level} | ${cumulative.toFixed(2)}% cumulative CP | +${dPct.toFixed(2)} pts vs prior level | +${fmt(dCp)} CP on representative ${r.label}`;
      return `<div class="curve-bar-wrap" title="${tip}"><i style="height:${Math.max(3,cumulative)}%"></i><em>L${level}</em><span>${cumulative.toFixed(1)}%</span></div>`;
    }).join('');
  }
  function familyMarkup(g,i){
    const r=g[0];
    const maxDelta=Math.max(...r.norm.map((v,j)=>deltaPct(r.norm,j)));
    const avgDelta=100/r.max;
    return `<div class="curve-family curve-family-rich">
      <div class="family-id"><b>Curve Family ${String(i+1).padStart(2,'0')}</b><span>Unique normalized CP escalation pattern</span></div>
      <div class="family-members"><strong>${g.length} verified node${g.length===1?'':'s'}</strong><small>${g.map(x=>x.label).join(' • ')}</small></div>
      <div class="family-stat"><span>Largest level jump</span><b>+${maxDelta.toFixed(1)} pts</b><small>Average +${avgDelta.toFixed(1)} pts / level</small></div>
      <div class="curve-bars curve-bars-rich">${barMarkup(r)}</div>
    </div>`;
  }
  curveEconomics=function(){
    const {rows,groups}=familyRows(), econ=rows.filter(r=>r.type==='economy'), mil=rows.filter(r=>r.type==='military');
    const reused=groups.filter(g=>g.length>1).reduce((s,g)=>s+g.length,0);
    return `<div class="grid">
      <div class="card span3 kpi"><div class="label">Verified CP Curves</div><div class="value">${rows.length}</div><div class="sub">${econ.length} Economy • ${mil.length} Military</div></div>
      <div class="card span3 kpi"><div class="label">Verified Curve Points</div><div class="value">${rows.reduce((s,r)=>s+r.max,0)}</div><div class="sub">Cumulative level/CP observations</div></div>
      <div class="card span3 kpi"><div class="label">10-Level Families</div><div class="value">${groups.length}</div><div class="sub">Unique normalized escalation patterns</div></div>
      <div class="card span3 kpi"><div class="label">Pattern Reuse</div><div class="value">${reused}</div><div class="sub">Verified nodes sharing a progression family</div></div>
      <div class="card span12"><div class="section-label">CURVE ANALYSIS • VERIFIED DATA ONLY</div><h2>Technology CP progression families</h2>
        <div class="notice"><b>How to read this:</b> each family is a unique escalation pattern after CP is normalized to 100% at max level. Each bar is a research level. Hover a bar to see cumulative %, percentage-point increase from the prior level, and the representative node's actual incremental CP. Families are analytical labels, not Call of Dragons terminology.</div>
        <div class="curve-legend"><span><i></i> Bar height = cumulative % of max CP</span><span>Bar label = cumulative %</span><span>Hover = Δ% + representative ΔCP</span></div>
        ${groups.map(familyMarkup).join('')}
      </div>
      <div class="card span12"><div class="section-label">VERIFIED TECHNOLOGY CURVES</div><h2>Level-by-level CP escalation</h2><div class="curve-table-head"><b>Technology</b><b>Tree</b><b>Max CP</b><b>Cumulative % of max by level</b></div>${rows.sort((a,b)=>a.type.localeCompare(b.type)||a.label.localeCompare(b.label)).map(r=>`<div class="curve-row"><b>${r.label}</b><span>${r.type}</span><strong>${fmt(r.maxcp)}</strong><small>${r.norm.map((v,i)=>`L${i+1} ${(v*100).toFixed(1)}%`).join(' → ')}</small></div>`).join('')}</div>
      <div class="card span12"><div class="section-label">IN-GAME COLOR FAMILY × CP CURVE</div><h2>Does icon background predict the escalation family?</h2><div class="notice">Military color mapping is now loaded from the supplied game-source data in the sequence gray → green → blue → purple → yellow/gold. This classification is separate from the analytical CP Curve Family number. Economy and Military technology color mappings are now loaded from the supplied in-game source material.</div></div>
      <div class="card span12"><div class="section-label">UPGRADE COST & EFFICIENCY</div><h2>Resource and time escalation</h2><div class="notice">CP curves are verified for the records above. Resource requirements and research/build times are not yet complete enough in the current master repository to calculate reliable Food/Wood/Ore/Mana/Gold escalation, CP per resource, or CP per hour across all levels. Those metrics remain <b>Unknown</b> rather than estimated. As verified cost records are added, this section will calculate marginal cost, cumulative cost, cost escalation %, CP/resource and CP/hour alongside the CP curve.</div></div>
    </div>`;
  };
})();