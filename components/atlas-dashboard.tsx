'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpenCheck,
  ChevronLeft,
  Database,
  Droplets,
  Factory,
  Layers3,
  LogOut,
  Map,
  Mountain,
  Route,
} from 'lucide-react';

type LayerName = 'Community & land' | 'Infrastructure' | 'Water' | 'Subsurface' | 'Opportunities';

const layerOptions: Array<{ name: LayerName; icon: typeof Map; color: string }> = [
  { name: 'Community & land', icon: Map, color: '#c5a059' },
  { name: 'Infrastructure', icon: Route, color: '#c9b299' },
  { name: 'Water', icon: Droplets, color: '#5f9fa0' },
  { name: 'Subsurface', icon: Mountain, color: '#a0522d' },
  { name: 'Opportunities', icon: Factory, color: '#e2b34c' },
];

const featureDetails: Record<string, { type: string; title: string; detail: string; source: string; confidence: string }> = {
  'Community planning area': {
    type: 'Community & land',
    title: 'Illustrative planning area',
    detail: 'A synthetic boundary used to organize evidence around community priorities.',
    source: 'Demonstration geometry',
    confidence: 'Illustrative only',
  },
  'Community centre': {
    type: 'Community & land',
    title: 'Community centre',
    detail: 'A reference point for services, access and nearby infrastructure.',
    source: 'Synthetic facility record',
    confidence: 'Illustrative only',
  },
  'Regional access road': {
    type: 'Infrastructure',
    title: 'Regional access road',
    detail: 'A conceptual route connecting the planning area with regional services.',
    source: 'Synthetic infrastructure layer',
    confidence: 'Screening level',
  },
  'Water monitoring point': {
    type: 'Water',
    title: 'Water monitoring point',
    detail: 'A sample location showing where source, date and monitoring history would appear.',
    source: 'Synthetic field observation',
    confidence: 'Additional study needed',
  },
  'Subsurface station': {
    type: 'Subsurface',
    title: 'Subsurface station',
    detail: 'A representative geophysical station used to screen subsurface structure.',
    source: 'Synthetic geophysical survey',
    confidence: 'Preliminary interpretation',
  },
  'Heat opportunity area': {
    type: 'Opportunities',
    title: 'Heat opportunity area',
    detail: 'An indicative area where infrastructure, demand and subsurface evidence could be compared.',
    source: 'Demonstration opportunity model',
    confidence: 'Concept screening',
  },
};

const traceByLayer: Record<LayerName, unknown[]> = {
  'Community & land': [
    {
      type: 'scattermap', mode: 'lines', name: 'Community planning area',
      lon: [-113.72, -113.33, -113.12, -113.29, -113.66, -113.82, -113.72],
      lat: [53.74, 53.82, 53.62, 53.39, 53.36, 53.56, 53.74],
      fill: 'toself', fillcolor: 'rgba(197,160,89,.20)', line: { color: '#c5a059', width: 3 },
      customdata: Array(7).fill('Community planning area'), hovertemplate: 'Illustrative planning area<extra></extra>',
    },
    {
      type: 'scattermap', mode: 'markers+text', name: 'Community centre',
      lon: [-113.49], lat: [53.59], text: ['Community centre'], textposition: 'top right',
      marker: { size: 15, color: '#c5a059' }, textfont: { color: '#ffffff', size: 12 },
      customdata: ['Community centre'], hovertemplate: 'Community centre<extra></extra>',
    },
  ],
  Infrastructure: [
    {
      type: 'scattermap', mode: 'lines', name: 'Regional access road',
      lon: [-113.86, -113.67, -113.51, -113.31, -113.08], lat: [53.43, 53.51, 53.56, 53.62, 53.72],
      line: { color: '#e9ded0', width: 5 }, customdata: Array(5).fill('Regional access road'),
      hovertemplate: 'Regional access road<extra></extra>',
    },
  ],
  Water: [
    {
      type: 'scattermap', mode: 'markers', name: 'Water monitoring point', lon: [-113.59], lat: [53.72],
      marker: { size: 17, color: '#5f9fa0', symbol: 'circle' }, customdata: ['Water monitoring point'],
      hovertemplate: 'Water monitoring point<extra></extra>',
    },
  ],
  Subsurface: [
    {
      type: 'scattermap', mode: 'markers', name: 'Subsurface station',
      lon: [-113.70, -113.38, -113.23], lat: [53.48, 53.73, 53.51],
      marker: { size: 13, color: '#a0522d' }, customdata: Array(3).fill('Subsurface station'),
      hovertemplate: 'Subsurface screening station<extra></extra>',
    },
  ],
  Opportunities: [
    {
      type: 'scattermap', mode: 'markers', name: 'Heat opportunity area', lon: [-113.32], lat: [53.48],
      marker: { size: 32, color: '#e2b34c', opacity: .66 }, customdata: ['Heat opportunity area'],
      hovertemplate: 'Heat opportunity area<extra></extra>',
    },
  ],
};

const defaultLayers: LayerName[] = ['Community & land', 'Infrastructure', 'Water'];

