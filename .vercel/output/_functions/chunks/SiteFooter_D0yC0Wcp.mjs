import { n as createRenderInstruction, m as maybeRenderHead, h as addAttribute, r as renderTemplate, o as renderHead, p as renderSlot, l as renderComponent } from './entrypoint_DJpBiLpZ.mjs';
import { c as createComponent } from './astro-component_M2H6Wz8D.mjs';
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

const $$WhatsAppButton = createComponent(($$result, $$props, $$slots) => {
  const whatsappNumber = "573204656149";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hola%20NAVI%20URBAN`;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" class="whatsapp-button" aria-label="Contactar por WhatsApp" title="Contactar por WhatsApp" data-astro-cid-iehx2mtc> <img src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" alt="WhatsApp" class="whatsapp-icon" data-astro-cid-iehx2mtc> </a>`;
}, "D:/Desarrollos/Astro/navi-urban/src/components/WhatsAppButton.astro", void 0);

const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" href="https://res.cloudinary.com/dzp3psldw/image/upload/abf7033a-6dbe-4526-bf8c-619f04547e00_preview_rev_1_hrwgie"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(description, "content")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Archivo+Black&display=swap" rel="stylesheet"><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "WhatsAppButton", $$WhatsAppButton, {})} </body></html>`;
}, "D:/Desarrollos/Astro/navi-urban/src/components/layout/BaseLayout.astro", void 0);

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav> <div class="wrapper nav-inner"> <a href="/" class="logo"> <img src="https://res.cloudinary.com/dzp3psldw/image/upload/copy_of_chatgpt_image_16_abr_2026_19_43_47_yzrb3g_a1405e" alt="NAVI URBAN Logo" width="100" height="100"> </a> <div class="links"> <a href="/#promociones">Promociones</a> <a href="/#catalogo">Catalogo</a> </div> </div> </nav>`;
}, "D:/Desarrollos/Astro/navi-urban/src/components/sections/Navbar.astro", void 0);

const $$SiteFooter = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="wrapper"> <p>NAVI URBAN 2026. Estilo urbano, comodidad real y tecnologia para cada paso.</p> </footer>`;
}, "D:/Desarrollos/Astro/navi-urban/src/components/sections/SiteFooter.astro", void 0);

export { $$BaseLayout as $, $$Navbar as a, $$SiteFooter as b, renderScript as r };
