// cart.js — Carrito STOICO (script regular, se carga antes del cierre de body)

function cartGet() {
  try { return JSON.parse(localStorage.getItem('stoico_cart') || '[]'); } catch { return []; }
}
function cartSave(items) {
  localStorage.setItem('stoico_cart', JSON.stringify(items));
  cartUpdateBadge();
  if (document.getElementById('cart-sidebar')?.dataset.open === '1') cartRenderItems();
}
function cartAdd(product, size) {
  const items = cartGet();
  const found = items.find(i => i.id === product.id && i.size === size);
  if (found) { found.qty += 1; }
  else { items.push({ id: product.id, name: product.name, size, price: product.price, img: product.img, qty: 1 }); }
  cartSave(items);
  cartOpen();
}
function cartRemove(id, size) { cartSave(cartGet().filter(i => !(i.id === id && i.size === size))); }
function cartUpdateQty(id, size, delta) {
  const items = cartGet();
  const item = items.find(i => i.id === id && i.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) return cartRemove(id, size);
  cartSave(items);
}
function cartClear() { if (confirm('¿Vaciar el carrito?')) cartSave([]); }

function cartTotal(items) {
  return items.reduce((sum, i) => sum + (parseFloat((i.price||'0').replace(/[^0-9.]/g,''))||0) * i.qty, 0);
}

function cartBuildMsg(items, template) {
  const lines = items.map(i => {
    const price = parseFloat((i.price||'0').replace(/[^0-9.]/g,''))||0;
    const name  = i.name.replace('CAMISETA OVERSIZED ','').replace(/"/g,'');
    return `• ${name} — Talla ${i.size} × ${i.qty} — S/ ${(price * i.qty).toFixed(2)}`;
  }).join('\n');
  return template
    .replace(/{items}/g, lines)
    .replace(/{total}/g, cartTotal(items).toFixed(2))
    .replace(/{cantidad_total}/g, items.reduce((s,i) => s+i.qty, 0));
}

function cartUpdateBadge() {
  const count = cartGet().reduce((s,i) => s+i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.classList.toggle('hidden', count === 0);
  });
}

function cartOpen() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if (!sidebar) return;
  sidebar.dataset.open = '1';
  sidebar.style.transform = 'translateX(0)';
  overlay?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  cartRenderItems();
}
function cartClose() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if (!sidebar) return;
  sidebar.dataset.open = '0';
  sidebar.style.transform = 'translateX(100%)';
  overlay?.classList.add('hidden');
  document.body.style.overflow = '';
}

