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
          <div className={
            cn(genericStyles.catpolCol8, genericStyles.catpolColOffset2)
          }>
            <h2>{t('How to Vote')}</h2>
            <div dangerouslySetInnerHTML={{__html: t('HowToVoteBody')}}></div>
          </div>
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
        <iframe src='http://localhost:8070/' allow='geolocation' style={{width:'100%', height: '65vh', border: 0}}></iframe>
      </section>
      <section className={
        cn(genericStyles.vdSection, genericStyles.vdSectionLight)}
      >
        <div className={genericStyles.catpolRow}>
          <div className={
            cn(genericStyles.catpolCol8, genericStyles.catpolColOffset2)
          }>
            <h2>{t('Requestion a new station')}</h2>
            <div dangerouslySetInnerHTML={{__html: t('StationRequestBody')}}></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default IndexPage;
