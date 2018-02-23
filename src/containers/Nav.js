import React from 'react'
import { Link } from 'react-static'
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
    const locationArr = location.pathname.split('/')
    const currentWork = locationArr.pop()
    const category = locationArr.pop()
    this.state = {
      collapsed: false,
      currentCategory: category,
      clickedCategory: null,
      currentWork,
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
    const { category } = e.target.dataset
    this.setState({
      currentCategory: category,
      collapsed: true,
      clickedCategory: null,
      toggle: !this.state.toggle,
    })
  }

  handleCategoryClick = e => {
    const { category } = e.target.dataset
    this.setState({
      clickedCategory: category,
    })
  }

  renderNav = () => {
    let offset = -100
    const { currentCategory, collapsed, clickedCategory, currentWork } = this.state
    return navItems.map(item => {
      offset += 100
      const pathCategory = item.category.toLowerCase()
      const active = clickedCategory === pathCategory ? 'active' : ''
      const links = item.menu.map(menuItem => {
        if (currentCategory === pathCategory && menuItem.path === currentWork) {
          return null
        }
        return (
          <li key={menuItem.path}>
            <ReactRouterLink
              data-category={pathCategory}
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
                    ? { left: '0px', opacity: '1' }
                    : { left: '0px', opacity: '0' }
                  : { left: `${offset}px`, opacity: '1' }
              }
              className={`nav-item ${active}`}
            >
              {item.category}
            </div>
          </div>
          <div style={menuStyle} className="tab__content">
            <ul className="links">{links}</ul>
          </div>
        </div>
      )
    })
  }

  render () {
    const { collapsed } = this.state
    const rotateStyle = collapsed
      ? { left: '120px', transform: 'rotate(0deg)' }
      : { left: '320px', transform: 'rotate(-180deg)' }
    return (
      <div className="nav-wrapper">
        {this.renderNav()}
        <svg
          viewBox="0 0 100 100"
          style={rotateStyle}
          onClick={this.handleClick}
          className="svg nav-item collapse-button"
          height="30"
          width="30"
        >
          <polygon points="43,30 43,70 85,49" className="triangle" />
        </svg>
      </div>
    )
  }
}

export default Nav