function cartRenderItems() {
  const items    = cartGet();
  const emptyEl  = document.getElementById('cart-empty');
  const itemsEl  = document.getElementById('cart-items');
  const footerEl = document.getElementById('cart-footer');
  if (!itemsEl) return;

  if (items.length === 0) {
    emptyEl?.classList.remove('hidden');
    itemsEl.classList.add('hidden');
    footerEl?.classList.add('hidden');
    return;
  }
  emptyEl?.classList.add('hidden');
  itemsEl.classList.remove('hidden');
  footerEl?.classList.remove('hidden');

  itemsEl.innerHTML = items.map(item => {
    const price    = parseFloat((item.price||'0').replace(/[^0-9.]/g,''))||0;
    const subtotal = (price * item.qty).toFixed(2);
    const name     = item.name.replace('CAMISETA OVERSIZED ','').replace(/"/g,'');
    return `
      <div class="flex gap-3 py-4 border-b border-gray-100 last:border-0">
        <div class="w-14 h-[72px] bg-gray-100 flex-shrink-0 overflow-hidden">
          <img src="${item.img||''}" class="w-full h-full object-cover object-top" onerror="this.style.display='none'"/>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold text-black uppercase leading-tight mb-0.5">${name}</p>
          <p class="text-xs text-gray-400 mb-1">Talla: ${item.size}</p>
          <p class="text-sm font-bold">S/ ${subtotal}</p>
          <div class="flex items-center gap-2 mt-2">
            <button onclick="cartUpdateQty('${item.id}','${item.size}',-1)"
              class="w-6 h-6 border border-gray-200 hover:border-black flex items-center justify-center text-sm transition-colors leading-none">−</button>
            <span class="text-sm font-semibold w-4 text-center">${item.qty}</span>
            <button onclick="cartUpdateQty('${item.id}','${item.size}',1)"
              class="w-6 h-6 border border-gray-200 hover:border-black flex items-center justify-center text-sm transition-colors leading-none">+</button>
            <button onclick="cartRemove('${item.id}','${item.size}')" class="ml-auto text-gray-300 hover:text-red-500 transition-colors">
              <span class="material-symbols-outlined text-base" style="font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 20">delete</span>
            </button>
          </div>
        </div>
      </div>`;
  }).join('');

  const totalEl = document.getElementById('cart-total-amount');
  if (totalEl) totalEl.textContent = 'S/ ' + cartTotal(items).toFixed(2);

  const waBtn = document.getElementById('cart-wa-btn');
  if (waBtn) {
    const DATA     = stoicoGetData();
    const waNumber = DATA.waNumber || '';
    const base     = waNumber ? `https://wa.me/${waNumber}` : 'https://wa.me/';
    const tpl      = DATA.cartTemplate || STOICO_DEFAULTS.cartTemplate;
    waBtn.href     = base + '?text=' + encodeURIComponent(cartBuildMsg(items, tpl));
  }
}

function cartInjectUI() {
  if (document.getElementById('cart-sidebar')) return; // ya existe
  const el = document.createElement('div');
  el.innerHTML = `
    <div id="cart-overlay" class="hidden fixed inset-0 bg-black/40 z-40" onclick="cartClose()"></div>
    <div id="cart-sidebar" data-open="0"
      style="position:fixed;right:0;top:0;height:100%;width:100%;max-width:340px;background:#fff;border-left:1px solid #000;z-index:50;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s ease">
      <!-- Header -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid #000">
        <div style="display:flex;align-items:center;gap:8px">
          <span class="material-symbols-outlined" style="font-size:20px;font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24">shopping_bag</span>
          <span style="font-family:Montserrat,sans-serif;font-weight:700;font-size:12px;letter-spacing:.15em;text-transform:uppercase">Carrito</span>
        </div>
        <button onclick="cartClose()" style="color:#9ca3af;cursor:pointer;background:none;border:none;display:flex">
          <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24">close</span>
        </button>
      </div>
      <!-- Empty state -->
      <div id="cart-empty" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#d1d5db;gap:12px">
        <span class="material-symbols-outlined" style="font-size:48px;font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48">shopping_bag</span>
        <p style="font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase">Tu carrito está vacío</p>
      </div>
      <!-- Items -->
      <div id="cart-items" class="hidden" style="flex:1;overflow-y:auto;padding:0 20px"></div>
      <!-- Footer -->
      <div id="cart-footer" class="hidden" style="border-top:1px solid #000;padding:16px 20px;display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#6b7280">Total</span>
          <span id="cart-total-amount" style="font-family:Montserrat,sans-serif;font-weight:700;font-size:16px">S/ 0.00</span>
        </div>
        <a id="cart-wa-btn" href="#" target="_blank"
          style="display:flex;align-items:center;justify-content:center;gap:8px;background:#000;color:#fff;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;padding:16px;text-decoration:none;transition:background .2s"
          onmouseover="this.style.background='#222'" onmouseout="this.style.background='#000'">
          <span class="material-symbols-outlined" style="font-size:16px;font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24">chat</span>
          Pedir por WhatsApp
        </a>
        <button onclick="cartClear()"
          style="border:1px solid #d1d5db;color:#9ca3af;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:8px;background:none;cursor:pointer;transition:all .2s"
          onmouseover="this.style.borderColor='#000';this.style.color='#000'" onmouseout="this.style.borderColor='#d1d5db';this.style.color='#9ca3af'">
          Vaciar carrito
        </button>
      </div>
    </div>`;
  document.body.appendChild(el);
  cartUpdateBadge();
}

document.addEventListener('DOMContentLoaded', cartInjectUI);
