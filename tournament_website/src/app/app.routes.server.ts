import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'tournament/:id',
    renderMode: RenderMode.Server, // or RenderMode.None to disable prerendering
  },
  {
    path: 'tournament/:id/bracket-view',
    renderMode: RenderMode.Server, // or RenderMode.None to disable prerendering
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
