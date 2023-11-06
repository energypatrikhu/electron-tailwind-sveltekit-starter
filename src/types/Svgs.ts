import type { availableSvgs } from '$libs/functions/__svg';

export type SvgSrcFolder = keyof typeof availableSvgs;
export type SvgSrcFolderIcons = (typeof availableSvgs)[SvgSrcFolder][number];
export type SvgSrc = `${SvgSrcFolder}/${SvgSrcFolderIcons}`;
