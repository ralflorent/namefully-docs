import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Many input shapes',
    icon: '/img/json.svg',
    description: (
      <>
        Strings, arrays, JSON objects, <code>Name</code> instances, or a builder you fill in
        on the fly. Give it whatever shape your data already has — namefully meets you where
        you are.
      </>
    ),
  },
  {
    title: 'Shape it as you like',
    icon: '/img/code-school.svg',
    description: (
      <>
        Reorder, abbreviate, format with a tiny token DSL, drop the suffix, salute someone
        formally, or zip a long name down to initials. The output is up to you.
      </>
    ),
  },
  {
    title: 'Ports and wrappers',
    icon: '/img/react.svg',
    description: (
      <>
        First-class TypeScript on npm and JSR, with wrappers for React and Angular, and ports
        in Python, Go, and Dart. Pick the runtime, keep the model.
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={icon} className={styles.featureIcon} alt="" role="presentation" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
