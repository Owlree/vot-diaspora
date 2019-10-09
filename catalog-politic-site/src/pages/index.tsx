import React from 'react';
import cn from 'classnames';
import genericStyles from '../css/generics.module.css';
import styles from './css/index.module.css';

import Logo from '../components/logo';

import { useTranslation } from 'react-i18next';

function IndexPage() {

  // i18next translation hook
  const { t } = useTranslation();

  return (
    <>
      <section className={cn(genericStyles.vdSection, styles.hero)}>
        <div className={genericStyles.catpolRow}>
          <div className={cn(genericStyles.catpolCol12)}>
            <Logo style={{maxWidth: 255, margin: 'auto'}}/>
            <h1>{t('Vot Diaspora')}</h1>
          </div>
        </div>
        <div className={genericStyles.catpolRow}>
          <div
            className={
              cn(genericStyles.catpolCol8, genericStyles.catpolColOffset2)}
            dangerouslySetInnerHTML={{__html: t('HeroBody')}}
          ></div>
        </div>
      </section>
      <section
        className={
          cn(genericStyles.vdSection, genericStyles.vdSectionLight)}
        id='cum-votezi'
        >
        <div className={genericStyles.catpolRow}>
          <div className={genericStyles.catpolCol12}>
            <h2>{t('How to Vote')}</h2>
          </div>
          <div
            className={
              cn(genericStyles.catpolCol8, genericStyles.catpolColOffset2)}
            dangerouslySetInnerHTML={{__html: t('HowToVoteBody')}}
          ></div>
        </div>
      </section>
      <section
        className={
          cn(genericStyles.vdSection, genericStyles.vdSectionLight)}
        id='harta'
      >
        <div className={genericStyles.catpolRow}>
          <div
            className={
              cn(genericStyles.catpolCol8, genericStyles.catpolColOffset2)}
          >
            <h2>{t('Map of Polling Stations Abroad')}</h2>
            <p>{t('MapMessage')}</p>
          </div>
        </div>
        <iframe src='http://ec2-52-51-209-112.eu-west-1.compute.amazonaws.com:8070' style={{width:'100%', height: '65vh', border: 0}}></iframe>
      </section>
    </>
  );
}

export default IndexPage;
