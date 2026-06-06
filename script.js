// ==============================================================
//  Baroud Store — script.js  ✅ نسخة مُحسَّنة شاملة
// ==============================================================

// ✅ FIX: رقم واتساب — يُفضَّل جلبه من الشيت لاحقاً
const WA_NUMBER     = '213555998895';
const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbyURLcGaCaDl1mcGFx2YjWxjqvJH3xP2sZ1eTzWRC3nLsa9Ukg02qySaFn8WPILcLm-/exec';

// ---------------------------------------------------------------
// هيكل التصنيفات
// ---------------------------------------------------------------
const categoriesTreeData = [
  { id:'phones-tablets',    label:'phones_tablets', icon:'fa-mobile-alt',
    subcategories:[{id:'android-phones',label:'android_phones'},{id:'iphone',label:'iphone'},{id:'tablets',label:'tablets'}] },
  { id:'laptops',           label:'laptops',        icon:'fa-laptop',
    subcategories:[{id:'laptop-work-study',label:'laptop_work'},{id:'laptop-gaming',label:'laptop_gaming'},{id:'laptop-reconditioned',label:'laptop_recond'}] },
  { id:'desktops',          label:'desktops',       icon:'fa-desktop',
    subcategories:[{id:'desktop-ready',label:'desktop_ready'},{id:'desktop-custom',label:'desktop_custom'}] },
  { id:'phone-accessories', label:'phone_acc',      icon:'fa-headphones',
    subcategories:[{id:'acc-bluetooth-earbuds',label:'acc_earbuds'},{id:'acc-chargers',label:'acc_chargers'},{id:'acc-cables',label:'acc_cables'},{id:'acc-cases',label:'acc_cases'},{id:'acc-powerbank',label:'acc_powerbank'},{id:'acc-smartwatches',label:'acc_watches'}] },
  { id:'pc-accessories',    label:'pc_acc',         icon:'fa-keyboard',
    subcategories:[{id:'acc-keyboards',label:'acc_keyboards'},{id:'acc-mice',label:'acc_mice'},{id:'acc-headsets',label:'acc_headsets'},{id:'acc-monitors',label:'acc_monitors'},{id:'acc-bags',label:'acc_bags'},{id:'acc-webcams',label:'acc_webcams'},{id:'acc-laptop-chargers',label:'acc_laptop_chargers'},{id:'acc-networking',label:'acc_networking'}] },
  { id:'pc-components',     label:'pc_comp',        icon:'fa-microchip',
    subcategories:[{id:'comp-cpu',label:'comp_cpu'},{id:'comp-motherboard',label:'comp_mb'},{id:'comp-gpu',label:'comp_gpu'},{id:'comp-ram',label:'comp_ram'},{id:'comp-storage',label:'comp_storage'},{id:'comp-psu',label:'comp_psu'},{id:'comp-case',label:'comp_case'},{id:'comp-cooling',label:'comp_cooling'}] }
];

