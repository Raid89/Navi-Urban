import { c as createComponent } from './astro-component_BlIEIJJi.mjs';
import 'piccolore';
import { m as maybeRenderHead, r as renderTemplate, h as addAttribute, l as renderComponent } from './entrypoint_CPTBTH47.mjs';
import { r as renderScript, $ as $$BaseLayout, a as $$Navbar, b as $$SiteFooter } from './SiteFooter_B4Bag8KI.mjs';
import 'clsx';
import { g as getProductImageUrl, b as getPromotions, c as getVisibleProducts } from './catalog_3LWwJCBV.mjs';

const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="inicio" class="hero wrapper"> <div class="reveal"> <h1>NAVI URBAN<br>ZAPATOS QUE SE MUEVEN CONTIGO</h1> <p>
Descubre la nueva coleccion de zapatos urbanos y deportivos. Explora promociones activas,
      filtra por precio y revisa el catalogo completo desde la web o en PDF.
</p> <div class="hero-cta"> <a href="#catalogo" class="btn btn-main">Ver Catalogo</a> <a href="#pdf" class="btn btn-ghost">Abrir PDF</a> </div> </div> <aside class="hero-panel reveal stagger-1"> <h2>Semana Urban Drop</h2> <p>
Hasta 30% en modelos seleccionados. Compra online y recibe envio gratis en pedidos mayores a
      $1,200 MXN.
</p> </aside> </section>`;
}, "D:/Desarrollos/Astro/navi-urban/src/components/sections/HeroSection.astro", void 0);

const $$PromotionsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PromotionsSection;
  const { promotions } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section id="promociones" class="wrapper"> <div class="section-title reveal"> <h3>Promociones Activas</h3> <p>Ofertas por tiempo limitado</p> </div> <div class="promos"> ${promotions.map((promotion, index) => renderTemplate`<article${addAttribute(`promo-card reveal stagger-${Math.min(index + 1, 3)}`, "class")}> <strong>Promo</strong> <h4>${promotion.title}</h4> <p>${promotion.description}</p> <a${addAttribute(promotion.redirect, "href")} class="promo-link">Ver detalles</a> </article>`)} </div> </section>`;
}, "D:/Desarrollos/Astro/navi-urban/src/components/sections/PromotionsSection.astro", void 0);

const $$CatalogSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CatalogSection;
  const { products } = Astro2.props;
  const visibleProducts = products.filter((product) => product.visible);
  const categories = [...new Set(visibleProducts.map((product) => product.category))];
  const formatPrice = (price, currency) => new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(price);
  return renderTemplate`${maybeRenderHead()}<section id="catalogo" class="wrapper"> <div class="section-title reveal"> <h3>Catalogo de Zapatos</h3> <p>Busca por modelo y filtra por precio</p> </div> <div class="catalog-controls reveal" aria-label="Controles del catalogo"> <input type="search" id="searchInput" placeholder="Buscar modelo..." aria-label="Buscar modelo"> <select id="categoryFilter" aria-label="Filtrar por categoria"> <option value="">Todas las categorias</option> ${categories.map((category) => renderTemplate`<option${addAttribute(category, "value")}>${category}</option>`)} </select> <input type="number" id="minPrice" min="0" step="50" placeholder="Precio min" aria-label="Precio minimo"> <input type="number" id="maxPrice" min="0" step="50" placeholder="Precio max" aria-label="Precio maximo"> </div> <div id="productsGrid" class="products-grid" aria-live="polite"> ${visibleProducts.map((product) => renderTemplate`<a class="product-card product-card-link reveal"${addAttribute(`/productos/${product.id}`, "href")}${addAttribute(product.name.toLowerCase(), "data-name")}${addAttribute(product.category, "data-category")}${addAttribute(product.price, "data-price")}> <div class="shoe-preview" role="img"${addAttribute(`Vista previa de ${product.name}`, "aria-label")}> <img${addAttribute(getProductImageUrl(product.images[0]), "src")}${addAttribute(product.name, "alt")} class="shoe-preview-image" loading="lazy"> </div> <div class="row"> <strong>${product.name}</strong> <span class="badge">${product.tag}</span> </div> <p class="product-description">${product.description}</p> <div class="row"> <span>${product.category}</span> ${product.isPromotion ? renderTemplate`<span class="badge promo-tag">Promocion</span>` : renderTemplate`<span></span>`} </div> <div class="price">${formatPrice(product.price, product.currency)}</div> <span class="card-action">Ver detalle</span> </a>`)} </div> </section> ${renderScript($$result, "D:/Desarrollos/Astro/navi-urban/src/components/sections/CatalogSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Desarrollos/Astro/navi-urban/src/components/sections/CatalogSection.astro", void 0);

const $$PdfCatalogSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="pdf" class="wrapper catalog-actions"> <article class="catalog-box reveal"> <h3>Ver Catalogo en la Pagina</h3> <p>Consulta el PDF directamente sin salir del sitio.</p> <iframe title="Catalogo NAVI URBAN PDF" src="/catalogo-navi-urban.pdf" class="catalog-pdf"></iframe> </article> <article class="catalog-box reveal stagger-1"> <h3>Descargar Catalogo PDF</h3> <p>Ideal para compartirlo en WhatsApp, correo o mostrarlo offline.</p> <a class="btn btn-main" href="/catalogo-navi-urban.pdf" download>
Descargar PDF
</a> </article> </section>`;
}, "D:/Desarrollos/Astro/navi-urban/src/components/sections/PdfCatalogSection.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const [promotions, products] = await Promise.all([getPromotions(), getVisibleProducts()]);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "NAVI URBAN | Zapatos Urbanos", "description": "NAVI URBAN: landing oficial de zapatos con promociones, catalogo interactivo y descarga de PDF." }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${renderComponent($$result2, "HeroSection", $$HeroSection, {})} ${renderComponent($$result2, "PromotionsSection", $$PromotionsSection, { "promotions": promotions })} ${renderComponent($$result2, "CatalogSection", $$CatalogSection, { "products": products })} ${renderComponent($$result2, "PdfCatalogSection", $$PdfCatalogSection, {})} ${renderComponent($$result2, "SiteFooter", $$SiteFooter, {})} ` })}`;
}, "D:/Desarrollos/Astro/navi-urban/src/pages/index.astro", void 0);

const $$file = "D:/Desarrollos/Astro/navi-urban/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
