import React from 'react';

const Nav = ({activeTab, onTabChange, total, cartLength})=> (
    <nav className='App-nav'>
        <ul>
            <li className={`App-nav-item ${activeTab === 0 && 'selected'}`}>
                <a onClick={() => onTabChange(0)}>Items</a>
            </li>
            <li className={`App-nav-item ${activeTab === 1 && 'selected'}`}>
                <a onClick={() => onTabChange(1)}>Cart</a>
            </li>
            <li className='App-nav-cart App-nav-item'>
                <div onClick={() => onTabChange(1)}>
                    <i className='fas fa-shopping-cart'></i>
                    {(cartLength<=1) ? (
                        ` ${cartLength} item `
                    ) : (
                        ` ${cartLength} items `
                    ) }
                    
                    (${total.toFixed(2)})
                </div>
            </li>
        </ul>
    </nav>
)

export default Nav;