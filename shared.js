const STOICO_DEFAULTS = {
  waNumber: '',
  heroImg: '',
  sizeGuide: [
    { talla: 'S', largo: '63', ancho: '58', manga: '21' },
    { talla: 'M', largo: '66', ancho: '61', manga: '22' },
  ],
  cartTemplate: 'Hola STOICO 👋, quiero hacer el siguiente pedido:\n\n🛒 MI PEDIDO:\n{items}\n\nTotal: S/ {total}\n\nQuedo atento para coordinar el pago y envío 🙏',
  singleTemplate: 'Hola STOICO 👋, quiero pedir:\n\nProducto: {producto}\nTalla: {talla}\nPrecio: {precio}\n\nQuedo atento.',
  bulkTemplate: 'Hola STOICO 👋\n\nQuiero hacer un pedido al por mayor:\n\nProducto: {producto}\nTallas: {tallas}\nCantidad total: {cantidad} unidades\nPrecio unitario: {precio_unit}\n\nPor favor indicarme disponibilidad y tiempo de entrega.\n\nGracias.',
  products: {
    'galaxy': {
      name: 'CAMISETA OVERSIZED "GALAXY"',
      price: 'S/ 35.00',
      desc: 'Embarca en una odisea cósmica. Diseño oversize con serigrafía frontal y trasera de alta definición. Marrón tierra con diseño GALAXY inspirado en la exploración espacial.',
      img: 'https://lh3.googleusercontent.com/aida/ADBb0ujnMtkDqASBXp2xbWK7txxPGk2yoyneYvOh4_Z_2JBwMI_i4xgWBFxuF23bsK-pxE6CijwATu-VToJ4o4qQlm5BaDrq_InpdOdYnYo34NqtmnR_HO5gElgRRbJbyf9Xznyfss33BXk1TvhNDNCWjzCKPVgpRr8JIK6b9OakeCoyKKwGlt2E7o_haAdVjFf4zVuFqrOFwp8wbZ2rvn8zVcmbJp-RU6FgtdODhp8pfOXdOEsQjjGtclEl_Mv4',
      img2: '',
      img3: '',
    },
    'samurai-tiger': {
      name: 'CAMISETA OVERSIZED "SAMURAI TIGER"',
      price: 'S/ 35.00',
      desc: 'Bound by honor, guided by duty. Diseño oversize negro con serigrafía de tigre blanco y kanji japonés. Inspirada en el código bushido y la filosofía estoica.',
      img: 'https://lh3.googleusercontent.com/aida/ADBb0ugA-Nr4C9gnJ0VxiyUuxW94DyVnmnZw5ju5vZS93idQDXkekixSJ5LZqscS5UT29qwAWsPK6oGn-KM-nU9tZQT27dZ5tcE4kjKlmEmPz6fpIC8bhX6hq0jcWAjELiw_qE4QlEhuSHnOKImx_mLS_i-IEI6aevWE8Svz9hDgStVXpw5zoAb-2UjjPzbp9v2poIa6TFo-LAdhHI8Njt3At-xUPUysx7lPnkuXPzl2e0_sirhmQ9bS9e4upd9A',
      img2: '',
      img3: '',
    },
    'moving-forward': {
      name: 'CAMISETA OVERSIZED "MOVING FORWARD"',
      price: 'S/ 35.00',
      desc: 'Just keep on moving forward. Diseño oversize gris con tipografía bold en morado y negro. Embrace each challenge as an opportunity for growth.',
      img: 'https://lh3.googleusercontent.com/aida/ADBb0uii8eFlfEmouKlvY5cjQPMTzxOwgjJoN_2N_LwAydr2TsdmDqUJpXY4d4H6oiDFmqOpW6ZHZQxNwNwvxEZuzkBSqgTOl3MyQUJR9KLB720ikdQVAUZkLPhqTaX_FEKumtTnkaRdDUYetRr6G4oUiGOjbmu6S7tux-_WD2mM4CR1SZqpOcF3Gcmt9T0Xmhe-frx_kMDKW7U9PNFTbkyHvMUcXTqwQmU5pKO_EFjm5H_TrNWQXW64VygShl8',
      img2: '',
      img3: '',
    },
    'never-surrender': {
      name: 'CAMISETA OVERSIZED "NEVER SURRENDER"',
      price: 'S/ 35.00',
      desc: 'Never stop, never give up. Diseño oversize gris con serigrafía de escultura clásica en rojo y blanco. Human Strong.',
      img: 'https://lh3.googleusercontent.com/aida/ADBb0ui89EKyUo-IwjSkwR16FL1ODXHsj_L-90FTae3gy2e1f4v2rCdijhhz5i4W2-_CDq3imOsP-ENzrc8Jc0c7iIdwQnJw1tOPsr-ibDhK1QsU2Vk2b8EwdL89Qi11YRVTp4SnaoHA_dwlUDFah1CtpsQ7X18cDJHIq9bVk6RKNFnJRshOJ0c1LssTEO2trCqid-B5dQZP4BZGGqALq1WO2hR_ga8rqnZ-4OHZMMHoyxY_6VAZn-g9BPealXOe',
      img2: '',
      img3: '',
    },
    'heart-grenade': {
      name: 'CAMISETA OVERSIZED "HEART GRENADE"',
      price: 'S/ 35.00',
      desc: 'Hearts live by being wounded. Diseño oversize blanco con serigrafía de corazón-granada en dorado y rojo. Tipografía old english.',
      img: 'https://lh3.googleusercontent.com/aida/ADBb0uizr8w9CzKoqQ7vDdNO-gE1YTEWv3scWCJbAw1saqwNv4dkSLcIKcNNcblfr4NmSutR4IZOaLhrfHua0Ek9Jb_29d-TWFZUDBQ0Rxt88A4ULANcIGUdpZGghEyZflQR8znJPnj-A51QJMkwdPF4KPVYa6tuobB5CsJQGDiFnatKDFrCITFiNSFyj5_sR1C1GtmygHrNmiEXlGYeYg9CU0Y_HBjBlKaaWa06N3UapV2nRNwAabmLMpP61CeL',
      img2: '',
      img3: '',
    },
    'urban-sentinels': {
      name: 'CAMISETA OVERSIZED "URBAN SENTINELS"',
      price: 'S/ 35.00',
      desc: 'Money Crazy — Money for Living Needs. Diseño oversize blanco con serigrafía urbana. Estética City Vibes Neo-Street.',
      img: 'https://lh3.googleusercontent.com/aida/ADBb0uiGwgyKz2kqC62wdymEkmydh1_QpxiuY74_IzO6meNGlkLSrOmmD-G5TC_Nr6PEwOh7-gOS2wgC0X3wxKZOw6iqkNiZllUQHHHYm1dGQmFMmjmJHCEt-3kADOHLsS8QdMI0gfDyChSc0PrUuoAjbwd03bHznQvPTRaaFY1AOSRZmwW8XW1RqsY2L4FWhrVHffQFFhkKD7T_n_zBPFIJ3VSGtdyT3HmdBPWCakuUG0QIprRn6smaPdzsfpbn',
      img2: '',
      img3: '',
    },
  }
};

