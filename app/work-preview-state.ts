import type { WorkProject } from '../content/work-showcase';

export type WorkFrame = { key: number; project: WorkProject };

export type WorkPreviewState = {
  requestedId: string;
  nextKey: number;
  visible: WorkFrame | null;
  pending: WorkFrame | null;
  leaving: WorkFrame | null;
};

export type WorkPreviewAction =
  | { type: 'select'; project: WorkProject }
  | { type: 'ready'; key: number }
  | { type: 'settled'; key: number };

export function createWorkPreview(project: WorkProject): WorkPreviewState {
  return {
    requestedId: project.id,
    nextKey: 1,
    visible: null,
    pending: { key: 0, project },
    leaving: null,
  };
}

// Only the currently requested frame may take the stage. Request keys also
// reject late load events from an earlier visit to the same project.
export function workPreviewReducer(state: WorkPreviewState, action: WorkPreviewAction): WorkPreviewState {
  switch (action.type) {
    case 'select':
      if (action.project.id === state.requestedId) return state;
      return {
        ...state,
        requestedId: action.project.id,
        nextKey: state.nextKey + 1,
        pending: state.visible?.project.id === action.project.id
          ? null
          : { key: state.nextKey, project: action.project },
        leaving: null,
      };
    case 'ready':
      if (action.key !== state.pending?.key) return state;
      return { ...state, visible: state.pending, leaving: state.visible, pending: null };
    case 'settled':
      return action.key === state.leaving?.key ? { ...state, leaving: null } : state;
  }
}
