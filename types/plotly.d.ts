declare module 'plotly.js-dist-min' {
  const Plotly: {
    newPlot: (element: HTMLElement, data: unknown[], layout: unknown, config?: unknown) => Promise<void>;
    react: (element: HTMLElement, data: unknown[], layout: unknown, config?: unknown) => Promise<void>;
    purge: (element: HTMLElement) => void;
  };
  export default Plotly;
}

interface Document {
  modelContext?: {
    registerTool: (
      tool: {
        name: string;
        title?: string;
        description: string;
        inputSchema: object;
        annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean };
        execute: (input: unknown) => unknown | Promise<unknown>;
      },
      options?: { signal?: AbortSignal },
    ) => void | Promise<void>;
  };
}
