document.getElementById('year').textContent = new Date().getFullYear();

/* ============ ROUTING ============ */
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('[data-link]');

function showPage(id){
  pages.forEach(p=>p.classList.remove('active'));
  const target = document.getElementById(id);
  if(target){ target.classList.add('active'); }
  navLinks.forEach(l=>l.classList.toggle('active', l.dataset.link===id));
  window.scrollTo({top:0,behavior:'instant' in window ? 'instant':'auto'});
  closeMenu();
  requestAnimationFrame(revealCheck);
}
function route(){
  const id = (location.hash || '#home').replace('#','');
  const valid = ['home','about','services','industries','projects','dashboard','contact'];
  showPage(valid.includes(id) ? id : 'home');
}
window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', ()=>{ route(); buildContent(); initCharts(); });

/* ============ MOBILE MENU ============ */
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
const overlay = document.getElementById('overlay');
hamburger.addEventListener('click', ()=>{
  mainNav.classList.toggle('open');
  overlay.classList.toggle('show');
});
overlay.addEventListener('click', closeMenu);
function closeMenu(){ mainNav.classList.remove('open'); overlay.classList.remove('show'); }

/* ============ SCROLL REVEAL ============ */
function revealCheck(){
  document.querySelectorAll('.page.active .reveal').forEach(el=>{
    const r = el.getBoundingClientRect();
    if(r.top < window.innerHeight - 80) el.classList.add('in');
  });
}
window.addEventListener('scroll', revealCheck);

/* ============ DATA: SERVICES ============ */
const services = [
  ["PLC Programming","Ladder logic, structured text and function block programs for Siemens, Allen-Bradley and Mitsubishi platforms.","M3 8v8M8 3v18M16 3v18M3 16h8"],
  ["SCADA Development","Plant-wide supervisory systems for real-time monitoring, alarms, trending and historian integration.","M4 4h16v12H4zM8 20h8M12 16v4"],
  ["HMI Design","Operator-focused touchscreen interfaces that turn complex process data into clear, actionable screens.","M3 4h18v16H3zM7 8h4v4H7z"],
  ["Industrial Automation","Full process automation — from sensor and actuator selection through to integrated control logic.","M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"],
  ["Electrical Control Panels","Custom-fabricated, UL/IEC-compliant control panels built and tested in-house before dispatch.","M4 3h16v18H4zM8 7h8M8 11h8M8 15h4"],
  ["Motor Control Centers","MCC design, assembly and retrofits for reliable, centralized motor management.","M12 2a5 5 0 015 5v3a5 5 0 01-10 0V7a5 5 0 015-5zM7 21h10"],
  ["VFD Programming","Variable frequency drive commissioning and tuning for energy-efficient motor control.","M3 12h4l2-8 4 16 3-11 2 3h3"],
  ["Preventive Maintenance","Scheduled inspection and maintenance contracts that catch failures before they cause downtime.","M12 8v4l3 3M12 2a10 10 0 100 20 10 10 0 000-20z"],
  ["Energy Monitoring","Sub-metering and dashboards that reveal where power is used, wasted, and can be optimized.","M13 2L4 14h7l-1 8 9-12h-7z"],
  ["Industrial Consulting","Process audits, automation roadmaps and vendor-neutral system design recommendations.","M12 20h9M12 4h9M4 4h.01M4 12h.01M4 20h.01M8 4h.01M8 20h.01"]
];
const servicesGrid = document.getElementById('servicesGrid');
services.forEach(([title,desc,path])=>{
  servicesGrid.insertAdjacentHTML('beforeend', `
    <div class="bp-card reveal">
      <div class="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="${path}"/></svg></div>
      <h3>${title}</h3><p>${desc}</p>
    </div>`);
});

/* ============ DATA: INDUSTRIES ============ */
const industries = [
  ["Automotive","Robotic welding cells, conveyor sequencing and paint-shop process control."],
  ["Food & Beverage","Hygienic panel design, batching control and CIP/SIP process automation."],
  ["Textile","Spinning and weaving line automation with tension and speed synchronization."],
  ["Cement","Kiln and mill process control with high-reliability MCC design."],
  ["Pharmaceuticals","Validated control systems supporting GMP-compliant batch processes."],
  ["Manufacturing","Discrete and process automation across assembly and fabrication lines."],
  ["Water Treatment","SCADA-monitored pumping, dosing and filtration control systems."],
  ["Oil & Gas","Hazardous-area rated panels and remote monitoring for upstream sites."]
];
const industriesGrid = document.getElementById('industriesGrid');
industries.forEach(([title,desc])=>{
  industriesGrid.insertAdjacentHTML('beforeend', `
    <div class="bp-card reveal">
      <div class="bp-tag">Sector</div>
      <h3>${title}</h3><p>${desc}</p>
    </div>`);
});

/* ============ DATA: PROJECTS ============ */
const projects = [
  ["SCADA Rollout — Beverage Bottling Plant","Deployed a plant-wide SCADA system across four bottling lines, cutting unplanned downtime by 27% (sample figure).","Food & Beverage","2024","images/project-bottling.svg"],
  ["MCC Retrofit — Textile Spinning Unit","Replaced legacy motor control centers with VFD-integrated MCCs across 60 spindle lines.","Textile","2023","images/project-textile.svg"],
  ["PLC Migration — Automotive Weld Cells","Migrated 18 robotic weld cells from legacy PLCs to a unified Allen-Bradley platform.","Automotive","2024","images/project-automotive.svg"],
  ["Energy Monitoring — Cement Plant","Installed sub-metering and dashboards across kiln and mill sections for real-time energy visibility.","Cement","2022","images/project-cement.svg"],
  ["Control Panel Fabrication — Water Treatment","Designed and built 12 custom control panels for a municipal water treatment expansion.","Water Treatment","2023","images/project-water.svg"],
  ["HMI Overhaul — Pharma Batch Plant","Modernized operator HMI screens for a validated batch manufacturing process.","Pharmaceuticals","2024","images/project-pharma.svg"]
];
const projectsGrid = document.getElementById('projectsGrid');
projects.forEach(([title,desc,tag,year,img])=>{
  projectsGrid.insertAdjacentHTML('beforeend', `
    <div class="bp-card proj-card reveal">
      <img src="${img}" alt="${title}" onerror="this.style.background='linear-gradient(145deg,var(--panel),var(--navy-900))';this.removeAttribute('src');">
      <div class="proj-body">
        <div class="proj-meta"><span class="tag">${tag}</span><span>${year}</span></div>
        <h3>${title}</h3><p>${desc}</p>
      </div>
    </div>`);
});

