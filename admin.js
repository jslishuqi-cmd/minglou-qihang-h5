(function(){
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const PANEL = $('#admin-panel');
  const LOGIN = $('#admin-login');

  $('#btn-login').addEventListener('click', () => {
    const pass = $('#admin-pass').value;
    // TODO: 替换为真正后端认证
    if (pass === 'admin123'){
      LOGIN.style.display = 'none';
      PANEL.style.display = 'block';
      render();
    } else {
      alert('口令错误');
    }
  });

  $('#btn-apply').addEventListener('click', render);
  $('#btn-reset').addEventListener('click', () => {
    $('#f-name').value = '';
    $('#f-holland').value = '';
    $('#f-mbti').value = '';
    render();
  });
  $('#btn-export').addEventListener('click', exportCSV);

  function getAll(){
    try {
      return JSON.parse(localStorage.getItem('mlqihang_records')||'[]');
    } catch(e){
      return [];
    }
  }

  function render(){
    const nameKey = $('#f-name').value.trim();
    const hollandKey = $('#f-holland').value.trim().toUpperCase();
    const mbtiKey = $('#f-mbti').value.trim().toUpperCase();

    let rows = getAll();

    if (nameKey) {
      rows = rows.filter(r => (r.name||'').includes(nameKey));
    }
    if (hollandKey){
      // 包含筛选：输入任意包含的字母组合，如 'S' 或 'RIA'
      const chars = hollandKey.split('');
      rows = rows.filter(r => {
        const code = (r.hollandCode||'').toUpperCase();
        return chars.every(c => code.includes(c));
      });
    }
    if (mbtiKey){
      rows = rows.filter(r => (r.mbtiType||'').toUpperCase() === mbtiKey);
    }

    const tbody = $('#tbody');
    tbody.innerHTML = rows.map(r => `
      <tr>
        <td>${escapeHtml(r.name)}</td>
        <td>${escapeHtml(r.finishedAt)}</td>
        <td><span class="badge">${escapeHtml(r.hollandCode)}</span></td>
        <td><span class="badge">${escapeHtml(r.mbtiType)}</span></td>
      </tr>
    `).join('');

    $('#count').textContent = `共 ${rows.length} 条记录`;
  }

  function escapeHtml(s){
    return String(s||'').replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
  }

  function exportCSV(){
    const rows = getAll();
    const header = ['姓名','完成时间','霍兰德','MBTI'];
    const data = rows.map(r => [r.name, r.finishedAt, r.hollandCode, r.mbtiType]);
    const csv = [header, ...data].map(cols => cols.map(cell => {
      const s = String(cell||'');
      if (/[",\n]/.test(s)) return `"${s.replace(/"/g,'""')}"`;
      return s;
    }).join(',')).join('\n');

    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `明楼启航-测评数据-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

})();