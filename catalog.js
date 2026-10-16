(function (root) {
  function el(tag, props, kids) {
    const node = document.createElement(tag);
    if (props) {
      for (const [key, value] of Object.entries(props)) {
        if (value == null || value === false) continue;
        if (key === "class") node.className = value;
        else if (key === "text") node.textContent = value;
        else node.setAttribute(key, value === true ? "" : String(value));
      }
    }
    for (const kid of kids || []) {
      if (kid == null || kid === false) continue;
      node.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return node;
  }

  function applyVars(node, project) {
    const site = project.site;
    node.style.setProperty("--paper", site.paper);
    node.style.setProperty("--ink", site.ink);
    node.style.setProperty("--accent", site.accent);
    node.style.setProperty("--card", site.cardPaper || "#f6f1ea");
    node.style.setProperty("--card-ratio", String(site.ratio || 0.75));
    const frameWidth = Number(site.frameWidth);
    node.style.setProperty("--frame", (Number.isFinite(frameWidth) ? Math.min(48, Math.max(0, frameWidth)) : 12) + "px");
  }

  function fieldLine(item, fields) {
    return (fields || [])
      .map((field) => String(item.fields?.[field.name] ?? "").trim())
      .filter(Boolean)
      .join("  ·  ");
  }

  function rectsOverlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function regionOpacity(region) {
    if (region.opacity == null || region.opacity === "") return region.hidden ? 0 : 100;
    const n = Number(region.opacity);
    if (!Number.isFinite(n)) return region.hidden ? 0 : 100;
    return Math.min(100, Math.max(0, n));
  }

  function cssColor(value, fallback) {
    const text = String(value || "").trim();
    return /^#[0-9a-fA-F]{6}$/.test(text) ? text : fallback;
  }

  const TYPEFACES = {
    sans: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
    serif: '"Noto Serif SC", "Songti SC", "SimSun", serif',
    xiaowei: '"ZCOOL XiaoWei", "Songti SC", serif',
    huangyou: '"ZCOOL QingKe HuangYou", "Noto Sans SC", sans-serif',
    kuaile: '"ZCOOL KuaiLe", "Noto Sans SC", sans-serif',
    mashan: '"Ma Shan Zheng", "KaiTi", cursive',
    longcang: '"Long Cang", "KaiTi", cursive'
  };
  const TYPE_DEFAULT = { brand: "sans", hero: "xiaowei", lead: "sans", title: "xiaowei", fields: "sans", body: "sans", back: "sans" };

  function paintRegion(node, region) {
    const opacity = regionOpacity(region);
    node.style.opacity = String(opacity / 100);
    node.classList.toggle("is-off", opacity <= 0);
    if (region.fillOn && region.fill) node.style.background = cssColor(region.fill, "#ffffff");
    else node.style.background = "";
    if (region.stroke) node.style.border = "2px solid " + cssColor(region.strokeColor, "#1b2430");
    else node.style.border = "";
    if (region.shadow) {
      const size = Math.min(40, Math.max(0, Number(region.shadowSize) || 0));
      node.style.boxShadow = "0 " + Math.max(1, Math.round(size / 5)) + "px " + size + "px rgba(20, 28, 36, 0.22)";
    } else node.style.boxShadow = "";
    const face = TYPEFACES[region.font] || TYPEFACES[TYPE_DEFAULT[region.id]];
    if (face) node.style.fontFamily = face;
    const size = Number(region.fontSize);
    if (Number.isFinite(size) && size >= 8) node.style.fontSize = Math.min(96, Math.round(size)) + "px";
    else node.style.fontSize = "";
    if (region.align === "left" || region.align === "center" || region.align === "right") {
      node.style.textAlign = region.align;
      node.classList.toggle("align-center", region.align === "center");
      node.classList.toggle("align-right", region.align === "right");
      if (node.classList.contains("region")) {
        node.style.justifyContent = region.align === "center" ? "center" : region.align === "right" ? "flex-end" : "flex-start";
      }
    }
  }

  function frameImage(img, focus) {
    const x = Number(focus && focus.x);
    const y = Number(focus && focus.y);
    const scale = Number(focus && focus.scale);
    const fx = Number.isFinite(x) ? Math.min(100, Math.max(0, x)) : 50;
    const fy = Number.isFinite(y) ? Math.min(100, Math.max(0, y)) : 50;
    const fs = Number.isFinite(scale) ? Math.min(3, Math.max(1, scale)) : 1;
    const extra = focus && focus.blur ? 1.14 : 1;
    const drawn = fs * extra;
    img.style.objectPosition = fx + "% " + fy + "%";
    img.style.transformOrigin = fx + "% " + fy + "%";
    img.style.transform = drawn > 1.001 ? "scale(" + drawn + ")" : "";
    img.style.filter = focus && focus.blur ? "blur(18px)" : "";
  }

  function applyPageSkin(head, project, resolve) {
    const site = project.site || {};
    const radius = Math.min(48, Math.max(0, Number(site.radius) || 0));
    head.style.borderRadius = radius ? radius + "px" : "";
    const src = site.bg && resolve ? resolve(site.bg) : "";
    let wash = head.querySelector(":scope > .page-bg");
    if (!src) {
      if (wash) wash.remove();
      head.style.overflow = radius ? "hidden" : "";
      return;
    }
    if (!wash) wash = el("div", { class: "page-bg" });
    head.append(wash);
    const fade = Number(site.bgOpacity);
    wash.style.opacity = String((Number.isFinite(fade) ? Math.min(100, Math.max(0, fade)) : 100) / 100);
    wash.classList.toggle("is-dark", site.veil === "dark");
    wash.classList.toggle("is-blur", site.veil === "blur");
    let img = wash.querySelector("img");
    if (!img) {
      img = el("img", { alt: "" });
      wash.append(img);
    }
    if (img.getAttribute("src") !== src) img.setAttribute("src", src);
    frameImage(img, {
      x: site.bgFocusX,
      y: site.bgFocusY,
      scale: site.bgFocusScale,
      blur: site.veil === "blur"
    });
    head.style.overflow = "hidden";
  }

  function overlapsImage(region, layout) {
    if (region.id === "image" || regionOpacity(region) <= 0) return false;
    const image = layout.regions.find((item) => item.id === "image" && regionOpacity(item) > 0);
    return !!image && rectsOverlap(region, image);
  }

  function pictures(item) {
    const list = [];
    if (item.cover) list.push(item.cover);
    for (const name of item.gallery || []) {
      if (name && !list.includes(name)) list.push(name);
    }
    return list;
  }

  function isExtra(id) {
    return id === "extra1" || id === "extra2" || id === "extra3";
  }

  function cardRegions(project, layout) {
    const extras = (project.site && project.site.extras) || {};
    return (layout.regions || []).filter((region) => !isExtra(region.id) || extras[region.id]);
  }

  function paintFrame(node, project, resolve) {
    if (!project.site || project.site.frame !== "custom") return;
    const src = project.site.frameImage && resolve ? resolve(project.site.frameImage) : "";
    if (!src) return;
    node.style.backgroundImage = "url(\"" + String(src).replace(/"/g, "") + "\")";
    node.style.backgroundSize = "cover";
    node.style.backgroundPosition = "center";
  }

  function pageSlice(project, items, opts) {
    if (!project.site || project.site.flow !== "page") return { slice: items, page: 0, pages: 1 };
    const size = Math.min(24, Math.max(1, Number(project.site.perPage) || 6));
    const pages = Math.max(1, Math.ceil(items.length / size));
    const page = Math.min(Math.max(0, Number(opts.page) || 0), pages - 1);
    opts.page = page;
    return { slice: items.slice(page * size, page * size + size), page: page, pages: pages };
  }

  function makePager(paging, opts) {
    const bar = el("nav", { class: "pager", "aria-label": "翻页" });
    const prev = el("button", { type: "button", text: "上一页" });
    const next = el("button", { type: "button", text: "下一页" });
    prev.disabled = paging.page <= 0;
    next.disabled = paging.page >= paging.pages - 1;
    prev.addEventListener("click", () => {
      opts.page = paging.page - 1;
      opts.onPage && opts.onPage();
    });
    next.addEventListener("click", () => {
      opts.page = paging.page + 1;
      opts.onPage && opts.onPage();
    });
    bar.append(prev, el("span", { text: (paging.page + 1) + " / " + paging.pages }), next);
    return bar;
  }

  function imageFocus(item, region, opts) {
    const personal = !(opts && opts.sharedFocus) && item && !item.layout && item.imageFocus;
    const x = Number(personal ? item.imageFocus.x : region && region.focusX);
    const y = Number(personal ? item.imageFocus.y : region && region.focusY);
    const scale = Number(personal ? item.imageFocus.scale : region && region.focusScale);
    return {
      x: Number.isFinite(x) ? Math.min(100, Math.max(0, x)) : 50,
      y: Number.isFinite(y) ? Math.min(100, Math.max(0, y)) : 50,
      scale: Number.isFinite(scale) ? Math.min(3, Math.max(1, scale)) : 1
    };
  }

  function buildCard(item, project, resolve, layout, opts) {
    opts = opts || {};
    const used = layout || item.layout || project.site.layout;
    const frame = el("article", {
      class: "card shape-" + (project.site.shape || "portrait") + " frame-" + project.site.frame
    });
    applyVars(frame, project);
    const plate = el("div", { class: "plate" + (opts.edit ? " editing" : "") });
    if (project.site.cardWash) {
      const src = resolve(item.cover || (item.gallery || [])[0] || "");
      if (src) {
        const wash = el("div", { class: "plate-wash" });
        wash.append(el("img", { src: src, alt: "" }));
        plate.append(wash);
      }
    }
    paintFrame(frame, project, resolve);
    for (const region of cardRegions(project, used)) {
      const box = el("div", {
        class: "region region-" + region.id + (overlapsImage(region, used) ? " on-image" : ""),
        "data-region": region.id,
        style: "left:" + region.x + "%;top:" + region.y + "%;width:" + region.w + "%;height:" + region.h + "%;z-index:" + (region.z || 1)
      });
      paintRegion(box, region);
      if (region.id === "image") {
        const src = resolve(item.cover || (item.gallery || [])[0] || "");
        if (src) {
          const img = el("img", { src: src, alt: "" });
          const focus = imageFocus(item, region, opts);
          img.style.objectPosition = focus.x + "% " + focus.y + "%";
          img.style.transformOrigin = focus.x + "% " + focus.y + "%";
          if (focus.scale > 1.001) img.style.transform = "scale(" + focus.scale + ")";
          box.append(img);
        } else {
          box.append(el("div", { class: "ph", "aria-hidden": "true" }));
        }
      } else if (region.id === "title") {
        box.textContent = item.title || "未命名";
      } else if (region.id === "fields") {
        box.textContent = fieldLine(item, project.fields);
      } else if (isExtra(region.id)) {
        const text = String((item.notes && item.notes[region.id]) || "").trim();
        if (!text && !opts.edit) continue;
        box.textContent = text || (opts.edit && typeof StudioLang !== "undefined" ? StudioLang.t("note.placeholder") : "填写附注");
        if (!text) box.classList.add("is-placeholder");
      } else {
        box.textContent = item.body || "";
      }
      plate.append(box);
    }
    frame.append(plate);
    if (opts.link === false) return frame;
    const open = opts.onOpen;
    const link = el(open ? "button" : "a", {
      class: "card-link",
      type: open ? "button" : null,
      href: open ? null : "#/item/" + encodeURIComponent(item.id),
      "aria-label": item.title || "未命名"
    });
    if (open) link.addEventListener("click", () => open(item.id));
    link.append(frame);
    return link;
  }

  function compareValues(a, b) {
    const left = String(a ?? "").trim();
    const right = String(b ?? "").trim();
    if (/^-?\d+(\.\d+)?$/.test(left) && /^-?\d+(\.\d+)?$/.test(right)) {
      return Number(left) - Number(right);
    }
    return left.localeCompare(right, "zh");
  }

  function orderedItems(project, items) {
    const field = project.site.orderField;
    return items.map((item, index) => ({ item, index })).sort((a, b) => {
      const diff = compareValues(a.item.fields?.[field], b.item.fields?.[field]);
      return diff || a.index - b.index;
    }).map((entry) => entry.item);
  }

  function groupedItems(project, items) {
    const field = project.site.groupField;
    if (!field) return [["全部", items.slice()]];
    const groups = new Map();
    for (const item of items) {
      const name = String(item.fields?.[field] ?? "").trim() || "未分组";
      if (!groups.has(name)) groups.set(name, []);
      groups.get(name).push(item);
    }
    return [...groups.entries()];
  }

  function cardOpts(opts) {
    return {
      onOpen: opts.isolate
        ? (id) => opts.onNavigate && opts.onNavigate(id)
        : null
    };
  }

  function defaultPageRegions() {
    return [
      { id: "brand", x: 0, y: 2, w: 30, h: 8, z: 2, align: "left" },
      { id: "hero", x: 6, y: 16, w: 88, h: 32, z: 3, align: "center" },
      { id: "lead", x: 14, y: 50, w: 72, h: 10, z: 3, align: "center" },
      { id: "tools", x: 12, y: 64, w: 76, h: 14, z: 4, align: "center" },
      { id: "visual", x: 78, y: 2, w: 20, h: 12, z: 1, align: "left", opacity: 0 }
    ];
  }

  function pageRegions(project) {
    const raw = project.site.page && project.site.page.regions;
    const defaults = defaultPageRegions();
    const list = Array.isArray(raw) ? raw.map((region) => (
      region && region.id === "heading" ? Object.assign({}, region, { id: "hero" }) : region
    )) : [];
    return defaults.map((fallback) => list.find((region) => region && region.id === fallback.id) || fallback);
  }

  function coverSrc(project, resolve) {
    const site = project.site || {};
    if (site.visualSource === "custom" && site.visualImage) {
      const custom = resolve ? resolve(site.visualImage) : site.visualImage;
      if (custom) return custom;
    }
    const item = (project.items || []).find((entry) => entry.cover || (entry.gallery && entry.gallery[0]));
    if (!item) return "";
    const name = item.cover || item.gallery[0];
    return resolve ? resolve(name) : name;
  }

  function sanitizeCss(value) {
    return String(value || "")
      .replace(/\u0000/g, "")
      .replace(/<\/style/gi, "")
      .replace(/@import[\s\S]*?;/gi, "")
      .replace(/expression\s*\(/gi, "(")
      .replace(/javascript\s*:/gi, "")
      .replace(/-moz-binding\s*:/gi, "")
      .replace(/behavior\s*:/gi, "")
      .slice(0, 12000);
  }

  function prefixSelector(selector, scope) {
    return selector.split(",").map((part) => {
      const sel = part.trim();
      if (!sel) return "";
      if (/^(from|to|\d+(\.\d+)?%)$/i.test(sel)) return sel;
      if (/^(html|body|:root|\.studio|\.topbar|\.panel|\.work|#studio|#panel|#stage)\b/i.test(sel)) return scope;
      if (sel === scope || sel.startsWith(scope + " ") || sel.startsWith(scope + ">") || sel.startsWith(scope + ":") || sel.startsWith(scope + ".")) return sel;
      return scope + " " + sel;
    }).filter(Boolean).join(",");
  }

  function scopeCss(css, scope) {
    const src = sanitizeCss(css).replace(/\/\*[\s\S]*?\*\//g, "");
    let i = 0;
    function takeRaw() {
      let depth = 1;
      const start = i;
      while (i < src.length && depth > 0) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}") depth--;
        if (depth > 0) i++;
      }
      const body = src.slice(start, i);
      if (src[i] === "}") i++;
      return body;
    }
    function parseList() {
      let out = "";
      while (i < src.length) {
        if (src[i] === "}") return out;
        if (src[i] === "@") {
          const start = i;
          while (i < src.length && src[i] !== "{" && src[i] !== ";") i++;
          const head = src.slice(start, i).trim();
          if (src[i] === ";") {
            i++;
            continue;
          }
          if (src[i] !== "{") break;
          i++;
          const lower = head.toLowerCase();
          if (lower.startsWith("@media") || lower.startsWith("@supports")) {
            const inner = parseList();
            if (src[i] === "}") i++;
            out += head + "{" + inner + "}";
          } else {
            out += head + "{" + takeRaw() + "}";
          }
          continue;
        }
        const selStart = i;
        while (i < src.length && src[i] !== "{" && src[i] !== "}") i++;
        const selector = src.slice(selStart, i).trim();
        if (src[i] !== "{") break;
        i++;
        const bodyStart = i;
        let depth = 1;
        while (i < src.length && depth > 0) {
          if (src[i] === "{") depth++;
          else if (src[i] === "}") depth--;
          if (depth > 0) i++;
        }
        const body = src.slice(bodyStart, i);
        if (src[i] === "}") i++;
        if (selector) out += prefixSelector(selector, scope) + "{" + body + "}";
      }
      return out;
    }
    return parseList();
  }

  function applyUserCss(project) {
    const css = project && project.site ? project.site.customCss : "";
    let node = document.getElementById("catalog-user-css");
    if (!node && document.head) {
      node = document.createElement("style");
      node.id = "catalog-user-css";
      document.head.append(node);
    }
    if (!node) return;
    const clean = sanitizeCss(css).trim();
    node.textContent = clean
      ? scopeCss(clean, ".catalog") + scopeCss(clean, "#look-host") + scopeCss(clean, "#item-board")
      : "";
  }

  function fieldValues(items, field) {
    const values = [];
    for (const item of items) {
      const value = String(item.fields?.[field] ?? "").trim();
      if (value && !values.includes(value)) values.push(value);
    }
    return values.sort(compareValues);
  }

  function matches(item, project, filters) {
    const query = String(filters.q || "").trim().toLowerCase();
    if (query) {
      const hay = [item.title, item.body].concat(Object.values(item.fields || {})).join("\n").toLowerCase();
      if (!hay.includes(query)) return false;
    }
    if (filters.group) {
      if (String(item.fields?.[project.site.groupField] ?? "").trim() !== filters.group) return false;
    }
    if (filters.year) {
      if (String(item.fields?.[project.site.orderField] ?? "").trim() !== filters.year) return false;
    }
    return true;
  }

  function buildChrome(project, opts) {
    opts = opts || {};
    const head = el("div", { class: "page-head" + (opts.edit ? " editing" : "") });
    const resolve = opts.resolve || ((name) => name || "");
    for (const region of pageRegions(project)) {
      const block = el("div", {
        class: "page-block page-" + region.id + (region.align === "center" ? " align-center" : ""),
        "data-region": region.id,
        style: "left:" + region.x + "%;top:" + region.y + "%;width:" + region.w + "%;height:" + region.h + "%;z-index:" + (region.z || 1)
      });
      paintRegion(block, region);
      if (region.id === "brand") {
        block.append(el("strong", { text: project.site.brand || project.site.title || "未命名图鉴" }));
      } else if (region.id === "hero") {
        block.append(el("h1", { text: project.site.title || "未命名图鉴" }));
      } else if (region.id === "lead") {
        const text = project.site.subtitle || (opts.edit ? (typeof StudioLang !== "undefined" ? StudioLang.t("lead.placeholder") : "导语，写在大标题下面") : "");
        if (text) {
          const note = el("p", { text: text });
          if (!project.site.subtitle && opts.edit) note.className = "is-placeholder";
          block.append(note);
        }
      } else if (region.id === "visual") {
        const src = coverSrc(project, resolve);
        if (src) {
          const img = el("img", { src: src, alt: "" });
          const site = project.site || {};
          frameImage(img, { x: site.visualFocusX, y: site.visualFocusY, scale: site.visualFocusScale });
          block.append(img);
        } else {
          block.append(el("div", { class: "ph" + (project.site && project.site.bg ? " is-clear" : ""), "aria-hidden": "true" }));
        }
      } else if (opts.live) {
        block.append(buildTools(project, opts));
      } else {
        const row = el("div", { class: "tools-row" });
        row.append(el("span", { class: "tool-chip", text: "搜索" }));
        row.append(el("span", { class: "tool-chip tool-chip-group", text: project.site.groupField || "分组" }));
        row.append(el("span", { class: "tool-chip tool-chip-year", text: project.site.orderField || "年份" }));
        block.append(row);
      }
      head.append(block);
    }
    applyPageSkin(head, project, resolve);
    return head;
  }

  function buildTools(project, opts) {
    const filters = opts.filters;
    const row = el("div", { class: "tools-row" });
    const search = el("input", {
      class: "tool-search",
      type: "search",
      placeholder: "搜索标题、简介、字段",
      "aria-label": "搜索",
      autocomplete: "off"
    });
    search.value = filters.q || "";
    search.addEventListener("input", () => {
      filters.q = search.value;
      opts.onFilter && opts.onFilter();
    });
    row.append(search);
    row.append(filterSelect(project, filters, "group", project.site.groupField, opts));
    row.append(filterSelect(project, filters, "year", project.site.orderField, opts));
    return row;
  }

  function filterSelect(project, filters, key, field, opts) {
    const select = el("select", { class: "tool-select", "aria-label": field || key });
    select.append(el("option", { value: "", text: (field || "全部") + " · 全部" }));
    if (field) {
      for (const value of fieldValues(project.items, field)) {
        select.append(el("option", { value: value, text: value }));
      }
    }
    select.value = filters[key] || "";
    select.addEventListener("change", () => {
      filters[key] = select.value;
      opts.onFilter && opts.onFilter();
    });
    return select;
  }

  function renderView(project, resolve, opts, items) {
    const mode = project.site.interface;
    if (!project.items.length) {
      return el("div", { class: "empty-cab" }, [
        el("p", { text: "展柜还是空的。" }),
        opts.isolate ? el("p", { text: "回到「内容」，导入图片，或先放入图鉴示例。" }) : null
      ]);
    }
    if (!items.length) {
      return el("div", { class: "empty-cab" }, [
        el("p", { text: "没有符合的条目。" }),
        el("p", { text: "未找到结果。" })
      ]);
    }
    const paging = pageSlice(project, items, opts);
    items = paging.slice;
    const link = cardOpts(opts);
    let view;
    if (mode === "index") {
      view = el("div", { class: "view view-index" });
      for (const [name, group] of groupedItems(project, items)) {
        const block = el("section", { class: "index-block" }, [
          el("h2", {}, [name, el("span", { text: String(group.length) })])
        ]);
        const grid = el("div", { class: "index-grid" });
        for (const item of group) grid.append(buildCard(item, project, resolve, null, link));
        block.append(grid);
        view.append(block);
      }
    } else if (mode === "timeline") {
      view = el("div", { class: "view view-timeline" });
      const field = project.site.orderField;
      for (const item of orderedItems(project, items)) {
        const label = String(item.fields?.[field] ?? "").trim();
        const row = el("div", { class: "tl-item" });
        if (label) row.append(el("p", { class: "tl-label", text: label }));
        row.append(buildCard(item, project, resolve, null, link));
        view.append(row);
      }
    } else if (mode === "magazine") {
      view = el("div", { class: "view view-magazine" });
      const [feature, ...rest] = items;
      const side = rest.slice(0, 2);
      const more = rest.slice(2);
      if (feature) {
        const featureWrap = el("div", { class: "mag-feature" });
        featureWrap.append(buildCard(feature, project, resolve, null, link));
        view.append(featureWrap);
      }
      if (side.length) {
        const stack = el("div", { class: "mag-side" });
        for (const item of side) stack.append(buildCard(item, project, resolve, null, link));
        view.append(stack);
      }
      if (more.length) {
        const grid = el("div", { class: "mag-rest" });
        for (const item of more) grid.append(buildCard(item, project, resolve, null, link));
        view.append(grid);
      }
    } else {
      view = el("div", { class: "view view-grid" });
      for (const item of items) view.append(buildCard(item, project, resolve, null, link));
    }
    if (paging.pages > 1) view.append(makePager(paging, opts));
    return view;
  }

  function detailRegions(project) {
    const defaults = [
      { id: "shot", x: 0, y: 0, w: 46, h: 96, z: 1, align: "left" },
      { id: "back", x: 52, y: 0, w: 22, h: 8, z: 4, align: "left" },
      { id: "title", x: 52, y: 12, w: 46, h: 16, z: 3, align: "left" },
      { id: "fields", x: 52, y: 30, w: 42, h: 20, z: 2, align: "left" },
      { id: "body", x: 52, y: 52, w: 46, h: 36, z: 2, align: "left" },
      { id: "pager", x: 52, y: 90, w: 46, h: 8, z: 5, align: "left" }
    ];
    const raw = project.site && project.site.detail && project.site.detail.regions;
    const list = Array.isArray(raw) ? raw : [];
    return defaults.map((fallback) => {
      const found = list.find((region) => region && region.id === fallback.id);
      return found ? Object.assign({}, fallback, found) : fallback;
    });
  }

  function neighborItems(project, opts) {
    const items = project.items || [];
    const filters = opts && opts.filters;
    if (!filters) return items;
    const active = String(filters.q || "").trim() || filters.group || filters.year;
    if (!active) return items;
    const shown = items.filter((item) => matches(item, project, filters));
    return shown.length ? shown : items;
  }

  function centerDetail() {
    const stage = document.querySelector(".detail-stage");
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const viewHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const block = rect.height > viewHeight - 32 ? "start" : "center";
    stage.scrollIntoView({ block: block, inline: "nearest" });
  }

  function renderDetail(project, item, resolve, opts) {
    opts = opts || {};
    const stage = el("div", { class: "detail detail-stage" + (opts.edit ? " editing" : "") });
    applyVars(stage, project);
    const shots = pictures(item);
    let current = shots[0] || "";
    const photo = el("img", { alt: item.title || "未命名" });
    const photoWrap = el("div", { class: "card detail-photo frame-" + (project.site.frame || "glass") });
    paintFrame(photoWrap, project, resolve);
    if (current) {
      photo.src = resolve(current);
      photoWrap.append(photo);
    } else if (opts.edit) {
      photoWrap.append(el("div", { class: "ph", "aria-hidden": "true" }));
    }
    const thumbs = el("div", { class: "thumbs" });
    function show(name) {
      current = name;
      if (!photo.isConnected) photoWrap.replaceChildren(photo);
      photo.src = resolve(name);
      for (const button of thumbs.querySelectorAll("button")) {
        button.setAttribute("aria-current", button.dataset.src === name ? "true" : "false");
      }
    }
    for (const name of shots) {
      const button = el("button", { type: "button", "data-src": name, "aria-label": "查看这张图" });
      button.append(el("img", { src: resolve(name), alt: "" }));
      button.addEventListener("click", () => show(name));
      thumbs.append(button);
    }
    if (current) show(current);
    const back = el("button", { class: "back", type: "button", text: "返回主页" });
    back.addEventListener("click", () => {
      if (opts.edit) return;
      if (opts.isolate) opts.onNavigate && opts.onNavigate(null);
      else location.hash = "#/";
    });
    function openNeighbor(id) {
      if (opts.edit || !id) return;
      if (opts.isolate) {
        if (opts.onNavigate) opts.onNavigate(id);
      } else {
        location.hash = "#/item/" + encodeURIComponent(id);
      }
      centerDetail();
    }
    const sequence = neighborItems(project, opts);
    let here = -1;
    for (let i = 0; i < sequence.length; i += 1) {
      if (sequence[i].id === item.id) here = i;
    }
    const previous = here > 0 ? sequence[here - 1] : null;
    const following = here >= 0 && here < sequence.length - 1 ? sequence[here + 1] : null;
    for (const region of detailRegions(project)) {
      if (region.id === "pager" && !(project.site && project.site.detailPager)) continue;
      const align = region.align === "center" ? " align-center" : region.align === "right" ? " align-right" : "";
      const block = el("div", {
        class: "detail-block detail-" + region.id + align,
        "data-region": region.id,
        style: "left:" + region.x + "%;top:" + region.y + "%;width:" + region.w + "%;height:" + region.h + "%;z-index:" + (region.z || 1)
      });
      paintRegion(block, region);
      if (region.id === "shot") {
        if (photoWrap.childNodes.length) block.append(photoWrap);
        if (shots.length > 1) block.append(thumbs);
      } else if (region.id === "back") {
        block.append(back);
      } else if (region.id === "title") {
        block.append(el("h1", { text: item.title || "未命名" }));
      } else if (region.id === "fields") {
        const specs = el("div", { class: "specs" });
        for (const field of project.fields || []) {
          const value = String(item.fields?.[field.name] ?? "").trim();
          if (!value && !opts.edit) continue;
          specs.append(el("div", {}, [
            el("dt", { text: field.name }),
            el("dd", { text: value || "—" })
          ]));
        }
        if (specs.childNodes.length) block.append(specs);
      } else if (region.id === "body") {
        const text = String(item.body || "").trim();
        if (text || opts.edit) {
          const note = el("p", { class: "prose" + (text ? "" : " is-placeholder"), text: text || "简介" });
          block.append(note);
        }
        for (const id of ["extra1", "extra2", "extra3"]) {
          if (!project.site.extras || !project.site.extras[id]) continue;
          const extra = String((item.notes && item.notes[id]) || "").trim();
          if (extra) block.append(el("p", { class: "prose", text: extra }));
        }
      } else if (region.id === "pager") {
        const row = el("div", { class: "pager-row" });
        const prevBtn = el("button", { type: "button", class: "back", text: "上一件" });
        const nextBtn = el("button", { type: "button", class: "back", text: "下一件" });
        if (!opts.edit && !previous) prevBtn.disabled = true;
        if (!opts.edit && !following) nextBtn.disabled = true;
        prevBtn.addEventListener("click", () => openNeighbor(previous && previous.id));
        nextBtn.addEventListener("click", () => openNeighbor(following && following.id));
        row.append(prevBtn, nextBtn);
        block.append(row);
      }
      stage.append(block);
    }
    return stage;
  }

  function render(rootNode, project, opts) {
    opts = opts || {};
    const resolve = opts.resolve || ((name) => name || "");
    const filters = opts.filters || { q: "", group: "", year: "" };
    const draw = () => {
      applyUserCss(project);
      opts.onPage = () => fillCabinet();
      const openId = opts.isolate
        ? (opts.openId || null)
        : (location.hash.startsWith("#/item/") ? decodeURIComponent(location.hash.slice(7)) : null);
      rootNode.className = "catalog shape-" + (project.site.shape || "portrait") + (opts.isolate ? " in-studio" : "");
      applyVars(rootNode, project);
      rootNode.replaceChildren();
      const sheet = el("div", { class: "sheet" });
      const cabinet = el("div", { class: "cabinet" });
      function leaveDetail() {
        if (!openId) return false;
        if (opts.isolate) opts.onNavigate && opts.onNavigate(null);
        else location.hash = "#/";
        return true;
      }
      function fillCabinet() {
        cabinet.replaceChildren();
        if (openId) return;
        const shown = project.items.filter((item) => matches(item, project, filters));
        const active = String(filters.q || "").trim() || filters.group || filters.year;
        if (active && project.items.length) {
          cabinet.append(el("p", { class: "result-line", text: shown.length + " / " + project.items.length + " 条" }));
        }
        cabinet.append(renderView(project, resolve, opts, shown));
      }
      sheet.append(buildChrome(project, {
        live: true,
        resolve: resolve,
        filters: filters,
        onFilter: () => {
          if (leaveDetail()) return;
          opts.page = 0;
          fillCabinet();
        }
      }));
      if (openId) {
        const item = project.items.find((entry) => entry.id === openId);
        sheet.append(item
          ? renderDetail(project, item, resolve, opts)
          : el("p", { class: "missing", text: "未找到结果" }));
        if (!item) {
          const back = el("button", { class: "back", type: "button", text: "返回主页" });
          back.addEventListener("click", () => {
            if (opts.isolate) opts.onNavigate && opts.onNavigate(null);
            else location.hash = "#/";
          });
          sheet.append(back);
        }
      } else {
        fillCabinet();
        sheet.append(cabinet);
      }
      if (project.site.credit !== false) {
        sheet.append(el("footer", { class: "colophon", text: "用图鉴工坊排版" }));
      }
      rootNode.append(sheet);
    };
    draw();
    if (!opts.isolate && rootNode.dataset.bound !== "1") {
      rootNode.dataset.bound = "1";
      window.addEventListener("hashchange", draw);
    }
  }

  root.Catalog = {
    render: render,
    buildCard: buildCard,
    buildChrome: buildChrome,
    renderDetail: renderDetail,
    fieldLine: fieldLine,
    overlapsImage: overlapsImage,
    paintRegion: paintRegion,
    applyPageSkin: applyPageSkin,
    frameImage: frameImage,
    coverSrc: coverSrc,
    applyUserCss: applyUserCss
  };

  if (root.CATALOG_DATA && document.getElementById("app")) {
    render(document.getElementById("app"), root.CATALOG_DATA, {});
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
