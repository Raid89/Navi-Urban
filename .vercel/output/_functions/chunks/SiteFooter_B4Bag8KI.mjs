import { n as createRenderInstruction, h as addAttribute, o as renderHead, p as renderSlot, r as renderTemplate, m as maybeRenderHead } from './entrypoint_CPTBTH47.mjs';
import { c as createComponent } from './astro-component_BlIEIJJi.mjs';
import 'piccolore';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(description, "content")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Archivo+Black&display=swap" rel="stylesheet"><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "D:/Desarrollos/Astro/navi-urban/src/components/layout/BaseLayout.astro", void 0);

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav> <div class="wrapper nav-inner"> <a href="/" class="logo">NAVI URBAN</a> <div class="links"> <a href="/#promociones">Promociones</a> <a href="/#catalogo">Catalogo</a> <a href="/#pdf">PDF</a> </div> </div> </nav>`;
}, "D:/Desarrollos/Astro/navi-urban/src/components/sections/Navbar.astro", void 0);

const $$SiteFooter = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="wrapper"> <p>NAVI URBAN 2026. Estilo urbano, comodidad real y tecnologia para cada paso.</p> </footer>`;
}, "D:/Desarrollos/Astro/navi-urban/src/components/sections/SiteFooter.astro", void 0);

export { $$BaseLayout as $, $$Navbar as a, $$SiteFooter as b, renderScript as r };
