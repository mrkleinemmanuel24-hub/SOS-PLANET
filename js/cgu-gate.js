(function(){
  if(localStorage.getItem('cgu_accepted_sos_planet'))return;
  var overlay=document.createElement('div');
  overlay.id='cgu-overlay';
  overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif';
  overlay.innerHTML='<div style="background:#fff;border-radius:16px;max-width:520px;width:100%;max-height:90vh;overflow-y:auto;padding:32px;color:#1a1a1a;box-shadow:0 25px 50px rgba(0,0,0,0.5)">'
    +'<h2 style="margin:0 0 8px;font-size:1.4rem;color:#059669">🌍 SOS Planet</h2>'
    +'<p style="font-size:.85rem;color:#666;margin:0 0 16px">Conditions Générales d\'Utilisation</p>'
    +'<div style="background:#f8f9fa;border-radius:10px;padding:16px;font-size:.82rem;line-height:1.6;color:#444;margin-bottom:20px">'
    +'SOS Planet propose des outils de sensibilisation environnementale. Les calculs d\'empreinte carbone sont basés sur les facteurs ADEME Base Carbone 2024 et sont indicatifs. Aucune donnée personnelle collectée. 100% localStorage. Conforme RGPD. Éditeur : Emmanuel Klein. Hébergeur : Cloudflare Pages. Contact : mr.klein.emmanuel24@gmail.com. Droit français, tribunal Paris.'
    +'</div>'
    +'<label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:.85rem;margin-bottom:20px;line-height:1.4">'
    +'<input type="checkbox" id="cgu-check" style="margin-top:3px;width:18px;height:18px;accent-color:#059669;flex-shrink:0">'
    +'<span>J\'ai lu et j\'accepte les Conditions Générales d\'Utilisation</span>'
    +'</label>'
    +'<button id="cgu-accept-btn" disabled style="width:100%;padding:14px;border:none;border-radius:10px;background:#ccc;color:#fff;font-size:1rem;font-weight:700;cursor:not-allowed;transition:all .3s">Accepter</button>'
    +'</div>';
  document.body.appendChild(overlay);
  var cb=document.getElementById('cgu-check');
  var btn=document.getElementById('cgu-accept-btn');
  cb.addEventListener('change',function(){
    btn.disabled=!cb.checked;
    btn.style.background=cb.checked?'#059669':'#ccc';
    btn.style.cursor=cb.checked?'pointer':'not-allowed';
  });
  btn.addEventListener('click',function(){
    if(!cb.checked)return;
    localStorage.setItem('cgu_accepted_sos_planet','1');
    overlay.style.opacity='0';
    overlay.style.transition='opacity .3s';
    setTimeout(function(){overlay.remove()},300);
  });
})();
