import React from 'react'
import { Link } from 'react-static'
import { withRouter } from 'react-router'
import { Link as ReactRouterLink } from 'react-router-dom'
import { category_1_menu } from '../../pageData/category_1'
import { category_2_menu } from '../../pageData/category_2'
import { category_3_menu } from '../../pageData/category_3'


const navItems = [
  {
    category: 'ux',
    menu: category_1_menu,
    width: 44
  },
  {
    category: 'projects',
    menu: category_2_menu,
    width: 88
  },
  {
    category: 'objects',
    menu: category_3_menu,
    width: 88
  },
  {
    category: 'cv',
    menu: category_3_menu,
    width: 44
  },
]

const defaultSpacing = 30

const defaultTotalMenuWidth = navItems.reduce((acc, curr) => (acc + curr.width), 0) + ((navItems.length - 1) * defaultSpacing)

class Nav extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: true,
      clickedCategory: null,
      toggle: true,
      rem: 20,
      currentWork: null,
      currentCategory: null,
      spacing: defaultSpacing,
      totalMenuWidth: defaultTotalMenuWidth,
    }
  }

componentDidMount = () => {
  this.setMenuSelection(this.props)
  if(window.outerWidth < 600){
    const spacing = 10
    const totalMenuWidth = navItems.reduce((acc, curr) => (acc + curr.width), 0) + ((navItems.length - 1) * spacing)
    const rem = 16
    this.setState({spacing, totalMenuWidth})
  }
}

componentWillReceiveProps = (nextProps) => {
  this.setMenuSelection(nextProps)
}

setMenuSelection = (nextProps) => {
  const locationArr = nextProps.location.pathname.split('/')
  const currentWork = locationArr[2] || null
  const currentCategory = locationArr[1] || navItems[0].category.toLowerCase()
  this.setState({currentWork, currentCategory})
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
    let previousItemRemWidth = 5
    const { currentWork, currentCategory, collapsed, clickedCategory, totalMenuWidth, spacing, rem } = this.state
    return navItems.map((item, index) => {
      const pathCategory = item.category.toLowerCase()
      const active = clickedCategory === pathCategory ? 'active' : ''
      const links = []
      item.menu.forEach(menuItem => {
        if (currentCategory === pathCategory && menuItem.path === currentWork) {
          return null
        }
        links.push(
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
      console.log((links.length + 2) * (rem * 1.7) + 10, rem)
      const menuStyle = active ? { width: `${totalMenuWidth}px`, height: `${(links.length + 2) * (rem * 2.2) + 10}px` } : { width: `${totalMenuWidth}px` }
      if (index !== 0) previousItemRemWidth += navItems[index-1].width + spacing
      return (
        <div key={pathCategory}>
          <div className="tabs">
            <div
              onClick={this.handleCategoryClick}
              data-category={pathCategory}
              style={
                collapsed
                  ? currentCategory === pathCategory
                    ? { transform: 'translate(0,0)', opacity: '1', width: `${item.width}` }
                    : { transform: 'translate(0,0)', opacity: '0', width: `${item.width}` }
                  : { transform: `translate(${previousItemRemWidth}px, 0)`, opacity: '1', width: `${item.width}` }
              }
              className={`nav-item ${active} menu-category`}
            >
                {item.category.toLowerCase().replace('_', ' ')} &nbsp;&nbsp;
            </div>
          </div>
          <div style={menuStyle} className="tab__content">
            <ul style={{top: `${rem * 2.1 * 2}px`}} className="links">{links}</ul>
          </div>

        </div>
      )
    })
  }

  render () {
    console.log(this.state.rem * 2.3)
    const height = this.state.rem * 2.3 * 4
    console.log(height)
    const rotateStyle = this.state.collapsed
      ? { left: '120px', transform: 'rotate(90deg)' }
      : { left: `${this.state.totalMenuWidth}px`, transform: 'rotate(-90deg)' }
    return (
      <div style={{ height }} className="nav-wrapper">
        <ReactRouterLink to="/"><div onClick={this.handleMenuClick} className="banner">Misha Volf</div></ReactRouterLink>
          <div style={{top: '118px', position: 'absolute'}}>
            {this.renderNav()}
            <div style={rotateStyle} onClick={this.handleClick} className="collapse-button">&#9651;</div>
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
