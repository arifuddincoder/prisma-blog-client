import { Navbar } from '@/components/layout/Navbar';
import React from 'react';

const commonLayout = ({children,}:{children:React.ReactNode}) => {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
};

export default commonLayout;