// ---------------------------------------------------------------
// بيانات احتياطية
// ---------------------------------------------------------------
let productsDB = [
  {id:1,  name:"Samsung Galaxy S24 Ultra",    brand:"Samsung",  price:125000,category:"android-phones",       specs:"12GB/512GB · 6.8\" 120Hz",       isNew:true },
  {id:2,  name:"Google Pixel 8 Pro",          brand:"Google",   price:89000, category:"android-phones",       specs:"12GB/256GB · Android 14",        isNew:false},
  {id:3,  name:"iPhone 15 Pro Max",           brand:"Apple",    price:159000,category:"iphone",               specs:"8GB/512GB · A17 Pro",            isNew:true },
  {id:4,  name:"iPhone 14",                   brand:"Apple",    price:98000, category:"iphone",               specs:"6GB/128GB · A15 Bionic",         isNew:false},
  {id:5,  name:"iPad Pro 12.9",              brand:"Apple",    price:112000,category:"tablets",              specs:"M2 · 256GB · WiFi",              isNew:true },
  {id:6,  name:"Samsung Galaxy Tab S9",       brand:"Samsung",  price:75000, category:"tablets",              specs:"8GB/128GB · 11\"",               isNew:false},
  {id:7,  name:"Lenovo ThinkPad E16",         brand:"Lenovo",   price:78000, category:"laptop-work-study",    specs:"i5-13 · 16GB/512SSD",            isNew:false},
  {id:8,  name:"HP EliteBook 840 G10",        brand:"HP",       price:95000, category:"laptop-work-study",    specs:"i7-1360P · 16GB/512SSD",         isNew:true },
  {id:9,  name:"ASUS ROG Strix G16",          brand:"ASUS",     price:175000,category:"laptop-gaming",        specs:"i9-13900H · RTX 4060 · 16GB",    isNew:true },
  {id:10, name:"MSI Katana 15",              brand:"MSI",      price:120000,category:"laptop-gaming",        specs:"i7 · RTX 4060 · 16GB",           isNew:false},
  {id:11, name:"Dell Latitude 5490 Renové",   brand:"Dell",     price:45000, category:"laptop-reconditioned", specs:"i5-8350U · 16GB/256SSD",         isNew:false},
  {id:12, name:"HP EliteDesk 800 G9",         brand:"HP",       price:89000, category:"desktop-ready",        specs:"i7-13700 · 32GB/1TB",            isNew:true },
  {id:13, name:"PC AMD Ryzen 7 Custom",       brand:"Custom",   price:125000,category:"desktop-custom",       specs:"Ryzen 7 · 32GB · RTX 4060",      isNew:false},
  {id:101,name:"Xiaomi Earbuds BT",           brand:"Xiaomi",   price:5500,  category:"acc-bluetooth-earbuds",specs:"ANC · IPX4",                     isNew:true },
  {id:102,name:"Chargeur GaN 65W",            brand:"UGREEN",   price:4200,  category:"acc-chargers",         specs:"USB-C PD · GaN",                 isNew:false},
  {id:103,name:"Cable USB-C 2m",              brand:"Baseus",   price:900,   category:"acc-cables",           specs:"Nylon · 100W",                   isNew:true },
  {id:104,name:"Coque MagSafe Spigen",        brand:"Spigen",   price:1200,  category:"acc-cases",            specs:"iPhone 15 · Anti-choc",          isNew:false},
  {id:105,name:"Anker PowerBank 20000mAh",    brand:"Anker",    price:7800,  category:"acc-powerbank",        specs:"22.5W Quick Charge",             isNew:true },
  {id:106,name:"Samsung Galaxy Watch 6",      brand:"Samsung",  price:25000, category:"acc-smartwatches",     specs:"44mm · GPS · NFC",               isNew:true },
  {id:201,name:"Keychron K2 Pro",            brand:"Keychron", price:18900, category:"acc-keyboards",        specs:"Mecanique · BT/USB",             isNew:true },
  {id:202,name:"Logitech MX Master 3S",       brand:"Logitech", price:12500, category:"acc-mice",             specs:"Sans fil · 8000 DPI",            isNew:false},
  {id:203,name:"HyperX Cloud II",             brand:"HyperX",   price:15500, category:"acc-headsets",         specs:"7.1 Surround · USB",             isNew:true },
  {id:204,name:"Dell Monitor 24\"",           brand:"Dell",     price:32000, category:"acc-monitors",         specs:"IPS · 75Hz · Full HD",           isNew:false},
  {id:205,name:"Targus Laptop Bag 15.6\"",    brand:"Targus",   price:4500,  category:"acc-bags",             specs:"Anti-eau · USB externe",         isNew:true },
  {id:206,name:"Logitech C920",              brand:"Logitech", price:8900,  category:"acc-webcams",          specs:"1080p · 30fps · Micro",          isNew:false},
  {id:207,name:"Baseus Chargeur PC 65W",      brand:"Baseus",   price:6500,  category:"acc-laptop-chargers",  specs:"USB-C PD · Multi-appareils",     isNew:true },
  {id:208,name:"TP-Link AX5400",             brand:"TP-Link",  price:11500, category:"acc-networking",       specs:"WiFi 6 · Dual Band",             isNew:true },
  {id:301,name:"Intel Core i9-14900K",        brand:"Intel",    price:68000, category:"comp-cpu",             specs:"24 cores · 5.8GHz · LGA1700",    isNew:true },
  {id:302,name:"ASUS ROG Maximus Z790",        brand:"ASUS",     price:72000, category:"comp-motherboard",     specs:"DDR5 · PCIe 5.0 · LGA1700",     isNew:false},
  {id:303,name:"NVIDIA RTX 4080 Super",        brand:"NVIDIA",   price:450000,category:"comp-gpu",             specs:"16GB GDDR6X · PCIe 4.0",         isNew:true },
  {id:304,name:"Corsair DDR5 32GB 6000MHz",   brand:"Corsair",  price:19500, category:"comp-ram",             specs:"6000MHz · CL30 · 2x16GB",        isNew:true },
  {id:305,name:"Samsung 990 Pro 1TB",         brand:"Samsung",  price:22500, category:"comp-storage",         specs:"NVMe PCIe 4.0 · 7450MB/s",       isNew:false},
  {id:306,name:"Corsair RM850e",              brand:"Corsair",  price:24500, category:"comp-psu",             specs:"850W · 80+ Gold · Full Modular", isNew:true },
  {id:307,name:"Lian Li O11 Dynamic",         brand:"Lian Li",  price:19500, category:"comp-case",            specs:"ATX · Double Verre",             isNew:false},
  {id:308,name:"NZXT Kraken X73",             brand:"NZXT",     price:33000, category:"comp-cooling",         specs:"AIO 360mm · RGB · LGA1700",      isNew:true }
];

