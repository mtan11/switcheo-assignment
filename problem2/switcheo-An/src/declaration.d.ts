declare module '*.webp';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
}
