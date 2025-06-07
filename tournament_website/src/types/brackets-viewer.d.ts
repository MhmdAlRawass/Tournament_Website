declare module 'brackets-viewer/dist/viewer' {
  export class Viewer {
    constructor(config: { selectorId: string });
    render(data: any): void;
  }
}
