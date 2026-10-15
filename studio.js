(function () {
  const t = (...args) => StudioLang.t(...args);
  const TIP_HREF = "https://afdian.com/a/kaehashi/plan";

  const REGION_META = [
    { id: "image", label: "图" },
    { id: "title", label: "标题" },
    { id: "fields", label: "字段" },
    { id: "body", label: "简介" }
  ];

  const EXTRA_META = [
    { id: "extra1", label: "附注一", x: 4, y: 6, w: 34, h: 12 },
    { id: "extra2", label: "附注二", x: 4, y: 20, w: 34, h: 12 },
    { id: "extra3", label: "附注三", x: 62, y: 6, w: 34, h: 12 }
  ];

  const PRESETS = {
    stack: {
      label: "上图下文",
      regions: [
        { id: "image", x: 0, y: 0, w: 100, h: 58, z: 1, hidden: false },
        { id: "title", x: 5, y: 60, w: 90, h: 12, z: 2, hidden: false },
        { id: "fields", x: 5, y: 73, w: 90, h: 8, z: 3, hidden: false },
        { id: "body", x: 5, y: 82, w: 90, h: 15, z: 4, hidden: false }
      ]
    },
    split: {
      label: "左图右文",
      regions: [
        { id: "image", x: 0, y: 0, w: 52, h: 100, z: 1, hidden: false },
        { id: "title", x: 56, y: 6, w: 40, h: 16, z: 2, hidden: false },
        { id: "fields", x: 56, y: 26, w: 40, h: 18, z: 3, hidden: false },
        { id: "body", x: 56, y: 48, w: 40, h: 46, z: 4, hidden: false }
      ]
    },
    overlay: {
      label: "大图叠字",
      regions: [
        { id: "image", x: 0, y: 0, w: 100, h: 100, z: 1, hidden: false },
        { id: "title", x: 6, y: 62, w: 88, h: 14, z: 2, hidden: false },
        { id: "fields", x: 6, y: 78, w: 88, h: 8, z: 3, hidden: false },
        { id: "body", x: 6, y: 87, w: 88, h: 10, z: 4, hidden: false }
      ]
    },
    titleTop: {
      label: "下图上文",
      regions: [
        { id: "title", x: 4, y: 2, w: 92, h: 12, z: 2, hidden: false },
        { id: "fields", x: 4, y: 15, w: 92, h: 8, z: 3, hidden: false },
        { id: "image", x: 0, y: 26, w: 100, h: 74, z: 1, hidden: false },
        { id: "body", x: 4, y: 86, w: 92, h: 12, z: 4, hidden: false, opacity: 0 }
      ]
    },
    splitRight: {
      label: "右图左文",
      regions: [
        { id: "image", x: 48, y: 0, w: 52, h: 100, z: 1, hidden: false },
        { id: "title", x: 4, y: 6, w: 40, h: 16, z: 2, hidden: false, align: "left" },
        { id: "fields", x: 4, y: 26, w: 40, h: 18, z: 3, hidden: false, align: "left" },
        { id: "body", x: 4, y: 48, w: 40, h: 46, z: 4, hidden: false, align: "left" }
      ]
    },
    rail: {
      label: "窄图宽文",
      regions: [
        { id: "image", x: 0, y: 0, w: 34, h: 100, z: 1, hidden: false },
        { id: "title", x: 38, y: 8, w: 58, h: 16, z: 2, hidden: false, align: "left" },
        { id: "fields", x: 38, y: 28, w: 58, h: 14, z: 3, hidden: false, align: "left" },
        { id: "body", x: 38, y: 46, w: 58, h: 46, z: 4, hidden: false, align: "left" }
      ]
    },
    caption: {
      label: "大图留题",
      regions: [
        { id: "image", x: 0, y: 0, w: 100, h: 82, z: 1, hidden: false },
        { id: "title", x: 6, y: 84, w: 88, h: 12, z: 2, hidden: false, align: "center" },
        { id: "fields", x: 6, y: 86, w: 40, h: 8, z: 3, hidden: false, opacity: 0 },
        { id: "body", x: 50, y: 86, w: 44, h: 8, z: 3, hidden: false, opacity: 0 }
      ]
    },
    centerType: {
      label: "居中叠题",
      regions: [
        { id: "image", x: 0, y: 0, w: 100, h: 100, z: 1, hidden: false },
        { id: "title", x: 8, y: 36, w: 84, h: 16, z: 3, hidden: false, align: "center" },
        { id: "fields", x: 16, y: 54, w: 68, h: 8, z: 3, hidden: false, align: "center" },
        { id: "body", x: 12, y: 66, w: 76, h: 12, z: 3, hidden: false, opacity: 0 }
      ]
    }
  };

  const INTERFACES = [
    ["grid", "展柜", "同样大小，一格一件", "mock-grid"],
    ["index", "索引", "按字段分成几架", "mock-index"],
    ["timeline", "年表", "按字段排成时间线", "mock-timeline"],
    ["magazine", "杂志", "放大最前的图", "mock-magazine"]
  ];

  const SHAPES = [
    ["portrait", "竖卡", "3:4"],
    ["square", "方卡", "1:1"],
    ["landscape", "横卡", "4:3"]
  ];

  const FRAMES = [
    ["wood", "木框"],
    ["acrylic", "亚克力"],
    ["polaroid", "拍立得"],
    ["glass", "玻璃"],
    ["custom", "自定义"]
  ];

  const PAGE_META = [
    { id: "brand", label: "站名" },
    { id: "hero", label: "大标题" },
    { id: "lead", label: "导语" },
    { id: "tools", label: "功能栏" },
    { id: "visual", label: "主视觉" }
  ];

  const PAGE_PRESETS = {
    center: {
      label: "居中开场",
      regions: [
        { id: "brand", x: 0, y: 2, w: 30, h: 8, z: 2, align: "left" },
        { id: "hero", x: 6, y: 16, w: 88, h: 32, z: 3, align: "center" },
        { id: "lead", x: 14, y: 50, w: 72, h: 10, z: 3, align: "center" },
        { id: "tools", x: 12, y: 64, w: 76, h: 14, z: 4, align: "center" },
        { id: "visual", x: 78, y: 2, w: 20, h: 12, z: 1, align: "left", opacity: 0 }
      ]
    },
    split: {
      label: "左右开场",
      regions: [
        { id: "brand", x: 0, y: 2, w: 34, h: 8, z: 3, align: "left" },
        { id: "tools", x: 48, y: 2, w: 52, h: 10, z: 4, align: "left" },
        { id: "hero", x: 0, y: 20, w: 48, h: 28, z: 3, align: "left" },
        { id: "lead", x: 0, y: 50, w: 44, h: 16, z: 3, align: "left" },
        { id: "visual", x: 52, y: 18, w: 48, h: 74, z: 1, align: "left" }
      ]
    },
    stack: {
      label: "顺次往下",
      regions: [
        { id: "brand", x: 0, y: 0, w: 40, h: 8, z: 2, align: "left" },
        { id: "hero", x: 0, y: 12, w: 86, h: 26, z: 3, align: "left" },
        { id: "lead", x: 0, y: 40, w: 62, h: 12, z: 3, align: "left" },
        { id: "tools", x: 0, y: 56, w: 78, h: 14, z: 4, align: "left" },
        { id: "visual", x: 0, y: 74, w: 42, h: 24, z: 1, align: "left", opacity: 0 }
      ]
    },
    poster: {
      label: "大图铺底",
      regions: [
        { id: "visual", x: 0, y: 0, w: 100, h: 100, z: 1, align: "left" },
        { id: "brand", x: 4, y: 4, w: 36, h: 8, z: 3, align: "left" },
        { id: "hero", x: 4, y: 18, w: 58, h: 32, z: 4, align: "left" },
        { id: "lead", x: 4, y: 52, w: 46, h: 12, z: 4, align: "left" },
        { id: "tools", x: 4, y: 70, w: 50, h: 14, z: 5, align: "left" }
      ]
    },
    nav: {
      label: "顶栏导航",
      regions: [
        { id: "brand", x: 0, y: 0, w: 32, h: 8, z: 4, align: "left" },
        { id: "tools", x: 38, y: 0, w: 62, h: 10, z: 4, align: "left" },
        { id: "hero", x: 0, y: 18, w: 52, h: 38, z: 3, align: "left" },
        { id: "lead", x: 0, y: 58, w: 46, h: 12, z: 3, align: "left" },
        { id: "visual", x: 56, y: 18, w: 42, h: 68, z: 1, align: "left" }
      ]
    },
    mast: {
      label: "巨字左齐",
      regions: [
        { id: "brand", x: 0, y: 0, w: 24, h: 7, z: 3, align: "left" },
        { id: "hero", x: 0, y: 10, w: 58, h: 46, z: 3, align: "left" },
        { id: "lead", x: 0, y: 58, w: 42, h: 12, z: 3, align: "left" },
        { id: "tools", x: 0, y: 76, w: 36, h: 12, z: 4, align: "left" },
        { id: "visual", x: 60, y: 6, w: 40, h: 88, z: 1, align: "left" }
      ]
    },
    band: {
      label: "底栏功能",
      regions: [
        { id: "brand", x: 0, y: 2, w: 34, h: 8, z: 3, align: "left" },
        { id: "hero", x: 0, y: 14, w: 66, h: 28, z: 3, align: "left" },
        { id: "lead", x: 0, y: 44, w: 50, h: 12, z: 3, align: "left" },
        { id: "visual", x: 64, y: 12, w: 34, h: 58, z: 1, align: "left" },
        { id: "tools", x: 0, y: 80, w: 100, h: 16, z: 4, align: "left" }
      ]
    },
    mastRight: {
      label: "巨字右齐",
      regions: [
        { id: "visual", x: 0, y: 6, w: 42, h: 88, z: 1, align: "left" },
        { id: "brand", x: 46, y: 0, w: 54, h: 8, z: 3, align: "right" },
        { id: "hero", x: 44, y: 14, w: 56, h: 40, z: 3, align: "right" },
        { id: "lead", x: 52, y: 56, w: 48, h: 12, z: 3, align: "right" },
        { id: "tools", x: 58, y: 76, w: 42, h: 12, z: 4, align: "right" }
      ]
    },
    fullCenter: {
      label: "全幅居中",
      regions: [
        { id: "visual", x: 0, y: 0, w: 100, h: 100, z: 1, align: "left" },
        { id: "brand", x: 28, y: 6, w: 44, h: 8, z: 4, align: "center" },
        { id: "hero", x: 10, y: 26, w: 80, h: 30, z: 4, align: "center" },
        { id: "lead", x: 18, y: 58, w: 64, h: 10, z: 4, align: "center" },
        { id: "tools", x: 20, y: 76, w: 60, h: 12, z: 5, align: "center" }
      ]
    }
  };

  const SAMPLES = [
    { shape: "flare", wall: "#6e2430", floor: "#3d1520", cloth: "#9d2c3a", trim: "#f0d3a0", band: 390, year: "2021" },
    { shape: "column", wall: "#1e3558", floor: "#14243c", cloth: "#2d4f86", trim: "#d5e2f2", band: 340, year: "2022" },
    { shape: "cape", wall: "#3a3a40", floor: "#242428", cloth: "#5c5e66", trim: "#efeae4", band: 360, year: "2023" },
    { shape: "flare", wall: "#8a5a22", floor: "#5c3c16", cloth: "#c9842a", trim: "#f3e2b0", band: 400, year: "2024" },
    { shape: "column", wall: "#d7d3cc", floor: "#b7b2a8", cloth: "#f7f4ee", trim: "#c45b6a", band: 330, year: "2025" }
  ];

  const state = {
    tab: "cabinet",
    project: null,
    assets: new Map(),
    urls: new Map(),
    selectedId: null,
    previewId: null,
    previewDevice: "desk",
    regionId: "image",
    cardPreset: "",
    homePreset: "",
    tool: "select",
    zoom: 1,
    filters: { q: "", group: "", year: "" },
    saveTimer: 0,
    memory: false,
    board: null,
    fieldsOpen: false
  };

  let dbPromise = null;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function num(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function snap(value) {
    return Math.round(value * 2) / 2;
  }

  function focusNumber(value) {
    const n = Number(value);
    return Number.isFinite(n) ? clamp(Math.round(n * 10) / 10, 0, 100) : 50;
  }

  function focusScale(value) {
    const n = Number(value);
    return Number.isFinite(n) ? clamp(Math.round(n * 100) / 100, 1, 3) : 1;
  }

  function focusPair(raw) {
    if (!raw || typeof raw !== "object") return null;
    if (!Number.isFinite(Number(raw.x)) || !Number.isFinite(Number(raw.y))) return null;
    return { x: focusNumber(raw.x), y: focusNumber(raw.y), scale: focusScale(raw.scale) };
  }

  function readFocus(item, layout) {
    if (state.tab === "content" && item && !item.layout && item.imageFocus) {
      return {
        x: focusNumber(item.imageFocus.x),
        y: focusNumber(item.imageFocus.y),
        scale: focusScale(item.imageFocus.scale)
      };
    }
    const region = layout && layout.regions.find((entry) => entry.id === "image");
    return {
      x: focusNumber(region && region.focusX),
      y: focusNumber(region && region.focusY),
      scale: focusScale(region && region.focusScale)
    };
  }

  function writeFocus(item, layout, x, y, scale) {
    const point = { x: focusNumber(x), y: focusNumber(y), scale: focusScale(scale) };
    if (state.tab === "content" && item && !item.layout) {
      item.imageFocus = point;
      return point;
    }
    const region = layout && layout.regions.find((entry) => entry.id === "image");
    if (region) {
      region.focusX = point.x;
      region.focusY = point.y;
      region.focusScale = point.scale;
    }
    return point;
  }

  function paintFocus(plate, point) {
    const img = plate && plate.querySelector(".region-image img");
    if (!img || !point) return;
    img.style.objectPosition = point.x + "% " + point.y + "%";
    img.style.transformOrigin = point.x + "% " + point.y + "%";
    img.style.transform = point.scale > 1.001 ? "scale(" + point.scale + ")" : "";
  }

  function cssColor(value, fallback) {
    const text = String(value || "").trim();
    return /^#[0-9a-fA-F]{6}$/.test(text) ? text : fallback;
  }

  const FONT_KEYS = ["sans", "serif", "xiaowei", "huangyou", "kuaile", "mashan", "longcang"];
  const FONT_CHOICES = [
    ["", "默认"],
    ["sans", "思源黑体"],
    ["serif", "思源宋体"],
    ["xiaowei", "站酷小薇"],
    ["huangyou", "站酷黄油"],
    ["kuaile", "站酷快乐"],
    ["mashan", "马善政"],
    ["longcang", "龙藏体"]
  ];
  const TEXT_IDS = { brand: 1, hero: 1, lead: 1, title: 1, fields: 1, body: 1, extra1: 1, extra2: 1, extra3: 1 };
  const SHAPE_RATIO = { portrait: 0.75, square: 1, landscape: 1.333 };
  const FONT_HREF = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Long+Cang&family=Ma+Shan+Zheng&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@500;700&family=ZCOOL+KuaiLe&family=ZCOOL+QingKe+HuangYou&family=ZCOOL+XiaoWei&display=swap";

  function styleFields(region) {
    const opacity = clamp(num(region.opacity, region.hidden ? 0 : 100), 0, 100);
    return {
      opacity: opacity,
      fillOn: !!region.fillOn,
      fill: cssColor(region.fill, "#ffffff"),
      stroke: !!region.stroke,
      strokeColor: cssColor(region.strokeColor, "#1b2430"),
      shadow: !!region.shadow,
      shadowSize: clamp(num(region.shadowSize, 12), 0, 40),
      fontSize: clamp(Math.round(num(region.fontSize, 0)), 0, 96)
    };
  }
  function toast(message) {
    const node = document.querySelector(".toast");
    node.hidden = false;
    node.textContent = message;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { node.hidden = true; }, 3600);
  }

  function layoutFromPreset(key) {
    return { regions: clone(PRESETS[key].regions) };
  }

  function pageFromPreset(key) {
    return { regions: clone(PAGE_PRESETS[key].regions) };
  }

  function sanitizePage(page) {
    const fallback = pageFromPreset("center");
    const raw = page && Array.isArray(page.regions) ? page.regions : [];
    const legacy = !raw.some((region) => region && ["brand", "hero", "lead", "visual"].includes(region.id));
    const source = legacy ? [] : raw;
    const byId = new Map();
    for (const region of source) {
      if (!region || !region.id) continue;
      byId.set(region.id === "heading" ? "hero" : region.id, region);
    }
    const mins = {
      brand: [12, 6],
      hero: [18, 10],
      lead: [16, 6],
      tools: [18, 8],
      visual: [14, 12]
    };
    return {
      regions: PAGE_META.map((meta) => {
        const region = byId.get(meta.id) || fallback.regions.find((entry) => entry.id === meta.id);
        const min = mins[meta.id];
        const w = clamp(num(region.w, 40), min[0], 100);
        const h = clamp(num(region.h, 20), min[1], 100);
        const x = clamp(num(region.x, 0), 0, 100 - min[0]);
        const y = clamp(num(region.y, 0), 0, 100 - min[1]);
        return {
          id: meta.id,
          x: Math.min(x, 100 - w),
          y: Math.min(y, 100 - h),
          w: Math.min(w, 100 - x),
          h: Math.min(h, 100 - y),
          z: num(region.z, 1),
          ...styleFields(region),
          font: FONT_KEYS.includes(region.font) ? region.font : "",
          align: region.align === "right" ? "right" : region.align === "center" ? "center" : "left"
        };
      })
    };
  }

  function extraRegion(meta) {
    return {
      id: meta.id,
      x: meta.x,
      y: meta.y,
      w: meta.w,
      h: meta.h,
      z: 5,
      align: "left",
      opacity: 100,
      fillOn: false,
      fill: "#ffffff",
      stroke: false,
      strokeColor: "#1b2430",
      shadow: false,
      shadowSize: 12,
      font: ""
    };
  }

  function packRegion(region, fallbackW, fallbackH) {
    const w = clamp(num(region.w, fallbackW), 12, 100);
    const h = clamp(num(region.h, fallbackH), 8, 100);
    const x = clamp(num(region.x, 0), 0, 100 - w);
    const y = clamp(num(region.y, 0), 0, 100 - h);
    return {
      id: region.id,
      x: x,
      y: y,
      w: Math.min(w, 100 - x),
      h: Math.min(h, 100 - y),
      z: num(region.z, 1),
      ...styleFields(region),
      font: FONT_KEYS.includes(region.font) ? region.font : "",
      align: region.align === "right" ? "right" : region.align === "center" ? "center" : "left",
      focusX: focusNumber(region.focusX),
      focusY: focusNumber(region.focusY),
      focusScale: focusScale(region.focusScale)
    };
  }

  function mergeExtras(next, previous) {
    const prev = previous || [];
    for (const meta of EXTRA_META) {
      const old = prev.find((region) => region.id === meta.id);
      next.push(old ? clone(old) : extraRegion(meta));
    }
    return next;
  }

  function visibleRegions(layout) {
    const extras = state.project.site.extras || {};
    return layout.regions.filter((region) => !EXTRA_META.some((meta) => meta.id === region.id) || extras[region.id]);
  }

  function regionLabel(id) {
    const key = "region." + id;
    const text = t(key);
    if (text !== key) return text;
    const meta = REGION_META.concat(EXTRA_META).find((entry) => entry.id === id);
    return meta ? meta.label : "";
  }

  function sanitizeLayout(layout) {
    const source = layout && Array.isArray(layout.regions) && REGION_META.every((meta) => layout.regions.some((region) => region.id === meta.id))
      ? layout
      : layoutFromPreset("stack");
    const core = REGION_META.map((meta) => packRegion(source.regions.find((region) => region.id === meta.id), 30, 12));
    const extras = EXTRA_META.map((meta) => {
      const found = source.regions.find((region) => region.id === meta.id);
      return packRegion(found || extraRegion(meta), meta.w, meta.h);
    });
    return { regions: core.concat(extras) };
  }

  function defaultProject() {
    return {
      version: 1,
      nextId: 1,
      nextAsset: 1,
      site: {
        title: "未命名图鉴",
        brand: "",
        subtitle: "",
        interface: "grid",
        frame: "glass",
        shape: "portrait",
        ratio: 0.75,
        paper: "#e7eef0",
        ink: "#1b2430",
        accent: "#1e3a5f",
        cardPaper: "#f6f1ea",
        cardWash: false,
        frameWidth: 7,
        frameImage: "",
        flow: "scroll",
        perPage: 6,
        extras: { extra1: false, extra2: false, extra3: false },
        bg: "",
        visualSource: "first",
        visualImage: "",
        customCss: "",
        radius: 0,
        veil: "none",
        groupField: "分组",
        orderField: "年份",
        credit: true,
        layout: sanitizeLayout(layoutFromPreset("stack")),
        page: pageFromPreset("center")
      },
      fields: [{ name: "分组" }, { name: "年份" }],
      items: []
    };
  }

  function normalizeItem(raw, index) {
    const fields = {};
    if (raw.fields && typeof raw.fields === "object") {
      for (const [key, value] of Object.entries(raw.fields)) fields[key] = String(value ?? "");
    }
    let title = String(raw.title ?? "");
    if (raw.sample && /^示范衣装/.test(title)) title = "【图鉴示例】";
    const notes = { extra1: "", extra2: "", extra3: "" };
    if (raw.notes && typeof raw.notes === "object") {
      for (const meta of EXTRA_META) notes[meta.id] = String(raw.notes[meta.id] ?? "");
    }
    return {
      id: String(raw.id || ("item-" + (index + 1))),
      title: title,
      body: String(raw.body ?? ""),
      cover: String(raw.cover ?? ""),
      gallery: Array.isArray(raw.gallery) ? raw.gallery.map(String) : [],
      fields: fields,
      notes: notes,
      layout: raw.layout ? sanitizeLayout(raw.layout) : null,
      imageFocus: focusPair(raw.imageFocus),
      sample: !!raw.sample
    };
  }

  function normalize(raw) {
    const project = defaultProject();
    if (!raw || typeof raw !== "object") return project;
    const site = raw.site || {};
    project.site.title = String(site.title ?? project.site.title);
    project.site.brand = String(site.brand ?? "");
    project.site.subtitle = String(site.subtitle ?? "");
    project.site.interface = ["grid", "index", "timeline", "magazine"].includes(site.interface) ? site.interface : "grid";
    project.site.frame = ["wood", "acrylic", "polaroid", "glass", "custom"].includes(site.frame) ? site.frame : "glass";
    project.site.shape = ["portrait", "square", "landscape", "custom"].includes(site.shape) ? site.shape : "portrait";
    const fallbackRatio = SHAPE_RATIO[project.site.shape] || 0.75;
    const ratio = Number(site.ratio);
    project.site.ratio = clamp(Math.round((Number.isFinite(ratio) ? ratio : fallbackRatio) * 1000) / 1000, 0.45, 2.2);
    project.site.paper = cssColor(site.paper, project.site.paper);
    project.site.ink = cssColor(site.ink, project.site.ink);
    project.site.accent = cssColor(site.accent, project.site.accent);
    project.site.cardPaper = cssColor(site.cardPaper, project.site.cardPaper);
    project.site.cardWash = !!site.cardWash;
    const framePad = { wood: 11, acrylic: 8, polaroid: 12, glass: 7, custom: 12 };
    project.site.frameWidth = clamp(Math.round(num(site.frameWidth, framePad[project.site.frame] || 12)), 0, 48);
    project.site.frameImage = String(site.frameImage || "");
    project.site.flow = site.flow === "page" ? "page" : "scroll";
    project.site.perPage = clamp(Math.round(num(site.perPage, 6)), 1, 24);
    project.site.extras = {
      extra1: !!(site.extras && site.extras.extra1),
      extra2: !!(site.extras && site.extras.extra2),
      extra3: !!(site.extras && site.extras.extra3)
    };
    project.site.bg = String(site.bg || "");
    project.site.visualSource = site.visualSource === "custom" ? "custom" : "first";
    project.site.visualImage = String(site.visualImage || "");
    project.site.customCss = String(site.customCss || "").slice(0, 12000);
    project.site.radius = clamp(num(site.radius, 0), 0, 48);
    project.site.veil = site.veil === "dark" || site.veil === "blur" ? site.veil : "none";
    project.site.credit = site.credit !== false;
    project.site.layout = sanitizeLayout(site.layout);
    project.site.page = sanitizePage(site.page);
    if (Array.isArray(raw.fields) && raw.fields.length) {
      const names = [];
      for (const field of raw.fields) {
        const name = String(field.name || "").trim();
        if (name && !names.includes(name)) names.push(name);
      }
      if (names.length) project.fields = names.map((name) => ({ name: name }));
    }
    project.items = Array.isArray(raw.items) ? raw.items.map(normalizeItem) : [];
    let maxId = 0;
    for (const item of project.items) {
      const match = /^item-(\d+)$/.exec(item.id);
      if (match) maxId = Math.max(maxId, Number(match[1]));
    }
    project.nextId = Math.max(num(raw.nextId, 1), maxId + 1);
    project.nextAsset = Math.max(1, num(raw.nextAsset, 1));
    project.site.groupField = project.fields.some((field) => field.name === site.groupField)
      ? site.groupField
      : (project.fields[0]?.name || "");
    project.site.orderField = project.fields.some((field) => field.name === site.orderField)
      ? site.orderField
      : (project.fields[0]?.name || "");
    return project;
  }

  function db() {
    if (!dbPromise) {
      dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open("catalog-studio-v1", 1);
        request.onupgradeneeded = () => {
          const database = request.result;
          if (!database.objectStoreNames.contains("kv")) database.createObjectStore("kv");
          if (!database.objectStoreNames.contains("assets")) database.createObjectStore("assets");
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    return dbPromise;
  }

  function idbGet(store, key) {
    return db().then((database) => new Promise((resolve, reject) => {
      const tx = database.transaction(store, "readonly");
      const request = tx.objectStore(store).get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    }));
  }

  function idbPut(store, key, value) {
    return db().then((database) => new Promise((resolve, reject) => {
      const tx = database.transaction(store, "readwrite");
      tx.objectStore(store).put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    }));
  }

  function idbDelete(store, key) {
    return db().then((database) => new Promise((resolve, reject) => {
      const tx = database.transaction(store, "readwrite");
      tx.objectStore(store).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    }));
  }

  async function loadAssets() {
    const database = await db();
    return new Promise((resolve, reject) => {
      const map = new Map();
      const request = database.transaction("assets", "readonly").objectStore("assets").openCursor();
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) { resolve(map); return; }
        map.set(cursor.key, cursor.value);
        cursor.continue();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async function persistAssets(entries) {
    if (state.memory || !entries.length) return;
    const database = await db();
    await new Promise((resolve, reject) => {
      const tx = database.transaction("assets", "readwrite");
      const store = tx.objectStore("assets");
      for (const [key, blob] of entries) store.put(blob, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  function referencedAssets() {
    const names = new Set();
    for (const item of state.project.items) {
      if (item.cover) names.add(item.cover);
      for (const name of item.gallery || []) if (name) names.add(name);
    }
    if (state.project.site.bg) names.add(state.project.site.bg);
    if (state.project.site.frameImage) names.add(state.project.site.frameImage);
    if (state.project.site.visualImage) names.add(state.project.site.visualImage);
    return names;
  }

  async function gcAssets() {
    const keep = referencedAssets();
    const gone = [];
    for (const key of [...state.assets.keys()]) {
      if (!keep.has(key)) {
        state.assets.delete(key);
        const url = state.urls.get(key);
        if (url) URL.revokeObjectURL(url);
        state.urls.delete(key);
        gone.push(key);
      }
    }
    if (!state.memory) {
      for (const key of gone) await idbDelete("assets", key);
    }
  }

  function scheduleSave() {
    const node = document.querySelector(".save-state");
    if (node) node.textContent = t("save.saving");
    clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(() => { persistProject().catch(() => {}); }, 250);
  }

  async function persistProject() {
    clearTimeout(state.saveTimer);
    if (state.memory) {
      const node = document.querySelector(".save-state");
      if (node) node.textContent = t("save.fail");
      return;
    }
    await idbPut("kv", "project", state.project);
    const node = document.querySelector(".save-state");
    if (node) node.textContent = t("save.ok");
  }

  function resolveAsset(name) {
    if (!name) return "";
    if (name.startsWith("assets/") || name.startsWith("blob:") || name.startsWith("data:")) return name;
    const blob = state.assets.get(name);
    if (!blob) return "";
    if (!state.urls.has(name)) state.urls.set(name, URL.createObjectURL(blob));
    return state.urls.get(name);
  }

  function nextItemId() {
    const id = "item-" + state.project.nextId;
    state.project.nextId += 1;
    return id;
  }

  function assetExt(name) {
    const match = /\.([a-z0-9]+)$/i.exec(name || "");
    const ext = (match ? match[1] : "jpg").toLowerCase();
    if (ext === "jpeg") return "jpg";
    if (["jpg", "png", "webp", "gif"].includes(ext)) return ext;
    return "jpg";
  }

  function nextAssetName(ext) {
    const name = "img" + String(state.project.nextAsset).padStart(4, "0") + "." + ext;
    state.project.nextAsset += 1;
    return name;
  }

  async function storeBlob(blob, ext) {
    const name = nextAssetName(ext || "jpg");
    state.assets.set(name, blob);
    await persistAssets([[name, blob]]);
    return name;
  }

  function currentItem() {
    return state.project.items.find((item) => item.id === state.selectedId) || null;
  }

  function placeholderItem() {
    const fields = {};
    for (const field of state.project.fields) fields[field.name] = field.name;
    return {
      title: "衣装名称",
      body: t("empty.drag"),
      cover: "",
      gallery: [],
      fields: fields
    };
  }

  function shell() {
    return (
      '<header class="topbar">' +
        '<div class="mark"><img class="mark-icon" src="icon.png" alt=""><div><strong>图鉴工坊</strong><em id="brand-tagline"></em></div></div>' +
        '<div class="tabs" role="tablist">' +
          '<button type="button" data-tab-btn="cabinet" role="tab"></button>' +
          '<button type="button" data-tab-btn="home" role="tab"></button>' +
          '<button type="button" data-tab-btn="content" role="tab"></button>' +
          '<button type="button" data-tab-btn="preview" role="tab"></button>' +
        "</div>" +
        '<div class="spacer"></div>' +
        '<span class="save-state"></span>' +
        '<div class="top-actions">' +
          '<button type="button" class="btn" id="lang-toggle"></button>' +
          '<button type="button" class="btn" id="open-backup"></button>' +
          '<button type="button" class="btn" id="save-backup"></button>' +
          '<button type="button" class="btn" id="open-help"></button>' +
          '<button type="button" class="btn" id="open-guide"></button>' +
          '<button type="button" class="btn" id="open-tip"></button>' +
          '<button type="button" class="btn-export" id="export-site"></button>' +
        "</div>" +
      "</header>" +
      '<div class="work"><aside class="panel" id="panel"></aside><main class="stage" id="stage"></main></div>' +
      '<div class="toast" role="status" hidden></div>' +
      '<div class="guide" id="guide" hidden><div class="guide-card" role="dialog" aria-modal="true" aria-labelledby="guide-title">' +
        '<header><strong id="guide-title"></strong><span id="guide-count"></span><button type="button" class="btn-quiet" id="guide-close"></button></header>' +
        '<div class="guide-body" id="guide-body"></div>' +
        '<footer><button type="button" class="btn" id="guide-prev"></button><button type="button" class="btn" id="guide-next"></button></footer>' +
      "</div></div>" +
      '<div class="guide" id="tip" hidden><div class="guide-card tip-card" role="dialog" aria-modal="true" aria-labelledby="tip-title">' +
        '<header><strong id="tip-title"></strong><button type="button" class="btn-quiet" id="tip-close"></button></header>' +
        '<div class="guide-body"><p id="tip-copy"></p><a class="btn-export" id="tip-link" target="_blank" rel="noopener noreferrer"></a><p class="tip-url" id="tip-url"></p></div>' +
      "</div></div>" +
      '<input type="file" id="file-images" accept="image/*" multiple hidden>' +
      '<input type="file" id="file-csv" accept=".csv,text/csv" hidden>' +
      '<input type="file" id="file-dir" webkitdirectory multiple hidden>' +
      '<input type="file" id="file-backup" accept=".zip,application/zip" hidden>' +
      '<input type="file" id="file-cover" accept="image/*" hidden>' +
      '<input type="file" id="file-gallery" accept="image/*" multiple hidden>'
    );
  }

  function applyChrome() {
    const tagline = document.getElementById("brand-tagline");
    if (tagline) tagline.textContent = t("brand.tagline");
    const tabs = { cabinet: "tab.cabinet", home: "tab.home", content: "tab.content", preview: "tab.preview" };
    for (const id of Object.keys(tabs)) {
      const button = document.querySelector('[data-tab-btn="' + id + '"]');
      if (button) button.textContent = t(tabs[id]);
    }
    const save = document.querySelector(".save-state");
    if (save) save.textContent = t("save.ok");
    const labels = {
      "open-backup": "btn.backupOpen",
      "save-backup": "btn.backupSave",
      "open-help": "btn.help",
      "open-guide": "btn.guide",
      "open-tip": "btn.tip",
      "tip-title": "tip.title",
      "tip-close": "guide.close",
      "tip-copy": "tip.body",
      "tip-link": "tip.open",
      "export-site": "btn.export",
      "guide-close": "guide.close",
      "guide-prev": "guide.prev"
    };
    for (const id of Object.keys(labels)) {
      const node = document.getElementById(id);
      if (node) node.textContent = t(labels[id]);
    }
    const tipLink = document.getElementById("tip-link");
    if (tipLink) {
      tipLink.href = TIP_HREF;
      tipLink.textContent = t("tip.open");
    }
    const tipUrl = document.getElementById("tip-url");
    if (tipUrl) tipUrl.textContent = TIP_HREF;
    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      const english = StudioLang.getLang() === "en";
      langBtn.textContent = english ? "中文" : "EN";
      langBtn.title = english ? "界面改回中文" : "Switch the interface to English";
    }
  }

  function showTab(tab) {
    closeCropMenu();
    state.tab = tab;
    document.body.dataset.tab = tab;
    for (const button of document.querySelectorAll("[data-tab-btn]")) {
      button.setAttribute("aria-selected", button.dataset.tabBtn === tab ? "true" : "false");
    }
    state.board = null;
    if (tab === "cabinet") paintCabinet();
    else if (tab === "home") paintHome();
    else if (tab === "content") paintContent();
    else paintPreview();
  }

  function fieldOptions(selected) {
    return state.project.fields.map((field) => {
      const current = field.name === selected ? " selected" : "";
      return '<option value="' + escapeAttr(field.name) + '"' + current + ">" + escapeHtml(field.name) + "</option>";
    }).join("");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/'/g, "&#39;");
  }

  function paintCabinet() {
    const site = state.project.site;
    const customCount = state.project.items.filter((item) => item.layout).length;
    document.getElementById("panel").innerHTML =
      '<div class="control">' +
        '<section class="slab"><h2>' + t("h.card") + '</h2><div class="choice-grid shape-choices">' +
        SHAPES.map(([id, , ratio]) =>
          '<button type="button" class="choice" data-set="shape" data-value="' + id + '" aria-pressed="' + ((site.shape || "portrait") === id) + '">' +
            '<i class="ratio-mini ' + id + '" aria-hidden="true"></i>' +
            "<span>" + t("shape." + id) + "</span><small>" + ratio + "</small></button>"
        ).join("") +
        '</div><p class="hint">' + t("hint.ratio") + "</p></section>" +
        '<section class="slab"><h2>' + t("h.paper") + '</h2><div class="colors">' +
          colorField("cardPaper", t("label.cardPaper"), site.cardPaper || "#f6f1ea") +
        '</div><label class="check"><input type="checkbox" id="card-wash"' + (site.cardWash ? " checked" : "") + ">" + t("check.wash") + "</label>" +
        '<p class="hint">' + t("hint.wash") + "</p></section>" +
        '<section class="slab"><h2>' + t("h.frame") + '</h2><div class="choice-grid">' +
        FRAMES.map(([id]) =>
          '<button type="button" class="choice" data-set="frame" data-value="' + id + '" aria-pressed="' + (site.frame === id) + '">' +
            '<span class="mini frame-' + id + '" aria-hidden="true"><span class="plate"></span></span>' + t("frame." + id) + "</button>"
        ).join("") +
        "</div>" +
        (site.frame === "custom"
          ? '<div class="row-actions"><button type="button" class="btn" id="frame-upload">' + (site.frameImage ? t("btn.frameReplace") : t("btn.frame")) + "</button>" +
            (site.frameImage ? '<button type="button" class="btn-quiet" id="frame-clear">' + t("btn.frameClear") + "</button>" : "") +
            '</div><input type="file" id="frame-file" accept="image/*" hidden><p class="hint">' + t("hint.frame") + "</p>"
          : "") +
        '<label class="field"><span class="field-label">' + t("label.frameWidth") + '</span><input type="range" id="frame-width" min="0" max="48" value="' + clamp(num(site.frameWidth, 12), 0, 48) + '"><span class="tool-num" id="frame-width-num">' + clamp(num(site.frameWidth, 12), 0, 48) + "</span></label>" +
        "</section>" +
        '<section class="slab"><h2>' + t("h.notes") + '</h2><p class="hint">' + t("hint.notes") + "</p>" +
        EXTRA_META.map((meta) =>
          '<label class="check"><input type="checkbox" data-extra="' + meta.id + '"' + (site.extras && site.extras[meta.id] ? " checked" : "") + ">" + t("region." + meta.id) + "</label>"
        ).join("") +
        "</section>" +
        '<section class="slab"><h2>' + t("h.layout") + '</h2><div class="choice-grid">' +
        Object.entries(PRESETS).map(([id]) =>
          '<button type="button" class="choice" data-layout="' + id + '" aria-pressed="' + (state.cardPreset === id) + '">' +
            "<span>" + t("layout." + id) + "</span></button>"
        ).join("") +
        "</div>" +
        (customCount ? '<p class="hint">' + t("hint.customLayouts", { n: customCount }) + "</p>" : "") +
        '<p class="hint">' + t("hint.inspector") + "</p></section>" +
      "</div>";
    document.getElementById("stage").innerHTML = '<div class="light-table" id="look-table"><div id="look-host"></div></div>';
    mountBoard(document.getElementById("look-host"), state.project.items[0] || placeholderItem(), site.layout, true, t("board.shared"));
    bindCabinet();
  }

  function pageShowsVisual(layout) {
    const region = layout && layout.regions && layout.regions.find((entry) => entry.id === "visual");
    if (!region) return false;
    const opacity = region.opacity == null || region.opacity === "" ? 100 : Number(region.opacity);
    return opacity > 0;
  }

  function paintHome() {
    const site = state.project.site;
    document.getElementById("panel").innerHTML =
      '<div class="control">' +
        '<section class="slab">' +
          '<label class="field"><span class="field-label">' + t("label.brand") + '</span><input type="text" id="site-brand" placeholder="' + escapeAttr(t("ph.brand")) + '" value="' + escapeAttr(site.brand || "") + '"></label>' +
          '<label class="field"><span class="field-label">' + t("label.hero") + '</span><input type="text" id="site-title" value="' + escapeAttr(site.title) + '"></label>' +
          '<label class="field"><span class="field-label">' + t("label.lead") + '</span><input type="text" id="site-sub" placeholder="' + escapeAttr(t("ph.lead")) + '" value="' + escapeAttr(site.subtitle) + '"></label>' +
        "</section>" +
        '<section class="slab"><h2>' + t("h.faces") + '</h2><div class="choice-grid">' +
        INTERFACES.map(([id, , , mock]) =>
          '<button type="button" class="choice" data-set="interface" data-value="' + id + '" aria-pressed="' + (site.interface === id) + '">' +
            '<span class="mock ' + mock + '" aria-hidden="true"><i></i><i></i><i></i><i></i></span>' +
            "<span>" + t("face." + id) + "</span><small>" + t("face." + id + ".desc") + "</small></button>"
        ).join("") +
        "</div></section>" +
        '<section class="slab"><h2>' + t("h.flow") + '</h2><div class="choice-grid">' +
          '<button type="button" class="choice" data-flow="scroll" aria-pressed="' + (site.flow !== "page") + '"><span>' + t("flow.scroll") + "</span><small>" + t("flow.scroll.desc") + "</small></button>" +
          '<button type="button" class="choice" data-flow="page" aria-pressed="' + (site.flow === "page") + '"><span>' + t("flow.page") + "</span><small>" + t("flow.page.desc") + "</small></button>" +
        '</div><label class="field" id="per-page-field"' + (site.flow === "page" ? "" : " hidden") + '><span class="field-label">' + t("label.perPage") + '</span><input type="number" id="per-page" min="1" max="24" value="' + clamp(num(site.perPage, 6), 1, 24) + '"></label>' +
        '<p class="hint">' + t("hint.flow") + "</p></section>" +
        '<section class="slab"><h2>' + t("h.templates") + '</h2><div class="choice-grid">' +
        Object.entries(PAGE_PRESETS).map(([id]) =>
          '<button type="button" class="choice" data-page="' + id + '" aria-pressed="' + (state.homePreset === id) + '">' +
            "<span>" + t("page." + id) + "</span></button>"
        ).join("") +
        '</div><p class="hint">' + t("hint.templates") + "</p>" +
        '<div id="visual-source"' + (pageShowsVisual(site.page) ? "" : " hidden") + ">" +
          '<label class="check"><input type="checkbox" id="visual-first"' + (site.visualSource === "custom" ? "" : " checked") + ">" + t("check.visualFirst") + "</label>" +
          '<label class="check"><input type="checkbox" id="visual-custom"' + (site.visualSource === "custom" ? " checked" : "") + ">" + t("check.visualCustom") + "</label>" +
          '<div class="row-actions" id="visual-file-row"' + (site.visualSource === "custom" ? "" : " hidden") + ">" +
            '<button type="button" class="btn" id="visual-upload">' + (site.visualImage ? t("btn.replaceImage") : t("btn.uploadImage")) + "</button>" +
            '<button type="button" class="btn-quiet" id="visual-clear"' + (site.visualImage ? "" : " hidden") + ">" + t("btn.clearImage") + "</button>" +
          "</div>" +
          '<input type="file" id="visual-file" accept="image/*" hidden>' +
        "</div></section>" +
        '<section class="slab"><h2>' + t("h.color") + '</h2><div class="colors">' +
          colorField("paper", t("label.paper"), site.paper) +
          colorField("ink", t("label.ink"), site.ink) +
          colorField("accent", t("label.accent"), site.accent) +
        '</div><p class="hint">' + t("hint.colors") + "</p>" +
        '<div class="row-actions"><button type="button" class="btn" id="bg-upload">' + t("btn.bg") + "</button>" +
          (site.bg ? '<button type="button" class="btn-quiet" id="bg-clear">' + t("btn.bgClear") + "</button>" : "") +
        '</div><input type="file" id="bg-file" accept="image/*" hidden>' +
        '<label class="field"><span class="field-label">' + t("label.radius") + '</span><input type="range" id="bg-radius" min="0" max="48" value="' + clamp(num(site.radius, 0), 0, 48) + '"><span class="tool-num" id="bg-radius-num">' + clamp(num(site.radius, 0), 0, 48) + "</span></label>" +
        '<div class="veil-choices">' +
          [["none", "veil.none"], ["dark", "veil.dark"], ["blur", "veil.blur"]].map(([id, key]) =>
            '<button type="button" class="choice" data-veil="' + id + '" aria-pressed="' + ((site.veil || "none") === id) + '"><span>' + t(key) + "</span></button>"
          ).join("") +
        "</div></section>" +
        '<section class="slab"><h2>' + t("h.index") + '</h2><label class="field"><span class="field-label">' + t("label.groupBy") + '</span><select id="group-field">' + fieldOptions(site.groupField) + "</select></label>" +
        '<label class="field"><span class="field-label">' + t("label.orderBy") + '</span><select id="order-field">' + fieldOptions(site.orderField) + "</select></label>" +
        '<p class="hint">' + t("hint.fields") + "</p>" +
        '<label class="check"><input type="checkbox" id="credit"' + (site.credit ? " checked" : "") + ">" + t("check.credit") + "</label></section>" +
        '<section class="slab"><h2>' + t("h.css") + "</h2>" +
          '<p class="hint">' + t("hint.css") + "</p>" +
          '<textarea id="custom-css" class="css-editor" spellcheck="false" placeholder="' + escapeAttr(t("css.placeholder")) + '"></textarea>' +
        "</section>" +
      "</div>";
    document.getElementById("stage").innerHTML = '<div class="light-table" id="look-table"><div id="look-host"></div></div>';
    mountPageBoard(document.getElementById("look-host"));
    bindHome();
  }

  function canvasOf(host) {
    if (host.classList.contains("light-table") || host.classList.contains("item-board")) return host;
    return host.closest(".light-table, .item-board") || host;
  }

  function toolButton(label, pressed, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.setAttribute("aria-pressed", pressed ? "true" : "false");
    button.addEventListener("click", onClick);
    return button;
  }

  function toolSep() {
    const sep = document.createElement("i");
    sep.className = "float-sep";
    sep.setAttribute("aria-hidden", "true");
    return sep;
  }

  function setTool(tool) {
    state.tool = tool === "move" || tool === "crop" ? tool : "select";
    for (const node of document.querySelectorAll(".plate.editing, .plate.crop-only, .page-head.editing")) {
      node.classList.toggle("tool-move", state.tool === "move");
      node.classList.toggle("tool-crop", state.tool === "crop");
    }
    if (state.board && state.board.fillTools) state.board.fillTools();
  }

  function modeButton(tool, label) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tool-mode";
    button.dataset.tool = tool;
    button.title = label;
    button.textContent = label;
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-pressed", state.tool === tool ? "true" : "false");
    button.addEventListener("click", () => setTool(tool));
    return button;
  }

  function appendModes(bar) {
    bar.append(modeButton("select", t("tool.select")), modeButton("move", t("tool.move")), toolSep());
  }

  let cropCloser = null;

  function closeCropMenu() {
    if (cropCloser) {
      document.removeEventListener("pointerdown", cropCloser.pointer);
      document.removeEventListener("keydown", cropCloser.key);
      cropCloser = null;
    }
    const menu = document.getElementById("crop-menu");
    if (menu) menu.remove();
    const live = document.querySelector(".float-bar [data-crop]");
    if (live) {
      live.setAttribute("aria-pressed", "false");
      live.setAttribute("aria-expanded", "false");
    }
  }

  function openCropMenu(anchor) {
    closeCropMenu();
    const board = state.board;
    if (!board) return;
    const focus = readFocus(board.item, board.layout);
    const menu = document.createElement("div");
    menu.id = "crop-menu";
    menu.className = "crop-menu";
    menu.setAttribute("role", "dialog");
    menu.setAttribute("aria-label", t("tool.crop"));
    const head = document.createElement("strong");
    head.textContent = t("tool.crop");
    const stage = document.createElement("div");
    stage.className = "crop-stage";
    const box = board.plate.querySelector(".region-image");
    const boxRect = box ? box.getBoundingClientRect() : { width: 3, height: 4 };
    const ratio = boxRect.width / Math.max(1, boxRect.height);
    const max = 280;
    if (ratio >= 1) {
      stage.style.width = max + "px";
      stage.style.height = Math.max(120, max / ratio) + "px";
    } else {
      stage.style.height = max + "px";
      stage.style.width = Math.max(120, max * ratio) + "px";
    }
    const img = document.createElement("img");
    img.alt = "";
    const liveImg = board.plate.querySelector(".region-image img");
    if (liveImg && liveImg.getAttribute("src")) img.src = liveImg.getAttribute("src");
    else stage.classList.add("is-empty");
    const grid = document.createElement("div");
    grid.className = "crop-grid";
    grid.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 4; i += 1) grid.append(document.createElement("i"));
    stage.append(img, grid);
    const hint = document.createElement("p");
    hint.className = "crop-hint";
    hint.textContent = t("tool.crop.hint");
    const zoom = document.createElement("label");
    zoom.className = "crop-zoom";
    const zoomName = document.createElement("span");
    zoomName.textContent = t("tool.cropZoom");
    const range = document.createElement("input");
    range.type = "range";
    range.min = "100";
    range.max = "300";
    range.value = String(Math.round(focus.scale * 100));
    const zoomNum = document.createElement("span");
    zoomNum.className = "tool-num";
    zoom.append(zoomName, range, zoomNum);
    const actions = document.createElement("div");
    actions.className = "crop-actions";
    const reset = document.createElement("button");
    reset.type = "button";
    reset.className = "btn";
    reset.textContent = t("tool.cropReset");
    const done = document.createElement("button");
    done.type = "button";
    done.className = "btn";
    done.textContent = t("tool.cropDone");
    actions.append(reset, done);
    menu.append(head, stage, hint, zoom, actions);
    document.body.append(menu);
    const anchorRect = anchor.getBoundingClientRect();
    const width = menu.offsetWidth;
    const height = menu.offsetHeight;
    let left = anchorRect.left;
    let top = anchorRect.bottom + 8;
    if (left + width > window.innerWidth - 12) left = Math.max(12, window.innerWidth - width - 12);
    if (top + height > window.innerHeight - 12) top = Math.max(12, anchorRect.top - height - 8);
    menu.style.left = left + "px";
    menu.style.top = top + "px";

    function paint(point) {
      img.style.objectPosition = point.x + "% " + point.y + "%";
      img.style.transformOrigin = point.x + "% " + point.y + "%";
      img.style.transform = point.scale > 1.001 ? "scale(" + point.scale + ")" : "";
      zoomNum.textContent = Math.round(point.scale * 100) + "%";
      range.value = String(Math.round(point.scale * 100));
      paintFocus(board.plate, point);
    }
    function apply(x, y, scale) {
      paint(writeFocus(board.item, board.layout, x, y, scale));
    }
    paint(focus);
    stage.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      const start = readFocus(board.item, board.layout);
      const rect = stage.getBoundingClientRect();
      const px = event.clientX;
      const py = event.clientY;
      stage.classList.add("is-panning");
      try { stage.setPointerCapture(event.pointerId); } catch (err) { /* 合成事件没有指针捕获 */ }
      function move(ev) {
        const dx = ((ev.clientX - px) / Math.max(1, rect.width)) * 100;
        const dy = ((ev.clientY - py) / Math.max(1, rect.height)) * 100;
        apply(start.x - dx, start.y - dy, start.scale);
      }
      function up() {
        stage.classList.remove("is-panning");
        stage.removeEventListener("pointermove", move);
        stage.removeEventListener("pointerup", up);
        stage.removeEventListener("pointercancel", up);
        scheduleSave();
      }
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerup", up);
      stage.addEventListener("pointercancel", up);
    });
    stage.addEventListener("wheel", (event) => {
      event.preventDefault();
      const current = readFocus(board.item, board.layout);
      const next = current.scale + (event.deltaY < 0 ? 0.08 : -0.08);
      apply(current.x, current.y, next);
      scheduleSave();
    }, { passive: false });
    range.addEventListener("input", () => {
      const current = readFocus(board.item, board.layout);
      apply(current.x, current.y, Number(range.value) / 100);
      scheduleSave();
    });
    reset.addEventListener("click", () => {
      apply(50, 50, 1);
      scheduleSave();
    });
    done.addEventListener("click", () => closeCropMenu());
    anchor.setAttribute("aria-pressed", "true");
    anchor.setAttribute("aria-expanded", "true");
    const onPointer = (event) => {
      if (event.target.closest && event.target.closest("#crop-menu, [data-crop]")) return;
      closeCropMenu();
    };
    const onKey = (event) => {
      if (event.key === "Escape") closeCropMenu();
    };
    cropCloser = { pointer: onPointer, key: onKey };
    setTimeout(() => {
      document.addEventListener("pointerdown", onPointer);
      document.addEventListener("keydown", onKey);
    }, 0);
  }

  function appendImageCrop(bar) {
    if (!state.board || state.regionId !== "image") {
      closeCropMenu();
      return;
    }
    const crop = document.createElement("button");
    crop.type = "button";
    crop.className = "tool-mode";
    crop.dataset.crop = "1";
    crop.textContent = t("tool.crop");
    crop.title = t("tool.crop.title");
    const open = !!document.getElementById("crop-menu");
    crop.setAttribute("aria-pressed", open ? "true" : "false");
    crop.setAttribute("aria-expanded", open ? "true" : "false");
    crop.addEventListener("click", (event) => {
      event.stopPropagation();
      if (document.getElementById("crop-menu")) closeCropMenu();
      else openCropMenu(crop);
    });
    bar.append(crop, toolSep());
  }

  function keepPaint(nextRegions, previous) {
    for (const region of nextRegions) {
      const prev = previous.find((entry) => entry.id === region.id);
      if (!prev) continue;
      const paint = styleFields(prev);
      delete paint.opacity;
      Object.assign(region, paint);
      if (FONT_KEYS.includes(prev.font)) region.font = prev.font;
      if (region.id === "image") {
        region.focusX = focusNumber(prev.focusX);
        region.focusY = focusNumber(prev.focusY);
        region.focusScale = focusScale(prev.focusScale);
      }
    }
    return nextRegions;
  }

  function regionNode(plate, region) {
    return plate.querySelector('[data-region="' + region.id + '"]');
  }

  function livePaint(plate, region) {
    const node = regionNode(plate, region);
    if (node) Catalog.paintRegion(node, region);
  }

  function checkAndColor(region, plate, flag, colorKey, label, fallback) {
    const wrap = document.createElement("label");
    wrap.className = "tool-check";
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = !!region[flag];
    const text = document.createElement("span");
    text.textContent = label;
    const color = document.createElement("input");
    color.type = "color";
    color.className = "tool-swatch";
    color.value = cssColor(region[colorKey], fallback);
    color.disabled = !box.checked;
    color.setAttribute("aria-label", label + "颜色");
    color.title = "打开" + label + "色盘";
    box.addEventListener("change", () => {
      region[flag] = box.checked;
      color.disabled = !box.checked;
      livePaint(plate, region);
      scheduleSave();
    });
    color.addEventListener("input", () => {
      region[colorKey] = color.value;
      if (!region[flag]) {
        region[flag] = true;
        box.checked = true;
        color.disabled = false;
      }
      livePaint(plate, region);
      scheduleSave();
    });
    const mark = document.createElement("span");
    mark.className = "swatch-mark";
    mark.setAttribute("aria-hidden", "true");
    mark.innerHTML = '<svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M8 1.4a6.6 6.6 0 0 0-1.2 13.1c.7.1 1.1-.2 1.1-.8 0-.4-.2-.7-.5-.9-.4-.2-.6-.6-.6-1 0-.8.7-1.4 1.5-1.4H10a2.6 2.6 0 0 0 2.6-2.6A6.6 6.6 0 0 0 8 1.4z"/><circle cx="5.1" cy="6.2" r="1" fill="currentColor"/><circle cx="8" cy="4.5" r="1" fill="currentColor"/><circle cx="10.7" cy="6.1" r="1" fill="currentColor"/></svg>';
    wrap.append(box, text, mark, color);
    return wrap;
  }

  function rangeControl(region, plate, key, label, min, max, fallback, disabled) {
    const wrap = document.createElement("label");
    wrap.className = "tool-slide";
    const text = document.createElement("span");
    text.textContent = label;
    const input = document.createElement("input");
    input.type = "range";
    input.min = String(min);
    input.max = String(max);
    input.value = String(clamp(num(region[key], fallback), min, max));
    input.disabled = !!disabled;
    input.setAttribute("aria-label", label);
    const numNode = document.createElement("span");
    numNode.className = "tool-num";
    numNode.textContent = input.value;
    input.addEventListener("input", () => {
      region[key] = Number(input.value);
      numNode.textContent = input.value;
      livePaint(plate, region);
      if (key === "opacity") {
        const hit = plate.querySelector('[data-hit="' + region.id + '"]');
        if (hit) hit.classList.toggle("is-quiet", region.opacity <= 0);
      }
      scheduleSave();
    });
    wrap.append(text, input, numNode);
    return wrap;
  }

  function fontControl(region, plate) {
    const select = document.createElement("select");
    select.className = "tool-font";
    select.title = t("font.title");
    select.setAttribute("aria-label", t("font.aria"));
    for (const [value] of FONT_CHOICES) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value ? t("font." + value) : t("font.default");
      select.append(option);
    }
    select.value = FONT_KEYS.includes(region.font) ? region.font : "";
    select.addEventListener("change", () => {
      region.font = select.value;
      livePaint(plate, region);
      scheduleSave();
    });
    return select;
  }

  function fontSizeControl(region, plate) {
    const fallback = { hero: 64, brand: 18, lead: 18, title: 22, fields: 13, body: 14, extra1: 14, extra2: 14, extra3: 14 }[region.id] || 16;
    const saved = Number(region.fontSize);
    const wrap = document.createElement("label");
    wrap.className = "tool-slide";
    const text = document.createElement("span");
    text.textContent = t("tool.size");
    const input = document.createElement("input");
    input.type = "range";
    input.min = "8";
    input.max = "96";
    input.value = String(clamp(Number.isFinite(saved) && saved >= 8 ? saved : fallback, 8, 96));
    input.setAttribute("aria-label", t("tool.size"));
    const numNode = document.createElement("span");
    numNode.className = "tool-num";
    numNode.textContent = input.value;
    input.addEventListener("input", () => {
      region.fontSize = Number(input.value);
      numNode.textContent = input.value;
      livePaint(plate, region);
      scheduleSave();
    });
    wrap.append(text, input, numNode);
    return wrap;
  }

  function alignControl(region, plate) {
    const wrap = document.createElement("span");
    wrap.className = "tool-align";
    for (const value of ["left", "center", "right"]) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = t("align." + value);
      button.title = t("align." + value + ".title");
      button.setAttribute("aria-pressed", (region.align || "left") === value ? "true" : "false");
      button.addEventListener("click", () => {
        region.align = value;
        for (const peer of wrap.querySelectorAll("button")) {
          peer.setAttribute("aria-pressed", peer === button ? "true" : "false");
        }
        livePaint(plate, region);
        scheduleSave();
      });
      wrap.append(button);
    }
    return wrap;
  }

  function appendInspector(bar, plate, layout, meta) {
    if (state.tool === "move") return;
    const region = layout.regions.find((entry) => entry.id === state.regionId);
    if (!region) return;
    Object.assign(region, styleFields(region));
    const name = document.createElement("span");
    name.className = "tool-name";
    name.textContent = regionLabel(region.id) || meta.find((entry) => entry.id === region.id)?.label || "模块";
    bar.append(toolSep(), name);
    if (TEXT_IDS[region.id]) {
      bar.append(fontControl(region, plate), fontSizeControl(region, plate), alignControl(region, plate));
    }
    bar.append(checkAndColor(region, plate, "fillOn", "fill", t("tool.fill"), "#ffffff"));
    bar.append(checkAndColor(region, plate, "stroke", "strokeColor", t("tool.stroke"), "#1b2430"));
    const shadowBox = document.createElement("label");
    shadowBox.className = "tool-check";
    const shadow = document.createElement("input");
    shadow.type = "checkbox";
    shadow.checked = !!region.shadow;
    const shadowText = document.createElement("span");
    shadowText.textContent = t("tool.shadow");
    shadowBox.append(shadow, shadowText);
    const thick = rangeControl(region, plate, "shadowSize", t("tool.thick"), 0, 40, 12, !region.shadow);
    shadow.addEventListener("change", () => {
      region.shadow = shadow.checked;
      thick.querySelector("input").disabled = !shadow.checked;
      livePaint(plate, region);
      scheduleSave();
    });
    bar.append(shadowBox, thick);
    bar.append(rangeControl(region, plate, "opacity", t("tool.opacity"), 0, 100, 100, false));
  }

  function mountTools(canvas, fill) {
    let bar = canvas.querySelector(":scope > .float-bar");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "float-bar";
      bar.setAttribute("role", "toolbar");
      bar.setAttribute("aria-label", "画布工具");
      canvas.append(bar);
    }
    bar.replaceChildren();
    fill(bar);
    if (!bar.childElementCount) bar.remove();
    return bar;
  }

  function floatReadout(canvas) {
    let hud = canvas.querySelector(":scope > .hud-float");
    if (!hud) {
      hud = document.createElement("p");
      hud.className = "hud hud-float";
      canvas.append(hud);
    }
    return hud;
  }

  function colorField(key, label, value) {
    return '<label>' + label + '<input type="color" data-color="' + key + '" value="' + escapeAttr(value) + '"></label>';
  }

  function applyLiveRatio(ratio) {
    const value = String(ratio);
    for (const node of document.querySelectorAll(".board-column, .card")) {
      node.style.setProperty("--card-ratio", value);
    }
  }

  function bindCabinet() {
    const site = state.project.site;
    for (const button of document.querySelectorAll("[data-set]")) {
      button.addEventListener("click", () => {
        site[button.dataset.set] = button.dataset.value;
        for (const peer of document.querySelectorAll('[data-set="' + button.dataset.set + '"]')) {
          peer.setAttribute("aria-pressed", peer === button ? "true" : "false");
        }
        const card = document.querySelector("#look-host .card");
        if (card && (button.dataset.set === "frame" || button.dataset.set === "shape")) {
          card.className = "card shape-" + (site.shape || "portrait") + " frame-" + site.frame;
        }
        if (button.dataset.set === "frame") {
          scheduleSave();
          paintCabinet();
          return;
        }
        if (button.dataset.set === "shape") {
          site.ratio = SHAPE_RATIO[site.shape] || 0.75;
          applyLiveRatio(site.ratio);
          for (const column of document.querySelectorAll(".board-column")) {
            column.classList.remove("shape-portrait", "shape-square", "shape-landscape", "shape-custom");
            column.classList.add("shape-" + site.shape);
          }
          const ratioHud = document.querySelector(".hud-float");
          if (ratioHud) ratioHud.textContent = "卡片比例  " + Number(site.ratio).toFixed(2);
        }
        scheduleSave();
      });
    }
    const wash = document.getElementById("card-wash");
    if (wash) {
      wash.addEventListener("change", () => {
        site.cardWash = wash.checked;
        scheduleSave();
        mountBoard(document.getElementById("look-host"), state.project.items[0] || placeholderItem(), site.layout, true, t("board.shared"));
      });
    }
    for (const input of document.querySelectorAll("[data-color]")) {
      input.addEventListener("input", () => {
        site[input.dataset.color] = input.value;
        const card = document.querySelector("#look-host .card");
        if (card) card.style.setProperty("--" + (input.dataset.color === "cardPaper" ? "card" : input.dataset.color), input.value);
        scheduleSave();
      });
    }
    for (const box of document.querySelectorAll("[data-extra]")) {
      box.addEventListener("change", () => {
        site.extras[box.dataset.extra] = box.checked;
        if (EXTRA_META.some((meta) => meta.id === state.regionId) && !site.extras[state.regionId]) state.regionId = "image";
        scheduleSave();
        mountBoard(document.getElementById("look-host"), state.project.items[0] || placeholderItem(), site.layout, true, t("board.shared"));
      });
    }
    const frameWidth = document.getElementById("frame-width");
    if (frameWidth) {
      frameWidth.addEventListener("input", () => {
        site.frameWidth = clamp(Math.round(num(frameWidth.value, 12)), 0, 48);
        frameWidth.value = String(site.frameWidth);
        const numNode = document.getElementById("frame-width-num");
        if (numNode) numNode.textContent = String(site.frameWidth);
        for (const card of document.querySelectorAll(".card")) {
          card.style.setProperty("--frame", site.frameWidth + "px");
        }
        scheduleSave();
      });
    }
    const frameUpload = document.getElementById("frame-upload");
    if (frameUpload) {
      frameUpload.addEventListener("click", () => document.getElementById("frame-file").click());
      document.getElementById("frame-file").addEventListener("change", async (event) => {
        const file = event.target.files && event.target.files[0];
        event.target.value = "";
        if (!file) return;
        site.frameImage = await storeBlob(file, assetExt(file.name));
        await gcAssets();
        scheduleSave();
        paintCabinet();
      });
      const frameClear = document.getElementById("frame-clear");
      if (frameClear) {
        frameClear.addEventListener("click", async () => {
          site.frameImage = "";
          await gcAssets();
          scheduleSave();
          paintCabinet();
        });
      }
    }
    for (const button of document.querySelectorAll("[data-layout]")) {
      button.addEventListener("click", () => {
        const key = button.dataset.layout;
        state.cardPreset = key;
        for (const peer of document.querySelectorAll("[data-layout]")) {
          peer.setAttribute("aria-pressed", peer === button ? "true" : "false");
        }
        const previous = site.layout.regions;
        site.layout.regions = mergeExtras(keepPaint(clone(PRESETS[key].regions), previous), previous);
        state.regionId = "image";
        scheduleSave();
        mountBoard(document.getElementById("look-host"), state.project.items[0] || placeholderItem(), site.layout, true, t("board.shared"));
      });
    }
  }

  function bindHome() {
    const site = state.project.site;
    const brand = document.getElementById("site-brand");
    const title = document.getElementById("site-title");
    const sub = document.getElementById("site-sub");
    function paintBrand() {
      const node = document.querySelector("#look-host .page-brand strong");
      if (node) node.textContent = site.brand || site.title || "未命名图鉴";
    }
    brand.addEventListener("input", () => {
      site.brand = brand.value;
      paintBrand();
      scheduleSave();
    });
    title.addEventListener("input", () => {
      site.title = title.value;
      const heading = document.querySelector("#look-host .page-hero h1");
      if (heading) heading.textContent = site.title || "未命名图鉴";
      if (!site.brand) paintBrand();
      scheduleSave();
    });
    sub.addEventListener("input", () => {
      site.subtitle = sub.value;
      const note = document.querySelector("#look-host .page-lead p");
      if (note) {
        note.textContent = site.subtitle || "导语，写在大标题下面";
        note.classList.toggle("is-placeholder", !site.subtitle);
      }
      scheduleSave();
    });
    for (const button of document.querySelectorAll("[data-set]")) {
      button.addEventListener("click", () => {
        site[button.dataset.set] = button.dataset.value;
        for (const peer of document.querySelectorAll('[data-set="' + button.dataset.set + '"]')) {
          peer.setAttribute("aria-pressed", peer === button ? "true" : "false");
        }
        scheduleSave();
      });
    }
    for (const button of document.querySelectorAll("[data-page]")) {
      button.addEventListener("click", () => {
        const key = button.dataset.page;
        state.homePreset = key;
        for (const peer of document.querySelectorAll("[data-page]")) {
          peer.setAttribute("aria-pressed", peer === button ? "true" : "false");
        }
        site.page.regions = keepPaint(clone(PAGE_PRESETS[key].regions), site.page.regions);
        state.regionId = "hero";
        const visualBox = document.getElementById("visual-source");
        if (visualBox) visualBox.hidden = !pageShowsVisual(site.page);
        scheduleSave();
        mountPageBoard(document.getElementById("look-host"));
      });
    }
    function refreshVisual() {
      const block = document.querySelector("#look-host .page-visual");
      if (!block) return;
      const src = Catalog.coverSrc(state.project, resolveAsset);
      block.replaceChildren();
      if (src) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        block.append(img);
      } else {
        const ph = document.createElement("div");
        ph.className = "ph";
        block.append(ph);
      }
    }
    function setVisualSource(mode) {
      site.visualSource = mode === "custom" ? "custom" : "first";
      const first = document.getElementById("visual-first");
      const custom = document.getElementById("visual-custom");
      const row = document.getElementById("visual-file-row");
      const upload = document.getElementById("visual-upload");
      const clear = document.getElementById("visual-clear");
      if (first) first.checked = site.visualSource !== "custom";
      if (custom) custom.checked = site.visualSource === "custom";
      if (row) row.hidden = site.visualSource !== "custom";
      if (upload) upload.textContent = site.visualImage ? "更换图片" : "上传图片";
      if (clear) clear.hidden = !site.visualImage;
      refreshVisual();
      scheduleSave();
    }
    const visualFirst = document.getElementById("visual-first");
    const visualCustom = document.getElementById("visual-custom");
    if (visualFirst) visualFirst.addEventListener("change", () => setVisualSource(visualFirst.checked ? "first" : "custom"));
    if (visualCustom) visualCustom.addEventListener("change", () => setVisualSource(visualCustom.checked ? "custom" : "first"));
    const visualUpload = document.getElementById("visual-upload");
    if (visualUpload) {
      visualUpload.addEventListener("click", () => document.getElementById("visual-file").click());
      document.getElementById("visual-file").addEventListener("change", async (event) => {
        const file = event.target.files && event.target.files[0];
        event.target.value = "";
        if (!file) return;
        site.visualImage = await storeBlob(file, assetExt(file.name));
        site.visualSource = "custom";
        await gcAssets();
        scheduleSave();
        paintHome();
      });
      const visualClear = document.getElementById("visual-clear");
      if (visualClear) {
        visualClear.addEventListener("click", async () => {
          site.visualImage = "";
          await gcAssets();
          scheduleSave();
          paintHome();
        });
      }
    }
    const cssBox = document.getElementById("custom-css");
    if (cssBox) {
      cssBox.value = site.customCss || "";
      cssBox.addEventListener("input", () => {
        site.customCss = cssBox.value.slice(0, 12000);
        Catalog.applyUserCss(state.project);
        scheduleSave();
      });
    }
    for (const input of document.querySelectorAll("[data-color]")) {
      input.addEventListener("input", () => {
        site[input.dataset.color] = input.value;
        const head = document.querySelector("#look-host .page-head");
        if (head) {
          head.style.setProperty("--paper", site.paper);
          head.style.setProperty("--ink", site.ink);
          head.style.setProperty("--accent", site.accent);
        }
        scheduleSave();
      });
    }
    document.getElementById("group-field").addEventListener("change", (event) => {
      site.groupField = event.target.value;
      const chip = document.querySelector("#look-host .tool-chip-group");
      if (chip) chip.textContent = site.groupField || "分组";
      scheduleSave();
    });
    document.getElementById("order-field").addEventListener("change", (event) => {
      site.orderField = event.target.value;
      const chip = document.querySelector("#look-host .tool-chip-year");
      if (chip) chip.textContent = site.orderField || "年份";
      scheduleSave();
    });
    document.getElementById("credit").addEventListener("change", (event) => {
      site.credit = event.target.checked;
      scheduleSave();
    });
    const radius = document.getElementById("bg-radius");
    radius.addEventListener("input", () => {
      site.radius = Number(radius.value);
      document.getElementById("bg-radius-num").textContent = radius.value;
      const head = document.querySelector("#look-host .page-head");
      if (head) Catalog.applyPageSkin(head, state.project, resolveAsset);
      scheduleSave();
    });
    for (const button of document.querySelectorAll("[data-veil]")) {
      button.addEventListener("click", () => {
        site.veil = button.dataset.veil;
        for (const peer of document.querySelectorAll("[data-veil]")) {
          peer.setAttribute("aria-pressed", peer === button ? "true" : "false");
        }
        const head = document.querySelector("#look-host .page-head");
        if (head) Catalog.applyPageSkin(head, state.project, resolveAsset);
        scheduleSave();
      });
    }
    document.getElementById("bg-upload").addEventListener("click", () => {
      document.getElementById("bg-file").click();
    });
    document.getElementById("bg-file").addEventListener("change", async (event) => {
      const file = event.target.files && event.target.files[0];
      event.target.value = "";
      if (!file) return;
      site.bg = await storeBlob(file, assetExt(file.name));
      await gcAssets();
      scheduleSave();
      paintHome();
    });
    const clearBg = document.getElementById("bg-clear");
    if (clearBg) {
      clearBg.addEventListener("click", async () => {
        site.bg = "";
        await gcAssets();
        scheduleSave();
        paintHome();
      });
    }
    for (const button of document.querySelectorAll("[data-flow]")) {
      button.addEventListener("click", () => {
        site.flow = button.dataset.flow === "page" ? "page" : "scroll";
        for (const peer of document.querySelectorAll("[data-flow]")) {
          peer.setAttribute("aria-pressed", peer.dataset.flow === site.flow ? "true" : "false");
        }
        const field = document.getElementById("per-page-field");
        if (field) field.hidden = site.flow !== "page";
        scheduleSave();
      });
    }
    const perPage = document.getElementById("per-page");
    if (perPage) {
      perPage.addEventListener("change", () => {
        site.perPage = clamp(Math.round(num(perPage.value, 6)), 1, 24);
        perPage.value = String(site.perPage);
        scheduleSave();
      });
    }
  }

  function bindCardScale(crop, column, hud) {
    const signs = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
    const ticks = [...crop.querySelectorAll(".tick")];
    ticks.forEach((tick, index) => {
      const sx = signs[index][0];
      const sy = signs[index][1];
      tick.classList.add("scale-handle");
      tick.title = "拖动四角，改卡片比例";
      tick.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        const plate = column.querySelector(".plate");
        const rect = plate.getBoundingClientRect();
        const startX = event.clientX;
        const startY = event.clientY;
        try { tick.setPointerCapture(event.pointerId); } catch (err) { /* 合成事件没有指针捕获 */ }
        function move(ev) {
          const dw = (ev.clientX - startX) * sx;
          const dh = (ev.clientY - startY) * sy;
          const ratio = clamp((rect.width + dw) / Math.max(48, rect.height + dh), 0.45, 2.2);
          const site = state.project.site;
          site.ratio = Math.round(ratio * 100) / 100;
          site.shape = "custom";
          applyLiveRatio(site.ratio);
          for (const button of document.querySelectorAll('[data-set="shape"]')) {
            button.setAttribute("aria-pressed", "false");
          }
          hud.textContent = "卡片比例  " + site.ratio.toFixed(2);
        }
        function up() {
          tick.removeEventListener("pointermove", move);
          tick.removeEventListener("pointerup", up);
          tick.removeEventListener("pointercancel", up);
          scheduleSave();
        }
        tick.addEventListener("pointermove", move);
        tick.addEventListener("pointerup", up);
        tick.addEventListener("pointercancel", up);
      });
    });
  }

  function mountBoard(host, item, layout, editable, caption) {
    host.replaceChildren();
    const column = document.createElement("div");
    column.className = "board-column shape-" + (state.project.site.shape || "portrait");
    column.style.setProperty("--card-ratio", String(state.project.site.ratio || 0.75));
    const crop = document.createElement("div");
    crop.className = "crop";
    for (let i = 0; i < 4; i++) {
      const tick = document.createElement("i");
      tick.className = "tick";
      crop.append(tick);
    }
    const card = Catalog.buildCard(item, state.project, resolveAsset, layout, {
      link: false,
      edit: true,
      sharedFocus: host.id !== "item-board"
    });
    crop.append(card);
    column.append(crop);
    host.append(column);

    const plate = card.querySelector(".plate");
    const canvas = canvasOf(host);
    const hud = floatReadout(canvas);
    function showHud(region) {
      if (!region) {
        hud.textContent = "未选中";
        return;
      }
      if (state.tool === "crop" && region.id === "image") {
        const focus = readFocus(item, layout);
        hud.textContent = t("hud.crop", { x: focus.x, y: focus.y });
        return;
      }
      if (plate.classList.contains("crop-only")) {
        hud.textContent = t("board.locked");
        return;
      }
      hud.textContent = hudText(region);
    }

    function selectRegion(id) {
      state.regionId = id || "";
      if (state.tool === "crop" && state.regionId !== "image") state.tool = "select";
      for (const hit of plate.querySelectorAll(".hit")) {
        hit.classList.toggle("is-selected", hit.dataset.hit === state.regionId);
      }
      plate.classList.toggle("tool-crop", state.tool === "crop");
      const region = layout.regions.find((entry) => entry.id === state.regionId);
      showHud(region);
      if (api.fillTools) api.fillTools();
    }

    const api = {
      item: item,
      plate: plate,
      layout: layout,
      place: (region) => placeRegion(plate, region),
      hud: (region) => showHud(region),
      overlap: () => refreshOverlap(plate, layout),
      select: (id) => selectRegion(id),
      fillTools: () => {}
    };

    const cropOnly = !editable && host.id === "item-board";

    api.fillTools = () => {
      if (state.tool === "crop" && state.regionId !== "image") {
        state.tool = "select";
        plate.classList.remove("tool-crop");
      }
      mountTools(canvas, (bar) => {
        if (!editable && !cropOnly) return;
        if (editable) appendModes(bar);
        appendImageCrop(bar);
        if (editable) appendInspector(bar, plate, layout, REGION_META);
      });
    };

    function addHit(region, withGrip) {
      const hit = document.createElement("div");
      hit.className = "hit" + (region.id === state.regionId ? " is-selected" : "") + (num(region.opacity, 100) <= 0 ? " is-quiet" : "");
      hit.dataset.hit = region.id;
      placeRegion(plate, region);
      hit.style.left = region.x + "%";
      hit.style.top = region.y + "%";
      hit.style.width = region.w + "%";
      hit.style.height = region.h + "%";
      hit.style.zIndex = String(30 + (region.z || 1));
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = regionLabel(region.id);
      hit.append(tag);
      let grip = null;
      if (withGrip) {
        grip = document.createElement("b");
        grip.className = "grip";
        grip.title = t("tool.resize");
        hit.append(grip);
      }
      plate.append(hit);
      bindHit(hit, grip, region, plate, layout, api);
    }

    if (editable) {
      plate.classList.add("editing");
      plate.classList.toggle("tool-move", state.tool === "move");
      const stacked = visibleRegions(layout).slice().sort((a, b) => (a.z || 1) - (b.z || 1));
      for (const region of stacked) addHit(region, true);
      state.board = api;
      bindCardScale(crop, column, hud);
      selectRegion(visibleRegions(layout).some((region) => region.id === state.regionId) ? state.regionId : "image");
      applyZoom();
    } else if (cropOnly) {
      plate.classList.add("crop-only");
      const image = layout.regions.find((region) => region.id === "image");
      if (image) addHit(image, false);
      state.board = api;
      bindCardScale(crop, column, hud);
      selectRegion("image");
      applyZoom();
    } else {
      bindCardScale(crop, column, hud);
      applyZoom();
      state.board = null;
      api.fillTools();
      const region = layout.regions.find((entry) => entry.id === state.regionId) || layout.regions[0];
      hud.textContent = "正在看这一条。勾选单独版式后才能拖。";
      if (region) hud.textContent = hudText(region) + " · 尚未单独调整";
    }
  }

  function mountPageBoard(host) {
    host.replaceChildren();
    const layout = state.project.site.page;
    const column = document.createElement("div");
    column.className = "page-column";
    const crop = document.createElement("div");
    crop.className = "crop";
    for (let i = 0; i < 4; i++) {
      const tick = document.createElement("i");
      tick.className = "tick";
      crop.append(tick);
    }
    const head = Catalog.buildChrome(state.project, { edit: true, resolve: resolveAsset });
    head.style.setProperty("--paper", state.project.site.paper);
    head.style.setProperty("--ink", state.project.site.ink);
    head.style.setProperty("--accent", state.project.site.accent);
    crop.append(head);
    column.append(crop);
    host.append(column);

    const canvas = canvasOf(host);
    const hud = floatReadout(canvas);
    const api = {
      plate: head,
      layout: layout,
      place: (region) => placeRegion(head, region),
      hud: (region) => { hud.textContent = pageHud(region); },
      overlap: () => {},
      select: (id) => selectRegion(id),
      fillTools: () => {}
    };

    function selectRegion(id) {
      state.regionId = id || "";
      for (const hit of head.querySelectorAll(".hit")) {
        hit.classList.toggle("is-selected", hit.dataset.hit === state.regionId);
      }
      const region = layout.regions.find((entry) => entry.id === state.regionId);
      hud.textContent = region ? pageHud(region) : "未选中";
      api.fillTools();
    }

    api.fillTools = () => {
      if (state.tool === "crop") state.tool = "select";
      mountTools(canvas, (bar) => {
        appendModes(bar);
        appendInspector(bar, head, layout, PAGE_META);
      });
    };

    if (state.tool === "move") head.classList.add("tool-move");

    const stacked = layout.regions.slice().sort((a, b) => (a.z || 1) - (b.z || 1));
    for (const region of stacked) {
      const hit = document.createElement("div");
      hit.className = "hit" + (region.id === state.regionId ? " is-selected" : "") + (num(region.opacity, 100) <= 0 ? " is-quiet" : "");
      hit.dataset.hit = region.id;
      hit.style.left = region.x + "%";
      hit.style.top = region.y + "%";
      hit.style.width = region.w + "%";
      hit.style.height = region.h + "%";
      hit.style.zIndex = String(30 + (region.z || 1));
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = PAGE_META.find((meta) => meta.id === region.id).label;
      const grip = document.createElement("b");
      grip.className = "grip";
      grip.title = "改大小";
      hit.append(tag, grip);
      head.append(hit);
      bindHit(hit, grip, region, head, layout, api);
    }
    state.board = api;
    selectRegion(layout.regions.some((region) => region.id === state.regionId) ? state.regionId : "hero");
    applyZoom();
  }

  function pageHud(region) {
    const label = PAGE_META.find((meta) => meta.id === region.id)?.label || "";
    return label + "  " + region.x + ", " + region.y + "  ·  " + region.w + " × " + region.h;
  }

  function hudText(region) {
    return regionLabel(region.id) + "  " + region.x + ", " + region.y + "  ·  " + region.w + " × " + region.h;
  }

  function placeRegion(plate, region) {
    for (const node of plate.querySelectorAll('[data-region="' + region.id + '"], [data-hit="' + region.id + '"]')) {
      node.style.left = region.x + "%";
      node.style.top = region.y + "%";
      node.style.width = region.w + "%";
      node.style.height = region.h + "%";
      node.style.zIndex = node.dataset.hit ? String(30 + (region.z || 1)) : String(region.z || 1);
    }
  }

  function refreshOverlap(plate, layout) {
    for (const region of layout.regions) {
      const node = plate.querySelector('[data-region="' + region.id + '"]');
      if (!node) continue;
      node.classList.toggle("on-image", Catalog.overlapsImage(region, layout));
    }
  }

  function clearAlignLines(plate) {
    for (const line of plate.querySelectorAll(".align-line")) line.remove();
  }

  function drawAlignLines(plate, lines) {
    clearAlignLines(plate);
    for (const line of lines) {
      const node = document.createElement("i");
      node.className = "align-line " + (line.axis === "v" ? "is-v" : "is-h");
      if (line.axis === "v") node.style.left = line.at + "%";
      else node.style.top = line.at + "%";
      plate.append(node);
    }
  }

  function alignMove(region, x, y, w, h, rect, layout) {
    const px = 6 / Math.max(1, rect.width) * 100;
    const py = 6 / Math.max(1, rect.height) * 100;
    const vTargets = [0, 50, 100];
    const hTargets = [0, 50, 100];
    for (const other of visibleRegions(layout)) {
      if (other.id === region.id || num(other.opacity, 100) <= 0) continue;
      vTargets.push(other.x, other.x + other.w / 2, other.x + other.w);
      hTargets.push(other.y, other.y + other.h / 2, other.y + other.h);
    }
    function nearest(value, targets, threshold) {
      let best = null;
      for (const target of targets) {
        const distance = Math.abs(value - target);
        if (distance <= threshold && (!best || distance < best.d)) best = { at: target, d: distance };
      }
      return best;
    }
    function pick(options) {
      options.sort((a, b) => a.d - b.d);
      return options[0] || null;
    }
    const xOptions = [];
    const left = nearest(x, vTargets, px);
    const right = nearest(x + w, vTargets, px);
    const midX = nearest(x + w / 2, vTargets, px);
    if (left) xOptions.push({ x: left.at, at: left.at, d: left.d });
    if (right) xOptions.push({ x: right.at - w, at: right.at, d: right.d });
    if (midX) xOptions.push({ x: midX.at - w / 2, at: midX.at, d: midX.d });
    const yOptions = [];
    const top = nearest(y, hTargets, py);
    const bottom = nearest(y + h, hTargets, py);
    const midY = nearest(y + h / 2, hTargets, py);
    if (top) yOptions.push({ y: top.at, at: top.at, d: top.d });
    if (bottom) yOptions.push({ y: bottom.at - h, at: bottom.at, d: bottom.d });
    if (midY) yOptions.push({ y: midY.at - h / 2, at: midY.at, d: midY.d });
    const bestX = pick(xOptions);
    const bestY = pick(yOptions);
    const lines = [];
    let nextX = snap(x);
    let nextY = snap(y);
    if (bestX) {
      nextX = clamp(bestX.x, 0, 100 - w);
      lines.push({ axis: "v", at: bestX.at });
    }
    if (bestY) {
      nextY = clamp(bestY.y, 0, 100 - h);
      lines.push({ axis: "h", at: bestY.at });
    }
    return { x: nextX, y: nextY, lines: lines };
  }

  function bindHit(hit, grip, region, plate, layout, api) {
    function down(event, mode) {
      if (event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();
      api.select(region.id);
      const ordered = layout.regions.slice().sort((a, b) => (a.z || 1) - (b.z || 1));
      let z = 1;
      for (const entry of ordered) {
        if (entry !== region) entry.z = z++;
      }
      region.z = z;
      for (const entry of layout.regions) placeRegion(plate, entry);
      const rect = plate.getBoundingClientRect();
      const start = { x: region.x, y: region.y, w: region.w, h: region.h, px: event.clientX, py: event.clientY };
      try { hit.setPointerCapture(event.pointerId); } catch (err) { /* 合成事件没有指针捕获 */ }
      function move(ev) {
        const dx = ((ev.clientX - start.px) / rect.width) * 100;
        const dy = ((ev.clientY - start.py) / rect.height) * 100;
        if (mode === "move") {
          let x = clamp(start.x + dx, 0, 100 - start.w);
          let y = clamp(start.y + dy, 0, 100 - start.h);
          if (TEXT_IDS[region.id]) {
            const aligned = alignMove(region, x, y, start.w, start.h, rect, layout);
            x = aligned.x;
            y = aligned.y;
            drawAlignLines(plate, aligned.lines);
          } else {
            x = snap(x);
            y = snap(y);
            clearAlignLines(plate);
          }
          region.x = x;
          region.y = y;
        } else {
          clearAlignLines(plate);
          region.w = snap(clamp(start.w + dx, 14, 100 - start.x));
          region.h = snap(clamp(start.h + dy, 8, 100 - start.y));
        }
        placeRegion(plate, region);
        refreshOverlap(plate, layout);
        api.hud(region);
      }
      function up() {
        clearAlignLines(plate);
        hit.removeEventListener("pointermove", move);
        hit.removeEventListener("pointerup", up);
        hit.removeEventListener("pointercancel", up);
        scheduleSave();
      }
      hit.addEventListener("pointermove", move);
      hit.addEventListener("pointerup", up);
      hit.addEventListener("pointercancel", up);
    }
    hit.addEventListener("pointerdown", (event) => {
      if (grip && event.target === grip) return;
      if (plate.classList.contains("crop-only")) {
        if (event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        api.select("image");
        return;
      }
      if (state.tool !== "move") {
        if (event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        api.select(state.regionId === region.id ? "" : region.id);
        return;
      }
      down(event, "move");
    });
    if (grip) grip.addEventListener("pointerdown", (event) => down(event, "resize"));
  }

  function paintContent() {
    if (!state.selectedId || !currentItem()) state.selectedId = state.project.items[0]?.id || null;
    const panel = document.getElementById("panel");
    panel.innerHTML = "";
    const stage = document.getElementById("stage");
    stage.innerHTML =
      '<div class="content-wrap">' +
        '<div class="content-bar">' +
          '<button type="button" class="btn" id="add-sample"></button>' +
          '<button type="button" class="btn" id="import-images">' + t("btn.importImages") + '</button>' +
          '<button type="button" class="btn" id="import-dir">' + t("btn.importDir") + '</button>' +
          '<button type="button" class="btn" id="import-csv">' + t("btn.importCsv") + '</button>' +
          '<button type="button" class="btn" id="csv-template">' + t("btn.csv") + '</button>' +
          '<button type="button" class="btn" id="add-item">' + t("btn.addItem") + '</button>' +
          '<span class="anchor"><button type="button" class="btn" id="field-toggle" aria-expanded="false">' + t("btn.fields") + '</button><div class="fields-pop" id="fields-pop" hidden></div></span>' +
          '<button type="button" class="btn-quiet" id="clear-all">' + t("btn.clear") + '</button>' +
        "</div>" +
        '<div class="content-split">' +
          '<div class="item-list" id="item-list"></div>' +
          '<div class="item-form" id="item-form"></div>' +
          '<div class="item-board" id="item-board"></div>' +
        "</div>" +
      "</div>";
    document.getElementById("add-sample").textContent = state.project.items.some((item) => item.sample) ? t("btn.sampleRemove") : t("btn.sampleAdd");
    paintList();
    paintForm();
    paintFields();
    bindContent();
  }

  function paintList() {
    const list = document.getElementById("item-list");
    if (!list) return;
    list.replaceChildren();
    const head = document.createElement("p");
    head.className = "list-head";
    head.textContent = t("list.head", { n: state.project.items.length });
    list.append(head);
    if (!state.project.items.length) {
      const empty = document.createElement("p");
      empty.className = "hint";
      empty.style.padding = "0 12px";
      empty.textContent = t("list.empty");
      list.append(empty);
      return;
    }
    for (const item of state.project.items) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "item-row";
      button.dataset.id = item.id;
      if (item.id === state.selectedId) button.setAttribute("aria-current", "true");
      const src = resolveAsset(item.cover || item.gallery?.[0] || "");
      if (src) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        button.append(img);
      } else {
        const ph = document.createElement("span");
        ph.className = "thumb-ph";
        button.append(ph);
      }
      const text = document.createElement("span");
      const title = document.createElement("span");
      title.className = "item-row-title";
      title.textContent = item.title || t("empty.untitled");
      text.append(title);
      const group = state.project.site.groupField ? String(item.fields?.[state.project.site.groupField] ?? "").trim() : "";
      if (group) {
        const small = document.createElement("small");
        small.textContent = group;
        text.append(document.createElement("br"), small);
      }
      button.append(text);
      button.addEventListener("click", () => {
        state.selectedId = item.id;
        paintList();
        paintForm();
      });
      list.append(button);
    }
  }

  function paintForm() {
    const host = document.getElementById("item-form");
    const board = document.getElementById("item-board");
    if (!host || !board) return;
    const item = currentItem();
    host.replaceChildren();
    board.replaceChildren();
    if (!item) {
      const p = document.createElement("p");
      p.className = "hint";
      p.textContent = t("form.empty");
      host.append(p);
      return;
    }
    const title = labeledInput(t("label.itemTitle"), "text", item.title);
    const coverRow = document.createElement("div");
    coverRow.className = "cover-line";
    const coverSrc = resolveAsset(item.cover);
    if (coverSrc) {
      const img = document.createElement("img");
      img.src = coverSrc;
      img.alt = "";
      coverRow.append(img);
    } else {
      const ph = document.createElement("span");
      ph.className = "cover-ph";
      coverRow.append(ph);
    }
    const coverBtn = document.createElement("button");
    coverBtn.type = "button";
    coverBtn.className = "btn";
    coverBtn.textContent = item.cover ? t("btn.coverReplace") : t("btn.cover");
    coverBtn.addEventListener("click", () => document.getElementById("file-cover").click());
    coverRow.append(coverBtn);

    const galleryHead = document.createElement("p");
    galleryHead.className = "field-label";
    galleryHead.textContent = t("label.gallery");
    const gallery = document.createElement("div");
    gallery.className = "gallery-edit";
    for (const name of item.gallery) {
      const fig = document.createElement("figure");
      const src = resolveAsset(name);
      if (src) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        fig.append(img);
      }
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = t("btn.remove");
      remove.addEventListener("click", async () => {
        item.gallery = item.gallery.filter((entry) => entry !== name);
        await gcAssets();
        scheduleSave();
        paintForm();
      });
      fig.append(remove);
      gallery.append(fig);
    }
    const addGallery = document.createElement("button");
    addGallery.type = "button";
    addGallery.className = "btn";
    addGallery.textContent = t("btn.addGallery");
    addGallery.style.marginTop = "8px";
    addGallery.addEventListener("click", () => document.getElementById("file-gallery").click());

    const facts = document.createElement("section");
    facts.className = "slab";
    for (const field of state.project.fields) {
      const input = labeledInput(field.name, "text", item.fields?.[field.name] || "");
      input.input.addEventListener("input", () => {
        item.fields[field.name] = input.input.value;
        syncBoardText(item);
        scheduleSave();
      });
      facts.append(input.label);
    }
    const body = document.createElement("label");
    body.className = "field";
    const bodyName = document.createElement("span");
    bodyName.className = "field-label";
    bodyName.textContent = t("label.body");
    const area = document.createElement("textarea");
    area.value = item.body;
    area.addEventListener("input", () => {
      item.body = area.value;
      syncBoardText(item);
      scheduleSave();
    });
    body.append(bodyName, area);
    facts.append(body);
    if (!item.notes) item.notes = { extra1: "", extra2: "", extra3: "" };
    for (const meta of EXTRA_META) {
      if (!state.project.site.extras || !state.project.site.extras[meta.id]) continue;
      const note = document.createElement("label");
      note.className = "field";
      const noteName = document.createElement("span");
      noteName.className = "field-label";
      noteName.textContent = t("region." + meta.id);
      const noteArea = document.createElement("textarea");
      noteArea.value = item.notes[meta.id] || "";
      noteArea.addEventListener("input", () => {
        item.notes[meta.id] = noteArea.value;
        syncBoardText(item);
        scheduleSave();
      });
      note.append(noteName, noteArea);
      facts.append(note);
    }

    const check = document.createElement("label");
    check.className = "check";
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = !!item.layout;
    const checkText = document.createElement("span");
    checkText.textContent = t("check.ownLayout");
    check.append(box, checkText);
    box.addEventListener("change", () => {
      if (box.checked) {
        item.layout = clone(state.project.site.layout);
        if (item.imageFocus) {
          const image = item.layout.regions.find((region) => region.id === "image");
          if (image) {
            image.focusX = item.imageFocus.x;
            image.focusY = item.imageFocus.y;
            image.focusScale = focusScale(item.imageFocus.scale);
          }
          item.imageFocus = null;
        }
      } else {
        const image = item.layout && item.layout.regions.find((region) => region.id === "image");
        const shared = state.project.site.layout.regions.find((region) => region.id === "image");
        if (image && shared && (focusNumber(image.focusX) !== focusNumber(shared.focusX) || focusNumber(image.focusY) !== focusNumber(shared.focusY) || focusScale(image.focusScale) !== focusScale(shared.focusScale))) {
          item.imageFocus = { x: focusNumber(image.focusX), y: focusNumber(image.focusY), scale: focusScale(image.focusScale) };
        } else {
          item.imageFocus = null;
        }
        item.layout = null;
      }
      scheduleSave();
      paintForm();
    });

    title.input.addEventListener("input", () => {
      item.title = title.input.value;
      const row = document.querySelector('.item-row[data-id="' + item.id + '"] .item-row-title');
      if (row) row.textContent = item.title || t("empty.untitled");
      syncBoardText(item);
      scheduleSave();
    });

    const actions = document.createElement("div");
    actions.className = "row-actions";
    actions.append(moveButton(t("btn.up"), -1, item), moveButton(t("btn.down"), 1, item));
    const del = document.createElement("button");
    del.type = "button";
    del.className = "btn-quiet";
    del.textContent = t("btn.delete");
    del.addEventListener("click", async () => {
      state.project.items = state.project.items.filter((entry) => entry.id !== item.id);
      state.selectedId = state.project.items[0]?.id || null;
      await gcAssets();
      scheduleSave();
      paintList();
      paintForm();
      document.getElementById("add-sample").textContent = state.project.items.some((entry) => entry.sample) ? t("btn.sampleRemove") : t("btn.sampleAdd");
    });
    actions.append(del);
    const meta = document.createElement("section");
    meta.className = "slab";
    meta.append(title.label, coverRow);
    const shots = document.createElement("section");
    shots.className = "slab";
    shots.append(galleryHead, gallery, addGallery);
    const ops = document.createElement("section");
    ops.className = "slab";
    ops.append(check);
    if (item.layout) {
      const presets = document.createElement("div");
      presets.className = "preset-row";
      for (const [key, preset] of Object.entries(PRESETS)) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn";
        button.textContent = t("layout." + key);
        button.addEventListener("click", () => {
          const previous = item.layout.regions;
          item.layout.regions = mergeExtras(keepPaint(clone(preset.regions), previous), previous);
          scheduleSave();
          mountItemBoard(item);
        });
        presets.append(button);
      }
      ops.append(presets);
    }
    ops.append(actions);
    host.append(meta, shots, facts, ops);
    mountItemBoard(item);
  }

  function labeledInput(name, type, value) {
    const label = document.createElement("label");
    label.className = "field";
    const span = document.createElement("span");
    span.className = "field-label";
    span.textContent = name;
    const input = document.createElement("input");
    input.type = type;
    input.value = value;
    label.append(span, input);
    return { label: label, input: input };
  }

  function moveButton(label, delta, item) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn";
    button.textContent = label;
    button.addEventListener("click", () => {
      const index = state.project.items.findIndex((entry) => entry.id === item.id);
      const next = index + delta;
      if (next < 0 || next >= state.project.items.length) return;
      const [moved] = state.project.items.splice(index, 1);
      state.project.items.splice(next, 0, moved);
      scheduleSave();
      paintList();
    });
    return button;
  }

  function mountItemBoard(item) {
    const board = document.getElementById("item-board");
    if (!board) return;
    const editable = !!item.layout;
    const layout = item.layout || state.project.site.layout;
    mountBoard(board, item, layout, editable, editable
      ? t("board.own")
      : t("board.locked"));
  }

  function syncBoardText(item) {
    const plate = document.querySelector("#item-board .plate");
    if (!plate) return;
    const title = plate.querySelector(".region-title");
    if (title) title.textContent = item.title || t("empty.untitled");
    const fields = plate.querySelector(".region-fields");
    if (fields) fields.textContent = Catalog.fieldLine(item, state.project.fields);
    const body = plate.querySelector(".region-body");
    if (body) body.textContent = item.body || "";
    for (const meta of EXTRA_META) {
      const node = plate.querySelector(".region-" + meta.id);
      if (!node) continue;
      const text = String((item.notes && item.notes[meta.id]) || "").trim();
      node.textContent = text || "填写附注";
      node.classList.toggle("is-placeholder", !text);
    }
  }

  function paintFields() {
    const pop = document.getElementById("fields-pop");
    if (!pop) return;
    pop.replaceChildren();
    const intro = document.createElement("p");
    intro.className = "hint";
    intro.style.marginTop = "0";
    intro.textContent = t("hint.fieldNames");
    pop.append(intro);
    for (const field of state.project.fields) {
      const row = document.createElement("div");
      row.className = "field-row";
      const input = document.createElement("input");
      input.type = "text";
      input.value = field.name;
      input.addEventListener("change", () => renameField(field.name, input.value, input));
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "btn";
      remove.textContent = t("btn.deleteShort");
      remove.addEventListener("click", () => {
        const name = field.name;
        state.project.fields = state.project.fields.filter((entry) => entry.name !== name);
        for (const item of state.project.items) delete item.fields[name];
        if (state.project.site.groupField === name) state.project.site.groupField = state.project.fields[0]?.name || "";
        if (state.project.site.orderField === name) state.project.site.orderField = state.project.fields[0]?.name || "";
        scheduleSave();
        paintFields();
        paintForm();
      });
      row.append(input, remove);
      pop.append(row);
    }
    const add = document.createElement("div");
    add.className = "add-field";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = t("ph.field");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn";
    button.textContent = t("btn.add");
    button.addEventListener("click", () => {
      const name = input.value.trim();
      if (!name) return;
      if (state.project.fields.some((field) => field.name === name)) {
        toast(t("toast.fieldDup"));
        return;
      }
      state.project.fields.push({ name: name });
      for (const item of state.project.items) item.fields[name] = item.fields[name] || "";
      input.value = "";
      scheduleSave();
      paintFields();
      paintForm();
    });
    add.append(input, button);
    pop.append(add);
    pop.hidden = !state.fieldsOpen;
  }

  function renameField(oldName, raw, input) {
    const name = raw.trim();
    if (!name || name === oldName) {
      input.value = oldName;
      return;
    }
    if (state.project.fields.some((field) => field.name === name)) {
      toast(t("toast.fieldDup"));
      input.value = oldName;
      return;
    }
    const field = state.project.fields.find((entry) => entry.name === oldName);
    field.name = name;
    for (const item of state.project.items) {
      if (Object.prototype.hasOwnProperty.call(item.fields, oldName)) {
        item.fields[name] = item.fields[oldName];
        delete item.fields[oldName];
      }
    }
    if (state.project.site.groupField === oldName) state.project.site.groupField = name;
    if (state.project.site.orderField === oldName) state.project.site.orderField = name;
    scheduleSave();
    paintForm();
  }

  function bindContent() {
    document.getElementById("add-sample").addEventListener("click", () => toggleSamples());
    document.getElementById("import-images").addEventListener("click", () => document.getElementById("file-images").click());
    document.getElementById("import-dir").addEventListener("click", () => document.getElementById("file-dir").click());
    document.getElementById("import-csv").addEventListener("click", () => document.getElementById("file-csv").click());
    document.getElementById("csv-template").addEventListener("click", downloadTemplate);
    document.getElementById("add-item").addEventListener("click", () => {
      const fields = {};
      for (const field of state.project.fields) fields[field.name] = "";
      const item = { id: nextItemId(), title: "", body: "", cover: "", gallery: [], fields: fields, notes: { extra1: "", extra2: "", extra3: "" }, layout: null, sample: false };
      state.project.items.push(item);
      state.selectedId = item.id;
      scheduleSave();
      paintContent();
    });
    document.getElementById("field-toggle").addEventListener("click", () => {
      state.fieldsOpen = !state.fieldsOpen;
      const pop = document.getElementById("fields-pop");
      const button = document.getElementById("field-toggle");
      pop.hidden = !state.fieldsOpen;
      button.setAttribute("aria-expanded", state.fieldsOpen ? "true" : "false");
    });
    document.getElementById("clear-all").addEventListener("click", async () => {
      if (!state.project.items.length) return;
      if (!confirm(t("confirm.clear"))) return;
      state.project.items = [];
      state.selectedId = null;
      await gcAssets();
      scheduleSave();
      paintContent();
      toast(t("toast.cleared"));
    });
  }

  function previewModeButton(mode, label) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn";
    button.textContent = label;
    button.setAttribute("aria-pressed", state.previewDevice === mode ? "true" : "false");
    button.addEventListener("click", () => {
      if (state.previewDevice === mode) return;
      state.previewDevice = mode;
      paintPreview();
    });
    return button;
  }

  function paintPreview() {
    document.getElementById("panel").innerHTML = "";
    const stage = document.getElementById("stage");
    stage.replaceChildren();
    const bar = document.createElement("div");
    bar.className = "preview-bar";
    const note = document.createElement("span");
    note.textContent = t("preview.note");
    bar.append(previewModeButton("desk", t("preview.desk")), previewModeButton("phone", t("preview.phone")), note);
    const frame = document.createElement("div");
    frame.className = "preview-stage";
    frame.dataset.mode = state.previewDevice === "phone" ? "phone" : "desk";
    const shell = document.createElement("div");
    shell.className = "phone-shell";
    const slot = document.createElement("div");
    slot.id = "preview-slot";
    shell.append(slot);
    frame.append(shell);
    stage.append(bar, frame);
    Catalog.render(slot, state.project, {
      isolate: true,
      resolve: resolveAsset,
      openId: state.previewId,
      filters: state.filters,
      onNavigate: (id) => {
        state.previewId = id;
        paintPreview();
      }
    });
  }

  function onKey(event) {
    if (event.key === "Escape") {
      const guide = document.getElementById("guide");
      if (guide && !guide.hidden) {
        closeGuide();
        return;
      }
    }
    const api = state.board;
    if (!api) return;
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON" || tag === "A") return;
    if (event.key === "v" || event.key === "V") {
      setTool("select");
      return;
    }
    if (event.key === "m" || event.key === "M") {
      setTool("move");
      return;
    }
    const region = api.layout.regions.find((entry) => entry.id === state.regionId);
    if (!region) return;
    const step = event.shiftKey ? 2 : 0.5;
    if (event.key === "ArrowLeft") region.x = snap(clamp(region.x - step, 0, 100 - region.w));
    else if (event.key === "ArrowRight") region.x = snap(clamp(region.x + step, 0, 100 - region.w));
    else if (event.key === "ArrowUp") region.y = snap(clamp(region.y - step, 0, 100 - region.h));
    else if (event.key === "ArrowDown") region.y = snap(clamp(region.y + step, 0, 100 - region.h));
    else return;
    event.preventDefault();
    api.place(region);
    api.overlap();
    api.hud(region);
    scheduleSave();
  }

  async function readTextSmart(file) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    try {
      return new TextDecoder("utf-8", { fatal: true }).decode(bytes).replace(/^\uFEFF/, "");
    } catch (err) {
      try {
        return new TextDecoder("gbk").decode(bytes).replace(/^\uFEFF/, "");
      } catch (err2) {
        return new TextDecoder("utf-8").decode(bytes).replace(/^\uFEFF/, "");
      }
    }
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let quoted = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (quoted) {
        if (ch === '"') {
          if (text[i + 1] === '"') { cell += '"'; i += 1; }
          else quoted = false;
        } else cell += ch;
      } else if (ch === '"') quoted = true;
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
      else if (ch !== "\r") cell += ch;
    }
    if (cell.length || row.length) { row.push(cell); rows.push(row); }
    return rows.filter((entry) => entry.some((value) => String(value).trim() !== ""));
  }

  function headerKind(name) {
    const key = String(name || "").trim().toLowerCase();
    if (key === "文件名" || key === "filename" || key === "file") return "file";
    if (key === "标题" || key === "title") return "title";
    if (key === "简介" || key === "body" || key === "description") return "body";
    if (key === "细节图" || key === "gallery") return "gallery";
    return "field";
  }

  async function importFileList(fileList) {
    const files = [...fileList].filter(Boolean);
    const images = [];
    let csv = null;
    for (const file of files) {
      if (/\.csv$/i.test(file.name) || file.type === "text/csv") {
        if (!csv) csv = file;
        continue;
      }
      if (file.type.startsWith("image/") || /\.(jpe?g|png|webp|gif)$/i.test(file.name)) images.push(file);
    }
    if (!images.length && !csv) {
      toast(t("toast.noFiles"));
      return;
    }
    images.sort((a, b) => a.name.localeCompare(b.name, "zh"));
    const byName = new Map();
    for (const image of images) {
      byName.set(image.name.toLowerCase(), image);
      const stem = image.name.replace(/\.[^.]+$/, "").toLowerCase();
      if (!byName.has(stem)) byName.set(stem, image);
    }
    const used = new Set();
    function take(raw) {
      if (!raw) return null;
      const base = String(raw).trim().toLowerCase().replace(/^.*[\\/]/, "");
      if (!base) return null;
      const stem = base.replace(/\.[^.]+$/, "");
      const file = byName.get(base) || byName.get(stem);
      if (!file || used.has(file)) return null;
      used.add(file);
      return file;
    }
    const fresh = [];
    let missingCover = 0;
    if (csv) {
      const table = parseCsv(await readTextSmart(csv));
      if (table.length) {
        const header = table[0].map((cell) => cell.trim());
        const kinds = header.map(headerKind);
        for (const kind of kinds) {
          if (kind !== "field") continue;
        }
        header.forEach((name, index) => {
          if (kinds[index] !== "field") return;
          const fieldName = name.trim();
          if (!fieldName) return;
          if (!state.project.fields.some((field) => field.name === fieldName)) {
            state.project.fields.push({ name: fieldName });
          }
        });
        for (const record of table.slice(1)) {
          const data = { file: "", title: "", body: "", gallery: "" };
          const fields = {};
          header.forEach((name, index) => {
            const value = record[index] == null ? "" : String(record[index]);
            if (kinds[index] === "field") fields[name.trim()] = value.trim();
            else data[kinds[index]] = value.trim();
          });
          const item = blankItem();
          item.title = data.title || stemTitle(data.file);
          item.body = data.body;
          for (const field of state.project.fields) item.fields[field.name] = fields[field.name] || "";
          const coverFile = take(data.file);
          if (data.file && !coverFile) missingCover += 1;
          if (coverFile) item.cover = await storeBlob(coverFile, assetExt(coverFile.name));
          const galleryNames = data.gallery.split(/[;；]/).map((part) => part.trim()).filter(Boolean);
          for (const galleryName of galleryNames) {
            const file = take(galleryName);
            if (file) item.gallery.push(await storeBlob(file, assetExt(file.name)));
          }
          if (!item.title) item.title = item.cover ? stemTitle(coverFile?.name) : "未命名";
          fresh.push(item);
        }
      }
    }
    for (const image of images) {
      if (used.has(image)) continue;
      const item = blankItem();
      item.title = stemTitle(image.name);
      item.cover = await storeBlob(image, assetExt(image.name));
      fresh.push(item);
    }
    if (!fresh.length) {
      toast(t("toast.csvEmpty"));
      return;
    }
    state.project.items.push(...fresh);
    state.selectedId = fresh[0].id;
    await persistProject();
    paintContent();
    toast(missingCover ? t("toast.importedMissing", { n: fresh.length, missing: missingCover }) : t("toast.imported", { n: fresh.length }));
  }

  function blankItem() {
    const fields = {};
    for (const field of state.project.fields) fields[field.name] = "";
    return { id: nextItemId(), title: "", body: "", cover: "", gallery: [], fields: fields, notes: { extra1: "", extra2: "", extra3: "" }, layout: null, sample: false };
  }

  function stemTitle(name) {
    return String(name || "").replace(/^.*[\\/]/, "").replace(/\.[^.]+$/, "") || "未命名";
  }

  function downloadTemplate() {
    const headers = ["文件名", "标题", "简介", "细节图"].concat(state.project.fields.map((field) => field.name));
    const sample = ["red.jpg", "赤色舞台服", "一句介绍", "red-back.jpg"];
    for (const field of state.project.fields) sample.push(field.name === "年份" ? "2024" : "示例");
    const csv = "\uFEFF" + headers.join(",") + "\n" + sample.join(",") + "\n";
    downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), t("file.csv"));
  }

  async function makeSampleItem() {
    await document.fonts.ready;
    const spec = SAMPLES[0];
    const cover = await drawCostume(spec, "1");
    const item = blankItem();
    item.sample = true;
    item.title = "【图鉴示例】";
    item.body = "【填写简单介绍】";
    item.cover = await storeBlob(cover, "jpg");
    if (state.project.fields.some((field) => field.name === "分组")) item.fields["分组"] = "【填写分组关键词】";
    if (state.project.fields.some((field) => field.name === "年份")) item.fields["年份"] = spec.year;
    return item;
  }

  async function toggleSamples() {
    if (state.project.items.some((item) => item.sample)) {
      state.project.items = state.project.items.filter((item) => !item.sample);
      if (!currentItem()) state.selectedId = state.project.items[0]?.id || null;
      await gcAssets();
      await persistProject();
      paintContent();
      toast(t("toast.sampleGone"));
      return;
    }
    toast(t("toast.sampleDraw"));
    const item = await makeSampleItem();
    state.project.items.push(item);
    state.selectedId = item.id;
    await persistProject();
    paintContent();
    toast(t("toast.sampleIn", { n: 1 }));
  }

  function drawCostume(spec, mark) {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 860;
    const g = canvas.getContext("2d");
    const bg = g.createLinearGradient(0, 0, 0, 860);
    bg.addColorStop(0, spec.wall);
    bg.addColorStop(1, spec.floor);
    g.fillStyle = bg;
    g.fillRect(0, 0, 640, 860);
    const spot = g.createRadialGradient(320, 260, 30, 320, 300, 360);
    spot.addColorStop(0, "rgba(255,255,255,.26)");
    spot.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = spot;
    g.fillRect(0, 0, 640, 860);
    g.fillStyle = "rgba(0,0,0,.18)";
    g.beginPath();
    g.ellipse(320, 780, 160, 18, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = spec.cloth;
    g.beginPath();
    if (spec.shape === "flare") {
      g.moveTo(230, 188);
      g.bezierCurveTo(250, 176, 390, 176, 410, 188);
      g.lineTo(548, 690);
      g.quadraticCurveTo(320, 760, 92, 690);
    } else if (spec.shape === "column") {
      g.moveTo(236, 186);
      g.lineTo(404, 186);
      g.lineTo(424, 730);
      g.lineTo(216, 730);
    } else {
      g.moveTo(150, 230);
      g.lineTo(236, 184);
      g.lineTo(404, 184);
      g.lineTo(490, 230);
      g.lineTo(452, 700);
      g.lineTo(188, 700);
    }
    g.closePath();
    g.fill();
    g.strokeStyle = "rgba(0,0,0,.16)";
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(320, 220);
    g.lineTo(spec.shape === "flare" ? 300 : 318, 680);
    g.stroke();
    g.fillStyle = spec.trim;
    g.fillRect(214, spec.band, 212, 26);
    g.fillStyle = spec.wall;
    g.beginPath();
    g.ellipse(320, 186, 42, 26, 0, 0, Math.PI);
    g.fill();
    g.fillStyle = spec.trim;
    g.beginPath();
    g.moveTo(320, 236);
    g.lineTo(336, 256);
    g.lineTo(320, 276);
    g.lineTo(304, 256);
    g.closePath();
    g.fill();
    g.strokeStyle = "rgba(255,255,255,.86)";
    g.lineWidth = 8;
    g.lineCap = "round";
    g.lineJoin = "round";
    g.beginPath();
    g.arc(320, 108, 20, Math.PI * 1.08, Math.PI * 1.92, true);
    g.moveTo(176, 176);
    g.lineTo(320, 128);
    g.lineTo(464, 176);
    g.stroke();
    g.fillStyle = "rgba(0,0,0,.38)";
    g.fillRect(28, 36, 108, 42);
    g.fillStyle = "#fff";
    g.font = '500 22px "IBM Plex Mono", sans-serif';
    g.fillText(mark, 40, 64);
    return blobOf(canvas);
  }

  function drawSwatch(spec) {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 800;
    const g = canvas.getContext("2d");
    g.fillStyle = spec.cloth;
    g.fillRect(0, 0, 800, 800);
    g.strokeStyle = spec.trim;
    g.lineWidth = 16;
    for (let i = -800; i < 1600; i += 64) {
      g.beginPath();
      g.moveTo(i, 0);
      g.lineTo(i + 520, 800);
      g.stroke();
    }
    g.fillStyle = "rgba(0,0,0,.35)";
    g.fillRect(28, 32, 132, 48);
    g.fillStyle = "#fff";
    g.font = '500 28px "Noto Sans SC", sans-serif';
    g.fillText("细节", 48, 66);
    return blobOf(canvas);
  }

  function blobOf(canvas) {
    return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.84));
  }

  async function filesFromDrop(dataTransfer) {
    const items = [...dataTransfer.items || []];
    const entries = [];
    const loose = [];
    for (const item of items) {
      const entry = item.webkitGetAsEntry && item.webkitGetAsEntry();
      if (entry) entries.push(entry);
      else if (item.getAsFile) {
        const file = item.getAsFile();
        if (file) loose.push(file);
      }
    }
    async function readAll(reader) {
      const all = [];
      while (true) {
        const batch = await new Promise((resolve, reject) => reader.readEntries(resolve, reject));
        if (!batch.length) break;
        all.push(...batch);
      }
      return all;
    }
    async function walk(entry, out) {
      if (entry.isFile) {
        out.push(await new Promise((resolve, reject) => entry.file(resolve, reject)));
      } else if (entry.isDirectory) {
        const children = await readAll(entry.createReader());
        for (const child of children) await walk(child, out);
      }
    }
    const out = loose.slice();
    for (const entry of entries) await walk(entry, out);
    return out.length ? out : [...dataTransfer.files];
  }

  function downloadBlob(blob, filename) {
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 2500);
  }

  function safeTitle() {
    return (state.project.site.title || "图鉴").replace(/[\\/:*?"<>|]/g, "").trim() || "图鉴";
  }

  async function exportSite() {
    await persistProject();
    let css = "";
    let js = "";
    try {
      css = await fetch("catalog.css").then((res) => {
        if (!res.ok) throw new Error("css");
        return res.text();
      });
      js = await fetch("catalog.js").then((res) => {
        if (!res.ok) throw new Error("js");
        return res.text();
      });
    } catch (err) {
      toast(t("toast.noFilesRead"));
      return;
    }
    const published = clone(state.project);
    delete published.nextId;
    delete published.nextAsset;
    const files = [];
    for (const item of published.items) {
      item.cover = item.cover ? "assets/" + item.cover : "";
      item.gallery = (item.gallery || []).map((name) => name ? "assets/" + name : "").filter(Boolean);
    }
    if (published.site.bg && !String(published.site.bg).startsWith("assets/")) {
      published.site.bg = "assets/" + published.site.bg;
    }
    if (published.site.frameImage && !String(published.site.frameImage).startsWith("assets/")) {
      published.site.frameImage = "assets/" + published.site.frameImage;
    }
    if (published.site.visualImage && !String(published.site.visualImage).startsWith("assets/")) {
      published.site.visualImage = "assets/" + published.site.visualImage;
    }
    const json = JSON.stringify(published).replace(/</g, "\\u003c");
    const html =
      "<!DOCTYPE html><html lang=\"zh-CN\"><head><meta charset=\"utf-8\">" +
      "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" +
      "<title>" + escapeHtml(published.site.title || "图鉴") + "</title>" +
      '<link rel="icon" href="icon.png">' +
      '<link rel="preconnect" href="https://fonts.googleapis.com">' +
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
      '<link href="' + FONT_HREF + '" rel="stylesheet">' +
      '<link rel="stylesheet" href="catalog.css"></head><body><div id="app"></div>' +
      "<script>window.CATALOG_DATA=" + json + ";</" + "script>" +
      '<script src="catalog.js"></' + "script></body></html>";
    const encoder = new TextEncoder();
    files.push({ name: "index.html", data: encoder.encode(html) });
    files.push({ name: "catalog.css", data: encoder.encode(css) });
    files.push({ name: "catalog.js", data: encoder.encode(js) });
    try {
      const iconRes = await fetch("icon.png");
      if (iconRes.ok) files.push({ name: "icon.png", data: new Uint8Array(await iconRes.arrayBuffer()) });
    } catch (err) {}
    for (const [name, blob] of state.assets) {
      if (!referencedAssets().has(name)) continue;
      files.push({ name: "assets/" + name, data: new Uint8Array(await blob.arrayBuffer()) });
    }
    const zip = CatalogZip.buildZip(files);
    downloadBlob(new Blob([zip], { type: "application/zip" }), safeTitle() + t("file.site"));
    toast(t("toast.exported"));
    openGuide(0, "deploy");
  }

  async function saveBackup() {
    await persistProject();
    const encoder = new TextEncoder();
    const files = [{ name: "project.json", data: encoder.encode(JSON.stringify(state.project)) }];
    for (const [name, blob] of state.assets) {
      if (!referencedAssets().has(name)) continue;
      files.push({ name: "assets/" + name, data: new Uint8Array(await blob.arrayBuffer()) });
    }
    const zip = CatalogZip.buildZip(files);
    downloadBlob(new Blob([zip], { type: "application/zip" }), safeTitle() + t("file.backup"));
    toast(t("toast.backupSaved"));
  }

  async function openBackup(file) {
    const files = CatalogZip.readZip(new Uint8Array(await file.arrayBuffer()));
    const raw = files.get("project.json");
    if (!raw) {
      toast(t("toast.notBackup"));
      return;
    }
    const parsed = JSON.parse(new TextDecoder().decode(raw));
    const project = normalize(parsed);
    for (const key of [...state.assets.keys()]) {
      const url = state.urls.get(key);
      if (url) URL.revokeObjectURL(url);
    }
    state.urls.clear();
    state.assets.clear();
    if (!state.memory) {
      const database = await db();
      await new Promise((resolve, reject) => {
        const tx = database.transaction("assets", "readwrite");
        tx.objectStore("assets").clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    }
    const stored = [];
    for (const [name, bytes] of files) {
      if (!name.startsWith("assets/")) continue;
      const base = name.slice("assets/".length);
      const type = base.endsWith(".png") ? "image/png" : base.endsWith(".webp") ? "image/webp" : base.endsWith(".gif") ? "image/gif" : "image/jpeg";
      const blob = new Blob([bytes], { type: type });
      state.assets.set(base, blob);
      stored.push([base, blob]);
    }
    state.project = project;
    state.selectedId = project.items[0]?.id || null;
    state.previewId = null;
    await persistAssets(stored);
    await persistProject();
    showTab(state.tab);
    toast(t("toast.backupOpen"));
  }

  let guideKind = "deploy";
  let guidePage = 0;

  function guidePages() {
    const prefix = guideKind === "help" ? "help" : "guide";
    return [1, 2, 3, 4].map((n) => ({
      title: t(prefix + "." + n + ".title"),
      body: t(prefix + "." + n + ".body")
    }));
  }

  function openGuide(page, kind) {
    const guide = document.getElementById("guide");
    if (!guide) return;
    if (kind) guideKind = kind;
    const pages = guidePages();
    guidePage = clamp(page, 0, pages.length - 1);
    document.getElementById("guide-title").textContent = pages[guidePage].title;
    document.getElementById("guide-count").textContent = (guidePage + 1) + " / " + pages.length;
    document.getElementById("guide-body").innerHTML = pages[guidePage].body;
    document.getElementById("guide-prev").disabled = guidePage === 0;
    document.getElementById("guide-next").textContent = guidePage === pages.length - 1 ? t("guide.done") : t("guide.next");
    guide.hidden = false;
  }

  function closeGuide() {
    const guide = document.getElementById("guide");
    if (guide) guide.hidden = true;
  }

  function applyZoom() {
    const node = document.querySelector("#look-host .board-column, #look-host .page-column, #item-board .board-column");
    if (node) {
      node.style.transform = "scale(" + state.zoom + ")";
      node.style.transformOrigin = "center center";
    }
    const canvas = node && node.closest(".light-table, .item-board");
    if (!canvas) return;
    let chip = canvas.querySelector(":scope > .zoom-chip");
    if (!chip) {
      chip = document.createElement("button");
      chip.type = "button";
      chip.className = "zoom-chip";
      chip.title = t("zoom.title");
      chip.addEventListener("click", () => {
        state.zoom = 1;
        applyZoom();
      });
      canvas.append(chip);
    }
    chip.textContent = Math.round(state.zoom * 100) + "%";
  }

  function onZoomWheel(event) {
    if (state.tab === "preview") return;
    if (!event.target.closest(".light-table, .item-board")) return;
    if (event.target.closest("input, textarea, select, .float-bar, .zoom-chip")) return;
    event.preventDefault();
    const factor = event.deltaY < 0 ? 1.08 : 1 / 1.08;
    state.zoom = clamp(Math.round(state.zoom * factor * 1000) / 1000, 0.35, 2.4);
    applyZoom();
  }

  function bindStatic() {
    document.getElementById("studio").innerHTML = shell();
    applyChrome();
    document.getElementById("lang-toggle").addEventListener("click", () => {
      StudioLang.setLang(StudioLang.getLang() === "en" ? "zh" : "en");
      applyChrome();
      if (!document.getElementById("guide").hidden) openGuide(guidePage);
      showTab(state.tab);
    });
    for (const button of document.querySelectorAll("[data-tab-btn]")) {
      button.addEventListener("click", () => showTab(button.dataset.tabBtn));
    }
    document.getElementById("export-site").addEventListener("click", () => exportSite().catch((err) => toast(err.message || t("toast.exportFail"))));
    document.getElementById("open-help").addEventListener("click", () => openGuide(0, "help"));
    document.getElementById("open-guide").addEventListener("click", () => openGuide(0, "deploy"));
    document.getElementById("open-tip").addEventListener("click", () => {
      document.getElementById("tip").hidden = false;
    });
    document.getElementById("tip-close").addEventListener("click", () => {
      document.getElementById("tip").hidden = true;
    });
    document.getElementById("tip").addEventListener("click", (event) => {
      if (event.target.id === "tip") document.getElementById("tip").hidden = true;
    });
    document.getElementById("guide-close").addEventListener("click", closeGuide);
    document.getElementById("guide-prev").addEventListener("click", () => openGuide(guidePage - 1));
    document.getElementById("guide-next").addEventListener("click", () => {
      if (guidePage >= guidePages().length - 1) closeGuide();
      else openGuide(guidePage + 1);
    });
    document.getElementById("guide").addEventListener("click", (event) => {
      if (event.target.id === "guide") closeGuide();
    });
    document.getElementById("stage").addEventListener("wheel", onZoomWheel, { passive: false });
    document.getElementById("save-backup").addEventListener("click", () => saveBackup().catch((err) => toast(err.message || t("toast.backupFail"))));
    document.getElementById("open-backup").addEventListener("click", () => document.getElementById("file-backup").click());
    document.getElementById("file-backup").addEventListener("change", async (event) => {
      const file = event.target.files && event.target.files[0];
      event.target.value = "";
      if (!file) return;
      try { await openBackup(file); }
      catch (err) { toast(err.message || t("toast.backupBad")); }
    });
    document.getElementById("file-images").addEventListener("change", (event) => consumeFiles(event.target));
    document.getElementById("file-dir").addEventListener("change", (event) => consumeFiles(event.target));
    document.getElementById("file-csv").addEventListener("change", (event) => consumeFiles(event.target));
    document.getElementById("file-cover").addEventListener("change", async (event) => {
      const file = event.target.files && event.target.files[0];
      event.target.value = "";
      const item = currentItem();
      if (!file || !item) return;
      item.cover = await storeBlob(file, assetExt(file.name));
      await gcAssets();
      scheduleSave();
      paintList();
      paintForm();
    });
    document.getElementById("file-gallery").addEventListener("change", async (event) => {
      const files = [...(event.target.files || [])];
      event.target.value = "";
      const item = currentItem();
      if (!item || !files.length) return;
      for (const file of files) item.gallery.push(await storeBlob(file, assetExt(file.name)));
      scheduleSave();
      paintForm();
    });
    const stage = document.getElementById("stage");
    stage.addEventListener("dragover", (event) => {
      if (state.tab !== "content") return;
      event.preventDefault();
      stage.classList.add("dropping");
    });
    stage.addEventListener("dragleave", () => stage.classList.remove("dropping"));
    stage.addEventListener("drop", async (event) => {
      if (state.tab !== "content") return;
      event.preventDefault();
      stage.classList.remove("dropping");
      const files = await filesFromDrop(event.dataTransfer);
      await importFileList(files);
    });
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", (event) => {
      if (!state.fieldsOpen) return;
      const pop = document.getElementById("fields-pop");
      const button = document.getElementById("field-toggle");
      if (!pop || pop.contains(event.target) || button.contains(event.target)) return;
      state.fieldsOpen = false;
      pop.hidden = true;
      button.setAttribute("aria-expanded", "false");
    });
  }

  function consumeFiles(input) {
    const files = [...(input.files || [])];
    input.value = "";
    if (!files.length) return;
    importFileList(files).catch((err) => toast(err.message || t("toast.importFail")));
  }

  function welcomeNeeded() {
    try { return localStorage.getItem("catalog-studio-welcomed") !== "1"; }
    catch (err) { return false; }
  }

  function markWelcomed() {
    try { localStorage.setItem("catalog-studio-welcomed", "1"); }
    catch (err) { /* 隐私模式可能拒绝写入 */ }
  }

  async function init() {
    bindStatic();
    let fresh = false;
    try {
      const saved = await idbGet("kv", "project");
      if (saved) {
        state.project = normalize(saved);
        state.assets = await loadAssets();
      } else {
        fresh = true;
        state.project = defaultProject();
        state.assets = new Map();
        const item = await makeSampleItem();
        state.project.items = [item];
        state.selectedId = item.id;
        await persistProject();
      }
    } catch (err) {
      state.memory = true;
      if (!state.project) state.project = defaultProject();
      toast(t("toast.memory"));
    }
    if (location.protocol === "file:") {
      toast(t("toast.fileProtocol"));
    }
    Catalog.applyUserCss(state.project);
    showTab("cabinet");
    if (welcomeNeeded()) {
      markWelcomed();
      openGuide(0, "help");
    }
  }

  init();
})();
