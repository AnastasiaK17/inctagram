import React from 'react';
import ContentLoader from 'react-content-loader';

export const Loader = () => {
  return (
    <ContentLoader
      backgroundColor={'#4c4c4c'}
      foregroundColor={'#0d0d0d'}
      height={600}
      speed={2}
      viewBox={'0 0 972 600'}
      width={972}
    >
      <circle cx={'96'} cy={'120'} r={'96'} />
      <rect height={'36'} rx={'2'} ry={'2'} width={'192'} x={'0'} y={'240'} />
      <rect height={'60'} rx={'2'} ry={'2'} width={'740'} x={'216'} y={'24'} />
      <rect height={'60'} rx={'2'} ry={'2'} width={'740'} x={'216'} y={'108'} />
      <rect height={'60'} rx={'2'} ry={'2'} width={'740'} x={'216'} y={'192'} />
      <rect height={'60'} rx={'2'} ry={'2'} width={'740'} x={'216'} y={'276'} />
      <rect height={'60'} rx={'2'} ry={'2'} width={'358'} x={'216'} y={'360'} />
      <rect height={'60'} rx={'2'} ry={'2'} width={'358'} x={'598'} y={'360'} />
      <rect height={'108'} rx={'2'} ry={'2'} width={'740'} x={'216'} y={'444'} />
    </ContentLoader>
  );
};
