(function(){
  "use strict";
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function fmt(n){ return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'k'; }
  function fold(s){ return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); }
  function slug(s){ return fold(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function isMobile(){ return window.matchMedia ? matchMedia('(max-width: 620px)').matches : window.innerWidth <= 620; }
  var IMG = function(n){ return 'assets/img/' + n + '.jpg'; };

  /* ================= Menu (transcribed from the four menu boards on biahoidatmo.com) ================= */
  var BEST = ['Ruốc nấu chua','Mực nấu chua','Chả tôm','Bắp bò ngâm tiêu xanh','Trứng rán hà biển','Chả mực Hạ Long','Mực hấp bia','Tóp mỡ Triều Khúc','Cuống tim xào ngồng tỏi','Mực 1 nắng nướng sa tế','Bầu xào hà biển','Xương đầu ninh khoai sọ'];
  var CATS = [
    {id:'best', label:'Best seller', line:'Mười hai món khách gọi nhiều nhất.', feat:[['Ruốc nấu chua','ruoc-nau-chua'],['Chả tôm','cha-tom'],['Chả mực Hạ Long','cha-muc'],['Mực 1 nắng nướng sa tế','muc-mot-nang-sa-te'],['Bầu xào hà biển','bau-xao-ha-bien']],
      groups:[{items:[['Ruốc nấu chua',220],['Mực nấu chua',286],['Chả tôm',209],['Bắp bò ngâm tiêu xanh',220],['Trứng rán hà biển',176],['Chả mực Hạ Long',220],['Mực hấp bia',286],['Tóp mỡ Triều Khúc',165],['Cuống tim xào ngồng tỏi',198],['Mực 1 nắng nướng sa tế',297],['Bầu xào hà biển',176],['Xương đầu ninh khoai sọ',220]]}]},
    {id:'lau', label:'Lẩu', line:'Một nồi lẩu cho cả bàn, kèm rau và đồ nhúng.', feat:[['Lẩu xương đầu','lau-xuong-dau'],['Ếch om chuối đậu','ech-om-chuoi-dau']],
      groups:[{title:'Lẩu best seller', items:[['Lẩu tôm bầu',605],['Lẩu xương đầu',605],['Lẩu cua cái gà mái',605],['Lẩu ốc',660],['Lẩu thái hải sản',605],['Lẩu gà lá é',605],['Lẩu cá lạp xạp',605]]},
              {title:'Lẩu ngon', items:[['Lẩu gà tiềm ớt hiểm',550],['Lẩu bao tử om tiêu',550],['Lẩu trường thọ',550],['Lẩu bạch tuộc nhúng dấm',550],['Lẩu gân bò om dưa',500],['Lẩu bò thập cẩm',550],['Lẩu gà thuốc bắc',550],['Lẩu gà nấm',550],['Lẩu bò nhúng dấm',550],['Lẩu ếch măng cay',500],['Lẩu riêu cua bắp bò',550],['Ếch om chuối đậu',500]]}]},
    {id:'nuong', label:'Nướng & quay', line:'Đồ nướng than và các món quay theo lịch trong tuần.', feat:[['Má nướng','ma-heo-nuong'],['Lợn sữa quay','lon-sua-quay']],
      groups:[{title:'Đồ nướng', items:[['Má nướng',220],['Dải nướng',220],['Mực 1 nắng nướng sa tế',297],['Nầm nướng',220]]},
              {title:'Đồ quay', items:[['Lợn sữa quay',0],['Ba chỉ quay giòn bì',0],['Lưỡi lợn treo lu',0],['Gà quay lu Tây Bắc',0]]}]},
    {id:'lai-rai', label:'Nhậu lai rai', line:'Món đưa cay, gọi thêm lúc nào cũng hợp.', feat:[['Đậu tẩm hành tóp mỡ','dau-tam-hanh-top-mo']],
      groups:[{items:[['Đậu tẩm hành tóp mỡ',132],['Chả cá thu',132],['Mực xào cần tỏi',286],['Tóp mỡ chiên tê cay',170],['Canh hà nấu chua',154],['Nụ bí xào bò',198],['Bao tử cá xào măng trúc',176],['Chả ốc cuộn giấy bạc',187],['Dồi sụn chiên giòn',176]]}]},
    {id:'khai-vi', label:'Khai vị', line:'Gọi trước trong lúc chờ lẩu sôi.',
      groups:[{items:[['Khoai tây chiên',55],['Khoai lang chiên',55],['Ngô chiên',55],['Nem tươi',99],['Nem chua',66],['Đậu rán',55],['Đậu lướt',55],['Đậu tẩm hành',65]]}]},
    {id:'sun-ga-ech', label:'Sụn · gà · ếch', line:'Gà nguyên con, sụn, ếch và chạch, cá bống.',
      groups:[{title:'Sụn', items:[['Sụn rang muối',176],['Sụn chiên tỏi',176],['Sụn chiên cay',176],['Sụn sóc mắm',176]]},
              {title:'Gà', items:[['Gà chiên mắm',450],['Gà rang muối',450],['Gà hấp lá chanh',495],['Sụn gà chiên cay',176],['Sụn gà chiên mắm',176],['Chân gà rang muối',132],['Chân gà chiên mắm',132],['Chân gà sốt Thái',132]]},
              {title:'Ếch', items:[['Ếch rang muối',176],['Ếch chiên mắm',176],['Ếch chiên lá lốt',176],['Ếch xào măng trúc',187]]},
              {title:'Chạch · cá bống · cá trứng', items:[['Chạch, cá bống chiên lá lốt',176],['Chạch, cá bống chiên cay',176]]}]},
    {id:'ca', label:'Cá chép · cá quả', line:'Một con cá chế biến theo cách bạn chọn.',
      groups:[{items:[['Cá nướng mọi',440],['Cá nướng muối ớt',440],['Cá hấp bia',495],['Cá hấp xì dầu',495],['Cá om dưa',495],['Lẩu cá nấu chua',495],['Lẩu cá rau cải',495]]}]},
    {id:'bo-de', label:'Bò · dê', line:'Bò xào, bò cuốn và dê tái chanh.',
      groups:[{items:[['Bò xào thiên lý',198],['Gầu bò xào rau, dưa',187],['Gầu bò trần hành giá',187],['Bắp bò xào rau, dưa',187],['Bò cuốn cải',187],['Dê tái chanh',231],['Dê xào lăn',231]]}]},
    {id:'kho', label:'Đồ khô', line:'Nướng hoặc chao dầu, nhâm nhi cùng bia.',
      groups:[{items:[['Mực khô',200],['Mực khô sốt chua cay',170],['Cá bò',99],['Cá chỉ vàng',99],['Móng tay khô chao dầu',132]]}]},
    {id:'rau', label:'Rau · nộm', line:'Rau xào và nộm cho đỡ ngấy.',
      groups:[{items:[['Thiên lý xào',66],['Rau cần xào',55],['Rau muống xào',55],['Mướp đắng ruốc',65],['Mướp đắng xào trứng',88],['Củ quả luộc kho quẹt',80],['Bắp cải xào thịt hộp',110],['Nộm hoa chuối tai heo',132],['Nộm hoa chuối bắp bò',154],['Nụ bí xào tỏi',80],['Nộm sứa xoài xanh',132]]}]},
    {id:'com', label:'Cơm · canh · mì', line:'Ăn chắc bụng cuối bữa.',
      groups:[{items:[['Trứng rán',50],['Trứng ngải cứu',70],['Canh cua mồng tơi',90],['Canh cải thịt',90],['Ba chỉ rang',120],['Mì xào bò',154],['Mì xào hải sản',198],['Mì xào trứng rau',100],['Cơm rang thập cẩm',120],['Cơm rang dưa bò',154],['Cơm rang hải sản',198],['Cơm rang trứng',80],['Cơm trắng',50]]}]}
  ];
  var ITEMS = {}, PHOTO = {};
  CATS.forEach(function(c){ (c.feat || []).forEach(function(f){ PHOTO[slug(f[0])] = f[1]; }); c.groups.forEach(function(g){ g.items.forEach(function(it){ var id = slug(it[0]); if (!ITEMS[id]) ITEMS[id] = {id:id, name:it[0], price:it[1]}; }); }); });
  PHOTO[slug('Lẩu xương đầu')] = 'lau-xuong-dau';
  var NEW = [
    {name:'Mặt lợn nổ cốm (1/2)', img:'mat-lon-no-com'},
    {name:'Má heo nướng ngũ vị', img:'ma-heo-nuong', id:slug('Má nướng')},
    {name:'Lẩu bề bề say', img:'lau-be-be-say'},
    {name:'Mực hấp sả dứa', img:'muc-hap-xa-dua'},
    {name:'Lẩu hải sản thập cẩm', img:'lau-hai-san'},
    {name:'Lợn sữa quay giòn bì', img:'lon-sua-quay', note:'Theo lịch quay'},
    {name:'Lẩu xương đầu', img:'lau-xuong-dau', id:slug('Lẩu xương đầu')},
    {name:'Ếch om chuối đậu', img:'ech-om-chuoi-dau', id:slug('Ếch om chuối đậu')}
  ];
  var COMBOS = [
    {id:'combo-1', name:'Combo 1', who:'6–8 người', price:1320, items:['Lẩu tôm bầu','Bắp cải xào thịt hộp','Chả tôm','Đậu tẩm hành','Ngô chiên','Nầm nướng','Cá bò']},
    {id:'combo-2', name:'Combo 2', who:'6–8 người', price:1500, items:['Lẩu xương đầu','Ruốc nấu chua','Mực 1 nắng nướng sa tế','Má heo nướng','Đậu tẩm hành','Cá chỉ vàng','Nộm hoa chuối tai heo']},
    {id:'combo-3', name:'Combo 3', who:'6–8 người', price:1430, items:['Lẩu ốc','Chả mực','Trứng rán hà biển','Nộm hoa chuối bắp bò','Móng tay khô chao dầu','Nụ bí xào tỏi','Khoai tây chiên']},
    {id:'combo-4', name:'Combo 4', who:'4–6 người', price:1100, items:['Lẩu gà lá é','Bắp bò ngâm tiêu xanh','Khoai lang chiên','Đậu tẩm hành tóp mỡ','Rau muống xào','Nem tươi']},
    {id:'combo-5', name:'Combo 5', who:'4–6 người', price:1200, items:['Lẩu thái hải sản','Dải nướng','Ếch rang muối','Rau cải xào','Khoai tây chiên','Cá bò']},
    {id:'combo-6', name:'Combo 6', who:'4–6 người', price:1210, items:['Lẩu cá lạp xạp thuyền chài','Tóp mỡ Triều Khúc','Chả tôm','Nộm sứa','Khoai lang chiên','Cá chỉ vàng']}
  ];
  COMBOS.forEach(function(c){ ITEMS[c.id] = {id:c.id, name:c.name, price:c.price, combo:c}; });
  var PRE = [
    {name:'Vịt trời', img:'vit-troi', price:650, unit:'con', desc:'Hấp xôi, lòng mề xào mướp giá, canh xương.'},
    {name:'Cá song đủ món', img:'goi-ca-song', desc:'Gỏi sashimi, da chiên giòn, hấp xì dầu Hong Kong, lẩu măng chua cay.'},
    {name:'Ngỗng, ngan', img:'ngong-du-mon', desc:'Canh xương, xào lăn, hấp, nướng, giả cầy hoặc theo yêu cầu.'},
    {name:'Gà chọi, gà Đông Tảo', img:'ga-dong-tao', desc:'Hấp, lòng mề xào mướp giá, xương hầm ngải cứu thuốc bắc, xào lăn.'},
    {name:'Cá lăng, cá tầm', img:'ca-lang-du-mon', desc:'Rang muối, sốt Thái, nướng riềng mẻ, lẩu măng cay, lòng xào nấm dưa chua.'},
    {name:'Hải sản Quảng Ninh tươi sống', desc:'Cua, ghẹ, bề bề, tôm sú, tôm hùm, sò huyết, ốc hương, ốc đá, ốc nhảy.'},
    {name:'Dê đủ món', desc:'Lẩu, xào lăn hoặc làm theo yêu cầu.'},
    {name:'Chép sông', desc:'Đầu đuôi nấu canh chua dọc mùng, thịt chiên xù.'}
  ];
  ITEMS['vit-troi'] = {id:'vit-troi', name:'Vịt trời (con)', price:650};
  PHOTO['vit-troi'] = 'vit-troi';
  var BRANCHES = [
    {id:'vu-tong-phan', tag:'Thanh Xuân', name:'Cơ sở Vũ Tông Phan', addr:'699 Vũ Tông Phan, Thanh Xuân, Hà Nội', phones:['0974 00 6666','08 56789 296']},
    {id:'giai-phong', tag:'Hoàng Mai', name:'Cơ sở Giải Phóng', addr:'60 Tương Mai – Giải Phóng, Hà Nội', phones:['0855 569 688','0934 010 790']},
    {id:'nguyen-van-loc', tag:'Hà Đông', name:'Cơ sở Nguyễn Văn Lộc', addr:'222 Nguyễn Văn Lộc, Mỗ Lao, Hà Đông', phones:['0392 684 652','0866 88 7770']}
  ];
  var PROMOS = [
    {small:'Giảm ngay', front:'10%', sub:'bill cho nhóm trên 10 người', back:'Nhóm trên 10 người đặt bàn tại Cơ sở Tương Mai, Giải Phóng. Áp dụng theo từng đợt khuyến mãi.', bg:'#FFC61A', fg:'#1A1405', r:'-4deg'},
    {small:'Tặng', front:'Bánh', sub:'sinh nhật cho nhóm trên 15 người', back:'Nhóm trên 15 người có sinh nhật, đặt bàn tại Cơ sở Tương Mai, Giải Phóng.', bg:'#E2231A', fg:'#FFFFFF', r:'3deg'},
    {small:'Tặng món', front:'−5%', sub:'đặc biệt và giảm bill cho nhóm trên 20 người', back:'Nhóm trên 20 người đặt bàn tại Cơ sở Nguyễn Văn Lộc được tặng món đặc biệt và giảm 5% bill.', bg:'#151311', fg:'#FFD233', r:'-2deg'}
  ];

  /* ================= LED ================= */
  (function(){
    var msgs = ['Đặt bàn sớm nhận thêm ưu đãi', 'Ship bia và món nhậu tận nơi', 'Có phòng VIP, phòng tiệc sức chứa lớn', 'Tổng đài 0974 00 6666', 'Vũ Tông Phan · Giải Phóng · Nguyễn Văn Lộc'];
    var h = msgs.map(function(m){ return '<span>' + esc(m.toUpperCase()) + ' ✦</span>'; }).join('');
    $('#led').innerHTML = h + h;
  })();

  /* ================= Cart ================= */
  var cart = {}, order = [], guests = 4, lastAdded = null;
  try {
    var s = JSON.parse(localStorage.getItem('datmo-phieu') || 'null');
    if (s && s.cart) Object.keys(s.cart).forEach(function(k){ if (ITEMS[k] && s.cart[k] > 0){ cart[k] = Math.min(30, s.cart[k] | 0); order.push(k); } });
    if (s && s.guests) guests = Math.max(1, Math.min(60, s.guests | 0));
  } catch(e) {}
  function save(){ try { localStorage.setItem('datmo-phieu', JSON.stringify({cart:cart, guests:guests})); } catch(e) {} }
  function setQty(id, q){
    q = Math.max(0, Math.min(30, q));
    if (q){ if (!cart[id]) order.push(id); cart[id] = q; } else { delete cart[id]; order = order.filter(function(k){ return k !== id; }); }
    save(); refresh();
  }
  function total(){ var t = 0; Object.keys(cart).forEach(function(k){ t += ITEMS[k].price*cart[k]; }); return t; }
  function count(){ var n = 0; Object.keys(cart).forEach(function(k){ n += cart[k]; }); return n; }
  function ctlHtml(id, name){
    var q = cart[id] || 0;
    if (!q) return '<button class="add" type="button" data-add="'+id+'" aria-label="Thêm '+esc(name)+' vào phiếu">+</button>';
    return '<span class="qty" role="group" aria-label="Số lượng '+esc(name)+'"><button type="button" data-dec="'+id+'" aria-label="Bớt một">−</button><output>'+q+'</output><button type="button" data-inc="'+id+'" aria-label="Thêm một">+</button></span>';
  }

  /* ================= Render menu ================= */
  (function(){
    var html = '', n = 0;
    CATS.forEach(function(c){
      var feat = (c.feat || []).map(function(f){ var id = slug(f[0]), it = ITEMS[id]; return '<article class="fcard" data-name="'+esc(fold(f[0]))+'"><img src="'+IMG(f[1])+'" alt="'+esc(f[0])+'" loading="lazy" width="500" height="440"><div class="cap"><h4>'+esc(f[0])+'</h4>'+(it && it.price ? '<span class="p">'+fmt(it.price)+'</span>' : '<span class="p">Theo lịch</span>')+'</div>'+(it && it.price ? '<span class="ctl" data-ctl="'+id+'">'+ctlHtml(id, f[0])+'</span>' : '')+'</article>'; }).join('');
      var groups = c.groups.map(function(g){
        var rows = g.items.map(function(it){
          n++;
          var id = slug(it[0]), best = c.id !== 'best' && BEST.indexOf(it[0]) >= 0;
          return '<li class="it" data-name="'+esc(fold(it[0]))+'"><span class="n">'+esc(it[0])+(best ? '<small>Best</small>' : '')+'</span><span class="ld"></span>'+
            (it[1] ? '<span class="p">'+fmt(it[1])+'</span><span class="ctl" data-ctl="'+id+'">'+ctlHtml(id, it[0])+'</span>' : '<span class="p na">Theo lịch quay</span><span></span>')+'</li>';
        }).join('');
        return (g.title ? '<h4 class="sub">'+esc(g.title)+'</h4>' : '') + '<ul class="blist">'+rows+'</ul>';
      }).join('');
      html += '<section class="cat" id="cat-'+c.id+'" aria-labelledby="h-'+c.id+'"><div class="cat-head"><h3 class="disp" id="h-'+c.id+'">'+esc(c.label)+'</h3><p>'+esc(c.line)+'</p></div>'+(feat ? '<div class="feat">'+feat+'</div>' : '')+groups+'</section>';
    });
    $('#menu-root').innerHTML = html;
    $('#menu-count').textContent = n + ' món trên menu tại quán, chia theo ' + CATS.length + ' nhóm. Bấm nút vàng để ghi món vào phiếu gọi món.';
    $('#tabs').innerHTML = CATS.map(function(c, i){ return '<button type="button" class="tab" data-cat="'+c.id+'" aria-current="'+(i === 0)+'">'+esc(c.label)+'</button>'; }).join('');
    $('#rail').innerHTML = NEW.map(function(m){
      var it = m.id && ITEMS[m.id];
      return '<article class="ncard"><div class="ph"><img src="'+IMG(m.img)+'" alt="'+esc(m.name)+'" loading="lazy" width="500" height="440"><em>Mới ra lò</em></div><div class="bd"><h3>'+esc(m.name)+'</h3><div class="row">'+
        (it ? '<span class="p" style="font-family:var(--font-display);font-weight:700;font-size:1.2rem">'+fmt(it.price)+'</span><span class="ctl" data-ctl="'+it.id+'">'+ctlHtml(it.id, it.name)+'</span>' : '<span class="help">'+esc(m.note || 'Hỏi giá khi gọi món')+'</span>')+'</div></div></article>';
    }).join('');
    $('#combos').innerHTML = COMBOS.map(function(c){
      return '<article class="combo lift"><h3>'+esc(c.name)+'<span>'+esc(c.who)+'</span></h3><ul>'+c.items.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul><div class="foot"><span class="pr">'+fmt(c.price)+'</span><span class="ctl" data-ctl="'+c.id+'">'+ctlHtml(c.id, c.name)+'</span></div></article>';
    }).join('');
    $('#pre').innerHTML = PRE.filter(function(p){ return p.img; }).map(function(p){
      return '<article class="pcard lift"><img src="'+IMG(p.img)+'" alt="'+esc(p.name)+'" loading="lazy" width="500" height="440"><div class="bd"><span class="season">'+(p.price ? 'Đặt trước' : 'Giá theo thời vụ')+'</span><h3>'+esc(p.name)+'</h3><p>'+esc(p.desc)+'</p>'+(p.price ? '<div class="row"><b>'+fmt(p.price)+' / '+esc(p.unit)+'</b><span class="ctl" data-ctl="vit-troi">'+ctlHtml('vit-troi', p.name)+'</span></div>' : '')+'</div></article>';
    }).join('') + '<article class="pboard lift"><h3>Cũng nhận đặt trước</h3><dl>' + PRE.filter(function(p){ return !p.img; }).map(function(p){ return '<div><dt>'+esc(p.name)+'</dt><dd>'+esc(p.desc)+'</dd></div>'; }).join('') + '</dl><a class="btn btn-yellow btn-sm" href="#co-so">Gọi đặt trước</a></article>';
    $('#coasters').innerHTML = PROMOS.map(function(p){ return '<button type="button" class="coaster" aria-pressed="false" style="--r:'+p.r+';--cbg:'+p.bg+';--cfg:'+p.fg+'" aria-label="'+esc(p.small+' '+p.front+' '+p.sub+'. Bấm để xem điều kiện')+'"><span class="cin"><span class="face front"><small>'+esc(p.small)+'</small><b>'+esc(p.front)+'</b><span>'+esc(p.sub)+'</span></span><span class="face back">'+esc(p.back)+'</span></span></button>'; }).join('');
    $('#branches').innerHTML = BRANCHES.map(function(b, i){
      var q = encodeURIComponent('Bia Hơi Đất Mỏ ' + b.addr);
      return '<article class="branch lift"><span class="tag">'+esc(b.tag)+'</span><h3>'+esc(b.name)+'</h3><p class="addr">'+esc(b.addr)+'</p><ul class="phones">'+b.phones.map(function(ph, j){ var pid = 'ph-'+i+'-'+j; return '<li><b id="'+pid+'">'+esc(ph)+'</b><button class="copy" type="button" data-copy="'+pid+'">Chép số</button></li>'; }).join('')+'</ul>'+
        '<div class="bact"><a href="#dat-ban" data-branch="'+b.id+'">Đặt bàn ở đây →</a><a href="https://www.google.com/maps/search/?api=1&amp;query='+q+'" target="_blank" rel="noopener">Chỉ đường ↗</a></div></article>';
    }).join('');
    $('#foot-addr').innerHTML = BRANCHES.map(function(b){ return '<li>'+esc(b.addr)+'</li>'; }).join('');
    var opts = BRANCHES.map(function(b){ return '<option value="'+b.id+'">'+esc(b.name)+' · '+esc(b.addr)+'</option>'; }).join('');
    $('#bk-branch').innerHTML = opts; $('#sh-branch').innerHTML = opts;
  })();

  function updateCtls(){
    $$('[data-ctl]').forEach(function(el){
      var id = el.getAttribute('data-ctl'), want = String(cart[id] || 0);
      if (el.getAttribute('data-q') !== want){ el.innerHTML = ctlHtml(id, ITEMS[id].name); el.setAttribute('data-q', want); }
    });
  }
  document.addEventListener('click', function(e){
    var a = e.target.closest('[data-add]'), inc = e.target.closest('[data-inc]'), dec = e.target.closest('[data-dec]');
    if (a){
      var id = a.getAttribute('data-add'), card = a.closest('.fcard, .ncard, .pcard, .combo, .it'), img = card && card.querySelector('img');
      var wasEmpty = !count(); lastAdded = id; setQty(id, (cart[id] || 0) + 1); fly(img || a, img);
      if (wasEmpty && !isMobile()) setSlip(true);
      var host = card && card.querySelector('[data-ctl="'+id+'"] [data-inc]'); if (host) host.focus({preventScroll:true});
    } else if (inc){ var k = inc.getAttribute('data-inc'); lastAdded = k; setQty(k, (cart[k] || 0) + 1); }
    else if (dec){ var k2 = dec.getAttribute('data-dec'), card2 = dec.closest('.fcard, .ncard, .pcard, .combo, .it'); setQty(k2, (cart[k2] || 0) - 1); if (!cart[k2] && card2){ var ab = card2.querySelector('[data-add]'); if (ab) ab.focus({preventScroll:true}); } }
  });

  /* tabs + search */
  $('#tabs').addEventListener('click', function(e){ var b = e.target.closest('[data-cat]'); if (!b) return; var sec = document.getElementById('cat-' + b.getAttribute('data-cat')); if (sec) sec.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'start'}); });
  function setTab(id){
    var tabs = $('#tabs');
    $$('.tab', tabs).forEach(function(t){
      var on = t.getAttribute('data-cat') === id;
      if (on && t.getAttribute('aria-current') !== 'true' && !tabs.classList.contains('is-dragging')){
        var x = tabs.scrollLeft + t.getBoundingClientRect().left - tabs.getBoundingClientRect().left - 56;
        tabs.scrollTo({left:Math.max(0, x), behavior: reduce ? 'auto' : 'smooth'});
      }
      t.setAttribute('aria-current', on ? 'true' : 'false');
    });
  }
  $('#q').addEventListener('input', function(){
    var q = fold(this.value.trim()), any = false;
    $$('#menu-root .cat').forEach(function(sec){
      var shown = 0;
      $$('.it, .fcard', sec).forEach(function(el){ var ok = !q || el.getAttribute('data-name').indexOf(q) >= 0; el.hidden = !ok; if (ok && el.classList.contains('it')) shown++; });
      $$('.blist', sec).forEach(function(ul){ var vis = $$('.it', ul).some(function(li){ return !li.hidden; }); ul.hidden = !vis; var h = ul.previousElementSibling; if (h && h.classList.contains('sub')) h.hidden = !vis; });
      var f = $('.feat', sec); if (f) f.hidden = !$$('.fcard', f).some(function(c){ return !c.hidden; });
      sec.hidden = shown === 0; if (shown) any = true;
    });
    $('#nomatch').hidden = any;
  });

  /* mouse drag-to-scroll for horizontal strips (touch and trackpads already scroll natively) */
  function dragScroll(el, snapStep){
    var st = null, justDragged = false;
    el.addEventListener('pointerdown', function(e){
      if (e.pointerType !== 'mouse' || e.button !== 0 || el.scrollWidth <= el.clientWidth + 2) return;
      st = {x:e.clientX, l:el.scrollLeft, id:e.pointerId, moved:false, dx:0};
    });
    el.addEventListener('pointermove', function(e){
      if (!st || e.pointerId !== st.id) return;
      st.dx = e.clientX - st.x;
      if (!st.moved){
        if (Math.abs(st.dx) < 6) return;
        st.moved = true; el.classList.add('is-dragging');
        try { el.setPointerCapture(st.id); } catch(err) {}
        try { getSelection().removeAllRanges(); } catch(err) {}
      }
      el.scrollLeft = st.l - st.dx;
    });
    function end(e){
      if (!st || (e && e.pointerId !== st.id)) return;
      var s = st; st = null;
      if (!s.moved) return;
      justDragged = true; setTimeout(function(){ justDragged = false; }, 0);
      var step = snapStep && snapStep();
      if (step){
        var i = el.scrollLeft / step; i = s.dx < 0 ? Math.ceil(i - .25) : Math.floor(i + .25);
        el.scrollTo({left:i*step, behavior: reduce ? 'auto' : 'smooth'});
        setTimeout(function(){ el.classList.remove('is-dragging'); }, reduce ? 0 : 450);
      } else el.classList.remove('is-dragging');
    }
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end); el.addEventListener('lostpointercapture', end);
    el.addEventListener('click', function(e){ if (justDragged){ e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); justDragged = false; } }, true);
    el.addEventListener('dragstart', function(e){ e.preventDefault(); });
  }
  (function(){
    var tabs = $('#tabs'), wrap = $('#tabs-wrap');
    function edges(){ var max = tabs.scrollWidth - tabs.clientWidth; wrap.classList.toggle('more-l', tabs.scrollLeft > 2); wrap.classList.toggle('more-r', tabs.scrollLeft < max - 2); }
    tabs.addEventListener('scroll', edges, {passive:true}); window.addEventListener('resize', edges);
    if (window.ResizeObserver) new ResizeObserver(edges).observe(tabs);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(edges);
    edges();
    function page(d){ tabs.scrollBy({left:d*Math.max(160, tabs.clientWidth*.6), behavior: reduce ? 'auto' : 'smooth'}); }
    $('#tabs-l').addEventListener('click', function(){ page(-1); });
    $('#tabs-r').addEventListener('click', function(){ page(1); });
    dragScroll(tabs);
    dragScroll($('#rail'), function(){ var c = $('#rail .ncard'); return c ? c.offsetWidth + (parseFloat(getComputedStyle($('#rail')).columnGap) || 16) : 0; });
  })();

  /* rail */
  function railStep(d){ var r = $('#rail'), c = r.querySelector('.ncard'); r.scrollBy({left:d*((c ? c.offsetWidth : 260) + 16), behavior: reduce ? 'auto' : 'smooth'}); }
  $('#rail-prev').addEventListener('click', function(){ railStep(-1); });
  $('#rail-next').addEventListener('click', function(){ railStep(1); });

  /* coasters + copy + branch links */
  $('#coasters').addEventListener('click', function(e){ var b = e.target.closest('.coaster'); if (b) b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); });
  document.addEventListener('click', function(e){
    var c = e.target.closest('[data-copy]');
    if (c){
      var el = document.getElementById(c.getAttribute('data-copy')), txt = el.textContent;
      var done = function(ok){ if (!ok){ var r = document.createRange(); r.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(r); } c.textContent = ok ? 'Đã chép' : 'Đã chọn số'; setTimeout(function(){ c.textContent = 'Chép số'; }, 1600); };
      try { navigator.clipboard.writeText(txt).then(function(){ done(true); }, function(){ done(false); }); } catch(err){ done(false); }
    }
    var br = e.target.closest('[data-branch]'); if (br){ $('#bk-branch').value = br.getAttribute('data-branch'); showTab('ban'); updateBooking(); }
  });

  /* ================= Slip ================= */
  var slip = $('#slip'), slipBar = $('#slip-bar');
  $('#slip-no').textContent = 'Số ' + ('000' + (new Date().getDate()*37 % 900 + 100)).slice(-4);
  function setSlip(open){ slip.classList.toggle('open', open); slipBar.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  slipBar.addEventListener('click', function(){ setSlip(!slip.classList.contains('open')); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && slip.classList.contains('open')){ setSlip(false); slipBar.focus(); } });
  $('#slip-clear').addEventListener('click', function(){ cart = {}; order = []; save(); refresh(); });
  $$('.slip-cta [data-mode]').forEach(function(a){ a.addEventListener('click', function(){ showTab(a.getAttribute('data-mode')); setSlip(false); }); });
  $('#lines').addEventListener('click', function(e){
    var inc = e.target.closest('[data-linc]'), dec = e.target.closest('[data-ldec]');
    if (inc){ var k = inc.getAttribute('data-linc'); setQty(k, (cart[k] || 0) + 1); }
    if (dec){ var k2 = dec.getAttribute('data-ldec'); setQty(k2, (cart[k2] || 0) - 1); }
  });
  function renderSlip(){
    var keys = order.filter(function(k){ return cart[k]; }), html = '';
    keys.forEach(function(k){ var it = ITEMS[k], q = cart[k]; html += '<li class="ln'+(k === lastAdded ? ' new' : '')+'"><span class="q">'+q+'×</span><span class="n">'+esc(it.name)+'</span><span class="p">'+fmt(it.price*q)+'</span><span class="c"><button type="button" data-ldec="'+k+'" aria-label="Bớt một '+esc(it.name)+'">−</button><button type="button" data-linc="'+k+'" aria-label="Thêm một '+esc(it.name)+'">+</button></span></li>'; });
    if (!keys.length) html = '<li class="empty-ln">Phiếu đang trống. Bấm nút vàng cạnh món để ghi vào đây.</li>';
    $('#lines').innerHTML = html;
    var t = total(), n = count();
    $('#tot').textContent = fmt(t); $('#slip-sum').textContent = fmt(t);
    $('#sp-count').textContent = guests + ' người';
    $('#pp').textContent = 'khoảng ' + fmt(Math.round(t/guests)) + '/người';
    $('#slip-sub').textContent = n ? n + ' món · ' + guests + ' người' : 'Chưa có món';
    $('#slip-clear').hidden = !keys.length;
    lastAdded = null;
  }
  function bump(){ if (reduce) return; slip.classList.remove('bump'); void slip.offsetWidth; slip.classList.add('bump'); }
  function fly(fromEl, img){
    if (!fromEl || reduce || !document.body.animate){ bump(); return; }
    var a = fromEl.getBoundingClientRect(), b = slipBar.getBoundingClientRect(); if (!a.width){ bump(); return; }
    var el = document.createElement('span'); el.className = 'fly' + (img ? '' : ' dot');
    if (img) el.innerHTML = '<img src="'+img.getAttribute('src')+'" alt="">';
    var w = img ? 64 : 22;
    el.style.left = (a.left + a.width/2 - w/2) + 'px'; el.style.top = (a.top + a.height/2 - w/2) + 'px';
    document.body.appendChild(el);
    var dx = (b.left + b.width*.7) - (a.left + a.width/2), dy = (b.top + b.height/2) - (a.top + a.height/2);
    var an = el.animate([{transform:'translate(0,0) scale(1) rotate(0)'}, {transform:'translate('+(dx*.45)+'px,'+(Math.min(0, dy)*.35 - 100)+'px) scale(1.15) rotate(-12deg)', offset:.45}, {transform:'translate('+dx+'px,'+dy+'px) scale(.25) rotate(8deg)', opacity:.3}], {duration:720, easing:'cubic-bezier(.3,.6,.4,1)'});
    an.onfinish = function(){ el.remove(); bump(); };
  }

  /* ================= Guests ================= */
  function setGuests(n){ guests = Math.max(1, Math.min(60, n)); $('#bk-count').textContent = guests + ' người'; $('#bk-minus').disabled = $('#sp-minus').disabled = guests <= 1; $('#bk-plus').disabled = $('#sp-plus').disabled = guests >= 60; save(); renderSlip(); updateBooking(); }
  $('#bk-minus').addEventListener('click', function(){ setGuests(guests - 1); });
  $('#bk-plus').addEventListener('click', function(){ setGuests(guests + 1); });
  $('#sp-minus').addEventListener('click', function(){ setGuests(guests - 1); });
  $('#sp-plus').addEventListener('click', function(){ setGuests(guests + 1); });

  /* ================= Booking (proposal: preview only) ================= */
  var DOW = ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
  function today(){ var d = new Date(); return d.getFullYear() + '-' + ('0'+(d.getMonth()+1)).slice(-2) + '-' + ('0'+d.getDate()).slice(-2); }
  function dayLabel(ds){ var d = new Date(ds + 'T00:00:00'); return DOW[d.getDay()] + ', ' + ds.slice(8,10) + '/' + ds.slice(5,7); }
  var bkDate = $('#bk-date'), bkTime = $('#bk-time');
  bkDate.min = today(); bkDate.value = today();
  var SLOTS = []; for (var m = 10*60 + 30; m <= 22*60; m += 30) SLOTS.push(('0' + Math.floor(m/60)).slice(-2) + ':' + ('0' + m%60).slice(-2));
  bkTime.innerHTML = SLOTS.map(function(t){ return '<option value="'+t+'"'+(t === '18:30' ? ' selected' : '')+'>'+t+'</option>'; }).join('');
  $('#sh-time').innerHTML = '<option value="now">Giao sớm nhất có thể</option>' + SLOTS.map(function(t){ return '<option value="'+t+'">'+t+'</option>'; }).join('');
  function updateDate(){ $('#bk-date-help').textContent = bkDate.value ? dayLabel(bkDate.value) + (bkDate.value === today() ? ' · hôm nay' : '') : ''; }
  bkDate.addEventListener('change', updateDate); updateDate();
  ['bk-branch','bk-bday','bk-pre'].forEach(function(id){ document.getElementById(id).addEventListener('change', updateBooking); });
  function promosNow(){
    var b = $('#bk-branch').value, bday = $('#bk-bday').checked, out = [];
    if (b === 'giai-phong'){
      out.push({on: guests > 10, txt:'Giảm 10% bill', why:'cần nhóm trên 10 người'});
      out.push({on: guests > 15 && bday, txt:'Tặng bánh sinh nhật', why: bday ? 'cần nhóm trên 15 người' : 'khi có sinh nhật, nhóm trên 15 người'});
    } else if (b === 'nguyen-van-loc'){
      out.push({on: guests > 20, txt:'Tặng món đặc biệt, giảm 5% bill', why:'cần nhóm trên 20 người'});
    } else out.push({on:false, txt:'Chưa có ưu đãi đang chạy ở cơ sở này', why:''});
    return out;
  }
  function preHtml(){
    var keys = order.filter(function(k){ return cart[k]; });
    if (!keys.length) return '<span class="help">Phiếu đang trống. Chọn món trong thực đơn, hoặc giữ bàn trước rồi gọi tại quán.</span>';
    return '<ul>' + keys.map(function(k){ return '<li><span>'+cart[k]+' × '+esc(ITEMS[k].name)+'</span><span>'+fmt(ITEMS[k].price*cart[k])+'</span></li>'; }).join('') + '</ul><div class="ptot"><span>Tạm tính '+count()+' món</span><span>'+fmt(total())+'</span></div>';
  }
  function updateBooking(){
    $('#bk-promos').innerHTML = promosNow().map(function(p){ return '<span class="promo'+(p.on ? '' : ' off')+'">'+(p.on ? '✓ ' : '')+esc(p.txt)+(!p.on && p.why ? ' · ' + esc(p.why) : '')+'</span>'; }).join('');
    $('#bk-pre-box').hidden = !$('#bk-pre').checked; $('#bk-pre-box').innerHTML = preHtml(); $('#sh-box').innerHTML = preHtml();
  }
  function showTab(which){
    var ban = which !== 'ship';
    $('#tab-ban').setAttribute('aria-selected', ban ? 'true' : 'false'); $('#tab-ship').setAttribute('aria-selected', ban ? 'false' : 'true');
    $('#tab-ban').tabIndex = ban ? 0 : -1; $('#tab-ship').tabIndex = ban ? -1 : 0;
    $('#preview').hidden = true; $('#pane-ban').hidden = !ban; $('#pane-ship').hidden = ban;
  }
  $('#tab-ban').addEventListener('click', function(){ showTab('ban'); });
  $('#tab-ship').addEventListener('click', function(){ showTab('ship'); });
  $('.bk-tabs').addEventListener('keydown', function(e){ if (e.key === 'ArrowRight' || e.key === 'ArrowLeft'){ var to = $('#tab-ban').getAttribute('aria-selected') === 'true' ? 'ship' : 'ban'; showTab(to); $('#tab-' + to).focus(); } });
  function err(id, on, input){ var e = document.getElementById(id); if (e) e.hidden = !on; if (input) input.setAttribute('aria-invalid', on ? 'true' : 'false'); return !on; }
  function phoneOk(v){ return /^0\d{9}$/.test(v.replace(/[\s.\-]/g, '')); }
  function branchOf(id){ return BRANCHES.filter(function(b){ return b.id === id; })[0]; }
  function preview(title, rows, note){
    $('#pv-title').textContent = title;
    $('#pv-list').innerHTML = rows.map(function(r){ return '<dt>'+esc(r[0])+'</dt><dd>'+esc(r[1])+'</dd>'; }).join('');
    $('#pv-note').textContent = note;
    $('#pane-ban').hidden = true; $('#pane-ship').hidden = true; $('#preview').hidden = false; $('#preview').focus();
  }
  $('#pv-back').addEventListener('click', function(){ showTab($('#tab-ship').getAttribute('aria-selected') === 'true' ? 'ship' : 'ban'); });
  $('#ban-form').addEventListener('submit', function(e){
    e.preventDefault();
    var ok = true, first = null;
    function need(c, id, input){ if (!err(id, !c, input)){ ok = false; if (!first) first = input; } }
    need($('#bk-name').value.trim().length > 0, 'err-bk-name', $('#bk-name'));
    need(phoneOk($('#bk-phone').value), 'err-bk-phone', $('#bk-phone'));
    if (!ok){ first.focus(); return; }
    var b = branchOf($('#bk-branch').value), area = {chung:'Sảnh chung', vip:'Phòng VIP', tiec:'Phòng tiệc'}[document.querySelector('input[name="area"]:checked').value];
    var rows = [['Cơ sở', b.name + ' · ' + b.addr], ['Thời gian', bkTime.value + ', ' + dayLabel(bkDate.value)], ['Số người', guests + ' người · ' + area]];
    if ($('#bk-pre').checked && count()) rows.push(['Món gọi trước', count() + ' món · ' + fmt(total())]);
    var ps = promosNow().filter(function(p){ return p.on; }).map(function(p){ return p.txt; }); if (ps.length) rows.push(['Ưu đãi', ps.join(', ')]);
    preview('Xác nhận giữ bàn cho ' + $('#bk-name').value.trim(), rows, 'Đây là màn hình xem trước trong bản đề xuất, chưa có đơn nào được gửi. Khi chạy thật, đơn sẽ chuyển về ' + b.name + ' và quán gọi lại xác nhận. Để đặt bàn ngay, gọi ' + b.phones[0] + '.');
  });
  $('#ship-form').addEventListener('submit', function(e){
    e.preventDefault();
    var ok = true, first = null;
    function need(c, id, input){ if (!err(id, !c, input)){ ok = false; if (!first) first = input; } }
    need($('#sh-addr').value.trim().length > 5, 'err-sh-addr', $('#sh-addr'));
    need($('#sh-name').value.trim().length > 0, 'err-sh-name', $('#sh-name'));
    need(phoneOk($('#sh-phone').value), 'err-sh-phone', $('#sh-phone'));
    if (!err('err-sh-empty', !count(), null)) ok = false;
    if (!ok){ (first || $('#sh-box')).focus && (first || $('#sh-box')).focus(); return; }
    var b = branchOf($('#sh-branch').value), when = $('#sh-time').value;
    preview('Xác nhận đơn ship cho ' + $('#sh-name').value.trim(), [['Giao từ', b.name], ['Giao đến', $('#sh-addr').value.trim()], ['Giờ nhận', when === 'now' ? 'Sớm nhất có thể' : when], ['Món', count() + ' món · ' + fmt(total())]], 'Đây là màn hình xem trước trong bản đề xuất, chưa có đơn nào được gửi. Khi chạy thật, ' + b.name + ' sẽ gọi lại xác nhận món và phí ship. Đặt ship ngay: gọi ' + b.phones[0] + '.');
  });
  [['bk-name','err-bk-name'],['bk-phone','err-bk-phone'],['sh-addr','err-sh-addr'],['sh-name','err-sh-name'],['sh-phone','err-sh-phone']].forEach(function(p){ var el = document.getElementById(p[0]); el.addEventListener('input', function(){ err(p[1], false, el); }); });

  /* ================= Hero clink ================= */
  var cheers = $('#cheers');
  function clink(){ if (reduce){ cheers.classList.add('go'); return; } cheers.classList.remove('go'); void cheers.offsetWidth; cheers.classList.add('go'); }
  clink();
  $('#replay').addEventListener('click', clink);

  /* ================= Theme ================= */
  (function(){
    var root = document.documentElement, btn = $('#theme-toggle'), KEY = 'datmo-theme', mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
    function current(){ var t = root.getAttribute('data-theme'); return (t === 'dark' || t === 'light') ? t : (mq && mq.matches ? 'dark' : 'light'); }
    function sync(){ var t = current(), l = t === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'; btn.setAttribute('data-mode', t); btn.setAttribute('aria-label', l); btn.title = l; }
    function apply(t){ root.setAttribute('data-theme', t); try { localStorage.setItem(KEY, t); } catch(e) {} sync(); }
    btn.addEventListener('click', function(){
      var next = current() === 'dark' ? 'light' : 'dark';
      if (reduce || !document.startViewTransition){ apply(next); return; }
      var r = btn.getBoundingClientRect(), x = r.left + r.width/2, y = r.top + r.height/2, end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      try { var vt = document.startViewTransition(function(){ apply(next); }); vt.ready.then(function(){ root.animate({clipPath:['circle(0px at '+x+'px '+y+'px)', 'circle('+end+'px at '+x+'px '+y+'px)']}, {duration:600, easing:'cubic-bezier(.2,.8,.2,1)', pseudoElement:'::view-transition-new(root)'}); }).catch(function(){}); } catch(e){ apply(next); }
    });
    if (mq){ if (mq.addEventListener) mq.addEventListener('change', sync); else if (mq.addListener) mq.addListener(sync); }
    sync();
  })();

  /* ================= Scroll spy + reveal ================= */
  if ('IntersectionObserver' in window){
    var spy = new IntersectionObserver(function(en){ en.forEach(function(x){ if (x.isIntersecting) setTab(x.target.id.replace('cat-', '')); }); }, {rootMargin:'-30% 0px -60% 0px'});
    $$('#menu-root .cat').forEach(function(s){ spy.observe(s); });
    if (!reduce){
      var vh = window.innerHeight;
      var io = new IntersectionObserver(function(en){ en.forEach(function(x){ if (x.isIntersecting){ x.target.classList.remove('pre'); io.unobserve(x.target); } }); }, {rootMargin:'0px 0px -8% 0px'});
      $$('.lift').forEach(function(el){ if (el.getBoundingClientRect().top > vh){ el.classList.add('pre'); io.observe(el); } });
    }
  }

  function refresh(){ updateCtls(); renderSlip(); updateBooking(); }
  setGuests(guests);
  setSlip(!isMobile() && count() > 0);
  refresh();
})();
