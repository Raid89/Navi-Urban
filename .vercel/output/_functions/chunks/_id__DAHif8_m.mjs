import { c as createComponent } from './astro-component_M2H6Wz8D.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_DJpBiLpZ.mjs';
import { $ as $$BaseLayout, r as renderScript, a as $$Navbar, b as $$SiteFooter } from './SiteFooter_D0yC0Wcp.mjs';
import { a as getProductById, g as getProductImageUrl } from './catalog_CxFMU3QK.mjs';

const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const productId = Astro2.params.id;
  let product = null;
  try {
    product = productId ? await getProductById(productId) : null;
  } catch (error) {
    console.error(`Failed to load product ${productId ?? "unknown"}.`, error);
    throw new Response("Servicio temporalmente no disponible", { status: 503 });
  }
  if (!product) {
    throw new Response("Producto no encontrado", { status: 404 });
  }
  const formatPrice = (price, currency) => new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(price);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${product.name} | NAVI URBAN`, "description": `${product.name} en NAVI URBAN. Revisa imagenes, tallas disponibles y detalles del producto.` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="wrapper product-detail-page"> <a href="/#catalogo" class="back-link">Volver al catalogo</a> <section class="product-detail-grid"> <div class="product-gallery"> <div class="product-main-image"> <img id="productMainImage"${addAttribute(getProductImageUrl(product.images[0]), "src")}${addAttribute(`Imagen principal de ${product.name}`, "alt")} loading="eager"> </div> <div class="product-thumbs"> ${product.images.map((image, index) => renderTemplate`<button type="button"${addAttribute(`product-thumb product-thumb-btn ${index === 0 ? "is-active" : ""}`, "class")}${addAttribute(getProductImageUrl(image), "data-thumb-src")}${addAttribute(`Vista ${index + 1} de ${product.name}`, "data-thumb-alt")}${addAttribute(`Ver imagen ${index + 1} de ${product.name}`, "aria-label")}> <img${addAttribute(getProductImageUrl(image), "src")}${addAttribute(`Vista ${index + 1} de ${product.name}`, "alt")} loading="lazy"> </button>`)} </div> </div> <article class="product-detail-card"> <span class="badge">${product.tag}</span> <h1>${product.name}</h1> <p class="product-meta"> ${product.category} · ${product.isPromotion ? "En promocion" : "Precio regular"} </p> <p>${product.description}</p> <p class="price product-detail-price">${formatPrice(product.price, product.currency)}</p> <h2>Tallas</h2> <div class="sizes-grid"> ${product.sizes.map((sizeOption) => renderTemplate`<div${addAttribute(`size-pill ${sizeOption.available ? "available" : "unavailable"}`, "class")}> <span>Talla ${sizeOption.size}</span> <strong>${sizeOption.available ? "Disponible" : "Agotada"}</strong> </div>`)} </div> <a${addAttribute(`https://wa.me/573204656149?text=Hola%20NAVI%20URBAN%2C%20me%20interesa%20${encodeURIComponent(product.name)}%20en%20%24${product.price}`, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-buy-now">
Comprar por WhatsApp
</a> </article> </section> </main> ${renderComponent($$result2, "SiteFooter", $$SiteFooter, {})} ` })} ${renderScript($$result, "D:/Desarrollos/Astro/navi-urban/src/pages/productos/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Desarrollos/Astro/navi-urban/src/pages/productos/[id].astro", void 0);

const $$file = "D:/Desarrollos/Astro/navi-urban/src/pages/productos/[id].astro";
const $$url = "/productos/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
