import { c as createComponent } from './astro-component_BlIEIJJi.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_CPTBTH47.mjs';
import { $ as $$BaseLayout, a as $$Navbar, b as $$SiteFooter, r as renderScript } from './SiteFooter_B4Bag8KI.mjs';
import { g as getProductImageUrl } from './catalog_3LWwJCBV.mjs';
import { g as getAuthenticatedAdmin } from './adminSession_CoPYRdow.mjs';
import { b as getAllProducts, c as getPromotions } from './cms_BhVNdxc6.mjs';

const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Admin;
  const auth = await getAuthenticatedAdmin(Astro2.cookies);
  const loginError = Astro2.url.searchParams.get("error");
  const viewParam = Astro2.url.searchParams.get("view");
  const activeView = viewParam === "promotions" ? "promotions" : "products";
  const [products, promotions] = auth ? await Promise.all([getAllProducts(), getPromotions()]) : [[], []];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "NAVI URBAN Admin", "description": "Panel de administracion para productos y promociones de NAVI URBAN.", "data-astro-cid-2zp6q64z": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "data-astro-cid-2zp6q64z": true })} ${maybeRenderHead()}<main class="wrapper admin-page" data-astro-cid-2zp6q64z> ${auth ? renderTemplate`<section class="admin-shell reveal" data-astro-cid-2zp6q64z> <header class="admin-header" data-astro-cid-2zp6q64z> <div data-astro-cid-2zp6q64z> <p class="eyebrow" data-astro-cid-2zp6q64z>CMS privado</p> <h1 data-astro-cid-2zp6q64z>Panel principal</h1> <p data-astro-cid-2zp6q64z>Visualiza un listado a la vez y entra a paginas separadas para crear o editar.</p> </div> <form method="post" action="/api/admin/logout" data-astro-cid-2zp6q64z> <button class="btn btn-ghost" type="submit" data-astro-cid-2zp6q64z>Cerrar sesion</button> </form> </header> <section class="switch-bar" data-astro-cid-2zp6q64z> <a${addAttribute(`switch-btn ${activeView === "products" ? "active" : ""}`, "class")} href="/admin?view=products" data-astro-cid-2zp6q64z>
Productos (${products.length})
</a> <a${addAttribute(`switch-btn ${activeView === "promotions" ? "active" : ""}`, "class")} href="/admin?view=promotions" data-astro-cid-2zp6q64z>
Promociones (${promotions.length})
</a> </section> ${activeView === "products" ? renderTemplate`<section class="list-card" data-astro-cid-2zp6q64z> <div class="list-head" data-astro-cid-2zp6q64z> <div data-astro-cid-2zp6q64z> <p class="eyebrow" data-astro-cid-2zp6q64z>Productos</p> <h2 data-astro-cid-2zp6q64z>Listado de productos</h2> </div> <a class="btn btn-main" href="/admin/products/new" data-astro-cid-2zp6q64z>Crear nuevo producto</a> </div> <label class="filter-label" data-astro-cid-2zp6q64z>
Buscar producto
<input id="productSearch" placeholder="Buscar por nombre o categoria" data-astro-cid-2zp6q64z> </label> <div class="table-wrapper" data-astro-cid-2zp6q64z> <table id="productsTable" class="products-table" data-astro-cid-2zp6q64z> <thead data-astro-cid-2zp6q64z> <tr data-astro-cid-2zp6q64z> <th data-astro-cid-2zp6q64z>Producto</th> <th data-astro-cid-2zp6q64z>Categoria</th> <th data-astro-cid-2zp6q64z>Precio</th> <th data-astro-cid-2zp6q64z>Estado</th> <th data-astro-cid-2zp6q64z>Acciones</th> </tr> </thead> <tbody data-astro-cid-2zp6q64z> ${products.map((product) => renderTemplate`<tr data-astro-cid-2zp6q64z> <td data-astro-cid-2zp6q64z> <div class="product-cell" data-astro-cid-2zp6q64z> <img${addAttribute(getProductImageUrl(product.images[0]), "src")}${addAttribute(product.name, "alt")} data-astro-cid-2zp6q64z> <div data-astro-cid-2zp6q64z> <strong data-astro-cid-2zp6q64z>${product.name}</strong> <small data-astro-cid-2zp6q64z>${product.tag}</small> </div> </div> </td> <td data-astro-cid-2zp6q64z>${product.category}</td> <td data-astro-cid-2zp6q64z>$${product.price} MXN</td> <td data-astro-cid-2zp6q64z> <span${addAttribute(`status-pill ${product.visible ? "ok" : "off"}`, "class")} data-astro-cid-2zp6q64z>${product.visible ? "Visible" : "Oculto"}</span> </td> <td data-astro-cid-2zp6q64z> <div class="record-actions" data-astro-cid-2zp6q64z> <a class="btn btn-ghost"${addAttribute(`/admin/products/${product.id}/edit`, "href")} data-astro-cid-2zp6q64z>Editar</a> <button class="btn btn-ghost danger" type="button"${addAttribute(product.id, "data-delete-product")} data-astro-cid-2zp6q64z>Eliminar</button> </div> </td> </tr>`)} </tbody> </table> </div> </section>` : renderTemplate`<section class="list-card" data-astro-cid-2zp6q64z> <div class="list-head" data-astro-cid-2zp6q64z> <div data-astro-cid-2zp6q64z> <p class="eyebrow" data-astro-cid-2zp6q64z>Promociones</p> <h2 data-astro-cid-2zp6q64z>Listado de promociones</h2> </div> <a class="btn btn-main" href="/admin/promotions/new" data-astro-cid-2zp6q64z>Crear nueva promocion</a> </div> <div class="promotions-list" data-astro-cid-2zp6q64z> ${promotions.map((promotion) => renderTemplate`<article class="promotion-item" data-astro-cid-2zp6q64z> <div data-astro-cid-2zp6q64z> <strong data-astro-cid-2zp6q64z>${promotion.title}</strong> <p data-astro-cid-2zp6q64z>${promotion.description}</p> <small data-astro-cid-2zp6q64z>${promotion.redirect}</small> </div> <div class="record-actions" data-astro-cid-2zp6q64z> <a class="btn btn-ghost"${addAttribute(`/admin/promotions/${promotion.id}/edit`, "href")} data-astro-cid-2zp6q64z>Editar</a> <button class="btn btn-ghost danger" type="button"${addAttribute(promotion.id, "data-delete-promotion")} data-astro-cid-2zp6q64z>Eliminar</button> </div> </article>`)} </div> </section>`} </section>` : renderTemplate`<section class="login-shell reveal" data-astro-cid-2zp6q64z> <div class="login-card" data-astro-cid-2zp6q64z> <p class="eyebrow" data-astro-cid-2zp6q64z>Acceso privado</p> <h1 data-astro-cid-2zp6q64z>Admin CMS</h1> <p data-astro-cid-2zp6q64z>Ingresa con tu usuario y contrasena para administrar productos y promociones.</p> ${loginError ? renderTemplate`<p class="error-box" data-astro-cid-2zp6q64z>Credenciales invalidas o sesion no valida.</p>` : null} <form method="post" action="/api/admin/login" class="login-form" data-astro-cid-2zp6q64z> <label data-astro-cid-2zp6q64z>
Usuario
<input name="username" autocomplete="username" required data-astro-cid-2zp6q64z> </label> <label data-astro-cid-2zp6q64z>
Contrasena
<input name="password" type="password" autocomplete="current-password" required data-astro-cid-2zp6q64z> </label> <button class="btn btn-main" type="submit" data-astro-cid-2zp6q64z>Entrar</button> </form> </div> </section>`} </main> ${renderComponent($$result2, "SiteFooter", $$SiteFooter, { "data-astro-cid-2zp6q64z": true })} ${renderScript($$result2, "D:/Desarrollos/Astro/navi-urban/src/pages/admin.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "D:/Desarrollos/Astro/navi-urban/src/pages/admin.astro", void 0);

const $$file = "D:/Desarrollos/Astro/navi-urban/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