// ---------------------------------------------------------------
// ترجمات — ✅ إضافة مفتاح badge_new وprice_on_request
// ---------------------------------------------------------------
const translations = {
  ar:{
    categories:"التصنيفات",all_products:"جميع المنتجات",
    hero_desc:"أحدث الهواتف، أقوى الحواسيب، وكل ما تحتاجه من إلكترونيات في مكان واحد.",
    trust1:"ضمان 3 أشهر",trust2:"توصيل سريع",trust3:"الدفع عند الاستلام",
    new_arrivals:"أحدث السلع",search_placeholder:"ابحث عن منتج، براند...",
    sort_by:"ترتيب:",sort_default:"الافتراضي",sort_asc:"السعر ↑",sort_desc:"السعر ↓",
    order_btn:"طلب عبر واتساب",footer_text:"© 2026 Baroud Store - جميع الحقوق محفوظة.",
    no_products:"لا توجد منتجات في هذا التصنيف",no_results:"لا توجد نتائج للبحث عن",
    product_label:"منتج",toast_wa:"🟢 جاري فتح واتساب...",loading:"جاري تحميل المنتجات...",
    // ✅ FIX: badge جديد مترجم
    badge_new:"جديد",
    // ✅ السعر عند الطلب
    price_on_request:"السعر عند الطلب",
    // ✅ مشاركة
    share_toast:"📋 تم نسخ رابط المنتج!",
    phones_tablets:"هواتف وأجهزة لوحية",android_phones:"هواتف Android",iphone:"هواتف iPhone",tablets:"أجهزة لوحية",
    laptops:"حواسيب محمولة",laptop_work:"للعمل والدراسة",laptop_gaming:"للألعاب Gaming",laptop_recond:"مجددة",
    desktops:"حواسيب مكتبية",desktop_ready:"PC كامل جاهز",desktop_custom:"تجميع حسب الطلب",
    phone_acc:"ملحقات الهواتف",acc_earbuds:"سماعات بلوتوث",acc_chargers:"شواحن",acc_cables:"كابلات",
    acc_cases:"حافظات وزجاج",acc_powerbank:"بطاريات خارجية",acc_watches:"ساعات ذكية",
    pc_acc:"ملحقات الحواسيب",acc_keyboards:"لوحات مفاتيح",acc_mice:"ماوس",acc_headsets:"سماعات",
    acc_monitors:"شاشات",acc_bags:"حقائب لابتوب",acc_webcams:"كاميرات ويب",acc_laptop_chargers:"شواحن لابتوب",acc_networking:"شبكات",
    pc_comp:"مكونات الحاسوب",comp_cpu:"معالجات CPU",comp_mb:"لوحات أم",comp_gpu:"كروت شاشة",
    comp_ram:"ذاكرة RAM",comp_storage:"تخزين SSD/HDD",comp_psu:"مزودات طاقة",comp_case:"كيسات",comp_cooling:"مراوح وتبريد"
  },
  fr:{
    categories:"Catégories",all_products:"Tous les produits",
    hero_desc:"Smartphones récents, PC puissants, toute l'électronique au même endroit.",
    trust1:"Garantie 3 mois",trust2:"Livraison rapide",trust3:"Paiement à la livraison",
    new_arrivals:"Nouveautés",search_placeholder:"Rechercher un produit, une marque...",
    sort_by:"Trier :",sort_default:"Par défaut",sort_asc:"Prix ↑",sort_desc:"Prix ↓",
    order_btn:"Commander via WhatsApp",footer_text:"© 2026 Baroud Store - Tous droits réservés.",
    no_products:"Aucun produit dans cette catégorie",no_results:"Aucun résultat pour",
    product_label:"produit",toast_wa:"🟢 Ouverture de WhatsApp...",loading:"Chargement...",
    badge_new:"Nouveau",price_on_request:"Prix sur demande",share_toast:"📋 Lien copié !",
    phones_tablets:"Smartphones & Tablettes",android_phones:"Android",iphone:"iPhones",tablets:"Tablettes",
    laptops:"PC Portables",laptop_work:"Travail & Études",laptop_gaming:"Gaming",laptop_recond:"Reconditionnés",
    desktops:"PC de Bureau",desktop_ready:"PC Prêt",desktop_custom:"Assemblage",
    phone_acc:"Accessoires Tél.",acc_earbuds:"Écouteurs BT",acc_chargers:"Chargeurs",acc_cables:"Câbles",
    acc_cases:"Coques",acc_powerbank:"Batteries Ext.",acc_watches:"Montres Connect.",
    pc_acc:"Accessoires PC",acc_keyboards:"Claviers",acc_mice:"Souris",acc_headsets:"Casques",
    acc_monitors:"Moniteurs",acc_bags:"Sacs PC",acc_webcams:"Webcams",acc_laptop_chargers:"Chargeurs PC",acc_networking:"Réseau",
    pc_comp:"Composants PC",comp_cpu:"Processeurs",comp_mb:"Cartes Mères",comp_gpu:"Cartes GPU",
    comp_ram:"RAM",comp_storage:"Stockage",comp_psu:"Alimentations",comp_case:"Boîtiers",comp_cooling:"Refroidissement"
  },
  en:{
    categories:"Categories",all_products:"All Products",
    hero_desc:"Latest phones, powerful PCs, all electronics in one place.",
    trust1:"3-month warranty",trust2:"Fast delivery",trust3:"Cash on delivery",
    new_arrivals:"New Arrivals",search_placeholder:"Search product, brand...",
    sort_by:"Sort by:",sort_default:"Default",sort_asc:"Price ↑",sort_desc:"Price ↓",
    order_btn:"Order via WhatsApp",footer_text:"© 2026 Baroud Store - All rights reserved.",
    no_products:"No products in this category",no_results:"No results for",
    product_label:"product",toast_wa:"🟢 Opening WhatsApp...",loading:"Loading products...",
    badge_new:"New",price_on_request:"Price on request",share_toast:"📋 Link copied!",
    phones_tablets:"Phones & Tablets",android_phones:"Android",iphone:"iPhones",tablets:"Tablets",
    laptops:"Laptops",laptop_work:"Work & Study",laptop_gaming:"Gaming",laptop_recond:"Refurbished",
    desktops:"Desktop PCs",desktop_ready:"Ready PC",desktop_custom:"Custom Build",
    phone_acc:"Phone Acc.",acc_earbuds:"Earbuds",acc_chargers:"Chargers",acc_cables:"Cables",
    acc_cases:"Cases",acc_powerbank:"Power Banks",acc_watches:"Smart Watches",
    pc_acc:"PC Accessories",acc_keyboards:"Keyboards",acc_mice:"Mice",acc_headsets:"Headsets",
    acc_monitors:"Monitors",acc_bags:"Bags",acc_webcams:"Webcams",acc_laptop_chargers:"Laptop Chargers",acc_networking:"Networking",
    pc_comp:"PC Components",comp_cpu:"CPUs",comp_mb:"Motherboards",comp_gpu:"GPUs",
    comp_ram:"RAM",comp_storage:"Storage",comp_psu:"PSU",comp_case:"Cases",comp_cooling:"Cooling"
  }
};

