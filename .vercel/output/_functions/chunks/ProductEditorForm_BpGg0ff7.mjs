import { c as createComponent } from './astro-component_M2H6Wz8D.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './entrypoint_DJpBiLpZ.mjs';
import 'clsx';
import { r as renderScript } from './SiteFooter_D0yC0Wcp.mjs';

const $$ProductEditorForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProductEditorForm;
  const { product = null, title, subtitle, submitLabel, cancelHref } = Astro2.props;
  const initialImages = JSON.stringify(product?.images ?? []);
  const initialSizes = JSON.stringify(product?.sizes ?? []);
  return renderTemplate`${maybeRenderHead()}<article class="editor-card" data-astro-cid-itdnwh4i> <div class="editor-head" data-astro-cid-itdnwh4i> <div data-astro-cid-itdnwh4i> <p class="eyebrow" data-astro-cid-itdnwh4i>${subtitle}</p> <h1 data-astro-cid-itdnwh4i>${title}</h1> </div> <a class="btn btn-ghost"${addAttribute(cancelHref, "href")} data-astro-cid-itdnwh4i>Volver</a> </div> <form id="productForm" method="post" action="/api/admin/products" class="editor-form" data-astro-cid-itdnwh4i> <input type="hidden" name="id"${addAttribute(product?.id || "", "value")} data-astro-cid-itdnwh4i> <input type="hidden" id="productImagesJson" name="imagesJson"${addAttribute(initialImages, "value")} data-astro-cid-itdnwh4i> <input type="hidden" id="sizesJson" name="sizesJson"${addAttribute(initialSizes, "value")} data-astro-cid-itdnwh4i> <label data-astro-cid-itdnwh4i>
Nombre del producto
<input name="name"${addAttribute(product?.name || "", "value")} placeholder="NAVI Sprint 01" required data-astro-cid-itdnwh4i> </label> <div class="two-cols" data-astro-cid-itdnwh4i> <label data-astro-cid-itdnwh4i>
Categoria
<input name="category"${addAttribute(product?.category || "", "value")} placeholder="Running" required data-astro-cid-itdnwh4i> </label> <label data-astro-cid-itdnwh4i>
Tag
<input name="tag"${addAttribute(product?.tag || "", "value")} placeholder="Nuevo" required data-astro-cid-itdnwh4i> </label> </div> <label data-astro-cid-itdnwh4i>
Descripcion
<textarea name="description" rows="4" required data-astro-cid-itdnwh4i>${product?.description || ""}</textarea> </label> <div class="two-cols" data-astro-cid-itdnwh4i> <label data-astro-cid-itdnwh4i>
Precio
<input name="price" type="number" min="0" step="1"${addAttribute(product?.price || 0, "value")} required data-astro-cid-itdnwh4i> </label> <div class="switches" data-astro-cid-itdnwh4i> <label class="switch" data-astro-cid-itdnwh4i><input name="isPromotion" type="checkbox"${addAttribute(product?.isPromotion, "checked")} data-astro-cid-itdnwh4i> En promocion</label> <label class="switch" data-astro-cid-itdnwh4i><input name="visible" type="checkbox"${addAttribute(product?.visible ?? true, "checked")} data-astro-cid-itdnwh4i> Visible</label> </div> </div> <section class="subsection" data-astro-cid-itdnwh4i> <div class="subsection-head" data-astro-cid-itdnwh4i> <h2 data-astro-cid-itdnwh4i>Tallas</h2> <p data-astro-cid-itdnwh4i>Gestiona disponibilidad sin escribir JSON.</p> </div> <div id="sizesBoard" class="sizes-board" data-astro-cid-itdnwh4i></div> <div class="size-adder" data-astro-cid-itdnwh4i> <input id="newSizeInput" placeholder="Nueva talla (ej. 28)" data-astro-cid-itdnwh4i> <button type="button" class="btn btn-ghost" id="addSizeButton" data-astro-cid-itdnwh4i>Agregar talla</button> </div> </section> <section class="subsection" data-astro-cid-itdnwh4i> <div class="subsection-head" data-astro-cid-itdnwh4i> <h2 data-astro-cid-itdnwh4i>Imagenes</h2> <p data-astro-cid-itdnwh4i>Sube imagenes a Cloudinary y revisa la previsualizacion.</p> </div> <div class="upload-actions" data-astro-cid-itdnwh4i> <input id="productImageInput" type="file" accept="image/*" multiple data-astro-cid-itdnwh4i> <button class="btn btn-ghost" type="button" id="uploadProductImages" data-astro-cid-itdnwh4i>Subir imagenes</button> </div> <p id="uploadStatus" class="request-status" aria-live="polite" data-astro-cid-itdnwh4i></p> <div id="productImagesPreview" class="image-preview-grid" data-astro-cid-itdnwh4i></div> </section> <button class="btn btn-main" type="submit" id="productSubmitButton"${addAttribute(submitLabel, "data-default-label")} data-astro-cid-itdnwh4i>${submitLabel}</button> </form> </article> ${renderScript($$result, "D:/Desarrollos/Astro/navi-urban/src/components/admin/ProductEditorForm.astro?astro&type=script&index=0&lang.ts")} `;
}, "D:/Desarrollos/Astro/navi-urban/src/components/admin/ProductEditorForm.astro", void 0);

export { $$ProductEditorForm as $ };