/* ============ DATA: TESTIMONIALS ============ */
const testimonials = [
  ["“GR Industrial Automation rebuilt our bottling line's control system with barely any disruption to our schedule. Their engineers actually understood our process.”","Anita Rao","Plant Manager, Sample Beverage Co. (fictional client)","AR"],
  ["“The SCADA dashboard they delivered gave us visibility we never had before. We now catch issues before they become downtime.”","Michael Tan","Operations Director, Sample Textile Mills (fictional client)","MT"],
  ["“Professional, responsive, and technically sharp. Their preventive maintenance contract has noticeably reduced our unplanned stops.”","Fatima Sheikh","Maintenance Head, Sample Cement Works (fictional client)","FS"]
];
const testimonialsGrid = document.getElementById('testimonialsGrid');
testimonials.forEach(([quote,name,role,initials])=>{
  testimonialsGrid.insertAdjacentHTML('beforeend', `
    <div class="bp-card testi-card reveal">
      <p class="testi-quote">${quote}</p>
      <div class="testi-person">
        <div class="avatar">${initials}</div>
        <div><b>${name}</b><span>${role}</span></div>
      </div>
      <span class="sample-tag">Sample testimonial · demo content</span>
    </div>`);
});

/* ============ DATA: KPI CARDS ============ */
const kpis = [
  ["Machines Running","42 / 48","+3 since yesterday","up",88],
  ["Maintenance Tasks","7 Open","2 overdue","warn",42],
  ["Power Consumption","3,240 kWh","−4.1% vs last week","up",64],
  ["Production Efficiency","91.4%","+1.8% this week","up",91],
  ["Equipment Health","Good — 94/100","3 units need review","warn",94],
  ["System Alerts","5 Active","1 high severity","down",30]
];
const kpiGrid = document.getElementById('kpiGrid');
kpis.forEach(([label,value,delta,cls,bar])=>{
  kpiGrid.insertAdjacentHTML('beforeend', `
    <div class="bp-card kpi-card reveal">
      <div class="kpi-top"><span class="kpi-label">${label}</span></div>
      <div class="kpi-value">${value}</div>
      <div class="kpi-delta ${cls}">${delta}</div>
      <div class="mini-bar"><div style="width:${bar}%"></div></div>
    </div>`);
});

/* ============ ALERTS LIST ============ */
const alerts = [
  ["High vibration detected — Line 3 Conveyor Motor","high"],
  ["Scheduled maintenance due — VFD Unit 07","mid"],
  ["Temperature nearing threshold — Kiln Sensor 2","mid"],
  ["Filter replacement recommended — Water Pump Skid","low"],
  ["Firmware update available — HMI Panel 4","low"]
];
const alertsList = document.getElementById('alertsList');
alerts.forEach(([text,sev])=>{
  alertsList.insertAdjacentHTML('beforeend', `
    <div class="alert-row"><span>${text}</span><span class="sev ${sev}">${sev}</span></div>`);
});

/* ============ CONTACT FORM ============ */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  document.getElementById('formMsg').style.display = 'block';
  this.reset();
});

/* ============ CHARTS ============ */
function initCharts(){
  const gridColor = 'rgba(226,235,247,0.08)';
  const textColor = '#90a0b7';
  Chart.defaults.font.family = "'IBM Plex Mono', monospace";
  Chart.defaults.font.size = 11;
  Chart.defaults.color = textColor;

  new Chart(document.getElementById('chartLine'), {
    type:'line',
    data:{
      labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets:[{
        label:'Efficiency %',
        data:[86,88,84,90,91,93,91],
        borderColor:'#22d3ee',
        backgroundColor:'rgba(34,211,238,0.12)',
        fill:true, tension:.4, pointRadius:3, pointBackgroundColor:'#22d3ee'
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{
        x:{grid:{color:gridColor}},
        y:{grid:{color:gridColor}, min:70, max:100}
      }
    }
  });

  new Chart(document.getElementById('chartDoughnut'), {
    type:'doughnut',
    data:{
      labels:['Excellent','Good','Needs Review','Critical'],
      datasets:[{
        data:[52,32,12,4],
        backgroundColor:['#22d3ee','#2f8fff','#ffb020','#ff5c5c'],
        borderColor:'#0a1626', borderWidth:3
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{position:'bottom', labels:{boxWidth:10, padding:16}}}
    }
  });

  new Chart(document.getElementById('chartBar'), {
    type:'bar',
    data:{
      labels:['Line 1','Line 2','Line 3','Utility','HVAC','Compressor'],
      datasets:[{
        label:'kWh',
        data:[620,540,710,390,480,500],
        backgroundColor:'#2f8fff',
        borderRadius:6,
        maxBarThickness:34
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{ x:{grid:{display:false}}, y:{grid:{color:gridColor}} }
    }
  });
}

function buildContent(){ revealCheck(); }
