import React from 'react'
import { Link } from 'react-static'
import { withRouter } from 'react-router'
import { Link as ReactRouterLink } from 'react-router-dom'
import { category_1_menu } from '../../pageData/category_1'
import { category_2_menu } from '../../pageData/category_2'
import { category_3_menu } from '../../pageData/category_3'
import { categoryTemplate } from '../../pageData/categoryTemplate'

const navItems = [
  {
    category: 'ux',
    menu: categoryTemplate,
    width: 4,
  },
  {
    category: 'projects',
    menu: category_2_menu,
    width: 6,
  },
  {
    category: 'objects',
    menu: category_3_menu,
    width: 6,
  },
  {
    category: 'cv',
    width: 4,
  },
]

class Nav extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: true,
      clickedCategory: null,
      toggle: true,
      rem: 22,
      currentWork: null,
      currentCategory: null,
      spacing: null,
      totalMenuWidth: null,
      showCV: true,
    }
  }

  calculateCategoryWidth (rem, spacing) {
    return navItems.reduce((acc, curr) => acc + (curr.width * rem), 0) + (navItems.length - 1) * spacing
  }

  calculateDropDownWidth(rem, spacing) {
    let acc = 0
    for(let i = 0; i < navItems.length - 1; i++) {
      acc += i * rem
    }
    return acc + ( navItems.length - 2 * spacing )
  }

  setRemSpacingMenuWidth (rem, spacing, showCV = true) {
    const totalMenuWidth = this.calculateCategoryWidth(rem, spacing)
    this.setState({ rem, spacing, totalMenuWidth, showCV})
  }

  componentDidMount = () => {
    console.log(window.outerWidth)
    this.setMenuSelection(this.props)
    const width = window.outerWidth
    if (width < 320) {
      this.setRemSpacingMenuWidth(15, 10, false)
    } else if (width > 320 && width < 600) {
      this.setRemSpacingMenuWidth(18, 20)
    } else if (window.outerWidth < 600 && window.outerWidth < 768) {
      this.setRemSpacingMenuWidth(22, 30)
    } else {
      this.setRemSpacingMenuWidth(22, 30)
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setMenuSelection(nextProps)
  }

  setMenuSelection = nextProps => {
    const locationArr = nextProps.location.pathname.split('/')
    const currentWork = locationArr[2] || null
    const currentCategory = locationArr[1] || navItems[0].category.toLowerCase()
    this.setState({ currentWork, currentCategory })
  }

  handleClick = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      clickedCategory: null,
    })
  }

  handleMenuClick = () => {
    this.setState({
      collapsed: true,
      clickedCategory: null,
      toggle: !this.state.toggle,
    })
  }

  handleCategoryClick = e => {
    const { collapsed, currentCategory } = this.state
    if (collapsed && currentCategory) return this.setState({ clickedCategory: currentCategory })
    const { category } = e.target.dataset
    const { clickedCategory } = this.state
    this.setState({
      clickedCategory: !clickedCategory ? category : clickedCategory !== category ? category : null,
    })
  }

  renderNav = () => {
    let previousItemRemWidth = 5
    const {
      currentWork,
      currentCategory,
      collapsed,
      clickedCategory,
      totalMenuWidth,
      spacing,
      rem,
    } = this.state
    return navItems.map((item, index) => {
      const pathCategory = item.category.toLowerCase()
      const active = this.props.menuClosed ? '' : clickedCategory === pathCategory ? 'active' : ''
      console.log(pathCategory)
      let links = []
      if( pathCategory !== 'cv' ) {
        item.menu.forEach(menuItem => {
          if (currentCategory === pathCategory && menuItem.path === currentWork) {
            return null
          }
          links.push(
            <li key={menuItem.path}>
              <ReactRouterLink
                onClick={this.handleMenuClick}
                data-nav="nav"
                to={`/${pathCategory}/${menuItem.path}`}
              >
                {menuItem.path}
              </ReactRouterLink>
            </li>
          )
        })
      }
      const menuStyle = active
        ? { width: `${totalMenuWidth}px`, height: `${(links.length + 2) * (rem * 2.2) + 10}px` }
        : { width: `${totalMenuWidth}px` }
      if (index !== 0) previousItemRemWidth += navItems[index - 1].width * rem + spacing
      return (
        <div key={pathCategory}>
          <div className="tabs">
            <div
              onClick={this.handleCategoryClick}
              data-category={pathCategory}
              data-nav="nav"
              style={
                collapsed
                  ? currentCategory === pathCategory
                    ? { transform: 'translate(0,0)', opacity: '1', width: `${item.width * rem}px` }
                    : { transform: 'translate(0,0)', opacity: '0', width: `${item.width * rem}px` }
                  : {
                    transform: `translate(${previousItemRemWidth}px, 0)`,
                    opacity: '1',
                    width: `${item.width * rem}px`,
                  }
              }
              className={`nav-item ${active} menu-category`}
            >
              {item.category.toLowerCase().replace('_', ' ')} &nbsp;&nbsp;
            </div>
          </div>
          { pathCategory !== 'cv' &&
            <div style={menuStyle} className="tab__content">
              <ul style={{ top: `${rem * 2.1 * 2}px` }} className="links">
                {links}
              </ul>
            </div>
          }
        </div>
      )
    })
  }

  render () {
    console.log('menuClosed', this.props.menuClosed)
    const { rem, collapsed, totalMenuWidth, currentCategory } = this.state
    const height = rem * 2.3 * 4
    const rotateStyle = collapsed
      ? { left: '140px', transform: 'rotate(90deg)' }
      : { left: `${totalMenuWidth + 2 * rem}px`, transform: 'rotate(-90deg)' }
    return (
      <div style={{ height }} className="nav-wrapper">
        <ReactRouterLink to="/">
          <div onClick={this.handleMenuClick} data-nav="nav" className="banner">
            Misha Volf
          </div>
        </ReactRouterLink>
        <div style={{ top: '118px', position: 'absolute' }}>
          {this.renderNav()}
          <div style={rotateStyle} onClick={this.handleClick} data-nav="nav" className="collapse-button">
            &#9651;
          </div>
        </div>
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