export function AtlasDashboard() {
  const router = useRouter();
  const plotRef = useRef<HTMLDivElement>(null);
  const [layers, setLayers] = useState<LayerName[]>(defaultLayers);
  const [selectedKey, setSelectedKey] = useState('Community planning area');
  const details = featureDetails[selectedKey];
  const traces = useMemo(() => layers.flatMap((layer) => traceByLayer[layer]), [layers]);

  function setLayerState(nextLayers: LayerName[]) {
    const valid = layerOptions.map((item) => item.name).filter((name) => nextLayers.includes(name));
    setLayers(valid);
    return valid;
  }

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();

    try {
      void Promise.resolve(context.registerTool({
        name: 'set_atlas_layers',
        title: 'Set ATLAS map layers',
        description: 'Show a selected set of illustrative evidence layers in the visible ATLAS map.',
        inputSchema: {
          type: 'object',
          properties: {
            layers: { type: 'array', items: { type: 'string', enum: layerOptions.map((item) => item.name) }, minItems: 1 },
          },
          required: ['layers'],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input) {
          const requested = (input as { layers?: unknown }).layers;
          if (!Array.isArray(requested) || requested.some((item) => typeof item !== 'string')) {
            throw new Error('layers must be an array of valid ATLAS layer names');
          }
          const applied = setLayerState(requested as LayerName[]);
          if (!applied.length) throw new Error('Select at least one valid ATLAS layer');
          return { visibleLayers: applied };
        },
      }, { signal: lifecycle.signal })).catch(() => undefined);
    } catch {
      // Browsers without WebMCP continue to use the visible controls.
    }

    return () => lifecycle.abort();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let plotlyModule: typeof import('plotly.js-dist-min') | null = null;

    async function renderPlot() {
      if (!plotRef.current) return;
      plotlyModule = await import('plotly.js-dist-min');
      if (cancelled || !plotRef.current) return;
      const Plotly = plotlyModule.default;
      await Plotly.react(plotRef.current, traces, {
        autosize: true,
        paper_bgcolor: '#071925',
        plot_bgcolor: '#071925',
        margin: { l: 0, r: 0, t: 0, b: 0 },
        showlegend: false,
        map: { style: 'carto-darkmatter', center: { lon: -113.47, lat: 53.59 }, zoom: 8.35 },
        uirevision: 'dwell-atlas-demo',
      }, {
        responsive: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['lasso2d', 'select2d'],
      });

      const plot = plotRef.current as HTMLDivElement & { on?: (event: string, callback: (data: { points?: Array<{ customdata?: string }> }) => void) => void };
      plot.on?.('plotly_click', (data) => {
        const key = data.points?.[0]?.customdata;
        if (key && featureDetails[key]) setSelectedKey(key);
      });
    }

    void renderPlot();
    return () => { cancelled = true; };
  }, [traces]);

  function toggleLayer(name: LayerName) {
    setLayers((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  }

  async function logout() {
    await fetch('/api/demo-session', { method: 'DELETE' });
    router.push('/');
    router.refresh();
  }

  return (
    <main className="atlas-app">
      <header className="atlas-header">
        <a href="/" className="atlas-brand"><img src="/dwell-logo-clean.png" alt="Dwell" /></a>
        <div className="atlas-title-block">
          <span>Knowledge Keeper ATLAS</span>
          <strong>Illustrative community workspace</strong>
        </div>
        <div className="atlas-session">
          <span className="demo-badge">Demonstration only</span>
          <button type="button" onClick={logout}><LogOut size={16} /> Log out</button>
        </div>
      </header>

      <div className="atlas-layout">
        <aside className="layer-panel" aria-label="Map layers">
          <div className="panel-heading"><Layers3 size={19} /><div><span>Evidence explorer</span><strong>Map layers</strong></div></div>
          <div className="layer-list">
            {layerOptions.map(({ name, icon: Icon, color }) => (
              <label key={name} className={layers.includes(name) ? 'layer-active' : ''}>
                <input type="checkbox" checked={layers.includes(name)} onChange={() => toggleLayer(name)} />
                <Icon aria-hidden="true" size={18} style={{ color }} />
                <span>{name}</span>
              </label>
            ))}
          </div>
          <div className="source-note"><Database size={16} /><p>All features and locations in this prototype are synthetic.</p></div>
          <a href="/" className="back-home"><ChevronLeft size={16} /> Dwell website</a>
        </aside>

        <section className="atlas-map-area" aria-label="Interactive ATLAS demonstration map">
          <div ref={plotRef} className="plotly-map" />
          <div className="map-instruction">Select a layer or map feature to explore the evidence.</div>
        </section>

        <aside className="evidence-panel" aria-live="polite">
          <p className="evidence-label">Selected evidence</p>
          <span className="evidence-type">{details.type}</span>
          <h1>{details.title}</h1>
          <p className="evidence-detail">{details.detail}</p>
          <dl>
            <div><dt>Source</dt><dd>{details.source}</dd></div>
            <div><dt>Confidence</dt><dd>{details.confidence}</dd></div>
            <div><dt>Updated</dt><dd>Prototype dataset</dd></div>
          </dl>
          <div className="decision-note">
            <BookOpenCheck size={20} />
            <div><strong>Decision note</strong><p>Use this evidence to frame questions. Confirm conditions through community direction and appropriate technical study.</p></div>
          </div>
        </aside>
      </div>
    </main>
  );
}
