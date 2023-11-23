import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { GetStaticProps } from 'next';
import SVG from 'react-inlinesvg';
import Image from 'next/image';
import { icons } from '../data/icons';
import IconDetail from './api/icons/[id]';
import { useEffect, useState } from 'react';

interface DataProps {
  id?: string;
  name?: string;
  icon?: string;
  variant?: string;
  category?: string;
}

export default function Home() {
  const [data, setData] = useState<DataProps>();

  useEffect(() => {
    fetch(`/api/icons/100`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data) return <p>No icons data</p>;

  return (
    <Layout home>
      <Head>
        <title>mui icons</title>
      </Head>
      {/* <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>(This is a sample website.)</p>
      </section> */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        {/* <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul> */}

        {/* <SVG style={{ color: 'yellow' }} src={'http://localhost:3001/api/icons/1'} /> */}
        <div key={'img-id'}>
          <strong>icon_id:</strong> {data.id}
        </div>
        <div key={'img-name'}>
          <strong>icon_name: </strong>
          {data.name}
        </div>
        <div key={'img-categor'}>
          <strong>icon_category:</strong> {data.category}
        </div>
        <div key={'img-variant'}>
          <strong>icon_variant:</strong> {data.variant}
        </div>
        <div key={'img-icon'}>
          <strong>icon_icon:</strong>
          <>
            <SVG key={'icon'} src={data.icon !== undefined ? data.icon : ''} />
          </>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