function stoicoGetData() {
  try {
    const raw = localStorage.getItem('stoico_data');
    if (!raw) return JSON.parse(JSON.stringify(STOICO_DEFAULTS));
    const stored = JSON.parse(raw);
    // Deep merge: keep defaults for any missing keys
    const data = JSON.parse(JSON.stringify(STOICO_DEFAULTS));
    if (stored.waNumber !== undefined) data.waNumber = stored.waNumber;
    if (stored.heroImg !== undefined) data.heroImg = stored.heroImg;
    if (stored.sizeGuide) data.sizeGuide = stored.sizeGuide;
    if (stored.footer !== undefined) data.footer = stored.footer;
    if (stored.singleTemplate) data.singleTemplate = stored.singleTemplate;
    if (stored.bulkTemplate) data.bulkTemplate = stored.bulkTemplate;
    if (stored.products) {
      Object.keys(data.products).forEach(k => {
        if (stored.products[k]) Object.assign(data.products[k], stored.products[k]);
      });
    }
    return data;
  } catch (e) {
    return JSON.parse(JSON.stringify(STOICO_DEFAULTS));
  }
}

function stoicoSaveData(data) {
  localStorage.setItem('stoico_data', JSON.stringify(data));
}

function stoicoBuildSingleMsg(template, product, size) {
  return template
    .replace(/{producto}/g, product.name.replace('CAMISETA OVERSIZED ', '').replace(/"/g, ''))
    .replace(/{talla}/g, size || 'M')
    .replace(/{precio}/g, product.price);
}

function stoicoBuildBulkMsg(template, product) {
  return template
    .replace(/{producto}/g, product.name.replace('CAMISETA OVERSIZED ', '').replace(/"/g, ''))
    .replace(/{precio_unit}/g, product.price)
    .replace(/{tallas}/g, 'S, M, L, XL')
    .replace(/{cantidad}/g, '___');
}