// ---------------------------------------------------------------
// حالة التطبيق
// ---------------------------------------------------------------
let currentLang         = localStorage.getItem('lang') || 'ar';
let darkMode            = localStorage.getItem('darkMode') === 'true';
let activeCategoryId    = null;
let activeSubcategoryId = null;
let searchQuery         = '';
let sortMode            = 'default';
let isLoading           = false;

// عناصر DOM
const categoriesTreeContainer = document.getElementById('categoriesTree');
const activeCategoryNameEl    = document.getElementById('activeCategoryName');
const productsCountEl         = document.getElementById('productsCount');
const productsGridEl          = document.getElementById('productsGrid');
const newGridEl               = document.getElementById('newProductsGrid');
const newCountEl              = document.getElementById('newCount');
const newArrivalsSection      = document.getElementById('newArrivalsSection');
const searchInputEl           = document.getElementById('searchInput');
const clearSearchBtn          = document.getElementById('clearSearch');
const allProductsBtn          = document.getElementById('allProductsBtn');

// ---------------------------------------------------------------
// ترجمة
// ---------------------------------------------------------------
function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
}

// ---------------------------------------------------------------
// تأمين البيانات
// ---------------------------------------------------------------
function sanitizeProduct(p) {
  if (!p || typeof p !== 'object') return null;
  return {
    id:          Number(p.id) || 0,
    name:        String(p.name  || '').trim(),
    brand:       String(p.brand || '').trim(),
    price:       Number(String(p.price || 0).replace(/[^0-9.]/g, '')) || 0,
    category:    String(p.category    || '').trim(),
    specs:       String(p.specs       || '').trim(),
    description: String(p.description || '').trim(),
    image:       String(p.image       || '').trim(),
    isNew: p.isNew === true || String(p.isNew).toUpperCase() === 'TRUE'
  };
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

// ---------------------------------------------------------------
// الثيم
// ---------------------------------------------------------------
function applyTheme() {
  document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  document.getElementById('darkModeToggle').innerHTML =
    darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}
function toggleDarkMode() {
  darkMode = !darkMode;
  localStorage.setItem('darkMode', darkMode);
  applyTheme();
}

// ---------------------------------------------------------------
// اللغة
// ---------------------------------------------------------------
function updateLangTexts() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.innerText = t(el.getAttribute('data-i18n'));
  });
  if (searchInputEl) searchInputEl.placeholder = t('search_placeholder');
  // ✅ FIX: search input direction follows language
  if (searchInputEl) {
    const isLTR = currentLang === 'en' || currentLang === 'fr';
    searchInputEl.style.direction = isLTR ? 'ltr' : 'rtl';
    searchInputEl.style.textAlign = isLTR ? 'left' : 'right';
  }
  updateActiveCategoryTitle();
  // ✅ تحديث زر واتساب العائم
  updateWaFloat();
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const btn = document.getElementById('langToggle');
  // ✅ FIX: 3-language cycle AR → FR → EN → AR
  if (lang === 'ar')      btn.innerHTML = '🇫🇷 FR';
  else if (lang === 'fr') btn.innerHTML = '🇬🇧 EN';
  else                    btn.innerHTML = '🇸🇦 عربي';

  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', (lang==='en'||lang==='fr') ? 'ltr' : 'rtl');
  updateLangTexts();
  renderCategoriesTree();
  renderAllSections();
}

