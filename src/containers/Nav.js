import React from 'react'
import { Link } from 'react-static'
import { withRouter } from 'react-router'
import { Link as ReactRouterLink } from 'react-router-dom'
import { category_1_menu } from '../../pageData/category_1'
import { category_2_menu } from '../../pageData/category_2'
import { category_3_menu } from '../../pageData/category_3'


const navItems = [
  {
    category: 'Category_1',
    menu: category_1_menu,
  },
  {
    category: 'Category_2',
    menu: category_2_menu,
  },
  {
    category: 'Category_3',
    menu: category_3_menu,
  },
]

class Nav extends React.Component {
  constructor () {
    super()
    this.state = {
      collapsed: true,
      clickedCategory: null,
      toggle: true,
    }
  }

  handleClick = e => {
    this.setState({
      collapsed: !this.state.collapsed,
      clickedCategory: null,
    })
  }

  handleMenuClick = e => {
    this.setState({
      collapsed: true,
      clickedCategory: null,
      toggle: !this.state.toggle,
    })
  }

  handleCategoryClick = e => {
    const { category } = e.target.dataset
    const { clickedCategory } = this.state
    this.setState({
      clickedCategory: !clickedCategory ? category : (clickedCategory !== category) ? category : null
    })
  }

  renderNav = () => {
    const locationArr = this.props.location.pathname.split('/')
    const currentWork = locationArr[2] || null
    const currentCategory = locationArr[1] || navItems[0].category.toLowerCase()
    let offset = -100
    const { collapsed, clickedCategory } = this.state
    const navCategories = navItems.map(item => {
      offset += 100
      const pathCategory = item.category.toLowerCase()
      const active = clickedCategory === pathCategory ? 'active' : ''
      const links = item.menu.map(menuItem => {
        console.log(currentCategory, pathCategory, menuItem.path, currentWork)
        if (currentCategory === pathCategory && menuItem.path === currentWork) {
          return null
        }
        return (
          <li key={menuItem.path}>
            <ReactRouterLink
              onClick={this.handleMenuClick}
              to={`/${pathCategory}/${menuItem.path}`}
            >
              {menuItem.path}
            </ReactRouterLink>
          </li>
        )
      })
      const menuStyle = active ? { width: '300px', height: '200px' } : { width: '300px' }
      return (
        <div key={pathCategory}>
          <div className="tabs">
            <div
              onClick={this.handleCategoryClick}
              data-category={pathCategory}
              style={
                collapsed
                  ? currentCategory === pathCategory
                    ? { transform: 'translate(0,0)', opacity: '1' }
                    : { transform: 'translate(0,0)', opacity: '0' }
                  : { transform: `translate(${offset}px, 0)`, opacity: '1' }
              }
              className={`nav-item ${active} menu-category`}
            >
                {item.category.toLowerCase().replace('_', ' ')}
            </div>
          </div>
          <div style={menuStyle} className="tab__content">
            <ul className="links">{links}</ul>
          </div>

        </div>
      )
    })
    const rotateStyle = collapsed
      ? { left: '120px', transform: 'rotate(90deg)' }
      : { left: '320px', transform: 'rotate(-90deg)' }
    return (
      <div style={{top: '100px', position: 'absolute'}}>
        {navCategories}
        <div style={rotateStyle} onClick={this.handleClick} className="collapse-button">&#9651;</div>
      </div>
    )
  }

  render () {
    return (
      <div className="nav-wrapper">
        <ReactRouterLink to="/"><div onClick={this.handleMenuClick} className="banner">Misha Volf</div></ReactRouterLink>
          {this.renderNav()}
          {/* <svg
            viewBox="0 0 100 100"
            style={rotateStyle}
            onClick={this.handleClick}
            className="svg nav-item collapse-button"
            height="30"
            width="30"
          >
            <polygon points="43,30 43,70 85,49" className="triangle" />
          </svg> */}
      </div>

    )
  }
}

export default withRouter(Nav)
