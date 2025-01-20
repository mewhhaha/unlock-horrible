export namespace JSX {
  export interface HtmxExtensions extends HtmxBuiltinExtensions {}

  // typed-html
  export interface HtmlTag extends HtmxAttributes {}
  export interface HtmlBodyTag {
    onAfterprint?: ((event: Event) => void) | undefined | string;
    onBeforeprint?: ((event: Event) => void) | undefined | string;
    onBeforeonload?: ((event: Event) => void) | undefined | string;
    onBlur?: ((event: Event) => void) | undefined | string;
    onError?: ((event: Event) => void) | undefined | string;
    onFocus?: ((event: Event) => void) | undefined | string;
    onHaschange?: ((event: Event) => void) | undefined | string;
    onLoad?: ((event: Event) => void) | undefined | string;
    onMessage?: ((event: Event) => void) | undefined | string;
    onOffline?: ((event: Event) => void) | undefined | string;
    onOnline?: ((event: Event) => void) | undefined | string;
    onPagehide?: ((event: Event) => void) | undefined | string;
    onPageshow?: ((event: Event) => void) | undefined | string;
    onPopstate?: ((event: Event) => void) | undefined | string;
    onRedo?: ((event: Event) => void) | undefined | string;
    onResize?: ((event: Event) => void) | undefined | string;
    onStorage?: ((event: Event) => void) | undefined | string;
    onUndo?: ((event: Event) => void) | undefined | string;
    onUnload?: ((event: Event) => void) | undefined | string;
  }
  export interface HtmlTag {
    onContextmenu?: ((event: Event) => void) | undefined | string;
    onKeydown?: ((event: Event) => void) | undefined | string;
    onKeypress?: ((event: Event) => void) | undefined | string;
    onKeyup?: ((event: Event) => void) | undefined | string;
    onClick?: ((event: Event) => void) | undefined | string;
    onDblclick?: ((event: Event) => void) | undefined | string;
    onDrag?: ((event: Event) => void) | undefined | string;
    onDragend?: ((event: Event) => void) | undefined | string;
    onDragenter?: ((event: Event) => void) | undefined | string;
    onDragleave?: ((event: Event) => void) | undefined | string;
    onDragover?: ((event: Event) => void) | undefined | string;
    onDragstart?: ((event: Event) => void) | undefined | string;
    onDrop?: ((event: Event) => void) | undefined | string;
    onMousedown?: ((event: Event) => void) | undefined | string;
    onMousemove?: ((event: Event) => void) | undefined | string;
    onMouseout?: ((event: Event) => void) | undefined | string;
    onMouseover?: ((event: Event) => void) | undefined | string;
    onMouseup?: ((event: Event) => void) | undefined | string;
    onMousewheel?: ((event: Event) => void) | undefined | string;
    onScroll?: ((event: Event) => void) | undefined | string;
  }
  export interface FormEvents {
    onBlur?: ((event: Event) => void) | undefined | string;
    onChange?: ((event: Event) => void) | undefined | string;
    onFocus?: ((event: Event) => void) | undefined | string;
    onFormchange?: ((event: Event) => void) | undefined | string;
    onForminput?: ((event: Event) => void) | undefined | string;
    onInput?: ((event: Event) => void) | undefined | string;
    onInvalid?: ((event: Event) => void) | undefined | string;
    onSelect?: ((event: Event) => void) | undefined | string;
    onSubmit?: ((event: Event) => void) | undefined | string;
  }
  export interface HtmlInputTag extends FormEvents {
    onChange?: ((event: Event) => void) | undefined | string;
  }
  export interface HtmlFieldSetTag extends FormEvents {}
  export interface HtmlFormTag extends FormEvents {}
  export interface MediaEvents {
    onAbort?: ((event: Event) => void) | undefined | string;
    onCanplay?: ((event: Event) => void) | undefined | string;
    onCanplaythrough?: ((event: Event) => void) | undefined | string;
    onDurationchange?: ((event: Event) => void) | undefined | string;
    onEmptied?: ((event: Event) => void) | undefined | string;
    onEnded?: ((event: Event) => void) | undefined | string;
    onError?: ((event: Event) => void) | undefined | string;
    onLoadeddata?: ((event: Event) => void) | undefined | string;
    onLoadedmetadata?: ((event: Event) => void) | undefined | string;
    onLoadstart?: ((event: Event) => void) | undefined | string;
    onPause?: ((event: Event) => void) | undefined | string;
    onPlay?: ((event: Event) => void) | undefined | string;
    onPlaying?: ((event: Event) => void) | undefined | string;
    onProgress?: ((event: Event) => void) | undefined | string;
    onRatechange?: ((event: Event) => void) | undefined | string;
    onReadystatechange?: ((event: Event) => void) | undefined | string;
    onSeeked?: ((event: Event) => void) | undefined | string;
    onSeeking?: ((event: Event) => void) | undefined | string;
    onStalled?: ((event: Event) => void) | undefined | string;
    onSuspend?: ((event: Event) => void) | undefined | string;
    onTimeupdate?: ((event: Event) => void) | undefined | string;
    onVolumechange?: ((event: Event) => void) | undefined | string;
    onWaiting?: ((event: Event) => void) | undefined | string;
  }
  export interface HtmlAudioTag extends MediaEvents {}
  export interface HtmlEmbedTag extends MediaEvents {}
  export interface HtmlImageTag extends MediaEvents {}
  export interface HtmlObjectTag extends MediaEvents {}
  export interface HtmlVideoTag extends MediaEvents {}

  export interface HtmlTag {
    accesskey?: string | undefined;
    class?: string | undefined;
    contenteditable?: string | undefined;
    dir?: string | undefined;
    hidden?: string | boolean | undefined;
    id?: string | undefined;
    role?: string | undefined;
    lang?: string | undefined;
    draggable?: string | boolean | undefined;
    spellcheck?: string | boolean | undefined;
    style?: string | undefined;
    tabindex?: string | undefined;
    title?: string | undefined;
    translate?: string | boolean | undefined;
  }
  export interface HtmlAnchorTag extends HtmlTag {
    href?: string | undefined;
    target?: string | undefined;
    download?: string | undefined;
    ping?: string | undefined;
    rel?: string | undefined;
    media?: string | undefined;
    hreflang?: string | undefined;
    type?: string | undefined;
  }
  export interface HtmlAreaTag extends HtmlTag {
    alt?: string | undefined;
    coords?: string | undefined;
    shape?: string | undefined;
    href?: string | undefined;
    target?: string | undefined;
    ping?: string | undefined;
    rel?: string | undefined;
    media?: string | undefined;
    hreflang?: string | undefined;
    type?: string | undefined;
  }
  export interface HtmlAudioTag extends HtmlTag {
    src?: string | undefined;
    autobuffer?: string | undefined;
    autoplay?: string | undefined;
    loop?: string | undefined;
    controls?: string | undefined;
  }
  export interface BaseTag extends HtmlTag {
    href?: string | undefined;
    target?: string | undefined;
  }
  export interface HtmlQuoteTag extends HtmlTag {
    cite?: string | undefined;
  }
  export interface HtmlBodyTag extends HtmlTag {}
  export interface HtmlButtonTag extends HtmlTag {
    action?: string | undefined;
    autofocus?: string | undefined;
    disabled?: string | undefined;
    enctype?: string | undefined;
    form?: string | undefined;
    method?: string | undefined;
    name?: string | undefined;
    novalidate?: string | boolean | undefined;
    target?: string | undefined;
    type?: string | undefined;
    value?: string | undefined;
  }
  export interface HtmlDataListTag extends HtmlTag {}
  export interface HtmlCanvasTag extends HtmlTag {
    width?: string | undefined;
    height?: string | undefined;
  }
  export interface HtmlTableColTag extends HtmlTag {
    span?: string | undefined;
  }
  export interface HtmlTableSectionTag extends HtmlTag {}
  export interface HtmlTableRowTag extends HtmlTag {}
  export interface DataTag extends HtmlTag {
    value?: string | undefined;
  }
  export interface HtmlEmbedTag extends HtmlTag {
    src?: string | undefined;
    type?: string | undefined;
    width?: string | undefined;
    height?: string | undefined;
    [anything: string]: unknown;
  }
  export interface HtmlFieldSetTag extends HtmlTag {
    disabled?: string | undefined;
    form?: string | undefined;
    name?: string | undefined;
  }
  export interface HtmlFormTag extends HtmlTag {
    acceptCharset?: string | undefined;
    action?: string | undefined;
    autocomplete?: string | undefined;
    enctype?: string | undefined;
    method?: string | undefined;
    name?: string | undefined;
    novalidate?: string | boolean | undefined;
    target?: string | undefined;
  }
  export interface HtmlHtmlTag extends HtmlTag {
    manifest?: string | undefined;
  }
  export interface HtmlIFrameTag extends HtmlTag {
    src?: string | undefined;
    srcdoc?: string | undefined;
    name?: string | undefined;
    sandbox?: string | undefined;
    seamless?: string | undefined;
    width?: string | undefined;
    height?: string | undefined;
  }
  export interface HtmlImageTag extends HtmlTag {
    alt?: string | undefined;
    src?: string | undefined;
    crossorigin?: string | undefined;
    usemap?: string | undefined;
    ismap?: string | undefined;
    width?: string | undefined;
    height?: string | undefined;
  }
  export interface HtmlInputTag extends HtmlTag {
    accept?: string | undefined;
    action?: string | undefined;
    alt?: string | undefined;
    autocomplete?: string | undefined;
    autofocus?: string | undefined;
    checked?: string | boolean | undefined;
    disabled?: string | boolean | undefined;
    enctype?: string | undefined;
    form?: string | undefined;
    height?: string | undefined;
    list?: string | undefined;
    max?: string | undefined;
    minlength?: string | undefined;
    maxlength?: string | undefined;
    method?: string | undefined;
    min?: string | undefined;
    multiple?: string | undefined;
    name?: string | undefined;
    novalidate?: string | boolean | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    readonly?: string | undefined;
    required?: boolean | undefined;
    size?: string | undefined;
    src?: string | undefined;
    step?: string | undefined;
    target?: string | undefined;
    type?: string | undefined;
    value?: string | undefined;
    width?: string | undefined;
  }
  export interface HtmlModTag extends HtmlTag {
    cite?: string | undefined;
    datetime?: string | Date | undefined;
  }
  export interface KeygenTag extends HtmlTag {
    autofocus?: string | undefined;
    challenge?: string | undefined;
    disabled?: string | undefined;
    form?: string | undefined;
    keytype?: string | undefined;
    name?: string | undefined;
  }
  export interface HtmlLabelTag extends HtmlTag {
    form?: string | undefined;
    for?: string | undefined;
  }
  export interface HtmlLITag extends HtmlTag {
    value?: string | number | undefined;
  }
  export interface HtmlLinkTag extends HtmlTag {
    href?: string | undefined;
    crossorigin?: string | undefined;
    rel?: string | undefined;
    media?: string | undefined;
    hreflang?: string | undefined;
    type?: string | undefined;
    sizes?: string | undefined;
    integrity?: string | undefined;
  }
  export interface HtmlMapTag extends HtmlTag {
    name?: string | undefined;
  }
  export interface HtmlMetaTag extends HtmlTag {
    name?: string | undefined;
    httpEquiv?: string | undefined;
    content?: string | undefined;
    charset?: string | undefined;
  }
  export interface HtmlMeterTag extends HtmlTag {
    value?: string | number | undefined;
    min?: string | number | undefined;
    max?: string | number | undefined;
    low?: string | number | undefined;
    high?: string | number | undefined;
    optimum?: string | number | undefined;
  }
  export interface HtmlObjectTag extends HtmlTag {
    data?: string | undefined;
    type?: string | undefined;
    name?: string | undefined;
    usemap?: string | undefined;
    form?: string | undefined;
    width?: string | undefined;
    height?: string | undefined;
  }
  export interface HtmlOListTag extends HtmlTag {
    reversed?: string | undefined;
    start?: string | number | undefined;
  }
  export interface HtmlOptgroupTag extends HtmlTag {
    disabled?: string | undefined;
    label?: string | undefined;
  }
  export interface HtmlOptionTag extends HtmlTag {
    disabled?: string | undefined;
    label?: string | undefined;
    selected?: string | undefined;
    value?: string | undefined;
  }
  export interface HtmlOutputTag extends HtmlTag {
    for?: string | undefined;
    form?: string | undefined;
    name?: string | undefined;
  }
  export interface HtmlParamTag extends HtmlTag {
    name?: string | undefined;
    value?: string | undefined;
  }
  export interface HtmlProgressTag extends HtmlTag {
    value?: string | number | undefined;
    max?: string | number | undefined;
  }
  export interface HtmlCommandTag extends HtmlTag {
    type?: string | undefined;
    label?: string | undefined;
    icon?: string | undefined;
    disabled?: string | undefined;
    checked?: string | undefined;
    radiogroup?: string | undefined;
    default?: string | undefined;
  }
  export interface HtmlLegendTag extends HtmlTag {}
  export interface HtmlBrowserButtonTag extends HtmlTag {
    type?: string | undefined;
  }
  export interface HtmlMenuTag extends HtmlTag {
    type?: string | undefined;
    label?: string | undefined;
  }
  export interface HtmlScriptTag extends HtmlTag {
    src?: string | undefined;
    type?: string | undefined;
    charset?: string | undefined;
    async?: string | undefined;
    defer?: string | undefined;
    crossorigin?: string | undefined;
    integrity?: string | undefined;
    text?: string | undefined;
  }
  export interface HtmlDetailsTag extends HtmlTag {
    open?: string | undefined;
  }
  export interface HtmlSelectTag extends HtmlTag {
    autofocus?: string | undefined;
    disabled?: string | undefined;
    form?: string | undefined;
    multiple?: string | undefined;
    name?: string | undefined;
    required?: string | undefined;
    size?: string | undefined;
  }
  export interface HtmlSourceTag extends HtmlTag {
    src?: string | undefined;
    type?: string | undefined;
    media?: string | undefined;
  }
  export interface HtmlStyleTag extends HtmlTag {
    media?: string | undefined;
    type?: string | undefined;
    disabled?: string | undefined;
    scoped?: string | undefined;
  }
  export interface HtmlTableTag extends HtmlTag {}
  export interface HtmlTableDataCellTag extends HtmlTag {
    colspan?: string | number | undefined;
    rowspan?: string | number | undefined;
    headers?: string | undefined;
  }
  export interface HtmlTextAreaTag extends HtmlTag {
    autofocus?: string | undefined;
    cols?: string | undefined;
    dirname?: string | undefined;
    disabled?: string | undefined;
    form?: string | undefined;
    maxlength?: string | undefined;
    minlength?: string | undefined;
    name?: string | undefined;
    placeholder?: string | undefined;
    readonly?: string | undefined;
    required?: string | undefined;
    rows?: string | undefined;
    wrap?: string | undefined;
  }
  export interface HtmlTableHeaderCellTag extends HtmlTag {
    colspan?: string | number | undefined;
    rowspan?: string | number | undefined;
    headers?: string | undefined;
    scope?: string | undefined;
  }
  export interface HtmlTimeTag extends HtmlTag {
    datetime?: string | Date | undefined;
  }
  export interface HtmlTrackTag extends HtmlTag {
    default?: string | undefined;
    kind?: string | undefined;
    label?: string | undefined;
    src?: string | undefined;
    srclang?: string | undefined;
  }
  export interface HtmlVideoTag extends HtmlTag {
    src?: string | undefined;
    poster?: string | undefined;
    autobuffer?: string | undefined;
    autoplay?: string | undefined;
    loop?: string | undefined;
    controls?: string | undefined;
    width?: string | undefined;
    height?: string | undefined;
  }
  export interface HtmlSvgTag extends HtmlTag {
    xmlns?: string | undefined;
    fill?: string | undefined;
    viewBox?: string | undefined;
    "stroke-width"?: string | undefined;
    stroke?: string | undefined;
    class?: string | undefined;
  }
  export interface HtmlPathTag extends HtmlTag {
    "stroke-linecap"?: string | undefined;
    "stroke-linejoin"?: string | undefined;
    d?: string | undefined;
  }

  export type Element = SingleElement;
  export type SingleElement = Promise<string> | string | undefined | null;

  export interface ElementChildrenAttribute {
    children?: Element | Element[];
  }
  export interface IntrinsicElements {
    a: HtmlAnchorTag;
    abbr: HtmlTag;
    address: HtmlTag;
    area: HtmlAreaTag;
    article: HtmlTag;
    aside: HtmlTag;
    audio: HtmlAudioTag;
    b: HtmlTag;
    bb: HtmlBrowserButtonTag;
    base: BaseTag;
    bdi: HtmlTag;
    bdo: HtmlTag;
    blockquote: HtmlQuoteTag;
    body: HtmlBodyTag;
    br: HtmlTag;
    button: HtmlButtonTag;
    canvas: HtmlCanvasTag;
    caption: HtmlTag;
    cite: HtmlTag;
    code: HtmlTag;
    col: HtmlTableColTag;
    colgroup: HtmlTableColTag;
    commands: HtmlCommandTag;
    data: DataTag;
    datalist: HtmlDataListTag;
    dd: HtmlTag;
    del: HtmlModTag;
    details: HtmlDetailsTag;
    dfn: HtmlTag;
    div: HtmlTag;
    dl: HtmlTag;
    dt: HtmlTag;
    em: HtmlTag;
    embed: HtmlEmbedTag;
    fieldset: HtmlFieldSetTag;
    figcaption: HtmlTag;
    figure: HtmlTag;
    footer: HtmlTag;
    form: HtmlFormTag;
    h1: HtmlTag;
    h2: HtmlTag;
    h3: HtmlTag;
    h4: HtmlTag;
    h5: HtmlTag;
    h6: HtmlTag;
    head: HtmlTag;
    header: HtmlTag;
    hr: HtmlTag;
    html: HtmlHtmlTag;
    i: HtmlTag;
    iframe: HtmlIFrameTag;
    img: HtmlImageTag;
    input: HtmlInputTag;
    ins: HtmlModTag;
    kbd: HtmlTag;
    keygen: KeygenTag;
    label: HtmlLabelTag;
    legend: HtmlLegendTag;
    li: HtmlLITag;
    link: HtmlLinkTag;
    main: HtmlTag;
    map: HtmlMapTag;
    mark: HtmlTag;
    menu: HtmlMenuTag;
    meta: HtmlMetaTag;
    meter: HtmlMeterTag;
    nav: HtmlTag;
    noscript: HtmlTag;
    object: HtmlObjectTag;
    ol: HtmlOListTag;
    optgroup: HtmlOptgroupTag;
    option: HtmlOptionTag;
    output: HtmlOutputTag;
    p: HtmlTag;
    param: HtmlParamTag;
    pre: HtmlTag;
    progress: HtmlProgressTag;
    q: HtmlQuoteTag;
    rb: HtmlTag;
    rp: HtmlTag;
    rt: HtmlTag;
    rtc: HtmlTag;
    ruby: HtmlTag;
    s: HtmlTag;
    samp: HtmlTag;
    script: HtmlScriptTag;
    section: HtmlTag;
    select: HtmlSelectTag;
    small: HtmlTag;
    source: HtmlSourceTag;
    span: HtmlTag;
    strong: HtmlTag;
    style: HtmlStyleTag;
    sub: HtmlTag;
    sup: HtmlTag;
    table: HtmlTableTag;
    tbody: HtmlTag;
    td: HtmlTableDataCellTag;
    template: HtmlTag;
    textarea: HtmlTextAreaTag;
    tfoot: HtmlTableSectionTag;
    th: HtmlTableHeaderCellTag;
    thead: HtmlTableSectionTag;
    time: HtmlTimeTag;
    title: HtmlTag;
    tr: HtmlTableRowTag;
    track: HtmlTrackTag;
    u: HtmlTag;
    ul: HtmlTag;
    var: HtmlTag;
    video: HtmlVideoTag;
    wbr: HtmlTag;
    svg: HtmlSvgTag;
    path: HtmlPathTag;
  }
}