// ---------------------------------------------------------------
// ✅ واتساب عائم
// ---------------------------------------------------------------
function updateWaFloat() {
  const btn = document.getElementById('waFloat');
  if (btn) {
    btn.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(
      currentLang === 'fr' ? 'Bonjour Baroud Store, je voudrais des informations.' :
      currentLang === 'en' ? 'Hello Baroud Store, I need some information.' :
      'مرحباً Baroud Store، أريد الاستفسار عن منتج.'
    );
  }
}

// ---------------------------------------------------------------
// عنوان القسم
// ---------------------------------------------------------------
function updateActiveCategoryTitle() {
  if (!activeCategoryNameEl) return;
  if (searchQuery) {
    activeCategoryNameEl.innerText = '🔍 "' + searchQuery + '"';
  } else if (activeSubcategoryId) {
    const sub = getSubById(activeSubcategoryId);
    activeCategoryNameEl.innerText = sub ? t(sub.label) : activeSubcategoryId;
  } else if (activeCategoryId) {
    const cat = getCatById(activeCategoryId);
    activeCategoryNameEl.innerText = cat ? t(cat.label) : activeCategoryId;
  } else {
    activeCategoryNameEl.innerText = t('all_products');
  }
}

function getCatById(id) { return categoriesTreeData.find(c => c.id === id) || null; }
function getSubById(id) {
  for (const cat of categoriesTreeData) {
    const sub = cat.subcategories.find(s => s.id === id);
    if (sub) return sub;
  }
  return null;
}

// ---------------------------------------------------------------
// ✅ حساب عدد المنتجات لكل تصنيف
// ---------------------------------------------------------------
function countProductsForCategory(catId) {
  const cat = getCatById(catId);
  if (!cat) return 0;
  const subIds = cat.subcategories.map(s => s.id);
  return productsDB.filter(p => subIds.includes(p.category)).length;
}
function countProductsForSubcategory(subId) {
  return productsDB.filter(p => p.category === subId).length;
}

// ---------------------------------------------------------------
// شجرة التصنيفات — ✅ مع عدادات
// ---------------------------------------------------------------
function renderCategoriesTree() {
  Array.from(categoriesTreeContainer.children).forEach(child => {
    if (child.id !== 'allProductsBtn') child.remove();
  });
  const noFilter = !activeCategoryId && !activeSubcategoryId && !searchQuery;
  allProductsBtn.className = 'all-products-btn' + (noFilter ? ' active' : '');

  categoriesTreeData.forEach(cat => {
    const catCount = countProductsForCategory(cat.id);
    const catDiv   = document.createElement('div');
    catDiv.className = 'category-item';
    const catTitle = document.createElement('div');
    catTitle.className = 'category-title' + (activeCategoryId===cat.id ? ' active' : '');
    catTitle.innerHTML =
      '<i class="fas '+cat.icon+'"></i> ' + t(cat.label) +
      '<span class="cat-count">'+catCount+'</span>';
    catTitle.addEventListener('click', e => {
      e.stopPropagation();
      activeCategoryId=cat.id; activeSubcategoryId=null; searchQuery='';
      searchInputEl.value=''; clearSearchBtn.style.display='none';
      renderCategoriesTree(); renderAllSections(); scrollToProducts();
    });
    catDiv.appendChild(catTitle);

    const subList = document.createElement('div');
    subList.className = 'subcategory-list' + (activeCategoryId===cat.id ? ' show' : '');
    cat.subcategories.forEach(sub => {
      const subCount = countProductsForSubcategory(sub.id);
      const subItem  = document.createElement('div');
      subItem.className = 'subcategory-item' + (activeSubcategoryId===sub.id ? ' active' : '');
      subItem.innerHTML = '<span>'+t(sub.label)+'</span><span class="sub-count">'+subCount+'</span>';
      subItem.addEventListener('click', e => {
        e.stopPropagation();
        activeCategoryId=cat.id; activeSubcategoryId=sub.id; searchQuery='';
        searchInputEl.value=''; clearSearchBtn.style.display='none';
        renderCategoriesTree(); renderAllSections(); scrollToProducts();
      });
      subList.appendChild(subItem);
    });
    catDiv.appendChild(subList);
    categoriesTreeContainer.appendChild(catDiv);
  });
}

