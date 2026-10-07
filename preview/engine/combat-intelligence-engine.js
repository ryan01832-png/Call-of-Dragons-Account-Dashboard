// Independent combat/intelligence engine. No runtime calls to external sites.
(()=>{const M=window.COD_COMBAT_MASTER,I=window.COD_INTEL;if(!M||!I)return;
const skills=h=>String(h.skills||'').split('/').map(Number);
function development(h){const s=skills(h),sp=s.length?s.reduce((a,v)=>a+v,0)/(s.length*5):0;return Math.round(40*(h.level/60)+20*(h.stars/6)+30*sp+10*(h.awakened?1:0))}
function sweetspotGap(h,target){if(!target)return null;const a=skills(h),b=target.split('/').map(Number);return b.map((v,i)=>Math.max(0,v-(a[i]||0))).reduce((x,y)=>x+y,0)}
function ownedArtifact(name){return M.artifacts.find(a=>a.name===name)}
function ownedPet(name){return M.pets.find(p=>p.name===name||p.species===name)}
function assessHero(h){const meta=I.externalBuilds[h.id],gap=sweetspotGap(h,meta?.sweetspot),pairings=(meta?.pairings||[]).map(name=>({name,owned:M.heroes.some(x=>x.name===name)})),arts=(meta?.artifacts||[]).map(name=>({name,owned:!!ownedArtifact(name)}));return {hero:h,development:development(h),meta,gap,pairings,artifacts:arts,pet:meta?.pet?{name:meta.pet,owned:!!ownedPet(meta.pet)}:null}}
function legionCandidates(){return M.heroes.map(assessHero).filter(x=>x.meta).sort((a,b)=>b.development-a.development)}
function effectExpected(e,ctx={}){let v=Number(e.baseFactor||0);v*=e.probability==null?1:Number(e.probability);v*=Math.max(1,Number(e.stacks||1));v*=Math.max(1,Math.min(Number(e.targets||1),Number(ctx.enemies||1)));if(e.duration)v*=Number(e.duration);if(e.internalCooldown&&ctx.rotation)v*=Math.min(1,Number(ctx.rotation)/Number(e.internalCooldown));for(const m of e.modifiers||[])v*=1+Number(m);return v}
window.COD_INTELLIGENCE_ENGINE={development,sweetspotGap,assessHero,legionCandidates,effectExpected};
})();