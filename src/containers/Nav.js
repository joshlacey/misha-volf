import React from 'react'
import { Link } from 'react-static'
import { category_3_menu } from '../../pageData/category_3'

const navItems = [
  {
    category: 'Category_1',
    menu: category_3_menu,
  },
  {
    category: 'Category_2',
    menu: category_3_menu,
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
      collapsed: false,
      currentCategory: navItems[0].category,
      clickedCategory: null,
    }
  }

  handleClick = e => {
    this.setState({
      collapsed: !this.state.collapsed,
      clickedCategory: null,
    })
  }

  handleOtherClick = e => {
    const { category } = e.target.dataset
    this.setState({
      currentCategory: category,
      collapsed: !this.state.collapsed,
      clickedCategory: null,
    })
  }

  handleCategoryClick = e => {
    const { category } = e.target.dataset
    this.setState({
      clickedCategory: category,
    })
  }

  renderNav = () => {
    let offset = -80
    const { currentCategory, collapsed, clickedCategory } = this.state
    return navItems.map(item => {
      offset += 100
      const pathCategory = item.category.toLowerCase()
      const active = clickedCategory === item.category ? 'active' : ''
      const links = item.menu.map(menuItem => (
        <li>
          <Link
            data-category={item.category}
            onClick={this.handleOtherClick}
            key={menuItem.path}
            to={`/${pathCategory}/${menuItem.path}`}
          >
            {menuItem.path}
          </Link>
        </li>
      ))
      const menuStyle = active ? {width: '300px', height: '200px'} : {width: '300px'}
      return (
        <div key={item.category}>
          <div className="tabs">
            <div
              onClick={this.handleCategoryClick}
              data-category={item.category}
              style={
                collapsed
                  ? currentCategory === item.category
                    ? { left: '20px', opacity: '1' }
                    : { left: '20px', opacity: '0' }
                  : { left: `${offset}px`, opacity: '1' }
              }
              className={`nav-item ${active}`}
            >
              {item.category}
            </div>
          </div>
          <div style={menuStyle} className="tab__content">
            <ul className="links">
              {links}
            </ul>
          </div>
        </div>
      )
    })
  }

  render () {
    const { collapsed } = this.state
    const rotateStyle = collapsed ? {left: '120px', transform: 'rotate(0deg)'} : {left: '320px', transform: 'rotate(-180deg)'}
    return (
      <div>
        {this.renderNav()}
        <svg viewBox="0 0 100 100" style={rotateStyle} onClick={this.handleClick} class="svg nav-item collapse-button" height="30" width="30">
            <polygon points="43,30 43,70 85,49" class="triangle" stroke-linecap="round"/>
        </svg>
        {/* <button
          onClick={this.handleClick}
          style={collapsed ? { left: '120px', opacity: '1' } : { left: '320px', opacity: '1' }}
          className="nav-item collapse-button"
        /> */}
      </div>
    )
  }
}

export default Nav