// ---------------------------------------------------------------
// فلترة
// ---------------------------------------------------------------
function getFilteredProducts() {
  let list = productsDB.map(p => sanitizeProduct(p)).filter(Boolean);

  if (activeSubcategoryId) {
    list = list.filter(p => p.category === activeSubcategoryId);
  } else if (activeCategoryId) {
    const cat = getCatById(activeCategoryId);
    if (cat) {
      const subIds = cat.subcategories.map(s => s.id);
      list = list.filter(p => subIds.includes(p.category));
    }
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p =>
      (p.name  ||'').toLowerCase().includes(q) ||
      (p.brand ||'').toLowerCase().includes(q) ||
      (p.specs ||'').toLowerCase().includes(q)
    );
  }

  if (sortMode==='price-asc')  list.sort((a,b)=>a.price-b.price);
  if (sortMode==='price-desc') list.sort((a,b)=>b.price-a.price);
  return list;
}

// ---------------------------------------------------------------
// ✅ عرض السعر — "السعر عند الطلب" للمنتجات بسعر 0
// ---------------------------------------------------------------
function renderPrice(priceNum) {
  if (!priceNum || priceNum === 0) {
    return '<span class="price-on-request">'+t('price_on_request')+'</span>';
  }
  return '<span class="price">'+Number(priceNum).toLocaleString('fr-DZ')+' دج</span>';
}

// ---------------------------------------------------------------
// بطاقة المنتج — ✅ badge_new مترجم
// ---------------------------------------------------------------
function createProductCard(raw) {
  const p    = sanitizeProduct(raw);
  if (!p) return document.createDocumentFragment();
  const card = document.createElement('div');
  card.className = 'card';
  const img = p.image || 'https://placehold.co/400x300?text=No+Image';

  card.innerHTML =
    '<div class="card-img">'
    // ✅ FIX: badge-new uses translation
    + (p.isNew ? '<span class="badge-new">'+t('badge_new')+'</span>' : '')
    + '<img src="'+escapeHtml(img)+'" loading="lazy" onerror="this.src=\'https://placehold.co/400x300?text=No+Image\'">'
    + '</div><div class="card-body">'
    + '<div class="card-brand">'+escapeHtml(p.brand)+'</div>'
    + '<div class="card-name">'+escapeHtml(p.name)+'</div>'
    + '<div class="card-specs">'+escapeHtml(p.specs)+'</div>'
    + '<div class="card-footer">'
    // ✅ FIX: السعر عند الطلب
    + renderPrice(p.price)
    + '<button class="btn-detail">'+t('order_btn')+'</button></div>'
    + '</div>';
  card.addEventListener('click', () => openProductModal(p));
  return card;
}

// ---------------------------------------------------------------
// عرض الأقسام
// ---------------------------------------------------------------
function renderAllSections() {
  renderCurrentProducts();
  renderNewArrivals();
}

function renderCurrentProducts() {
  const filtered = getFilteredProducts();
  productsCountEl.innerText = filtered.length + ' ' + t('product_label');
  productsGridEl.innerHTML  = '';
  updateActiveCategoryTitle();
  if (filtered.length === 0) {
    const msg = searchQuery ? t('no_results')+' "'+searchQuery+'"' : t('no_products');
    productsGridEl.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-box-open"></i><p>'+msg+'</p></div>';
    return;
  }
  filtered.forEach(p => productsGridEl.appendChild(createProductCard(p)));
}

function renderNewArrivals() {
  if (!newArrivalsSection) return;
  if (searchQuery) { newArrivalsSection.style.display='none'; return; }
  newArrivalsSection.style.display = '';
  const newProds = productsDB.map(p=>sanitizeProduct(p)).filter(p=>p&&p.isNew===true);
  newCountEl.innerText = newProds.length + ' ' + t('product_label');
  newGridEl.innerHTML  = '';
  if (newProds.length===0) {
    newGridEl.innerHTML='<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-star"></i><p>'+t('no_products')+'</p></div>';
    return;
  }
  newProds.forEach(p => newGridEl.appendChild(createProductCard(p)));
}

