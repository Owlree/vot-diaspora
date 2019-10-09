import * as headerStyles from './css/header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import cn from 'classnames';
import genericStyles from '../css/generics.module.css';

import { useTranslation } from 'react-i18next';

import LanguageButton from './languageButton';


const Header = function() {

  interface Data {
    site: {
      siteMetadata: {
        title: string,
        locales: string[],
        menuLinks: {
          name: string,
          path: string,
          special: boolean
        }[]
      }
    }
  }

  const data = useStaticQuery<Data>(graphql`
    {
      site {
        siteMetadata {
          title
          locales
          menuLinks {
            name
            path
            special
          }
        }
      }
    }
  `);

  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  // Hamburger button that toggles the menu on small screens
  const GetSetMenuVisibleButton = (visible: boolean) => (
    <button
      id={headerStyles.hamburgerToggle}
      className={`
        ${genericStyles.hideLarge}
        ${genericStyles.catpolButton}
      `}
      onClick={() => setMenuVisible(visible)}
    >
      {visible && <FaBars/>}
      {!visible && <FaTimes/>}
    </button>
  );

  // All the other navigation links
  let buttons = (
    <div
      className={cn(
        headerStyles.menu,
        {[headerStyles.slidedIn]: menuVisible}
      )}
    >
      <ol>
        {data.site.siteMetadata.menuLinks.map((value, index) => {
          return (
            <li key={index}>
              <a
                className={cn(
                  genericStyles.catpolButton,
                    { [genericStyles.catpolButtonSecondary]: value.special },
                    headerStyles.link
                )}
                href={value.path}
                onClick={() => setMenuVisible(false)}
              >
                <span>{t(value.name)}</span>
              </a>
            </li>
          )
        })}
        {data.site.siteMetadata.locales.map((locale, index) => {
          return (
            <li>
              <LanguageButton
                locale={locale}
                className={cn(genericStyles.catpolButton, headerStyles.link)}
                onClick={() => setMenuVisible(false)}
              >
                {locale}
              </LanguageButton>
            </li>
          );
        })}
      </ol>
      <div>
        {GetSetMenuVisibleButton(false)}
      </div>
    </div>
  );

  return (
    <header>
      <div className={genericStyles.catpolRow}>
        <div className={genericStyles.catpolCol12}>
          <nav className={headerStyles.header}>
            {GetSetMenuVisibleButton(true)}
            {buttons}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
