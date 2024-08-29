import { ReactNode } from 'react';
import classes from './PageContent.module.css';

interface PageInterface{
  title: string;
  children: ReactNode
}

function PageContent({ title, children }: PageInterface) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