// ---------------------------------------------------------------
// مودال المنتج
// ---------------------------------------------------------------
let slideIndex=0, currentSlides=[], currentModalProduct=null;

function openProductModal(raw) {
  const p = sanitizeProduct(raw);
  if (!p) return;
  currentModalProduct = p;

  document.getElementById('modalBrand').innerText = p.brand;
  document.getElementById('modalName').innerText  = p.name;
  document.getElementById('modalDesc').innerText  = p.description;
  document.getElementById('modalSpecs').innerHTML = p.specs ? '<div>⚙️ '+escapeHtml(p.specs)+'</div>' : '';

  const priceNum = Number(p.price);
  document.getElementById('modalPrice').innerHTML = priceNum
    ? priceNum.toLocaleString('fr-DZ') + ' دج'
    : t('price_on_request');

  document.getElementById('modalWa').onclick = () => {
    const priceText = priceNum ? priceNum.toLocaleString('fr-DZ') + ' دج' : t('price_on_request');
    const msg = encodeURIComponent(
      currentLang === 'fr' ? 'Bonjour, je souhaite commander : '+p.name+' ('+priceText+')'
      : currentLang === 'en' ? 'Hello, I would like to order: '+p.name+' ('+priceText+')'
      : 'مرحباً، أريد الاستفسار عن: '+p.name+' بسعر '+priceText
    );
    window.open('https://wa.me/'+WA_NUMBER+'?text='+msg, '_blank');
    showToast(t('toast_wa'));
  };

  // ✅ زر المشاركة
  document.getElementById('modalShare').onclick = () => {
    const shareText = p.name + ' - ' + (priceNum ? priceNum.toLocaleString('fr-DZ') + ' دج' : '') + ' | Baroud Store';
    if (navigator.share) {
      navigator.share({ title: 'Baroud Store', text: shareText, url: window.location.href })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText + '\n' + window.location.href)
        .then(() => showToast(t('share_toast')))
        .catch(() => showToast(t('share_toast')));
    }
  };

  currentSlides = [];
  if (p.image) currentSlides.push(p.image);
  if (raw && Array.isArray(raw.photos)) raw.photos.forEach(ph=>{ if(ph&&!currentSlides.includes(ph)) currentSlides.push(ph); });
  if (currentSlides.length===0) currentSlides.push('https://placehold.co/600x400?text=No+Image');

  const track = document.getElementById('sliderTrack');
  track.innerHTML = currentSlides.map(src=>'<div class="slide"><img src="'+escapeHtml(src)+'" onerror="this.src=\'https://placehold.co/600x400?text=Error\'"></div>').join('');
  slideIndex=0; updateSlider();

  document.querySelector('.modal-slider').onclick = e => {
    if (!e.target.closest('.slider-btn')) openLightbox(currentSlides, slideIndex);
  };
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
  currentModalProduct = null;
}

// ✅ FIX: اتجاه السلايدر — دائماً LTR داخلياً بغض النظر عن لغة الصفحة
function nextSlide() { if(currentSlides.length>1){ slideIndex=(slideIndex+1)%currentSlides.length; updateSlider(); } }
function prevSlide() { if(currentSlides.length>1){ slideIndex=(slideIndex-1+currentSlides.length)%currentSlides.length; updateSlider(); } }

function updateSlider() {
  const track = document.getElementById('sliderTrack');
  if (!track) return;
  // ✅ FIX: السلايدر يتحرك دائماً بـ translateX سالب (LTR logic) بغض النظر عن RTL
  track.style.transform = 'translateX(-' + (slideIndex * 100) + '%)';
  let counter = document.querySelector('.slider-counter');
  if (!counter) {
    counter=document.createElement('div'); counter.className='slider-counter';
    document.querySelector('.modal-slider').appendChild(counter);
  }
  counter.style.display = currentSlides.length>1 ? 'block':'none';
  if (currentSlides.length>1) counter.textContent=(slideIndex+1)+' / '+currentSlides.length;
}

// ---------------------------------------------------------------
// Lightbox
// ---------------------------------------------------------------
let lbImages=[], lbIndex=0;
function openLightbox(images, start) {
  lbImages=images||[]; lbIndex=start||0; updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
}
function updateLightbox() {
  document.getElementById('lbImg').src = lbImages[lbIndex]||'';
  const c=document.getElementById('lbCounter');
  c.textContent = lbImages.length>1 ? (lbIndex+1)+' / '+lbImages.length : '';
}
function lbNext() { if(lbImages.length>1){ lbIndex=(lbIndex+1)%lbImages.length; updateLightbox(); } }
function lbPrev() { if(lbImages.length>1){ lbIndex=(lbIndex-1+lbImages.length)%lbImages.length; updateLightbox(); } }

