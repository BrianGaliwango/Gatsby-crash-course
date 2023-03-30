/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions, }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
  
}

const path = require('path');

exports.createPages = async ({actions, graphql}) => {
  const { createPage } = actions

  const postTemplate = path.resolve('./src/templates/blogPost.js')

  const res = await graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              html
              id 
              frontmatter {
                path
                title
                date
                author
              }
            }
          }
        }
      } 
  `)
  if (res.errors) {
    return Promise.reject(res.errors);
  } else {
    res.data.allMarkdownRemark.edges.map(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
        context: {
          path: node.frontmatter.path
        },
        defer: true,
      });
    });
  }
}
