import React from 'react';

import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

export default (props: any) => {
  const data = useStaticQuery(graphql `
    query {
      placeholderImage: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 255) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `)
  return <Img {...props} fluid={data.placeholderImage.childImageSharp.fluid}/>
};