// ---------------------------------------------------------------
// Toast
// ---------------------------------------------------------------
let toastTimer=null;
function showToast(msg) {
  const toast=document.getElementById('toast');
  toast.innerText=msg; toast.classList.add('show');
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),2800);
}

function scrollToProducts() {
  const el=document.querySelector('.products-section');
  if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
}

// ---------------------------------------------------------------
// ✅ Skeleton → ثم جلب/عرض البيانات
// ---------------------------------------------------------------
function showSkeletons() {
  const makeSkeletons = (count) => Array(count).fill('<div class="skeleton-card"></div>').join('');
  productsGridEl.innerHTML = makeSkeletons(6);
  newGridEl.innerHTML      = makeSkeletons(4);
}

async function loadProductsFromSheet() {
  if (!SHEET_API_URL || SHEET_API_URL==='YOUR_APPS_SCRIPT_URL_HERE') {
    // بيانات محلية — تأخير بسيط لإظهار Skeleton
    await new Promise(r => setTimeout(r, 600));
    renderAllSections(); return;
  }
  showSkeletons(); isLoading=true;
  try {
    const ctrl = new AbortController();
    const tid  = setTimeout(()=>ctrl.abort(), 8000);
    const res  = await fetch(SHEET_API_URL, {signal:ctrl.signal});
    clearTimeout(tid);
    if (!res.ok) throw new Error('HTTP '+res.status);
    const data = await res.json();
    if (data.status==='ok' && Array.isArray(data.products) && data.products.length>0) {
      productsDB = data.products.map(p=>sanitizeProduct(p)).filter(Boolean);
    } else throw new Error('empty');
  } catch(err) {
    console.warn('Baroud Store: fallback to local data —', err.message);
  }
  isLoading=false;
  renderAllSections();
}

// ---------------------------------------------------------------
// أحداث
// ---------------------------------------------------------------
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

document.getElementById('langToggle').addEventListener('click', ()=>{
  // ✅ FIX: دورة ثلاثية كاملة AR → FR → EN → AR
  const next={ar:'fr', fr:'en', en:'ar'};
  setLanguage(next[currentLang] || 'ar');
});

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', e=>{ if(e.target.id==='modal') closeModal(); });

// ✅ FIX: أسهم السلايدر — prev يتراجع، next يتقدم (منطق ثابت مستقل عن RTL/LTR)
document.getElementById('sliderPrev').addEventListener('click', e=>{ e.stopPropagation(); prevSlide(); });
document.getElementById('sliderNext').addEventListener('click', e=>{ e.stopPropagation(); nextSlide(); });

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', lbPrev);
document.getElementById('lbNext').addEventListener('click', lbNext);
document.getElementById('lightbox').addEventListener('click', e=>{ if(e.target.id==='lightbox') closeLightbox(); });

allProductsBtn.addEventListener('click', ()=>{
  activeCategoryId=null; activeSubcategoryId=null; searchQuery=''; sortMode='default';
  searchInputEl.value=''; clearSearchBtn.style.display='none';
  document.querySelectorAll('.sort-btn').forEach(b=>b.classList.toggle('active',b.dataset.sort==='default'));
  renderCategoriesTree(); renderAllSections();
});

searchInputEl.addEventListener('input', ()=>{
  if (isLoading) return;
  searchQuery = searchInputEl.value.trim();
  clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
  if (searchQuery) { activeCategoryId=null; activeSubcategoryId=null; }
  renderCategoriesTree();
  renderAllSections();
});

clearSearchBtn.addEventListener('click', ()=>{
  searchInputEl.value=''; searchQuery=''; clearSearchBtn.style.display='none';
  renderCategoriesTree(); renderAllSections(); searchInputEl.focus();
});

document.querySelectorAll('.sort-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    sortMode=btn.dataset.sort;
    document.querySelectorAll('.sort-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderCurrentProducts();
  });
});

document.addEventListener('keydown', e=>{
  const lb = document.getElementById('lightbox').classList.contains('open');
  const mo = document.getElementById('modal').classList.contains('open');
  if (e.key==='Escape')    { if(lb) closeLightbox(); else if(mo) closeModal(); }
  if (e.key==='ArrowLeft') { if(lb) lbNext();   else if(mo) nextSlide(); }
  if (e.key==='ArrowRight'){ if(lb) lbPrev();   else if(mo) prevSlide(); }
});

// ---------------------------------------------------------------
// تشغيل
// ---------------------------------------------------------------
applyTheme();
showSkeletons();        // ✅ إظهار skeleton فوراً
setLanguage(currentLang);
renderCategoriesTree();
loadProductsFromSheet();
